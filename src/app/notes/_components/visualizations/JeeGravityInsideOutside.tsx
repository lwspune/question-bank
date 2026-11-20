"use client";

import { useState } from "react";

/**
 * Interactive: g along a line from the earth's centre outwards (concept
 * jpgrav-g-depth). Inside a uniform earth g = g(1 − d/R) = g r/R, a straight
 * line from zero at the centre to its peak at the surface; outside it falls as
 * R²/r², the same as g/(1 + h/R)². A slider moves a point from the centre to
 * three earth radii; the readout uses the right formula on each side.
 *
 * Numbers are the concept's own: R = 6400 km; depth R/2 gives g/2, depth R/4
 * gives 3g/4, and the worked example's depth of 1280 km (0.2R) gives 0.8g, the
 * figure's opening position. The self-check's 480 N body is the weight line:
 * at depth 3R/4 it weighs 120 N. Pinned by tests/notes-w2-15.test.ts.
 */

/** Earth's radius in km, as the concept takes it. */
export const R_KM = 6400;
/** Surface weight of the self-check's body, in N. */
export const SURFACE_WEIGHT = 480;

/** Slider over r/R, the distance from the centre in earth radii. */
export const R_RANGE = { min: 0, max: 3, step: 0.05 } as const;
/** Opens at the worked example: depth 1280 km, so r = 0.8R. */
export const DEFAULT_R = 0.8;

/** g as a fraction of its surface value at distance r (in earth radii) from the centre. */
export function gRatio(r: number): number {
  if (r <= 1) return r;
  return 1 / (r * r);
}

/** The depth formula 1 − d/R, with d in km. */
export function gAtDepth(dKm: number): number {
  return 1 - dKm / R_KM;
}

/** The height formula 1/(1 + h/R)², with h in km. */
export function gAtHeight(hKm: number): number {
  return 1 / (1 + hKm / R_KM) ** 2;
}

/** Points the graph marks: r in earth radii and g as a fraction of surface g. */
export const MARKS = [
  { r: 0.5, g: 0.5, label: "depth R/2: g/2" },
  { r: 0.75, g: 0.75, label: "depth R/4: 3g/4" },
  { r: 1, g: 1, label: "surface: largest" },
] as const;

const round2 = (n: number) => Math.round(n * 100) / 100;

// Graph geometry, viewBox units.
export const GRAPH = { x0: 40, x1: 300, y0: 190, yTop: 40 } as const;
const PER_R = (GRAPH.x1 - GRAPH.x0) / R_RANGE.max;
const PER_G = GRAPH.y0 - GRAPH.yTop;
const gx = (r: number) => round2(GRAPH.x0 + r * PER_R);
const gy = (g: number) => round2(GRAPH.y0 - g * PER_G);

/** The curve as polyline points, 0 to 3R. */
export function curvePoints(): { r: number; g: number }[] {
  const pts: { r: number; g: number }[] = [];
  for (let i = 0; i <= 120; i++) {
    const r = (i / 120) * R_RANGE.max;
    pts.push({ r, g: gRatio(r) });
  }
  return pts;
}

export default function JeeGravityInsideOutside() {
  const [r, setR] = useState<number>(DEFAULT_R);
  const g = gRatio(r);
  const inside = r <= 1;
  const km = Math.round(Math.abs(1 - r) * R_KM);
  const poly = curvePoints()
    .map((p) => `${gx(p.r)},${gy(p.g)}`)
    .join(" ");
  const weight = Math.round(SURFACE_WEIGHT * g);

  let where: string;
  if (r === 0) where = "At the centre";
  else if (r === 1) where = "At the surface";
  else if (inside) where = `Depth d = ${km} km`;
  else where = `Height h = ${km} km`;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · g below and above the surface
      </p>

      <svg
        viewBox="0 0 320 222"
        className="block h-auto w-full"
        role="img"
        aria-label={`Graph of g against distance from the earth's centre, in earth radii. Inside the earth g rises in a straight line from zero at the centre to its largest value at the surface; outside it falls as one over r squared. The marked point is at ${round2(r)} R, where g is ${g.toFixed(2)} of its surface value.`}
      >
        {/* Inside-the-earth band */}
        <rect x={GRAPH.x0} y={GRAPH.yTop - 8} width={gx(1) - GRAPH.x0} height={GRAPH.y0 - GRAPH.yTop + 8} className="fill-amber-200/40 dark:fill-amber-900/25" />
        <text x={(GRAPH.x0 + gx(1)) / 2} y={GRAPH.yTop - 14} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          inside the earth
        </text>
        <text x={gx(2.3)} y={GRAPH.yTop - 14} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
          outside
        </text>

        {/* Axes */}
        <line x1={GRAPH.x0} y1={GRAPH.y0} x2={GRAPH.x1 + 6} y2={GRAPH.y0} strokeWidth={1.2} className="stroke-foreground" />
        <line x1={GRAPH.x0} y1={GRAPH.y0} x2={GRAPH.x0} y2={GRAPH.yTop - 8} strokeWidth={1.2} className="stroke-foreground" />
        {[0, 1, 2, 3].map((t) => (
          <g key={t}>
            <line x1={gx(t)} y1={GRAPH.y0} x2={gx(t)} y2={GRAPH.y0 + 4} className="stroke-foreground" />
            <text x={gx(t)} y={GRAPH.y0 + 14} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {t === 0 ? "0" : t === 1 ? "R" : `${t}R`}
            </text>
          </g>
        ))}
        <text x={GRAPH.x1 + 4} y={GRAPH.y0 + 25} textAnchor="end" className="fill-muted-foreground text-[9px]">
          distance r
        </text>
        <text x={gx(0)} y={GRAPH.y0 + 25} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          centre
        </text>
        <text x={gx(1)} y={GRAPH.y0 + 25} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          surface
        </text>
        {[0.5, 1].map((t) => (
          <g key={t}>
            <line x1={GRAPH.x0 - 4} y1={gy(t)} x2={GRAPH.x0} y2={gy(t)} className="stroke-foreground" />
            <text x={GRAPH.x0 - 6} y={gy(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t === 1 ? "g" : "g/2"}
            </text>
          </g>
        ))}

        {/* Curve */}
        <polyline points={poly} fill="none" strokeWidth={2.2} className="stroke-indigo-600 dark:stroke-indigo-400" />

        {/* Marked points */}
        {MARKS.map((m) => (
          <g key={m.label}>
            <line x1={gx(m.r)} y1={gy(m.g)} x2={gx(m.r)} y2={GRAPH.y0} strokeDasharray="2 3" className="stroke-muted-foreground" />
            <circle cx={gx(m.r)} cy={gy(m.g)} r={2.6} className="fill-indigo-600 dark:fill-indigo-400" />
          </g>
        ))}
        <text x={gx(1) + 6} y={gy(1) - 4} className="fill-foreground text-[10px] font-semibold">
          largest at the surface
        </text>
        <text x={gx(0.75) + 5} y={gy(0.75) + 12} className="fill-muted-foreground text-[9px]">
          3g/4
        </text>
        <text x={gx(0.5) + 5} y={gy(0.5) + 12} className="fill-muted-foreground text-[9px]">
          g/2
        </text>
        <text x={gx(0.1)} y={gy(0.1) - 8} className="fill-muted-foreground text-[9px]">
          straight line
        </text>
        <text x={gx(2)} y={gy(gRatio(2)) - 8} className="fill-muted-foreground text-[9px]">
          falls as 1/r²
        </text>

        {/* The slider's point */}
        <line x1={gx(r)} y1={gy(g)} x2={gx(r)} y2={GRAPH.y0} strokeWidth={1.2} className="stroke-rose-600 dark:stroke-rose-400" />
        <circle cx={gx(r)} cy={gy(g)} r={4.5} className="fill-rose-600 dark:fill-rose-400" />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Distance from the centre r: <span className="tabular-nums">{r.toFixed(2)}R</span>
        </span>
        <input
          type="range"
          min={R_RANGE.min}
          max={R_RANGE.max}
          step={R_RANGE.step}
          value={r}
          onChange={(ev) => setR(Number(ev.target.value))}
          className="accent-indigo-600"
          aria-label="Distance from the earth's centre, in earth radii"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          {where}: {inside ? "g(1 − d/R)" : "g/(1 + h/R)²"} = {g.toFixed(2)}g
        </p>
        <p className="text-muted-foreground tabular-nums">
          A body of 480 N on the surface weighs {weight} N here.
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Going down, only the sphere beneath you pulls, so g falls in a straight line to zero at the centre. Going up, it falls as 1/r².
        Both ways g gets smaller: it is largest at the surface. R = 6400 km.
      </p>
    </div>
  );
}
