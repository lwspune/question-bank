/**
 * Static figure: the median as the middle of sorted data — the single middle
 * value for an odd count, the average of the two middles for an even count.
 *
 * Pedagogical aim: median is a POSITION in sorted order, not an arithmetic of
 * all values. Server component — no client state.
 */

const PADL = 24;
const PADR = 24;
const W = 360;
const DMAX = 24;
const x = (v: number) => PADL + (v / DMAX) * (W - PADL - PADR);

const ODD = [3, 5, 8, 11, 14, 18, 22]; // median = 11 (4th)
const EVEN = [4, 7, 9, 13, 16, 20]; // median = (9+13)/2 = 11

export default function MedianMiddleValue() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · median = the middle of sorted data
      </p>

      <svg viewBox={`0 0 ${W} 170`} className="block w-full h-auto" role="img" aria-label="Median as the middle value of sorted data for odd and even counts">
        {/* odd */}
        <text x={PADL} y={26} className="fill-muted-foreground text-[10px]">odd n = 7 → single middle</text>
        <line x1={x(0)} y1={54} x2={x(DMAX)} y2={54} stroke="currentColor" className="text-muted-foreground/40" />
        {ODD.map((v, i) => {
          const mid = i === 3;
          return (
            <g key={v}>
              <circle cx={x(v)} cy={54} r={mid ? 6 : 4} className={mid ? "fill-indigo-600 dark:fill-indigo-400" : "fill-sky-600/80 dark:fill-sky-400/80"} />
              <text x={x(v)} y={42} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">{v}</text>
            </g>
          );
        })}
        <text x={x(11)} y={72} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[10px] font-semibold">median 11</text>

        {/* even */}
        <text x={PADL} y={108} className="fill-muted-foreground text-[10px]">even n = 6 → mean of the two middles</text>
        <line x1={x(0)} y1={136} x2={x(DMAX)} y2={136} stroke="currentColor" className="text-muted-foreground/40" />
        {EVEN.map((v, i) => {
          const mid = i === 2 || i === 3;
          return (
            <g key={v}>
              <circle cx={x(v)} cy={136} r={mid ? 6 : 4} className={mid ? "fill-amber-600 dark:fill-amber-400" : "fill-sky-600/80 dark:fill-sky-400/80"} />
              <text x={x(v)} y={124} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">{v}</text>
            </g>
          );
        })}
        <line x1={x(11)} y1={130} x2={x(11)} y2={142} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={1.5} />
        <text x={x(11)} y={156} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[10px] font-semibold">median (9+13)/2 = 11</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Sort first, then locate the middle position. With an odd count there is one middle value; with an even
        count the median is the average of the two middle values. It ignores how far the extremes lie — which is
        why it resists outliers better than the mean.
      </p>
    </div>
  );
}
