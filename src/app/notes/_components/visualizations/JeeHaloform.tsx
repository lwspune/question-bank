"use client";

/**
 * Animation: the iodoform (haloform) reaction of a methyl ketone (concept
 * jcald-haloform), on 3-methylbutan-2-one, CH₃COCH(CH₃)₂, one of the
 * positives in the concept's worked example.
 *   1. The test needs CH₃ joined to C=O, with the C=O joined to C (or H).
 *   2. Hypoiodite (I₂ with NaOH) replaces all three H of that methyl: CI₃.
 *   3. The CI₃ group leaves as iodoform, CHI₃, a yellow solid; the rest
 *      becomes the carboxylate (CH₃)₂CHCOO⁻.
 *   4. One carbon fewer: 5 C in the ketone, 4 in the carboxylate, 1 in CHI₃.
 * The equation is the concept's formula:
 *   RCOCH₃ + 3I₂ + 4NaOH → RCOONa + CHI₃↓ + 3NaI + 3H₂O.
 * The CI₃ group is one element that slides away (transform only); atoms
 * that change fade by opacity. Pinned by tests/notes-w2-15.test.ts.
 */
import type { ReactNode } from "react";
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The worked example's ketone, as groups around the C=O. */
export const KETONE = { formula: "CH₃COCH(CH₃)₂", carbons: 5, methylOnCarbonyl: true, otherSideOfCarbonyl: "C" } as const;

/** Carbons in the products: carboxylate (one fewer) and iodoform. */
export const PRODUCTS = { carboxylate: "(CH₃)₂CHCOO⁻", carboxylateCarbons: 4, iodoform: "CHI₃", iodoformCarbons: 1 } as const;

/** The concept's balanced equation, as coefficients. */
export const EQUATION = {
  reactants: { ketone: 1, I2: 3, NaOH: 4 },
  products: { carboxylate: 1, CHI3: 1, NaI: 3, H2O: 3 },
} as const;

/** Iodine atoms on each side of the equation. */
export function iodineBalance(): { left: number; right: number } {
  return { left: 2 * EQUATION.reactants.I2, right: 3 * EQUATION.products.CHI3 + EQUATION.products.NaI };
}

/** Sodium atoms on each side. */
export function sodiumBalance(): { left: number; right: number } {
  return { left: EQUATION.reactants.NaOH, right: EQUATION.products.carboxylate + EQUATION.products.NaI };
}

export const HALOFORM_STEPS: readonly FigureStep[] = [
  {
    title: "Find the methyl on the C=O",
    caption: "3-Methylbutan-2-one, CH₃COCH(CH₃)₂: a CH₃ joined to C=O, and the C=O joined to C. So it gives the test.",
  },
  {
    title: "Iodine replaces all three H",
    caption: "Hypoiodite (I₂ with NaOH) swaps every H on that methyl for I, giving a CI₃ group next to the C=O.",
  },
  {
    title: "CI₃ leaves as iodoform",
    caption: "The CI₃ group breaks off as iodoform, CHI₃, a yellow solid. The rest becomes a carboxylate, (CH₃)₂CHCOO⁻.",
  },
  {
    title: "One carbon fewer",
    caption: "The ketone had 5 carbons: the carboxylate keeps 4 and iodoform takes 1.",
  },
];

// Geometry (viewBox units).
export const CARBONYL = { x: 172, y: 96 } as const;
export const METHYL = { x: 124, y: 96 } as const;
/** How far the CI₃ group slides away when it leaves. */
export const LEAVE = { x: -52, y: 62 } as const;

/** Offset of the CI₃ group at each step: in place, then gone. */
export function groupOffset(step: number): { x: number; y: number } {
  return step >= 2 ? LEAVE : { x: 0, y: 0 };
}

const SUBS = [
  { id: "up", x: METHYL.x, y: METHYL.y - 30, bond: [METHYL.x, METHYL.y - 9, METHYL.x, METHYL.y - 21] },
  { id: "left", x: METHYL.x - 32, y: METHYL.y, bond: [METHYL.x - 9, METHYL.y, METHYL.x - 23, METHYL.y] },
  { id: "down", x: METHYL.x, y: METHYL.y + 30, bond: [METHYL.x, METHYL.y + 9, METHYL.x, METHYL.y + 21] },
] as const;

function Atom({ x, y, children, className }: { x: number; y: number; children: ReactNode; className: string }) {
  return (
    <text x={x} y={y + 4.5} textAnchor="middle" className={`text-[13px] font-semibold ${className}`}>
      {children}
    </text>
  );
}

export default function JeeHaloform() {
  return (
    <StepFigure
      title="Animation · the iodoform test on a methyl ketone"
      label="3-Methylbutan-2-one, CH3COCH(CH3)2, has a methyl group on the C=O. Iodine with NaOH replaces its three hydrogens to give CI3. The CI3 group leaves as iodoform, CHI3, a yellow solid, and the rest becomes the carboxylate (CH3)2CHCOO minus, with one carbon fewer: 5 carbons become 4 plus 1."
      viewBox="0 0 320 206"
      steps={HALOFORM_STEPS}
      note="Positive: CH₃CO joined to H or C. RCOCH₃ + 3I₂ + 4NaOH → RCOONa + CHI₃↓ + 3NaI + 3H₂O."
    >
      {(step) => {
        const fade = (on: boolean) => ({ opacity: on ? 1 : 0 });
        return (
          <g>
            {/* Reagent */}
            <text x={300} y={22} textAnchor="end" className={`fill-violet-700 text-[11px] font-semibold dark:fill-violet-300 ${MOTION}`} style={fade(step >= 1)}>
              I₂ + NaOH
            </text>

            {/* Carbonyl carbon, its O and the rest of the molecule (they stay) */}
            <line x1={CARBONYL.x - 3} y1={CARBONYL.y - 9} x2={CARBONYL.x - 3} y2={CARBONYL.y - 22} strokeWidth={1.4} className="stroke-foreground" />
            <line x1={CARBONYL.x + 3} y1={CARBONYL.y - 9} x2={CARBONYL.x + 3} y2={CARBONYL.y - 22} strokeWidth={1.4} className="stroke-foreground" />
            <Atom x={CARBONYL.x} y={CARBONYL.y - 30} className="fill-rose-600 dark:fill-rose-400">
              O
            </Atom>
            <Atom x={CARBONYL.x} y={CARBONYL.y} className="fill-foreground">
              C
            </Atom>
            <line x1={CARBONYL.x + 9} y1={CARBONYL.y} x2={CARBONYL.x + 21} y2={CARBONYL.y} strokeWidth={1.4} className="stroke-foreground" />
            <text x={CARBONYL.x + 24} y={CARBONYL.y + 4.5} className="fill-foreground text-[13px] font-semibold">
              CH(CH₃)₂
            </text>

            {/* The C–C bond to the methyl: gone once CI₃ leaves */}
            <line
              x1={METHYL.x + 9}
              y1={METHYL.y}
              x2={CARBONYL.x - 9}
              y2={CARBONYL.y}
              strokeWidth={1.4}
              className={`stroke-foreground ${MOTION}`}
              style={fade(step < 2)}
            />
            {/* The new O⁻ of the carboxylate */}
            <g className={MOTION} style={fade(step >= 2)}>
              <line x1={METHYL.x + 14} y1={METHYL.y} x2={CARBONYL.x - 9} y2={CARBONYL.y} strokeWidth={1.4} className="stroke-foreground" />
              <Atom x={METHYL.x + 4} y={METHYL.y} className="fill-rose-600 dark:fill-rose-400">
                O⁻
              </Atom>
            </g>

            {/* The methyl, then CI₃, then iodoform: one moving group */}
            <g className={MOTION} style={{ transform: svgTransform(groupOffset(step)) }}>
              <circle cx={METHYL.x} cy={METHYL.y} r={44} className={`fill-yellow-300/60 dark:fill-yellow-600/40 ${MOTION}`} style={fade(step >= 2)} />
              <rect
                x={METHYL.x - 44}
                y={METHYL.y - 42}
                width={64}
                height={84}
                rx={10}
                fill="none"
                strokeDasharray="4 3"
                strokeWidth={1.4}
                className={`stroke-amber-600 dark:stroke-amber-400 ${MOTION}`}
                style={fade(step === 0)}
              />
              {SUBS.map((s) => (
                <g key={s.id}>
                  <line x1={s.bond[0]} y1={s.bond[1]} x2={s.bond[2]} y2={s.bond[3]} strokeWidth={1.4} className="stroke-foreground" />
                  <g className={MOTION} style={fade(step === 0)}>
                    <Atom x={s.x} y={s.y} className="fill-muted-foreground">
                      H
                    </Atom>
                  </g>
                  <g className={MOTION} style={fade(step >= 1)}>
                    <Atom x={s.x} y={s.y} className="fill-violet-700 dark:fill-violet-300">
                      I
                    </Atom>
                  </g>
                </g>
              ))}
              <Atom x={METHYL.x} y={METHYL.y} className="fill-foreground">
                C
              </Atom>
              {/* The H it takes on as iodoform */}
              <g className={MOTION} style={fade(step >= 2)}>
                <line x1={METHYL.x + 9} y1={METHYL.y} x2={METHYL.x + 21} y2={METHYL.y} strokeWidth={1.4} className="stroke-foreground" />
                <Atom x={METHYL.x + 29} y={METHYL.y} className="fill-foreground">
                  H
                </Atom>
              </g>
            </g>

            {/* Product labels */}
            <g className={MOTION} style={fade(step >= 2)}>
              <text x={METHYL.x + LEAVE.x + 46} y={METHYL.y + LEAVE.y + 24} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
                CHI₃, yellow solid
              </text>
              <text x={CARBONYL.x + 30} y={CARBONYL.y + 26} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                carboxylate
              </text>
            </g>
            <g className={MOTION} style={fade(step >= 3)}>
              <text x={METHYL.x + LEAVE.x + 46} y={METHYL.y + LEAVE.y + 38} className="fill-muted-foreground text-[10px] tabular-nums">
                1 carbon
              </text>
              <text x={CARBONYL.x + 30} y={CARBONYL.y + 40} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
                4 carbons (the ketone had 5)
              </text>
            </g>
            <g className={MOTION} style={fade(step === 0)}>
              <text x={METHYL.x - 10} y={METHYL.y + 58} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
                CH₃ on the C=O
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
