import Link from "next/link";
import { CalendarDays, Flame } from "lucide-react";
import { planHref, topListHref } from "@/lib/homework/links";

/**
 * A plan's two views (2026-11-04): its days, and its chapters' Top 10 PYQs.
 * Links, not a client switch: each view is its own cached page with its own
 * address, so the days stay on the first screen however many chapters a plan
 * has (NDA Maths has 31), and a teacher can share either one.
 */
export default function PlanTabs({ planSlug, active }: { planSlug: string; active: "days" | "top" }) {
  const tabs = [
    { id: "days" as const, label: "Daily homework", href: planHref(planSlug), Icon: CalendarDays },
    { id: "top" as const, label: "Top 10 PYQs", href: topListHref(planSlug), Icon: Flame },
  ];
  return (
    <nav aria-label="Homework views" className="mt-6 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
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
