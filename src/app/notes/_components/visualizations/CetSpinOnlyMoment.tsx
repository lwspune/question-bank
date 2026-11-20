"use client";

import { useState } from "react";

/**
 * Interactive: unpaired electrons and the spin-only magnetic moment (concept
 * cettr-spin-only-moment).
 *
 * A slider sets the number of d electrons, 0 to 10. The five 3d boxes fill one
 * electron each first and pair only from d⁶ on, so the unpaired count is n for
 * d¹ to d⁵ and 10 − n for d⁶ to d¹⁰, and μ = √(n(n+2)) BM. The bars show μ for
 * every d count: highest at d⁵ (5.92 BM), zero at d⁰ and d¹⁰. The ions under
 * each count are the concept's list. Opens on d⁶, Fe²⁺, the worked example
 * (4 unpaired, √24 = 4.90 BM). Pinned by tests/notes-w2-01.test.ts.
 */

/** Unpaired electrons for a d count: one per box up to five, then they pair. */
export function unpairedFromD(d: number): number {
  return d <= 5 ? d : 10 - d;
}

/** Spin-only moment μ = √(n(n+2)) in BM. */
export function spinOnly(n: number): number {
  return Math.sqrt(n * (n + 2));
}

/** Electrons in each of the five boxes: 1 or 2 (or 0). Single first, pairing from the first box. */
export function boxFilling(d: number): number[] {
  return [0, 1, 2, 3, 4].map((i) => (d >= 5 + i + 1 ? 2 : d >= i + 1 ? 1 : 0));
}

/** The concept's ions, by number of d electrons. */
export const IONS_BY_D: Readonly<Record<number, readonly string[]>> = {
  0: ["Sc³⁺"],
  1: ["Ti³⁺"],
  2: ["V³⁺"],
  3: ["Cr³⁺"],
  4: ["Cr²⁺"],
  5: ["Mn²⁺", "Fe³⁺"],
  6: ["Fe²⁺"],
  7: ["Co²⁺"],
  8: ["Ni²⁺"],
  9: ["Cu²⁺"],
  10: ["Zn²⁺"],
};

/** The worked example: Fe²⁺, d⁶. */
export const DEFAULT_D = 6;

const SUP = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹", "¹⁰"];
export const dLabel = (d: number) => `d${SUP[d]}`;

const BOX = { x0: 72, y: 22, w: 38, h: 38 } as const;
const BARS = { x0: 42, step: 26, w: 16, base: 196, scale: 15 } as const;

const r2 = (n: number) => Math.round(n * 100) / 100;

function Arrow({ x, up }: { x: number; up: boolean }) {
  const top = BOX.y + 7;
  const bottom = BOX.y + BOX.h - 7;
  const head = up ? `M${x - 4},${top + 6} L${x},${top} L${x + 4},${top + 6}` : `M${x - 4},${bottom - 6} L${x},${bottom} L${x + 4},${bottom - 6}`;
  return (
    <g className="stroke-indigo-700 dark:stroke-indigo-300" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1={x} y1={top} x2={x} y2={bottom} />
      <path d={head} />
    </g>
  );
}

export default function CetSpinOnlyMoment() {
  const [d, setD] = useState<number>(DEFAULT_D);
  const n = unpairedFromD(d);
  const mu = spinOnly(n);
  const fill = boxFilling(d);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · unpaired d electrons and the magnetic moment
      </p>

      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label={`${d} d electrons in five boxes: ${n} unpaired, spin-only moment ${mu.toFixed(2)} BM. Bars give the moment for every count from 0 to 10 d electrons, highest at 5 and zero at 0 and 10.`}
      >
        <text x={BOX.x0 - 8} y={BOX.y + BOX.h / 2 + 4} textAnchor="end" className="fill-foreground text-[12px] font-semibold">
          3{dLabel(d)}
        </text>
        {fill.map((e, i) => {
          const x = BOX.x0 + i * BOX.w;
          const cx = x + BOX.w / 2;
          return (
            <g key={i}>
              <rect x={x} y={BOX.y} width={BOX.w} height={BOX.h} className="fill-background stroke-foreground" strokeWidth={1.3} />
              {e === 1 && <Arrow x={cx} up />}
              {e === 2 && (
                <g>
                  <Arrow x={cx - 7} up />
                  <Arrow x={cx + 7} up={false} />
                </g>
              )}
            </g>
          );
        })}
        <text x={160} y={78} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          {n} unpaired · μ = {mu.toFixed(2)} BM · {IONS_BY_D[d].join(", ")}
        </text>

        {/* μ for every d count */}
        <text x={8} y={100} className="fill-muted-foreground text-[10px]">
          μ (BM) for each d count
        </text>
        <line x1={BARS.x0 - 10} y1={BARS.base} x2={BARS.x0 + 10 * BARS.step + BARS.w} y2={BARS.base} className="stroke-border" strokeWidth={1.2} />
        {SUP.map((_, k) => {
          const m = spinOnly(unpairedFromD(k));
          const h = r2(m * BARS.scale);
          const x = BARS.x0 + k * BARS.step;
          const on = k === d;
          return (
            <g key={k}>
              <rect
                x={x}
                y={r2(BARS.base - h)}
                width={BARS.w}
                height={h}
                className={on ? "fill-indigo-600 dark:fill-indigo-400" : "fill-indigo-200 dark:fill-indigo-900"}
              />
              <text x={x + BARS.w / 2} y={BARS.base + 12} textAnchor="middle" className={`text-[9px] ${on ? "fill-foreground font-bold" : "fill-muted-foreground"}`}>
                {dLabel(k)}
              </text>
              {on && (
                <text x={x + BARS.w / 2} y={r2(BARS.base - h - 4)} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold tabular-nums dark:fill-indigo-300">
                  {m.toFixed(2)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          d electrons: <span className="tabular-nums">{d}</span>
        </span>
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={d}
          onChange={(e) => setD(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Number of d electrons in the ion"
        />
      </label>

      <p className="mt-2 text-sm font-medium text-foreground tabular-nums">
        {dLabel(d)}: n = {n}, μ = √({n} × {n + 2}) = √{n * (n + 2)} = {mu.toFixed(2)} BM
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Each box takes one electron before any pairs, so from d⁶ on the extra electrons pair up and n = 10 minus the d count. Paired electrons
        cancel; only unpaired ones add to μ. Ions with the same d count have the same moment, whatever the element.
      </p>
    </div>
  );
}
