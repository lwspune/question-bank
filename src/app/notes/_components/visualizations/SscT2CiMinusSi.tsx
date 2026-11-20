/**
 * Static figure: compound against simple interest over two years, and where
 * the difference comes from (concept ssc2inci-annual). Uses the concept's
 * second example: a sum of 6000 at 10% a year for 2 years. Simple interest is
 * 600 each year on the first sum; compound interest adds the same 600 in year
 * 2 plus 10% of the first year's 600, which is 60. So CI − SI = 60 =
 * P(R/100)². Amounts are shown as plain numbers, without a currency sign.
 * Server component. Pinned by tests/notes-w2-05.test.ts.
 */

/** The concept's example. */
export const LOAN = { P: 6000, R: 10, years: 2 } as const;
export const yearOneInterest = (p: number, r: number) => (p * r) / 100;
/** Compound interest in year 2: on the sum plus the first year's interest. */
export const yearTwoCompound = (p: number, r: number) => ((p + yearOneInterest(p, r)) * r) / 100;
export const interestOnInterest = (p: number, r: number) => (yearOneInterest(p, r) * r) / 100;
export const ciMinusSi2 = (p: number, r: number) => p * (r / 100) ** 2;

const BOX_W = 100;
const BOX_H = 44;
const COL1 = 76;
const COL2 = 190;
const SI_Y = 34;
const CI_Y = 98;
const EXTRA_Y = 148;

const SI_BOX = "fill-sky-100 stroke-sky-600 dark:fill-sky-950/60 dark:stroke-sky-400";
const CI_BOX = "fill-indigo-100 stroke-indigo-600 dark:fill-indigo-950/60 dark:stroke-indigo-400";
const EXTRA = "fill-rose-100 stroke-rose-600 dark:fill-rose-950/60 dark:stroke-rose-400";

function Box({ x, y, h, cls, top, big, sub }: { x: number; y: number; h: number; cls: string; top: string; big: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={BOX_W} height={h} rx={4} strokeWidth={1.4} className={cls} />
      {top && (
        <text x={x + BOX_W / 2} y={y + 13} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {top}
        </text>
      )}
      <text x={x + BOX_W / 2} y={y + (top ? 27 : 13)} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
        {big}
      </text>
      <text x={x + BOX_W / 2} y={y + (top ? 39 : 24)} textAnchor="middle" className="fill-foreground text-[10px]">
        {sub}
      </text>
    </g>
  );
}

export default function SscT2CiMinusSi() {
  const i1 = yearOneInterest(LOAN.P, LOAN.R);
  const extra = interestOnInterest(LOAN.P, LOAN.R);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · where compound interest gets its extra
      </p>
      <svg
        viewBox="0 0 320 222"
        className="block h-auto w-full"
        role="img"
        aria-label="A sum of 6000 at 10 percent a year for 2 years. Simple interest is 600 in year 1 and 600 in year 2, both worked on 6000. Compound interest is 600 in year 1, and in year 2 it is 600 on the 6000 plus 60, which is 10 percent of the first year's 600. So compound interest is 60 more, which is 6000 times 10 over 100, squared."
      >
        <text x={160} y={18} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Sum P = 6000 at R = 10% a year, for 2 years
        </text>

        <text x={COL1 - 8} y={SI_Y + 26} textAnchor="end" className="fill-sky-800 text-[11px] font-semibold dark:fill-sky-300">
          Simple
        </text>
        <Box x={COL1} y={SI_Y} h={BOX_H} cls={SI_BOX} top="Year 1" big={`${i1}`} sub="10% of 6000" />
        <Box x={COL2} y={SI_Y} h={BOX_H} cls={SI_BOX} top="Year 2" big={`${i1}`} sub="10% of 6000" />

        <text x={COL1 - 8} y={CI_Y + 26} textAnchor="end" className="fill-indigo-800 text-[11px] font-semibold dark:fill-indigo-300">
          Compound
        </text>
        <Box x={COL1} y={CI_Y} h={BOX_H} cls={CI_BOX} top="Year 1" big={`${i1}`} sub="10% of 6000" />
        <Box x={COL2} y={CI_Y} h={BOX_H} cls={CI_BOX} top="Year 2" big={`${i1}`} sub="10% of 6000" />
        <Box x={COL2} y={EXTRA_Y} h={30} cls={EXTRA} top="" big={`+ ${extra}`} sub="10% of the 600" />

        {/* The first year's interest earns interest in year 2 */}
        <path
          d={`M ${COL1 + BOX_W / 2} ${CI_Y + BOX_H} L ${COL1 + BOX_W / 2} ${EXTRA_Y + 15} L ${COL2 - 7} ${EXTRA_Y + 15}`}
          fill="none"
          strokeWidth={1.4}
          strokeDasharray="4 3"
          className="stroke-rose-600 dark:stroke-rose-400"
        />
        <polygon
          points={`${COL2 - 1},${EXTRA_Y + 15} ${COL2 - 8},${EXTRA_Y + 11} ${COL2 - 8},${EXTRA_Y + 19}`}
          className="fill-rose-600 dark:fill-rose-400"
        />

        <text x={160} y={196} textAnchor="middle" className="fill-foreground text-[10px]">
          The extra is interest on the first year&apos;s interest
        </text>
        <text x={160} y={212} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          CI − SI = P × (R/100)² = 6000 × 0.1² = 60
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Simple interest is worked on the first sum every year: 600 and 600. Compound interest adds the first year&apos;s 600 to the
        sum, so year 2 also earns 10% of that 600, which is 60. Over two years that 60 is the whole difference: P(R/100)².
      </p>
    </div>
  );
}
