"use client";

import { useState } from "react";

/**
 * Interactive: Einstein's photoelectric equation, hν = φ + Kₘₐₓ (concept
 * cetp-dn-einstein-equation). A slider sets the photon energy hν on a metal
 * of work function φ = 2.0 eV. Below the threshold (hν < φ) no electron
 * leaves; above it Kₘₐₓ = hν − φ, shown live with the stopping potential
 * V₀ = Kₘₐₓ/e and the wavelength from λ = 1240/E (eV, nm).
 *
 * It opens on the concept's worked example: 248 nm light (1240/248 = 5.0 eV)
 * on φ = 2.0 eV gives eV₀ = 5.0 − 2.0 = 3.0 eV, so V₀ = 3.0 V. The threshold
 * is 1240/2.0 = 620 nm. Pinned by tests/notes-cet-visuals-phys-a.test.ts.
 *
 * The slider works in tenths of an eV (whole numbers), so 5.0 − 2.0 is
 * exactly 3.0 and the printed values never show float noise.
 */

/** hc in eV nm, the concept's shortcut. */
export const HC_EV_NM = 1240;

/** The concept's worked example: φ = 2.0 eV, light of 248 nm. */
export const WORKED = { phiTenths: 20, lambdaNm: 248 } as const;

/** Photon-energy slider, in tenths of an eV (0.5 eV to 6.0 eV). */
export const E_RANGE = { min: 5, max: 60, step: 1 } as const;

/** Photon energy in eV for a wavelength in nm: E = 1240/λ. */
export function photonEnergyEv(lambdaNm: number): number {
  return HC_EV_NM / lambdaNm;
}

/** Wavelength in nm for a photon energy in eV: λ = 1240/E. */
export function wavelengthNm(energyEv: number): number {
  return HC_EV_NM / energyEv;
}

/** Maximum kinetic energy in tenths of an eV, or null when the photon is below the threshold (no electron leaves). */
export function kMaxTenths(eTenths: number, phiTenths: number): number | null {
  return eTenths >= phiTenths ? eTenths - phiTenths : null;
}

/** The slider's opening value: the worked example's photon, 1240/248 = 5.0 eV. */
export const START_TENTHS = Math.round(photonEnergyEv(WORKED.lambdaNm) * 10);

const tenth = (t: number) => (t / 10).toFixed(1);

// Energy bars (viewBox units).
const BASE_Y = 170;
const PER_EV = 20;
const BAR_W = 30;
const COL_PHOTON = 196;
const COL_SPLIT = 262;

export default function CetPhotoelectricThreshold() {
  const [eT, setET] = useState<number>(START_TENTHS);
  const phiT = WORKED.phiTenths;
  const kT = kMaxTenths(eT, phiT);
  const emits = kT !== null;
  const k = kT ?? 0;
  const lambda = Math.round(wavelengthNm(eT / 10));
  const threshold = Math.round(wavelengthNm(phiT / 10));

  const hE = (eT / 10) * PER_EV;
  const hPhi = (phiT / 10) * PER_EV;
  const hK = emits ? (k / 10) * PER_EV : 0;
  // Electron's arrow grows with its speed, v ∝ √K.
  const arrow = emits ? Math.round(18 * Math.sqrt(k / 10) * 10) / 10 : 0;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the threshold frequency and the electron&apos;s energy
      </p>

      <svg
        viewBox="0 0 320 190"
        className="block h-auto w-full"
        role="img"
        aria-label={
          emits
            ? `Photons of ${tenth(eT)} electron volts fall on a metal of work function 2.0 electron volts. Electrons leave with maximum kinetic energy ${tenth(k)} electron volts.`
            : `Photons of ${tenth(eT)} electron volts fall on a metal of work function 2.0 electron volts. This is below the threshold, so no electrons leave.`
        }
      >
        {/* The metal */}
        <rect x={16} y={40} width={26} height={120} className="fill-slate-300 stroke-slate-500 dark:fill-slate-700 dark:stroke-slate-400" />
        <text x={29} y={176} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          metal
        </text>
        <text x={29} y={187} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          φ = 2.0 eV
        </text>

        {/* Photons coming in from the right */}
        {[62, 138].map((y) => (
          <g key={y}>
            <path
              d={`M 160 ${y} q -6 -6 -12 0 t -12 0 t -12 0 t -12 0 t -12 0 t -12 0 t -12 0 t -12 0 t -12 0`}
              fill="none"
              strokeWidth={1.8}
              className="stroke-amber-500 dark:stroke-amber-400"
            />
            <polygon points={`44,${y} 53,${y - 4} 53,${y + 4}`} className="fill-amber-500 dark:fill-amber-400" />
          </g>
        ))}
        <text x={104} y={36} textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold tabular-nums dark:fill-amber-300">
          photons, hν = {tenth(eT)} eV
        </text>

        {/* The electron: out of the surface with an arrow for its speed, or held in the metal */}
        {emits ? (
          <g>
            <circle cx={60} cy={100} r={5} className="fill-sky-600 dark:fill-sky-400" />
            {arrow > 0 && (
              <g>
                <line x1={66} y1={100} x2={66 + arrow} y2={100} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={2.2} />
                <polygon
                  points={`${72 + arrow},100 ${64 + arrow},96 ${64 + arrow},104`}
                  className="fill-sky-600 dark:fill-sky-400"
                />
              </g>
            )}
            <text x={60} y={88} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
              {arrow > 0 ? "electron leaves" : "just released, K = 0"}
            </text>
          </g>
        ) : (
          <g>
            <circle cx={29} cy={100} r={5} className="fill-sky-600 dark:fill-sky-400" />
            <text x={50} y={104} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
              no electron leaves
            </text>
          </g>
        )}

        {/* Energy bars: the photon's energy against φ + Kₘₐₓ */}
        <line x1={182} y1={BASE_Y} x2={308} y2={BASE_Y} className="stroke-muted-foreground" />
        <rect
          x={COL_PHOTON}
          y={BASE_Y - hE}
          width={BAR_W}
          height={hE}
          className="fill-amber-300 stroke-amber-600 dark:fill-amber-700 dark:stroke-amber-400"
        />
        <text x={COL_PHOTON + BAR_W / 2} y={182} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          hν
        </text>

        <rect
          x={COL_SPLIT}
          y={BASE_Y - hPhi}
          width={BAR_W}
          height={hPhi}
          strokeDasharray={emits ? undefined : "3 2"}
          className={
            emits
              ? "fill-slate-300 stroke-slate-500 dark:fill-slate-600 dark:stroke-slate-400"
              : "fill-none stroke-slate-500 dark:stroke-slate-400"
          }
        />
        <text x={COL_SPLIT + BAR_W / 2} y={BASE_Y - hPhi / 2 + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          φ
        </text>
        {hK > 0 && (
          <g>
            <rect
              x={COL_SPLIT}
              y={BASE_Y - hPhi - hK}
              width={BAR_W}
              height={hK}
              className="fill-sky-300 stroke-sky-600 dark:fill-sky-700 dark:stroke-sky-400"
            />
            {hK >= 14 && (
              <text x={COL_SPLIT + BAR_W / 2} y={BASE_Y - hPhi - hK / 2 + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                K
              </text>
            )}
          </g>
        )}
        <text x={COL_SPLIT + BAR_W / 2} y={182} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          φ + Kₘₐₓ
        </text>

        {/* The threshold level */}
        <line x1={186} y1={BASE_Y - hPhi} x2={310} y2={BASE_Y - hPhi} strokeDasharray="4 3" className="stroke-rose-500 dark:stroke-rose-400" />
        <text x={184} y={BASE_Y - hPhi + 4} textAnchor="end" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          2.0
        </text>
        <text x={246} y={20} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          energy (eV)
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Photon energy hν: <span className="tabular-nums">{tenth(eT)} eV</span> (λ = 1240/{tenth(eT)} ={" "}
          <span className="tabular-nums">{lambda} nm</span>)
        </span>
        <input
          type="range"
          min={E_RANGE.min}
          max={E_RANGE.max}
          step={E_RANGE.step}
          value={eT}
          onChange={(e) => setET(Number(e.target.value))}
          className="accent-amber-600"
          aria-label="Photon energy, in tenths of an electron volt"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm" aria-live="polite">
        {emits ? (
          <>
            <p className="font-medium text-foreground tabular-nums">
              Kₘₐₓ = hν − φ = {tenth(eT)} − 2.0 = {tenth(k)} eV
            </p>
            <p className="text-muted-foreground tabular-nums">Stopping potential V₀ = {tenth(k)} V</p>
          </>
        ) : (
          <p className="font-medium text-rose-700 dark:text-rose-300 tabular-nums">
            hν = {tenth(eT)} eV is less than φ = 2.0 eV: no electrons leave, however bright the light.
          </p>
        )}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Threshold: hν₀ = φ = 2.0 eV, so λ₀ = 1240/2.0 = {threshold} nm. Light of 248 nm carries 1240/248 = 5.0 eV, so
        eV₀ = 5.0 − 2.0 = 3.0 eV and V₀ = 3.0 V. The electron&apos;s arrow grows with its speed, v ∝ √Kₘₐₓ.
      </p>
    </div>
  );
}
