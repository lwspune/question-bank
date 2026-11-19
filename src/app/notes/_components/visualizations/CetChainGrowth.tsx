"use client";

/**
 * Animation: free-radical addition (chain-growth) polymerisation of ethene to
 * polythene (concept cetpol-addition-condensation-ring-opening).
 *
 * A peroxide initiator splits into radicals R•. One adds to an ethene C=C,
 * leaving the radical at the new chain end; the chain radical adds monomer
 * after monomer (propagation); two radicals pairing up end the chain
 * (termination). Nothing is lost, so the repeat unit –CH₂–CH₂– has the
 * monomer's formula, C₂H₄. The last frame contrasts condensation, which loses
 * a small molecule (H₂O or HCl) at every link, as the concept says.
 *
 * Each monomer is one group that slides from the pool into the chain; the
 * radical dot is one shape that moves to the chain end. Pinned by
 * tests/notes-cet-visuals-chem-b.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const CHAIN_STEPS: readonly FigureStep[] = [
  {
    title: "Initiation: radicals",
    caption: "On heating, the peroxide initiator R–O–O–R splits into two free radicals, R•, each with one unpaired electron.",
  },
  {
    title: "Initiation: first monomer",
    caption: "R• opens the C=C of an ethene molecule and bonds to one carbon. The unpaired electron is now on the other carbon.",
  },
  {
    title: "Propagation",
    caption: "The chain radical adds the next ethene in the same way, and the radical moves to the new end.",
  },
  {
    title: "Chain growth",
    caption: "Monomer after monomer adds, so the chain grows quickly, one double bond opened at a time.",
  },
  {
    title: "Termination",
    caption:
      "Two radicals pair up and the chain stops growing. The product is polythene. Nothing was lost: each repeat unit is C₂H₄, the monomer's formula.",
  },
];

export const MONOMER_COUNT = 4;

/** Monomers in the chain at each step. */
export function joinedCount(step: number): number {
  return [0, 1, 2, MONOMER_COUNT, MONOMER_COUNT][Math.min(step, 4)];
}
/** True once two radicals have paired up and the chain has stopped. */
export const terminated = (step: number) => step >= 4;
/** Unpaired electrons on the growing chain at each step. */
export const chainRadicals = (step: number) => (terminated(step) ? 0 : 1);

type Formula = { C: number; H: number };
export const MONOMER: Formula = { C: 2, H: 4 };
export const REPEAT_UNIT: Formula = { C: 2, H: 4 };
/** Small molecule lost per link: none for addition; condensation loses one (H₂O or HCl). */
export const BY_PRODUCT = { addition: null, condensation: "H₂O or HCl" } as const;

// Geometry (viewBox units).
const ROW = 82;
const POOL = 140;
const R_X = 16;
export const UNIT_W = 50;
/** Centre of chain unit i. */
export const unitX = (i: number) => 46 + UNIT_W * i;
/** Where monomer i waits before it joins. */
export const POOL_X = [52, 116, 180, 244] as const;
/** x of the radical dot: just after the last joined unit (or after R). */
export function dotX(step: number): number {
  const n = joinedCount(step);
  return n === 0 ? R_X + 8 : unitX(n - 1) + 26;
}

export default function CetChainGrowth() {
  return (
    <StepFigure
      title="Animation · how a chain polymer grows"
      label="Free-radical polymerisation of ethene. A peroxide gives radicals R•. One adds to ethene, then the chain radical adds monomer after monomer, and finally two radicals pair up to end the chain: polythene, with nothing lost."
      viewBox="0 0 320 182"
      steps={CHAIN_STEPS}
      note="• : an unpaired electron (a free radical)."
    >
      {(step) => {
        const n = joinedCount(step);
        const end = terminated(step);
        return (
          <g>
            <text x={160} y={18} textAnchor="middle" className={`${MOTION} text-[11px] ${step === 0 ? "fill-foreground font-semibold" : "fill-muted-foreground"}`}>
              peroxide: R–O–O–R → 2 R•
            </text>
            <text x={8} y={46} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
              growing chain
            </text>

            {/* The initiator radical that starts the chain */}
            <text x={R_X} y={ROW} textAnchor="middle" className="fill-rose-700 text-[12px] font-semibold dark:fill-rose-300">
              R
            </text>

            {/* Monomers: free ethene in the pool, a repeat unit once joined */}
            {POOL_X.map((px, i) => {
              const joined = i < n;
              return (
                <g key={px} className={MOTION} style={{ transform: svgTransform(joined ? { x: unitX(i), y: ROW } : { x: px, y: POOL }) }}>
                  <text textAnchor="middle" className={`${MOTION} fill-sky-700 text-[11px] dark:fill-sky-300`} style={{ opacity: joined ? 0 : 1 }}>
                    CH₂=CH₂
                  </text>
                  <text textAnchor="middle" className={`${MOTION} fill-foreground text-[11px]`} style={{ opacity: joined ? 1 : 0 }}>
                    –CH₂–CH₂
                  </text>
                </g>
              );
            })}
            <text x={8} y={POOL + 22} className={`${MOTION} fill-muted-foreground text-[10px]`} style={{ opacity: n < MONOMER_COUNT ? 1 : 0 }}>
              ethene monomers
            </text>

            {/* The radical at the chain end */}
            <circle
              r={2.6}
              className={`${MOTION} fill-rose-600 dark:fill-rose-400`}
              style={{ transform: svgTransform({ x: dotX(step), y: ROW - 8 }), opacity: end ? 0 : 1 }}
            />

            {/* A second radical: waits, then pairs with the chain end */}
            <g className={MOTION} style={{ transform: svgTransform(end ? { x: unitX(MONOMER_COUNT - 1) + 25, y: ROW } : { x: 268, y: 46 }) }}>
              <text className={`${MOTION} fill-rose-700 text-[12px] font-semibold dark:fill-rose-300`} style={{ opacity: end ? 0 : 1 }}>
                R•
              </text>
              <text className={`${MOTION} fill-rose-700 text-[12px] font-semibold dark:fill-rose-300`} style={{ opacity: end ? 1 : 0 }}>
                –R
              </text>
            </g>

            {/* The overview */}
            <g className={MOTION} style={{ opacity: end ? 1 : 0 }}>
              <text x={160} y={112} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                polythene, –(CH₂–CH₂)ₙ–: addition, nothing lost
              </text>
              <line x1={8} y1={142} x2={312} y2={142} className="stroke-border" />
              <text x={8} y={160} className="fill-muted-foreground text-[10.5px]">
                Condensation instead loses H₂O (or HCl) at every link,
              </text>
              <text x={8} y={174} className="fill-muted-foreground text-[10.5px]">
                e.g. diacid + diamine give nylon 6,6.
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
