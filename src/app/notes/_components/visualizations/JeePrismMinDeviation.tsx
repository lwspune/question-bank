"use client";

import { useState } from "react";

/**
 * Interactive: a ray through a prism and its deviation (concept
 * jpray-min-deviation). A slider sets the angle of incidence i; Snell's law at
 * the first face gives r₁, then r₂ = A − r₁, Snell's law at the second face
 * gives e, and the deviation is δ = i + e − A. Under the prism, the δ–i curve
 * with the current point on it: one minimum, where the ray passes
 * symmetrically (i = e, r₁ = r₂ = A/2, parallel to the base).
 *
 * Numbers: the concept's worked example, A = 60° and δm = 40°, so i = 50° at
 * the minimum and μ = sin 50°/sin 30° = 0.766/0.5 ≈ 1.53. The figure uses
 * μ = 1.532 and opens at i = 50°. Below about i = 30.4° the ray cannot leave
 * the second face (it would need e > 90°), so the slider starts at 31°.
 * Pinned by tests/notes-jee-visuals-phys-a.test.ts.
 */

/** The worked example: prism angle (degrees) and refractive index. */
export const PRISM = { A: 60, mu: 0.766 / 0.5 } as const;

/** Angle-of-incidence slider, degrees. */
export const I_RANGE = { min: 31, max: 90, step: 1 } as const;
export const DEFAULT_I = 50;

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

export type Trace = { i: number; r1: number; r2: number; e: number; delta: number };

/** Follow the ray: null if it cannot leave the second face. */
export function trace(i: number, A: number = PRISM.A, mu: number = PRISM.mu): Trace | null {
  const r1 = deg(Math.asin(Math.sin(rad(i)) / mu));
  const r2 = A - r1;
  const s = mu * Math.sin(rad(r2));
  if (r2 < 0 || s > 1) return null;
  const e = deg(Math.asin(s));
  return { i, r1, r2, e, delta: i + e - A };
}

/** μ from the minimum deviation: sin((A + δm)/2)/sin(A/2). */
export function muFromMinDeviation(A: number, deltaM: number): number {
  return Math.sin(rad((A + deltaM) / 2)) / Math.sin(rad(A / 2));
}

/** Minimum deviation for a prism: the ray at r₁ = A/2. */
export function minDeviation(A: number = PRISM.A, mu: number = PRISM.mu): { i: number; delta: number } {
  const i = deg(Math.asin(mu * Math.sin(rad(A / 2))));
  return { i, delta: 2 * i - A };
}

/** Smallest i for which the ray still leaves the second face (grazing emergence). */
export function grazingIncidence(A: number = PRISM.A, mu: number = PRISM.mu): number {
  const r1 = A - deg(Math.asin(1 / mu));
  return deg(Math.asin(mu * Math.sin(rad(r1))));
}

/** The δ–i curve over the slider's range. */
export function deviationCurve(step = 0.5): { i: number; delta: number }[] {
  const out: { i: number; delta: number }[] = [];
  for (let i = I_RANGE.min; i <= I_RANGE.max + 1e-9; i += step) {
    const t = trace(i);
    if (t) out.push({ i, delta: t.delta });
  }
  return out;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

// Prism geometry: apex at the top, faces 120 units long, drawn at the true angle A.
const APEX = { x: 112, y: 16 };
const FACE = 120;
const HALF = rad(PRISM.A / 2);
const LEFT_BASE = { x: APEX.x - FACE * Math.sin(HALF), y: APEX.y + FACE * Math.cos(HALF) };
const RIGHT_BASE = { x: APEX.x + FACE * Math.sin(HALF), y: APEX.y + FACE * Math.cos(HALF) };
/** The ray enters the left face 55% of the way down from the apex. */
const ENTRY = { x: APEX.x + 0.55 * (LEFT_BASE.x - APEX.x), y: APEX.y + 0.55 * (LEFT_BASE.y - APEX.y) };
const RAY_OUT = 78;

/** A direction at a math angle (degrees, counter-clockwise, y up) in screen units. */
const dir = (a: number) => ({ x: Math.cos(rad(a)), y: -Math.sin(rad(a)) });

/**
 * Screen geometry of the ray for a trace. Directions as math angles (y up):
 * the incident ray at i − A/2, inside at r₁ − A/2, out at A/2 − e.
 */
export function rayGeometry(t: Trace) {
  const half = PRISM.A / 2;
  const inA = t.i - half;
  const midA = t.r1 - half;
  const outA = half - t.e;
  const din = dir(inA);
  const dmid = dir(midA);
  // Exit: where ENTRY + s·dmid meets the right face, APEX + u·(RIGHT_BASE − APEX).
  const fx = RIGHT_BASE.x - APEX.x;
  const fy = RIGHT_BASE.y - APEX.y;
  const det = dmid.x * -fy - dmid.y * -fx;
  const s = ((APEX.x - ENTRY.x) * -fy - (APEX.y - ENTRY.y) * -fx) / det;
  const exit = { x: ENTRY.x + s * dmid.x, y: ENTRY.y + s * dmid.y };
  const dout = dir(outA);
  return {
    start: { x: r2(ENTRY.x - RAY_OUT * din.x), y: r2(ENTRY.y - RAY_OUT * din.y) },
    entry: { x: r2(ENTRY.x), y: r2(ENTRY.y) },
    exit: { x: r2(exit.x), y: r2(exit.y) },
    end: { x: r2(exit.x + RAY_OUT * dout.x), y: r2(exit.y + RAY_OUT * dout.y) },
    insideAngle: midA,
  };
}

// The δ–i graph.
export const GRAPH = { x0: 44, x1: 306, y0: 182, y1: 286, iMin: 30, iMax: 90, dMin: 35, dMax: 65 } as const;
const gx = (i: number) => r2(GRAPH.x0 + ((i - GRAPH.iMin) / (GRAPH.iMax - GRAPH.iMin)) * (GRAPH.x1 - GRAPH.x0));
const gy = (d: number) => r2(GRAPH.y1 - ((d - GRAPH.dMin) / (GRAPH.dMax - GRAPH.dMin)) * (GRAPH.y1 - GRAPH.y0));

const n1 = (v: number) => v.toFixed(1);

export default function JeePrismMinDeviation() {
  const [i, setI] = useState<number>(DEFAULT_I);
  const t = trace(i) ?? trace(DEFAULT_I)!;
  const g = rayGeometry(t);
  const min = minDeviation();
  const curve = deviationCurve()
    .map((p) => `${gx(p.i)},${gy(p.delta)}`)
    .join(" ");
  const atMin = Math.abs(t.i - min.i) < 0.6;
  // Outward normals of the two faces, at 180° − A/2 and A/2, drawn both ways.
  const nl = dir(180 - PRISM.A / 2);
  const nr = dir(PRISM.A / 2);
  const NL = 22;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · a ray through a prism and its deviation
      </p>

      <svg
        viewBox="0 0 320 306"
        className="block h-auto w-full"
        role="img"
        aria-label={`A prism of angle 60 degrees and refractive index 1.53. A ray meets the first face at ${i} degrees, refracts to ${n1(t.r1)} degrees inside, meets the second face at ${n1(t.r2)} degrees and leaves at ${n1(t.e)} degrees. The deviation is ${n1(t.delta)} degrees. Below, the graph of deviation against the angle of incidence has one minimum, 40 degrees at 50 degrees.`}
      >
        {/* Prism */}
        <polygon
          points={`${APEX.x},${APEX.y} ${r2(LEFT_BASE.x)},${r2(LEFT_BASE.y)} ${r2(RIGHT_BASE.x)},${r2(RIGHT_BASE.y)}`}
          strokeWidth={1.5}
          className="fill-sky-500/15 stroke-sky-600 dark:fill-sky-400/15 dark:stroke-sky-400"
        />
        <text x={APEX.x - 10} y={APEX.y + 4} textAnchor="end" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          A = 60°
        </text>
        <text x={APEX.x} y={r2(LEFT_BASE.y) - 6} textAnchor="middle" className="fill-sky-700 text-[10px] dark:fill-sky-300">
          μ = 1.53
        </text>

        {/* Normals */}
        <line
          x1={r2(g.entry.x - NL * nl.x)}
          y1={r2(g.entry.y - NL * nl.y)}
          x2={r2(g.entry.x + NL * nl.x)}
          y2={r2(g.entry.y + NL * nl.y)}
          strokeDasharray="3 3"
          className="stroke-muted-foreground"
        />
        <line
          x1={r2(g.exit.x - NL * nr.x)}
          y1={r2(g.exit.y - NL * nr.y)}
          x2={r2(g.exit.x + NL * nr.x)}
          y2={r2(g.exit.y + NL * nr.y)}
          strokeDasharray="3 3"
          className="stroke-muted-foreground"
        />

        {/* The undeviated direction, to show δ */}
        <line
          x1={g.entry.x}
          y1={g.entry.y}
          x2={r2(g.entry.x + 100 * dir(t.i - PRISM.A / 2).x)}
          y2={r2(g.entry.y + 100 * dir(t.i - PRISM.A / 2).y)}
          strokeDasharray="2 4"
          className="stroke-muted-foreground"
        />

        {/* The ray */}
        <polyline
          points={`${g.start.x},${g.start.y} ${g.entry.x},${g.entry.y} ${g.exit.x},${g.exit.y} ${g.end.x},${g.end.y}`}
          fill="none"
          strokeWidth={2.2}
          strokeLinejoin="round"
          className="stroke-rose-600 dark:stroke-rose-400"
        />
        <text x={r2(g.entry.x - 30)} y={r2(g.entry.y - 10)} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300 tabular-nums">
          i = {i}°
        </text>
        <text x={r2(g.exit.x + 30)} y={r2(g.exit.y - 8)} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300 tabular-nums">
          e = {n1(t.e)}°
        </text>

        {/* Live numbers */}
        <g className="text-[11px] tabular-nums">
          <text x={236} y={30} className="fill-muted-foreground">
            r<tspan dy={3} className="text-[8px]">1</tspan>
            <tspan dy={-3}> = {n1(t.r1)}°</tspan>
          </text>
          <text x={236} y={46} className="fill-muted-foreground">
            r<tspan dy={3} className="text-[8px]">2</tspan>
            <tspan dy={-3}> = {n1(t.r2)}°</tspan>
          </text>
          <text x={236} y={66} className="fill-foreground font-semibold">
            δ = i + e − A
          </text>
          <text x={236} y={82} className="fill-foreground font-semibold">
            = {n1(t.delta)}°
          </text>
          <text x={236} y={100} className={atMin ? "fill-emerald-700 font-semibold dark:fill-emerald-300" : "fill-muted-foreground"}>
            {atMin ? "minimum: i = e" : i < min.i ? "i below 50°" : "i above 50°"}
          </text>
        </g>

        {/* δ–i graph */}
        {[40, 50, 60].map((d) => (
          <g key={d}>
            <line x1={GRAPH.x0} y1={gy(d)} x2={GRAPH.x1} y2={gy(d)} strokeDasharray="2 3" className="stroke-border" />
            <text x={GRAPH.x0 - 4} y={gy(d) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {d}°
            </text>
          </g>
        ))}
        {[30, 50, 70, 90].map((v) => (
          <text key={v} x={gx(v)} y={GRAPH.y1 + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {v}°
          </text>
        ))}
        <line x1={GRAPH.x0} y1={GRAPH.y1} x2={GRAPH.x1} y2={GRAPH.y1} className="stroke-muted-foreground" />
        <line x1={GRAPH.x0} y1={GRAPH.y1} x2={GRAPH.x0} y2={GRAPH.y0 - 4} className="stroke-muted-foreground" />
        <text x={6} y={GRAPH.y0 - 8} className="fill-muted-foreground text-[10px]">
          deviation δ
        </text>
        <text x={GRAPH.x1 + 6} y={GRAPH.y1 + 3.5} className="fill-muted-foreground text-[10px]">
          i
        </text>
        <line x1={gx(min.i)} y1={GRAPH.y1} x2={gx(min.i)} y2={gy(min.delta)} strokeDasharray="3 3" className="stroke-emerald-600 dark:stroke-emerald-400" />
        <polyline points={curve} fill="none" strokeWidth={2.2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={gx(min.i)} y={gy(min.delta) - 8} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 tabular-nums">
          δ<tspan dy={3} className="text-[8px]">m</tspan>
          <tspan dy={-3}> = {n1(min.delta)}°</tspan>
        </text>
        <circle cx={gx(t.i)} cy={gy(t.delta)} r={4} className="fill-rose-600 dark:fill-rose-400" />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Angle of incidence i: <span className="tabular-nums">{i}°</span>
        </span>
        <input
          type="range"
          min={I_RANGE.min}
          max={I_RANGE.max}
          step={I_RANGE.step}
          value={i}
          onChange={(ev) => setI(Number(ev.target.value))}
          className="accent-indigo-600"
          aria-label="Angle of incidence on the first face, in degrees"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          r₁ + r₂ = {n1(t.r1)}° + {n1(t.r2)}° = 60°, δ = {i}° + {n1(t.e)}° − 60° = {n1(t.delta)}°
        </p>
        <p className="text-muted-foreground tabular-nums">At the minimum: r₁ = r₂ = 30°, i = e = 50°, μ = sin 50°/sin 30° = 0.766/0.5 ≈ 1.53</p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        As i grows the deviation first falls and then rises. At the bottom, δm = 40°, the ray passes symmetrically and runs parallel to the base,
        so i = (A + δm)/2 = 50°. Every larger deviation is reached at two values of i, which swap roles as i and e. Below about 30° the ray
        cannot leave the second face.
      </p>
    </div>
  );
}
