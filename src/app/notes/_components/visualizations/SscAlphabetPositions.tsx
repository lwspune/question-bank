/**
 * Static figure: every letter with its forward position (A = 1) above it and
 * its reverse position (Z = 1) below it (concepts sscralpo-positions and
 * sscranlt-positions). The anchors E J O T Y (5, 10, 15, 20, 25) are marked,
 * and M and W, the letters of the alphabet-number worked example, are picked
 * out: M is 13 and 14, W is 23 and 4, since reverse = 27 - forward.
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const forward = (letter: string) => ALPHABET.indexOf(letter) + 1;
export const reverse = (letter: string) => 27 - forward(letter);

/** The anchor letters, every fifth position. */
export const ANCHORS = ["E", "J", "O", "T", "Y"] as const;

/** The letters picked out on the figure. */
export const PICKED = ["M", "W"] as const;

// Geometry (viewBox units): two rows of 13 letters.
const COL_W = 22;
const X0 = 28;
const ROW_TOP = [30, 96] as const; // y of the forward number in each row

export default function SscAlphabetPositions() {
  const anchors = new Set<string>(ANCHORS);
  const picked = new Set<string>(PICKED);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · each letter counted from both ends
      </p>
      <svg
        viewBox="0 0 320 192"
        className="block h-auto w-full"
        role="img"
        aria-label="The alphabet in two rows, A to M and N to Z. Above each letter is its position counted from A, and below it its position counted from Z. A is 1 from A and 26 from Z; Z is 26 from A and 1 from Z. The anchors E, J, O, T and Y at 5, 10, 15, 20 and 25 are marked. M is 13 from A and 14 from Z; W is 23 from A and 4 from Z. The two numbers of any letter add to 27."
      >
        <text x={4} y={12} className="fill-muted-foreground text-[10px]">
          top: counted from A · bottom: counted from Z
        </text>

        {ALPHABET.split("").map((letter, k) => {
          const row = k < 13 ? 0 : 1;
          const x = X0 + COL_W * (k % 13);
          const y = ROW_TOP[row];
          const isPicked = picked.has(letter);
          const isAnchor = anchors.has(letter);
          return (
            <g key={letter}>
              {isPicked && (
                <rect
                  x={x - COL_W / 2 + 1}
                  y={y - 11}
                  width={COL_W - 2}
                  height={50}
                  rx={5}
                  className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/60 dark:stroke-amber-400"
                />
              )}
              {isAnchor && (
                <circle cx={x} cy={y + 13} r={9} className="fill-sky-100 stroke-sky-500 dark:fill-sky-950 dark:stroke-sky-400" />
              )}
              <text x={x} y={y} textAnchor="middle" className="fill-foreground text-[10px]">
                {forward(letter)}
              </text>
              <text
                x={x}
                y={y + 17}
                textAnchor="middle"
                className={
                  isPicked
                    ? "fill-amber-800 text-[12px] font-bold dark:fill-amber-200"
                    : "fill-foreground text-[12px] font-semibold"
                }
              >
                {letter}
              </text>
              <text x={x} y={y + 33} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {reverse(letter)}
              </text>
            </g>
          );
        })}

        <circle cx={10} cy={156} r={6} className="fill-sky-100 stroke-sky-500 dark:fill-sky-950 dark:stroke-sky-400" />
        <text x={20} y={159} className="fill-foreground text-[10px]">
          anchors E J O T Y: 5, 10, 15, 20, 25
        </text>
        <text x={160} y={182} textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          from Z = 27 − from A. M: 13 and 14. W: 23 and 4.
        </text>
      </svg>
    </div>
  );
}
