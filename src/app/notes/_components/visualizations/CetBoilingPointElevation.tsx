/**
 * Static figure: why a non-volatile solute raises the boiling point (concept
 * cetsol-delta-tb-equals-kb-m). Vapour pressure rises with temperature; a
 * liquid boils where its vapour pressure reaches the outside pressure (1 atm).
 * The solution's vapour pressure is lower at every temperature (Raoult: the
 * solvent's times its mole fraction), so its curve meets 1 atm further right:
 * it boils higher, by ΔTb = Kb·m.
 *
 * The curves are schematic (the solvent's rises exponentially, the solution's
 * is a fixed fraction of it) and the gap is exaggerated so it can be seen. The
 * numbers are the concept's worked example, in the note under the figure:
 * 2 g of solute (M = 80) in 50 g of solvent, m = 0.5 mol kg⁻¹, boils 0.9 K
 * higher, so Kb = 0.9/0.5 = 1.8 K kg mol⁻¹.
 *
 * Server component, pure SVG. Pinned by tests/notes-cet-visuals-chem-c.test.ts.
 */

/** The worked example. */
export const BP_EXAMPLE = { soluteG: 2, M: 80, solventKg: 0.05, dTb: 0.9 } as const;

/** Molality m = (mass/M) / solvent kg. */
export function molality(g: number, M: number, kg: number): number {
  return g / M / kg;
}

/** Kb = ΔTb/m. */
export function kbFrom(dTb: number, m: number): number {
  return dTb / m;
}

// Schematic curves, in drawing units: temperature u from 0 to 10, pressure in atm.
/** Steepness of the solvent's curve and the temperature where it reaches 1 atm. */
export const CURVE = { k: 0.25, uBoil: 5.5 } as const;
/** Exaggerated mole fraction of solvent in the solution (0.75), so the gap shows. */
export const SOLVENT_FRACTION = 0.75;

/** Vapour pressure of the pure solvent, in atm. */
export function pSolvent(u: number): number {
  return Math.exp(CURVE.k * (u - CURVE.uBoil));
}

/** Vapour pressure of the solution: the solvent's times its mole fraction (Raoult). */
export function pSolution(u: number): number {
  return SOLVENT_FRACTION * pSolvent(u);
}

/** Temperature where a curve reaches 1 atm. */
export const BOIL = {
  solvent: CURVE.uBoil,
  solution: CURVE.uBoil - Math.log(SOLVENT_FRACTION) / CURVE.k,
} as const;

// Plot geometry (viewBox units).
export const U_MAX = 9;
export const P_MAX = 1.5;
export const PLOT = { x0: 40, x1: 304, y0: 176, y1: 26 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (u: number) => r2(PLOT.x0 + (u / U_MAX) * (PLOT.x1 - PLOT.x0));
export const py = (p: number) => r2(PLOT.y0 - (p / P_MAX) * (PLOT.y0 - PLOT.y1));

/** Points of a curve up to where it leaves the top of the plot. */
export function curvePoints(f: (u: number) => number, samples = 90): { u: number; p: number }[] {
  const out: { u: number; p: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const u = (i / samples) * U_MAX;
    const p = f(u);
    if (p > P_MAX) break;
    out.push({ u, p });
  }
  return out;
}

/** SVG text with a subscript: base, lowered s, then the rest back on the line. */
function Sub({ b, s, rest = "" }: { b: string; s: string; rest?: string }) {
  return (
    <>
      {b}
      <tspan dy={3} className="text-[8px]">
        {s}
      </tspan>
      <tspan dy={-3}>{rest}</tspan>
    </>
  );
}

export default function CetBoilingPointElevation() {
  const solvent = curvePoints(pSolvent)
    .map((q) => `${px(q.u)},${py(q.p)}`)
    .join(" ");
  const solution = curvePoints(pSolution)
    .map((q) => `${px(q.u)},${py(q.p)}`)
    .join(" ");
  const y1atm = py(1);
  const xb0 = px(BOIL.solvent);
  const xb = px(BOIL.solution);
  const m = Math.round(molality(BP_EXAMPLE.soluteG, BP_EXAMPLE.M, BP_EXAMPLE.solventKg) * 1000) / 1000;
  const kb = Math.round(kbFrom(BP_EXAMPLE.dTb, m) * 1000) / 1000;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · why a solution boils at a higher temperature
      </p>

      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Vapour pressure against temperature. The pure solvent's curve reaches 1 atm at its boiling point. The solution's curve lies below it at every temperature, so it reaches 1 atm at a higher temperature. The gap between the two boiling points is the elevation of boiling point."
      >
        {/* Axes */}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y0} className="stroke-muted-foreground" />
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1 - 4} className="stroke-muted-foreground" />
        <text x={6} y={16} className="fill-muted-foreground text-[10px]">
          vapour pressure
        </text>
        <text x={PLOT.x1} y={PLOT.y0 + 28} textAnchor="end" className="fill-muted-foreground text-[10px]">
          temperature
        </text>

        {/* Outside pressure */}
        <line x1={PLOT.x0} y1={y1atm} x2={PLOT.x1} y2={y1atm} strokeDasharray="5 4" className="stroke-foreground" />
        <text x={PLOT.x0 + 4} y={y1atm - 5} className="fill-foreground text-[10px] font-semibold">
          1 atm (outside pressure)
        </text>

        {/* The two curves */}
        <polyline points={solvent} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-sky-600 dark:stroke-sky-400" />
        <polyline points={solution} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-rose-600 dark:stroke-rose-400" />
        <text x={px(4.4)} y={py(pSolvent(4.4)) - 6} textAnchor="end" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          pure solvent
        </text>
        <text x={px(2.4)} y={py(pSolution(2.4)) + 14} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          solution (lower)
        </text>

        {/* Boiling points */}
        <line x1={xb0} y1={y1atm} x2={xb0} y2={PLOT.y0} strokeDasharray="3 3" className="stroke-sky-600 dark:stroke-sky-400" />
        <line x1={xb} y1={y1atm} x2={xb} y2={PLOT.y0} strokeDasharray="3 3" className="stroke-rose-600 dark:stroke-rose-400" />
        <circle cx={xb0} cy={y1atm} r={3.5} className="fill-sky-600 dark:fill-sky-400" />
        <circle cx={xb} cy={y1atm} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        <text x={xb0} y={PLOT.y0 + 13} textAnchor="end" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          <Sub b="T" s="b" rest="°" />
        </text>
        <text x={xb} y={PLOT.y0 + 13} textAnchor="start" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          <Sub b="T" s="b" />
        </text>

        {/* ΔTb bracket */}
        <line x1={xb0} y1={PLOT.y0 - 10} x2={xb} y2={PLOT.y0 - 10} strokeWidth={1.5} className="stroke-foreground" />
        <polygon points={`${xb0},${PLOT.y0 - 10} ${xb0 + 5},${PLOT.y0 - 13} ${xb0 + 5},${PLOT.y0 - 7}`} className="fill-foreground" />
        <polygon points={`${xb},${PLOT.y0 - 10} ${xb - 5},${PLOT.y0 - 13} ${xb - 5},${PLOT.y0 - 7}`} className="fill-foreground" />
        <text x={(xb0 + xb) / 2} y={PLOT.y0 - 15} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          <Sub b="ΔT" s="b" />
        </text>
      </svg>

      <p className="mt-2 text-sm text-foreground tabular-nums">
        Example: 2 g of solute (M = 80 g mol⁻¹) in 50 g of solvent: m = (2/80)/0.05 = {m} mol kg⁻¹. It boils{" "}
        {BP_EXAMPLE.dTb} K higher, so K<sub>b</sub> = ΔT<sub>b</sub>/m = 0.9/0.5 = {kb} K kg mol⁻¹.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        A liquid boils when its vapour pressure equals the outside pressure. Solute particles lower the vapour pressure, so the
        solution must be heated further to reach 1 atm: T<sub>b</sub> = T<sub>b</sub>° + ΔT<sub>b</sub>, with ΔT<sub>b</sub> = K<sub>b</sub>·m.
        The gap is drawn larger than 0.9 K so it
        can be seen.
      </p>
    </div>
  );
}
