/**
 * Static figure: completing a pattern symmetric about both centre lines
 * (concept sscrefpc-symmetry, its worked example). The top-left quarter has a
 * dot near the square's outer top-left corner. Reflected in the horizontal
 * line it lands near the outer bottom-left corner; that reflected in the
 * vertical line lands near the outer bottom-right corner, the missing
 * quarter. Each reflection keeps the dot's distance from the line.
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

// The square (viewBox units) and its two centre lines.
export const SQ = { x: 90, y: 16, size: 140 } as const;
export const MID_X = SQ.x + SQ.size / 2;
export const MID_Y = SQ.y + SQ.size / 2;

export type Pt = { x: number; y: number };

/** Reflect in the vertical centre line: left and right swap, height stays. */
export const reflectInVertical = (p: Pt): Pt => ({ x: 2 * MID_X - p.x, y: p.y });
/** Reflect in the horizontal centre line: top and bottom swap. */
export const reflectInHorizontal = (p: Pt): Pt => ({ x: p.x, y: 2 * MID_Y - p.y });

/** The dot given in the top-left quarter, near the outer top-left corner. */
export const TOP_LEFT: Pt = { x: SQ.x + 16, y: SQ.y + 16 };
export const BOTTOM_LEFT = reflectInHorizontal(TOP_LEFT);
export const TOP_RIGHT = reflectInVertical(TOP_LEFT);
/** The answer: the bottom-left dot reflected in the vertical line. */
export const BOTTOM_RIGHT = reflectInVertical(BOTTOM_LEFT);

export default function SscSymmetryQuarters() {
  const { x, y, size } = SQ;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reflect, do not copy
      </p>
      <svg
        viewBox="0 0 320 228"
        className="block h-auto w-full"
        role="img"
        aria-label="A square split into four quarters by its two centre lines, symmetric about both. The top-left quarter has a dot near the square's outer top-left corner, and the top-right quarter a dot near the outer top-right corner. Step 1: reflecting the top-left quarter in the horizontal line puts a dot near the outer bottom-left corner. Step 2: reflecting that in the vertical line puts the dot of the missing bottom-right quarter near the outer bottom-right corner."
      >
        {/* The missing quarter */}
        <rect
          x={MID_X}
          y={MID_Y}
          width={size / 2}
          height={size / 2}
          className="fill-emerald-50 dark:fill-emerald-950/60"
        />
        <rect x={x} y={y} width={size} height={size} fill="none" strokeWidth={2} className="stroke-foreground" />
        <line x1={MID_X} y1={y - 6} x2={MID_X} y2={y + size + 6} strokeDasharray="5 3" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <line x1={x - 6} y1={MID_Y} x2={x + size + 6} y2={MID_Y} strokeDasharray="5 3" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        <text x={MID_X + 22} y={MID_Y + size / 4 + 4} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          missing
        </text>

        {/* Dots */}
        {[TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={6} className="fill-foreground" />
        ))}
        <circle cx={BOTTOM_RIGHT.x} cy={BOTTOM_RIGHT.y} r={6} className="fill-emerald-600 dark:fill-emerald-400" />

        {/* Step 1: top-left down to bottom-left, in the horizontal line */}
        <g className="stroke-amber-600 dark:stroke-amber-400" fill="none" strokeWidth={1.5}>
          <path d={`M ${x - 10} ${TOP_LEFT.y} Q ${x - 30} ${MID_Y} ${x - 10} ${BOTTOM_LEFT.y - 6}`} />
          <polygon points={`${x - 8},${BOTTOM_LEFT.y} ${x - 15},${BOTTOM_LEFT.y - 8} ${x - 6},${BOTTOM_LEFT.y - 10}`} className="fill-amber-600 stroke-none dark:fill-amber-400" />
        </g>
        <text x={x - 34} y={MID_Y + 4} textAnchor="end" className="fill-amber-700 text-[12px] font-bold dark:fill-amber-300">
          1
        </text>

        {/* Step 2: bottom-left across to bottom-right, in the vertical line */}
        <g className="stroke-sky-600 dark:stroke-sky-400" fill="none" strokeWidth={1.5}>
          <path d={`M ${BOTTOM_LEFT.x} ${y + size + 10} Q ${MID_X} ${y + size + 30} ${BOTTOM_RIGHT.x - 6} ${y + size + 10}`} />
          <polygon points={`${BOTTOM_RIGHT.x},${y + size + 8} ${BOTTOM_RIGHT.x - 10},${y + size + 8} ${BOTTOM_RIGHT.x - 6},${y + size + 16}`} className="fill-sky-600 stroke-none dark:fill-sky-400" />
        </g>
        <text x={MID_X} y={y + size + 30} textAnchor="middle" className="fill-sky-700 text-[12px] font-bold dark:fill-sky-300">
          2
        </text>

        <text x={160} y={204} textAnchor="middle" className="fill-amber-700 text-[11px] dark:fill-amber-300">
          1. Top-left in the horizontal line: bottom-left.
        </text>
        <text x={160} y={220} textAnchor="middle" className="fill-sky-700 text-[11px] dark:fill-sky-300">
          2. Bottom-left in the vertical line: bottom-right.
        </text>
      </svg>
    </div>
  );
}
