/**
 * Static figure: a sum growing by equal copies of itself at simple interest
 * (concept sscinfr-multiples). The concept's worked example: a sum doubles in
 * 10 years, so R × 10 = 100 and R = 10%; each copy of P takes 10 years, and 4
 * times itself is 3 copies, T = 10 × (4 − 1)/(2 − 1) = 30 years (not 20).
 * Server component. Pinned by tests/notes-w2-18.test.ts.
 */

/** The worked example. */
export const SI_EXAMPLE = { doubleYears: 10, target: 4 } as const;

/** Becoming n times at simple interest: R × T = 100(n − 1). */
export const rateFor = (n: number, years: number) => (100 * (n - 1)) / years;
/** Same rate, a new multiple: T₂ = T₁ × (n₂ − 1)/(n₁ − 1). */
export const yearsFor = (t1: number, n1: number, n2: number) => (t1 * (n2 - 1)) / (n1 - 1);

export const RATE = rateFor(2, SI_EXAMPLE.doubleYears);
export const YEARS_TO_TARGET = yearsFor(SI_EXAMPLE.doubleYears, 2, SI_EXAMPLE.target);
/** The wrong answer from scaling the time by n instead of n − 1. */
export const WRONG_YEARS = (SI_EXAMPLE.doubleYears * SI_EXAMPLE.target) / 2;
/** The bars: the amount, in copies of P, every 10 years. */
export const MARKS = [0, 10, 20, 30] as const;
export const copiesAt = (years: number) => 1 + (RATE * years) / 100;

// Geometry (viewBox units).
export const BASE_Y = 172;
export const BLOCK_H = 28;
export const AXIS_LEFT = 40;
export const PX_PER_YEAR = 7;
const BAR_W = 34;
export const barCentre = (years: number) => AXIS_LEFT + 24 + years * PX_PER_YEAR;

export default function SscSiMultiples() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · one copy of the sum every 10 years
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="Bars showing a sum at simple interest after 0, 10, 20 and 30 years. The sum P is one block. Each 10 years adds one more block of interest the size of P: 2P after 10 years, 3P after 20 and 4P after 30. Doubling in 10 years means a rate of 10 per cent. Becoming 4 times needs 3 copies of interest, so it takes 30 years, not 20."
      >
        <line x1={AXIS_LEFT} y1={BASE_Y} x2={barCentre(30) + 30} y2={BASE_Y} strokeWidth={1.2} className="stroke-foreground" />
        {MARKS.map((t) => {
          const copies = copiesAt(t);
          const cx = barCentre(t);
          return (
            <g key={t}>
              {Array.from({ length: copies }, (_, k) => (
                <g key={k}>
                  <rect
                    x={cx - BAR_W / 2}
                    y={BASE_Y - (k + 1) * BLOCK_H}
                    width={BAR_W}
                    height={BLOCK_H}
                    strokeWidth={1.2}
                    className={
                      k === 0
                        ? "fill-sky-200/80 stroke-sky-600 dark:fill-sky-900/70 dark:stroke-sky-400"
                        : "fill-amber-200/80 stroke-amber-600 dark:fill-amber-900/70 dark:stroke-amber-400"
                    }
                  />
                  <text
                    x={cx}
                    y={BASE_Y - k * BLOCK_H - BLOCK_H / 2 + 4}
                    textAnchor="middle"
                    className={k === 0 ? "fill-sky-900 text-[10px] dark:fill-sky-100" : "fill-amber-800 text-[10px] dark:fill-amber-200"}
                  >
                    {k === 0 ? "P" : "+P"}
                  </text>
                </g>
              ))}
              <text x={cx} y={BASE_Y - copies * BLOCK_H - 6} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {copies === 1 ? "P" : `${copies}P`}
              </text>
              <text x={cx} y={BASE_Y + 14} textAnchor="middle" className="fill-foreground text-[10px]">
                {t === 0 ? "start" : `${t} years`}
              </text>
            </g>
          );
        })}
        <text x={AXIS_LEFT + 2} y={36} className="fill-muted-foreground text-[10px]">
          P = the sum, +P = interest equal to the sum
        </text>

        <text x={160} y={204} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Doubles in 10 years: R × 10 = 100, so R = 10%
        </text>
        <text x={160} y={220} textAnchor="middle" className="fill-foreground text-[10.5px]">
          4 times = P + 3 copies: 3 × 10 = 30 years
        </text>
        <text x={160} y={238} textAnchor="middle" className="fill-rose-700 text-[10.5px] font-semibold dark:fill-rose-300">
          Not 20 years: time grows with n − 1, not with n
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Simple interest is the same every year, so every copy of the sum takes the same 10 years. Doubling is one copy; four
        times itself is three copies, and the check is 10% × 30 = 300%.
      </p>
    </div>
  );
}
