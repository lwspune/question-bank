"use client";

/**
 * Animation: the Z scheme of the light reaction, in the NEET concept's own
 * terms (nbops-light-reaction).
 *
 * PS II (P680) is excited by 680 nm light and its electrons go to an acceptor,
 * then down an electron transport system of cytochromes to PS I (P700). PS I,
 * excited by 700 nm light, passes them to another acceptor and on to NADP⁺,
 * which becomes NADPH + H⁺. ATP is made on the way. The water-splitting
 * complex, linked to PS II, splits 2H₂O into 4H⁺ + O₂ + 4e⁻ and its electrons
 * replace those PS II lost. In cyclic flow the electrons leave PS I and come
 * back to PS I through the electron transport system: ATP only.
 *
 * Each electron is one shape whose transform and opacity change between
 * steps. The poses are exported and pinned by
 * tests/notes-neet-visuals-bio-a.test.ts: the electron visits PS II's acceptor,
 * PS I, PS I's acceptor and NADP⁺ in that order, each excitation lifts it, and
 * water splitting sits at PS II (the concept's trap: it is not part of PS I).
 * No CO₂ anywhere: the light reaction does not need it.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const Z_SCHEME_STEPS: readonly FigureStep[] = [
  {
    title: "PS II is excited",
    caption: "PS II absorbs 680 nm light. Its reaction centre, P680, loses excited electrons to an acceptor.",
  },
  {
    title: "Down the cytochromes",
    caption:
      "The electrons pass down an electron transport system of cytochromes to PS I. On the way ATP is made from ADP and inorganic phosphate.",
  },
  {
    title: "PS I is excited",
    caption: "PS I absorbs 700 nm light. Its reaction centre, P700, passes excited electrons to another acceptor.",
  },
  {
    title: "NADP⁺ is reduced",
    caption: "The electrons go on to NADP⁺, which becomes NADPH + H⁺. Drawn out, this path is the Z scheme.",
  },
  {
    title: "Splitting of water",
    caption:
      "The water-splitting complex, linked to PS II, splits water: 2H₂O gives 4H⁺ + O₂ + 4e⁻. These electrons replace those PS II lost, and O₂ is released.",
  },
  {
    title: "Cyclic flow",
    caption:
      "When only PS I works, its electrons leave PS I and come back to it through the electron transport system. This cyclic route makes ATP only: no NADPH and no O₂.",
  },
];

/** The two photosystems: reaction centre (low) and the acceptor its excited electrons reach (high). */
export const PHOTOSYSTEMS = {
  psII: { name: "PS II", centre: "P680", nm: 680, rc: { x: 62, y: 166 }, acceptor: { x: 88, y: 50 } },
  psI: { name: "PS I", centre: "P700", nm: 700, rc: { x: 200, y: 142 }, acceptor: { x: 222, y: 34 } },
} as const;

/** Where NADP⁺ takes the electrons. */
export const NADP = { x: 284, y: 82 } as const;

/** Where the cytochrome chain ends, at the top of the PS I box. */
const ETS_END = { x: 190, y: 132 };

/** What each route makes (the concept's table). */
export const NON_CYCLIC = { photosystems: ["PS II", "PS I"], products: ["ATP", "NADPH + H⁺", "O₂"] } as const;
export const CYCLIC = { photosystems: ["PS I"], products: ["ATP"] } as const;

/** The splitting of water, as the concept writes it. */
export const WATER_SPLIT = {
  water: 2,
  protons: 4,
  oxygen: 1,
  electrons: 4,
  text: "2H₂O → 4H⁺ + O₂ + 4e⁻",
  at: { x: 62, y: 206 },
} as const;

/** The cyclic loop: from PS I's acceptor back into the cytochrome chain. */
export const CYCLIC_PATH = { from: { x: 218, y: 36 }, control: { x: 168, y: 0 }, to: { x: 146, y: 97 } } as const;

export type Pose = { x: number; y: number; opacity: number };

/** The non-cyclic electron at each step: PS II's acceptor, PS I, PS I's acceptor, NADP⁺, then used up. */
export function electronPose(step: number): Pose {
  if (step <= 0) return { ...PHOTOSYSTEMS.psII.acceptor, opacity: 1 };
  if (step === 1) return { ...ETS_END, opacity: 1 };
  if (step === 2) return { ...PHOTOSYSTEMS.psI.acceptor, opacity: 1 };
  return { ...NADP, opacity: step === 3 ? 1 : 0 };
}

/** An electron from water: unseen until water is split, then it fills PS II. */
export function waterElectronPose(step: number): Pose {
  if (step < 4) return { x: WATER_SPLIT.at.x, y: WATER_SPLIT.at.y - 10, opacity: 0 };
  return { x: PHOTOSYSTEMS.psII.rc.x - 34, y: PHOTOSYSTEMS.psII.rc.y, opacity: 1 };
}

/** Point t (0 to 1) on the cyclic loop. */
export function cyclicPoint(t: number): { x: number; y: number } {
  const { from: a, control: c, to: b } = CYCLIC_PATH;
  const u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
}

/** An electron on the cyclic loop: shown only in the last step. */
export function cyclicElectronPose(step: number): Pose {
  const p = cyclicPoint(step >= 5 ? 0.5 : 0);
  return { ...p, opacity: step >= 5 ? 1 : 0 };
}

function Electron({ pose }: { pose: Pose }) {
  return (
    <g className={MOTION} style={{ transform: svgTransform({ x: pose.x, y: pose.y }), opacity: pose.opacity }}>
      <circle r={7.5} className="fill-amber-300 stroke-amber-700 dark:fill-amber-600 dark:stroke-amber-300" strokeWidth={1} />
      <text y={3.5} textAnchor="middle" className="fill-amber-950 text-[10px] font-bold dark:fill-amber-50">
        e⁻
      </text>
    </g>
  );
}

function Photosystem({ x, y, name, centre }: { x: number; y: number; name: string; centre: string }) {
  return (
    <g>
      <rect
        x={x - 24}
        y={y - 12}
        width={48}
        height={30}
        rx={6}
        className="fill-emerald-200 stroke-emerald-600 dark:fill-emerald-900 dark:stroke-emerald-400"
        strokeWidth={1.5}
      />
      <text x={x} y={y + 1} textAnchor="middle" className="fill-emerald-950 text-[11px] font-bold dark:fill-emerald-100">
        {name}
      </text>
      <text x={x} y={y + 13} textAnchor="middle" className="fill-emerald-900 text-[10px] dark:fill-emerald-200">
        {centre}
      </text>
    </g>
  );
}

export default function NeetZScheme() {
  const { psII, psI } = PHOTOSYSTEMS;
  const c = CYCLIC_PATH;
  return (
    <StepFigure
      title="Animation · the Z scheme of the light reaction"
      label="Light excites PS II, its electrons pass down cytochromes to PS I, light excites PS I, and the electrons reduce NADP⁺ to NADPH; water split at PS II replaces the electrons; in cyclic flow electrons return to PS I and only ATP is made"
      viewBox="0 0 320 236"
      steps={Z_SCHEME_STEPS}
      note="Light excites each photosystem in turn; between them the electrons pass down the cytochromes."
    >
      {(step) => (
        <g>
          <defs>
            <marker id="zs-e" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
            </marker>
            <marker id="zs-light" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" className="fill-yellow-500 dark:fill-yellow-400" />
            </marker>
          </defs>

          {/* Cyclic flow label and loop (last step). */}
          <text
            x={150}
            y={14}
            textAnchor="middle"
            className={`fill-violet-700 text-[10px] font-semibold dark:fill-violet-300 ${MOTION}`}
            style={{ opacity: step >= 5 ? 1 : 0 }}
          >
            Cyclic flow: PS I only, ATP only
          </text>
          <path
            d={`M${c.from.x},${c.from.y} Q${c.control.x},${c.control.y} ${c.to.x},${c.to.y}`}
            fill="none"
            strokeDasharray="4 3"
            markerEnd="url(#zs-e)"
            className={`stroke-violet-600 dark:stroke-violet-400 ${MOTION}`}
            strokeWidth={1.5}
            style={{ opacity: step >= 5 ? 1 : 0 }}
          />

          {/* PS II excitation: light lifts the electron to the acceptor. */}
          <line
            x1={psII.rc.x + 4}
            y1={psII.rc.y - 14}
            x2={psII.acceptor.x - 2}
            y2={psII.acceptor.y + 8}
            markerEnd="url(#zs-e)"
            className="stroke-amber-600 dark:stroke-amber-400"
            strokeWidth={1.5}
          />
          <line x1={14} y1={98} x2={36} y2={146} markerEnd="url(#zs-light)" className="stroke-yellow-500 dark:stroke-yellow-400" strokeWidth={2} />
          <text x={6} y={88} className="fill-foreground text-[10px] font-medium">
            680 nm light
          </text>
          <text x={78} y={46} textAnchor="end" className="fill-muted-foreground text-[10px]">
            acceptor
          </text>
          <circle cx={psII.acceptor.x} cy={psII.acceptor.y} r={4} className="fill-muted-foreground" />

          {/* Electron transport system of cytochromes, PS II acceptor down to PS I. */}
          <line
            x1={psII.acceptor.x}
            y1={psII.acceptor.y}
            x2={ETS_END.x}
            y2={ETS_END.y}
            markerEnd="url(#zs-e)"
            className={`stroke-amber-600 dark:stroke-amber-400 ${MOTION}`}
            strokeWidth={1.5}
            style={{ opacity: step >= 1 ? 1 : 0.25 }}
          />
          <text x={133} y={104} textAnchor="middle" transform="rotate(38.79 133 101)" className="fill-foreground text-[10px] font-medium">
            cytochromes
          </text>
          <text
            x={96}
            y={142}
            className={`fill-sky-700 text-[10px] font-semibold dark:fill-sky-300 ${MOTION}`}
            style={{ opacity: step >= 1 ? 1 : 0 }}
          >
            ADP + Pi → ATP
          </text>

          {/* PS I excitation. */}
          <line
            x1={psI.rc.x + 4}
            y1={psI.rc.y - 14}
            x2={psI.acceptor.x - 2}
            y2={psI.acceptor.y + 8}
            markerEnd="url(#zs-e)"
            className={`stroke-amber-600 dark:stroke-amber-400 ${MOTION}`}
            strokeWidth={1.5}
            style={{ opacity: step >= 2 ? 1 : 0.25 }}
          />
          <line x1={300} y1={150} x2={232} y2={128} markerEnd="url(#zs-light)" className="stroke-yellow-500 dark:stroke-yellow-400" strokeWidth={2} />
          <text x={314} y={168} textAnchor="end" className="fill-foreground text-[10px] font-medium">
            700 nm light
          </text>
          <text x={232} y={30} className="fill-muted-foreground text-[10px]">
            acceptor
          </text>
          <circle cx={psI.acceptor.x} cy={psI.acceptor.y} r={4} className="fill-muted-foreground" />

          {/* On to NADP⁺. */}
          <line
            x1={psI.acceptor.x}
            y1={psI.acceptor.y}
            x2={NADP.x - 4}
            y2={NADP.y - 4}
            markerEnd="url(#zs-e)"
            className={`stroke-amber-600 dark:stroke-amber-400 ${MOTION}`}
            strokeWidth={1.5}
            style={{ opacity: step >= 3 ? 1 : 0.25 }}
          />
          <text
            x={316}
            y={104}
            textAnchor="end"
            className={`fill-sky-700 text-[10px] font-semibold dark:fill-sky-300 ${MOTION}`}
            style={{ opacity: step >= 3 ? 1 : 0.35 }}
          >
            NADP⁺ → NADPH + H⁺
          </text>

          {/* Water splitting at PS II. */}
          <line
            x1={WATER_SPLIT.at.x}
            y1={WATER_SPLIT.at.y - 10}
            x2={psII.rc.x}
            y2={psII.rc.y + 22}
            markerEnd="url(#zs-e)"
            className={`stroke-amber-600 dark:stroke-amber-400 ${MOTION}`}
            strokeWidth={1.5}
            style={{ opacity: step >= 4 ? 1 : 0.25 }}
          />
          <text
            x={6}
            y={WATER_SPLIT.at.y + 4}
            className={`fill-foreground text-[10px] font-semibold ${MOTION}`}
            style={{ opacity: step >= 4 ? 1 : 0.35 }}
          >
            {WATER_SPLIT.text}
          </text>
          <text
            x={6}
            y={WATER_SPLIT.at.y + 18}
            className={`fill-muted-foreground text-[10px] ${MOTION}`}
            style={{ opacity: step >= 4 ? 1 : 0.35 }}
          >
            water-splitting complex (with PS II)
          </text>
          <text
            x={150}
            y={WATER_SPLIT.at.y + 4}
            className={`fill-sky-700 text-[10px] font-semibold dark:fill-sky-300 ${MOTION}`}
            style={{ opacity: step >= 4 ? 1 : 0 }}
          >
            O₂ released
          </text>

          <Photosystem x={psII.rc.x} y={psII.rc.y} name={psII.name} centre={psII.centre} />
          <Photosystem x={psI.rc.x} y={psI.rc.y} name={psI.name} centre={psI.centre} />

          <Electron pose={electronPose(step)} />
          <Electron pose={waterElectronPose(step)} />
          <Electron pose={cyclicElectronPose(step)} />
        </g>
      )}
    </StepFigure>
  );
}
