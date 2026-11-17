"use client";

import { useState } from "react";

/**
 * Interactive: the IMAT "Circle measures" concept. A circle of radius 9 cm
 * (the worked example's) with a shaded sector; a slider sets the centre angle
 * θ and the arc length, sector area and sector perimeter update live as
 * fractions θ/360 of the whole circle. The first render is the worked example,
 * θ = 80°: arc 4π ≈ 12.6 cm, area 18π ≈ 56.5 cm², perimeter 4π + 18 ≈ 30.6 cm.
 *
 * Pedagogical aim: an arc is a fraction of the circumference and a sector the
 * same fraction of the area. Pinned by tests/notes-imat-visuals-maths.test.ts.
 */

export const RADIUS = 9;
export const DEFAULT_ANGLE = 80;

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/** θ/360 in lowest terms, e.g. 80 → [2, 9]. */
export function fractionOf(theta: number): [number, number] {
  const g = gcd(theta, 360);
  return [theta / g, 360 / g];
}

/** Arc length as a multiple of π: (θ/360) × 2r. */
export function arcPiMultiple(theta: number, r: number = RADIUS): number {
  return (theta / 360) * 2 * r;
}

/** Sector area as a multiple of π: (θ/360) × r². */
export function areaPiMultiple(theta: number, r: number = RADIUS): number {
  return (theta / 360) * r * r;
}

export function arcLength(theta: number, r: number = RADIUS): number {
  return arcPiMultiple(theta, r) * Math.PI;
}

export function sectorArea(theta: number, r: number = RADIUS): number {
  return areaPiMultiple(theta, r) * Math.PI;
}

/** Arc plus two radii. */
export function sectorPerimeter(theta: number, r: number = RADIUS): number {
  return arcLength(theta, r) + 2 * r;
}

/** Up to 3 decimals, trailing zeros dropped. */
function trim(n: number): string {
  return String(Number(n.toFixed(3)));
}

/** A multiple of π as text: 1 → "π", 4 → "4π", 2.25 → "2.25π". */
export function piText(m: number): string {
  return m === 1 ? "π" : `${trim(m)}π`;
}

const W = 320;
const H = 200;
const CX = 160;
const CY = 100;
const R = 82;

/** Point on the drawn circle at a maths angle (anticlockwise from the right). */
function at(deg: number, rad: number = R): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [CX + rad * Math.cos(a), CY - rad * Math.sin(a)];
}

export default function ImatSectorArc() {
  const [theta, setTheta] = useState(DEFAULT_ANGLE);
  const [num, den] = fractionOf(theta);
  const [x1, y1] = at(0);
  const [x2, y2] = at(theta);
  const large = theta > 180 ? 1 : 0;
  // sweep-flag 0: anticlockwise on screen, matching the maths angle.
  const sector = `M${CX},${CY} L${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 ${large} 0 ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
  const arc = `M${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 ${large} 0 ${x2.toFixed(1)},${y2.toFixed(1)}`;
  const [tx, ty] = at(theta / 2, 24);
  const [ax, ay] = at(theta / 2, R + 14);
  const arcPi = arcPiMultiple(theta);
  const areaPi = areaPiMultiple(theta);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · arc and sector as a fraction of the circle
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Circle of radius 9 cm with a shaded sector of centre angle ${theta} degrees, which is ${num}/${den} of the circle`}
      >
        <circle cx={CX} cy={CY} r={R} className="fill-muted/30 stroke-border" strokeWidth={1.5} />
        <path d={sector} className="fill-sky-500/30 stroke-sky-700 dark:stroke-sky-300" strokeWidth={1.2} />
        <path d={arc} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" className="text-amber-600 dark:text-amber-400" />
        <circle cx={CX} cy={CY} r={2.5} className="fill-foreground" />
        <text x={tx} y={ty + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          {theta}°
        </text>
        <text x={CX + R / 2} y={CY + 13} textAnchor="middle" className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-200">
          r = 9 cm
        </text>
        <text x={ax} y={ay + 4} textAnchor={ax > CX + 4 ? "start" : ax < CX - 4 ? "end" : "middle"} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          arc
        </text>
      </svg>

      <label className="mt-2 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          centre angle θ: <span className="tabular-nums">{theta}°</span>, which is{" "}
          <span className="tabular-nums">
            {theta}/360 = {num}/{den}
          </span>{" "}
          of the circle
        </span>
        <input
          type="range"
          min={5}
          max={355}
          step={5}
          value={theta}
          onChange={(e) => setTheta(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Centre angle in degrees"
        />
      </label>

      <div className="mt-3 grid grid-cols-1 gap-1 text-sm tabular-nums">
        <span className="text-foreground">
          <span className="font-semibold text-amber-700 dark:text-amber-300">arc</span> = {num}/{den} × 18π ={" "}
          {piText(arcPi)} ≈ {arcLength(theta).toFixed(1)} cm
        </span>
        <span className="text-foreground">
          <span className="font-semibold text-sky-700 dark:text-sky-300">sector area</span> = {num}/{den} × 81π ={" "}
          {piText(areaPi)} ≈ {sectorArea(theta).toFixed(1)} cm²
        </span>
        <span className="text-muted-foreground">
          perimeter = arc + 2 radii = {piText(arcPi)} + 18 ≈ {sectorPerimeter(theta).toFixed(1)} cm
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The whole circle has circumference 2π × 9 = 18π cm and area π × 9² = 81π cm². The sector takes θ/360 of
        each. At 80° that is 2/9: an arc of 4π cm and an area of 18π cm².
      </p>
    </div>
  );
}
