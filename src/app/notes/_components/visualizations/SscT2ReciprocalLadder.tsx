"use client";

/**
 * Animation: climbing the ladder from x + 1/x (concept ssc2aire-ladder, its
 * worked example). With x + 1/x = k = 5: squaring gives
 * x² + 1/x² = k² − 2 = 23, cubing gives x³ + 1/x³ = k³ − 3k = 110, and
 * multiplying rungs 2 and 3 gives 23 × 110 = 2530 = (x⁵ + 1/x⁵) + (x + 1/x),
 * so x⁵ + 1/x⁵ = 2530 − 5 = 2525. A highlight (one element, moved by
 * style.transform) climbs to the rung being worked out; each new value fades
 * in. Pinned by tests/notes-w2-20.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The worked example. */
export const K = 5;
export const rung2 = (k: number) => k * k - 2;
export const rung3 = (k: number) => k ** 3 - 3 * k;
/** (x² + 1/x²)(x³ + 1/x³) = (x⁵ + 1/x⁵) + (x + 1/x). */
export const rung5 = (k: number) => rung2(k) * rung3(k) - k;

export const R2 = rung2(K);
export const R3 = rung3(K);
export const PRODUCT = R2 * R3;
export const R5 = rung5(K);

export const LADDER_STEPS: readonly FigureStep[] = [
  { title: "The first rung", caption: "We know x + 1/x = 5. Every higher rung follows from this one number." },
  {
    title: "Square: up to rung 2",
    caption: "(x + 1/x)² = x² + 2 + 1/x², so x² + 1/x² = 5² − 2 = 23. Do not drop the middle 2.",
  },
  { title: "Cube: up to rung 3", caption: "x³ + 1/x³ = k³ − 3k = 125 − 15 = 110." },
  {
    title: "Multiply rungs 2 and 3",
    caption: "(x² + 1/x²)(x³ + 1/x³) = (x⁵ + 1/x⁵) + (x + 1/x), and 23 × 110 = 2530.",
  },
  { title: "Rung 5", caption: "Take away rung 1: x⁵ + 1/x⁵ = 2530 − 5 = 2525." },
];

// Geometry (viewBox units).
export const RAIL_L = 40;
export const RAIL_R = 70;
export const BASE_Y = 214;
export const RUNG_GAP = 36;
/** Height of the rung for power p. */
export const rungY = (p: number) => BASE_Y - p * RUNG_GAP;
/** Which rung (power) each step works on. */
export const STEP_RUNG = [1, 2, 3, 5, 5] as const;

const show = (on: boolean) => ({ opacity: on ? 1 : 0 });
const VALUE = "fill-foreground text-[11px] font-semibold";
const OP = "fill-indigo-700 text-[10.5px] dark:fill-indigo-300";

export default function SscT2ReciprocalLadder() {
  return (
    <StepFigure
      title="Animation · climbing the ladder from one value"
      label="A ladder of powers. Rung 1: x plus 1 over x equals 5. Rung 2, by squaring: x squared plus 1 over x squared equals 25 minus 2, which is 23. Rung 3, by cubing: x cubed plus 1 over x cubed equals 125 minus 15, which is 110. Rung 4 is not needed. Multiplying rungs 2 and 3 gives 23 times 110, which is 2530, equal to rung 5 plus rung 1, so rung 5, x to the fifth plus 1 over x to the fifth, is 2530 minus 5, which is 2525."
      viewBox="0 0 320 230"
      steps={LADDER_STEPS}
      note="k = x + 1/x = 5: rung 2 is k² − 2, rung 3 is k³ − 3k."
    >
      {(step) => {
        const at = rungY(STEP_RUNG[step]);
        return (
          <g>
            {/* Highlight behind the rung being worked on */}
            <rect
              x={0}
              y={-12}
              width={150}
              height={22}
              rx={4}
              className={`fill-amber-200/70 dark:fill-amber-900/50 ${MOTION}`}
              style={{ transform: svgTransform({ x: 34, y: at }) }}
            />

            {/* Ladder */}
            <line x1={RAIL_L} y1={rungY(5) - 12} x2={RAIL_L} y2={BASE_Y} strokeWidth={2} className="stroke-foreground" />
            <line x1={RAIL_R} y1={rungY(5) - 12} x2={RAIL_R} y2={BASE_Y} strokeWidth={2} className="stroke-foreground" />
            {[1, 2, 3, 4, 5].map((p) => (
              <g key={p}>
                <line
                  x1={RAIL_L}
                  y1={rungY(p)}
                  x2={RAIL_R}
                  y2={rungY(p)}
                  strokeWidth={p === 4 ? 1.2 : 2.5}
                  strokeDasharray={p === 4 ? "3 3" : undefined}
                  className={p === 4 ? "stroke-muted-foreground" : "stroke-foreground"}
                />
                <text x={RAIL_L - 6} y={rungY(p) + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
                  {p}
                </text>
              </g>
            ))}

            {/* Values */}
            <text x={80} y={rungY(1) + 4} className={VALUE}>
              x + 1/x = 5
            </text>
            <text x={80} y={rungY(2) + 4} className={`${VALUE} ${MOTION}`} style={show(step >= 1)}>
              {`x² + 1/x² = ${R2}`}
            </text>
            <text x={80} y={rungY(3) + 4} className={`${VALUE} ${MOTION}`} style={show(step >= 2)}>
              {`x³ + 1/x³ = ${R3}`}
            </text>
            <text x={80} y={rungY(4) + 4} className="fill-muted-foreground text-[10px]">
              not needed
            </text>
            <text x={80} y={rungY(5) + 4} className={`${VALUE} ${MOTION}`} style={show(step >= 3)}>
              x⁵ + 1/x⁵ =
            </text>
            <text x={150} y={rungY(5) + 4} className={`fill-foreground text-[11px] font-semibold ${MOTION}`} style={show(step === 3)}>
              ?
            </text>
            <text x={150} y={rungY(5) + 4} className={`fill-rose-700 text-[11px] font-semibold dark:fill-rose-300 ${MOTION}`} style={show(step >= 4)}>
              {R5}
            </text>

            {/* How each rung is reached */}
            <text x={196} y={rungY(2) + 4} className={`${OP} ${MOTION}`} style={show(step >= 1)}>
              square: 5² − 2
            </text>
            <text x={196} y={rungY(3) + 4} className={`${OP} ${MOTION}`} style={show(step >= 2)}>
              cube: 5³ − 3 × 5
            </text>
            <text x={196} y={rungY(5) - 4} className={`${OP} ${MOTION}`} style={show(step >= 3)}>
              {`${R2} × ${R3} = ${PRODUCT}`}
            </text>
            <text x={196} y={rungY(5) + 11} className={`${OP} ${MOTION}`} style={show(step >= 4)}>
              {`${PRODUCT} − 5 = ${R5}`}
            </text>

            {/* Rungs 2 and 3 together lead to rung 5 */}
            <g className={MOTION} style={show(step >= 3)}>
              <path
                d={`M ${RAIL_L - 14} ${rungY(2)} L ${RAIL_L - 20} ${rungY(2)} L ${RAIL_L - 20} ${rungY(3)} L ${RAIL_L - 14} ${rungY(3)} M ${RAIL_L - 20} ${(rungY(2) + rungY(3)) / 2} L ${RAIL_L - 30} ${(rungY(2) + rungY(3)) / 2} L ${RAIL_L - 30} ${rungY(5)} L ${RAIL_L - 16} ${rungY(5)}`}
                fill="none"
                strokeWidth={1.4}
                className="stroke-rose-600 dark:stroke-rose-400"
              />
              <path
                d={`M ${RAIL_L - 13} ${rungY(5)} L ${RAIL_L - 19} ${rungY(5) - 4} L ${RAIL_L - 19} ${rungY(5) + 4} Z`}
                className="fill-rose-600 dark:fill-rose-400"
              />
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
