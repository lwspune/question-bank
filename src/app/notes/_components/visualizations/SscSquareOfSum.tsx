/**
 * Static figure: (a + b)² as the area of a square of side a + b (concept
 * sscaisq-expand, its own intuition): a square of side a, a square of side b
 * and two rectangles a by b. The two rectangles are the 2ab, the part most
 * often left out. Letters only: the concept gives no numbers for this
 * picture. Server component. Pinned by tests/notes-w2-04.test.ts.
 */

/** Drawn lengths (viewBox units) of a and b. */
export const SIDE_A = 104;
export const SIDE_B = 52;
export const ORIGIN = { x: 34, y: 40 } as const;

/** The four pieces of the big square: x, y, width, height (viewBox units). */
export const PIECES = [
  { name: "a²", x: 0, y: 0, w: SIDE_A, h: SIDE_A, strip: false },
  { name: "ab", x: SIDE_A, y: 0, w: SIDE_B, h: SIDE_A, strip: true },
  { name: "ab", x: 0, y: SIDE_A, w: SIDE_A, h: SIDE_B, strip: true },
  { name: "b²", x: SIDE_A, y: SIDE_A, w: SIDE_B, h: SIDE_B, strip: false },
] as const;

export const pieceArea = (p: { w: number; h: number }) => p.w * p.h;

export default function SscSquareOfSum() {
  const S = SIDE_A + SIDE_B;
  const { x: X, y: Y } = ORIGIN;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the square of a sum as an area
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="A square of side a plus b, cut into a square of side a, a square of side b and two rectangles a by b. Its area is a squared plus 2ab plus b squared."
      >
        {/* Side labels */}
        <g className="fill-foreground text-[12px] font-semibold">
          <text x={X + SIDE_A / 2} y={Y - 8} textAnchor="middle">a</text>
          <text x={X + SIDE_A + SIDE_B / 2} y={Y - 8} textAnchor="middle">b</text>
          <text x={X - 10} y={Y + SIDE_A / 2 + 4} textAnchor="middle">a</text>
          <text x={X - 10} y={Y + SIDE_A + SIDE_B / 2 + 4} textAnchor="middle">b</text>
        </g>

        {/* The pieces */}
        {PIECES.map((p, i) => (
          <g key={i}>
            <rect
              x={X + p.x}
              y={Y + p.y}
              width={p.w}
              height={p.h}
              strokeWidth={1.5}
              className={
                p.strip
                  ? "fill-amber-300/60 stroke-amber-700 dark:fill-amber-500/35 dark:stroke-amber-300"
                  : "fill-sky-300/50 stroke-sky-700 dark:fill-sky-500/30 dark:stroke-sky-300"
              }
            />
            <text
              x={X + p.x + p.w / 2}
              y={Y + p.y + p.h / 2 + 5}
              textAnchor="middle"
              className={`text-[14px] font-semibold ${p.strip ? "fill-amber-900 dark:fill-amber-100" : "fill-sky-900 dark:fill-sky-100"}`}
            >
              {p.name}
            </text>
          </g>
        ))}

        {/* Bracket for the whole side */}
        <g className="stroke-muted-foreground" strokeWidth={1}>
          <line x1={X} y1={Y + S + 10} x2={X + S} y2={Y + S + 10} />
          <line x1={X} y1={Y + S + 6} x2={X} y2={Y + S + 14} />
          <line x1={X + S} y1={Y + S + 6} x2={X + S} y2={Y + S + 14} />
        </g>
        <text x={X + S / 2} y={Y + S + 24} textAnchor="middle" className="fill-muted-foreground text-[11px]">
          side a + b
        </text>

        {/* The reading */}
        <g className="text-[11px]">
          <text x={202} y={62} className="fill-foreground font-semibold">Whole square:</text>
          <text x={202} y={78} className="fill-foreground">(a + b)²</text>
          <text x={202} y={104} className="fill-foreground font-semibold">Pieces:</text>
          <text x={202} y={120} className="fill-sky-800 dark:fill-sky-200">a² + b²</text>
          <text x={202} y={136} className="fill-amber-800 dark:fill-amber-200">+ ab + ab</text>
          <text x={202} y={162} className="fill-amber-800 font-semibold dark:fill-amber-200">two strips = 2ab:</text>
          <text x={202} y={176} className="fill-amber-800 dark:fill-amber-200">the part most often</text>
          <text x={202} y={190} className="fill-amber-800 dark:fill-amber-200">left out</text>
        </g>
        <text x={160} y={244} textAnchor="middle" className="fill-indigo-700 text-[13px] font-semibold dark:fill-indigo-300">
          (a + b)² = a² + 2ab + b²
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A square of side a + b breaks into a square of side a, a square of side b and two rectangles a by b. The two rectangles make the
        2ab. For (a − b)² the 2ab is taken away instead: a² − 2ab + b².
      </p>
    </div>
  );
}
