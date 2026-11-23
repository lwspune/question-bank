"use client";

import { useState } from "react";

/**
 * Interactive: Wien's law, the peak of a hot body's spectrum moving with its
 * temperature (concept cetp-th-wien-law). A slider sets T; the peak sits at
 * λₘ = b/T with b = 2.9 × 10⁻³ m K, the concept's value. The 3000 K curve
 * stays as a faint reference, so moving T shows the peak sliding to shorter
 * wavelengths as the body gets hotter. Each curve is scaled to its own peak
 * (the real heights differ hugely); the power is given instead as a number,
 * (T/3000)⁴ times the 3000 K body's, from Stefan's law on the same page.
 *
 * Default T = 5800 K, the concept's worked example (peak at 500 nm). At
 * 3000 K and 6000 K the peaks are about 967 nm and 483 nm, the self-check's
 * halving, and 6000 K radiates 16 times as much. Pinned by
 * tests/notes-w2-02.test.ts.
 */

/** Wien's constant, m K, as the concept gives it. */
export const WIEN_B = 2.9e-3;

/** Second radiation constant hc/k, m K, used only to draw the curve's shape. */
export const C2 = 1.4388e-2;

export const T_RANGE = { min: 3000, max: 6000, step: 100 } as const;
export const DEFAULT_T = 5800;
export const REF_T = 3000;

/** Peak wavelength in nm, λₘ = b/T. */
export function peakNm(T: number): number {
  return (WIEN_B / T) * 1e9;
}

/** Emitted power compared with the 3000 K body, (T/3000)⁴. */
export function powerRatio(T: number, T0: number = REF_T): number {
  return (T / T0) ** 4;
}

/** Shape of the spectrum, 1/(λ⁵(e^(C2/λT) − 1)), unnormalised; λ in nm. */
export function spectrum(lambdaNm: number, T: number): number {
  const l = lambdaNm * 1e-9;
  return 1 / (l ** 5 * (Math.exp(C2 / (l * T)) - 1));
}

/** Wavelength axis, nm. */
export const L_AXIS = { min: 0, max: 3000 } as const;

/** Curve samples scaled to the curve's own highest sample. */
export function curve(T: number, samples = 150): { nm: number; y: number }[] {
  const raw: { nm: number; y: number }[] = [];
  for (let k = 1; k <= samples; k++) {
    const nm = L_AXIS.min + (k / samples) * (L_AXIS.max - L_AXIS.min);
    raw.push({ nm, y: spectrum(nm, T) });
  }
  const top = Math.max(...raw.map((p) => p.y));
  return raw.map((p) => ({ nm: p.nm, y: p.y / top }));
}

// Plot geometry (viewBox units).
export const PLOT = { x0: 34, x1: 308, y0: 166, y1: 36 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (nm: number) => r2(PLOT.x0 + ((nm - L_AXIS.min) / (L_AXIS.max - L_AXIS.min)) * (PLOT.x1 - PLOT.x0));
const py = (y: number) => r2(PLOT.y0 - y * (PLOT.y0 - PLOT.y1));

const toPoints = (T: number) =>
  curve(T)
    .map((p) => `${px(p.nm)},${py(p.y)}`)
    .join(" ");

export default function CetWienPeak() {
  const [T, setT] = useState<number>(DEFAULT_T);
  const lm = peakNm(T);
  const lmRef = peakNm(REF_T);
  const ratio = powerRatio(T);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the peak of a hot body&apos;s spectrum moves with temperature
      </p>

      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label={`Spectrum of a hot body: intensity against wavelength. At ${T} K the peak is at about ${Math.round(lm)} nanometres; the faint 3000 K curve peaks at about 967 nanometres. A hotter body peaks at a shorter wavelength.`}
      >
        {[0, 500, 1000, 1500, 2000, 2500, 3000].map((t) => (
          <text key={t} x={px(t)} y={PLOT.y0 + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y0} className="stroke-muted-foreground" />
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1 - 8} className="stroke-muted-foreground" />
        <text x={6} y={18} className="fill-muted-foreground text-[10px]">
          intensity (each curve scaled to its own peak)
        </text>
        <text x={PLOT.x1} y={PLOT.y0 + 27} textAnchor="end" className="fill-muted-foreground text-[10px]">
          wavelength λ (nm)
        </text>

        {/* The 3000 K reference */}
        <polyline points={toPoints(REF_T)} fill="none" strokeDasharray="3 3" strokeWidth={1.3} className="stroke-muted-foreground" />
        <line x1={px(lmRef)} y1={PLOT.y0} x2={px(lmRef)} y2={py(1)} strokeDasharray="2 3" className="stroke-muted-foreground" />
        <text x={PLOT.x1} y={PLOT.y1 + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          dashed: 3000 K
        </text>
        <text x={PLOT.x1} y={PLOT.y1 + 18} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300 tabular-nums">
          solid: {T} K
        </text>

        {/* The chosen temperature */}
        <polyline points={toPoints(T)} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-rose-600 dark:stroke-rose-400" />
        <line x1={px(lm)} y1={PLOT.y0} x2={px(lm)} y2={py(1)} strokeDasharray="4 3" className="stroke-rose-600 dark:stroke-rose-400" />
        <circle cx={px(lm)} cy={py(1)} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        <text x={px(lm)} y={py(1) - 6} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300 tabular-nums">
          λₘ ≈ {Math.round(lm)} nm
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Temperature T: <span className="tabular-nums">{T} K</span>
        </span>
        <input
          type="range"
          min={T_RANGE.min}
          max={T_RANGE.max}
          step={T_RANGE.step}
          value={T}
          onChange={(e) => setT(Number(e.target.value))}
          className="accent-rose-600"
          aria-label="Temperature of the body, in kelvin"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="font-medium text-foreground">
          λₘ = b/T = 2.9 × 10⁻³ / {T} m ≈ {Math.round(lm)} nm
        </p>
        <p className="text-muted-foreground">
          Power compared with the 3000 K body: ({T}/3000)⁴ ≈ {ratio < 10 ? ratio.toFixed(1) : Math.round(ratio)} times
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        λₘT stays 2.9 × 10⁻³ m K: double the temperature and the peak moves to half the wavelength (about 967 nm at 3000 K, 483 nm at
        6000 K), while the power grows 2⁴ = 16 times. A star peaking at 500 nm is at 5800 K.
      </p>
    </div>
  );
}
