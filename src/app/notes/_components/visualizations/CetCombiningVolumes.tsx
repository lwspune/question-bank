"use client";

/**
 * Slider: combining gas volumes and the limiting reagent (concept
 * cetsbcc-stoich-combining-volumes).
 *
 * N₂ + 3H₂ → 2NH₃ at the same temperature and pressure, so volumes follow the
 * coefficients 1 : 3 : 2. N₂ is fixed at the worked example's 10 dm³ and the
 * slider sets the H₂ supplied. Each supplied volume is divided by its
 * coefficient; the smaller quotient is the limiting reagent and sets the
 * ammonia: 2 × (smaller quotient). The first render is the worked example
 * (30 dm³ H₂: 10/1 = 30/3, both used, 20 dm³ NH₃); steps of 3 keep every H₂ quotient whole. More H₂, as in the trap,
 * leaves N₂ limiting and the ammonia capped at 20 dm³. Pinned by tests/notes-w2-14.test.ts.
 */

import { useState } from "react";

/** Coefficients of N₂ + 3H₂ → 2NH₃. */
export const COEFF = { n2: 1, h2: 3, nh3: 2 } as const;
/** The worked example's nitrogen, dm³. */
export const N2_SUPPLIED = 10;
/** The slider: H₂ supplied, dm³. Default = the worked example. */
export const H2_RANGE = { min: 3, max: 45, step: 3 } as const;
export const DEFAULT_H2 = 30;

export type Limiting = "N₂" | "H₂" | "neither";

export type Outcome = {
  qN2: number;
  qH2: number;
  limiting: Limiting;
  n2Used: number;
  h2Used: number;
  n2Left: number;
  h2Left: number;
  nh3: number;
};

/** Divide each supplied volume by its coefficient; the smaller quotient runs out first. */
export function combine(n2: number, h2: number): Outcome {
  const qN2 = n2 / COEFF.n2;
  const qH2 = h2 / COEFF.h2;
  const q = Math.min(qN2, qH2);
  const limiting: Limiting = Math.abs(qN2 - qH2) < 1e-9 ? "neither" : qN2 < qH2 ? "N₂" : "H₂";
  const n2Used = q * COEFF.n2;
  const h2Used = q * COEFF.h2;
  return {
    qN2,
    qH2,
    limiting,
    n2Used,
    h2Used,
    n2Left: n2 - n2Used,
    h2Left: h2 - h2Used,
    nh3: q * COEFF.nh3,
  };
}

/** One decimal, no trailing ".0". */
export function fmt(x: number): string {
  const r = Math.round(x * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

export function limitingLine(o: Outcome): string {
  if (o.limiting === "neither") return "Neither is limiting: both are used up exactly";
  if (o.limiting === "N₂") return `N₂ is limiting: ${fmt(o.h2Left)} dm³ of H₂ is left over`;
  return `H₂ is limiting: ${fmt(o.n2Left)} dm³ of N₂ is left over`;
}

// Drawing: a shared volume scale, 0 to 45 dm³.
const BASE_Y = 156;
const TOP_Y = 46;
const V_MAX = 45;
export const py = (v: number) => Math.round((BASE_Y - (v / V_MAX) * (BASE_Y - TOP_Y)) * 100) / 100;
const BAR_W = 46;
const COLS = { n2: 92, h2: 178, nh3: 264 } as const;

function Bar({ x, used, left, usedClass }: { x: number; used: number; left: number; usedClass: string }) {
  const yUsedTop = py(used);
  const yLeftTop = py(used + left);
  return (
    <g>
      {left > 1e-9 && (
        <rect
          x={x - BAR_W / 2}
          y={yLeftTop}
          width={BAR_W}
          height={Math.round((yUsedTop - yLeftTop) * 100) / 100}
          strokeWidth={1}
          strokeDasharray="3 2"
          className="fill-background stroke-muted-foreground"
        />
      )}
      {used > 1e-9 && (
        <rect x={x - BAR_W / 2} y={yUsedTop} width={BAR_W} height={Math.round((BASE_Y - yUsedTop) * 100) / 100} className={usedClass} />
      )}
    </g>
  );
}

export default function CetCombiningVolumes() {
  const [h2, setH2] = useState<number>(DEFAULT_H2);
  const o = combine(N2_SUPPLIED, h2);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · which gas runs out first
      </p>
      <svg
        viewBox="0 0 320 222"
        className="block h-auto w-full"
        role="img"
        aria-label={`Nitrogen plus three hydrogen gives two ammonia, all at the same temperature and pressure. ${N2_SUPPLIED} cubic decimetres of nitrogen and ${fmt(h2)} of hydrogen are supplied. ${limitingLine(o)}. Ammonia formed: ${fmt(o.nh3)} cubic decimetres.`}
      >
        <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          N₂ + 3H₂ → 2NH₃
        </text>
        <text x={160} y={30} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          same temperature and pressure: volumes go 1 : 3 : 2
        </text>

        {/* volume scale */}
        <line x1={44} y1={BASE_Y} x2={310} y2={BASE_Y} strokeWidth={1} className="stroke-foreground" />
        <line x1={44} y1={TOP_Y} x2={44} y2={BASE_Y} strokeWidth={1} className="stroke-border" />
        {[0, 10, 20, 30, 40].map((v) => (
          <g key={v}>
            <line x1={41} y1={py(v)} x2={44} y2={py(v)} strokeWidth={1} className="stroke-foreground" />
            <text x={38} y={py(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {v}
            </text>
          </g>
        ))}
        <text x={8} y={TOP_Y - 6} className="fill-muted-foreground text-[10px]">
          dm³
        </text>

        <Bar x={COLS.n2} used={o.n2Used} left={o.n2Left} usedClass="fill-sky-500 dark:fill-sky-400" />
        <Bar x={COLS.h2} used={o.h2Used} left={o.h2Left} usedClass="fill-emerald-500 dark:fill-emerald-400" />
        <Bar x={COLS.nh3} used={o.nh3} left={0} usedClass="fill-indigo-500 dark:fill-indigo-400" />

        {/* values above the bars */}
        <text x={COLS.n2} y={py(N2_SUPPLIED) - 5} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          {fmt(N2_SUPPLIED)}
        </text>
        <text x={COLS.h2} y={py(h2) - 5} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          {fmt(h2)}
        </text>
        <text x={COLS.nh3} y={py(o.nh3) - 5} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          {fmt(o.nh3)}
        </text>

        {/* names and quotients under the bars */}
        <text x={COLS.n2} y={BASE_Y + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          N₂ supplied
        </text>
        <text x={COLS.h2} y={BASE_Y + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          H₂ supplied
        </text>
        <text x={COLS.nh3} y={BASE_Y + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          NH₃ formed
        </text>
        <text x={COLS.n2} y={BASE_Y + 28} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          {fmt(N2_SUPPLIED)} ÷ 1 = {fmt(o.qN2)}
        </text>
        <text x={COLS.h2} y={BASE_Y + 28} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          {fmt(h2)} ÷ 3 = {fmt(o.qH2)}
        </text>
        <text x={COLS.nh3} y={BASE_Y + 28} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          2 × {fmt(Math.min(o.qN2, o.qH2))} = {fmt(o.nh3)}
        </text>

        <text x={160} y={BASE_Y + 50} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          {limitingLine(o)}
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          H₂ supplied: <span className="tabular-nums">{fmt(h2)} dm³</span> (N₂ fixed at {N2_SUPPLIED} dm³)
        </span>
        <input
          type="range"
          min={H2_RANGE.min}
          max={H2_RANGE.max}
          step={H2_RANGE.step}
          value={h2}
          onChange={(e) => setH2(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Volume of hydrogen supplied, in cubic decimetres"
        />
      </label>

      <p className="mt-2 text-sm font-medium text-foreground tabular-nums">
        NH₃ formed: 2 × {fmt(Math.min(o.qN2, o.qH2))} = {fmt(o.nh3)} dm³
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Solid: the part of each gas that reacts. Dashed: the part left over. Divide each supplied volume by its coefficient: the
        smaller quotient is the limiting reagent, and it alone sets the ammonia. With 10 dm³ of N₂, adding more H₂ past 30 dm³
        never takes the ammonia beyond 20 dm³.
      </p>
    </div>
  );
}
