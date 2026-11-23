"use client";

import { useState } from "react";

/**
 * Interactive: Raoult's law for an ideal mixture of two volatile liquids
 * (concept cetsol-raoults-law-two-volatile-liquids). The partial pressures
 * p_A = x_A P_A° and p_B = x_B P_B° are straight lines through zero, and the
 * total P = x_A P_A° + x_B P_B° is the straight line joining the two pure
 * vapour pressures. A slider sets x_A.
 *
 * Numbers: the concept's worked example, P_A° = 300 and P_B° = 500 mm Hg in
 * the mole ratio 1 : 3, so the first render is x_A = 0.25: p_A = 75,
 * p_B = 375, P = 450 mm Hg, and A's mole fraction in the vapour is
 * y_A = 75/450 = 1/6. Pinned by tests/notes-cet-visuals-chem-c.test.ts.
 */

/** Pure vapour pressures, in mm Hg. */
export const PURE = { A: 300, B: 500 } as const;

/** The worked example: mole ratio A : B = 1 : 3. */
export const DEFAULT_XA = 0.25;

export const XA_RANGE = { min: 0, max: 1, step: 0.05 } as const;

/** Pressure axis, in mm Hg. */
export const P_AXIS_MAX = 550;

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Partial and total vapour pressures (mm Hg) and A's mole fraction in the vapour. */
export function raoult(xA: number, pA0: number = PURE.A, pB0: number = PURE.B) {
  const xB = 1 - xA;
  const pA = xA * pA0;
  const pB = xB * pB0;
  const P = pA + pB;
  return { xA, xB, pA, pB, P, yA: P === 0 ? 0 : pA / P };
}

// Plot geometry (viewBox units).
export const PLOT = { x0: 44, x1: 290, y0: 168, y1: 26 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.x0 + x * (PLOT.x1 - PLOT.x0));
const py = (p: number) => r2(PLOT.y0 - (p / P_AXIS_MAX) * (PLOT.y0 - PLOT.y1));

/** Fix float noise from the slider (0.15000000000000002 → 0.15). */
export function snapX(x: number): number {
  return Math.round(x * 100) / 100;
}

/** SVG text with a subscript: base, lowered s, then the rest back on the line. */
function Sub({ b, s, rest = "" }: { b: string; s: string; rest?: string }) {
  return (
    <>
      {b}
      <tspan dy={3} className="text-[8px]">
        {s}
      </tspan>
      <tspan dy={-3}>{rest}</tspan>
    </>
  );
}

export default function CetRaoultTwoLiquids() {
  const [xA, setXA] = useState<number>(DEFAULT_XA);
  const r = raoult(xA);
  const x = px(xA);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · vapour pressure of a mixture of two volatile liquids
      </p>

      <svg
        viewBox="0 0 320 212"
        className="block h-auto w-full"
        role="img"
        aria-label={`Vapour pressure against mole fraction of A for an ideal mixture with pure vapour pressures 300 mm Hg for A and 500 mm Hg for B. All three lines are straight. At mole fraction of A ${r.xA.toFixed(2)}: partial pressure of A ${r1(r.pA)}, of B ${r1(r.pB)}, total ${r1(r.P)} mm Hg.`}
      >
        {/* Grid and axes */}
        {[0, 100, 200, 300, 400, 500].map((t) => (
          <g key={t}>
            <line x1={PLOT.x0} y1={py(t)} x2={PLOT.x1} y2={py(t)} className="stroke-border" strokeWidth={t === 0 ? 1.2 : 0.6} />
            <text x={PLOT.x0 - 5} y={py(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1 - 4} className="stroke-muted-foreground" />
        <line x1={PLOT.x1} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y1 - 4} className="stroke-muted-foreground" />
        <text x={6} y={14} className="fill-muted-foreground text-[10px]">
          vapour pressure (mm Hg)
        </text>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t} className="fill-muted-foreground text-[10px] tabular-nums">
            <text x={px(t)} y={PLOT.y0 + 13} textAnchor="middle">
              {t}
            </text>
            <text x={px(t)} y={PLOT.y0 + 25} textAnchor="middle">
              {1 - t}
            </text>
          </g>
        ))}
        <text x={PLOT.x0 - 12} y={PLOT.y0 + 13} textAnchor="end" className="fill-muted-foreground text-[10px]">
          <Sub b="x" s="A" />
        </text>
        <text x={PLOT.x0 - 12} y={PLOT.y0 + 25} textAnchor="end" className="fill-muted-foreground text-[10px]">
          <Sub b="x" s="B" />
        </text>
        <text x={PLOT.x0} y={PLOT.y0 + 39} className="fill-muted-foreground text-[10px]">
          pure B
        </text>
        <text x={PLOT.x1} y={PLOT.y0 + 39} textAnchor="end" className="fill-muted-foreground text-[10px]">
          pure A
        </text>

        {/* Pure vapour pressures */}
        <text x={PLOT.x0 + 4} y={py(PURE.B) - 5} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          <Sub b="P" s="B" rest="° = 500" />
        </text>
        <text x={PLOT.x1 + 3} y={py(PURE.A) + 3.5} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          <Sub b="P" s="A" rest="°" />
        </text>
        <text x={PLOT.x1 + 3} y={py(PURE.A) + 15} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          = 300
        </text>

        {/* The three straight lines */}
        <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(PURE.A)} strokeWidth={2} className="stroke-amber-600 dark:stroke-amber-400" />
        <line x1={px(0)} y1={py(PURE.B)} x2={px(1)} y2={py(0)} strokeWidth={2} className="stroke-sky-600 dark:stroke-sky-400" />
        <line x1={px(0)} y1={py(PURE.B)} x2={px(1)} y2={py(PURE.A)} strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={px(0.62)} y={py(raoult(0.62).P) - 7} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          total P
        </text>
        <text x={px(0.86)} y={py(raoult(0.86).pA) + 16} textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          <Sub b="p" s="A" />
        </text>
        <text x={px(0.14)} y={py(raoult(0.14).pB) + 16} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          <Sub b="p" s="B" />
        </text>

        {/* Current composition */}
        <line x1={x} y1={PLOT.y0} x2={x} y2={py(r.P)} strokeDasharray="3 3" className="stroke-foreground" />
        <circle cx={x} cy={py(r.pA)} r={3.5} className="fill-amber-600 dark:fill-amber-400" />
        <circle cx={x} cy={py(r.pB)} r={3.5} className="fill-sky-600 dark:fill-sky-400" />
        <circle cx={x} cy={py(r.P)} r={4} className="fill-indigo-600 dark:fill-indigo-400" />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Mole fraction of A, x<sub>A</sub>: <span className="tabular-nums">{r.xA.toFixed(2)}</span> (x<sub>B</sub> ={" "}
          <span className="tabular-nums">{snapX(r.xB).toFixed(2)}</span>)
        </span>
        <input
          type="range"
          min={XA_RANGE.min}
          max={XA_RANGE.max}
          step={XA_RANGE.step}
          value={xA}
          onChange={(e) => setXA(snapX(Number(e.target.value)))}
          className="accent-indigo-600"
          aria-label="Mole fraction of liquid A in the mixture"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="text-amber-700 dark:text-amber-300">
          p<sub>A</sub> = {r.xA.toFixed(2)} × 300 = {r1(r.pA)} mm Hg
        </p>
        <p className="text-sky-700 dark:text-sky-300">
          p<sub>B</sub> = {snapX(r.xB).toFixed(2)} × 500 = {r1(r.pB)} mm Hg
        </p>
        <p className="font-medium text-foreground">
          P = {r1(r.pA)} + {r1(r.pB)} = {r1(r.P)} mm Hg
        </p>
        <p className="text-muted-foreground">
          In the vapour, y<sub>A</sub> = p<sub>A</sub>/P = {r.yA.toFixed(3)}
          {r.xA > 0 && r.xA < 1 ? (
            <>
              : less than x<sub>A</sub>, because A is the less volatile liquid.
            </>
          ) : (
            ": a pure liquid, so the vapour is the same liquid."
          )}
        </p>
      </div>
    </div>
  );
}
