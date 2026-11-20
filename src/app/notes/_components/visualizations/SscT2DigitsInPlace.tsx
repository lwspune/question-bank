/**
 * Static figure: digits that stay in place (concept ssc2ralwd-digit), with the
 * concept's own example. The digits of 42715 are written, and under them the
 * same digits in ascending order, 12457, digit under digit. Comparing place by
 * place, only the 2 in the second place matches: one digit stays in place.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const NUMBER = "42715";

export const sortDigits = (s: string, order: "ascending" | "descending") => {
  const d = [...s].sort();
  return (order === "ascending" ? d : d.reverse()).join("");
};

/** Places (0-based) where the digit above equals the digit below. */
export const matchingPlaces = (a: string, b: string) => [...a].flatMap((c, i) => (c === b[i] ? [i] : []));

const SORTED = sortDigits(NUMBER, "ascending");
const MATCH = matchingPlaces(NUMBER, SORTED);
const PLACE_WORDS = ["first", "second", "third", "fourth", "fifth"];

const X0 = 86;
const DX = 38;
const TOP_Y = 40;
const LOW_Y = 112;
const BOX = 30;

function Digits({ s, y }: { s: string; y: number }) {
  return (
    <g>
      {[...s].map((c, i) => {
        const hit = MATCH.includes(i);
        return (
          <g key={i}>
            <rect
              x={X0 + i * DX - BOX / 2}
              y={y}
              width={BOX}
              height={BOX}
              rx={4}
              strokeWidth={hit ? 1.6 : 1}
              className={hit ? "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400" : "fill-background stroke-border"}
            />
            <text
              x={X0 + i * DX}
              y={y + 21}
              textAnchor="middle"
              className={`text-[16px] font-semibold ${hit ? "fill-emerald-700 dark:fill-emerald-300" : "fill-foreground"}`}
            >
              {c}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function SscT2DigitsInPlace() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · write both lines, digit under digit
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label="The number 42715 on the top line and its digits in ascending order, 12457, on the line under it. Comparing place by place, only the second place matches, where both lines have a 2. One digit stays in the same place."
      >
        <text x={8} y={TOP_Y + 20} className="fill-muted-foreground text-[10px]">
          number
        </text>
        <Digits s={NUMBER} y={TOP_Y} />
        <text x={8} y={LOW_Y + 14} className="fill-muted-foreground text-[10px]">
          ascending
        </text>
        <text x={8} y={LOW_Y + 26} className="fill-muted-foreground text-[10px]">
          (smallest first)
        </text>
        <Digits s={SORTED} y={LOW_Y} />
        {[...NUMBER].map((c, i) => {
          const hit = MATCH.includes(i);
          return (
            <g key={i}>
              <line
                x1={X0 + i * DX}
                y1={TOP_Y + BOX + 4}
                x2={X0 + i * DX}
                y2={LOW_Y - 4}
                strokeWidth={hit ? 1.6 : 1}
                strokeDasharray={hit ? undefined : "3 3"}
                className={hit ? "stroke-emerald-600 dark:stroke-emerald-400" : "stroke-muted-foreground"}
              />
              <text
                x={X0 + i * DX + 4}
                y={(TOP_Y + BOX + LOW_Y) / 2 + 4}
                className={`text-[10px] font-semibold ${hit ? "fill-emerald-700 dark:fill-emerald-300" : "fill-muted-foreground"}`}
              >
                {hit ? "same" : "≠"}
              </text>
            </g>
          );
        })}
        <text x={160} y={170} textAnchor="middle" className="fill-foreground text-[11px]">
          Compare each place only with the place under it.
        </text>
        <text x={160} y={190} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          {MATCH.length === 1 ? "One digit" : `${MATCH.length} digits`} in place: the {NUMBER[MATCH[0]]} in the {PLACE_WORDS[MATCH[0]]} place
        </text>
      </svg>
    </div>
  );
}
