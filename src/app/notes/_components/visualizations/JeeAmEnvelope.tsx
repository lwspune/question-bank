"use client";

import { useState } from "react";

/**
 * Interactive: an AM wave and its envelope (concept jpcomm-envelope). The wave
 * (A_c + A_m sin ω_m t) sin ω_c t swings between amplitudes A_max = A_c + A_m
 * and A_min = A_c − A_m, so μ = (A_max − A_min)/(A_max + A_min) = A_m/A_c.
 * The carrier is fixed at A_c = 7 V and a slider sets the message amplitude;
 * the first picture is the concept's worked example, A_m = 3 V: amplitudes
 * 10 V and 4 V, μ = 3/7 ≈ 0.43. Past A_m = 7 V (μ > 1) the figure says the
 * envelope no longer follows the message (over-modulation, from the
 * modulation-index concept on the same page). The carrier makes 20 cycles per
 * message cycle, for drawing only. Pinned by tests/notes-w2-02.test.ts.
 */

/** The worked example's carrier amplitude, V. */
export const A_C = 7;
export const DEFAULT_AM = 3;
export const AM_RANGE = { min: 0, max: 10, step: 0.5 } as const;
/** Carrier cycles per message cycle (drawing only). */
export const CYCLES_PER_MESSAGE = 20;
/** Message cycles drawn. */
export const MESSAGE_CYCLES = 2;

export const aMax = (am: number, ac: number = A_C) => ac + am;
export const aMin = (am: number, ac: number = A_C) => ac - am;
/** μ from the envelope, (A_max − A_min)/(A_max + A_min). */
export const muFromEnvelope = (max: number, min: number) => (max - min) / (max + min);

/** The AM wave at phase u of the message (u in message cycles). */
export function amWave(u: number, am: number, ac: number = A_C): number {
  return (ac + am * Math.sin(2 * Math.PI * u)) * Math.sin(2 * Math.PI * CYCLES_PER_MESSAGE * u);
}

/** The envelope's upper edge, A_c + A_m sin ω_m t. */
export function envelope(u: number, am: number, ac: number = A_C): number {
  return ac + am * Math.sin(2 * Math.PI * u);
}

// Plot geometry (viewBox units).
export const PLOT = { x0: 34, x1: 252, yMid: 104, vPerPx: 1 / 4.3 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (u: number) => r2(PLOT.x0 + (u / MESSAGE_CYCLES) * (PLOT.x1 - PLOT.x0));
const py = (v: number) => r2(PLOT.yMid - v / PLOT.vPerPx);

function pointsOf(f: (u: number) => number, samples: number): string {
  const out: string[] = [];
  for (let k = 0; k <= samples; k++) {
    const u = (k / samples) * MESSAGE_CYCLES;
    out.push(`${px(u)},${py(f(u))}`);
  }
  return out.join(" ");
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export default function JeeAmEnvelope() {
  const [am, setAm] = useState<number>(DEFAULT_AM);
  const max = aMax(am);
  const min = aMin(am);
  const mu = am / A_C;
  const over = mu > 1;
  const wave = pointsOf((u) => amWave(u, am), MESSAGE_CYCLES * CYCLES_PER_MESSAGE * 16);
  const upper = pointsOf((u) => envelope(u, am), 160);
  const lower = pointsOf((u) => -envelope(u, am), 160);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the largest and smallest amplitude of an AM wave
      </p>

      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label={`An amplitude-modulated wave with a 7 volt carrier and a ${fmt(am)} volt message. Its amplitude swings between ${fmt(max)} volts and ${fmt(min)} volts, following the message as its envelope. Modulation index ${mu.toFixed(2)}.`}
      >
        {/* Axes */}
        <line x1={PLOT.x0} y1={PLOT.yMid} x2={PLOT.x1} y2={PLOT.yMid} className="stroke-border" />
        <line x1={PLOT.x0} y1={py(17.5)} x2={PLOT.x0} y2={py(-17.5)} className="stroke-muted-foreground" />
        {[-10, 0, 10].map((v) => (
          <text key={v} x={PLOT.x0 - 4} y={py(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {v === -10 ? "−10" : v}
          </text>
        ))}
        <text x={4} y={12} className="fill-muted-foreground text-[10px]">
          voltage (V)
        </text>
        <text x={PLOT.x0} y={190} className="fill-muted-foreground text-[10px]">
          time →
        </text>

        {/* The wave and its envelope */}
        <polyline points={wave} fill="none" strokeWidth={0.9} className="stroke-sky-600 dark:stroke-sky-400" />
        <polyline points={upper} fill="none" strokeDasharray="4 3" strokeWidth={1.8} className="stroke-rose-600 dark:stroke-rose-400" />
        <polyline points={lower} fill="none" strokeDasharray="4 3" strokeWidth={1.8} className="stroke-rose-600 dark:stroke-rose-400" />

        {/* A_max and A_min, labelled to the right of the plot */}
        <line x1={PLOT.x0} y1={py(max)} x2={PLOT.x1 + 4} y2={py(max)} strokeDasharray="1 3" className="stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={PLOT.x1 + 8} y={py(max) + 3.5} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 tabular-nums">
          Aₘₐₓ {fmt(max)} V
        </text>
        {!over && (
          <>
            <line x1={PLOT.x0} y1={py(min)} x2={PLOT.x1 + 4} y2={py(min)} strokeDasharray="1 3" className="stroke-amber-600 dark:stroke-amber-400" />
            <text x={PLOT.x1 + 8} y={Math.max(py(min) + 3.5, py(max) + 15.5)} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300 tabular-nums">
              Aₘᵢₙ {fmt(min)} V
            </text>
          </>
        )}
        {over && (
          <text x={316} y={190} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
            μ above 1: over-modulation
          </text>
        )}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Message amplitude: <span className="tabular-nums">{fmt(am)} V</span> (carrier 7 V)
        </span>
        <input
          type="range"
          min={AM_RANGE.min}
          max={AM_RANGE.max}
          step={AM_RANGE.step}
          value={am}
          onChange={(e) => setAm(Number(e.target.value))}
          className="accent-rose-600"
          aria-label="Amplitude of the message, in volts"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="font-medium text-foreground">
          Aₘₐₓ = 7 + {fmt(am)} = {fmt(max)} V, Aₘᵢₙ = 7 − {fmt(am)} = {fmt(min)} V
        </p>
        <p className={over ? "font-medium text-rose-700 dark:text-rose-300" : "text-muted-foreground"}>
          μ = ({fmt(max)} − {fmt(min)})/({fmt(max)} + {fmt(min)}) = {mu.toFixed(2)}
          {over ? ": over-modulation, the envelope no longer follows the message" : ""}
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The dashed envelope is the message riding on the carrier. Its average, (Aₘₐₓ + Aₘᵢₙ)/2, is the carrier; half its difference is the
        message. Not Aₘₐₓ/Aₘᵢₙ: that is (1 + μ)/(1 − μ), a different number (10/4 for the 3 V message).
      </p>
    </div>
  );
}
