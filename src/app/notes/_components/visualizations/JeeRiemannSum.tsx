"use client";

import { useState } from "react";

/**
 * Interactive: a sum of thin strips becoming a definite integral (concept
 * jdi-riemann), drawn with the concept's worked example:
 * lim Σ n/(n² + k²) = lim (1/n) Σ 1/(1 + (k/n)²) = ∫₀¹ dx/(1 + x²) = π/4.
 *
 * The k-th strip has width 1/n and height f(k/n) = 1/(1 + (k/n)²), over
 * [(k − 1)/n, k/n], k = 1 to n. f falls on [0, 1], so each strip sits under
 * the curve and the sum stays below π/4 ≈ 0.7854, climbing towards it as n
 * grows: n = 1 gives 1/2, n = 2 gives (4/5 + 1/2)/2 = 0.65, n = 8 ≈ 0.7535,
 * n = 50 ≈ 0.7804. The slider sets n. Pinned by
 * tests/notes-jee-visuals-maths.test.ts.
 */

/** The integrand of the worked example. */
export const f = (x: number) => 1 / (1 + x * x);

/** The exact value of the integral from 0 to 1: π/4. */
export const EXACT = Math.PI / 4;

/** (1/n) Σ f(k/n), k = 1 to n. */
export function riemannSum(n: number): number {
  let s = 0;
  for (let k = 1; k <= n; k++) s += f(k / n);
  return s / n;
}

/** The sum as the worked example writes it: Σ n/(n² + k²). */
export function exampleSum(n: number): number {
  let s = 0;
  for (let k = 1; k <= n; k++) s += n / (n * n + k * k);
  return s;
}

export const N_RANGE = { min: 1, max: 50, step: 1 } as const;
export const DEFAULT_N = 8;

// Plot geometry (viewBox units): x from 0 to 1, y from 0 to 1.1.
export const PLOT = { left: 34, top: 14, width: 260, height: 160, yMax: 1.1 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.left + x * PLOT.width);
const py = (y: number) => r2(PLOT.top + (1 - y / PLOT.yMax) * PLOT.height);

export default function JeeRiemannSum() {
  const [n, setN] = useState<number>(DEFAULT_N);
  const sum = riemannSum(n);
  const curve = Array.from({ length: 61 }, (_, k) => {
    const x = k / 60;
    return `${px(x)},${py(f(x))}`;
  }).join(" ");
  const strips = Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    const h = f(k / n);
    return { x: px((k - 1) / n), y: py(h), w: r2(px(k / n) - px((k - 1) / n)), h: r2(py(0) - py(h)) };
  });

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · thin strips adding up to an area
      </p>
      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label={`The curve y = 1/(1 + x²) on [0, 1] with ${n} strips of width 1/${n}, each as tall as the curve at its right end. Their total area is ${sum.toFixed(4)}, below the exact area π/4 ≈ 0.7854.`}
      >
        {/* Strips */}
        {strips.map((s, i) => (
          <rect
            key={i}
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            strokeWidth={n > 30 ? 0.3 : 0.8}
            className="fill-sky-500/30 stroke-sky-700 dark:fill-sky-400/30 dark:stroke-sky-300"
          />
        ))}

        {/* Axes */}
        <line x1={px(0)} y1={py(0)} x2={px(1) + 10} y2={py(0)} className="stroke-muted-foreground" />
        <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(PLOT.yMax)} className="stroke-muted-foreground" />
        {[0, 0.5, 1].map((t) => (
          <text key={`x${t}`} x={px(t)} y={py(0) + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
            {t}
          </text>
        ))}
        {[0.5, 1].map((t) => (
          <text key={`y${t}`} x={px(0) - 4} y={py(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
            {t}
          </text>
        ))}
        <text x={px(1) + 12} y={py(0) + 3} className="fill-muted-foreground text-[10px]">
          x
        </text>

        {/* The curve */}
        <polyline points={curve} fill="none" strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={px(0.62)} y={py(f(0.62)) - 8} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          y = 1/(1 + x²)
        </text>

        {/* The reading */}
        <g className="text-[11px] tabular-nums">
          <text x={160} y={py(0) + 28} textAnchor="middle" className="fill-sky-700 font-semibold dark:fill-sky-300">
            n = {n}: (1/n) Σ f(k/n) ≈ {sum.toFixed(4)}
          </text>
        </g>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Number of strips n: <span className="tabular-nums">{n}</span> (width 1/{n})
        </span>
        <input
          type="range"
          min={N_RANGE.min}
          max={N_RANGE.max}
          step={N_RANGE.step}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="n, the number of strips"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="text-muted-foreground">
          Sum of the strips: {sum.toFixed(4)}. Gap to the area: {(EXACT - sum).toFixed(4)}.
        </p>
        <p className="font-medium text-foreground">Exact area: ∫₀¹ dx/(1 + x²) = π/4 ≈ {EXACT.toFixed(4)}</p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Each term n/(n² + k²) is (1/n)·1/(1 + (k/n)²): a strip of width 1/n and height f(k/n). Here k runs from 1 to n, so k/n runs
        across [0, 1] and the limit is the integral from 0 to 1. The strips miss a little sliver under the falling curve, and the gap
        shrinks as n grows.
      </p>
    </div>
  );
}
