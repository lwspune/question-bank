/**
 * Static figure: a job of LCM units, filled day by day by three workers
 * together (concept ssctwwr-together). The concept's worked example: P takes
 * 12 days, Q 20 and R 30, so the job is LCM(12, 20, 30) = 60 units. P does
 * 60 ÷ 12 = 5 a day, Q 3 and R 2: 10 units a day together, so 60 ÷ 10 = 6 days.
 * Each cell is one unit, lettered by who does it; each row is one day.
 * Server component. Pinned by tests/notes-w2-18.test.ts.
 */

/** The worked example: days each worker needs alone. */
export const WORKERS = [
  { name: "P", days: 12 },
  { name: "Q", days: 20 },
  { name: "R", days: 30 },
] as const;

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
export const lcm = (x: number, y: number) => (x * y) / gcd(x, y);

export const JOB_UNITS = WORKERS.reduce((acc, w) => lcm(acc, w.days), 1);
export const DAILY = WORKERS.map((w) => JOB_UNITS / w.days);
export const DAILY_TOTAL = DAILY.reduce((s, d) => s + d, 0);
export const DAYS_TOGETHER = JOB_UNITS / DAILY_TOTAL;

/** Who does cell c of a day's row (0-based): P's cells, then Q's, then R's. */
export function cellOwner(c: number): number {
  let left = c;
  for (let i = 0; i < DAILY.length; i++) {
    if (left < DAILY[i]) return i;
    left -= DAILY[i];
  }
  return -1;
}

// Geometry (viewBox units).
export const CELL_W = 22;
export const CELL_H = 18;
export const GRID_X = 72;
export const GRID_Y = 58;
export const ROW_GAP = 4;

const CELL = [
  "fill-sky-200/80 stroke-sky-600 dark:fill-sky-900/70 dark:stroke-sky-400",
  "fill-amber-200/80 stroke-amber-600 dark:fill-amber-900/70 dark:stroke-amber-400",
  "fill-emerald-200/80 stroke-emerald-600 dark:fill-emerald-900/70 dark:stroke-emerald-400",
] as const;
const CELL_TEXT = [
  "fill-sky-900 dark:fill-sky-100",
  "fill-amber-900 dark:fill-amber-100",
  "fill-emerald-900 dark:fill-emerald-100",
] as const;

export default function SscWorkTogetherUnits() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the whole job as 60 units
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="The job taken as 60 units, the LCM of 12, 20 and 30, drawn as 6 rows of 10 cells. In every row, one day, P does 5 cells, Q does 3 and R does 2, so 10 units a day. Six rows fill all 60 units, so the three together take 6 days."
      >
        {WORKERS.map((w, i) => (
          <text key={w.name} x={GRID_X + i * 82} y={20} className={`text-[10.5px] font-semibold ${CELL_TEXT[i]}`}>
            {w.name}: 60 ÷ {w.days} = {DAILY[i]}
          </text>
        ))}
        <text x={GRID_X} y={38} className="fill-muted-foreground text-[10px]">
          units a day, one cell = one unit
        </text>

        {Array.from({ length: DAYS_TOGETHER }, (_, day) => {
          const y = GRID_Y + day * (CELL_H + ROW_GAP);
          return (
            <g key={day}>
              <text x={GRID_X - 8} y={y + CELL_H / 2 + 4} textAnchor="end" className="fill-foreground text-[10px]">
                day {day + 1}
              </text>
              {Array.from({ length: DAILY_TOTAL }, (_, c) => {
                const who = cellOwner(c);
                return (
                  <g key={c}>
                    <rect x={GRID_X + c * CELL_W} y={y} width={CELL_W - 2} height={CELL_H} rx={2} strokeWidth={1} className={CELL[who]} />
                    <text x={GRID_X + c * CELL_W + (CELL_W - 2) / 2} y={y + CELL_H / 2 + 3.5} textAnchor="middle" className={`text-[10px] ${CELL_TEXT[who]}`}>
                      {WORKERS[who].name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        <text x={160} y={210} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Job = LCM of 12, 20 and 30 = 60 units
        </text>
        <text x={160} y={228} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
          5 + 3 + 2 = 10 a day, so 60 ÷ 10 = 6 days
        </text>
        <text x={160} y={245} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Add what each does in a day, never the days
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each row is one day: P does 5 units, Q 3 and R 2. Six rows fill all 60, the same as 1/12 + 1/20 + 1/30 = 10/60 = 1/6 of
        the job a day.
      </p>
    </div>
  );
}
