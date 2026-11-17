"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive: Snell's law, n₁ sin θ₁ = n₂ sin θ₂ (concept imat-opt-snell).
 * A ray in air (n = 1.00) meets glass (n = 1.50) or water (n = 1.33). A slider
 * sets the angle of incidence; the refracted ray is drawn from Snell's law,
 * both angles measured from the dashed normal.
 *
 * It opens on the concept's worked example: 45° into glass of n = 1.50 gives
 * sin θ₂ = 0.707/1.50 = 0.471, so θ₂ ≈ 28°, bent towards the normal, and light
 * travels at c/n = 2.00 × 10⁸ m/s in the glass. Pinned by
 * tests/notes-imat-visuals-phys.test.ts.
 */

export const N_AIR = 1.0;

/** The two media the toggle offers, with the concept's refractive indices. */
export const MEDIA = {
  glass: { name: "glass", n: 1.5 },
  water: { name: "water", n: 1.33 },
} as const;
export type Medium = keyof typeof MEDIA;

/** The worked example: 45° from air into glass of n = 1.50. */
export const SNELL_EXAMPLE = { theta1: 45, medium: "glass" as Medium } as const;

/** Angle-of-incidence slider, in degrees. */
export const THETA_RANGE = { min: 0, max: 85, step: 1 } as const;

/** Speed of light in a vacuum, m/s. */
export const C = 3.0e8;

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Angle of refraction (degrees from the normal) for light from n1 into n2. */
export function refractionAngle(theta1Deg: number, n1: number, n2: number): number {
  const s = (n1 * Math.sin(rad(theta1Deg))) / n2;
  return deg(Math.asin(s));
}

/** Speed of light (m/s) in a medium of refractive index n: v = c/n. */
export function speedIn(n: number): number {
  return C / n;
}

// Geometry (viewBox units): the surface is horizontal, the ray hits it at O.
const O = { x: 160, y: 104 };
const RAY = 92;
const ARC = 30;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** End points of the incident and refracted rays for an angle of incidence. */
export function rayGeometry(theta1Deg: number, n2: number) {
  const t2 = refractionAngle(theta1Deg, N_AIR, n2);
  return {
    theta2: t2,
    start: { x: r2(O.x - RAY * Math.sin(rad(theta1Deg))), y: r2(O.y - RAY * Math.cos(rad(theta1Deg))) },
    end: { x: r2(O.x + RAY * Math.sin(rad(t2))), y: r2(O.y + RAY * Math.cos(rad(t2))) },
  };
}

const fmt = (n: number, d: number) => n.toFixed(d);

export default function ImatSnellRefraction() {
  const [theta1, setTheta1] = useState<number>(SNELL_EXAMPLE.theta1);
  const [medium, setMedium] = useState<Medium>(SNELL_EXAMPLE.medium);
  const n2 = MEDIA[medium].n;
  const g = rayGeometry(theta1, n2);
  const s1 = N_AIR * Math.sin(rad(theta1));
  const v = speedIn(n2) / 1e8;

  // Arcs from the normal to each ray (sweep 0 = turning towards the ray on screen).
  const a1 = { x: r2(O.x - ARC * Math.sin(rad(theta1))), y: r2(O.y - ARC * Math.cos(rad(theta1))) };
  const a2 = { x: r2(O.x + ARC * Math.sin(rad(g.theta2))), y: r2(O.y + ARC * Math.cos(rad(g.theta2))) };
  // Arrowhead on the incident ray, halfway along, pointing towards O.
  const mid = { x: (g.start.x + O.x) / 2, y: (g.start.y + O.y) / 2 };
  const headAngle = r2(90 - theta1); // direction of travel, degrees clockwise from +x
  const mid2 = { x: (O.x + g.end.x) / 2, y: (O.y + g.end.y) / 2 };
  const head2Angle = r2(90 - g.theta2);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · Snell&apos;s law at an air to {MEDIA[medium].name} surface
      </p>

      <svg
        viewBox="0 0 320 208"
        className="block h-auto w-full"
        role="img"
        aria-label={`A ray of light in air meets ${MEDIA[medium].name} at ${theta1} degrees from the normal and is refracted at ${fmt(g.theta2, 1)} degrees from the normal, bent towards it.`}
      >
        {/* The two media */}
        <rect x={0} y={O.y} width={320} height={208 - O.y} className="fill-sky-200/50 dark:fill-sky-900/40" />
        <line x1={0} y1={O.y} x2={320} y2={O.y} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <text x={8} y={18} className="fill-muted-foreground text-[11px]">
          air, n₁ = 1.00
        </text>
        <text x={8} y={200} className="fill-sky-800 text-[11px] font-semibold dark:fill-sky-200">
          {MEDIA[medium].name}, n₂ = {fmt(n2, 2)}
        </text>

        {/* The normal */}
        <line x1={O.x} y1={8} x2={O.x} y2={200} strokeDasharray="4 4" className="stroke-muted-foreground" strokeWidth={1} />
        <text x={O.x + 5} y={O.y - ARC - 20} className="fill-muted-foreground text-[10px]">
          normal
        </text>

        {/* Angle arcs and their values */}
        {theta1 >= 2 && (
          <path d={`M ${O.x} ${O.y - ARC} A ${ARC} ${ARC} 0 0 0 ${a1.x} ${a1.y}`} fill="none" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        )}
        {g.theta2 >= 2 && (
          <path d={`M ${O.x} ${O.y + ARC} A ${ARC} ${ARC} 0 0 0 ${a2.x} ${a2.y}`} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.5} />
        )}
        <text x={O.x + 5} y={O.y - ARC + 6} className="fill-amber-700 text-[11px] font-semibold tabular-nums dark:fill-amber-300">
          θ₁ = {theta1}°
        </text>
        <text x={O.x - 5} y={O.y + ARC + 2} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold tabular-nums dark:fill-indigo-300">
          θ₂ = {fmt(g.theta2, 1)}°
        </text>

        {/* Incident ray */}
        <line x1={g.start.x} y1={g.start.y} x2={O.x} y2={O.y} className="stroke-amber-500 dark:stroke-amber-400" strokeWidth={2.5} />
        <polygon
          points="5,0 -4,-4 -4,4"
          transform={`translate(${r2(mid.x)} ${r2(mid.y)}) rotate(${headAngle})`}
          className="fill-amber-500 dark:fill-amber-400"
        />
        <text x={g.start.x} y={g.start.y - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          incident ray
        </text>

        {/* Refracted ray */}
        <line x1={O.x} y1={O.y} x2={g.end.x} y2={g.end.y} className="stroke-amber-500 dark:stroke-amber-400" strokeWidth={2.5} />
        <polygon
          points="5,0 -4,-4 -4,4"
          transform={`translate(${r2(mid2.x)} ${r2(mid2.y)}) rotate(${head2Angle})`}
          className="fill-amber-500 dark:fill-amber-400"
        />
        <text
          x={Math.min(g.end.x + 4, 316)}
          y={g.end.y - 4}
          textAnchor={g.end.x > 250 ? "end" : "start"}
          className="fill-muted-foreground text-[10px]"
        >
          refracted ray
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-medium text-foreground">Second medium:</span>
        {(Object.keys(MEDIA) as Medium[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={medium === m}
            onClick={() => setMedium(m)}
            className={cn(
              "rounded-md border px-3 py-1 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              medium === m
                ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-500"
                : "border-border bg-background text-foreground hover:bg-muted",
            )}
          >
            {MEDIA[m].name} ({fmt(MEDIA[m].n, 2)})
          </button>
        ))}
      </div>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Angle of incidence θ₁: <span className="tabular-nums">{theta1}°</span>
        </span>
        <input
          type="range"
          min={THETA_RANGE.min}
          max={THETA_RANGE.max}
          step={THETA_RANGE.step}
          value={theta1}
          onChange={(e) => setTheta1(Number(e.target.value))}
          className="accent-amber-600"
          aria-label="Angle of incidence, in degrees from the normal"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          1.00 × sin {theta1}° = {fmt(s1, 3)} = {fmt(n2, 2)} × sin {fmt(g.theta2, 1)}°
        </p>
        <p className="text-muted-foreground tabular-nums">
          Speed in {MEDIA[medium].name}: v = c/n = {fmt(v, 2)} × 10⁸ m/s
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Both angles are measured from the normal, not from the surface. Going into the slower medium (higher n) the
        ray bends towards the normal, so θ₂ is always smaller than θ₁. At 45° into glass, sin θ₂ = 0.707/1.50 =
        0.471 and θ₂ ≈ 28°. Along the normal (0°) the ray is not bent at all.
      </p>
    </div>
  );
}
