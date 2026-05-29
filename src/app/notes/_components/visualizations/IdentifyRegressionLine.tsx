/**
 * Static figure: the two regression lines through the mean point (x̄, ȳ) —
 * the flatter "y on x" line and the steeper "x on y" line.
 *
 * Pedagogical aim: both lines pass through (x̄, ȳ); y-on-x is the flatter one
 * (it minimises vertical gaps), x-on-y the steeper. Server component.
 */

const W = 320;
const H = 240;
const PAD = 28;
const DOM = 10;
const sx = (x: number) => PAD + (x / DOM) * (W - 2 * PAD);
const sy = (y: number) => H - PAD - (y / DOM) * (H - 2 * PAD);

const SCATTER = [
  [1, 2], [2, 3], [3, 3.5], [4, 5], [5, 4.5], [6, 6.5], [7, 6], [8, 8], [9, 8.5],
] as const;

export default function IdentifyRegressionLine() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which regression line is which
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto max-w-[320px] mx-auto" role="img" aria-label="Two regression lines crossing at the mean point">
        <line x1={PAD} y1={H - PAD} x2={W - 8} y2={H - PAD} stroke="currentColor" className="text-muted-foreground/40" />
        <line x1={PAD} y1={8} x2={PAD} y2={H - PAD} stroke="currentColor" className="text-muted-foreground/40" />

        {SCATTER.map(([x, y], i) => (
          <circle key={i} cx={sx(x)} cy={sy(y)} r={3} className="fill-sky-600/70 dark:fill-sky-400/70" />
        ))}

        {/* y on x: y = 5 + 0.5(x-5) → (0,2.5)..(10,7.5) */}
        <line x1={sx(0)} y1={sy(2.5)} x2={sx(10)} y2={sy(7.5)} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
        {/* x on y: y = 5 + 1.6(x-5) → (1.875,0)..(8.125,10) */}
        <line x1={sx(1.875)} y1={sy(0)} x2={sx(8.125)} y2={sy(10)} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth={2} />

        {/* mean point */}
        <circle cx={sx(5)} cy={sy(5)} r={4} className="fill-foreground" />
        <text x={sx(5) + 6} y={sy(5) + 14} className="fill-foreground text-[9px]">(x̄, ȳ)</text>

        <text x={sx(10) - 2} y={sy(7.5) - 6} textAnchor="end" className="fill-indigo-700 dark:fill-indigo-300 text-[10px] font-semibold">y on x</text>
        <text x={sx(8.125) + 2} y={sy(10) + 10} textAnchor="start" className="fill-emerald-700 dark:fill-emerald-300 text-[10px] font-semibold">x on y</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Both lines pass through the mean point <span className="font-medium text-foreground">(x̄, ȳ)</span>. The{" "}
        <span className="font-medium text-indigo-700 dark:text-indigo-300">y-on-x</span> line is the flatter one
        (it minimises vertical gaps); <span className="font-medium text-emerald-700 dark:text-emerald-300">x-on-y</span>{" "}
        is steeper. Their slopes are b<sub>yx</sub> and 1/b<sub>xy</sub>, with b<sub>yx</sub>·b<sub>xy</sub> = r².
      </p>
    </div>
  );
}
