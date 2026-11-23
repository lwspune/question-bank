"use client";

/**
 * Slider: the spin-only magnetic moment against the d-electron count of a free
 * 3d ion (concept jcdfb-spin-only). The five 3d boxes fill singly to d⁵, then
 * pair up, so n rises to 5 and falls back to 0; the bars show
 * μ = √(n(n+2)) BM for every count. Opens on d⁷, the concept's Co²⁺ example
 * (n = 3, 3.87 BM). Ions named are the ones the concept names.
 *
 * Pinned by tests/notes-w2-03.test.ts.
 */
import { useState } from "react";

/** Unpaired electrons of a free dˣ ion: x up to d⁵, then 10 − x. */
export function unpaired(x: number): number {
  return x <= 5 ? x : 10 - x;
}

/** Spin-only moment in BM, to 2 decimals. */
export function spinOnly(n: number): number {
  return Math.round(Math.sqrt(n * (n + 2)) * 100) / 100;
}

/** Electrons in each of the five 3d boxes: singly first, then pairing (Hund's rule). */
export function boxes(x: number): number[] {
  return Array.from({ length: 5 }, (_, i) => (i < Math.min(x, 5) ? 1 : 0) + (i < x - 5 ? 1 : 0));
}

/** Free ions the concept names, by d count. */
export const IONS: Record<number, string> = {
  0: "Sc³⁺",
  1: "Ti³⁺",
  3: "V²⁺, Cr³⁺",
  5: "Mn²⁺, Fe³⁺",
  7: "Co²⁺",
  8: "Ni²⁺",
  9: "Cu²⁺",
};

export const DEFAULT_D = 7;
const SUP = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹", "¹⁰"];
export const dLabel = (x: number) => `d${SUP[x]}`;

// Geometry (viewBox 0 0 320 214).
const BOX = { x0: 36, y: 26, w: 34, h: 30, gap: 4 } as const;
const BAR = { x0: 34, y0: 186, w: 22, step: 26, perBm: 16 } as const;

function Arrow({ x, y, up }: { x: number; y: number; up: boolean }) {
  const tip = up ? y - 9 : y + 9;
  const tail = up ? y + 9 : y - 9;
  const head = up ? `M${x - 3},${tip + 4} L${x},${tip} L${x + 3},${tip + 4}` : `M${x - 3},${tip - 4} L${x},${tip} L${x + 3},${tip - 4}`;
  return (
    <g className="stroke-foreground" fill="none" strokeWidth={1.5}>
      <line x1={x} y1={tail} x2={x} y2={tip} />
      <path d={head} />
    </g>
  );
}

export default function JeeSpinOnlyMoment() {
  const [d, setD] = useState<number>(DEFAULT_D);
  const n = unpaired(d);
  const mu = spinOnly(n);
  const fill = boxes(d);
  const ions = IONS[d];

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · spin-only moment and the d-electron count
      </p>

      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label={`Five 3d boxes holding ${d} electrons: ${n} unpaired, spin-only moment ${mu.toFixed(2)} BM. Bars below give the moment for d0 to d10: it rises to 5.92 BM at d5 and falls back to 0 at d10.`}
      >
        <text x={BOX.x0 - 8} y={BOX.y + 19} textAnchor="end" className="fill-muted-foreground text-[11px]">
          3d
        </text>
        {fill.map((e, i) => {
          const x = BOX.x0 + i * (BOX.w + BOX.gap);
          const cx = x + BOX.w / 2;
          return (
            <g key={i}>
              <rect x={x} y={BOX.y} width={BOX.w} height={BOX.h} fill="none" strokeWidth={1.2} className="stroke-foreground" />
              {e === 1 && <Arrow x={cx} y={BOX.y + BOX.h / 2} up />}
              {e === 2 && (
                <>
                  <Arrow x={cx - 6} y={BOX.y + BOX.h / 2} up />
                  <Arrow x={cx + 6} y={BOX.y + BOX.h / 2} up={false} />
                </>
              )}
            </g>
          );
        })}
        <text x={232} y={BOX.y + 12} className="fill-foreground text-[12px] font-semibold">
          {dLabel(d)}
        </text>
        <text x={232} y={BOX.y + 27} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          n = {n} unpaired
        </text>
        <text x={130} y={BOX.y + BOX.h + 16} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {ions ? `free ion: ${ions}` : "singly first, then pairs"}
        </text>

        {/* Bars: μ for every d count */}
        <text x={6} y={96} className="fill-muted-foreground text-[10px]">
          μ (BM)
        </text>
        <line x1={BAR.x0 - 6} y1={BAR.y0} x2={BAR.x0 + 11 * BAR.step - 2} y2={BAR.y0} className="stroke-muted-foreground" />
        {Array.from({ length: 11 }, (_, x) => {
          const m = spinOnly(unpaired(x));
          const h = m * BAR.perBm;
          const bx = BAR.x0 + x * BAR.step;
          const on = x === d;
          return (
            <g key={x}>
              <rect
                x={bx}
                y={BAR.y0 - h}
                width={BAR.w}
                height={h}
                className={on ? "fill-indigo-600 dark:fill-indigo-400" : "fill-indigo-200 dark:fill-indigo-900"}
              />
              <text x={bx + BAR.w / 2} y={BAR.y0 + 13} textAnchor="middle" className={`${on ? "fill-foreground font-semibold" : "fill-muted-foreground"} text-[10px]`}>
                {dLabel(x)}
              </text>
              {on && (
                <text x={bx + BAR.w / 2} y={BAR.y0 - h - 5} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold tabular-nums dark:fill-indigo-300">
                  {m.toFixed(2)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          d electrons in the free ion: <span className="tabular-nums">{d}</span>
        </span>
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={d}
          onChange={(e) => setD(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Number of d electrons in the free ion"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="text-rose-700 dark:text-rose-300">
          n = {d <= 5 ? `${d}` : `10 − ${d} = ${n}`} unpaired
        </p>
        <p className="font-medium text-foreground">
          μ = √({n} × {n + 2}) = √{n * (n + 2)} = {mu.toFixed(2)} BM
        </p>
      </div>
    </div>
  );
}
