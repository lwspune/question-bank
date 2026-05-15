import { cn } from "@/lib/utils";
import type { DistractorCell } from "../nda-maths/_data/traps";

type Props = {
  cells: DistractorCell[];
  /** Column header for the rate column. Defaults to "Sign-flip rate" for
   *  back-compat; pass "Factor-of-2 rate" etc. for other trap categories. */
  rateLabel?: string;
};

/**
 * Tabular heatmap: rows are (chapter, difficulty) slices, distractor % shown
 * with color intensity. Sorted desc — the worst offenders are at the top.
 * Reusable across trap categories via `rateLabel`.
 *
 * Not a chart — a styled table. Reads on mobile, prints clean, no chart-lib.
 */
export default function SignFlipHeatmap({ cells, rateLabel = "Sign-flip rate" }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/40">
          <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-3 py-2 font-medium">Chapter</th>
            <th className="px-3 py-2 font-medium">Difficulty</th>
            <th className="px-3 py-2 text-right font-medium">Sample size</th>
            <th className="px-3 py-2 text-right font-medium">{rateLabel}</th>
          </tr>
        </thead>
        <tbody>
          {cells.map((c) => {
            const intensity =
              c.pct >= 75
                ? "high"
                : c.pct >= 40
                  ? "mid"
                  : c.pct >= 20
                    ? "low"
                    : "min";
            return (
              <tr key={`${c.chapter}-${c.difficulty}`} className="border-b last:border-b-0">
                <td className="px-3 py-2 font-medium">{c.chapter}</td>
                <td className="px-3 py-2 text-xs">
                  <DifficultyPill level={c.difficulty} />
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                  {c.qCount} q
                </td>
                <td
                  className={cn(
                    "px-3 py-2 text-right font-semibold tabular-nums",
                    intensity === "high" &&
                      "bg-red-100 text-red-900 dark:bg-red-950/50 dark:text-red-200",
                    intensity === "mid" &&
                      "bg-orange-100 text-orange-900 dark:bg-orange-950/50 dark:text-orange-200",
                    intensity === "low" &&
                      "bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200",
                    intensity === "min" && "text-muted-foreground"
                  )}
                >
                  {c.pct}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DifficultyPill({ level }: { level: DistractorCell["difficulty"] }) {
  const map = {
    EASY: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    MODERATE:
      "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
    HARD: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
  } as const;
  return (
    <span className={cn("inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide", map[level])}>
      {level}
    </span>
  );
}
