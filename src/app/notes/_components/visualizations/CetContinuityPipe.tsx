"use client";

import { useState } from "react";

/**
 * Interactive: the equation of continuity, A₁v₁ = A₂v₂ (concept
 * cetp-fl-continuity). Water flows through a pipe of radius R that narrows to
 * radius r₂. The same volume passes each section every second, so where the
 * area is smaller the water moves faster. A slider sets r₂.
 *
 * It opens on the concept's self-check: radius R to R/3, so the area falls to
 * a ninth and the speed V becomes 9V (not 3V: the trap). The shaded blocks are
 * the water that passes each section in one second: the narrow block is nine
 * times as long, and its end circle a ninth of the area. Pinned by
 * tests/notes-cet-visuals-phys-c.test.ts.
 */

/** Narrow radius as a fraction of the wide radius R; the first is the self-check's R/3. */
export const RADIUS_RATIOS = [1 / 3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] as const;

/** Area ratio A₂/A₁ for a narrow radius k·R (circular pipe: A ∝ r²). */
export function areaRatio(k: number): number {
  return k * k;
}

/** Speed in the narrow part, in units of the wide-part speed V: v₂ = A₁v₁/A₂. */
export function narrowSpeed(k: number): number {
  return 1 / areaRatio(k);
}

/** "R/3" for the self-check case, "0.5R" otherwise. */
export function ratioLabel(k: number): string {
  return Math.abs(k - 1 / 3) < 1e-9 ? "R/3" : k === 1 ? "R" : `${k.toFixed(1)}R`;
}

// Geometry (viewBox units).
const AXIS_Y = 132;
const HALF = 30; // the wide pipe's radius on screen
const WIDE = { x0: 8, x1: 120 } as const;
const NARROW = { x0: 146, x1: 312 } as const;
/** Length on screen of the water that passes in one second at speed V. */
export const BLOCK_V = 12;

const r2 = (n: number) => Math.round(n * 100) / 100;

export default function CetContinuityPipe() {
  const [idx, setIdx] = useState(0);
  const k = RADIUS_RATIOS[idx];
  const h = r2(HALF * k);
  const v2 = narrowSpeed(k);
  const narrowBlock = r2(BLOCK_V * v2);
  const pipe = `M ${WIDE.x0} ${AXIS_Y - HALF} L ${WIDE.x1} ${AXIS_Y - HALF} L ${NARROW.x0} ${AXIS_Y - h} L ${NARROW.x1} ${AXIS_Y - h} L ${NARROW.x1} ${AXIS_Y + h} L ${NARROW.x0} ${AXIS_Y + h} L ${WIDE.x1} ${AXIS_Y + HALF} L ${WIDE.x0} ${AXIS_Y + HALF} Z`;
  const wideBlockX = 60;
  const narrowBlockX = NARROW.x0 + 12;
  const areaText = k === 1 ? "A₂ = A₁" : `A₂ = A₁ × ${areaRatio(k).toFixed(2)}`;
  const v2Text = Math.abs(k - 1 / 3) < 1e-9 ? "9V" : `${v2.toFixed(2)}V`;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · narrow pipe, faster flow
      </p>

      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label={`Water flows through a pipe of radius R that narrows to ${ratioLabel(k)}. The area falls to ${areaRatio(k).toFixed(2)} of the wide area, so the speed rises from V to ${v2Text}; the same volume passes each section every second.`}
      >
        {/* End views: the two cross-sections, to scale */}
        <circle cx={64} cy={50} r={HALF} className="fill-sky-200/70 stroke-sky-600 dark:fill-sky-900/50 dark:stroke-sky-400" strokeWidth={1.5} />
        <text x={64} y={54} textAnchor="middle" className="fill-sky-900 text-[11px] font-semibold dark:fill-sky-100">
          A₁
        </text>
        <circle cx={228} cy={50} r={h} className="fill-sky-200/70 stroke-sky-600 dark:fill-sky-900/50 dark:stroke-sky-400" strokeWidth={1.5} />
        <text x={228 + h + 4} y={54} className="fill-sky-900 text-[11px] font-semibold dark:fill-sky-100">
          A₂
        </text>
        <text x={8} y={14} className="fill-muted-foreground text-[10px]">
          wide: radius R
        </text>
        <text x={312} y={14} textAnchor="end" className="fill-muted-foreground text-[10px]">
          narrow: radius {ratioLabel(k)}
        </text>

        {/* The pipe, side view */}
        <path d={pipe} className="fill-sky-100 stroke-slate-500 dark:fill-sky-950/60 dark:stroke-slate-400" strokeWidth={1.5} />

        {/* Water passing each section in one second */}
        <rect x={wideBlockX} y={AXIS_Y - HALF} width={BLOCK_V} height={2 * HALF} className="fill-sky-500/70 dark:fill-sky-500/60" />
        <rect x={narrowBlockX} y={r2(AXIS_Y - h)} width={narrowBlock} height={r2(2 * h)} className="fill-sky-500/70 dark:fill-sky-500/60" />

        {/* Speed arrows, length in proportion to the speed */}
        <line x1={wideBlockX} y1={AXIS_Y + HALF + 12} x2={wideBlockX + BLOCK_V} y2={AXIS_Y + HALF + 12} strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
        <polygon points={`${wideBlockX + BLOCK_V + 6},${AXIS_Y + HALF + 12} ${wideBlockX + BLOCK_V},${AXIS_Y + HALF + 8} ${wideBlockX + BLOCK_V},${AXIS_Y + HALF + 16}`} className="fill-rose-600 dark:fill-rose-400" />
        <text x={wideBlockX + BLOCK_V + 10} y={AXIS_Y + HALF + 16} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          v₁ = V
        </text>
        <line x1={narrowBlockX} y1={AXIS_Y + HALF + 12} x2={r2(narrowBlockX + narrowBlock)} y2={AXIS_Y + HALF + 12} strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
        <polygon
          points={`${r2(narrowBlockX + narrowBlock + 6)},${AXIS_Y + HALF + 12} ${r2(narrowBlockX + narrowBlock)},${AXIS_Y + HALF + 8} ${r2(narrowBlockX + narrowBlock)},${AXIS_Y + HALF + 16}`}
          className="fill-rose-600 dark:fill-rose-400"
        />
        <text x={narrowBlockX} y={AXIS_Y + HALF + 28} className="fill-rose-700 text-[11px] font-semibold tabular-nums dark:fill-rose-300">
          v₂ = {v2Text}
        </text>

        <text x={160} y={AXIS_Y - HALF - 8} textAnchor="middle" className="fill-foreground text-[10px]">
          shaded: the water that passes in 1 s
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Narrow radius r₂: <span className="tabular-nums">{ratioLabel(k)}</span>
        </span>
        <input
          type="range"
          min={0}
          max={RADIUS_RATIOS.length - 1}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Radius of the narrow part, as a fraction of the wide radius R"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          {areaText}, so v₂ = A₁v₁/A₂ = {v2Text}
        </p>
        <p className="text-muted-foreground">Q = A₁v₁ = A₂v₂: the same volume every second through both sections.</p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Area goes as the radius squared. A third of the radius is a ninth of the area, so the water moves nine times
        faster, not three. The two shaded blocks hold the same volume: the narrow one is longer but thinner.
      </p>
    </div>
  );
}
