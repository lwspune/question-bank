import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * An underlined row of page tabs, each a plain link to its own page.
 *
 * Shared by the staff view of a student (Profile · Performance · Their /me)
 * and the student's own Home · Performance · Account (2026-11-08), so the two
 * look and behave the same. Not prefetched: every tab is a per-user server
 * render, and /performance is the page that took itself down when its links
 * were prefetched (2026-09-15).
 */
export type Tab<K extends string> = { key: K; label: string; href: string };

export default function TabStrip<K extends string>({
  label,
  tabs,
  active,
}: {
  /** What the row is, for a screen reader: "Student views", "Your pages". */
  label: string;
  tabs: readonly Tab<K>[];
  active: K;
}) {
  return (
    <nav aria-label={label} className="flex gap-1 border-b">
      {tabs.map((t) => {
        const current = t.key === active;
        return (
          <Link
            prefetch={false}
            key={t.key}
            href={t.href}
            // aria-current is what tells a screen reader which view is open;
            // the underline alone conveys it only to sighted users.
            aria-current={current ? "page" : undefined}
            className={cn(
              "-mb-px rounded-t border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              current
                ? "border-brand-accent text-brand-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
