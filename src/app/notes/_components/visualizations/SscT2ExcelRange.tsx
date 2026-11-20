/**
 * Static figure: cell references and a range in a spreadsheet (concept
 * ssc2cmsof-excel). A cell is named by its column letter, then its row number:
 * the cell where column B meets row 7 is B7. A range B2:B5 is every cell from
 * B2 down to B5, so =SUM(B2:B5) adds the four values in B2, B3, B4 and B5.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const COLUMNS = ["A", "B", "C", "D"] as const;
export const ROWS = 8;

export const cellName = (col: number, row: number) => `${COLUMNS[col]}${row}`;

/** Every cell of a one-column range such as "B2:B5", top to bottom. */
export function rangeCells(range: string): string[] {
  const m = /^([A-Z])(\d+):([A-Z])(\d+)$/.exec(range);
  if (!m || m[1] !== m[3]) return [];
  const out: string[] = [];
  for (let r = Number(m[2]); r <= Number(m[4]); r++) out.push(`${m[1]}${r}`);
  return out;
}

export const NAMED = { col: 1, row: 7 } as const;
export const RANGE = "B2:B5";

const X0 = 36;
const Y0 = 34;
const CW = 46;
const RH = 20;
const IN_RANGE = rangeCells(RANGE);

export default function SscT2ExcelRange() {
  const named = cellName(NAMED.col, NAMED.row);
  const right = X0 + COLUMNS.length * CW;
  const rTop = Y0 + RH + RH; // row 2 starts after the header row and row 1
  const rBottom = rTop + IN_RANGE.length * RH;
  const namedY = Y0 + NAMED.row * RH;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · column letter, then row number
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="A spreadsheet grid with columns A to D and rows 1 to 8. The cell where column B meets row 7 is shaded and named B7: column letter first, then row number. The cells B2, B3, B4 and B5 are shaded as the range B2 to B5, and the formula SUM of B2 to B5 adds the values in those four cells."
      >
        {/* Column headers */}
        {COLUMNS.map((c, i) => (
          <g key={c}>
            <rect x={X0 + i * CW} y={Y0} width={CW} height={RH} className="fill-muted stroke-border" />
            <text x={X0 + i * CW + CW / 2} y={Y0 + 14} textAnchor="middle" className={`text-[11px] font-semibold ${i === NAMED.col ? "fill-sky-700 dark:fill-sky-300" : "fill-foreground"}`}>
              {c}
            </text>
          </g>
        ))}
        {Array.from({ length: ROWS }, (_, k) => {
          const row = k + 1;
          const y = Y0 + row * RH;
          return (
            <g key={row}>
              <rect x={X0 - 24} y={y} width={24} height={RH} className="fill-muted stroke-border" />
              <text x={X0 - 12} y={y + 14} textAnchor="middle" className={`text-[11px] font-semibold ${row === NAMED.row ? "fill-sky-700 dark:fill-sky-300" : "fill-foreground"}`}>
                {row}
              </text>
              {COLUMNS.map((c, i) => {
                const name = cellName(i, row);
                const cls =
                  name === named
                    ? "fill-sky-200 stroke-sky-600 dark:fill-sky-800 dark:stroke-sky-400"
                    : IN_RANGE.includes(name)
                      ? "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400"
                      : "fill-background stroke-border";
                return <rect key={c} x={X0 + i * CW} y={y} width={CW} height={RH} className={cls} />;
              })}
            </g>
          );
        })}
        {IN_RANGE.map((n, k) => (
          <text key={n} x={X0 + CW * 1.5} y={rTop + k * RH + 14} textAnchor="middle" className="fill-emerald-800 text-[10px] dark:fill-emerald-200">
            {n}
          </text>
        ))}
        <text x={X0 + CW * 1.5} y={namedY + 14} textAnchor="middle" className="fill-sky-800 text-[10.5px] font-semibold dark:fill-sky-200">
          {named}
        </text>

        {/* Range bracket and label */}
        <path d={`M ${right + 4} ${rTop + 2} h 6 V ${rBottom - 2} h -6`} fill="none" strokeWidth={1.3} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={right + 14} y={rTop + 26} className="fill-emerald-700 text-[10.5px] font-semibold dark:fill-emerald-300">
          =SUM({RANGE})
        </text>
        <text x={right + 14} y={rTop + 40} className="fill-muted-foreground text-[10px]">
          adds these {IN_RANGE.length} cells
        </text>

        {/* Named cell label */}
        <line x1={X0 + 2 * CW} y1={namedY + RH / 2} x2={right + 10} y2={namedY + RH / 2} strokeDasharray="3 2" className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={right + 14} y={namedY + 8} className="fill-sky-700 text-[10.5px] font-semibold dark:fill-sky-300">
          {named}: column {COLUMNS[NAMED.col]},
        </text>
        <text x={right + 14} y={namedY + 21} className="fill-sky-700 text-[10.5px] font-semibold dark:fill-sky-300">
          then row {NAMED.row}
        </text>

        <text x={160} y={228} textAnchor="middle" className="fill-foreground text-[11px]">
          The colon means &quot;from B2 down to B5&quot;.
        </text>
      </svg>
    </div>
  );
}
