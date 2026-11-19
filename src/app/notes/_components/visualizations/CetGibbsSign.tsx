"use client";

import { useState } from "react";

/**
 * Interactive: ΔG = ΔH − TΔS against temperature (concept
 * cetth-gibbs-energy-and-spontaneity), for the worked example ΔH = +40 kJ,
 * ΔS = +125 J K⁻¹ = 0.125 kJ K⁻¹. ΔG is a straight line falling with T and
 * crossing zero at T = ΔH/ΔS = 320 K: not spontaneous below it, spontaneous
 * above it. A slider moves T; the first render is the example's 300 K, where
 * ΔG = +2.5 kJ. Under the plot, the four-case sign table, with this case
 * (both positive: high T only) marked.
 *
 * Pinned by tests/notes-cet-visuals-chem-c.test.ts.
 */

/** The worked example: ΔH in kJ, ΔS in kJ K⁻¹ (125 J K⁻¹). */
export const GIBBS_EXAMPLE = { dH: 40, dS: 0.125 } as const;

/** The example's temperature, in K. */
export const DEFAULT_T = 300;

/** Temperature slider, in K. */
export const T_RANGE = { min: 200, max: 440, step: 5 } as const;

/** ΔG axis, in kJ. */
export const G_AXIS = { min: -15, max: 15 } as const;

/** ΔG = ΔH − TΔS, in kJ, rounded to 3 decimals to keep float noise out of the labels. */
export function deltaG(T: number, dH: number = GIBBS_EXAMPLE.dH, dS: number = GIBBS_EXAMPLE.dS): number {
  return Math.round((dH - T * dS) * 1000) / 1000;
}

/** Temperature where ΔG = 0: T = ΔH/ΔS. */
export function crossoverT(dH: number = GIBBS_EXAMPLE.dH, dS: number = GIBBS_EXAMPLE.dS): number {
  return dH / dS;
}

export type Verdict = "spontaneous" | "not spontaneous" | "at equilibrium";

export function verdict(dG: number): Verdict {
  if (Math.abs(dG) < 1e-9) return "at equilibrium";
  return dG < 0 ? "spontaneous" : "not spontaneous";
}

/** "+2.5", "−2.5" or "0", with a true minus sign. */
export function signed(v: number): string {
  if (Math.abs(v) < 1e-9) return "0";
  const s = String(Math.round(Math.abs(v) * 1000) / 1000);
  return v > 0 ? `+${s}` : `−${s}`;
}

/** The four sign cases, as the concept states them. */
export const SIGN_TABLE = [
  { dH: "< 0", dS: "> 0", when: "at all T", drawn: false },
  { dH: "> 0", dS: "< 0", when: "at no T", drawn: false },
  { dH: "> 0", dS: "> 0", when: "high T only (T > ΔH/ΔS)", drawn: true },
  { dH: "< 0", dS: "< 0", when: "low T only (T < ΔH/ΔS)", drawn: false },
] as const;

// Plot geometry (viewBox units).
export const PLOT = { x0: 40, x1: 306, y0: 166, y1: 26 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (T: number) => r2(PLOT.x0 + ((T - T_RANGE.min) / (T_RANGE.max - T_RANGE.min)) * (PLOT.x1 - PLOT.x0));
const py = (g: number) => r2(PLOT.y0 - ((g - G_AXIS.min) / (G_AXIS.max - G_AXIS.min)) * (PLOT.y0 - PLOT.y1));

export default function CetGibbsSign() {
  const [T, setT] = useState<number>(DEFAULT_T);
  const g = deltaG(T);
  const v = verdict(g);
  const Tx = crossoverT();
  const tone =
    v === "spontaneous"
      ? "fill-emerald-600 dark:fill-emerald-400"
      : v === "not spontaneous"
        ? "fill-rose-600 dark:fill-rose-400"
        : "fill-amber-600 dark:fill-amber-400";

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · Gibbs energy against temperature
      </p>

      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label={`Delta G against temperature for delta H = +40 kJ and delta S = +125 J per K. The line falls and crosses zero at 320 K. At ${T} K, delta G is ${signed(g)} kJ: ${v}.`}
      >
        {/* Halves: above zero not spontaneous, below spontaneous */}
        <rect x={PLOT.x0} y={PLOT.y1} width={PLOT.x1 - PLOT.x0} height={py(0) - PLOT.y1} className="fill-rose-500/10 dark:fill-rose-400/10" />
        <rect x={PLOT.x0} y={py(0)} width={PLOT.x1 - PLOT.x0} height={PLOT.y0 - py(0)} className="fill-emerald-500/10 dark:fill-emerald-400/10" />
        <text x={PLOT.x1 - 4} y={PLOT.y1 + 12} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          ΔG &gt; 0: not spontaneous
        </text>
        <text x={PLOT.x0 + 4} y={PLOT.y0 - 6} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          ΔG &lt; 0: spontaneous
        </text>

        {/* Axes and ticks */}
        {[-10, 0, 10].map((t) => (
          <g key={t}>
            <line x1={PLOT.x0} y1={py(t)} x2={PLOT.x1} y2={py(t)} className="stroke-border" strokeWidth={t === 0 ? 1.4 : 0.6} />
            <text x={PLOT.x0 - 5} y={py(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {signed(t)}
            </text>
          </g>
        ))}
        {[200, 260, 320, 380, 440].map((t) => (
          <text key={t} x={px(t)} y={PLOT.y0 + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1} className="stroke-muted-foreground" />
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y0} className="stroke-muted-foreground" />
        <text x={6} y={16} className="fill-muted-foreground text-[10px]">
          ΔG (kJ)
        </text>
        <text x={PLOT.x1} y={PLOT.y0 + 26} textAnchor="end" className="fill-muted-foreground text-[10px]">
          temperature T (K)
        </text>

        {/* Crossover T = ΔH/ΔS */}
        <line x1={px(Tx)} y1={PLOT.y0} x2={px(Tx)} y2={PLOT.y1} strokeDasharray="4 4" className="stroke-muted-foreground" />
        <text x={px(Tx) + 4} y={py(0) - 22} className="fill-foreground text-[10px] font-semibold tabular-nums">
          T = ΔH/ΔS
        </text>
        <text x={px(Tx) + 4} y={py(0) - 10} className="fill-foreground text-[10px] font-semibold tabular-nums">
          = 40/0.125 = {Tx} K
        </text>

        {/* The line ΔG = 40 − 0.125 T */}
        <line
          x1={px(T_RANGE.min)}
          y1={py(deltaG(T_RANGE.min))}
          x2={px(T_RANGE.max)}
          y2={py(deltaG(T_RANGE.max))}
          strokeWidth={2.5}
          className="stroke-indigo-600 dark:stroke-indigo-400"
        />

        {/* Current T */}
        <line x1={px(T)} y1={PLOT.y0} x2={px(T)} y2={py(g)} strokeWidth={1} className="stroke-foreground" />
        <circle cx={px(T)} cy={py(g)} r={4.5} className={tone} />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Temperature T: <span className="tabular-nums">{T} K</span>
        </span>
        <input
          type="range"
          min={T_RANGE.min}
          max={T_RANGE.max}
          step={T_RANGE.step}
          value={T}
          onChange={(e) => setT(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Temperature, in kelvin"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          ΔG = 40 − {T} × 0.125 = {signed(g)} kJ: {v}
        </p>
        <p className="text-muted-foreground">ΔH = +40 kJ, ΔS = +125 J K⁻¹ = 0.125 kJ K⁻¹ (same units as ΔH)</p>
      </div>

      <table className="mt-3 w-full text-left text-xs">
        <thead>
          <tr className="text-muted-foreground">
            <th className="py-0.5 pr-2 font-medium">ΔH</th>
            <th className="py-0.5 pr-2 font-medium">ΔS</th>
            <th className="py-0.5 font-medium">Spontaneous</th>
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {SIGN_TABLE.map((row) => (
            <tr key={`${row.dH}${row.dS}`} className={row.drawn ? "font-semibold text-indigo-700 dark:text-indigo-300" : "text-foreground"}>
              <td className="py-0.5 pr-2">{row.dH}</td>
              <td className="py-0.5 pr-2">{row.dS}</td>
              <td className="py-0.5">
                {row.when}
                {row.drawn ? " (drawn)" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
