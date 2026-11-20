"use client";

import { useState } from "react";

/**
 * Interactive: the Freundlich adsorption isotherm two ways (concept
 * cetsurf-freundlich).
 *
 * Left: x/m = k p^(1/n) against p. With n > 1 it rises less than in proportion
 * (the dashed line, n = 1, is for comparison). Right: the log form,
 * log(x/m) = log k + (1/n) log p, a straight line whose slope is 1/n and whose
 * intercept is log k. A slider sets n: the slope of the straight line is 1/n,
 * and the intercept does not move. Axes carry no units; k is fixed (2 in the
 * code, not shown). Pinned by tests/notes-w2-01.test.ts.
 */

export const FREUNDLICH_K = 2;
export const N_RANGE = { min: 1.5, max: 5, step: 0.5 } as const;
export const DEFAULT_N = 2;

/** x/m = k p^(1/n). */
export function adsorbed(p: number, n: number, k = FREUNDLICH_K): number {
  return k * p ** (1 / n);
}

/** log(x/m) = log k + (1/n) log p. */
export function logAdsorbed(logP: number, n: number, k = FREUNDLICH_K): number {
  return Math.log10(k) + logP / n;
}

export const slopeOf = (n: number) => 1 / n;

const r2 = (v: number) => Math.round(v * 100) / 100;

export const LEFT = { x0: 30, x1: 146, y0: 150, y1: 26, pMax: 10, yMax: 20 } as const;
export const RIGHT = { x0: 192, x1: 308, y0: 150, y1: 26, xMax: 1, yMax: 1.4 } as const;

const lx = (p: number) => r2(LEFT.x0 + (p / LEFT.pMax) * (LEFT.x1 - LEFT.x0));
const ly = (v: number) => r2(LEFT.y0 - (v / LEFT.yMax) * (LEFT.y0 - LEFT.y1));
const rx = (v: number) => r2(RIGHT.x0 + (v / RIGHT.xMax) * (RIGHT.x1 - RIGHT.x0));
const ry = (v: number) => r2(RIGHT.y0 - (v / RIGHT.yMax) * (RIGHT.y0 - RIGHT.y1));

/** Polyline points of x/m against p. */
export function curve(n: number, samples = 60): string {
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const p = (i / samples) * LEFT.pMax;
    pts.push(`${lx(p)},${ly(adsorbed(p, n))}`);
  }
  return pts.join(" ");
}

function Axes({ x0, x1, y0, y1, xLabel, yLabel }: { x0: number; x1: number; y0: number; y1: number; xLabel: string; yLabel: string }) {
  return (
    <g>
      <line x1={x0} y1={y0} x2={x1} y2={y0} className="stroke-muted-foreground" strokeWidth={1.2} />
      <line x1={x0} y1={y0} x2={x0} y2={y1 - 4} className="stroke-muted-foreground" strokeWidth={1.2} />
      <text x={x1} y={y0 + 14} textAnchor="end" className="fill-muted-foreground text-[10px]">
        {xLabel}
      </text>
      <text x={x0 - 4} y={y1 - 10} className="fill-muted-foreground text-[10px]">
        {yLabel}
      </text>
    </g>
  );
}

export default function CetFreundlichPlots() {
  const [n, setN] = useState<number>(DEFAULT_N);
  const slope = slopeOf(n);
  const logK = Math.log10(FREUNDLICH_K);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the Freundlich isotherm, curved and straight
      </p>
      <svg
        viewBox="0 0 320 178"
        className="block h-auto w-full"
        role="img"
        aria-label={`Left: amount adsorbed per gram, x over m, against pressure p, rising less than in proportion for n = ${n}. Right: log of x over m against log p, a straight line with slope 1/n = ${slope.toFixed(2)} and intercept log k.`}
      >
        <Axes x0={LEFT.x0} x1={LEFT.x1} y0={LEFT.y0} y1={LEFT.y1} xLabel="p" yLabel="x/m" />
        <polyline points={curve(1)} fill="none" strokeDasharray="4 3" className="stroke-muted-foreground" strokeWidth={1.2} />
        <text x={lx(4.6)} y={ly(15)} className="fill-muted-foreground text-[9px]">
          proportional
        </text>
        <polyline points={curve(n)} fill="none" strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={2.5} />
        <text x={LEFT.x1} y={ly(adsorbed(LEFT.pMax, n)) - 6} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          x/m = k p
          <tspan dy={-5} className="text-[8px]">
            1/n
          </tspan>
        </text>

        <Axes x0={RIGHT.x0} x1={RIGHT.x1} y0={RIGHT.y0} y1={RIGHT.y1} xLabel="log p" yLabel="log (x/m)" />
        <line
          x1={rx(0)}
          y1={ry(logAdsorbed(0, 1))}
          x2={rx(RIGHT.xMax)}
          y2={ry(logAdsorbed(RIGHT.xMax, 1))}
          strokeDasharray="4 3"
          className="stroke-muted-foreground"
          strokeWidth={1.2}
        />
        <line
          x1={rx(0)}
          y1={ry(logAdsorbed(0, n))}
          x2={rx(RIGHT.xMax)}
          y2={ry(logAdsorbed(RIGHT.xMax, n))}
          className="stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth={2.5}
        />
        <circle cx={rx(0)} cy={ry(logK)} r={3.5} className="fill-amber-600 dark:fill-amber-400" />
        <text x={rx(0) + 6} y={ry(logK) + 14} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          intercept = log k
        </text>
        {/* slope triangle over the last half of the line */}
        <polyline
          points={`${rx(0.5)},${ry(logAdsorbed(0.5, n))} ${rx(1)},${ry(logAdsorbed(0.5, n))} ${rx(1)},${ry(logAdsorbed(1, n))}`}
          fill="none"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth={1.2}
        />
        <text x={RIGHT.x1} y={ry(logAdsorbed(0.5, n)) + 13} textAnchor="end" className="fill-emerald-700 text-[10px] font-semibold tabular-nums dark:fill-emerald-300">
          slope 1/n = {slope.toFixed(2)}
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          n: <span className="tabular-nums">{n.toFixed(1)}</span> (always more than 1)
        </span>
        <input
          type="range"
          min={N_RANGE.min}
          max={N_RANGE.max}
          step={N_RANGE.step}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Freundlich constant n"
        />
      </label>
      <p className="mt-2 text-sm font-medium text-foreground tabular-nums">
        log(x/m) = log k + (1/{n.toFixed(1)}) log p: slope {slope.toFixed(2)}, intercept log k
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        x/m is the amount adsorbed per gram of adsorbent at a fixed temperature. A bigger n means a smaller power 1/n: the curve flattens and the
        straight line gets less steep, but it still starts at log k. Dashed lines: n = 1, for comparison. For a solution, p is replaced by the
        concentration C.
      </p>
    </div>
  );
}
