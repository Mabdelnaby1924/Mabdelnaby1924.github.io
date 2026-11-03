import type { Metadata } from "next";
import { getAllSlugs, getContentBySlug, getAlternateSlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Tag } from "@/components/Tag";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Calendar, Clock, Download } from "lucide-react";
import { siteConfig } from "../../../../data/site-config";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllSlugs("reports");
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
  const report = getContentBySlug("reports", slug);
  if (!report) return {};
  const { title, description, tags, lang = "en" } = report.frontmatter;
  const altSlug = getAlternateSlug("reports", slug, lang);

  const alternates = altSlug
    ? {
        canonical: `${siteConfig.url}/reports/${slug}`,
        languages: {
          en: `${siteConfig.url}/reports/${lang === "en" ? slug : altSlug}`,
          ar: `${siteConfig.url}/reports/${lang === "ar" ? slug : altSlug}`,
        },
      }
    : {
        canonical: `${siteConfig.url}/reports/${slug}`,
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
      url: `${siteConfig.url}/reports/${slug}`,
      tags,
      images: [
        {
          url: `${siteConfig.url}${report.frontmatter.thumbnail}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${siteConfig.url}${report.frontmatter.thumbnail}`],
    },
  };
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getContentBySlug("reports", slug);

  if (!report) {
    notFound();
  }

  const { frontmatter, content } = report;
  const lang = frontmatter.lang || "en";
  const isRtl = lang === "ar";
  const altSlug = getAlternateSlug("reports", slug, lang);
  const alternateHref = altSlug ? `/reports/${altSlug}` : undefined;

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
          href="/reports"
          label={isRtl ? "العودة إلى التقارير" : "Back to Reports"}
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
          <div className="flex flex-wrap gap-1.5 mb-4">
            {frontmatter.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {frontmatter.pdf && (
            <a
              href={frontmatter.pdf}
              download
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
            >
              <Download size={14} />
              {isRtl ? "تحميل PDF" : "Download PDF"}
            </a>
          )}

          {frontmatter.github && (
            <a
              href={frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
            >
              {isRtl ? "عرض على GitHub" : "View on GitHub"}
            </a>
          )}
        </div>
      </header>

      <hr className="border-border mb-8" />

      {/* Content */}
      <MarkdownRenderer content={content} lang={frontmatter.lang} />
    </main>
  );
}
