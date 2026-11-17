"use client";

/**
 * Interactive: the painted cube of the IMAT concept imat-spa-painted-cube. A
 * slider sets n (2 to 6) for an n × n × n cube painted outside and cut into
 * unit cubes. Left: the big cube, each small cube coloured by how many painted
 * faces it has (corners 3, edges 2, faces 1). Right: the middle layer seen
 * from above, so the hidden core (0 faces) shows too, with the count in each
 * cell. Live counts 8, 12(n − 2), 6(n − 2)², (n − 2)³ add to n³.
 *
 * Opens on n = 5, the concept's worked example (125 cubes: 8, 36, 54, 27).
 * The counts come from checking every small cube and are pinned against the
 * formulas by tests/notes-imat-visuals-logic.test.ts.
 */
import { useState } from "react";

export const N_RANGE = { min: 2, max: 6, step: 1 } as const;
export const START_N = 5;

/** Painted faces of the small cube at (i, j, k), each 0..n−1: one per coordinate on the outside. */
export function paintedFaces(i: number, j: number, k: number, n: number): number {
  const edge = (c: number) => (c === 0 || c === n - 1 ? 1 : 0);
  return edge(i) + edge(j) + edge(k);
}

export type PaintCounts = { three: number; two: number; one: number; zero: number };

/** Counts by checking every small cube. */
export function countByCubes(n: number): PaintCounts {
  const c: PaintCounts = { three: 0, two: 0, one: 0, zero: 0 };
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      for (let k = 0; k < n; k++) {
        const p = paintedFaces(i, j, k, n);
        if (p === 3) c.three++;
        else if (p === 2) c.two++;
        else if (p === 1) c.one++;
        else c.zero++;
      }
  return c;
}

/** The concept's formulas. */
export function countByFormula(n: number): PaintCounts {
  const m = n - 2;
  return { three: 8, two: 12 * m, one: 6 * m * m, zero: m ** 3 };
}

const FILL = [
  "fill-slate-300 dark:fill-slate-400",
  "fill-sky-400 dark:fill-sky-500",
  "fill-amber-400 dark:fill-amber-500",
  "fill-rose-500 dark:fill-rose-400",
] as const;
const SWATCH = ["bg-slate-300 dark:bg-slate-400", "bg-sky-400 dark:bg-sky-500", "bg-amber-400 dark:bg-amber-500", "bg-rose-500 dark:bg-rose-400"] as const;

const r2 = (v: number) => Math.round(v * 100) / 100;

// Isometric cube: total edge 72 units, top vertex at (OX, OY).
const EDGE = 72;
const OX = 80;
const OY = 30;
const COS30 = Math.cos(Math.PI / 6);

/** Screen point of the 3-D point (x, y, z) in cube units, side n. */
function iso(x: number, y: number, z: number, n: number): string {
  const u = EDGE / n;
  const sx = OX + (x - y) * COS30 * u;
  const sy = OY + (x + y) * 0.5 * u + (n - z) * u;
  return `${r2(sx)},${r2(sy)}`;
}

type Quad = { key: string; points: string; faces: number; shade: 0 | 1 | 2 };

/** The squares on the three visible faces: top (z = n), left (y = n), right (x = n). */
export function visibleSquares(n: number): Quad[] {
  const out: Quad[] = [];
  for (let a = 0; a < n; a++)
    for (let b = 0; b < n; b++) {
      out.push({
        key: `t${a}-${b}`,
        points: [iso(a, b, n, n), iso(a + 1, b, n, n), iso(a + 1, b + 1, n, n), iso(a, b + 1, n, n)].join(" "),
        faces: paintedFaces(a, b, n - 1, n),
        shade: 0,
      });
      out.push({
        key: `l${a}-${b}`,
        points: [iso(a, n, b, n), iso(a + 1, n, b, n), iso(a + 1, n, b + 1, n), iso(a, n, b + 1, n)].join(" "),
        faces: paintedFaces(a, n - 1, b, n),
        shade: 1,
      });
      out.push({
        key: `r${a}-${b}`,
        points: [iso(n, a, b, n), iso(n, a + 1, b, n), iso(n, a + 1, b + 1, n), iso(n, a, b + 1, n)].join(" "),
        faces: paintedFaces(n - 1, a, b, n),
        shade: 2,
      });
    }
  return out;
}

/** The layer drawn on the right: the middle one (for n = 2, the top one). */
export function sliceLayer(n: number): number {
  return Math.floor(n / 2);
}

const SHADE = ["", "fill-black/10", "fill-black/25"] as const;

// Slice grid.
const GX = 186;
const GY = 50;
const GSIZE = 114;

export default function ImatPaintedCube() {
  const [n, setN] = useState<number>(START_N);
  const counts = countByFormula(n);
  const squares = visibleSquares(n);
  const layer = sliceLayer(n);
  const cell = GSIZE / n;
  const rows = [
    { faces: 3, label: "3 faces (corners)", formula: "8", value: counts.three },
    { faces: 2, label: "2 faces (edges)", formula: "12(n − 2)", value: counts.two },
    { faces: 1, label: "1 face", formula: "6(n − 2)²", value: counts.one },
    { faces: 0, label: "0 faces (core)", formula: "(n − 2)³", value: counts.zero },
  ];

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · a painted cube cut into small cubes
      </p>

      <svg
        viewBox="0 0 320 190"
        className="block h-auto w-full"
        role="img"
        aria-label={`A ${n} by ${n} by ${n} cube painted on the outside, coloured by painted faces: ${counts.three} corner cubes with 3, ${counts.two} edge cubes with 2, ${counts.one} face cubes with 1 and ${counts.zero} hidden cubes with none, ${n ** 3} in all. On the right, one layer seen from above shows the hidden core.`}
      >
        <text x={OX} y={16} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          n = {n}: {n ** 3} small cubes
        </text>
        {squares.map((q) => (
          <g key={q.key}>
            <polygon points={q.points} className={`${FILL[q.faces]} stroke-slate-700 dark:stroke-slate-200`} strokeWidth={0.6} />
            {q.shade > 0 && <polygon points={q.points} className={SHADE[q.shade]} />}
          </g>
        ))}

        <text x={GX + GSIZE / 2} y={16} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Layer {layer + 1} of {n}, from above
        </text>
        <text x={GX + GSIZE / 2} y={30} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          painted faces of each cube
        </text>
        {Array.from({ length: n * n }, (_, idx) => {
          const i = idx % n;
          const j = Math.floor(idx / n);
          const f = paintedFaces(i, j, layer, n);
          const x = r2(GX + i * cell);
          const y = r2(GY + j * cell);
          return (
            <g key={idx}>
              <rect x={x} y={y} width={r2(cell)} height={r2(cell)} className={`${FILL[f]} stroke-slate-700 dark:stroke-slate-200`} strokeWidth={0.6} />
              <text x={r2(x + cell / 2)} y={r2(y + cell / 2 + 3.5)} textAnchor="middle" className="fill-slate-900 text-[10px] font-semibold">
                {f}
              </text>
            </g>
          );
        })}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Cubes along each edge, n: <span className="tabular-nums">{n}</span>
        </span>
        <input
          type="range"
          min={N_RANGE.min}
          max={N_RANGE.max}
          step={N_RANGE.step}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="n, the number of small cubes along each edge of the big cube"
        />
      </label>

      <ul className="mt-3 grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
        {rows.map((r) => (
          <li key={r.faces} className="flex items-center gap-2 text-muted-foreground">
            <span className={`inline-block h-3 w-3 shrink-0 rounded-sm ${SWATCH[r.faces]}`} aria-hidden="true" />
            <span>
              {r.label}: {r.formula} = <span className="tabular-nums text-foreground">{r.value}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm font-medium text-foreground">
        Total: {counts.three} + {counts.two} + {counts.one} + {counts.zero} = <span className="tabular-nums">{n ** 3}</span> = {n}³
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        It opens on n = 5, the 125 cubes of the worked example: 8, 36, 54 and 27. At least one painted face: everything
        but the core, 125 − 27 = 98.
      </p>
    </div>
  );
}
