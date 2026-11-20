"use client";

/**
 * Animation: repeated draw-and-refill (concept sscrami-repeat), drawn to scale
 * with the worked example: a 64-litre can full of milk, 16 litres taken out
 * and replaced with water, three times. Each round keeps 1 − 16/64 = 3/4 of
 * the milk: 64 → 48 → 36 → 27 litres, and 64 × (3/4)³ = 27.
 *
 * The milk is ONE rectangle anchored at the can's floor whose height changes
 * by style.transform (scale), and the row marker in the table moves by
 * translate, so every change animates. Pinned by tests/notes-w2-18.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The worked example, in litres. */
export const CAN = { total: 64, drawn: 16, rounds: 3 } as const;
export const KEEP = 1 - CAN.drawn / CAN.total;

/** Milk left after n rounds: A(1 − x/T)ⁿ. */
export const milkAfter = (n: number) => CAN.total * KEEP ** n;
export const MILK = [0, 1, 2, 3].map(milkAfter);
export const WATER = MILK.map((m) => CAN.total - m);

export const REPLACE_STEPS: readonly FigureStep[] = [
  { title: "A full can of milk", caption: "The can holds 64 litres, all milk." },
  {
    title: "Round 1",
    caption: "16 litres out of 64 takes a quarter of the milk, then 16 litres of water go in. Milk: 64 × ¾ = 48 litres, water 16.",
  },
  {
    title: "Round 2",
    caption: "The next 16 litres again take a quarter of whatever milk is there. Milk: 48 × ¾ = 36 litres, water 28.",
  },
  { title: "Round 3", caption: "One more quarter goes. Milk: 36 × ¾ = 27 litres, water 37." },
  {
    title: "All in one step",
    caption: "Each round keeps the same ¾ of the milk, so three rounds keep (¾)³. Milk left = 64 × 27/64 = 27 litres.",
  },
];

/** The rounds shown at each step (the last step is the overview of round 3). */
export const roundAt = (step: number) => Math.min(step, CAN.rounds);

// Geometry (viewBox units): 2.5 units per litre, drawn to scale.
export const PX_PER_L = 2.5;
export const CAN_X = 36;
export const CAN_W = 96;
export const CAN_BOTTOM = 210;
export const CAN_H = CAN.total * PX_PER_L;
export const CAN_TOP = CAN_BOTTOM - CAN_H;
export const milkTop = (step: number) => CAN_BOTTOM - MILK[roundAt(step)] * PX_PER_L;

export const ROW_Y = [86, 110, 134, 158] as const;
const COL = { round: 180, milk: 226, water: 284 } as const;

const show = (on: boolean) => ({ opacity: on ? 1 : 0 });
const fmt = (n: number) => String(Math.round(n * 100) / 100);

export default function SscRepeatReplacement() {
  return (
    <StepFigure
      title="Animation · taking out and topping up, three times"
      label="A 64 litre can full of milk. Three times, 16 litres are taken out and replaced with water. Each round keeps three quarters of the milk, so the milk falls from 64 to 48, then 36, then 27 litres, while the water rises to 16, 28 and 37 litres. Milk left is 64 times three quarters cubed, which is 27 litres."
      viewBox="0 0 320 262"
      steps={REPLACE_STEPS}
      note="Drawn to scale. The can is full again after every round."
    >
      {(step) => {
        const r = roundAt(step);
        const top = milkTop(step);
        return (
          <g>
            {/* Water fills the can behind the milk */}
            <rect x={CAN_X} y={CAN_TOP} width={CAN_W} height={CAN_H} className="fill-sky-300/60 dark:fill-sky-700/60" />
            {/* Milk: one rectangle standing on the floor of the can */}
            <g className={MOTION} style={{ transform: svgTransform({ x: CAN_X, y: CAN_BOTTOM, sy: MILK[r] / CAN.total }) }}>
              <rect x={0} y={-CAN_H} width={CAN_W} height={CAN_H} className="fill-amber-50 dark:fill-amber-100" />
            </g>
            <path
              d={`M ${CAN_X} ${CAN_TOP - 6} L ${CAN_X} ${CAN_BOTTOM} L ${CAN_X + CAN_W} ${CAN_BOTTOM} L ${CAN_X + CAN_W} ${CAN_TOP - 6}`}
              fill="none"
              strokeWidth={2}
              className="stroke-foreground"
            />

            <g className={MOTION} style={{ transform: svgTransform({ x: CAN_X + CAN_W / 2, y: top + 18 }) }}>
              <text x={0} y={0} textAnchor="middle" className="fill-stone-800 text-[11px] font-semibold">
                milk {fmt(MILK[r])} L
              </text>
            </g>
            <g className={MOTION} style={{ ...show(r > 0), transform: svgTransform({ x: CAN_X + CAN_W / 2, y: (CAN_TOP + top) / 2 + 4 }) }}>
              <text x={0} y={0} textAnchor="middle" className="fill-sky-900 text-[11px] font-semibold dark:fill-sky-100">
                water {fmt(WATER[r])} L
              </text>
            </g>
            <text x={CAN_X + CAN_W / 2} y={CAN_TOP - 12} textAnchor="middle" className={`fill-rose-700 text-[10px] font-semibold dark:fill-rose-300 ${MOTION}`} style={show(step >= 1)}>
              16 L out, 16 L water in
            </text>

            {/* Round by round */}
            <text x={COL.round} y={62} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              round
            </text>
            <text x={COL.milk} y={62} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              milk (L)
            </text>
            <text x={COL.water} y={62} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              water (L)
            </text>
            <line x1={156} y1={70} x2={312} y2={70} strokeWidth={1} className="stroke-border" />
            <g className={MOTION} style={{ transform: svgTransform({ x: 156, y: ROW_Y[r] - 15 }) }}>
              <rect x={0} y={0} width={156} height={21} rx={4} className="fill-indigo-100 dark:fill-indigo-900/60" />
            </g>
            {ROW_Y.map((y, i) => (
              <g key={y} className={`text-[11px] ${MOTION}`} style={show(i <= r)}>
                <text x={COL.round} y={y} textAnchor="middle" className="fill-foreground">
                  {i === 0 ? "start" : i}
                </text>
                <text x={COL.milk} y={y} textAnchor="middle" className="fill-foreground font-semibold">
                  {fmt(MILK[i])}
                </text>
                <text x={COL.water} y={y} textAnchor="middle" className="fill-foreground">
                  {fmt(WATER[i])}
                </text>
              </g>
            ))}
            {[1, 2, 3].map((i) => (
              <text key={i} x={COL.milk + 22} y={ROW_Y[i] - 9} className={`fill-rose-700 text-[9.5px] dark:fill-rose-300 ${MOTION}`} style={show(i <= r)}>
                × ¾
              </text>
            ))}

            <text x={234} y={188} textAnchor="middle" className={`fill-foreground text-[10.5px] ${MOTION}`} style={show(step >= 1)}>
              each round keeps 1 − 16/64 = ¾
            </text>
            <g className={MOTION} style={show(step >= 4)}>
              <text x={160} y={240} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
                Milk left = 64 × (¾)³ = 64 × 27/64 = 27 L
              </text>
              <text x={160} y={255} textAnchor="middle" className="fill-foreground text-[10px]">
                Check round by round: 48, then 36, then 27
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
