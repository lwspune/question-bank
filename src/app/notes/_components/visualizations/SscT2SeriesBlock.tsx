/**
 * Static figure: a letter series with blanks written in blocks (concept
 * ssc2rsese-blanks), using the concept's own string
 * "a b _ d a _ c d _ b c d". The first letter, a, comes back after 4 letters,
 * so the block is 4 long. Written as three rows of 4, one under another, each
 * column holds one letter, and the blanks read c, b, a.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const SERIES = ["a", "b", "_", "d", "a", "_", "c", "d", "_", "b", "c", "d"] as const;
export const BLANK = "_";

/** The block length: how far along the first letter appears again. */
export function blockLength(tokens: readonly string[]): number {
  for (let j = 1; j < tokens.length; j++) if (tokens[j] === tokens[0]) return j;
  return tokens.length;
}

/** Each blank filled from a seen letter in the same column, in order left to right. */
export function fillBlanks(tokens: readonly string[], len: number): string[] {
  const out: string[] = [];
  tokens.forEach((t, i) => {
    if (t !== BLANK) return;
    const col = i % len;
    for (let k = col; k < tokens.length; k += len) {
      if (tokens[k] !== BLANK) {
        out.push(tokens[k]);
        return;
      }
    }
  });
  return out;
}

const LEN = blockLength(SERIES);
const FILLED = fillBlanks(SERIES, LEN);
const BLANK_AT = SERIES.flatMap((t, i) => (t === BLANK ? [i] : []));

const TOP_X = 39;
const TOP_STEP = 22;
const GRID_X = 100;
const GRID_Y = 92;
const CELL_W = 30;
const CELL_H = 26;

export default function SscT2SeriesBlock() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · write the string in blocks
      </p>
      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="The string a b blank d a blank c d blank b c d. The letter a comes back after 4 letters, so the block is 4 letters long. Written in three rows of 4, one under another, the columns read a, b, c, d, so the blanks are c, b and a in turn."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          the string
        </text>
        {SERIES.map((t, i) => {
          const x = TOP_X + i * TOP_STEP;
          return t === BLANK ? (
            <rect key={i} x={x - 8} y={23} width={16} height={18} rx={2} strokeDasharray="3 2" className="fill-background stroke-rose-600 dark:stroke-rose-400" />
          ) : (
            <text key={i} x={x} y={37} textAnchor="middle" className={`text-[13px] font-semibold ${t === "a" ? "fill-sky-700 dark:fill-sky-300" : "fill-foreground"}`}>
              {t}
            </text>
          );
        })}
        {/* the gap from one a to the next */}
        <path d={`M ${TOP_X} 46 v 6 h ${4 * TOP_STEP} v -6`} fill="none" strokeWidth={1.2} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={TOP_X + 2 * TOP_STEP} y={65} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          a comes back after 4 letters: block of 4
        </text>

        {/* The string in rows of 4 */}
        <text x={GRID_X + 2 * CELL_W} y={GRID_Y - 6} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          one block per row
        </text>
        {SERIES.map((t, i) => {
          const row = Math.floor(i / LEN);
          const col = i % LEN;
          const x = GRID_X + col * CELL_W;
          const y = GRID_Y + row * CELL_H;
          const blank = t === BLANK;
          const letter = blank ? FILLED[BLANK_AT.indexOf(i)] : t;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={CELL_W}
                height={CELL_H}
                className={blank ? "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400" : "fill-background stroke-border"}
              />
              <text
                x={x + CELL_W / 2}
                y={y + 17}
                textAnchor="middle"
                className={`text-[13px] font-semibold ${blank ? "fill-emerald-700 dark:fill-emerald-300" : "fill-foreground"}`}
              >
                {letter}
              </text>
            </g>
          );
        })}
        {[0, 1, 2].map((r) => (
          <text key={r} x={GRID_X - 8} y={GRID_Y + r * CELL_H + 17} textAnchor="end" className="fill-muted-foreground text-[10px]">
            row {r + 1}
          </text>
        ))}
        <text x={GRID_X + 4 * CELL_W + 8} y={GRID_Y + 30} className="fill-muted-foreground text-[10px]">
          each column
        </text>
        <text x={GRID_X + 4 * CELL_W + 8} y={GRID_Y + 43} className="fill-muted-foreground text-[10px]">
          is one letter
        </text>

        <text x={160} y={200} textAnchor="middle" className="fill-foreground text-[11px]">
          Green cells were the blanks.
        </text>
        <text x={160} y={216} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          Blanks in order: {FILLED.join(", ")}
        </text>
      </svg>
    </div>
  );
}
