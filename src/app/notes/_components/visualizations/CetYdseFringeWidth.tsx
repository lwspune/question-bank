"use client";

import { useState } from "react";

/**
 * Interactive: fringe width in Young's double slit experiment, β = λD/d
 * (concept cetp-fringe-width). Sliders set the wavelength λ, the slit
 * separation d and the screen distance D; the bright fringes on a 10 mm strip
 * of the screen are redrawn to scale, with β marked and the count of bright
 * fringes on the strip (fewer, wider fringes for a longer λ or a farther
 * screen; more, narrower ones for wider-set slits).
 *
 * Opens on the concept's worked example: λ = 500 nm, D = 1 m, d = 0.5 mm gives
 * β = 1 mm. The slits and the screen are not to scale (d is about a
 * thousandth of D); the fringe strip is. Pinned by
 * tests/notes-cet-visuals-phys-b.test.ts.
 */

/** The worked example, in the slider units: λ in nm, d in mm, D in m. */
export const YDSE_EXAMPLE = { lambdaNm: 500, dMm: 0.5, Dm: 1 } as const;

export const LAMBDA_RANGE = { min: 400, max: 700, step: 10 } as const;
export const D_SLIT_RANGE = { min: 0.3, max: 1, step: 0.05 } as const;
export const D_SCREEN_RANGE = { min: 0.5, max: 2, step: 0.1 } as const;

/** Fringe width β = λD/d, in mm, from λ in nm, D in m and d in mm. */
export function fringeWidthMm(lambdaNm: number, Dm: number, dMm: number): number {
  return (lambdaNm * 1e-9 * Dm) / (dMm * 1e-3) / 1e-3;
}

/** Half-height of the screen strip drawn, in mm (the strip covers −5 mm to +5 mm). */
export const STRIP_HALF_MM = 5;

/** Positions (mm from the centre) of the bright fringes on the strip: 0, ±β, ±2β, ... */
export function brightPositions(betaMm: number, halfMm = STRIP_HALF_MM): number[] {
  const n = Math.floor(halfMm / betaMm + 1e-9);
  const out: number[] = [];
  for (let k = -n; k <= n; k++) out.push(k * betaMm);
  return out;
}

/** A Tailwind fill class for the light's colour, written out in full. Colour is decoration: λ is also printed. */
export function lightFill(lambdaNm: number): string {
  if (lambdaNm < 450) return "fill-violet-500 dark:fill-violet-400";
  if (lambdaNm < 495) return "fill-blue-500 dark:fill-blue-400";
  if (lambdaNm < 570) return "fill-emerald-500 dark:fill-emerald-400";
  if (lambdaNm < 590) return "fill-yellow-400 dark:fill-yellow-300";
  if (lambdaNm < 620) return "fill-orange-500 dark:fill-orange-400";
  return "fill-red-500 dark:fill-red-400";
}

// Geometry (viewBox units).
const MID_Y = 104;
const SLIT_X = 46;
const STRIP_W = 16;
const PX_PER_MM = 18; // the strip: 10 mm = 180 units
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Drawn slit gap (not to scale) and screen position, which move with the sliders. */
export function slitGap(dMm: number): number {
  return 12 + 40 * dMm;
}
export function screenX(Dm: number): number {
  return 110 + 70 * Dm;
}

const fmt = (n: number, d: number) => n.toFixed(d);

export default function CetYdseFringeWidth() {
  const [lambda, setLambda] = useState<number>(YDSE_EXAMPLE.lambdaNm);
  const [dMm, setDMm] = useState<number>(YDSE_EXAMPLE.dMm);
  const [Dm, setDm] = useState<number>(YDSE_EXAMPLE.Dm);

  const beta = fringeWidthMm(lambda, Dm, dMm);
  const bright = brightPositions(beta);
  const gap = slitGap(dMm);
  const sx = screenX(Dm);
  const s1 = MID_Y - gap / 2;
  const s2 = MID_Y + gap / 2;
  const betaPx = beta * PX_PER_MM;
  const fill = lightFill(lambda);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · what sets the fringe width
      </p>

      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label={`Two slits ${fmt(dMm, 2)} millimetres apart, a screen ${fmt(Dm, 1)} metres away and light of ${lambda} nanometres. The bright fringes on the screen are ${fmt(beta, 2)} millimetres apart.`}
      >
        {/* The barrier with two slits */}
        <rect x={SLIT_X - 2} y={10} width={4} height={s1 - 3 - 10} className="fill-foreground" />
        <rect x={SLIT_X - 2} y={s1 + 3} width={4} height={s2 - s1 - 6} className="fill-foreground" />
        <rect x={SLIT_X - 2} y={s2 + 3} width={4} height={198 - s2 - 3} className="fill-foreground" />
        <text x={SLIT_X - 8} y={s1 + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          S₁
        </text>
        <text x={SLIT_X - 8} y={s2 + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          S₂
        </text>
        {/* d */}
        <line x1={SLIT_X + 8} y1={s1} x2={SLIT_X + 8} y2={s2} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1} />
        <text x={SLIT_X + 12} y={MID_Y + 4} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          d
        </text>

        {/* Light from the slits to the first bright fringe above the centre */}
        {[s1, s2].map((y) => (
          <line
            key={y}
            x1={SLIT_X}
            y1={r2(y)}
            x2={r2(sx)}
            y2={r2(MID_Y - Math.min(betaPx, STRIP_HALF_MM * PX_PER_MM))}
            className="stroke-muted-foreground"
            strokeDasharray="2 3"
            strokeWidth={0.8}
          />
        ))}
        <line x1={SLIT_X} y1={MID_Y} x2={r2(sx)} y2={MID_Y} strokeDasharray="4 3" className="stroke-muted-foreground" strokeWidth={0.8} />

        {/* D */}
        <line x1={SLIT_X} y1={206} x2={r2(sx)} y2={206} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1} />
        <line x1={SLIT_X} y1={202} x2={SLIT_X} y2={210} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1} />
        <line x1={r2(sx)} y1={202} x2={r2(sx)} y2={210} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1} />
        <text x={r2((SLIT_X + sx) / 2)} y={202} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {`D = ${fmt(Dm, 1)} m`}
        </text>

        {/* The screen strip, 10 mm tall, to scale */}
        <rect
          x={r2(sx)}
          y={MID_Y - STRIP_HALF_MM * PX_PER_MM}
          width={STRIP_W}
          height={2 * STRIP_HALF_MM * PX_PER_MM}
          className="fill-slate-900 dark:fill-slate-950"
        />
        {bright.map((y) => (
          <rect
            key={r2(y)}
            x={r2(sx)}
            y={r2(MID_Y - y * PX_PER_MM - betaPx / 4)}
            width={STRIP_W}
            height={r2(betaPx / 2)}
            className={fill}
          />
        ))}
        <text x={r2(sx + STRIP_W / 2)} y={8} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          screen
        </text>

        {/* β between the central and the first bright fringe */}
        {bright.length > 1 && (
          <g>
            <line x1={r2(sx + STRIP_W + 4)} y1={MID_Y} x2={r2(sx + STRIP_W + 4)} y2={r2(MID_Y - betaPx)} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.4} />
            <line x1={r2(sx + STRIP_W + 1)} y1={MID_Y} x2={r2(sx + STRIP_W + 7)} y2={MID_Y} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.4} />
            <line x1={r2(sx + STRIP_W + 1)} y1={r2(MID_Y - betaPx)} x2={r2(sx + STRIP_W + 7)} y2={r2(MID_Y - betaPx)} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.4} />
            <text x={r2(sx + STRIP_W + 10)} y={r2(MID_Y - betaPx / 2 + 4)} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
              β
            </text>
          </g>
        )}
        <text x={r2(sx + STRIP_W + 10)} y={MID_Y + 14} className="fill-muted-foreground text-[9px]">
          centre
        </text>
      </svg>

      <div className="mt-3 space-y-2 text-xs">
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Wavelength λ: <span className="tabular-nums">{lambda} nm</span>
          </span>
          <input
            type="range"
            min={LAMBDA_RANGE.min}
            max={LAMBDA_RANGE.max}
            step={LAMBDA_RANGE.step}
            value={lambda}
            onChange={(e) => setLambda(Number(e.target.value))}
            className="accent-amber-600"
            aria-label="Wavelength of the light, in nanometres"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Slit separation d: <span className="tabular-nums">{fmt(dMm, 2)} mm</span>
          </span>
          <input
            type="range"
            min={D_SLIT_RANGE.min}
            max={D_SLIT_RANGE.max}
            step={D_SLIT_RANGE.step}
            value={dMm}
            onChange={(e) => setDMm(Number(e.target.value))}
            className="accent-amber-600"
            aria-label="Separation of the two slits, in millimetres"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            Screen distance D: <span className="tabular-nums">{fmt(Dm, 1)} m</span>
          </span>
          <input
            type="range"
            min={D_SCREEN_RANGE.min}
            max={D_SCREEN_RANGE.max}
            step={D_SCREEN_RANGE.step}
            value={Dm}
            onChange={(e) => setDm(Number(e.target.value))}
            className="accent-amber-600"
            aria-label="Distance from the slits to the screen, in metres"
          />
        </label>
      </div>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          β = λD/d = ({lambda} × 10⁻⁹ × {fmt(Dm, 1)}) / ({fmt(dMm, 2)} × 10⁻³) = {fmt(beta, 2)} mm
        </p>
        <p className="text-muted-foreground tabular-nums">Bright fringes on this 10 mm strip: {bright.length}</p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The slits and the screen distance are not to scale (d is about a thousandth of D); the 10 mm strip of screen
        is. A longer wavelength or a farther screen spreads the fringes out; wider-set slits crowd them in.
      </p>
    </div>
  );
}
