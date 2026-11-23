/**
 * Static figure: a one-line expression worked in BODMAS order (concept
 * sscrmosu-bodmas, its worked example 48 ÷ 6 × 2 + 15 - 3 × 4). The two
 * division-and-multiplication blocks go first, each from left to right
 * (48 ÷ 6 = 8, 8 × 2 = 16, and 3 × 4 = 12); the row left, 16 + 15 - 12, is
 * then worked from left to right: 31 - 12 = 19.
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

/** The worked example, one token per entry. */
export const TOKENS = ["48", "÷", "6", "×", "2", "+", "15", "−", "3", "×", "4"] as const;

/** The ÷ and × blocks, as [first token, last token] (inclusive). */
export const BLOCKS: readonly (readonly [number, number])[] = [
  [0, 4],
  [8, 10],
];

/** Work a block of ÷ and × from left to right. */
export function workBlock(tokens: readonly string[]): number {
  let v = Number(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const n = Number(tokens[i + 1]);
    v = tokens[i] === "÷" ? v / n : v * n;
  }
  return v;
}

/** The row after the blocks are worked: numbers and the + and − signs. */
export function afterBlocks(tokens: readonly string[], blocks: readonly (readonly [number, number])[]): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    const block = blocks.find(([s]) => s === i);
    if (block) {
      out.push(String(workBlock(tokens.slice(block[0], block[1] + 1))));
      i = block[1] + 1;
    } else {
      out.push(tokens[i]);
      i++;
    }
  }
  return out;
}

/** Work + and − from left to right. */
export function workLeftToRight(row: readonly string[]): number {
  let v = Number(row[0]);
  for (let i = 1; i < row.length; i += 2) v = row[i] === "+" ? v + Number(row[i + 1]) : v - Number(row[i + 1]);
  return v;
}

export const ROW_2 = afterBlocks(TOKENS, BLOCKS);
export const RESULT = workLeftToRight(ROW_2);

// Geometry (viewBox units).
const X0 = 40;
const DX = 24;
const tx = (i: number) => X0 + DX * i;
const Y1 = 34;
const Y2 = 116;

export default function SscBodmasRow() {
  const inBlock = (i: number) => BLOCKS.some(([s, e]) => i >= s && i <= e);
  const blockMid = BLOCKS.map(([s, e]) => (tx(s) + tx(e)) / 2);
  // x of each entry on the second row: a block's result under its middle,
  // every other token straight under itself.
  const row2X: number[] = [];
  let i = 0;
  while (i < TOKENS.length) {
    const k = BLOCKS.findIndex(([s]) => s === i);
    if (k >= 0) {
      row2X.push(blockMid[k]);
      i = BLOCKS[k][1] + 1;
    } else {
      row2X.push(tx(i));
      i++;
    }
  }
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · division and multiplication before addition
      </p>
      <svg
        viewBox="0 0 320 172"
        className="block h-auto w-full"
        role="img"
        aria-label="The row 48 divided by 6 times 2 plus 15 minus 3 times 4. The two blocks of division and multiplication are worked first, from left to right: 48 divided by 6 is 8, and 8 times 2 is 16; 3 times 4 is 12. The row becomes 16 plus 15 minus 12, worked from left to right: 16 plus 15 is 31, and 31 minus 12 is 19."
      >
        {TOKENS.map((t, k) => (
          <text
            key={k}
            x={tx(k)}
            y={Y1}
            textAnchor="middle"
            className={
              inBlock(k)
                ? "fill-amber-800 text-[13px] font-semibold dark:fill-amber-200"
                : "fill-foreground text-[13px] font-semibold"
            }
          >
            {t}
          </text>
        ))}

        {/* Brackets under the blocks and arrows down to their results */}
        {BLOCKS.map(([s, e], k) => {
          const x1 = tx(s) - 9;
          const x2 = tx(e) + 9;
          const mid = blockMid[k];
          return (
            <g key={k} className="stroke-amber-600 dark:stroke-amber-400" fill="none" strokeWidth={1.5}>
              <path d={`M ${x1} 42 L ${x1} 48 L ${x2} 48 L ${x2} 42`} />
              <line x1={mid} y1={48} x2={mid} y2={Y2 - 18} />
              <polygon points={`${mid},${Y2 - 14} ${mid - 4},${Y2 - 21} ${mid + 4},${Y2 - 21}`} className="fill-amber-600 stroke-none dark:fill-amber-400" />
            </g>
          );
        })}
        <text x={44} y={66} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
          48 ÷ 6 = 8
        </text>
        <text x={44} y={78} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
          8 × 2 = 16
        </text>
        <text x={tx(6)} y={72} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          1st: ÷ and ×
        </text>
        <text x={tx(6)} y={84} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
          left to right
        </text>

        {ROW_2.map((t, k) => (
          <text key={k} x={row2X[k]} y={Y2} textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
            {t}
          </text>
        ))}

        <text x={160} y={144} textAnchor="middle" className="fill-sky-700 text-[11px] dark:fill-sky-300">
          2nd: + and −, left to right: 16 + 15 = 31, 31 − 12 = 19
        </text>
        <text x={160} y={164} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          Answer: {RESULT}
        </text>
      </svg>
    </div>
  );
}
