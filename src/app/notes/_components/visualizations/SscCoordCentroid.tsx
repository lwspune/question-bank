/**
 * Static figure: the worked example of concept ssccgpt-midpoint on a grid.
 * Triangle A(0, 3), B(−3, 8), C(9, −2); M, the midpoint of BC, is (3, 3) and
 * the centroid G, the average of the three corners, is (2, 3). G lies on the
 * median AM and divides it 2 : 1 from the corner, as G = (A + 2M) ÷ 3 says.
 * Every point is plotted from its coordinates on a one-unit grid. Plain
 * geometry, server component. Pinned by tests/notes-w2-13.test.ts.
 */

export type XY = [number, number];

/** The worked example's corners. */
export const CORNERS: Record<"A" | "B" | "C", XY> = { A: [0, 3], B: [-3, 8], C: [9, -2] };

export const midpointOf = (p: XY, q: XY): XY => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
export const centroidOf = (p: XY, q: XY, r: XY): XY => [(p[0] + q[0] + r[0]) / 3, (p[1] + q[1] + r[1]) / 3];

export const M = midpointOf(CORNERS.B, CORNERS.C);
export const G = centroidOf(CORNERS.A, CORNERS.B, CORNERS.C);

/** The grid: x from −4 to 10, y from −3 to 9, UNIT viewBox units per step. */
export const X_RANGE: XY = [-4, 10];
export const Y_RANGE: XY = [-3, 9];
export const UNIT = 17;
const LEFT = 40;
const TOP = 12;
export const toPx = ([x, y]: XY) => ({ x: LEFT + (x - X_RANGE[0]) * UNIT, y: TOP + (Y_RANGE[1] - y) * UNIT });

const show = (n: number) => (n < 0 ? `−${-n}` : String(n));
const pair = ([x, y]: XY) => `(${show(x)}, ${show(y)})`;

export default function SscCoordCentroid() {
  const a = toPx(CORNERS.A);
  const b = toPx(CORNERS.B);
  const c = toPx(CORNERS.C);
  const m = toPx(M);
  const g = toPx(G);
  const xs = Array.from({ length: X_RANGE[1] - X_RANGE[0] + 1 }, (_, i) => X_RANGE[0] + i);
  const ys = Array.from({ length: Y_RANGE[1] - Y_RANGE[0] + 1 }, (_, i) => Y_RANGE[0] + i);
  const top = toPx([0, Y_RANGE[1]]).y;
  const bottom = toPx([0, Y_RANGE[0]]).y;
  const left = toPx([X_RANGE[0], 0]).x;
  const right = toPx([X_RANGE[1], 0]).x;
  const origin = toPx([0, 0]);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · midpoint and centroid on a grid
      </p>
      <svg
        viewBox="0 0 320 272"
        className="block h-auto w-full"
        role="img"
        aria-label="On a grid, triangle A(0, 3), B(−3, 8), C(9, −2). M, the midpoint of BC, is (3, 3). The centroid G, the average of the three corners, is (2, 3). G is on the median AM, two units from A and one unit from M."
      >
        {xs.map((x) => (
          <line key={`x${x}`} x1={toPx([x, 0]).x} y1={top} x2={toPx([x, 0]).x} y2={bottom} strokeWidth={0.5} className="stroke-border" />
        ))}
        {ys.map((y) => (
          <line key={`y${y}`} x1={left} y1={toPx([0, y]).y} x2={right} y2={toPx([0, y]).y} strokeWidth={0.5} className="stroke-border" />
        ))}
        <line x1={left} y1={origin.y} x2={right} y2={origin.y} strokeWidth={1.2} className="stroke-muted-foreground" />
        <line x1={origin.x} y1={top} x2={origin.x} y2={bottom} strokeWidth={1.2} className="stroke-muted-foreground" />
        <text x={right + 4} y={origin.y + 4} className="fill-muted-foreground text-[11px] italic">
          x
        </text>
        <text x={origin.x + 4} y={top + 8} className="fill-muted-foreground text-[11px] italic">
          y
        </text>

        <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`} className="fill-sky-200/40 stroke-foreground dark:fill-sky-800/30" strokeWidth={1.6} />
        {/* The median AM, split 2 : 1 at G */}
        <line x1={a.x} y1={a.y} x2={g.x} y2={g.y} strokeWidth={2.6} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={g.x} y1={g.y} x2={m.x} y2={m.y} strokeWidth={2.6} className="stroke-amber-500 dark:stroke-amber-400" />
        {[
          { p: a, label: `A${pair(CORNERS.A)}`, dx: -6, dy: 4, anchor: "end" as const },
          { p: b, label: `B${pair(CORNERS.B)}`, dx: -6, dy: 4, anchor: "end" as const },
          { p: c, label: `C${pair(CORNERS.C)}`, dx: -6, dy: 12, anchor: "end" as const },
          { p: m, label: "M", dx: 7, dy: -5, anchor: "start" as const },
        ].map(({ p, label, dx, dy, anchor }) => (
          <g key={label}>
            <circle cx={p.x} cy={p.y} r={2.6} className="fill-foreground" />
            <text x={p.x + dx} y={p.y + dy} textAnchor={anchor} className="fill-foreground text-[11px] font-semibold">
              {label}
            </text>
          </g>
        ))}
        <circle cx={g.x} cy={g.y} r={3.6} className="fill-rose-600 dark:fill-rose-400" />
        <text x={g.x + 4} y={g.y + 17} textAnchor="middle" className="fill-rose-700 text-[12px] font-bold dark:fill-rose-300">
          G
        </text>

        <text x={160} y={234} textAnchor="middle" className="fill-foreground text-[10px]">
          M = ((−3 + 9) ÷ 2, (8 − 2) ÷ 2) = (3, 3)
        </text>
        <text x={160} y={249} textAnchor="middle" className="fill-foreground text-[10px]">
          G = ((0 − 3 + 9) ÷ 3, (3 + 8 − 2) ÷ 3) = (2, 3)
        </text>
        <text x={160} y={264} textAnchor="middle" className="fill-foreground text-[10px]">
          On the median AM: AG = 2 units, GM = 1 unit, so 2 : 1
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The midpoint is the average of the two ends; the centroid is the average of the three corners. Here A, G and M all have y = 3, so
        the median AM runs along the grid: AG is 2 units and GM is 1 unit, the 2 : 1 split from the corner.
      </p>
    </div>
  );
}
