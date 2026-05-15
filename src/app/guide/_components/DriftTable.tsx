import { cn } from "@/lib/utils";
import type { DriftRow } from "../nda-maths/_data/trends";

type Props = {
  rows: DriftRow[];
  years: readonly number[];
};

/**
 * Year-by-principle drift table. Each cell is a count; cells are tinted by
 * relative magnitude within the row (heavier = more saturated) so the eye
 * picks up rises/declines without a chart library.
 *
 * Horizontal scroll on mobile (header sticks to the left); fits comfortably
 * on desktop.
 */
export default function DriftTable({ rows, years }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="sticky left-0 z-10 bg-muted/40 px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Principle
            </th>
            {years.map((y) => (
              <th
                key={y}
                className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide tabular-nums text-muted-foreground"
              >
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const values = years.map(
              (y) => row.counts[y as keyof typeof row.counts]
            );
            const max = Math.max(...values);
            return (
              <tr key={row.principle} className="border-b last:border-b-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-3 py-2 text-left text-sm font-medium"
                >
                  {row.principle}
                </th>
                {years.map((y) => {
                  const v = row.counts[y as keyof typeof row.counts];
                  const intensity = max === 0 ? 0 : Math.round((v / max) * 5);
                  return (
                    <td
                      key={y}
                      className={cn(
                        "px-3 py-2 text-right tabular-nums",
                        intensity === 0 && "text-muted-foreground/60",
                        intensity === 1 && "bg-primary/[0.04]",
                        intensity === 2 && "bg-primary/[0.08]",
                        intensity === 3 && "bg-primary/[0.12]",
                        intensity === 4 && "bg-primary/[0.18]",
                        intensity === 5 &&
                          "bg-primary/[0.25] font-semibold text-primary"
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
      </table>
    </div>
  );
}
