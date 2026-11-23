"use client";

/**
 * Animation: the Solvay process and its ammonia loop (concept
 * cetg12-solvay-and-lime).
 *
 * 1. Carbonation: NaCl + NH₃ + CO₂ + H₂O → NaHCO₃↓ + NH₄Cl.
 * 2. NaHCO₃ is heated to Na₂CO₃, the product.
 * 3. Ammonia recovery: 2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2NH₃ + 2H₂O.
 * 4. The NH₃ goes back to the start, so CaCl₂ is the by-product.
 * Each stage is drawn from the start and fades in on its step; the last step
 * shows the whole loop. The equations are the concept's own, and their atoms
 * balance: pinned by tests/notes-w2-01.test.ts.
 */
import StepFigure, { MOTION, type FigureStep } from "./StepFigure";

export const SOLVAY_STEPS: readonly FigureStep[] = [
  {
    title: "Carbonation",
    caption: "Brine, ammonia and CO₂ react: NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl. Sodium bicarbonate comes out as a solid.",
  },
  {
    title: "Heating the bicarbonate",
    caption: "The NaHCO₃ is heated and gives Na₂CO₃, sodium carbonate, the product the process is run for.",
  },
  {
    title: "Getting the ammonia back",
    caption: "The expensive ammonia is now in NH₄Cl. Slaked lime frees it: 2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2NH₃ + 2H₂O.",
  },
  {
    title: "The loop closes",
    caption: "The recovered NH₃ goes back to the start. What is left over is calcium chloride, CaCl₂: the by-product of the process.",
  },
];

/** The two equations, as atom counts per side (for the balance test). */
export const CARBONATION = {
  left: [
    { f: "NaCl", n: 1, atoms: { Na: 1, Cl: 1 } },
    { f: "NH₃", n: 1, atoms: { N: 1, H: 3 } },
    { f: "CO₂", n: 1, atoms: { C: 1, O: 2 } },
    { f: "H₂O", n: 1, atoms: { H: 2, O: 1 } },
  ],
  right: [
    { f: "NaHCO₃", n: 1, atoms: { Na: 1, H: 1, C: 1, O: 3 } },
    { f: "NH₄Cl", n: 1, atoms: { N: 1, H: 4, Cl: 1 } },
  ],
} as const;

export const RECOVERY = {
  left: [
    { f: "NH₄Cl", n: 2, atoms: { N: 1, H: 4, Cl: 1 } },
    { f: "Ca(OH)₂", n: 1, atoms: { Ca: 1, O: 2, H: 2 } },
  ],
  right: [
    { f: "CaCl₂", n: 1, atoms: { Ca: 1, Cl: 2 } },
    { f: "NH₃", n: 2, atoms: { N: 1, H: 3 } },
    { f: "H₂O", n: 2, atoms: { H: 2, O: 1 } },
  ],
} as const;

type Side = readonly { n: number; atoms: Readonly<Record<string, number>> }[];

/** Total atoms of each element on one side of an equation. */
export function atomTotals(side: Side): Record<string, number> {
  const t: Record<string, number> = {};
  for (const s of side) for (const [el, k] of Object.entries(s.atoms)) t[el] = (t[el] ?? 0) + s.n * k;
  return t;
}

/** The step from which each stage is shown at full strength. */
export const STAGE_FROM = { carbonation: 0, heating: 1, recovery: 2, loop: 3 } as const;

export const stageOpacity = (step: number, from: number) => (step >= from ? 1 : 0.15);

const BOX = "fill-background stroke-border";
const ARROW = "stroke-indigo-600 dark:stroke-indigo-400";

export default function CetSolvayLoop() {
  return (
    <StepFigure
      title="Animation · the Solvay process and its ammonia loop"
      label="Brine, ammonia and carbon dioxide give sodium bicarbonate and ammonium chloride. The bicarbonate is heated to sodium carbonate. Slaked lime turns the ammonium chloride back into ammonia, which is reused, leaving calcium chloride as the by-product."
      viewBox="0 0 320 228"
      steps={SOLVAY_STEPS}
      note="The ammonia goes round and round; the sodium leaves as Na₂CO₃ and the calcium as CaCl₂."
    >
      {(step) => (
        <g>
          <defs>
            <marker id="solvay-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
            </marker>
          </defs>

          {/* Stage 1: carbonation */}
          <g className={MOTION} style={{ opacity: stageOpacity(step, STAGE_FROM.carbonation) }}>
            <rect x={84} y={26} width={152} height={36} rx={7} className="fill-indigo-100 stroke-indigo-600 dark:fill-indigo-950 dark:stroke-indigo-400" strokeWidth={1.5} />
            <text x={160} y={18} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              brine + ammonia + carbon dioxide
            </text>
            <text x={160} y={48} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              NaCl + NH₃ + CO₂ + H₂O
            </text>
            <line x1={120} y1={62} x2={72} y2={94} markerEnd="url(#solvay-arrow)" className={ARROW} strokeWidth={1.6} />
            <line x1={200} y1={62} x2={244} y2={94} markerEnd="url(#solvay-arrow)" className={ARROW} strokeWidth={1.6} />
            <rect x={20} y={96} width={92} height={28} rx={6} className={BOX} strokeWidth={1.3} />
            <text x={66} y={114} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              NaHCO₃ (solid)
            </text>
            <rect x={200} y={96} width={92} height={28} rx={6} className={BOX} strokeWidth={1.3} />
            <text x={246} y={114} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              NH₄Cl
            </text>
          </g>

          {/* Stage 2: heating */}
          <g className={MOTION} style={{ opacity: stageOpacity(step, STAGE_FROM.heating) }}>
            <line x1={66} y1={124} x2={66} y2={164} markerEnd="url(#solvay-arrow)" className={ARROW} strokeWidth={1.6} />
            <text x={72} y={148} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
              heat
            </text>
            <rect x={20} y={166} width={92} height={28} rx={6} className="fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400" strokeWidth={1.5} />
            <text x={66} y={184} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              Na₂CO₃
            </text>
            <text x={66} y={208} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
              the product
            </text>
          </g>

          {/* Stage 3: ammonia recovery */}
          <g className={MOTION} style={{ opacity: stageOpacity(step, STAGE_FROM.recovery) }}>
            <line x1={246} y1={124} x2={246} y2={148} markerEnd="url(#solvay-arrow)" className={ARROW} strokeWidth={1.6} />
            <rect x={182} y={150} width={112} height={30} rx={6} className={BOX} strokeWidth={1.3} />
            <text x={238} y={163} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              + Ca(OH)₂
            </text>
            <text x={238} y={175} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              slaked lime
            </text>
            <line x1={238} y1={180} x2={238} y2={198} markerEnd="url(#solvay-arrow)" className={ARROW} strokeWidth={1.6} />
            <text x={238} y={212} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
              CaCl₂
            </text>
            <text x={238} y={224} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
              by-product
            </text>
          </g>

          {/* Stage 4: NH₃ back to the start */}
          <g className={MOTION} style={{ opacity: stageOpacity(step, STAGE_FROM.loop) }}>
            <polyline points="294,165 312,165 312,44 238,44" fill="none" markerEnd="url(#solvay-arrow)" className="stroke-violet-600 dark:stroke-violet-400" strokeWidth={2} />
            <text x={306} y={140} textAnchor="end" className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
              NH₃ reused
            </text>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
