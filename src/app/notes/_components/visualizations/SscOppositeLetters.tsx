/**
 * Static figure: the alphabet folded in half (concepts sscrcdre-opposite and
 * sscrclle-opposite). A to M runs along the top row and Z to N under it,
 * backwards, so each column is a pair of opposite letters whose positions add
 * to 27. The pair G (7) and T (20) is picked out, the example the
 * coding-decoding concept's definition gives.
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Forward position: A = 1 to Z = 26. */
export const position = (letter: string) => ALPHABET.indexOf(letter) + 1;

/** The opposite letter: the one at 27 minus the position. */
export const opposite = (letter: string) => ALPHABET[27 - position(letter) - 1];

/** The 13 columns of the folded alphabet: [top letter, bottom letter]. */
export const PAIRS: readonly (readonly [string, string])[] = Array.from({ length: 13 }, (_, i) => {
  const top = ALPHABET[i];
  return [top, opposite(top)] as const;
});

/** The pair picked out on the figure. */
export const PICKED = "G";

// Geometry (viewBox units).
const COL_W = 22;
const X0 = 28; // centre of the first column
const colX = (i: number) => X0 + COL_W * i;

export default function SscOppositeLetters() {
  const pickedIndex = position(PICKED) - 1;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · fold the alphabet in half
      </p>
      <svg
        viewBox="0 0 320 168"
        className="block h-auto w-full"
        role="img"
        aria-label="The alphabet folded in half. The top row runs A to M with positions 1 to 13. Under it, the bottom row runs Z to N with positions 26 to 14. Each column is a pair of opposite letters: A and Z, B and Y, and so on to M and N. The positions in every column add to 27. The column G and T is picked out: G is 7th and T is 20th, and 7 plus 20 is 27."
      >
        {/* The picked column */}
        <rect
          x={colX(pickedIndex) - COL_W / 2 + 1}
          y={18}
          width={COL_W - 2}
          height={98}
          rx={5}
          className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/60 dark:stroke-amber-400"
        />

        <text x={4} y={12} className="fill-muted-foreground text-[10px]">
          A to M, forwards
        </text>

        {PAIRS.map(([top, bottom], i) => {
          const x = colX(i);
          const strong = i === pickedIndex;
          const letterClass = strong
            ? "fill-amber-800 text-[12px] font-bold dark:fill-amber-200"
            : "fill-foreground text-[12px] font-semibold";
          return (
            <g key={top}>
              <text x={x} y={32} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {position(top)}
              </text>
              <text x={x} y={50} textAnchor="middle" className={letterClass}>
                {top}
              </text>
              <line x1={x} y1={56} x2={x} y2={74} strokeDasharray="2 2" className="stroke-muted-foreground" />
              <text x={x} y={88} textAnchor="middle" className={letterClass}>
                {bottom}
              </text>
              <text x={x} y={106} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {position(bottom)}
              </text>
            </g>
          );
        })}

        <text x={4} y={128} className="fill-muted-foreground text-[10px]">
          Z to N, backwards
        </text>

        <text x={160} y={146} textAnchor="middle" className="fill-foreground text-[11px]">
          Every column adds to 27.
        </text>
        <text x={160} y={162} textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          G is 7th and T is 20th: 7 + 20 = 27
        </text>
      </svg>
    </div>
  );
}
