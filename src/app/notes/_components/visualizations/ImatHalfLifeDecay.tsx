"use client";

import { useState } from "react";

/**
 * Interactive: radioactive decay of the concept's worked example, 80 g of an
 * isotope with a half-life of 5 days. N = N₀ × (½)^(t / T½). Dashed guides
 * mark 1, 2, 3 and 4 half-lives (40, 20, 10, 5 g: 50%, 25%, 12.5%, 6.25%).
 * A slider sets the time in days; the point and the live numbers follow it.
 * The first render is the worked example's answer: 20 days, 4 half-lives,
 * 5 g left.
 *
 * Pedagogical aim: each half-life halves what is LEFT, so the curve never
 * reaches zero (the concept's trap: two half-lives leave a quarter, not
 * nothing). Pinned by tests/notes-imat-visuals-chem1.test.ts.
 */

export const DECAY = { n0: 80, halfLife: 5, example: 20 } as const;

/** Grams left after t days. */
export function amountLeft(t: number): number {
  return DECAY.n0 * 0.5 ** (t / DECAY.halfLife);
}

/** Slider range for the time, in days. */
export const T_RANGE = { min: 0, max: 25, step: 1 } as const;

/** The four guide points: after 1, 2, 3, 4 half-lives. */
export const GUIDES = [1, 2, 3, 4].map((k) => ({
  halfLives: k,
  t: k * DECAY.halfLife,
  grams: amountLeft(k * DECAY.halfLife),
  percent: 100 * 0.5 ** k,
}));

const W = 320;
const H = 200;
const PL = 40;
const PR = 304;
const PT = 14;
const PB = 164;
const Y_MAX = 80;

const xOf = (t: number) => PL + (t / T_RANGE.max) * (PR - PL);
const yOf = (g: number) => PB - (g / Y_MAX) * (PB - PT);
const r1 = (n: number) => Math.round(n * 10) / 10;
const AXIS = "text-muted-foreground/60";

/** Format a gram value: whole numbers plainly, others to 1 decimal place. */
export const grams = (g: number) => (Math.abs(g - Math.round(g)) < 0.005 ? String(Math.round(g)) : g.toFixed(1));

export default function ImatHalfLifeDecay() {
  const [t, setT] = useState<number>(DECAY.example);
  const n = amountLeft(t);
  const k = t / DECAY.halfLife;
  const path: string[] = [];
  for (let d = 0; d <= T_RANGE.max * 4; d++) {
    const tt = d / 4;
    path.push(`${d === 0 ? "M" : "L"}${r1(xOf(tt))},${r1(yOf(amountLeft(tt)))}`);
  }
  const x = r1(xOf(t));
  const y = r1(yOf(n));

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · half-life: halving what is left
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Mass of a radioactive isotope against time, starting at 80 grams with a half-life of 5 days: 40 grams after 5 days, 20 after 10, 10 after 15, 5 after 20. The curve keeps halving and never reaches zero. Marked: ${t} days, ${grams(n)} grams left.`}
      >
        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="currentColor" className={AXIS} />
        {[0, 20, 40, 60, 80].map((g) => (
          <g key={`g${g}`}>
            <line x1={PL - 3} y1={yOf(g)} x2={PL} y2={yOf(g)} stroke="currentColor" className={AXIS} />
            <text x={PL - 5} y={yOf(g) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {g}
            </text>
          </g>
        ))}
        {[0, 5, 10, 15, 20, 25].map((d) => (
          <g key={`d${d}`}>
            <line x1={xOf(d)} y1={PB} x2={xOf(d)} y2={PB + 3} stroke="currentColor" className={AXIS} />
            <text x={xOf(d)} y={PB + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {d}
            </text>
          </g>
        ))}
        <text x={(PL + PR) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          time (days)
        </text>
        <text x={10} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 10 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[10px]">
          isotope left (g)
        </text>

        {/* Half-life guides */}
        {GUIDES.map((g) => (
          <g key={g.halfLives}>
            <line x1={xOf(g.t)} y1={PB} x2={xOf(g.t)} y2={yOf(g.grams)} strokeDasharray="3 3" className="stroke-amber-600 dark:stroke-amber-400" />
            <line x1={PL} y1={yOf(g.grams)} x2={xOf(g.t)} y2={yOf(g.grams)} strokeDasharray="3 3" className="stroke-amber-600/70 dark:stroke-amber-400/70" />
            <circle cx={xOf(g.t)} cy={yOf(g.grams)} r={3} className="fill-amber-500 dark:fill-amber-400" />
            <text x={xOf(g.t) + 4} y={yOf(g.grams) - 5} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
              {g.halfLives}
            </text>
          </g>
        ))}

        {/* Key to the guides */}
        <text x={PR} y={PT + 8} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          half-lives passed (5 days each)
        </text>
        {GUIDES.map((g, i) => (
          <text key={`k${g.halfLives}`} x={PR} y={PT + 22 + i * 12} textAnchor="end" className="fill-foreground text-[10px] tabular-nums">
            {g.halfLives}: {grams(g.grams)} g, {g.percent}% left
          </text>
        ))}

        {/* The curve */}
        <path d={path.join(" ")} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={2} />
        <text x={xOf(0) + 6} y={yOf(80) + 4} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          80 g at the start
        </text>

        {/* Moving point */}
        <line x1={x} y1={y} x2={x} y2={PB} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={1} />
        <circle cx={x} cy={y} r={5} className="fill-sky-600 stroke-background dark:fill-sky-400" strokeWidth={1.5} />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Time: <span className="tabular-nums">{t} days</span>
        </span>
        <input
          type="range"
          min={T_RANGE.min}
          max={T_RANGE.max}
          step={T_RANGE.step}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Time elapsed in days"
        />
      </label>

      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          <span className="tabular-nums">{grams(n)}</span> g left
        </span>
        <span className="text-muted-foreground">
          t / T½ = <span className="tabular-nums">{Number.isInteger(k) ? k : k.toFixed(1)}</span> half-lives
        </span>
        <span className="text-muted-foreground">
          N = 80 × (½)<sup className="tabular-nums">{Number.isInteger(k) ? k : k.toFixed(1)}</sup>
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        80 g with a half-life of 5 days. In 20 days there are 20 / 5 = 4 half-lives: 80 → 40 → 20 → 10 → 5 g, the same
        as 80 × (½)⁴ = 80 / 16 = 5 g. Each half-life halves what is left, so the sample never runs out in a fixed time.
      </p>
    </div>
  );
}
