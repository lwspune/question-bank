import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import type { HomeworkPlanSummary } from "@/lib/homework/query";
import { planHref } from "@/lib/homework/links";

/** One plan in a list of plans: /homework and an exam's homework page. */
export default function PlanCard({ plan }: { plan: HomeworkPlanSummary }) {
  return (
    <Link
      href={planHref(plan.slug)}
      className="group flex h-full items-center justify-between gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-brand-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="min-w-0">
        <p className="font-semibold leading-snug group-hover:text-brand-accent">{plan.title}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          {plan.questions.toLocaleString("en-IN")} questions · {plan.perDay} a day
          {plan.chapters > 0 ? ` · ${plan.chapters} chapters` : ""}
        </p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  );
}
