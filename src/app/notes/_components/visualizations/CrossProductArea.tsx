"use client";

import { useState } from "react";

/**
 * Interactive: two vectors a and b in the plane span a parallelogram whose
 * area is |a × b| = |a₁b₂ − a₂b₁|. The slider-driven shape shows the area
 * collapse to zero as the vectors become parallel, and the sign of the
 * z-component flips as b crosses a (right-hand rule: out of vs into the page).
 *
 * Pedagogical aim: "cross-product magnitude = parallelogram area" and
 * "triangle area is half" made literal, plus the direction intuition.
 */

const W = 360;
const H = 320;
const OX = W / 2;
const OY = H / 2;
// Scaled so the far parallelogram vertex a+b (components up to ±16) stays on canvas.
const SCALE = 9;
const AXIS = 8;

const sx = (x: number) => OX + x * SCALE;
const sy = (y: number) => OY - y * SCALE;

export default function CrossProductArea() {
  const [a1, setA1] = useState(5);
  const [a2, setA2] = useState(1);
  const [b1, setB1] = useState(1);
  const [b2, setB2] = useState(4);

  const cross = a1 * b2 - a2 * b1; // z-component of a × b
  const area = Math.abs(cross);
  const triangle = area / 2;
  const direction =
    cross > 0 ? "out of the page" : cross < 0 ? "into the page" : "zero (parallel)";

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the parallelogram area is |a × b|
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Cross product area visualization"
      >
        <defs>
          <marker id="cp-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="cp-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
        </defs>

        {/* Axes (span the full canvas so the far vertex never runs off a short axis) */}
        <line x1={0} y1={OY} x2={W} y2={OY} stroke="currentColor" className="text-muted-foreground/30" />
        <line x1={OX} y1={0} x2={OX} y2={H} stroke="currentColor" className="text-muted-foreground/30" />

        {/* Parallelogram O, A, A+B, B */}
        <polygon
          points={`${sx(0)},${sy(0)} ${sx(a1)},${sy(a2)} ${sx(a1 + b1)},${sy(a2 + b2)} ${sx(b1)},${sy(b2)}`}
          className={
            cross >= 0
              ? "fill-indigo-500/20 stroke-indigo-500/60"
              : "fill-rose-500/20 stroke-rose-500/60"
          }
          strokeWidth={1.5}
        />

        {/* a and b from origin */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(a1)} y2={sy(a2)} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#cp-sky)" />
        <line x1={sx(0)} y1={sy(0)} x2={sx(b1)} y2={sy(b2)} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2} markerEnd="url(#cp-amber)" />

        <text x={sx(a1)} y={sy(a2) - 6} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[11px] font-semibold">a</text>
        <text x={sx(b1) - 8} y={sy(b2)} textAnchor="end" className="fill-amber-700 dark:fill-amber-300 text-[11px] font-semibold">b</text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-4">
        {([
          ["a₁", a1, setA1, "accent-sky-600"],
          ["a₂", a2, setA2, "accent-sky-600"],
          ["b₁", b1, setB1, "accent-amber-600"],
          ["b₂", b2, setB2, "accent-amber-600"],
        ] as const).map(([label, val, setter, accent]) => (
          <label key={label} className="flex flex-col gap-1">
            <span className="font-medium text-foreground">
              {label}: <span className="tabular-nums">{val}</span>
            </span>
            <input
              type="range"
              min={-AXIS}
              max={AXIS}
              step={1}
              value={val}
              onChange={(e) => setter(Number(e.target.value))}
              className={accent}
              aria-label={`Component ${label}`}
            />
          </label>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          |a × b| = <span className="tabular-nums">{area}</span> (parallelogram area)
        </span>
        <span className="text-muted-foreground">
          triangle = <span className="tabular-nums">{triangle}</span>
        </span>
        <span className="text-muted-foreground">
          direction: {direction}
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        |a × b| = |a₁b₂ − a₂b₁| is exactly the parallelogram area; the triangle
        on a and b is half of it. Make a and b parallel and the area — and the
        cross product — collapse to zero. The fill colour flips with the
        right-hand-rule direction (out of vs into the page).
      </p>
    </div>
  );
}
