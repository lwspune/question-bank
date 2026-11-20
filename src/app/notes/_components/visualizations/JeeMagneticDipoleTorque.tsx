"use client";

import { useState } from "react";

/**
 * Interactive: a bar magnet of moment M at angle θ to a uniform field B
 * (concept jpmm-torque-energy). The torque τ = MB sin θ turns M towards B; the
 * energy U = −MB cos θ is least at θ = 0 (stable, U = −MB) and greatest at
 * θ = 180° (unstable, U = +MB). A slider sets θ; the graph under the magnet
 * plots τ and U against θ with the current values marked.
 *
 * Numbers: the worked example, M = 3 A m² in 0.2 T, so MB = 0.6 J; at 30°,
 * τ = 0.3 N m and U = −0.3√3 ≈ −0.52 J; stable to unstable needs 2MB = 1.2 J.
 * Pinned by tests/notes-jee-visuals-phys-b.test.ts.
 */

/** The worked example: M in A m², B in tesla, the opening angle in degrees. */
export const MAGNET_EXAMPLE = { M: 3, B: 0.2, thetaDeg: 30 } as const;

/** Angle slider, in degrees. */
export const ANGLE_RANGE = { min: 0, max: 180, step: 5 } as const;

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Torque MB sin θ, in N m. */
export const torqueAt = (M: number, B: number, deg: number) => M * B * Math.sin(rad(deg));
/** Potential energy −MB cos θ, in J. */
export const energyAt = (M: number, B: number, deg: number) => -M * B * Math.cos(rad(deg));
/** Work to turn from θ₁ to θ₂: MB(cos θ₁ − cos θ₂), in J. */
export const workToTurn = (M: number, B: number, from: number, to: number) => M * B * (Math.cos(rad(from)) - Math.cos(rad(to)));

export type DipoleState = "stable equilibrium" | "unstable equilibrium" | "largest torque" | "turned towards B";

export function dipoleState(deg: number): DipoleState {
  if (deg === 0) return "stable equilibrium";
  if (deg === 180) return "unstable equilibrium";
  if (deg === 90) return "largest torque";
  return "turned towards B";
}

const r2 = (n: number) => Math.round(n * 100) / 100;

// Geometry (viewBox units).
export const CENTRE = { x: 100, y: 70 } as const;
const HALF = 36;
/** Graph: θ from 0 to 180° across, ±MB up and down. */
export const GRAPH = { x0: 44, x1: 300, mid: 181, half: 36 } as const;
const gx = (deg: number) => r2(GRAPH.x0 + (deg / 180) * (GRAPH.x1 - GRAPH.x0));
const gy = (j: number, MB: number) => r2(GRAPH.mid - (j / MB) * GRAPH.half);

/** A point at `deg` (anticlockwise from B) and radius `r` about the magnet's centre, in screen units. */
export const polar = (deg: number, r: number) => ({ x: r2(CENTRE.x + r * Math.cos(rad(deg))), y: r2(CENTRE.y - r * Math.sin(rad(deg))) });

export default function JeeMagneticDipoleTorque() {
  const [theta, setTheta] = useState<number>(MAGNET_EXAMPLE.thetaDeg);
  const { M, B } = MAGNET_EXAMPLE;
  const MB = M * B;
  const tau = torqueAt(M, B, theta);
  const U = energyAt(M, B, theta);
  const state = dipoleState(theta);
  const stateLines = state.endsWith(" equilibrium") ? [state.replace(" equilibrium", ""), "equilibrium"] : [state, ""];
  const f2 = (n: number) => (Math.abs(n) < 0.005 ? "0" : n.toFixed(2).replace("-", "−"));

  // θ arc, from B round to M.
  const arcEnd = polar(theta, 22);
  const thetaLabel = polar(theta / 2, 42);
  // Torque arrow: clockwise on screen, from M back towards B.
  const showTorque = theta >= 20 && theta <= 170;
  const tStart = theta - 8;
  const tEnd = tStart - Math.min(40, theta - 10);
  const tA = polar(tStart, 60);
  const tB = polar(tEnd, 60);
  const headAngle = r2((Math.atan2(Math.cos(rad(tEnd)), Math.sin(rad(tEnd))) * 180) / Math.PI);
  const mLabel = polar(theta, HALF + 32);

  const curve = (fn: (d: number) => number) =>
    Array.from({ length: 91 }, (_, i) => i * 2)
      .map((d) => `${gx(d)},${gy(fn(d), MB)}`)
      .join(" ");

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · a magnet turned in a uniform field
      </p>

      <svg
        viewBox="0 0 320 238"
        className="block h-auto w-full"
        role="img"
        aria-label={`A bar magnet of moment 3 ampere square metres at ${theta} degrees to a uniform field of 0.2 tesla. Torque ${f2(tau)} newton metres, potential energy ${f2(U)} joules: ${state}. A graph below plots torque and energy against the angle.`}
      >
        {/* The field */}
        {[30, 50, 70, 90, 110].map((y) => (
          <g key={y}>
            <line x1={14} y1={y} x2={186} y2={y} strokeWidth={1} className="stroke-slate-300 dark:stroke-slate-600" />
            <polygon points={`192,${y} 185,${y - 3} 185,${y + 3}`} className="fill-slate-400 dark:fill-slate-500" />
          </g>
        ))}
        <text x={196} y={74} className="fill-muted-foreground text-[11px] font-semibold">
          B
        </text>

        {/* θ, from B to M */}
        <line x1={CENTRE.x} y1={CENTRE.y} x2={CENTRE.x + 62} y2={CENTRE.y} strokeDasharray="3 3" className="stroke-muted-foreground" />
        {theta > 0 && (
          <path
            d={`M ${CENTRE.x + 22} ${CENTRE.y} A 22 22 0 0 0 ${arcEnd.x} ${arcEnd.y}`}
            fill="none"
            strokeWidth={1.5}
            className="stroke-indigo-600 dark:stroke-indigo-400"
          />
        )}
        {theta > 0 && (
          <text x={thetaLabel.x} y={thetaLabel.y + 4} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
            θ
          </text>
        )}

        {/* The magnet and its moment, S to N */}
        <g transform={`rotate(${-theta} ${CENTRE.x} ${CENTRE.y})`}>
          <rect x={CENTRE.x - HALF} y={CENTRE.y - 7} width={HALF} height={14} className="fill-sky-500 dark:fill-sky-600" />
          <rect x={CENTRE.x} y={CENTRE.y - 7} width={HALF} height={14} className="fill-rose-500 dark:fill-rose-600" />
          <line x1={CENTRE.x + HALF} y1={CENTRE.y} x2={CENTRE.x + HALF + 15} y2={CENTRE.y} strokeWidth={2.5} className="stroke-foreground" />
          <polygon points={`${CENTRE.x + HALF + 22},${CENTRE.y} ${CENTRE.x + HALF + 13},${CENTRE.y - 5} ${CENTRE.x + HALF + 13},${CENTRE.y + 5}`} className="fill-foreground" />
        </g>
        <text x={polar(theta, -HALF / 2).x} y={polar(theta, -HALF / 2).y + 4} textAnchor="middle" className="fill-white text-[10px] font-bold">
          S
        </text>
        <text x={polar(theta, HALF / 2).x} y={polar(theta, HALF / 2).y + 4} textAnchor="middle" className="fill-white text-[10px] font-bold">
          N
        </text>
        <text x={mLabel.x} y={mLabel.y + 4} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
          M
        </text>

        {/* Torque: turns M back towards B */}
        {showTorque && (
          <g>
            <path
              d={`M ${tA.x} ${tA.y} A 60 60 0 0 1 ${tB.x} ${tB.y}`}
              fill="none"
              strokeWidth={2}
              className="stroke-amber-600 dark:stroke-amber-400"
            />
            <polygon points="6,0 -5,-5 -5,5" transform={`translate(${tB.x} ${tB.y}) rotate(${headAngle})`} className="fill-amber-600 dark:fill-amber-400" />
          </g>
        )}

        {/* Live readout */}
        <g className="text-[11px] tabular-nums">
          <text x={210} y={30} className="fill-foreground">
            M = 3 A m²
          </text>
          <text x={210} y={46} className="fill-foreground">
            B = 0.2 T
          </text>
          <text x={210} y={62} className="fill-muted-foreground">
            MB = 0.6 J
          </text>
          <text x={210} y={86} className="fill-amber-700 font-semibold dark:fill-amber-300">
            τ = {f2(tau)} N m
          </text>
          <text x={210} y={102} className="fill-indigo-700 font-semibold dark:fill-indigo-300">
            U = {f2(U)} J
          </text>
          <text x={210} y={120} className="fill-foreground font-semibold">
            {stateLines[0]}
          </text>
          <text x={210} y={134} className="fill-foreground font-semibold">
            {stateLines[1]}
          </text>
        </g>

        {/* τ and U against θ */}
        <line x1={GRAPH.x0} y1={GRAPH.mid} x2={GRAPH.x1} y2={GRAPH.mid} className="stroke-muted-foreground" />
        <line x1={GRAPH.x0} y1={GRAPH.mid - GRAPH.half - 4} x2={GRAPH.x0} y2={GRAPH.mid + GRAPH.half + 4} className="stroke-muted-foreground" />
        {[MB, 0, -MB].map((v) => (
          <text key={v} x={GRAPH.x0 - 4} y={gy(v, MB) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {f2(v)}
          </text>
        ))}
        {[0, 90, 180].map((d) => (
          <text key={d} x={gx(d)} y={234} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {d}°
          </text>
        ))}
        <polyline points={curve((d) => torqueAt(M, B, d))} fill="none" strokeWidth={2} className="stroke-amber-600 dark:stroke-amber-400" />
        <polyline points={curve((d) => energyAt(M, B, d))} fill="none" strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={gx(theta)} y1={GRAPH.mid - GRAPH.half} x2={gx(theta)} y2={GRAPH.mid + GRAPH.half} strokeDasharray="2 3" className="stroke-muted-foreground" />
        <circle cx={gx(theta)} cy={gy(tau, MB)} r={3.5} className="fill-amber-600 dark:fill-amber-400" />
        <circle cx={gx(theta)} cy={gy(U, MB)} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={gx(90) + 4} y={gy(MB, MB) - 3} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          τ = MB sin θ
        </text>
        <text x={gx(40)} y={GRAPH.mid - 5} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          U = −MB cos θ
        </text>
        <text x={GRAPH.x0 + 6} y={gy(-MB, MB) - 4} className="fill-muted-foreground text-[10px]">
          stable
        </text>
        <text x={GRAPH.x1} y={gy(MB, MB) - 3} textAnchor="end" className="fill-muted-foreground text-[10px]">
          unstable
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Angle between M and B, θ: <span className="tabular-nums">{theta}°</span>
        </span>
        <input
          type="range"
          min={ANGLE_RANGE.min}
          max={ANGLE_RANGE.max}
          step={ANGLE_RANGE.step}
          value={theta}
          onChange={(e) => setTheta(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Angle between the magnetic moment and the field, in degrees"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="font-medium text-foreground">
          τ = MB sin θ = 0.6 × sin {theta}° = {f2(tau)} N m
        </p>
        <p className="font-medium text-foreground">
          U = −MB cos θ = −0.6 × cos {theta}° = {f2(U)} J
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The torque always turns M towards B. At 0° it is zero and U = −MB = −0.6 J, the least: stable. At 180° it is zero again but
        U = +MB = +0.6 J, the most: unstable, the slightest push sends the magnet round. Below 90° the energy is negative, so keep its minus
        sign. Turning from 0° to 180° needs MB(cos 0° − cos 180°) = 2MB = 1.2 J.
      </p>
    </div>
  );
}
