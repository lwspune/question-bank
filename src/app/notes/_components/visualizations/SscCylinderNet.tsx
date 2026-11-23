"use client";

/**
 * Animation: a closed cylinder opened into its net (concept sscm3cy-formulas),
 * drawn to scale with the worked example: r = 7 cm, h = 15 cm, π = 22/7.
 * The two circular ends lift off (each πr² = 154 cm²), the curved side is cut
 * down one straight line and unrolled into a rectangle 2πr = 44 cm long and
 * h = 15 cm tall (CSA = 2πrh = 660 cm²), and the total is
 * TSA = 660 + 2 × 154 = 968 cm² = 2πr(r + h) = 44 × 22.
 *
 * The curved side is ONE rectangle that widens by style.transform (scale), and
 * each end is ONE circle that moves and turns from an ellipse into a circle by
 * style.transform, so every change animates. Pinned by
 * tests/notes-ssc-visuals.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The worked example. */
export const CYL = { r: 7, h: 15 } as const;
export const PI_APPROX = 22 / 7;

export const circumference = (r: number) => 2 * PI_APPROX * r;
export const endArea = (r: number) => PI_APPROX * r * r;
export const curvedArea = (r: number, h: number) => circumference(r) * h;
export const totalArea = (r: number, h: number) => curvedArea(r, h) + 2 * endArea(r);

export const CYL_STEPS: readonly FigureStep[] = [
  {
    title: "A closed cylinder",
    caption: "Radius r = 7 cm and height h = 15 cm. Its surface is one curved side and two circular ends.",
  },
  {
    title: "Lift off the two ends",
    caption: "Each end is a circle of area πr² = 22/7 × 49 = 154 cm².",
  },
  {
    title: "Cut the curved side",
    caption: "Cut the curved side down one straight line, from the top edge to the bottom edge.",
  },
  {
    title: "Unroll it into a rectangle",
    caption:
      "The rectangle is as long as the circumference, 2πr = 2 × 22/7 × 7 = 44 cm, and as tall as h = 15 cm. Curved surface: CSA = 2πrh = 44 × 15 = 660 cm².",
  },
  {
    title: "Add the two ends",
    caption: "Total surface: TSA = 2πrh + 2πr² = 660 + 2 × 154 = 968 cm², the same as 2πr(r + h) = 44 × 22.",
  },
];

// Geometry (viewBox units): 5 units per cm, drawn to scale.
export const SCALE = 5;
export const CX = 100;
export const RECT_LEFT = 40;
export const BODY_TOP = 85;
export const RECT_W = 44 * SCALE; // the circumference, 44 cm
export const RECT_H = CYL.h * SCALE;
export const END_R = CYL.r * SCALE;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** The rectangle's horizontal scale: the cylinder's width (2r) at first, its full length once unrolled. */
export const bodyScale = (step: number) => (step >= 3 ? 1 : r2((2 * END_R) / RECT_W));
export const bodyLeft = (step: number) => (step >= 3 ? RECT_LEFT : r2(CX - (RECT_W * bodyScale(step)) / 2));

/** Each end: squashed into an ellipse on the cylinder, a full circle once lifted off. */
export const END_SQUASH = 0.3;
export function endPlace(which: "top" | "bottom", step: number) {
  const lifted = step >= 1;
  const onCyl = which === "top" ? BODY_TOP : BODY_TOP + RECT_H;
  const off = which === "top" ? BODY_TOP - END_R : BODY_TOP + RECT_H + END_R;
  return { x: CX, y: lifted ? off : onCyl, sy: lifted ? 1 : END_SQUASH };
}

const show = (on: boolean) => ({ opacity: on ? 1 : 0 });

const END = "fill-amber-200/80 stroke-amber-600 dark:fill-amber-900/70 dark:stroke-amber-400";
const BODY = "fill-sky-200/80 stroke-sky-600 dark:fill-sky-900/70 dark:stroke-sky-400";

export default function SscCylinderNet() {
  return (
    <StepFigure
      title="Animation · opening a cylinder into its net"
      label="A closed cylinder of radius 7 cm and height 15 cm. Its two circular ends lift off, each 154 square centimetres. The curved side is cut down a straight line and unrolled into a rectangle 44 cm long, the circumference, and 15 cm tall, so the curved surface is 660 square centimetres. The total surface is 660 plus 2 times 154, which is 968 square centimetres."
      viewBox="0 0 320 262"
      steps={CYL_STEPS}
      note="Drawn to scale, with π taken as 22/7."
    >
      {(step) => {
        const top = endPlace("top", step);
        const bottom = endPlace("bottom", step);
        return (
          <g>
            {/* Bottom end (behind the curved side while on the cylinder) */}
            <g className={MOTION} style={{ transform: svgTransform({ x: bottom.x, y: bottom.y, sy: bottom.sy }) }}>
              <circle cx={0} cy={0} r={END_R} strokeWidth={1.5} vectorEffect="non-scaling-stroke" className={END} />
            </g>

            {/* The curved side: one rectangle, narrow as the cylinder's front, wide once unrolled */}
            <g className={MOTION} style={{ transform: svgTransform({ x: bodyLeft(step), y: BODY_TOP, sx: bodyScale(step) }) }}>
              <rect x={0} y={0} width={RECT_W} height={RECT_H} strokeWidth={1.5} vectorEffect="non-scaling-stroke" className={BODY} />
            </g>

            {/* Top end, with its radius */}
            <g className={MOTION} style={{ transform: svgTransform({ x: top.x, y: top.y, sy: top.sy }) }}>
              <circle cx={0} cy={0} r={END_R} strokeWidth={1.5} vectorEffect="non-scaling-stroke" className={END} />
              <line x1={0} y1={0} x2={END_R} y2={0} strokeWidth={1.5} vectorEffect="non-scaling-stroke" className="stroke-foreground" />
            </g>
            <text x={CX + END_R / 2} y={top.y - 4} textAnchor="middle" className={`fill-foreground text-[10px] font-semibold ${MOTION}`} style={show(step >= 1)}>
              r = 7
            </text>

            {/* Cut line */}
            <line
              x1={CX}
              y1={BODY_TOP}
              x2={CX}
              y2={BODY_TOP + RECT_H}
              strokeWidth={2}
              strokeDasharray="4 3"
              className={`stroke-rose-600 dark:stroke-rose-400 ${MOTION}`}
              style={show(step === 2)}
            />
            <text x={CX - 6} y={BODY_TOP + RECT_H / 2} textAnchor="end" className={`fill-rose-700 text-[10px] font-semibold dark:fill-rose-300 ${MOTION}`} style={show(step === 2)}>
              cut
            </text>

            {/* Labels on the cylinder */}
            <g className={MOTION} style={show(step === 0)}>
              <text x={CX + END_R + 6} y={BODY_TOP + 3} className="fill-foreground text-[10px] font-semibold">
                r = 7 cm
              </text>
            </g>
            <g className={MOTION} style={show(step <= 2)}>
              <text x={CX + END_R + 6} y={BODY_TOP + RECT_H / 2 + 4} className="fill-foreground text-[10px] font-semibold">
                h = 15 cm
              </text>
            </g>

            {/* Labels on the ends */}
            <g className={`text-[10px] ${MOTION}`} style={show(step >= 1)}>
              <text x={CX + END_R + 8} y={BODY_TOP - END_R - 2} className="fill-amber-700 font-semibold dark:fill-amber-300">
                top: πr² = 154 cm²
              </text>
              <text x={CX + END_R + 8} y={BODY_TOP + RECT_H + END_R + 6} className="fill-amber-700 font-semibold dark:fill-amber-300">
                bottom: πr² = 154 cm²
              </text>
            </g>

            {/* Labels on the unrolled rectangle */}
            <g className={`text-[10px] ${MOTION}`} style={show(step >= 3)}>
              <text x={RECT_LEFT + RECT_W / 2} y={BODY_TOP + 14} textAnchor="middle" className="fill-sky-900 font-semibold dark:fill-sky-100">
                2πr = 44 cm
              </text>
              <text x={RECT_LEFT + RECT_W / 2 + 30} y={BODY_TOP + 40} textAnchor="middle" className="fill-sky-900 dark:fill-sky-100">
                CSA = 2πrh
              </text>
              <text x={RECT_LEFT + RECT_W / 2 + 30} y={BODY_TOP + 54} textAnchor="middle" className="fill-sky-900 font-semibold dark:fill-sky-100">
                = 44 × 15 = 660 cm²
              </text>
              <text x={RECT_LEFT + RECT_W + 4} y={BODY_TOP + RECT_H / 2 + 4} className="fill-foreground font-semibold">
                h = 15
              </text>
            </g>

            {/* The total */}
            <g className={`text-[10.5px] ${MOTION}`} style={show(step >= 4)}>
              <text x={160} y={246} textAnchor="middle" className="fill-indigo-700 font-semibold dark:fill-indigo-300">
                TSA = 660 + 2 × 154 = 968 cm²
              </text>
              <text x={160} y={259} textAnchor="middle" className="fill-foreground">
                = 2πr(r + h) = 44 × (7 + 15)
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
