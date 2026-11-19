/**
 * Static figure: Newton's law of cooling (concept cetde-cooling-model), drawn
 * with the concept's worked example: water at 90 °C in a room at 20 °C, so
 * the excess θ − 20 starts at 70 and decays, θ − 20 = 70e^(−kt).
 *
 * The concept gives no k, so the drawing takes one that halves the excess
 * every 10 minutes (k = (log 2)/10 per minute), and says so. Then at
 * t = 0, 10, 20, 30 min the excess is 70, 35, 17.5, 8.75 and θ is 90, 55,
 * 37.5, 28.75 °C: equal time steps, equal ratios (× ½) of the EXCESS, while θ
 * itself falls towards 20 °C (dashed), not towards 0. Server component.
 * Pinned by tests/notes-cet-visuals-maths.test.ts.
 */

/** The concept's worked example, in °C. */
export const COOLING = { theta0: 90, surround: 20 } as const;

/** Minutes for the excess to halve: chosen for the drawing, not given by the concept. */
export const HALVING_MIN = 10;

/** The cooling constant k per minute for that halving time. */
export const K_PER_MIN = Math.log(2) / HALVING_MIN;

/** Temperature at time t (minutes): θ = θs + (θ0 − θs)e^(−kt). */
export function temperatureAt(t: number): number {
  return COOLING.surround + (COOLING.theta0 - COOLING.surround) * Math.exp(-K_PER_MIN * t);
}

/** Excess over the surroundings at time t. */
export const excessAt = (t: number) => temperatureAt(t) - COOLING.surround;

/** The marked times. */
export const MARKS = [0, 10, 20, 30] as const;

// Plot geometry (viewBox units): t from 0 to 40 min, θ from 0 to 100 °C.
export const PLOT = { x0: 42, x1: 302, y0: 188, y1: 28, tMax: 40, thetaMax: 100 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (t: number) => r2(PLOT.x0 + (t / PLOT.tMax) * (PLOT.x1 - PLOT.x0));
export const py = (theta: number) => r2(PLOT.y0 - (theta / PLOT.thetaMax) * (PLOT.y0 - PLOT.y1));

const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : `${Math.round(n * 100) / 100}`);

export default function CetCoolingCurve() {
  const curve = Array.from({ length: 121 }, (_, i) => (PLOT.tMax * i) / 120)
    .map((t) => `${px(t)},${py(temperatureAt(t))}`)
    .join(" ");
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a body cooling towards the room temperature
      </p>
      <svg
        viewBox="0 0 320 222"
        className="block h-auto w-full"
        role="img"
        aria-label="Temperature against time for water starting at 90 °C in a 20 °C room. The curve falls steeply, then levels off towards the dashed line at 20 °C. At 0, 10, 20 and 30 minutes the excess over 20 °C is 70, 35, 17.5 and 8.75: halved every 10 minutes."
      >
        {/* Grid and axes */}
        {[0, 20, 40, 60, 80, 100].map((t) => (
          <g key={t}>
            <line x1={PLOT.x0} y1={py(t)} x2={PLOT.x1} y2={py(t)} className="stroke-border" strokeWidth={t === 0 ? 1.2 : 0.6} />
            <text x={PLOT.x0 - 5} y={py(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        {[0, 10, 20, 30, 40].map((t) => (
          <text key={t} x={px(t)} y={PLOT.y0 + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1 - 6} className="stroke-muted-foreground" />
        <text x={6} y={16} className="fill-muted-foreground text-[10px]">
          temperature θ (°C)
        </text>
        <text x={PLOT.x1} y={PLOT.y0 + 27} textAnchor="end" className="fill-muted-foreground text-[10px]">
          time t (min)
        </text>

        {/* The surroundings: the curve's floor */}
        <line x1={PLOT.x0} y1={py(COOLING.surround)} x2={PLOT.x1} y2={py(COOLING.surround)} strokeDasharray="6 4" strokeWidth={1.5} className="stroke-rose-600 dark:stroke-rose-400" />
        <text x={PLOT.x1} y={py(COOLING.surround) + 13} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          room 20 °C: θ falls towards this, not 0
        </text>

        {/* The excess at each marked time */}
        {MARKS.map((t) => {
          const e = excessAt(t);
          return (
            <g key={t}>
              <line x1={px(t)} y1={py(COOLING.surround)} x2={px(t)} y2={py(temperatureAt(t))} strokeWidth={3} className="stroke-amber-500/70 dark:stroke-amber-400/70" />
              <text x={px(t) + 5} y={e < 15 ? py(temperatureAt(t)) - 6 : py(COOLING.surround + e / 2) + 4} className="fill-amber-700 text-[10px] font-semibold tabular-nums dark:fill-amber-300">
                {fmt(e)}
              </text>
            </g>
          );
        })}

        {/* The curve */}
        <polyline points={curve} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
        {MARKS.map((t) => (
          <circle key={t} cx={px(t)} cy={py(temperatureAt(t))} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        ))}
        <text x={px(0) + 7} y={py(COOLING.theta0) + 3} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          90 °C
        </text>
        <text x={px(10) - 6} y={py(temperatureAt(10)) + 20} textAnchor="end" className="fill-indigo-700 text-[10px] tabular-nums dark:fill-indigo-300">
          55 °C
        </text>

        {/* The ratio */}
        <g className="text-[11px] tabular-nums">
          <text x={140} y={48} className="fill-amber-700 font-semibold dark:fill-amber-300">
            excess θ − 20:
          </text>
          <text x={140} y={66} className="fill-amber-700 text-[10px] dark:fill-amber-300">
            70 → 35 → 17.5 → 8.75
          </text>
          <text x={140} y={84} className="fill-foreground">
            every 10 min: × ½
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The rate of cooling is proportional to the excess θ − 20, so it is the excess that decays exponentially: θ − 20 = 70e⁻ᵏᵗ. In equal
        time steps the excess is multiplied by the same number each time. The halving every 10 minutes is chosen for this drawing; any k
        gives the same shape, with its own multiplier.
      </p>
    </div>
  );
}
