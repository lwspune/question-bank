"use client";

/**
 * Slider: the species-area line on log scales, in the NEET concept's own terms
 * (nbobd-species-area).
 *
 * log S = log C + Z log A. The student moves the slope Z; the intercept stays
 * at log C = 1, the concept's self-check, so at Z = 0.2 and log A = 5 the
 * line gives log S = 2 and S = 100. A hundredfold area multiplies richness by
 * 10 to the power 2Z, about 2.5 at Z = 0.2 (the worked example). The two
 * shaded fans are the ranges the concept gives: Z of 0.1 to 0.2 for most
 * regions and groups, 0.6 to 1.2 for whole continents (1.15 for frugivorous
 * birds and mammals). Z is the slope and C the intercept, never the other way
 * (the concept's first trap).
 *
 * The maths is exported and pinned by tests/notes-w2-06.test.ts.
 */
import { useState } from "react";

export const LOG_C = 1;
export const Z_RANGE = { min: 0.1, max: 1.2, step: 0.05, start: 0.2 } as const;
export const REGION_Z = [0.1, 0.2] as const;
export const CONTINENT_Z = [0.6, 1.2] as const;
export const FRUGIVORE_Z = 1.15;

export function logS(z: number, logA: number): number {
  return LOG_C + z * logA;
}

/** How many times richness rises when the area is made `areaFactor` times larger. */
export function richnessFactor(z: number, areaFactor: number): number {
  return 10 ** (z * Math.log10(areaFactor));
}

export function zLabel(z: number): string {
  const r = Math.round(z * 100) / 100;
  if (r === FRUGIVORE_Z) return "frugivorous birds and mammals across continents";
  if (r >= REGION_Z[0] && r <= REGION_Z[1]) return "most regions and groups (0.1 to 0.2)";
  if (r >= CONTINENT_Z[0] && r <= CONTINENT_Z[1]) return "whole continents (0.6 to 1.2)";
  return "between the two ranges";
}

/** One decimal under 10, whole numbers with commas above. */
export function fmtCount(n: number): string {
  if (n < 10) return (Math.round(n * 10) / 10).toFixed(1);
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const PLOT = { x0: 40, y0: 206, w: 250, h: 184, logAMax: 5, logSMax: 8 } as const;
const px = (logA: number) => Math.round((PLOT.x0 + (logA / PLOT.logAMax) * PLOT.w) * 100) / 100;
const py = (ls: number) => Math.round((PLOT.y0 - (ls / PLOT.logSMax) * PLOT.h) * 100) / 100;

function fan(z0: number, z1: number): string {
  return `${px(0)},${py(LOG_C)} ${px(PLOT.logAMax)},${py(logS(z0, PLOT.logAMax))} ${px(PLOT.logAMax)},${py(logS(z1, PLOT.logAMax))}`;
}

export default function NeetSpeciesArea() {
  const [zc, setZc] = useState<number>(Math.round(Z_RANGE.start * 100));
  const z = zc / 100;
  const end = logS(z, PLOT.logAMax);
  const endY = py(end);
  const zText = z.toFixed(2);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · species and area on log scales
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label={`log S against log A: a straight line from log C = 1 with slope Z = ${zText}. At log A = 5, log S = ${end.toFixed(2)}. Most regions have Z from 0.1 to 0.2; whole continents 0.6 to 1.2`}
      >
        {/* Axes. */}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0 + PLOT.w} y2={PLOT.y0} className="stroke-foreground" strokeWidth={1} />
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y0 - PLOT.h} className="stroke-foreground" strokeWidth={1} />
        {[0, 1, 2, 3, 4, 5].map((a) => (
          <text key={`xa-${a}`} x={px(a)} y={PLOT.y0 + 12} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {a}
          </text>
        ))}
        {[0, 2, 4, 6, 8].map((s) => (
          <text key={`ys-${s}`} x={PLOT.x0 - 5} y={py(s) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
            {s}
          </text>
        ))}
        <text x={PLOT.x0 + PLOT.w} y={PLOT.y0 + 26} textAnchor="end" className="fill-muted-foreground text-[10px]">
          log A (area)
        </text>
        <text x={PLOT.x0 + 6} y={PLOT.y0 - PLOT.h + 4} className="fill-muted-foreground text-[10px]">
          log S (species richness)
        </text>

        {/* The ranges NCERT gives. */}
        <polygon points={fan(REGION_Z[0], REGION_Z[1])} className="fill-emerald-200/70 dark:fill-emerald-800/50" />
        <polygon points={fan(CONTINENT_Z[0], CONTINENT_Z[1])} className="fill-amber-200/60 dark:fill-amber-800/40" />
        <text x={px(2.6)} y={py(logS(0.1, 2.6)) + 16} className="fill-emerald-800 text-[9.5px] dark:fill-emerald-300">
          most regions: Z 0.1 to 0.2
        </text>
        <text x={px(0.15)} y={py(6.6)} className="fill-amber-800 text-[9.5px] dark:fill-amber-300">
          whole continents: Z 0.6 to 1.2
        </text>

        {/* The line for the chosen Z. */}
        <line x1={px(0)} y1={py(LOG_C)} x2={px(PLOT.logAMax)} y2={endY} className="stroke-indigo-700 dark:stroke-indigo-300" strokeWidth={2.2} />
        <circle cx={px(0)} cy={py(LOG_C)} r={3} className="fill-indigo-700 dark:fill-indigo-300" />
        <text x={px(0) + 6} y={py(LOG_C) + 15} className="fill-foreground text-[10px] font-semibold">
          log C = 1
        </text>
        <circle cx={px(PLOT.logAMax)} cy={endY} r={3} className="fill-indigo-700 dark:fill-indigo-300" />
        <text x={px(PLOT.logAMax) - 6} y={endY - 7} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          {`slope Z = ${zText}`}
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Slope Z: <span className="tabular-nums">{zText}</span> ({zLabel(z)})
        </span>
        <input
          type="range"
          min={Math.round(Z_RANGE.min * 100)}
          max={Math.round(Z_RANGE.max * 100)}
          step={Math.round(Z_RANGE.step * 100)}
          value={zc}
          onChange={(e) => setZc(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Slope Z of the species-area line"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          At log A = 5: log S = 1 + {zText} × 5 = {end.toFixed(2)}, so S ≈ {fmtCount(10 ** end)}
        </p>
        <p className="text-muted-foreground tabular-nums">
          Area 100 times larger: species about {fmtCount(richnessFactor(z, 100))} times as many
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        On ordinary axes species richness against area is a rectangular hyperbola; on log scales it is this straight line.
        Z is the slope (the regression coefficient) and C the Y-intercept.
      </p>
    </div>
  );
}
