/**
 * Static figure: an isosceles trapezium split by two perpendiculars into a
 * rectangle and two right triangles (concept ssc2qupr-trapezium). Drawn to
 * scale with the concept's worked example: parallel sides 10 m and 22 m,
 * slanting sides 10 m, so each end triangle has base (22 − 10) ÷ 2 = 6 m,
 * the height is √(10² − 6²) = 8 m and the area ½(10 + 22) × 8 = 128 m².
 * Plain geometry, server component. Pinned by tests/notes-w2-05.test.ts.
 */

export type Pt = { x: number; y: number };

/** The worked example, in metres. */
export const TRAP = { a: 10, b: 22, slant: 10 } as const;
export const endBase = (a: number, b: number) => (b - a) / 2;
export const heightFrom = (slant: number, base: number) => Math.sqrt(slant ** 2 - base ** 2);
export const trapArea = (a: number, b: number, h: number) => ((a + b) * h) / 2;

export const END_BASE = endBase(TRAP.a, TRAP.b);
export const HEIGHT = heightFrom(TRAP.slant, END_BASE);
export const AREA = trapArea(TRAP.a, TRAP.b, HEIGHT);

// Geometry (viewBox units): 12 units per metre, drawn to scale.
export const PX_PER_M = 12;
export const BOTTOM_Y = 168;
export const LEFT_X = 28;
export const TOP_Y = BOTTOM_Y - HEIGHT * PX_PER_M;
export const BL: Pt = { x: LEFT_X, y: BOTTOM_Y };
export const BR: Pt = { x: LEFT_X + TRAP.b * PX_PER_M, y: BOTTOM_Y };
export const TL: Pt = { x: LEFT_X + END_BASE * PX_PER_M, y: TOP_Y };
export const TR: Pt = { x: TL.x + TRAP.a * PX_PER_M, y: TOP_Y };
export const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);

const END = "fill-amber-200/70 dark:fill-amber-900/50";
const MID = "fill-sky-200/70 dark:fill-sky-900/50";
const LBL = "text-[10px] font-semibold";

export default function SscT2Trapezium() {
  const footL: Pt = { x: TL.x, y: BOTTOM_Y };
  const footR: Pt = { x: TR.x, y: BOTTOM_Y };
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a rectangle and two right triangles
      </p>
      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="An isosceles trapezium with parallel sides of 10 metres and 22 metres and slanting sides of 10 metres. Perpendiculars from the ends of the shorter side split it into a rectangle 10 metres wide in the middle and two right triangles at the ends, each with a base of 6 metres. Each triangle has a slanting side of 10 and a base of 6, so the height is 8 metres, and the area is half of 10 plus 22, times 8, which is 128 square metres."
      >
        <polygon points={`${BL.x},${BL.y} ${TL.x},${TL.y} ${footL.x},${footL.y}`} className={END} />
        <polygon points={`${TL.x},${TL.y} ${TR.x},${TR.y} ${footR.x},${footR.y} ${footL.x},${footL.y}`} className={MID} />
        <polygon points={`${TR.x},${TR.y} ${BR.x},${BR.y} ${footR.x},${footR.y}`} className={END} />
        <polygon
          points={`${BL.x},${BL.y} ${TL.x},${TL.y} ${TR.x},${TR.y} ${BR.x},${BR.y}`}
          fill="none"
          strokeWidth={1.8}
          className="stroke-foreground"
        />
        {[footL, footR].map((f) => (
          <line key={f.x} x1={f.x} y1={TOP_Y} x2={f.x} y2={BOTTOM_Y} strokeWidth={1.4} strokeDasharray="4 3" className="stroke-rose-600 dark:stroke-rose-400" />
        ))}
        <path d={`M ${footL.x} ${BOTTOM_Y - 7} L ${footL.x + 7} ${BOTTOM_Y - 7} L ${footL.x + 7} ${BOTTOM_Y}`} fill="none" strokeWidth={1.1} className="stroke-foreground" />
        <path d={`M ${footR.x} ${BOTTOM_Y - 7} L ${footR.x - 7} ${BOTTOM_Y - 7} L ${footR.x - 7} ${BOTTOM_Y}`} fill="none" strokeWidth={1.1} className="stroke-foreground" />

        {/* Parallel sides */}
        <text x={(TL.x + TR.x) / 2} y={TOP_Y - 8} textAnchor="middle" className={`fill-foreground ${LBL}`}>
          a = 10 m
        </text>
        <line x1={BL.x} y1={196} x2={BR.x} y2={196} strokeWidth={1} className="stroke-muted-foreground" />
        <line x1={BL.x} y1={191} x2={BL.x} y2={201} strokeWidth={1} className="stroke-muted-foreground" />
        <line x1={BR.x} y1={191} x2={BR.x} y2={201} strokeWidth={1} className="stroke-muted-foreground" />
        <text x={160} y={210} textAnchor="middle" className={`fill-foreground ${LBL}`}>
          b = 22 m
        </text>

        {/* Pieces of the long side */}
        <text x={(BL.x + footL.x) / 2} y={BOTTOM_Y + 14} textAnchor="middle" className={`fill-amber-700 dark:fill-amber-300 ${LBL}`}>
          6
        </text>
        <text x={(footL.x + footR.x) / 2} y={BOTTOM_Y + 14} textAnchor="middle" className={`fill-sky-800 dark:fill-sky-300 ${LBL}`}>
          10
        </text>
        <text x={(footR.x + BR.x) / 2} y={BOTTOM_Y + 14} textAnchor="middle" className={`fill-amber-700 dark:fill-amber-300 ${LBL}`}>
          6
        </text>

        {/* Slanting sides and height */}
        <text x={(BL.x + TL.x) / 2 - 6} y={(BL.y + TL.y) / 2} textAnchor="end" className={`fill-foreground ${LBL}`}>
          10
        </text>
        <text x={(BR.x + TR.x) / 2 + 6} y={(BR.y + TR.y) / 2} className={`fill-foreground ${LBL}`}>
          10
        </text>
        <text x={footL.x + 5} y={(TOP_Y + BOTTOM_Y) / 2 + 4} className={`fill-rose-700 dark:fill-rose-300 ${LBL}`}>
          h = 8
        </text>
        <text x={(footL.x + footR.x) / 2 + 12} y={(TOP_Y + BOTTOM_Y) / 2 + 4} textAnchor="middle" className="fill-sky-900 text-[10px] dark:fill-sky-100">
          rectangle
        </text>

        <text x={160} y={228} textAnchor="middle" className="fill-foreground text-[10px]">
          Each end triangle has base (22 − 10) ÷ 2 = 6 m
        </text>
        <text x={160} y={242} textAnchor="middle" className="fill-foreground text-[10px]">
          Height h = √(10² − 6²) = √64 = 8 m
        </text>
        <text x={160} y={256} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          Area = ½ × (10 + 22) × 8 = 128 m²
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The parallel sides are 10 m and 22 m and each slanting side is 10 m. The extra 22 − 10 = 12 m is shared by the two end
        triangles, 6 m each, not 12 m for one. Each is a right triangle with slanting side 10 and base 6, so the height is 8 m. Drawn
        to scale.
      </p>
    </div>
  );
}
