/**
 * Static figure: electrolysis of brine, aqueous NaCl, with inert electrodes
 * (concept jcelec-products, its table row "Aqueous NaCl (brine) | Inert |
 * H₂, with OH⁻ left in solution | Cl₂").
 *
 * - Anode (+), joined to the battery's positive end: Cl⁻ is oxidised,
 *   2Cl⁻ → Cl₂ + 2e⁻ (Cl₂ needs 2 electrons, as the Faraday concept says).
 * - Cathode (−): water is reduced, 2H₂O + 2e⁻ → H₂ + 2OH⁻ (the concept's own
 *   half-equation). Na⁺ is never deposited from water, so it stays in
 *   solution; OH⁻ builds up and the pH rises. One OH⁻ per electron.
 * - Electrons in the wire run from the anode to the battery and from the
 *   battery to the cathode.
 *
 * Server component, pure SVG. Pinned by tests/notes-w2-11.test.ts.
 */

export const ELECTRODES = {
  anode: { sign: "+", product: "Cl₂", half: "2Cl⁻ → Cl₂ + 2e⁻", process: "oxidation" },
  cathode: { sign: "−", product: "H₂", half: "2H₂O + 2e⁻ → H₂ + 2OH⁻", process: "reduction" },
} as const;

/** Electrons per molecule of each gas (the Faraday concept: H₂ and Cl₂ need 2). */
export const ELECTRONS_PER_GAS = { "Cl₂": 2, "H₂": 2 } as const;

/** Moles of OH⁻ formed per mole of electrons passed. */
export const OH_PER_ELECTRON = 1;

/** Net charge on each side of the two half-equations, written as numbers. */
export const CHARGE_BALANCE = {
  anode: { left: -2, right: -2 }, // 2Cl⁻ | Cl₂ + 2e⁻
  cathode: { left: -2, right: -2 }, // 2H₂O + 2e⁻ | H₂ + 2OH⁻
} as const;

/** Which ion stays in solution at the cathode instead of being deposited. */
export const NOT_DEPOSITED = "Na⁺";

const BEAKER = { x0: 50, x1: 270, top: 82, bottom: 206, liquid: 100 } as const;
const ANODE_X = 100;
const CATHODE_X = 220;
const BAT = { x: 160, y: 34, plusX: 154, minusX: 166 } as const;

const BUBBLES = [
  { dx: 12, y: 168, r: 2.4 },
  { dx: 16, y: 150, r: 2 },
  { dx: 11, y: 134, r: 2.6 },
  { dx: 15, y: 116, r: 2 },
] as const;

export default function JeeBrineElectrolysis() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · electrolysis of brine with inert electrodes
      </p>
      <svg
        viewBox="0 0 320 268"
        className="block h-auto w-full"
        role="img"
        aria-label="An electrolytic cell. A battery drives current through aqueous sodium chloride between two inert electrodes. The anode, joined to the positive end, gives chlorine gas: 2 chloride ions give chlorine and 2 electrons. The cathode, joined to the negative end, gives hydrogen gas: 2 water molecules and 2 electrons give hydrogen and 2 hydroxide ions. Sodium ions stay in solution, hydroxide builds up and the pH rises. Electrons run through the wire from the anode to the battery and from the battery to the cathode."
      >
        {/* Battery */}
        <line x1={BAT.plusX} y1={BAT.y - 12} x2={BAT.plusX} y2={BAT.y + 12} strokeWidth={2} className="stroke-foreground" />
        <line x1={BAT.minusX} y1={BAT.y - 6} x2={BAT.minusX} y2={BAT.y + 6} strokeWidth={4} className="stroke-foreground" />
        <text x={BAT.plusX - 6} y={BAT.y - 14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          +
        </text>
        <text x={BAT.minusX + 6} y={BAT.y - 14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          −
        </text>
        <text x={BAT.x} y={BAT.y + 26} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          battery
        </text>

        {/* Wires */}
        <polyline points={`${BAT.plusX},${BAT.y} ${ANODE_X},${BAT.y} ${ANODE_X},70`} fill="none" strokeWidth={1.4} className="stroke-foreground" />
        <polyline points={`${BAT.minusX},${BAT.y} ${CATHODE_X},${BAT.y} ${CATHODE_X},70`} fill="none" strokeWidth={1.4} className="stroke-foreground" />
        {/* Electron flow: anode to battery (+), battery (−) to cathode */}
        <polygon points={`${130},${BAT.y} ${123},${BAT.y - 4} ${123},${BAT.y + 4}`} className="fill-amber-600 dark:fill-amber-400" />
        <text x={124} y={BAT.y - 8} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          e⁻
        </text>
        <polygon points={`${200},${BAT.y} ${193},${BAT.y - 4} ${193},${BAT.y + 4}`} className="fill-amber-600 dark:fill-amber-400" />
        <text x={194} y={BAT.y - 8} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          e⁻
        </text>

        {/* Beaker and brine */}
        <rect x={BEAKER.x0 + 1} y={BEAKER.liquid} width={BEAKER.x1 - BEAKER.x0 - 2} height={BEAKER.bottom - BEAKER.liquid - 1} className="fill-sky-100 dark:fill-sky-950/60" />
        <polyline
          points={`${BEAKER.x0},${BEAKER.top} ${BEAKER.x0},${BEAKER.bottom} ${BEAKER.x1},${BEAKER.bottom} ${BEAKER.x1},${BEAKER.top}`}
          fill="none"
          strokeWidth={1.6}
          className="stroke-foreground"
        />

        {/* Electrodes */}
        <rect x={ANODE_X - 6} y={70} width={12} height={110} className="fill-muted-foreground" />
        <rect x={CATHODE_X - 6} y={70} width={12} height={110} className="fill-muted-foreground" />

        {/* Gas bubbles */}
        {BUBBLES.map((b, k) => (
          <g key={k}>
            <circle cx={ANODE_X + b.dx} cy={b.y} r={b.r} fill="none" strokeWidth={1} className="stroke-emerald-600 dark:stroke-emerald-400" />
            <circle cx={CATHODE_X - b.dx} cy={b.y} r={b.r} fill="none" strokeWidth={1} className="stroke-sky-600 dark:stroke-sky-400" />
          </g>
        ))}

        {/* Products inside the cell */}
        <text x={124} y={120} className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          {ELECTRODES.anode.product} gas
        </text>
        <text x={196} y={140} textAnchor="end" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          {ELECTRODES.cathode.product} gas
        </text>
        <text x={196} y={154} textAnchor="end" className="fill-sky-700 text-[10px] dark:fill-sky-300">
          OH⁻ left
        </text>
        <text x={160} y={186} textAnchor="middle" className="fill-foreground text-[10px]">
          {NOT_DEPOSITED} stays in solution
        </text>
        <text x={160} y={200} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
          brine, NaCl(aq)
        </text>

        {/* Electrode names and half-equations */}
        <text x={ANODE_X} y={224} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          anode ({ELECTRODES.anode.sign})
        </text>
        <text x={ANODE_X} y={238} textAnchor="middle" className="fill-foreground text-[10px]">
          {ELECTRODES.anode.half}
        </text>
        <text x={CATHODE_X} y={224} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          cathode ({ELECTRODES.cathode.sign})
        </text>
        <text x={CATHODE_X} y={238} textAnchor="middle" className="fill-foreground text-[10px]">
          {ELECTRODES.cathode.half}
        </text>
        <text x={160} y={260} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          OH⁻ builds up, so the pH rises
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        At the anode, Cl⁻ is oxidised to Cl₂. At the cathode, water is reduced before Na⁺ can be, so H₂ forms and OH⁻ is left behind, one OH⁻ for each
        electron passed. Molten NaCl is different: there the cathode gives Na.
      </p>
    </div>
  );
}
