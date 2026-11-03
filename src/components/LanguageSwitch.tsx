import Link from "next/link";
import { Languages } from "lucide-react";

interface LanguageSwitchProps {
  currentLang: "en" | "ar";
  alternateHref?: string;
  className?: string;
}

export function LanguageSwitch({
  currentLang,
  alternateHref,
  className = "",
}: LanguageSwitchProps) {
  if (!alternateHref) {
    return null;
  }

  const isArabic = currentLang === "ar";
  const targetLabel = isArabic ? "English" : "العربية";
  const targetLang = isArabic ? "en" : "ar";
  const targetDir = isArabic ? "ltr" : "rtl";

  return (
    <Link
      href={alternateHref}
      hrefLang={targetLang}
      lang={targetLang}
      dir={targetDir}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-border bg-card hover:bg-card-hover hover:border-accent text-foreground-secondary hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      aria-label={isArabic ? "Switch to English version" : "التبديل إلى النسخة العربية"}
    >
      <Languages size={13} className="text-foreground-muted" />
      <span>{targetLabel}</span>
    </Link>
  );
}

