/**
 * Static figure: the three hydrocarbon families with three carbons each
 * (concept sscccchy-formulas).
 *
 * Propane CH₃–CH₂–CH₃ (single bonds only, CₙH₂ₙ₊₂: 8 H), propene
 * CH₂=CH–CH₃ (one double bond, CₙH₂ₙ: 6 H) and propyne CH≡C–CH₃ (one
 * triple bond, CₙH₂ₙ₋₂: 4 H): the concept's own C₃H₈, C₃H₆ and C₃H₄. Values
 * pinned by tests/notes-w2-10.test.ts. Server component.
 */

export type CarbonGroup = { text: string; hydrogens: number };

export type HydrocarbonRow = {
  family: string;
  name: string;
  formula: string;
  rule: string;
  bondNote: string;
  groups: CarbonGroup[];
  /** Bond order between neighbouring groups: 1 single, 2 double, 3 triple. */
  bonds: number[];
};

export const HYDROCARBON_ROWS: readonly HydrocarbonRow[] = [
  {
    family: "Alkane",
    name: "propane",
    formula: "C₃H₈",
    rule: "CₙH₂ₙ₊₂",
    bondNote: "single bonds only",
    groups: [
      { text: "CH₃", hydrogens: 3 },
      { text: "CH₂", hydrogens: 2 },
      { text: "CH₃", hydrogens: 3 },
    ],
    bonds: [1, 1],
  },
  {
    family: "Alkene",
    name: "propene",
    formula: "C₃H₆",
    rule: "CₙH₂ₙ",
    bondNote: "one double bond",
    groups: [
      { text: "CH₂", hydrogens: 2 },
      { text: "CH", hydrogens: 1 },
      { text: "CH₃", hydrogens: 3 },
    ],
    bonds: [2, 1],
  },
  {
    family: "Alkyne",
    name: "propyne",
    formula: "C₃H₄",
    rule: "CₙH₂ₙ₋₂",
    bondNote: "one triple bond",
    groups: [
      { text: "CH", hydrogens: 1 },
      { text: "C", hydrogens: 0 },
      { text: "CH₃", hydrogens: 3 },
    ],
    bonds: [3, 1],
  },
];

/** Hydrogens the family's rule gives for n carbons. */
export function hydrogensByRule(family: string, n: number): number {
  if (family === "Alkane") return 2 * n + 2;
  if (family === "Alkene") return 2 * n;
  if (family === "Alkyne") return 2 * n - 2;
  throw new Error(`unknown family ${family}`);
}

/** Each carbon makes four bonds: hydrogens plus bond orders to its neighbours. */
export function carbonValences(row: HydrocarbonRow): number[] {
  return row.groups.map((g, i) => g.hydrogens + (row.bonds[i - 1] ?? 0) + (row.bonds[i] ?? 0));
}

const ROW_TOP = 14;
const ROW_H = 62;
const GX = [40, 104, 168];
const GW = 30;

function Bond({ x1, x2, y, order }: { x1: number; x2: number; y: number; order: number }) {
  const offsets = order === 1 ? [0] : order === 2 ? [-2.5, 2.5] : [-4, 0, 4];
  return (
    <g>
      {offsets.map((o) => (
        <line key={o} x1={x1} y1={y + o} x2={x2} y2={y + o} className="stroke-foreground" strokeWidth={1.4} />
      ))}
    </g>
  );
}

export default function SscHydrocarbonFamilies() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three carbons, three families
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="Three hydrocarbons with three carbons each. Propane, an alkane with single bonds only, is C3H8, fitting C n H 2n plus 2. Propene, an alkene with one double bond, is C3H6, fitting C n H 2n. Propyne, an alkyne with one triple bond, is C3H4, fitting C n H 2n minus 2."
      >
        {HYDROCARBON_ROWS.map((r, i) => {
          const y = ROW_TOP + i * ROW_H;
          const by = y + 30;
          const h = r.groups.reduce((s, g) => s + g.hydrogens, 0);
          return (
            <g key={r.family}>
              <text x={8} y={y + 4} className="fill-foreground text-[11px] font-bold">
                {r.family}: {r.name}, {r.formula}
              </text>
              <text x={312} y={y + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
                {r.bondNote}
              </text>
              {r.groups.map((g, j) => (
                <text key={j} x={GX[j] + GW / 2} y={by + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                  {g.text}
                </text>
              ))}
              {r.bonds.map((o, j) => (
                <Bond key={j} x1={GX[j] + GW + 2} x2={GX[j + 1] - 2} y={by} order={o} />
              ))}
              <rect x={214} y={by - 12} width={98} height={22} rx={6} className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/30 dark:stroke-sky-700" strokeWidth={1} />
              <text x={263} y={by + 3} textAnchor="middle" className="fill-sky-800 text-[11px] font-bold dark:fill-sky-200">
                {r.rule}: {h} H
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        With n = 3 carbons: 2n + 2 = 8, 2n = 6 and 2n − 2 = 4 hydrogens.
      </p>
    </div>
  );
}
