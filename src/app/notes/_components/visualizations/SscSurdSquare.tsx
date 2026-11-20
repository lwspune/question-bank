/**
 * Static figure: the square of √5 + √3 cut into four pieces (concept
 * sscsirt-sqrt). The concept's worked example: √(8 + 2√15). A square of side
 * √5 + √3 has a piece of area 5, a piece of area 3 and two pieces of √5 × √3
 * = √15, so its area is 5 + 3 + 2√15 = 8 + 2√15, and √(8 + 2√15) = √5 + √3:
 * look for m + n = 8 and mn = 15, which are 5 and 3. Drawn to scale.
 * Server component. Pinned by tests/notes-w2-18.test.ts.
 */

/** The worked example: √(a + 2√b) with a = 8, b = 15, found as √m + √n. */
export const SURD = { a: 8, b: 15, m: 5, n: 3 } as const;

/** Every pair m > n of whole numbers with m + n = a and mn = b. */
export function findPair(a: number, b: number): { m: number; n: number } | null {
  for (let n = 1; n <= a / 2; n++) {
    const m = a - n;
    if (m * n === b && m > n) return { m, n };
  }
  return null;
}

/** The four pieces of the square of side √m + √n. */
export const pieces = (m: number, n: number) => ({ big: m, small: n, rect: Math.sqrt(m * n) });

// Geometry (viewBox units): 45 units per 1, drawn to scale.
export const PX_PER_UNIT = 45;
export const SQ_X = 70;
export const SQ_Y = 34;
export const SIDE_M = Math.sqrt(SURD.m) * PX_PER_UNIT;
export const SIDE_N = Math.sqrt(SURD.n) * PX_PER_UNIT;
export const SIDE = SIDE_M + SIDE_N;

const BIG = "fill-sky-200/80 stroke-sky-600 dark:fill-sky-900/70 dark:stroke-sky-400";
const SMALL = "fill-emerald-200/80 stroke-emerald-600 dark:fill-emerald-900/70 dark:stroke-emerald-400";
const RECT = "fill-amber-200/80 stroke-amber-600 dark:fill-amber-900/70 dark:stroke-amber-400";

export default function SscSurdSquare() {
  const xm = SQ_X + SIDE_M;
  const ym = SQ_Y + SIDE_M;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the square of a sum of two roots
      </p>
      <svg
        viewBox="0 0 320 282"
        className="block h-auto w-full"
        role="img"
        aria-label="A square whose side is root 5 plus root 3, drawn to scale. It splits into a square of area 5, a square of area 3 and two rectangles of root 5 times root 3, which is root 15 each. So its area is 5 plus 3 plus 2 root 15, which is 8 plus 2 root 15, and the square root of 8 plus 2 root 15 is root 5 plus root 3."
      >
        <rect x={SQ_X} y={SQ_Y} width={SIDE_M} height={SIDE_M} strokeWidth={1.4} className={BIG} />
        <rect x={xm} y={SQ_Y} width={SIDE_N} height={SIDE_M} strokeWidth={1.4} className={RECT} />
        <rect x={SQ_X} y={ym} width={SIDE_M} height={SIDE_N} strokeWidth={1.4} className={RECT} />
        <rect x={xm} y={ym} width={SIDE_N} height={SIDE_N} strokeWidth={1.4} className={SMALL} />

        <text x={SQ_X + SIDE_M / 2} y={SQ_Y + SIDE_M / 2 + 5} textAnchor="middle" className="fill-sky-900 text-[13px] font-semibold dark:fill-sky-100">
          5
        </text>
        <text x={xm + SIDE_N / 2} y={SQ_Y + SIDE_M / 2 + 4} textAnchor="middle" className="fill-amber-900 text-[11px] font-semibold dark:fill-amber-100">
          √15
        </text>
        <text x={SQ_X + SIDE_M / 2} y={ym + SIDE_N / 2 + 4} textAnchor="middle" className="fill-amber-900 text-[11px] font-semibold dark:fill-amber-100">
          √15
        </text>
        <text x={xm + SIDE_N / 2} y={ym + SIDE_N / 2 + 5} textAnchor="middle" className="fill-emerald-900 text-[13px] font-semibold dark:fill-emerald-100">
          3
        </text>

        {/* Side lengths */}
        <text x={SQ_X + SIDE_M / 2} y={SQ_Y - 7} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          √5
        </text>
        <text x={xm + SIDE_N / 2} y={SQ_Y - 7} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          √3
        </text>
        <text x={SQ_X - 7} y={SQ_Y + SIDE_M / 2 + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          √5
        </text>
        <text x={SQ_X - 7} y={ym + SIDE_N / 2 + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          √3
        </text>

        <text x={160} y={234} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Area = 5 + 3 + 2√15 = 8 + 2√15
        </text>
        <text x={160} y={251} textAnchor="middle" className="fill-foreground text-[10.5px]">
          5 and 3 add to 8 and multiply to 15
        </text>
        <text x={160} y={270} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          So √(8 + 2√15) = √5 + √3
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The two equal pieces are each √5 × √3 = √15, which is why the surd part must be written as 2 times a root. The whole
        numbers 5 and 3 add up to 8, and the number under the root, 15, is their product. Drawn to scale.
      </p>
    </div>
  );
}
