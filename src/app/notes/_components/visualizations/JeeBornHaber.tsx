"use client";

/**
 * Animation: the Born-Haber cycle for NaCl (concept jcbond-born-haber), with
 * the concept's worked example, all in kJ mol⁻¹:
 *   sublimation of Na +108, ionisation of Na +496, half the Cl–Cl bond
 *   ½ × 242 = +121, electron gain by Cl −349, enthalpy of formation −411.
 * The gaseous ions sit at 108 + 496 + 121 − 349 = +376, so the lattice step
 * (ions coming together) is −411 − 376 = −787.
 *
 * Levels are drawn to scale. A marker moves to the end of each step (one
 * element, transform only); arrows and labels fade in by opacity. Pinned by
 * tests/notes-jee-visuals-chem.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The worked example's data, kJ mol⁻¹. */
export const NACL = {
  sublimation: 108,
  ionisation: 496,
  bondCl2: 242,
  electronGain: -349,
  formation: -411,
} as const;

/** Enthalpy of the gaseous ions above the elements: 108 + 496 + 121 − 349. */
export function ionsLevel(d = NACL): number {
  return d.sublimation + d.ionisation + d.bondCl2 / 2 + d.electronGain;
}

/** Lattice enthalpy for ions forming the solid: ΔfH minus the sum of the other steps. */
export function latticeEnthalpy(d = NACL): number {
  return d.formation - ionsLevel(d);
}

/** The levels, in kJ mol⁻¹ above Na(s) + ½Cl₂(g). */
export const LEVELS = {
  elements: 0,
  naGas: NACL.sublimation,
  naIon: NACL.sublimation + NACL.ionisation,
  clAtom: NACL.sublimation + NACL.ionisation + NACL.bondCl2 / 2,
  ions: ionsLevel(),
  solid: NACL.formation,
} as const;

export type StepArrow = { id: string; from: number; to: number; value: number; column: "left" | "direct" | "right" };

/** The cycle's arrows in the order the steps show them. */
export const ARROWS: readonly StepArrow[] = [
  { id: "formation", from: LEVELS.elements, to: LEVELS.solid, value: NACL.formation, column: "direct" },
  { id: "sublimation", from: LEVELS.elements, to: LEVELS.naGas, value: NACL.sublimation, column: "left" },
  { id: "ionisation", from: LEVELS.naGas, to: LEVELS.naIon, value: NACL.ionisation, column: "left" },
  { id: "halfBond", from: LEVELS.naIon, to: LEVELS.clAtom, value: NACL.bondCl2 / 2, column: "left" },
  { id: "electronGain", from: LEVELS.clAtom, to: LEVELS.ions, value: NACL.electronGain, column: "right" },
  { id: "lattice", from: LEVELS.ions, to: LEVELS.solid, value: latticeEnthalpy(), column: "right" },
];

export const BORN_HABER_STEPS: readonly FigureStep[] = [
  {
    title: "Formation in one step",
    caption: "Na(s) + ½Cl₂(g) → NaCl(s) has an enthalpy of formation of −411 kJ mol⁻¹. The cycle reaches the same solid by a longer road.",
  },
  {
    title: "Sublimation of Na",
    caption: "Solid sodium becomes gaseous atoms: +108 kJ mol⁻¹.",
  },
  {
    title: "Ionisation of Na",
    caption: "Na(g) → Na⁺(g) + e⁻ takes the ionisation enthalpy, +496 kJ mol⁻¹. Running total +604.",
  },
  {
    title: "Half the Cl–Cl bond",
    caption: "One Cl atom is half a Cl₂ molecule, so only half the bond enthalpy: ½ × 242 = +121 kJ mol⁻¹. Running total +725.",
  },
  {
    title: "Electron gain by Cl",
    caption: "Cl(g) + e⁻ → Cl⁻(g) gives out 349 kJ mol⁻¹. The gaseous ions sit at 108 + 496 + 121 − 349 = +376 kJ mol⁻¹.",
  },
  {
    title: "Ions form the lattice",
    caption: "Both roads end at NaCl(s), so −411 = 376 + lattice enthalpy. The lattice enthalpy (ions coming together) is −787 kJ mol⁻¹.",
  },
];

/** Step from which each arrow (and the level it reaches) is shown. */
export function arrowFrom(id: string): number {
  return ARROWS.findIndex((a) => a.id === id);
}

/** Running sum of the steps from the elements, after a step (steps 1 to 4); null otherwise. */
export function runningTotal(step: number): number | null {
  if (step < 1 || step > 4) return null;
  return ARROWS.slice(1, step + 1).reduce((s, a) => s + a.value, 0);
}

// Geometry (viewBox units). H = 0 at Y0; lower enthalpy is lower down.
export const Y0 = 183;
/** viewBox units per kJ mol⁻¹. */
export const H_SCALE = 0.2;
export const COLUMN_X = { left: 60, direct: 104, right: 286 } as const;

export function levelY(H: number): number {
  return Math.round((Y0 - H * H_SCALE) * 100) / 100;
}

/** Where the marker sits after each step: the end of that step's arrow. */
export function markerPose(step: number): { x: number; y: number } {
  const a = ARROWS[step];
  return { x: COLUMN_X[a.column], y: levelY(a.to) };
}

const signed = (n: number) => (n > 0 ? `+${n}` : `−${Math.abs(n)}`);

function VArrow({ x, from, to, className }: { x: number; from: number; to: number; className: string }) {
  const y1 = levelY(from);
  const y2 = levelY(to);
  const dir = y2 > y1 ? 1 : -1;
  const tip = y2 - dir * 1.5;
  return (
    <g className={className}>
      <line x1={x} y1={y1} x2={x} y2={tip - dir * 7} strokeWidth={2.2} className="stroke-current" />
      <polygon points={`${x},${tip} ${x - 4.5},${tip - dir * 8} ${x + 4.5},${tip - dir * 8}`} className="fill-current" />
    </g>
  );
}

export default function JeeBornHaber() {
  const lattice = latticeEnthalpy();
  return (
    <StepFigure
      title="Animation · the Born-Haber cycle for sodium chloride"
      label="Born-Haber cycle for NaCl drawn to scale, in kJ per mole. From Na(s) and half Cl2, sublimation plus 108, ionisation plus 496 and half the Cl-Cl bond plus 121 climb to plus 725. Electron gain minus 349 brings the gaseous ions to plus 376. The direct formation arrow is minus 411, so the lattice step from the ions to solid NaCl is minus 787."
      viewBox="0 0 320 290"
      steps={BORN_HABER_STEPS}
      note="Left column, up: sublimation +108, ionisation +496, half the bond +121. Right column, down: electron gain −349, lattice −787. Middle: formation −411. Levels to scale, kJ mol⁻¹."
    >
      {(step) => {
        const show = (id: string) => ({ opacity: step >= arrowFrom(id) ? 1 : 0 });
        const total = runningTotal(step);
        return (
          <g>
            <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {BORN_HABER_STEPS[step].title}
            </text>

            {/* Levels always shown: the elements and the solid */}
            <line x1={50} y1={levelY(LEVELS.elements)} x2={150} y2={levelY(LEVELS.elements)} strokeWidth={2} className="stroke-foreground" />
            <text x={154} y={levelY(LEVELS.elements) + 3.5} className="fill-foreground text-[10px] font-semibold">
              Na(s) + ½Cl₂(g)
            </text>
            <line x1={50} y1={levelY(LEVELS.solid)} x2={300} y2={levelY(LEVELS.solid)} strokeWidth={2} className="stroke-foreground" />
            <text x={175} y={levelY(LEVELS.solid) + 14} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              NaCl(s)
            </text>

            {/* Formation, direct */}
            <VArrow x={COLUMN_X.direct} from={LEVELS.elements} to={LEVELS.solid} className="text-indigo-600 dark:text-indigo-400" />
            <text x={COLUMN_X.direct + 7} y={levelY(LEVELS.solid) - 22} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300 tabular-nums">
              Δ
              <tspan dy={3} className="text-[8px]">
                f
              </tspan>
              <tspan dy={-3}>H = −411</tspan>
            </text>

            {/* Sublimation */}
            <g className={MOTION} style={show("sublimation")}>
              <line x1={50} y1={levelY(LEVELS.naGas)} x2={150} y2={levelY(LEVELS.naGas)} strokeWidth={2} className="stroke-foreground" />
              <text x={154} y={levelY(LEVELS.naGas) + 3.5} className="fill-foreground text-[10px] font-semibold">
                Na(g) + ½Cl₂(g)
              </text>
              <VArrow x={COLUMN_X.left} from={LEVELS.elements} to={LEVELS.naGas} className="text-amber-600 dark:text-amber-400" />
            </g>

            {/* Ionisation */}
            <g className={MOTION} style={show("ionisation")}>
              <line x1={50} y1={levelY(LEVELS.naIon)} x2={150} y2={levelY(LEVELS.naIon)} strokeWidth={2} className="stroke-foreground" />
              <text x={154} y={levelY(LEVELS.naIon) + 3.5} className="fill-foreground text-[10px] font-semibold">
                Na⁺(g) + e⁻ + ½Cl₂(g)
              </text>
              <VArrow x={COLUMN_X.left} from={LEVELS.naGas} to={LEVELS.naIon} className="text-amber-600 dark:text-amber-400" />
            </g>

            {/* Half the Cl–Cl bond */}
            <g className={MOTION} style={show("halfBond")}>
              <line x1={50} y1={levelY(LEVELS.clAtom)} x2={300} y2={levelY(LEVELS.clAtom)} strokeWidth={2} className="stroke-foreground" />
              <text x={175} y={levelY(LEVELS.clAtom) - 5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                Na⁺(g) + e⁻ + Cl(g)
              </text>
              <VArrow x={COLUMN_X.left} from={LEVELS.naIon} to={LEVELS.clAtom} className="text-amber-600 dark:text-amber-400" />
            </g>

            {/* Left column values */}
            {ARROWS.filter((a) => a.column === "left").map((a) => (
              <text
                key={a.id}
                x={COLUMN_X.left - 7}
                y={(levelY(a.from) + levelY(a.to)) / 2 + 4}
                textAnchor="end"
                className={`fill-amber-700 text-[11px] font-semibold dark:fill-amber-300 tabular-nums ${MOTION}`}
                style={show(a.id)}
              >
                {signed(a.value)}
              </text>
            ))}

            {/* Electron gain */}
            <g className={MOTION} style={show("electronGain")}>
              <line x1={200} y1={levelY(LEVELS.ions)} x2={300} y2={levelY(LEVELS.ions)} strokeWidth={2} className="stroke-foreground" />
              <text x={243} y={levelY(LEVELS.ions) - 5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                Na⁺(g) + Cl⁻(g)
              </text>
              <VArrow x={COLUMN_X.right} from={LEVELS.clAtom} to={LEVELS.ions} className="text-emerald-600 dark:text-emerald-400" />
              <text
                x={COLUMN_X.right + 6}
                y={(levelY(LEVELS.clAtom) + levelY(LEVELS.ions)) / 2 + 4}
                className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300 tabular-nums"
              >
                {signed(NACL.electronGain)}
              </text>
            </g>

            {/* Lattice */}
            <g className={MOTION} style={show("lattice")}>
              <VArrow x={COLUMN_X.right} from={LEVELS.ions} to={LEVELS.solid} className="text-rose-600 dark:text-rose-400" />
              <text
                x={COLUMN_X.right + 6}
                y={(levelY(LEVELS.ions) + levelY(LEVELS.solid)) / 2 + 4}
                className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300 tabular-nums"
              >
                {signed(lattice)}
              </text>
              <text x={216} y={206} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
                −411 = 376 + lattice
              </text>
              <text x={216} y={221} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300 tabular-nums">
                lattice = −787 kJ mol⁻¹
              </text>
            </g>

            {/* Running total while climbing */}
            <text
              x={216}
              y={206}
              textAnchor="middle"
              className={`fill-muted-foreground text-[11px] tabular-nums ${MOTION}`}
              style={{ opacity: total === null ? 0 : 1 }}
            >
              steps so far: {total === null ? "" : signed(total)}
            </text>

            {/* Marker at the end of the current step */}
            <circle
              r={4.5}
              className={`fill-foreground ${MOTION}`}
              style={{ transform: svgTransform(markerPose(step)) }}
            />
          </g>
        );
      }}
    </StepFigure>
  );
}
