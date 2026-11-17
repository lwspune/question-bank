"use client";

import { useState } from "react";

/**
 * Interactive: the IMAT "How area and volume scale with length" concept. A
 * unit cube beside a cube k times as long; the big cube's faces are ruled in
 * unit squares, so at k = 2 a student counts 4 small faces on each big face
 * and sees the 8 small cubes. A slider sets k; the live line gives length ×k,
 * area ×k², volume ×k³ and applies them to the worked example's jugs
 * (height 12 cm, glaze 150 cm², capacity 0.8 litres). The first render is the
 * worked example, k = 18/12 = 1.5: glaze 337.5 cm², capacity 2.7 litres.
 *
 * Pinned by tests/notes-imat-visuals-maths.test.ts.
 */

/** The worked example's jugs (the smaller one). */
export const JUG = { height: 12, glaze: 150, litres: 0.8 } as const;
export const DEFAULT_K = 1.5;

/** Up to 3 decimals, as a number (1.5³ = 3.375 exactly; 0.8 × 3.375 = 2.7). */
export function round3(n: number): number {
  return Number(n.toFixed(3));
}

export function scaleFactors(k: number): { length: number; area: number; volume: number } {
  return { length: round3(k), area: round3(k * k), volume: round3(k * k * k) };
}

/** The larger jug for a length scale factor k. */
export function scaledJug(k: number): { height: number; glaze: number; litres: number } {
  return {
    height: round3(JUG.height * k),
    glaze: round3(JUG.glaze * k * k),
    litres: round3(JUG.litres * k * k * k),
  };
}

const W = 320;
const H = 170;
const BASE = 150;
const UNIT = 28; // drawn edge of the small cube
const DX = 0.5; // depth offset, as a share of the edge
const DY = 0.35;

type P = [number, number];
const pt = ([x, y]: P) => `${x.toFixed(1)},${y.toFixed(1)}`;

/** Visible faces of a cube of edge e whose front-bottom-left corner is (x, BASE). */
function cubeFaces(x: number, e: number) {
  const dx = DX * e;
  const dy = DY * e;
  const front: P[] = [[x, BASE], [x + e, BASE], [x + e, BASE - e], [x, BASE - e]];
  const top: P[] = [[x, BASE - e], [x + e, BASE - e], [x + e + dx, BASE - e - dy], [x + dx, BASE - e - dy]];
  const side: P[] = [[x + e, BASE], [x + e + dx, BASE - dy], [x + e + dx, BASE - e - dy], [x + e, BASE - e]];
  return { front, top, side };
}

/** Unit ruling on the three faces of a cube of edge e (in drawn units). */
function rulings(x: number, e: number): string {
  const segs: string[] = [];
  const dx = DX * e;
  const dy = DY * e;
  const n = e / UNIT;
  for (let i = 1; i < n; i++) {
    const u = i * UNIT;
    const f = u / e; // share of the edge
    // front face: verticals and horizontals
    segs.push(`M${x + u},${BASE} V${BASE - e}`);
    segs.push(`M${x},${BASE - u} H${x + e}`);
    // top face: lines across the depth, and lines along the width
    segs.push(`M${x + u},${BASE - e} L${x + u + dx},${BASE - e - dy}`);
    segs.push(`M${x + f * dx},${BASE - e - f * dy} L${x + e + f * dx},${BASE - e - f * dy}`);
    // side face: verticals at each depth step, and horizontals at each height
    segs.push(`M${x + e + f * dx},${BASE - f * dy} L${x + e + f * dx},${BASE - e - f * dy}`);
    segs.push(`M${x + e},${BASE - u} L${x + e + dx},${BASE - u - dy}`);
  }
  return segs.join(" ");
}

function Cube({ x, e, tone }: { x: number; e: number; tone: "small" | "big" }) {
  const { front, top, side } = cubeFaces(x, e);
  const fill =
    tone === "small"
      ? ["fill-amber-400/70 dark:fill-amber-500/60", "fill-amber-300/70 dark:fill-amber-400/50", "fill-amber-500/70 dark:fill-amber-600/60"]
      : ["fill-sky-400/60 dark:fill-sky-500/50", "fill-sky-300/60 dark:fill-sky-400/40", "fill-sky-500/60 dark:fill-sky-600/50"];
  return (
    <g>
      <polygon points={front.map(pt).join(" ")} className={`${fill[0]} stroke-foreground/70`} strokeWidth={1} />
      <polygon points={top.map(pt).join(" ")} className={`${fill[1]} stroke-foreground/70`} strokeWidth={1} />
      <polygon points={side.map(pt).join(" ")} className={`${fill[2]} stroke-foreground/70`} strokeWidth={1} />
      {tone === "big" && <path d={rulings(x, e)} fill="none" stroke="currentColor" strokeWidth={0.8} className="text-foreground/40" />}
    </g>
  );
}

const show = (n: number) => String(n);

export default function ImatSimilarScaling() {
  const [k, setK] = useState(DEFAULT_K);
  const f = scaleFactors(k);
  const jug = scaledJug(k);
  const smallX = 34;
  const bigX = 130;
  const bigE = UNIT * k;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · scale every length by k
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`A cube of edge 1 and a cube of edge ${show(f.length)}: areas are ${show(f.area)} times and volumes ${show(f.volume)} times as big`}
      >
        <line x1={10} y1={BASE} x2={W - 10} y2={BASE} stroke="currentColor" className="text-muted-foreground/40" />
        <Cube x={smallX} e={UNIT} tone="small" />
        <Cube x={bigX} e={bigE} tone="big" />
        <text x={smallX + UNIT / 2} y={BASE + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          edge 1
        </text>
        <text x={bigX + bigE / 2} y={BASE + 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          edge {show(f.length)}
        </text>
        <text x={W - 10} y={14} textAnchor="end" className="fill-muted-foreground text-[10px]">
          lines mark unit squares
        </text>
      </svg>

      <label className="mt-2 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          scale factor k: <span className="tabular-nums">{show(f.length)}</span>
        </span>
        <input
          type="range"
          min={0.5}
          max={3}
          step={0.1}
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Length scale factor k"
        />
      </label>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs tabular-nums">
        <div className="rounded-md border border-indigo-100 bg-background/60 p-2 dark:border-indigo-900/40">
          <div className="text-muted-foreground">length</div>
          <div className="text-sm font-semibold text-foreground">×{show(f.length)}</div>
        </div>
        <div className="rounded-md border border-indigo-100 bg-background/60 p-2 dark:border-indigo-900/40">
          <div className="text-muted-foreground">area, k²</div>
          <div className="text-sm font-semibold text-foreground">×{show(f.area)}</div>
        </div>
        <div className="rounded-md border border-indigo-100 bg-background/60 p-2 dark:border-indigo-900/40">
          <div className="text-muted-foreground">volume, k³</div>
          <div className="text-sm font-semibold text-foreground">×{show(f.volume)}</div>
        </div>
      </div>

      <p className="mt-3 text-sm text-foreground tabular-nums">
        Jug: height {JUG.height} → {show(jug.height)} cm · glaze {JUG.glaze} → {show(jug.glaze)} cm² · holds{" "}
        {JUG.litres} → {show(jug.litres)} litres
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        At k = 2 each big face holds 4 small faces and the big cube holds 8 small cubes. The jugs are 12 cm and 18 cm
        tall, so k = 1.5: the glaze (an area) is multiplied by 1.5² = 2.25 and the capacity (a volume) by 1.5³ = 3.375.
      </p>
    </div>
  );
}
