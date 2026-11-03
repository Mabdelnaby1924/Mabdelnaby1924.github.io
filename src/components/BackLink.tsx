import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-accent transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
    >
      <ArrowLeft size={14} className="rtl:rotate-180 transition-transform" />
      {label}
    </Link>
  );
}
