"use client";

import { useMemo, useState } from "react";

/**
 * Interactive: drag the two endpoints of a candidate regression line
 * (sliders for accessibility + mobile) and watch the sum of squared
 * residuals (SSE) update live. Below the SVG we also show the
 * least-squares minimum SSE so students can target it.
 *
 * Pedagogical aim: make "best fit = minimum SSE" intuitive by letting
 * the student move the line and feel the SSE drop.
 */

const POINTS: { x: number; y: number }[] = [
  { x: 1, y: 2.5 },
  { x: 2, y: 2.8 },
  { x: 3, y: 4.1 },
  { x: 4, y: 5.0 },
  { x: 5, y: 5.5 },
  { x: 6, y: 6.5 },
  { x: 7, y: 7.4 },
  { x: 8, y: 8.0 },
  { x: 9, y: 9.1 },
];

const X_MIN = 0;
const X_MAX = 10;
const Y_MIN = 0;
const Y_MAX = 12;

const W = 360;
const H = 260;
const PAD_L = 36;
const PAD_R = 12;
const PAD_T = 12;
const PAD_B = 28;

function xToSvg(x: number) {
  return PAD_L + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - PAD_L - PAD_R);
}
function yToSvg(y: number) {
  return H - PAD_B - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD_T - PAD_B);
}

function lineYAt(x: number, leftY: number, rightY: number) {
  // Endpoints are at x = X_MIN (leftY) and x = X_MAX (rightY).
  const slope = (rightY - leftY) / (X_MAX - X_MIN);
  return leftY + slope * (x - X_MIN);
}

function sseFor(leftY: number, rightY: number) {
  return POINTS.reduce((acc, p) => {
    const predicted = lineYAt(p.x, leftY, rightY);
    const r = p.y - predicted;
    return acc + r * r;
  }, 0);
}

// Least-squares optimum, computed once.
const OPTIMUM = (() => {
  const n = POINTS.length;
  const sumX = POINTS.reduce((a, p) => a + p.x, 0);
  const sumY = POINTS.reduce((a, p) => a + p.y, 0);
  const sumXY = POINTS.reduce((a, p) => a + p.x * p.y, 0);
  const sumX2 = POINTS.reduce((a, p) => a + p.x * p.x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const leftY = intercept + slope * X_MIN;
  const rightY = intercept + slope * X_MAX;
  return { leftY, rightY, sse: sseFor(leftY, rightY) };
})();

export default function RegressionLineFit() {
  const [leftY, setLeftY] = useState(1);
  const [rightY, setRightY] = useState(11);

  const sse = useMemo(() => sseFor(leftY, rightY), [leftY, rightY]);
  const atOptimum = Math.abs(sse - OPTIMUM.sse) < 0.05;

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/60 dark:bg-emerald-950/15 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        Visualization · drag the line, watch the error
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Regression line fit visualization"
      >
        {/* Axes */}
        <line
          x1={xToSvg(X_MIN)}
          x2={xToSvg(X_MAX)}
          y1={yToSvg(Y_MIN)}
          y2={yToSvg(Y_MIN)}
          stroke="currentColor"
          className="text-muted-foreground/40"
          strokeWidth={1}
        />
        <line
          x1={xToSvg(X_MIN)}
          x2={xToSvg(X_MIN)}
          y1={yToSvg(Y_MIN)}
          y2={yToSvg(Y_MAX)}
          stroke="currentColor"
          className="text-muted-foreground/40"
          strokeWidth={1}
        />
        {/* Axis ticks (light) */}
        {[2, 4, 6, 8, 10].map((t) => (
          <g key={`xt-${t}`}>
            <line
              x1={xToSvg(t)}
              x2={xToSvg(t)}
              y1={yToSvg(Y_MIN)}
              y2={yToSvg(Y_MIN) + 4}
              stroke="currentColor"
              className="text-muted-foreground/40"
            />
            <text
              x={xToSvg(t)}
              y={yToSvg(Y_MIN) + 16}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {t}
            </text>
          </g>
        ))}
        {[3, 6, 9, 12].map((t) => (
          <g key={`yt-${t}`}>
            <line
              x1={xToSvg(X_MIN) - 4}
              x2={xToSvg(X_MIN)}
              y1={yToSvg(t)}
              y2={yToSvg(t)}
              stroke="currentColor"
              className="text-muted-foreground/40"
            />
            <text
              x={xToSvg(X_MIN) - 8}
              y={yToSvg(t) + 3}
              textAnchor="end"
              className="fill-muted-foreground text-[10px]"
            >
              {t}
            </text>
          </g>
        ))}

        {/* Residual segments */}
        {POINTS.map((p, i) => {
          const yHat = lineYAt(p.x, leftY, rightY);
          return (
            <line
              key={`r-${i}`}
              x1={xToSvg(p.x)}
              x2={xToSvg(p.x)}
              y1={yToSvg(p.y)}
              y2={yToSvg(yHat)}
              stroke="currentColor"
              className="text-rose-500/70"
              strokeWidth={1}
              strokeDasharray="3 2"
            />
          );
        })}

        {/* Candidate regression line */}
        <line
          x1={xToSvg(X_MIN)}
          x2={xToSvg(X_MAX)}
          y1={yToSvg(leftY)}
          y2={yToSvg(rightY)}
          stroke="currentColor"
          className="text-indigo-600 dark:text-indigo-400"
          strokeWidth={2}
        />

        {/* Scatter points */}
        {POINTS.map((p, i) => (
          <circle
            key={`p-${i}`}
            cx={xToSvg(p.x)}
            cy={yToSvg(p.y)}
            r={4}
            className="fill-sky-600 dark:fill-sky-400"
          />
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Left endpoint y: <span className="tabular-nums">{leftY.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min={Y_MIN}
            max={Y_MAX}
            step={0.1}
            value={leftY}
            onChange={(e) => setLeftY(Number(e.target.value))}
            className="accent-indigo-600"
            aria-label="Left endpoint y value"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Right endpoint y: <span className="tabular-nums">{rightY.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min={Y_MIN}
            max={Y_MAX}
            step={0.1}
            value={rightY}
            onChange={(e) => setRightY(Number(e.target.value))}
            className="accent-indigo-600"
            aria-label="Right endpoint y value"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          SSE = <span className="tabular-nums">{sse.toFixed(2)}</span>
        </span>
        <span className="text-muted-foreground">
          Best possible: <span className="tabular-nums">{OPTIMUM.sse.toFixed(2)}</span>
        </span>
        {atOptimum && (
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
            ✓ at the minimum
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Red dashes are residuals (vertical distance from each point to the line).
        SSE is the sum of their squares. The least-squares regression line is the
        one that makes SSE as small as possible.
      </p>
    </div>
  );
}
