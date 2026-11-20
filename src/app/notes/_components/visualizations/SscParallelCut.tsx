"use client";

/**
 * Slider: a line ST drawn parallel to the base QR of triangle PQR cuts the
 * other two sides in the same ratio (concept ssctrpl-bpt, basic
 * proportionality). It opens on the worked example: PS = 4 cm, SQ = 10 cm,
 * PR = 21 cm, so PT = 6 cm and TR = 15 cm. Moving PS along PQ (14 cm) keeps
 * ST parallel to QR, because S and T sit at the same fraction PS/PQ of their
 * sides; PS = 7 is the midpoint case (ratio 1 : 1, ST = half of QR). Pinned by
 * tests/notes-w2-13.test.ts.
 */
import { useState } from "react";

export type Pt = { x: number; y: number };

/** The worked example: PQ = 4 + 10 = 14 cm, PR = 21 cm, PS = 4 cm. */
export const PQ_CM = 14;
export const PR_CM = 21;
export const EXAMPLE_PS = 4;
export const PS_RANGE = { min: 1, max: 13, step: 1 } as const;

/** Corners in viewBox units (not to scale with the centimetres). */
export const P: Pt = { x: 150, y: 24 };
export const Q: Pt = { x: 34, y: 188 };
export const R: Pt = { x: 290, y: 188 };

const r2 = (n: number) => Math.round(n * 100) / 100;
const along = (a: Pt, b: Pt, t: number): Pt => ({ x: r2(a.x + (b.x - a.x) * t), y: r2(a.y + (b.y - a.y) * t) });

export const sqFor = (ps: number) => PQ_CM - ps;
/** PT = (PS / PQ) × PR. */
export const ptFor = (ps: number) => (ps / PQ_CM) * PR_CM;
export const trFor = (ps: number) => PR_CM - ptFor(ps);

/** S on PQ and T on PR at the same fraction PS / PQ, so ST is parallel to QR. */
export function cutPoints(ps: number): { S: Pt; T: Pt } {
  const t = ps / PQ_CM;
  return { S: along(P, Q, t), T: along(P, R, t) };
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
/** a : b in lowest terms (whole numbers). */
export function lowest(a: number, b: number): [number, number] {
  const g = gcd(a, b);
  return [a / g, b / g];
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export default function SscParallelCut() {
  const [ps, setPs] = useState<number>(EXAMPLE_PS);
  const { S, T } = cutPoints(ps);
  const sq = sqFor(ps);
  const pt = ptFor(ps);
  const tr = trFor(ps);
  const [ra, rb] = lowest(ps, sq);
  const [wa, wb] = lowest(ps, PQ_CM);
  const mid = ps * 2 === PQ_CM;
  const midOf = (a: Pt, b: Pt): Pt => ({ x: r2((a.x + b.x) / 2), y: r2((a.y + b.y) / 2) });
  const mPS = midOf(P, S);
  const mSQ = midOf(S, Q);
  const mPT = midOf(P, T);
  const mTR = midOf(T, R);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · a line parallel to one side
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label={`Triangle PQR with ST parallel to QR, S on PQ and T on PR. PS is ${fmt(ps)} centimetres and SQ is ${fmt(sq)}, PT is ${fmt(pt)} and TR is ${fmt(tr)}, so both sides are cut in the ratio ${ra} to ${rb}.`}
      >
        <polygon points={`${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <polygon points={`${P.x},${P.y} ${S.x},${S.y} ${T.x},${T.y}`} className="fill-sky-200/60 dark:fill-sky-800/40" stroke="none" />
        {/* The two pieces of each side, coloured alike: top pieces indigo, bottom pieces amber */}
        <line x1={P.x} y1={P.y} x2={S.x} y2={S.y} strokeWidth={3} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={P.x} y1={P.y} x2={T.x} y2={T.y} strokeWidth={3} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={S.x} y1={S.y} x2={Q.x} y2={Q.y} strokeWidth={3} className="stroke-amber-500 dark:stroke-amber-400" />
        <line x1={T.x} y1={T.y} x2={R.x} y2={R.y} strokeWidth={3} className="stroke-amber-500 dark:stroke-amber-400" />
        <line x1={S.x} y1={S.y} x2={T.x} y2={T.y} strokeWidth={2.4} className="stroke-rose-600 dark:stroke-rose-400" />

        {[
          { p: P, name: "P", dx: 0, dy: -7 },
          { p: Q, name: "Q", dx: -8, dy: 12 },
          { p: R, name: "R", dx: 8, dy: 12 },
          { p: S, name: "S", dx: -10, dy: 2 },
          { p: T, name: "T", dx: 10, dy: 2 },
        ].map(({ p, name, dx, dy }) => (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r={2.4} className="fill-foreground" />
            <text x={p.x + dx} y={p.y + dy} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {name}
            </text>
          </g>
        ))}

        <text x={mPS.x - 8} y={mPS.y + 2} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {fmt(ps)}
        </text>
        <text x={mSQ.x - 8} y={mSQ.y + 2} textAnchor="end" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          {fmt(sq)}
        </text>
        <text x={mPT.x + 8} y={mPT.y + 2} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {fmt(pt)}
        </text>
        <text x={mTR.x + 8} y={mTR.y + 2} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          {fmt(tr)}
        </text>
        <text x={r2((S.x + T.x) / 2)} y={r2(S.y - 5)} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          ST ∥ QR
        </text>
        <text x={160} y={207} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          PQ = 14 cm, PR = 21 cm (lengths in cm, not to scale)
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          PS: <span className="tabular-nums">{fmt(ps)} cm</span>
        </span>
        <input
          type="range"
          min={PS_RANGE.min}
          max={PS_RANGE.max}
          step={PS_RANGE.step}
          value={ps}
          onChange={(e) => setPs(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Length PS in centimetres, out of PQ = 14"
        />
      </label>

      <div className="mt-2 space-y-1 text-sm">
        <p className="font-medium text-foreground tabular-nums">
          PS : SQ = {fmt(ps)} : {fmt(sq)} and PT : TR = {fmt(pt)} : {fmt(tr)}, both {ra} : {rb}
        </p>
        <p className="text-muted-foreground tabular-nums">
          PT = {fmt(ps)}/14 × 21 = {fmt(pt)} cm. ST : QR = PS : PQ = {wa} : {wb}, not PS : SQ.
        </p>
        {mid ? <p className="font-medium text-rose-700 dark:text-rose-300">S and T are the midpoints: ST is half of QR.</p> : null}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        ST is parallel to QR, so the small triangle PST is a scaled copy of PQR and both sides are cut in the same ratio. With PS = 4 cm
        and SQ = 10 cm, PT = 4/14 × 21 = 6 cm and TR = 15 cm: 4 : 10 = 6 : 15. At PS = 7 cm the ratio is 1 : 1, the midpoint case.
      </p>
    </div>
  );
}
