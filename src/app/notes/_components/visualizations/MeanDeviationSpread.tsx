/**
 * Static figure: mean deviation as the average of the absolute distances from
 * each value to the centre (here, the mean).
 *
 * Pedagogical aim: mean deviation measures typical distance from the centre —
 * average the |xᵢ − x̄|, signs dropped. Server component — no client state.
 */

const PADL = 28;
const PADR = 40;
const W = 360;
const DMAX = 12;
const x = (v: number) => PADL + (v / DMAX) * (W - PADL - PADR);

const DATA = [2, 4, 5, 9];
const MEAN = 5;
const ROWS = [40, 60, 80, 100];
const MD = DATA.reduce((a, v) => a + Math.abs(v - MEAN), 0) / DATA.length; // 2

export default function MeanDeviationSpread() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · mean deviation = average distance from the centre
      </p>

      <svg viewBox={`0 0 ${W} 150`} className="block w-full h-auto" role="img" aria-label="Absolute deviations of each value from the mean">
        {/* mean line */}
        <line x1={x(MEAN)} y1={28} x2={x(MEAN)} y2={116} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={x(MEAN)} y={130} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[10px] font-semibold">mean = 5</text>

        {DATA.map((v, i) => {
          const y = ROWS[i];
          const dev = Math.abs(v - MEAN);
          return (
            <g key={i}>
              <line x1={x(v)} y1={y} x2={x(MEAN)} y2={y} stroke="currentColor" className="text-rose-500/70" strokeWidth={1.5} />
              <circle cx={x(v)} cy={y} r={4.5} className="fill-sky-600/85 dark:fill-sky-400/85" />
              <text x={x(v) + (v < MEAN ? -8 : 8)} y={y + 3} textAnchor={v < MEAN ? "end" : "start"} className="fill-muted-foreground text-[9px] tabular-nums">{v}</text>
              <text x={(x(v) + x(MEAN)) / 2} y={y - 5} textAnchor="middle" className="fill-rose-600 dark:fill-rose-400 text-[9px] tabular-nums">{dev}</text>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 text-sm">
        <span className="font-medium text-foreground">MD = (3 + 1 + 0 + 4) / 4 = </span>
        <span className="tabular-nums">{MD}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Take each value&apos;s distance from the centre (the red segments, signs dropped) and average them. Mean
        deviation can be taken about the mean or the median; about the median it is smallest.
      </p>
    </div>
  );
}
