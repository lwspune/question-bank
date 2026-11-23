/**
 * Static figure: the Five-Year Plans on one time line, with the two breaks
 * (concept sscxiepl-later).
 *
 * The years are the page's own: First 1951-56 and Second 1956-61 (the
 * sibling concept on this page), then Third 1961-66, the Plan Holiday 1966-69,
 * Fourth 1969-74, Fifth 1974-79 (ended by the Janata government in 1978),
 * the Rolling Plan 1978-80, Sixth 1980-85, Seventh 1985-90 and Eighth
 * 1992-97. Seven plans, the First to the Seventh, were completed by 1990.
 * Values pinned by tests/notes-w2-10.test.ts. Server component.
 */

export type PlanSpan = {
  name: string;
  start: number;
  /** The year the bar stops (for the Fifth, the year it was ended). */
  end: number;
  /** The year label printed beside the bar. */
  label: string;
  /** A break between plans rather than a Five-Year Plan. */
  isBreak: boolean;
};

export const PLAN_SPANS: readonly PlanSpan[] = [
  { name: "First", start: 1951, end: 1956, label: "1951-56", isBreak: false },
  { name: "Second", start: 1956, end: 1961, label: "1956-61", isBreak: false },
  { name: "Third", start: 1961, end: 1966, label: "1961-66", isBreak: false },
  { name: "Plan Holiday", start: 1966, end: 1969, label: "1966-69", isBreak: true },
  { name: "Fourth", start: 1969, end: 1974, label: "1969-74", isBreak: false },
  { name: "Fifth", start: 1974, end: 1978, label: "1974-79, ended 1978", isBreak: false },
  { name: "Rolling Plan", start: 1978, end: 1980, label: "1978-80", isBreak: true },
  { name: "Sixth", start: 1980, end: 1985, label: "1980-85", isBreak: false },
  { name: "Seventh", start: 1985, end: 1990, label: "1985-90", isBreak: false },
  { name: "Eighth", start: 1992, end: 1997, label: "1992-97", isBreak: false },
];

/** Plans (not breaks) finished by the given year. */
export function plansCompletedBy(year: number): number {
  return PLAN_SPANS.filter((p) => !p.isBreak && p.end <= year).length;
}

const YEAR0 = 1950;
const YEAR1 = 1997;
const X0 = 92;
const X1 = 286;
const ROW_TOP = 24;
const ROW_H = 17;
const AXIS_Y = ROW_TOP + PLAN_SPANS.length * ROW_H + 4;
const TICKS = [1950, 1960, 1970, 1980, 1990] as const;

export function yearX(year: number): number {
  return X0 + ((year - YEAR0) / (YEAR1 - YEAR0)) * (X1 - X0);
}

export default function SscPlanTimeline() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the plans and the breaks, 1951 to 1997
      </p>
      <svg
        viewBox={`0 0 320 ${AXIS_Y + 22}`}
        className="block h-auto w-full"
        role="img"
        aria-label="A time line of the plans. First 1951 to 56, Second 1956 to 61, Third 1961 to 66, Plan Holiday 1966 to 69, Fourth 1969 to 74, Fifth 1974 to 79 but ended in 1978, Rolling Plan 1978 to 80, Sixth 1980 to 85, Seventh 1985 to 90, Eighth 1992 to 97."
      >
        <text x={X0} y={12} className="fill-muted-foreground text-[10px]">
          blue: a Five-Year Plan · amber: a break
        </text>
        {PLAN_SPANS.map((p, i) => {
          const y = ROW_TOP + i * ROW_H;
          const xa = yearX(p.start);
          const xb = yearX(p.end);
          const labelRight = xb + 4 + p.label.length * 5.4 < 316;
          return (
            <g key={p.name}>
              <text x={X0 - 6} y={y + 10} textAnchor="end" className={`text-[11px] ${p.isBreak ? "fill-amber-800 font-semibold dark:fill-amber-300" : "fill-foreground font-semibold"}`}>
                {p.name}
              </text>
              <rect
                x={xa}
                y={y + 2}
                width={xb - xa}
                height={11}
                rx={2}
                className={p.isBreak ? "fill-amber-300 dark:fill-amber-600" : "fill-sky-500 dark:fill-sky-500"}
              />
              <text
                x={labelRight ? xb + 4 : xa - 4}
                y={y + 11}
                textAnchor={labelRight ? "start" : "end"}
                className="fill-muted-foreground text-[10px]"
              >
                {p.label}
              </text>
            </g>
          );
        })}
        <line x1={X0} y1={AXIS_Y} x2={X1} y2={AXIS_Y} className="stroke-foreground" strokeWidth={1} />
        {TICKS.map((t) => (
          <g key={t}>
            <line x1={yearX(t)} y1={AXIS_Y} x2={yearX(t)} y2={AXIS_Y + 4} className="stroke-foreground" strokeWidth={1} />
            <text x={yearX(t)} y={AXIS_Y + 15} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {t}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Seven plans, the First to the Seventh, were completed by 1990. The Eighth (1992-97) carried the 1991 reforms.
      </p>
    </div>
  );
}
