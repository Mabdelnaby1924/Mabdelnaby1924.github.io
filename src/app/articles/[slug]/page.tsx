import type { Metadata } from "next";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Tag } from "@/components/Tag";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
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
  const { title, description, tags } = article.frontmatter;
  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${siteConfig.url}/articles/${slug}`,
      tags,
    },
    twitter: {
      card: "summary",
      title,
      description,
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

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 w-full">
      <BackLink href="/articles" label="Back to Articles" />

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
          {frontmatter.readingTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {frontmatter.readingTime}
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
      <MarkdownRenderer content={content} />
    </main>
  );
}
