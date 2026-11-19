"use client";

/**
 * Animation: a rod sliding on rails in a uniform field (concept
 * jpemi-moving-rod). The charges in the moving rod feel qv × B along it, so the
 * ends charge up and an emf ε = Blv appears. With the rails closed through a
 * resistor a current flows, and that current in the field feels a force BIl
 * that points against the motion.
 *
 * Numbers: the concept's first practice item, a rod 0.5 m long moving at 4 m/s
 * across 0.3 T, so ε = 0.6 V. B points into the page. Directions come from
 * cross products (x right, y up, z out of the page): v × B is up the rod, so
 * the current runs up the rod and anticlockwise round the loop, and l × B on
 * the rod points left, against v. Pinned by tests/notes-jee-visuals-phys-b.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The concept's practice item: B in tesla, l in metres, v in m/s. */
export const ROD_EXAMPLE = { B: 0.3, l: 0.5, v: 4 } as const;

/** Motional emf ε = Blv (all three mutually perpendicular). */
export function motionalEmf(B: number, l: number, v: number): number {
  return B * l * v;
}

export type Vec = readonly [number, number, number];

/** a × b. */
export function cross(a: Vec, b: Vec): Vec {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

/** Unit directions in the drawing: x right, y up the page, z out of the page. */
export const DIR = {
  velocity: [1, 0, 0] as Vec,
  field: [0, 0, -1] as Vec, // into the page
};

/** Direction of the force on a positive charge in the rod: v × B. */
export const forceOnPositive = (): Vec => cross(DIR.velocity, DIR.field);

/** Force on the rod carrying current along `currentDir`: l × B. */
export const forceOnRod = (currentDir: Vec): Vec => cross(currentDir, DIR.field);

/**
 * Sense of the current round the loop, seen from the front: the flux into the
 * page rises as the rod moves away from the resistor, so the induced field
 * points out of the page, which needs an anticlockwise current.
 */
export const LOOP_SENSE = "anticlockwise" as const;

export const ROD_STEPS: readonly FigureStep[] = [
  {
    title: "The set-up",
    caption: "A rod of length l = 0.5 m rests across two rails joined through a resistor R. A uniform field B = 0.3 T points into the page.",
  },
  {
    title: "The rod moves at v",
    caption: "The rod slides right at 4 m/s. Each charge in it feels a magnetic force along the rod: positive charges are pushed up, negative ones down.",
  },
  {
    title: "An emf across the rod",
    caption: "Charge piles up at the ends until an electric field stops it. The upper end is positive and ε = Blv = 0.3 × 0.5 × 4 = 0.6 V.",
  },
  {
    title: "The induced current",
    caption:
      "The rails close the circuit, so a current flows up through the rod and anticlockwise round the loop. The flux into the page is rising, and this current's own field points out of the page, against the rise (Lenz's law).",
  },
  {
    title: "The force on the rod",
    caption:
      "The current in the rod feels a force BIl to the left, against v. To keep the speed steady something must push with that force, and its work becomes heat in R.",
  },
];

// Geometry (viewBox units).
const TOP = 50;
const BOTTOM = 150;
const LEFT = 30;
const RIGHT = 302;
/** x of the rod in each step: it slides right as time passes. */
export const ROD_X = [110, 150, 185, 215, 240] as const;

const AMBER_FILL = "fill-amber-600 dark:fill-amber-400";
const AMBER_TEXT = "fill-amber-700 dark:fill-amber-300";

export default function JeeMovingRodEmf() {
  const emf = motionalEmf(ROD_EXAMPLE.B, ROD_EXAMPLE.l, ROD_EXAMPLE.v);
  return (
    <StepFigure
      title="Animation · emf, current and force for a rod on rails"
      label="A rod 0.5 m long slides right at 4 metres per second on rails in a field of 0.3 tesla into the page. Its upper end becomes positive, the emf is 0.6 volts, the current runs up the rod and anticlockwise round the loop, and the magnetic force on the rod points left, against its motion."
      viewBox="0 0 320 244"
      steps={ROD_STEPS}
      note="⊗ marks the field into the page. The loop's area grows as the rod moves right."
    >
      {(step) => (
        <g>
          <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
            {ROD_STEPS[step].title}
          </text>

          {/* Field into the page */}
          {[60, 140].map((y) =>
            [62, 102, 142, 182, 222, 262].map((x) => (
              <text key={`${x}-${y}`} x={x} y={y + 4} textAnchor="middle" className="fill-muted-foreground text-[11px]">
                ⊗
              </text>
            )),
          )}

          {/* Rails and the resistor joining them */}
          <line x1={LEFT} y1={TOP} x2={RIGHT} y2={TOP} strokeWidth={2} className="stroke-foreground" />
          <line x1={LEFT} y1={BOTTOM} x2={RIGHT} y2={BOTTOM} strokeWidth={2} className="stroke-foreground" />
          <line x1={LEFT} y1={TOP} x2={LEFT} y2={BOTTOM} strokeWidth={2} className="stroke-foreground" />
          <rect x={LEFT - 6} y={86} width={12} height={28} strokeWidth={1.5} className="fill-background stroke-foreground" />
          <text x={LEFT + 10} y={104} className="fill-foreground text-[11px] font-semibold">
            R
          </text>

          {/* The current round the loop (rails and resistor) */}
          <g className={MOTION} style={{ opacity: step >= 3 ? 1 : 0 }}>
            <polygon points={`66,${TOP} 74,${TOP - 4} 74,${TOP + 4}`} className={AMBER_FILL} />
            <polygon points={`82,${BOTTOM} 74,${BOTTOM - 4} 74,${BOTTOM + 4}`} className={AMBER_FILL} />
            <polygon points={`${LEFT},76 ${LEFT - 4},68 ${LEFT + 4},68`} className={AMBER_FILL} />
            <text x={70} y={TOP - 6} textAnchor="middle" className={`${AMBER_TEXT} text-[11px] font-semibold`}>
              I
            </text>
            <text x={78} y={BOTTOM + 14} textAnchor="middle" className={`${AMBER_TEXT} text-[11px] font-semibold`}>
              I
            </text>
          </g>

          {/* The rod and everything that rides on it */}
          <g className={MOTION} style={{ transform: svgTransform({ x: ROD_X[step], y: 0 }) }}>
            <rect x={-3} y={TOP - 6} width={6} height={BOTTOM - TOP + 12} rx={1.5} className="fill-slate-500 dark:fill-slate-400" />
            <text x={-8} y={86} textAnchor="end" className="fill-foreground text-[11px]">
              l = 0.5 m
            </text>

            {/* velocity */}
            <g className={MOTION} style={{ opacity: step >= 1 ? 1 : 0 }}>
              <line x1={8} y1={82} x2={32} y2={82} strokeWidth={2} className="stroke-foreground" />
              <polygon points="40,82 31,77 31,87" className="fill-foreground" />
              <text x={10} y={75} className="fill-foreground text-[11px] font-semibold">
                v = 4 m/s
              </text>
            </g>

            {/* force on the charges inside, only while they are being sorted */}
            <g className={MOTION} style={{ opacity: step === 1 ? 1 : 0 }}>
              <text x={-14} y={112} textAnchor="middle" className="fill-rose-700 text-[12px] font-bold dark:fill-rose-300">
                +
              </text>
              <line x1={-14} y1={102} x2={-14} y2={94} strokeWidth={1.5} className="stroke-rose-600 dark:stroke-rose-400" />
              <polygon points="-14,89 -17,95 -11,95" className="fill-rose-600 dark:fill-rose-400" />
              <text x={-28} y={126} textAnchor="middle" className="fill-sky-700 text-[12px] font-bold dark:fill-sky-300">
                −
              </text>
              <line x1={-28} y1={130} x2={-28} y2={138} strokeWidth={1.5} className="stroke-sky-600 dark:stroke-sky-400" />
              <polygon points="-28,143 -31,137 -25,137" className="fill-sky-600 dark:fill-sky-400" />
            </g>

            {/* the charged ends */}
            <g className={MOTION} style={{ opacity: step >= 2 ? 1 : 0 }}>
              <text x={9} y={TOP - 8} className="fill-rose-700 text-[13px] font-bold dark:fill-rose-300">
                +
              </text>
              <text x={9} y={BOTTOM + 18} className="fill-sky-700 text-[13px] font-bold dark:fill-sky-300">
                −
              </text>
            </g>

            {/* current up the rod */}
            <g className={MOTION} style={{ opacity: step >= 3 ? 1 : 0 }}>
              <polygon points="0,96 -5,106 5,106" className={AMBER_FILL} />
              <text x={12} y={112} className={`${AMBER_TEXT} text-[11px] font-semibold`}>
                I
              </text>
            </g>

            {/* force on the rod, against v */}
            <g className={MOTION} style={{ opacity: step >= 4 ? 1 : 0 }}>
              <line x1={-8} y1={122} x2={-36} y2={122} strokeWidth={2.5} className="stroke-violet-600 dark:stroke-violet-400" />
              <polygon points="-44,122 -35,117 -35,127" className="fill-violet-600 dark:fill-violet-400" />
              <text x={-26} y={114} textAnchor="middle" className="fill-violet-700 text-[11px] font-semibold dark:fill-violet-300">
                F = BIl
              </text>
            </g>
          </g>

          {/* The arithmetic, as the steps add it */}
          <g className="text-[11px] tabular-nums">
            <text x={160} y={180} textAnchor="middle" className="fill-muted-foreground">
              B = 0.3 T into the page, l = 0.5 m
            </text>
            <text x={160} y={198} textAnchor="middle" className={`fill-foreground font-semibold ${MOTION}`} style={{ opacity: step >= 2 ? 1 : 0 }}>
              ε = Blv = 0.3 × 0.5 × 4 = {emf.toFixed(1)} V
            </text>
            <text x={160} y={216} textAnchor="middle" className={`${AMBER_TEXT} ${MOTION}`} style={{ opacity: step >= 3 ? 1 : 0 }}>
              flux into the page rising: current {LOOP_SENSE}
            </text>
            <text x={160} y={234} textAnchor="middle" className={`fill-violet-700 dark:fill-violet-300 ${MOTION}`} style={{ opacity: step >= 4 ? 1 : 0 }}>
              force on the rod points against v
            </text>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
