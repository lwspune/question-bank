/**
 * Static figure: the IMAT "Angle facts for crossing lines and parallel lines"
 * concept. Two parallel lines (marked with arrows) cut by a transversal at
 * 65°, so every angle is 65° or 115°: the pair from the concept's self-check
 * question, which add to 180°.
 *
 * Top: all eight angles with their sizes. Below: three small copies, each
 * shading one pair: corresponding (F shape, equal), alternate (Z shape, equal)
 * and co-interior (C shape, add up to 180°).
 *
 * The angle data is pinned by tests/notes-imat-visuals-maths.test.ts.
 * Server component, no client state.
 */

/** Angle between the transversal and the parallel lines. */
export const TRANSVERSAL_DEG = 65;

export type Position = "upperRight" | "upperLeft" | "lowerLeft" | "lowerRight";
export type Crossing = "top" | "bottom";

/** Each angle at a crossing as a sector, in degrees anticlockwise from the line going right. */
export const SECTORS: Record<Position, { from: number; to: number }> = {
  upperRight: { from: 0, to: TRANSVERSAL_DEG },
  upperLeft: { from: TRANSVERSAL_DEG, to: 180 },
  lowerLeft: { from: 180, to: 180 + TRANSVERSAL_DEG },
  lowerRight: { from: 180 + TRANSVERSAL_DEG, to: 360 },
};

export function angleSize(p: Position): number {
  return SECTORS[p].to - SECTORS[p].from;
}

/** Between the parallels: below the top line, above the bottom one. */
export function isBetween(c: Crossing, p: Position): boolean {
  return c === "top" ? p.startsWith("lower") : p.startsWith("upper");
}

/** Which side of the transversal the angle opens to. */
export function sideOf(p: Position): "left" | "right" {
  return p.endsWith("Right") ? "right" : "left";
}

export type AnglePair = {
  name: string;
  shape: string;
  rule: "equal" | "add to 180°";
  a: { at: Crossing; pos: Position };
  b: { at: Crossing; pos: Position };
};

export const PAIRS: readonly AnglePair[] = [
  { name: "Corresponding", shape: "F", rule: "equal", a: { at: "top", pos: "upperRight" }, b: { at: "bottom", pos: "upperRight" } },
  { name: "Alternate", shape: "Z", rule: "equal", a: { at: "top", pos: "lowerLeft" }, b: { at: "bottom", pos: "upperRight" } },
  { name: "Co-interior", shape: "C", rule: "add to 180°", a: { at: "top", pos: "lowerRight" }, b: { at: "bottom", pos: "upperRight" } },
];

const POSITIONS: Position[] = ["upperRight", "upperLeft", "lowerLeft", "lowerRight"];

type Geo = { w: number; h: number; topY: number; botY: number; botX: number };

function crossingPoint(g: Geo, c: Crossing): [number, number] {
  const run = (g.botY - g.topY) / Math.tan((TRANSVERSAL_DEG * Math.PI) / 180);
  return c === "top" ? [g.botX + run, g.topY] : [g.botX, g.botY];
}

function polar([cx, cy]: [number, number], deg: number, r: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}

function wedge(c: [number, number], p: Position, r: number): string {
  const { from, to } = SECTORS[p];
  const [x1, y1] = polar(c, from, r);
  const [x2, y2] = polar(c, to, r);
  return `M${c[0]},${c[1]} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 0 ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
}

/** The two parallel lines with arrow marks, and the transversal. */
function Lines({ g }: { g: Geo }) {
  const top = crossingPoint(g, "top");
  const bot = crossingPoint(g, "bottom");
  const ext = (g.botY - g.topY) * 0.6;
  const [t1x, t1y] = polar(bot, 180 + TRANSVERSAL_DEG, ext);
  const [t2x, t2y] = polar(top, TRANSVERSAL_DEG, ext);
  const arrow = (x: number, y: number) => `M${x - 4},${y - 3.5} L${x},${y} L${x - 4},${y + 3.5}`;
  const ax = g.w * 0.86;
  return (
    <g>
      <line x1={6} y1={g.topY} x2={g.w - 6} y2={g.topY} stroke="currentColor" strokeWidth={1.6} className="text-foreground" />
      <line x1={6} y1={g.botY} x2={g.w - 6} y2={g.botY} stroke="currentColor" strokeWidth={1.6} className="text-foreground" />
      <path d={`${arrow(ax, g.topY)} ${arrow(ax, g.botY)}`} fill="none" stroke="currentColor" strokeWidth={1.4} className="text-foreground" />
      <line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke="currentColor" strokeWidth={1.6} className="text-indigo-600 dark:text-indigo-400" />
    </g>
  );
}

const MAIN: Geo = { w: 320, h: 170, topY: 58, botY: 122, botX: 132 };
const SMALL: Geo = { w: 110, h: 100, topY: 28, botY: 74, botX: 46 };

function MainFigure() {
  const label = (c: Crossing, p: Position) => {
    const { from, to } = SECTORS[p];
    const [x, y] = polar(crossingPoint(MAIN, c), (from + to) / 2, p.endsWith("Right") ? 24 : 22);
    return (
      <text key={`${c}${p}`} x={x} y={y + 4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold tabular-nums">
        {angleSize(p)}°
      </text>
    );
  };
  const top = crossingPoint(MAIN, "top");
  return (
    <svg
      viewBox={`0 0 ${MAIN.w} ${MAIN.h}`}
      className="block h-auto w-full"
      role="img"
      aria-label="Two parallel lines cut by a transversal at 65 degrees: at each crossing the angles are 65, 115, 65 and 115 degrees"
    >
      <Lines g={MAIN} />
      {(["top", "bottom"] as Crossing[]).flatMap((c) =>
        POSITIONS.map((p) => (
          <path
            key={`w${c}${p}`}
            d={wedge(crossingPoint(MAIN, c), p, 12)}
            className={angleSize(p) < 90 ? "fill-sky-500/30 dark:fill-sky-400/30" : "fill-amber-500/25 dark:fill-amber-400/25"}
          />
        )),
      )}
      {(["top", "bottom"] as Crossing[]).flatMap((c) => POSITIONS.map((p) => label(c, p)))}
      <text x={top[0] + 32} y={18} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
        transversal
      </text>
      <text x={MAIN.w - 6} y={MAIN.topY - 8} textAnchor="end" className="fill-muted-foreground text-[10px]">
        arrows: parallel
      </text>
    </svg>
  );
}

function PairFigure({ pair }: { pair: AnglePair }) {
  return (
    <svg
      viewBox={`0 0 ${SMALL.w} ${SMALL.h}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`${pair.name} angles: ${angleSize(pair.a.pos)} and ${angleSize(pair.b.pos)} degrees, ${pair.rule}`}
    >
      <Lines g={SMALL} />
      {[pair.a, pair.b].map((s) => {
        const c = crossingPoint(SMALL, s.at);
        const { from, to } = SECTORS[s.pos];
        const [x, y] = polar(c, (from + to) / 2, 21);
        return (
          <g key={`${s.at}${s.pos}`}>
            <path d={wedge(c, s.pos, 12)} className="fill-emerald-500/60 dark:fill-emerald-400/50" />
            <text x={x} y={y + 3.5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold tabular-nums">
              {angleSize(s.pos)}°
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ImatParallelAngles() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · angles on parallel lines
      </p>
      <MainFigure />
      <div className="mt-3 grid grid-cols-3 gap-2">
        {PAIRS.map((pair) => (
          <figure key={pair.name} className="rounded-md border border-indigo-100 bg-background/60 p-1.5 dark:border-indigo-900/40">
            <PairFigure pair={pair} />
            <figcaption className="mt-1 text-center text-[11px] leading-tight">
              <span className="block font-semibold text-foreground">{pair.name}</span>
              <span className="block text-muted-foreground">
                {pair.shape} shape, {pair.rule}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        The transversal meets both parallel lines at the same slope, so the four angles at one crossing copy the four at
        the other. Corresponding and alternate angles are equal (65° and 65°). Co-interior angles lie between the
        parallels on the same side, and add up to 180° (115° + 65°). These facts need the arrows: without parallel
        lines, they do not hold.
      </p>
    </div>
  );
}
