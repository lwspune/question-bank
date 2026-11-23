"use client";

/**
 * Slider: the hockey-stick identity on Pascal's triangle (concept jbin-hockey).
 * The triangle is drawn left-aligned, so C(k, r) for a fixed r is one COLUMN,
 * as the concept says: adding the column from C(r, r) down to C(n, r) gives
 * the entry one row down and one place right, C(n + 1, r + 1).
 *
 * The default is the concept's self-check: r = 2, n = 8,
 * 1 + 3 + 6 + 10 + 15 + 21 + 28 = 84 = C(9, 3), the coefficient of x² in
 * (1 + x)² + … + (1 + x)⁸. Rows 0 to 9 are drawn, so n runs up to 8.
 * Pinned by tests/notes-w2-16.test.ts.
 */
import { useState } from "react";

export const ROWS = 10;
export const R_RANGE = { min: 0, max: 4, initial: 2 } as const;
export const N_MAX = 8;
export const N_INITIAL = 8;

export function C(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let v = 1;
  for (let i = 1; i <= r; i++) v = (v * (n - r + i)) / i;
  return Math.round(v);
}

/** The column C(r, r), C(r + 1, r), …, C(n, r). */
export const columnTerms = (r: number, n: number) => Array.from({ length: n - r + 1 }, (_, i) => C(r + i, r));

// Grid geometry (viewBox units).
export const GRID = { left: 34, top: 30, cw: 28, ch: 16 } as const;
const cx = (col: number) => GRID.left + col * GRID.cw + GRID.cw / 2;
const cy = (row: number) => GRID.top + row * GRID.ch + GRID.ch / 2;

export default function JeeHockeyStick() {
  const [r, setR] = useState<number>(R_RANGE.initial);
  const [n, setN] = useState<number>(N_INITIAL);
  const terms = columnTerms(r, n);
  const total = terms.reduce((s, t) => s + t, 0);
  const stick = [...Array.from({ length: n - r + 1 }, (_, i) => `${cx(r)},${cy(r + i)}`), `${cx(r + 1)},${cy(n + 1)}`].join(" ");

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the hockey stick in Pascal&apos;s triangle
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label={`Pascal's triangle, rows 0 to 9, drawn left-aligned. Column ${r} from row ${r} to row ${n} is shaded; its entries add to ${total}, the entry in row ${n + 1}, column ${r + 1}.`}
      >
        {/* Column and row labels */}
        <text x={GRID.left - 4} y={GRID.top - 16} textAnchor="end" className="fill-muted-foreground text-[9px]">
          r
        </text>
        <text x={12} y={GRID.top - 4} className="fill-muted-foreground text-[9px]">
          n
        </text>
        {Array.from({ length: ROWS }, (_, k) => (
          <g key={k}>
            <text x={cx(k)} y={GRID.top - 14} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
              {k}
            </text>
            <text x={GRID.left - 6} y={cy(k) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
              {k}
            </text>
          </g>
        ))}

        {/* The cells */}
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: row + 1 }, (_, col) => {
            const inColumn = col === r && row >= r && row <= n;
            const isBlade = row === n + 1 && col === r + 1;
            const tone = isBlade
              ? "fill-rose-500/30 stroke-rose-700 dark:fill-rose-400/30 dark:stroke-rose-300"
              : inColumn
                ? "fill-sky-500/30 stroke-sky-700 dark:fill-sky-400/30 dark:stroke-sky-300"
                : "fill-background stroke-border";
            return (
              <rect
                key={`${row}-${col}`}
                x={GRID.left + col * GRID.cw + 1}
                y={GRID.top + row * GRID.ch + 1}
                width={GRID.cw - 2}
                height={GRID.ch - 2}
                rx={2}
                strokeWidth={0.8}
                className={tone}
              />
            );
          }),
        )}

        {/* The stick, behind the numbers */}
        <polyline points={stick} fill="none" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" className="stroke-indigo-500/30 dark:stroke-indigo-400/30" />

        {/* The numbers */}
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: row + 1 }, (_, col) => {
            const lit = (col === r && row >= r && row <= n) || (row === n + 1 && col === r + 1);
            return (
              <text
                key={`${row}-${col}`}
                x={cx(col)}
                y={cy(row) + 3}
                textAnchor="middle"
                className={`text-[9px] tabular-nums ${lit ? "fill-foreground font-semibold" : "fill-muted-foreground"}`}
              >
                {C(row, col)}
              </text>
            );
          }),
        )}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Column r: <span className="tabular-nums">{r}</span>
        </span>
        <input
          type="range"
          min={R_RANGE.min}
          max={R_RANGE.max}
          step={1}
          value={r}
          onChange={(e) => {
            const v = Number(e.target.value);
            setR(v);
            setN((m) => Math.max(m, v));
          }}
          className="accent-indigo-600"
          aria-label="r, the column of the triangle"
        />
      </label>
      <label className="mt-2 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Last row n: <span className="tabular-nums">{n}</span>
        </span>
        <input
          type="range"
          min={r}
          max={N_MAX}
          step={1}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="n, the last row added"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm tabular-nums">
        <p className="text-muted-foreground">
          C({r}, {r}) + … + C({n}, {r}) = {terms.join(" + ")}
        </p>
        <p className="font-medium text-foreground">
          = {total} = C({n + 1}, {r + 1})
        </p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        With the triangle drawn flush left, C(k, r) for one r is a column. The shaded column, started at C(r, r), adds to the entry one
        row down and one place right. At r = 2, n = 8 that is 84 = C(9, 3), the coefficient of x² in (1 + x)² + (1 + x)³ + … + (1 + x)⁸.
      </p>
    </div>
  );
}
