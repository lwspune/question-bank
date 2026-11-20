"use client";

import { useState } from "react";

/**
 * Interactive: the resonance curve of a series LCR circuit (concept
 * cetp-resonance-behaviour). The current amplitude I = V/√(R² + (X_L − X_C)²)
 * is plotted against the supply frequency. It peaks at f₀ = 1/(2π√(LC)),
 * where X_L = X_C, Z = R and I = V/R. A slider sets R: f₀ does not move, but a
 * smaller R gives a taller, sharper peak.
 *
 * Numbers: the concept's worked example, R = 40 Ω on a 200 V supply (5 A at
 * resonance), with L = 0.4 H and C = 10 μF from the resonant-frequency example
 * on the same page (f₀ ≈ 79.6 Hz). Pinned by tests/notes-cet-visuals-phys-c.test.ts.
 */

/** Supply voltage (V), inductance (H) and capacitance (F). */
export const RES_CIRCUIT = { V: 200, L: 0.4, C: 10e-6 } as const;

/** The concept's worked example: R = 40 Ω. */
export const DEFAULT_R = 40;

/** Resistance slider, in ohms. */
export const R_RANGE = { min: 20, max: 200, step: 10 } as const;

/** Frequency axis, in hertz. */
export const F_AXIS = { min: 0, max: 160 } as const;
/** Current axis, in amperes (the peak at the smallest R, 200/20 = 10 A, just fits). */
export const I_AXIS_MAX = 10;

/** Resonant frequency f₀ = 1/(2π√(LC)), in hertz. */
export function resonantFrequency(L: number, C: number): number {
  return 1 / (2 * Math.PI * Math.sqrt(L * C));
}

/** Current amplitude I = V/√(R² + (X_L − X_C)²) at frequency f (Hz). */
export function currentAt(f: number, R: number, c: { V: number; L: number; C: number } = RES_CIRCUIT): number {
  if (f <= 0) return 0;
  const w = 2 * Math.PI * f;
  const XL = w * c.L;
  const XC = 1 / (w * c.C);
  return c.V / Math.sqrt(R * R + (XL - XC) ** 2);
}

/**
 * Width of the peak: the gap between the two frequencies where the current is
 * I_max/√2. For a series LCR circuit it is exactly R/(2πL).
 */
export function peakWidth(R: number, L: number = RES_CIRCUIT.L): number {
  return R / (2 * Math.PI * L);
}

// Plot geometry (viewBox units).
export const PLOT = { x0: 40, x1: 308, y0: 168, y1: 30 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (f: number) => r2(PLOT.x0 + ((f - F_AXIS.min) / (F_AXIS.max - F_AXIS.min)) * (PLOT.x1 - PLOT.x0));
const py = (i: number) => r2(PLOT.y0 - (i / I_AXIS_MAX) * (PLOT.y0 - PLOT.y1));

/** Polyline points of the curve for a resistance R. */
export function curvePoints(R: number, samples = 160): { f: number; i: number }[] {
  const out: { f: number; i: number }[] = [];
  for (let k = 1; k <= samples; k++) {
    const f = F_AXIS.min + (k / samples) * (F_AXIS.max - F_AXIS.min);
    out.push({ f, i: currentAt(f, R) });
  }
  return out;
}

export default function CetResonanceCurve() {
  const [R, setR] = useState<number>(DEFAULT_R);
  const f0 = resonantFrequency(RES_CIRCUIT.L, RES_CIRCUIT.C);
  const iMax = RES_CIRCUIT.V / R;
  const pts = curvePoints(R)
    .map((p) => `${px(p.f)},${py(p.i)}`)
    .join(" ");
  const ref = curvePoints(DEFAULT_R)
    .map((p) => `${px(p.f)},${py(p.i)}`)
    .join(" ");
  const width = peakWidth(R);
  const fLow = f0 - width / 2;
  const fHigh = f0 + width / 2;
  const halfI = iMax / Math.SQRT2;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · current against frequency in a series LCR circuit
      </p>

      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label={`Current amplitude against supply frequency for a series LCR circuit with R = ${R} ohms on 200 V. The current peaks at ${iMax.toFixed(1)} A at the resonant frequency of about 79.6 Hz and falls on both sides.`}
      >
        {/* Axes and grid */}
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <g key={t}>
            <line x1={PLOT.x0} y1={py(t)} x2={PLOT.x1} y2={py(t)} className="stroke-border" strokeWidth={t === 0 ? 1.2 : 0.6} />
            <text x={PLOT.x0 - 5} y={py(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        {[0, 40, 80, 120, 160].map((t) => (
          <text key={t} x={px(t)} y={PLOT.y0 + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1 - 6} className="stroke-muted-foreground" />
        <text x={8} y={18} className="fill-muted-foreground text-[10px]">
          current I (A)
        </text>
        <text x={PLOT.x1} y={PLOT.y0 + 27} textAnchor="end" className="fill-muted-foreground text-[10px]">
          frequency f (Hz)
        </text>

        {/* f₀ */}
        <line x1={px(f0)} y1={PLOT.y0} x2={px(f0)} y2={PLOT.y1 - 6} strokeDasharray="4 4" className="stroke-muted-foreground" />
        <text x={px(f0) + 4} y={PLOT.y1 - 8} className="fill-foreground text-[10px] font-semibold tabular-nums">
          f₀ ≈ {f0.toFixed(1)} Hz
        </text>

        {/* The worked example's curve, faint, for comparison once R moves */}
        {R !== DEFAULT_R && (
          <polyline points={ref} fill="none" strokeDasharray="3 3" strokeWidth={1.2} className="stroke-muted-foreground" />
        )}

        {/* Peak width: where I is above I_max/√2 */}
        <line x1={px(fLow)} y1={py(halfI)} x2={px(fHigh)} y2={py(halfI)} strokeWidth={1.5} className="stroke-amber-600 dark:stroke-amber-400" />
        <text x={px(fHigh) + 4} y={py(halfI) + 3.5} className="fill-amber-700 text-[10px] dark:fill-amber-300 tabular-nums">
          width {width.toFixed(1)} Hz
        </text>

        {/* The curve */}
        <polyline points={pts} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
        <circle cx={px(f0)} cy={py(iMax)} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={px(f0) - 6} y={py(iMax) - 4} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300 tabular-nums">
          I = V/R = {iMax.toFixed(1)} A
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Resistance R: <span className="tabular-nums">{R} Ω</span>
        </span>
        <input
          type="range"
          min={R_RANGE.min}
          max={R_RANGE.max}
          step={R_RANGE.step}
          value={R}
          onChange={(e) => setR(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Resistance of the circuit, in ohms"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          At f₀: Z = R = {R} Ω, I = 200/{R} = {iMax.toFixed(1)} A, φ = 0
        </p>
        <p className="text-muted-foreground tabular-nums">
          f₀ = 1/(2π√(LC)) with L = 0.4 H, C = 10 μF: {f0.toFixed(1)} Hz, whatever R is
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Far below f₀ the capacitor&apos;s large reactance limits the current, far above it the inductor&apos;s does. At f₀ they cancel and only R is
        left, so Z is least (never zero). A smaller R gives a taller, narrower peak: the circuit picks out f₀ more
        sharply. The amber line marks where I is above Iₘₐₓ/√2; its width is R/(2πL).
      </p>
    </div>
  );
}
