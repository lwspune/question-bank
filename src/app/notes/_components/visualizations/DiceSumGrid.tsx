"use client";

import { useState } from "react";

/**
 * Interactive: the 6x6 grid of the 36 equally-likely two-dice outcomes.
 * A slider picks a target sum; cells on that anti-diagonal light up and the
 * count / 36 updates live.
 *
 * Pedagogical aim: make "n(E)/36" visible — see why sum = 7 has 6 ways (the
 * main anti-diagonal) and the counts taper symmetrically to 1 at the corners.
 */

const N = 6;
const CELL = 34;
const PAD = 22; // room for the axis labels
const GRID = N * CELL;
const W = GRID + PAD;
const H = GRID + PAD;

export default function DiceSumGrid() {
  const [target, setTarget] = useState(7);

  let count = 0;
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (i + j === target) count++;
    }
  }

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · two-dice sample space
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto max-w-[320px] mx-auto"
        role="img"
        aria-label="Six by six grid of two-dice outcomes with cells summing to the target highlighted"
      >
        {/* Column headers (second die) */}
        {Array.from({ length: N }, (_, c) => (
          <text
            key={`col-${c}`}
            x={PAD + c * CELL + CELL / 2}
            y={PAD - 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            {c + 1}
          </text>
        ))}
        {/* Row headers (first die) */}
        {Array.from({ length: N }, (_, r) => (
          <text
            key={`row-${r}`}
            x={PAD - 8}
            y={PAD + r * CELL + CELL / 2 + 3}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            {r + 1}
          </text>
        ))}

        {/* Cells */}
        {Array.from({ length: N }, (_, r) =>
          Array.from({ length: N }, (_, c) => {
            const i = r + 1;
            const j = c + 1;
            const hit = i + j === target;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={PAD + c * CELL}
                  y={PAD + r * CELL}
                  width={CELL - 2}
                  height={CELL - 2}
                  rx={3}
                  className={
                    hit
                      ? "fill-indigo-500/80 dark:fill-indigo-400/80"
                      : "fill-muted/40 stroke-border"
                  }
                  strokeWidth={0.5}
                />
                <text
                  x={PAD + c * CELL + (CELL - 2) / 2}
                  y={PAD + r * CELL + (CELL - 2) / 2 + 3}
                  textAnchor="middle"
                  className={
                    hit
                      ? "fill-white text-[9px] font-semibold"
                      : "fill-muted-foreground text-[9px]"
                  }
                >
                  {i + j}
                </text>
              </g>
            );
          })
        )}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Target sum: <span className="tabular-nums">{target}</span>
        </span>
        <input
          type="range"
          min={2}
          max={12}
          step={1}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Target sum"
        />
      </label>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          favourable = <span className="tabular-nums">{count}</span>
        </span>
        <span className="text-muted-foreground">
          P(sum = {target}) = {count}/36 ={" "}
          <span className="tabular-nums">
            {count === 0 ? "0" : `${count / gcd(count, 36)}/${36 / gcd(count, 36)}`}
          </span>
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Each of the 36 cells is one equally-likely ordered outcome (first die,
        second die). The highlighted anti-diagonal is the event &quot;sum =
        {" "}
        {target}&quot;; its size over 36 is the probability. The count peaks at
        6 for a sum of 7 and tapers to 1 at sums 2 and 12.
      </p>
    </div>
  );
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
