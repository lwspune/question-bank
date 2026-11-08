import Link from "next/link";
import TabStrip from "@/components/TabStrip";

/**
 * The header shared by the per-student surfaces: identity, a back-link, and
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
  active: "profile" | "performance" | "me";
}) {
  const tabs = [
    { key: "profile" as const, label: "Profile", href: `/dashboard/students/${id}` },
    {
      key: "performance" as const,
      label: "Performance",
      href: `/dashboard/students/${id}/performance`,
    },
    // Their /me as they see it, read only (2026-11-07).
    { key: "me" as const, label: "Their /me", href: `/dashboard/students/${id}/me` },
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
      <div className="mt-4">
        <TabStrip label="Student views" tabs={tabs} active={active} />
      </div>
    </div>
  );
}
