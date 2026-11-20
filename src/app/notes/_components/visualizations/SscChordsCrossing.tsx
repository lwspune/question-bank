/**
 * Static figure: two chords AB and CD crossing at P inside a circle (concept
 * sscipw-inside), drawn to scale from the worked example: AP = 15 cm,
 * PB = 4 cm, CP = 6 cm, so PD = 15 × 4 ÷ 6 = 10 cm and CD = 16 cm. The circle
 * is the one through A, B and C; D, placed 10 cm from P along CP, lands on it
 * only because PA × PB = PC × PD, which the test checks. Plain geometry,
 * server component. Pinned by tests/notes-w2-13.test.ts.
 */

export type Pt = { x: number; y: number };

/** The worked example, in cm. */
export const PIECES = { pa: 15, pb: 4, pc: 6 } as const;
/** PA × PB = PC × PD. */
export const pdFor = (pa: number, pb: number, pc: number) => (pa * pb) / pc;
export const PD_CM = pdFor(PIECES.pa, PIECES.pb, PIECES.pc);

/** viewBox units per cm, and the angle chord CD makes with AB. */
export const K = 8;
export const CHORD_ANGLE = 70;

const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

export const P: Pt = { x: 194, y: 104 };
const u = { x: Math.cos(rad(CHORD_ANGLE)), y: -Math.sin(rad(CHORD_ANGLE)) };
export const A: Pt = { x: P.x - PIECES.pa * K, y: P.y };
export const B: Pt = { x: P.x + PIECES.pb * K, y: P.y };
export const C: Pt = { x: P.x + PIECES.pc * K * u.x, y: P.y + PIECES.pc * K * u.y };
export const D: Pt = { x: P.x - PD_CM * K * u.x, y: P.y - PD_CM * K * u.y };

/** The centre of the circle through three points. */
export function circumcentre(a: Pt, b: Pt, c: Pt): Pt {
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  const a2 = a.x * a.x + a.y * a.y;
  const b2 = b.x * b.x + b.y * b.y;
  const c2 = c.x * c.x + c.y * c.y;
  return {
    x: (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d,
    y: (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d,
  };
}

export const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);
export const CENTRE = circumcentre(A, B, C);
export const RADIUS = dist(CENTRE, A);

export default function SscChordsCrossing() {
  const pts = { A, B, C, D, P };
  const R = r2(RADIUS);
  const mid = (p: Pt, q: Pt): Pt => ({ x: r2((p.x + q.x) / 2), y: r2((p.y + q.y) / 2) });
  const mAP = mid(A, P);
  const mPB = mid(P, B);
  const mCP = mid(C, P);
  const mPD = mid(P, D);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two chords crossing inside a circle
      </p>
      <svg
        viewBox="0 0 320 246"
        className="block h-auto w-full"
        role="img"
        aria-label="A circle with chords AB and CD crossing at P, drawn to scale. AP is 15 centimetres and PB is 4, CP is 6. Since PA times PB equals PC times PD, 15 times 4 is 60, so PD is 10 centimetres and CD is 16."
      >
        <circle cx={r2(CENTRE.x)} cy={r2(CENTRE.y)} r={R} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <line x1={A.x} y1={A.y} x2={r2(P.x)} y2={r2(P.y)} strokeWidth={2.6} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={r2(P.x)} y1={r2(P.y)} x2={B.x} y2={B.y} strokeWidth={2.6} className="stroke-sky-500 dark:stroke-sky-400" />
        <line x1={r2(C.x)} y1={r2(C.y)} x2={r2(P.x)} y2={r2(P.y)} strokeWidth={2.6} className="stroke-amber-500 dark:stroke-amber-400" />
        <line x1={r2(P.x)} y1={r2(P.y)} x2={r2(D.x)} y2={r2(D.y)} strokeWidth={2.6} className="stroke-rose-500 dark:stroke-rose-400" />

        {(
          [
            ["A", -9, 4],
            ["B", 9, 4],
            ["C", 6, -6],
            ["D", -4, 15],
            ["P", 10, 14],
          ] as const
        ).map(([n, dx, dy]) => {
          const p = pts[n];
          return (
            <g key={n}>
              <circle cx={r2(p.x)} cy={r2(p.y)} r={2.6} className="fill-foreground" />
              <text x={r2(p.x + dx)} y={r2(p.y + dy)} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                {n}
              </text>
            </g>
          );
        })}

        <text x={mAP.x} y={mAP.y - 6} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          15
        </text>
        <text x={mPB.x + 2} y={mPB.y - 6} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          4
        </text>
        <text x={mCP.x + 10} y={mCP.y + 4} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          6
        </text>
        <text x={mPD.x - 10} y={mPD.y + 4} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          10
        </text>

        <text x={160} y={208} textAnchor="middle" className="fill-foreground text-[10px]">
          PA × PB = PC × PD
        </text>
        <text x={160} y={223} textAnchor="middle" className="fill-foreground text-[10px]">
          15 × 4 = 60 = 6 × PD, so PD = 60 ÷ 6 = {PD_CM} cm
        </text>
        <text x={160} y={238} textAnchor="middle" className="fill-foreground text-[10px]">
          CD = CP + PD = 6 + {PD_CM} = {PIECES.pc + PD_CM} cm (lengths in cm, drawn to scale)
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        All four pieces are measured from P, the crossing point. The two products are equal: 15 × 4 = 6 × 10 = 60. Find the missing piece
        first, then add the two pieces of CD to get the whole chord.
      </p>
    </div>
  );
}
