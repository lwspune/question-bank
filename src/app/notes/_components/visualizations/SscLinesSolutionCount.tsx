/**
 * Static figure: one, none or infinitely many solutions (concept
 * ssclens-ratios), each case drawn with the concept's own systems:
 *  - x + 2y = 4 and 3x − y = 5 cross once, at (2, 1): 1/3 ≠ 2/(−1);
 *  - 6x − 4y = 10 and 9x − 6y = 12 are parallel: 6/9 = (−4)/(−6) = 2/3,
 *    but 10/12 = 5/6;
 *  - 2x + 5y = 8 and 6x + 15y = 24 are the same line: every ratio is 1/3.
 * Server component. Pinned by tests/notes-w2-04.test.ts.
 */

/** a·x + b·y = c. */
export type Eq = { a: number; b: number; c: number };

export const CASES = [
  {
    title: "Cross: one solution",
    e1: { a: 1, b: 2, c: 4 },
    e2: { a: 3, b: -1, c: 5 },
    ratio: "1/3 ≠ 2/(−1)",
    win: { x0: -1, x1: 5, y0: -3, y1: 4 },
    unit: 13,
  },
  {
    title: "Parallel: no solution",
    e1: { a: 6, b: -4, c: 10 },
    e2: { a: 9, b: -6, c: 12 },
    ratio: "6/9 = (−4)/(−6) = 2/3, but 10/12 = 5/6",
    // Zoomed in: the two lines are only 1/√13 apart.
    win: { x0: 0.7, x1: 3.3, y0: -0.8, y1: 2.2 },
    unit: 30,
  },
  {
    title: "Same line: infinitely many",
    e1: { a: 2, b: 5, c: 8 },
    e2: { a: 6, b: 15, c: 24 },
    ratio: "2/6 = 5/15 = 8/24 = 1/3",
    win: { x0: -1, x1: 5, y0: -3, y1: 4 },
    unit: 13,
  },
] as const;

export type Count = "one" | "none" | "infinite";

/** The count from the coefficient ratios (cross-multiplied, so no division by zero). */
export function solutionCount(e1: Eq, e2: Eq): Count {
  if (e1.a * e2.b !== e2.a * e1.b) return "one";
  return e1.a * e2.c === e2.a * e1.c && e1.b * e2.c === e2.b * e1.c ? "infinite" : "none";
}

/** The crossing point when there is one. */
export function meet(e1: Eq, e2: Eq): { x: number; y: number } | null {
  const d = e1.a * e2.b - e2.a * e1.b;
  if (d === 0) return null;
  return { x: (e1.c * e2.b - e2.c * e1.b) / d, y: (e1.a * e2.c - e2.a * e1.c) / d };
}

/** The window a small plot shows. */
export type Win = { x0: number; x1: number; y0: number; y1: number };

/** The part of a·x + b·y = c inside the window. */
export function clip(e: Eq, WIN: Win): [{ x: number; y: number }, { x: number; y: number }] | null {
  const pts: { x: number; y: number }[] = [];
  const inside = (x: number, y: number) => x >= WIN.x0 - 1e-9 && x <= WIN.x1 + 1e-9 && y >= WIN.y0 - 1e-9 && y <= WIN.y1 + 1e-9;
  const add = (x: number, y: number) => {
    if (inside(x, y) && !pts.some((p) => Math.abs(p.x - x) < 1e-9 && Math.abs(p.y - y) < 1e-9)) pts.push({ x, y });
  };
  if (e.b !== 0) {
    add(WIN.x0, (e.c - e.a * WIN.x0) / e.b);
    add(WIN.x1, (e.c - e.a * WIN.x1) / e.b);
  }
  if (e.a !== 0) {
    add((e.c - e.b * WIN.y0) / e.a, WIN.y0);
    add((e.c - e.b * WIN.y1) / e.a, WIN.y1);
  }
  return pts.length >= 2 ? [pts[0], pts[1]] : null;
}

// Geometry (viewBox units): each case is a row, its plot on the left.
export const ROW_H = 104;
export const PLOT_X = 14;
const r2 = (n: number) => Math.round(n * 100) / 100;

const eqText = (e: Eq) => {
  const y = e.b < 0 ? ` − ${Math.abs(e.b) === 1 ? "" : Math.abs(e.b)}y` : ` + ${e.b === 1 ? "" : e.b}y`;
  return `${e.a === 1 ? "" : e.a}x${y} = ${e.c}`;
};

export default function SscLinesSolutionCount() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two lines: cross, parallel or the same line
      </p>
      <svg
        viewBox={`0 0 320 ${CASES.length * ROW_H + 6}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Three pairs of lines. x + 2y = 4 and 3x − y = 5 cross once, at (2, 1): one solution. 6x − 4y = 10 and 9x − 6y = 12 are parallel: no solution. 2x + 5y = 8 and 6x + 15y = 24 are the same line: infinitely many solutions."
      >
        {CASES.map((cs, i) => {
          const top = 6 + i * ROW_H;
          const ox = PLOT_X;
          const { win: WIN, unit: UNIT } = cs;
          const sx = (x: number) => r2(ox + (x - WIN.x0) * UNIT);
          const sy = (y: number) => r2(top + (WIN.y1 - y) * UNIT);
          const l1 = clip(cs.e1, WIN);
          const l2 = clip(cs.e2, WIN);
          const p = meet(cs.e1, cs.e2);
          return (
            <g key={cs.title}>
              {/* Plot frame and axes */}
              <rect
                x={sx(WIN.x0)}
                y={sy(WIN.y1)}
                width={r2((WIN.x1 - WIN.x0) * UNIT)}
                height={r2((WIN.y1 - WIN.y0) * UNIT)}
                fill="none"
                className="stroke-border"
              />
              {WIN.y0 < 0 && WIN.y1 > 0 && (
                <line x1={sx(WIN.x0)} y1={sy(0)} x2={sx(WIN.x1)} y2={sy(0)} className="stroke-muted-foreground" strokeWidth={0.8} />
              )}
              {WIN.x0 < 0 && WIN.x1 > 0 && (
                <line x1={sx(0)} y1={sy(WIN.y0)} x2={sx(0)} y2={sy(WIN.y1)} className="stroke-muted-foreground" strokeWidth={0.8} />
              )}

              {l1 && (
                <line x1={sx(l1[0].x)} y1={sy(l1[0].y)} x2={sx(l1[1].x)} y2={sy(l1[1].y)} strokeWidth={2.5} className="stroke-sky-600 dark:stroke-sky-400" />
              )}
              {l2 && (
                <line
                  x1={sx(l2[0].x)}
                  y1={sy(l2[0].y)}
                  x2={sx(l2[1].x)}
                  y2={sy(l2[1].y)}
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  className="stroke-amber-600 dark:stroke-amber-400"
                />
              )}
              {p && <circle cx={sx(p.x)} cy={sy(p.y)} r={3.5} className="fill-emerald-600 dark:fill-emerald-400" />}
              {p && (
                <text x={sx(p.x) + 5} y={sy(p.y) - 5} className="fill-emerald-700 text-[9.5px] font-semibold dark:fill-emerald-300">
                  ({p.x}, {p.y})
                </text>
              )}

              {/* The reading */}
              <g className="text-[10.5px]">
                <text x={110} y={top + 14} className="fill-foreground text-[11.5px] font-semibold">
                  {cs.title}
                </text>
                <line x1={110} y1={top + 29} x2={124} y2={top + 29} strokeWidth={2.5} className="stroke-sky-600 dark:stroke-sky-400" />
                <text x={128} y={top + 33} className="fill-foreground tabular-nums">
                  {eqText(cs.e1)}
                </text>
                <line x1={110} y1={top + 46} x2={124} y2={top + 46} strokeWidth={2} strokeDasharray="5 3" className="stroke-amber-600 dark:stroke-amber-400" />
                <text x={128} y={top + 50} className="fill-foreground tabular-nums">
                  {eqText(cs.e2)}
                </text>
                <text x={110} y={top + 70} className="fill-indigo-700 text-[10px] tabular-nums dark:fill-indigo-300">
                  {cs.ratio}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Compare a₁/a₂ with b₁/b₂ first. Unequal: the lines cross once. Equal: they are parallel or the same line, and c₁/c₂ decides. A
        different c ratio means parallel, no solution; the same ratio means one line drawn twice, every point a solution.
      </p>
    </div>
  );
}
