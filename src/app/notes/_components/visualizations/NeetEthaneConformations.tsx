/**
 * Static figure: the conformations of ethane (concept nchhc-conformations).
 * Top: Newman projections, looking along the C-C bond (the front carbon a
 * point, the back carbon a circle). Staggered: each back C-H sits in a gap,
 * dihedral angle 60°, most stable. Eclipsed: each back C-H sits right behind
 * a front C-H, dihedral angle 0°, least stable (drawn turned 20° so the back
 * bonds can be seen, as books draw it).
 * Bottom: energy against the angle the back carbon is turned, starting from
 * staggered. Every 60° the form switches: staggered (minimum) at 0°, 120°,
 * 240°, 360°; eclipsed (maximum) at 60°, 180°, 300°. The gap is the concept's
 * 12.5 kJ mol⁻¹. The smooth curve between is drawn as E = 6.25(1 − cos 3θ);
 * only its minima, maxima and the 12.5 kJ mol⁻¹ are the concept's.
 * Pinned by tests/notes-neet-visuals-pc.test.ts. Server component.
 */

/** Energy of eclipsed above staggered, kJ mol⁻¹. */
export const ENERGY_GAP = 12.5;

/** Dihedral angle (degrees, 0 to 60) after the back carbon turns θ from staggered. */
export function dihedralAngle(theta: number): number {
  const x = (((60 + theta) % 120) + 120) % 120;
  return Math.min(x, 120 - x);
}

/** Energy above staggered (kJ mol⁻¹) after turning θ from staggered. */
export function torsionalEnergy(theta: number): number {
  return (ENERGY_GAP / 2) * (1 - Math.cos((3 * theta * Math.PI) / 180));
}

export type Form = "staggered" | "eclipsed" | "between";

/** Name the form after turning θ from staggered. */
export function formAt(theta: number): Form {
  const d = dihedralAngle(theta);
  if (Math.abs(d - 60) < 1e-9) return "staggered";
  if (Math.abs(d) < 1e-9) return "eclipsed";
  return "between";
}

/** The marked points on the energy graph. */
export const MARKS = [0, 60, 120, 180, 240, 300, 360] as const;

const r2 = (v: number) => Math.round(v * 100) / 100;
const rad = (d: number) => (d * Math.PI) / 180;

// Newman geometry. Bond angles are measured clockwise from straight up.
const NEWMAN_R = 22;
const FRONT_LEN = 36;
const BACK_LEN = 36;
const FRONT_ANGLES = [0, 120, 240] as const;
/** The eclipsed back bonds are drawn turned by this much, only so they can be seen. */
export const ECLIPSE_DRAW_OFFSET = 20;

const at = (cx: number, cy: number, angle: number, len: number) => ({
  x: r2(cx + len * Math.sin(rad(angle))),
  y: r2(cy - len * Math.cos(rad(angle))),
});

function Newman({ cx, cy, backTurn }: { cx: number; cy: number; backTurn: number }) {
  return (
    <g>
      {/* Back carbon: circle, its bonds start at the rim */}
      {FRONT_ANGLES.map((a) => {
        const ang = a + backTurn;
        const p = at(cx, cy, ang, NEWMAN_R);
        const q = at(cx, cy, ang, BACK_LEN);
        const h = at(cx, cy, ang, BACK_LEN + 10);
        return (
          <g key={`b${a}`}>
            <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} strokeWidth={1.6} className="stroke-sky-600 dark:stroke-sky-400" />
            <text x={h.x} y={r2(h.y + 3.5)} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
              H
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={NEWMAN_R} strokeWidth={1.6} className="fill-background stroke-sky-600 dark:stroke-sky-400" />
      {/* Front carbon: bonds meet at the centre */}
      {FRONT_ANGLES.map((a) => {
        const q = at(cx, cy, a, FRONT_LEN);
        const h = at(cx, cy, a, FRONT_LEN + 8);
        return (
          <g key={`f${a}`}>
            <line x1={cx} y1={cy} x2={q.x} y2={q.y} strokeWidth={2} className="stroke-foreground" />
            <text x={h.x} y={r2(h.y + 3.5)} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              H
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={2.2} className="fill-foreground" />
    </g>
  );
}

// Energy graph.
export const GRAPH = { x0: 48, x1: 300, yTop: 188, yBottom: 262 } as const;
const gx = (theta: number) => r2(GRAPH.x0 + (theta / 360) * (GRAPH.x1 - GRAPH.x0));
const gy = (e: number) => r2(GRAPH.yBottom - (e / ENERGY_GAP) * (GRAPH.yBottom - GRAPH.yTop));

export function energyCurve(step = 3): { theta: number; e: number }[] {
  const out: { theta: number; e: number }[] = [];
  for (let th = 0; th <= 360; th += step) out.push({ theta: th, e: torsionalEnergy(th) });
  return out;
}

export default function NeetEthaneConformations() {
  const curve = energyCurve()
    .map((p) => `${gx(p.theta)},${gy(p.e)}`)
    .join(" ");
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · staggered and eclipsed ethane
      </p>
      <svg
        viewBox="0 0 320 294"
        className="block h-auto w-full"
        role="img"
        aria-label="Newman projections of ethane, looking along the carbon-carbon bond. Staggered: the back hydrogens sit in the gaps between the front ones, dihedral angle 60 degrees, the most stable form. Eclipsed: each back hydrogen sits behind a front one, dihedral angle 0 degrees, the least stable form. Below, energy against the angle the back carbon is turned: minima at staggered, 0, 120, 240 and 360 degrees, maxima at eclipsed, 60, 180 and 300 degrees, 12.5 kilojoules per mole apart."
      >
        <Newman cx={80} cy={74} backTurn={60} />
        <Newman cx={240} cy={74} backTurn={ECLIPSE_DRAW_OFFSET} />
        <text x={80} y={14} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          Staggered
        </text>
        <text x={240} y={14} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          Eclipsed
        </text>
        <text x={80} y={136} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          dihedral angle 60°
        </text>
        <text x={80} y={149} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          most stable
        </text>
        <text x={240} y={136} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          dihedral angle 0°
        </text>
        <text x={240} y={149} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          least stable
        </text>
        <text x={160} y={30} textAnchor="middle" className="fill-foreground text-[10px]">
          front C-H
        </text>
        <text x={160} y={43} textAnchor="middle" className="fill-sky-700 text-[10px] dark:fill-sky-300">
          back C-H
        </text>

        {/* Energy graph */}
        <line x1={GRAPH.x0} y1={GRAPH.yBottom} x2={GRAPH.x1} y2={GRAPH.yBottom} className="stroke-muted-foreground" />
        <line x1={GRAPH.x0} y1={GRAPH.yBottom} x2={GRAPH.x0} y2={GRAPH.yTop - 8} className="stroke-muted-foreground" />
        <line x1={GRAPH.x0} y1={GRAPH.yTop} x2={GRAPH.x1} y2={GRAPH.yTop} strokeDasharray="2 3" className="stroke-border" />
        <text x={6} y={GRAPH.yTop - 16} className="fill-muted-foreground text-[10px]">
          energy, kJ mol⁻¹
        </text>
        <polyline points={curve} fill="none" strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        {MARKS.map((m) => {
          const eclipsed = formAt(m) === "eclipsed";
          return (
            <g key={m}>
              <circle
                cx={gx(m)}
                cy={gy(torsionalEnergy(m))}
                r={3}
                className={eclipsed ? "fill-rose-600 dark:fill-rose-400" : "fill-emerald-600 dark:fill-emerald-400"}
              />
              <text x={gx(m)} y={GRAPH.yBottom + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
                {m}°
              </text>
              <text
                x={gx(m)}
                y={eclipsed ? GRAPH.yTop - 6 : GRAPH.yBottom - 6}
                textAnchor="middle"
                className={`text-[10px] font-semibold ${eclipsed ? "fill-rose-700 dark:fill-rose-300" : "fill-emerald-700 dark:fill-emerald-300"}`}
              >
                {eclipsed ? "E" : "S"}
              </text>
            </g>
          );
        })}
        {/* The 12.5 kJ/mol gap, between 0° and 60° */}
        <line x1={gx(30)} y1={gy(ENERGY_GAP) + 3} x2={gx(30)} y2={gy(0) - 3} className="stroke-foreground" />
        <polygon points={`${gx(30)},${gy(ENERGY_GAP) + 1} ${gx(30) - 3},${gy(ENERGY_GAP) + 7} ${gx(30) + 3},${gy(ENERGY_GAP) + 7}`} className="fill-foreground" />
        <polygon points={`${gx(30)},${gy(0) - 1} ${gx(30) - 3},${gy(0) - 7} ${gx(30) + 3},${gy(0) - 7}`} className="fill-foreground" />
        <text x={GRAPH.x0 - 4} y={gy(ENERGY_GAP) + 3.5} textAnchor="end" className="fill-foreground text-[10px] font-semibold tabular-nums">
          12.5
        </text>
        <text x={174} y={GRAPH.yBottom + 26} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          angle turned from staggered
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        S is staggered and E is eclipsed. Turning the back carbon 60° from staggered gives eclipsed; a further 60° gives staggered again. The two forms
        differ by only about 12.5 kJ mol⁻¹, so they change into each other at room temperature and cannot be separated. The eclipsed back bonds are drawn turned a little, only so they can be seen.
      </p>
    </div>
  );
}
