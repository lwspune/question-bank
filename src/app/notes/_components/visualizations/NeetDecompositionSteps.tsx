"use client";
/**
 * Animation: the steps of decomposition, in the NCERT words of the concept
 * (nboec-decomposition).
 *
 * Detritus (dead leaves on the soil) is the raw material. Fragmentation
 * (detritivores such as the earthworm break it into smaller particles),
 * leaching (water-soluble inorganic nutrients go down into the soil horizon
 * and are precipitated as unavailable salts) and catabolism (bacterial and
 * fungal enzymes degrade it into simpler inorganic substances) operate
 * simultaneously on the detritus, so the list on the right groups them
 * together. Humification (humus, dark coloured and amorphous, accumulates) and
 * mineralisation (some soil microbes degrade humus further and release
 * inorganic nutrients) happen in the soil, the second group.
 *
 * Each shape that changes is one element whose transform or opacity changes
 * between steps. Poses are exported and pinned by tests/notes-w2-19.test.ts.
 * No fact, number or name beyond the concept's text.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const DECOMPOSITION_STEPS: readonly FigureStep[] = [
  {
    title: "Detritus",
    caption:
      "Detritus is the raw material: dead plant remains such as leaves, bark and flowers, and dead remains of animals, including fecal matter.",
  },
  {
    title: "Fragmentation",
    caption: "Detritivores such as the earthworm break detritus down into smaller particles.",
  },
  {
    title: "Leaching",
    caption: "Water-soluble inorganic nutrients go down into the soil horizon and are precipitated as unavailable salts.",
  },
  {
    title: "Catabolism",
    caption:
      "Bacterial and fungal enzymes degrade detritus into simpler inorganic substances. Fragmentation, leaching and catabolism operate simultaneously on the detritus.",
  },
  {
    title: "Humification",
    caption:
      "In the soil a dark coloured amorphous substance, humus, accumulates. It is highly resistant to microbes and is a reservoir of nutrients.",
  },
  {
    title: "Mineralisation",
    caption: "Some soil microbes degrade humus further, and inorganic nutrients are released.",
  },
];

/** The five steps, grouped as the concept groups them. */
export const GROUPS: readonly { label: string; steps: readonly string[] }[] = [
  { label: "together, on the detritus", steps: ["Fragmentation", "Leaching", "Catabolism"] },
  { label: "in the soil", steps: ["Humification", "Mineralisation"] },
];

/** Who or what does each step (the concept's table). */
export const DONE_BY: Readonly<Record<string, string>> = {
  Fragmentation: "detritivores, such as the earthworm",
  Leaching: "water moving through the soil",
  Catabolism: "bacteria and fungi",
  Humification: "takes place in the soil",
  Mineralisation: "some soil microbes",
};

// Geometry (viewBox units).
export const GROUND_Y = 84;
export const SOIL_BOTTOM = 210;
/** Rows of the list on the right, by step title. */
export const LIST_ROW_Y: Readonly<Record<string, number>> = {
  Detritus: 24,
  Fragmentation: 64,
  Leaching: 82,
  Catabolism: 100,
  Humification: 142,
  Mineralisation: 160,
};

export type Pose = { x: number; y: number; opacity: number };

/** The highlight on the list: the row of the current step. */
export function highlightPose(step: number): Pose {
  const title = DECOMPOSITION_STEPS[Math.min(Math.max(step, 0), DECOMPOSITION_STEPS.length - 1)].title;
  return { x: 0, y: LIST_ROW_Y[title], opacity: 1 };
}

/** Whole dead leaves: full at first, faded once they are being broken up. */
export const leafOpacity = (step: number) => (step === 0 ? 1 : 0.35);

/** The earthworm and the small particles: from fragmentation on. */
export const fragmentOpacity = (step: number) => (step >= 1 ? 1 : 0);

/** A drop of water: at the surface and unseen before leaching, then down in the soil. */
export function dropPose(step: number, x: number): Pose {
  return step >= 2 ? { x, y: 166, opacity: 1 } : { x, y: GROUND_Y + 4, opacity: 0 };
}

/** The unavailable salts, deep in the soil: from leaching on. */
export const saltOpacity = (step: number) => (step >= 2 ? 1 : 0);

/** Bacteria and fungi on the particles: from catabolism on. */
export const microbeOpacity = (step: number) => (step >= 3 ? 1 : 0);

/** Humus in the soil: from humification on. */
export const HUMUS = { x: 96, y: 122 } as const;
export const humusOpacity = (step: number) => (step >= 4 ? 1 : 0);

/** An inorganic nutrient: inside the humus and unseen, then released around it. */
export function nutrientPose(step: number, i: number): Pose {
  const spread = [
    { x: 46, y: 116 },
    { x: 150, y: 112 },
    { x: 60, y: 140 },
    { x: 140, y: 138 },
  ][i % 4];
  return step >= 5 ? { ...spread, opacity: 1 } : { x: HUMUS.x, y: HUMUS.y, opacity: 0 };
}

const DROP_X = [40, 92, 150] as const;
const FRAGMENTS = [
  { x: 36, y: 78, a: 20 },
  { x: 58, y: 80, a: -30 },
  { x: 104, y: 78, a: 50 },
  { x: 132, y: 80, a: -10 },
  { x: 160, y: 79, a: 35 },
  { x: 178, y: 80, a: -40 },
] as const;
const MICROBES = [
  { x: 46, y: 72 },
  { x: 70, y: 76 },
  { x: 116, y: 72 },
  { x: 146, y: 74 },
  { x: 170, y: 72 },
] as const;

function Leaf({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <ellipse rx={18} ry={7} className="fill-lime-600 stroke-lime-800 dark:fill-lime-700 dark:stroke-lime-300" strokeWidth={1} />
      <line x1={-16} y1={0} x2={16} y2={0} strokeWidth={0.8} className="stroke-lime-900 dark:stroke-lime-200" />
    </g>
  );
}

export default function NeetDecompositionSteps() {
  return (
    <StepFigure
      title="Animation · the steps of decomposition"
      label="Dead leaves on the soil are broken into smaller particles by an earthworm, water carries soluble nutrients down where they are precipitated as unavailable salts, bacteria and fungi degrade the particles, humus accumulates in the soil, and soil microbes degrade humus to release inorganic nutrients. A list groups fragmentation, leaching and catabolism together, on the detritus, and humification and mineralisation in the soil."
      viewBox="0 0 320 222"
      steps={DECOMPOSITION_STEPS}
      note="Fragmentation, leaching and catabolism go on together on the detritus; humification and mineralisation happen in the soil."
    >
      {(step) => {
        const hl = highlightPose(step);
        return (
          <g>
            {/* Soil */}
            <rect x={8} y={GROUND_Y} width={190} height={SOIL_BOTTOM - GROUND_Y} rx={4} className="fill-amber-100 dark:fill-amber-950/60" />
            <line x1={8} y1={GROUND_Y} x2={198} y2={GROUND_Y} strokeWidth={1.5} className="stroke-amber-700 dark:stroke-amber-400" />
            <text x={14} y={SOIL_BOTTOM - 6} className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-200">
              soil
            </text>

            {/* Whole dead leaves (detritus) */}
            <g className={MOTION} style={{ opacity: leafOpacity(step) }}>
              <Leaf x={50} y={68} angle={-12} />
              <Leaf x={100} y={64} angle={18} />
              <Leaf x={152} y={68} angle={-6} />
            </g>
            <text x={100} y={20} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              detritus: dead leaves
            </text>
            <line x1={100} y1={24} x2={100} y2={54} strokeDasharray="2 2" className="stroke-muted-foreground" />

            {/* Fragmentation: earthworm and small particles */}
            <g className={MOTION} style={{ opacity: fragmentOpacity(step) }}>
              {FRAGMENTS.map((f) => (
                <rect
                  key={`${f.x}-${f.y}`}
                  x={f.x - 4}
                  y={f.y - 2}
                  width={8}
                  height={4}
                  rx={1}
                  transform={`rotate(${f.a} ${f.x} ${f.y})`}
                  className="fill-lime-700 dark:fill-lime-500"
                />
              ))}
              <path
                d="M 70 100 q 8 -7 16 0 t 16 0 t 16 0"
                fill="none"
                strokeWidth={5}
                strokeLinecap="round"
                className="stroke-rose-400 dark:stroke-rose-300"
              />
              <text x={124} y={103} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                earthworm
              </text>
            </g>

            {/* Catabolism: bacteria and fungi on the particles */}
            <g className={MOTION} style={{ opacity: microbeOpacity(step) }}>
              {MICROBES.map((m) => (
                <circle key={`${m.x}-${m.y}`} cx={m.x} cy={m.y} r={2.5} className="fill-violet-600 dark:fill-violet-400" />
              ))}
              <text x={198} y={50} textAnchor="end" className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
                bacteria and fungi
              </text>
            </g>

            {/* Humification: humus in the soil */}
            <g className={MOTION} style={{ opacity: humusOpacity(step) }}>
              <ellipse cx={HUMUS.x} cy={HUMUS.y} rx={30} ry={11} className="fill-stone-700 dark:fill-stone-500" />
              <text x={HUMUS.x} y={HUMUS.y + 4} textAnchor="middle" className="fill-stone-50 text-[10px] font-semibold dark:fill-stone-950">
                humus
              </text>
            </g>

            {/* Mineralisation: inorganic nutrients released */}
            {[0, 1, 2, 3].map((i) => {
              const p = nutrientPose(step, i);
              return (
                <circle
                  key={i}
                  r={3.5}
                  className={`${MOTION} fill-emerald-500 dark:fill-emerald-400`}
                  style={{ transform: svgTransform({ x: p.x, y: p.y }), opacity: p.opacity }}
                />
              );
            })}
            <text
              x={100}
              y={152}
              textAnchor="middle"
              className={`${MOTION} fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300`}
              style={{ opacity: step >= 5 ? 1 : 0 }}
            >
              inorganic nutrients
            </text>

            {/* Leaching: water drops going down, unavailable salts below */}
            {DROP_X.map((x) => {
              const p = dropPose(step, x);
              return (
                <path
                  key={x}
                  d="M 0 -6 C 3 -1 4 2 0 4 C -4 2 -3 -1 0 -6 Z"
                  className={`${MOTION} fill-sky-500 dark:fill-sky-400`}
                  style={{ transform: svgTransform({ x: p.x, y: p.y }), opacity: p.opacity }}
                />
              );
            })}
            <g className={MOTION} style={{ opacity: saltOpacity(step) }}>
              {[30, 52, 84, 106, 140, 162].map((x) => (
                <rect key={x} x={x} y={180} width={7} height={7} className="fill-slate-400 dark:fill-slate-500" />
              ))}
              <text x={100} y={200} textAnchor="middle" className="fill-slate-700 text-[10px] font-semibold dark:fill-slate-300">
                unavailable salts
              </text>
            </g>

            {/* The list of steps */}
            <rect
              x={208}
              y={-12}
              width={108}
              height={16}
              rx={4}
              className={`${MOTION} fill-indigo-100 dark:fill-indigo-900/60`}
              style={{ transform: svgTransform({ x: hl.x, y: hl.y }) }}
            />
            <text x={212} y={LIST_ROW_Y.Detritus} className="fill-foreground text-[11px] font-semibold">
              Detritus
            </text>
            {GROUPS.map((g, gi) => {
              const ys = g.steps.map((s) => LIST_ROW_Y[s]);
              const top = ys[0] - 22;
              return (
                <g key={g.label}>
                  <text x={210} y={top + 4} className="fill-muted-foreground text-[9px]">
                    {g.label}
                  </text>
                  <line x1={208} y1={ys[0] - 10} x2={208} y2={ys[ys.length - 1] + 3} strokeWidth={2} className={gi === 0 ? "stroke-lime-600 dark:stroke-lime-400" : "stroke-stone-600 dark:stroke-stone-400"} />
                  {g.steps.map((s) => (
                    <text key={s} x={214} y={LIST_ROW_Y[s]} className="fill-foreground text-[11px]">
                      {s}
                    </text>
                  ))}
                </g>
              );
            })}
          </g>
        );
      }}
    </StepFigure>
  );
}
