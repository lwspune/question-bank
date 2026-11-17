"use client";

/**
 * Animation: chemiosmosis on the inner mitochondrial membrane, in the IMAT
 * concept's own terms (imat-bem-chemiosmosis).
 *
 * NADH hands its electrons to complex I; ubiquinone (Q) carries them to
 * complex III and cytochrome c to complex IV, which gives them to oxygen to
 * form water. Complexes I, III and IV each pump H⁺ from the matrix into the
 * intermembrane space as the electrons pass. The H⁺ then flow back through
 * ATP synthase, whose head (facing the matrix) turns and joins ADP and Pi.
 *
 * The electron pair and each pumped H⁺ are single shapes whose transform
 * changes between steps. Their poses are exported and pinned by
 * tests/notes-imat-visuals-biometab.test.ts: the electrons visit I, III, IV in
 * order and never enter ATP synthase (the concept's trap: ATP synthase is
 * driven by protons, not electrons).
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const CHEMIOSMOSIS_STEPS: readonly FigureStep[] = [
  {
    title: "NADH gives up its electrons",
    caption:
      "NADH hands its electrons to complex I and becomes NAD⁺. As the electrons pass, complex I pumps H⁺ from the matrix into the intermembrane space.",
  },
  {
    title: "Along the chain",
    caption: "Ubiquinone (Q) carries the electrons to complex III, which pumps more H⁺ out of the matrix.",
  },
  {
    title: "Oxygen takes the electrons",
    caption:
      "Cytochrome c carries the electrons to complex IV, which pumps H⁺ too. Complex IV hands them to oxygen, the final acceptor, which takes up H⁺ to form water.",
  },
  {
    title: "A proton gradient",
    caption:
      "H⁺ builds up in the intermembrane space: more H⁺ (lower pH) and more positive charge than in the matrix. The inner membrane does not let H⁺ back through.",
  },
  {
    title: "ATP synthase",
    caption:
      "The only way back is through ATP synthase. H⁺ flowing into the matrix turns it, and it joins ADP and phosphate (Pi) into ATP. No electrons pass through it.",
  },
];

export const MEMBRANE = { top: 92, bottom: 128 } as const;

/** The three proton pumps, in the order the electrons reach them. */
export const COMPLEXES = [
  { id: "I", x: 36 },
  { id: "III", x: 96 },
  { id: "IV", x: 152 },
] as const;

/** The two mobile carriers: ubiquinone in the membrane, cytochrome c on its outer face. */
export const CARRIERS = { Q: { x: 66, y: 114 }, c: { x: 124, y: 82 } } as const;

/** ATP synthase: the channel through the membrane and the head in the matrix. */
export const ATP_SYNTHASE = { x: 250, left: 240, right: 260, head: { x: 250, y: 150, r: 15 } } as const;

/** Where oxygen takes the electrons (matrix side of complex IV). */
export const OXYGEN = { x: 152, y: 152 } as const;

export type Pose = { x: number; y: number; opacity: number };

/** The electron pair at each step: complex I, complex III, then oxygen, then gone. */
export function electronPose(step: number): Pose {
  if (step <= 0) return { x: COMPLEXES[0].x, y: 120, opacity: 1 };
  if (step === 1) return { x: COMPLEXES[1].x, y: 120, opacity: 1 };
  return { ...OXYGEN, opacity: step === 2 ? 1 : 0 };
}

/**
 * Pumped proton k (0 = by complex I, 1 = III, 2 = IV) at a step: in the matrix
 * until its complex has pumped it, then in the intermembrane space; at the
 * gradient step it drifts to ATP synthase, and in the last step protons 0 and
 * 1 flow back through the channel into the matrix.
 */
export function protonPose(k: 0 | 1 | 2, step: number): { x: number; y: number } {
  const cx = COMPLEXES[k].x - 9;
  if (step < k) return { x: cx, y: 152 };
  if (step <= 2) return { x: cx, y: 62 };
  const atGate = [
    { x: 244, y: 58 },
    { x: 257, y: 40 },
    { x: 212, y: 48 },
  ][k];
  if (step === 3 || k === 2) return atGate;
  return [
    { x: 243, y: 180 },
    { x: 258, y: 194 },
  ][k];
}

const IMS_BACKGROUND = [
  { x: 70, y: 34 },
  { x: 130, y: 26 },
  { x: 180, y: 44 },
  { x: 296, y: 30 },
  { x: 296, y: 62 },
];

function Proton({ x, y, faint = false, moving = false }: { x: number; y: number; faint?: boolean; moving?: boolean }) {
  return (
    <g
      className={moving ? MOTION : undefined}
      style={{ transform: svgTransform({ x, y }), opacity: faint ? 0.45 : 1 }}
    >
      <circle r={8} className="fill-rose-100 stroke-rose-500 dark:fill-rose-950 dark:stroke-rose-400" strokeWidth={1} />
      <text y={3.5} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
        H⁺
      </text>
    </g>
  );
}

export default function ImatChemiosmosis() {
  return (
    <StepFigure
      title="Animation · chemiosmosis in the inner membrane"
      label="Electrons from NADH pass along complexes I, III and IV to oxygen while H⁺ is pumped into the intermembrane space, then H⁺ flows back through ATP synthase, which makes ATP"
      viewBox="0 0 320 222"
      steps={CHEMIOSMOSIS_STEPS}
      note="Each H⁺ drawn stands for several protons. Electrons pump the protons; the protons drive ATP synthase."
    >
      {(step) => {
        const e = electronPose(step);
        return (
          <g>
            <defs>
              <marker id="chemi-h" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-rose-500 dark:fill-rose-400" />
              </marker>
              <marker id="chemi-e" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
              </marker>
            </defs>

            {/* The intermembrane space, tinted once the gradient is the point. */}
            <rect
              x={0}
              y={20}
              width={320}
              height={MEMBRANE.top - 20}
              className={`fill-rose-500/10 ${MOTION}`}
              style={{ opacity: step >= 3 ? 1 : 0 }}
            />
            <text x={8} y={14} className="fill-foreground text-[10px] font-semibold">
              Intermembrane space: more H⁺, lower pH
            </text>
            <text x={8} y={216} className="fill-foreground text-[10px] font-semibold">
              Matrix: less H⁺
            </text>

            {/* Inner membrane (phospholipid bilayer). */}
            <rect
              x={0}
              y={MEMBRANE.top}
              width={320}
              height={MEMBRANE.bottom - MEMBRANE.top}
              className="fill-amber-100/70 dark:fill-amber-900/30"
            />
            <line x1={0} y1={MEMBRANE.top} x2={320} y2={MEMBRANE.top} className="stroke-amber-500" strokeWidth={1} />
            <line x1={0} y1={MEMBRANE.bottom} x2={320} y2={MEMBRANE.bottom} className="stroke-amber-500" strokeWidth={1} />
            <text x={200} y={108} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              inner
            </text>
            <text x={200} y={120} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              membrane
            </text>

            {/* Pump arrows: shown once that complex has pumped. */}
            {COMPLEXES.map((c, k) => (
              <line
                key={`pump-${c.id}`}
                x1={c.x + 7}
                y1={146}
                x2={c.x + 7}
                y2={70}
                markerEnd="url(#chemi-h)"
                className={`stroke-rose-500 dark:stroke-rose-400 ${MOTION}`}
                strokeWidth={1.5}
                style={{ opacity: step >= k ? 1 : 0 }}
              />
            ))}
            {/* H⁺ back through ATP synthase. */}
            <line
              x1={ATP_SYNTHASE.x}
              y1={74}
              x2={ATP_SYNTHASE.x}
              y2={176}
              markerEnd="url(#chemi-h)"
              className={`stroke-rose-500 dark:stroke-rose-400 ${MOTION}`}
              strokeWidth={1.5}
              style={{ opacity: step === 4 ? 1 : 0 }}
            />

            {/* Electron path: NADH to I, Q, III, then cytochrome c, IV and oxygen. */}
            <line x1={44} y1={160} x2={40} y2={130} markerEnd="url(#chemi-e)" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
            <polyline
              points="36,120 66,114 96,120"
              fill="none"
              strokeDasharray="4 3"
              className={`stroke-amber-600 dark:stroke-amber-400 ${MOTION}`}
              strokeWidth={1.5}
              style={{ opacity: step >= 1 ? 1 : 0 }}
            />
            <polyline
              points="96,120 124,82 152,120 152,146"
              fill="none"
              strokeDasharray="4 3"
              markerEnd="url(#chemi-e)"
              className={`stroke-amber-600 dark:stroke-amber-400 ${MOTION}`}
              strokeWidth={1.5}
              style={{ opacity: step >= 2 ? 1 : 0 }}
            />

            {/* Complexes I, III, IV. */}
            {COMPLEXES.map((c) => (
              <g key={c.id}>
                <rect
                  x={c.x - 14}
                  y={86}
                  width={28}
                  height={48}
                  rx={6}
                  className="fill-sky-200 stroke-sky-600 dark:fill-sky-900 dark:stroke-sky-400"
                  strokeWidth={1.5}
                />
                <text x={c.x} y={104} textAnchor="middle" className="fill-sky-900 text-[11px] font-bold dark:fill-sky-100">
                  {c.id}
                </text>
              </g>
            ))}
            {/* Mobile carriers. */}
            {(
              [
                ["Q", CARRIERS.Q],
                ["c", CARRIERS.c],
              ] as const
            ).map(([name, p]) => (
              <g key={name}>
                <circle cx={p.x} cy={p.y} r={9} className="fill-violet-200 stroke-violet-600 dark:fill-violet-900 dark:stroke-violet-400" strokeWidth={1.5} />
                <text x={p.x} y={p.y + 3.5} textAnchor="middle" className="fill-violet-900 text-[10px] font-bold dark:fill-violet-100">
                  {name}
                </text>
              </g>
            ))}

            {/* ATP synthase: channel in the membrane, head in the matrix that turns. */}
            <rect
              x={ATP_SYNTHASE.left}
              y={88}
              width={ATP_SYNTHASE.right - ATP_SYNTHASE.left}
              height={47}
              rx={4}
              className="fill-emerald-200 stroke-emerald-600 dark:fill-emerald-900 dark:stroke-emerald-400"
              strokeWidth={1.5}
            />
            <g
              className={MOTION}
              style={{ transform: svgTransform({ x: ATP_SYNTHASE.head.x, y: ATP_SYNTHASE.head.y, angle: step === 4 ? 360 : 0 }) }}
            >
              <circle r={ATP_SYNTHASE.head.r} className="fill-emerald-300 stroke-emerald-700 dark:fill-emerald-800 dark:stroke-emerald-300" strokeWidth={1.5} />
              {[0, 120, 240].map((a) => (
                <line
                  key={a}
                  x1={0}
                  y1={0}
                  x2={Math.round(11 * Math.cos((a * Math.PI) / 180) * 100) / 100}
                  y2={Math.round(11 * Math.sin((a * Math.PI) / 180) * 100) / 100}
                  className="stroke-emerald-800 dark:stroke-emerald-200"
                  strokeWidth={1.5}
                />
              ))}
            </g>
            <text x={232} y={153} textAnchor="end" className="fill-emerald-800 text-[10px] font-semibold dark:fill-emerald-300">
              ATP synthase
            </text>

            {/* Matrix labels. */}
            <text x={40} y={172} textAnchor="middle" className="fill-foreground text-[10px] font-medium">
              NADH → NAD⁺
            </text>
            <text
              x={OXYGEN.x}
              y={174}
              textAnchor="middle"
              className={`fill-foreground text-[10px] font-medium ${MOTION}`}
              style={{ opacity: step >= 2 ? 0 : 1 }}
            >
              O₂
            </text>
            <text
              x={OXYGEN.x}
              y={174}
              textAnchor="middle"
              className={`fill-foreground text-[10px] font-medium ${MOTION}`}
              style={{ opacity: step >= 2 ? 1 : 0 }}
            >
              ½O₂ + 2H⁺ → H₂O
            </text>
            <text
              x={ATP_SYNTHASE.x}
              y={216}
              textAnchor="middle"
              className={`fill-emerald-800 text-[10px] font-semibold dark:fill-emerald-300 ${MOTION}`}
              style={{ opacity: step === 4 ? 1 : 0 }}
            >
              ADP + Pi → ATP
            </text>

            {/* Background H⁺: many in the intermembrane space, few in the matrix. */}
            {IMS_BACKGROUND.map((p) => (
              <Proton key={`bg-${p.x}-${p.y}`} x={p.x} y={p.y} faint />
            ))}
            <Proton x={110} y={196} faint />

            {/* The pumped protons. */}
            {([0, 1, 2] as const).map((k) => {
              const p = protonPose(k, step);
              return <Proton key={`h-${k}`} x={p.x} y={p.y} moving />;
            })}

            {/* The electron pair. */}
            <g className={MOTION} style={{ transform: svgTransform({ x: e.x, y: e.y }), opacity: e.opacity }}>
              <circle r={8} className="fill-amber-300 stroke-amber-700 dark:fill-amber-600 dark:stroke-amber-300" strokeWidth={1} />
              <text y={3.5} textAnchor="middle" className="fill-amber-950 text-[10px] font-bold dark:fill-amber-50">
                e⁻
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
