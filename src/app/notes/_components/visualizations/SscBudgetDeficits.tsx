/**
 * Static figure: the worked example of "Deficits and fiscal policy"
 * (concept sscxmbbu-deficits) as bars on one scale.
 *
 * Total expenditure 900 crore. Receipts other than borrowings: revenue
 * receipts 600 + non-debt capital receipts 100 = 700. Fiscal deficit =
 * 900 − 700 = 200, the year's borrowing (at home + from the RBI + from
 * abroad). Primary deficit = 200 − interest payments 120 = 80. Values pinned
 * by tests/notes-w2-10.test.ts. Server component.
 */

/** The concept's worked example, in crore. */
export const BUDGET_EXAMPLE = {
  totalExpenditure: 900,
  revenueReceipts: 600,
  nonDebtCapitalReceipts: 100,
  interestPayments: 120,
} as const;

export function deficits(e: typeof BUDGET_EXAMPLE) {
  const receiptsOtherThanBorrowings = e.revenueReceipts + e.nonDebtCapitalReceipts;
  const fiscal = e.totalExpenditure - receiptsOtherThanBorrowings;
  const primary = fiscal - e.interestPayments;
  return { receiptsOtherThanBorrowings, fiscal, primary };
}

const X0 = 12;
const W = 296;

export default function SscBudgetDeficits() {
  const e = BUDGET_EXAMPLE;
  const d = deficits(e);
  const s = W / e.totalExpenditure;
  const xRev = X0;
  const xCap = X0 + e.revenueReceipts * s;
  const xFd = X0 + d.receiptsOtherThanBorrowings * s;
  const xPrim = xFd + e.interestPayments * s;
  const xEnd = X0 + W;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · fiscal and primary deficit on one scale
      </p>
      <svg
        viewBox="0 0 320 238"
        className="block h-auto w-full"
        role="img"
        aria-label="Bars in crore on one scale. Total expenditure 900. Receipts other than borrowings 700: revenue receipts 600 and non-debt capital receipts 100. The gap of 200 is the fiscal deficit, the year's borrowing at home, from the RBI and from abroad. Of the 200, interest payments are 120 and the primary deficit is 80."
      >
        <text x={X0} y={12} className="fill-muted-foreground text-[10px]">
          All figures in crore
        </text>

        {/* 1. total expenditure */}
        <text x={X0} y={30} className="fill-foreground text-[11px] font-semibold">
          Total expenditure: {e.totalExpenditure}
        </text>
        <rect x={X0} y={35} width={W} height={18} className="fill-sky-400 dark:fill-sky-600" />

        {/* 2. receipts other than borrowings, and the gap */}
        <text x={X0} y={74} className="fill-foreground text-[11px] font-semibold">
          Receipts other than borrowings: {e.revenueReceipts} + {e.nonDebtCapitalReceipts} = {d.receiptsOtherThanBorrowings}
        </text>
        <rect x={xRev} y={79} width={xCap - xRev} height={18} className="fill-emerald-400 dark:fill-emerald-600" />
        <rect x={xCap} y={79} width={xFd - xCap} height={18} className="fill-teal-300 dark:fill-teal-700" />
        <rect x={xFd} y={79} width={xEnd - xFd} height={18} className="fill-rose-100 stroke-rose-500 dark:fill-rose-950/40 dark:stroke-rose-400" strokeWidth={1.2} strokeDasharray="3 2" />
        <text x={(xRev + xCap) / 2} y={92} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          revenue receipts {e.revenueReceipts}
        </text>
        <text x={(xCap + xFd) / 2} y={92} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          {e.nonDebtCapitalReceipts}
        </text>
        <text x={(xFd + xEnd) / 2} y={92} textAnchor="middle" className="fill-rose-800 text-[10px] font-bold dark:fill-rose-200">
          {d.fiscal}
        </text>
        <text x={(xCap + xFd) / 2 + 3} y={110} className="fill-muted-foreground text-[10px]" textAnchor="end">
          non-debt capital receipts ↑
        </text>

        {/* the fiscal deficit */}
        <text x={X0} y={128} className="fill-rose-800 text-[11px] font-bold dark:fill-rose-200">
          Fiscal deficit = {e.totalExpenditure} − {d.receiptsOtherThanBorrowings} = {d.fiscal}
        </text>
        <text x={X0} y={142} className="fill-muted-foreground text-[10px]">
          = borrowing at home + from the RBI
        </text>
        <text x={X0} y={155} className="fill-muted-foreground text-[10px]">
          + borrowing from abroad
        </text>

        {/* 3. the fiscal deficit split */}
        <rect x={xFd} y={168} width={xPrim - xFd} height={18} className="fill-amber-300 dark:fill-amber-600" />
        <rect x={xPrim} y={168} width={xEnd - xPrim} height={18} className="fill-indigo-500 dark:fill-indigo-400" />
        <line x1={xFd} y1={97} x2={xFd} y2={168} className="stroke-rose-400 dark:stroke-rose-500" strokeWidth={1} strokeDasharray="2 2" />
        <line x1={xEnd} y1={97} x2={xEnd} y2={168} className="stroke-rose-400 dark:stroke-rose-500" strokeWidth={1} strokeDasharray="2 2" />
        <text x={(xFd + xPrim) / 2} y={181} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          {e.interestPayments}
        </text>
        <text x={(xPrim + xEnd) / 2} y={181} textAnchor="middle" className="fill-white text-[10px] font-semibold dark:fill-indigo-950">
          {d.primary}
        </text>
        <text x={xFd - 6} y={174} textAnchor="end" className="fill-amber-800 text-[10px] dark:fill-amber-300">
          interest payments {e.interestPayments}
        </text>
        <text x={xFd - 6} y={186} textAnchor="end" className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
          primary deficit {d.primary}
        </text>

        <text x={X0} y={210} className="fill-indigo-800 text-[11px] font-bold dark:fill-indigo-200">
          Primary deficit = {d.fiscal} − {e.interestPayments} = {d.primary}
        </text>
        <text x={X0} y={226} className="fill-muted-foreground text-[10px]">
          fiscal deficit minus interest payments
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The fiscal deficit is the gap between total expenditure and receipts other than borrowings: it is the year&apos;s
        borrowing.
      </p>
    </div>
  );
}
