"use client";

import { useState } from "react";

/**
 * Interactive: supply and demand, as the IMAT concept "Supply, demand and
 * market prices" states them. A downward demand line and an upward supply
 * line; where they cross is the equilibrium price and quantity. Two sliders
 * shift demand and supply left or right, and the new equilibrium is worked out
 * exactly (straight lines, so the crossing is a simple formula).
 *
 * Model, in plain units (the concept gives no numbers, so none are claimed):
 *   demand  Qd = 10 − P + d   (d > 0: demand rises, the line moves right)
 *   supply  Qs = P − 2 + s    (s > 0: supply rises, the line moves right)
 *   Qd = Qs  →  P = (12 + d − s) / 2,  Q = (8 + d + s) / 2
 * With no shift: P = 6, Q = 4.
 *
 * The first render is the concept's own self-check: a late frost cuts the
 * grape harvest (supply falls, demand unchanged), so the price rises and the
 * quantity sold falls. Directions pinned against the concept's table by
 * tests/notes-imat-visuals-reading.test.ts.
 */

/** Slider range for each shift, in quantity units. */
export const SHIFT_RANGE = { min: -2, max: 2, step: 1 } as const;

/** Axis ranges (quantity across, price up). */
export const AXES = { q: 10, p: 12 } as const;

/** The first render: the frost example (supply falls by 2, demand unchanged). */
export const FROST = { d: 0, s: -2 } as const;

export type Point = { q: number; p: number };

/** Equilibrium price and quantity for a demand shift d and supply shift s. */
export function equilibrium(d: number, s: number): Point {
  return { p: (12 + d - s) / 2, q: (8 + d + s) / 2 };
}

/** Demand line P = 10 + d − Q, clipped to the axes. Two end points. */
export function demandSegment(d: number): [Point, Point] {
  const qEnd = Math.min(AXES.q, 10 + d);
  return [
    { q: 0, p: 10 + d },
    { q: qEnd, p: 10 + d - qEnd },
  ];
}

/** Supply line P = Q + 2 − s, clipped to the axes. Two end points. */
export function supplySegment(s: number): [Point, Point] {
  const qEnd = Math.min(AXES.q, 10 + s);
  return [
    { q: 0, p: 2 - s },
    { q: qEnd, p: qEnd + 2 - s },
  ];
}

type Move = "rises" | "falls" | "stays the same";
const moveOf = (delta: number): Move => (delta > 0 ? "rises" : delta < 0 ? "falls" : "stays the same");

/** What happened to price and quantity, in the concept's words. */
export function outcome(d: number, s: number): { price: Move; quantity: Move; sentence: string } {
  const before = equilibrium(0, 0);
  const after = equilibrium(d, s);
  const price = moveOf(after.p - before.p);
  const quantity = moveOf(after.q - before.q);
  const causes: string[] = [];
  if (d !== 0) causes.push(`demand ${d > 0 ? "rises" : "falls"}`);
  if (s !== 0) causes.push(`supply ${s > 0 ? "rises" : "falls"}`);
  if (causes.length === 0) return { price, quantity, sentence: "No change: the market stays at its equilibrium." };
  const cause = causes.join(" and ");
  const head = cause.charAt(0).toUpperCase() + cause.slice(1);
  let effect: string;
  if (price === quantity && price !== "stays the same") {
    effect = `price and quantity both ${price === "rises" ? "rise" : "fall"}`;
  } else {
    effect = `price ${price}, quantity ${quantity}`;
  }
  return { price, quantity, sentence: `${head}: ${effect}.` };
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function shiftWords(v: number): string {
  if (v === 0) return "unchanged";
  return `${v > 0 ? "rises" : "falls"} (moved ${v > 0 ? "right" : "left"} ${Math.abs(v)})`;
}

// Plot geometry (viewBox units).
const W = 320;
const H = 210;
const PL = 40;
const PR = 306;
const PT = 14;
const PB = 176;

const xOf = (q: number) => Math.round((PL + (q / AXES.q) * (PR - PL)) * 100) / 100;
const yOf = (p: number) => Math.round((PB - (p / AXES.p) * (PB - PT)) * 100) / 100;

const AXIS = "text-muted-foreground/60";
const DEMAND = "stroke-sky-600 dark:stroke-sky-400";
const SUPPLY = "stroke-amber-600 dark:stroke-amber-400";

function Seg({ seg, className, dashed }: { seg: [Point, Point]; className: string; dashed?: boolean }) {
  return (
    <line
      x1={xOf(seg[0].q)}
      y1={yOf(seg[0].p)}
      x2={xOf(seg[1].q)}
      y2={yOf(seg[1].p)}
      strokeWidth={dashed ? 1.5 : 2.5}
      strokeDasharray={dashed ? "4 4" : undefined}
      className={dashed ? `${className} opacity-50` : className}
    />
  );
}

export default function ImatSupplyDemand() {
  const [d, setD] = useState<number>(FROST.d);
  const [s, setS] = useState<number>(FROST.s);
  const before = equilibrium(0, 0);
  const now = equilibrium(d, s);
  const result = outcome(d, s);
  const changed = d !== 0 || s !== 0;
  const dSeg = demandSegment(d);
  const sSeg = supplySegment(s);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · Supply, demand and the equilibrium
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Price against quantity: a downward demand line and an upward supply line. Before any change they cross at price ${fmt(before.p)}, quantity ${fmt(before.q)}. Now demand is ${shiftWords(d)} and supply is ${shiftWords(s)}, so they cross at price ${fmt(now.p)}, quantity ${fmt(now.q)}. ${result.sentence}`}
      >
        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="currentColor" className={AXIS} />
        {[0, 2, 4, 6, 8, 10, 12].map((t) => (
          <g key={`p${t}`}>
            <line x1={PL - 3} y1={yOf(t)} x2={PL} y2={yOf(t)} stroke="currentColor" className={AXIS} />
            <text x={PL - 6} y={yOf(t) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <g key={`q${t}`}>
            <line x1={xOf(t)} y1={PB} x2={xOf(t)} y2={PB + 3} stroke="currentColor" className={AXIS} />
            <text x={xOf(t)} y={PB + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        <text x={(PL + PR) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          quantity
        </text>
        <text x={10} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 10 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[10px]">
          price
        </text>

        {/* Before the change: dashed */}
        {d !== 0 && <Seg seg={demandSegment(0)} className={DEMAND} dashed />}
        {s !== 0 && <Seg seg={supplySegment(0)} className={SUPPLY} dashed />}

        {/* Now */}
        <Seg seg={dSeg} className={DEMAND} />
        <Seg seg={sSeg} className={SUPPLY} />
        <text x={xOf(dSeg[0].q) + 8} y={yOf(dSeg[0].p) - 4} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          demand
        </text>
        <text x={xOf(sSeg[1].q) - 20} y={yOf(sSeg[1].p) + 2} textAnchor="end" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          supply
        </text>

        {/* Equilibrium guides to the axes */}
        <line x1={PL} y1={yOf(now.p)} x2={xOf(now.q)} y2={yOf(now.p)} strokeDasharray="2 3" stroke="currentColor" className={AXIS} />
        <line x1={xOf(now.q)} y1={yOf(now.p)} x2={xOf(now.q)} y2={PB} strokeDasharray="2 3" stroke="currentColor" className={AXIS} />

        {changed && (
          <circle cx={xOf(before.q)} cy={yOf(before.p)} r={4} strokeWidth={1.5} className="fill-background stroke-muted-foreground" />
        )}
        <circle cx={xOf(now.q)} cy={yOf(now.p)} r={5} strokeWidth={1.5} className="fill-indigo-600 stroke-background dark:fill-indigo-400" />
        <text x={xOf(now.q) + 12} y={yOf(now.p) + 2} className="fill-foreground text-[11px] font-semibold tabular-nums">
          equilibrium
        </text>
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Demand: <span className="tabular-nums">{shiftWords(d)}</span>
        </span>
        <input
          type="range"
          min={SHIFT_RANGE.min}
          max={SHIFT_RANGE.max}
          step={SHIFT_RANGE.step}
          value={d}
          onChange={(e) => setD(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="Shift demand: left means demand falls, right means demand rises"
        />
      </label>
      <label className="mt-2 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Supply: <span className="tabular-nums">{shiftWords(s)}</span>
        </span>
        <input
          type="range"
          min={SHIFT_RANGE.min}
          max={SHIFT_RANGE.max}
          step={SHIFT_RANGE.step}
          value={s}
          onChange={(e) => setS(Number(e.target.value))}
          className="accent-amber-600"
          aria-label="Shift supply: left means supply falls, right means supply rises"
        />
      </label>

      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          Price: <span className="tabular-nums">{fmt(before.p)} → {fmt(now.p)}</span>
        </span>
        <span className="font-medium text-foreground">
          Quantity: <span className="tabular-nums">{fmt(before.q)} → {fmt(now.q)}</span>
        </span>
      </div>
      <p className="mt-1 text-sm text-foreground">{result.sentence}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Dashed lines and hollow dot: before the change. Solid lines and filled dot: after.
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        It starts on the frost example: a bad harvest cuts supply while demand is unchanged, so the price rises and the
        quantity sold falls. Move the sliders: more demand raises price and quantity, more supply lowers the price but
        raises the quantity.
      </p>
    </div>
  );
}
