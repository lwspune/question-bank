"use client";

import { useState } from "react";

/**
 * Interactive: the pair of lines ax² + 2hxy + by² = 0 through the origin and
 * the angle between them (concept cetpsl-angle-formula-perpendicular-and-parallel).
 *
 * Opens on the concept's worked example x² + 4xy + y² = 0 (a = 1, h = 2, b = 1):
 * putting y = mx gives bm² + 2hm + a = 0, so m₁ + m₂ = −2h/b = −4 and
 * m₁m₂ = a/b = 1, the slopes −2 ± √3 (lines at −15° and −75°), and
 * tan θ = 2√(h² − ab)/|a + b| = 2√3/2 = √3, θ = 60°.
 *
 * Sliders move h and b (a stays 1). The lines are drawn from their directions,
 * not their slopes, so b = 0 (one line is x = 0) needs no special case:
 * a cos²φ + 2h sinφ cosφ + b sin²φ = 0 is (a + b)/2 + ((a − b)/2) cos 2φ + h sin 2φ = 0.
 * Marked cases: a + b = 0 (b = −1 here) perpendicular; h² = ab coincident;
 * h² < ab no real lines. Pinned by tests/notes-cet-visuals-maths.test.ts.
 */

/** The concept's worked example. */
export const PAIR_EXAMPLE = { a: 1, h: 2, b: 1 } as const;

export const H_RANGE = { min: -3, max: 3, step: 0.5 } as const;
export const B_RANGE = { min: -3, max: 3, step: 1 } as const;

export type PairKind = "none" | "coincident" | "perpendicular" | "pair";

export function pairKind(a: number, h: number, b: number): PairKind {
  const d = h * h - a * b;
  if (d < -1e-12) return "none";
  if (Math.abs(d) <= 1e-12) return "coincident";
  if (Math.abs(a + b) <= 1e-12) return "perpendicular";
  return "pair";
}

/**
 * Directions of the two lines, in radians from the positive x-axis (each in
 * (−π/2, π/2]), or null when there are no real lines.
 */
export function lineDirections(a: number, h: number, b: number): [number, number] | null {
  if (pairKind(a, h, b) === "none") return null;
  const R = Math.hypot((a - b) / 2, h);
  const delta = Math.atan2(h, (a - b) / 2);
  const spread = Math.acos(Math.max(-1, Math.min(1, -(a + b) / 2 / R)));
  const norm = (phi: number) => {
    let p = phi % Math.PI;
    if (p <= -Math.PI / 2) p += Math.PI;
    if (p > Math.PI / 2) p -= Math.PI;
    return p;
  };
  return [norm((delta + spread) / 2), norm((delta - spread) / 2)];
}

/** The acute (or right) angle between the lines from the formula, in degrees; null when no real lines. */
export function angleFromFormula(a: number, h: number, b: number): number | null {
  const d = h * h - a * b;
  if (d < -1e-12) return null;
  if (Math.abs(a + b) <= 1e-12) return 90;
  return (Math.atan((2 * Math.sqrt(Math.max(0, d))) / Math.abs(a + b)) * 180) / Math.PI;
}

/** The angle between two drawn directions, folded to [0°, 90°]. */
export function angleBetween(p1: number, p2: number): number {
  let d = Math.abs(p1 - p2) % Math.PI;
  if (d > Math.PI / 2) d = Math.PI - d;
  return (d * 180) / Math.PI;
}

// Geometry (viewBox units).
const C = { x: 160, y: 104 } as const;
const L = 96;
const ARC = 30;
const r2 = (n: number) => Math.round(n * 100) / 100;
const fmt = (n: number) => (Math.abs(n) < 0.005 ? "0" : n.toFixed(2).replace(/\.?0+$/, "").replace("-", "−"));
const sgn = (n: number) => (n < 0 ? `− ${fmt(-n)}` : `+ ${fmt(n)}`);

/** Points of the arc marking the acute angle between the two directions. */
function arcPoints(p1: number, p2: number): string {
  let start = p1;
  let d = p2 - p1;
  d = ((d % Math.PI) + Math.PI) % Math.PI; // in [0, π)
  if (d > Math.PI / 2) {
    start = p1 + d;
    d = Math.PI - d;
  }
  const pts: string[] = [];
  for (let k = 0; k <= 20; k++) {
    const t = start + (d * k) / 20;
    pts.push(`${r2(C.x + ARC * Math.cos(t))},${r2(C.y - ARC * Math.sin(t))}`);
  }
  return pts.join(" ");
}

function equationText(a: number, h: number, b: number): string {
  const xy = h === 0 ? "" : ` ${sgn(2 * h)}xy`.replace(/ ([+−]) 1xy/, " $1 xy");
  const y2 = b === 0 ? "" : ` ${sgn(b)}y²`.replace(/ ([+−]) 1y²/, " $1 y²");
  return `x²${xy}${y2} = 0`;
}

export default function CetPairOfLinesAngle() {
  const a = PAIR_EXAMPLE.a;
  const [h, setH] = useState<number>(PAIR_EXAMPLE.h);
  const [b, setB] = useState<number>(PAIR_EXAMPLE.b);
  const kind = pairKind(a, h, b);
  const dirs = lineDirections(a, h, b);
  const theta = angleFromFormula(a, h, b);
  const d = h * h - a * b;

  const ends = (phi: number) => ({
    x1: r2(C.x - L * Math.cos(phi)),
    y1: r2(C.y + L * Math.sin(phi)),
    x2: r2(C.x + L * Math.cos(phi)),
    y2: r2(C.y - L * Math.sin(phi)),
  });

  const verdict =
    kind === "none"
      ? `h² − ab = ${fmt(d)} < 0: no real lines, only the origin satisfies it`
      : kind === "coincident"
        ? "h² = ab: the two lines coincide (θ = 0)"
        : kind === "perpendicular"
          ? "a + b = 0: perpendicular, θ = 90°"
          : `tan θ = 2√(${fmt(d)})/${fmt(Math.abs(a + b))} ≈ ${fmt(Math.tan(((theta ?? 0) * Math.PI) / 180))}, θ ≈ ${(theta ?? 0).toFixed(1)}°`;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the angle between a pair of lines through the origin
      </p>

      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label={`The pair ${equationText(a, h, b)} through the origin. ${verdict}.`}
      >
        <text x={160} y={12} textAnchor="middle" className="fill-foreground text-[12px] font-semibold tabular-nums">
          {equationText(a, h, b)}
        </text>
        {/* Axes */}
        <line x1={C.x - 110} y1={C.y} x2={C.x + 110} y2={C.y} className="stroke-border" />
        <line x1={C.x} y1={C.y - 86} x2={C.x} y2={C.y + 86} className="stroke-border" />
        <text x={C.x + 108} y={C.y - 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          x
        </text>
        <text x={C.x + 4} y={C.y - 78} className="fill-muted-foreground text-[10px]">
          y
        </text>

        {dirs && (
          <g>
            <line {...ends(dirs[0])} strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />
            <line
              {...ends(dirs[1])}
              strokeWidth={2.5}
              strokeDasharray={kind === "coincident" ? "6 4" : undefined}
              className="stroke-rose-600 dark:stroke-rose-400"
            />
            {kind !== "coincident" && (
              <polyline points={arcPoints(dirs[0], dirs[1])} fill="none" strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
            )}
          </g>
        )}
        <circle cx={C.x} cy={C.y} r={2.5} className="fill-foreground" />
        {kind === "none" && (
          <text x={C.x + 8} y={C.y - 8} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
            no real lines
          </text>
        )}

        <text x={160} y={206} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold tabular-nums dark:fill-emerald-300">
          {kind === "none" ? "h² < ab" : kind === "coincident" ? "h² = ab: one line" : kind === "perpendicular" ? "θ = 90°" : `θ ≈ ${(theta ?? 0).toFixed(1)}°`}
        </text>
      </svg>

      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            h: <span className="tabular-nums">{fmt(h)}</span> (the xy term is 2h)
          </span>
          <input
            type="range"
            min={H_RANGE.min}
            max={H_RANGE.max}
            step={H_RANGE.step}
            value={h}
            onChange={(e) => setH(Number(e.target.value))}
            className="accent-indigo-600"
            aria-label="h, half the coefficient of xy"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            b: <span className="tabular-nums">{fmt(b)}</span> (a stays 1)
          </span>
          <input
            type="range"
            min={B_RANGE.min}
            max={B_RANGE.max}
            step={B_RANGE.step}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="accent-indigo-600"
            aria-label="b, the coefficient of y squared"
          />
        </label>
      </div>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="text-muted-foreground">
          {b !== 0
            ? `Slopes: m₁ + m₂ = −2h/b = ${fmt((-2 * h) / b)}, m₁m₂ = a/b = ${fmt(a / b)}`
            : "b = 0: one line is x = 0, the y-axis (its slope is not defined)"}
        </p>
        <p className="font-medium text-foreground">{verdict}</p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The lines exist only when h² ≥ ab. Set b to −1 to make a + b = 0: the lines turn perpendicular whatever h is. Move h to ±1 with b = 1
        and h² = ab: the two lines merge into one. The formula gives the acute angle, and its denominator is |a + b|, not |a − b|.
      </p>
    </div>
  );
}
