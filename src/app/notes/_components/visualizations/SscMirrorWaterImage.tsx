/**
 * Static figure: a string in a mirror beside it and in a mirror below it
 * (concepts sscrmile-mirror and sscrmile-water), drawn with their worked
 * examples:
 * - FAN32 with a mirror on its right: the image reads 2, 3, N, A, F, each
 *   character flipped left to right; A is the same on both sides and stays.
 * - CODE5 with a mirror below it: the order stays, each character flips top to
 *   bottom; C, O, D and E are the same at top and bottom and stay, 5 does not.
 * Each image is a true reflection of the string about its mirror line (an SVG
 * reflection, not a hand-drawn glyph), so the order and the flips are exact.
 * The "same" lists are the concept's own lists (sscrmile-chars). Server
 * component. Pinned by tests/notes-ssc-visuals.test.ts.
 */

/** Unchanged in a mirror beside the string (left to right), from sscrmile-chars. */
export const SAME_LEFT_RIGHT: readonly string[] = [
  "A", "H", "I", "M", "O", "T", "U", "V", "W", "X", "Y",
  "i", "l", "o", "v", "w", "x",
  "0", "8",
];

/** Unchanged in a mirror below the string (top to bottom), from sscrmile-chars. */
export const SAME_TOP_BOTTOM: readonly string[] = ["B", "C", "D", "E", "H", "I", "K", "O", "X", "0", "3", "8"];

/** The worked examples. */
export const MIRROR_EXAMPLE = "FAN32";
export const WATER_EXAMPLE = "CODE5";

/** How the image reads from left to right in a mirror beside the string. */
export const mirrorRead = (s: string): string[] => [...s].reverse();
/** How the image reads from left to right in a mirror below the string. */
export const waterRead = (s: string): string[] => [...s];

/** The characters of s that look unchanged in that mirror. */
export const sameInMirror = (s: string) => [...s].filter((c) => SAME_LEFT_RIGHT.includes(c));
export const sameInWater = (s: string) => [...s].filter((c) => SAME_TOP_BOTTOM.includes(c));

// Geometry (viewBox units).
export const MIRROR_X = 160;
export const MIRROR_CHAR_X: readonly number[] = [40, 60, 80, 100, 120];
/** Where a character at x lands in the mirror at MIRROR_X. */
export const reflectX = (x: number) => 2 * MIRROR_X - x;

export const WATER_Y = 161;
const WATER_BASE = 156;
const WATER_CHAR_X: readonly number[] = [110, 135, 160, 185, 210];
const MIRROR_BASE = 52;

const SAME = "fill-emerald-600 dark:fill-emerald-400";
const CHANGED = "fill-rose-600 dark:fill-rose-400";

export default function SscMirrorWaterImage() {
  const mirrorChars = [...MIRROR_EXAMPLE];
  const waterChars = [...WATER_EXAMPLE];
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a mirror beside the string and a mirror below it
      </p>
      <svg
        viewBox="0 0 320 222"
        className="block h-auto w-full"
        role="img"
        aria-label="Top: the string FAN32 with a mirror on its right. The image reads 2, 3, N, A, F from left to right, each character flipped left to right; only A looks the same. Bottom: the string CODE5 with a mirror below it, like water. The image keeps the order C, O, D, E, 5 and flips each character top to bottom; C, O, D and E look the same, 5 is upside down."
      >
        {/* Top panel: mirror beside */}
        <text x={6} y={14} className="fill-foreground text-[11px] font-semibold">
          Mirror on the right
        </text>
        {mirrorChars.map((c, i) => (
          <text key={i} x={MIRROR_CHAR_X[i]} y={MIRROR_BASE} textAnchor="middle" className="fill-foreground text-[22px] font-semibold">
            {c}
          </text>
        ))}
        <line x1={MIRROR_X} y1={22} x2={MIRROR_X} y2={64} strokeWidth={3} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={MIRROR_X} y={76} textAnchor="middle" className="fill-sky-700 text-[10px] dark:fill-sky-300">
          mirror
        </text>
        {/* The image: the same characters reflected about the mirror line */}
        <g transform={`translate(${2 * MIRROR_X}, 0) scale(-1, 1)`}>
          {mirrorChars.map((c, i) => (
            <text
              key={i}
              x={MIRROR_CHAR_X[i]}
              y={MIRROR_BASE}
              textAnchor="middle"
              className={`${SAME_LEFT_RIGHT.includes(c) ? SAME : CHANGED} text-[22px] font-semibold`}
            >
              {c}
            </text>
          ))}
        </g>
        <text x={80} y={76} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          string
        </text>
        <text x={240} y={76} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          image
        </text>
        <text x={6} y={93} className="fill-foreground text-[10px]">
          Order reverses: 2, 3, N, A, F.
        </text>
        <text x={6} y={106} className="text-[10px]">
          <tspan className="fill-emerald-700 font-semibold dark:fill-emerald-300">A stays the same</tspan>
          <tspan className="fill-foreground">; </tspan>
          <tspan className="fill-rose-700 font-semibold dark:fill-rose-300">2, 3, N, F come out reversed</tspan>
        </text>

        <line x1={0} y1={116} x2={320} y2={116} strokeDasharray="3 3" className="stroke-border" />

        {/* Bottom panel: mirror below (water image) */}
        <text x={6} y={132} className="fill-foreground text-[11px] font-semibold">
          Mirror below: the water image
        </text>
        {waterChars.map((c, i) => (
          <text key={i} x={WATER_CHAR_X[i]} y={WATER_BASE} textAnchor="middle" className="fill-foreground text-[22px] font-semibold">
            {c}
          </text>
        ))}
        <line x1={86} y1={WATER_Y} x2={234} y2={WATER_Y} strokeWidth={3} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={240} y={WATER_Y + 3} className="fill-sky-700 text-[10px] dark:fill-sky-300">
          mirror (water)
        </text>
        <g transform={`translate(0, ${2 * WATER_Y}) scale(1, -1)`}>
          {waterChars.map((c, i) => (
            <text
              key={i}
              x={WATER_CHAR_X[i]}
              y={WATER_BASE}
              textAnchor="middle"
              className={`${SAME_TOP_BOTTOM.includes(c) ? SAME : CHANGED} text-[22px] font-semibold`}
            >
              {c}
            </text>
          ))}
        </g>
        <text x={80} y={152} textAnchor="end" className="fill-muted-foreground text-[10px]">
          string
        </text>
        <text x={80} y={178} textAnchor="end" className="fill-muted-foreground text-[10px]">
          image
        </text>
        <text x={6} y={202} className="fill-foreground text-[10px]">
          Order stays: C, O, D, E, 5.
        </text>
        <text x={6} y={215} className="text-[10px]">
          <tspan className="fill-emerald-700 font-semibold dark:fill-emerald-300">C, O, D, E stay the same</tspan>
          <tspan className="fill-foreground">; </tspan>
          <tspan className="fill-rose-700 font-semibold dark:fill-rose-300">5 is flipped upside down</tspan>
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A mirror beside the string reverses the order and flips each character left to right; nothing turns upside down. A mirror below
        keeps the order and flips each character top to bottom. A character the same on both sides of that mirror looks unchanged.
      </p>
    </div>
  );
}
