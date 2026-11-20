/**
 * Static figure: price elasticity of demand on a number line
 * (concept sscxmimi-demand).
 *
 * Below 1 the demand is inelastic, exactly 1 unitary, above 1 elastic. The
 * points are the concept's own: tea (quantity falls 4% when price rises 8%:
 * 0.5, inelastic), the self-check (5% and 5%: 1, unitary) and the practice
 * value 3 (elastic). Values pinned by tests/notes-w2-10.test.ts. Server
 * component.
 */

export type ElasticityPoint = {
  name: string;
  /** The two percentage changes, where the concept gives them. */
  quantityPct?: number;
  pricePct?: number;
  /** The elasticity, where the concept gives only that. */
  given?: number;
  /** Which label row (0 or 1), so labels of close points do not overlap. */
  row: 0 | 1;
};

export const ELASTICITY_POINTS: readonly ElasticityPoint[] = [
  { name: "tea", quantityPct: 4, pricePct: 8, row: 1 },
  { name: "self-check", quantityPct: 5, pricePct: 5, row: 0 },
  { name: "practice", given: 3, row: 0 },
];

/** Size of the percentage change in quantity over that in price (the minus sign is dropped). */
export function elasticity(quantityPct: number, pricePct: number): number {
  return Math.abs(quantityPct) / Math.abs(pricePct);
}

export function pointElasticity(p: ElasticityPoint): number {
  if (p.given !== undefined) return p.given;
  return elasticity(p.quantityPct ?? 0, p.pricePct ?? 1);
}

/** The two label lines under a point. */
export function pointLines(p: ElasticityPoint): [string, string] {
  const e = pointElasticity(p);
  if (p.given !== undefined) return [`e = ${e}`, demandKind(e)];
  const head = p.name === "tea" ? "Tea: " : "";
  return [`${head}${p.quantityPct}% ÷ ${p.pricePct}%`, `= ${e}, ${demandKind(e)}`];
}

export function demandKind(e: number): "inelastic" | "unitary" | "elastic" {
  if (e < 1) return "inelastic";
  if (e > 1) return "elastic";
  return "unitary";
}

const X0 = 24;
const PER_UNIT = 80;
const MAX_E = 3.5;
const AXIS_Y = 96;

export function eX(e: number): number {
  return X0 + e * PER_UNIT;
}

export default function SscElasticityScale() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · elastic, unitary or inelastic demand
      </p>
      <svg
        viewBox="0 0 320 186"
        className="block h-auto w-full"
        role="img"
        aria-label="A number line of price elasticity from 0 to 3.5. Below 1 demand is inelastic, at exactly 1 it is unitary, above 1 it is elastic. Tea, with quantity falling 4 percent when price rises 8 percent, has elasticity 0.5, inelastic. Equal 5 percent changes give 1, unitary. An elasticity of 3 is elastic."
      >
        <text x={160} y={18} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          e = % change in quantity ÷ % change in price
        </text>

        <rect x={eX(0)} y={AXIS_Y - 22} width={eX(1) - eX(0)} height={14} className="fill-amber-200 dark:fill-amber-900/60" />
        <rect x={eX(1)} y={AXIS_Y - 22} width={eX(MAX_E) - eX(1)} height={14} className="fill-sky-200 dark:fill-sky-900/60" />
        <text x={(eX(0) + eX(1)) / 2} y={AXIS_Y - 11} textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">
          inelastic
        </text>
        <text x={(eX(1) + eX(MAX_E)) / 2} y={AXIS_Y - 11} textAnchor="middle" className="fill-sky-900 text-[10px] font-bold dark:fill-sky-200">
          elastic
        </text>

        <line x1={eX(0)} y1={AXIS_Y} x2={eX(MAX_E)} y2={AXIS_Y} className="stroke-foreground" strokeWidth={1.2} />
        {[0, 1, 2, 3].map((t) => (
          <g key={t}>
            <line x1={eX(t)} y1={AXIS_Y} x2={eX(t)} y2={AXIS_Y + 4} className="stroke-foreground" strokeWidth={1} />
            <text x={eX(t)} y={AXIS_Y + 15} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {t}
            </text>
          </g>
        ))}
        <line x1={eX(1)} y1={AXIS_Y - 34} x2={eX(1)} y2={AXIS_Y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.6} />
        <text x={eX(1)} y={AXIS_Y - 38} textAnchor="middle" className="fill-indigo-700 text-[10px] font-bold dark:fill-indigo-300">
          exactly 1: unitary
        </text>

        {ELASTICITY_POINTS.map((p) => {
          const e = pointElasticity(p);
          const [l1, l2] = pointLines(p);
          const dy = p.row * 30;
          return (
            <g key={p.name}>
              <circle cx={eX(e)} cy={AXIS_Y} r={4.5} className="fill-foreground" />
              <line x1={eX(e)} y1={AXIS_Y + 20} x2={eX(e)} y2={AXIS_Y + 26 + dy} className="stroke-muted-foreground" strokeWidth={1} />
              <text x={eX(e)} y={AXIS_Y + 38 + dy} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                {l1}
              </text>
              <text x={eX(e)} y={AXIS_Y + 51 + dy} textAnchor="middle" className="fill-foreground text-[10px]">
                {l2}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Compare the two percentage changes: if quantity moves by more than price, demand is elastic.
      </p>
    </div>
  );
}
