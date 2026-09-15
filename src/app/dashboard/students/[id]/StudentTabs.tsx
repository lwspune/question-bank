import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The header shared by the two per-student surfaces: identity, a back-link, and
 * a tab strip.
 *
 * Shared rather than duplicated because the two pages sit at different widths
 * (the profile is a `max-w-3xl` field list, performance needs `max-w-5xl` for
 * the accordion) and a copy-pasted header is how the two silently drift into
 * different names, different back-links, and a tab that forgets to highlight.
 */
export default function StudentTabs({
  id,
  name,
  active,
}: {
  id: string;
  name: string;
  active: "profile" | "performance";
}) {
  const tabs = [
    { key: "profile" as const, label: "Profile", href: `/dashboard/students/${id}` },
    {
      key: "performance" as const,
      label: "Performance",
      href: `/dashboard/students/${id}/performance`,
    },
  ];

  return (
    <div>
      <Link
        prefetch={false}
        href="/dashboard/students"
        className="rounded text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        ← All students
      </Link>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{name}</h1>
      <nav aria-label="Student views" className="mt-4 flex gap-1 border-b">
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
    </div>
  );
}
