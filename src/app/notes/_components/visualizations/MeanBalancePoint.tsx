/**
 * Static figure: the mean as the balance point of the data on a number line —
 * the fulcrum where signed deviations cancel (Σ(xᵢ − x̄) = 0).
 *
 * Pedagogical aim: the mean is the centre of mass; pulling one value out drags
 * the balance point toward it. Server component — no client state.
 */

const PADL = 24;
const PADR = 24;
const W = 360;
const DMAX = 12;
const x = (v: number) => PADL + (v / DMAX) * (W - PADL - PADR);

const DATA = [2, 4, 5, 9];
const MEAN = DATA.reduce((a, v) => a + v, 0) / DATA.length; // 5
const BASE = 70;

export default function MeanBalancePoint() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · mean = the balance point
      </p>

      <svg viewBox={`0 0 ${W} 150`} className="block w-full h-auto" role="img" aria-label="Mean as the balance point of data on a number line">
        {/* beam */}
        <line x1={x(0)} y1={BASE} x2={x(DMAX)} y2={BASE} stroke="currentColor" className="text-muted-foreground/60" strokeWidth={2} />
        {[0, 2, 4, 6, 8, 10, 12].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={BASE} x2={x(t)} y2={BASE + 4} stroke="currentColor" className="text-muted-foreground/40" />
            <text x={x(t)} y={BASE + 16} textAnchor="middle" className="fill-muted-foreground text-[9px]">{t}</text>
          </g>
        ))}

        {/* data masses */}
        {DATA.map((v, i) => (
          <g key={i}>
            <circle cx={x(v)} cy={BASE - 8} r={6} className="fill-sky-600/85 dark:fill-sky-400/85" />
            <text x={x(v)} y={BASE - 18} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">{v}</text>
          </g>
        ))}

        {/* fulcrum at mean */}
        <polygon points={`${x(MEAN)},${BASE + 2} ${x(MEAN) - 9},${BASE + 22} ${x(MEAN) + 9},${BASE + 22}`} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={x(MEAN)} y={BASE + 36} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[11px] font-semibold tabular-nums">mean = {MEAN}</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Treat each value as equal weight on a beam; the mean is the point where it balances. The pulls on the
        left (deviations −3, −1) exactly cancel those on the right (0, +4), which is the identity{" "}
        <span className="font-medium text-foreground">Σ(xᵢ − x̄) = 0</span>. One extreme value drags the balance
        point toward it — why the mean is sensitive to outliers.
      </p>
    </div>
  );
}
