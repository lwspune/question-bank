import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * To fix · Saved, the Review tab's two lists. Plain links (each list is its own
 * server render), never prefetched: both are per-student renders, and a
 * prefetched per-student page is the 2026-09-15 /performance outage shape.
 */
export default function ReviewSwitch({
  list,
  fixCount,
  savedCount,
}: {
  list: "fix" | "saved";
  /** Null on the saved list, which does not read the mistake pool. */
  fixCount: number | null;
  savedCount: number;
}) {
  const item = (key: "fix" | "saved", href: string, label: string, count: number | null) => (
    <Link
      href={href}
      prefetch={false}
      aria-current={list === key ? "page" : undefined}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        list === key ? "bg-brand/10 text-brand-accent" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      {count !== null && <span className="tabular-nums opacity-80">{count.toLocaleString("en-IN")}</span>}
    </Link>
  );
  return (
    <nav aria-label="Which list" className="inline-flex rounded-full border bg-card p-1">
      {item("fix", "/review", "To fix", fixCount)}
      {item("saved", "/review?list=saved", "Saved", savedCount)}
    </nav>
  );
}
