/**
 * Static figure: two tangents PA and PB from an outside point P to a circle
 * with centre O (concept sscitg-pair), drawn to the worked example's angle:
 * angle APB = 50°, so angle AOB = 180° − 50° = 130° and OP halves angle APB
 * into 25° and 25°. The tangents are equal (PA = PB) and each meets its radius
 * at a right angle. Positions are computed from the 50° angle, so the picture
 * is true to it. Plain geometry, server component. Pinned by
 * tests/notes-w2-13.test.ts.
 */

export type Pt = { x: number; y: number };

/** The worked example. */
export const ANGLE_APB = 50;
export const aobFor = (apb: number) => 180 - apb;
export const opaFor = (apb: number) => apb / 2;

const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Centre and radius (viewBox units). */
export const O: Pt = { x: 96, y: 78 };
export const RADIUS = 54;
/** OP is the hypotenuse of right triangle OAP with the angle 25° at P: OP = r / sin 25°. */
export const OP_LEN = RADIUS / Math.sin(rad(opaFor(ANGLE_APB)));
export const P: Pt = { x: r2(O.x + OP_LEN), y: O.y };
/** Angle AOP = 90° − 25° = 65°, so A and B sit 65° either side of OP. */
const HALF_AOB = rad(aobFor(ANGLE_APB) / 2);
export const A: Pt = { x: r2(O.x + RADIUS * Math.cos(HALF_AOB)), y: r2(O.y - RADIUS * Math.sin(HALF_AOB)) };
export const B: Pt = { x: A.x, y: r2(O.y + RADIUS * Math.sin(HALF_AOB)) };

export const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);
/** The angle at vertex v between rays v→p and v→q, in degrees. */
export function angleAt(v: Pt, p: Pt, q: Pt): number {
  const a = Math.atan2(p.y - v.y, p.x - v.x);
  const b = Math.atan2(q.y - v.y, q.x - v.x);
  let d = Math.abs(a - b);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return (d * 180) / Math.PI;
}

/** A polyline arc of radius r round c from angle a1 to a2 (degrees, SVG y down). */
function arc(c: Pt, r: number, a1: number, a2: number): string {
  const n = 16;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = rad(a1 + ((a2 - a1) * i) / n);
    return `${r2(c.x + r * Math.cos(t))},${r2(c.y + r * Math.sin(t))}`;
  }).join(" ");
}

/** A small right-angle square at v, along the unit directions to p and q. */
function RightMark({ v, p, q }: { v: Pt; p: Pt; q: Pt }) {
  const s = 7;
  const u = { x: (p.x - v.x) / dist(v, p), y: (p.y - v.y) / dist(v, p) };
  const w = { x: (q.x - v.x) / dist(v, q), y: (q.y - v.y) / dist(v, q) };
  const a = { x: r2(v.x + u.x * s), y: r2(v.y + u.y * s) };
  const c = { x: r2(v.x + w.x * s), y: r2(v.y + w.y * s) };
  const m = { x: r2(v.x + (u.x + w.x) * s), y: r2(v.y + (u.y + w.y) * s) };
  return <polyline points={`${a.x},${a.y} ${m.x},${m.y} ${c.x},${c.y}`} fill="none" strokeWidth={1.2} className="stroke-foreground" />;
}

/** One tick across segment pq at its middle (equal lengths). */
function Tick({ p, q }: { p: Pt; q: Pt }) {
  const len = dist(p, q);
  const ux = (q.x - p.x) / len;
  const uy = (q.y - p.y) / len;
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2;
  return <line x1={r2(mx - uy * 5)} y1={r2(my + ux * 5)} x2={r2(mx + uy * 5)} y2={r2(my - ux * 5)} strokeWidth={1.4} className="stroke-foreground" />;
}

export default function SscTangentPair() {
  const half = opaFor(ANGLE_APB);
  const aobHalf = aobFor(ANGLE_APB) / 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two tangents from one outside point
      </p>
      <svg
        viewBox="0 0 320 210"
        className="block h-auto w-full"
        role="img"
        aria-label="A circle with centre O and an outside point P. The tangents PA and PB touch the circle at A and B and are equal. Each radius OA and OB meets its tangent at a right angle. Angle APB is 50 degrees, so angle AOB is 130 degrees, and OP halves angle APB into 25 degrees and 25 degrees."
      >
        <circle cx={O.x} cy={O.y} r={RADIUS} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        {/* Radii */}
        <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} strokeWidth={1.8} className="stroke-amber-500 dark:stroke-amber-400" />
        <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} strokeWidth={1.8} className="stroke-amber-500 dark:stroke-amber-400" />
        {/* Tangents */}
        <line x1={P.x} y1={P.y} x2={A.x} y2={A.y} strokeWidth={2.2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={P.x} y1={P.y} x2={B.x} y2={B.y} strokeWidth={2.2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        {/* OP */}
        <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} strokeWidth={1.2} strokeDasharray="4 3" className="stroke-muted-foreground" />

        <RightMark v={A} p={O} q={P} />
        <RightMark v={B} p={O} q={P} />
        <Tick p={P} q={A} />
        <Tick p={P} q={B} />

        {/* Angles at P: 25° either side of OP */}
        <polyline points={arc(P, 34, 180 - half, 180)} fill="none" strokeWidth={1.4} className="stroke-rose-600 dark:stroke-rose-400" />
        <polyline points={arc(P, 40, 180, 180 + half)} fill="none" strokeWidth={1.4} className="stroke-rose-600 dark:stroke-rose-400" />
        <text x={P.x - 50} y={P.y - 6} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          25°
        </text>
        <text x={P.x - 56} y={P.y + 15} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          25°
        </text>
        {/* Angle at O: 130° */}
        <polyline points={arc(O, 16, -aobHalf, aobHalf)} fill="none" strokeWidth={1.4} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={O.x + 28} y={O.y - 22} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          130°
        </text>

        {[
          { p: O, name: "O", dx: -9, dy: 4 },
          { p: A, name: "A", dx: -4, dy: -8 },
          { p: B, name: "B", dx: -4, dy: 16 },
          { p: P, name: "P", dx: 10, dy: 4 },
        ].map(({ p, name, dx, dy }) => (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r={2.4} className="fill-foreground" />
            <text x={p.x + dx} y={p.y + dy} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {name}
            </text>
          </g>
        ))}

        <text x={160} y={166} textAnchor="middle" className="fill-foreground text-[10px]">
          PA = PB, and OA ⊥ PA, OB ⊥ PB (90° at A and B)
        </text>
        <text x={160} y={182} textAnchor="middle" className="fill-foreground text-[10px]">
          ∠APB = 50°, so ∠AOB = 180° − 50° = 130°
        </text>
        <text x={160} y={198} textAnchor="middle" className="fill-foreground text-[10px]">
          OP halves ∠APB: ∠OPA = 50° ÷ 2 = 25°
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The two tangents from P are equal, and each one is at right angles to the radius at its point of contact. So the angles at A and B
        are 90° each, and in OAPB the angles at P and O add to 180°: with 50° at P, the angle at O is 130°. OP halves the 50°, giving 25°.
      </p>
    </div>
  );
}
