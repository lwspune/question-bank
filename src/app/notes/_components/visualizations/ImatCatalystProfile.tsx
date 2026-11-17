"use client";

import { useState } from "react";
import { profilePath, signed } from "./ImatEnergyProfile";

/**
 * Interactive: one exothermic energy profile with and without a catalyst.
 * The uncatalysed numbers are the energy-profile worked example (reactants 0,
 * peak +120, products -80 kJ/mol). The catalysed route is an illustration:
 * its peak is drawn at +60, so Ea falls from 120 to 60 kJ/mol, and the
 * reverse barrier falls by the same 60 (200 to 140).
 *
 * The concept's trap is built in: the reactant and product levels are ONE
 * shared pair of lines, so ΔH (-80) is the same with or without the catalyst.
 * Only the peak moves. Toggle buttons (aria-pressed); the first render shows
 * both routes, the most complete picture. Pinned by
 * tests/notes-imat-visuals-chem1.test.ts.
 */

export const LEVELS = { reactants: 0, products: -80 } as const;
export const PEAKS = { uncatalysed: 120, catalysed: 60 } as const;

export type Route = keyof typeof PEAKS;

/** The numbers the figure prints for a route. */
export function routeNumbers(route: Route) {
  const peak = PEAKS[route];
  return {
    ea: peak - LEVELS.reactants,
    eaReverse: peak - LEVELS.products,
    deltaH: LEVELS.products - LEVELS.reactants,
  };
}

const W = 320;
const H = 200;
const PL = 40;
const PR = 312;
const PT = 26;
const PB = 176;
const LO = -110;
const HI = 130;
const yOf = (e: number) => Math.round((PB - ((e - LO) / (HI - LO)) * (PB - PT)) * 10) / 10;
const AXIS = "text-muted-foreground/60";

function Arrow({ x, y1, y2, cls }: { x: number; y1: number; y2: number; cls: string }) {
  const dir = y2 > y1 ? 1 : -1;
  return (
    <g className={cls}>
      <line x1={x} y1={y1} x2={x} y2={y2 - dir * 5} stroke="currentColor" strokeWidth={1.5} />
      <path d={`M${x - 3.5},${y2 - dir * 6} L${x},${y2} L${x + 3.5},${y2 - dir * 6} Z`} fill="currentColor" />
    </g>
  );
}

export default function ImatCatalystProfile() {
  const [withCatalyst, setWithCatalyst] = useState(true);
  const route: Route = withCatalyst ? "catalysed" : "uncatalysed";
  const n = routeNumbers(route);
  const yR = yOf(LEVELS.reactants);
  const yP = yOf(LEVELS.products);
  const yHi = yOf(PEAKS.uncatalysed);
  const yLo = yOf(PEAKS.catalysed);
  const pk = (PL + 6 + PR - 6) / 2;
  const eaX = PL + 22;
  const yPeak = withCatalyst ? yLo : yHi;
  const dhX = PR - 30;

  const button = (on: boolean, label: string, value: boolean) => (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setWithCatalyst(value)}
      className={`rounded-md border px-3 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        on
          ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-600"
          : "border-border bg-background text-foreground hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · what a catalyst changes, and what it does not
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Energy profile of an exothermic reaction: reactants at 0, products at minus 80 kilojoules per mole. Without a catalyst the peak is at 120, so Ea is 120. ${
          withCatalyst ? "With a catalyst a second, lower route peaks at 60, so Ea is 60. " : ""
        }The reactant and product levels, and delta H of minus 80, are the same either way.`}
      >
        {/* Axes */}
        <line x1={PL} y1={PT - 10} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="currentColor" className={AXIS} />
        {[-80, 0, 60, 120].map((t) => (
          <g key={t}>
            <line x1={PL - 3} y1={yOf(t)} x2={PL} y2={yOf(t)} stroke="currentColor" className={AXIS} />
            <text x={PL - 5} y={yOf(t) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t < 0 ? signed(t) : t}
            </text>
          </g>
        ))}
        <text x={10} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 10 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[10px]">
          energy (kJ/mol)
        </text>
        <text x={(PL + PR) / 2} y={PB + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          progress of reaction
        </text>

        {/* Key */}
        <line x1={206} y1={12} x2={226} y2={12} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth={1.6} strokeDasharray="5 3" />
        <text x={230} y={15.5} className="fill-muted-foreground text-[10px]">
          without catalyst
        </text>
        <line x1={206} y1={26} x2={226} y2={26} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth={2.2} style={{ opacity: withCatalyst ? 1 : 0.3 }} />
        <text x={230} y={29.5} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300" style={{ opacity: withCatalyst ? 1 : 0.4 }}>
          with catalyst
        </text>

        {/* Shared levels */}
        <line x1={PL + 52} y1={yR} x2={PR - 4} y2={yR} strokeDasharray="3 3" stroke="currentColor" className={AXIS} />
        <text x={PL + 8} y={yR + 13} className="fill-foreground text-[10px] font-semibold">
          reactants
        </text>
        <text x={PR - 8} y={yP + 13} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          products
        </text>

        {/* Uncatalysed route */}
        <path
          d={profilePath(yR, yHi, yP)}
          fill="none"
          className={withCatalyst ? "stroke-slate-400 dark:stroke-slate-500" : "stroke-indigo-600 dark:stroke-indigo-400"}
          strokeWidth={withCatalyst ? 1.6 : 2.2}
          strokeDasharray={withCatalyst ? "5 3" : undefined}
        />

        {/* Catalysed route */}
        {withCatalyst && (
          <>
            <path d={profilePath(yR, yLo, yP)} fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth={2.2} />
          </>
        )}

        {/* Ea of the chosen route */}
        <line x1={eaX - 6} y1={yPeak} x2={pk} y2={yPeak} strokeDasharray="3 3" stroke="currentColor" className={AXIS} />
        <Arrow x={eaX} y1={yR} y2={yPeak} cls="text-rose-600 dark:text-rose-400" />
        <text x={eaX + 5} y={(yR + yPeak) / 2 + 3} className="fill-rose-700 text-[10px] font-semibold tabular-nums dark:fill-rose-300">
          Ea = {n.ea}
        </text>

        {/* ΔH: the same either way */}
        <Arrow x={dhX} y1={yR} y2={yP} cls="text-amber-600 dark:text-amber-400" />
        <text x={dhX - 5} y={(yR + yP) / 2 + 3} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          ΔH = {signed(n.deltaH)}
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Show the reaction with or without a catalyst">
        {button(!withCatalyst, "Without catalyst", false)}
        {button(withCatalyst, "With catalyst", true)}
      </div>

      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          Ea = <span className="tabular-nums">{n.ea}</span> kJ/mol
        </span>
        <span className="text-muted-foreground">
          reverse Ea = <span className="tabular-nums">{n.eaReverse}</span> kJ/mol
        </span>
        <span className="text-muted-foreground">
          ΔH = <span className="tabular-nums">{signed(n.deltaH)}</span> kJ/mol (unchanged)
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        The catalyst gives a different route with a lower peak, so Ea falls (here from 120 to 60 kJ/mol) and the
        reverse barrier falls by the same amount (200 to 140). The reactants and products are the same two levels, so
        ΔH stays −80 kJ/mol, and the yield and K do not change: equilibrium is only reached sooner. The catalysed peak
        of 60 is an example value.
      </p>
    </div>
  );
}
