/**
 * Static figure: the heating curve of water (concept jpthermal-phase-change).
 *
 * The concept's worked example, 0.5 kg of ice at −20 °C (s of ice 2100, s of
 * water 4200 J kg⁻¹ K⁻¹, latent heat of fusion 3.36 × 10⁵ J/kg), heated on to
 * the end of boiling with the concept's latent heat of vaporisation, 2256 kJ/kg
 * (L_v/L_f = 2256/336). The heat axis is to scale, so the two flats are in the
 * ratio of the latent heats (about 6.7) and the ice line, with the smaller
 * specific heat, rises twice as steeply as the water line (slope 1/(ms)). The
 * curve stops at the end of the boiling flat: all steam at 100 °C, the
 * concept's "a curve stops where the process stops". The worked example's end
 * point, water at 40 °C after 273 kJ, is marked. Pinned by
 * tests/notes-w2-02.test.ts. Server component, no client state.
 */

/** The concept's values (SI). */
export const HEAT = {
  m: 0.5,
  startC: -20,
  sIce: 2100,
  sWater: 4200,
  Lf: 3.36e5,
  Lv: 2.256e6,
} as const;

export type Stage = { name: string; q: number; fromC: number; toC: number };

/** The four stages, heat in joules. */
export const STAGES: readonly Stage[] = [
  { name: "ice warms", q: HEAT.m * HEAT.sIce * (0 - HEAT.startC), fromC: HEAT.startC, toC: 0 },
  { name: "ice melts", q: HEAT.m * HEAT.Lf, fromC: 0, toC: 0 },
  { name: "water warms", q: HEAT.m * HEAT.sWater * 100, fromC: 0, toC: 100 },
  { name: "water boils", q: HEAT.m * HEAT.Lv, fromC: 100, toC: 100 },
];

/** Corner points of the curve: cumulative heat (J) and temperature (°C). */
export function curveCorners(): { q: number; t: number }[] {
  const out: { q: number; t: number }[] = [{ q: 0, t: HEAT.startC }];
  let q = 0;
  for (const s of STAGES) {
    q += s.q;
    out.push({ q, t: s.toC });
  }
  return out;
}

/** The worked example: heat to reach water at 40 °C. */
export const EXAMPLE_Q = HEAT.m * HEAT.sIce * 20 + HEAT.m * HEAT.Lf + HEAT.m * HEAT.sWater * 40;

// Plot geometry (viewBox units).
export const AXES = { x0: 42, x1: 306, qMax: 1.6e6, yB: 184, yT: 44, tMin: -40, tMax: 100 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const xOf = (q: number) => r2(AXES.x0 + (q / AXES.qMax) * (AXES.x1 - AXES.x0));
export const yOf = (t: number) => r2(AXES.yB - ((t - AXES.tMin) / (AXES.tMax - AXES.tMin)) * (AXES.yB - AXES.yT));

export default function JeeHeatingCurve() {
  const pts = curveCorners();
  const poly = pts.map((p) => `${xOf(p.q)},${yOf(p.t)}`).join(" ");
  const [, , , waterEnd, boilEnd] = pts;
  const ex = { x: xOf(EXAMPLE_Q), y: yOf(40) };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the heating curve of water
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Temperature against heat supplied for 0.5 kg of ice starting at minus 20 degrees Celsius. The ice warms to 0 degrees, stays flat at 0 while it melts (168 kJ), the water warms to 100 degrees, then stays flat at 100 while it boils (1128 kJ), about 6.7 times as long as the melting flat. Water at 40 degrees is reached after 273 kJ."
      >
        {/* Grid and temperature ticks */}
        {[-20, 0, 40, 100].map((t) => (
          <g key={t}>
            <line x1={AXES.x0} y1={yOf(t)} x2={AXES.x1} y2={yOf(t)} className="stroke-border" strokeWidth={0.6} strokeDasharray={t === 0 || t === 100 ? undefined : "2 3"} />
            <text x={AXES.x0 - 5} y={yOf(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t === -20 ? "−20" : t}
            </text>
          </g>
        ))}
        {[0, 400, 800, 1200, 1600].map((k) => (
          <text key={k} x={xOf(k * 1000)} y={AXES.yB + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {k}
          </text>
        ))}
        <line x1={AXES.x0} y1={AXES.yB} x2={AXES.x1} y2={AXES.yB} className="stroke-muted-foreground" />
        <line x1={AXES.x0} y1={AXES.yB} x2={AXES.x0} y2={AXES.yT - 18} className="stroke-muted-foreground" />
        <text x={6} y={16} className="fill-muted-foreground text-[10px]">
          temperature (°C)
        </text>
        <text x={AXES.x1} y={AXES.yB + 26} textAnchor="end" className="fill-muted-foreground text-[10px]">
          heat supplied Q (kJ)
        </text>

        {/* The curve */}
        <polyline points={poly} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-sky-600 dark:stroke-sky-400" />

        {/* Ice warms: steep, the smaller specific heat */}
        <text x={50} y={172} className="fill-foreground text-[10px]">
          ice warms: steeper (s 2100)
        </text>

        {/* Melting flat */}
        <text x={50} y={yOf(0) + 13} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300 tabular-nums">
          melts: 168 kJ at 0 °C
        </text>

        {/* Water warms, with the worked example's point */}
        <text x={xOf(STAGES[0].q + STAGES[1].q + STAGES[2].q / 2) + 6} y={yOf(50) - 6} className="fill-foreground text-[10px]">
          water warms (s 4200)
        </text>
        <circle cx={ex.x} cy={ex.y} r={3.5} className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={ex.x + 7} y={ex.y + 4} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 tabular-nums">
          40 °C after 273 kJ
        </text>

        {/* Boiling flat */}
        <text x={r2((xOf(waterEnd.q) + xOf(boilEnd.q)) / 2)} y={yOf(100) - 7} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300 tabular-nums">
          boils: 1128 kJ at 100 °C
        </text>
        <circle cx={xOf(boilEnd.q)} cy={yOf(100)} r={3} className="fill-rose-600 dark:fill-rose-400" />
        <text x={xOf(boilEnd.q)} y={yOf(100) + 14} textAnchor="end" className="fill-muted-foreground text-[10px]">
          all steam: the curve stops
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        0.5 kg of ice from −20 °C, heat axis to scale. A flat is a change of phase, Q = mL: 0.5 × 336 = 168 kJ to melt, 0.5 × 2256 = 1128 kJ to
        boil, so the boiling flat is about 6.7 times as long. A rising part has slope 1/(ms): ice (2100 J kg⁻¹ K⁻¹) climbs twice as steeply as
        water (4200). Stages so far: 21 + 168 + 84 = 273 kJ brings the water to 40 °C.
      </p>
    </div>
  );
}
