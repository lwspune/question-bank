/**
 * Static figure: the triangles cut out by a trapezium's diagonals (concept
 * sscqupr-trapezium), with the concept's self-check: PQ ∥ SR, PQ = 6 cm,
 * SR = 9 cm, diagonals meeting at O. Triangles POQ and ROS have the same
 * angles, scale PQ : SR = 6 : 9 = 2 : 3, so PO : OR = 2 : 3 (and QO : OS)
 * and their areas are 2² : 3² = 4 : 9. The height is not given in the
 * concept; 5 cm is chosen only to draw it (the ratios do not depend on it).
 * Drawn to scale. Server component. Pinned by tests/notes-w2-04.test.ts.
 */

export type Pt = { x: number; y: number };

/** The trapezium in cm: SR on the ground, PQ above it. */
export const TRAP = { PQ: 6, SR: 9, h: 5, offset: 1.5 } as const;
export const S: Pt = { x: 0, y: 0 };
export const R: Pt = { x: TRAP.SR, y: 0 };
export const P: Pt = { x: TRAP.offset, y: TRAP.h };
export const Q: Pt = { x: TRAP.offset + TRAP.PQ, y: TRAP.h };

/** Where two segments' lines meet. */
export function meet(a1: Pt, a2: Pt, b1: Pt, b2: Pt): Pt {
  const d = (a2.x - a1.x) * (b2.y - b1.y) - (a2.y - a1.y) * (b2.x - b1.x);
  const t = ((b1.x - a1.x) * (b2.y - b1.y) - (b1.y - a1.y) * (b2.x - b1.x)) / d;
  return { x: a1.x + t * (a2.x - a1.x), y: a1.y + t * (a2.y - a1.y) };
}
export const O = meet(P, R, Q, S);

export const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);
export const triArea = (a: Pt, b: Pt, c: Pt) => Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;

// Geometry (viewBox units).
export const SCALE = 20;
export const X0 = 16;
export const BASE_Y = 172;
const r2 = (n: number) => Math.round(n * 100) / 100;
const sx = (p: Pt) => r2(X0 + p.x * SCALE);
const sy = (p: Pt) => r2(BASE_Y - p.y * SCALE);
const pts = (...ps: Pt[]) => ps.map((p) => `${sx(p)},${sy(p)}`).join(" ");

export default function SscTrapeziumDiagonals() {
  // Ticks cutting PR into 5 equal parts: 2 on PO, 3 on OR.
  const ticks = [1, 2, 3, 4].map((i) => ({ x: P.x + (i / 5) * (R.x - P.x), y: P.y + (i / 5) * (R.y - P.y) }));
  const len = dist(P, R);
  const nx = (-(R.y - P.y) / len) * 4;
  const ny = ((R.x - P.x) / len) * 4;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the two triangles made by a trapezium&apos;s diagonals
      </p>
      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label="Trapezium PQRS with PQ parallel to SR, PQ 6 centimetres and SR 9 centimetres. The diagonals PR and QS meet at O. Triangles POQ and ROS are similar with scale 2 to 3, so PO to OR is 2 to 3 and their areas are 4 to 9."
      >
        {/* The two similar triangles */}
        <polygon points={pts(P, O, Q)} className="fill-sky-400/45 dark:fill-sky-500/35" />
        <polygon points={pts(R, O, S)} className="fill-amber-400/45 dark:fill-amber-500/35" />

        {/* Trapezium and diagonals */}
        <polygon points={pts(P, Q, R, S)} fill="none" strokeWidth={1.8} className="stroke-foreground" />
        <line x1={sx(P)} y1={sy(P)} x2={sx(R)} y2={sy(R)} strokeWidth={1.3} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={sx(Q)} y1={sy(Q)} x2={sx(S)} y2={sy(S)} strokeWidth={1.3} className="stroke-indigo-600 dark:stroke-indigo-400" />
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={r2(sx(t) - nx)}
            y1={r2(sy(t) + ny)}
            x2={r2(sx(t) + nx)}
            y2={r2(sy(t) - ny)}
            strokeWidth={1.3}
            className="stroke-indigo-600 dark:stroke-indigo-400"
          />
        ))}

        {/* Parallel arrows on PQ and SR */}
        <path d={`M ${sx(P) + 20} ${sy(P) - 4} l 6 4 l -6 4`} fill="none" className="stroke-foreground" />
        <path d={`M ${sx(S) + 30} ${sy(S) - 4} l 6 4 l -6 4`} fill="none" className="stroke-foreground" />

        {/* Corner and side labels */}
        <g className="fill-foreground text-[12px] font-semibold">
          <text x={sx(P) - 4} y={sy(P) - 6} textAnchor="end">P</text>
          <text x={sx(Q) + 4} y={sy(Q) - 6}>Q</text>
          <text x={sx(R) + 5} y={sy(R) + 4}>R</text>
          <text x={sx(S) - 5} y={sy(S) + 4} textAnchor="end">S</text>
          <text x={sx(O)} y={sy(O) + 18} textAnchor="middle">O</text>
        </g>
        <text x={r2((sx(P) + sx(Q)) / 2)} y={sy(P) - 8} textAnchor="middle" className="fill-sky-800 text-[11px] font-semibold dark:fill-sky-200">
          6 cm
        </text>
        <text x={r2((sx(S) + sx(R)) / 2)} y={sy(S) + 16} textAnchor="middle" className="fill-amber-800 text-[11px] font-semibold dark:fill-amber-200">
          9 cm
        </text>

        {/* The reading */}
        <g className="text-[10.5px] tabular-nums">
          <text x={214} y={62} className="fill-foreground font-semibold">same angles</text>
          <text x={214} y={76} className="fill-foreground">scale 6 : 9</text>
          <text x={214} y={90} className="fill-foreground">= 2 : 3</text>
          <text x={214} y={114} className="fill-indigo-700 dark:fill-indigo-300">PO : OR = 2 : 3</text>
          <text x={214} y={128} className="fill-indigo-700 dark:fill-indigo-300">QO : OS = 2 : 3</text>
          <text x={214} y={152} className="fill-foreground">areas POQ : ROS</text>
          <text x={214} y={166} className="fill-foreground font-semibold">= 2² : 3² = 4 : 9</text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Drawn to scale. Because PQ is parallel to SR, triangles POQ and ROS have the same angles: one is a scaled copy of the other, with
        scale 6 : 9 = 2 : 3. The ticks cut PR into 5 equal parts, 2 on PO and 3 on OR. Areas go as the square of the scale, 4 : 9.
      </p>
    </div>
  );
}
