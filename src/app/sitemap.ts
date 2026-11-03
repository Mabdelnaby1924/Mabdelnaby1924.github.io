import type { MetadataRoute } from "next";
import { siteConfig } from "../../data/site-config";
import { getAllSlugs, getContentBySlug, getAlternateSlug } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reports`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  function createEntry(type: "projects" | "reports" | "articles", slug: string) {
    const item = getContentBySlug(type, slug);
    const lang = item?.frontmatter.lang || "en";
    const altSlug = getAlternateSlug(type, slug, lang);

    const alternates = altSlug
      ? {
          languages: {
            en: `${baseUrl}/${type}/${lang === "en" ? slug : altSlug}`,
            ar: `${baseUrl}/${type}/${lang === "ar" ? slug : altSlug}`,
          },
        }
      : undefined;

    return {
      url: `${baseUrl}/${type}/${slug}`,
      lastModified: item?.frontmatter.date ? new Date(item.frontmatter.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates,
    };
  }

  const projectPages = getAllSlugs("projects").map((slug) => createEntry("projects", slug));
  const reportPages = getAllSlugs("reports").map((slug) => createEntry("reports", slug));
  const articlePages = getAllSlugs("articles").map((slug) => createEntry("articles", slug));

  return [
    ...staticPages,
    ...projectPages,
    ...reportPages,
    ...articlePages,
  ];
}
