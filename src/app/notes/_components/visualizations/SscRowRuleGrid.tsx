/**
 * Static figure: a missing-number grid read row by row (concept
 * sscrmngr-add, its worked example). Rows (7, 4, 15), (5, 9, 16), (8, 6, ?).
 * The rule is found on row 1, proved on row 2 and applied on row 3:
 * 2a + b - 3 gives 15, 16 and then 2 × 8 + 6 - 3 = 19.
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

/** The worked example: [a, b, c]; null is the missing number. */
export const ROWS: readonly (readonly [number, number, number | null])[] = [
  [7, 4, 15],
  [5, 9, 16],
  [8, 6, null],
];

/** The rule the worked example finds. */
export const rule = (a: number, b: number) => 2 * a + b - 3;

export const ROW_LABELS = ["find the rule", "prove it", "apply it"] as const;

// Geometry (viewBox units).
const CELL = 30;
const COL_X = [96, 130, 164] as const; // left edge of each cell
const ROW_Y = [34, 72, 110] as const; // top edge of each row

export default function SscRowRuleGrid() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · find the rule, prove it, apply it
      </p>
      <svg
        viewBox="0 0 320 172"
        className="block h-auto w-full"
        role="img"
        aria-label="A grid of three rows. Row 1: 7, 4, 15. Row 2: 5, 9, 16. Row 3: 8, 6 and a missing number. The rule 2a plus b minus 3 is found on row 1: 14 plus 4 minus 3 is 15. It is proved on row 2: 10 plus 9 minus 3 is 16. It is applied on row 3: 16 plus 6 minus 3 is 19, so the missing number is 19."
      >
        {["a", "b", "c"].map((h, j) => (
          <text key={h} x={COL_X[j] + CELL / 2} y={26} textAnchor="middle" className="fill-muted-foreground text-[11px] italic">
            {h}
          </text>
        ))}
        <text x={202} y={26} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          rule: 2a + b − 3
        </text>

        {ROWS.map(([a, b, c], i) => {
          const y = ROW_Y[i];
          const value = rule(a, b);
          const missing = c === null;
          return (
            <g key={i}>
              <text x={4} y={y + 19} className="fill-muted-foreground text-[10px]">
                {i + 1}. {ROW_LABELS[i]}
              </text>
              {[a, b, c].map((v, j) => {
                const isGap = v === null;
                return (
                  <g key={j}>
                    <rect
                      x={COL_X[j]}
                      y={y}
                      width={CELL}
                      height={CELL}
                      className={
                        isGap
                          ? "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400"
                          : "fill-background stroke-foreground"
                      }
                    />
                    <text
                      x={COL_X[j] + CELL / 2}
                      y={y + 20}
                      textAnchor="middle"
                      className={
                        isGap
                          ? "fill-emerald-800 text-[12px] font-bold dark:fill-emerald-200"
                          : "fill-foreground text-[12px] font-semibold"
                      }
                    >
                      {isGap ? "?" : v}
                    </text>
                  </g>
                );
              })}
              <text
                x={202}
                y={y + 20}
                className={
                  missing
                    ? "fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300"
                    : "fill-foreground text-[11px]"
                }
              >
                {2 * a} + {b} − 3 = {value}
              </text>
            </g>
          );
        })}

        <text x={160} y={164} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          The missing number is {rule(ROWS[2][0], ROWS[2][1])}.
        </text>
      </svg>
    </div>
  );
}
