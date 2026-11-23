"use client";

/**
 * Animation: the same Co³⁺ ion (3d⁶) with a weak-field and a strong-field
 * ligand, in valence bond orbital boxes (concepts
 * cetcc-unpaired-electrons-and-magnetism and cetcc-hybridisation-and-geometry).
 *
 * - Free Co³⁺: one 3d pair and four single electrons, 4 unpaired.
 * - [CoF₆]³⁻: F⁻ is weak field, the 3d electrons stay put, and the six ligand
 *   pairs enter 4s, 4p and 4d: sp³d², outer orbital, high spin, n = 4,
 *   μ = √(4 × 6) = 4.90 BM.
 * - [Co(NH₃)₆]³⁺: NH₃ is strong field with Co³⁺. Two single electrons move
 *   and pair (each arrow slides and flips), freeing two 3d orbitals; the six
 *   pairs enter 3d, 3d, 4s, 4p, 4p, 4p: d²sp³, inner orbital, low spin, n = 0,
 *   μ = 0, diamagnetic.
 *
 * Pinned by tests/notes-cet-visuals-chem-a.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const D_ELECTRONS = 6;

/** Orbital columns, in order: five 3d, one 4s, three 4p, two 4d. */
export const ORBITALS = ["3d", "3d", "3d", "3d", "3d", "4s", "4p", "4p", "4p", "4d", "4d"] as const;
export const BOX_X = [96, 114, 132, 150, 168, 192, 216, 234, 252, 276, 294] as const;
const BOX = 18;

export type Electron = { box: number; spin: "up" | "down" };

/** Co³⁺ 3d⁶ as a free ion: a pair in the first 3d box, one electron in each of the other four. */
export const FREE_ION: readonly Electron[] = [
  { box: 0, spin: "up" },
  { box: 0, spin: "down" },
  { box: 1, spin: "up" },
  { box: 2, spin: "up" },
  { box: 3, spin: "up" },
  { box: 4, spin: "up" },
];

/** After a strong-field ligand: the electrons in boxes 3 and 4 have paired into boxes 1 and 2. */
export const PAIRED: readonly Electron[] = [
  FREE_ION[0],
  FREE_ION[1],
  FREE_ION[2],
  FREE_ION[3],
  { box: 1, spin: "down" },
  { box: 2, spin: "down" },
];

/** Boxes the six ligand electron pairs go into. */
export const LIGAND_BOXES = {
  weak: [5, 6, 7, 8, 9, 10],
  strong: [3, 4, 5, 6, 7, 8],
} as const;

/** The hybridisation the six ligand boxes spell out, e.g. ["3d","3d","4s","4p","4p","4p"] → "d²sp³". */
export function hybridName(boxes: readonly number[]): string {
  const n = (sub: string) => boxes.filter((b) => ORBITALS[b] === sub).length;
  const SUP = ["", "", "²", "³"];
  const p = n("4p") ? `p${SUP[n("4p")]}` : "";
  const s = n("4s") ? "s" : "";
  const inner = n("3d");
  const outer = n("4d");
  if (inner) return `d${SUP[inner]}${s}${p}`;
  return `${s}${p}${outer ? `d${SUP[outer]}` : ""}`;
}

/** Unpaired electrons in an arrangement. */
export function unpaired(arr: readonly Electron[]): number {
  const count = new Map<number, number>();
  for (const e of arr) count.set(e.box, (count.get(e.box) ?? 0) + 1);
  return [...count.values()].filter((c) => c === 1).length;
}

/** Spin-only magnetic moment μ = √(n(n + 2)) in BM. */
export function spinOnlyMoment(n: number): number {
  return Math.sqrt(n * (n + 2));
}

export const PAIRING_STEPS: readonly FigureStep[] = [
  {
    title: "Free Co³⁺ ion",
    caption: "Co³⁺ is 3d⁶: one 3d orbital holds a pair and four hold one electron each. Four unpaired electrons.",
  },
  {
    title: "Weak field: F⁻",
    caption:
      "F⁻ is a weak-field ligand, so the 3d electrons stay as in the free ion. The six F⁻ pairs go into 4s, three 4p and two 4d orbitals: sp³d², outer orbital, high spin. n = 4, μ = √(4 × 6) = 4.90 BM.",
  },
  {
    title: "Strong field: NH₃",
    caption: "NH₃ is a strong-field ligand with Co³⁺. Before it binds, the 3d electrons are as in the free ion.",
  },
  {
    title: "Electrons pair up",
    caption: "The strong-field ligand pairs the four single electrons into three 3d orbitals, leaving two 3d orbitals empty.",
  },
  {
    title: "Inner-orbital complex",
    caption:
      "The six NH₃ pairs go into two 3d, the 4s and three 4p orbitals: d²sp³, inner orbital, low spin. n = 0, so μ = 0: diamagnetic.",
  },
];

const PAIR_STEP = 3;
const BIND_STEP = 4;

/** The NH₃ row's electrons at a step: as the free ion until they pair. */
export function strongElectrons(step: number): readonly Electron[] {
  return step >= PAIR_STEP ? PAIRED : FREE_ION;
}

/** Steps from which each row is drawn. */
export const ROW_FROM = { free: 0, weak: 1, strong: 2 } as const;
export const ROW_Y = { free: 48, weak: 106, strong: 164 } as const;

/** The pose of an electron arrow: x, y of its centre and its turn (0 up, 180 down). */
export function electronPose(e: Electron, rowY: number): { x: number; y: number; angle: number } {
  return { x: BOX_X[e.box] + (e.spin === "up" ? 5.5 : 12.5), y: rowY + BOX / 2, angle: e.spin === "up" ? 0 : 180 };
}

const fmt2 = (x: number) => x.toFixed(2);

function Arrow() {
  // An up arrow about (0,0), 12 tall; a down arrow is this turned 180°.
  return (
    <>
      <line x1={0} y1={6} x2={0} y2={-6} stroke="currentColor" strokeWidth={1.6} />
      <path d="M-3,-2 L0,-6 L3,-2" stroke="currentColor" strokeWidth={1.6} fill="none" />
    </>
  );
}

function Boxes({ y }: { y: number }) {
  return (
    <g>
      {BOX_X.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={BOX}
          height={BOX}
          strokeWidth={1}
          className={i >= 9 ? "fill-background stroke-muted-foreground" : "fill-background stroke-foreground"}
          strokeDasharray={i >= 9 ? "3 2" : undefined}
        />
      ))}
    </g>
  );
}

function LigandPairs({ boxes, y }: { boxes: readonly number[]; y: number }) {
  return (
    <g>
      {boxes.map((b) => (
        <g key={b}>
          <circle cx={BOX_X[b] + BOX / 2 - 3.5} cy={y + BOX / 2} r={2.2} className="fill-amber-600 dark:fill-amber-400" />
          <circle cx={BOX_X[b] + BOX / 2 + 3.5} cy={y + BOX / 2} r={2.2} className="fill-amber-600 dark:fill-amber-400" />
        </g>
      ))}
      <line
        x1={BOX_X[boxes[0]]}
        y1={y + BOX + 4}
        x2={BOX_X[boxes[boxes.length - 1]] + BOX}
        y2={y + BOX + 4}
        strokeWidth={2}
        className="stroke-amber-600 dark:stroke-amber-400"
      />
    </g>
  );
}

function RowName({ y, name, sub }: { y: number; name: string; sub: string }) {
  return (
    <g>
      <text x={8} y={y + 13} className="fill-foreground text-[11px] font-semibold">
        {name}
      </text>
      <text x={8} y={y + 27} className="fill-muted-foreground text-[9.5px]">
        {sub}
      </text>
    </g>
  );
}

export default function CetDElectronPairing() {
  const muWeak = spinOnlyMoment(unpaired(FREE_ION));
  return (
    <StepFigure
      title="Animation · a weak and a strong field ligand on cobalt(III)"
      label="Orbital boxes for Co3+, 3d6, with four unpaired electrons. With weak-field F minus the electrons stay unpaired and the six ligand pairs use 4s, 4p and 4d: sp3d2, high spin, 4 unpaired, 4.90 BM. With strong-field NH3 two electrons pair up, freeing two 3d orbitals; the six pairs use 3d, 4s and 4p: d2sp3, low spin, no unpaired electrons, diamagnetic."
      viewBox="0 0 320 218"
      steps={PAIRING_STEPS}
      note="Arrows: the metal's own d electrons. Dot pairs: an electron pair given by a ligand. Amber bar: the six hybrid orbitals. Dashed boxes: 4d."
    >
      {(step) => (
        <g>
          {/* Subshell names */}
          {[
            { t: "3d", x: BOX_X[0] + (5 * BOX) / 2 },
            { t: "4s", x: BOX_X[5] + BOX / 2 },
            { t: "4p", x: BOX_X[6] + (3 * BOX) / 2 },
            { t: "4d", x: BOX_X[9] + BOX },
          ].map((h) => (
            <text key={h.t} x={h.x} y={40} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
              {h.t}
            </text>
          ))}

          {/* Free ion */}
          <g>
            <RowName y={ROW_Y.free} name="Free Co³⁺" sub="3d⁶" />
            <Boxes y={ROW_Y.free} />
            {FREE_ION.map((e, i) => (
              <g key={i} className="text-indigo-700 dark:text-indigo-300" style={{ transform: svgTransform(electronPose(e, ROW_Y.free)) }}>
                <Arrow />
              </g>
            ))}
            <text x={BOX_X[0]} y={ROW_Y.free + 34} className="fill-foreground text-[10px]">
              {unpaired(FREE_ION)} unpaired
            </text>
          </g>

          {/* Weak field: [CoF6]3- */}
          <g className={MOTION} style={{ opacity: step >= ROW_FROM.weak ? 1 : 0 }}>
            <RowName y={ROW_Y.weak} name="[CoF₆]³⁻" sub="F⁻: weak field" />
            <Boxes y={ROW_Y.weak} />
            {FREE_ION.map((e, i) => (
              <g key={i} className="text-indigo-700 dark:text-indigo-300" style={{ transform: svgTransform(electronPose(e, ROW_Y.weak)) }}>
                <Arrow />
              </g>
            ))}
            <LigandPairs boxes={LIGAND_BOXES.weak} y={ROW_Y.weak} />
            <text x={BOX_X[0]} y={ROW_Y.weak + 36} className="fill-foreground text-[10px] font-semibold">
              {hybridName(LIGAND_BOXES.weak)}, outer orbital, high spin
            </text>
            <text x={BOX_X[0]} y={ROW_Y.weak + 49} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
              n = {unpaired(FREE_ION)}, μ = √24 = {fmt2(muWeak)} BM
            </text>
          </g>

          {/* Strong field: [Co(NH3)6]3+ */}
          <g className={MOTION} style={{ opacity: step >= ROW_FROM.strong ? 1 : 0 }}>
            <RowName y={ROW_Y.strong} name="[Co(NH₃)₆]³⁺" sub="NH₃: strong field" />
            <Boxes y={ROW_Y.strong} />
            {strongElectrons(step).map((e, i) => (
              <g
                key={i}
                className={`text-indigo-700 dark:text-indigo-300 ${MOTION}`}
                style={{ transform: svgTransform(electronPose(e, ROW_Y.strong)) }}
              >
                <Arrow />
              </g>
            ))}
            <g className={MOTION} style={{ opacity: step >= BIND_STEP ? 1 : 0 }}>
              <LigandPairs boxes={LIGAND_BOXES.strong} y={ROW_Y.strong} />
              <text x={BOX_X[0]} y={ROW_Y.strong + 36} className="fill-foreground text-[10px] font-semibold">
                {hybridName(LIGAND_BOXES.strong)}, inner orbital, low spin
              </text>
              <text x={BOX_X[0]} y={ROW_Y.strong + 49} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                n = {unpaired(PAIRED)}, μ = 0: diamagnetic
              </text>
            </g>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
