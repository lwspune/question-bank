"use client";

/**
 * Interactive: the Michaelis-Menten curve v = Vmax[S]/(Km + [S]) of the IMAT
 * concept imat-bmo-substrate-concentration. Sliders set Vmax and Km; the
 * dashed line is Vmax (the plateau when every active site is busy) and the
 * marked point is [S] = Km, where v is exactly half of Vmax.
 *
 * Opens on the concept's worked example: Vmax = 40 µmol/min, Km = 2.0
 * mmol/dm³, so v = 20 at [S] = 2.0 and v = 30 at [S] = 6.0. Pure maths is
 * exported and pinned by tests/notes-imat-visuals-biometab.test.ts.
 */
import { useState } from "react";

export const EXAMPLE = { vmax: 40, km: 2, probeS: 6 } as const;
export const S_MAX = 20; // mmol/dm³ on the x axis
export const V_AXIS_MAX = 80; // µmol/min on the y axis
export const VMAX_RANGE = { min: 10, max: 80, step: 5 } as const;
export const KM_RANGE = { min: 0.5, max: 10, step: 0.5 } as const;

export function mmRate(vmax: number, km: number, s: number): number {
  return (vmax * s) / (km + s);
}

const round1 = (n: number) => Math.round(n * 10) / 10;

const W = 320;
const H = 190;
const PL = 36;
const PR = 14;
const PT = 14;
const PB = 34;
const BASE = H - PB;
const PLOT_H = BASE - PT;
const x = (s: number) => PL + (s / S_MAX) * (W - PL - PR);
const y = (v: number) => BASE - (v / V_AXIS_MAX) * PLOT_H;

/** The curve as SVG points, every coordinate to 1 decimal. */
export function mmPoints(vmax: number, km: number, n = 100): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const s = (S_MAX * i) / n;
    pts.push(`${x(s).toFixed(1)},${y(mmRate(vmax, km, s)).toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function ImatMichaelisMenten() {
  const [vmax, setVmax] = useState<number>(EXAMPLE.vmax);
  const [km, setKm] = useState<number>(EXAMPLE.km);

  const half = vmax / 2;
  const probe = round1(mmRate(vmax, km, EXAMPLE.probeS));
  const kmX = Math.min(x(km), W - PR);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · rate against substrate concentration
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Michaelis-Menten curve: the rate rises steeply, then levels off towards Vmax = ${vmax} µmol/min; at [S] = Km = ${km} mmol/dm³ the rate is ${half} µmol/min, half of Vmax`}
      >
        {/* Axes and ticks. */}
        <line x1={PL} y1={PT} x2={PL} y2={BASE} className="stroke-muted-foreground/60" />
        <line x1={PL} y1={BASE} x2={W - PR} y2={BASE} className="stroke-muted-foreground/60" />
        {[0, 20, 40, 60, 80].map((v) => (
          <text key={v} x={PL - 5} y={y(v) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {v}
          </text>
        ))}
        {[0, 5, 10, 15, 20].map((s) => (
          <text key={s} x={x(s)} y={BASE + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {s}
          </text>
        ))}
        <text x={W - PR} y={BASE + 26} textAnchor="end" className="fill-muted-foreground text-[10px]">
          [S] (mmol/dm³)
        </text>
        <text x={PL + 4} y={PT + 2} className="fill-muted-foreground text-[10px]">
          v (µmol/min)
        </text>

        {/* Vmax asymptote. */}
        <line x1={PL} y1={y(vmax)} x2={W - PR} y2={y(vmax)} strokeDasharray="5 4" className="stroke-rose-500 dark:stroke-rose-400" strokeWidth={1.5} />
        <text x={W - PR} y={y(vmax) - 4} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          Vmax
        </text>

        {/* Km: where v = Vmax/2. */}
        <polyline
          points={`${PL},${y(half).toFixed(1)} ${kmX.toFixed(1)},${y(half).toFixed(1)} ${kmX.toFixed(1)},${BASE}`}
          fill="none"
          strokeDasharray="3 3"
          className="stroke-amber-500 dark:stroke-amber-400"
        />
        <text x={kmX + 4} y={BASE - 4} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          Km
        </text>
        <text x={kmX + 6} y={Math.min(y(half) + 14, BASE - 16)} className="fill-amber-700 text-[10px] dark:fill-amber-300">
          v = Vmax/2
        </text>

        <polyline points={mmPoints(vmax, km)} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
        <circle cx={kmX} cy={y(half)} r={3.5} className="fill-amber-500" />
      </svg>

      <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 text-xs sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Vmax: <span className="tabular-nums">{vmax}</span> µmol/min
          </span>
          <input
            type="range"
            min={VMAX_RANGE.min}
            max={VMAX_RANGE.max}
            step={VMAX_RANGE.step}
            value={vmax}
            onChange={(e) => setVmax(Number(e.target.value))}
            className="accent-rose-600"
            aria-label="Vmax, the maximum rate"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Km: <span className="tabular-nums">{km.toFixed(1)}</span> mmol/dm³
          </span>
          <input
            type="range"
            min={KM_RANGE.min}
            max={KM_RANGE.max}
            step={KM_RANGE.step}
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            className="accent-amber-600"
            aria-label="Km, the substrate concentration at half of Vmax"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          At [S] = Km: v = <span className="tabular-nums">{round1(half)}</span>
        </span>
        <span className="text-muted-foreground">
          At [S] = 6.0: v = <span className="tabular-nums">{probe}</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        It opens on the worked example: Vmax 40, Km 2.0, so v is 20 at [S] = 2.0 and 30 at [S] = 6.0. More
        enzyme raises Vmax. A lower Km means half speed at a lower substrate concentration: a higher affinity.
      </p>
    </div>
  );
}
