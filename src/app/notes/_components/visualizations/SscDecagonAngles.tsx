/**
 * Static figure: one corner of a regular decagon (concept ssclarg-angle, its
 * worked example). With n = 10 sides, each exterior angle is 360 ÷ 10 = 36°
 * and each interior angle is 180 − 36 = 144°. One side is carried on past a
 * corner: the exterior angle sits between that extension and the next side,
 * the interior angle inside, and the two lie on one straight line (180°).
 * The polygon is drawn from its ten corners, so the marked angles are the
 * real ones. Server component. Pinned by tests/notes-w2-20.test.ts.
 */

export type Pt = { x: number; y: number };

/** The worked example: a regular decagon. */
export const SIDES = 10;
export const exteriorAngle = (n: number) => 360 / n;
export const interiorAngle = (n: number) => 180 - 360 / n;
export const EXTERIOR = exteriorAngle(SIDES);
export const INTERIOR = interiorAngle(SIDES);

// Geometry (viewBox units).
export const CX = 98;
export const CY = 122;
export const RADIUS = 72;
const r2 = (n: number) => Math.round(n * 100) / 100;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Corner k of the decagon; corner 0 is the rightmost point. */
export const corner = (k: number): Pt => ({
  x: r2(CX + RADIUS * Math.cos(rad(k * EXTERIOR))),
  y: r2(CY + RADIUS * Math.sin(rad(k * EXTERIOR))),
});
export const CORNERS: Pt[] = Array.from({ length: SIDES }, (_, k) => corner(k));

/** The marked corner V, the corner before it (P) and after it (N). */
export const V = CORNERS[0];
export const P = CORNERS[SIDES - 1];
export const N = CORNERS[1];

/** Angle in degrees between the rays from `at` towards `a` and towards `b`. */
export function angleAt(at: Pt, a: Pt, b: Pt): number {
  const ux = a.x - at.x;
  const uy = a.y - at.y;
  const vx = b.x - at.x;
  const vy = b.y - at.y;
  const cos = (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy));
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
}

/** Side PV carried on past V. */
export const EXT_LEN = 58;
export const EXT_END: Pt = (() => {
  const dx = V.x - P.x;
  const dy = V.y - P.y;
  const len = Math.hypot(dx, dy);
  return { x: r2(V.x + (dx / len) * EXT_LEN), y: r2(V.y + (dy / len) * EXT_LEN) };
})();

/** Direction (degrees, SVG axes) of the ray from V to a point. */
const dirTo = (p: Pt) => (Math.atan2(p.y - V.y, p.x - V.x) * 180) / Math.PI;
function arc(r: number, fromDeg: number, toDeg: number): string {
  const a = { x: r2(V.x + r * Math.cos(rad(fromDeg))), y: r2(V.y + r * Math.sin(rad(fromDeg))) };
  const b = { x: r2(V.x + r * Math.cos(rad(toDeg))), y: r2(V.y + r * Math.sin(rad(toDeg))) };
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}

const LBL = "text-[10.5px] font-semibold";

export default function SscDecagonAngles() {
  const toN = dirTo(N); // 108°
  const toP = dirTo(P) + 360; // 252°
  const toExt = dirTo(EXT_END); // 72°
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · one corner of a regular decagon
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="A regular decagon, 10 equal sides. At one corner, a side is carried on past the corner. Between that extension and the next side is the exterior angle, 360 divided by 10, which is 36 degrees. Inside the corner is the interior angle, 180 minus 36, which is 144 degrees. The two angles together make a straight line, 180 degrees."
      >
        <polygon
          points={CORNERS.map((c) => `${c.x},${c.y}`).join(" ")}
          strokeWidth={1.8}
          className="fill-sky-100/70 stroke-foreground dark:fill-sky-900/40"
        />
        {CORNERS.map((c, k) => (
          <circle key={k} cx={c.x} cy={c.y} r={2} className="fill-foreground" />
        ))}

        {/* The extension of side PV past V */}
        <line
          x1={V.x}
          y1={V.y}
          x2={EXT_END.x}
          y2={EXT_END.y}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          className="stroke-muted-foreground"
        />
        <text x={EXT_END.x - 12} y={EXT_END.y + 15} className="fill-muted-foreground text-[9.5px]">
          side carried on
        </text>

        {/* Interior angle */}
        <path d={arc(16, toN, toP)} fill="none" strokeWidth={2} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={V.x - 22} y={V.y + 4} textAnchor="end" className={`fill-sky-700 dark:fill-sky-300 ${LBL}`}>
          144°
        </text>

        {/* Exterior angle */}
        <path d={arc(26, toExt, toN)} fill="none" strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
        <text x={V.x + 1} y={V.y + 40} textAnchor="middle" className={`fill-rose-700 dark:fill-rose-300 ${LBL}`}>
          36°
        </text>

        {/* Working */}
        <g className="text-[10.5px]">
          <text x={214} y={50} className="fill-foreground font-semibold">
            n = 10 sides
          </text>
          <text x={214} y={76} className="fill-rose-700 font-semibold dark:fill-rose-300">
            exterior
          </text>
          <text x={214} y={90} className="fill-foreground">
            360 ÷ 10 = 36°
          </text>
          <text x={214} y={116} className="fill-sky-700 font-semibold dark:fill-sky-300">
            interior
          </text>
          <text x={214} y={130} className="fill-foreground">
            180 − 36 = 144°
          </text>
          <text x={214} y={156} className="fill-muted-foreground">
            144 + 36 = 180°
          </text>
          <text x={214} y={169} className="fill-muted-foreground">
            (a straight line)
          </text>
        </g>
        <text x={160} y={236} textAnchor="middle" className="fill-indigo-700 text-[10.5px] font-semibold dark:fill-indigo-300">
          The 10 exterior angles add to 10 × 36 = 360°.
        </text>
      </svg>
    </div>
  );
}
