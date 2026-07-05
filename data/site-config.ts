/**
 * Centralized site configuration for SEO, metadata, and URLs.
 * Edit this file to configure your portfolio's identity.
 */

export const siteConfig = {
  /** Site name used in metadata and Open Graph */
  name: "Mahmoud Abdelnaby",

  /** Full title shown on the home page */
  title: "Security Analyst & DevOps Engineer",

  /** Default meta description */
  description:
    "Security Analyst & DevOps Engineer — Security Analysis Reports, DevOps Projects, and Technical Articles.",

  /**
   * Production URL of the deployed site.
   * Used for sitemap, Open Graph, and canonical URLs.
   * Set this to your GitHub Pages URL or custom domain.
   */
  url: "https://Mabdelnaby1924.github.io",

  /** Path prefix if deployed under a subpath (e.g., "/portfolio2"). Leave empty for root domain. */
  basePath: "",

  /** Author name for meta tags */
  author: "Mahmoud Abdelnaby",

  /** Default locale */
  locale: "en_US",

  /** Social media handles (without @) for Twitter/X cards */
  twitter: {
    handle: "Mhmod_abdelnaby",
  },

  /** Keywords for SEO */
  keywords: [
    "Security Analyst",
    "DevOps Engineer",
    "SOC",
    "DFIR",
    "Detection Engineering",
    "Splunk",
    "Sigma Rules",
    "MITRE ATT&CK",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Portfolio",
  ],
} as const;
