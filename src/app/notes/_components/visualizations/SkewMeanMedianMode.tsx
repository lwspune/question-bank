/**
 * Static figure: a right-skewed distribution with Mode, Median, Mean marked
 * in order, showing the mean pulled toward the long tail.
 *
 * Pedagogical aim: fix the ordering Mode < Median < Mean for positive skew
 * (and its mirror for negative skew), the basis of the empirical relation
 * Mode ≈ 3·Median − 2·Mean. Server component — no client state.
 */

const W = 360;
const H = 240;
const PADL = 20;
const PADR = 16;
const BASE = 198;
const TOP = 40;
const T_MAX = 8;

const tToX = (t: number) => PADL + (t / T_MAX) * (W - PADL - PADR);
const f = (t: number) => t * t * Math.exp(-t); // gamma(3,1)-shaped, mode at t=2
const FMAX = 4 * Math.exp(-2);
const yToSvg = (y: number) => BASE - (y / FMAX) * (BASE - TOP);

const CURVE = Array.from({ length: 81 }, (_, i) => {
  const t = (i / 80) * T_MAX;
  return [tToX(t), yToSvg(f(t))] as const;
});
const curvePath = "M" + CURVE.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L");
const areaPath =
  `M${tToX(0).toFixed(1)},${BASE} ` +
  CURVE.map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") +
  ` L${tToX(T_MAX).toFixed(1)},${BASE} Z`;

const MARKS = [
  { t: 2, label: "Mode", cls: "text-emerald-600 dark:text-emerald-400", fill: "fill-emerald-700 dark:fill-emerald-300", dy: 0 },
  { t: 2.674, label: "Median", cls: "text-amber-600 dark:text-amber-400", fill: "fill-amber-700 dark:fill-amber-300", dy: 16 },
  { t: 3, label: "Mean", cls: "text-indigo-600 dark:text-indigo-400", fill: "fill-indigo-700 dark:fill-indigo-300", dy: 32 },
];

export default function SkewMeanMedianMode() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · mean, median &amp; mode under skew
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="img" aria-label="Right-skewed distribution with mode, median and mean marked in increasing order">
        <line x1={PADL} y1={BASE} x2={W - PADR} y2={BASE} stroke="currentColor" className="text-muted-foreground/40" />
        <path d={areaPath} className="fill-indigo-500/10" />
        <path d={curvePath} fill="none" stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2} />

        {MARKS.map((m) => {
          const x = tToX(m.t);
          const top = yToSvg(f(m.t));
          return (
            <g key={m.label}>
              <line x1={x} y1={BASE} x2={x} y2={top} stroke="currentColor" className={m.cls} strokeWidth={1.5} strokeDasharray="3 2" />
              <text x={x} y={TOP - 28 + m.dy} textAnchor="middle" className={`${m.fill} text-[11px] font-semibold`}>
                {m.label}
              </text>
              <line x1={x} y1={TOP - 24 + m.dy} x2={x} y2={top} stroke="currentColor" className={`${m.cls} opacity-40`} strokeWidth={0.75} />
            </g>
          );
        })}

        <text x={W - PADR} y={BASE + 16} textAnchor="end" className="fill-muted-foreground text-[10px]">long tail →</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        With a long right tail (positive skew) the mean is dragged toward it, giving{" "}
        <span className="font-medium text-foreground">Mode &lt; Median &lt; Mean</span> (the order reverses for
        a left tail). This is the basis of the empirical relation{" "}
        <span className="font-medium text-foreground">Mode ≈ 3·Median − 2·Mean</span>. For any data,
        Σ(xᵢ − x̄) = 0 — deviations above and below the mean always cancel.
      </p>
    </div>
  );
}
