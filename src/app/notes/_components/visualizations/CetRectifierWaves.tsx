"use client";

/**
 * Animation: half-wave and full-wave rectification (concept cetp-rectifiers),
 * on the concept's worked example, a 60 Hz supply.
 *
 * Three traces share one time axis (two input cycles): the a.c. input, the
 * half-wave output and the full-wave output. Each half cycle is drawn as one
 * lobe whose style.transform scales it vertically about the axis:
 * - half-wave: the negative lobes are squashed to zero (the diode blocks
 *   them), leaving one pulse per cycle, so the output frequency stays f;
 * - full-wave: the negative lobes are turned over (scale −1 to 1), giving two
 *   pulses per cycle, so the output frequency is 2f.
 *
 * Shapes are pinned by tests/notes-cet-visuals-phys-a.test.ts: the outputs
 * are max(v, 0) and |v|, and 60 Hz gives 60 Hz and 120 Hz, as the concept says.
 */
import type { ReactNode } from "react";
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The concept's worked example: a 60 Hz supply. */
export const RECT_EXAMPLE = { f: 60 } as const;

export type Rectifier = "half" | "full";

/** Pulses of output per input cycle. */
export const PULSES_PER_CYCLE: Record<Rectifier, number> = { half: 1, full: 2 };

/** Output (ripple) frequency for an input of frequency f: f for half-wave, 2f for full-wave. */
export function outputFrequency(kind: Rectifier, f: number): number {
  return PULSES_PER_CYCLE[kind] * f;
}

/** Input a.c. of unit amplitude at time t, measured in cycles. */
export function inputAt(t: number): number {
  return Math.sin(2 * Math.PI * t);
}

/** Ideal rectifier outputs: half-wave passes only the positive halves, full-wave turns the negative halves over. */
export function outputAt(kind: Rectifier, t: number): number {
  const v = inputAt(t);
  return kind === "half" ? Math.max(v, 0) : Math.abs(v);
}

export const RECT_STEPS: readonly FigureStep[] = [
  {
    title: "Input a.c.",
    caption:
      "The a.c. input is positive for one half of each cycle and negative for the other. Here f = 60 Hz, so 60 cycles every second.",
  },
  {
    title: "Half-wave rectifier",
    caption:
      "A single diode conducts only on the positive halves. It blocks the negative halves, so the output is zero for them.",
  },
  {
    title: "Half-wave output",
    caption:
      "One pulse per cycle: the pulsating d.c. keeps the input frequency, f = 60 Hz.",
  },
  {
    title: "Full-wave rectifier",
    caption:
      "Two diodes with a centre-tapped transformer (or a bridge) pass both halves the same way round, so each negative half comes out positive.",
  },
  {
    title: "Full-wave output",
    caption:
      "Two pulses per cycle: the output is at twice the input frequency, 2f = 120 Hz. Answering 60 Hz for both rectifiers is the trap.",
  },
];

// Geometry (viewBox units).
export const CYCLES = 2;
const X0 = 28;
export const HALF_W = 68;
export const AMP = 22;
export const AXES = { input: 52, half: 128, full: 204 } as const;
const X_END = X0 + HALF_W * 2 * CYCLES;
const LOBES = Array.from({ length: CYCLES * 2 }, (_, i) => i);

const r2 = (n: number) => Math.round(n * 100) / 100;

/** A half-sine lobe from (0, 0) to (HALF_W, 0), drawn upwards (negative y). */
function lobePath(): string {
  const n = 16;
  const pts = Array.from({ length: n + 1 }, (_, k) => {
    const t = k / n;
    return `${r2(HALF_W * t)} ${r2(-AMP * Math.sin(Math.PI * t))}`;
  });
  return `M ${pts.join(" L ")}`;
}
const LOBE = lobePath();

export type LobePose = { sy: number; opacity: number };

/**
 * Vertical scale and opacity of lobe `i` (even = positive half, odd = negative
 * half) on an output trace at a step. The lobe is drawn pointing up, so
 * sy = 1 points it up, sy = −1 down (a negative half as in the input) and
 * about 0 squashes it flat onto the axis.
 */
export function lobePose(step: number, kind: Rectifier, i: number): LobePose {
  const negative = i % 2 === 1;
  const ownStep = kind === "half" ? 1 : 3;
  if (step < ownStep) return { sy: negative ? -1 : 1, opacity: 0.3 };
  if (!negative) return { sy: 1, opacity: 1 };
  return kind === "half" ? { sy: 0.05, opacity: 0 } : { sy: 1, opacity: 1 };
}

const LINE = "stroke-sky-600 dark:stroke-sky-400";
const OUT = "stroke-emerald-600 dark:stroke-emerald-400";

function Trace({
  axisY,
  label,
  freq,
  freqShown,
  children,
}: {
  axisY: number;
  label: string;
  freq: string;
  freqShown: boolean;
  children: ReactNode;
}) {
  return (
    <g>
      <text x={X0 - 22} y={axisY - AMP - 14} className="fill-foreground text-[11px] font-semibold">
        {label}
      </text>
      <text
        x={X_END}
        y={axisY - AMP - 14}
        textAnchor="end"
        className={`fill-indigo-700 text-[11px] font-semibold tabular-nums dark:fill-indigo-300 ${MOTION}`}
        style={{ opacity: freqShown ? 1 : 0 }}
      >
        {freq}
      </text>
      <line x1={X0 - 6} y1={axisY} x2={X_END + 8} y2={axisY} className="stroke-muted-foreground" strokeWidth={1} />
      <text x={X0 - 10} y={axisY + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px]">
        0
      </text>
      {children}
    </g>
  );
}

export default function CetRectifierWaves() {
  return (
    <StepFigure
      title="Animation · half-wave and full-wave rectifiers"
      label="An a.c. input wave of 60 hertz over two cycles. The half-wave output keeps only the positive halves, one pulse per cycle at 60 hertz. The full-wave output turns the negative halves positive, two pulses per cycle at 120 hertz."
      viewBox="0 0 320 232"
      steps={RECT_STEPS}
      note="Without a filter both outputs are pulsating d.c., not steady d.c. For steady d.c. the order is rectifier, then filter, then regulator."
    >
      {(step) => (
        <g>
          {/* Input */}
          <Trace axisY={AXES.input} label="Input a.c." freq="f = 60 Hz" freqShown>
            {LOBES.map((i) => (
              <path
                key={i}
                d={LOBE}
                fill="none"
                strokeWidth={2}
                className={LINE}
                style={{ transform: svgTransform({ x: X0 + i * HALF_W, y: AXES.input, sy: i % 2 ? -1 : 1 }) }}
              />
            ))}
          </Trace>

          {/* Outputs */}
          {(["half", "full"] as const).map((kind) => {
            const axisY = AXES[kind];
            const freqStep = kind === "half" ? 2 : 4;
            const shown = step >= freqStep;
            return (
              <Trace
                key={kind}
                axisY={axisY}
                label={kind === "half" ? "Half-wave output" : "Full-wave output"}
                freq={kind === "half" ? "1 pulse a cycle, 60 Hz" : "2 pulses a cycle, 120 Hz"}
                freqShown={shown}
              >
                {LOBES.map((i) => {
                  const negative = i % 2 === 1;
                  const pose = lobePose(step, kind, i);
                  const passes = kind === "full" || !negative;
                  const n = kind === "half" ? i / 2 + 1 : i + 1;
                  return (
                    <g key={i}>
                      <path
                        d={LOBE}
                        fill="none"
                        strokeWidth={2}
                        vectorEffect="non-scaling-stroke"
                        className={`${OUT} ${MOTION}`}
                        style={{
                          transform: svgTransform({ x: X0 + i * HALF_W, y: axisY, sy: pose.sy }),
                          opacity: pose.opacity,
                        }}
                      />
                      {passes && (
                        <text
                          x={X0 + i * HALF_W + HALF_W / 2}
                          y={axisY - AMP - 3}
                          textAnchor="middle"
                          className={`fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 ${MOTION}`}
                          style={{ opacity: shown ? 1 : 0 }}
                        >
                          {n}
                        </text>
                      )}
                      {kind === "half" && negative && (
                        <text
                          x={X0 + i * HALF_W + HALF_W / 2}
                          y={axisY + 13}
                          textAnchor="middle"
                          className={`fill-muted-foreground text-[10px] ${MOTION}`}
                          style={{ opacity: step >= 1 ? 1 : 0 }}
                        >
                          blocked
                        </text>
                      )}
                    </g>
                  );
                })}
              </Trace>
            );
          })}

          <text x={X_END} y={228} textAnchor="end" className="fill-muted-foreground text-[10px]">
            time (two input cycles) →
          </text>
        </g>
      )}
    </StepFigure>
  );
}
