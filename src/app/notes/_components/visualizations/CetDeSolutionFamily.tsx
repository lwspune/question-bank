"use client";

import { useState } from "react";

/**
 * Interactive: a general solution is a FAMILY of curves, one per value of the
 * constant, and the initial condition picks one (concept cetde-particular-ic).
 *
 * The concept's worked example: dy/dx = 2y gives log y = 2x + c, so
 * y = e^c · e^(2x) = k·e^(2x) with k = e^c > 0. The condition y(0) = 3 gives
 * c = log 3 (k = 3), the particular solution y = 3e^(2x), and then
 * y(½ log 2) = 3·e^(log 2) = 6. The slider moves k (so c = log k); the
 * curve through (0, 3) is highlighted, and the slider's curve matches it
 * only at k = 3. Pinned by tests/notes-cet-visuals-maths.test.ts.
 */

/** The initial condition y(0) = 3 and the requested point x = ½ log 2. */
export const IC = { x0: 0, y0: 3 } as const;
export const ASK_X = 0.5 * Math.log(2);

/** One member of the family: y = k·e^(2x). */
export const member = (k: number, x: number) => k * Math.exp(2 * x);

/** The constant c in log y = 2x + c that passes through (x0, y0). */
export const cFromCondition = (x0: number, y0: number) => Math.log(y0) - 2 * x0;

/** The slider: k from 0.5 to 6, starting on the particular solution k = 3. */
export const K_RANGE = { min: 0.5, max: 6, step: 0.5 } as const;
export const DEFAULT_K = 3;

/** Faint family members always drawn for context. */
export const FAMILY_K = [1, 2, 4, 5] as const;

// Plot geometry (viewBox units): x from −1.5 to 0.5, y from 0 to 8.
export const PLOT = { x0: 40, x1: 300, y0: 186, y1: 26, xMin: -1.5, xMax: 0.5, yMax: 8 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (x: number) => r2(PLOT.x0 + ((x - PLOT.xMin) / (PLOT.xMax - PLOT.xMin)) * (PLOT.x1 - PLOT.x0));
export const py = (y: number) => r2(PLOT.y0 - (y / PLOT.yMax) * (PLOT.y0 - PLOT.y1));

/** Points of y = k·e^(2x) inside the plot, ending exactly where it leaves the top. */
export function curvePoints(k: number, samples = 80): { x: number; y: number }[] {
  const xTop = 0.5 * Math.log(PLOT.yMax / k);
  const xEnd = Math.min(PLOT.xMax, xTop);
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = PLOT.xMin + ((xEnd - PLOT.xMin) * i) / samples;
    out.push({ x, y: member(k, x) });
  }
  return out;
}

const poly = (k: number) =>
  curvePoints(k)
    .map((p) => `${px(p.x)},${py(p.y)}`)
    .join(" ");

const fmtK = (k: number) => (Number.isInteger(k) ? `${k}` : k.toFixed(1));

export default function CetDeSolutionFamily() {
  const [k, setK] = useState<number>(DEFAULT_K);
  const c = Math.log(k);
  const hits = Math.abs(member(k, IC.x0) - IC.y0) < 1e-9;
  const askY = member(IC.y0, ASK_X);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · one family of solutions, one curve through the given point
      </p>

      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label={`Curves y = k e to the 2x for several k. The one through (0, 3), y = 3 e to the 2x, is highlighted and reaches 6 at x = half log 2. The slider's curve has k = ${fmtK(k)}${hits ? ", the same curve" : ""}.`}
      >
        {/* Grid and axes */}
        {[0, 2, 4, 6, 8].map((t) => (
          <g key={t}>
            <line x1={PLOT.x0} y1={py(t)} x2={PLOT.x1} y2={py(t)} className="stroke-border" strokeWidth={t === 0 ? 1.2 : 0.6} />
            <text x={PLOT.x0 - 5} y={py(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        {[-1.5, -1, -0.5, 0, 0.5].map((t) => (
          <text key={t} x={px(t)} y={PLOT.y0 + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t < 0 ? `−${-t}` : t}
          </text>
        ))}
        <line x1={px(0)} y1={PLOT.y0} x2={px(0)} y2={PLOT.y1 - 6} className="stroke-muted-foreground" />
        <text x={px(0) + 4} y={PLOT.y1 - 8} className="fill-muted-foreground text-[10px]">
          y
        </text>
        <text x={PLOT.x1} y={PLOT.y0 + 26} textAnchor="end" className="fill-muted-foreground text-[10px]">
          x
        </text>

        {/* The family, faint */}
        {FAMILY_K.map((kk) => (
          <polyline key={kk} points={poly(kk)} fill="none" strokeWidth={1} className="stroke-muted-foreground" />
        ))}

        {/* The particular solution through (0, 3) */}
        <polyline points={poly(IC.y0)} fill="none" strokeWidth={3} className="stroke-emerald-600 dark:stroke-emerald-400" />

        {/* The slider's curve */}
        <polyline points={poly(k)} fill="none" strokeWidth={1.8} strokeDasharray={hits ? "5 4" : undefined} className="stroke-indigo-600 dark:stroke-indigo-400" />

        {/* The condition point and the requested value */}
        <circle cx={px(IC.x0)} cy={py(IC.y0)} r={4.5} className="fill-rose-600 dark:fill-rose-400" />
        <line x1={px(ASK_X)} y1={PLOT.y0} x2={px(ASK_X)} y2={py(askY)} strokeDasharray="3 3" className="stroke-muted-foreground" />
        <circle cx={px(ASK_X)} cy={py(askY)} r={3.5} className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={px(ASK_X) + 6} y={py(askY) + 4} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          6
        </text>
        <text x={px(ASK_X) - 4} y={PLOT.y0 - 6} textAnchor="end" className="fill-muted-foreground text-[9px]">
          x = ½ log 2
        </text>

        {/* Legend (the top left of the plot is empty: every curve is below 2 there) */}
        <g className="text-[10px]">
          <line x1={PLOT.x0 + 8} y1={36} x2={PLOT.x0 + 28} y2={36} strokeWidth={3} className="stroke-emerald-600 dark:stroke-emerald-400" />
          <text x={PLOT.x0 + 34} y={39.5} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            y = 3e²ˣ, through (0, 3)
          </text>
          <line x1={PLOT.x0 + 8} y1={52} x2={PLOT.x0 + 28} y2={52} strokeWidth={1.8} className="stroke-indigo-600 dark:stroke-indigo-400" />
          <text x={PLOT.x0 + 34} y={55.5} className="fill-indigo-700 tabular-nums dark:fill-indigo-300">
            slider: y = {fmtK(k)}e²ˣ
          </text>
          <line x1={PLOT.x0 + 8} y1={68} x2={PLOT.x0 + 28} y2={68} strokeWidth={1} className="stroke-muted-foreground" />
          <text x={PLOT.x0 + 34} y={71.5} className="fill-muted-foreground">
            k = 1, 2, 4, 5
          </text>
          <circle cx={PLOT.x0 + 18} cy={84} r={4} className="fill-rose-600 dark:fill-rose-400" />
          <text x={PLOT.x0 + 34} y={87.5} className="fill-rose-700 font-semibold dark:fill-rose-300">
            the condition y(0) = 3
          </text>
        </g>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Constant: k = e<sup>c</sup> = <span className="tabular-nums">{fmtK(k)}</span>, c = log {fmtK(k)} ≈{" "}
          <span className="tabular-nums">{c.toFixed(2)}</span>
        </span>
        <input
          type="range"
          min={K_RANGE.min}
          max={K_RANGE.max}
          step={K_RANGE.step}
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="The constant k, where y equals k times e to the power 2x"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="font-medium text-foreground">
          y = {fmtK(k)}e²ˣ: at x = 0, y = {fmtK(k)}
          {hits ? ". It passes through (0, 3): this is the particular solution, c = log 3." : `, not 3, so it misses (0, 3).`}
        </p>
        <p className="text-muted-foreground">log y = 2x + c gives y = eᶜ · e²ˣ = ke²ˣ; y(0) = 3 forces k = eᶜ = 3.</p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Each value of the constant gives its own curve, and no two cross, so exactly one passes through (0, 3). Integrate first, keeping c,
        then use the condition to choose the curve: y = 3e²ˣ, and at x = ½ log 2, y = 3 × 2 = 6.
      </p>
    </div>
  );
}
