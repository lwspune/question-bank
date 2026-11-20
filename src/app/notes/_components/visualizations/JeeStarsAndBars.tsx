"use client";

/**
 * Animation: stars and bars (concept jpnc-identical), drawn with the concept's
 * worked example: 12 identical sweets shared among 3 children, each getting at
 * least 2.
 *
 * Put yᵢ = xᵢ − 2: each child first gets 2 (6 sweets), and the 6 left are
 * shared freely, y₁ + y₂ + y₃ = 6. The 6 sweets and 2 bars fill 8 places, and
 * the bars' places decide the share: bars in places 3 and 5 give
 * y = (2, 1, 3), x = (4, 3, 5); bars in places 1 and 2 give y = (0, 0, 6),
 * x = (2, 2, 8). Choosing 2 places of 8: C(8, 2) = 28 = C(n + k − 1, k − 1)
 * with n = 6, k = 3. Every sweet and bar moves by style.transform. Pinned by
 * tests/notes-w2-16.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const SWEETS = 12;
export const CHILDREN = 3;
export const AT_LEAST = 2;
/** Sweets left after each child gets AT_LEAST: 12 − 6 = 6. */
export const LEFT = SWEETS - CHILDREN * AT_LEAST;
/** Places in the line: the sweets left plus CHILDREN − 1 bars. */
export const PLACES = LEFT + CHILDREN - 1;

export function nCr(n: number, r: number): number {
  let v = 1;
  for (let i = 1; i <= r; i++) v = (v * (n - r + i)) / i;
  return Math.round(v);
}

/** The share y (sweets before, between and after the bars) from the bars' places (0-based, ascending). */
export function shareFromBars(bars: readonly number[], places: number = PLACES): number[] {
  const cuts = [-1, ...bars, places];
  return cuts.slice(1).map((c, i) => c - cuts[i] - 1);
}

/** Bars in places 3 and 5 (0-based 2, 4), then in places 1 and 2 (0-based 0, 1). */
export const BARS_A = [2, 4] as const;
export const BARS_B = [0, 1] as const;

export const SB_STEPS: readonly FigureStep[] = [
  {
    title: "Twelve sweets, three children",
    caption: "The sweets are identical, so only how many each child gets matters: x₁ + x₂ + x₃ = 12, each at least 2.",
  },
  {
    title: "Give each child 2 first",
    caption: "Put yᵢ = xᵢ − 2. That uses 6 sweets, and the 6 left are shared with no lower limit: y₁ + y₂ + y₃ = 6.",
  },
  {
    title: "Line them up with 2 bars",
    caption:
      "Sweets before the first bar go to child 1, between the bars to child 2, after the second bar to child 3. Here y = (2, 1, 3), so x = (4, 3, 5).",
  },
  {
    title: "Move the bars",
    caption: "Both bars at the front give y = (0, 0, 6): child 3 gets 8, the others 2 each. Each placing of the bars is one share.",
  },
  {
    title: "Count the placings",
    caption: "6 sweets and 2 bars fill 8 places, and the 2 places for the bars decide the share: C(8, 2) = 28.",
  },
];

// Drawing (viewBox units).
const ROW_Y = 112;
const BOX = { y: 18, w: 90, h: 58, gap: 12, x0: 14 } as const;
const boxX = (c: number) => BOX.x0 + c * (BOX.w + BOX.gap);
/** Centre of place p (0-based) in the line of 8. */
export const placeX = (p: number) => 55 + p * 30;
/** Centre of sweet i in the starting row of 12. */
const rowX = (i: number) => 33 + i * 23;

/** The bars' places at a step (hidden before step 2). */
export function barsAt(step: number): readonly number[] {
  return step === 3 ? BARS_B : BARS_A;
}

/** The free places, left to right, for the bars at a step. */
function sweetPlaces(bars: readonly number[]): number[] {
  return Array.from({ length: PLACES }, (_, p) => p).filter((p) => !bars.includes(p));
}

/** Where sweet i sits at a step. Sweets 0 to 5 are the 2 each child gets first. */
export function sweetAt(i: number, step: number): { x: number; y: number } {
  if (step === 0) return { x: rowX(i), y: ROW_Y };
  if (i < CHILDREN * AT_LEAST) {
    const c = Math.floor(i / AT_LEAST);
    return { x: boxX(c) + 33 + (i % AT_LEAST) * 24, y: BOX.y + 32 };
  }
  const j = i - CHILDREN * AT_LEAST;
  if (step === 1) return { x: placeX(j + 1), y: ROW_Y };
  return { x: placeX(sweetPlaces(barsAt(step))[j]), y: ROW_Y };
}

export default function JeeStarsAndBars() {
  const last = SB_STEPS.length - 1;
  return (
    <StepFigure
      title="Animation · stars and bars, sharing identical sweets"
      label="Twelve identical sweets shared by three children, each getting at least 2. Each child first gets 2, leaving 6. The 6 sweets and 2 bars fill 8 places: bars after the second and fourth sweet give the share 4, 3, 5; both bars at the front give 2, 2, 8. Choosing 2 places of 8 for the bars gives C(8, 2) = 28 shares."
      viewBox="0 0 320 196"
      steps={SB_STEPS}
      note="12 identical sweets, 3 children, each at least 2: y₁ + y₂ + y₃ = 6 in whole numbers 0 or more."
    >
      {(step) => {
        const bars = barsAt(step);
        const y = shareFromBars(bars);
        return (
          <g>
            {/* The children */}
            {[0, 1, 2].map((c) => (
              <g key={c}>
                <rect x={boxX(c)} y={BOX.y} width={BOX.w} height={BOX.h} rx={6} className="fill-background stroke-border" strokeWidth={1.2} />
                <text x={boxX(c) + BOX.w / 2} y={BOX.y + 13} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  Child {c + 1}
                </text>
                <text x={boxX(c) + BOX.w / 2} y={BOX.y + BOX.h - 7} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
                  {step === 0 ? `x${"₁₂₃"[c]}` : step === 1 ? `2 + y${"₁₂₃"[c]}` : `x${"₁₂₃"[c]} = ${AT_LEAST + y[c]}`}
                </text>
              </g>
            ))}

            {/* The places in the line */}
            <g className={MOTION} style={{ opacity: step >= 2 ? 1 : 0 }}>
              {Array.from({ length: PLACES }, (_, p) => (
                <g key={p}>
                  <line x1={placeX(p) - 12} y1={ROW_Y + 16} x2={placeX(p) + 12} y2={ROW_Y + 16} className="stroke-muted-foreground" strokeWidth={1} />
                  <text x={placeX(p)} y={ROW_Y + 27} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
                    {p + 1}
                  </text>
                </g>
              ))}
            </g>

            {/* The sweets */}
            {Array.from({ length: SWEETS }, (_, i) => {
              const given = i < CHILDREN * AT_LEAST;
              return (
                <circle
                  key={i}
                  cx={0}
                  cy={0}
                  r={7}
                  strokeWidth={1}
                  className={`${given ? "fill-amber-400 stroke-amber-700 dark:fill-amber-300 dark:stroke-amber-500" : "fill-sky-400 stroke-sky-700 dark:fill-sky-300 dark:stroke-sky-500"} ${MOTION}`}
                  style={{ transform: svgTransform(sweetAt(i, step)) }}
                />
              );
            })}

            {/* The two bars */}
            {[0, 1].map((b) => (
              <line
                key={b}
                x1={0}
                y1={-13}
                x2={0}
                y2={13}
                strokeWidth={3}
                strokeLinecap="round"
                className={`stroke-rose-600 dark:stroke-rose-400 ${MOTION}`}
                style={{ opacity: step >= 2 ? 1 : 0, transform: svgTransform({ x: placeX(bars[b]), y: ROW_Y }) }}
              />
            ))}

            {/* The reading */}
            <g className="text-[11px] tabular-nums">
              <text x={160} y={164} textAnchor="middle" className={`fill-foreground ${MOTION}`} style={{ opacity: step === 1 ? 1 : 0 }}>
                6 given (2 each), 6 left: y₁ + y₂ + y₃ = 6
              </text>
              <text x={160} y={164} textAnchor="middle" className={`fill-foreground ${MOTION}`} style={{ opacity: step >= 2 ? 1 : 0 }}>
                y = ({y.join(", ")}), so x = ({y.map((v) => v + AT_LEAST).join(", ")})
              </text>
              <text x={160} y={164} textAnchor="middle" className={`fill-foreground ${MOTION}`} style={{ opacity: step === 0 ? 1 : 0 }}>
                x₁ + x₂ + x₃ = 12, each xᵢ at least 2
              </text>
              <text
                x={160}
                y={186}
                textAnchor="middle"
                className={`fill-rose-700 font-semibold dark:fill-rose-300 ${MOTION}`}
                style={{ opacity: step === last ? 1 : 0 }}
              >
                2 bar places out of 8: C(8, 2) = {nCr(PLACES, CHILDREN - 1)} ways
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
