import { ChevronRight, Target } from "lucide-react";
import type { ConceptWeightGroup } from "@/lib/notes/conceptWeight";

export type { ConceptWeightGroup };

type Props = {
  groups: ConceptWeightGroup[];
  /** Chapter's distinct PUBLIC PYQ count — the % denominator + summary figure. */
  chapterTotalPyqs: number;
};

/**
 * Chapter-wide "PYQ weightage by concept" — the high-yield triage map at
 * concept granularity. Every concept across all subtopics in one collapsible
 * table, grouped by subtopic, sorted high-yield-first, each with its share of
 * the chapter's PYQs. Foundations (0 tagged PYQs) render muted so the table
 * matches the notes exactly while signalling "not bank-tested".
 *
 * Native <details>/<summary> so it stays a server component (no client JS,
 * keyboard-accessible, collapsed by default to keep the landing lean). Concept
 * names are plain-text fields — no KatexRenderer needed.
 */
export default function ConceptWeightTable({ groups, chapterTotalPyqs }: Props) {
  const totalConcepts = groups.reduce((a, g) => a + g.concepts.length, 0);
  if (totalConcepts === 0) return null;

  // Scale the inline weight bars to the chapter's heaviest concept so the
  // small per-concept percentages still read at a glance.
  const maxPct = Math.max(
    1,
    ...groups.flatMap((g) => g.concepts.map((c) => c.pct))
  );

  return (
    <details className="group mt-12 rounded-lg border bg-card">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg p-5 hover:bg-accent/40">
        <Target className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div className="flex-1">
          <h2 className="text-lg font-semibold tracking-tight">
            PYQ weightage by concept
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {totalConcepts} concepts · {chapterTotalPyqs} PYQs — where the marks
            actually sit, so you know what to drill first
          </p>
        </div>
        <ChevronRight
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
          aria-hidden
        />
      </summary>

      <div className="space-y-6 border-t p-5">
        {groups.map((g) => (
          <div key={g.subtopicHref}>
            <a
              href={g.subtopicHref}
              className="inline-flex items-center gap-1 text-sm font-semibold tracking-tight text-foreground hover:text-primary"
            >
              {g.subtopicTitle}
              <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
            </a>
            <span className="ml-2 text-[11px] text-muted-foreground tabular-nums">
              {g.count} PYQs · {g.pct}%
            </span>

            <table className="mt-2 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="py-1.5 pr-2 text-left font-semibold">Concept</th>
                  <th className="w-16 py-1.5 px-2 text-right font-semibold">PYQs</th>
                  <th className="w-40 py-1.5 pl-2 text-left font-semibold">Share</th>
                </tr>
              </thead>
              <tbody>
                {g.concepts.map((c) => (
                  <tr
                    key={c.slug}
                    className={`border-b border-border/50 ${
                      c.isFoundation ? "text-muted-foreground/60" : ""
                    }`}
                  >
                    <td className="py-1.5 pr-2">
                      {c.name}
                      {c.isFoundation && (
                        <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          foundation
                        </span>
                      )}
                    </td>
                    <td className="py-1.5 px-2 text-right tabular-nums">
                      {c.isFoundation ? "—" : c.count}
                    </td>
                    <td className="py-1.5 pl-2">
                      {c.isFoundation ? (
                        <span className="text-xs text-muted-foreground/60">—</span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                            <span
                              className="block h-full rounded-full bg-primary/70"
                              style={{ width: `${Math.round((c.pct / maxPct) * 100)}%` }}
                            />
                          </span>
                          <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                            {c.pct}%
                          </span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </details>
  );
}
