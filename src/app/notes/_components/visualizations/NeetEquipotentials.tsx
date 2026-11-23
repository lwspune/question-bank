/**
 * Static figure: equipotential surfaces and the field (concept
 * nphep-equipotential). Two panels.
 * - A point charge: the equipotentials are spheres centred on the charge,
 *   seen here in cross-section as circles. They are drawn at EQUAL steps of
 *   potential (V ∝ 1/r, so levels 4, 3, 2, 1 sit at radii in the ratio
 *   1/4 : 1/3 : 1/2 : 1). They crowd near the charge, where the field is
 *   strong. Field lines run out radially, at right angles to every circle,
 *   from higher potential to lower.
 * - A uniform field: the concept's worked example, the 30 V and 10 V planes
 *   5 cm apart, with the 20 V plane halfway (ΔV = Ed, so equal steps of V sit
 *   at equal gaps). E = (30 − 10)/0.05 = 400 V/m, from the 30 V plane to the
 *   10 V plane, at right angles to the planes. Moving a charge along a plane
 *   takes no work.
 * Values pinned by tests/notes-neet-visuals-pc.test.ts. Server component.
 */

/** Point-charge panel: potential levels in equal steps, and the radius of each. */
export const POINT = { cx: 82, cy: 112, rOne: 72 } as const;
export const LEVELS = [4, 3, 2, 1] as const;

/** Radius of the equipotential at level V, for V = k/r with level 1 at rOne. */
export function radiusAt(V: number, rOne: number = POINT.rOne): number {
  return rOne / V;
}

/** The uniform-field example: plane potentials (V) and positions along the field (cm). */
export const PLANES = [
  { V: 30, xCm: 0 },
  { V: 20, xCm: 2.5 },
  { V: 10, xCm: 5 },
] as const;

/** Field between two planes of a uniform field: E = ΔV/d, in V/m (d in metres). */
export function fieldBetween(vHigh: number, vLow: number, dMetres: number): number {
  return (vHigh - vLow) / dMetres;
}

/** Field lines leave the point charge in these screen directions (degrees). */
export const LINE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;

/**
 * Cosine of the angle between a radial field line and the circle it crosses
 * (the circle's tangent at angle a is perpendicular to the radius): always 0.
 */
export function lineDotTangent(aDeg: number): number {
  const a = (aDeg * Math.PI) / 180;
  const radial = { x: Math.cos(a), y: Math.sin(a) };
  const tangent = { x: -Math.sin(a), y: Math.cos(a) };
  return radial.x * tangent.x + radial.y * tangent.y;
}

const r2 = (v: number) => Math.round(v * 100) / 100;
const rad = (d: number) => (d * Math.PI) / 180;

// Uniform panel geometry: planes drawn as vertical lines, 5 cm = 100 units.
const U = { x0: 196, top: 52, bottom: 176, unitsPerCm: 20 } as const;
const planeX = (xCm: number) => U.x0 + xCm * U.unitsPerCm;
const FIELD_YS = [64, 92, 136, 164] as const;

function ArrowHead({ x, y, angle, className }: { x: number; y: number; angle: number; className: string }) {
  const a = rad(angle);
  const back = (s: number) => ({ x: x - 7 * Math.cos(a) + s * 3.5 * Math.sin(a), y: y - 7 * Math.sin(a) - s * 3.5 * Math.cos(a) });
  const l = back(1);
  const r = back(-1);
  return <polygon points={`${r2(x)},${r2(y)} ${r2(l.x)},${r2(l.y)} ${r2(r.x)},${r2(r.y)}`} className={className} />;
}

const FIELD = "stroke-rose-600 dark:stroke-rose-400";
const FIELD_HEAD = "fill-rose-600 dark:fill-rose-400";
const EQUI = "stroke-sky-600 dark:stroke-sky-400";

export default function NeetEquipotentials() {
  const outer = radiusAt(1);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · equipotential surfaces and field lines
      </p>
      <svg
        viewBox="0 0 320 234"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: a positive point charge with four equipotential circles at equal steps of potential, crowded near the charge, and field lines running out radially, crossing every circle at right angles. Right: a uniform field, with equipotential planes of 30, 20 and 10 volts, the 30 and 10 volt planes 5 centimetres apart. Field lines cross the planes at right angles, pointing from 30 volts to 10 volts, so the field is 400 volts per metre. Moving a charge along the 20 volt plane takes no work."
      >
        <text x={POINT.cx} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Point charge
        </text>
        <text x={246} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Uniform field
        </text>

        {/* Point charge: field lines first, circles over them */}
        {LINE_ANGLES.map((a) => {
          const c = Math.cos(rad(a));
          const s = Math.sin(rad(a));
          const from = radiusAt(4) * 0.55;
          const to = outer + 6;
          const mid = (radiusAt(2) + radiusAt(1)) / 2 + 4;
          return (
            <g key={a}>
              <line
                x1={r2(POINT.cx + from * c)}
                y1={r2(POINT.cy + from * s)}
                x2={r2(POINT.cx + to * c)}
                y2={r2(POINT.cy + to * s)}
                strokeWidth={1.3}
                className={FIELD}
              />
              <ArrowHead x={POINT.cx + mid * c} y={POINT.cy + mid * s} angle={a} className={FIELD_HEAD} />
            </g>
          );
        })}
        {LEVELS.map((V) => (
          <circle key={V} cx={POINT.cx} cy={POINT.cy} r={r2(radiusAt(V))} fill="none" strokeWidth={1.4} className={EQUI} />
        ))}
        <circle cx={POINT.cx} cy={POINT.cy} r={7} className="fill-amber-400 stroke-amber-700 dark:fill-amber-300 dark:stroke-amber-500" />
        <text x={POINT.cx} y={POINT.cy + 3.5} textAnchor="middle" className="fill-foreground text-[10px] font-bold">
          +
        </text>
        {/* Right-angle mark where the 0° line crosses the outer circle */}
        <path
          d={`M ${r2(POINT.cx + outer - 6)} ${POINT.cy} L ${r2(POINT.cx + outer - 6)} ${POINT.cy - 6} L ${r2(POINT.cx + outer)} ${POINT.cy - 6}`}
          fill="none"
          className="stroke-foreground"
        />
        <text x={6} y={POINT.cy + outer + 18} className="fill-muted-foreground text-[10px]">
          equal steps of V,
        </text>
        <text x={6} y={POINT.cy + outer + 30} className="fill-muted-foreground text-[10px]">
          crowded near the charge
        </text>

        {/* Uniform field: planes */}
        {PLANES.map((p) => (
          <g key={p.V}>
            <line x1={planeX(p.xCm)} y1={U.top} x2={planeX(p.xCm)} y2={U.bottom} strokeWidth={2} className={EQUI} />
            <text x={planeX(p.xCm)} y={U.top - 6} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold tabular-nums dark:fill-sky-300">
              {p.V} V
            </text>
          </g>
        ))}
        {/* Field lines, left to right, from 30 V towards 10 V */}
        {FIELD_YS.map((y) => (
          <g key={y}>
            <line x1={U.x0 - 14} y1={y} x2={planeX(5) + 18} y2={y} strokeWidth={1.3} className={FIELD} />
            <ArrowHead x={planeX(1.25) + 3} y={y} angle={0} className={FIELD_HEAD} />
            <ArrowHead x={planeX(3.75) + 3} y={y} angle={0} className={FIELD_HEAD} />
          </g>
        ))}
        <path
          d={`M ${planeX(5) - 6} ${FIELD_YS[0]} L ${planeX(5) - 6} ${FIELD_YS[0] - 6} L ${planeX(5)} ${FIELD_YS[0] - 6}`}
          fill="none"
          className="stroke-foreground"
        />
        {/* No work along the 20 V plane */}
        <circle cx={planeX(2.5)} cy={114} r={4} className="fill-amber-400 stroke-amber-700 dark:fill-amber-300 dark:stroke-amber-500" />
        <line x1={planeX(2.5) - 9} y1={106} x2={planeX(2.5) - 9} y2={124} strokeWidth={1.3} className="stroke-foreground" />
        <ArrowHead x={planeX(2.5) - 9} y={104} angle={-90} className="fill-foreground" />
        <ArrowHead x={planeX(2.5) - 9} y={126} angle={90} className="fill-foreground" />
        <text x={planeX(2.5) - 13} y={118} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          W = 0
        </text>
        {/* d = 5 cm */}
        <line x1={planeX(0)} y1={U.bottom + 10} x2={planeX(5)} y2={U.bottom + 10} className="stroke-muted-foreground" />
        <line x1={planeX(0)} y1={U.bottom + 6} x2={planeX(0)} y2={U.bottom + 14} className="stroke-muted-foreground" />
        <line x1={planeX(5)} y1={U.bottom + 6} x2={planeX(5)} y2={U.bottom + 14} className="stroke-muted-foreground" />
        <text x={planeX(2.5)} y={U.bottom + 24} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          d = 5 cm
        </text>
        <text x={316} y={U.bottom + 52} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          E = 20/0.05 = 400 V/m
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Every field line (red) crosses every equipotential (blue) at right angles, and points from higher potential to lower. Around a point charge the
        equipotentials are spheres, seen here as circles; in a uniform field they are planes. Moving a charge along one takes no work.
      </p>
    </div>
  );
}
