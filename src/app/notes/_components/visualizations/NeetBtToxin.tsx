"use client";

/**
 * Animated figure: how the Bt toxin kills an insect, in the words and order of
 * the NEET concept "How the Bt toxin kills an insect" (nzoba-bt-action).
 *
 * 1. Bacillus thuringiensis forms protein crystals holding an insecticidal
 *    protein. 2. Inside the bacterium the toxin is an inactive protoxin, so the
 *    bacterium is safe. 3. An insect eats it; the alkaline pH of its gut
 *    solubilises the crystals. 4. The protoxin is converted into the active
 *    toxin. 5. The active toxin binds the midgut epithelial cells and creates
 *    pores; the cells swell and burst, and the insect dies.
 *
 * The order is the concept's trap: the crystal dissolves BEFORE the toxin is
 * active, and the pores come last. Data exported and pinned by
 * tests/notes-w2-07.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const BT_STEPS: readonly FigureStep[] = [
  {
    title: "Protein crystals",
    caption: "During one phase of its growth, Bacillus thuringiensis forms protein crystals that contain a toxic insecticidal protein.",
  },
  {
    title: "Inactive protoxin",
    caption: "Inside the bacterium the toxin exists as an inactive protoxin, so it does not kill the Bacillus.",
  },
  {
    title: "Alkaline gut",
    caption: "An insect eats it. The alkaline pH of the insect's gut solubilises the crystals.",
  },
  {
    title: "Active toxin",
    caption: "In the gut the protoxin is converted into the active toxin.",
  },
  {
    title: "Pores in the midgut",
    caption: "The active toxin binds to the surface of the midgut epithelial cells and creates pores. The cells swell and burst, and the insect dies.",
  },
];

export const LAST = BT_STEPS.length - 1;
/** Step indexes, so the order is named rather than counted. */
export const S = { crystals: 0, protoxin: 1, dissolve: 2, active: 3, pores: 4 } as const;

export const IN_BACTERIUM = { x: 92, y: 70 };
export const IN_GUT = { x: 222, y: 64 };

/** The crystal the insect eats: in the bacterium, then in the gut, then dissolved. */
export function crystalPose(step: number): { x: number; y: number; opacity: number } {
  if (step < S.dissolve) return { ...IN_BACTERIUM, opacity: 1 };
  if (step === S.dissolve) return { ...IN_GUT, opacity: 0.45 };
  return { ...IN_GUT, opacity: 0 };
}

export const CELL_BOTTOM = 160;
export const CELL_W = 30;
export const CELL_H = 40;
export const CELL_X = [175, 205, 235, 265, 295] as const;
/** The cells the toxin binds (indexes into CELL_X). */
export const BOUND_CELLS = [1, 2, 3] as const;
export const SWELL = 1.2;

const LUMEN_SPOTS = [
  { x: 196, y: 82 },
  { x: 236, y: 92 },
  { x: 276, y: 80 },
];

/** Toxin molecule k: absent until active, free in the gut, then bound to a cell. */
export function toxinPose(step: number, k: number): { x: number; y: number; opacity: number } {
  if (step < S.active) return { ...IN_GUT, opacity: 0 };
  if (step === S.active) return { ...LUMEN_SPOTS[k], opacity: 1 };
  return { x: CELL_X[BOUND_CELLS[k]], y: CELL_BOTTOM - CELL_H * SWELL - 5, opacity: 1 };
}

/** Vertical scale of cell i: a bound cell swells in the last step. */
export function cellScale(step: number, i: number): number {
  return step === S.pores && (BOUND_CELLS as readonly number[]).includes(i) ? SWELL : 1;
}

export const shownFrom = (from: number, step: number) => (step >= from ? 1 : 0);

const CRYSTAL = "fill-cyan-300 stroke-cyan-800 dark:fill-cyan-600 dark:stroke-cyan-200";
const TOXIN = "fill-red-500 stroke-red-900 dark:fill-red-400 dark:stroke-red-100";
const CELL = "fill-pink-100 stroke-pink-700 dark:fill-pink-950/50 dark:stroke-pink-300";
const DIAMOND = "M0,-7 L6,0 L0,7 L-6,0 Z";

export default function NeetBtToxin() {
  return (
    <StepFigure
      title="Animation · how the Bt toxin kills an insect"
      label="Bacillus thuringiensis holds protein crystals with an inactive protoxin. An insect eats a crystal; the alkaline pH of its gut dissolves it and the protoxin becomes the active toxin, which binds the midgut epithelial cells and makes pores, so the cells swell and burst."
      viewBox="0 0 320 206"
      steps={BT_STEPS}
    >
      {(step) => {
        const c = crystalPose(step);
        return (
          <g>
            <defs>
              <marker id="neet-bt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-foreground" />
              </marker>
            </defs>

            {/* The bacterium and its crystals. */}
            <text x={63} y={38} textAnchor="middle" className="fill-foreground text-[11px] font-semibold italic">B. thuringiensis</text>
            <rect x={8} y={48} width={110} height={44} rx={22} strokeWidth={1.5} className="fill-lime-100 stroke-lime-700 dark:fill-lime-950/50 dark:stroke-lime-300" />
            <path d={DIAMOND} strokeWidth={1} className={CRYSTAL} transform="translate(40 70)" />
            <path d={DIAMOND} strokeWidth={1} className={CRYSTAL} transform="translate(66 70)" />
            <text x={63} y={108} textAnchor="middle" className="fill-foreground text-[10px]">protein crystals</text>
            <text x={63} y={121} textAnchor="middle" className={`fill-muted-foreground text-[10px] ${MOTION}`} style={{ opacity: shownFrom(S.protoxin, step) }}>
              (inactive protoxin)
            </text>

            <line x1={122} y1={70} x2={152} y2={70} strokeWidth={1.25} markerEnd="url(#neet-bt-arrow)" className="stroke-foreground" />
            <text x={137} y={63} textAnchor="middle" className="fill-muted-foreground text-[10px]">eaten</text>

            {/* The insect's midgut. */}
            <rect x={156} y={18} width={158} height={152} rx={8} strokeWidth={1.5} className="fill-amber-50 stroke-amber-700 dark:fill-amber-950/30 dark:stroke-amber-300" />
            <text x={164} y={32} className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-200">insect gut: alkaline pH</text>
            <text x={306} y={50} textAnchor="end" className={`fill-red-700 text-[10px] font-semibold dark:fill-red-300 ${MOTION}`} style={{ opacity: shownFrom(S.active, step) }}>
              active toxin
            </text>

            {CELL_X.map((x, i) => (
              <rect
                key={x}
                x={-CELL_W / 2}
                y={-CELL_H}
                width={CELL_W}
                height={CELL_H}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                className={`${CELL} ${MOTION}`}
                style={{ transform: svgTransform({ x, y: CELL_BOTTOM, sy: cellScale(step, i) }) }}
              />
            ))}
            {/* Pores in the swollen cells. */}
            {BOUND_CELLS.map((i) => (
              <circle
                key={`pore-${i}`}
                cx={CELL_X[i]}
                cy={CELL_BOTTOM - CELL_H * SWELL + 6}
                r={3}
                strokeWidth={1}
                className={`fill-background stroke-pink-700 dark:stroke-pink-300 ${MOTION}`}
                style={{ opacity: shownFrom(S.pores, step) }}
              />
            ))}

            {/* The crystal the insect eats, and the toxin it releases. */}
            <path d={DIAMOND} strokeWidth={1} className={`${CRYSTAL} ${MOTION}`} style={{ transform: svgTransform(c), opacity: c.opacity }} />
            {[0, 1, 2].map((k) => {
              const t = toxinPose(step, k);
              return <circle key={k} r={4} strokeWidth={1} className={`${TOXIN} ${MOTION}`} style={{ transform: svgTransform(t), opacity: t.opacity }} />;
            })}

            <text x={235} y={182} textAnchor="middle" className="fill-foreground text-[10px]">midgut epithelial cells</text>
            <text x={235} y={196} textAnchor="middle" className={`fill-red-700 text-[10px] dark:fill-red-300 ${MOTION}`} style={{ opacity: shownFrom(S.pores, step) }}>
              pores: cells swell and burst
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
