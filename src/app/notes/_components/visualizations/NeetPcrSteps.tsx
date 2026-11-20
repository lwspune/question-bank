"use client";

/**
 * Animation: one cycle of PCR, in the NEET concept's own terms
 * (nzobp-pcr-steps).
 *
 * The genomic DNA is the template. Denaturation: heat separates its two
 * strands (the thermostable polymerase from Thermus aquaticus stays active).
 * Annealing: the two primers bind to the separated strands, one at each end of
 * the stretch to be copied. Extension: Taq polymerase extends each primer with
 * deoxynucleotides along the stretch. Repeated many times, the stretch is
 * amplified about a billion times. No temperatures are given: the concept
 * states none.
 *
 * Each strand, primer, new strand and polymerase is one shape whose transform
 * or opacity changes between steps. The poses are exported and pinned by
 * tests/notes-w2-17.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const PCR_STEPS: readonly FigureStep[] = [
  {
    title: "The DNA to copy",
    caption: "Double-stranded genomic DNA, with the stretch to be copied marked. It is the template for the new strands.",
  },
  {
    title: "Denaturation",
    caption: "Heat separates the two strands of the DNA. The polymerase from Thermus aquaticus stays active at this high temperature.",
  },
  {
    title: "Annealing",
    caption: "The two primers bind to the separated strands, one at each end of the stretch.",
  },
  {
    title: "Extension",
    caption: "The thermostable DNA polymerase (Taq polymerase) extends each primer with deoxynucleotides, using the old strand as the template.",
  },
  {
    title: "Many cycles",
    caption:
      "One cycle gives two copies of the stretch. Denaturation, annealing and extension repeat many times, amplifying it about a billion times.",
  },
];

/** The three steps of each cycle, in order (the concept's table). */
export const CYCLE_ORDER = ["Denaturation", "Annealing", "Extension"] as const;

/** The stretch to be copied, between the two primer sites. */
export const STRETCH = { from: 60, to: 260 } as const;

/** Length of a primer along the strand. */
export const PRIMER_LENGTH = 34;

/** Height of each old strand: together at the start, apart from denaturation on. */
export function strandY(strand: "top" | "bottom", step: number): number {
  if (strand === "top") return step >= 1 ? 48 : 72;
  return step >= 1 ? 120 : 84;
}

/** Primers bind in annealing and stay. */
export function primerOpacity(step: number): number {
  return step >= 2 ? 1 : 0;
}

/** Each primer sits beside its strand, at one end of the stretch. */
export const PRIMERS = {
  top: { x: STRETCH.to - PRIMER_LENGTH, y: 60 },
  bottom: { x: STRETCH.from, y: 108 },
} as const;

/** The length of each new strand grown from its primer (0 before extension). */
export function newStrandLength(step: number): number {
  return step >= 3 ? STRETCH.to - STRETCH.from - PRIMER_LENGTH : 0;
}

export type Pose = { x: number; y: number; opacity: number };

/** The polymerase on each strand: at the primer before extension, at the far end of the stretch after. */
export function polymerasePose(strand: "top" | "bottom", step: number): Pose {
  const on = step >= 3;
  if (strand === "top") return { x: on ? STRETCH.from : PRIMERS.top.x, y: PRIMERS.top.y, opacity: on ? 1 : 0 };
  return { x: on ? STRETCH.to : PRIMERS.bottom.x + PRIMER_LENGTH, y: PRIMERS.bottom.y, opacity: on ? 1 : 0 };
}

/** Where the highlight sits on the bar of three steps (hidden at the start and in the last step). */
export const BAR_X = [62, 160, 258] as const;
export function barHighlight(step: number): { x: number; opacity: number } {
  if (step >= 1 && step <= 3) return { x: BAR_X[step - 1], opacity: 1 };
  return { x: BAR_X[0], opacity: 0 };
}

const OLD = "stroke-sky-700 dark:stroke-sky-300";
const NEW = "stroke-emerald-600 dark:stroke-emerald-400";
const PRIMER = "stroke-amber-500 dark:stroke-amber-400";

function OldStrand({ y, label, labelDy }: { y: number; label: string; labelDy: number }) {
  return (
    <g className={MOTION} style={{ transform: svgTransform({ x: 0, y }) }}>
      <line x1={24} y1={0} x2={296} y2={0} strokeWidth={3} strokeLinecap="round" className={OLD} />
      <text x={24} y={labelDy} className="fill-sky-800 text-[10px] dark:fill-sky-200">
        {label}
      </text>
    </g>
  );
}

function Polymerase({ pose }: { pose: Pose }) {
  return (
    <g className={MOTION} style={{ transform: svgTransform({ x: pose.x, y: pose.y }), opacity: pose.opacity }}>
      <ellipse rx={13} ry={7.5} className="fill-violet-200 stroke-violet-600 dark:fill-violet-900 dark:stroke-violet-300" strokeWidth={1.2} />
      <text y={3.5} textAnchor="middle" className="fill-violet-900 text-[10px] font-semibold dark:fill-violet-100">
        Taq
      </text>
    </g>
  );
}

export default function NeetPcrSteps() {
  return (
    <StepFigure
      title="Animation · the steps of PCR"
      label="Double-stranded DNA is heated so its strands separate (denaturation), two primers bind at the ends of the stretch (annealing), and Taq polymerase extends each primer into a new strand (extension). One cycle gives two copies; many cycles amplify the stretch about a billion times."
      viewBox="0 0 320 206"
      steps={PCR_STEPS}
      note="Each cycle runs denaturation, then annealing, then extension."
    >
      {(step) => {
        const len = newStrandLength(step);
        const hi = barHighlight(step);
        return (
          <g>
            <defs>
              <marker id="pcr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
              </marker>
            </defs>

            {/* The stretch to be copied. */}
            <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              stretch to be copied
            </text>
            <line x1={STRETCH.from} y1={22} x2={STRETCH.from} y2={134} strokeDasharray="3 3" strokeWidth={1} className="stroke-muted-foreground" />
            <line x1={STRETCH.to} y1={22} x2={STRETCH.to} y2={134} strokeDasharray="3 3" strokeWidth={1} className="stroke-muted-foreground" />

            {/* The two old strands (the template). */}
            <OldStrand y={strandY("top", step)} label="old strand" labelDy={-6} />
            <OldStrand y={strandY("bottom", step)} label="old strand" labelDy={14} />

            {/* Heat, in denaturation only. */}
            <text
              x={160}
              y={89}
              textAnchor="middle"
              className={`fill-rose-700 text-[11px] font-semibold dark:fill-rose-300 ${MOTION}`}
              style={{ opacity: step === 1 ? 1 : 0 }}
            >
              heat: strands separate
            </text>

            {/* New strands, grown from the primers in extension. */}
            <g
              className={MOTION}
              style={{
                transform: svgTransform({ x: PRIMERS.top.x, y: PRIMERS.top.y, angle: 180, sx: Math.max(len, 1) }),
                opacity: len > 0 ? 1 : 0,
              }}
            >
              <line x1={0} y1={0} x2={1} y2={0} strokeWidth={3} vectorEffect="non-scaling-stroke" className={NEW} />
            </g>
            <g
              className={MOTION}
              style={{
                transform: svgTransform({ x: PRIMERS.bottom.x + PRIMER_LENGTH, y: PRIMERS.bottom.y, sx: Math.max(len, 1) }),
                opacity: len > 0 ? 1 : 0,
              }}
            >
              <line x1={0} y1={0} x2={1} y2={0} strokeWidth={3} vectorEffect="non-scaling-stroke" className={NEW} />
            </g>

            {/* Primers, bound in annealing. */}
            <g className={MOTION} style={{ opacity: primerOpacity(step) }}>
              <line
                x1={PRIMERS.top.x}
                y1={PRIMERS.top.y}
                x2={PRIMERS.top.x + PRIMER_LENGTH}
                y2={PRIMERS.top.y}
                strokeWidth={4}
                strokeLinecap="round"
                className={PRIMER}
              />
              <line
                x1={PRIMERS.bottom.x}
                y1={PRIMERS.bottom.y}
                x2={PRIMERS.bottom.x + PRIMER_LENGTH}
                y2={PRIMERS.bottom.y}
                strokeWidth={4}
                strokeLinecap="round"
                className={PRIMER}
              />
              <text x={PRIMERS.top.x + PRIMER_LENGTH / 2} y={74} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
                primer
              </text>
              <text x={PRIMERS.bottom.x + PRIMER_LENGTH / 2} y={101} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
                primer
              </text>
            </g>
            <g className={MOTION} style={{ opacity: len > 0 ? 1 : 0 }}>
              <text x={140} y={74} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
                new strand
              </text>
              <text x={180} y={101} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
                new strand
              </text>
            </g>

            <Polymerase pose={polymerasePose("top", step)} />
            <Polymerase pose={polymerasePose("bottom", step)} />

            <text
              x={160}
              y={147}
              textAnchor="middle"
              className={`fill-foreground text-[10px] font-semibold ${MOTION}`}
              style={{ opacity: step >= 4 ? 1 : 0 }}
            >
              one cycle: two copies
            </text>

            {/* The three steps of a cycle, the current one marked. */}
            <rect
              x={-40}
              y={-11}
              width={80}
              height={17}
              rx={4}
              className={`fill-indigo-100 dark:fill-indigo-900 ${MOTION}`}
              style={{ transform: svgTransform({ x: hi.x, y: 170 }), opacity: hi.opacity }}
            />
            {CYCLE_ORDER.map((name, i) => (
              <text key={name} x={BAR_X[i]} y={173} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                {name}
              </text>
            ))}
            <line x1={98} y1={169} x2={124} y2={169} strokeWidth={1.2} markerEnd="url(#pcr-arrow)" className="stroke-muted-foreground" />
            <line x1={196} y1={169} x2={222} y2={169} strokeWidth={1.2} markerEnd="url(#pcr-arrow)" className="stroke-muted-foreground" />
            <g className={MOTION} style={{ opacity: step >= 4 ? 1 : 0 }}>
              <path
                d={`M ${BAR_X[2]} 180 Q ${BAR_X[2]} 192 210 192 L 110 192 Q ${BAR_X[0]} 192 ${BAR_X[0]} 182`}
                fill="none"
                strokeWidth={1.2}
                markerEnd="url(#pcr-arrow)"
                className="stroke-indigo-600 dark:stroke-indigo-300"
              />
              <text x={160} y={204} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
                many cycles: about a billion copies
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
