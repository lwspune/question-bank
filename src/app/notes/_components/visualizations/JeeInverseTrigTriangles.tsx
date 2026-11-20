/**
 * Static figure: reading ratios off right triangles (concept jitf-triangle),
 * drawn with the concept's worked example, sin(tan⁻¹(8/15) + cos⁻¹(7/25)).
 *
 * A = tan⁻¹(8/15): opposite 8, adjacent 15, hypotenuse √(64 + 225) = 17, so
 * sin A = 8/17 and cos A = 15/17. B = cos⁻¹(7/25): adjacent 7, hypotenuse 25,
 * opposite √(625 − 49) = 24, so sin B = 24/25. Then
 * sin(A + B) = (8·7 + 15·24)/(17·25) = 416/425. Each triangle is drawn to its
 * own scale. Server component. Pinned by tests/notes-w2-16.test.ts.
 */

export const TRI_A = { opp: 8, adj: 15 } as const;
export const TRI_B = { adj: 7, hyp: 25 } as const;

export const hypA = () => Math.hypot(TRI_A.opp, TRI_A.adj);
export const oppB = () => Math.sqrt(TRI_B.hyp ** 2 - TRI_B.adj ** 2);

/** sin(A + B) = sin A cos B + cos A sin B, as numerator over denominator. */
export function sinSum(): { num: number; den: number } {
  const h = hypA();
  return { num: TRI_A.opp * TRI_B.adj + TRI_A.adj * oppB(), den: h * TRI_B.hyp };
}

// Drawing (viewBox units). Triangle A: 8 units per side unit; triangle B: 4.
export const SCALE_A = 8;
export const SCALE_B = 4;
const A0 = { x: 24, y: 130 };
const B0 = { x: 226, y: 130 };
const r2 = (n: number) => Math.round(n * 100) / 100;

/** The end of an angle arc of radius rad at vertex v, rising at angle t (radians). */
const arcEnd = (v: { x: number; y: number }, rad: number, t: number) => `${r2(v.x + rad * Math.cos(t))},${r2(v.y - rad * Math.sin(t))}`;

export default function JeeInverseTrigTriangles() {
  const a1 = { x: A0.x + TRI_A.adj * SCALE_A, y: A0.y };
  const a2 = { x: a1.x, y: A0.y - TRI_A.opp * SCALE_A };
  const b1 = { x: B0.x + TRI_B.adj * SCALE_B, y: B0.y };
  const b2 = { x: b1.x, y: B0.y - oppB() * SCALE_B };
  const tA = Math.atan2(TRI_A.opp, TRI_A.adj);
  const tB = Math.atan2(oppB(), TRI_B.adj);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reading the ratios off two right triangles
      </p>
      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="Two right triangles. A = tan⁻¹(8/15): opposite 8, adjacent 15, hypotenuse 17, so sin A = 8/17 and cos A = 15/17. B = cos⁻¹(7/25): adjacent 7, hypotenuse 25, opposite 24, so sin B = 24/25. Then sin(A + B) = (8·7 + 15·24)/(17·25) = 416/425."
      >
        {/* Triangle A */}
        <text x={84} y={18} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          A = tan⁻¹(8/15)
        </text>
        <polygon
          points={`${A0.x},${A0.y} ${a1.x},${a1.y} ${a2.x},${a2.y}`}
          strokeWidth={1.8}
          className="fill-sky-500/15 stroke-sky-700 dark:fill-sky-400/15 dark:stroke-sky-300"
        />
        <path d={`M${a1.x - 8},${a1.y} V${a1.y - 8} H${a1.x}`} fill="none" className="stroke-sky-700 dark:stroke-sky-300" strokeWidth={1} />
        <path d={`M${A0.x + 22},${A0.y} A22,22 0 0 0 ${arcEnd(A0, 22, tA)}`} fill="none" className="stroke-foreground" strokeWidth={1} />
        <text x={A0.x + 27} y={A0.y - 4} className="fill-foreground text-[10px] font-semibold">
          A
        </text>
        <g className="fill-foreground text-[11px] font-semibold tabular-nums">
          <text x={84} y={A0.y + 14} textAnchor="middle">
            15
          </text>
          <text x={a1.x + 5} y={(a1.y + a2.y) / 2 + 4}>8</text>
          <text x={76} y={92} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300">
            17
          </text>
        </g>

        {/* Triangle B */}
        <text x={240} y={18} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          B = cos⁻¹(7/25)
        </text>
        <polygon
          points={`${B0.x},${B0.y} ${b1.x},${b1.y} ${b2.x},${r2(b2.y)}`}
          strokeWidth={1.8}
          className="fill-amber-500/15 stroke-amber-700 dark:fill-amber-400/15 dark:stroke-amber-300"
        />
        <path d={`M${b1.x - 7},${b1.y} V${b1.y - 7} H${b1.x}`} fill="none" className="stroke-amber-700 dark:stroke-amber-300" strokeWidth={1} />
        <path d={`M${B0.x + 16},${B0.y} A16,16 0 0 0 ${arcEnd(B0, 16, tB)}`} fill="none" className="stroke-foreground" strokeWidth={1} />
        <text x={B0.x + 9} y={B0.y - 18} className="fill-foreground text-[10px] font-semibold">
          B
        </text>
        <g className="fill-foreground text-[11px] font-semibold tabular-nums">
          <text x={B0.x + 14} y={B0.y + 14} textAnchor="middle">
            7
          </text>
          <text x={b1.x + 5} y={(b1.y + b2.y) / 2 + 4} className="fill-rose-700 dark:fill-rose-300">
            24
          </text>
          <text x={233} y={78} textAnchor="end">
            25
          </text>
        </g>

        {/* The ratios */}
        <g className="text-[10px] tabular-nums">
          <text x={84} y={162} textAnchor="middle" className="fill-muted-foreground">
            hypotenuse √(8² + 15²) = 17
          </text>
          <text x={84} y={177} textAnchor="middle" className="fill-foreground font-semibold">
            sin A = 8/17, cos A = 15/17
          </text>
          <text x={240} y={162} textAnchor="middle" className="fill-muted-foreground">
            opposite √(25² − 7²) = 24
          </text>
          <text x={240} y={177} textAnchor="middle" className="fill-foreground font-semibold">
            cos B = 7/25, sin B = 24/25
          </text>
        </g>

        {/* The sum */}
        <g className="text-[11px] tabular-nums">
          <text x={160} y={202} textAnchor="middle" className="fill-foreground">
            sin(A + B) = sin A cos B + cos A sin B
          </text>
          <text x={160} y={219} textAnchor="middle" className="fill-rose-700 font-semibold dark:fill-rose-300">
            = (8·7 + 15·24)/(17·25) = 416/425
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each inverse names an angle: draw it in a right triangle from the given ratio, find the third side by Pythagoras, then read any
        ratio off the sides. A triangle gives only positive ratios, so for cos⁻¹ of a negative number the angle is obtuse and its cosine
        and tangent are negative.
      </p>
    </div>
  );
}
