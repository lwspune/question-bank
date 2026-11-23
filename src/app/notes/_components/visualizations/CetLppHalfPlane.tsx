/**
 * Static figure: the half-plane test (concept cetlpp-half-plane-test), drawn
 * with the concept's worked example, side by side:
 * - 3x + 2y ≥ 12: the line through (4, 0) and (0, 6) misses the origin, so the
 *   origin is the test point; 0 ≥ 12 is false, so the side AWAY from the
 *   origin is kept.
 * - x − y ≤ 0: the line y = x passes through the origin, which tells nothing
 *   (0 ≤ 0), so (1, 0) is tested; 1 ≤ 0 is false, so the side NOT containing
 *   (1, 0) is kept: above y = x.
 * The pair also shows the ≤ / ≥ point: the ≥ keeps the far side of its line and
 * the ≤ keeps the side above its line, so the sign alone never says which side.
 * Shaded areas are the half-planes clipped to the drawn window. Server
 * component. Pinned by tests/notes-cet-visuals-maths.test.ts.
 */

export type Pt = { x: number; y: number };
/** a·x + b·y (sense) c. */
export type HalfPlane = { a: number; b: number; c: number; sense: "le" | "ge"; test: Pt };

/** The concept's worked example, in order. */
export const HALF_PLANES: readonly HalfPlane[] = [
  { a: 3, b: 2, c: 12, sense: "ge", test: { x: 0, y: 0 } },
  { a: 1, b: -1, c: 0, sense: "le", test: { x: 1, y: 0 } },
];

/** The drawn window, in plane coordinates. */
export const WINDOW = { xMin: -1, xMax: 6, yMin: -1, yMax: 7 } as const;

/** Value of the left side a·x + b·y at p. */
export const lhs = (h: HalfPlane, p: Pt) => h.a * p.x + h.b * p.y;

/** True when p satisfies the inequality. */
export function satisfies(h: HalfPlane, p: Pt): boolean {
  const v = lhs(h, p);
  return h.sense === "le" ? v <= h.c + 1e-9 : v >= h.c - 1e-9;
}

/** True when p lies on the boundary line. */
export const onLine = (h: HalfPlane, p: Pt) => Math.abs(lhs(h, p) - h.c) < 1e-9;

/**
 * The kept half-plane cut to the window (Sutherland-Hodgman against one edge):
 * the polygon that is shaded.
 */
export function keptPolygon(h: HalfPlane, w = WINDOW): Pt[] {
  const box: Pt[] = [
    { x: w.xMin, y: w.yMin },
    { x: w.xMax, y: w.yMin },
    { x: w.xMax, y: w.yMax },
    { x: w.xMin, y: w.yMax },
  ];
  const out: Pt[] = [];
  for (let i = 0; i < box.length; i++) {
    const p = box[i];
    const q = box[(i + 1) % box.length];
    const pin = satisfies(h, p);
    const qin = satisfies(h, q);
    if (pin) out.push(p);
    if (pin !== qin) {
      const t = (h.c - lhs(h, p)) / (lhs(h, q) - lhs(h, p));
      out.push({ x: p.x + t * (q.x - p.x), y: p.y + t * (q.y - p.y) });
    }
  }
  return out;
}

/** Where the boundary line crosses the window's edge: its two drawn ends. */
export function lineEnds(h: HalfPlane, w = WINDOW): [Pt, Pt] {
  const pts: Pt[] = [];
  const add = (p: Pt) => {
    if (p.x >= w.xMin - 1e-9 && p.x <= w.xMax + 1e-9 && p.y >= w.yMin - 1e-9 && p.y <= w.yMax + 1e-9) {
      if (!pts.some((q) => Math.abs(q.x - p.x) < 1e-9 && Math.abs(q.y - p.y) < 1e-9)) pts.push(p);
    }
  };
  if (h.b !== 0) {
    for (const x of [w.xMin, w.xMax]) add({ x, y: (h.c - h.a * x) / h.b });
  }
  if (h.a !== 0) {
    for (const y of [w.yMin, w.yMax]) add({ x: (h.c - h.b * y) / h.a, y });
  }
  return [pts[0], pts[1]];
}

// Geometry (viewBox units): two panels, 19 units per plane unit.
const UNIT = 19;
const PANEL_LEFT = [14, 168] as const;
const PANEL_TOP = 26;
const r2 = (n: number) => Math.round(n * 100) / 100;
const sx = (panel: number, x: number) => r2(PANEL_LEFT[panel] + (x - WINDOW.xMin) * UNIT);
const sy = (y: number) => r2(PANEL_TOP + (WINDOW.yMax - y) * UNIT);

const PANEL_TEXT = [
  { heading: "3x + 2y ≥ 12", test: "test (0, 0): 0 ≥ 12", keep: "false: keep far side", testName: "(0, 0)" },
  { heading: "x − y ≤ 0", test: "test (1, 0): 1 ≤ 0", keep: "false: keep side above", testName: "(1, 0)" },
] as const;

function Panel({ i }: { i: number }) {
  const h = HALF_PLANES[i];
  const t = PANEL_TEXT[i];
  const poly = keptPolygon(h)
    .map((p) => `${sx(i, p.x)},${sy(p.y)}`)
    .join(" ");
  const [e1, e2] = lineEnds(h);
  const left = PANEL_LEFT[i];
  const width = (WINDOW.xMax - WINDOW.xMin) * UNIT;
  return (
    <g>
      <text x={left + width / 2} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {t.heading}
      </text>
      <rect x={left} y={PANEL_TOP} width={width} height={(WINDOW.yMax - WINDOW.yMin) * UNIT} fill="none" className="stroke-border" />
      <polygon points={poly} className="fill-sky-500/25 dark:fill-sky-400/25" />
      {/* Axes */}
      <line x1={sx(i, WINDOW.xMin)} y1={sy(0)} x2={sx(i, WINDOW.xMax)} y2={sy(0)} className="stroke-muted-foreground" strokeWidth={0.8} />
      <line x1={sx(i, 0)} y1={sy(WINDOW.yMin)} x2={sx(i, 0)} y2={sy(WINDOW.yMax)} className="stroke-muted-foreground" strokeWidth={0.8} />
      {/* Boundary line */}
      <line x1={sx(i, e1.x)} y1={sy(e1.y)} x2={sx(i, e2.x)} y2={sy(e2.y)} strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />
      {i === 0 ? (
        <>
          <circle cx={sx(0, 4)} cy={sy(0)} r={2.5} className="fill-indigo-600 dark:fill-indigo-400" />
          <circle cx={sx(0, 0)} cy={sy(6)} r={2.5} className="fill-indigo-600 dark:fill-indigo-400" />
          <text x={sx(0, 4) + 3} y={sy(0) + 11} className="fill-indigo-700 text-[9px] dark:fill-indigo-300">
            (4, 0)
          </text>
          <text x={sx(0, 0) + 4} y={sy(6) - 3} className="fill-indigo-700 text-[9px] dark:fill-indigo-300">
            (0, 6)
          </text>
          <text x={sx(0, 3.4)} y={sy(5.6)} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-200">
            kept
          </text>
        </>
      ) : (
        <>
          <text x={sx(1, 4.5)} y={sy(3.7)} className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
            y = x
          </text>
          <text x={sx(1, 0.6)} y={sy(5.6)} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-200">
            kept
          </text>
        </>
      )}
      {/* Test point: a ring, red because it fails */}
      <circle cx={sx(i, h.test.x)} cy={sy(h.test.y)} r={4} fill="none" strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
      <text x={sx(i, h.test.x) + 6} y={sy(h.test.y) + 12} className="fill-rose-700 text-[9px] font-semibold dark:fill-rose-300">
        {t.testName}
      </text>
      <text x={left + width / 2} y={sy(WINDOW.yMin) + 15} textAnchor="middle" className="fill-rose-700 text-[9px] dark:fill-rose-300">
        {t.test}
      </text>
      <text x={left + width / 2} y={sy(WINDOW.yMin) + 28} textAnchor="middle" className="fill-sky-800 text-[9px] font-semibold dark:fill-sky-200">
        {t.keep}
      </text>
    </g>
  );
}

export default function CetLppHalfPlane() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the half-plane test, one point per line
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Two half-planes. Left: 3x + 2y ≥ 12, the line through (4, 0) and (0, 6); the origin gives 0 ≥ 12, false, so the side away from the origin is shaded. Right: x − y ≤ 0, the line y = x through the origin; the test point (1, 0) gives 1 ≤ 0, false, so the side above y = x is shaded."
      >
        <Panel i={0} />
        <Panel i={1} />
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The sign alone does not say which side: here the ≥ keeps the side away from the origin and the ≤ keeps the side above its line.
        Substitute a point not on the line. If it satisfies the inequality, keep its side; if not, keep the other side. When the line
        passes through the origin, 0 ≤ 0 tells nothing, so test (1, 0) or (0, 1) instead.
      </p>
    </div>
  );
}
