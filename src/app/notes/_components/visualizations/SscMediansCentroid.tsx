/**
 * Static figure: the three medians of a triangle meet at the centroid G, which
 * divides each one 2 : 1 from the corner (concept ssctrmd-centroid). Triangle
 * ABC with D, E, F the midpoints of BC, CA and AB; the median AD carries the
 * worked example's numbers (a median of 21 cm: 14 cm from the corner to G,
 * 7 cm from G to the midpoint), the other two medians are marked 2 and 1.
 * G is computed as the average of the corners, so it truly lies on all three
 * medians at the two-thirds point. Plain geometry, server component. Pinned by
 * tests/notes-ssc-visuals.test.ts.
 */

export type Pt = { x: number; y: number };

/** The corners (viewBox units). A scalene triangle, so the medians differ. */
export const A: Pt = { x: 120, y: 22 };
export const B: Pt = { x: 26, y: 192 };
export const C: Pt = { x: 294, y: 192 };

export const midpoint = (p: Pt, q: Pt): Pt => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
export const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);

export const D = midpoint(B, C);
export const E = midpoint(C, A);
export const F = midpoint(A, B);
export const G: Pt = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };

/** The worked example: a median of 21 cm. */
export const MEDIAN_CM = 21;
export const cornerPart = (median: number) => (2 / 3) * median;
export const midpointPart = (median: number) => median / 3;

const r2 = (n: number) => Math.round(n * 100) / 100;
const at = (p: Pt, q: Pt, t: number): Pt => ({ x: r2(p.x + (q.x - p.x) * t), y: r2(p.y + (q.y - p.y) * t) });

/** A short tick mark across segment pq at its own middle, offset by k ticks. */
function Ticks({ p, q, n }: { p: Pt; q: Pt; n: number }) {
  const m = midpoint(p, q);
  const len = dist(p, q);
  const ux = (q.x - p.x) / len;
  const uy = (q.y - p.y) / len;
  return (
    <g className="stroke-foreground" strokeWidth={1.2}>
      {Array.from({ length: n }, (_, i) => {
        const off = (i - (n - 1) / 2) * 4;
        const cx = m.x + ux * off;
        const cy = m.y + uy * off;
        return <line key={i} x1={r2(cx - uy * 5)} y1={r2(cy + ux * 5)} x2={r2(cx + uy * 5)} y2={r2(cy - ux * 5)} />;
      })}
    </g>
  );
}

const CORNER = "stroke-indigo-600 dark:stroke-indigo-400";
const MID = "stroke-amber-500 dark:stroke-amber-400";

function Median({ from, to }: { from: Pt; to: Pt }) {
  return (
    <g strokeWidth={2.2}>
      <line x1={from.x} y1={from.y} x2={r2(G.x)} y2={r2(G.y)} className={CORNER} />
      <line x1={r2(G.x)} y1={r2(G.y)} x2={to.x} y2={to.y} className={MID} />
    </g>
  );
}

export default function SscMediansCentroid() {
  const pts: { p: Pt; name: string; dx: number; dy: number }[] = [
    { p: A, name: "A", dx: 0, dy: -6 },
    { p: B, name: "B", dx: -8, dy: 12 },
    { p: C, name: "C", dx: 8, dy: 12 },
    { p: D, name: "D", dx: 0, dy: 13 },
    { p: E, name: "E", dx: 9, dy: -2 },
    { p: F, name: "F", dx: -9, dy: -2 },
  ];
  const be2 = at(B, G, 0.5);
  const ge1 = at(G, E, 0.5);
  const cg2 = at(C, G, 0.5);
  const gf1 = at(G, F, 0.5);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three medians meet at the centroid
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="Triangle ABC with D, E and F the midpoints of BC, CA and AB. The medians AD, BE and CF meet at one point, the centroid G. On each median the part from the corner to G is twice the part from G to the midpoint. On AD, a median of 21 centimetres: AG is 14 centimetres and GD is 7 centimetres."
      >
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        {/* Equal halves of each side */}
        <Ticks p={B} q={D} n={1} />
        <Ticks p={D} q={C} n={1} />
        <Ticks p={C} q={E} n={2} />
        <Ticks p={E} q={A} n={2} />
        <Ticks p={A} q={F} n={3} />
        <Ticks p={F} q={B} n={3} />

        <Median from={A} to={D} />
        <Median from={B} to={E} />
        <Median from={C} to={F} />

        {pts.map(({ p, name, dx, dy }) => (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r={2.2} className="fill-foreground" />
            <text x={p.x + dx} y={p.y + dy} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {name}
            </text>
          </g>
        ))}
        <circle cx={r2(G.x)} cy={r2(G.y)} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        <text x={r2(G.x) + 4} y={r2(G.y) - 10} className="fill-rose-700 text-[12px] font-bold dark:fill-rose-300">
          G
        </text>

        {/* The worked example's numbers on AD */}
        <text x={129} y={84} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          AG = 14
        </text>
        <text x={158} y={170} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          GD = 7
        </text>
        {/* 2 and 1 on the other two medians */}
        <text x={be2.x} y={be2.y + 12} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          2
        </text>
        <text x={ge1.x} y={ge1.y + 12} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          1
        </text>
        <text x={cg2.x} y={cg2.y + 12} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          2
        </text>
        <text x={gf1.x} y={gf1.y + 12} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          1
        </text>

        <text x={160} y={216} textAnchor="middle" className="fill-foreground text-[10px]">
          Median AD = 21 cm: AG = ⅔ × 21 = 14 cm, GD = ⅓ × 21 = 7 cm
        </text>
        <text x={160} y={230} textAnchor="middle" className="text-[10px]">
          <tspan className="fill-indigo-700 font-semibold dark:fill-indigo-300">corner part</tspan>
          <tspan className="fill-foreground"> : </tspan>
          <tspan className="fill-amber-700 font-semibold dark:fill-amber-300">midpoint part</tspan>
          <tspan className="fill-foreground"> = 2 : 1 on every median</tspan>
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A median joins a corner to the midpoint of the opposite side. The three medians meet at the centroid G, and G divides each one
        2 : 1 from the corner. With the worked example&apos;s median of 21 cm (PM in triangle PQR), the corner part is 14 cm and the
        midpoint part 7 cm.
      </p>
    </div>
  );
}
