/**
 * Static figure: data sufficiency on a line-up (concept ssc2rdsds-seating),
 * with the concept's own example. P, Q, R and S sit in a row facing north:
 * who sits at the left end?
 * - I alone (Q at the right end) leaves P, R or S at the left end.
 * - II alone (P immediately left of Q, R not at an end) allows two rows,
 *   P Q R S and S R P Q, with different left ends.
 * - Together only S R P Q is left: S is at the left end, so both are needed.
 * Every row is found by trying all 24 orders. Server component. Pinned by
 * tests/notes-w2-09.test.ts.
 */

export const PEOPLE = ["P", "Q", "R", "S"] as const;

/** Every order of the four, seat 1 (left end) first. */
export function allRows(people: readonly string[] = PEOPLE): string[] {
  if (people.length <= 1) return [...people];
  return people.flatMap((p, i) => allRows([...people.slice(0, i), ...people.slice(i + 1)]).map((rest) => p + rest));
}

/** I: Q sits at the right end. */
export const statementI = (row: string) => row[3] === "Q";
/** II: P sits immediately left of Q, and R is not at an end. */
export const statementII = (row: string) => row.indexOf("P") === row.indexOf("Q") - 1 && row.indexOf("R") !== 0 && row.indexOf("R") !== 3;

export const rowsAllowed = (test: (row: string) => boolean) => allRows().filter(test);
export const leftEnds = (rows: readonly string[]) => [...new Set(rows.map((r) => r[0]))].sort();

const ONLY_I = rowsAllowed(statementI);
const ONLY_II = rowsAllowed(statementII);
const BOTH = rowsAllowed((r) => statementI(r) && statementII(r));

const SEAT_X = 24;
const SEAT_STEP = 30;
const SEAT_W = 24;

function Seats({ row, y, known }: { row: string; y: number; known?: string }) {
  return (
    <g>
      {[...row].map((p, i) => {
        const hidden = known !== undefined && !known.includes(p);
        return (
          <g key={i}>
            <rect x={SEAT_X + i * SEAT_STEP} y={y} width={SEAT_W} height={20} rx={3} className="fill-background stroke-muted-foreground" />
            <text
              x={SEAT_X + i * SEAT_STEP + SEAT_W / 2}
              y={y + 14}
              textAnchor="middle"
              className={`text-[11px] font-semibold ${hidden ? "fill-muted-foreground" : "fill-foreground"}`}
            >
              {hidden ? "?" : p}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Verdict({ y, ends, enough }: { y: number; ends: readonly string[]; enough: boolean }) {
  const words = ends.length === 1 ? ends[0] : `${ends.slice(0, -1).join(", ")} or ${ends[ends.length - 1]}`;
  return (
    <g>
      <text x={168} y={y} className="fill-foreground text-[11px]">
        left end: {words}
      </text>
      <text
        x={168}
        y={y + 15}
        className={`text-[11px] font-semibold ${enough ? "fill-emerald-700 dark:fill-emerald-300" : "fill-rose-700 dark:fill-rose-300"}`}
      >
        {enough ? "one answer: enough" : "two or more: not enough"}
      </text>
    </g>
  );
}

export default function SscT2DsRow() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · draw every row each statement allows
      </p>
      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="P, Q, R and S in a row facing north; who is at the left end? Statement I alone puts Q at the right end, leaving P, R or S at the left end: not enough. Statement II alone allows two rows, P Q R S and S R P Q, so the left end is P or S: not enough. Together only S R P Q is left, so S is at the left end and both statements are needed."
      >
        <text x={SEAT_X} y={12} className="fill-muted-foreground text-[10px]">
          left
        </text>
        <text x={SEAT_X + 3 * SEAT_STEP + SEAT_W} y={12} textAnchor="end" className="fill-muted-foreground text-[10px]">
          right
        </text>
        <text x={168} y={12} className="fill-muted-foreground text-[10px]">
          all face north ↑
        </text>

        {/* I alone */}
        <text x={6} y={34} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          I alone: Q is at the right end
        </text>
        <Seats row={ONLY_I[0]} y={42} known="Q" />
        <Verdict y={52} ends={leftEnds(ONLY_I)} enough={leftEnds(ONLY_I).length === 1} />
        <line x1={0} y1={74} x2={320} y2={74} className="stroke-border" />

        {/* II alone */}
        <text x={6} y={94} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          II alone: P just left of Q, R not at an end
        </text>
        {ONLY_II.map((row, i) => (
          <Seats key={row} row={row} y={102 + i * 26} />
        ))}
        <Verdict y={118} ends={leftEnds(ONLY_II)} enough={leftEnds(ONLY_II).length === 1} />
        <line x1={0} y1={160} x2={320} y2={160} className="stroke-border" />

        {/* Together */}
        <text x={6} y={180} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          I and II together
        </text>
        {BOTH.map((row) => (
          <Seats key={row} row={row} y={188} />
        ))}
        <Verdict y={198} ends={leftEnds(BOTH)} enough={leftEnds(BOTH).length === 1} />

        <text x={160} y={246} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Neither alone is enough; both together are.
        </text>
      </svg>
    </div>
  );
}
