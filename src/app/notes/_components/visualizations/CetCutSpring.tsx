"use client";

import { useState } from "react";

/**
 * Interactive: cutting a spring makes each piece stiffer (concept
 * cetp-ms-springs, k ∝ 1/L). A spring of constant K = 600 N/m is cut so the
 * lengths are L₁ = NL₂. Under the same force F, each part of a spring stretches
 * by its share of the total: the whole stretches x, the longer piece
 * Nx/(N + 1), the shorter piece x/(N + 1). So k₁ = K(N + 1)/N and
 * k₂ = K(N + 1). A slider sets N; the first picture is the concept's worked
 * example, N = 2 (lengths 2 : 1), giving 900 N/m and 1800 N/m. Pinned by
 * tests/notes-w2-02.test.ts.
 */

/** The worked example's spring constant, N/m. */
export const K_WHOLE = 600;
export const N_RANGE = { min: 1, max: 5, step: 1 } as const;
export const DEFAULT_N = 2;

/** Constants of the longer (L₁ = NL₂) and shorter pieces. */
export function pieceConstants(N: number, K: number = K_WHOLE): { k1: number; k2: number } {
  return { k1: (K * (N + 1)) / N, k2: K * (N + 1) };
}

/** Fractions of the whole length, and so of the whole extension under the same force. */
export function shares(N: number): { long: number; short: number } {
  return { long: N / (N + 1), short: 1 / (N + 1) };
}

// Geometry (viewBox units).
export const CEILING_Y = 26;
/** Natural length and extension of the whole spring, viewBox units. */
export const NATURAL = 112;
export const STRETCH = 34;
export const COLUMNS = [62, 162, 262] as const;
const BLOCK_H = 18;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Zigzag points for a spring from y0 to y1 at x with the given number of coils. */
export function zigzag(x: number, y0: number, y1: number, coils: number): string {
  const lead = 5;
  const pts: string[] = [`${x},${r2(y0)}`, `${x},${r2(y0 + lead)}`];
  const body = y1 - y0 - 2 * lead;
  const n = coils * 2;
  for (let k = 1; k < n; k++) {
    pts.push(`${x + (k % 2 === 1 ? 9 : -9)},${r2(y0 + lead + (body * k) / n)}`);
  }
  pts.push(`${x},${r2(y1 - lead)}`, `${x},${r2(y1)}`);
  return pts.join(" ");
}

function Hanging({ x, frac, title, ext, k }: { x: number; frac: number; title: string; ext: string; k: number }) {
  const nat = NATURAL * frac;
  const end = CEILING_Y + nat + STRETCH * frac;
  const coils = Math.max(2, Math.round(10 * frac));
  return (
    <g>
      <text x={x} y={14} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {title}
      </text>
      <polyline points={zigzag(x, CEILING_Y, end, coils)} fill="none" strokeWidth={1.6} strokeLinejoin="round" className="stroke-sky-600 dark:stroke-sky-400" />
      <rect x={x - 14} y={r2(end)} width={28} height={BLOCK_H} rx={2} className="fill-muted-foreground/40" />
      <text x={x} y={r2(end + 13)} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        F
      </text>

      {/* Natural length and the stretch */}
      <line x1={x + 12} y1={r2(CEILING_Y + nat)} x2={x + 30} y2={r2(CEILING_Y + nat)} strokeDasharray="2 2" className="stroke-muted-foreground" />
      <line x1={x + 12} y1={r2(end)} x2={x + 30} y2={r2(end)} strokeDasharray="2 2" className="stroke-muted-foreground" />
      <line x1={x + 26} y1={r2(CEILING_Y + nat)} x2={x + 26} y2={r2(end)} strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
      <text x={x + 30} y={r2(CEILING_Y + nat + (STRETCH * frac) / 2 + 3.5)} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
        {ext}
      </text>

      <text x={x} y={222} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
        k = {Math.round(k)} N/m
      </text>
    </g>
  );
}

export default function CetCutSpring() {
  const [N, setN] = useState<number>(DEFAULT_N);
  const { k1, k2 } = pieceConstants(N);
  const s = shares(N);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · cut a spring and each piece gets stiffer
      </p>

      <svg
        viewBox="0 0 320 232"
        className="block h-auto w-full"
        role="img"
        aria-label={`A spring of constant 600 newtons per metre and its two pieces, cut in the ratio ${N} to 1, each hanging with the same force F. The whole stretches x, the longer piece ${N}x/${N + 1}, the shorter x/${N + 1}. Their constants are 600, ${Math.round(k1)} and ${Math.round(k2)} newtons per metre.`}
      >
        <line x1={16} y1={CEILING_Y} x2={304} y2={CEILING_Y} strokeWidth={2} className="stroke-foreground" />
        <Hanging x={COLUMNS[0]} frac={1} title="whole spring" ext="x" k={K_WHOLE} />
        <Hanging x={COLUMNS[1]} frac={s.long} title="piece L₁" ext={N === 1 ? "x/2" : `${N}x/${N + 1}`} k={k1} />
        <Hanging x={COLUMNS[2]} frac={s.short} title="piece L₂" ext={`x/${N + 1}`} k={k2} />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Cut so that L₁ = NL₂, N = <span className="tabular-nums">{N}</span> (lengths {N} : 1)
        </span>
        <input
          type="range"
          min={N_RANGE.min}
          max={N_RANGE.max}
          step={N_RANGE.step}
          value={N}
          onChange={(e) => setN(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Ratio N of the longer piece's length to the shorter piece's length"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="font-medium text-foreground">
          k₁ = K(N + 1)/N = 600 × {N + 1}/{N} = {Math.round(k1)} N/m
        </p>
        <p className="font-medium text-foreground">
          k₂ = K(N + 1) = 600 × {N + 1} = {Math.round(k2)} N/m
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The same force F hangs on each. Every part of a spring stretches by its share of the total, so a shorter piece stretches less and is
        STIFFER: k ∝ 1/L. With lengths 2 : 1, the pieces are 900 N/m and 1800 N/m.
      </p>
    </div>
  );
}
