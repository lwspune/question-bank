/**
 * Static figure: the three stages of the demographic transition (concept
 * sscgwhhu-transition).
 *
 * Exactly the concept's table: first stage, high births and high deaths, slow
 * growth; second stage, better health care cuts the death rate fast while the
 * birth rate stays high, a population explosion; third stage, both low, slow
 * growth. Death rates fall first and birth rates later, and the gap between
 * the two curves is the population growth. The curves are shapes, not data:
 * the concept gives no numbers. Values pinned by
 * tests/notes-ssc-visuals-gk.test.ts. Server component, no client state.
 */

export type TransitionStage = { name: string; births: string; deaths: string; growth: string };

export const TRANSITION_STAGES: readonly TransitionStage[] = [
  { name: "First stage", births: "High", deaths: "High", growth: "Slow" },
  { name: "Second stage", births: "High", deaths: "Falling fast", growth: "Explosive" },
  { name: "Third stage", births: "Low", deaths: "Low", growth: "Slow" },
];

const smoothstep = (a: number, b: number, t: number) => {
  const u = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return u * u * (3 - 2 * u);
};

/** Birth rate (0 to 1, a shape) at time t, where stage k runs from t = k to k + 1. Falls only after stage two. */
export function birthRate(t: number): number {
  return 0.85 - (0.85 - 0.32) * smoothstep(2.0, 2.35, t);
}

/** Death rate (0 to 1, a shape) at time t. Falls fast early in stage two. */
export function deathRate(t: number): number {
  return 0.78 - (0.78 - 0.26) * smoothstep(1.0, 1.55, t);
}

/** Population growth: the gap between the two rates. */
export const growthAt = (t: number) => birthRate(t) - deathRate(t);

const X0 = 40;
const X1 = 308;
const Y_TOP = 44;
const Y_BOT = 176;
const STAGE_W = (X1 - X0) / 3;

const xOf = (t: number) => X0 + t * STAGE_W;
const yOf = (r: number) => Y_BOT - (Y_BOT - Y_TOP) * r;

const SAMPLES = Array.from({ length: 121 }, (_, i) => (i * 3) / 120);
const pt = (t: number, r: number) => `${xOf(t).toFixed(2)},${yOf(r).toFixed(2)}`;

export default function SscDemographicTransition() {
  const birth = SAMPLES.map((t) => pt(t, birthRate(t)));
  const death = SAMPLES.map((t) => pt(t, deathRate(t)));
  const gap = [...birth, ...[...death].reverse()].join(" ");
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the three stages of the demographic transition
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Birth rate and death rate over time in three stages. First stage: both high, so growth is slow. Second stage: the death rate falls fast while the birth rate stays high, so the gap between them is wide: a population explosion. Third stage: the birth rate has fallen too, both are low and growth is slow again."
      >
        {/* legend */}
        <line x1={8} y1={10} x2={22} y2={10} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2.4} />
        <text x={26} y={13.5} className="fill-foreground text-[10px]">
          birth rate
        </text>
        <line x1={92} y1={10} x2={106} y2={10} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={2.4} />
        <text x={110} y={13.5} className="fill-foreground text-[10px]">
          death rate
        </text>
        <rect x={176} y={5} width={12} height={10} className="fill-amber-200 dark:fill-amber-800/60" />
        <text x={192} y={13.5} className="fill-foreground text-[10px]">
          gap: population growth
        </text>

        {/* stages */}
        {TRANSITION_STAGES.map((s, i) => (
          <g key={s.name}>
            {i > 0 && (
              <line x1={xOf(i)} y1={Y_TOP - 10} x2={xOf(i)} y2={Y_BOT} className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="3 3" />
            )}
            <text x={xOf(i + 0.5)} y={34} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
              {s.name}
            </text>
            <text
              x={xOf(i + 0.5)}
              y={192}
              textAnchor="middle"
              className={
                s.growth === "Explosive"
                  ? "fill-amber-800 text-[10px] font-bold dark:fill-amber-300"
                  : "fill-muted-foreground text-[10px] font-semibold"
              }
            >
              {s.growth.toLowerCase()} growth
            </text>
          </g>
        ))}

        <polygon points={gap} className="fill-amber-200 dark:fill-amber-800/60" />
        <polyline points={birth.join(" ")} fill="none" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2.4} />
        <polyline points={death.join(" ")} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={2.4} />

        <text x={xOf(1.75)} y={100} textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">
          population
        </text>
        <text x={xOf(1.75)} y={112} textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">
          explosion
        </text>

        {/* axes */}
        <line x1={X0} y1={Y_TOP - 10} x2={X0} y2={Y_BOT} className="stroke-foreground" strokeWidth={1.2} />
        <line x1={X0} y1={Y_BOT} x2={X1} y2={Y_BOT} className="stroke-foreground" strokeWidth={1.2} />
        <text x={36} y={yOf(0.85) + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          high
        </text>
        <text x={36} y={yOf(0.26) + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          low
        </text>
        <text x={X1} y={208} textAnchor="end" className="fill-muted-foreground text-[10px]">
          time, as a country develops →
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Death rates fall first and birth rates later. The transition is complete when fertility reaches the replacement level.
      </p>
    </div>
  );
}
