"use client";

/**
 * Animation: the catalytic cycle of an enzyme, in the NEET concept's own terms
 * (nzobm-enzyme-action) and its four-step table.
 *
 * 1. Binding: the substrate fits into the active site.
 * 2. Fitting tighter: the enzyme changes shape around it (the ES complex).
 * 3. Bond breaking: the active site breaks the substrate's bonds (the EP
 *    complex).
 * 4. Release: the products leave and the unchanged enzyme is free again.
 * The equation E + S ⇌ ES → EP → E + P runs along the bottom with the
 * current stage marked.
 *
 * The substrate is two halves, each one shape whose transform changes between
 * steps; the open and the closed enzyme cross-fade. The poses are exported and
 * pinned by tests/notes-w2-17.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const ENZYME_STEPS: readonly FigureStep[] = [
  { title: "Binding", caption: "The substrate binds to the active site of the enzyme, fitting into it." },
  {
    title: "Fitting tighter",
    caption: "Binding makes the enzyme change shape and fit more tightly around the substrate: the enzyme-substrate complex (ES).",
  },
  {
    title: "Bond breaking",
    caption: "The active site breaks the chemical bonds of the substrate, and the enzyme-product complex (EP) forms.",
  },
  {
    title: "Release",
    caption: "The enzyme releases the products. The free enzyme is unchanged and ready to bind another substrate molecule.",
  },
];

/** The equation of enzyme action, term by term. */
export const EQUATION = ["E + S", "⇌", "ES", "→", "EP", "→", "E + P"] as const;
export const EQUATION_X = [96, 126, 150, 172, 194, 216, 246] as const;

/** The term marked at each step: E + S, ES, EP, E + P. */
export const MARKED_TERM = [0, 2, 4, 6] as const;

/** The active site: open, and closed around the substrate. */
export const POCKET = {
  open: { left: 136, right: 184 },
  closed: { left: 141, right: 179 },
  floor: 140,
} as const;

export const HALF_WIDTH = 16;

export type Pose = { x: number; y: number };

/** The two halves of the substrate: joined in the site, apart after bond breaking, gone after release. */
export function halfPose(half: "left" | "right", step: number): Pose {
  const s = half === "left" ? -1 : 1;
  if (step <= 1) return { x: 160 + s * 8, y: 126 };
  if (step === 2) return { x: 160 + s * 10, y: 126 };
  return { x: 160 + s * 90, y: 60 };
}

/** The bond joining the halves: present until it is broken. */
export function bondOpacity(step: number): number {
  return step <= 1 ? 1 : 0;
}

/** The enzyme is closed (fitted tight) in steps 2 and 3 of the table. */
export function closed(step: number): boolean {
  return step === 1 || step === 2;
}

const BODY_END = "L 220 104 Q 234 104 234 118 L 234 182 Q 234 196 220 196 L 100 196 Q 86 196 86 182 L 86 118 Q 86 104 100 104 Z";
const OPEN_PATH = `M 100 104 L 136 104 L 136 140 L 184 140 L 184 104 ${BODY_END}`;
const CLOSED_PATH = `M 100 104 L 150 104 L 150 110 L 141 110 L 141 141 L 179 141 L 179 110 L 170 110 L 170 104 ${BODY_END}`;

const ENZYME = "fill-sky-200 stroke-sky-700 dark:fill-sky-900 dark:stroke-sky-300";

function Half({ pose, tone }: { pose: Pose; tone: string }) {
  return (
    <g className={MOTION} style={{ transform: svgTransform(pose) }}>
      <rect x={-HALF_WIDTH / 2} y={-14} width={HALF_WIDTH} height={28} rx={3} strokeWidth={1.2} className={tone} />
    </g>
  );
}

export default function NeetEnzymeCycle() {
  return (
    <StepFigure
      title="Animation · how an enzyme acts"
      label="A substrate fits into the active site of an enzyme, the enzyme fits tighter around it to form the enzyme-substrate complex, the active site breaks the substrate's bond to form the enzyme-product complex, and the products are released, leaving the enzyme unchanged. Along the bottom: E plus S gives ES, then EP, then E plus P."
      viewBox="0 0 320 240"
      steps={ENZYME_STEPS}
      note="The enzyme comes out unchanged, ready for the next substrate."
    >
      {(step) => {
        const shut = closed(step);
        const mark = MARKED_TERM[Math.min(step, MARKED_TERM.length - 1)];
        return (
          <g>
            {/* The enzyme, open or fitted tight. */}
            <path d={OPEN_PATH} strokeWidth={1.5} className={`${ENZYME} ${MOTION}`} style={{ opacity: shut ? 0 : 1 }} />
            <path d={CLOSED_PATH} strokeWidth={1.5} className={`${ENZYME} ${MOTION}`} style={{ opacity: shut ? 1 : 0 }} />
            <line x1={196} y1={94} x2={182} y2={110} strokeWidth={1} className="stroke-muted-foreground" />
            <text x={198} y={94} className="fill-foreground text-[10px]">
              active site
            </text>
            <text x={160} y={184} textAnchor="middle" className="fill-sky-900 text-[11px] font-semibold dark:fill-sky-100">
              enzyme (E)
            </text>

            {/* The substrate: two halves and the bond between them. */}
            <Half pose={halfPose("left", step)} tone="fill-amber-300 stroke-amber-700 dark:fill-amber-600 dark:stroke-amber-300" />
            <Half pose={halfPose("right", step)} tone="fill-orange-300 stroke-orange-700 dark:fill-orange-600 dark:stroke-orange-300" />
            <line
              x1={155}
              y1={126}
              x2={165}
              y2={126}
              strokeWidth={3}
              className={`stroke-rose-600 dark:stroke-rose-400 ${MOTION}`}
              style={{ opacity: bondOpacity(step) }}
            />

            {/* Labels for each stage. */}
            <text
              x={160}
              y={96}
              textAnchor="middle"
              className={`fill-amber-800 text-[10px] font-semibold dark:fill-amber-200 ${MOTION}`}
              style={{ opacity: step <= 1 ? 1 : 0 }}
            >
              substrate (S)
            </text>
            <text x={240} y={130} className={`fill-foreground text-[10px] font-semibold ${MOTION}`} style={{ opacity: step === 1 ? 1 : 0 }}>
              ES complex
            </text>
            <text x={240} y={130} className={`fill-foreground text-[10px] font-semibold ${MOTION}`} style={{ opacity: step === 2 ? 1 : 0 }}>
              EP complex
            </text>
            <g className={MOTION} style={{ opacity: step >= 3 ? 1 : 0 }}>
              <text x={160} y={64} textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-200">
                products (P)
              </text>
              <text x={240} y={124} className="fill-foreground text-[10px] font-semibold">
                free enzyme,
              </text>
              <text x={240} y={136} className="fill-foreground text-[10px]">
                unchanged
              </text>
            </g>

            {/* The equation, the current stage marked. */}
            <rect
              x={-20}
              y={-12}
              width={40}
              height={18}
              rx={4}
              className={`fill-indigo-100 dark:fill-indigo-900 ${MOTION}`}
              style={{ transform: svgTransform({ x: EQUATION_X[mark], y: 226 }) }}
            />
            {EQUATION.map((t, i) => (
              <text key={i} x={EQUATION_X[i]} y={230} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {t}
              </text>
            ))}
          </g>
        );
      }}
    </StepFigure>
  );
}
