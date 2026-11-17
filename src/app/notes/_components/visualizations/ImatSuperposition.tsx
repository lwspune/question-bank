"use client";

import { useState } from "react";

/**
 * Interactive: superposition of two coherent waves of equal amplitude
 * (concept imat-osw-interference). A slider sets the path difference Δ in
 * wavelengths; the second wave is shifted by the phase difference
 * φ = 2πΔ/λ and the sum is drawn bold underneath. Its amplitude is
 * 2A|cos(φ/2)|: 2A (constructive) when Δ = nλ, zero (destructive) when
 * Δ = (n + ½)λ.
 *
 * It opens on the concept's worked example: 680 Hz at 340 m/s gives
 * λ = 0.50 m, and Δ = 4.75 − 4.00 = 0.75 m = 1.5λ, so the sound is quiet.
 * Each wave has amplitude 3 cm, the practice item (crest on crest gives 6 cm).
 * Δ is kept in hundredths of a wavelength so the labels are exact. Pinned by
 * tests/notes-imat-visuals-phys.test.ts.
 */

/** Amplitude of each wave, in cm (the practice item). */
export const AMPLITUDE_CM = 3;

/** The worked example: two speakers, 680 Hz, 340 m/s, listener 4.00 m and 4.75 m away. */
export const SPEAKERS = { f: 680, v: 340, d1: 4.0, d2: 4.75 } as const;

/** λ = v/f for the worked example, in m. */
export const WAVELENGTH_M = SPEAKERS.v / SPEAKERS.f;

/** Path-difference slider in hundredths of a wavelength: 0 to 2λ. */
export const DELTA_RANGE = { min: 0, max: 200, step: 5 } as const;

/** The worked example's path difference, in hundredths of a wavelength (1.5λ). */
export const START_DELTA = Math.round(((SPEAKERS.d2 - SPEAKERS.d1) / WAVELENGTH_M) * 100);

/** Phase difference in radians for a path difference given in hundredths of λ. */
export function phaseOf(delta100: number): number {
  return (2 * Math.PI * delta100) / 100;
}

/** Amplitude of the sum of two waves of amplitude a with phase difference phi. */
export function sumAmplitude(a: number, phi: number): number {
  return 2 * a * Math.abs(Math.cos(phi / 2));
}

export type Interference = "constructive" | "destructive" | "partial";

/** Constructive at a whole number of wavelengths, destructive at a whole number plus a half. */
export function classify(delta100: number): Interference {
  if (delta100 % 100 === 0) return "constructive";
  if (delta100 % 100 === 50) return "destructive";
  return "partial";
}

// Geometry (viewBox units).
const X0 = 20;
const X1 = 280;
/** One wavelength on screen. */
const LAMBDA_U = 130;
/** viewBox units per cm of displacement. */
const PER_CM = 6;
const TOP_Y = 58;
const SUM_Y = 150;

/** Displacement (cm) of wave 1 and wave 2 at position x (in wavelengths). */
export function displacements(x: number, delta100: number) {
  const y1 = AMPLITUDE_CM * Math.sin(2 * Math.PI * x);
  const y2 = AMPLITUDE_CM * Math.sin(2 * Math.PI * x - phaseOf(delta100));
  return { y1, y2, sum: y1 + y2 };
}

function path(axisY: number, pick: (x: number) => number): string {
  const pts: string[] = [];
  for (let u = X0; u <= X1; u += 2) {
    const x = (u - X0) / LAMBDA_U;
    pts.push(`${u === X0 ? "M" : "L"}${u},${(axisY - pick(x) * PER_CM).toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function ImatSuperposition() {
  const [delta, setDelta] = useState<number>(START_DELTA);
  const phi = phaseOf(delta);
  const amp = sumAmplitude(AMPLITUDE_CM, phi);
  const kind = classify(delta);
  const phaseDeg = Math.round((delta * 360) / 100) % 360;
  const deltaM = (delta / 100) * WAVELENGTH_M;

  const headline =
    kind === "constructive"
      ? "Constructive: crest on crest (loud)"
      : kind === "destructive"
        ? "Destructive: crest on trough (quiet)"
        : "Partly reinforcing";
  const rule =
    kind === "constructive" ? "Δ = nλ" : kind === "destructive" ? "Δ = (n + ½)λ" : "Δ is neither nλ nor (n + ½)λ";

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · superposition of two waves
      </p>

      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label={`Two waves of amplitude 3 cm with a path difference of ${(delta / 100).toFixed(2)} wavelengths, and their sum below, of amplitude ${amp.toFixed(1)} cm: ${kind} interference.`}
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          {headline}
        </text>

        {/* The two waves on one axis */}
        <line x1={X0} y1={TOP_Y} x2={X1} y2={TOP_Y} className="stroke-border" />
        <path d={path(TOP_Y, (x) => displacements(x, delta).y1)} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <path
          d={path(TOP_Y, (x) => displacements(x, delta).y2)}
          fill="none"
          strokeDasharray="5 3"
          className="stroke-amber-600 dark:stroke-amber-400"
          strokeWidth={1.5}
        />
        <text x={X1 + 4} y={TOP_Y - 6} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          wave 1
        </text>
        <text x={X1 + 4} y={TOP_Y + 12} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          wave 2
        </text>

        {/* Their sum */}
        <line x1={X0} y1={SUM_Y} x2={X1} y2={SUM_Y} className="stroke-border" />
        <path d={path(SUM_Y, (x) => displacements(x, delta).sum)} fill="none" className="stroke-indigo-700 dark:stroke-indigo-300" strokeWidth={3} />
        <text x={X1 + 4} y={SUM_Y + 4} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          sum
        </text>
        <text x={X0} y={SUM_Y + 42} className="fill-foreground text-[11px] font-semibold tabular-nums">
          amplitude of the sum = {amp.toFixed(1)} cm
        </text>

        {/* One wavelength marker */}
        <line x1={X0} y1={104} x2={X0 + LAMBDA_U} y2={104} className="stroke-muted-foreground" />
        <line x1={X0} y1={100} x2={X0} y2={108} className="stroke-muted-foreground" />
        <line x1={X0 + LAMBDA_U} y1={100} x2={X0 + LAMBDA_U} y2={108} className="stroke-muted-foreground" />
        <text x={X0 + LAMBDA_U / 2} y={101} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          one wavelength λ
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Path difference Δ: <span className="tabular-nums">{(delta / 100).toFixed(2)}λ</span>
        </span>
        <input
          type="range"
          min={DELTA_RANGE.min}
          max={DELTA_RANGE.max}
          step={DELTA_RANGE.step}
          value={delta}
          onChange={(e) => setDelta(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Path difference between the two waves, in wavelengths"
          aria-valuetext={`${(delta / 100).toFixed(2)} wavelengths`}
        />
      </label>

      <div className="mt-2 space-y-1 text-sm" aria-live="polite">
        <p className="font-medium text-foreground">
          <span className="capitalize">{kind}</span>: {rule}
        </p>
        <p className="text-muted-foreground tabular-nums">
          Phase difference {phaseDeg}°{kind === "destructive" ? " (π)" : ""} · with λ = 0.50 m, Δ = {deltaM.toFixed(3)} m
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Each wave has amplitude 3 cm (wave 2 is dashed). The worked example: 680 Hz at 340 m/s gives λ = 0.50 m. The listener is 4.75 − 4.00 = 0.75 m = 1.5λ further
        from one speaker, a whole number plus a half, so the waves arrive crest on trough and cancel. Move Δ to 1λ or
        2λ and they add to 6 cm.
      </p>
    </div>
  );
}
