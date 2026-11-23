/**
 * Static figure: a week's output as bars against the average line (concept
 * sscdiav-above). The concept's worked example: 62, 48, 75, 55, 70, 58, 66
 * from Monday to Sunday. Total 434, average 434 ÷ 7 = 62. Above it:
 * Wednesday, Friday and Sunday (3 days); Monday is exactly 62, neither above
 * nor below. The gaps balance: 13 + 8 + 4 = 14 + 7 + 4 = 25.
 * Server component. Pinned by tests/notes-w2-18.test.ts.
 */

/** The worked example. */
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const OUTPUT = [62, 48, 75, 55, 70, 58, 66] as const;

export const TOTAL = OUTPUT.reduce((s, v) => s + v, 0);
export const AVERAGE = TOTAL / OUTPUT.length;
export const GAPS = OUTPUT.map((v) => v - AVERAGE);
export type Side = "above" | "below" | "on";
export const sideOf = (gap: number): Side => (gap > 0 ? "above" : gap < 0 ? "below" : "on");
export const DAYS_ABOVE = DAYS.filter((_, i) => GAPS[i] > 0);

// Geometry (viewBox units): bars from 0, 2 units per unit of output.
export const PX_PER_UNIT = 2;
export const BASE_Y = 190;
export const PLOT_LEFT = 44;
export const SLOT = 38;
const BAR_W = 24;
export const barX = (i: number) => PLOT_LEFT + i * SLOT + (SLOT - BAR_W) / 2;
export const valueY = (v: number) => BASE_Y - v * PX_PER_UNIT;
export const AVG_Y = valueY(AVERAGE);

const BAR: Record<Side, string> = {
  above: "fill-emerald-400/80 dark:fill-emerald-600/80",
  below: "fill-rose-300/80 dark:fill-rose-700/70",
  on: "fill-slate-300 dark:fill-slate-600",
};
const GAP_TEXT: Record<Side, string> = {
  above: "fill-emerald-700 dark:fill-emerald-300",
  below: "fill-rose-700 dark:fill-rose-300",
  on: "fill-muted-foreground",
};
const gapText = (g: number) => (g > 0 ? `+${g}` : g < 0 ? `−${-g}` : "0");

export default function SscAboveAverage() {
  const plotRight = PLOT_LEFT + SLOT * DAYS.length;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · above, below or on the average
      </p>
      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="A bar chart of a machine's output from Monday to Sunday: 62, 48, 75, 55, 70, 58 and 66, with a dashed line at the average, 62. Wednesday, Friday and Sunday are above the line by 13, 8 and 4. Tuesday, Thursday and Saturday are below it by 14, 7 and 4. Monday is exactly on the line. The gaps above and below both add to 25."
      >
        <line x1={PLOT_LEFT} y1={BASE_Y} x2={plotRight} y2={BASE_Y} strokeWidth={1.2} className="stroke-foreground" />
        {OUTPUT.map((v, i) => {
          const side = sideOf(GAPS[i]);
          const x = barX(i);
          return (
            <g key={DAYS[i]}>
              <rect x={x} y={valueY(v)} width={BAR_W} height={v * PX_PER_UNIT} className={BAR[side]} />
              <text x={x + BAR_W / 2} y={valueY(v) - 4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                {v}
              </text>
              <text x={x + BAR_W / 2} y={BASE_Y + 13} textAnchor="middle" className="fill-foreground text-[10px]">
                {DAYS[i]}
              </text>
              <text x={x + BAR_W / 2} y={BASE_Y + 27} textAnchor="middle" className={`text-[10px] font-semibold ${GAP_TEXT[side]}`}>
                {gapText(GAPS[i])}
              </text>
            </g>
          );
        })}
        <line x1={PLOT_LEFT - 4} y1={AVG_Y} x2={plotRight} y2={AVG_Y} strokeWidth={1.5} strokeDasharray="5 3" className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={PLOT_LEFT - 6} y={AVG_Y - 3} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          avg
        </text>
        <text x={PLOT_LEFT - 6} y={AVG_Y + 9} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          62
        </text>
        <text x={PLOT_LEFT - 6} y={BASE_Y + 27} textAnchor="end" className="fill-muted-foreground text-[10px]">
          gap
        </text>

        <text x={160} y={238} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Total 434 ÷ 7 = 62. Above: Wed, Fri, Sun, so 3 days
        </text>
        <text x={160} y={254} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Gaps balance: 13 + 8 + 4 = 14 + 7 + 4 = 25
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Green bars are above the average, red bars below it, and Monday&apos;s grey bar is exactly 62: on the average, so it
        counts as neither above nor below.
      </p>
    </div>
  );
}
