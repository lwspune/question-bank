/**
 * Still: the concept's worked example (nchrr-balancing) on an oxidation-number
 * scale. Manganese falls from +7 in MnO₄⁻ to +2 in Mn²⁺ (gains 5 e⁻); iron
 * rises from +2 to +3 (loses 1 e⁻), so five Fe²⁺ are needed and 5 e⁻ lost =
 * 5 e⁻ gained. Under it, the balanced equation and its charge check, +17 on
 * each side.
 *
 * `EQUATION` holds every species with its coefficient, charge and atoms, so
 * the test checks the atoms and the charges balance. Server component, pure
 * SVG. Pinned by tests/notes-w2-03.test.ts.
 */

export const CHANGES = {
  mn: { from: 7, to: 2, species: ["MnO₄⁻", "Mn²⁺"] },
  fe: { from: 2, to: 3, species: ["Fe²⁺", "Fe³⁺"] },
} as const;

/** Electrons per atom: the change in oxidation number. */
export const electronsGained = CHANGES.mn.from - CHANGES.mn.to;
export const electronsLostEach = CHANGES.fe.to - CHANGES.fe.from;
/** Fe²⁺ needed so that electrons lost equal electrons gained. */
export const ironMultiplier = electronsGained / electronsLostEach;

type Species = { coef: number; charge: number; atoms: Partial<Record<"Mn" | "Fe" | "O" | "H", number>> };
export const EQUATION: { left: Species[]; right: Species[] } = {
  left: [
    { coef: 1, charge: -1, atoms: { Mn: 1, O: 4 } },
    { coef: 5, charge: 2, atoms: { Fe: 1 } },
    { coef: 8, charge: 1, atoms: { H: 1 } },
  ],
  right: [
    { coef: 1, charge: 2, atoms: { Mn: 1 } },
    { coef: 5, charge: 3, atoms: { Fe: 1 } },
    { coef: 4, charge: 0, atoms: { H: 2, O: 1 } },
  ],
};

export function totalCharge(side: Species[]): number {
  return side.reduce((n, s) => n + s.coef * s.charge, 0);
}
export function totalAtoms(side: Species[], el: "Mn" | "Fe" | "O" | "H"): number {
  return side.reduce((n, s) => n + s.coef * (s.atoms[el] ?? 0), 0);
}

// Geometry (viewBox 0 0 320 240).
const Y0 = 168;
const PER = 18.5;
export const onY = (n: number) => Math.round((Y0 - n * PER) * 10) / 10;
const MN_X = 92;
const FE_X = 226;

function Arrow({ x, from, to, cls }: { x: number; from: number; to: number; cls: string }) {
  const down = to < from;
  const y1 = onY(from) + (down ? 6 : -6);
  const y2 = onY(to) + (down ? -6 : 6);
  const head = down ? `${x},${y2 + 1} ${x - 4},${y2 - 7} ${x + 4},${y2 - 7}` : `${x},${y2 - 1} ${x - 4},${y2 + 7} ${x + 4},${y2 + 7}`;
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={down ? y2 - 6 : y2 + 6} strokeWidth={2} className={`stroke-current ${cls}`} />
      <polygon points={head} className={`fill-current ${cls}`} />
    </g>
  );
}

export default function NeetRedoxBalance() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · matching the electrons lost and gained
      </p>
      <svg
        viewBox="0 0 320 240"
        className="block h-auto w-full"
        role="img"
        aria-label="Oxidation number scale from 0 to plus 7. Manganese falls from plus 7 in permanganate to plus 2 in Mn2+, gaining 5 electrons. Iron rises from plus 2 to plus 3, losing 1 electron, so 5 Fe2+ lose 5 electrons. Balanced: MnO4- + 5Fe2+ + 8H+ gives Mn2+ + 5Fe3+ + 4H2O, charge plus 17 on each side."
      >
        <text x={6} y={14} className="fill-muted-foreground text-[10px]">
          oxidation number
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
          <g key={n}>
            <line x1={34} y1={onY(n)} x2={312} y2={onY(n)} strokeWidth={0.6} className="stroke-border" />
            <text x={28} y={onY(n) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {n === 0 ? "0" : `+${n}`}
            </text>
          </g>
        ))}

        {/* Manganese */}
        <text x={MN_X} y={Y0 + 16} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Mn
        </text>
        <Arrow x={MN_X} from={CHANGES.mn.from} to={CHANGES.mn.to} cls="text-sky-600 dark:text-sky-400" />
        <circle cx={MN_X} cy={onY(7)} r={4} className="fill-sky-600 dark:fill-sky-400" />
        <circle cx={MN_X} cy={onY(2)} r={4} className="fill-sky-600 dark:fill-sky-400" />
        <text x={MN_X - 10} y={onY(7) + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          MnO₄⁻
        </text>
        <text x={MN_X - 10} y={onY(2) + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          Mn²⁺
        </text>
        <text x={MN_X + 10} y={onY(4.8)} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          gains 5 e⁻
        </text>
        <text x={MN_X + 10} y={onY(4.8) + 13} className="fill-sky-700 text-[10px] dark:fill-sky-300">
          reduction
        </text>

        {/* Iron */}
        <text x={FE_X} y={Y0 + 16} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Fe
        </text>
        <Arrow x={FE_X} from={CHANGES.fe.from} to={CHANGES.fe.to} cls="text-amber-600 dark:text-amber-400" />
        <circle cx={FE_X} cy={onY(2)} r={3.5} className="fill-amber-600 dark:fill-amber-400" />
        <circle cx={FE_X} cy={onY(3)} r={3.5} className="fill-amber-600 dark:fill-amber-400" />
        <text x={FE_X - 10} y={onY(2) + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          Fe²⁺
        </text>
        <text x={FE_X - 10} y={onY(3) + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          Fe³⁺
        </text>
        <text x={FE_X + 12} y={onY(3) - 36} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          loses 1 e⁻ each
        </text>
        <text x={FE_X + 12} y={onY(3) - 10} className="fill-amber-700 text-[10px] dark:fill-amber-300">
          oxidation
        </text>
        <text x={FE_X + 12} y={onY(3) - 23} className="fill-foreground text-[10px] font-semibold">
          × 5 Fe²⁺ = 5 e⁻
        </text>

        <text x={160} y={204} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O
        </text>
        <text x={160} y={220} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          5 electrons lost = 5 electrons gained
        </text>
        <text x={160} y={235} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          charge: left −1 + 10 + 8 = +17, right +2 + 15 = +17
        </text>
      </svg>
    </div>
  );
}
