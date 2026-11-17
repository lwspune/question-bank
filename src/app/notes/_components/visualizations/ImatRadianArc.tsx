/**
 * Static figure: the IMAT "Measuring angles in radians and degrees" concept.
 *
 * - Left: the radius wrapped along the edge. An arc as long as the radius
 *   makes an angle of 1 radian at the centre, about 57.3°.
 * - Right: half a turn. The half circle is π ≈ 3.14 radii long, so π radians
 *   = 180°; ticks at 1, 2 and 3 radians show three radii fit with a little to
 *   spare.
 *
 * Pinned by tests/notes-imat-visuals-maths.test.ts. Server component.
 */

/** One radian in degrees, 180/π ≈ 57.2958. */
export const ONE_RADIAN_DEG = 180 / Math.PI;

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/** Arc length s = rθ, θ in radians. */
export function arcLength(r: number, theta: number): number {
  return r * theta;
}

/** Whole radians marked along the half circle (all less than π). */
export const RADIAN_TICKS = [1, 2, 3] as const;

const W = 320;
const H = 170;
const R = 56;
const CY = 100;
const LEFT_CX = 82;
const RIGHT_CX = 238;

/** Point at a maths angle in radians (anticlockwise from the right). */
function at(cx: number, rad: number, r: number = R): [number, number] {
  return [cx + r * Math.cos(rad), CY - r * Math.sin(rad)];
}

const f1 = (n: number) => n.toFixed(1);

function arcPath(cx: number, from: number, to: number, r: number = R): string {
  const [x1, y1] = at(cx, from, r);
  const [x2, y2] = at(cx, to, r);
  const large = to - from > Math.PI ? 1 : 0;
  return `M${f1(x1)},${f1(y1)} A${r},${r} 0 ${large} 0 ${f1(x2)},${f1(y2)}`;
}

export default function ImatRadianArc() {
  const [lx1, ly1] = at(LEFT_CX, 0);
  const [lx2, ly2] = at(LEFT_CX, 1);
  const [arcLx, arcLy] = at(LEFT_CX, 0.5, R + 12);
  const [angLx, angLy] = at(LEFT_CX, 0.5, 20);
  const [rx1, ry1] = at(RIGHT_CX, 0);
  const [rx2, ry2] = at(RIGHT_CX, Math.PI);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · what one radian is
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Left: an arc as long as the radius makes 1 radian, about 57.3 degrees, at the centre. Right: half a circle is pi radians, 180 degrees, with ticks at 1, 2 and 3 radians."
      >
        {/* Left: one radian */}
        <circle cx={LEFT_CX} cy={CY} r={R} fill="none" stroke="currentColor" className="text-border" strokeWidth={1.5} />
        <path
          d={`M${LEFT_CX},${CY} L${f1(lx1)},${f1(ly1)} ${arcPath(LEFT_CX, 0, 1).replace("M", "L")} Z`}
          className="fill-sky-500/25 dark:fill-sky-400/25"
        />
        <line x1={LEFT_CX} y1={CY} x2={lx1} y2={ly1} stroke="currentColor" strokeWidth={2} className="text-sky-700 dark:text-sky-300" />
        <line x1={LEFT_CX} y1={CY} x2={lx2} y2={ly2} stroke="currentColor" strokeWidth={2} className="text-sky-700 dark:text-sky-300" />
        <path d={arcPath(LEFT_CX, 0, 1)} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" className="text-amber-600 dark:text-amber-400" />
        <circle cx={LEFT_CX} cy={CY} r={2.5} className="fill-foreground" />
        <text x={LEFT_CX + R / 2} y={CY + 13} textAnchor="middle" className="fill-sky-800 text-[11px] font-semibold dark:fill-sky-200">
          r
        </text>
        <text x={arcLx} y={arcLy + 4} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          arc = r
        </text>
        <text x={angLx} y={angLy + 4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          1
        </text>
        <text x={LEFT_CX} y={H - 6} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          1 rad ≈ 57.3°
        </text>

        {/* Right: half a turn is π radians */}
        <circle cx={RIGHT_CX} cy={CY} r={R} fill="none" stroke="currentColor" className="text-border" strokeWidth={1.5} />
        <line x1={rx1} y1={ry1} x2={rx2} y2={ry2} stroke="currentColor" strokeWidth={2} className="text-sky-700 dark:text-sky-300" />
        <path d={arcPath(RIGHT_CX, 0, Math.PI)} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" className="text-amber-600 dark:text-amber-400" />
        {RADIAN_TICKS.map((t) => {
          const [ix, iy] = at(RIGHT_CX, t, R - 6);
          const [ox, oy] = at(RIGHT_CX, t, R + 6);
          const [tx, ty] = at(RIGHT_CX, t, R + 15);
          return (
            <g key={t}>
              <line x1={ix} y1={iy} x2={ox} y2={oy} stroke="currentColor" strokeWidth={1.5} className="text-foreground" />
              <text x={tx} y={ty + 4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold tabular-nums">
                {t}
              </text>
            </g>
          );
        })}
        <circle cx={RIGHT_CX} cy={CY} r={2.5} className="fill-foreground" />
        <text x={RIGHT_CX} y={CY - 12} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          180°
        </text>
        <text x={RIGHT_CX} y={CY + 16} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          half circle ≈ 3.14 r
        </text>
        <text x={RIGHT_CX} y={H - 6} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          π rad = 180°
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Lay the radius along the edge of the circle: the angle it covers is 1 radian, a little under 60°. Half the circle
        is π radii long (about 3.14), so 3 radii fit with a little left over and π radians = 180°. A full turn is 2π
        radians = 360°.
      </p>
    </div>
  );
}
