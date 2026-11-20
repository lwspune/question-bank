/**
 * Static figure: three ways to reduce acetophenone (concept
 * cetald-clemmensen-wolff-kishner-and-hydride).
 *
 * The worked example: Clemmensen (Zn–Hg / conc. HCl, acid) and Wolff–Kishner
 * (N₂H₄, then KOH in hot ethylene glycol, base) both take C=O all the way to
 * CH₂ and give ethylbenzene; NaBH₄ stops at the alcohol, 1-phenylethanol. The
 * box under it is the trap: ethyl phenyl ketone by Wolff–Kishner keeps all
 * three side-chain carbons, n-propylbenzene. Molecular formulas are checked
 * in tests/notes-w2-14.test.ts (C=O to CH₂ swaps O for 2 H; the hydride adds
 * 2 H; carbons never change). Server component.
 */

export type Formula = { C: number; H: number; O: number };

export const ACETOPHENONE: Formula = { C: 8, H: 8, O: 1 }; // C₆H₅COCH₃
export const ETHYLBENZENE: Formula = { C: 8, H: 10, O: 0 }; // C₆H₅CH₂CH₃
export const PHENYLETHANOL: Formula = { C: 8, H: 10, O: 1 }; // C₆H₅CH(OH)CH₃
export const PROPIOPHENONE: Formula = { C: 9, H: 10, O: 1 }; // C₆H₅COCH₂CH₃, ethyl phenyl ketone
export const PROPYLBENZENE: Formula = { C: 9, H: 12, O: 0 }; // C₆H₅CH₂CH₂CH₃

/** C=O to CH₂ (Clemmensen, Wolff–Kishner): the O is replaced by two H. */
export const toMethylene = (f: Formula): Formula => ({ C: f.C, H: f.H + 2, O: f.O - 1 });
/** C=O to CH–OH (NaBH₄, LiAlH₄): two H added, O kept. */
export const toAlcohol = (f: Formula): Formula => ({ C: f.C, H: f.H + 2, O: f.O });

export type Route = {
  name: string;
  reagent: readonly string[];
  medium: string;
  product: { before: string; changed: string; after: string };
  productName: string;
  result: Formula;
};

export const ROUTES: readonly Route[] = [
  {
    name: "Clemmensen",
    reagent: ["Zn–Hg /", "conc. HCl"],
    medium: "acid",
    product: { before: "C₆H₅", changed: "CH₂", after: "CH₃" },
    productName: "ethylbenzene",
    result: toMethylene(ACETOPHENONE),
  },
  {
    name: "Wolff–Kishner",
    reagent: ["N₂H₄, then KOH,", "glycol, heat"],
    medium: "base",
    product: { before: "C₆H₅", changed: "CH₂", after: "CH₃" },
    productName: "ethylbenzene",
    result: toMethylene(ACETOPHENONE),
  },
  {
    name: "NaBH₄",
    reagent: ["hydride", "reagent"],
    medium: "stops at alcohol",
    product: { before: "C₆H₅", changed: "CH(OH)", after: "CH₃" },
    productName: "1-phenylethanol",
    result: toAlcohol(ACETOPHENONE),
  },
];

const COL_X = [56, 160, 264] as const;
const RAIL_Y = 50;
const ARROW_END = 136;

export default function CetAcetophenoneReductions() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three ways to reduce acetophenone
      </p>
      <svg
        viewBox="0 0 320 252"
        className="block h-auto w-full"
        role="img"
        aria-label="Acetophenone at the top branches three ways. Clemmensen, zinc amalgam and concentrated hydrochloric acid, gives ethylbenzene. Wolff-Kishner, hydrazine then potassium hydroxide in hot ethylene glycol, also gives ethylbenzene: both turn the C=O into CH2. Sodium borohydride stops at the alcohol, 1-phenylethanol. Below: ethyl phenyl ketone by Wolff-Kishner gives n-propylbenzene, all three side-chain carbons kept."
      >
        <text x={160} y={18} textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
          C₆H₅
          <tspan className="fill-rose-700 dark:fill-rose-300">CO</tspan>
          CH₃
        </text>
        <text x={160} y={31} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          acetophenone
        </text>

        {/* the rail and the three arrows */}
        <line x1={160} y1={36} x2={160} y2={RAIL_Y} strokeWidth={1.4} className="stroke-foreground" />
        <line x1={COL_X[0]} y1={RAIL_Y} x2={COL_X[2]} y2={RAIL_Y} strokeWidth={1.4} className="stroke-foreground" />
        {ROUTES.map((r, i) => {
          const x = COL_X[i];
          return (
            <g key={r.name}>
              <line x1={x} y1={RAIL_Y} x2={x} y2={ARROW_END - 6} strokeWidth={1.4} className="stroke-foreground" />
              <polygon points={`${x - 4},${ARROW_END - 7} ${x + 4},${ARROW_END - 7} ${x},${ARROW_END}`} className="fill-foreground" />
              <rect x={x - 48} y={60} width={96} height={58} rx={5} strokeWidth={1} className="fill-background stroke-border" />
              <text x={x} y={74} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
                {r.name}
              </text>
              {r.reagent.map((line, k) => (
                <text key={k} x={x} y={87 + k * 11} textAnchor="middle" className="fill-foreground text-[10px]">
                  {line}
                </text>
              ))}
              <text x={x} y={112} textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
                {r.medium}
              </text>
              <text x={x} y={ARROW_END + 15} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {r.product.before}
                <tspan className="fill-rose-700 dark:fill-rose-300">{r.product.changed}</tspan>
                {r.product.after}
              </text>
              <text x={x} y={ARROW_END + 28} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {r.productName}
              </text>
            </g>
          );
        })}

        {/* what happened to the C=O */}
        <path
          d={`M ${COL_X[0] - 30} 172 V 177 H ${COL_X[1] + 30} V 172`}
          fill="none"
          strokeWidth={1}
          className="stroke-muted-foreground"
        />
        <text x={(COL_X[0] + COL_X[1]) / 2} y={190} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          C=O → CH₂
        </text>
        <path d={`M ${COL_X[2] - 30} 172 V 177 H ${COL_X[2] + 30} V 172`} fill="none" strokeWidth={1} className="stroke-muted-foreground" />
        <text x={COL_X[2]} y={190} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          C=O → CH–OH
        </text>

        {/* the trap */}
        <rect x={8} y={200} width={304} height={48} rx={6} className="fill-background stroke-border" />
        <text x={18} y={215} className="fill-foreground text-[10px]">
          Ethyl phenyl ketone, C₆H₅COCH₂CH₃, by Wolff–Kishner
        </text>
        <text x={18} y={228} className="fill-foreground text-[10px]">
          gives n-propylbenzene, C₆H₅CH₂CH₂CH₃:
        </text>
        <text x={18} y={241} className="fill-foreground text-[10px]">
          all three side-chain carbons stay.
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Red: the group that changes. Clemmensen works in acid and Wolff–Kishner in base, so choose by what else the molecule
        tolerates; both replace the O by two H. A hydride (NaBH₄ or LiAlH₄) only adds H across C=O and stops at the alcohol.
      </p>
    </div>
  );
}
