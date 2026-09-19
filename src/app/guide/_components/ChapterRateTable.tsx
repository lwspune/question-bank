import { cn } from "@/lib/utils";

/** A year column, carrying the divisor its rates were computed with. */
export type RateColumn = {
  year: number;
  /** Papers behind this column. A column of 1 is a single paper, not a trend. */
  shifts: number;
};

/** One chapter's per-paper rate in each column. */
export type RateRow = {
  chapter: string;
  total: number;
  /** Aligned 1:1 to `columns`. */
  rates: number[];
};

type Props = {
  columns: RateColumn[];
  rows: RateRow[];
  /**
   * Columns with at most this many papers are rendered muted and labelled as
   * unreadable. MHT-CET's 2021 and 2022 are one paper each, and a single
   * paper's chapter mix is that paper, not the exam's shape.
   */
  noiseFloor?: number;
};

/**
 * Chapter × year table of QUESTIONS PER PAPER.
 *
 * WHY RATES AND NOT COUNTS. MHT-CET runs wildly uneven shift counts per year
 * (17 in 2023, 14 in 2025), so a raw count cannot be compared across columns:
 * a chapter with 34 questions in 2023 and 28 in 2025 sat at exactly 2.0 a
 * paper in both and did not move at all. Every cell here is already divided by
 * its own column's paper count, which is the only figure that compares.
 *
 * WHY A SINGLE-PAPER COLUMN IS MUTED rather than dropped. Dropping it would
 * hide questions that are really in the bank; printing it plainly invites a
 * reader to draw a five-point trend line through two points that are noise.
 * Muted-and-labelled is the honest middle: the data is there, and the column
 * says it cannot carry a trend.
 *
 * A 0.00 IS A MEASURED ZERO, never missing data — the whole point of the page
 * is a chapter that ran a question a paper and then stopped appearing.
 */
export default function ChapterRateTable({
  columns,
  rows,
  noiseFloor = 1,
}: Props) {
  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-[560px] text-sm">
          <caption className="sr-only">
            Questions per paper by chapter and year. Each column is divided by
            that year&rsquo;s own paper count. Columns with a single paper are
            muted because they cannot be read as a trend.
          </caption>
          <thead className="bg-muted/40">
            <tr className="border-b">
              <th
                rowSpan={2}
                scope="col"
                className="sticky left-0 z-10 bg-muted/40 px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                Chapter
              </th>
              {columns.map((c) => (
                <th
                  key={c.year}
                  scope="col"
                  className={cn(
                    "border-l px-3 py-1.5 text-center text-xs font-semibold tabular-nums",
                    c.shifts <= noiseFloor
                      ? "text-muted-foreground/50"
                      : "text-muted-foreground"
                  )}
                >
                  {c.year}
                </th>
              ))}
            </tr>
            <tr className="border-b">
              {columns.map((c) => (
                <th
                  key={c.year}
                  scope="col"
                  title={
                    c.shifts <= noiseFloor
                      ? `${c.shifts} paper — too few to read as a trend`
                      : `${c.shifts} papers`
                  }
                  className={cn(
                    "border-l px-3 py-1 text-center text-[11px] font-normal tabular-nums",
                    c.shifts <= noiseFloor
                      ? "text-muted-foreground/50"
                      : "text-muted-foreground/80"
                  )}
                >
                  {c.shifts <= noiseFloor ? `n=${c.shifts} ·` : `n=${c.shifts}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const max = Math.max(...row.rates);
              return (
                <tr key={row.chapter} className="border-b last:border-b-0">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 whitespace-nowrap bg-card px-3 py-1.5 text-left text-xs font-medium"
                  >
                    {row.chapter}
                  </th>
                  {row.rates.map((rate, i) => {
                    const intensity = max === 0 ? 0 : Math.round((rate / max) * 5);
                    const noisy = columns[i].shifts <= noiseFloor;
                    return (
                      <td
                        key={columns[i].year}
                        className={cn(
                          "border-l px-3 py-1.5 text-center tabular-nums",
                          // A muted column keeps its number but never its
                          // emphasis — it must not draw the eye into a trend.
                          noisy && "text-muted-foreground/50",
                          !noisy && intensity === 0 && "text-muted-foreground/50",
                          !noisy && intensity === 1 && "bg-brand-accent/[0.06]",
                          !noisy && intensity === 2 && "bg-brand-accent/[0.11]",
                          !noisy && intensity === 3 && "bg-brand-accent/[0.17]",
                          !noisy && intensity === 4 && "bg-brand-accent/[0.24]",
                          !noisy &&
                            intensity === 5 &&
                            "bg-brand-accent/[0.30] font-semibold text-brand-accent"
                        )}
                      >
                        {rate.toFixed(2)}
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
                Whole paper
              </th>
              {columns.map((c, i) => (
                <td
                  key={c.year}
                  className="border-l bg-muted/40 px-3 py-2 text-center font-semibold tabular-nums text-muted-foreground"
                >
                  {rows
                    .reduce((sum, r) => sum + r.rates[i], 0)
                    .toFixed(1)}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Mobile-only "more →" affordance, matching ExamPaperMatrix. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-8 rounded-r-md bg-gradient-to-l from-background to-transparent sm:hidden"
        aria-hidden
      />
    </div>
  );
}
