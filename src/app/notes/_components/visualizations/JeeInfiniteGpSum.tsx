"use client";

/**
 * Slider: partial sums of an infinite GP settling on a/(1 − r) (concept
 * jseq-igp-sum), with the first term a = 3 of the concept's worked example.
 * At the default r = 1/2: S∞ = 3/(1 − 1/2) = 6, the squares 9, 9/4, … add to
 * a²/(1 − r²) = 9/(3/4) = 12, and 12 ÷ 6 = 2 = a/(1 + r), the GP with sum 6
 * and sum of squares 12. The slider keeps |r| ≤ 0.75 < 1, where the sum to
 * infinity exists. Pinned by tests/notes-w2-16.test.ts.
 */
import { useState } from "react";

export const GP_A = 3;
/** r = k/20 for k from −15 to 15 (r from −0.75 to 0.75); default k = 10, r = 1/2. */
export const K_RANGE = { min: -15, max: 15, step: 1, initial: 10 } as const;
export const N_TERMS = 10;

export const rOf = (k: number) => k / 20;

/** Sₙ = a(1 − rⁿ)/(1 − r), the sum of the first n terms (r ≠ 1). */
export const partialSum = (a: number, r: number, n: number) => (a * (1 - r ** n)) / (1 - r);
export const sumToInfinity = (a: number, r: number) => a / (1 - r);
export const sumOfSquares = (a: number, r: number) => (a * a) / (1 - r * r);

/** Up to 2 decimals, no trailing zeros. */
export function fmt(v: number): string {
  const s = (Math.round(v * 100) / 100).toFixed(2).replace(/\.?0+$/, "");
  return s === "-0" ? "0" : s.replace("-", "−");
}

// Plot geometry (viewBox units): n from 1 to 10, Sₙ from 0 to 12.
export const PLOT = { left: 40, top: 16, width: 260, height: 150, yMax: 12 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const py = (y: number) => r2(PLOT.top + (1 - y / PLOT.yMax) * PLOT.height);
const slot = PLOT.width / N_TERMS;
const bx = (n: number) => r2(PLOT.left + (n - 1) * slot + slot / 2);

export default function JeeInfiniteGpSum() {
  const [k, setK] = useState<number>(K_RANGE.initial);
  const r = rOf(k);
  const sInf = sumToInfinity(GP_A, r);
  const sq = sumOfSquares(GP_A, r);
  const bars = Array.from({ length: N_TERMS }, (_, i) => ({ n: i + 1, s: partialSum(GP_A, r, i + 1) }));

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · partial sums settling on the sum to infinity
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label={`Bars for the sums of the first 1 to 10 terms of the GP with first term 3 and ratio ${fmt(r)}. They settle on the dashed line at a/(1 − r) = ${fmt(sInf)}.`}
      >
        {/* Grid and axes */}
        {[0, 3, 6, 9, 12].map((t) => (
          <g key={t}>
            <line x1={PLOT.left} y1={py(t)} x2={PLOT.left + PLOT.width} y2={py(t)} className="stroke-border" strokeWidth={0.5} />
            <text x={PLOT.left - 5} y={py(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        <line x1={PLOT.left} y1={py(0)} x2={PLOT.left + PLOT.width} y2={py(0)} className="stroke-muted-foreground" />
        <line x1={PLOT.left} y1={py(0)} x2={PLOT.left} y2={PLOT.top - 4} className="stroke-muted-foreground" />
        <text x={PLOT.left - 5} y={PLOT.top - 6} textAnchor="end" className="fill-muted-foreground text-[10px]">
          Sₙ
        </text>

        {/* The partial sums */}
        {bars.map((b) => (
          <g key={b.n}>
            <rect
              x={r2(bx(b.n) - 9)}
              y={py(b.s)}
              width={18}
              height={r2(py(0) - py(b.s))}
              strokeWidth={0.8}
              className="fill-sky-500/40 stroke-sky-700 dark:fill-sky-400/40 dark:stroke-sky-300"
            />
            <text x={bx(b.n)} y={py(0) + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
              {b.n}
            </text>
          </g>
        ))}
        <text x={PLOT.left + PLOT.width / 2} y={py(0) + 26} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          number of terms n
        </text>

        {/* The limit */}
        <line
          x1={PLOT.left}
          y1={py(sInf)}
          x2={PLOT.left + PLOT.width}
          y2={py(sInf)}
          strokeDasharray="5 3"
          strokeWidth={1.8}
          className="stroke-rose-600 dark:stroke-rose-400"
        />
        <text
          x={PLOT.left + PLOT.width - 2}
          y={sInf > 10.5 ? py(sInf) + 13 : py(sInf) - 5}
          textAnchor="end"
          className="fill-rose-700 text-[11px] font-semibold tabular-nums dark:fill-rose-300"
        >
          S∞ = {fmt(sInf)}
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Common ratio r: <span className="tabular-nums">{fmt(r)}</span> (first term a = 3)
        </span>
        <input
          type="range"
          min={K_RANGE.min}
          max={K_RANGE.max}
          step={K_RANGE.step}
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="r, the common ratio"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="font-medium text-foreground">
          S∞ = a/(1 − r) = 3/(1 − {r < 0 ? `(${fmt(r)})` : fmt(r)}) = {fmt(sInf)}
        </p>
        <p className="text-muted-foreground">
          Squares: a²/(1 − r²) = {fmt(sq)}. Squares ÷ S∞ = a/(1 + r) = {fmt(GP_A / (1 + r))}
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Each bar adds one more term. With |r| &lt; 1 the terms shrink and the bars settle on a/(1 − r); for a negative r they step
        above and below it. At r = 1/2 the sum is 6 and the squares add to 12, so a GP with sum 6 and sum of squares 12 has a = 3,
        r = 1/2. When |r| is 1 or more the terms never shrink and there is no sum to infinity.
      </p>
    </div>
  );
}
