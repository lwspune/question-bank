/**
 * Static figure: a row of girls counted from both ends (concept
 * sscrorrk-rank, its worked example). Tara is 9th from the left and 14th from
 * the right, so she has 8 girls on her left and 13 on her right: the row is
 * 8 + 1 + 13 = 22, the same as 9 + 14 − 1, because Tara is counted in both
 * ranks. Every girl in the row is drawn, with her rank from the left above
 * (up to Tara) and from the right below (up to Tara). Server component.
 * Pinned by tests/notes-w2-20.test.ts.
 */

/** The worked example. */
export const FROM_LEFT = 9;
export const FROM_RIGHT = 14;
export const totalInRow = (left: number, right: number) => left + right - 1;
export const fromOtherEnd = (total: number, rank: number) => total - rank + 1;

export const TOTAL = totalInRow(FROM_LEFT, FROM_RIGHT);
export const ON_LEFT = FROM_LEFT - 1;
export const ON_RIGHT = FROM_RIGHT - 1;
/** Tara's seat, counting from 0 at the left end. */
export const TARA = FROM_LEFT - 1;

/** Rank from the left of seat i (0-based), and from the right. */
export const rankLeft = (i: number) => i + 1;
export const rankRight = (i: number) => TOTAL - i;

// Geometry (viewBox units).
export const GAP = 13;
export const ROW_X = 23;
export const ROW_Y = 84;
export const seatX = (i: number) => ROW_X + i * GAP;

const NUM = "text-[10px] tabular-nums";

export default function SscRankRow() {
  const seats = Array.from({ length: TOTAL }, (_, i) => i);
  const leftEnd = seatX(0) - 5;
  const leftStop = seatX(TARA - 1) + 5;
  const rightStart = seatX(TARA + 1) - 5;
  const rightEnd = seatX(TOTAL - 1) + 5;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · one row, counted from both ends
      </p>
      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label="A row of 22 girls. Tara is 9th from the left and 14th from the right. She has 8 girls on her left and 13 on her right. So the row has 8 plus 1 plus 13, which is 22 girls, the same as 9 plus 14 minus 1, because Tara is counted in both ranks."
      >
        <text x={leftEnd} y={40} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          rank from the left →
        </text>
        <text x={rightEnd} y={138} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          ← rank from the right
        </text>

        {seats.map((i) => {
          const isTara = i === TARA;
          const x = seatX(i);
          return (
            <g key={i}>
              {i <= TARA && (
                <text x={x} y={ROW_Y - 13} textAnchor="middle" className={`fill-sky-700 dark:fill-sky-300 ${NUM}`}>
                  {rankLeft(i)}
                </text>
              )}
              <circle
                cx={x}
                cy={ROW_Y}
                r={isTara ? 5.5 : 4.5}
                strokeWidth={1.2}
                className={
                  isTara
                    ? "fill-rose-500 stroke-rose-700 dark:fill-rose-400 dark:stroke-rose-300"
                    : "fill-muted stroke-muted-foreground"
                }
              />
              {i >= TARA && (
                <text x={x} y={ROW_Y + 20} textAnchor="middle" className={`fill-amber-700 dark:fill-amber-300 ${NUM}`}>
                  {rankRight(i)}
                </text>
              )}
            </g>
          );
        })}
        <text x={seatX(TARA)} y={ROW_Y - 28} textAnchor="middle" className="fill-rose-700 text-[10.5px] font-semibold dark:fill-rose-300">
          Tara
        </text>

        {/* Girls on each side of Tara */}
        <path d={`M ${leftEnd} 150 L ${leftEnd} 156 L ${leftStop} 156 L ${leftStop} 150`} fill="none" strokeWidth={1.3} className="stroke-foreground" />
        <text x={(leftEnd + leftStop) / 2} y={170} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
          8 on her left
        </text>
        <path d={`M ${rightStart} 150 L ${rightStart} 156 L ${rightEnd} 156 L ${rightEnd} 150`} fill="none" strokeWidth={1.3} className="stroke-foreground" />
        <text x={(rightStart + rightEnd) / 2} y={170} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
          13 on her right
        </text>

        <text x={160} y={194} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          8 + 1 + 13 = 22, the same as 9 + 14 − 1
        </text>
      </svg>
    </div>
  );
}
