/**
 * Static figure: two energy profiles, one above the other, drawn to scale
 * from the concept's own numbers.
 * - Exothermic (the worked example): reactants at 0, peak at +120, products
 *   at -80 kJ/mol. Ea = 120, ΔH = -80, reverse Ea = 120 - (-80) = 200.
 * - Endothermic (the self-check): reactants at 40, peak at 150, products at
 *   90 kJ/mol. Ea = 110, ΔH = +50, reverse Ea = 60.
 *
 * Ea is measured from the reactants up to the transition state, ΔH from the
 * reactants to the products (never to the peak: the concept's trap).
 * Pinned by tests/notes-imat-visuals-chem1.test.ts. Server component.
 */

export type Profile = { reactants: number; peak: number; products: number };

export const EXO: Profile = { reactants: 0, peak: 120, products: -80 };
export const ENDO: Profile = { reactants: 40, peak: 150, products: 90 };

/** Forward activation energy: reactants up to the peak. */
export const ea = (p: Profile) => p.peak - p.reactants;
/** Enthalpy change: products minus reactants. */
export const deltaH = (p: Profile) => p.products - p.reactants;
/** Reverse activation energy: products up to the same peak. */
export const eaReverse = (p: Profile) => p.peak - p.products;

/** "+50" / "−80" with a true minus sign. */
export const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0");

const W = 320;
const PANEL_H = 168;
const H = PANEL_H * 2 + 12;
const PL = 40;
const PR = 312;
const AXIS = "text-muted-foreground/60";

/** A smooth reactants → peak → products path, flat at both ends. */
export function profilePath(yR: number, yPk: number, yP: number, x0 = PL + 6, x1 = PR - 6): string {
  const a = x0 + 46;
  const pk = (x0 + x1) / 2;
  const b = x1 - 46;
  return [
    `M${x0},${yR}`,
    `L${a},${yR}`,
    `C${a + 32},${yR} ${pk - 34},${yPk} ${pk},${yPk}`,
    `C${pk + 34},${yPk} ${b - 32},${yP} ${b},${yP}`,
    `L${x1},${yP}`,
  ].join(" ");
}

function Arrow({ x, y1, y2, cls }: { x: number; y1: number; y2: number; cls: string }) {
  const dir = y2 > y1 ? 1 : -1;
  return (
    <g className={cls}>
      <line x1={x} y1={y1} x2={x} y2={y2 - dir * 5} stroke="currentColor" strokeWidth={1.5} />
      <path d={`M${x - 3.5},${y2 - dir * 6} L${x},${y2} L${x + 3.5},${y2 - dir * 6} Z`} fill="currentColor" />
    </g>
  );
}

function Panel({ p, top, title, lo, hi, ticks }: { p: Profile; top: number; title: string; lo: number; hi: number; ticks: number[] }) {
  const PT = top + 30;
  const PB = top + PANEL_H - 22;
  const yOf = (e: number) => Math.round((PB - ((e - lo) / (hi - lo)) * (PB - PT)) * 10) / 10;
  const yR = yOf(p.reactants);
  const yPk = yOf(p.peak);
  const yP = yOf(p.products);
  const pk = (PL + 6 + PR - 6) / 2;
  const exo = deltaH(p) < 0;
  const eaX = pk - 40;
  const dhX = PR - 30;
  return (
    <g>
      <text x={PL} y={top + 12} className="fill-foreground text-[11px] font-semibold">
        {title}
      </text>
      {/* Axes */}
      <line x1={PL} y1={PT - 8} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
      <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="currentColor" className={AXIS} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PL - 3} y1={yOf(t)} x2={PL} y2={yOf(t)} stroke="currentColor" className={AXIS} />
          <text x={PL - 5} y={yOf(t) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {t < 0 ? signed(t) : String(t)}
          </text>
        </g>
      ))}
      <text x={10} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 10 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[10px]">
        energy (kJ/mol)
      </text>
      <text x={(PL + PR) / 2} y={PB + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        progress of reaction
      </text>

      {/* Guide lines: the reactant level carried across, the peak level */}
      <line x1={PL + 52} y1={yR} x2={PR - 4} y2={yR} strokeDasharray="3 3" stroke="currentColor" className={AXIS} />
      <line x1={eaX - 6} y1={yPk} x2={pk + 30} y2={yPk} strokeDasharray="3 3" stroke="currentColor" className={AXIS} />

      {/* The profile */}
      <path d={profilePath(yR, yPk, yP)} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={2.2} />

      {/* Level labels */}
      <text x={PL + 8} y={yR - 5} className="fill-foreground text-[10px] font-semibold">
        reactants
      </text>
      <text x={PR - 8} y={yP + (exo ? 13 : -5)} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
        products
      </text>
      <text x={pk} y={yPk - 6} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        transition state
      </text>

      {/* Ea: reactants up to the peak */}
      <Arrow x={eaX} y1={yR} y2={yPk} cls="text-rose-600 dark:text-rose-400" />
      <text x={eaX - 5} y={(yR + yPk) / 2 + 3} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
        Ea = {ea(p)}
      </text>

      {/* ΔH: reactants to products */}
      <Arrow x={dhX} y1={yR} y2={yP} cls="text-emerald-600 dark:text-emerald-400" />
      <text x={dhX - 5} y={(yR + yP) / 2 + 3} textAnchor="end" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
        ΔH = {signed(deltaH(p))}
      </text>
    </g>
  );
}

export default function ImatEnergyProfile() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · exothermic and endothermic energy profiles
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Two energy profiles. Exothermic: reactants at 0, transition state at 120, products at minus 80 kilojoules per mole, so Ea is 120 and delta H is minus 80. Endothermic: reactants at 40, transition state at 150, products at 90, so Ea is 110 and delta H is plus 50."
      >
        <Panel p={EXO} top={0} title="Exothermic: products below reactants (kJ/mol)" lo={-110} hi={120} ticks={[-80, 0, 120]} />
        <line x1={0} y1={PANEL_H + 4} x2={W} y2={PANEL_H + 4} className="stroke-border" />
        <Panel p={ENDO} top={PANEL_H + 12} title="Endothermic: products above reactants (kJ/mol)" lo={0} hi={150} ticks={[0, 40, 90, 150]} />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Ea runs from the reactants up to the transition state. ΔH runs from the reactants to the products, never to
        the peak: negative when the products are lower (exothermic), positive when they are higher (endothermic). The
        reverse barrier starts at the products: 120 − (−80) = 200 kJ/mol in the first profile, 150 − 90 = 60 in the
        second.
      </p>
    </div>
  );
}
