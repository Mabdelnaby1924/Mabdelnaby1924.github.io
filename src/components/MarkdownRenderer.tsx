import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MermaidDiagram } from "./MermaidDiagram";

interface MarkdownRendererProps {
  content: string;
  lang?: string;
}

interface CodeElementProps {
  className?: string;
  children?: React.ReactNode;
}

const ARABIC_CHAR_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

const LATIN_RUN_REGEX =
  /(?<![A-Za-z0-9_])([/\\~%$@-]{0,2}[A-Za-z0-9]+(?:[.:@\\/%#&=?+~_-]+[A-Za-z0-9]+)*(?: [-A-Za-z0-9]+(?:[.:@\\/%#&=?+~_-]+[A-Za-z0-9]+)*)*[/\\%]?)(?![A-Za-z0-9_])/g;

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (React.isValidElement(node) && node.props && typeof node.props === "object") {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

function hasArabic(node: React.ReactNode): boolean {
  return ARABIC_CHAR_REGEX.test(extractText(node));
}

function isolateLatinInText(text: string): React.ReactNode {
  if (!text || !/[A-Za-z0-9]/.test(text)) {
    return text;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  LATIN_RUN_REGEX.lastIndex = 0;
  while ((match = LATIN_RUN_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const run = match[1];
    parts.push(
      <bdi key={`bdi-${match.index}`} dir="ltr">
        {run}
      </bdi>
    );
    lastIndex = match.index + run.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}

function transformDescendants(node: React.ReactNode): React.ReactNode {
  if (typeof node === "string") {
    return isolateLatinInText(node);
  }

  if (Array.isArray(node)) {
    return React.Children.map(node, transformDescendants);
  }

  if (React.isValidElement(node)) {
    const type = node.type;
    // Skip code blocks, pre, figures, scripts, styles
    if (
      type === "pre" ||
      type === "code" ||
      type === "figure" ||
      type === "script" ||
      type === "style" ||
      type === MermaidDiagram
    ) {
      return node;
    }

    if (node.props && typeof node.props === "object") {
      const props = node.props as { children?: React.ReactNode };
      if ("children" in props && props.children !== undefined) {
        return React.cloneElement(
          node as React.ReactElement<{ children?: React.ReactNode }>,
          undefined,
          transformDescendants(props.children)
        );
      }
    }
  }

  return node;
}

function createSlugger() {
  const counts = new Map<string, number>();
  return function slugify(node: React.ReactNode): string {
    const raw = extractText(node);
    const clean = raw
      .normalize("NFC")
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/gu, "")
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-");
    const base = clean || "section";
    const count = counts.get(base) || 0;
    counts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };
}

export function MarkdownRenderer({ content, lang = "en" }: MarkdownRendererProps) {
  const isArabic = lang === "ar";
  const slugger = createSlugger();

  return (
    <div className={`prose ${isArabic ? "prose-rtl" : ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const id = isArabic ? slugger(children) : undefined;
            return (
              <h1
                id={id}
                className="text-3xl font-bold text-foreground first:mt-0 mt-14 mb-6 text-start"
              >
                {isArabic ? transformDescendants(children) : children}
              </h1>
            );
          },
          h2: ({ children }) => {
            const id = isArabic ? slugger(children) : undefined;
            return (
              <h2
                id={id}
                className="text-2xl font-bold text-foreground mt-12 mb-5 pb-2 border-b border-border text-start"
              >
                {isArabic ? transformDescendants(children) : children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = isArabic ? slugger(children) : undefined;
            return (
              <h3
                id={id}
                className="text-xl font-semibold text-foreground mt-10 mb-4 text-start"
              >
                {isArabic ? transformDescendants(children) : children}
              </h3>
            );
          },
          h4: ({ children }) => {
            const id = isArabic ? slugger(children) : undefined;
            return (
              <h4
                id={id}
                className="text-lg font-semibold text-foreground mt-8 mb-3 text-start"
              >
                {isArabic ? transformDescendants(children) : children}
              </h4>
            );
          },
          p: ({ children }) => {
            if (isArabic) {
              const arabicPresent = hasArabic(children);
              if (!arabicPresent) {
                return (
                  <p
                    dir="ltr"
                    className="text-foreground-secondary leading-relaxed mb-4 text-start"
                  >
                    {children}
                  </p>
                );
              }
              return (
                <p className="text-foreground-secondary leading-relaxed mb-4 text-start">
                  {transformDescendants(children)}
                </p>
              );
            }
            return (
              <p className="text-foreground-secondary leading-relaxed mb-4">
                {children}
              </p>
            );
          },
          blockquote: ({ children }) => {
            if (isArabic) {
              const arabicPresent = hasArabic(children);
              return (
                <blockquote
                  dir={arabicPresent ? undefined : "ltr"}
                  className="border-is-4 border-accent ps-4 my-4 text-foreground-secondary italic text-start"
                >
                  {arabicPresent ? transformDescendants(children) : children}
                </blockquote>
              );
            }
            return (
              <blockquote className="border-l-4 border-accent pl-4 my-4 text-foreground-secondary italic">
                {children}
              </blockquote>
            );
          },
          ul: ({ children }) => {
            if (isArabic) {
              const arabicPresent = hasArabic(children);
              return (
                <ul
                  dir={arabicPresent ? undefined : "ltr"}
                  className="list-disc ps-6 space-y-2 mb-4 text-foreground-secondary"
                >
                  {children}
                </ul>
              );
            }
            return (
              <ul className="list-disc pl-6 space-y-2 mb-4 text-foreground-secondary">
                {children}
              </ul>
            );
          },
          ol: ({ children }) => {
            if (isArabic) {
              const arabicPresent = hasArabic(children);
              return (
                <ol
                  dir={arabicPresent ? undefined : "ltr"}
                  className="list-decimal ps-6 space-y-2 mb-4 text-foreground-secondary"
                >
                  {children}
                </ol>
              );
            }
            return (
              <ol className="list-decimal pl-6 space-y-2 mb-4 text-foreground-secondary">
                {children}
              </ol>
            );
          },
          li: ({ children }) => (
            <li className="leading-relaxed my-1 text-start">
              {isArabic ? transformDescendants(children) : children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {isArabic ? transformDescendants(children) : children}
            </a>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className={`${className ?? ""} text-sm`} dir="ltr">
                  {children}
                </code>
              );
            }
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-code-bg text-accent text-sm font-mono"
                dir="ltr"
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => {
            const child = Array.isArray(children) ? children[0] : children;
            if (
              React.isValidElement<CodeElementProps>(child) &&
              typeof child.props.className === "string" &&
              child.props.className.includes("language-mermaid")
            ) {
              const chart = String(child.props.children || "").replace(/\n$/, "");
              return <MermaidDiagram chart={chart} lang={lang} />;
            }

            return (
              <pre
                className="bg-code-bg rounded-lg p-4 overflow-x-auto mb-4 text-sm"
                dir="ltr"
              >
                {children}
              </pre>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4" dir={isArabic ? "rtl" : undefined}>
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b-2 border-border">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-start py-2 px-3 font-semibold text-foreground">
              {isArabic ? transformDescendants(children) : children}
            </th>
          ),
          td: ({ children }) => (
            <td className="py-2 px-3 border-b border-border text-foreground-secondary text-start">
              {isArabic ? transformDescendants(children) : children}
            </td>
          ),
          hr: () => <hr className="my-8 border-border" />,
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ""}
              className="rounded-lg my-4 max-w-full"
              loading="lazy"
            />
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {isArabic ? transformDescendants(children) : children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic">
              {isArabic ? transformDescendants(children) : children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
