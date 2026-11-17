/**
 * Static figure: population growth from the IMAT concept imat-evo-interactions.
 * Population size against time for the same starting population and growth
 * rate:
 *
 * - Exponential (J-shaped) with unlimited resources: N = N0 e^(rt).
 * - Logistic (S-shaped): growth slows as density-dependent factors bite and
 *   levels off at the carrying capacity K (dashed line).
 *
 * The curves are exported and pinned by tests/notes-imat-visuals-bioevo.test.ts.
 * Server component, no client state.
 */

/** Starting population, growth rate per unit time, carrying capacity, time shown. */
export const GROWTH = { n0: 2, r: 0.5, K: 100, tMax: 20 } as const;

export function exponential(t: number): number {
  return GROWTH.n0 * Math.exp(GROWTH.r * t);
}

export function logistic(t: number): number {
  const { n0, r, K } = GROWTH;
  return K / (1 + ((K - n0) / n0) * Math.exp(-r * t));
}

/** Time at which the logistic curve reaches K/2 and grows fastest (the bend of the S). */
export function logisticMidpoint(): number {
  const { n0, r, K } = GROWTH;
  return Math.log((K - n0) / n0) / r;
}

const W = 320;
const H = 218;
const PL = 30;
const PR = 14;
const PT = 34;
const PB = 30;
const BASE = H - PB;
const N_MAX = 130; // y axis top
const x = (t: number) => PL + (t / GROWTH.tMax) * (W - PL - PR);
const y = (n: number) => BASE - (n / N_MAX) * (BASE - PT);

/** A curve as SVG points, stopping where it leaves the top of the plot. */
export function growthPoints(f: (t: number) => number, n = 100): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = (GROWTH.tMax * i) / n;
    const v = f(t);
    if (v > N_MAX) {
      // Finish exactly on the top edge.
      const tTop = Math.log(N_MAX / GROWTH.n0) / GROWTH.r;
      pts.push(`${x(tTop).toFixed(1)},${y(N_MAX).toFixed(1)}`);
      break;
    }
    pts.push(`${x(t).toFixed(1)},${y(v).toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function ImatPopulationGrowth() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · exponential and logistic population growth
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Population size against time: a J-shaped exponential curve that keeps rising, and an S-shaped logistic curve that levels off at the carrying capacity K, drawn as a dashed line"
      >
        {/* Axes. */}
        <line x1={PL} y1={PT - 6} x2={PL} y2={BASE} className="stroke-muted-foreground/60" />
        <line x1={PL} y1={BASE} x2={W - PR} y2={BASE} className="stroke-muted-foreground/60" />
        <text x={W - PR} y={BASE + 14} textAnchor="end" className="fill-muted-foreground text-[10px]">
          time
        </text>
        <text x={PL - 4} y={PT - 10} className="fill-muted-foreground text-[10px]">
          population size (N)
        </text>
        <text x={PL - 5} y={BASE + 3} textAnchor="end" className="fill-muted-foreground text-[10px]">
          0
        </text>

        {/* Carrying capacity. */}
        <line x1={PL} y1={y(GROWTH.K)} x2={W - PR} y2={y(GROWTH.K)} strokeDasharray="5 4" strokeWidth={1.5} className="stroke-rose-500 dark:stroke-rose-400" />
        <text x={PL - 5} y={y(GROWTH.K) + 3} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          K
        </text>
        <text x={W - PR} y={y(GROWTH.K) - 5} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          carrying capacity (K)
        </text>

        {/* The two curves. */}
        <polyline points={growthPoints(exponential)} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-amber-500 dark:stroke-amber-400" />
        <polyline points={growthPoints(logistic)} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />

        {/* Curve names and what happens along the S curve. */}
        <text x={152} y={y(N_MAX) + 8} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          J-shaped: exponential
        </text>
        <text x={152} y={y(N_MAX) + 19} className="fill-amber-700 text-[10px] dark:fill-amber-300">
          (unlimited resources)
        </text>
        <text x={170} y={114} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          S-shaped: logistic,
        </text>
        <text x={170} y={126} className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
          levels off at K
        </text>
        <text x={170} y={146} className="fill-foreground text-[10px]">
          growth slows
        </text>
        <text x={170} y={158} className="fill-muted-foreground text-[10px]">
          (density-dependent factors)
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Both curves start with the same population and rate. With unlimited resources numbers grow exponentially (J).
        In reality density-dependent factors such as competition, predation and disease bite harder as the population
        grows, so growth slows and levels off at the carrying capacity K, the largest population the environment can
        support (S, logistic). Growth is fastest at half of K.
      </p>
    </div>
  );
}
