/**
 * Static figure: the four plots that tell zero order from first order
 * (concept jckin-order-graphs), side by side, with the straight one in each
 * row picked out.
 *
 * - [A] against t: zero order straight (slope −k); first order a falling
 *   curve that never reaches zero.
 * - ln[A] against t: zero order a curve bending downward; first order
 *   straight (slope −k).
 * - Rate against [A]: zero order horizontal (rate = k); first order a line
 *   through the origin (slope k).
 * - t½ against [A]₀: zero order a line through the origin (t½ = [A]₀/2k);
 *   first order horizontal (t½ = 0.693/k).
 *
 * Both reactions start at [A]₀ = 1 and fall to 0.2 over the plotted time.
 * Server component, pure SVG. Pinned by tests/notes-jee-visuals-chem.test.ts.
 */

export const ZERO = { A0: 1, k: 0.8 } as const;
export const FIRST = { A0: 1, k: 1.6 } as const;
/** Time span plotted (arbitrary units). */
export const T_END = 1;

export type Order = "zero" | "first";
export type PlotId = "conc" | "lnConc" | "rate" | "halfLife";

/** One mini plot: its points (x, y) and whether the concept calls it a straight line. */
export function plotPoints(id: PlotId, order: Order, samples = 40): { x: number; y: number }[] {
  return Array.from({ length: samples + 1 }, (_, i) => {
    const f = i / samples;
    if (id === "conc" || id === "lnConc") {
      const t = f * T_END;
      const a = order === "zero" ? ZERO.A0 - ZERO.k * t : FIRST.A0 * Math.exp(-FIRST.k * t);
      return { x: t, y: id === "conc" ? a : Math.log(a) };
    }
    if (id === "rate") {
      const a = f * 1; // [A] from 0 to 1
      return { x: a, y: order === "zero" ? ZERO.k : FIRST.k * a };
    }
    const a0 = f * 1; // [A]₀ from 0 to 1
    return { x: a0, y: order === "zero" ? a0 / (2 * ZERO.k) : 0.693 / FIRST.k };
  });
}

export type MiniPlot = {
  id: PlotId;
  order: Order;
  straight: boolean;
  verdict: string;
};

export const ROWS: readonly { id: PlotId; title: string; yLabel: string; xLabel: string }[] = [
  { id: "conc", title: "[A] against t", yLabel: "[A]", xLabel: "t" },
  { id: "lnConc", title: "ln[A] against t", yLabel: "ln[A]", xLabel: "t" },
  { id: "rate", title: "Rate against [A]", yLabel: "rate", xLabel: "[A]" },
  { id: "halfLife", title: "Half-life against [A]₀", yLabel: "t½", xLabel: "[A]₀" },
];

export const PLOTS: readonly MiniPlot[] = [
  { id: "conc", order: "zero", straight: true, verdict: "straight, slope −k" },
  { id: "conc", order: "first", straight: false, verdict: "curve, never reaches 0" },
  { id: "lnConc", order: "zero", straight: false, verdict: "curve, bends down" },
  { id: "lnConc", order: "first", straight: true, verdict: "straight, slope −k" },
  { id: "rate", order: "zero", straight: true, verdict: "horizontal: rate = k" },
  { id: "rate", order: "first", straight: true, verdict: "through origin, slope k" },
  { id: "halfLife", order: "zero", straight: true, verdict: "through origin" },
  { id: "halfLife", order: "first", straight: true, verdict: "horizontal: 0.693/k" },
];

// Geometry (viewBox units).
export const COL_X = { zero: { x0: 46, x1: 146 }, first: { x0: 196, x1: 296 } } as const;
export const ROW_TOP = [26, 104, 182, 260] as const;
const PLOT_TOP = 16;
const PLOT_H = 44;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** y range drawn for a mini plot: includes 0 for the rate and half-life rows, so a flat line sits at its height. */
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
  const tone = plot.straight ? "stroke-emerald-600 dark:stroke-emerald-400" : "stroke-muted-foreground";
  const textTone = plot.straight ? "fill-emerald-700 dark:fill-emerald-300" : "fill-muted-foreground";
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
      <text x={(col.x0 + col.x1) / 2 - 6} y={bottom + 11} textAnchor="middle" className={`${textTone} text-[10px] font-semibold`}>
        {plot.verdict}
      </text>
    </g>
  );
}

export default function JeeReactionOrderPlots() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reading the order from the shape of a graph
      </p>

      <svg
        viewBox="0 0 320 340"
        className="block h-auto w-full"
        role="img"
        aria-label="Four rows of plots, zero order on the left and first order on the right. Concentration against time: a straight falling line for zero order, a falling curve for first order. Natural log of concentration against time: a curve bending down for zero order, a straight falling line for first order. Rate against concentration: horizontal for zero order, a line through the origin for first order. Half-life against initial concentration: a line through the origin for zero order, horizontal for first order."
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
        Zero order: [A] = [A]₀ − kt, so [A] against t is the straight plot. First order: ln[A] = ln[A]₀ − kt, so ln[A] against t is
        the straight plot. Find the straight one first; its slope gives k.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Green: a straight line. A horizontal rate line means zero order; a horizontal [A] line would mean nothing is reacting, so
        read the axis label first.
      </p>
    </div>
  );
}
