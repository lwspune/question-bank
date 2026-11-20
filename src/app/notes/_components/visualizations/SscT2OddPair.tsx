/**
 * Static figure: finding the odd number pair (concept ssc2rclod-number), with
 * the concept's own example 3 : 9, 5 : 25, 6 : 36, 7 : 48. The rule is fixed
 * from two pairs (3 to 9 and 5 to 25: squaring), then tested on the rest:
 * 6² = 36 fits, 7² = 49, not 48, so 7 : 48 is the odd pair.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const PAIRS: readonly (readonly [number, number])[] = [
  [3, 9],
  [5, 25],
  [6, 36],
  [7, 48],
];

export const square = (n: number) => n * n;

/** Indexes of the pairs the rule fails. */
export const breaks = (pairs: readonly (readonly [number, number])[], rule: (n: number) => number) =>
  pairs.flatMap(([a, b], i) => (rule(a) === b ? [] : [i]));

const ODD = breaks(PAIRS, square);

export default function SscT2OddPair() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · fix the rule from two pairs, test the rest
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Four pairs: 3 to 9, 5 to 25, 6 to 36, 7 to 48. The first two fix the rule: square the left number. Testing the rest: 6 squared is 36, which fits; 7 squared is 49, not 48, so 7 to 48 is the odd pair."
      >
        <text x={8} y={16} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          1. Fix the rule from two pairs
        </text>
        <text x={8} y={110} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          2. Test it on the rest
        </text>
        {PAIRS.map(([a, b], i) => {
          const y = i < 2 ? 28 + i * 30 : 122 + (i - 2) * 30;
          const odd = ODD.includes(i);
          const fixing = i < 2;
          return (
            <g key={i}>
              <rect
                x={20}
                y={y}
                width={280}
                height={24}
                rx={4}
                className={
                  odd
                    ? "fill-rose-50 stroke-rose-600 dark:fill-rose-950/60 dark:stroke-rose-400"
                    : "fill-background stroke-border"
                }
              />
              <text x={40} y={y + 16} className="fill-foreground text-[13px] font-semibold">
                {a} : {b}
              </text>
              <text x={120} y={y + 16} className="fill-muted-foreground text-[11px]">
                {a}² = {square(a)}
              </text>
              <text
                x={290}
                y={y + 16}
                textAnchor="end"
                className={`text-[11px] font-semibold ${
                  odd ? "fill-rose-700 dark:fill-rose-300" : fixing ? "fill-sky-700 dark:fill-sky-300" : "fill-emerald-700 dark:fill-emerald-300"
                }`}
              >
                {odd ? `not ${b}: odd pair` : fixing ? "rule: square" : "fits"}
              </text>
            </g>
          );
        })}
        <text x={160} y={200} textAnchor="middle" className="fill-foreground text-[11px]">
          One pair fits many rules; two pairs pin it down.
        </text>
      </svg>
    </div>
  );
}
