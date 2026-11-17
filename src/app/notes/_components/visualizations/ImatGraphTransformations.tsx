"use client";

import { useState } from "react";

/**
 * Interactive: the IMAT "Transformations of graphs" concept as y = a f(x − h) + k
 * with f(x) = x². The base y = x² stays drawn faint; three sliders set the
 * vertical stretch a (negative = reflection in the x-axis), the shift right h
 * and the shift up k. The first render is the concept's worked example,
 * y = 2(x − 3)² + 1 with vertex (3, 1).
 *
 * Pedagogical aim: feel the trap the concept warns about. A change inside the
 * bracket works against its sign: (x − 3) moves the graph 3 units RIGHT.
 * The pure helpers are pinned by tests/notes-imat-visuals-maths.test.ts.
 */

/** Values the stretch slider steps through (0 is left out: it flattens the graph). */
export const A_VALUES = [-3, -2, -1, -0.5, 0.5, 1, 2, 3] as const;

/** The worked example: y = 2(x − 3)² + 1. */
export const DEFAULT_TRANSFORM = { a: 2, h: 3, k: 1 } as const;

export function transformed(x: number, a: number, h: number, k: number): number {
  return a * (x - h) ** 2 + k;
}

/** Where the vertex of x² (at the origin) lands. */
export function vertexOf(h: number, k: number): { x: number; y: number } {
  return { x: h, y: k };
}

const MINUS = "−";

function num(n: number): string {
  return String(Math.abs(n));
}

/** The equation in the concept's notation, e.g. "y = 2(x − 3)² + 1". */
export function equationText(a: number, h: number, k: number): string {
  const coef = a === 1 ? "" : a === -1 ? MINUS : a < 0 ? `${MINUS}${num(a)}` : num(a);
  const square = h === 0 ? "x²" : h > 0 ? `(x ${MINUS} ${num(h)})²` : `(x + ${num(h)})²`;
  const tail = k === 0 ? "" : k > 0 ? ` + ${num(k)}` : ` ${MINUS} ${num(k)}`;
  return `y = ${coef}${square}${tail}`;
}

/** The moves that turn y = x² into the transformed graph, in plain words. */
export function describeMoves(a: number, h: number, k: number): string[] {
  const moves: string[] = [];
  if (a < 0) moves.push("reflection in the x-axis");
  if (Math.abs(a) !== 1) moves.push(`vertical stretch ×${num(a)}`);
  if (h > 0) moves.push(`shift ${num(h)} right`);
  if (h < 0) moves.push(`shift ${num(h)} left`);
  if (k > 0) moves.push(`shift ${num(k)} up`);
  if (k < 0) moves.push(`shift ${num(k)} down`);
  return moves;
}

// Plot geometry (viewBox units). x from −6 to 6, y from −6 to 8.
const W = 320;
const H = 220;
const X_MIN = -6;
const X_MAX = 6;
const Y_MIN = -6;
const Y_MAX = 8;
const PL = 14;
const PR = 14;
const PT = 10;
const PB = 10;
const sx = (x: number) => PL + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - PL - PR);
const sy = (y: number) => PT + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (H - PT - PB);

function curvePath(a: number, h: number, k: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const x = X_MIN + (i / 240) * (X_MAX - X_MIN);
    const y = Math.max(-40, Math.min(40, transformed(x, a, h, k)));
    pts.push(`${i === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function ImatGraphTransformations() {
  const [aIndex, setAIndex] = useState<number>(A_VALUES.indexOf(DEFAULT_TRANSFORM.a));
  const [h, setH] = useState<number>(DEFAULT_TRANSFORM.h);
  const [k, setK] = useState<number>(DEFAULT_TRANSFORM.k);
  const a = A_VALUES[aIndex];
  const v = vertexOf(h, k);
  const moves = describeMoves(a, h, k);
  const eq = equationText(a, h, k);
  const vxLabel = `(${v.x < 0 ? MINUS : ""}${num(v.x)}, ${v.y < 0 ? MINUS : ""}${num(v.y)})`;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · moving the graph of y = x²
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Graph of y = x squared, faint, and the transformed graph ${eq}, with its vertex at ${vxLabel}`}
      >
        <defs>
          <clipPath id="imat-gt-plot">
            <rect x={PL} y={PT} width={W - PL - PR} height={H - PT - PB} />
          </clipPath>
        </defs>

        {/* Grid every unit, faint */}
        {Array.from({ length: X_MAX - X_MIN + 1 }, (_, i) => X_MIN + i).map((x) => (
          <line key={`gx${x}`} x1={sx(x)} y1={PT} x2={sx(x)} y2={H - PB} stroke="currentColor" className="text-muted-foreground/15" />
        ))}
        {Array.from({ length: Y_MAX - Y_MIN + 1 }, (_, i) => Y_MIN + i).map((y) => (
          <line key={`gy${y}`} x1={PL} y1={sy(y)} x2={W - PR} y2={sy(y)} stroke="currentColor" className="text-muted-foreground/15" />
        ))}

        {/* Axes */}
        <line x1={PL} y1={sy(0)} x2={W - PR} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/60" />
        <line x1={sx(0)} y1={PT} x2={sx(0)} y2={H - PB} stroke="currentColor" className="text-muted-foreground/60" />
        {[-4, -2, 2, 4].map((x) => (
          <text key={`tx${x}`} x={sx(x)} y={sy(0) + 11} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
            {x < 0 ? `${MINUS}${-x}` : x}
          </text>
        ))}
        {[-4, -2, 2, 4, 6].map((y) => (
          <text key={`ty${y}`} x={sx(0) - 4} y={sy(y) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
            {y < 0 ? `${MINUS}${-y}` : y}
          </text>
        ))}
        <text x={W - PR - 2} y={sy(0) - 4} textAnchor="end" className="fill-muted-foreground text-[10px]">x</text>
        <text x={sx(0) + 5} y={PT + 9} className="fill-muted-foreground text-[10px]">y</text>

        <g clipPath="url(#imat-gt-plot)">
          {/* Base y = x², faint and dashed */}
          <path d={curvePath(1, 0, 0)} fill="none" stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3" className="text-muted-foreground/60" />
          {/* Transformed graph */}
          <path d={curvePath(a, h, k)} fill="none" stroke="currentColor" strokeWidth={2.5} className="text-indigo-600 dark:text-indigo-400" />
          {/* The vertex (amber dot) moves from (0, 0) to (h, k) */}
          {(h !== 0 || k !== 0) && (
            <line x1={sx(0)} y1={sy(0)} x2={sx(v.x)} y2={sy(v.y)} stroke="currentColor" strokeWidth={1.2} strokeDasharray="3 2" className="text-amber-600 dark:text-amber-400" />
          )}
          <circle cx={sx(0)} cy={sy(0)} r={3} className="fill-muted-foreground" />
          <circle cx={sx(v.x)} cy={sy(v.y)} r={3.5} className="fill-amber-600 dark:fill-amber-400" />
        </g>
        <text x={PL + 4} y={PT + 12} className="fill-muted-foreground text-[10px]">dashed: y = x²</text>
      </svg>

      <p className="mt-2 text-center font-serif text-base font-semibold text-foreground">{eq}</p>
      <p className="text-center text-xs text-muted-foreground">
        <span className="font-semibold text-amber-700 dark:text-amber-300">vertex {vxLabel}</span>
        {" · "}
        {moves.length ? moves.join(", ") : "no change: this is y = x²"}
      </p>

      <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            stretch a: <span className="tabular-nums">{a < 0 ? `${MINUS}${num(a)}` : a}</span>
          </span>
          <input
            type="range"
            min={0}
            max={A_VALUES.length - 1}
            step={1}
            value={aIndex}
            onChange={(e) => setAIndex(Number(e.target.value))}
            className="accent-indigo-600"
            aria-label="Vertical stretch a"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            shift right h: <span className="tabular-nums">{h < 0 ? `${MINUS}${num(h)}` : h}</span>
          </span>
          <input
            type="range"
            min={-4}
            max={4}
            step={1}
            value={h}
            onChange={(e) => setH(Number(e.target.value))}
            className="accent-amber-600"
            aria-label="Shift right h"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            shift up k: <span className="tabular-nums">{k < 0 ? `${MINUS}${num(k)}` : k}</span>
          </span>
          <input
            type="range"
            min={-4}
            max={4}
            step={1}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="accent-sky-600"
            aria-label="Shift up k"
          />
        </label>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The graph is y = a(x − h)² + k. Outside the bracket the signs mean what they say: + 1 moves it 1 up. Inside
        the bracket they work backwards: (x − 3) moves it 3 units right, (x + 3) moves it 3 units left. A negative a
        flips the graph in the x-axis, so it opens downwards.
      </p>
    </div>
  );
}
