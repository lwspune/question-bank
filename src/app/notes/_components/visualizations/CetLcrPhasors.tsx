"use client";

/**
 * Animation: the voltages of a series LCR circuit added as phasors (concept
 * cetp-phasor-voltages). The current is the reference, so V_R lies along it,
 * V_L stands 90° ahead and V_C 90° behind. V_L and V_C point opposite ways, so
 * they combine to V_L − V_C, and the supply voltage is the hypotenuse of V_R
 * and V_L − V_C, at the phase angle φ ahead of the current.
 *
 * Drawn with the concept's worked example: V_R = 30 V, V_L = 90 V, V_C = 50 V,
 * so V_L − V_C = 40 V and V = √(30² + 40²) = 50 V, tan φ = 40/30, φ ≈ 53°.
 * Each arrow is one stretched line plus a head, moved only by style.transform
 * (svgTransform), so the arrows slide between steps. Pinned by
 * tests/notes-cet-visuals-phys-c.test.ts.
 */
import type { ReactNode } from "react";
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The concept's worked example, in volts. */
export const LCR_EXAMPLE = { VR: 30, VL: 90, VC: 50 } as const;

/** Supply voltage V = √(V_R² + (V_L − V_C)²). */
export function supplyVoltage(VR: number, VL: number, VC: number): number {
  return Math.hypot(VR, VL - VC);
}

/** Phase angle of the supply voltage ahead of the current, in degrees (negative = behind). */
export function phaseAngleDeg(VR: number, VL: number, VC: number): number {
  return (Math.atan2(VL - VC, VR) * 180) / Math.PI;
}

export const LCR_STEPS: readonly FigureStep[] = [
  {
    title: "The resistor's voltage, along the current",
    caption: "The current is the same in R, L and C, so it is the reference. The voltage across the resistor, 30 V, is in phase with it.",
  },
  {
    title: "The inductor's voltage, 90° ahead",
    caption: "The voltage across the inductor, 90 V, leads the current by 90°, so its arrow stands straight up.",
  },
  {
    title: "The capacitor's voltage, 90° behind",
    caption: "The voltage across the capacitor, 50 V, lags the current by 90°, so its arrow points straight down, opposite to the inductor's.",
  },
  {
    title: "Combine the inductor and capacitor voltages",
    caption: "They are 180° apart, so they cancel in part: 90 − 50 = 40 V, still upward because the inductor's is larger.",
  },
  {
    title: "The resultant V",
    caption:
      "The supply voltage is the hypotenuse: V = √(30² + 40²) = 50 V, not 30 + 90 + 50. tan φ = 40/30, so φ ≈ 53°, the voltage leading the current.",
  },
];

// Geometry (viewBox units).
export const ORIGIN = { x: 70, y: 148 } as const;
/** viewBox units per volt. */
export const SCALE = 1.4;

export type ArrowPose = { x: number; y: number; angle: number; len: number; opacity: number };
export type PhasorName = "VR" | "VL" | "VC" | "NET" | "V";

const NET = LCR_EXAMPLE.VL - LCR_EXAMPLE.VC;
const PHI = phaseAngleDeg(LCR_EXAMPLE.VR, LCR_EXAMPLE.VL, LCR_EXAMPLE.VC);
const V = supplyVoltage(LCR_EXAMPLE.VR, LCR_EXAMPLE.VL, LCR_EXAMPLE.VC);

/**
 * Where each phasor arrow sits at a step: tail (x, y), screen angle in degrees
 * (SVG sense: 0 = along the current, −90 = straight up, 90 = straight down),
 * length in viewBox units and opacity.
 */
export function phasorPose(name: PhasorName, step: number): ArrowPose {
  const o = ORIGIN;
  switch (name) {
    case "VR":
      return { x: o.x, y: o.y, angle: 0, len: LCR_EXAMPLE.VR * SCALE, opacity: 1 };
    case "VL":
      return { x: o.x, y: o.y, angle: -90, len: LCR_EXAMPLE.VL * SCALE, opacity: step < 1 ? 0 : step >= 3 ? 0.3 : 1 };
    case "VC":
      // In step 3 its tail moves to V_L's tip, so the 50 V is seen taken off the 90 V.
      return step === 3
        ? { x: o.x + 12, y: o.y - LCR_EXAMPLE.VL * SCALE, angle: 90, len: LCR_EXAMPLE.VC * SCALE, opacity: 1 }
        : { x: o.x, y: o.y, angle: 90, len: LCR_EXAMPLE.VC * SCALE, opacity: step < 2 ? 0 : step >= 4 ? 0.3 : 1 };
    case "NET":
      // V_L − V_C: at the origin in step 3, then moved to the tip of V_R to close the triangle.
      return step >= 4
        ? { x: o.x + LCR_EXAMPLE.VR * SCALE, y: o.y, angle: -90, len: NET * SCALE, opacity: 1 }
        : { x: o.x, y: o.y, angle: -90, len: NET * SCALE, opacity: step === 3 ? 1 : 0 };
    case "V":
      return { x: o.x, y: o.y, angle: -PHI, len: V * SCALE, opacity: step >= 4 ? 1 : 0 };
  }
}

/** Screen position of an arrow's tip. */
export function tipOf(p: ArrowPose): { x: number; y: number } {
  const t = (p.angle * Math.PI) / 180;
  return { x: p.x + p.len * Math.cos(t), y: p.y + p.len * Math.sin(t) };
}

const TONES = {
  VR: { stroke: "stroke-amber-600 dark:stroke-amber-400", fill: "fill-amber-600 dark:fill-amber-400", text: "fill-amber-700 dark:fill-amber-300" },
  VL: { stroke: "stroke-sky-600 dark:stroke-sky-400", fill: "fill-sky-600 dark:fill-sky-400", text: "fill-sky-700 dark:fill-sky-300" },
  VC: { stroke: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-600 dark:fill-rose-400", text: "fill-rose-700 dark:fill-rose-300" },
  NET: { stroke: "stroke-violet-600 dark:stroke-violet-400", fill: "fill-violet-600 dark:fill-violet-400", text: "fill-violet-700 dark:fill-violet-300" },
  V: { stroke: "stroke-emerald-600 dark:stroke-emerald-400", fill: "fill-emerald-600 dark:fill-emerald-400", text: "fill-emerald-700 dark:fill-emerald-300" },
} as const;

/** "V" with a subscript, for SVG text. */
function Vsub({ s }: { s: string }) {
  return (
    <>
      V<tspan dy={3} className="text-[8px]">{s}</tspan>
      <tspan dy={-3}> </tspan>
    </>
  );
}

function Phasor({ name, step, label, labelAt }: { name: PhasorName; step: number; label: ReactNode; labelAt: { dx: number; dy: number } }) {
  const p = phasorPose(name, step);
  const tip = tipOf(p);
  const tone = TONES[name];
  return (
    <g className={MOTION} style={{ opacity: p.opacity }}>
      <line
        x1={0}
        y1={0}
        x2={1}
        y2={0}
        vectorEffect="non-scaling-stroke"
        strokeWidth={3}
        className={`${tone.stroke} ${MOTION}`}
        style={{ transform: svgTransform({ x: p.x, y: p.y, angle: p.angle, sx: p.len - 6 }) }}
      />
      <polygon points="0,0 -9,-5 -9,5" className={`${tone.fill} ${MOTION}`} style={{ transform: svgTransform({ x: tip.x, y: tip.y, angle: p.angle }) }} />
      <g className={MOTION} style={{ transform: svgTransform({ x: tip.x + labelAt.dx, y: tip.y + labelAt.dy }) }}>
        <text className={`${tone.text} text-[11px] font-semibold`}>{label}</text>
      </g>
    </g>
  );
}

/**
 * The picture's own heading for each step, drawn with real subscripts. The step
 * titles above are plain text (step list, print), so they use words instead.
 */
export const LCR_HEADINGS = ["V_R along the current", "V_L 90° ahead", "V_C 90° behind", "Combine V_L − V_C", "The resultant V"] as const;

/** Draws "V_R" in a heading as V with a subscript R. */
function withSubscripts(title: string): ReactNode[] {
  return title.split(/(V_[A-Z])/).map((part, i) =>
    /^V_[A-Z]$/.test(part) ? <Vsub key={i} s={part[2]} /> : part.trim() === "" ? null : <tspan key={i}>{part.replace(/^ /, "")}</tspan>,
  );
}

const ARC_R = 22;

export default function CetLcrPhasors() {
  const phiRad = (PHI * Math.PI) / 180;
  const arcEnd = { x: Math.round((ORIGIN.x + ARC_R * Math.cos(phiRad)) * 100) / 100, y: Math.round((ORIGIN.y - ARC_R * Math.sin(phiRad)) * 100) / 100 };
  return (
    <StepFigure
      title="Animation · series LCR voltages added as phasors"
      label="Phasor diagram of a series LCR circuit: the resistor voltage, 30 V, along the current, the inductor voltage, 90 V, up and the capacitor voltage, 50 V, down. They combine to 40 V upward, and the supply voltage is the hypotenuse, 50 V, leading the current by about 53 degrees."
      viewBox="0 0 320 232"
      steps={LCR_STEPS}
      note="Lengths are to scale. Up is 90° ahead of the current, down is 90° behind."
    >
      {(step) => (
        <g>
          <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
            {withSubscripts(LCR_HEADINGS[step])}
          </text>

          {/* The current: the reference direction */}
          <line x1={ORIGIN.x - 62} y1={ORIGIN.y} x2={ORIGIN.x + 90} y2={ORIGIN.y} strokeDasharray="4 4" className="stroke-muted-foreground" />
          <text x={8} y={ORIGIN.y - 5} className="fill-muted-foreground text-[10px]">
            current I
          </text>
          <line x1={ORIGIN.x} y1={ORIGIN.y - 134} x2={ORIGIN.x} y2={ORIGIN.y + 76} strokeDasharray="2 4" className="stroke-border" />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={2.5} className="fill-foreground" />

          {/* φ, between the current and V */}
          <g className={MOTION} style={{ opacity: step >= 4 ? 1 : 0 }}>
            <path
              d={`M ${ORIGIN.x + ARC_R} ${ORIGIN.y} A ${ARC_R} ${ARC_R} 0 0 0 ${arcEnd.x} ${arcEnd.y}`}
              fill="none"
              strokeWidth={1.5}
              className="stroke-emerald-600 dark:stroke-emerald-400"
            />
            <text x={ORIGIN.x + ARC_R + 4} y={ORIGIN.y - 6} className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
              φ
            </text>
          </g>

          <Phasor name="VR" step={step} label={<><Vsub s="R" />30 V</>} labelAt={{ dx: -30, dy: 16 }} />
          <Phasor name="VL" step={step} label={<><Vsub s="L" />90 V</>} labelAt={{ dx: -48, dy: 4 }} />
          <Phasor name="VC" step={step} label={<><Vsub s="C" />50 V</>} labelAt={{ dx: step === 3 ? 6 : -48, dy: step === 3 ? -4 : 6 }} />
          <Phasor name="NET" step={step} label={<>40 V</>} labelAt={{ dx: 6, dy: 12 }} />
          <Phasor name="V" step={step} label={<>V = 50 V</>} labelAt={{ dx: -24, dy: -8 }} />

          {/* The arithmetic, line by line as the steps add it */}
          <g className="text-[11px] tabular-nums">
            <text x={176} y={50} className="fill-amber-700 dark:fill-amber-300">
              <Vsub s="R" />= 30 V
            </text>
            <text x={176} y={68} className={`fill-sky-700 dark:fill-sky-300 ${MOTION}`} style={{ opacity: step >= 1 ? 1 : 0 }}>
              <Vsub s="L" />= 90 V (ahead)
            </text>
            <text x={176} y={86} className={`fill-rose-700 dark:fill-rose-300 ${MOTION}`} style={{ opacity: step >= 2 ? 1 : 0 }}>
              <Vsub s="C" />= 50 V (behind)
            </text>
            <text x={176} y={110} className={`fill-violet-700 dark:fill-violet-300 ${MOTION}`} style={{ opacity: step >= 3 ? 1 : 0 }}>
              90 − 50 = 40 V
            </text>
            <g className={MOTION} style={{ opacity: step >= 4 ? 1 : 0 }}>
              <text x={176} y={134} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
                V = √(30² + 40²) = 50 V
              </text>
              <text x={176} y={152} className="fill-emerald-700 dark:fill-emerald-300">
                tan φ = 40/30, φ ≈ {PHI.toFixed(0)}°
              </text>
              <text x={176} y={170} className="fill-muted-foreground">
                not 30 + 90 + 50 = 170 V
              </text>
            </g>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
