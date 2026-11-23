"use client";

import { useState } from "react";

/**
 * Interactive: an electric dipole in a uniform field (concept
 * cetp-dipole-torque-energy). The forces +qE and −qE on its two charges are
 * equal and opposite, so the net force is zero, but they turn the dipole
 * towards the field with torque τ = pE sin θ. Its energy is U = −pE cos θ:
 * least (−pE) at θ = 0°, stable equilibrium; greatest (+pE) at θ = 180°,
 * unstable equilibrium. A slider sets θ; the gauge on the right shows U.
 *
 * Numbers: the concept's worked example, ±3 μC 2 cm apart in 5 × 10⁴ N/C, so
 * p = 6 × 10⁻⁸ C m and pE = 3 × 10⁻³ N m. It opens at θ = 60°, where turning
 * from aligned costs pE(1 − cos 60°) = pE/2. Pinned by
 * tests/notes-cet-visuals-phys-c.test.ts.
 */

/** The worked example: charge (C), separation (m), field (N/C). */
export const DIPOLE_EXAMPLE = { q: 3e-6, d: 0.02, E: 5e4 } as const;

/** Dipole moment p = q × 2a, in C m. */
export const P_MOMENT = DIPOLE_EXAMPLE.q * DIPOLE_EXAMPLE.d;
/** pE, in N m (= J). */
export const PE = P_MOMENT * DIPOLE_EXAMPLE.E;

export const DEFAULT_THETA = 60;

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Torque τ = pE sin θ (N m). */
export function torque(thetaDeg: number, pE: number = PE): number {
  return pE * Math.sin(rad(thetaDeg));
}

/** Potential energy U = −pE cos θ (J). */
export function energy(thetaDeg: number, pE: number = PE): number {
  return -pE * Math.cos(rad(thetaDeg));
}

/** Work to turn the dipole from θ₁ to θ₂: W = pE(cos θ₁ − cos θ₂) (J). */
export function workToTurn(theta1Deg: number, theta2Deg: number, pE: number = PE): number {
  return pE * (Math.cos(rad(theta1Deg)) - Math.cos(rad(theta2Deg)));
}

/** What to say about the angle. */
export function dipoleState(thetaDeg: number): "stable" | "unstable" | "max-torque" | "turning" {
  if (thetaDeg === 0) return "stable";
  if (thetaDeg === 180) return "unstable";
  if (thetaDeg === 90) return "max-torque";
  return "turning";
}

// Geometry (viewBox units).
export const CENTRE = { x: 122, y: 108 } as const;
export const HALF_LEN = 56;
const F_LEN = 30;
const GAUGE = { x: 270, top: 46, bottom: 170 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Screen positions of +q and −q for an angle θ between p and E (p drawn anticlockwise from E). */
export function chargePositions(thetaDeg: number) {
  const ux = Math.cos(rad(thetaDeg));
  const uy = -Math.sin(rad(thetaDeg));
  return {
    plus: { x: r2(CENTRE.x + HALF_LEN * ux), y: r2(CENTRE.y + HALF_LEN * uy) },
    minus: { x: r2(CENTRE.x - HALF_LEN * ux), y: r2(CENTRE.y - HALF_LEN * uy) },
  };
}

/** y of the energy gauge's marker: +pE at the top, −pE at the bottom. */
export function gaugeY(thetaDeg: number): number {
  const mid = (GAUGE.top + GAUGE.bottom) / 2;
  const half = (GAUGE.bottom - GAUGE.top) / 2;
  return r2(mid - half * (energy(thetaDeg) / PE));
}

/** Numbers in units of 10⁻³, with no "−0.00". */
function milli(v: number): string {
  const m = v * 1e3;
  return (Math.abs(m) < 0.005 ? 0 : m).toFixed(2).replace("-", "−");
}

const STATE_TEXT = {
  stable: "θ = 0°: stable equilibrium. No torque, and U = −pE is the least it can be: turned a little, it swings back.",
  unstable: "θ = 180°: unstable equilibrium. No torque, but U = +pE is the greatest: turned a little, it swings right round.",
  "max-torque": "θ = 90°: the torque is greatest, τ = pE.",
  turning: "The torque turns the dipole towards the field, where its energy is least.",
} as const;

export default function CetDipoleTorque() {
  const [theta, setTheta] = useState<number>(DEFAULT_THETA);
  const { plus, minus } = chargePositions(theta);
  const ux = Math.cos(rad(theta));
  const uy = -Math.sin(rad(theta));
  const pFrom = { x: r2(CENTRE.x - 22 * ux), y: r2(CENTRE.y - 22 * uy) };
  const pTo = { x: r2(CENTRE.x + 22 * ux), y: r2(CENTRE.y + 22 * uy) };
  const pAngle = r2(-theta);
  const ARC = 18;
  const arcEnd = { x: r2(CENTRE.x + ARC * ux), y: r2(CENTRE.y + ARC * uy) };
  // The turning arrow: clockwise on screen, from the rod towards the field.
  const TURN_R = 40;
  const turnTo = theta - Math.min(20, theta * 0.6);
  const ts = { x: r2(CENTRE.x + TURN_R * Math.cos(rad(theta))), y: r2(CENTRE.y - TURN_R * Math.sin(rad(theta))) };
  const te = { x: r2(CENTRE.x + TURN_R * Math.cos(rad(turnTo))), y: r2(CENTRE.y - TURN_R * Math.sin(rad(turnTo))) };
  const turnHead = r2((Math.atan2(Math.cos(rad(turnTo)), Math.sin(rad(turnTo))) * 180) / Math.PI);
  const showTurn = theta > 2 && theta < 178;
  const state = dipoleState(theta);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · a dipole turning in a uniform field
      </p>

      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label={`An electric dipole at ${theta} degrees to a uniform field E pointing right. Equal and opposite forces qE act on its charges. Torque ${milli(torque(theta))} × 10⁻³ N m, energy ${milli(energy(theta))} × 10⁻³ J.`}
      >
        {/* The uniform field */}
        {[30, 66, 150, 186].map((y) => (
          <g key={y}>
            <line x1={10} y1={y} x2={228} y2={y} strokeWidth={1} className="stroke-indigo-300 dark:stroke-indigo-700" />
            <polygon points={`236,${y} 228,${y - 4} 228,${y + 4}`} className="fill-indigo-300 dark:fill-indigo-700" />
          </g>
        ))}
        <text x={14} y={25} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          E
        </text>

        {/* Reference direction and θ */}
        <line x1={CENTRE.x} y1={CENTRE.y} x2={CENTRE.x + HALF_LEN + 30} y2={CENTRE.y} strokeDasharray="3 3" className="stroke-muted-foreground" />
        {theta >= 3 && (
          <path
            d={`M ${CENTRE.x + ARC} ${CENTRE.y} A ${ARC} ${ARC} 0 0 0 ${arcEnd.x} ${arcEnd.y}`}
            fill="none"
            strokeWidth={1.5}
            className="stroke-amber-600 dark:stroke-amber-400"
          />
        )}
        <text x={CENTRE.x + 24} y={CENTRE.y + 14} className="fill-amber-700 text-[11px] font-semibold tabular-nums dark:fill-amber-300">
          θ = {theta}°
        </text>

        {/* The dipole: its axis, p from −q to +q, and the charges */}
        <line x1={minus.x} y1={minus.y} x2={plus.x} y2={plus.y} strokeWidth={2} className="stroke-slate-500 dark:stroke-slate-400" />
        <line x1={pFrom.x} y1={pFrom.y} x2={pTo.x} y2={pTo.y} strokeWidth={3} className="stroke-foreground" />
        <polygon points="6,0 -3,-4.5 -3,4.5" transform={`translate(${pTo.x} ${pTo.y}) rotate(${pAngle})`} className="fill-foreground" />
        <text x={r2(pTo.x - 12 * uy)} y={r2(pTo.y + 12 * ux + 4)} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          p
        </text>

        {/* Forces: +qE along E on +q, qE against E on −q */}
        <line x1={plus.x + 9} y1={plus.y} x2={plus.x + 9 + F_LEN} y2={plus.y} strokeWidth={2.5} className="stroke-rose-600 dark:stroke-rose-400" />
        <polygon points={`${r2(plus.x + 15 + F_LEN)},${plus.y} ${r2(plus.x + 8 + F_LEN)},${r2(plus.y - 4)} ${r2(plus.x + 8 + F_LEN)},${r2(plus.y + 4)}`} className="fill-rose-600 dark:fill-rose-400" />
        <text x={r2(plus.x + 12)} y={r2(plus.y - 6)} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          qE
        </text>
        <line x1={minus.x - 9} y1={minus.y} x2={minus.x - 9 - F_LEN} y2={minus.y} strokeWidth={2.5} className="stroke-sky-600 dark:stroke-sky-400" />
        <polygon points={`${r2(minus.x - 15 - F_LEN)},${minus.y} ${r2(minus.x - 8 - F_LEN)},${r2(minus.y - 4)} ${r2(minus.x - 8 - F_LEN)},${r2(minus.y + 4)}`} className="fill-sky-600 dark:fill-sky-400" />
        <text x={r2(minus.x - 12)} y={r2(minus.y - 6)} textAnchor="end" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          qE
        </text>

        <circle cx={plus.x} cy={plus.y} r={8} className="fill-rose-500 dark:fill-rose-600" />
        <text x={plus.x} y={plus.y + 4} textAnchor="middle" className="fill-white text-[12px] font-bold">
          +
        </text>
        <circle cx={minus.x} cy={minus.y} r={8} className="fill-sky-500 dark:fill-sky-600" />
        <text x={minus.x} y={minus.y + 4} textAnchor="middle" className="fill-white text-[12px] font-bold">
          −
        </text>

        {/* Which way it turns */}
        {showTurn && (
          <g>
            <path d={`M ${ts.x} ${ts.y} A ${TURN_R} ${TURN_R} 0 0 1 ${te.x} ${te.y}`} fill="none" strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
            <polygon points="5,0 -4,-4 -4,4" transform={`translate(${te.x} ${te.y}) rotate(${turnHead})`} className="fill-emerald-600 dark:fill-emerald-400" />
          </g>
        )}

        {/* Energy gauge */}
        <text x={GAUGE.x} y={GAUGE.top - 10} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          U
        </text>
        <line x1={GAUGE.x} y1={GAUGE.top} x2={GAUGE.x} y2={GAUGE.bottom} strokeWidth={3} className="stroke-border" />
        {[
          { y: GAUGE.top, t: "+pE" },
          { y: (GAUGE.top + GAUGE.bottom) / 2, t: "0" },
          { y: GAUGE.bottom, t: "−pE" },
        ].map((m) => (
          <g key={m.t}>
            <line x1={GAUGE.x - 4} y1={m.y} x2={GAUGE.x + 4} y2={m.y} className="stroke-muted-foreground" />
            <text x={GAUGE.x + 8} y={m.y + 3.5} className="fill-muted-foreground text-[10px]">
              {m.t}
            </text>
          </g>
        ))}
        <circle cx={GAUGE.x} cy={gaugeY(theta)} r={5} className="fill-amber-500 stroke-background dark:fill-amber-400" strokeWidth={1.5} />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Angle θ between p and E: <span className="tabular-nums">{theta}°</span>
        </span>
        <input
          type="range"
          min={0}
          max={180}
          step={1}
          value={theta}
          onChange={(e) => setTheta(Number(e.target.value))}
          className="accent-amber-600"
          aria-label="Angle between the dipole moment and the field, in degrees"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="font-medium text-foreground">
          τ = pE sin θ = {milli(torque(theta))} × 10⁻³ N m
        </p>
        <p className="font-medium text-foreground">
          U = −pE cos θ = {milli(energy(theta))} × 10⁻³ J
        </p>
        <p className="text-muted-foreground">
          Work to turn it from 0°: pE(1 − cos θ) = {milli(workToTurn(0, theta))} × 10⁻³ J
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {STATE_TEXT[state]} Net force: zero at every angle. Here p = 3 μC × 2 cm = 6 × 10⁻⁸ C m in E = 5 × 10⁴ N/C,
        so pE = 3 × 10⁻³ N m. Torque uses sin θ, energy and work use cos θ.
      </p>
    </div>
  );
}
