/**
 * Static figure: a series with its row of differences and the differences of
 * those (concept sscrsedi-steady, its worked example 14, 19, 27, 38, ?, 69).
 * The seen differences 5, 8, 11 grow by 3, so the next two are 14 and 17:
 * the gap is 38 + 14 = 52, and 52 + 17 = 69 checks it against the last term.
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

/** The worked example; null is the gap. */
export const SERIES: readonly (number | null)[] = [14, 19, 27, 38, null, 69];

/**
 * Continue the series from its first three terms: the differences start at
 * (second - first) and grow by the same step every time.
 */
export function continueSteady(series: readonly (number | null)[]): number[] {
  const [a, b, c] = series as readonly number[];
  const d1 = b - a;
  const step = c - b - d1;
  const out: number[] = [a];
  for (let i = 1; i < series.length; i++) out.push(out[i - 1] + d1 + step * (i - 1));
  return out;
}

export const differences = (xs: readonly number[]) => xs.slice(1).map((x, i) => x - xs[i]);

export const FILLED = continueSteady(SERIES);
export const FIRST = differences(FILLED);
export const SECOND = differences(FIRST);

// Geometry (viewBox units).
const X0 = 30;
const DX = 52;
const Y_TERM = 40;
const Y_D1 = 82;
const Y_D2 = 122;

export default function SscDifferenceLadder() {
  const gap = SERIES.indexOf(null);
  const xTerm = (i: number) => X0 + DX * i;
  const xD1 = (i: number) => X0 + DX * (i + 0.5);
  const xD2 = (i: number) => X0 + DX * (i + 1);
  const touchesGap = (i: number) => i === gap - 1 || i === gap;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a row of differences under the series
      </p>
      <svg
        viewBox="0 0 320 172"
        className="block h-auto w-full"
        role="img"
        aria-label="The series 14, 19, 27, 38, gap, 69. Under each pair of terms is their difference: 5, 8, 11, then 14 and 17 worked out. Under each pair of differences is their difference: 3 every time. So the gap is 38 plus 14, which is 52, and 52 plus 17 is 69, the last term, which checks it."
      >
        {/* Links: each difference hangs from the two terms above it */}
        {FIRST.map((_, i) => (
          <g key={`l1${i}`} className="stroke-border" strokeWidth={1}>
            <line x1={xTerm(i)} y1={Y_TERM + 10} x2={xD1(i)} y2={Y_D1 - 11} />
            <line x1={xTerm(i + 1)} y1={Y_TERM + 10} x2={xD1(i)} y2={Y_D1 - 11} />
          </g>
        ))}
        {SECOND.map((_, i) => (
          <g key={`l2${i}`} className="stroke-border" strokeWidth={1}>
            <line x1={xD1(i)} y1={Y_D1 + 5} x2={xD2(i)} y2={Y_D2 - 11} />
            <line x1={xD1(i + 1)} y1={Y_D1 + 5} x2={xD2(i)} y2={Y_D2 - 11} />
          </g>
        ))}

        {/* The series */}
        {FILLED.map((t, i) => {
          const isGap = i === gap;
          return (
            <g key={`t${i}`}>
              <rect
                x={xTerm(i) - 19}
                y={Y_TERM - 14}
                width={38}
                height={24}
                rx={4}
                className={
                  isGap
                    ? "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400"
                    : "fill-background stroke-foreground"
                }
              />
              <text
                x={xTerm(i)}
                y={Y_TERM + 3}
                textAnchor="middle"
                className={
                  isGap
                    ? "fill-emerald-800 text-[12px] font-bold dark:fill-emerald-200"
                    : "fill-foreground text-[12px] font-semibold"
                }
              >
                {t}
              </text>
              {isGap && (
                <text x={xTerm(i)} y={Y_TERM - 19} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
                  the gap
                </text>
              )}
            </g>
          );
        })}

        {/* First differences */}
        {FIRST.map((d, i) => (
          <text
            key={`d1${i}`}
            x={xD1(i)}
            y={Y_D1}
            textAnchor="middle"
            className={
              touchesGap(i)
                ? "fill-amber-700 text-[11px] font-semibold dark:fill-amber-300"
                : "fill-sky-700 text-[11px] font-semibold dark:fill-sky-300"
            }
          >
            +{d}
          </text>
        ))}

        {/* Second differences */}
        {SECOND.map((d, i) => (
          <text key={`d2${i}`} x={xD2(i)} y={Y_D2} textAnchor="middle" className="fill-muted-foreground text-[11px] font-semibold">
            +{d}
          </text>
        ))}

        <text x={4} y={Y_D1 + 22} className="fill-muted-foreground text-[10px]">
          differences
        </text>
        <text x={4} y={Y_D2 + 18} className="fill-muted-foreground text-[10px]">
          differences of the differences: steady
        </text>

        <text x={160} y={164} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          38 + 14 = 52. Check: 52 + 17 = 69.
        </text>
      </svg>
    </div>
  );
}
