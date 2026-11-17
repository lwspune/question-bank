"use client";

/**
 * Animation: one replication fork, for the IMAT concept "Leading and lagging
 * strands and Okazaki fragments". Helicase opens the helix; primase lays RNA
 * primers; DNA polymerase builds the leading strand continuously towards the
 * fork and the lagging strand in Okazaki fragments, each growing away from the
 * fork; DNA polymerase I replaces the primers and DNA ligase joins the pieces.
 *
 * Each parent strand is an "arm": a group turned about the fork, so opening the
 * helix is one rotation. Everything built on a strand lives inside its arm, in
 * the arm's own coordinates (distance from the fork along the strand), so the
 * geometry the tests pin is in those coordinates too. New strands grow with the
 * stretch trick (a unit line scaled to its length).
 *
 * The 5′ and 3′ ends of every strand are data (STRANDS), pinned by
 * tests/notes-imat-visuals-biomol.test.ts: every new strand runs antiparallel to
 * its template and grows 5′→3′, the leading one towards the fork, the lagging
 * pieces away from it.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const FORK_STEPS: readonly FigureStep[] = [
  {
    title: "The parent DNA",
    caption:
      "Replication starts at an origin. The two strands of the helix are antiparallel: where one has its 3′ end, the other has its 5′ end.",
  },
  {
    title: "Helicase opens the fork",
    caption:
      "Helicase breaks the hydrogen bonds between the bases and separates the strands, opening a replication fork.",
  },
  {
    title: "Primase makes RNA primers",
    caption:
      "DNA polymerase cannot start a strand, so primase lays short RNA primers: one at the origin for the leading strand, one for every fragment of the lagging strand.",
  },
  {
    title: "Leading strand",
    caption:
      "DNA polymerase adds nucleotides only to a 3′ end, so the new strand grows 5′→3′. On this template that is towards the fork, so the leading strand is made continuously.",
  },
  {
    title: "Lagging strand",
    caption:
      "On the other template, 5′→3′ points away from the fork, so the lagging strand is made in short Okazaki fragments, each started on its own primer.",
  },
  {
    title: "Fragments joined",
    caption:
      "DNA polymerase I replaces the RNA primers with DNA, and DNA ligase seals the gaps, joining the fragments into one strand.",
  },
];

/** Where the strands meet, and the two parent strands' points of origin. */
export const FORK = { x: 200, top: 104, bottom: 116 } as const;
/** Length of each parent strand from the fork to the left edge. */
export const ARM_LEN = 160;
/** Angle of each arm: closed (one straight helix) and open (the fork). */
export const ARM_ANGLE = { top: { closed: 180, open: 210 }, bottom: { closed: 180, open: 150 } } as const;

export type Arm = "top" | "bottom";
/** Distance of a new strand from its template, towards the inside of the fork, in arm coordinates. */
export const INSIDE: Record<Arm, number> = { top: -9, bottom: 9 };

/** A point given in an arm's coordinates (d along the strand from the fork, off sideways), in the picture's. */
export function armPoint(arm: Arm, d: number, off: number, open = true) {
  const angle = open ? ARM_ANGLE[arm].open : ARM_ANGLE[arm].closed;
  const rad = (angle * Math.PI) / 180;
  const ox = FORK.x;
  const oy = arm === "top" ? FORK.top : FORK.bottom;
  return {
    x: ox + d * Math.cos(rad) - off * Math.sin(rad),
    y: oy + d * Math.sin(rad) + off * Math.cos(rad),
  };
}

export type Strand = {
  id: string;
  arm: Arm;
  kind: "template" | "leading" | "okazaki";
  /** Where the 5′ end is, as distance from the fork along the arm. */
  five: number;
  /** Where the 3′ end is. */
  three: number;
};

/**
 * The strands, end to end. A template's ends are its far end (ARM_LEN) and the
 * fork side (0, where it carries on into the unopened helix on the right).
 * The top parent strand has its 3′ end at the far (left) end, the bottom one
 * its 5′ end there: antiparallel.
 */
export const STRANDS: readonly Strand[] = [
  { id: "top-template", arm: "top", kind: "template", five: 0, three: ARM_LEN },
  { id: "bottom-template", arm: "bottom", kind: "template", five: ARM_LEN, three: 0 },
  { id: "leading", arm: "top", kind: "leading", five: 158, three: 30 },
  { id: "okazaki-1", arm: "bottom", kind: "okazaki", five: 114, three: 158 },
  { id: "okazaki-2", arm: "bottom", kind: "okazaki", five: 72, three: 112 },
  { id: "okazaki-3", arm: "bottom", kind: "okazaki", five: 30, three: 70 },
];

/** Length of every RNA primer (it sits at the 5′ end of its new strand). */
export const PRIMER_LEN = 10;

/** Whether a new strand's DNA (beyond its primer) is drawn at a step. */
export function builtAt(s: Strand, step: number): boolean {
  if (s.kind === "leading") return step >= 3;
  if (s.kind === "okazaki") return step >= 4;
  return true;
}

const TEMPLATE = "stroke-slate-500 dark:stroke-slate-400";
const NEW_DNA = "stroke-sky-500 dark:stroke-sky-400";
const PRIMER = "stroke-amber-500 dark:stroke-amber-400";
const ENZYME_TEXT = "fill-indigo-700 text-[10px] dark:fill-indigo-300";
const END_TEXT = "fill-foreground text-[10px] font-semibold";

/** A segment from a to b along an arm (at side offset y), drawn as a stretched unit line. */
function Segment({ from, to, y, className, on, width = 3 }: { from: number; to: number; y: number; className: string; on: boolean; width?: number }) {
  const len = Math.abs(to - from);
  return (
    <line
      x1={0}
      y1={0}
      x2={1}
      y2={0}
      vectorEffect="non-scaling-stroke"
      strokeWidth={width}
      strokeLinecap="round"
      className={`${className} ${MOTION}`}
      style={{
        transform: svgTransform({ x: from, y, angle: to >= from ? 0 : 180, sx: on ? len : 0.01 }),
        opacity: on ? 1 : 0,
      }}
    />
  );
}

/** A label that slides with its arm: placed at an arm point, open or closed. */
function EndLabel({ arm, d, off, text, step, show }: { arm: Arm; d: number; off: number; text: string; step: number; show: boolean }) {
  const p = armPoint(arm, d, off, step >= 1);
  return (
    <text
      x={0}
      y={0}
      textAnchor="middle"
      dominantBaseline="central"
      className={`${END_TEXT} ${MOTION}`}
      style={{ transform: svgTransform({ x: p.x, y: p.y }), opacity: show ? 1 : 0 }}
    >
      {text}
    </text>
  );
}

/** The picture for one step. */
export function ForkScene({ step }: { step: number }) {
  const open = step >= 1;
  const arms: Arm[] = ["top", "bottom"];
  const rungsLeft = Array.from({ length: 16 }, (_, k) => 46 + k * 10);
  const rungsRight = Array.from({ length: 10 }, (_, k) => 206 + k * 10);
  const okazaki = STRANDS.filter((s) => s.kind === "okazaki");
  const leading = STRANDS.find((s) => s.kind === "leading")!;
  const polLead = armPoint("top", leading.three + 4, INSIDE.top);
  const polLag = armPoint("bottom", okazaki[2].three + 2, INSIDE.bottom);
  const ligaseAt = [okazaki[0].five - 1, okazaki[1].five - 1].map((d) => armPoint("bottom", d, INSIDE.bottom));
  const ligaseLabel = armPoint("bottom", 96, 36);
  const primaseAt = armPoint("bottom", okazaki[2].five + 5, INSIDE.bottom + 10);

  return (
    <g>
      {/* The unopened helix to the right of the fork, with its base pairs. */}
      {rungsRight.map((x) => (
        <line key={`r-${x}`} x1={x} y1={FORK.top} x2={x} y2={FORK.bottom} strokeWidth={1.5} className="stroke-slate-300 dark:stroke-slate-600" />
      ))}
      <line x1={FORK.x} y1={FORK.top} x2={300} y2={FORK.top} strokeWidth={3} strokeLinecap="round" className={TEMPLATE} />
      <line x1={FORK.x} y1={FORK.bottom} x2={300} y2={FORK.bottom} strokeWidth={3} strokeLinecap="round" className={TEMPLATE} />
      {/* Base pairs on the left: they exist only while the helix is closed. */}
      {rungsLeft.map((x) => (
        <line
          key={`l-${x}`}
          x1={x}
          y1={FORK.top}
          x2={x}
          y2={FORK.bottom}
          strokeWidth={1.5}
          className={`stroke-slate-300 dark:stroke-slate-600 ${MOTION}`}
          style={{ opacity: open ? 0 : 1 }}
        />
      ))}

      {/* The two arms: each parent strand and everything built on it. */}
      {arms.map((arm) => {
        const angle = open ? ARM_ANGLE[arm].open : ARM_ANGLE[arm].closed;
        const inside = INSIDE[arm];
        return (
          <g key={arm} className={MOTION} style={{ transform: svgTransform({ x: FORK.x, y: arm === "top" ? FORK.top : FORK.bottom, angle }) }}>
            <line x1={0} y1={0} x2={ARM_LEN} y2={0} strokeWidth={3} strokeLinecap="round" className={TEMPLATE} />
            {STRANDS.filter((s) => s.arm === arm && s.kind !== "template").map((s) => {
              const dir = s.three > s.five ? 1 : -1;
              const primerEnd = s.five + dir * PRIMER_LEN;
              return (
                <g key={s.id}>
                  <Segment from={primerEnd} to={s.three} y={inside} className={NEW_DNA} on={builtAt(s, step)} />
                  {/* The primer, then the DNA that replaces it. */}
                  <Segment from={s.five} to={primerEnd} y={inside} className={PRIMER} on={step >= 2 && step < 5} />
                  <Segment from={s.five} to={primerEnd} y={inside} className={NEW_DNA} on={step >= 5} />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Helicase at the fork. */}
      <circle cx={FORK.x + 4} cy={110} r={9} className={`fill-violet-500 dark:fill-violet-400 ${MOTION}`} style={{ opacity: open ? 0.9 : 0 }} />
      <text x={FORK.x + 12} y={94} className={`${ENZYME_TEXT} ${MOTION}`} style={{ opacity: open ? 1 : 0 }}>
        helicase
      </text>

      {/* Primase, laying the newest primer. */}
      <circle cx={primaseAt.x} cy={primaseAt.y} r={6} className={`fill-amber-500 dark:fill-amber-400 ${MOTION}`} style={{ opacity: step === 2 ? 0.9 : 0 }} />
      <text x={primaseAt.x - 8} y={primaseAt.y - 8} textAnchor="end" className={`${ENZYME_TEXT} ${MOTION}`} style={{ opacity: step === 2 ? 1 : 0 }}>
        primase
      </text>

      {/* DNA polymerase on each new strand. */}
      <ellipse
        cx={0}
        cy={0}
        rx={8}
        ry={6}
        className={`fill-emerald-500 dark:fill-emerald-400 ${MOTION}`}
        style={{
          transform: svgTransform(step >= 3 ? polLead : armPoint("top", leading.five - PRIMER_LEN, INSIDE.top)),
          opacity: step === 3 || step === 4 ? 0.9 : 0,
        }}
      />
      <text x={polLead.x - 8} y={polLead.y + 20} textAnchor="end" className={`${ENZYME_TEXT} ${MOTION}`} style={{ opacity: step === 3 || step === 4 ? 1 : 0 }}>
        DNA polymerase
      </text>
      <ellipse cx={polLag.x} cy={polLag.y} rx={8} ry={6} className={`fill-emerald-500 dark:fill-emerald-400 ${MOTION}`} style={{ opacity: step === 4 ? 0.9 : 0 }} />

      {/* DNA ligase sealing each gap between fragments. */}
      {ligaseAt.map((p) => (
        <circle key={`lig-${p.x}`} cx={p.x} cy={p.y} r={4.5} className={`fill-rose-500 dark:fill-rose-400 ${MOTION}`} style={{ opacity: step >= 5 ? 0.9 : 0 }} />
      ))}
      <text x={ligaseLabel.x} y={ligaseLabel.y} textAnchor="middle" className={`${ENZYME_TEXT} ${MOTION}`} style={{ opacity: step >= 5 ? 1 : 0 }}>
        DNA ligase
      </text>

      {/* Names of the new strands. */}
      {(() => {
        const lead = armPoint("top", 92, INSIDE.top - 12);
        const lag = armPoint("bottom", 56, -24);
        const primer = armPoint("bottom", 30, -16);
        return (
          <>
            <text x={lead.x} y={lead.y} textAnchor="middle" className={`fill-sky-700 text-[10px] font-semibold dark:fill-sky-300 ${MOTION}`} style={{ opacity: step >= 3 ? 1 : 0 }}>
              leading strand
            </text>
            <text x={lag.x} y={lag.y} className={`fill-sky-700 text-[10px] font-semibold dark:fill-sky-300 ${MOTION}`} style={{ opacity: step >= 4 ? 1 : 0 }}>
              {step >= 5 ? "lagging strand" : "Okazaki fragments"}
            </text>
            <text x={primer.x} y={primer.y} textAnchor="middle" className={`fill-amber-700 text-[10px] dark:fill-amber-300 ${MOTION}`} style={{ opacity: step >= 2 && step < 5 ? 1 : 0 }}>
              RNA primer
            </text>
          </>
        );
      })()}

      {/* 5′ and 3′ ends. Templates: at the far ends and on the right. */}
      <text x={310} y={FORK.top} textAnchor="middle" dominantBaseline="central" className={END_TEXT}>
        5′
      </text>
      <text x={310} y={FORK.bottom} textAnchor="middle" dominantBaseline="central" className={END_TEXT}>
        3′
      </text>
      <EndLabel arm="top" d={ARM_LEN + 6} off={step >= 1 ? 9 : 0} text="3′" step={step} show />
      <EndLabel arm="bottom" d={ARM_LEN + 6} off={step >= 1 ? -9 : 0} text="5′" step={step} show />
      {/* New strands, just past each end: the leading strand, the lagging strand's
          two ends, and the 5′ end of one Okazaki fragment while they are apart. */}
      <EndLabel arm="top" d={leading.five + 8} off={INSIDE.top - 4} text="5′" step={step} show={step >= 2} />
      <EndLabel arm="top" d={leading.three - 12} off={INSIDE.top} text="3′" step={step} show={step >= 3} />
      <EndLabel arm="bottom" d={okazaki[2].five - 8} off={INSIDE.bottom} text="5′" step={step} show={step >= 4} />
      <EndLabel arm="bottom" d={okazaki[0].three + 8} off={INSIDE.bottom + 4} text="3′" step={step} show={step >= 4} />
      <EndLabel arm="bottom" d={okazaki[0].five + 2} off={INSIDE.bottom + 10} text="5′" step={step} show={step === 4} />

      <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {FORK_STEPS[step].title}
      </text>
    </g>
  );
}

export default function ImatReplicationFork() {
  return (
    <StepFigure
      title="Animation · a replication fork, step by step"
      label="A replication fork: helicase opens the DNA, the leading strand is made continuously towards the fork and the lagging strand in Okazaki fragments away from it, which DNA ligase joins"
      viewBox="0 0 320 224"
      steps={FORK_STEPS}
      note="Grey: the parent strands. Blue: new DNA. Amber: RNA primers. Every new strand grows 5′→3′; none is ever built 3′→5′."
    >
      {(step) => <ForkScene step={step} />}
    </StepFigure>
  );
}
