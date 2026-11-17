"use client";

import { useState } from "react";
import { MOTION, svgTransform } from "./StepFigure";

/**
 * Interactive: the principle of moments on a light see-saw (concept
 * imat-dyn-equilibrium). It opens on the concept's practice see-saw: a 300 N
 * child 2.0 m left of the pivot, balanced by a 400 N child 1.5 m to the right
 * (300 × 2.0 = 400 × 1.5 = 600 N m).
 *
 * Sliders move the right-hand child and change their weight. The beam tilts
 * the way the larger moment turns it (clockwise: right side down), by a small
 * capped angle, and reads "balanced" exactly when the clockwise moment equals
 * the anticlockwise one. Distances are kept in tenths of a metre so the
 * balance test is exact integer arithmetic. Pinned by
 * tests/notes-imat-visuals-phys.test.ts.
 */

/** The fixed left-hand child: 300 N at 2.0 m (distance in tenths of a metre). */
export const LEFT = { weight: 300, dist10: 20 } as const;

/** The right-hand child as the figure opens: 400 N at 1.5 m (balanced). */
export const RIGHT_START = { weight: 400, dist10: 15 } as const;

/** Slider ranges: weight in N, distance in tenths of a metre. */
export const WEIGHT_RANGE = { min: 100, max: 600, step: 50 } as const;
export const DIST10_RANGE = { min: 5, max: 30, step: 1 } as const;

/** Largest tilt of the beam, in degrees. */
export const MAX_TILT = 8;

/** Moment in N m of a weight (N) at a distance given in tenths of a metre. */
export function moment(weight: number, dist10: number): number {
  return (weight * dist10) / 10;
}

export type Balance = "balanced" | "clockwise" | "anticlockwise";

/**
 * Which way the see-saw turns. The left child turns it anticlockwise, the
 * right child clockwise. Compared in N × tenths of a metre, so it is exact.
 */
export function balance(rightWeight: number, rightDist10: number): Balance {
  const clockwise = rightWeight * rightDist10;
  const anticlockwise = LEFT.weight * LEFT.dist10;
  if (clockwise === anticlockwise) return "balanced";
  return clockwise > anticlockwise ? "clockwise" : "anticlockwise";
}

/**
 * Tilt of the beam in degrees (SVG sense: positive = clockwise = right side
 * down). Zero only when balanced; otherwise at least 2° so it shows, growing
 * with the unbalanced moment and capped at MAX_TILT.
 */
export function tiltDeg(rightWeight: number, rightDist10: number): number {
  const diff = moment(rightWeight, rightDist10) - moment(LEFT.weight, LEFT.dist10);
  if (balance(rightWeight, rightDist10) === "balanced") return 0;
  const size = Math.min(MAX_TILT, 2 + Math.abs(diff) / 60);
  return Math.round(Math.sign(diff) * size * 100) / 100;
}

// Geometry (viewBox units). The beam is drawn about the pivot at (0, 0).
const PIVOT = { x: 160, y: 118 };
/** viewBox units per metre along the beam. */
export const UNITS_PER_M = 42;
const HALF = 3.2 * UNITS_PER_M;

const fmt1 = (n: number) => n.toFixed(1);
const fmtMoment = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function Child({ x, weight, tone }: { x: number; weight: number; tone: "rose" | "sky" }) {
  // Box height grows a little with weight so heavier reads heavier.
  const h = 14 + weight / 40;
  const cls =
    tone === "rose"
      ? "fill-rose-500 dark:fill-rose-400"
      : "fill-sky-500 dark:fill-sky-400";
  return (
    <g>
      <rect x={x - 13} y={-4 - h} width={26} height={h} rx={3} className={cls} />
      <text x={x} y={-8 - h} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
        {weight} N
      </text>
    </g>
  );
}

export default function ImatMomentsSeesaw() {
  const [w, setW] = useState<number>(RIGHT_START.weight);
  const [d10, setD10] = useState<number>(RIGHT_START.dist10);

  const anti = moment(LEFT.weight, LEFT.dist10);
  const clock = moment(w, d10);
  const state = balance(w, d10);
  const tilt = tiltDeg(w, d10);
  const xLeft = -(LEFT.dist10 / 10) * UNITS_PER_M;
  const xRight = (d10 / 10) * UNITS_PER_M;

  const verdict =
    state === "balanced"
      ? "Balanced: clockwise moment = anticlockwise moment"
      : state === "clockwise"
        ? "Clockwise moment is larger: the right side goes down"
        : "Anticlockwise moment is larger: the left side goes down";

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · principle of moments on a see-saw
      </p>

      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label={`A light see-saw on a pivot. Left: 300 N at 2.0 m, anticlockwise moment ${fmtMoment(anti)} N m. Right: ${w} N at ${fmt1(d10 / 10)} m, clockwise moment ${fmtMoment(clock)} N m. ${verdict}.`}
      >
        <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          {state === "balanced" ? "Balanced" : state === "clockwise" ? "Turns clockwise" : "Turns anticlockwise"}
        </text>

        {/* Ground and pivot */}
        <line x1={20} y1={PIVOT.y + 26} x2={300} y2={PIVOT.y + 26} className="stroke-border" strokeWidth={1.5} />
        <polygon
          points={`${PIVOT.x},${PIVOT.y + 2} ${PIVOT.x - 14},${PIVOT.y + 26} ${PIVOT.x + 14},${PIVOT.y + 26}`}
          className="fill-amber-500 dark:fill-amber-400"
        />
        <text x={PIVOT.x} y={PIVOT.y + 40} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          pivot
        </text>

        {/* The beam and the two children, turned together about the pivot. */}
        <g className={MOTION} style={{ transform: svgTransform({ x: PIVOT.x, y: PIVOT.y, angle: tilt }) }}>
          <rect x={-HALF} y={-4} width={2 * HALF} height={6} rx={2} className="fill-slate-500 dark:fill-slate-400" />
          <Child x={xLeft} weight={LEFT.weight} tone="rose" />
          <Child x={xRight} weight={w} tone="sky" />

          {/* Distances from the pivot, under the beam. */}
          {[
            { x: xLeft, label: `${fmt1(LEFT.dist10 / 10)} m` },
            { x: xRight, label: `${fmt1(d10 / 10)} m` },
          ].map((m) => (
            <g key={m.x < 0 ? "l" : "r"}>
              <line x1={0} y1={12} x2={m.x} y2={12} className="stroke-muted-foreground" strokeWidth={1} />
              <line x1={m.x} y1={8} x2={m.x} y2={16} className="stroke-muted-foreground" strokeWidth={1} />
              <text x={m.x / 2} y={24} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
                {m.label}
              </text>
            </g>
          ))}
        </g>

        {/* Moment readouts */}
        <text x={20} y={174} className="fill-rose-700 text-[10px] font-semibold tabular-nums dark:fill-rose-300">
          anticlockwise: 300 × 2.0 = {fmtMoment(anti)} N m
        </text>
        <text x={20} y={189} className="fill-sky-700 text-[10px] font-semibold tabular-nums dark:fill-sky-300">
          clockwise: {w} × {fmt1(d10 / 10)} = {fmtMoment(clock)} N m
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Right child&apos;s distance from the pivot: <span className="tabular-nums">{fmt1(d10 / 10)} m</span>
        </span>
        <input
          type="range"
          min={DIST10_RANGE.min}
          max={DIST10_RANGE.max}
          step={DIST10_RANGE.step}
          value={d10}
          onChange={(e) => setD10(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Distance of the right-hand child from the pivot, in metres"
          aria-valuetext={`${fmt1(d10 / 10)} metres`}
        />
      </label>
      <label className="mt-2 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Right child&apos;s weight: <span className="tabular-nums">{w} N</span>
        </span>
        <input
          type="range"
          min={WEIGHT_RANGE.min}
          max={WEIGHT_RANGE.max}
          step={WEIGHT_RANGE.step}
          value={w}
          onChange={(e) => setW(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Weight of the right-hand child, in newtons"
        />
      </label>

      <p className="mt-2 text-sm font-medium text-foreground" aria-live="polite">
        {verdict}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        A moment is force × distance from the pivot. The 300 N child 2.0 m out turns the see-saw anticlockwise
        with 600 N m, so a 400 N child must sit 1.5 m out on the other side: 400 × 1.5 = 600 N m. The see-saw is
        light, so its own weight is left out; on a real beam it acts at the middle.
      </p>
    </div>
  );
}
