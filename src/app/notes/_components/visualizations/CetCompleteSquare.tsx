"use client";

/**
 * Animation: completing the square as an area (concept completing-the-square),
 * drawn with the concept's worked example, ∫ dx/√(5 − 4x − x²).
 *
 * x² + 4x is a square of side x and a strip 4 by x. Halving the strip (2 is
 * b/(2a) with a = 1, b = 4) and moving one half under the square leaves a
 * 2 by 2 corner missing: x² + 4x + 4 = (x + 2)², so x² + 4x = (x + 2)² − 4 and
 * x² + 4x − 5 = (x + 2)² − 9. Then 5 − 4x − x² = −(x² + 4x − 5) = 9 − (x + 2)²,
 * the arcsin form with k = 3, giving sin⁻¹((x + 2)/3) + C. The moving half
 * strip turns and slides by style.transform. Pinned by tests/notes-w2-16.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** a x² + b x + c = a(x + p)² + q with p = b/(2a) and q = c − b²/(4a). */
export function completeSquare(a: number, b: number, c: number): { p: number; q: number } {
  return { p: b / (2 * a), q: c - (b * b) / (4 * a) };
}

/** The worked example's quadratic under the root, and the one inside the bracket. */
export const UNDER_ROOT = { a: -1, b: -4, c: 5 } as const;
export const INSIDE = { a: 1, b: 4, c: -5 } as const;

/** The arcsin form's k: 5 − 4x − x² = k² − (x + 2)². */
export const K = 3;

export const CS_STEPS: readonly FigureStep[] = [
  {
    title: "Start with x² + 4x",
    caption: "Draw x² as a square of side x, and 4x as a strip 4 wide and x long beside it.",
  },
  {
    title: "Halve the x term",
    caption: "Split the strip into two strips 2 wide (2 is half of 4, the b/(2a) of the formula) and move one under the square.",
  },
  {
    title: "Fill the corner",
    caption: "The corner left empty is 2 by 2, area 4. With it the shape is a square of side x + 2, so x² + 4x = (x + 2)² − 4.",
  },
  {
    title: "Bring in the constant",
    caption: "Now add the −5: x² + 4x − 5 = (x + 2)² − 4 − 5 = (x + 2)² − 9.",
  },
  {
    title: "Fix the sign, then integrate",
    caption:
      "The root holds 5 − 4x − x² = −(x² + 4x − 5) = 9 − (x + 2)²: a constant minus a square, with k = 3. The arcsin form gives sin⁻¹((x + 2)/3) + C.",
  },
];

// Drawing (viewBox units): x is drawn 90 long, the 2 is drawn 30 long.
export const AREA = { x0: 24, y0: 24, side: 90, half: 30 } as const;

/** Where the moving half strip (drawn 30 by 90 at the origin) sits: beside the strip, then under the square. */
export function stripB(step: number): { x: number; y: number; angle: number } {
  if (step === 0) return { x: AREA.x0 + AREA.side + AREA.half, y: AREA.y0, angle: 0 };
  return { x: AREA.x0, y: AREA.y0 + AREA.side + AREA.half, angle: -90 };
}

/** The centre of the moving strip's "2x" label at a step. */
export function stripBLabel(step: number): { x: number; y: number } {
  if (step === 0) return { x: AREA.x0 + AREA.side + 1.5 * AREA.half, y: AREA.y0 + AREA.side / 2 };
  return { x: AREA.x0 + AREA.side / 2, y: AREA.y0 + AREA.side + AREA.half / 2 };
}

export default function CetCompleteSquare() {
  const { x0, y0, side, half } = AREA;
  const right = 186;
  return (
    <StepFigure
      title="Animation · completing the square, drawn as an area"
      label="x² + 4x drawn as a square of side x and a strip 4 by x. The strip is halved and one half moved under the square; the missing 2 by 2 corner shows x² + 4x = (x + 2)² − 4. So x² + 4x − 5 = (x + 2)² − 9 and 5 − 4x − x² = 9 − (x + 2)², which integrates to sin⁻¹((x + 2)/3) + C."
      viewBox="0 0 320 222"
      steps={CS_STEPS}
      note="Worked example: ∫ dx/√(5 − 4x − x²). The square of side x stands for x²; its size is not to scale."
    >
      {(step) => {
        const b = stripB(step);
        const bl = stripBLabel(step);
        return (
          <g>
            {/* The square x² */}
            <rect x={x0} y={y0} width={side} height={side} strokeWidth={1.5} className="fill-sky-500/25 stroke-sky-700 dark:fill-sky-400/25 dark:stroke-sky-300" />
            <text x={x0 + side / 2} y={y0 + side / 2 + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              x²
            </text>

            {/* The strip that stays: 2 by x */}
            <rect x={x0 + side} y={y0} width={half} height={side} strokeWidth={1.5} className="fill-amber-500/25 stroke-amber-700 dark:fill-amber-400/25 dark:stroke-amber-300" />
            <text x={x0 + side + half / 2} y={y0 + side / 2 + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              2x
            </text>

            {/* The strip that moves: drawn 30 by 90 at the origin */}
            <rect
              x={0}
              y={0}
              width={half}
              height={side}
              strokeWidth={1.5}
              className={`fill-amber-500/25 stroke-amber-700 dark:fill-amber-400/25 dark:stroke-amber-300 ${MOTION}`}
              style={{ transform: svgTransform(b) }}
            />
            <text
              x={0}
              y={4}
              textAnchor="middle"
              className={`fill-foreground text-[11px] font-semibold ${MOTION}`}
              style={{ transform: svgTransform(bl) }}
            >
              2x
            </text>

            {/* The missing corner, then filled */}
            <rect
              x={x0 + side}
              y={y0 + side}
              width={half}
              height={half}
              fill="none"
              strokeDasharray="3 2"
              strokeWidth={1.2}
              className={`stroke-muted-foreground ${MOTION}`}
              style={{ opacity: step === 1 ? 1 : 0 }}
            />
            <rect
              x={x0 + side}
              y={y0 + side}
              width={half}
              height={half}
              strokeWidth={1.5}
              className={`fill-emerald-500/30 stroke-emerald-700 dark:fill-emerald-400/30 dark:stroke-emerald-300 ${MOTION}`}
              style={{ opacity: step >= 2 ? 1 : 0 }}
            />
            <text
              x={x0 + side + half / 2}
              y={y0 + side + half / 2 + 4}
              textAnchor="middle"
              className={`fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300 ${MOTION}`}
              style={{ opacity: step >= 2 ? 1 : 0 }}
            >
              4
            </text>

            {/* Side lengths */}
            <g className="fill-muted-foreground text-[10px]">
              <text x={x0 + side / 2} y={y0 - 6} textAnchor="middle">
                x
              </text>
              <text x={x0 + side + half / 2} y={y0 - 6} textAnchor="middle">
                2
              </text>
              <text x={x0 + side + 1.5 * half} y={y0 - 6} textAnchor="middle" className={MOTION} style={{ opacity: step === 0 ? 1 : 0 }}>
                2
              </text>
              <text x={x0 - 6} y={y0 + side / 2 + 3} textAnchor="end">
                x
              </text>
              <text x={x0 - 6} y={y0 + side + half / 2 + 3} textAnchor="end" className={MOTION} style={{ opacity: step >= 1 ? 1 : 0 }}>
                2
              </text>
            </g>
            <text
              x={x0 + (side + half) / 2}
              y={y0 + side + half + 14}
              textAnchor="middle"
              className={`fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 ${MOTION}`}
              style={{ opacity: step >= 2 ? 1 : 0 }}
            >
              side x + 2
            </text>

            {/* The algebra beside the picture */}
            <g className="text-[11px] tabular-nums">
              <text x={right} y={40} className="fill-foreground font-semibold">
                x² + 4x
              </text>
              <text x={right} y={58} className={`fill-foreground ${MOTION}`} style={{ opacity: step >= 1 ? 1 : 0 }}>
                = x² + 2x + 2x
              </text>
              <text x={right} y={76} className={`fill-emerald-700 font-semibold dark:fill-emerald-300 ${MOTION}`} style={{ opacity: step >= 2 ? 1 : 0 }}>
                = (x + 2)² − 4
              </text>
              <text x={right} y={106} className={`fill-foreground font-semibold ${MOTION}`} style={{ opacity: step >= 3 ? 1 : 0 }}>
                x² + 4x − 5
              </text>
              <text x={right} y={124} className={`fill-foreground ${MOTION}`} style={{ opacity: step >= 3 ? 1 : 0 }}>
                = (x + 2)² − 4 − 5
              </text>
              <text x={right} y={142} className={`fill-indigo-700 font-semibold dark:fill-indigo-300 ${MOTION}`} style={{ opacity: step >= 3 ? 1 : 0 }}>
                = (x + 2)² − 9
              </text>
            </g>

            {/* The sign flip and the integral */}
            <g className={`text-[11px] tabular-nums ${MOTION}`} style={{ opacity: step >= 4 ? 1 : 0 }}>
              <text x={160} y={186} textAnchor="middle" className="fill-foreground">
                5 − 4x − x² = −(x² + 4x − 5) = 9 − (x + 2)²
              </text>
              <text x={160} y={202} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                a constant minus a square: k = 3
              </text>
              <text x={160} y={218} textAnchor="middle" className="fill-indigo-700 font-semibold dark:fill-indigo-300">
                ∫ dx/√(9 − (x + 2)²) = sin⁻¹((x + 2)/3) + C
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
