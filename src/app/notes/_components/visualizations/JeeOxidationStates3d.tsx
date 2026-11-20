/**
 * Static figure: the oxidation states of the 3d metals, Sc to Zn (concept
 * jcdfb-ox-states), one dot per state from the concept's table:
 *   Sc +3; Ti +2 to +4; V +2 to +5; Cr +2 to +6; Mn +2 to +7;
 *   Fe +2, +3 (+4 and +6 rare, drawn hollow); Co +2 to +4; Ni +2 to +4;
 *   Cu +1, +2; Zn +2.
 * A line joins the highest state of each metal: it climbs with the group
 * number from Ti (+4) to Mn (+7) and falls after Mn. Mn has the most states
 * (six), and the two ends, Sc and Zn, have one each. Pinned by
 * tests/notes-w2-15.test.ts. Server component.
 */

export type Metal = { symbol: string; group: number; states: readonly number[]; rare?: readonly number[] };

export const METALS: readonly Metal[] = [
  { symbol: "Sc", group: 3, states: [3] },
  { symbol: "Ti", group: 4, states: [2, 3, 4] },
  { symbol: "V", group: 5, states: [2, 3, 4, 5] },
  { symbol: "Cr", group: 6, states: [2, 3, 4, 5, 6] },
  { symbol: "Mn", group: 7, states: [2, 3, 4, 5, 6, 7] },
  { symbol: "Fe", group: 8, states: [2, 3], rare: [4, 6] },
  { symbol: "Co", group: 9, states: [2, 3, 4] },
  { symbol: "Ni", group: 10, states: [2, 3, 4] },
  { symbol: "Cu", group: 11, states: [1, 2] },
  { symbol: "Zn", group: 12, states: [2] },
];

/** Every state a metal shows, common and rare. */
export function allStates(m: Metal): number[] {
  return [...m.states, ...(m.rare ?? [])].sort((a, b) => a - b);
}

/** The highest state each metal reaches. */
export function highestState(m: Metal): number {
  return Math.max(...allStates(m));
}

/** The metal with the most states. */
export function mostStates(): Metal {
  return METALS.reduce((best, m) => (allStates(m).length > allStates(best).length ? m : best));
}

// Geometry.
export const X0 = 54;
export const DX = 27;
export const Y_PLUS1 = 186;
export const DY = 21;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const colX = (i: number) => r2(X0 + i * DX);
export const stateY = (s: number) => r2(Y_PLUS1 - (s - 1) * DY);

export default function JeeOxidationStates3d() {
  const topLine = METALS.map((m, i) => `${colX(i)},${stateY(highestState(m))}`).join(" ");
  const mn = METALS.findIndex((m) => m.symbol === "Mn");
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · oxidation states across the 3d series
      </p>
      <svg
        viewBox="0 0 320 244"
        className="block h-auto w-full"
        role="img"
        aria-label="Dot chart of oxidation states for Sc to Zn. Sc plus 3 only. Ti plus 2 to plus 4, V plus 2 to plus 5, Cr plus 2 to plus 6, Mn plus 2 to plus 7, the most states. Fe plus 2 and plus 3, with rare plus 4 and plus 6. Co and Ni plus 2 to plus 4, Cu plus 1 and plus 2, Zn plus 2 only. A line through the highest states rises to Mn and then falls."
      >
        {/* Grid rows */}
        {[1, 2, 3, 4, 5, 6, 7].map((s) => (
          <g key={s}>
            <line x1={X0 - 12} y1={stateY(s)} x2={colX(9) + 12} y2={stateY(s)} className="stroke-border" />
            <text x={X0 - 16} y={stateY(s) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              +{s}
            </text>
          </g>
        ))}

        {/* Highest-state line */}
        <polyline points={topLine} fill="none" strokeWidth={1.6} strokeDasharray="4 3" className="stroke-indigo-500 dark:stroke-indigo-400" />

        {/* Dots */}
        {METALS.map((m, i) => (
          <g key={m.symbol}>
            {m.states.map((s) => (
              <circle key={s} cx={colX(i)} cy={stateY(s)} r={5.5} className="fill-indigo-600 dark:fill-indigo-400" />
            ))}
            {(m.rare ?? []).map((s) => (
              <circle key={s} cx={colX(i)} cy={stateY(s)} r={4.8} strokeWidth={1.6} className="fill-background stroke-indigo-600 dark:stroke-indigo-400" />
            ))}
            <text x={colX(i)} y={Y_PLUS1 + 20} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {m.symbol}
            </text>
          </g>
        ))}

        {/* Notes on the chart */}
        <text x={colX(mn)} y={stateY(7) - 11} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          Mn: +7, six states
        </text>
        <text x={colX(1) + 4} y={stateY(6) - 2} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          climbs with
        </text>
        <text x={colX(1) + 4} y={stateY(6) + 9} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          group number
        </text>
        <text x={colX(8)} y={stateY(5) + 3} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          falls after Mn
        </text>
        {[0, 9].map((i) => (
          <text key={i} x={colX(i)} y={Y_PLUS1 + 31} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            one state
          </text>
        ))}

        {/* Legend */}
        <circle cx={X0} cy={234} r={4.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={X0 + 9} y={237.5} className="fill-muted-foreground text-[10px]">
          state shown
        </text>
        <circle cx={X0 + 92} cy={234} r={4} strokeWidth={1.6} className="fill-background stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={X0 + 101} y={237.5} className="fill-muted-foreground text-[10px]">
          rare (Fe)
        </text>
        <line x1={X0 + 168} y1={234} x2={X0 + 186} y2={234} strokeWidth={1.6} strokeDasharray="4 3" className="stroke-indigo-500 dark:stroke-indigo-400" />
        <text x={X0 + 191} y={237.5} className="fill-muted-foreground text-[10px]">
          highest state
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        States differ in steps of one. Ti, V, Cr and Mn reach their group number; after Mn the highest state falls and +2 becomes common. Sc shows
        only +3 and Zn only +2.
      </p>
    </div>
  );
}
