import { cn } from "@/lib/utils";
import type {
  ExamPaper,
  ExamMatrixRow,
} from "../nda-maths/_data/trends";

type Props = {
  papers: ExamPaper[];
  rows: ExamMatrixRow[];
};

/**
 * Chapter × exam-paper matrix. One column per individual sitting (18 papers),
 * grouped under a year header with an Apr/Sep ("1"/"2" = NDA-1/NDA-2) sub-row.
 * Cells are tinted by magnitude *within the row* so the eye reads each
 * chapter's per-paper rhythm without a chart. A footer row shows each column
 * summing to 120 — the visual proof the table is complete.
 *
 * Wide by nature: horizontal scroll on mobile, chapter column sticks left.
 */
export default function ExamPaperMatrix({ papers, rows }: Props) {
  // Year-group spans so the top header can colspan each year's paper pair.
  const yearGroups: { year: number; span: number }[] = [];
  for (const p of papers) {
    const last = yearGroups[yearGroups.length - 1];
    if (last && last.year === p.year) last.span += 1;
    else yearGroups.push({ year: p.year, span: 1 });
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-[820px] text-xs">
          <thead className="bg-muted/40">
            {/* Year group row */}
            <tr className="border-b">
              <th
                rowSpan={2}
                className="sticky left-0 z-10 bg-muted/40 px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                Chapter
              </th>
              {yearGroups.map((g) => (
                <th
                  key={g.year}
                  colSpan={g.span}
                  className="border-l px-2 py-1.5 text-center text-xs font-semibold tabular-nums text-muted-foreground"
                >
                  {`'${String(g.year).slice(2)}`}
                </th>
              ))}
            </tr>
            {/* Sitting (NDA-1 / NDA-2) sub-row */}
            <tr className="border-b">
              {papers.map((p, i) => {
                const newYear = i === 0 || papers[i - 1].year !== p.year;
                return (
                  <th
                    key={p.id}
                    title={p.sitting === "1" ? "NDA-1 (April)" : "NDA-2 (September)"}
                    className={cn(
                      "px-2 py-1 text-center text-[11px] font-medium tabular-nums text-muted-foreground/80",
                      newYear && "border-l"
                    )}
                  >
                    {p.sitting}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const max = Math.max(...row.counts);
              return (
                <tr key={row.chapter} className="border-b last:border-b-0">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-card px-3 py-1.5 text-left text-xs font-medium whitespace-nowrap"
                  >
                    {row.chapter}
                  </th>
                  {row.counts.map((v, i) => {
                    const newYear = i === 0 || papers[i - 1].year !== papers[i].year;
                    const intensity = max === 0 ? 0 : Math.round((v / max) * 5);
                    return (
                      <td
                        key={papers[i].id}
                        className={cn(
                          "px-2 py-1.5 text-center tabular-nums",
                          newYear && "border-l",
                          intensity === 0 && "text-muted-foreground/40",
                          intensity === 1 && "bg-brand-accent/[0.06]",
                          intensity === 2 && "bg-brand-accent/[0.11]",
                          intensity === 3 && "bg-brand-accent/[0.17]",
                          intensity === 4 && "bg-brand-accent/[0.24]",
                          intensity === 5 &&
                            "bg-brand-accent/[0.30] font-semibold text-brand-accent"
                        )}
                      >
                        {v}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot className="border-t-2">
            <tr>
              <th
                scope="row"
                className="sticky left-0 z-10 bg-muted/40 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Paper total
              </th>
              {papers.map((p, i) => {
                const newYear = i === 0 || papers[i - 1].year !== p.year;
                const colSum = rows.reduce((a, r) => a + r.counts[i], 0);
                return (
                  <td
                    key={p.id}
                    className={cn(
                      "bg-muted/40 px-2 py-2 text-center font-semibold tabular-nums text-muted-foreground",
                      newYear && "border-l"
                    )}
                  >
                    {colSum}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Mobile-only "more →" affordance — the table scrolls horizontally on
          narrow screens; the fade hints there's more to the right. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-8 rounded-r-md bg-gradient-to-l from-background to-transparent sm:hidden"
        aria-hidden
      />
    </div>
  );
}
