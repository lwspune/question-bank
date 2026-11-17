/**
 * Static figure: the phase diagram of water in outline (not to scale).
 * Pressure up the side, temperature along the bottom; the three regions, the
 * three lines between them, the triple point, the critical point, and the
 * dashed 1 atm line crossing the melting line at 0 °C and the boiling line at
 * 100 °C. The solid to liquid line leans to the LEFT, as the concept says it
 * does for water (ice is less dense than the liquid).
 *
 * Values are the concept's table: triple point 0.01 °C and about 0.006 atm,
 * critical point about 374 °C and 218 atm. The geometry is exported so
 * tests/notes-imat-visuals-chem2.test.ts can pin that the picture is ordered
 * the way the numbers are. Server component, no client state.
 */

/** The concept's table, for water. */
export const WATER = {
  triple: { tC: 0.01, atm: 0.006 },
  critical: { tC: 374, atm: 218 },
  normalMeltingC: 0,
  normalBoilingC: 100,
} as const;

// Plot geometry (viewBox units). Up the page = higher pressure, so a SMALLER y.
const W = 320;
const H = 212;
const PL = 30;
const PR = 310;
const PT = 14;
const PB = 184;

export const GEOM = {
  triple: { x: 110, y: 140 },
  critical: { x: 250, y: 50 },
  /** Top of the solid to liquid line: higher pressure, LOWER temperature (water). */
  meltTop: { x: 98, y: PT },
  /** Bottom-left end of the solid to gas (sublimation) line, and its curve control. */
  subEnd: { x: PL + 6, y: PB - 6 },
  subCtrl: { x: 74, y: 170 },
  /** Control point of the liquid to gas (vapour pressure) curve. */
  vapCtrl: { x: 190, y: 128 },
  /** The 1 atm line. */
  oneAtmY: 100,
} as const;

/** x where the straight melting line crosses height y. */
export function meltingXAt(y: number): number {
  const { triple: a, meltTop: b } = GEOM;
  return a.x + ((y - a.y) / (b.y - a.y)) * (b.x - a.x);
}

/** x where the vapour pressure curve (a quadratic Bézier, triple to critical) crosses height y. */
export function vapourXAt(y: number): number {
  const p0 = GEOM.triple;
  const c = GEOM.vapCtrl;
  const p1 = GEOM.critical;
  // y(t) = (1-t)² p0 + 2(1-t)t c + t² p1, solved for t in [0, 1].
  const A = p0.y - 2 * c.y + p1.y;
  const B = 2 * (c.y - p0.y);
  const C = p0.y - y;
  const t = Math.abs(A) < 1e-9 ? -C / B : (-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A);
  const tt = t >= 0 && t <= 1 ? t : (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A);
  return (1 - tt) ** 2 * p0.x + 2 * (1 - tt) * tt * c.x + tt ** 2 * p1.x;
}

const AXIS = "text-muted-foreground/60";
const LINE = "stroke-foreground/80";

export default function ImatPhaseDiagram() {
  const { triple: tp, critical: cp, meltTop, subEnd, subCtrl, vapCtrl, oneAtmY } = GEOM;
  const mx = meltingXAt(oneAtmY);
  const bx = vapourXAt(oneAtmY);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · phase diagram of water (not to scale)
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Phase diagram of water, not to scale. Pressure up the side, temperature along the bottom. Solid on the left, liquid at the top middle, gas at the bottom right. The solid to liquid line leans to the left. The triple point is at 0.01 degrees Celsius and 0.006 atm; the liquid to gas line ends at the critical point, 374 degrees Celsius and 218 atm. The 1 atm line crosses the melting line at 0 degrees and the boiling line at 100 degrees."
      >
        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="currentColor" className={AXIS} />
        <text x={12} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 12 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[10px]">
          pressure
        </text>
        <text x={PR} y={PB + 12} textAnchor="end" className="fill-muted-foreground text-[10px]">
          temperature
        </text>

        {/* Region names */}
        <text x={64} y={74} textAnchor="middle" className="fill-sky-700 text-[12px] font-semibold dark:fill-sky-300">
          SOLID
        </text>
        <text x={168} y={74} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          LIQUID
        </text>
        <text x={256} y={158} textAnchor="middle" className="fill-amber-700 text-[12px] font-semibold dark:fill-amber-300">
          GAS
        </text>

        {/* 1 atm line and where it crosses */}
        <line x1={PL} y1={oneAtmY} x2={PR} y2={oneAtmY} strokeDasharray="4 3" stroke="currentColor" className="text-indigo-500 dark:text-indigo-400" />
        <text x={PL + 4} y={oneAtmY - 4} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          1 atm
        </text>
        {[
          { x: mx, t: "0 °C", w: "melting" },
          { x: bx, t: "100 °C", w: "boiling" },
        ].map((c) => (
          <g key={c.t}>
            <line x1={c.x} y1={oneAtmY} x2={c.x} y2={PB} strokeDasharray="2 3" stroke="currentColor" className={AXIS} />
            <circle cx={c.x} cy={oneAtmY} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
            <text x={c.x} y={PB + 12} textAnchor="middle" className="fill-foreground text-[10px] font-semibold tabular-nums">
              {c.t}
            </text>
            <text x={c.x} y={PB + 23} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              {c.w}
            </text>
          </g>
        ))}

        {/* The three lines */}
        <line x1={tp.x} y1={tp.y} x2={meltTop.x} y2={meltTop.y} className={LINE} strokeWidth={2} />
        <path d={`M${tp.x},${tp.y} Q${subCtrl.x},${subCtrl.y} ${subEnd.x},${subEnd.y}`} fill="none" className={LINE} strokeWidth={2} />
        <path d={`M${tp.x},${tp.y} Q${vapCtrl.x},${vapCtrl.y} ${cp.x},${cp.y}`} fill="none" className={LINE} strokeWidth={2} />

        <text x={meltTop.x + 10} y={PT + 14} className="fill-muted-foreground text-[10px]">
          leans left: ice is less dense
        </text>

        {/* Triple point */}
        <circle cx={tp.x} cy={tp.y} r={4} className="fill-rose-600 dark:fill-rose-400" />
        <text x={tp.x + 8} y={tp.y + 16} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          triple point
        </text>
        <text x={tp.x + 8} y={tp.y + 27} className="fill-foreground text-[10px] tabular-nums">
          0.01 °C
        </text>
        <text x={tp.x + 8} y={tp.y + 38} className="fill-foreground text-[10px] tabular-nums">
          0.006 atm
        </text>

        {/* Critical point */}
        <circle cx={cp.x} cy={cp.y} r={4} className="fill-rose-600 dark:fill-rose-400" />
        <text x={cp.x + 7} y={cp.y + 4} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          critical point
        </text>
        <text x={cp.x + 7} y={cp.y + 15} className="fill-foreground text-[10px] tabular-nums">
          374 °C
        </text>
        <text x={cp.x + 7} y={cp.y + 26} className="fill-foreground text-[10px] tabular-nums">
          218 atm
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Each region is the state that is stable there; on a line, two states coexist. At the triple point all three
        coexist, at 0.01 °C and a very low pressure, so it is not the 0 °C melting point at 1 atm. The liquid to gas
        line (the vapour pressure curve) ends at the critical point: above it liquid and gas cannot be told apart.
        For water the solid to liquid line leans left, because ice is less dense: more pressure lowers the melting
        point slightly.
      </p>
    </div>
  );
}
