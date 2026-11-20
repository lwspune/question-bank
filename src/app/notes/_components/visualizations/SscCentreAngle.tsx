/**
 * Static figure: the angle at the centre is twice the angle at the
 * circumference (concept sscian-centre), drawn to the worked example. Chord
 * AB subtends 124° at the centre O; a point C on the major arc sees
 * 124° ÷ 2 = 62°, and a point D on the minor arc sees half the reflex angle,
 * (360° − 124°) ÷ 2 = 118°. 62° + 118° = 180°. A and B are placed 124° apart
 * on the circle, so the angles measured off the picture are the stated ones.
 * Plain geometry, server component. Pinned by tests/notes-w2-13.test.ts.
 */

export type Pt = { x: number; y: number };

/** The worked example. */
export const CENTRE_ANGLE = 124;
export const majorArcAngle = (centre: number) => centre / 2;
export const minorArcAngle = (centre: number) => (360 - centre) / 2;

const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

export const O: Pt = { x: 160, y: 112 };
export const RADIUS = 78;
/** A point on the circle at angle a (degrees, SVG y down: 90 is straight down). */
export const onCircle = (a: number): Pt => ({ x: r2(O.x + RADIUS * Math.cos(rad(a))), y: r2(O.y + RADIUS * Math.sin(rad(a))) });

/** The chord AB sits low, 124° apart about the downward direction. */
export const A = onCircle(90 + CENTRE_ANGLE / 2);
export const B = onCircle(90 - CENTRE_ANGLE / 2);
/** C at the top (major arc), D at the bottom (minor arc). */
export const C = onCircle(-90);
export const D = onCircle(90);

/** The angle at vertex v between rays v→p and v→q, in degrees. */
export function angleAt(v: Pt, p: Pt, q: Pt): number {
  const a = Math.atan2(p.y - v.y, p.x - v.x);
  const b = Math.atan2(q.y - v.y, q.x - v.x);
  let d = Math.abs(a - b);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return (d * 180) / Math.PI;
}

const dirDeg = (from: Pt, to: Pt) => (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;

/** A polyline arc of radius r round c from angle a1 to a2 (degrees). */
function arc(c: Pt, r: number, a1: number, a2: number): string {
  const n = 18;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = rad(a1 + ((a2 - a1) * i) / n);
    return `${r2(c.x + r * Math.cos(t))},${r2(c.y + r * Math.sin(t))}`;
  }).join(" ");
}

export default function SscCentreAngle() {
  const atC = majorArcAngle(CENTRE_ANGLE);
  const atD = minorArcAngle(CENTRE_ANGLE);
  // Arc ends, from the actual directions of the drawn lines.
  const cA = dirDeg(C, A);
  const cB = dirDeg(C, B);
  const dA = dirDeg(D, A);
  const dB = dirDeg(D, B);
  const oA = dirDeg(O, A);
  const oB = dirDeg(O, B);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · angle at the centre and at the circumference
      </p>
      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="A circle with centre O and a chord AB that subtends 124 degrees at O. A point C on the major arc sees AB at 62 degrees, half of 124. A point D on the minor arc sees AB at 118 degrees, half of the reflex angle 236. 62 plus 118 is 180."
      >
        <circle cx={O.x} cy={O.y} r={RADIUS} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} strokeWidth={1.8} className="stroke-foreground" />
        {/* Centre angle */}
        <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} strokeWidth={1.8} className="stroke-sky-600 dark:stroke-sky-400" />
        <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} strokeWidth={1.8} className="stroke-sky-600 dark:stroke-sky-400" />
        <polyline points={arc(O, 16, oB, oA)} fill="none" strokeWidth={1.4} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={O.x} y={O.y + 32} textAnchor="middle" className="fill-sky-700 text-[11px] font-bold dark:fill-sky-300">
          124°
        </text>
        {/* C on the major arc */}
        <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} strokeWidth={1.6} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} strokeWidth={1.6} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <polyline points={arc(C, 22, cB, cA)} fill="none" strokeWidth={1.4} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={C.x} y={C.y + 36} textAnchor="middle" className="fill-indigo-700 text-[11px] font-bold dark:fill-indigo-300">
          62°
        </text>
        {/* D on the minor arc */}
        <line x1={D.x} y1={D.y} x2={A.x} y2={A.y} strokeWidth={1.6} className="stroke-amber-500 dark:stroke-amber-400" />
        <line x1={D.x} y1={D.y} x2={B.x} y2={B.y} strokeWidth={1.6} className="stroke-amber-500 dark:stroke-amber-400" />
        <polyline points={arc(D, 12, dA, dB)} fill="none" strokeWidth={1.4} className="stroke-amber-600 dark:stroke-amber-400" />
        <text x={D.x} y={D.y - 18} textAnchor="middle" className="fill-amber-700 text-[11px] font-bold dark:fill-amber-300">
          118°
        </text>

        {[
          { p: O, name: "O", dx: 0, dy: -7 },
          { p: A, name: "A", dx: -10, dy: 4 },
          { p: B, name: "B", dx: 10, dy: 4 },
          { p: C, name: "C", dx: 0, dy: -7 },
          { p: D, name: "D", dx: 0, dy: 15 },
        ].map(({ p, name, dx, dy }) => (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r={2.4} className="fill-foreground" />
            <text x={p.x + dx} y={p.y + dy} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {name}
            </text>
          </g>
        ))}

        <text x={160} y={222} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          C on the major arc: 124° ÷ 2 = {atC}°
        </text>
        <text x={160} y={237} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          D on the minor arc: (360° − 124°) ÷ 2 = 236° ÷ 2 = {atD}°
        </text>
        <text x={160} y={252} textAnchor="middle" className="fill-foreground text-[10px]">
          Check: {atC}° + {atD}° = {atC + atD}°
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        From the centre, chord AB looks twice as wide as from a point C on the major arc: 124° at O, 62° at C. A point D on the minor arc
        stands on the major arc, so it sees half the reflex angle, 118°, not 62°.
      </p>
    </div>
  );
}
