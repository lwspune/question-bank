/**
 * Static figure: the five plots of the concept's table that tell a zero-order
 * reaction from a first-order one (concept nchck-plots), in its own notation
 * ([R], ln[R], log([R]₀/[R])).
 *
 * - [R] against t: zero order straight, falling, slope −k, intercept [R]₀;
 *   first order a curve falling more and more slowly.
 * - ln[R] against t: zero order a curve; first order straight, slope −k.
 * - log([R]₀/[R]) against t: zero order a curve; first order straight through
 *   the origin, slope k/2.303.
 * - Rate against [R]: zero order flat (rate = k); first order straight through
 *   the origin, slope k.
 * - Half-life against [R]₀: zero order straight through the origin, slope
 *   1/(2k); first order flat (t½ = 0.693/k).
 *
 * The two flat lines are the concept's trap: the same shape means a different
 * order on different axes. The first-order k is the self-check's 0.02 min⁻¹.
 * Server component, pure SVG. Pinned by tests/notes-w2-19.test.ts.
 */

/** Zero order: [R] = [R]₀ − kt over 0 to 40 min (falls to 0.2 of the start). */
export const ZERO = { R0: 1, k: 0.02 } as const;
/** First order: k = 0.02 min⁻¹, the concept's self-check. */
export const FIRST = { R0: 1, k: 0.02 } as const;
/** Time span plotted, min. */
export const T_END = { zero: 40, first: 80 } as const;

export type Order = "zero" | "first";
export type PlotId = "conc" | "lnConc" | "logRatio" | "rate" | "halfLife";

/** Concentration at time t for each order. */
export function concAt(order: Order, t: number): number {
  return order === "zero" ? ZERO.R0 - ZERO.k * t : FIRST.R0 * Math.exp(-FIRST.k * t);
}

/** One mini plot's points (x, y). */
export function plotPoints(id: PlotId, order: Order, samples = 40): { x: number; y: number }[] {
  return Array.from({ length: samples + 1 }, (_, i) => {
    const f = i / samples;
    if (id === "conc" || id === "lnConc" || id === "logRatio") {
      const t = f * T_END[order];
      const r = concAt(order, t);
      const R0 = order === "zero" ? ZERO.R0 : FIRST.R0;
      const y = id === "conc" ? r : id === "lnConc" ? Math.log(r) : Math.log10(R0 / r);
      return { x: t, y };
    }
    if (id === "rate") {
      const r = f; // [R] from 0 to 1
      return { x: r, y: order === "zero" ? ZERO.k : FIRST.k * r };
    }
    const r0 = f; // [R]₀ from 0 to 1
    return { x: r0, y: order === "zero" ? r0 / (2 * ZERO.k) : 0.693 / FIRST.k };
  });
}

export type MiniPlot = { id: PlotId; order: Order; straight: boolean; flat: boolean; verdict: string };

export const ROWS: readonly { id: PlotId; title: string; yLabel: string; xLabel: string }[] = [
  { id: "conc", title: "[R] against t", yLabel: "[R]", xLabel: "t" },
  { id: "lnConc", title: "ln[R] against t", yLabel: "ln[R]", xLabel: "t" },
  { id: "logRatio", title: "log([R]₀/[R]) against t", yLabel: "log", xLabel: "t" },
  { id: "rate", title: "Rate against [R]", yLabel: "rate", xLabel: "[R]" },
  { id: "halfLife", title: "Half-life against [R]₀", yLabel: "t½", xLabel: "[R]₀" },
];

export const PLOTS: readonly MiniPlot[] = [
  { id: "conc", order: "zero", straight: true, flat: false, verdict: "straight, slope −k" },
  { id: "conc", order: "first", straight: false, flat: false, verdict: "curve, slows down" },
  { id: "lnConc", order: "zero", straight: false, flat: false, verdict: "a curve" },
  { id: "lnConc", order: "first", straight: true, flat: false, verdict: "straight, slope −k" },
  { id: "logRatio", order: "zero", straight: false, flat: false, verdict: "a curve" },
  { id: "logRatio", order: "first", straight: true, flat: false, verdict: "through 0, slope k/2.303" },
  { id: "rate", order: "zero", straight: true, flat: true, verdict: "flat: rate = k" },
  { id: "rate", order: "first", straight: true, flat: false, verdict: "through 0, slope k" },
  { id: "halfLife", order: "zero", straight: true, flat: false, verdict: "through 0, slope 1/2k" },
  { id: "halfLife", order: "first", straight: true, flat: true, verdict: "flat: t½ = 0.693/k" },
];

// Geometry (viewBox units).
export const COL_X = { zero: { x0: 46, x1: 146 }, first: { x0: 196, x1: 296 } } as const;
export const ROW_TOP = [24, 96, 168, 240, 312] as const;
const PLOT_TOP = 16;
const PLOT_H = 38;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** y range drawn: from 0 for the rate and half-life rows, so a flat line sits at its height. */
function yRange(id: PlotId, pts: { y: number }[]): { min: number; max: number } {
  const ys = pts.map((p) => p.y);
  if (id === "rate" || id === "halfLife") return { min: 0, max: Math.max(...ys) * 1.25 };
  return { min: Math.min(...ys), max: Math.max(...ys) };
}

function Mini({ plot, rowIndex }: { plot: MiniPlot; rowIndex: number }) {
  const row = ROWS[rowIndex];
  const col = COL_X[plot.order];
  const top = ROW_TOP[rowIndex] + PLOT_TOP;
  const bottom = top + PLOT_H;
  const pts = plotPoints(plot.id, plot.order);
  const range = yRange(plot.id, pts);
  const xMax = Math.max(...pts.map((p) => p.x));
  const sx = (x: number) => r2(col.x0 + 4 + (x / xMax) * (col.x1 - col.x0 - 8));
  const sy = (y: number) => r2(bottom - 3 - ((y - range.min) / (range.max - range.min || 1)) * (PLOT_H - 6));
  const tone = plot.flat
    ? "stroke-amber-600 dark:stroke-amber-400"
    : plot.straight
      ? "stroke-emerald-600 dark:stroke-emerald-400"
      : "stroke-muted-foreground";
  const textTone = plot.flat
    ? "fill-amber-700 dark:fill-amber-300"
    : plot.straight
      ? "fill-emerald-700 dark:fill-emerald-300"
      : "fill-muted-foreground";
  return (
    <g>
      <line x1={col.x0} y1={bottom} x2={col.x1} y2={bottom} className="stroke-muted-foreground" />
      <line x1={col.x0} y1={bottom} x2={col.x0} y2={top} className="stroke-muted-foreground" />
      <text x={col.x0 - 3} y={top + 8} textAnchor="end" className="fill-muted-foreground text-[10px]">
        {row.yLabel}
      </text>
      <text x={col.x1 + 2} y={bottom + 3.5} className="fill-muted-foreground text-[10px]">
        {row.xLabel}
      </text>
      <polyline
        points={pts.map((p) => `${sx(p.x)},${sy(p.y)}`).join(" ")}
        fill="none"
        strokeWidth={plot.straight ? 2.5 : 1.8}
        strokeLinejoin="round"
        className={tone}
      />
      <text x={(col.x0 + col.x1) / 2} y={bottom + 11} textAnchor="middle" className={`${textTone} text-[10px] font-semibold`}>
        {plot.verdict}
      </text>
    </g>
  );
}

export default function NeetOrderPlots() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which plot is straight for each order
      </p>

      <svg
        viewBox="0 0 320 380"
        className="block h-auto w-full"
        role="img"
        aria-label="Five rows of plots, zero order on the left and first order on the right. R against time: straight and falling for zero order, a curve falling more and more slowly for first order. Natural log of R against time: a curve for zero order, straight with slope minus k for first order. Log of R nought over R against time: a curve for zero order, straight through the origin with slope k over 2.303 for first order. Rate against R: flat for zero order, straight through the origin for first order. Half-life against R nought: straight through the origin for zero order, flat for first order."
      >
        <text x={(COL_X.zero.x0 + COL_X.zero.x1) / 2} y={12} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          Zero order
        </text>
        <text x={(COL_X.first.x0 + COL_X.first.x1) / 2} y={12} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          First order
        </text>
        {ROWS.map((row, i) => (
          <g key={row.id}>
            <line x1={4} y1={ROW_TOP[i] + 2} x2={316} y2={ROW_TOP[i] + 2} strokeWidth={0.6} className="stroke-border" />
            <text x={160} y={ROW_TOP[i] + 13} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {row.title}
            </text>
            {PLOTS.filter((p) => p.id === row.id).map((p) => (
              <Mini key={p.order} plot={p} rowIndex={i} />
            ))}
          </g>
        ))}
      </svg>

      <p className="mt-2 text-sm text-foreground">
        Zero order: [R] = [R]₀ − kt, so [R] against t is straight. First order: ln[R] = ln[R]₀ − kt, so ln[R] against t is straight; a
        slope of −0.02 min⁻¹ there means k = 0.02 min⁻¹.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Green: a straight line. Amber: the two flat lines. Flat rate against [R] means zero order; flat half-life against [R]₀ means
        first order. Read the axes before the shape.
      </p>
    </div>
  );
}
