/**
 * Static figure: the four statements of the IMAT concept imat-ded-venn drawn
 * as Venn diagrams, in the concept's own notation. Each circle is a set; a
 * cross marks a region that must have at least one member.
 *
 * - All A are B: A drawn inside B (A outside B is empty).
 * - No A are B: the circles do not overlap.
 * - Some A are B: overlapping circles, a cross in the overlap.
 * - Some A are not B: a cross in A, outside B.
 *
 * Under each panel is the concept's "region you know about". The geometry is
 * exported and pinned by tests/notes-imat-visuals-logic.test.ts. Server
 * component, no client state.
 */

export type Circle = { cx: number; cy: number; r: number };
export type Pt = { x: number; y: number };

export type VennPanel = {
  statement: string;
  /** The concept's "region you know about". */
  region: string;
  a: Circle;
  b: Circle;
  /** Where the A and B labels sit. */
  labelA: Pt;
  labelB: Pt;
  /** A cross: a member that must exist. */
  cross?: Pt;
};

/** Panel coordinates are local to a 160 by 135 box. */
export const VENN_PANELS: readonly VennPanel[] = [
  {
    statement: "All A are B",
    region: "A outside B: empty",
    a: { cx: 80, cy: 78, r: 18 },
    b: { cx: 80, cy: 72, r: 40 },
    labelA: { x: 80, y: 82 },
    labelB: { x: 80, y: 47 },
  },
  {
    statement: "No A are B",
    region: "Overlap: empty",
    a: { cx: 48, cy: 74, r: 28 },
    b: { cx: 112, cy: 74, r: 28 },
    labelA: { x: 48, y: 78 },
    labelB: { x: 112, y: 78 },
  },
  {
    statement: "Some A are B",
    region: "Overlap: has a member",
    a: { cx: 62, cy: 74, r: 32 },
    b: { cx: 98, cy: 74, r: 32 },
    labelA: { x: 44, y: 78 },
    labelB: { x: 116, y: 78 },
    cross: { x: 80, y: 74 },
  },
  {
    statement: "Some A are not B",
    region: "A outside B: has a member",
    a: { cx: 62, cy: 74, r: 32 },
    b: { cx: 98, cy: 74, r: 32 },
    labelA: { x: 50, y: 62 },
    labelB: { x: 116, y: 78 },
    cross: { x: 47, y: 84 },
  },
];

export function inside(p: Pt, c: Circle): boolean {
  return Math.hypot(p.x - c.cx, p.y - c.cy) < c.r;
}

/** True when circle `inner` lies wholly inside circle `outer`. */
export function circleInside(inner: Circle, outer: Circle): boolean {
  return Math.hypot(inner.cx - outer.cx, inner.cy - outer.cy) + inner.r <= outer.r;
}

/** True when the two circles share no points. */
export function circlesApart(a: Circle, b: Circle): boolean {
  return Math.hypot(a.cx - b.cx, a.cy - b.cy) > a.r + b.r;
}

const PW = 160;
const PH = 135;

function Cross({ p }: { p: Pt }) {
  const s = 5;
  return (
    <g className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2.2} strokeLinecap="round">
      <line x1={p.x - s} y1={p.y - s} x2={p.x + s} y2={p.y + s} />
      <line x1={p.x - s} y1={p.y + s} x2={p.x + s} y2={p.y - s} />
    </g>
  );
}

function Panel({ panel, x, y }: { panel: VennPanel; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={3} y={3} width={PW - 6} height={PH - 6} rx={6} className="fill-background/60 stroke-indigo-100 dark:stroke-indigo-900/40" />
      <text x={PW / 2} y={20} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {panel.statement}
      </text>
      <circle
        cx={panel.b.cx}
        cy={panel.b.cy}
        r={panel.b.r}
        className="fill-emerald-500/15 stroke-emerald-600 dark:fill-emerald-400/15 dark:stroke-emerald-400"
        strokeWidth={1.5}
      />
      <circle
        cx={panel.a.cx}
        cy={panel.a.cy}
        r={panel.a.r}
        className="fill-sky-500/20 stroke-sky-600 dark:fill-sky-400/20 dark:stroke-sky-400"
        strokeWidth={1.5}
      />
      <text x={panel.labelA.x} y={panel.labelA.y} textAnchor="middle" className="fill-sky-800 text-[12px] font-semibold dark:fill-sky-200">
        A
      </text>
      <text x={panel.labelB.x} y={panel.labelB.y} textAnchor="middle" className="fill-emerald-800 text-[12px] font-semibold dark:fill-emerald-200">
        B
      </text>
      {panel.cross && <Cross p={panel.cross} />}
      <text x={PW / 2} y={PH - 10} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {panel.region}
      </text>
    </g>
  );
}

export default function ImatSyllogismVenn() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · all, some and no as Venn diagrams
      </p>
      <svg
        viewBox={`0 0 ${PW * 2} ${PH * 2}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Four Venn diagrams. All A are B: circle A inside circle B. No A are B: two separate circles. Some A are B: overlapping circles with a cross in the overlap. Some A are not B: overlapping circles with a cross in A, outside B."
      >
        {VENN_PANELS.map((p, i) => (
          <Panel key={p.statement} panel={p} x={(i % 2) * PW} y={Math.floor(i / 2) * PH} />
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A cross marks a member that must exist. All roses are flowers: the roses circle sits inside the flowers circle,
        and flowers outside it may still exist, so the statement does not reverse. No fish are mammals: two circles
        that do not touch. Some drummers cannot read music: a cross in the drummers circle, outside the music readers.
      </p>
    </div>
  );
}
