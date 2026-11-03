import type { Metadata } from "next";
import { getAllSlugs, getContentBySlug, getAlternateSlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Tag } from "@/components/Tag";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Calendar, ExternalLink } from "lucide-react";
import { siteConfig } from "../../../../data/site-config";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllSlugs("projects");
  if (slugs.length === 0) {
    return [{ slug: "_empty" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);
  if (!project) return {};
  const { title, description, lang = "en" } = project.frontmatter;
  const altSlug = getAlternateSlug("projects", slug, lang);

  const alternates = altSlug
    ? {
        canonical: `${siteConfig.url}/projects/${slug}`,
        languages: {
          en: `${siteConfig.url}/projects/${lang === "en" ? slug : altSlug}`,
          ar: `${siteConfig.url}/projects/${lang === "ar" ? slug : altSlug}`,
        },
      }
    : {
        canonical: `${siteConfig.url}/projects/${slug}`,
      };

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: "article",
      locale: lang === "ar" ? "ar_AR" : siteConfig.locale,
      url: `${siteConfig.url}/projects/${slug}`,
      images: project.frontmatter.thumbnail
        ? [
            {
              url: `${siteConfig.url}${project.frontmatter.thumbnail}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: project.frontmatter.thumbnail ? "summary_large_image" : "summary",
      title,
      description,
      images: project.frontmatter.thumbnail
        ? [`${siteConfig.url}${project.frontmatter.thumbnail}`]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;
  const lang = frontmatter.lang || "en";
  const isRtl = lang === "ar";
  const altSlug = getAlternateSlug("projects", slug, lang);
  const alternateHref = altSlug ? `/projects/${altSlug}` : undefined;

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString(isRtl ? "ar-EG-u-nu-latn" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main
      className={`max-w-3xl mx-auto px-4 py-16 w-full ${isRtl ? "prose-rtl" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
      lang={lang}
    >
      <div className="flex items-center justify-between mb-8">
        <BackLink
          href="/projects"
          label={isRtl ? "العودة إلى المشاريع" : "Back to Projects"}
        />
        <LanguageSwitch currentLang={lang} alternateHref={alternateHref} />
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          {frontmatter.title}
        </h1>

        {/* Meta */}
        {formattedDate && (
          <div className="flex items-center gap-4 text-sm text-foreground-muted mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
          </div>
        )}

        <p className="text-foreground-secondary mb-4">
          {frontmatter.description}
        </p>

        {/* Stack */}
        {frontmatter.stack && frontmatter.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {frontmatter.stack.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
        )}

        {/* GitHub link */}
        {frontmatter.github && (
          <a
            href={frontmatter.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            <ExternalLink size={14} />
            {isRtl ? "عرض على GitHub" : "View on GitHub"}
          </a>
        )}
      </header>

      <hr className="border-border mb-8" />

      {/* Content */}
      <MarkdownRenderer content={content} lang={frontmatter.lang} />
    </main>
  );
}
