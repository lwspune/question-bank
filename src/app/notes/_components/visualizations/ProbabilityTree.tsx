"use client";

import { useState } from "react";

/**
 * Interactive: a two-route probability tree (partition B1 / B2, then the
 * event A on each branch). Branch products, the total probability of A, and
 * the Bayes posterior P(B1 | A) all update live.
 *
 * Pedagogical aim: total probability is the SUM of the leaf products that
 * end in A; Bayes is one of those leaves divided by that sum.
 */

const W = 360;
const H = 230;
const round2 = (x: number) => Math.round(x * 100) / 100;
const round3 = (x: number) => Math.round(x * 1000) / 1000;

export default function ProbabilityTree() {
  const [pb1, setPb1] = useState(0.6);
  const [paGivenB1, setPaGivenB1] = useState(0.2);
  const [paGivenB2, setPaGivenB2] = useState(0.5);

  const pb2 = round2(1 - pb1);
  const leafA1 = round3(pb1 * paGivenB1);
  const leafA2 = round3(pb2 * paGivenB2);
  const totalA = round3(leafA1 + leafA2);
  const bayes = totalA === 0 ? 0 : round3(leafA1 / totalA);

  // node coords
  const root: [number, number] = [16, 115];
  const b1: [number, number] = [150, 56];
  const b2: [number, number] = [150, 174];
  const a1: [number, number] = [292, 30];
  const a2: [number, number] = [292, 150];

  const edge = (from: [number, number], to: [number, number], cls: string) => (
    <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="currentColor" className={cls} strokeWidth={1.5} />
  );

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · total probability &amp; Bayes tree
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto max-w-[400px] mx-auto"
        role="img"
        aria-label="Two-route probability tree for total probability and Bayes' theorem"
      >
        {/* edges to routes */}
        {edge(root, b1, "text-sky-600 dark:text-sky-400")}
        {edge(root, b2, "text-sky-600 dark:text-sky-400")}
        {/* edges to A on each route (highlighted) */}
        {edge(b1, a1, "text-indigo-600 dark:text-indigo-400")}
        {edge(b2, a2, "text-indigo-600 dark:text-indigo-400")}
        {/* faded "not A" stubs */}
        {edge(b1, [292, 82], "text-muted-foreground/40")}
        {edge(b2, [292, 202], "text-muted-foreground/40")}

        {/* edge labels */}
        <text x={70} y={78} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[10px]">P(B₁)={pb1}</text>
        <text x={70} y={158} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[10px]">P(B₂)={pb2}</text>
        <text x={228} y={36} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[10px]">P(A|B₁)={paGivenB1}</text>
        <text x={228} y={156} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[10px]">P(A|B₂)={paGivenB2}</text>

        {/* nodes */}
        <circle cx={root[0]} cy={root[1]} r={5} className="fill-foreground" />
        <circle cx={b1[0]} cy={b1[1]} r={5} className="fill-sky-600 dark:fill-sky-400" />
        <circle cx={b2[0]} cy={b2[1]} r={5} className="fill-sky-600 dark:fill-sky-400" />
        <text x={b1[0] - 10} y={b1[1] + 3} textAnchor="end" className="fill-sky-700 dark:fill-sky-300 text-[11px] font-semibold">B₁</text>
        <text x={b2[0] - 10} y={b2[1] + 3} textAnchor="end" className="fill-sky-700 dark:fill-sky-300 text-[11px] font-semibold">B₂</text>

        {/* A leaves with products */}
        <text x={a1[0] + 8} y={a1[1] + 3} textAnchor="start" className="fill-foreground text-[10px] font-semibold">A: <tspan className="fill-indigo-700 dark:fill-indigo-300 tabular-nums">{leafA1}</tspan></text>
        <text x={a2[0] + 8} y={a2[1] + 3} textAnchor="start" className="fill-foreground text-[10px] font-semibold">A: <tspan className="fill-indigo-700 dark:fill-indigo-300 tabular-nums">{leafA2}</tspan></text>
        <text x={300} y={85} textAnchor="start" className="fill-muted-foreground text-[10px]">not A</text>
        <text x={300} y={205} textAnchor="start" className="fill-muted-foreground text-[10px]">not A</text>
      </svg>

      <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
        {([
          ["P(B₁)", pb1, setPb1, "accent-sky-600"],
          ["P(A|B₁)", paGivenB1, setPaGivenB1, "accent-indigo-600"],
          ["P(A|B₂)", paGivenB2, setPaGivenB2, "accent-indigo-600"],
        ] as const).map(([label, val, setter, accent]) => (
          <label key={label} className="flex flex-col gap-1">
            <span className="font-medium text-foreground">
              {label}: <span className="tabular-nums">{round2(val)}</span>
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
          P(A) = {leafA1} + {leafA2} = <span className="tabular-nums">{totalA}</span>
        </span>
        <span className="text-muted-foreground">
          P(B₁|A) = {leafA1}/{totalA} = <span className="tabular-nums">{bayes}</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Each leaf is a route product P(Bᵢ)·P(A|Bᵢ). Total probability adds the
        two leaves that end in A; Bayes&apos; theorem divides one of those
        leaves by that total to flip the conditioning.
      </p>
    </div>
  );
}
