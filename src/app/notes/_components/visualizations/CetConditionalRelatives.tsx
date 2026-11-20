/**
 * Static figure: the three relatives of a conditional as the corners of a
 * square (concept mlog-the-three-relatives). The original p → q sits top
 * left. Going ACROSS swaps the two parts (converse q → p), going DOWN negates
 * both parts (inverse ∼p → ∼q), and a DIAGONAL does both (contrapositive
 * ∼q → ∼p). The same moves link the other corners too: the converse and the
 * inverse are each the contrapositive of the other.
 *
 * Colour pairs the corners that always share a truth value: the original with
 * the contrapositive, the converse with the inverse (equivalent to each other,
 * not to the original). Every form is built here by the two moves, and the
 * pairs are checked by truth table in tests/notes-w2-21.test.ts.
 *
 * Server component, pure SVG.
 */

export type Letter = "p" | "q";
export type Part = { letter: Letter; negated: boolean };
export type Conditional = { ifPart: Part; thenPart: Part };
export type RelativeName = "original" | "converse" | "inverse" | "contrapositive";

/** Swap the two parts. */
export function swap(c: Conditional): Conditional {
  return { ifPart: c.thenPart, thenPart: c.ifPart };
}

/** Negate both parts, keeping the order. */
export function negateBoth(c: Conditional): Conditional {
  return {
    ifPart: { ...c.ifPart, negated: !c.ifPart.negated },
    thenPart: { ...c.thenPart, negated: !c.thenPart.negated },
  };
}

export const ORIGINAL: Conditional = {
  ifPart: { letter: "p", negated: false },
  thenPart: { letter: "q", negated: false },
};

export const RELATIVES: Record<RelativeName, Conditional> = {
  original: ORIGINAL,
  converse: swap(ORIGINAL),
  inverse: negateBoth(ORIGINAL),
  contrapositive: swap(negateBoth(ORIGINAL)),
};

const partText = (p: Part) => `${p.negated ? "∼" : ""}${p.letter}`;

/** The form as printed, with the ∼ the notes use. */
export function formText(c: Conditional): string {
  return `${partText(c.ifPart)} → ${partText(c.thenPart)}`;
}

/** Truth value of a conditional for given truth values of p and q. */
export function truthOf(c: Conditional, p: boolean, q: boolean): boolean {
  const val = (part: Part) => {
    const v = part.letter === "p" ? p : q;
    return part.negated ? !v : v;
  };
  return !val(c.ifPart) || val(c.thenPart);
}

/** The truth column over the rows TT, TF, FT, FF, as "T"/"F". */
export function truthColumn(c: Conditional): string {
  const rows: [boolean, boolean][] = [
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ];
  return rows.map(([p, q]) => (truthOf(c, p, q) ? "T" : "F")).join("");
}

/** Corners of the square, the pair each belongs to and its box position. */
export const CORNERS: readonly { name: RelativeName; label: string; pair: 1 | 2; x: number; y: number }[] = [
  { name: "original", label: "Original", pair: 1, x: 18, y: 44 },
  { name: "converse", label: "Converse", pair: 2, x: 186, y: 44 },
  { name: "inverse", label: "Inverse", pair: 2, x: 18, y: 168 },
  { name: "contrapositive", label: "Contrapositive", pair: 1, x: 186, y: 168 },
];

const BOX_W = 116;
const BOX_H = 48;

const PAIR_TONE = {
  1: {
    box: "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950/60 dark:stroke-emerald-400",
    text: "fill-emerald-800 dark:fill-emerald-200",
  },
  2: {
    box: "fill-amber-100 stroke-amber-600 dark:fill-amber-950/60 dark:stroke-amber-400",
    text: "fill-amber-800 dark:fill-amber-200",
  },
} as const;

const LBL = "text-[10px] font-semibold";

export default function CetConditionalRelatives() {
  const left = 18 + BOX_W;
  const right = 186;
  const topMid = 44 + BOX_H / 2;
  const botMid = 168 + BOX_H / 2;
  const leftMid = 18 + BOX_W / 2;
  const rightMid = 186 + BOX_W / 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the three relatives of a conditional
      </p>
      <svg
        viewBox="0 0 320 278"
        className="block h-auto w-full"
        role="img"
        aria-label="A square with a conditional at each corner. Top left, the original: if p then q. Top right, the converse: if q then p, made by swapping the parts. Bottom left, the inverse: if not p then not q, made by negating both parts. Bottom right, the contrapositive: if not q then not p, made by swapping and negating along the diagonal. The original and the contrapositive always share a truth value. The converse and the inverse share a truth value with each other, not with the original."
      >
        {/* Across: swap */}
        <line x1={left} y1={topMid} x2={right} y2={topMid} strokeWidth={1.4} className="stroke-sky-600 dark:stroke-sky-400" />
        <line x1={left} y1={botMid} x2={right} y2={botMid} strokeWidth={1.4} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={160} y={topMid - 5} textAnchor="middle" className={`fill-sky-700 dark:fill-sky-300 ${LBL}`}>
          swap
        </text>
        <text x={160} y={botMid - 5} textAnchor="middle" className={`fill-sky-700 dark:fill-sky-300 ${LBL}`}>
          swap
        </text>

        {/* Down: negate both */}
        <line x1={leftMid} y1={44 + BOX_H} x2={leftMid} y2={168} strokeWidth={1.4} className="stroke-rose-600 dark:stroke-rose-400" />
        <line x1={rightMid} y1={44 + BOX_H} x2={rightMid} y2={168} strokeWidth={1.4} className="stroke-rose-600 dark:stroke-rose-400" />
        <text x={leftMid + 5} y={134} className={`fill-rose-700 dark:fill-rose-300 ${LBL}`}>
          negate
        </text>
        <text x={leftMid + 5} y={146} className={`fill-rose-700 dark:fill-rose-300 ${LBL}`}>
          both
        </text>
        <text x={rightMid - 5} y={134} textAnchor="end" className={`fill-rose-700 dark:fill-rose-300 ${LBL}`}>
          negate
        </text>
        <text x={rightMid - 5} y={146} textAnchor="end" className={`fill-rose-700 dark:fill-rose-300 ${LBL}`}>
          both
        </text>

        {/* Diagonals: swap and negate */}
        <line x1={left} y1={44 + BOX_H} x2={right} y2={168} strokeWidth={1.2} strokeDasharray="4 3" className="stroke-violet-600 dark:stroke-violet-400" />
        <line x1={right} y1={44 + BOX_H} x2={left} y2={168} strokeWidth={1.2} strokeDasharray="4 3" className="stroke-violet-600 dark:stroke-violet-400" />
        <rect x={127} y={119} width={66} height={26} rx={4} className="fill-background stroke-violet-600 dark:stroke-violet-400" strokeWidth={1} />
        <text x={160} y={130} textAnchor="middle" className={`fill-violet-700 dark:fill-violet-300 ${LBL}`}>
          swap and
        </text>
        <text x={160} y={141} textAnchor="middle" className={`fill-violet-700 dark:fill-violet-300 ${LBL}`}>
          negate
        </text>

        {/* The four corners */}
        {CORNERS.map((c) => {
          const tone = PAIR_TONE[c.pair];
          return (
            <g key={c.name}>
              <rect x={c.x} y={c.y} width={BOX_W} height={BOX_H} rx={6} strokeWidth={1.4} className={tone.box} />
              <text x={c.x + BOX_W / 2} y={c.y + 17} textAnchor="middle" className={`${tone.text} text-[10px] font-semibold`}>
                {c.label}
              </text>
              <text x={c.x + BOX_W / 2} y={c.y + 36} textAnchor="middle" className="fill-foreground font-serif text-[14px]">
                {formText(RELATIVES[c.name])}
              </text>
            </g>
          );
        })}

        <text x={160} y={20} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Two moves make all three relatives
        </text>

        {/* Key: who shares a truth value */}
        <rect x={18} y={234} width={10} height={10} rx={2} strokeWidth={1.2} className={PAIR_TONE[1].box} />
        <text x={34} y={243} className="fill-foreground text-[10px]">
          Always the same truth value: original, contrapositive
        </text>
        <rect x={18} y={254} width={10} height={10} rx={2} strokeWidth={1.2} className={PAIR_TONE[2].box} />
        <text x={34} y={263} className="fill-foreground text-[10px]">
          Same as each other only: converse, inverse
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Start from p → q. Going across swaps the two parts; going down negates both parts and keeps the order; a diagonal does both.
        All four are still conditionals. Only the contrapositive always shares the original&apos;s truth value; the converse and the
        inverse are each the contrapositive of the other.
      </p>
    </div>
  );
}
