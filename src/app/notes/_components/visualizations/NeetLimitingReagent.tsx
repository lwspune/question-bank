/**
 * Still: the limiting reagent in the concept's own example (nchsb-limiting):
 * 4 g of H₂ and 64 g of O₂, 2H₂ + O₂ → 2H₂O. Each drawn molecule is 1 mol.
 * Before: 2 mol H₂, 2 mol O₂. Dividing by the coefficients gives 1 for H₂ and
 * 2 for O₂, so H₂ limits. After: 2 mol (36 g) of water and 1 mol (32 g) of O₂
 * left over.
 *
 * `limiting` does the concept's own working, and the test checks that every
 * atom drawn before is drawn after. Server component, pure SVG. Pinned by
 * tests/notes-w2-03.test.ts.
 */

export const REACTION = {
  h2: { mass: 4, molarMass: 2, coeff: 2 },
  o2: { mass: 64, molarMass: 32, coeff: 1 },
  water: { coeff: 2, molarMass: 18 },
} as const;

export function limiting() {
  const nH2 = REACTION.h2.mass / REACTION.h2.molarMass;
  const nO2 = REACTION.o2.mass / REACTION.o2.molarMass;
  const rH2 = nH2 / REACTION.h2.coeff;
  const rO2 = nO2 / REACTION.o2.coeff;
  const limits = rH2 < rO2 ? "H₂" : "O₂";
  // H₂ limits: water from H₂ by 2 : 2, O₂ used by 2 : 1.
  const nWater = (nH2 * REACTION.water.coeff) / REACTION.h2.coeff;
  const o2Used = (nH2 * REACTION.o2.coeff) / REACTION.h2.coeff;
  const o2Left = nO2 - o2Used;
  return {
    nH2,
    nO2,
    rH2,
    rO2,
    limits,
    nWater,
    waterMass: nWater * REACTION.water.molarMass,
    o2Left,
    o2LeftMass: o2Left * REACTION.o2.molarMass,
  };
}

/** Molecules drawn in each box (1 drawn molecule = 1 mol). */
export const BEFORE = { H2: 2, O2: 2 } as const;
export const AFTER = { H2O: 2, O2: 1 } as const;

export function atoms(box: { H2?: number; O2?: number; H2O?: number }): { H: number; O: number } {
  const h2 = box.H2 ?? 0;
  const o2 = box.O2 ?? 0;
  const w = box.H2O ?? 0;
  return { H: 2 * h2 + 2 * w, O: 2 * o2 + w };
}

function H({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={5} strokeWidth={0.8} className="fill-slate-100 stroke-slate-500 dark:fill-slate-300 dark:stroke-slate-400" />;
}
function O({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={8} strokeWidth={0.8} className="fill-rose-400 stroke-rose-700 dark:fill-rose-500 dark:stroke-rose-300" />;
}
function H2({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <H x={x - 4} y={y} />
      <H x={x + 4} y={y} />
    </g>
  );
}
function O2({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <O x={x - 6} y={y} />
      <O x={x + 6} y={y} />
    </g>
  );
}
function Water({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <H x={x - 9} y={y + 6} />
      <H x={x + 9} y={y + 6} />
      <O x={x} y={y} />
    </g>
  );
}

export default function NeetLimitingReagent() {
  const r = limiting();
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which reactant runs out first
      </p>
      <svg
        viewBox="0 0 320 242"
        className="block h-auto w-full"
        role="img"
        aria-label="2H2 + O2 gives 2H2O. Before: 2 mol of hydrogen (4 g) and 2 mol of oxygen (64 g). Divided by the coefficients, hydrogen gives 1 and oxygen 2, so hydrogen is the limiting reagent. After: 2 mol of water, 36 g, and 1 mol of oxygen, 32 g, left over."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          2H₂ + O₂ → 2H₂O
        </text>

        <rect x={6} y={24} width={140} height={92} rx={6} fill="none" strokeWidth={1} className="stroke-border" />
        <text x={14} y={38} className="fill-muted-foreground text-[10px]">
          before
        </text>
        <H2 x={44} y={60} />
        <H2 x={44} y={94} />
        <O2 x={108} y={60} />
        <O2 x={108} y={94} />
        <text x={44} y={129} textAnchor="middle" className="fill-foreground text-[10px]">
          H₂: 4 g
        </text>
        <text x={44} y={141} textAnchor="middle" className="fill-foreground text-[10px]">
          = {r.nH2} mol
        </text>
        <text x={108} y={129} textAnchor="middle" className="fill-foreground text-[10px]">
          O₂: 64 g
        </text>
        <text x={108} y={141} textAnchor="middle" className="fill-foreground text-[10px]">
          = {r.nO2} mol
        </text>

        <line x1={150} y1={70} x2={164} y2={70} strokeWidth={1.4} className="stroke-muted-foreground" />
        <polygon points="171,70 163,66 163,74" className="fill-muted-foreground" />

        <rect x={174} y={24} width={140} height={92} rx={6} fill="none" strokeWidth={1} className="stroke-border" />
        <text x={182} y={38} className="fill-muted-foreground text-[10px]">
          after
        </text>
        <Water x={210} y={58} />
        <Water x={210} y={92} />
        <O2 x={276} y={74} />
        <text x={276} y={96} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          left over
        </text>
        <text x={210} y={129} textAnchor="middle" className="fill-foreground text-[10px]">
          H₂O: {r.nWater} mol
        </text>
        <text x={210} y={141} textAnchor="middle" className="fill-foreground text-[10px]">
          = {r.waterMass} g
        </text>
        <text x={276} y={129} textAnchor="middle" className="fill-foreground text-[10px]">
          O₂: {r.o2Left} mol
        </text>
        <text x={276} y={141} textAnchor="middle" className="fill-foreground text-[10px]">
          = {r.o2LeftMass} g
        </text>

        <line x1={6} y1={150} x2={314} y2={150} className="stroke-border" />
        <text x={6} y={168} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          Divide moles by the coefficient:
        </text>
        <text x={6} y={186} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          H₂: {r.nH2} ÷ {REACTION.h2.coeff} = {r.rH2}, the smallest: H₂ limits
        </text>
        <text x={6} y={202} className="fill-foreground text-[11px]">
          O₂: {r.nO2} ÷ {REACTION.o2.coeff} = {r.rO2}, so O₂ is in excess
        </text>
        <text x={6} y={220} className="fill-muted-foreground text-[10px]">
          2 mol H₂ use 1 mol O₂ and give 2 mol H₂O; O₂ left = 2 − 1 = 1 mol.
        </text>
        <text x={6} y={235} className="fill-muted-foreground text-[10px]">
          Each shape is 1 mol of molecules.
        </text>
      </svg>
    </div>
  );
}
