"use client";

import { useState } from "react";

/**
 * Interactive: a slider sets the correlation coefficient r; the same base
 * points re-plot as y = r·x + √(1−r²)·z (fixed x and noise), so the cloud
 * tightens to a line at r = ±1 and spreads to a shapeless blob at r = 0.
 *
 * Pedagogical aim: r measures how tightly points hug a straight line, and its
 * SIGN is the slope's direction — not the steepness.
 */

const X = [
  -1.8, -1.5, -1.3, -1.0, -0.9, -0.7, -0.6, -0.4, -0.2, -0.1, 0.1, 0.2, 0.4,
  0.5, 0.6, 0.8, 1.0, 1.1, 1.3, 1.5, 1.6, 1.8, 0.9, -1.1,
];
const Z = [
  0.5, -0.8, 1.1, -0.3, 0.9, -1.2, 0.2, 1.4, -0.6, 0.7, -1.0, 0.4, 1.2, -0.9,
  0.3, -0.5, 1.0, -1.3, 0.6, -0.4, 0.8, -0.7, 1.3, -1.1,
];

const W = 300;
const H = 240;
const PAD = 28;
const DOM = 2.6;

const toX = (x: number) => PAD + ((x + DOM) / (2 * DOM)) * (W - 2 * PAD);
const toY = (y: number) => H - PAD - ((y + DOM) / (2 * DOM)) * (H - 2 * PAD);

export default function CorrelationScatter() {
  const [r, setR] = useState(0.8);
  const k = Math.sqrt(Math.max(0, 1 - r * r));

  const pts = X.map((x, i) => {
    const y = r * x + k * Z[i];
    return [toX(x), toY(y)] as const;
  });

  // trend line y = r·x across the domain
  const lineX1 = toX(-DOM);
  const lineY1 = toY(r * -DOM);
  const lineX2 = toX(DOM);
  const lineY2 = toY(r * DOM);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · slide r, watch the cloud tighten
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="img" aria-label="Scatter plot whose correlation coefficient r is controlled by a slider">
        {/* axes through the centre */}
        <line x1={toX(0)} y1={PAD} x2={toX(0)} y2={H - PAD} stroke="currentColor" className="text-muted-foreground/30" />
        <line x1={PAD} y1={toY(0)} x2={W - PAD} y2={toY(0)} stroke="currentColor" className="text-muted-foreground/30" />

        {/* trend line */}
        <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="currentColor" className="text-indigo-500/50" strokeWidth={1.5} strokeDasharray="4 3" />

        {/* points */}
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={3.5} className="fill-sky-600/80 dark:fill-sky-400/80" />
        ))}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          r = <span className="tabular-nums">{r.toFixed(2)}</span>
        </span>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.05}
          value={r}
          onChange={(e) => setR(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Correlation coefficient r"
        />
      </label>

      <p className="mt-2 text-xs text-muted-foreground">
        At r = ±1 the points fall exactly on a line; toward r = 0 the cloud loses any linear shape. Positive r
        slopes up, negative r slopes down. r is unitless and always lies in [−1, 1] — it captures tightness and
        direction, not how steep the line is.
      </p>
    </div>
  );
}
