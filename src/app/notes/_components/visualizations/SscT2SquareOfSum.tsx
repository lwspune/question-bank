/**
 * Static figure: (a + b)² as a square cut into a², two ab pieces and b²
 * (concept ssc2aiid-squares). Drawn to scale with the numbers from the
 * concept's trap: a = 3 and b = 4, so the square of the sum is 49 = 9 + 12 +
 * 12 + 16, while squaring term by term gives only 25 = 9 + 16, dropping the
 * two ab pieces (2ab = 24). Plain geometry, server component. Pinned by
 * tests/notes-w2-05.test.ts.
 */

/** The trap's numbers. */
export const SQ = { a: 3, b: 4 } as const;
export const squareOfSum = (a: number, b: number) => (a + b) ** 2;
export const pieces = (a: number, b: number) => ({ aa: a * a, ab: a * b, bb: b * b });

// Geometry (viewBox units): 28 units per unit length.
export const UNIT = 28;
export const X0 = 78;
export const Y0 = 34;
export const A_PX = SQ.a * UNIT;
export const B_PX = SQ.b * UNIT;
export const SIDE_PX = A_PX + B_PX;

const AA = "fill-indigo-200/80 stroke-indigo-600 dark:fill-indigo-900/60 dark:stroke-indigo-400";
const AB = "fill-amber-200/80 stroke-amber-600 dark:fill-amber-900/60 dark:stroke-amber-400";
const BB = "fill-sky-200/80 stroke-sky-600 dark:fill-sky-900/60 dark:stroke-sky-400";

export default function SscT2SquareOfSum() {
  const p = pieces(SQ.a, SQ.b);
  const cells = [
    { x: X0, y: Y0, w: A_PX, h: A_PX, cls: AA, text: `a² = ${p.aa}`, tc: "fill-indigo-900 dark:fill-indigo-100" },
    { x: X0 + A_PX, y: Y0, w: B_PX, h: A_PX, cls: AB, text: `ab = ${p.ab}`, tc: "fill-amber-900 dark:fill-amber-100" },
    { x: X0, y: Y0 + A_PX, w: A_PX, h: B_PX, cls: AB, text: `ab = ${p.ab}`, tc: "fill-amber-900 dark:fill-amber-100" },
    { x: X0 + A_PX, y: Y0 + A_PX, w: B_PX, h: B_PX, cls: BB, text: `b² = ${p.bb}`, tc: "fill-sky-900 dark:fill-sky-100" },
  ];
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the square of a sum, piece by piece
      </p>
      <svg
        viewBox="0 0 320 290"
        className="block h-auto w-full"
        role="img"
        aria-label="A square with side a plus b, where a is 3 and b is 4, so its area is 7 squared, 49. It is cut into four pieces: a square a squared of 9, two rectangles a times b of 12 each, and a square b squared of 16. 9 plus 12 plus 12 plus 16 is 49. Squaring term by term gives only 9 plus 16, 25, which leaves out the two ab pieces."
      >
        {cells.map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} strokeWidth={1.5} className={c.cls} />
            <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 4} textAnchor="middle" className={`${c.tc} text-[11px] font-semibold`}>
              {c.text}
            </text>
          </g>
        ))}

        {/* Side lengths */}
        <text x={X0 + A_PX / 2} y={Y0 - 8} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          a = 3
        </text>
        <text x={X0 + A_PX + B_PX / 2} y={Y0 - 8} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          b = 4
        </text>
        <text x={X0 - 8} y={Y0 + A_PX / 2 + 4} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          a = 3
        </text>
        <text x={X0 - 8} y={Y0 + A_PX + B_PX / 2 + 4} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          b = 4
        </text>

        <text x={160} y={Y0 + SIDE_PX + 20} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          (a + b)² = 7² = 49 = 9 + 12 + 12 + 16
        </text>
        <text x={160} y={Y0 + SIDE_PX + 35} textAnchor="middle" className="fill-foreground text-[10px]">
          Term by term: 9 + 16 = 25, both ab pieces lost
        </text>
        <text x={160} y={Y0 + SIDE_PX + 50} textAnchor="middle" className="fill-foreground text-[10px]">
          a² + b² = (a + b)² − 2ab = 49 − 24 = 25
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A square of side a + b holds a², b² and two rectangles ab, so (a + b)² = a² + 2ab + b². Take away the two ab pieces and
        what is left is a² + b² = (a + b)² − 2ab. With a = 3 and b = 4 the square of the sum is 49, not 25. Drawn to scale.
      </p>
    </div>
  );
}
