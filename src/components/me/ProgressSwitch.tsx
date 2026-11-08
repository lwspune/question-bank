import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Papers · Chapters under the Progress tab (2026-11-08): /performance and
 * /me/map, each its own page. Never prefetched: both are per-student server
 * renders (the 2026-09-15 /performance outage was a prefetched link).
 */
export default function ProgressSwitch({ active }: { active: "papers" | "chapters" }) {
  const item = (key: "papers" | "chapters", href: string, label: string) => (
    <Link
      href={href}
      prefetch={false}
      aria-current={active === key ? "page" : undefined}
      className={cn(
        "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active === key ? "bg-brand/10 text-brand-accent" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
  return (
    <nav aria-label="Progress views" className="inline-flex rounded-full border bg-card p-1">
      {item("papers", "/performance", "Papers")}
      {item("chapters", "/me/map", "Chapters")}
    </nav>
  );
}
