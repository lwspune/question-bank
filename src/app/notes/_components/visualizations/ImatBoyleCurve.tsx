"use client";

import { useState } from "react";

/**
 * Interactive: Boyle's law at constant temperature. The P-V curve of the
 * concept's worked example (a syringe: 60 cm³ at 100 kPa, so P × V = 6000
 * kPa·cm³). A slider sets the volume; the point slides along the hyperbola
 * and the shaded rectangle under it (width V, height P) keeps the same area.
 *
 * Pedagogical aim: feel "inverse proportion": halve V and P doubles, and the
 * product never changes. The first render shows the worked example's answer
 * (24 cm³, 250 kPa) beside its start point. Numbers pinned by
 * tests/notes-imat-visuals-chem2.test.ts.
 */

/** The worked example: 60 cm³ at 100 kPa, pushed in to 24 cm³. */
export const BOYLE = { p1: 100, v1: 60, v2: 24 } as const;

/** P × V for the syringe, in kPa·cm³. */
export const PV_CONST = BOYLE.p1 * BOYLE.v1;

/** Slider range for the volume, in cm³. */
export const V_RANGE = { min: 20, max: 120, step: 4 } as const;

/** Pressure (kPa) at volume v (cm³) on the syringe's isotherm. */
export function pressureAt(v: number): number {
  return PV_CONST / v;
}

// Plot geometry (viewBox units).
const W = 320;
const H = 200;
const PL = 46;
const PR = 306;
const PT = 14;
const PB = 162;
export const AXIS_MAX = { v: 120, p: 300 } as const;

const xOf = (v: number) => PL + (v / AXIS_MAX.v) * (PR - PL);
const yOf = (p: number) => PB - (p / AXIS_MAX.p) * (PB - PT);

/** The hyperbola, sampled every 1 cm³ across the slider range. */
export function curvePoints(): { v: number; p: number }[] {
  const pts: { v: number; p: number }[] = [];
  for (let v = V_RANGE.min; v <= V_RANGE.max; v += 1) pts.push({ v, p: pressureAt(v) });
  return pts;
}

const AXIS = "text-muted-foreground/60";

export default function ImatBoyleCurve() {
  const [v, setV] = useState<number>(BOYLE.v2);
  const p = pressureAt(v);
  const path = curvePoints()
    .map((pt, i) => `${i === 0 ? "M" : "L"}${xOf(pt.v).toFixed(1)},${yOf(pt.p).toFixed(1)}`)
    .join(" ");
  const x = xOf(v);
  const y = yOf(p);
  const sx = xOf(BOYLE.v1);
  const sy = yOf(BOYLE.p1);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · Boyle&apos;s law: P × V stays the same
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Pressure against volume at constant temperature: a curve on which P times V is always 6000 kPa cm³. Marked: the start, 60 cm³ at 100 kPa, and the chosen point, ${v} cm³ at ${Math.round(p)} kPa.`}
      >
        {/* Shaded P × V rectangle under the moving point */}
        <rect x={PL} y={y} width={x - PL} height={PB - y} className="fill-sky-500/15 dark:fill-sky-400/15" />

        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="currentColor" className={AXIS} />
        {[0, 100, 200, 300].map((t) => (
          <g key={`p${t}`}>
            <line x1={PL - 3} y1={yOf(t)} x2={PL} y2={yOf(t)} stroke="currentColor" className={AXIS} />
            <text x={PL - 6} y={yOf(t) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        {[0, 20, 40, 60, 80, 100, 120].map((t) => (
          <g key={`v${t}`}>
            <line x1={xOf(t)} y1={PB} x2={xOf(t)} y2={PB + 3} stroke="currentColor" className={AXIS} />
            <text x={xOf(t)} y={PB + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        <text x={(PL + PR) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          volume V (cm³)
        </text>
        <text x={10} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 10 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[10px]">
          pressure P (kPa)
        </text>

        {/* The isotherm */}
        <path d={path} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={2} />

        {/* Start point: 60 cm³, 100 kPa */}
        <rect x={PL} y={sy} width={sx - PL} height={PB - sy} fill="none" strokeDasharray="3 3" className="stroke-amber-600 dark:stroke-amber-400" />
        <circle cx={sx} cy={sy} r={4} className="fill-amber-500 dark:fill-amber-400" />
        <text x={sx + 6} y={sy - 6} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          start: 60 cm³, 100 kPa
        </text>

        {/* Moving point */}
        <line x1={x} y1={y} x2={x} y2={PB} strokeDasharray="2 3" stroke="currentColor" className={AXIS} />
        <circle cx={x} cy={y} r={5} className="fill-sky-600 stroke-background dark:fill-sky-400" strokeWidth={1.5} />
        <text
          x={x > 200 ? x - 8 : x + 8}
          y={x > 200 ? y - 10 : Math.max(PT + 10, y - 4)}
          textAnchor={x > 200 ? "end" : "start"}
          className="fill-foreground text-[11px] font-semibold tabular-nums">
          {v} cm³, {Math.round(p)} kPa
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Volume: <span className="tabular-nums">{v} cm³</span>
        </span>
        <input
          type="range"
          min={V_RANGE.min}
          max={V_RANGE.max}
          step={V_RANGE.step}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Volume of the gas in cubic centimetres"
        />
      </label>

      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          P = <span className="tabular-nums">{Math.round(p)}</span> kPa
        </span>
        <span className="text-muted-foreground">
          P × V = <span className="tabular-nums">{Math.round(p * v)}</span> kPa·cm³
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The syringe starts at 60 cm³ and 100 kPa. Pushed in to 24 cm³ (2.5 times smaller), its pressure rises 2.5
        times, to 250 kPa. The shaded rectangle is P × V: as you move the slider its shape changes but its area
        stays 6000. The temperature is the same at every point on this curve.
      </p>
    </div>
  );
}
