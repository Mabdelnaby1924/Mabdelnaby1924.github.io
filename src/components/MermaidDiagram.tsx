"use client";

import { useEffect, useId, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  label?: string;
  lang?: string;
}

type MermaidModule = typeof import("mermaid");

/**
 * Mermaid is large (~1MB). Keep a single shared promise so the library is
 * fetched once, and only on pages that actually contain a diagram.
 */
let mermaidPromise: Promise<MermaidModule> | null = null;

function loadMermaid(): Promise<MermaidModule> {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid");
  }
  return mermaidPromise;
}

function readTheme(isArabic: boolean) {
  const docStyles = getComputedStyle(document.documentElement);
  const bodyStyles = getComputedStyle(document.body);
  const token = (name: string, fallback: string) =>
    docStyles.getPropertyValue(name).trim() || fallback;

  let fontFamily =
    docStyles.getPropertyValue("--font-geist-sans").trim() ||
    "ui-sans-serif, system-ui, sans-serif";

  const arabicFont = bodyStyles.getPropertyValue("--font-ibm-plex-arabic").trim();
  if (isArabic && arabicFont) {
    fontFamily = `${arabicFont}, ui-sans-serif, system-ui, sans-serif`;
  }

  return {
    isDark: document.documentElement.getAttribute("data-theme") === "dark",
    accent: token("--accent", "#2563eb"),
    background: token("--background", "#fafafa"),
    card: token("--card", "#ffffff"),
    foreground: token("--foreground", "#18181b"),
    secondary: token("--foreground-secondary", "#52525b"),
    border: token("--border", "#e4e4e7"),
    fontFamily,
    arabicFont,
  };
}

/**
 * Renders a ```mermaid fenced block as an SVG diagram.
 * Client-only: mermaid needs the DOM, which a static export cannot provide at
 * build time. Invalid diagrams fall back to the raw source instead of breaking
 * the page.
 */
export function MermaidDiagram({
  chart,
  label = "Diagram",
  lang = "en",
}: MermaidDiagramProps) {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef(0);
  const isArabic = lang === "ar";

  useEffect(() => {
    const baseId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

    async function draw() {
      const request = ++requestRef.current;

      try {
        const { default: mermaid } = await loadMermaid();
        const theme = readTheme(isArabic);

        if (isArabic && typeof document !== "undefined" && "fonts" in document && theme.arabicFont) {
          try {
            await Promise.all([
              document.fonts.load(`400 14px ${theme.arabicFont}`, chart),
              document.fonts.load(`600 14px ${theme.arabicFont}`, chart),
              document.fonts.load(`700 14px ${theme.arabicFont}`, chart),
              document.fonts.ready,
            ]);
          } catch {
            // Ignore font loading errors; fallback gracefully
          }
        }

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            fontFamily: theme.fontFamily,
            fontSize: "14px",
            primaryColor: theme.isDark ? "#1e293b" : "#dbeafe",
            primaryTextColor: theme.foreground,
            primaryBorderColor: theme.accent,
            secondaryColor: theme.card,
            secondaryTextColor: theme.foreground,
            secondaryBorderColor: theme.border,
            tertiaryColor: theme.background,
            tertiaryTextColor: theme.foreground,
            tertiaryBorderColor: theme.border,
            lineColor: theme.secondary,
            textColor: theme.foreground,
            mainBkg: theme.card,
            nodeBorder: theme.accent,
            clusterBkg: theme.background,
            clusterBorder: theme.border,
            edgeLabelBackground: theme.card,
            titleColor: theme.foreground,
          },
        });

        const { svg: rendered } = await mermaid.render(
          `${baseId}-${request}`,
          chart
        );

        // A newer render or unmount superseded this one.
        if (requestRef.current !== request) return;

        setSvg(rendered);
        setError(null);
      } catch (err) {
        if (requestRef.current !== request) return;

        setSvg("");
        setError(
          err instanceof Error ? err.message : "Unable to render diagram"
        );
      }
    }

    draw();

    // Re-draw when the site theme changes.
    const observer = new MutationObserver(() => {
      draw();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
      requestRef.current += 1;
    };
  }, [chart, reactId, isArabic]);

  return (
    <figure
      dir="ltr"
      className="diagram my-6 overflow-x-auto rounded-lg border border-border bg-card p-4 [&_.nodeLabel]:[unicode-bidi:plaintext] [&_.edgeLabel]:[unicode-bidi:plaintext]"
    >
      {error ? (
        <div>
          <p className="mb-2 text-sm font-medium text-red-500">
            Could not render this diagram.
          </p>
          <pre className="bg-code-bg rounded-lg p-4 overflow-x-auto text-sm">
            <code>{chart}</code>
          </pre>
        </div>
      ) : svg ? (
        <div
          role="img"
          aria-label={label}
          className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div
          role="status"
          aria-label={`Loading ${label.toLowerCase()}`}
          className="h-24 animate-pulse rounded bg-background-secondary"
        />
      )}
      {!error && <figcaption className="sr-only">{label}</figcaption>}
    </figure>
  );
}
