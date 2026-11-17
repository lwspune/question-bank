"use client";

/**
 * Interactive: surface area to volume ratio of a cube-shaped cell, from the
 * IMAT concept imat-csm-sav. A slider sets the side L (1 to 6 µm); the cube
 * grows, and the live numbers show surface area 6L², volume L³ and the ratio
 * 6/L. The bars give the ratio for L = 1 to 6 µm, so the student sees it fall
 * as the cell grows.
 *
 * Opens on L = 2 µm, in both the worked example (1, 2 and 4 µm give 6, 3 and
 * 1.5 per µm) and the self-check (2 µm to 6 µm: the ratio falls from 3 to 1,
 * to one third). Pure maths is exported and pinned by
 * tests/notes-imat-visuals-bioevo.test.ts.
 */
import { useState } from "react";

export function cubeSurface(L: number): number {
  return 6 * L * L;
}
export function cubeVolume(L: number): number {
  return L ** 3;
}
export function saToV(L: number): number {
  return cubeSurface(L) / cubeVolume(L);
}

export const L_RANGE = { min: 1, max: 6, step: 0.5 } as const;
export const START_L = 2;
/** The sides drawn as bars (µm). */
export const BAR_SIDES = [1, 2, 3, 4, 5, 6] as const;

/** Round to 2 decimals and drop trailing zeros. */
export function fmt(n: number): string {
  return String(Number(n.toFixed(2)));
}

const r2 = (n: number) => Math.round(n * 100) / 100;

const W = 320;
const H = 190;
// Cube: front face from (CX, CY) up and right, 15 units per µm, depth drawn at 30°.
const CX = 22;
const CY = 168;
const UNIT = 15;
// Bars.
const BX = 178;
const BAR_W = 14;
const BAR_GAP = 8;
const B_BASE = 160;
const B_H = 110;
const RATIO_MAX = 6;
const by = (r: number) => B_BASE - (r / RATIO_MAX) * B_H;

export function cubeFaces(L: number) {
  const a = r2(L * UNIT);
  const d = a * 0.45;
  const dx = r2(d * Math.cos(Math.PI / 6));
  const dy = r2(d * Math.sin(Math.PI / 6));
  const front = `${CX},${CY} ${r2(CX + a)},${CY} ${r2(CX + a)},${r2(CY - a)} ${CX},${r2(CY - a)}`;
  const top = `${CX},${r2(CY - a)} ${r2(CX + a)},${r2(CY - a)} ${r2(CX + a + dx)},${r2(CY - a - dy)} ${r2(CX + dx)},${r2(CY - a - dy)}`;
  const side = `${r2(CX + a)},${CY} ${r2(CX + a + dx)},${r2(CY - dy)} ${r2(CX + a + dx)},${r2(CY - a - dy)} ${r2(CX + a)},${r2(CY - a)}`;
  return { a, front, top, side };
}

export default function ImatSaVolume() {
  const [L, setL] = useState<number>(START_L);
  const sa = cubeSurface(L);
  const v = cubeVolume(L);
  const ratio = saToV(L);
  const cube = cubeFaces(L);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · surface area to volume ratio of a cube
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`A cube-shaped cell of side ${fmt(L)} µm: surface area ${fmt(sa)} µm², volume ${fmt(v)} µm³, ratio ${fmt(ratio)} per µm. Bars show the ratio falling from 6 to 1 as the side grows from 1 to 6 µm`}
      >
        <text x={80} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          L = {fmt(L)} µm
        </text>

        {/* The cell as a cube. */}
        <polygon points={cube.top} className="fill-emerald-200 stroke-emerald-700 dark:fill-emerald-800/60 dark:stroke-emerald-300" strokeWidth={1.2} />
        <polygon points={cube.side} className="fill-emerald-300 stroke-emerald-700 dark:fill-emerald-700/60 dark:stroke-emerald-300" strokeWidth={1.2} />
        <polygon points={cube.front} className="fill-emerald-100 stroke-emerald-700 dark:fill-emerald-900/60 dark:stroke-emerald-300" strokeWidth={1.2} />
        <text x={CX + cube.a / 2} y={CY + 13} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          L
        </text>

        {/* Ratio bars for whole sides 1 to 6 µm, the current side in amber. */}
        <text x={BX} y={22} className="fill-muted-foreground text-[10px]">
          SA:V (per µm)
        </text>
        <line x1={BX - 4} y1={B_BASE} x2={W - 6} y2={B_BASE} className="stroke-muted-foreground/60" />
        {BAR_SIDES.map((s, i) => {
          const bx = BX + i * (BAR_W + BAR_GAP);
          const r = saToV(s);
          const current = s === L;
          return (
            <g key={s}>
              <rect
                x={bx}
                y={r2(by(r))}
                width={BAR_W}
                height={r2(B_BASE - by(r))}
                rx={2}
                className={current ? "fill-amber-500 dark:fill-amber-400" : "fill-sky-500/60 dark:fill-sky-400/60"}
              />
              <text x={bx + BAR_W / 2} y={r2(by(r) - 4)} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
                {fmt(r)}
              </text>
              <text x={bx + BAR_W / 2} y={B_BASE + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
                {s}
              </text>
            </g>
          );
        })}
        <text x={W - 6} y={B_BASE + 25} textAnchor="end" className="fill-muted-foreground text-[10px]">
          side L (µm)
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Side L: <span className="tabular-nums">{fmt(L)}</span> µm
        </span>
        <input
          type="range"
          min={L_RANGE.min}
          max={L_RANGE.max}
          step={L_RANGE.step}
          value={L}
          onChange={(e) => setL(Number(e.target.value))}
          className="accent-emerald-600"
          aria-label="L, the side of the cube-shaped cell in micrometres"
        />
      </label>

      <div className="mt-3 grid grid-cols-1 gap-1 text-sm sm:grid-cols-3">
        <span className="text-muted-foreground">
          Surface 6L² = <span className="tabular-nums text-foreground">{fmt(sa)}</span> µm²
        </span>
        <span className="text-muted-foreground">
          Volume L³ = <span className="tabular-nums text-foreground">{fmt(v)}</span> µm³
        </span>
        <span className="font-medium text-foreground">
          SA:V = 6/L = <span className="tabular-nums">{fmt(ratio)}</span> per µm
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        It opens on L = 2 µm: surface 24 µm², volume 8 µm³, ratio 3 per µm. Sides of 1, 2 and 4 µm give 6, 3 and 1.5
        per µm: each doubling of the side halves the ratio. Growing from 2 to 6 µm cuts it from 3 to 1, to one third,
        because the volume rises faster than the surface.
      </p>
    </div>
  );
}
