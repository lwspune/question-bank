/**
 * Static figure: compound and simple interest on the same sum (concept
 * sscinco-vs-si), with the concept's worked example: P = 5000 at 10% a year
 * for 2 years. Simple interest is 500 each year, 1000 in all. Compound
 * interest is 500 in year 1 (equal to simple), then 10% of 5500 = 550 in
 * year 2: the same 500 plus 50, the interest on the first year's interest.
 * CI = 1050, and the gap 50 = 5000 × 0.1². Drawn to scale. No currency sign
 * (the concept's amounts are plain numbers here). Server component.
 * Pinned by tests/notes-w2-04.test.ts.
 */

export const CIVSI = { P: 5000, r: 10, years: 2 } as const;

/** Simple interest for one year: P × r / 100. */
export const siPerYear = (P: number, r: number) => (P * r) / 100;
/** Compound interest earned in year k (1-based): r% of the amount after k − 1 years. */
export const ciInYear = (P: number, r: number, k: number) => P * (1 + r / 100) ** (k - 1) * (r / 100);
/** The 2-year gap: P (r/100)². */
export const gap2 = (P: number, r: number) => P * (r / 100) ** 2;

// Geometry (viewBox units): bars drawn to scale.
export const BASE_Y = 196;
export const PX_PER_UNIT = 0.14;
export const BAR_W = 64;
export const SI_X = 60;
export const CI_X = 150;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const h = (amount: number) => r2(amount * PX_PER_UNIT);

export default function SscCiVsSi() {
  const { P, r } = CIVSI;
  const si = siPerYear(P, r); // 500
  const extra = gap2(P, r); // 50, the interest on year 1's interest
  const yr1 = BASE_Y - h(si);
  const yr2 = yr1 - h(si);
  const top = r2(yr2 - h(extra));

  const block = (x: number, y: number, amount: number, cls: string, label: string) => (
    <g>
      <rect x={x} y={r2(y - h(amount))} width={BAR_W} height={h(amount)} strokeWidth={1} className={cls} />
      <text x={x + BAR_W / 2} y={r2(y - h(amount) / 2 + 4)} textAnchor="middle" className="fill-foreground text-[11px] tabular-nums">
        {label}
      </text>
    </g>
  );

  const skyCls = "fill-sky-300/60 stroke-sky-700 dark:fill-sky-500/35 dark:stroke-sky-300";

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · compound and simple interest, year by year
      </p>
      <svg
        viewBox="0 0 320 232"
        className="block h-auto w-full"
        role="img"
        aria-label="5000 at 10 percent a year for 2 years. Simple interest is 500 in year 1 and 500 in year 2, 1000 in all. Compound interest is 500 in year 1 and 550 in year 2, which is 500 plus 50, the interest on the first year's interest: 1050 in all. The gap is 50."
      >
        <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          P = 5000 at 10% a year for 2 years
        </text>

        {/* Simple interest */}
        {block(SI_X, BASE_Y, si, skyCls, "500")}
        {block(SI_X, yr1, si, skyCls, "500")}
        <text x={SI_X + BAR_W / 2} y={yr2 - 8} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          SI = 1000
        </text>

        {/* Compound interest */}
        {block(CI_X, BASE_Y, si, skyCls, "500")}
        {block(CI_X, yr1, si, skyCls, "500")}
        <rect
          x={CI_X}
          y={top}
          width={BAR_W}
          height={h(extra)}
          strokeWidth={1}
          className="fill-amber-400 stroke-amber-700 dark:fill-amber-400 dark:stroke-amber-300"
        />
        <text x={CI_X + BAR_W / 2} y={top - 8} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          CI = 1050
        </text>
        <line x1={CI_X + BAR_W + 3} y1={r2(top + h(extra) / 2)} x2={CI_X + BAR_W + 14} y2={r2(top + h(extra) / 2)} className="stroke-amber-700 dark:stroke-amber-300" />
        <text x={CI_X + BAR_W + 17} y={r2(top + h(extra) / 2 + 4)} className="fill-amber-800 text-[10.5px] font-semibold tabular-nums dark:fill-amber-200">
          + 50
        </text>
        <text x={CI_X + BAR_W + 6} y={r2(top + h(extra) / 2 + 18)} className="fill-amber-800 text-[9.5px] dark:fill-amber-200">
          10% of year 1&apos;s
        </text>
        <text x={CI_X + BAR_W + 6} y={r2(top + h(extra) / 2 + 30)} className="fill-amber-800 text-[9.5px] dark:fill-amber-200">
          500 of interest
        </text>

        {/* Year labels */}
        <g className="fill-muted-foreground text-[10px]">
          <text x={SI_X - 6} y={r2(BASE_Y - h(si) / 2 + 3)} textAnchor="end">year 1</text>
          <text x={SI_X - 6} y={r2(yr1 - h(si) / 2 + 3)} textAnchor="end">year 2</text>
        </g>

        {/* Ground and names */}
        <line x1={20} y1={BASE_Y} x2={300} y2={BASE_Y} className="stroke-foreground" strokeWidth={1.5} />
        <text x={SI_X + BAR_W / 2} y={BASE_Y + 14} textAnchor="middle" className="fill-foreground text-[11px]">
          simple
        </text>
        <text x={CI_X + BAR_W / 2} y={BASE_Y + 14} textAnchor="middle" className="fill-foreground text-[11px]">
          compound
        </text>
        <text x={160} y={BASE_Y + 28} textAnchor="middle" className="fill-indigo-700 text-[10.5px] font-semibold dark:fill-indigo-300">
          gap = 5000 × 0.1² = 50
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Drawn to scale. In year 1 the two are equal, 500 each. In year 2 compound interest is 10% of 5500, which is 550: the same 500 plus
        50, the interest on the first year&apos;s interest. So CI = 1050, SI = 1000, and the 2-year gap is P(r/100)² = 50.
      </p>
    </div>
  );
}
