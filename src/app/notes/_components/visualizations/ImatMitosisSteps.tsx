"use client";

/**
 * Animation: mitosis in a cell with 2n = 4 (two homologous pairs: a long pair
 * and a short pair, one of each from the mother in rose, from the father in
 * sky). The five steps are the IMAT concept's own table: prophase, metaphase,
 * anaphase, telophase, cytokinesis, in its words.
 *
 * Each of the 8 chromatids is one shape whose CSS transform changes between
 * steps, so the chromosomes visibly gather on the equator and the sisters slide
 * apart. Spindle fibres are drawn the same way: a unit line from a pole,
 * rotated and stretched to reach its chromatid's centromere.
 *
 * The poses are exported and pinned by tests/notes-imat-visuals-model.test.ts:
 * sisters stay together until anaphase, then go to opposite poles, so each
 * daughter gets one chromatid of every chromosome (the same 2n = 4 set).
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const MITOSIS_STEPS: readonly FigureStep[] = [
  {
    title: "Prophase",
    caption:
      "The DNA, already copied, coils into 4 visible chromosomes, each two sister chromatids joined at a centromere. The spindle forms and the nuclear envelope breaks down.",
  },
  {
    title: "Metaphase",
    caption:
      "The chromosomes line up singly on the equator. Fibres from both poles attach to each centromere.",
  },
  {
    title: "Anaphase",
    caption:
      "The centromeres split and the fibres shorten, pulling the sister chromatids to opposite poles: one copy of every chromosome goes each way.",
  },
  {
    title: "Telophase",
    caption:
      "The chromosomes reach the poles and uncoil. A nuclear envelope forms round each group of 4, and the spindle breaks down.",
  },
  {
    title: "Cytokinesis",
    caption:
      "The cytoplasm divides (a cleavage furrow in an animal cell). Two daughter cells, each with the same 4 chromosomes as the parent.",
  },
];

export type Chromosome = { id: string; length: number; tone: "rose" | "sky" };

/** 2n = 4: a long and a short homologous pair. */
export const CHROMOSOMES: readonly Chromosome[] = [
  { id: "long-m", length: 30, tone: "rose" },
  { id: "long-p", length: 30, tone: "sky" },
  { id: "short-m", length: 18, tone: "rose" },
  { id: "short-p", length: 18, tone: "sky" },
];

export const POLES = { left: { x: 40, y: 100 }, right: { x: 280, y: 100 } } as const;
const EQUATOR_X = 160;

export type Pose = { x: number; y: number; angle: number };

/** Where chromatid `side` (0 = goes left, 1 = goes right) of chromosome `i` sits at a step. */
export function chromatidPose(step: number, i: number, side: 0 | 1): Pose {
  const sign = side === 0 ? -1 : 1;
  switch (step) {
    case 0: {
      // Scattered inside the old nucleus, sisters side by side.
      const spots = [
        { x: 140, y: 82, angle: 25 },
        { x: 182, y: 84, angle: -30 },
        { x: 142, y: 118, angle: -15 },
        { x: 178, y: 120, angle: 40 },
      ];
      const s = spots[i];
      const rad = (s.angle * Math.PI) / 180;
      return { x: s.x + sign * 3 * Math.cos(rad), y: s.y + sign * 3 * Math.sin(rad), angle: s.angle };
    }
    case 1:
      // On the equator, one above the other; sisters face opposite poles.
      return { x: EQUATOR_X + sign * 3, y: 58 + i * 28, angle: 0 };
    case 2:
      // Moving apart, arms trailing (the V shape).
      return { x: EQUATOR_X + sign * 52, y: 72 + i * 19, angle: sign * 70 };
    default:
      // At the poles, inside the new nuclei.
      return { x: (side === 0 ? 92 : 228) + (i % 2 === 0 ? -9 : 9), y: 86 + Math.floor(i / 2) * 28, angle: 0 };
  }
}

/** Distance from a pole to a point, and the angle of that line in degrees. */
export function fibre(pole: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - pole.x;
  const dy = to.y - pole.y;
  return { length: Math.hypot(dx, dy), angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

const TONE = {
  rose: "fill-rose-500 dark:fill-rose-400",
  sky: "fill-sky-500 dark:fill-sky-400",
} as const;

export default function ImatMitosisSteps() {
  return (
    <StepFigure
      title="Animation · mitosis, step by step"
      label="A cell with four chromosomes dividing by mitosis into two identical daughter cells"
      viewBox="0 0 320 200"
      steps={MITOSIS_STEPS}
      note="Rose chromosomes came from the mother, sky ones from the father. Each daughter gets one chromatid of every chromosome, so both are identical to the parent."
    >
      {(step) => {
        const split = step === 4;
        const nucleiBack = step >= 3;
        const fibresOn = step === 1 || step === 2;
        return (
          <g>
            {/* One cell, then two daughters (crossfade). */}
            <ellipse
              cx={160}
              cy={100}
              rx={step >= 2 ? 140 : 125}
              ry={step >= 3 ? 72 : 84}
              className={`fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400 ${MOTION}`}
              strokeWidth={2}
              style={{ opacity: split ? 0 : 1 }}
            />
            {[92, 228].map((cx) => (
              <ellipse
                key={cx}
                cx={cx}
                cy={100}
                rx={66}
                ry={66}
                className={`fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400 ${MOTION}`}
                strokeWidth={2}
                style={{ opacity: split ? 1 : 0 }}
              />
            ))}

            {/* The old nuclear envelope, breaking down in prophase. */}
            <circle
              cx={160}
              cy={100}
              r={52}
              className={`fill-none stroke-indigo-400 ${MOTION}`}
              strokeWidth={1.5}
              strokeDasharray="5 5"
              style={{ opacity: step === 0 ? 0.9 : 0 }}
            />
            {/* New nuclear envelopes from telophase. */}
            {[92, 228].map((cx) => (
              <circle
                key={cx}
                cx={cx}
                cy={100}
                r={34}
                className={`fill-indigo-100/50 stroke-indigo-500 dark:fill-indigo-900/30 dark:stroke-indigo-300 ${MOTION}`}
                strokeWidth={1.5}
                style={{ opacity: nucleiBack ? 1 : 0 }}
              />
            ))}

            {/* Spindle fibres: a unit line from a pole, turned and stretched to its chromatid. */}
            {CHROMOSOMES.flatMap((_, i) =>
              ([0, 1] as const).map((side) => {
                const pole = side === 0 ? POLES.left : POLES.right;
                const p = chromatidPose(Math.min(step, 2), i, side);
                const f = fibre(pole, p);
                return (
                  <line
                    key={`f-${i}-${side}`}
                    x1={0}
                    y1={0}
                    x2={1}
                    y2={0}
                    vectorEffect="non-scaling-stroke"
                    className={`stroke-slate-400 dark:stroke-slate-500 ${MOTION}`}
                    strokeWidth={1}
                    style={{
                      transform: svgTransform({ x: pole.x, y: pole.y, angle: f.angle, sx: f.length }),
                      opacity: fibresOn ? 0.8 : 0,
                    }}
                  />
                );
              }),
            )}

            {/* Poles (centrosomes). */}
            {[POLES.left, POLES.right].map((p) => (
              <circle
                key={p.x}
                cx={p.x}
                cy={p.y}
                r={4}
                className={`fill-amber-500 ${MOTION}`}
                style={{ opacity: step >= 1 && step <= 2 ? 1 : 0 }}
              />
            ))}

            {/* The 8 chromatids. */}
            {CHROMOSOMES.flatMap((c, i) =>
              ([0, 1] as const).map((side) => {
                const p = chromatidPose(step, i, side);
                return (
                  <rect
                    key={`${c.id}-${side}`}
                    x={-2.5}
                    y={-c.length / 2}
                    width={5}
                    height={c.length}
                    rx={2.5}
                    className={`${TONE[c.tone]} ${MOTION}`}
                    style={{ transform: svgTransform(p) }}
                  />
                );
              }),
            )}

            {/* Equator line in metaphase. */}
            <line
              x1={EQUATOR_X}
              y1={36}
              x2={EQUATOR_X}
              y2={164}
              className={`stroke-indigo-400 ${MOTION}`}
              strokeDasharray="3 4"
              style={{ opacity: step === 1 ? 1 : 0 }}
            />
            <text
              x={EQUATOR_X}
              y={197}
              textAnchor="middle"
              className={`fill-indigo-700 text-[11px] dark:fill-indigo-300 ${MOTION}`}
              style={{ opacity: step === 1 ? 1 : 0 }}
            >
              equator
            </text>
            <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {MITOSIS_STEPS[step].title}
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
