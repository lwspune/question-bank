"use client";

import { useState } from "react";

/**
 * Interactive: two overlapping events A and B inside the sample space.
 * Sliders set P(A), P(B) and the overlap P(A∩B); the four region
 * probabilities and P(A∪B) update live. The overlap is clamped to its
 * Fréchet-feasible range so the numbers stay consistent.
 *
 * Pedagogical aim: see the addition rule as "don't double-count the lens",
 * and watch P(neither) = 1 − P(A∪B) fill the outside.
 */

const W = 320;
const H = 180;

const round2 = (x: number) => Math.round(x * 100) / 100;

export default function VennTwoEvents() {
  const [pa, setPa] = useState(0.5);
  const [pb, setPb] = useState(0.4);
  const [rawPab, setRawPab] = useState(0.2);

  // Feasible overlap range (Fréchet bounds).
  const lo = Math.max(0, pa + pb - 1);
  const hi = Math.min(pa, pb);
  const pab = round2(Math.min(hi, Math.max(lo, rawPab)));
  const clamped = round2(rawPab) !== pab;

  const aOnly = round2(pa - pab);
  const bOnly = round2(pb - pab);
  const union = round2(pa + pb - pab);
  const neither = round2(1 - union);
  const exactlyOne = round2(aOnly + bOnly);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · two events in the sample space
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto max-w-[360px] mx-auto"
        role="img"
        aria-label="Venn diagram of two overlapping events inside the sample space"
      >
        {/* Sample space */}
        <rect x={4} y={4} width={W - 8} height={H - 8} rx={6} className="fill-muted/30 stroke-border" strokeWidth={1} />
        <text x={W - 12} y={H - 12} textAnchor="end" className="fill-muted-foreground text-[10px]">S</text>

        {/* Circle A */}
        <circle cx={132} cy={88} r={66} className="fill-sky-500/25 stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        {/* Circle B */}
        <circle cx={196} cy={88} r={66} className="fill-amber-500/25 stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />

        <text x={86} y={34} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">A</text>
        <text x={244} y={34} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">B</text>

        {/* Region probabilities */}
        <text x={96} y={92} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">{aOnly}</text>
        <text x={164} y={92} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">{pab}</text>
        <text x={232} y={92} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">{bOnly}</text>
        <text x={28} y={28} textAnchor="middle" className="fill-muted-foreground text-[11px] font-semibold tabular-nums">{neither}</text>
      </svg>

      <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
        {([
          ["P(A)", pa, setPa, "accent-sky-600"],
          ["P(B)", pb, setPb, "accent-amber-600"],
          ["P(A∩B)", rawPab, setRawPab, "accent-indigo-600"],
        ] as const).map(([label, val, setter, accent]) => (
          <label key={label} className="flex flex-col gap-1">
            <span className="font-medium text-foreground">
              {label}: <span className="tabular-nums">{label === "P(A∩B)" ? pab : round2(val)}</span>
              {label === "P(A∩B)" && clamped && (
                <span className="ml-1 text-indigo-600 dark:text-indigo-400">(bounded)</span>
              )}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={val}
              onChange={(e) => setter(Number(e.target.value))}
              className={accent}
              aria-label={label}
            />
          </label>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          P(A∪B) = <span className="tabular-nums">{union}</span>
        </span>
        <span className="text-muted-foreground">
          neither = <span className="tabular-nums">{neither}</span>
        </span>
        <span className="text-muted-foreground">
          exactly one = <span className="tabular-nums">{exactlyOne}</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        P(A∪B) = P(A) + P(B) − P(A∩B): the lens is counted once, not twice.
        &quot;Neither&quot; is everything outside both circles, 1 − P(A∪B). The
        overlap is held inside its feasible range, so it never claims more than
        the smaller event or less than the forced minimum.
      </p>
    </div>
  );
}
