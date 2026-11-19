"use client";

import { useState } from "react";

/**
 * Interactive: Malus' law with two polaroids (concept jpwo-malus). Unpolarised
 * light of intensity I₀ = 40 W/m² meets polaroid 1: half gets through, 20 W/m²,
 * polarised along its axis, whatever that axis is. Polaroid 2 makes an angle θ
 * with polaroid 1 and passes the component E cos θ, so the intensity is
 * I₂ = I₁ cos²θ. A slider sets θ; it opens at the worked example's 60°, where
 * 20 × ¼ = 5 W/m² comes out (a quarter, not a half: cos², not cos).
 *
 * Each polaroid is drawn face-on, as the light meets it, with its axis across
 * it. Pinned by tests/notes-jee-visuals-phys-b.test.ts.
 */

/** The worked example: unpolarised intensity in W/m², and the angle between the axes. */
export const MALUS_EXAMPLE = { I0: 40, thetaDeg: 60 } as const;

/** Angle slider, in degrees. */
export const THETA_RANGE = { min: 0, max: 90, step: 1 } as const;

/** Intensity after the first polaroid: half of the unpolarised intensity. */
export const afterFirst = (I0: number) => I0 / 2;

/** Intensity after the second polaroid at θ (degrees) to the first. */
export function afterSecond(I0: number, thetaDeg: number): number {
  const c = Math.cos((thetaDeg * Math.PI) / 180);
  return afterFirst(I0) * c * c;
}

/** Amplitude after the second polaroid, as a share of the amplitude reaching it. */
export const amplitudeShare = (thetaDeg: number) => Math.cos((thetaDeg * Math.PI) / 180);

const r2 = (n: number) => Math.round(n * 100) / 100;

// Geometry (viewBox units).
const AXIS_Y = 52;
const RING_R = 24;
const AMP = 18; // half-length of a full-amplitude vibration arrow
export const STAGES_X = { source: 34, pol1: 98, between: 160, pol2: 222, out: 286 } as const;

/** Bar scale: width per W/m², so 40 W/m² fills 200 units. */
export const BAR_SCALE = 5;
const BAR_X = 92;

/** A double-headed vibration arrow through (cx, cy) at `deg` from the vertical, half-length h. */
type Tone = { stroke: string; fill: string };
const TONE = {
  grey: { stroke: "stroke-slate-500 dark:stroke-slate-400", fill: "fill-slate-500 dark:fill-slate-400" },
  light: { stroke: "stroke-amber-500 dark:stroke-amber-400", fill: "fill-amber-500 dark:fill-amber-400" },
  out: { stroke: "stroke-amber-700 dark:stroke-amber-300", fill: "fill-amber-700 dark:fill-amber-300" },
} as const;

function Vibration({ cx, cy, deg, h, tone }: { cx: number; cy: number; deg: number; h: number; tone: Tone }) {
  if (h < 2) return null;
  return (
    <g transform={`rotate(${r2(deg)} ${cx} ${cy})`}>
      <line x1={cx} y1={cy - h + 4} x2={cx} y2={cy + h - 4} strokeWidth={2} className={tone.stroke} />
      <polygon points={`${cx},${r2(cy - h)} ${cx - 3},${r2(cy - h + 6)} ${cx + 3},${r2(cy - h + 6)}`} className={tone.fill} />
      <polygon points={`${cx},${r2(cy + h)} ${cx - 3},${r2(cy + h - 6)} ${cx + 3},${r2(cy + h - 6)}`} className={tone.fill} />
    </g>
  );
}

function Polaroid({ cx, deg, label }: { cx: number; deg: number; label: string }) {
  return (
    <g>
      <circle cx={cx} cy={AXIS_Y} r={RING_R} strokeWidth={5} className="fill-slate-200/60 stroke-slate-400 dark:fill-slate-700/40 dark:stroke-slate-500" />
      <line
        x1={cx}
        y1={AXIS_Y - RING_R + 3}
        x2={cx}
        y2={AXIS_Y + RING_R - 3}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        transform={`rotate(${r2(deg)} ${cx} ${AXIS_Y})`}
        className="stroke-foreground"
      />
      <text x={cx} y={AXIS_Y + RING_R + 14} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {label}
      </text>
    </g>
  );
}

function Beam({ x1, x2 }: { x1: number; x2: number }) {
  return (
    <g>
      <line x1={x1} y1={AXIS_Y} x2={x2 - 5} y2={AXIS_Y} strokeWidth={1.5} className="stroke-amber-500 dark:stroke-amber-400" />
      <polygon points={`${x2},${AXIS_Y} ${x2 - 6},${AXIS_Y - 3} ${x2 - 6},${AXIS_Y + 3}`} className="fill-amber-500 dark:fill-amber-400" />
    </g>
  );
}

export default function JeeMalusPolaroids() {
  const [theta, setTheta] = useState<number>(MALUS_EXAMPLE.thetaDeg);
  const I0 = MALUS_EXAMPLE.I0;
  const I1 = afterFirst(I0);
  const I2 = afterSecond(I0, theta);
  const share = amplitudeShare(theta);
  const fmt = (n: number) => (Math.abs(n - Math.round(n)) < 0.005 ? String(Math.round(n)) : n.toFixed(2));
  const arcR = 14;
  const arcEnd = {
    x: r2(STAGES_X.pol2 + arcR * Math.sin((theta * Math.PI) / 180)),
    y: r2(AXIS_Y - arcR * Math.cos((theta * Math.PI) / 180)),
  };

  const bars = [
    { label: "I₀", value: I0, cls: "fill-slate-400 dark:fill-slate-500" },
    { label: "I₁", value: I1, cls: "fill-amber-400 dark:fill-amber-500" },
    { label: "I₂", value: I2, cls: "fill-amber-600 dark:fill-amber-400" },
  ];

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · light through two polaroids
      </p>

      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label={`Unpolarised light of 40 watts per square metre passes a first polaroid, leaving 20, then a second polaroid at ${theta} degrees to the first, leaving ${fmt(I2)} watts per square metre.`}
      >
        <Beam x1={STAGES_X.source + 20} x2={STAGES_X.pol1 - RING_R - 6} />
        <Beam x1={STAGES_X.pol1 + RING_R + 6} x2={STAGES_X.between - 20} />
        <Beam x1={STAGES_X.between + 20} x2={STAGES_X.pol2 - RING_R - 6} />
        <Beam x1={STAGES_X.pol2 + RING_R + 6} x2={STAGES_X.out - 20} />

        {/* Unpolarised: vibrations in every direction across the beam */}
        {[0, 45, 90, 135].map((d) => (
          <Vibration key={d} cx={STAGES_X.source} cy={AXIS_Y} deg={d} h={AMP} tone={TONE.grey} />
        ))}
        <text x={STAGES_X.source} y={AXIS_Y + RING_R + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          unpolarised
        </text>

        <Polaroid cx={STAGES_X.pol1} deg={0} label="polaroid 1" />
        <Vibration cx={STAGES_X.between} cy={AXIS_Y} deg={0} h={AMP} tone={TONE.light} />
        <text x={STAGES_X.between} y={AXIS_Y + RING_R + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          polarised
        </text>

        <Polaroid cx={STAGES_X.pol2} deg={theta} label="polaroid 2" />
        {/* θ between the first axis (dotted, vertical) and the second */}
        <line x1={STAGES_X.pol2} y1={AXIS_Y} x2={STAGES_X.pol2} y2={AXIS_Y - RING_R - 6} strokeWidth={1} strokeDasharray="1 2" className="stroke-muted-foreground" />
        {theta > 4 && (
          <path
            d={`M ${STAGES_X.pol2} ${AXIS_Y - arcR} A ${arcR} ${arcR} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
            fill="none"
            strokeWidth={1.5}
            className="stroke-indigo-600 dark:stroke-indigo-400"
          />
        )}
        <text x={STAGES_X.pol2 + 4} y={AXIS_Y - RING_R - 8} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          θ = {theta}°
        </text>

        <Vibration cx={STAGES_X.out} cy={AXIS_Y} deg={theta} h={AMP * share} tone={TONE.out} />
        <text x={STAGES_X.out} y={AXIS_Y + RING_R + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          out
        </text>

        {/* Intensity bars, to scale */}
        <text x={8} y={116} className="fill-muted-foreground text-[10px]">
          intensity (W/m²)
        </text>
        {bars.map((b, i) => {
          const y = 126 + i * 22;
          return (
            <g key={b.label}>
              <text x={BAR_X - 8} y={y + 11} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
                {b.label}
              </text>
              <rect x={BAR_X} y={y} width={200} height={14} className="fill-slate-200/50 dark:fill-slate-800/50" />
              <rect x={BAR_X} y={y} width={r2(b.value * BAR_SCALE)} height={14} className={b.cls} />
              <text x={BAR_X + 204} y={y + 11} className="fill-foreground text-[11px] tabular-nums">
                {fmt(b.value)}
              </text>
            </g>
          );
        })}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Angle between the axes θ: <span className="tabular-nums">{theta}°</span>
        </span>
        <input
          type="range"
          min={THETA_RANGE.min}
          max={THETA_RANGE.max}
          step={THETA_RANGE.step}
          value={theta}
          onChange={(e) => setTheta(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Angle between the axes of the two polaroids, in degrees"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="text-muted-foreground">Polaroid 1: I₁ = I₀/2 = 40/2 = 20 W/m², at any angle</p>
        <p className="font-medium text-foreground">
          Polaroid 2: I₂ = I₁ cos²θ = 20 × cos²{theta}° = {fmt(I2)} W/m²
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The first sheet halves unpolarised light; Malus&apos; law starts only at the second. The amplitude drops to E cos θ, and intensity goes as
        its square: at 60° a quarter comes through, not a half. Parallel axes (0°) pass all 20 W/m², crossed axes (90°) pass nothing.
      </p>
    </div>
  );
}
