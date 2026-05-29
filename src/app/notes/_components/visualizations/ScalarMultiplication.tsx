"use client";

import { useState } from "react";

/**
 * Interactive: a slider scales a fixed vector v by k. Watch k·v stretch,
 * shrink, and flip direction as k crosses zero.
 *
 * Pedagogical aim: scalar multiplication changes length by |k| and reverses
 * direction when k < 0, leaving the line of action the same.
 */

const W = 320;
const H = 240;
const OX = 160;
const OY = 120;
const SC = 20;
const V = { x: 2, y: 1 };

const sx = (x: number) => OX + x * SC;
const sy = (y: number) => OY - y * SC;
const MAG_V = Math.hypot(V.x, V.y);

export default function ScalarMultiplication() {
  const [k, setK] = useState(2);
  const kv = { x: k * V.x, y: k * V.y };

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · slide k, scale the vector
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="img" aria-label="A vector scaled by a slider value k">
        <defs>
          <marker id="sm-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="sm-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        <line x1={sx(-7)} y1={sy(0)} x2={sx(7)} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/30" />
        <line x1={sx(0)} y1={sy(-5)} x2={sx(0)} y2={sy(5)} stroke="currentColor" className="text-muted-foreground/30" />

        {/* k·v (drawn first, thicker) */}
        {Math.abs(k) > 0.001 && (
          <line x1={sx(0)} y1={sy(0)} x2={sx(kv.x)} y2={sy(kv.y)} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={3.5} markerEnd="url(#sm-indigo)" />
        )}
        {/* v */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(V.x)} y2={sy(V.y)} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#sm-sky)" />

        <text x={sx(V.x) + 6} y={sy(V.y) - 4} className="fill-sky-700 dark:fill-sky-300 text-[11px] font-semibold">v</text>
        {Math.abs(k) > 0.5 && (
          <text x={sx(kv.x) + 6} y={sy(kv.y) + 4} className="fill-indigo-700 dark:fill-indigo-300 text-[11px] font-semibold">k·v</text>
        )}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          k = <span className="tabular-nums">{k.toFixed(1)}</span>
        </span>
        <input type="range" min={-2} max={3} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} className="accent-indigo-600" aria-label="Scalar k" />
      </label>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground tabular-nums">k·v = ({kv.x.toFixed(1)}, {kv.y.toFixed(1)})</span>
        <span className="text-muted-foreground tabular-nums">|k·v| = |k|·|v| = {(Math.abs(k) * MAG_V).toFixed(2)}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Multiplying by k scales the length by |k| and keeps the same line. k &gt; 1 stretches, 0 &lt; k &lt; 1
        shrinks, k &lt; 0 flips to the opposite direction, and k = 0 collapses it to the zero vector.
      </p>
    </div>
  );
}
