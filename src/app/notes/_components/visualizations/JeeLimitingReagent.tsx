"use client";

/**
 * Animation: finding the limiting reagent (concept jcsbc-limiting), on the
 * concept's worked example: 4.8 g of Mg heated with 4.0 g of O₂,
 * 2Mg + O₂ → 2MgO.
 *   Mg: 4.8/24 = 0.2 mol, 0.2 ÷ 2 = 0.1. O₂: 4.0/32 = 0.125 mol, 0.125 ÷ 1 = 0.125.
 * O₂ has fewer moles but the larger quotient, so Mg is limiting (the trap:
 * fewest moles is not the test). All 0.2 mol Mg uses 0.1 mol O₂ and gives
 * 0.2 mol MgO = 8.0 g; 0.025 mol O₂ = 0.8 g is left.
 *
 * Bars are drawn to scale in moles. Each bar is one element whose transform
 * (scale up from the axis) changes between steps; labels fade by opacity.
 * Pinned by tests/notes-w2-15.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The worked example: masses (g) and molar masses (g/mol). */
export const EXAMPLE = {
  mg: { mass: 4.8, molar: 24, coeff: 2 },
  o2: { mass: 4.0, molar: 32, coeff: 1 },
  mgo: { molar: 40, coeff: 2 },
} as const;

const r4 = (n: number) => Math.round(n * 10000) / 10000;

export const MOLES = {
  mg: r4(EXAMPLE.mg.mass / EXAMPLE.mg.molar),
  o2: r4(EXAMPLE.o2.mass / EXAMPLE.o2.molar),
} as const;

/** n ÷ coefficient for each reactant. */
export const QUOTIENT = {
  mg: r4(MOLES.mg / EXAMPLE.mg.coeff),
  o2: r4(MOLES.o2 / EXAMPLE.o2.coeff),
} as const;

/** The reactant with the smaller quotient. */
export const LIMITING: "mg" | "o2" = QUOTIENT.mg < QUOTIENT.o2 ? "mg" : "o2";

/** Moles after the reaction, worked from the limiting reagent only. */
export function afterReaction(): { mg: number; o2: number; mgo: number; o2Used: number } {
  const sets = Math.min(QUOTIENT.mg, QUOTIENT.o2);
  const o2Used = r4(sets * EXAMPLE.o2.coeff);
  return {
    mg: r4(MOLES.mg - sets * EXAMPLE.mg.coeff),
    o2: r4(MOLES.o2 - o2Used),
    mgo: r4(sets * EXAMPLE.mgo.coeff),
    o2Used,
  };
}

export const RESULT = afterReaction();
/** Grams of MgO formed and of O₂ left. */
export const MGO_GRAMS = Math.round(RESULT.mgo * EXAMPLE.mgo.molar * 10) / 10;
export const O2_LEFT_GRAMS = Math.round(RESULT.o2 * EXAMPLE.o2.molar * 10) / 10;

export const LIMITING_STEPS: readonly FigureStep[] = [
  {
    title: "What is supplied",
    caption: "4.8 g of Mg is 4.8/24 = 0.2 mol; 4.0 g of O₂ is 4.0/32 = 0.125 mol. O₂ has fewer moles, but that is not the test.",
  },
  {
    title: "Divide by the coefficient",
    caption: "2Mg + O₂ → 2MgO. Mg: 0.2 ÷ 2 = 0.1. O₂: 0.125 ÷ 1 = 0.125. Mg has the smaller quotient, so Mg is the limiting reagent.",
  },
  {
    title: "Mg runs out",
    caption: "All 0.2 mol of Mg reacts. It uses 0.1 mol of O₂ and gives 0.2 mol of MgO, worked out from Mg only.",
  },
  {
    title: "What is left",
    caption: "MgO = 0.2 × 40 = 8.0 g. O₂ left = supplied − used = 0.125 − 0.1 = 0.025 mol = 0.8 g.",
  },
];

/** Moles in each bar at each step. */
export function barMoles(step: number): { mg: number; o2: number; mgo: number } {
  if (step < 2) return { mg: MOLES.mg, o2: MOLES.o2, mgo: 0 };
  return { mg: RESULT.mg, o2: RESULT.o2, mgo: RESULT.mgo };
}

// Geometry: viewBox units; bars grow up from BASE.
export const BASE = 180;
/** viewBox units per mole. */
export const PER_MOL = 560;
export const COLS = { mg: 72, o2: 160, mgo: 248 } as const;
const BAR_W = 40;

const barTop = (mol: number) => Math.round((BASE - mol * PER_MOL) * 100) / 100;

export default function JeeLimitingReagent() {
  return (
    <StepFigure
      title="Animation · finding the limiting reagent"
      label="Bar chart in moles for 2Mg + O2 gives 2MgO. Supplied: 0.2 mol Mg and 0.125 mol O2. Divided by the coefficients, Mg gives 0.1 and O2 gives 0.125, so Mg is limiting although O2 has fewer moles. After the reaction no Mg is left, 0.025 mol O2 (0.8 g) is left and 0.2 mol MgO (8.0 g) has formed."
      viewBox="0 0 320 240"
      steps={LIMITING_STEPS}
      note="Bars to scale in moles. Mg 0.2 ÷ 2 = 0.1, O₂ 0.125 ÷ 1 = 0.125: Mg is limiting. Left after: 0.8 g of O₂. Formed: 8.0 g of MgO."
    >
      {(step) => {
        const m = barMoles(step);
        const after = step >= 2;
        const fade = (from: number) => ({ opacity: step >= from ? 1 : 0 });
        const labels = {
          mg: after ? "used up" : "0.2 mol",
          o2: step >= 3 ? `0.025 mol = ${O2_LEFT_GRAMS.toFixed(1)} g left` : after ? "0.025 mol left" : "0.125 mol",
          mgo: step >= 3 ? `0.2 mol = ${MGO_GRAMS.toFixed(1)} g` : after ? "0.2 mol" : "none yet",
        };
        return (
          <g>
            <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              2Mg + O₂ → 2MgO
            </text>

            {/* Supplied amounts, as dashed outlines once the reaction has run */}
            {(["mg", "o2"] as const).map((k) => (
              <rect
                key={k}
                x={COLS[k] - BAR_W / 2}
                y={barTop(MOLES[k])}
                width={BAR_W}
                height={Math.round(MOLES[k] * PER_MOL * 100) / 100}
                fill="none"
                strokeDasharray="4 3"
                className={`stroke-muted-foreground ${MOTION}`}
                style={fade(2)}
              />
            ))}

            {/* Bars: one element each, scaled up from the axis */}
            <rect
              x={-BAR_W / 2}
              y={-1}
              width={BAR_W}
              height={1}
              className={`fill-slate-500 dark:fill-slate-400 ${MOTION}`}
              style={{ transform: svgTransform({ x: COLS.mg, y: BASE, sy: m.mg * PER_MOL }) }}
            />
            <rect
              x={-BAR_W / 2}
              y={-1}
              width={BAR_W}
              height={1}
              className={`fill-sky-500 dark:fill-sky-400 ${MOTION}`}
              style={{ transform: svgTransform({ x: COLS.o2, y: BASE, sy: m.o2 * PER_MOL }) }}
            />
            <rect
              x={-BAR_W / 2}
              y={-1}
              width={BAR_W}
              height={1}
              className={`fill-emerald-500 dark:fill-emerald-400 ${MOTION}`}
              style={{ transform: svgTransform({ x: COLS.mgo, y: BASE, sy: m.mgo * PER_MOL }) }}
            />

            {/* Amount labels: above the supplied amount, or riding on the MgO bar */}
            {(["mg", "o2", "mgo"] as const).map((k) => (
              <text
                key={k}
                x={0}
                y={0}
                textAnchor="middle"
                className={`fill-foreground text-[10px] font-semibold tabular-nums ${MOTION}`}
                style={{ transform: svgTransform({ x: COLS[k], y: (k === "mgo" ? barTop(m.mgo) : barTop(MOLES[k])) - 6 }) }}
              >
                {labels[k]}
              </text>
            ))}

            {/* Axis and names */}
            <line x1={36} y1={BASE} x2={292} y2={BASE} strokeWidth={1.5} className="stroke-foreground" />
            <text x={COLS.mg} y={BASE + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              Mg
            </text>
            <text x={COLS.o2} y={BASE + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              O₂
            </text>
            <text x={COLS.mgo} y={BASE + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              MgO
            </text>

            {/* Quotients, from the second step on */}
            <g className={MOTION} style={fade(1)}>
              <text x={COLS.mg} y={BASE + 30} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300 tabular-nums">
                0.2 ÷ 2 = 0.1
              </text>
              <text x={COLS.o2} y={BASE + 30} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
                0.125 ÷ 1 = 0.125
              </text>
              <text x={COLS.mg} y={BASE + 44} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                smaller: limiting
              </text>
              <text x={COLS.o2} y={BASE + 44} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                in excess
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
