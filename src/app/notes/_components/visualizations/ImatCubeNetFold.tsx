"use client";

/**
 * Animation: folding the net of the IMAT concept imat-spa-nets into a cube.
 * Its worked example: a column of four squares 1, 2, 3, 4 (top to bottom),
 * with 5 on the left of 2 and 6 on the right of 2. Square 2 stays flat as the
 * base and the view is from above: a face standing up is seen as a thin strip
 * beside the base, and the last face, 4, closes the top as a lid.
 *
 * Each face is ONE group whose transform squashes it about its shared edge
 * (standing up) or flips it over (the lid), so the faces swing rather than
 * jump. The last step returns to the flat net with each opposite pair in its
 * own colour: 1 and 3, 2 and 4, 5 and 6, the concept's answer. The pairs are
 * worked out from the net by the concept's rule and pinned by
 * tests/notes-imat-visuals-logic.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type NetCell = { face: number; row: number; col: number };

/** The concept's net: 1, 2, 3, 4 down a column, 5 left of 2, 6 right of 2. */
export const CROSS_NET: readonly NetCell[] = [
  { face: 1, row: 0, col: 1 },
  { face: 5, row: 1, col: 0 },
  { face: 2, row: 1, col: 1 },
  { face: 6, row: 1, col: 2 },
  { face: 3, row: 2, col: 1 },
  { face: 4, row: 3, col: 1 },
];

/**
 * Opposite faces by the concept's rule: two squares in the same row or column
 * with exactly one square between them. If that finds two pairs, the last two
 * faces are the third pair (each face has exactly one opposite).
 */
export function oppositePairs(net: readonly NetCell[]): [number, number][] {
  const at = (r: number, c: number) => net.find((n) => n.row === r && n.col === c);
  const pairs: [number, number][] = [];
  for (const a of net) {
    for (const [dr, dc] of [
      [0, 2],
      [2, 0],
    ]) {
      const mid = at(a.row + dr / 2, a.col + dc / 2);
      const b = at(a.row + dr, a.col + dc);
      if (mid && b) pairs.push([Math.min(a.face, b.face), Math.max(a.face, b.face)]);
    }
  }
  const used = new Set(pairs.flat());
  const rest = net.map((n) => n.face).filter((f) => !used.has(f));
  if (pairs.length === 2 && rest.length === 2) pairs.push([Math.min(rest[0], rest[1]), Math.max(rest[0], rest[1])]);
  return pairs.sort((p, q) => p[0] - q[0]);
}

/** Where each face of CROSS_NET ends up when 2 is the base and the view is from above. */
export const FOLDED_PLACE: Record<number, "base" | "top" | "back" | "front" | "left" | "right"> = {
  2: "base",
  4: "top",
  1: "back",
  3: "front",
  5: "left",
  6: "right",
};
export const OPPOSITE_PLACE = { base: "top", top: "base", back: "front", front: "back", left: "right", right: "left" } as const;

export const NET_STEPS: readonly FigureStep[] = [
  {
    title: "The net",
    caption: "Six squares: 1, 2, 3 and 4 in a column, with 5 and 6 on either side of 2. Square 2 stays flat as the base.",
  },
  {
    title: "Fold 5 and 6 up",
    caption: "5 and 6 swing up about the edges they share with 2 and stand on its left and right. Seen from above, a standing face looks like a thin strip.",
  },
  {
    title: "Fold 1 and 3 up",
    caption: "1 and 3 stand up at the back and the front, facing each other. 4 is still joined to the top edge of 3.",
  },
  {
    title: "Close the lid",
    caption: "4 folds over the top and closes the cube. It faces the base, 2.",
  },
  {
    title: "Opposite pairs",
    caption: "In a straight line of three squares, the first and third are opposite: 1 and 3, 2 and 4 (with 3 between), 5 and 6.",
  },
];

// Geometry (viewBox units).
const S = 44; // side of a square
const K = 0.4; // how thin a standing face looks from above
const D = S * K; // depth of a standing-face strip
const BX = 110; // base (face 2) top-left
const BY = 64;

type Pose = { x: number; y: number; sx: number; sy: number };

/** The pose of a face's group at a step. Local squares are drawn so the hinge edge passes through (0, 0). */
export function facePose(face: number, step: number): Pose {
  const flat = step === 0 || step === 4;
  switch (face) {
    case 1:
      return { x: BX, y: BY, sx: 1, sy: step === 2 || step === 3 ? K : 1 };
    case 3:
      return { x: BX, y: BY + S, sx: 1, sy: step === 2 || step === 3 ? K : 1 };
    case 5:
      return { x: BX, y: BY, sx: flat ? 1 : K, sy: 1 };
    case 6:
      return { x: BX + S, y: BY, sx: flat ? 1 : K, sy: 1 };
    case 4:
      if (step === 2) return { x: BX, y: BY + S + D, sx: 1, sy: K };
      // The lid: hinged on the top edge of wall 3, flipped over to cover the rim.
      if (step === 3) return { x: BX - D, y: BY + S + D, sx: (S + 2 * D) / S, sy: -(S + 2 * D) / S };
      return { x: BX, y: BY + 2 * S, sx: 1, sy: 1 };
    default:
      return { x: BX, y: BY, sx: 1, sy: 1 };
  }
}

/** The local square of each face, placed so its hinge edge runs through (0, 0). */
const LOCAL: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: -S },
  2: { x: 0, y: 0 },
  3: { x: 0, y: 0 },
  4: { x: 0, y: 0 },
  5: { x: -S, y: 0 },
  6: { x: 0, y: 0 },
};

/** Centre of a face on screen at a step (for its number). */
function faceCentre(face: number, step: number): { x: number; y: number } {
  const p = facePose(face, step);
  const l = LOCAL[face];
  return { x: p.x + p.sx * (l.x + S / 2), y: p.y + p.sy * (l.y + S / 2) };
}

const NEUTRAL = "fill-sky-100 stroke-sky-700 dark:fill-sky-900/50 dark:stroke-sky-300";
const LID = "fill-indigo-200/70 stroke-indigo-700 dark:fill-indigo-700/50 dark:stroke-indigo-300";
const PAIR_FILL: Record<number, string> = {
  1: "fill-amber-200 stroke-amber-700 dark:fill-amber-800/60 dark:stroke-amber-300",
  3: "fill-amber-200 stroke-amber-700 dark:fill-amber-800/60 dark:stroke-amber-300",
  2: "fill-sky-200 stroke-sky-700 dark:fill-sky-800/60 dark:stroke-sky-300",
  4: "fill-sky-200 stroke-sky-700 dark:fill-sky-800/60 dark:stroke-sky-300",
  5: "fill-emerald-200 stroke-emerald-700 dark:fill-emerald-800/60 dark:stroke-emerald-300",
  6: "fill-emerald-200 stroke-emerald-700 dark:fill-emerald-800/60 dark:stroke-emerald-300",
};
const PAIR_TEXT = [
  { label: "1 opposite 3", cls: "fill-amber-800 dark:fill-amber-200" },
  { label: "2 opposite 4", cls: "fill-sky-800 dark:fill-sky-200" },
  { label: "5 opposite 6", cls: "fill-emerald-800 dark:fill-emerald-200" },
] as const;

/** Drawing order: base first, the lid last so it covers the others. */
const ORDER = [2, 1, 3, 5, 6, 4];

export default function ImatCubeNetFold() {
  return (
    <StepFigure
      title="Animation · folding a net into a cube"
      label="A cross-shaped net of six numbered squares folds into a cube seen from above, then the opposite pairs are shown on the flat net: 1 and 3, 2 and 4, 5 and 6"
      viewBox="0 0 320 210"
      steps={NET_STEPS}
      note="Squares that share an edge in the net become neighbours, never opposite faces. Each face has exactly one opposite, so the three pairs use all six faces."
    >
      {(step) => {
        const coloured = step === 4;
        return (
          <g>
            {ORDER.map((face) => {
              const p = facePose(face, step);
              const l = LOCAL[face];
              const cls = coloured ? PAIR_FILL[face] : face === 4 && step === 3 ? LID : NEUTRAL;
              return (
                <g key={face} className={MOTION} style={{ transform: svgTransform(p) }}>
                  <rect x={l.x} y={l.y} width={S} height={S} className={`${cls} ${MOTION}`} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                </g>
              );
            })}

            {ORDER.map((face) => {
              const c = faceCentre(face, step);
              const hidden = face === 2 && step === 3;
              const text = step === 3 && face === 4 ? "4 top" : String(face);
              return (
                <text
                  key={`n${face}`}
                  x={0}
                  y={0}
                  textAnchor="middle"
                  className={`fill-foreground text-[11px] font-semibold ${MOTION}`}
                  style={{ transform: svgTransform({ x: c.x, y: c.y + 4 }), opacity: hidden ? 0 : 1 }}
                >
                  {text}
                </text>
              );
            })}
            <text
              x={BX + S / 2}
              y={BY + S / 2 + 18}
              textAnchor="middle"
              className={`fill-muted-foreground text-[10px] ${MOTION}`}
              style={{ opacity: step === 3 ? 1 : 0 }}
            >
              2 below
            </text>

            {/* The pairs, beside the flat net. */}
            {PAIR_TEXT.map((t, i) => (
              <text
                key={t.label}
                x={236}
                y={92 + i * 20}
                className={`${t.cls} text-[11px] font-semibold ${MOTION}`}
                style={{ opacity: coloured ? 1 : 0 }}
              >
                {t.label}
              </text>
            ))}
            <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {NET_STEPS[step].title}
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
