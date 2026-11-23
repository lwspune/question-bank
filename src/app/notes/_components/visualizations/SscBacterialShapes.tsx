/**
 * Static figure: the four bacterial shapes, in the words of the SSC concept
 * "What causes each disease" (sscbmdmi-pathogens): bacillus rod, coccus
 * sphere, vibrio comma, spirillum spiral.
 *
 * Data exported and pinned by tests/notes-w2-07.test.ts. Server component.
 */

export type BacterialShape = { name: string; shape: "rod" | "sphere" | "comma" | "spiral" };

export const BACTERIAL_SHAPES: readonly BacterialShape[] = [
  { name: "Bacillus", shape: "rod" },
  { name: "Coccus", shape: "sphere" },
  { name: "Vibrio", shape: "comma" },
  { name: "Spirillum", shape: "spiral" },
];

export const CELL_W = 80;
export const SHAPE_Y = 42;

export function cellCenter(i: number): number {
  return CELL_W / 2 + i * CELL_W;
}

/** The spirillum: a wave of whole turns along its length. */
export const SPIRAL_TURNS = 2.5;
export const SPIRAL_LENGTH = 56;
export const SPIRAL_AMPLITUDE = 9;

export function spiralPoints(cx: number, n = 40): { x: number; y: number }[] {
  return Array.from({ length: n + 1 }, (_, k) => {
    const t = k / n;
    return {
      x: Math.round((cx - SPIRAL_LENGTH / 2 + t * SPIRAL_LENGTH) * 100) / 100,
      y: Math.round((SHAPE_Y + SPIRAL_AMPLITUDE * Math.sin(t * SPIRAL_TURNS * 2 * Math.PI)) * 100) / 100,
    };
  });
}

const BODY = "fill-lime-200 stroke-lime-700 dark:fill-lime-900/60 dark:stroke-lime-300";
const STROKE = "fill-none stroke-lime-700 dark:stroke-lime-300";

function Shape({ s, cx }: { s: BacterialShape; cx: number }) {
  if (s.shape === "rod") {
    return <rect x={cx - 26} y={SHAPE_Y - 11} width={52} height={22} rx={11} strokeWidth={1.5} className={BODY} />;
  }
  if (s.shape === "sphere") {
    return <circle cx={cx} cy={SHAPE_Y} r={15} strokeWidth={1.5} className={BODY} />;
  }
  if (s.shape === "comma") {
    return (
      <g>
        <path d={`M ${cx - 20} ${SHAPE_Y + 12} Q ${cx - 2} ${SHAPE_Y - 22} ${cx + 20} ${SHAPE_Y - 2}`} strokeWidth={13} strokeLinecap="round" className={STROKE} />
        <path d={`M ${cx - 20} ${SHAPE_Y + 12} Q ${cx - 2} ${SHAPE_Y - 22} ${cx + 20} ${SHAPE_Y - 2}`} strokeWidth={10} strokeLinecap="round" className="fill-none stroke-lime-200 dark:stroke-lime-900" />
      </g>
    );
  }
  const pts = spiralPoints(cx)
    .map((p) => `${p.x},${p.y}`)
    .join(" ");
  return (
    <g>
      <polyline points={pts} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" className={STROKE} />
      <polyline points={pts} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-lime-200 dark:stroke-lime-900" />
    </g>
  );
}

export default function SscBacterialShapes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the four bacterial shapes
      </p>
      <svg
        viewBox="0 0 320 104"
        className="block h-auto w-full"
        role="img"
        aria-label="Four bacterial shapes side by side: bacillus, a rod; coccus, a sphere; vibrio, a comma; spirillum, a spiral."
      >
        {BACTERIAL_SHAPES.map((s, i) => {
          const cx = cellCenter(i);
          return (
            <g key={s.name}>
              <Shape s={s} cx={cx} />
              <text x={cx} y={84} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {s.name}
              </text>
              <text x={cx} y={98} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {s.shape}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
