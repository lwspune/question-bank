"use client";

/**
 * Slider: which value of a constant leaves a system with no solution
 * (concept jdet-nosol-find), drawn with the concept's own trap example,
 * kx + y = 1 and x + ky = 1.
 *
 * Δ = k² − 1 is zero at k = 1 and k = −1, and each root must be tested:
 * Δₓ = Δy = k − 1. At k = 1 every determinant vanishes and both equations
 * are x + y = 1, one line, so infinitely many solutions. At k = −1,
 * Δₓ = −2 ≠ 0: the lines y = x + 1 and y = x − 1 are parallel, no solution.
 * Anywhere else the lines cross at x = y = 1/(k + 1). The slider opens on
 * k = −1, the answer. Pinned by tests/notes-w2-04.test.ts.
 */
import { useState } from "react";

export const K_RANGE = { min: -2, max: 2, step: 0.5, start: -1 } as const;

/** Δ, Δₓ and Δy for kx + y = 1, x + ky = 1. */
export function dets(k: number): { d: number; dx: number; dy: number } {
  return { d: k * k - 1, dx: k * 1 - 1 * 1, dy: k * 1 - 1 * 1 };
}

export type Verdict = "unique" | "none" | "infinite";

export function verdictAt(k: number): Verdict {
  const { d, dx, dy } = dets(k);
  if (d !== 0) return "unique";
  return dx !== 0 || dy !== 0 ? "none" : "infinite";
}

/** The crossing point (Cramer) when the solution is unique. */
export function crossing(k: number): { x: number; y: number } | null {
  const { d, dx, dy } = dets(k);
  return d === 0 ? null : { x: dx / d, y: dy / d };
}

/** a·x + b·y = c as text, e.g. "−x + y = 1", "x − 0.5y = 1", "y = 1". */
export function eqText(a: number, b: number, c: number): string {
  const term = (coef: number, v: string, first: boolean): string => {
    if (coef === 0) return "";
    const mag = Math.abs(coef) === 1 ? v : `${Math.abs(coef)}${v}`;
    if (first) return coef < 0 ? `−${mag}` : mag;
    return coef < 0 ? ` − ${mag}` : ` + ${mag}`;
  };
  const tx = term(a, "x", true);
  const ty = term(b, "y", tx === "");
  return `${tx}${ty} = ${c}`;
}

// Plot: x and y from −3 to 3.
export const PLOT = { cx: 160, cy: 128, unit: 30, lim: 3 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (x: number) => r2(PLOT.cx + x * PLOT.unit);
export const py = (y: number) => r2(PLOT.cy - y * PLOT.unit);

/** The part of a·x + b·y = c inside the square |x|, |y| ≤ lim. */
export function clipLine(a: number, b: number, c: number, lim: number): [{ x: number; y: number }, { x: number; y: number }] | null {
  const pts: { x: number; y: number }[] = [];
  const add = (x: number, y: number) => {
    if (Math.abs(x) <= lim + 1e-9 && Math.abs(y) <= lim + 1e-9 && !pts.some((p) => Math.abs(p.x - x) < 1e-9 && Math.abs(p.y - y) < 1e-9)) {
      pts.push({ x, y });
    }
  };
  if (b !== 0) {
    add(-lim, (c - a * -lim) / b);
    add(lim, (c - a * lim) / b);
  }
  if (a !== 0) {
    add((c - b * -lim) / a, -lim);
    add((c - b * lim) / a, lim);
  }
  return pts.length >= 2 ? [pts[0], pts[1]] : null;
}

const fmt = (n: number) => (Number.isInteger(n) ? `${n}`.replace("-", "−") : n.toFixed(2).replace(/0$/, "").replace("-", "−"));

export default function JeeTwoLinesParameter() {
  const [k, setK] = useState<number>(K_RANGE.start);
  const { d, dx } = dets(k);
  const verdict = verdictAt(k);
  const p = crossing(k);
  const l1 = clipLine(k, 1, 1, PLOT.lim);
  const l2 = clipLine(1, k, 1, PLOT.lim);
  const ticks = [-3, -2, -1, 1, 2, 3];

  const headline =
    verdict === "none" ? "Parallel lines: no solution" : verdict === "infinite" ? "One line twice: infinitely many" : "The lines cross: one solution";

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · two lines as the constant k moves
      </p>
      <svg
        viewBox="0 0 320 240"
        className="block h-auto w-full"
        role="img"
        aria-label={`The lines ${eqText(k, 1, 1)} and ${eqText(1, k, 1)} at k = ${fmt(k)}. ${headline}.`}
      >
        {/* Grid and axes */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={py(-3)} x2={px(t)} y2={py(3)} className="stroke-border" strokeWidth={0.5} />
            <line x1={px(-3)} y1={py(t)} x2={px(3)} y2={py(t)} className="stroke-border" strokeWidth={0.5} />
            <text x={px(t)} y={py(0) + 11} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
              {fmt(t)}
            </text>
            <text x={px(0) - 4} y={py(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
              {fmt(t)}
            </text>
          </g>
        ))}
        <line x1={px(-3)} y1={py(0)} x2={px(3)} y2={py(0)} className="stroke-muted-foreground" />
        <line x1={px(0)} y1={py(-3)} x2={px(0)} y2={py(3)} className="stroke-muted-foreground" />
        <text x={px(3) + 4} y={py(0) + 3} className="fill-muted-foreground text-[10px]">
          x
        </text>
        <text x={px(0) + 4} y={py(3) + 3} className="fill-muted-foreground text-[10px]">
          y
        </text>

        {/* The two lines: the second dashed, so a line drawn twice still shows both */}
        {l1 && (
          <line x1={px(l1[0].x)} y1={py(l1[0].y)} x2={px(l1[1].x)} y2={py(l1[1].y)} strokeWidth={2.5} className="stroke-sky-600 dark:stroke-sky-400" />
        )}
        {l2 && (
          <line
            x1={px(l2[0].x)}
            y1={py(l2[0].y)}
            x2={px(l2[1].x)}
            y2={py(l2[1].y)}
            strokeWidth={2}
            strokeDasharray="6 4"
            className="stroke-amber-600 dark:stroke-amber-400"
          />
        )}
        {p && <circle cx={px(p.x)} cy={py(p.y)} r={4} className="fill-emerald-600 dark:fill-emerald-400" />}

        {/* Legend */}
        <g className="text-[10.5px]">
          <line x1={8} y1={12} x2={24} y2={12} strokeWidth={2.5} className="stroke-sky-600 dark:stroke-sky-400" />
          <text x={28} y={15} className="fill-foreground">
            kx + y = 1: {eqText(k, 1, 1)}
          </text>
          <line x1={8} y1={28} x2={24} y2={28} strokeWidth={2} strokeDasharray="6 4" className="stroke-amber-600 dark:stroke-amber-400" />
          <text x={28} y={31} className="fill-foreground">
            x + ky = 1: {eqText(1, k, 1)}
          </text>
        </g>
        <text x={312} y={235} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {headline}
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          k: <span className="tabular-nums">{fmt(k)}</span>
        </span>
        <input
          type="range"
          min={K_RANGE.min}
          max={K_RANGE.max}
          step={K_RANGE.step}
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="k, the constant in both equations"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="text-muted-foreground">
          Δ = k² − 1 = {fmt(d)}; Δ<sub>x</sub> = Δ<sub>y</sub> = k − 1 = {fmt(dx)}
        </p>
        <p className="font-medium text-foreground">
          {verdict === "none"
            ? "Δ = 0 but Δₓ is not 0: no solution."
            : verdict === "infinite"
              ? "Δ = 0 and every determinant is 0: infinitely many solutions."
              : `Δ is not 0: one solution, x = y = 1/(k + 1) ${p && Math.abs(p.x * 100 - Math.round(p.x * 100)) > 1e-9 ? "≈" : "="} ${fmt(p ? p.x : 0)}.`}
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Δ = k² − 1 is zero at k = 1 and at k = −1, and each value must be tested. At k = 1 both equations are x + y = 1, the same line:
        infinitely many solutions. Only k = −1 gives parallel lines and no solution.
      </p>
    </div>
  );
}
