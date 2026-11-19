"use client";

import { useState } from "react";

/**
 * Interactive: beats (concept cetp-beat-frequency). Two sounds of nearby
 * frequencies f₁ and f₂ are added over one second. They drift in and out of
 * step, so the sum swells and fades: loud moments come |f₁ − f₂| times a
 * second, 1/Δf apart, with the quietest moment halfway between.
 *
 * Opens on the concept's worked example: forks of 512 Hz and 516 Hz give
 * 4 beats a second, 0.25 s between loud moments and 0.125 s from loud to
 * quiet. The fast waves are drawn at a slower pitch so they can be seen, but
 * the gap between their frequencies (and so the beats) is true to scale.
 * Pinned by tests/notes-cet-visuals-phys-b.test.ts.
 */

/** The worked example: forks of 512 Hz and 516 Hz. */
export const BEAT_EXAMPLE = { f1: 512, f2: 516 } as const;

/** Slider for the difference f₂ − f₁, in Hz. */
export const DIFF_RANGE = { min: 1, max: 8, step: 1 } as const;

/** Beats per second: |f₁ − f₂|. */
export function beatFrequency(f1: number, f2: number): number {
  return Math.abs(f1 - f2);
}

/** Time between loud moments (maxima), 1/Δf, in seconds. */
export function beatPeriod(f1: number, f2: number): number {
  return 1 / beatFrequency(f1, f2);
}

/** Time from a loud moment to the next quiet one, 1/(2Δf), in seconds. */
export function loudToQuiet(f1: number, f2: number): number {
  return 1 / (2 * beatFrequency(f1, f2));
}

/** Pitch at which f₁ is DRAWN (cycles across the 1 s window); f₂ is drawn Δf above it. */
export const DRAWN_F1 = 24;

/** Each wave (amplitude 1, in step at t = 0): cos 2πft. */
export function wave(f: number, t: number): number {
  return Math.cos(2 * Math.PI * f * t);
}

/** The sum of the two waves, and its envelope 2|cos(πΔf t)|. */
export function sum(f1: number, f2: number, t: number): number {
  return wave(f1, t) + wave(f2, t);
}
export function envelope(f1: number, f2: number, t: number): number {
  return 2 * Math.abs(Math.cos(Math.PI * (f2 - f1) * t));
}

/** Times (s) of the loud moments within [0, window]: 0, 1/Δf, 2/Δf, ... */
export function loudTimes(diff: number, window = 1): number[] {
  const out: number[] = [];
  for (let k = 0; k / diff <= window + 1e-9; k++) out.push(k / diff);
  return out;
}

// Geometry (viewBox units): one second runs from TX0 to TX1.
const TX0 = 24;
const TX1 = 308;
const SAMPLES = 640;
const r2 = (n: number) => Math.round(n * 100) / 100;
const tx = (t: number) => TX0 + (TX1 - TX0) * t;

function path(fn: (t: number) => number, cy: number, amp: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    pts.push(`${i === 0 ? "M" : "L"} ${r2(tx(t))} ${r2(cy - amp * fn(t))}`);
  }
  return pts.join(" ");
}

/** Seconds as short text: 0.25, 0.125, 0.333. */
export const secs = (s: number) => String(Number(s.toFixed(3)));

const W1_Y = 40;
const W2_Y = 76;
const SUM_Y = 134;
const A = 11;

export default function CetBeatsEnvelope() {
  const [diff, setDiff] = useState<number>(BEAT_EXAMPLE.f2 - BEAT_EXAMPLE.f1);
  const f1 = BEAT_EXAMPLE.f1;
  const f2 = f1 + diff;
  const d1 = DRAWN_F1;
  const d2 = DRAWN_F1 + diff;
  const T = beatPeriod(f1, f2);
  const loud = loudTimes(diff);
  const quiet = loud.map((t) => t + T / 2).filter((t) => t <= 1);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · beats from two nearby frequencies
      </p>

      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label={`Two sounds of ${f1} hertz and ${f2} hertz added together over one second. The sum grows loud and soft ${diff} times a second, so loud moments are ${secs(T)} seconds apart.`}
      >
        {/* The two sounds */}
        <text x={TX0} y={W1_Y - A - 4} className="fill-muted-foreground text-[10px]">
          {`f₁ = ${f1} Hz`}
        </text>
        <path d={path((t) => wave(d1, t), W1_Y, A * 0.8)} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1} />
        <text x={TX0} y={W2_Y - A - 4} className="fill-muted-foreground text-[10px]">
          {`f₂ = ${f2} Hz`}
        </text>
        <path d={path((t) => wave(d2, t), W2_Y, A * 0.8)} fill="none" className="stroke-violet-600 dark:stroke-violet-400" strokeWidth={1} />

        {/* Their sum and its loud-soft envelope */}
        <text x={TX1} y={SUM_Y - 2 * A - 6} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          sum: what you hear
        </text>
        <path d={path((t) => sum(d1, d2, t) / 2, SUM_Y, 2 * A)} fill="none" className="stroke-foreground" strokeWidth={0.9} />
        <path d={path((t) => envelope(d1, d2, t) / 2, SUM_Y, 2 * A)} fill="none" strokeDasharray="3 2" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        <path d={path((t) => -envelope(d1, d2, t) / 2, SUM_Y, 2 * A)} fill="none" strokeDasharray="3 2" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />

        {/* Loud and quiet moments */}
        {loud.map((t) => (
          <circle key={`l${t}`} cx={r2(tx(t))} cy={SUM_Y - 2 * A} r={2.5} className="fill-amber-600 dark:fill-amber-400" />
        ))}
        {quiet.map((t) => (
          <circle key={`q${t}`} cx={r2(tx(t))} cy={SUM_Y} r={2.5} className="fill-rose-600 dark:fill-rose-400" />
        ))}
        <text x={r2(tx(0)) + 4} y={SUM_Y - 2 * A - 3} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          loud
        </text>
        {quiet.length > 0 && (
          <text x={r2(tx(quiet[0]))} y={SUM_Y + 2 * A + 10} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
            quiet
          </text>
        )}

        {/* One beat period, 1/Δf, between the first two loud moments */}
        {loud.length > 1 && (
          <g>
            <line x1={r2(tx(0))} y1={176} x2={r2(tx(T))} y2={176} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
            <line x1={r2(tx(0))} y1={172} x2={r2(tx(0))} y2={180} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
            <line x1={r2(tx(T))} y1={172} x2={r2(tx(T))} y2={180} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
            <text
              x={T > 0.6 ? r2(tx(T)) - 4 : r2(tx(T)) + 4}
              y={T > 0.6 ? 171 : 180}
              textAnchor={T > 0.6 ? "end" : "start"}
              className="fill-indigo-700 text-[10px] font-semibold tabular-nums dark:fill-indigo-300">
              {`1/Δf = ${secs(T)} s`}
            </text>
          </g>
        )}

        {/* Time axis, one second */}
        <line x1={TX0} y1={194} x2={TX1} y2={194} className="stroke-muted-foreground" strokeWidth={1} />
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={r2(tx(t))} y1={191} x2={r2(tx(t))} y2={197} className="stroke-muted-foreground" strokeWidth={1} />
            <text x={r2(tx(t))} y={208} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {t === 1 ? "1 s" : String(t)}
            </text>
          </g>
        ))}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Difference f₂ − f₁: <span className="tabular-nums">{diff} Hz</span>
        </span>
        <input
          type="range"
          min={DIFF_RANGE.min}
          max={DIFF_RANGE.max}
          step={DIFF_RANGE.step}
          value={diff}
          onChange={(e) => setDiff(Number(e.target.value))}
          className="accent-amber-600"
          aria-label="Difference between the two frequencies, in hertz"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          Beat frequency = |f₁ − f₂| = |{f1} − {f2}| = {beatFrequency(f1, f2)} per second
        </p>
        <p className="text-muted-foreground tabular-nums">
          Beat period = 1/Δf = {secs(T)} s. Loud to the next quiet = 1/(2Δf) = {secs(loudToQuiet(f1, f2))} s.
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The waves are drawn at a lower pitch so you can see them, but the gap between their frequencies is true to
        scale, so the number of beats in one second is real. A bigger difference gives faster beats.
      </p>
    </div>
  );
}
