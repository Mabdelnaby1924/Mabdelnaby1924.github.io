import type { Metadata } from "next";
import { getAllSlugs, getContentBySlug, getAlternateSlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Tag } from "@/components/Tag";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Calendar, Clock } from "lucide-react";
import { siteConfig } from "../../../../data/site-config";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllSlugs("articles");
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
  const article = getContentBySlug("articles", slug);
  if (!article) return {};
  const { title, description, tags, lang = "en" } = article.frontmatter;
  const altSlug = getAlternateSlug("articles", slug, lang);

  const alternates = altSlug
    ? {
        canonical: `${siteConfig.url}/articles/${slug}`,
        languages: {
          en: `${siteConfig.url}/articles/${lang === "en" ? slug : altSlug}`,
          ar: `${siteConfig.url}/articles/${lang === "ar" ? slug : altSlug}`,
        },
      }
    : {
        canonical: `${siteConfig.url}/articles/${slug}`,
      };

  return {
    title,
    description,
    keywords: tags,
    alternates,
    openGraph: {
      title,
      description,
      type: "article",
      locale: lang === "ar" ? "ar_AR" : siteConfig.locale,
      url: `${siteConfig.url}/articles/${slug}`,
      tags,
      images: article.frontmatter.thumbnail
        ? [
            {
              url: `${siteConfig.url}${article.frontmatter.thumbnail}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: article.frontmatter.thumbnail ? "summary_large_image" : "summary",
      title,
      description,
      images: article.frontmatter.thumbnail
        ? [`${siteConfig.url}${article.frontmatter.thumbnail}`]
        : undefined,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getContentBySlug("articles", slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content } = article;
  const lang = frontmatter.lang || "en";
  const isRtl = lang === "ar";
  const altSlug = getAlternateSlug("articles", slug, lang);
  const alternateHref = altSlug ? `/articles/${altSlug}` : undefined;

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString(isRtl ? "ar-EG-u-nu-latn" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const localizedReadingTime =
    isRtl && frontmatter.readingTime
      ? frontmatter.readingTime.replace(/\s*min/, " دقيقة")
      : frontmatter.readingTime;

  return (
    <main
      className={`max-w-3xl mx-auto px-4 py-16 w-full ${isRtl ? "prose-rtl" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
      lang={lang}
    >
      <div className="flex items-center justify-between mb-8">
        <BackLink
          href="/articles"
          label={isRtl ? "العودة إلى المقالات" : "Back to Articles"}
        />
        <LanguageSwitch currentLang={lang} alternateHref={alternateHref} />
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          {frontmatter.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-foreground-muted mb-4">
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
          )}
          {localizedReadingTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {localizedReadingTime}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-foreground-secondary mb-4">
          {frontmatter.description}
        </p>

        {/* Tags */}
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </header>

      <hr className="border-border mb-8" />

      {/* Content */}
      <MarkdownRenderer content={content} lang={frontmatter.lang} />
    </main>
  );
}
