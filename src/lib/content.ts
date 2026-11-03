import fs from "fs";
import path from "path";
import matter from "gray-matter";

/* ============================================
   Types
   ============================================ */

export interface ContentFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  published: boolean;
  readingTime?: string;
  github?: string;
  stack?: string[];
  pdf?: string;
  category?: string;
  lang?: "en" | "ar";
}

export interface ContentItem {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: string;
}

/* ============================================
   Content directories
   ============================================ */

const CONTENT_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), "content");

type ContentType = "projects" | "reports" | "articles";

/* ============================================
   Helpers
   ============================================ */

export function parseFilename(filename: string): { slug: string; lang: "en" | "ar"; baseSlug: string } {
  if (filename.endsWith(".ar.md") || filename.endsWith(".ar.mdx")) {
    const base = filename.replace(/\.ar\.mdx?$/, "");
    return { slug: `${base}-ar`, lang: "ar", baseSlug: base };
  }
  const clean = filename.replace(/\.mdx?$/, "");
  if (clean.endsWith("-ar")) {
    return { slug: clean, lang: "ar", baseSlug: clean.replace(/-ar$/, "") };
  }
  return { slug: clean, lang: "en", baseSlug: clean };
}

/**
 * Get all content items of a given type, sorted by date (newest first).
 * Only returns published items by default.
 */
export function getAllContent(
  type: ContentType,
  includeUnpublished = false
): ContentItem[] {
  const dir = path.join(CONTENT_DIR, type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const items: ContentItem[] = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const parsed = parseFilename(filename);
    const lang: "en" | "ar" = (data.lang === "ar" || data.lang === "en") ? data.lang : parsed.lang;

    return {
      slug: parsed.slug,
      frontmatter: {
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        date: data.date ?? "",
        tags: data.tags ?? [],
        thumbnail: data.thumbnail,
        published: data.published ?? true,
        readingTime: data.readingTime,
        github: data.github,
        stack: data.stack,
        pdf: data.pdf,
        category: data.category ?? "technical",
        lang,
      },
      content,
    };
  });

  const filtered = includeUnpublished
    ? items
    : items.filter((item) => item.frontmatter.published);

  return filtered.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Get a single content item by slug.
 * Returns undefined if not found.
 */
export function getContentBySlug(
  type: ContentType,
  slug: string
): ContentItem | undefined {
  const dir = path.join(CONTENT_DIR, type);

  // Check candidates in order
  const candidates: string[] = [];
  if (slug.endsWith("-ar")) {
    const base = slug.replace(/-ar$/, "");
    candidates.push(`${base}.ar.mdx`, `${base}.ar.md`, `${slug}.mdx`, `${slug}.md`);
  } else {
    candidates.push(`${slug}.mdx`, `${slug}.md`, `${slug}.ar.mdx`, `${slug}.ar.md`);
  }

  let filePath: string | undefined;
  let resolvedFilename: string | undefined;

  for (const candidate of candidates) {
    const p = path.join(dir, candidate);
    if (fs.existsSync(p)) {
      filePath = p;
      resolvedFilename = candidate;
      break;
    }
  }

  if (!filePath || !resolvedFilename) {
    return undefined;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const parsed = parseFilename(resolvedFilename);
  const lang: "en" | "ar" = (data.lang === "ar" || data.lang === "en") ? data.lang : parsed.lang;

  return {
    slug,
    frontmatter: {
      title: data.title ?? "Untitled",
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      thumbnail: data.thumbnail,
      published: data.published ?? true,
      readingTime: data.readingTime,
      github: data.github,
      stack: data.stack,
      pdf: data.pdf,
      category: data.category ?? "technical",
      lang,
    },
    content,
  };
}

/**
 * Get all slugs for a content type.
 * Used with generateStaticParams for static export.
 */
export function getAllSlugs(type: ContentType): string[] {
  const dir = path.join(CONTENT_DIR, type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => parseFilename(f).slug);
}
