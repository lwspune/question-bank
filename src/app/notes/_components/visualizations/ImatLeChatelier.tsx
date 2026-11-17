"use client";

/**
 * Animation: Le Chatelier's principle for a change in concentration, on the
 * concept's own example, Fe³⁺(aq) + SCN⁻(aq) ⇌ FeSCN²⁺(aq) (blood red), with
 * more KSCN added. Concentrations are in mmol/L, chosen so every number is
 * whole and Kc = [FeSCN²⁺] / ([Fe³⁺][SCN⁻]) = 1 (in these units) before and
 * after:
 *   at equilibrium   3, 1, 3   Kc = 3 / (3 × 1) = 1
 *   SCN⁻ added       3, 7, 3   Q = 3 / (3 × 7) = 1/7, less than Kc
 *   shifting         2, 6, 4   Q = 4 / (2 × 6) = 1/3, still less than Kc
 *   new equilibrium  1, 5, 5   Kc = 5 / (1 × 5) = 1, unchanged
 * Each species moves by the same amount (1 : 1 : 1 in the equation), and the
 * added SCN⁻ is only partly used up (7 falls to 5, not back to 1).
 *
 * Each bar is one rect whose transform (scale) changes between steps.
 * Pinned by tests/notes-imat-visuals-chem1.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const SPECIES = [
  { id: "fe", label: "Fe³⁺", tone: "amber" },
  { id: "scn", label: "SCN⁻", tone: "sky" },
  { id: "fescn", label: "FeSCN²⁺", tone: "rose" },
] as const;

export type Conc = { fe: number; scn: number; fescn: number };

/** Concentrations (mmol/L) at each step. */
export const STATES: readonly Conc[] = [
  { fe: 3, scn: 1, fescn: 3 },
  { fe: 3, scn: 7, fescn: 3 },
  { fe: 2, scn: 6, fescn: 4 },
  { fe: 1, scn: 5, fescn: 5 },
];

/** The reaction quotient (equal to Kc at equilibrium). */
export const quotient = (c: Conc) => c.fescn / (c.fe * c.scn);

export const LC_STEPS: readonly FigureStep[] = [
  {
    title: "At equilibrium",
    caption: "Fe³⁺ 3, SCN⁻ 1 and FeSCN²⁺ 3 mmol/L. Kc = 3 / (3 × 1) = 1. The forward and reverse reactions run at the same rate.",
  },
  {
    title: "SCN⁻ added",
    caption: "Adding KSCN raises SCN⁻ to 7 mmol/L. Now Q = 3 / (3 × 7) = 1/7, less than Kc, so the system is no longer at equilibrium.",
  },
  {
    title: "Shift to the right",
    caption: "The forward reaction now runs faster than the reverse: it uses up some of the added SCN⁻ and some Fe³⁺, and makes more FeSCN²⁺ (1 : 1 : 1).",
  },
  {
    title: "New equilibrium",
    caption: "Fe³⁺ 1, SCN⁻ 5, FeSCN²⁺ 5: Kc = 5 / (1 × 5) = 1, the same as before. The colour is deeper red. The change is only partly undone: SCN⁻ is 5, not back to 1.",
  },
];

const W = 320;
const H = 214;
const BASE = 178;
const UNIT = 16; // px per mmol/L
const BAR_W = 46;
const XS = [76, 160, 244] as const;

const FILL = {
  amber: "fill-amber-500 dark:fill-amber-400",
  sky: "fill-sky-500 dark:fill-sky-400",
  rose: "fill-rose-600 dark:fill-rose-400",
} as const;

function qLine(step: number): string {
  const c = STATES[step];
  const q = quotient(c);
  if (step === 0 || step === STATES.length - 1) return `Kc = ${c.fescn} / (${c.fe} × ${c.scn}) = ${q}`;
  return `Q = ${c.fescn} / (${c.fe} × ${c.scn}) = 1/${Math.round(1 / q)}, less than Kc = 1`;
}

export default function ImatLeChatelier() {
  return (
    <StepFigure
      title="Animation · adding a reactant shifts the equilibrium right"
      label="Bar chart of Fe3+, SCN- and FeSCN2+ concentrations. At equilibrium 3, 1 and 3. SCN- is added, raising it to 7. The equilibrium shifts right until 1, 5 and 5, when Kc is again 1."
      viewBox={`0 0 ${W} ${H}`}
      steps={LC_STEPS}
      note="Concentrations in mmol/L, chosen to keep the numbers whole. Only a change in temperature changes Kc."
    >
      {(step) => {
        const c = STATES[step];
        return (
          <g>
            <text x={W / 2} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              Fe³⁺ + SCN⁻ ⇌ FeSCN²⁺
            </text>
            <text x={W / 2} y={30} textAnchor="middle" className="fill-muted-foreground text-[11px] tabular-nums">
              {qLine(step)}
            </text>

            {/* Shift arrow, during the shift */}
            <g className={`text-indigo-600 dark:text-indigo-400 ${MOTION}`} style={{ opacity: step === 2 ? 1 : 0 }}>
              <line x1={118} y1={46} x2={196} y2={46} stroke="currentColor" strokeWidth={2} />
              <path d="M196,41 L206,46 L196,51 Z" fill="currentColor" />
              <text x={160} y={42} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
                shifts right
              </text>
            </g>

            {/* Baseline */}
            <line x1={30} y1={BASE} x2={W - 20} y2={BASE} className="stroke-border" />

            {SPECIES.map((s, i) => {
              const v = c[s.id];
              const start = STATES[0][s.id];
              return (
                <g key={s.id}>
                  {/* Starting level, for comparison */}
                  <line
                    x1={XS[i] - BAR_W / 2 - 4}
                    y1={BASE - start * UNIT}
                    x2={XS[i] + BAR_W / 2 + 4}
                    y2={BASE - start * UNIT}
                    strokeDasharray="3 2"
                    className={`stroke-muted-foreground ${MOTION}`}
                    style={{ opacity: step >= 1 ? 0.8 : 0 }}
                  />
                  {/* The bar: a unit rect scaled to the concentration */}
                  <rect
                    x={-BAR_W / 2}
                    y={-1}
                    width={BAR_W}
                    height={1}
                    className={`${FILL[s.tone]} ${MOTION}`}
                    style={{ transform: svgTransform({ x: XS[i], y: BASE, sy: v * UNIT }) }}
                  />
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    className={`fill-foreground text-[11px] font-semibold tabular-nums ${MOTION}`}
                    style={{ transform: svgTransform({ x: XS[i], y: BASE - v * UNIT - 5 }) }}
                  >
                    {v}
                  </text>
                  <text x={XS[i]} y={BASE + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                    {s.label}
                  </text>
                </g>
              );
            })}
            <text x={W / 2} y={BASE + 30} textAnchor="middle" className={`fill-muted-foreground text-[10px] ${MOTION}`} style={{ opacity: step >= 1 ? 1 : 0 }}>
              dashed line: level at the start
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
