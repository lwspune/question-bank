"use client";

/**
 * Animation: nucleophilic addition to a C=O, with the concept's own example
 * CH₃CHO + HCN → CH₃CH(OH)CN, acetaldehyde cyanohydrin (concept
 * cetald-addition-derivatives).
 *
 * 1. The C=O is polar: carbon δ⁺, oxygen δ⁻.
 * 2. CN⁻ (from HCN) attacks the carbon; the π electrons of C=O move onto O.
 * 3. That gives an alkoxide ion: the carbon now has four groups, O carries −.
 * 4. O⁻ takes H⁺: the cyanohydrin. As the concept says, the nucleophile's
 *    atom (the C of CN) ends up on the carbonyl carbon, next to a new OH.
 *
 * Pinned by tests/notes-cet-visuals-chem-b.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const ADDITION_STEPS: readonly FigureStep[] = [
  {
    title: "A polar C=O",
    caption: "Oxygen pulls the shared electrons, so the carbonyl carbon is δ⁺ and the oxygen δ⁻.",
  },
  {
    title: "The nucleophile attacks",
    caption: "CN⁻ from HCN attacks the δ⁺ carbon. At the same time the π electrons of C=O move onto the oxygen.",
  },
  {
    title: "Alkoxide ion",
    caption: "The C=O is now a single bond and the oxygen carries the negative charge. The carbon holds four groups.",
  },
  {
    title: "Protonation",
    caption: "O⁻ takes H⁺ (from HCN). The product is acetaldehyde cyanohydrin, CH₃CH(OH)CN: CN and a new OH on the same carbon.",
  },
];

export const EQUATION = "CH₃CHO + HCN → CH₃CH(OH)CN";

type Formula = { C: number; H: number; N: number; O: number };
/** Atom counts of the three species, for the balance check in the test. */
export const FORMULAS: Record<"acetaldehyde" | "HCN" | "cyanohydrin", Formula> = {
  acetaldehyde: { C: 2, H: 4, N: 0, O: 1 },
  HCN: { C: 1, H: 1, N: 1, O: 0 },
  cyanohydrin: { C: 3, H: 5, N: 1, O: 1 },
};

/** Bond order of the C–O bond at each step. */
export function coBondOrder(step: number): 1 | 2 {
  return step <= 1 ? 2 : 1;
}
/** The charge on oxygen at each step. */
export function oxygenCharge(step: number): -1 | 0 {
  return step === 2 ? -1 : 0;
}
/** The groups on the carbonyl carbon at each step. */
export function groupsOnCarbon(step: number): string[] {
  return step <= 1 ? ["CH₃", "H", "=O"] : step === 2 ? ["CH₃", "H", "CN", "O⁻"] : ["CH₃", "H", "CN", "OH"];
}

// Geometry (viewBox units).
export const C = { x: 150, y: 100 } as const;
const O_X = 186;
/** Where the CN group's text ends (its C is nearest the carbonyl carbon). */
export function cnX(step: number): number {
  return step === 0 ? 72 : step === 1 ? 100 : 124;
}

type Pt = { x: number; y: number };
const r1 = (n: number) => Math.round(n * 10) / 10;

export function arrowHead(ctrl: Pt, tip: Pt, len = 7, half = 3.2): string {
  const a = Math.atan2(tip.y - ctrl.y, tip.x - ctrl.x);
  const bx = tip.x - len * Math.cos(a);
  const by = tip.y - len * Math.sin(a);
  const px = -Math.sin(a) * half;
  const py = Math.cos(a) * half;
  return `${r1(tip.x)},${r1(tip.y)} ${r1(bx + px)},${r1(by + py)} ${r1(bx - px)},${r1(by - py)}`;
}

function CurvedArrow({ from, ctrl, to, show }: { from: Pt; ctrl: Pt; to: Pt; show: boolean }) {
  return (
    <g className={MOTION} style={{ opacity: show ? 1 : 0 }}>
      <path d={`M ${from.x} ${from.y} Q ${ctrl.x} ${ctrl.y} ${to.x} ${to.y}`} fill="none" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1.4} />
      <polygon points={arrowHead(ctrl, to)} className="fill-rose-600 dark:fill-rose-400" />
    </g>
  );
}

function Fade({ x, y, on, children, cls, anchor = "middle" }: { x: number; y: number; on: boolean; children: string; cls: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={`${MOTION} ${cls}`} style={{ opacity: on ? 1 : 0 }}>
      {children}
    </text>
  );
}

export default function CetCarbonylAddition() {
  return (
    <StepFigure
      title="Animation · adding HCN to a carbonyl group"
      label="Ethanal's polar C=O, carbon δ⁺ and oxygen δ⁻. CN⁻ attacks the carbon while the π electrons move onto oxygen, giving an alkoxide ion. The oxygen then takes H⁺, giving acetaldehyde cyanohydrin, CH₃CH(OH)CN."
      viewBox="0 0 320 186"
      steps={ADDITION_STEPS}
      note="Red curved arrows show where an electron pair moves. With H₂N–Z the first step is the same; the adduct then loses H₂O to give C=N–Z."
    >
      {(step) => {
        const bonded = step >= 2;
        return (
          <g>
            <text x={160} y={18} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {EQUATION}
            </text>

            {/* Bonds round the carbonyl carbon */}
            <line x1={C.x} y1={C.y} x2={C.x - 20} y2={C.y - 18} strokeWidth={1.4} className="stroke-foreground" />
            <line x1={C.x} y1={C.y} x2={C.x - 20} y2={C.y + 18} strokeWidth={1.4} className="stroke-foreground" />
            <line x1={C.x + 7} y1={C.y} x2={O_X - 2} y2={C.y} strokeWidth={1.4} className="stroke-foreground" />
            <line x1={C.x + 7} y1={C.y + 4.5} x2={O_X - 2} y2={C.y + 4.5} strokeWidth={1.4} className={`${MOTION} stroke-foreground`} style={{ opacity: coBondOrder(step) === 2 ? 1 : 0 }} />
            <line x1={C.x - 26} y1={C.y} x2={C.x - 7} y2={C.y} strokeWidth={1.4} className={`${MOTION} stroke-foreground`} style={{ opacity: bonded ? 1 : 0 }} />

            <text x={C.x - 22} y={C.y - 22} textAnchor="end" className="fill-foreground text-[11px]">
              CH₃
            </text>
            <text x={C.x - 22} y={C.y + 30} textAnchor="end" className="fill-foreground text-[11px]">
              H
            </text>
            <circle cx={C.x} cy={C.y} r={6.5} className="fill-background" />
            <text x={C.x} y={C.y + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              C
            </text>

            {/* Oxygen: O, then O⁻, then OH */}
            <Fade x={O_X} y={C.y + 4} on={step <= 1} anchor="start" cls="fill-rose-700 text-[12px] font-semibold dark:fill-rose-300">
              O
            </Fade>
            <Fade x={O_X} y={C.y + 4} on={step === 2} anchor="start" cls="fill-rose-700 text-[12px] font-semibold dark:fill-rose-300">
              O⁻
            </Fade>
            <Fade x={O_X} y={C.y + 4} on={step === 3} anchor="start" cls="fill-rose-700 text-[12px] font-semibold dark:fill-rose-300">
              OH
            </Fade>

            {/* Partial charges */}
            <Fade x={C.x + 6} y={C.y - 12} on={step <= 1} cls="fill-sky-700 text-[11px] dark:fill-sky-300">
              δ⁺
            </Fade>
            <Fade x={O_X + 6} y={C.y - 12} on={step <= 1} cls="fill-rose-700 text-[11px] dark:fill-rose-300">
              δ⁻
            </Fade>

            {/* The nucleophile */}
            <g className={MOTION} style={{ transform: svgTransform({ x: cnX(step), y: C.y + 4 }) }}>
              <Fade x={0} y={0} on={!bonded} anchor="end" cls="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
                N≡C⁻
              </Fade>
              <Fade x={0} y={0} on={bonded} anchor="end" cls="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
                N≡C
              </Fade>
            </g>

            {/* The proton */}
            <g className={MOTION} style={{ transform: svgTransform({ x: step === 3 ? O_X + 12 : 246, y: step === 3 ? C.y + 4 : C.y + 34 }), opacity: step === 2 ? 1 : 0 }}>
              <text textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
                H⁺
              </text>
            </g>

            {/* Electron-pair arrows */}
            <CurvedArrow from={{ x: 103, y: C.y - 2 }} ctrl={{ x: 124, y: C.y - 12 }} to={{ x: C.x - 9, y: C.y - 3 }} show={step === 1} />
            <CurvedArrow from={{ x: 168, y: C.y + 7 }} ctrl={{ x: 176, y: C.y + 26 }} to={{ x: O_X + 4, y: C.y + 10 }} show={step === 1} />
            <CurvedArrow from={{ x: O_X + 10, y: C.y + 9 }} ctrl={{ x: 212, y: C.y + 36 }} to={{ x: 236, y: C.y + 30 }} show={step === 2} />

            {/* What it is */}
            <Fade x={160} y={170} on={step <= 1} cls="fill-muted-foreground text-[11px]">
              acetaldehyde (ethanal)
            </Fade>
            <Fade x={160} y={170} on={step === 2} cls="fill-muted-foreground text-[11px]">
              alkoxide ion
            </Fade>
            <Fade x={160} y={170} on={step === 3} cls="fill-foreground text-[11px] font-semibold">
              acetaldehyde cyanohydrin
            </Fade>
          </g>
        );
      }}
    </StepFigure>
  );
}
