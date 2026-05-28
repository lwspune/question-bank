import { AlertTriangle, BookCheck, ChevronRight, Sigma } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { DerivedSummary } from "@/lib/notes/deriveSummary";

export type RevisionGroup = {
  subtopicTitle: string;
  /** Full route to the subtopic page, e.g. /notes/nda-maths/statistics/dispersion. */
  subtopicHref: string;
  summary: DerivedSummary;
};

type Props = {
  groups: RevisionGroup[];
};

/**
 * Chapter-wide "Formula & revision sheet" — every formula and trap across
 * all subtopics in one collapsible panel, grouped by subtopic. The
 * exam-eve cheat-sheet: open it once, glance at everything, no bouncing
 * between subtopic pages.
 *
 * Native <details>/<summary> so it stays a server component (no client JS,
 * keyboard-accessible, collapsed by default to keep the landing lean).
 * Back-links point to the concept on its subtopic page (href#slug).
 *
 * Auto-derived via deriveSummary — same source of truth as the per-subtopic
 * SubtopicSummary, so it never drifts.
 */
export default function ChapterRevisionSheet({ groups }: Props) {
  const totalFormulas = groups.reduce((a, g) => a + g.summary.formulas.length, 0);
  const totalTraps = groups.reduce((a, g) => a + g.summary.traps.length, 0);
  if (totalFormulas === 0 && totalTraps === 0) return null;

  return (
    <details className="group mt-12 rounded-lg border bg-card">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg p-5 hover:bg-accent/40">
        <BookCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div className="flex-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Formula &amp; revision sheet
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {totalFormulas} formulas · {totalTraps} gotchas across all subtopics —
            the exam-eve cheat-sheet
          </p>
        </div>
        <ChevronRight
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
          aria-hidden
        />
      </summary>

      <div className="space-y-8 border-t p-5">
        {groups.map((g) => {
          if (
            g.summary.formulas.length === 0 &&
            g.summary.traps.length === 0
          ) {
            return null;
          }
          return (
            <div key={g.subtopicHref}>
              <a
                href={g.subtopicHref}
                className="inline-flex items-center gap-1 text-sm font-semibold tracking-tight text-foreground hover:text-primary"
              >
                {g.subtopicTitle}
                <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
              </a>

              {g.summary.formulas.length > 0 && (
                <div className="mt-3">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    <Sigma className="h-3 w-3" aria-hidden />
                    Formulas ({g.summary.formulas.length})
                  </p>
                  <ul className="space-y-2">
                    {g.summary.formulas.map((f, i) => (
                      <li
                        key={`${f.slug}-${i}`}
                        className="rounded-md border-l-4 border-primary/50 bg-primary/5 px-3 py-1.5"
                      >
                        <a
                          href={`${g.subtopicHref}#${f.slug}`}
                          className="text-[11px] font-medium text-muted-foreground hover:text-primary"
                        >
                          {f.conceptName} · {f.label}
                        </a>
                        <div className="mt-0.5 overflow-x-auto leading-tight [&_.katex]:max-w-full">
                          <KatexRenderer text={`\\[${f.latex}\\]`} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {g.summary.traps.length > 0 && (
                <div className="mt-3">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                    <AlertTriangle className="h-3 w-3" aria-hidden />
                    Watch out for ({g.summary.traps.length})
                  </p>
                  <ul className="space-y-1">
                    {g.summary.traps.map((t, i) => (
                      <li
                        key={`${t.slug}-${i}`}
                        className="flex flex-wrap items-baseline gap-x-2 rounded-md border-l-4 border-amber-500/60 bg-amber-50/40 dark:bg-amber-950/20 px-3 py-1 text-sm"
                      >
                        <div className="font-serif text-foreground">
                          <KatexRenderer text={t.title} />
                        </div>
                        <a
                          href={`${g.subtopicHref}#${t.slug}`}
                          className="ml-auto text-[11px] text-muted-foreground hover:text-amber-700 dark:hover:text-amber-300 whitespace-nowrap"
                        >
                          → {t.conceptName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </details>
  );
}
