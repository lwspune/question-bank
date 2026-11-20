/**
 * Static figure: the worked example of "From GDP to national income"
 * (concept sscxnina-aggregates), step by step.
 *
 * GDP at market prices 500 crore. Add net factor income from abroad (20):
 * GNP at market prices 520. Take away depreciation (40): NNP at market prices
 * 480. Take away net indirect taxes (30): NNP at factor cost 450, the national
 * income. Values pinned by tests/notes-w2-10.test.ts. Server component.
 */

/** The concept's worked example, in crore. */
export const INCOME_EXAMPLE = { gdpMp: 500, nfia: 20, depreciation: 40, netIndirectTaxes: 30 } as const;

export type IncomeRow = {
  name: string;
  value: number;
  /** The step that leads to this row from the one above (none for the first). */
  step?: { sign: 1 | -1; amount: number; what: string };
};

/** The chain GDP(MP) → GNP(MP) → NNP(MP) → NNP(FC), in the order the worked example takes. */
export function incomeChain(e: typeof INCOME_EXAMPLE): IncomeRow[] {
  const gnpMp = e.gdpMp + e.nfia;
  const nnpMp = gnpMp - e.depreciation;
  const nnpFc = nnpMp - e.netIndirectTaxes;
  return [
    { name: "GDP at market prices", value: e.gdpMp },
    { name: "GNP at market prices", value: gnpMp, step: { sign: 1, amount: e.nfia, what: "net factor income from abroad" } },
    { name: "NNP at market prices", value: nnpMp, step: { sign: -1, amount: e.depreciation, what: "depreciation" } },
    { name: "NNP at factor cost = national income", value: nnpFc, step: { sign: -1, amount: e.netIndirectTaxes, what: "net indirect taxes" } },
  ];
}

const X0 = 8;
const MAX_W = 240;
const ROW_TOP = 36;
const ROW_H = 52;

export default function SscIncomeAggregates() {
  const rows = incomeChain(INCOME_EXAMPLE);
  const max = Math.max(...rows.map((r) => r.value));
  const w = (v: number) => (v / max) * MAX_W;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · from GDP to national income
      </p>
      <svg
        viewBox="0 0 320 218"
        className="block h-auto w-full"
        role="img"
        aria-label="Four bars, in crore. GDP at market prices 500. Add net factor income from abroad, 20, to get GNP at market prices 520. Take away depreciation, 40, to get NNP at market prices 480. Take away net indirect taxes, 30, to get NNP at factor cost, 450, which is the national income."
      >
        <text x={X0} y={14} className="fill-muted-foreground text-[10px]">
          All figures in crore
        </text>
        {rows.map((r, i) => {
          const y = ROW_TOP + i * ROW_H;
          const prev = i > 0 ? rows[i - 1].value : r.value;
          const last = i === rows.length - 1;
          const added = r.step?.sign === 1;
          return (
            <g key={r.name}>
              <text x={X0} y={y} className={`fill-foreground text-[11px] ${last ? "font-bold" : "font-semibold"}`}>
                {r.name}
              </text>
              {/* the bar above, as a dashed outline, so the step shows */}
              {i > 0 && (
                <rect x={X0} y={y + 5} width={w(prev)} height={16} className="fill-none stroke-muted-foreground" strokeWidth={1} strokeDasharray="3 2" />
              )}
              <rect
                x={X0}
                y={y + 5}
                width={w(r.value)}
                height={16}
                className={last ? "fill-indigo-500 dark:fill-indigo-400" : "fill-sky-400 dark:fill-sky-600"}
              />
              {i > 0 && added && (
                <rect x={X0 + w(prev)} y={y + 5} width={w(r.value) - w(prev)} height={16} className="fill-emerald-500 dark:fill-emerald-400" />
              )}
              {i > 0 && !added && (
                <rect x={X0 + w(r.value)} y={y + 5} width={w(prev) - w(r.value)} height={16} className="fill-rose-200 dark:fill-rose-900/60" />
              )}
              <text x={X0 + Math.max(w(r.value), w(prev)) + 5} y={y + 17} className="fill-foreground text-[11px] font-bold">
                {r.value}
              </text>
              {r.step && (
                <text
                  x={X0}
                  y={y - 15}
                  className={`text-[10px] ${added ? "fill-emerald-700 dark:fill-emerald-300" : "fill-rose-700 dark:fill-rose-300"}`}
                >
                  {added ? "+" : "−"} {r.step.amount} {r.step.what}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Domestic to national: add net factor income from abroad. Gross to net: take away depreciation. Market prices to factor
        cost: take away net indirect taxes.
      </p>
    </div>
  );
}
