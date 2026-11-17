/**
 * Static figure: the bacterial growth curve of the IMAT concept
 * imat-mbt-growth. Number of cells on a log scale against time for a culture
 * in a closed flask: lag, log (exponential), stationary and death phases.
 *
 * The log phase uses the concept's worked example: 500 cells and a doubling
 * time of 20 minutes, so 2 hours later (6 doublings) there are
 * 500 × 2⁶ = 32 000 cells. On a log scale that phase is a straight line.
 *
 * The curve is exported and pinned by tests/notes-imat-visuals-bioevo.test.ts.
 * Server component, no client state.
 */

/** Phase boundaries in minutes, the starting number and the doubling time of the worked example. */
export const CULTURE = {
  n0: 500,
  doublingMin: 20,
  lagEnd: 120,
  logEnd: 360,
  stationaryEnd: 600,
  end: 840,
  /** Fall in log10(cells) per minute in the death phase (1 per 2 hours). */
  deathSlope: 1 / 120,
} as const;

export const PHASES = [
  { name: "Lag", from: 0, to: CULTURE.lagEnd, what: "Cells adjust to the medium and make enzymes; numbers hardly rise." },
  { name: "Log (exponential)", from: CULTURE.lagEnd, to: CULTURE.logEnd, what: "Constant doubling time: a straight line on a log scale." },
  { name: "Stationary", from: CULTURE.logEnd, to: CULTURE.stationaryEnd, what: "Nutrients run short and waste builds up: new cells balance dying cells." },
  { name: "Death", from: CULTURE.stationaryEnd, to: CULTURE.end, what: "More cells die than divide." },
] as const;

/** N = N0 × 2ⁿ with n = t / td. */
export function cellsAfter(n0: number, minutes: number, doublingMin: number): number {
  return n0 * 2 ** (minutes / doublingMin);
}

/** log10 of the number of cells at time t (minutes). */
export function logCells(t: number): number {
  const { n0, doublingMin, lagEnd, logEnd, stationaryEnd, deathSlope } = CULTURE;
  const start = Math.log10(n0);
  if (t <= lagEnd) return start;
  const top = Math.log10(cellsAfter(n0, logEnd - lagEnd, doublingMin));
  if (t <= logEnd) return Math.log10(cellsAfter(n0, t - lagEnd, doublingMin));
  if (t <= stationaryEnd) return top;
  return top - deathSlope * (t - stationaryEnd);
}

/** The worked example drawn on the log phase: start and 2 hours later. */
export const EXAMPLE_POINTS = [
  { t: CULTURE.lagEnd, label: "500" },
  { t: CULTURE.lagEnd + 120, label: "32 000" },
] as const;

const W = 320;
const H = 200;
const PL = 34;
const PR = 10;
const PT = 30;
const PB = 30;
const BASE = H - PB;
const LOG_MIN = 2;
const LOG_MAX = 7;
const x = (t: number) => PL + (t / CULTURE.end) * (W - PL - PR);
const y = (l: number) => BASE - ((l - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (BASE - PT);

export function curvePoints(step = 4): string {
  const pts: string[] = [];
  for (let t = 0; t <= CULTURE.end; t += step) pts.push(`${x(t).toFixed(1)},${y(logCells(t)).toFixed(1)}`);
  return pts.join(" ");
}

const SUP = ["²", "³", "⁴", "⁵", "⁶", "⁷"];

export default function ImatBacterialGrowthCurve() {
  const [p0, p1] = EXAMPLE_POINTS;
  const y0 = y(logCells(p0.t));
  const y1 = y(logCells(p1.t));
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the four phases of bacterial growth
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Number of bacteria on a log scale against time: flat lag phase, straight rising log phase, flat stationary phase, then a falling death phase. In the log phase 500 cells become 32 000 in 2 hours with a doubling time of 20 minutes"
      >
        {/* Phase bands and names. */}
        {PHASES.map((ph, i) => (
          <g key={ph.name}>
            {i > 0 && <line x1={x(ph.from)} y1={PT - 14} x2={x(ph.from)} y2={BASE} strokeDasharray="3 3" className="stroke-muted-foreground/40" />}
            <text x={(x(ph.from) + x(ph.to)) / 2} y={PT - 16} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              {i === 1 ? "Log" : ph.name}
            </text>
            {i === 1 && (
              <text x={(x(ph.from) + x(ph.to)) / 2} y={PT - 5} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                (exponential)
              </text>
            )}
          </g>
        ))}

        {/* Axes. */}
        <line x1={PL} y1={PT} x2={PL} y2={BASE} className="stroke-muted-foreground/60" />
        <line x1={PL} y1={BASE} x2={W - PR} y2={BASE} className="stroke-muted-foreground/60" />
        {SUP.map((s, i) => (
          <text key={s} x={PL - 4} y={y(LOG_MIN + i) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            10{s}
          </text>
        ))}
        {[0, 2, 4, 6, 8, 10, 12, 14].map((h) => (
          <text key={h} x={x(h * 60)} y={BASE + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {h}
          </text>
        ))}
        <text x={W - PR} y={BASE + 25} textAnchor="end" className="fill-muted-foreground text-[10px]">
          time (hours)
        </text>
        <text
          x={9}
          y={(PT + BASE) / 2}
          textAnchor="middle"
          transform={`rotate(-90 9 ${(PT + BASE) / 2})`}
          className="fill-muted-foreground text-[10px]"
        >
          number of cells (log scale)
        </text>

        <polyline points={curvePoints()} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />

        {/* The worked example on the log phase. */}
        <polyline
          points={`${x(p0.t).toFixed(1)},${y0.toFixed(1)} ${x(p1.t).toFixed(1)},${y0.toFixed(1)} ${x(p1.t).toFixed(1)},${y1.toFixed(1)}`}
          fill="none"
          strokeDasharray="3 3"
          className="stroke-amber-500 dark:stroke-amber-400"
        />
        <circle cx={x(p0.t)} cy={y0} r={3.5} className="fill-amber-500" />
        <circle cx={x(p1.t)} cy={y1} r={3.5} className="fill-amber-500" />
        <text x={x(p0.t)} y={y0 + 14} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          {p0.label}
        </text>
        <text x={x(p1.t) - 5} y={y1 - 3} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          {p1.label}
        </text>
        <text x={x(p1.t) + 5} y={(y0 + y1) / 2 + 3} className="fill-amber-700 text-[10px] dark:fill-amber-300">
          2 h = 6 doublings
        </text>
      </svg>

      <ol className="mt-2 list-decimal space-y-0.5 pl-5 text-xs text-muted-foreground">
        {PHASES.map((ph) => (
          <li key={ph.name}>
            <span className="font-semibold text-foreground">{ph.name}:</span> {ph.what}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-muted-foreground">
        Binary fission doubles the number each generation: with a doubling time of 20 minutes, 500 cells become
        500 × 2⁶ = 32 000 in 2 hours (6 doublings), not 500 × 6.
      </p>
    </div>
  );
}
