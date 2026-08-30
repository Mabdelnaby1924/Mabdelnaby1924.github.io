import type { Metadata } from "next";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Tag } from "@/components/Tag";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ExternalLink } from "lucide-react";
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
  const { title, description } = project.frontmatter;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${siteConfig.url}/projects/${slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
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

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 w-full">
      <BackLink href="/projects" label="Back to Projects" />

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          {frontmatter.title}
        </h1>
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
            View on GitHub
          </a>
        )}
      </header>

      <hr className="border-border mb-8" />

      {/* Content */}
      <MarkdownRenderer content={content} />
    </main>
  );
}
