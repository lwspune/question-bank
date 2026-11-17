/**
 * Static figure: the six graphs in the IMAT "Shapes of power, reciprocal,
 * exponential and logarithmic graphs" table, each on the same small grid
 * (x and y from −3 to 3) with the key points and asymptotes the table names:
 * x² and x³ through (0, 0) and (1, 1); √x starting at (0, 0); 1/x with both
 * axes as asymptotes; eˣ through (0, 1) with the x-axis as asymptote; ln x
 * through (1, 0) with the y-axis as asymptote.
 *
 * Pedagogical aim: the concept says "learn where each is defined, which
 * values it takes and one or two points": this is that, one glance each.
 * Pinned by tests/notes-imat-visuals-maths.test.ts. Server component.
 */

export type StandardGraph = {
  id: string;
  title: string;
  f: (x: number) => number;
  /** Pieces of x to draw (1/x has two). */
  pieces: [number, number][];
  /** Key points; `below` puts the label under the dot, clear of the curve. */
  points: { x: number; y: number; below?: boolean }[];
  asymptotes: { x?: number; y?: number };
  domain: string;
  range: string;
};

export const GRAPHS: readonly StandardGraph[] = [
  {
    id: "square",
    title: "y = x²",
    f: (x) => x * x,
    pieces: [[-3, 3]],
    points: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
    asymptotes: {},
    domain: "all x",
    range: "y ≥ 0",
  },
  {
    id: "cube",
    title: "y = x³",
    f: (x) => x * x * x,
    pieces: [[-3, 3]],
    points: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
    asymptotes: {},
    domain: "all x",
    range: "all y",
  },
  {
    id: "root",
    title: "y = √x",
    f: (x) => Math.sqrt(x),
    pieces: [[0, 3]],
    points: [{ x: 0, y: 0 }, { x: 1, y: 1, below: true }],
    asymptotes: {},
    domain: "x ≥ 0",
    range: "y ≥ 0",
  },
  {
    id: "reciprocal",
    title: "y = 1/x",
    f: (x) => 1 / x,
    pieces: [[-3, -0.3], [0.3, 3]],
    points: [{ x: 1, y: 1 }, { x: -1, y: -1, below: true }],
    asymptotes: { x: 0, y: 0 },
    domain: "x ≠ 0",
    range: "y ≠ 0",
  },
  {
    id: "exp",
    title: "y = eˣ",
    f: (x) => Math.exp(x),
    pieces: [[-3, 1.2]],
    points: [{ x: 0, y: 1 }],
    asymptotes: { y: 0 },
    domain: "all x",
    range: "y > 0",
  },
  {
    id: "log",
    title: "y = ln x",
    f: (x) => Math.log(x),
    pieces: [[0.045, 3]],
    points: [{ x: 1, y: 0 }],
    asymptotes: { x: 0 },
    domain: "x > 0",
    range: "all y",
  },
];

const MINUS = "−";
const coord = (n: number) => (n < 0 ? `${MINUS}${-n}` : String(n));

// Panel geometry (viewBox units): x and y from −3 to 3, 20 units each.
const W = 150;
const H = 130;
const LIM = 3;
const UNIT = 20;
const OX = W / 2;
const OY = H / 2;
const sx = (x: number) => OX + x * UNIT;
const sy = (y: number) => OY - y * UNIT;

function piecePath(f: (x: number) => number, [a, b]: [number, number]): string {
  const n = 90;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + (i / n) * (b - a);
    const y = Math.max(-6, Math.min(6, f(x)));
    pts.push(`${i === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  return pts.join(" ");
}

function Graph({ g }: { g: StandardGraph }) {
  const clip = `imat-std-${g.id}`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`Graph of ${g.title}: domain ${g.domain}, range ${g.range}`}
    >
      <defs>
        <clipPath id={clip}>
          <rect x={sx(-LIM)} y={sy(LIM)} width={2 * LIM * UNIT} height={2 * LIM * UNIT} />
        </clipPath>
      </defs>
      {/* Axes */}
      <line x1={sx(-LIM)} y1={OY} x2={sx(LIM)} y2={OY} stroke="currentColor" className="text-muted-foreground/60" />
      <line x1={OX} y1={sy(LIM)} x2={OX} y2={sy(-LIM)} stroke="currentColor" className="text-muted-foreground/60" />
      {[-2, -1, 1, 2].map((t) => (
        <g key={t}>
          <line x1={sx(t)} y1={OY - 2} x2={sx(t)} y2={OY + 2} stroke="currentColor" className="text-muted-foreground/60" />
          <line x1={OX - 2} y1={sy(t)} x2={OX + 2} y2={sy(t)} stroke="currentColor" className="text-muted-foreground/60" />
        </g>
      ))}
      {/* Asymptotes, dashed */}
      {g.asymptotes.y !== undefined && (
        <line x1={sx(-LIM)} y1={sy(g.asymptotes.y)} x2={sx(LIM)} y2={sy(g.asymptotes.y)} stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3" className="text-rose-600 dark:text-rose-400" />
      )}
      {g.asymptotes.x !== undefined && (
        <line x1={sx(g.asymptotes.x)} y1={sy(LIM)} x2={sx(g.asymptotes.x)} y2={sy(-LIM)} stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3" className="text-rose-600 dark:text-rose-400" />
      )}
      <g clipPath={`url(#${clip})`}>
        {g.pieces.map((p) => (
          <path key={p[0]} d={piecePath(g.f, p)} fill="none" stroke="currentColor" strokeWidth={2.2} className="text-indigo-600 dark:text-indigo-400" />
        ))}
      </g>
      {g.points.map((p) => (
        <g key={`${p.x},${p.y}`}>
          <circle cx={sx(p.x)} cy={sy(p.y)} r={3} className="fill-amber-600 dark:fill-amber-400" />
          <text
            x={sx(p.x) + (p.x < 0 ? -5 : 5)}
            y={sy(p.y) + (p.below || p.y === 0 ? 12 : 3)}
            textAnchor={p.x < 0 ? "end" : "start"}
            className="fill-foreground text-[10px] font-semibold tabular-nums"
          >
            ({coord(p.x)}, {coord(p.y)})
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function ImatStandardGraphs() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · six graphs to know by shape
      </p>
      <div className="grid grid-cols-2 gap-2">
        {GRAPHS.map((g) => (
          <figure key={g.id} className="rounded-md border border-indigo-100 bg-background/60 p-1.5 dark:border-indigo-900/40">
            <figcaption className="text-center text-xs font-semibold text-foreground">{g.title}</figcaption>
            <Graph g={g} />
            <p className="text-center text-[11px] leading-tight text-muted-foreground">
              domain {g.domain}, range {g.range}
            </p>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Dots are the points each graph always passes through; dashed lines are asymptotes, lines the graph gets closer
        and closer to but never reaches. eˣ is above the x-axis for every x, even negative x. ln x is negative between 0
        and 1 and positive after 1. The two are mirror images in the line y = x, so their domains and ranges swap.
      </p>
    </div>
  );
}
