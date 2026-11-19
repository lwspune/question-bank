"use client";

import { useState } from "react";

/**
 * Interactive: the Maxwell distribution of molecular speeds for helium, with
 * its three speeds marked (concept jpktg-speed-types).
 *
 * f(v) = 4π (M/2πRT)^(3/2) v² e^(−Mv²/2RT). The most probable speed sits at
 * the peak, vₚ = √(2RT/M); the average speed √(8RT/πM) is a little higher and
 * the rms speed √(3RT/M) higher still, always in the ratio
 * √2 : √(8/π) : √3 = 1 : 1.128 : 1.225. A slider sets the temperature: a hotter
 * gas has a lower, wider curve shifted to higher speeds (the area under it, all
 * the molecules, stays the same).
 *
 * Numbers: the concept's worked example, helium (M = 4 g/mol = 0.004 kg/mol)
 * at 400 K with R = 8.3: √(RT/M) ≈ 911 m/s, so about 1288, 1454 and 1578 m/s.
 * Pinned by tests/notes-jee-visuals-phys-a.test.ts.
 */

/** Gas constant (as in the worked example) and helium's molar mass in kg/mol. */
export const GAS = { R: 8.3, M: 0.004 } as const;
export const DEFAULT_T = 400;
/** Temperature slider, kelvin. */
export const T_RANGE = { min: 100, max: 1000, step: 50 } as const;

/** The three speeds, m/s. */
export function speeds(T: number, M: number = GAS.M, R: number = GAS.R) {
  const base = Math.sqrt((R * T) / M);
  return {
    base,
    vp: Math.sqrt((2 * R * T) / M),
    vavg: Math.sqrt((8 * R * T) / (Math.PI * M)),
    vrms: Math.sqrt((3 * R * T) / M),
  };
}

/** Maxwell distribution: fraction of molecules per unit speed (per m/s) at speed v. */
export function maxwell(v: number, T: number, M: number = GAS.M, R: number = GAS.R): number {
  const a = M / (2 * R * T);
  return 4 * Math.PI * (a / Math.PI) ** 1.5 * v * v * Math.exp(-a * v * v);
}

/** Speed axis (m/s) and the fixed height of the plot (per m/s). */
export const V_MAX = 4000;
export const F_MAX = 1.35e-3;

export const PLOT = { x0: 26, x1: 306, y0: 30, y1: 168 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (v: number) => r2(PLOT.x0 + (v / V_MAX) * (PLOT.x1 - PLOT.x0));
const py = (f: number) => r2(PLOT.y1 - (f / F_MAX) * (PLOT.y1 - PLOT.y0));

/** Polyline points of the curve at temperature T. */
export function curvePoints(T: number, samples = 160): { v: number; f: number }[] {
  const out: { v: number; f: number }[] = [];
  for (let k = 0; k <= samples; k++) {
    const v = (k / samples) * V_MAX;
    out.push({ v, f: maxwell(v, T) });
  }
  return out;
}

const pts = (T: number) =>
  curvePoints(T)
    .map((p) => `${px(p.v)},${py(p.f)}`)
    .join(" ");

const MARKS = [
  { key: "vp", sub: "p", stroke: "stroke-emerald-600 dark:stroke-emerald-400", fill: "fill-emerald-600 dark:fill-emerald-400", text: "fill-emerald-700 dark:fill-emerald-300" },
  { key: "vavg", sub: "", stroke: "stroke-amber-600 dark:stroke-amber-400", fill: "fill-amber-600 dark:fill-amber-400", text: "fill-amber-700 dark:fill-amber-300" },
  { key: "vrms", sub: "rms", stroke: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-600 dark:fill-rose-400", text: "fill-rose-700 dark:fill-rose-300" },
] as const;

/** A distinct marker per speed (circle, square, triangle), so colour is not the only cue. */
function Marker({ k, x, y, className }: { k: number; x: number; y: number; className: string }) {
  if (k === 0) return <circle cx={x} cy={y} r={3.2} className={className} />;
  if (k === 1) return <rect x={r2(x - 3)} y={r2(y - 3)} width={6} height={6} className={className} />;
  return <polygon points={`${x},${r2(y - 4)} ${r2(x - 4)},${r2(y + 3)} ${r2(x + 4)},${r2(y + 3)}`} className={className} />;
}

/** The speed's symbol: v with a subscript, or v with a bar for the average. */
function Sym({ k }: { k: number }) {
  if (k === 1)
    return (
      <>
        <tspan textDecoration="overline">v</tspan>
        <tspan> </tspan>
      </>
    );
  return (
    <>
      v<tspan dy={3} className="text-[8px]">{MARKS[k].sub}</tspan>
      <tspan dy={-3}> </tspan>
    </>
  );
}

export default function JeeMaxwellSpeeds() {
  const [T, setT] = useState<number>(DEFAULT_T);
  const s = speeds(T);
  const values = [s.vp, s.vavg, s.vrms];
  const formulas = ["√(2RT/M)", "√(8RT/πM)", "√(3RT/M)"];
  const peakY = py(maxwell(s.vp, T));

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the spread of molecular speeds in a gas
      </p>

      <svg
        viewBox="0 0 320 238"
        className="block h-auto w-full"
        role="img"
        aria-label={`Maxwell distribution of molecular speeds for helium at ${T} kelvin. The curve rises from zero, peaks at the most probable speed, about ${Math.round(s.vp)} metres per second, and has a long tail to high speeds. The average speed, about ${Math.round(s.vavg)}, and the rms speed, about ${Math.round(s.vrms)}, lie a little to the right of the peak.`}
      >
        {/* Axes */}
        {[0, 1000, 2000, 3000, 4000].map((v) => (
          <text key={v} x={px(v)} y={PLOT.y1 + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {v}
          </text>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y1} x2={PLOT.x1} y2={PLOT.y1} className="stroke-muted-foreground" />
        <line x1={PLOT.x0} y1={PLOT.y1} x2={PLOT.x0} y2={PLOT.y0 - 6} className="stroke-muted-foreground" />
        <text x={8} y={18} className="fill-muted-foreground text-[10px]">
          share of molecules per unit speed
        </text>
        <text x={PLOT.x1} y={PLOT.y1 + 26} textAnchor="end" className="fill-muted-foreground text-[10px]">
          speed v (m/s)
        </text>

        {/* The worked example's curve, faint, once T moves */}
        {T !== DEFAULT_T && <polyline points={pts(DEFAULT_T)} fill="none" strokeDasharray="3 3" strokeWidth={1.2} className="stroke-muted-foreground" />}
        {T !== DEFAULT_T && (
          <text x={px(speeds(DEFAULT_T).vp)} y={py(maxwell(speeds(DEFAULT_T).vp, DEFAULT_T)) - 5} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            400 K
          </text>
        )}

        {/* The three speeds */}
        {values.map((v, k) => (
          <g key={MARKS[k].key}>
            <line x1={px(v)} y1={PLOT.y1} x2={px(v)} y2={py(maxwell(v, T))} strokeWidth={1.5} strokeDasharray={k === 0 ? undefined : "3 2"} className={MARKS[k].stroke} />
            <Marker k={k} x={px(v)} y={py(maxwell(v, T))} className={MARKS[k].fill} />
          </g>
        ))}

        {/* The curve */}
        <polyline points={pts(T)} fill="none" strokeWidth={2.4} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={r2(px(s.vp) - 6)} y={r2(peakY - 6)} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300 tabular-nums">
          {T} K
        </text>

        {/* Key: marker, symbol, formula, value */}
        <g className="text-[11px] tabular-nums">
          {values.map((v, k) => (
            <g key={MARKS[k].key}>
              <Marker k={k} x={38} y={196 + 15 * k - 4} className={MARKS[k].fill} />
              <text x={48} y={196 + 15 * k} className={MARKS[k].text}>
                <Sym k={k} />= {formulas[k]} = {Math.round(v)} m/s
              </text>
            </g>
          ))}
        </g>
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
          aria-label="Temperature of the helium, in kelvin"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          √(RT/M) = √(8.3 × {T}/0.004) ≈ {Math.round(s.base)} m/s
        </p>
        <p className="text-muted-foreground tabular-nums">
          Ratio at every temperature: 1 : {(s.vavg / s.vp).toFixed(3)} : {(s.vrms / s.vp).toFixed(3)}
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Helium, M = 4 g/mol = 0.004 kg/mol. The most probable speed is the peak; the average speed is a little higher, and the rms speed, which
        squares the speeds and so weights the fast molecules more, is higher still. All three grow as √T, so their ratio never changes. A hotter
        gas has a lower, wider curve shifted to the right: the area under it, all the molecules, stays the same.
      </p>
    </div>
  );
}
