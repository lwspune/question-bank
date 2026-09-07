import Link from "next/link";
import { Clock, FileText, Trophy } from "lucide-react";
import type { MockGroup } from "@/lib/mocks/catalogue";

function fmtMins(secs: number) {
  return `${Math.round(secs / 60)} min`;
}

/**
 * A grouped list of mock cards — the body of every /mock/exam/[slug]/[type]
 * page.
 *
 * GROUPING IS THE CALLER'S JOB, not this component's. It used to group by exam
 * and then by year itself, which was right while every mock was a real sitting
 * and wrong the moment they were not: an assembled paper has no year, so the
 * key differs per type (year · paper · section). Those rules are pure and
 * per-type, so they live in src/lib/mocks/catalogue.ts where a unit test can
 * reach them — this file only draws what it is handed.
 */
export default function MockCatalogueList({
  groups,
  emptyMessage = "No mock tests published yet — check back soon.",
  showSourceBadge = false,
}: {
  groups: MockGroup[];
  emptyMessage?: string;
  /**
   * Print "Past paper" / "Practice" on each card.
   *
   * Off by default because a type's own page already says which it is, and a
   * badge repeated on all 36 cards is noise. ON for sectional tests, where the
   * two sources genuinely mix in one list and the badge is the only thing
   * telling them apart.
   */
  showSourceBadge?: boolean;
}) {
  if (groups.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.key}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {group.label}
            <span className="ml-2 font-normal normal-case tabular-nums">
              {group.items.length}
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.items.map((m) => (
              <Link
                key={m.slug}
                href={`/mock/${m.slug}`}
                className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-brand-accent/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug group-hover:text-brand-accent">
                    {m.title}
                  </h3>
                  {showSourceBadge && (
                    <span className="mt-0.5 shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {m.source === "pyq" ? "Past paper" : "Practice"}
                    </span>
                  )}
                </div>
                <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <div className="inline-flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" aria-hidden />
                    {m.totalQuestions} questions
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5" aria-hidden />
                    {m.totalMarks} marks
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {fmtMins(m.durationSecs)}
                  </div>
                </dl>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
