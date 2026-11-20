/**
 * Static figure: is a figure hidden in another (concept ssc2reffg-embedded),
 * with the concept's own example on a calculator display, where each digit is
 * made of seven straight bars. 7 uses the top bar and the two right-hand bars.
 * 9 lights those three and three more (the middle, the upper-left and the
 * bottom bar), so every bar of 7 is there, the same way up: 7 is hidden in 9.
 * Bars are named a (top), b (upper right), c (lower right), d (bottom),
 * e (lower left), f (upper left), g (middle).
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export type Bar = "a" | "b" | "c" | "d" | "e" | "f" | "g";

export const DIGIT_BARS: Record<string, readonly Bar[]> = {
  "1": ["b", "c"],
  "2": ["a", "b", "g", "e", "d"],
  "3": ["a", "b", "g", "c", "d"],
  "4": ["f", "g", "b", "c"],
  "7": ["a", "b", "c"],
  "9": ["a", "b", "c", "d", "f", "g"],
};

/** The bars of `small` that `big` does not light (empty = hidden in it). */
export const missingBars = (small: string, big: string) => DIGIT_BARS[small].filter((b) => !DIGIT_BARS[big].includes(b));
export const hiddenIn = (small: string, big: string) => missingBars(small, big).length === 0;

const W = 52;
const H = 92;
const T = 8;

/** Each bar as a rectangle inside a digit whose top-left corner is (0, 0). */
export const BAR_RECT: Record<Bar, { x: number; y: number; w: number; h: number }> = {
  a: { x: T, y: 0, w: W - 2 * T, h: T },
  b: { x: W - T, y: T, w: T, h: H / 2 - T - T / 2 },
  c: { x: W - T, y: H / 2 + T / 2, w: T, h: H / 2 - T - T / 2 },
  d: { x: T, y: H - T, w: W - 2 * T, h: T },
  e: { x: 0, y: H / 2 + T / 2, w: T, h: H / 2 - T - T / 2 },
  f: { x: 0, y: T, w: T, h: H / 2 - T - T / 2 },
  g: { x: T, y: H / 2 - T / 2, w: W - 2 * T, h: T },
};

const BARS: readonly Bar[] = ["a", "b", "c", "d", "e", "f", "g"];
const SMALL = "7";
const BIG = "9";

const OFF = "fill-none stroke-border";
const SHARED = "fill-emerald-500 stroke-emerald-700 dark:fill-emerald-400 dark:stroke-emerald-300";
const EXTRA = "fill-sky-300 stroke-sky-600 dark:fill-sky-700 dark:stroke-sky-400";

function Digit({ x, y, digit }: { x: number; y: number; digit: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {BARS.map((b) => {
        const r = BAR_RECT[b];
        const lit = DIGIT_BARS[digit].includes(b);
        const inSmall = DIGIT_BARS[SMALL].includes(b);
        const cls = !lit ? OFF : inSmall ? SHARED : EXTRA;
        return <rect key={b} x={r.x} y={r.y} width={r.w} height={r.h} rx={2} strokeWidth={1} strokeDasharray={lit ? undefined : "2 2"} className={cls} />;
      })}
    </g>
  );
}

export default function SscT2SegmentDigits() {
  const extra = DIGIT_BARS[BIG].length - DIGIT_BARS[SMALL].length;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · every bar of the figure must be in the option
      </p>
      <svg
        viewBox="0 0 320 222"
        className="block h-auto w-full"
        role="img"
        aria-label="Two calculator digits made of seven bars each. The digit 7 lights the top bar and the two right-hand bars, shown in green. The digit 9 lights the same three green bars, the same way up, plus three more in blue: the middle, the upper-left and the bottom bar. Every bar of 7 is lit in 9, so 7 is hidden in 9."
      >
        <text x={88} y={16} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          the figure: {SMALL}
        </text>
        <Digit x={62} y={28} digit={SMALL} />
        <text x={88} y={138} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          top bar and both
        </text>
        <text x={88} y={150} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          right-hand bars
        </text>

        <text x={160} y={78} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          inside?
        </text>
        <line x1={140} y1={86} x2={174} y2={86} strokeWidth={1.5} className="stroke-muted-foreground" />
        <polygon points="180,86 173,82 173,90" className="fill-muted-foreground" />

        <text x={232} y={16} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          the option: {BIG}
        </text>
        <Digit x={206} y={28} digit={BIG} />
        <text x={232} y={138} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          the same {DIGIT_BARS[SMALL].length} bars
        </text>
        <text x={232} y={150} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          plus {extra} more (blue)
        </text>

        <text x={160} y={182} textAnchor="middle" className="fill-foreground text-[11px]">
          Extra bars are allowed; turning or flipping is not.
        </text>
        <text x={160} y={204} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          {hiddenIn(SMALL, BIG) ? `Yes: ${SMALL} is hidden in ${BIG}` : `No: ${SMALL} is not hidden in ${BIG}`}
        </text>
      </svg>
    </div>
  );
}
