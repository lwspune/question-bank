/**
 * Static figure: the angle-bisector theorem, BD : DC = AB : AC (concept
 * ssc2trsi-bisector). Triangle ABC drawn to scale with the concept's worked
 * example: AB = 9, AC = 6, BC = 10, so BD : DC = 3 : 2, BD = 6 and DC = 4.
 * A is placed so that AB and AC have exactly those lengths, and D is placed
 * 6 from B; the test checks that AD then truly halves angle A. AB and BD share
 * a colour, as do AC and DC, so the pairing (the trap) is visible. Plain
 * geometry, server component. Pinned by tests/notes-w2-05.test.ts.
 */

export type Pt = { x: number; y: number };

/** The worked example. */
export const SIDES = { AB: 9, AC: 6, BC: 10 } as const;
export const bdFrom = (ab: number, ac: number, bc: number) => (bc * ab) / (ab + ac);
export const BD = bdFrom(SIDES.AB, SIDES.AC, SIDES.BC);
export const DC = SIDES.BC - BD;

// Geometry: B at the origin, C along the base, A above; 26 viewBox units per unit length.
export const SCALE = 26;
const BX = 30;
const BASE_Y = 196;
/** A's distance along BC from B, from AB² − x² = AC² − (BC − x)². */
export const A_ALONG = (SIDES.AB ** 2 - SIDES.AC ** 2 + SIDES.BC ** 2) / (2 * SIDES.BC);
export const A_HEIGHT = Math.sqrt(SIDES.AB ** 2 - A_ALONG ** 2);

const r2 = (n: number) => Math.round(n * 100) / 100;
export const B: Pt = { x: BX, y: BASE_Y };
export const C: Pt = { x: BX + SIDES.BC * SCALE, y: BASE_Y };
export const A: Pt = { x: BX + A_ALONG * SCALE, y: BASE_Y - A_HEIGHT * SCALE };
export const D: Pt = { x: BX + BD * SCALE, y: BASE_Y };
export const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);

/** The angle (degrees) at corner p between the rays to q and to s. */
export function angleAt(p: Pt, q: Pt, s: Pt): number {
  const u = { x: q.x - p.x, y: q.y - p.y };
  const v = { x: s.x - p.x, y: s.y - p.y };
  const cos = (u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
  return (Math.acos(cos) * 180) / Math.PI;
}

/** A small arc at A from the ray towards p to the ray towards q (clockwise on screen). */
function arc(p: Pt, q: Pt, r: number) {
  const t1 = Math.atan2(p.y - A.y, p.x - A.x);
  const t2 = Math.atan2(q.y - A.y, q.x - A.x);
  const x1 = r2(A.x + r * Math.cos(t1));
  const y1 = r2(A.y + r * Math.sin(t1));
  const x2 = r2(A.x + r * Math.cos(t2));
  const y2 = r2(A.y + r * Math.sin(t2));
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

const NEAR_B = "stroke-indigo-600 dark:stroke-indigo-400";
const NEAR_C = "stroke-amber-500 dark:stroke-amber-400";
const TXT_B = "fill-indigo-700 dark:fill-indigo-300";
const TXT_C = "fill-amber-700 dark:fill-amber-300";

export default function SscT2AngleBisector() {
  const a = { x: r2(A.x), y: r2(A.y) };
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the bisector splits the opposite side
      </p>
      <svg
        viewBox="0 0 320 270"
        className="block h-auto w-full"
        role="img"
        aria-label="Triangle ABC with AB 9, AC 6 and BC 10. AD bisects angle A and meets BC at D. BD, the piece next to B, is 6 and goes with AB; DC, the piece next to C, is 4 and goes with AC. BD to DC is 3 to 2, the same as AB to AC, 9 to 6."
      >
        <line x1={B.x} y1={B.y} x2={a.x} y2={a.y} strokeWidth={2.2} className={NEAR_B} />
        <line x1={a.x} y1={a.y} x2={C.x} y2={C.y} strokeWidth={2.2} className={NEAR_C} />
        <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} strokeWidth={3} className={NEAR_B} />
        <line x1={D.x} y1={D.y} x2={C.x} y2={C.y} strokeWidth={3} className={NEAR_C} />
        <line x1={a.x} y1={a.y} x2={D.x} y2={D.y} strokeWidth={1.8} strokeDasharray="5 3" className="stroke-rose-600 dark:stroke-rose-400" />

        {/* Two equal half-angles at A */}
        <path d={arc(C, D, 24)} fill="none" strokeWidth={1.5} className="stroke-rose-600 dark:stroke-rose-400" />
        <path d={arc(D, B, 24)} fill="none" strokeWidth={1.5} className="stroke-rose-600 dark:stroke-rose-400" />

        {[
          { p: a, name: "A", dx: 0, dy: -8 },
          { p: B, name: "B", dx: -9, dy: 6 },
          { p: C, name: "C", dx: 9, dy: 6 },
          { p: D, name: "D", dx: 0, dy: 15 },
        ].map(({ p, name, dx, dy }) => (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r={2.2} className="fill-foreground" />
            <text x={p.x + dx} y={p.y + dy} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {name}
            </text>
          </g>
        ))}

        <text x={r2((B.x + a.x) / 2) - 8} y={r2((B.y + a.y) / 2) - 6} textAnchor="end" className={`${TXT_B} text-[10px] font-semibold`}>
          AB = 9
        </text>
        <text x={r2((C.x + a.x) / 2) + 8} y={r2((C.y + a.y) / 2) - 6} className={`${TXT_C} text-[10px] font-semibold`}>
          AC = 6
        </text>
        <text x={(B.x + D.x) / 2} y={BASE_Y + 16} textAnchor="middle" className={`${TXT_B} text-[10px] font-semibold`}>
          BD = 6
        </text>
        <text x={(D.x + C.x) / 2} y={BASE_Y + 16} textAnchor="middle" className={`${TXT_C} text-[10px] font-semibold`}>
          DC = 4
        </text>

        <text x={160} y={232} textAnchor="middle" className="fill-foreground text-[10px]">
          AD bisects angle A: ∠BAD = ∠DAC
        </text>
        <text x={160} y={247} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          BD : DC = AB : AC = 9 : 6 = 3 : 2
        </text>
        <text x={160} y={262} textAnchor="middle" className="fill-foreground text-[10px]">
          BD = 10 × 3/5 = 6, DC = 10 − 6 = 4
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The bisector of angle A meets BC at D. The piece next to B goes with the side from B, and the piece next to C with the side
        from C: BD : DC = AB : AC. The longer side AB = 9 gets the longer piece, BD = 6. Drawn to scale.
      </p>
    </div>
  );
}
