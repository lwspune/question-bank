import Link from "next/link";
import { CalendarDays, Flame } from "lucide-react";
import { planViews } from "@/lib/homework/links";

const ICONS = { top: Flame, days: CalendarDays } as const;

/**
 * A plan's two views: its chapters' Top 10 PYQs, then its days (owner,
 * 2026-11-24: Top 10 first, and the plan opens on it; the order is
 * planViews in lib/homework/links). Links, not a client switch: each view is
 * its own cached page with its own address, and a teacher can share either.
 */
export default function PlanTabs({ planSlug, active }: { planSlug: string; active: "days" | "top" }) {
  const tabs = planViews(planSlug).map((v) => ({ ...v, Icon: ICONS[v.id] }));
  return (
    <nav aria-label="Plan views" className="mt-6 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
      {tabs.map(({ id, label, href, Icon }) => {
        const on = id === active;
        return (
          <Link
            key={id}
            href={href}
            aria-current={on ? "page" : undefined}
            className={
              "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
              (on ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
