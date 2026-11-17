"use client";

/**
 * Animation: the polymerase chain reaction, for the IMAT concept "The
 * polymerase chain reaction (PCR)". One cycle's three steps at the concept's
 * temperatures (denaturation about 95 °C, annealing about 50 to 65 °C,
 * extension about 72 °C), then the copies doubling 1 → 2 → 4 → 8, N = N₀ × 2ⁿ.
 *
 * The two parent strands move apart as one shape each; the DNA primers drop
 * onto the 3′ end of each template; Taq polymerase extends each primer 5′→3′
 * (a unit line stretched to length). Below, one small double helix per copy
 * fades in as the cycles go by.
 *
 * tests/notes-imat-visuals-biomol.test.ts pins the temperatures (annealing is
 * the coolest step), the doubling and the concept's worked numbers.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const PCR_STEPS: readonly FigureStep[] = [
  {
    title: "The target DNA",
    caption:
      "The tube holds the template DNA, two DNA primers, free nucleotides (dNTPs) and heat-stable Taq polymerase. We start from 1 copy.",
  },
  {
    title: "Denaturation, about 95 °C",
    caption: "Heat breaks the hydrogen bonds and the two strands separate. No helicase is needed.",
  },
  {
    title: "Annealing, about 50 to 65 °C",
    caption:
      "The tube is cooled, the coolest step of the cycle, and each primer pairs with its complementary sequence at the 3′ end of one strand.",
  },
  {
    title: "Extension, about 72 °C",
    caption:
      "Taq polymerase adds nucleotides to the 3′ end of each primer, copying the template. After one cycle: 2 copies.",
  },
  {
    title: "Cycle 2",
    caption: "The same three steps again. Every strand present is copied, so 2 copies become 4.",
  },
  {
    title: "Cycle 3",
    caption: "Each cycle doubles the number of copies: after n cycles, N = N₀ × 2ⁿ. Here 2³ = 8.",
  },
];

export type PcrStage = { name: string; label: string; min: number; max: number };

/** The three steps of one cycle, with the concept's temperatures in °C. */
export const STAGES: readonly PcrStage[] = [
  { name: "Denaturation", label: "about 95 °C", min: 95, max: 95 },
  { name: "Annealing", label: "50 to 65 °C", min: 50, max: 65 },
  { name: "Extension", label: "about 72 °C", min: 72, max: 72 },
];

/** Copies after n cycles of ideal doubling: N = N₀ × 2ⁿ. */
export function copies(n0: number, n: number): number {
  return n0 * 2 ** n;
}

/** Cycles completed by each step (one cycle ends with extension). */
export const CYCLES_DONE: readonly number[] = [0, 0, 0, 1, 2, 3];

/** Which stage box is lit at each step (null = none; "all" once the cycle repeats). */
export const ACTIVE_STAGE: readonly (number | "all" | null)[] = [null, 0, 1, 2, "all", "all"];

const SUP = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];

export function countLabel(step: number): string {
  const n = CYCLES_DONE[step];
  if (n === 0) return "Start: N₀ = 1 copy";
  return `After ${n} cycle${n === 1 ? "" : "s"}: 2${SUP[n]} = ${copies(1, n)} copies`;
}

const X0 = 60;
const X1 = 260;
const PRIMER = 24;
/** Parent strands: y when paired, y when separated. */
const TOP = { paired: 86, apart: 72 };
const BOTTOM = { paired: 98, apart: 114 };
/** New strands sit 8 units inside their templates. */
const NEW_TOP_Y = TOP.apart + 8;
const NEW_BOTTOM_Y = BOTTOM.apart - 8;

const TEMPLATE = "stroke-slate-500 dark:stroke-slate-400";
const NEW = "stroke-sky-500 dark:stroke-sky-400";
const PRIMER_CLS = "stroke-amber-500 dark:stroke-amber-400";
const END = "fill-muted-foreground text-[10px] font-semibold";

function Stretch({ x, y, angle, len, on, className }: { x: number; y: number; angle: number; len: number; on: boolean; className: string }) {
  return (
    <line
      x1={0}
      y1={0}
      x2={1}
      y2={0}
      vectorEffect="non-scaling-stroke"
      strokeWidth={3}
      strokeLinecap="round"
      className={`${className} ${MOTION}`}
      style={{ transform: svgTransform({ x, y, angle, sx: on ? len : 0.01 }), opacity: on ? 1 : 0 }}
    />
  );
}

/** The picture for one step. */
export function PcrScene({ step }: { step: number }) {
  const apart = step >= 1;
  const annealed = step >= 2;
  const extended = step >= 3;
  const active = ACTIVE_STAGE[step];
  const n = copies(1, CYCLES_DONE[step]);
  const rungs = Array.from({ length: 17 }, (_, k) => 64 + k * 12);

  return (
    <g>
      {/* The three steps of a cycle, the current one lit. */}
      {STAGES.map((s, k) => {
        const lit = active === "all" || active === k;
        const x = 8 + k * 104;
        return (
          <g key={s.name} className={MOTION} style={{ opacity: lit ? 1 : 0.35 }}>
            <rect x={x} y={24} width={100} height={32} rx={6} strokeWidth={1.5} className="fill-orange-100 stroke-orange-500 dark:fill-orange-900/40 dark:stroke-orange-400" />
            <text x={x + 50} y={37} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {s.name}
            </text>
            <text x={x + 50} y={50} textAnchor="middle" className="fill-orange-700 text-[10px] dark:fill-orange-300">
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Base pairs of the target, broken by the heat. */}
      {rungs.map((x) => (
        <line
          key={x}
          x1={x}
          y1={TOP.paired}
          x2={x}
          y2={BOTTOM.paired}
          strokeWidth={1.5}
          className={`stroke-slate-300 dark:stroke-slate-600 ${MOTION}`}
          style={{ opacity: apart ? 0 : 1 }}
        />
      ))}

      {/* The two parent strands, each one shape with its 5′ and 3′ ends. */}
      {[
        { y: apart ? TOP.apart : TOP.paired, left: "5′", right: "3′", key: "top" },
        { y: apart ? BOTTOM.apart : BOTTOM.paired, left: "3′", right: "5′", key: "bottom" },
      ].map((s) => (
        <g key={s.key} className={MOTION} style={{ transform: svgTransform({ x: 0, y: s.y }) }}>
          <line x1={X0} y1={0} x2={X1} y2={0} strokeWidth={3} strokeLinecap="round" className={TEMPLATE} />
          <text x={X0 - 12} y={0} textAnchor="middle" dominantBaseline="central" className={END}>
            {s.left}
          </text>
          <text x={X1 + 12} y={0} textAnchor="middle" dominantBaseline="central" className={END}>
            {s.right}
          </text>
        </g>
      ))}

      {/* Primers drop onto the 3′ end of each template. */}
      <Stretch x={X1} y={annealed ? NEW_TOP_Y : NEW_TOP_Y + 12} angle={180} len={PRIMER} on={annealed} className={PRIMER_CLS} />
      <Stretch x={X0} y={annealed ? NEW_BOTTOM_Y : NEW_BOTTOM_Y - 12} angle={0} len={PRIMER} on={annealed} className={PRIMER_CLS} />
      {/* New DNA grows from each primer's 3′ end. */}
      <Stretch x={X1 - PRIMER} y={NEW_TOP_Y} angle={180} len={X1 - X0 - PRIMER} on={extended} className={NEW} />
      <Stretch x={X0 + PRIMER} y={NEW_BOTTOM_Y} angle={0} len={X1 - X0 - PRIMER} on={extended} className={NEW} />

      {/* Taq polymerase at each growing 3′ end. */}
      {[
        { from: { x: X1 - PRIMER, y: NEW_TOP_Y }, to: { x: X0 + 4, y: NEW_TOP_Y } },
        { from: { x: X0 + PRIMER, y: NEW_BOTTOM_Y }, to: { x: X1 - 4, y: NEW_BOTTOM_Y } },
      ].map((t, k) => (
        <ellipse
          key={k}
          cx={0}
          cy={0}
          rx={8}
          ry={6}
          className={`fill-emerald-500 dark:fill-emerald-400 ${MOTION}`}
          style={{ transform: svgTransform(step === 3 ? t.to : t.from), opacity: step === 3 ? 0.9 : 0 }}
        />
      ))}
      <text x={X1} y={130} textAnchor="end" className={`fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 ${MOTION}`} style={{ opacity: step === 3 ? 1 : 0 }}>
        Taq polymerase
      </text>
      <text x={(X0 + X1) / 2} y={93} textAnchor="middle" dominantBaseline="central" className={`fill-amber-700 text-[10px] font-semibold dark:fill-amber-300 ${MOTION}`} style={{ opacity: step === 2 ? 1 : 0 }}>
        DNA primers
      </text>
      <text x={(X0 + X1) / 2} y={93} textAnchor="middle" dominantBaseline="central" className={`fill-sky-700 text-[10px] font-semibold dark:fill-sky-300 ${MOTION}`} style={{ opacity: step === 3 ? 1 : 0 }}>
        2 copies, each half old, half new
      </text>

      {/* Copies so far. */}
      <line x1={8} y1={144} x2={312} y2={144} strokeWidth={1} className="stroke-border" />
      <text x={160} y={160} textAnchor="middle" className="fill-muted-foreground text-[11px]">
        Copies: N = N₀ × 2ⁿ
      </text>
      {Array.from({ length: 8 }, (_, k) => {
        const x = 18 + k * 37;
        return (
          <g key={k} className={MOTION} style={{ opacity: k < n ? 1 : 0.12 }}>
            <line x1={x} y1={176} x2={x + 28} y2={176} strokeWidth={3} strokeLinecap="round" className={TEMPLATE} />
            <line x1={x} y1={184} x2={x + 28} y2={184} strokeWidth={3} strokeLinecap="round" className={TEMPLATE} />
          </g>
        );
      })}
      <text x={160} y={210} textAnchor="middle" className="fill-sky-700 text-[12px] font-semibold dark:fill-sky-300">
        {countLabel(step)}
      </text>

      <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {PCR_STEPS[step].title}
      </text>
    </g>
  );
}

export default function ImatPcrCycles() {
  return (
    <StepFigure
      title="Animation · PCR: one cycle, then doubling"
      label="One PCR cycle, denaturation at about 95 °C, annealing at 50 to 65 °C and extension at about 72 °C, then the number of copies doubling from 1 to 2, 4 and 8"
      viewBox="0 0 320 218"
      steps={PCR_STEPS}
      note="From 1 copy, 25 cycles give 2²⁵ = 33 554 432 copies, about 3.4 × 10⁷ (ideal doubling)."
    >
      {(step) => <PcrScene step={step} />}
    </StepFigure>
  );
}
