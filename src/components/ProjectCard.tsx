import Link from "next/link";
import Image from "next/image";
import { Tag } from "./Tag";
import { Calendar, ExternalLink } from "lucide-react";
import type { ContentFrontmatter } from "@/lib/content";

function GithubSmallIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface ProjectCardProps {
  slug: string;
  frontmatter: ContentFrontmatter;
}

export function ProjectCard({ slug, frontmatter }: ProjectCardProps) {
  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="group rounded-xl border border-card-border bg-card hover:border-accent/30 transition-colors duration-200">
      <Link href={`/projects/${slug}`} className="block p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl">
        {frontmatter.thumbnail && (
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
            <Image
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center gap-3 text-xs text-foreground-muted mb-3">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
          </div>
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {frontmatter.title}
        </h3>
        <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">
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
      </Link>

      {/* Actions */}
      {frontmatter.github && (
        <div className="px-5 pb-4 flex items-center gap-3">
          <a
            href={frontmatter.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <GithubSmallIcon />
            Source
          </a>
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <ExternalLink size={14} />
            Details
          </Link>
        </div>
      )}
    </div>
  );
}
