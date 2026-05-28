"use client";

import { useState } from "react";

/**
 * Interactive: drop a perpendicular from the tip of a onto the line of b,
 * showing the scalar projection (a·b)/|b| and the angle between the vectors,
 * both updating live as the sliders move.
 *
 * Pedagogical aim: connect "projection" to the dot product and to the angle —
 * watch the projection go negative as the angle passes 90°.
 */

const W = 360;
const H = 280;
const OX = W / 2;
const OY = H / 2;
const SCALE = 15;
const AXIS = 8;

const sx = (x: number) => OX + x * SCALE;
const sy = (y: number) => OY - y * SCALE;

export default function VectorProjection() {
  const [a1, setA1] = useState(3);
  const [a2, setA2] = useState(4);
  const [b1, setB1] = useState(6);
  const [b2, setB2] = useState(0);

  const dot = a1 * b1 + a2 * b2;
  const magA = Math.hypot(a1, a2);
  const magB = Math.hypot(b1, b2);
  const scalarProj = magB === 0 ? 0 : dot / magB;
  const cosT = magA === 0 || magB === 0 ? 0 : dot / (magA * magB);
  const angleDeg = Math.round((Math.acos(Math.max(-1, Math.min(1, cosT))) * 180) / Math.PI);

  // Foot of the perpendicular = vector projection of a onto b.
  const k = magB === 0 ? 0 : dot / (magB * magB);
  const footX = k * b1;
  const footY = k * b2;

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/60 dark:bg-emerald-950/15 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        Visualization · project a onto b
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Vector projection visualization"
      >
        <defs>
          <marker id="vp-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="vp-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
        </defs>

        {/* Axes */}
        <line x1={sx(-AXIS)} y1={sy(0)} x2={sx(AXIS)} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/30" />
        <line x1={sx(0)} y1={sy(-AXIS)} x2={sx(0)} y2={sy(AXIS)} stroke="currentColor" className="text-muted-foreground/30" />

        {/* Projection segment along b (thick green band) */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(footX)} y2={sy(footY)} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth={5} strokeOpacity={0.5} />

        {/* Perpendicular from tip of a to the foot */}
        <line x1={sx(a1)} y1={sy(a2)} x2={sx(footX)} y2={sy(footY)} stroke="currentColor" className="text-rose-500/70" strokeWidth={1} strokeDasharray="3 2" />

        {/* b */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(b1)} y2={sy(b2)} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2} markerEnd="url(#vp-amber)" />
        {/* a */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(a1)} y2={sy(a2)} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#vp-sky)" />

        <text x={sx(a1)} y={sy(a2) - 6} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[11px] font-semibold">a</text>
        <text x={sx(b1) + 6} y={sy(b2) + 4} textAnchor="start" className="fill-amber-700 dark:fill-amber-300 text-[11px] font-semibold">b</text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-4">
        {([
          ["a₁", a1, setA1, "accent-sky-600"],
          ["a₂", a2, setA2, "accent-sky-600"],
          ["b₁", b1, setB1, "accent-amber-600"],
          ["b₂", b2, setB2, "accent-amber-600"],
        ] as const).map(([label, val, setter, accent]) => (
          <label key={label} className="flex flex-col gap-1">
            <span className="font-medium text-foreground">
              {label}: <span className="tabular-nums">{val}</span>
            </span>
            <input
              type="range"
              min={-AXIS}
              max={AXIS}
              step={1}
              value={val}
              onChange={(e) => setter(Number(e.target.value))}
              className={accent}
              aria-label={`Component ${label}`}
            />
          </label>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          a·b = <span className="tabular-nums">{dot}</span>
        </span>
        <span className="text-muted-foreground">
          proj = (a·b)/|b| = <span className="tabular-nums">{scalarProj.toFixed(2)}</span>
        </span>
        <span className="text-muted-foreground">
          θ ≈ <span className="tabular-nums">{angleDeg}°</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        The green band is how far a reaches along b — its signed length is the
        scalar projection (a·b)/|b|. Push the angle past 90° and the dot
        product, and the projection, turn negative.
      </p>
    </div>
  );
}
