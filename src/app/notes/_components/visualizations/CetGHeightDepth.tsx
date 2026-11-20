"use client";

import { useState } from "react";

/**
 * Interactive: g against distance from the earth's centre (concept
 * cetp-gr-altitude-depth). Inside, only the sphere below still pulls, so
 * g falls in a straight line, g(1 − d/R), to zero at the centre. Outside it
 * falls as gR²/(R + h)²: g/4 at h = R and g/9 at h = 2R. The dashed line
 * g(1 − 2h/R) is the small-height form, which leaves the true curve as h grows.
 *
 * The slider moves a point from the centre (depth R) to h = 2R in steps of
 * R/12. Its first position is the concept's worked example, h = 2R/3, where
 * g is 0.36 g (reduced by 64%). The marked points are the concept's own:
 * depth R/2 gives g/2, h = R gives g/4, h = 2R gives g/9. Pinned by
 * tests/notes-w2-02.test.ts.
 */

/** g as a fraction of the surface value at distance r from the centre (r in units of R). */
export function gRatio(r: number): number {
  if (r <= 0) return 0;
  return r <= 1 ? r : 1 / (r * r);
}

/** The small-height form 1 − 2h/R, with h = r − 1. */
export function smallHeightRatio(r: number): number {
  return 1 - 2 * (r - 1);
}

/** Slider position in twelfths of R: −12 is the centre, 0 the surface, +24 is h = 2R. */
export const POS_RANGE = { min: -12, max: 24, step: 1 } as const;
/** The worked example: h = 2R/3. */
export const DEFAULT_POS = 8;

export const posToR = (pos: number) => 1 + pos / 12;

/** The concept's marked points: distance from the centre (units of R), g ratio, label. */
export const MARKS: readonly { r: number; g: number; label: string }[] = [
  { r: 0.5, g: 1 / 2, label: "d = R/2: g/2" },
  { r: 2, g: 1 / 4, label: "h = R: g/4" },
  { r: 3, g: 1 / 9, label: "h = 2R: g/9" },
];

// Plot geometry (viewBox units).
export const PLOT = { x0: 34, x1: 304, y0: 168, y1: 44, rMax: 3 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (r: number) => r2(PLOT.x0 + (r / PLOT.rMax) * (PLOT.x1 - PLOT.x0));
export const py = (g: number) => r2(PLOT.y0 - g * (PLOT.y0 - PLOT.y1));

/** "2R/3" style text for a position in twelfths, reduced. */
export function twelfths(n: number): string {
  const a = Math.abs(n);
  if (a === 0) return "0";
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const g = gcd(a, 12);
  const num = a / g;
  const den = 12 / g;
  if (den === 1) return num === 1 ? "R" : `${num}R`;
  return `${num === 1 ? "" : num}R/${den}`;
}

export default function CetGHeightDepth() {
  const [pos, setPos] = useState<number>(DEFAULT_POS);
  const r = posToR(pos);
  const g = gRatio(r);
  const outside: string[] = [];
  for (let k = 0; k <= 80; k++) {
    const rr = 1 + (k / 80) * (PLOT.rMax - 1);
    outside.push(`${px(rr)},${py(gRatio(rr))}`);
  }
  const where =
    pos === 0
      ? "At the surface: g"
      : pos < 0
        ? `Depth d = ${twelfths(pos)}: g(1 − d/R) = ${g.toFixed(2)} g`
        : `Height h = ${twelfths(pos)}: gR²/(R + h)² = ${g.toFixed(2)} g`;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · how g changes below and above the surface
      </p>

      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label={`g as a fraction of its surface value against distance from the earth's centre. Inside the earth it rises in a straight line from zero at the centre to g at the surface; above, it falls as one over r squared, to g/4 at height R and g/9 at height 2R. The marked point is at ${g.toFixed(2)} g.`}
      >
        {/* Inside and outside bands */}
        <rect x={PLOT.x0} y={PLOT.y1 - 10} width={px(1) - PLOT.x0} height={PLOT.y0 - PLOT.y1 + 10} className="fill-amber-500/10 dark:fill-amber-400/10" />
        <text x={r2((PLOT.x0 + px(1)) / 2)} y={PLOT.y1 - 14} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          inside (depth d)
        </text>
        <text x={r2((px(1) + PLOT.x1) / 2)} y={PLOT.y1 - 14} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          outside (height h)
        </text>

        {/* Axes */}
        {[0, 0.25, 0.5, 1].map((t) => (
          <g key={t}>
            <line x1={PLOT.x0} y1={py(t)} x2={PLOT.x1} y2={py(t)} className="stroke-border" strokeWidth={t === 0 ? 1.2 : 0.6} />
            <text x={PLOT.x0 - 4} y={py(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t === 0 ? "0" : t === 1 ? "g" : t === 0.5 ? "g/2" : "g/4"}
            </text>
          </g>
        ))}
        {[
          { r: 0, t: "centre" },
          { r: 1, t: "R" },
          { r: 2, t: "2R" },
          { r: 3, t: "3R" },
        ].map((k) => (
          <text key={k.r} x={px(k.r)} y={PLOT.y0 + 13} textAnchor={k.r === 0 ? "start" : k.r === 3 ? "end" : "middle"} className="fill-muted-foreground text-[10px]">
            {k.t}
          </text>
        ))}
        <text x={PLOT.x1} y={PLOT.y0 + 27} textAnchor="end" className="fill-muted-foreground text-[10px]">
          distance from the centre r
        </text>
        <line x1={px(1)} y1={PLOT.y0} x2={px(1)} y2={PLOT.y1 - 10} strokeDasharray="3 3" className="stroke-muted-foreground" />

        {/* Small-height form, for small h only */}
        <line x1={px(1)} y1={py(1)} x2={px(1.5)} y2={py(0)} strokeDasharray="4 3" strokeWidth={1.3} className="stroke-muted-foreground" />
        <text x={px(1.5) + 3} y={py(0) - 4} className="fill-muted-foreground text-[10px]">
          g(1 − 2h/R): small h
        </text>

        {/* The true curve */}
        <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(1)} strokeWidth={2.5} className="stroke-amber-600 dark:stroke-amber-400" />
        <polyline points={outside.join(" ")} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-sky-600 dark:stroke-sky-400" />

        {/* The concept's points */}
        {MARKS.map((m) => (
          <g key={m.label}>
            <circle cx={px(m.r)} cy={py(m.g)} r={3} className="fill-foreground" />
            <text
              x={m.r < 1 ? px(m.r) + 5 : m.r === 3 ? px(m.r) - 2 : px(m.r) + 5}
              y={m.r < 1 ? py(m.g) + 12 : m.r === 3 ? py(m.g) - 14 : py(m.g) - 9}
              textAnchor={m.r === 3 ? "end" : "start"}
              className="fill-foreground text-[10px] font-semibold"
            >
              {m.label}
            </text>
          </g>
        ))}

        {/* The moving point */}
        <line x1={px(r)} y1={PLOT.y0} x2={px(r)} y2={py(g)} strokeDasharray="2 3" className="stroke-rose-600 dark:stroke-rose-400" />
        <circle cx={px(r)} cy={py(g)} r={4.5} className="fill-rose-600 dark:fill-rose-400" />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Position: <span className="tabular-nums">{pos === 0 ? "the surface" : pos < 0 ? `depth ${twelfths(pos)}` : `height ${twelfths(pos)}`}</span>
        </span>
        <input
          type="range"
          min={POS_RANGE.min}
          max={POS_RANGE.max}
          step={POS_RANGE.step}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="accent-rose-600"
          aria-label="Position from the centre of the earth (depth R) to a height of 2R, in steps of R/12"
        />
      </label>

      <p className="mt-2 text-sm font-medium text-foreground tabular-nums">{where}</p>

      <p className="mt-2 text-xs text-muted-foreground">
        Below the surface only the sphere of radius R − d still pulls, so g falls in a straight line and is zero at the centre. Above it g falls
        as 1/r². At h = 2R/3, g = g(3/5)² = 0.36 g: reduced by 64%. The dashed line g(1 − 2h/R) works only while h is much smaller than R.
      </p>
    </div>
  );
}
