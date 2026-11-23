"use client";

/**
 * Animation: drawing off milk and topping up with water, twice (concept
 * ssc2ramx-replace). The concept's worked example: a 50-litre can full of
 * milk; a 5-litre jug is drawn off and the can topped up with water, twice.
 * Each round keeps 45/50 = 0.9 of the milk, so the milk goes 50 → 45 → 40.5
 * litres = 50 × 0.9². The water is what is put back: 50 − 40.5 = 9.5 litres.
 * The can's contents are drawn as one bar (the can is mixed; the bar only
 * shows how much of each). The milk and water parts are each ONE rect whose
 * width and place change by style.transform. Pinned by
 * tests/notes-w2-05.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The worked example. */
export const CAN = { V: 50, x: 5, rounds: 2 } as const;
export const KEEP = (CAN.V - CAN.x) / CAN.V;
export const milkLeft = (original: number, x: number, v: number, n: number) => original * (1 - x / v) ** n;

/** Milk and water in the can after each step (litres). */
export const STATES = [
  { milk: 50, water: 0, jug: "none" },
  { milk: 45, water: 0, jug: "milk" },
  { milk: 45, water: 5, jug: "none" },
  { milk: 40.5, water: 4.5, jug: "mix" },
  { milk: 40.5, water: 9.5, jug: "none" },
] as const;

export const REPLACE_STEPS: readonly FigureStep[] = [
  { title: "A full can", caption: "The can holds 50 litres, all milk." },
  { title: "Draw off 5 litres", caption: "The jug takes 5 litres of milk, so 45 litres of milk are left." },
  {
    title: "Top up with water",
    caption: "5 litres of water fill the can again. The milk is still 45 litres: 45/50 = 0.9 of what it was.",
  },
  {
    title: "Draw off 5 litres again",
    caption: "This time the jug takes the mixture, 0.9 of it milk. The can keeps 0.9 of its milk again: 45 × 0.9 = 40.5 litres.",
  },
  {
    title: "Top up again",
    caption: "Milk left = 50 × 0.9 × 0.9 = 50 × 0.9² = 40.5 litres. The water is the rest: 50 − 40.5 = 9.5 litres.",
  },
];

// Geometry (viewBox units): 5.2 units per litre.
export const PX_PER_L = 5.2;
export const BAR_X = 30;
const BAR_Y = 70;
const BAR_H = 40;
const JUG_X = 130;
const JUG_Y = 152;
const JUG_W = CAN.x * PX_PER_L * 2;

const MILK = "fill-indigo-200 dark:fill-indigo-800";
const WATER = "fill-sky-400 dark:fill-sky-600";
const show = (on: boolean) => ({ opacity: on ? 1 : 0 });

const r1 = (n: number) => Math.round(n * 10) / 10;
export function canText(step: number): string {
  const s = STATES[step];
  if (s.water === 0) return s.milk === CAN.V ? "In the can: 50 L, all milk" : `In the can: ${s.milk} L of milk`;
  if (s.jug === "mix") return `In the can: ${r1(s.milk + s.water)} L, milk ${s.milk} L`;
  return `In the can: milk ${s.milk} L, water ${s.water} L`;
}

export default function SscT2MilkReplacement() {
  return (
    <StepFigure
      title="Animation · draw off and top up, twice"
      label="A 50 litre can full of milk, drawn as a bar. A 5 litre jug is drawn off and the can is topped up with water: 45 litres of milk are left, 0.9 of the milk. Doing it again keeps 0.9 of the milk again: 50 times 0.9 times 0.9 is 40.5 litres of milk, and 9.5 litres of water."
      viewBox="0 0 320 222"
      steps={REPLACE_STEPS}
      note="The can is mixed; the bar only shows how much of each it holds."
    >
      {(step) => {
        const s = STATES[step];
        const milkW = s.milk * PX_PER_L;
        const waterW = s.water * PX_PER_L;
        return (
          <g>
            {/* Legend */}
            <rect x={96} y={14} width={10} height={10} className={MILK} />
            <text x={110} y={23} className="fill-foreground text-[10px]">
              milk
            </text>
            <rect x={170} y={14} width={10} height={10} className={WATER} />
            <text x={184} y={23} className="fill-foreground text-[10px]">
              water
            </text>

            <text x={BAR_X} y={BAR_Y - 8} className="fill-foreground text-[10px] font-semibold">
              the can, 50 L
            </text>
            {/* Milk: one rect, its width set by scale */}
            <g className={MOTION} style={{ transform: svgTransform({ x: BAR_X, y: BAR_Y, sx: milkW }) }}>
              <rect x={0} y={0} width={1} height={BAR_H} className={MILK} />
            </g>
            {/* Water: one rect, sitting after the milk */}
            <g className={MOTION} style={{ transform: svgTransform({ x: BAR_X + milkW, y: BAR_Y, sx: Math.max(waterW, 0.01) }) }}>
              <rect x={0} y={0} width={1} height={BAR_H} className={WATER} />
            </g>
            <rect x={BAR_X} y={BAR_Y} width={CAN.V * PX_PER_L} height={BAR_H} fill="none" strokeWidth={1.5} className="stroke-foreground" />
            {Array.from({ length: CAN.V / 5 + 1 }, (_, i) => (
              <line
                key={i}
                x1={BAR_X + i * 5 * PX_PER_L}
                y1={BAR_Y + BAR_H}
                x2={BAR_X + i * 5 * PX_PER_L}
                y2={BAR_Y + BAR_H + 4}
                strokeWidth={1}
                className="stroke-muted-foreground"
              />
            ))}
            <text x={BAR_X} y={BAR_Y + BAR_H + 15} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              0
            </text>
            <text x={BAR_X + CAN.V * PX_PER_L} y={BAR_Y + BAR_H + 15} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              50 L
            </text>

            <text x={160} y={BAR_Y + BAR_H + 32} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
              {canText(step)}
            </text>

            {/* The jug: milk the first time, the mixture the second */}
            <g className={MOTION} style={show(s.jug !== "none")}>
              <rect x={JUG_X} y={JUG_Y} width={JUG_W} height={22} strokeWidth={1.2} className={`${MILK} stroke-foreground`} />
              <rect
                x={JUG_X + JUG_W * KEEP}
                y={JUG_Y}
                width={JUG_W * (1 - KEEP)}
                height={22}
                className={`${WATER} ${MOTION}`}
                style={show(s.jug === "mix")}
              />
              <text x={JUG_X + JUG_W + 6} y={JUG_Y + 15} className="fill-foreground text-[10px] font-semibold">
                5 L out
              </text>
            </g>

            {/* The chain so far */}
            <text x={160} y={196} textAnchor="middle" className="fill-foreground text-[10.5px]">
              {step < 2 ? "milk: 50 L" : step < 4 ? "milk: 50 L → 45 L (× 0.9)" : "milk: 50 L → 45 L → 40.5 L"}
            </text>
            <text x={160} y={213} textAnchor="middle" className={`fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300 ${MOTION}`} style={show(step >= 4)}>
              50 × (1 − 5/50)² = 50 × 0.9² = 40.5 L
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
