"use client";

import { useState } from "react";

/**
 * Interactive: a dielectric slab in a parallel plate capacitor (concept
 * nphep-dielectric, with nphep-capacitance for C₀ = ε₀A/d). Two sliders set
 * the slab's thickness t and its dielectric constant K. The slab is
 * polarised: charges appear on its faces (− on the face next to the +Q plate,
 * + on the face next to the −Q plate), some field lines end on them, and the
 * field inside falls from E₀ to E₀/K (drawn as 1/K of the lines, rounded).
 * Live: V = E₀(d − t + t/K) and C/C₀ = d/(d − t + t/K).
 *
 * Numbers: the concept's worked example, d = 4 mm, t = 2 mm, K = 2, so
 * d − t + t/K = 3 mm and C/C₀ = 4/3. The figure opens there. At t = d the gap
 * is full and C = KC₀. Pinned by tests/notes-neet-visuals-pc.test.ts.
 */

/** Gap between the plates, mm (the worked example). */
export const GAP_MM = 4;
export const T_RANGE = { min: 0, max: 4, step: 0.5 } as const;
export const K_RANGE = { min: 1, max: 6, step: 0.5 } as const;
export const DEFAULTS = { t: 2, K: 2 } as const;

/** d − t + t/K: the gap the slab "looks like" (same units as d). */
export function effectiveGap(d: number, t: number, K: number): number {
  return d - t + t / K;
}

/** C/C₀ = d/(d − t + t/K). */
export function capacitanceRatio(d: number, t: number, K: number): number {
  return d / effectiveGap(d, t, K);
}

/** Several layers across the gap: C/C₀ = d/Σ(tᵢ/Kᵢ), counting air as K = 1. */
export function layeredRatio(d: number, layers: readonly { t: number; K: number }[]): number {
  return d / layers.reduce((s, l) => s + l.t / l.K, 0);
}

/** Field lines drawn in the air. */
export const LINES = 12;

/** How many of the LINES pass through the slab: about LINES/K. */
export function linesThroughSlab(K: number, n: number = LINES): number {
  return Math.max(1, Math.round(n / K));
}

/** Which line indices pass through, spread evenly across the plates. */
export function throughIndices(m: number, n: number = LINES): number[] {
  const out: number[] = [];
  for (let j = 0; j < m; j++) out.push(Math.round(((j + 0.5) * n) / m - 0.5));
  return out;
}

const r2 = (v: number) => Math.round(v * 100) / 100;
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : String(Number(v.toFixed(2))));

// Geometry: plates 136 wide, gap 4 mm = 120 units.
const PX0 = 34;
const PX1 = 170;
const TOP = 36;
const BOTTOM = 156;
const UNITS_PER_MM = (BOTTOM - TOP) / GAP_MM;
const MID = (TOP + BOTTOM) / 2;
const lineX = (k: number) => r2(PX0 + ((k + 0.5) * (PX1 - PX0)) / LINES);

function Down({ x, y }: { x: number; y: number }) {
  return <polygon points={`${x},${r2(y + 4)} ${r2(x - 3)},${r2(y - 3)} ${r2(x + 3)},${r2(y - 3)}`} className="fill-rose-600 dark:fill-rose-400" />;
}

function Segment({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  if (y2 - y1 <= 0.5) return null;
  return (
    <g>
      <line x1={x} y1={r2(y1)} x2={x} y2={r2(y2)} strokeWidth={1.2} className="stroke-rose-600 dark:stroke-rose-400" />
      {y2 - y1 >= 12 && <Down x={x} y={r2((y1 + y2) / 2)} />}
    </g>
  );
}

export default function NeetCapacitorDielectric() {
  const [t, setT] = useState<number>(DEFAULTS.t);
  const [K, setK] = useState<number>(DEFAULTS.K);
  const eff = effectiveGap(GAP_MM, t, K);
  const ratio = capacitanceRatio(GAP_MM, t, K);
  const slabTop = MID - (t * UNITS_PER_MM) / 2;
  const slabBottom = MID + (t * UNITS_PER_MM) / 2;
  const hasSlab = t > 0;
  const through = new Set(throughIndices(linesThroughSlab(K)));
  const full = t === GAP_MM;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · a dielectric slab in a capacitor
      </p>

      <svg
        viewBox="0 0 320 184"
        className="block h-auto w-full"
        role="img"
        aria-label={`A parallel plate capacitor with plates 4 millimetres apart, the top plate charged plus Q and the bottom minus Q. ${
          hasSlab
            ? `A slab ${fmt(t)} millimetres thick with dielectric constant ${fmt(K)} sits in the gap. Charges on its faces stop some field lines, so the field inside is E nought over K. The gap acts like ${fmt(eff)} millimetres, and the capacitance is ${ratio.toFixed(2)} times C nought.`
            : "There is no slab: the field E nought fills the gap and the capacitance is C nought."
        }`}
      >
        {/* Slab */}
        {hasSlab && (
          <rect
            x={PX0}
            y={r2(slabTop)}
            width={PX1 - PX0}
            height={r2(slabBottom - slabTop)}
            className="fill-amber-300/40 stroke-amber-600 dark:fill-amber-400/20 dark:stroke-amber-400"
          />
        )}

        {/* Field lines */}
        {Array.from({ length: LINES }, (_, k) => {
          const x = lineX(k);
          if (!hasSlab) return <Segment key={k} x={x} y1={TOP} y2={BOTTOM} />;
          return (
            <g key={k}>
              <Segment x={x} y1={TOP} y2={slabTop} />
              <Segment x={x} y1={slabBottom} y2={BOTTOM} />
              {through.has(k) ? (
                <Segment x={x} y1={slabTop} y2={slabBottom} />
              ) : (
                <g className="fill-amber-800 text-[10px] font-bold dark:fill-amber-200">
                  <text x={x} y={r2(slabTop + 7)} textAnchor="middle">
                    −
                  </text>
                  <text x={x} y={r2(slabBottom - 1.5)} textAnchor="middle">
                    +
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Plates */}
        <rect x={PX0} y={TOP - 5} width={PX1 - PX0} height={5} className="fill-foreground" />
        <rect x={PX0} y={BOTTOM} width={PX1 - PX0} height={5} className="fill-foreground" />
        <text x={PX0} y={TOP - 10} className="fill-foreground text-[11px] font-semibold">
          +Q
        </text>
        <text x={PX0} y={BOTTOM + 17} className="fill-foreground text-[11px] font-semibold">
          −Q
        </text>

        {/* Field labels on the left */}
        {!full && (
          <text x={PX0 - 4} y={r2((TOP + (hasSlab ? slabTop : BOTTOM)) / 2 + 4)} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
            E₀
          </text>
        )}
        {hasSlab && (
          <text x={PX0 - 4} y={r2(MID + 4)} textAnchor="end" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-200">
            E₀/K
          </text>
        )}

        {/* d and t brackets */}
        <line x1={178} y1={TOP} x2={178} y2={BOTTOM} className="stroke-muted-foreground" />
        <line x1={175} y1={TOP} x2={181} y2={TOP} className="stroke-muted-foreground" />
        <line x1={175} y1={BOTTOM} x2={181} y2={BOTTOM} className="stroke-muted-foreground" />
        <text x={182} y={TOP + 14} className="fill-muted-foreground text-[10px]">
          d
        </text>
        {hasSlab && (
          <g>
            <line x1={190} y1={r2(slabTop)} x2={190} y2={r2(slabBottom)} className="stroke-amber-600 dark:stroke-amber-400" />
            <line x1={187} y1={r2(slabTop)} x2={193} y2={r2(slabTop)} className="stroke-amber-600 dark:stroke-amber-400" />
            <line x1={187} y1={r2(slabBottom)} x2={193} y2={r2(slabBottom)} className="stroke-amber-600 dark:stroke-amber-400" />
            <text x={194} y={r2(MID + 4)} className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-200">
              t
            </text>
          </g>
        )}

        {/* Live numbers */}
        <g className="text-[10px] tabular-nums">
          <text x={204} y={42} className="fill-muted-foreground">
            d = 4 mm
          </text>
          <text x={204} y={55} className="fill-muted-foreground">
            t = {fmt(t)} mm
          </text>
          <text x={204} y={68} className="fill-muted-foreground">
            K = {fmt(K)}
          </text>
          <text x={204} y={88} className="fill-foreground">
            d − t + t/K
          </text>
          <text x={204} y={101} className="fill-foreground">
            = 4 − {fmt(t)} + {fmt(t)}/{fmt(K)}
          </text>
          <text x={204} y={114} className="fill-foreground">
            = {fmt(eff)} mm
          </text>
          <text x={204} y={134} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
            C/C₀ = 4 ÷ {fmt(eff)}
          </text>
          <text x={204} y={149} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
            = {ratio.toFixed(2)}
          </text>
          <text x={204} y={168} className={full ? "fill-emerald-700 font-semibold dark:fill-emerald-300" : "fill-muted-foreground"}>
            {full ? `gap full: C = KC₀` : t === 0 ? "no slab: C = C₀" : "gap part filled"}
          </text>
        </g>
      </svg>

      <div className="mt-3 grid gap-2 text-xs">
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Slab thickness t: <span className="tabular-nums">{fmt(t)} mm</span>
          </span>
          <input
            type="range"
            min={T_RANGE.min}
            max={T_RANGE.max}
            step={T_RANGE.step}
            value={t}
            onChange={(ev) => setT(Number(ev.target.value))}
            className="accent-indigo-600"
            aria-label="Thickness of the dielectric slab, in millimetres"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Dielectric constant K: <span className="tabular-nums">{fmt(K)}</span>
          </span>
          <input
            type="range"
            min={K_RANGE.min}
            max={K_RANGE.max}
            step={K_RANGE.step}
            value={K}
            onChange={(ev) => setK(Number(ev.target.value))}
            className="accent-indigo-600"
            aria-label="Dielectric constant of the slab"
          />
        </label>
      </div>

      <p className="mt-2 text-sm font-medium text-foreground tabular-nums">
        C = ε₀A/(d − t + t/K), so C/C₀ = {ratio.toFixed(2)}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        The slab is polarised: charges on its faces oppose the field, so the field inside falls to E₀/K. Only the slab&apos;s own thickness shrinks, t
        becomes t/K, and the air left in the gap still counts in full. Fill the gap (t = d) and C = KC₀.
      </p>
    </div>
  );
}
