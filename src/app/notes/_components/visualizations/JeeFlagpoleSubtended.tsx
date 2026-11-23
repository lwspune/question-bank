/**
 * Static figure: the angle a flagpole subtends at a point on the ground
 * (concept jhd-subtended), drawn with the concept's worked example: a 10 m
 * flagpole on a 10 m building, seen from a point 10 m from the base.
 *
 * The mark (the roof) is at h₁ = 10 m and the top at h₂ = 20 m, d = 10 m.
 * tan α = 10/10 = 1, so α = 45°; tan β = 20/10 = 2, so β = tan⁻¹2 ≈ 63.43°.
 * The flagpole subtends β − α, and tan(β − α) = (2 − 1)/(1 + 2·1) = 1/3, so
 * β − α = tan⁻¹(1/3) ≈ 18.43°: a difference of elevations, not the top's
 * elevation. Drawn to scale, 8 units a metre.
 * Server component. Pinned by tests/notes-w2-12.test.ts.
 */

export const FLAG = { d: 10, h1: 10, h2: 20 } as const;

const deg = (rad: number) => (rad * 180) / Math.PI;

export const tanAlpha = () => FLAG.h1 / FLAG.d;
export const tanBeta = () => FLAG.h2 / FLAG.d;
export const alphaDeg = () => deg(Math.atan(tanAlpha()));
export const betaDeg = () => deg(Math.atan(tanBeta()));

/** tan(β − α) by the subtraction formula. */
export const tanSubtended = () => (tanBeta() - tanAlpha()) / (1 + tanBeta() * tanAlpha());
export const subtendedDeg = () => betaDeg() - alphaDeg();

// Drawing (viewBox units): 8 units a metre, the point O on the ground.
export const SCALE = 8;
export const O = { x: 70, y: 210 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const FOOT = { x: O.x + FLAG.d * SCALE, y: O.y };
const ROOF = { x: FOOT.x, y: O.y - FLAG.h1 * SCALE };
const TOP = { x: FOOT.x, y: O.y - FLAG.h2 * SCALE };

/** Arc around O from a1 to a2 degrees (above the ground), radius r. */
const arc = (r: number, a1: number, a2: number) =>
  Array.from({ length: 17 }, (_, k) => {
    const t = ((a1 + ((a2 - a1) * k) / 16) * Math.PI) / 180;
    return `${r2(O.x + r * Math.cos(t))},${r2(O.y - r * Math.sin(t))}`;
  }).join(" ");

export default function JeeFlagpoleSubtended() {
  const a = alphaDeg();
  const b = betaDeg();
  const mid = ((a + b) / 2) * (Math.PI / 180);
  const lead = { x: r2(O.x + 26 * Math.cos(mid)), y: r2(O.y - 26 * Math.sin(mid)) };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the angle a flagpole subtends is a difference of two elevations
      </p>
      <svg
        viewBox="0 0 320 290"
        className="block h-auto w-full"
        role="img"
        aria-label="A 10 m flagpole on a 10 m building, seen from a point 10 m from the base. The roof is at elevation α = 45° since tan α = 1, the top at β = tan⁻¹2 since tan β = 2. The flagpole subtends β − α, and tan(β − α) = (2 − 1)/(1 + 2) = 1/3."
      >
        {/* Ground */}
        <line x1={20} y1={O.y} x2={300} y2={O.y} strokeWidth={1.5} className="stroke-muted-foreground" />

        {/* Building and flagpole */}
        <rect x={FOOT.x} y={ROOF.y} width={24} height={FLAG.h1 * SCALE} strokeWidth={1.2} className="fill-muted-foreground/20 stroke-muted-foreground" />
        <line x1={TOP.x} y1={TOP.y} x2={ROOF.x} y2={ROOF.y} strokeWidth={3} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <polygon points={`${TOP.x},${TOP.y} ${TOP.x + 16},${TOP.y + 5} ${TOP.x},${TOP.y + 10}`} className="fill-indigo-500/60 dark:fill-indigo-400/60" />

        {/* Lines of sight */}
        <line x1={O.x} y1={O.y} x2={ROOF.x} y2={ROOF.y} strokeWidth={1.5} strokeDasharray="5 3" className="stroke-sky-600 dark:stroke-sky-400" />
        <line x1={O.x} y1={O.y} x2={TOP.x} y2={TOP.y} strokeWidth={1.5} strokeDasharray="5 3" className="stroke-amber-600 dark:stroke-amber-400" />

        {/* Angles at O */}
        <polygon points={`${O.x},${O.y} ${arc(30, a, b)}`} className="fill-emerald-500/35 dark:fill-emerald-400/35" />
        <polyline points={arc(48, 0, a)} fill="none" strokeWidth={1.5} className="stroke-sky-600 dark:stroke-sky-400" />
        <polyline points={arc(64, 0, b)} fill="none" strokeWidth={1.5} className="stroke-amber-600 dark:stroke-amber-400" />
        <line x1={54} y1={172} x2={lead.x} y2={lead.y} strokeWidth={1} className="stroke-emerald-700 dark:stroke-emerald-300" />

        {/* Points */}
        <circle cx={O.x} cy={O.y} r={3.5} className="fill-foreground" />
        <circle cx={ROOF.x} cy={ROOF.y} r={3.5} className="fill-sky-600 dark:fill-sky-400" />
        <circle cx={TOP.x} cy={TOP.y} r={3.5} className="fill-amber-600 dark:fill-amber-400" />

        {/* Labels */}
        <g className="text-[11px]">
          <text x={O.x} y={O.y + 15} textAnchor="middle" className="fill-foreground font-semibold">
            O
          </text>
          <text x={(O.x + FOOT.x) / 2} y={O.y + 15} textAnchor="middle" className="fill-muted-foreground">
            10 m
          </text>
          <text x={98} y={203} className="fill-sky-700 font-semibold dark:fill-sky-300">
            α
          </text>
          <text x={94} y={142} textAnchor="end" className="fill-amber-700 font-semibold dark:fill-amber-300">
            β = tan⁻¹2
          </text>
          <text x={52} y={168} textAnchor="end" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            β − α
          </text>
          <text x={TOP.x + 8} y={(TOP.y + ROOF.y) / 2 + 2} className="fill-indigo-700 font-semibold dark:fill-indigo-300">
            flagpole 10 m
          </text>
          <text x={FOOT.x + 30} y={(ROOF.y + O.y) / 2 + 4} className="fill-muted-foreground">
            building 10 m
          </text>
          <text x={TOP.x + 20} y={TOP.y + 8} className="fill-amber-700 dark:fill-amber-300">
            top, 20 m up
          </text>
          <text x={ROOF.x + 30} y={ROOF.y - 4} className="fill-sky-700 dark:fill-sky-300">
            roof (the mark)
          </text>
        </g>

        {/* The working */}
        <g className="text-[11px] tabular-nums">
          <text x={160} y={244} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300">
            roof: tan α = 10/10 = 1, so α = 45°
          </text>
          <text x={160} y={260} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300">
            top: tan β = 20/10 = 2
          </text>
          <text x={160} y={278} textAnchor="middle" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            tan(β − α) = (2 − 1)/(1 + 2) = 1/3
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The flagpole subtends β − α = tan⁻¹(1/3) at O, about 18.4°. It is not β, the elevation of the top: subtract the two
        elevations, then take the tangent with tan(β − α) = (tan β − tan α)/(1 + tan β tan α).
      </p>
    </div>
  );
}
