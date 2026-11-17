"use client";

/**
 * Animation: folding, punching and unfolding paper, the worked example of the
 * IMAT concept imat-spa-folding. A square sheet 8 cm wide: fold 1 lays the
 * right half over the left half, fold 2 lays the bottom half up over the top
 * half. One hole is punched 1 cm from the left and 1 cm from the top of the
 * folded square (4 layers). Unfolding reflects the hole across the last fold
 * first (horizontal line 4 cm from the top), then across the first (vertical
 * line 4 cm from the left): four holes, one near each corner.
 *
 * The sheet is four quarter-squares, each ONE group whose transform flips it
 * (scale −1) about its fold line, so a fold is seen to swing over. Each
 * quarter carries its own hole, drawn where that layer is pierced; the
 * reflections are exported and pinned by tests/notes-imat-visuals-logic.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const SHEET_CM = 8;
/** Fold 1: the vertical line 4 cm from the left. Fold 2: the horizontal line 4 cm from the top. */
export const FOLD_X = 4;
export const FOLD_Y = 4;
/** The punch, in cm from the left and from the top of the sheet. */
export const PUNCH = { x: 1, y: 1 } as const;

export type Hole = { x: number; y: number };

export function reflectAcrossVertical(h: Hole, lineX: number): Hole {
  return { x: 2 * lineX - h.x, y: h.y };
}
export function reflectAcrossHorizontal(h: Hole, lineY: number): Hole {
  return { x: h.x, y: 2 * lineY - h.y };
}

/** The concept's method: undo the last fold first, then the one before. */
export function unfoldHoles(): { afterSecond: Hole[]; afterFirst: Hole[] } {
  const afterSecond = [PUNCH, reflectAcrossHorizontal(PUNCH, FOLD_Y)];
  const afterFirst = [...afterSecond, ...afterSecond.map((h) => reflectAcrossVertical(h, FOLD_X))];
  return { afterSecond, afterFirst };
}

export const FOLDING_STEPS: readonly FigureStep[] = [
  {
    title: "The sheet",
    caption: "A square sheet 8 cm wide. First fold: lay the right half over the left half, along the dashed line.",
  },
  {
    title: "First fold",
    caption: "Now 2 layers, 4 cm wide. Second fold: lay the bottom half up over the top half.",
  },
  {
    title: "Second fold and punch",
    caption: "A 4 cm square, 4 layers thick. One hole punched 1 cm from the left and 1 cm from the top goes through all 4 layers.",
  },
  {
    title: "Undo the second fold",
    caption: "The bottom half drops back. Its hole is the mirror image across the fold line: 1 cm from the top becomes 7 cm from the top.",
  },
  {
    title: "Undo the first fold",
    caption: "The right half opens. Both holes reflect across the vertical fold: 1 cm from the left becomes 7 cm. Four holes, one near each corner.",
  },
];

export type QuarterId = "tl" | "tr" | "bl" | "br";
/**
 * Each quarter's top-left corner (cm). It lies on the fold lines, so it is also
 * the point the quarter flips about: the right column about x = 4 cm, the
 * bottom row about y = 4 cm.
 */
export const QUARTERS: readonly { id: QuarterId; ox: number; oy: number }[] = [
  { id: "tl", ox: 0, oy: 0 },
  { id: "tr", ox: FOLD_X, oy: 0 },
  { id: "bl", ox: 0, oy: FOLD_Y },
  { id: "br", ox: FOLD_X, oy: FOLD_Y },
];

/** Whether a quarter is flipped over the vertical fold (sx) and the horizontal fold (sy) at a step. */
export function quarterScale(step: number, id: QuarterId): { sx: 1 | -1; sy: 1 | -1 } {
  const right = id === "tr" || id === "br";
  const bottom = id === "bl" || id === "br";
  const fold1 = step >= 1 && step <= 3;
  const fold2 = step === 2;
  return { sx: right && fold1 ? -1 : 1, sy: bottom && fold2 ? -1 : 1 };
}

/** The hole on a quarter in its own coordinates (cm from its top-left corner): where the punch pierced that layer. */
export function quarterHoleLocal(id: QuarterId): Hole {
  const q = QUARTERS.find((v) => v.id === id)!;
  const flat = unfoldHoles().afterFirst.find((h) => h.x >= q.ox && h.x < q.ox + FOLD_X && h.y >= q.oy && h.y < q.oy + FOLD_Y)!;
  return { x: flat.x - q.ox, y: flat.y - q.oy };
}

/** Where a quarter's hole lies on the page (cm) at a step: its local point, flipped as the quarter is. */
export function quarterHoleAt(step: number, id: QuarterId): Hole {
  const q = QUARTERS.find((v) => v.id === id)!;
  const local = quarterHoleLocal(id);
  const s = quarterScale(step, id);
  return { x: q.ox + s.sx * local.x, y: q.oy + s.sy * local.y };
}

// Drawing scale.
const U = 20; // units per cm
const SX = 80; // sheet's top-left corner on screen
const SY = 34;

const PAPER = "fill-amber-200/60 stroke-amber-700 dark:fill-amber-700/35 dark:stroke-amber-300";

export default function ImatPaperFolding() {
  return (
    <StepFigure
      title="Animation · folding, punching and unfolding paper"
      label="A square sheet folded in half twice, punched once through 4 layers, then unfolded: the hole is reflected across each fold line, ending as four holes, one near each corner"
      viewBox="0 0 320 220"
      steps={FOLDING_STEPS}
      note="Unfold in reverse order, reflecting every hole you have across each fold line. Two folds make 2² = 4 layers, so one punch gives 4 holes."
    >
      {(step) => {
        const punched = step >= 2;
        return (
          <g>
            {/* Outline of the full sheet, for reference. */}
            <rect
              x={SX}
              y={SY}
              width={SHEET_CM * U}
              height={SHEET_CM * U}
              className="fill-none stroke-slate-300 dark:stroke-slate-600"
              strokeDasharray="2 3"
            />

            {/* The four quarters: each flips about its fold line. */}
            {QUARTERS.map((q) => {
              const s = quarterScale(step, q.id);
              const ox = SX + q.ox * U;
              const oy = SY + q.oy * U;
              const local = quarterHoleLocal(q.id);
              return (
                <g key={q.id} className={MOTION} style={{ transform: svgTransform({ x: ox, y: oy, sx: s.sx, sy: s.sy }) }}>
                  <rect x={0} y={0} width={FOLD_X * U} height={FOLD_Y * U} className={PAPER} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                  <circle
                    cx={local.x * U}
                    cy={local.y * U}
                    r={5}
                    className={`fill-background stroke-slate-700 dark:stroke-slate-200 ${MOTION}`}
                    strokeWidth={1.2}
                    vectorEffect="non-scaling-stroke"
                    style={{ opacity: punched ? 1 : 0 }}
                  />
                </g>
              );
            })}

            {/* Fold lines. */}
            <line
              x1={SX + FOLD_X * U}
              y1={SY - 6}
              x2={SX + FOLD_X * U}
              y2={SY + SHEET_CM * U + 6}
              className={`stroke-indigo-600 dark:stroke-indigo-300 ${MOTION}`}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              style={{ opacity: step === 0 || step === 4 ? 1 : 0 }}
            />
            <line
              x1={SX - 6}
              y1={SY + FOLD_Y * U}
              x2={SX + FOLD_X * U + 6}
              y2={SY + FOLD_Y * U}
              className={`stroke-indigo-600 dark:stroke-indigo-300 ${MOTION}`}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              style={{ opacity: step === 1 || step >= 3 ? 1 : 0 }}
            />
            <line
              x1={SX + FOLD_X * U}
              y1={SY + FOLD_Y * U}
              x2={SX + SHEET_CM * U + 6}
              y2={SY + FOLD_Y * U}
              className={`stroke-indigo-600 dark:stroke-indigo-300 ${MOTION}`}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              style={{ opacity: step === 4 ? 1 : 0 }}
            />
            {/* Distances of the holes from the edges, in the full view. */}
            {[
              { x: SX + 1 * U, label: "1 cm" },
              { x: SX + 7 * U, label: "7 cm" },
            ].map((t) => (
              <text
                key={`c${t.label}`}
                x={t.x}
                y={SY - 9}
                textAnchor="middle"
                className={`fill-muted-foreground text-[10px] ${MOTION}`}
                style={{ opacity: step === 4 ? 1 : 0 }}
              >
                {t.label}
              </text>
            ))}
            {[
              { y: SY + 1 * U, label: "1 cm" },
              { y: SY + 7 * U, label: "7 cm" },
            ].map((t) => (
              <text
                key={`r${t.label}`}
                x={SX - 8}
                y={t.y + 3.5}
                textAnchor="end"
                className={`fill-muted-foreground text-[10px] ${MOTION}`}
                style={{ opacity: step >= 3 ? 1 : 0 }}
              >
                {t.label}
              </text>
            ))}
            <text
              x={SX + SHEET_CM * U + 8}
              y={SY + 4 * U + 4}
              className={`fill-indigo-700 text-[10px] dark:fill-indigo-300 ${MOTION}`}
              style={{ opacity: step === 4 ? 1 : 0 }}
            >
              fold 2
            </text>
            <text
              x={SX + FOLD_X * U}
              y={SY + SHEET_CM * U + 18}
              textAnchor="middle"
              className={`fill-indigo-700 text-[10px] dark:fill-indigo-300 ${MOTION}`}
              style={{ opacity: step === 0 || step === 4 ? 1 : 0 }}
            >
              fold 1
            </text>
            <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {FOLDING_STEPS[step].title}
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
