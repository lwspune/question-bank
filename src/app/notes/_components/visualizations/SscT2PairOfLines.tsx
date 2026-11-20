/**
 * Static figure: the three ways two straight lines can sit, and the ratio
 * test that tells them apart (concept ssc2lesy-number). Each panel draws a
 * pair from the concept itself, written as ax + by + c = 0:
 * - one solution: 3x − y = 2 and x + y = 6 (a practice pair), crossing at (2, 4);
 * - no solution: 4x + 5y − 7 = 0 and 12x + 15y − 9 = 0 (the worked example, k = 5);
 * - infinitely many: 2x + 3y = 5 and 6x + 9y = 15 (the second example, m = 9).
 * Server component. Pinned by tests/notes-w2-05.test.ts.
 */

/** A line ax + by + c = 0. */
export type Line = { a: number; b: number; c: number };

export type Panel = {
  l1: Line;
  l2: Line;
  /** The visible window. */
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export const PANELS: readonly Panel[] = [
  { l1: { a: 3, b: -1, c: -2 }, l2: { a: 1, b: 1, c: -6 }, xMin: 0, xMax: 4, yMin: 0, yMax: 8 },
  { l1: { a: 4, b: 5, c: -7 }, l2: { a: 12, b: 15, c: -9 }, xMin: -1, xMax: 2, yMin: -1, yMax: 2.5 },
  { l1: { a: 2, b: 3, c: -5 }, l2: { a: 6, b: 9, c: -15 }, xMin: -1, xMax: 4, yMin: -1, yMax: 3 },
];

/** The concept's ratio test, done by cross-multiplying so no ratio divides by zero. */
export function classify(l1: Line, l2: Line): "one" | "none" | "infinite" {
  if (l1.a * l2.b - l2.a * l1.b !== 0) return "one";
  return l1.a * l2.c - l2.a * l1.c === 0 && l1.b * l2.c - l2.b * l1.c === 0 ? "infinite" : "none";
}

/** Where two crossing lines meet. */
export function meet(l1: Line, l2: Line): { x: number; y: number } {
  const det = l1.a * l2.b - l2.a * l1.b;
  return { x: (l1.b * l2.c - l2.b * l1.c) / det, y: (l2.a * l1.c - l1.a * l2.c) / det };
}

// Geometry (viewBox units): each panel's graph box.
const BOX = { x: 12, w: 100, h: 80 };
const ROW_H = 100;
const ROW_TOP = 12;
const r2 = (n: number) => Math.round(n * 100) / 100;

function toSvg(p: Panel, row: number, x: number, y: number) {
  const top = ROW_TOP + row * ROW_H;
  return {
    x: r2(BOX.x + ((x - p.xMin) / (p.xMax - p.xMin)) * BOX.w),
    y: r2(top + BOX.h - ((y - p.yMin) / (p.yMax - p.yMin)) * BOX.h),
  };
}

/** The line across the panel's x-range (every line here has b ≠ 0). */
function segment(p: Panel, row: number, l: Line) {
  const yAt = (x: number) => -(l.a * x + l.c) / l.b;
  return { p1: toSvg(p, row, p.xMin, yAt(p.xMin)), p2: toSvg(p, row, p.xMax, yAt(p.xMax)) };
}

const L1 = "stroke-indigo-600 dark:stroke-indigo-400";
const L2 = "stroke-amber-500 dark:stroke-amber-400";

const TEXT: { title: string; lines: string[] }[] = [
  { title: "One solution: they cross once", lines: ["3x − y = 2 and x + y = 6", "meet at (2, 4)", "a₁/a₂ = 3, b₁/b₂ = −1: different"] },
  { title: "No solution: parallel lines", lines: ["4x + 5y − 7 = 0, 12x + 15y − 9 = 0", "a₁/a₂ = b₁/b₂ = 1/3", "but c₁/c₂ = 7/9: different"] },
  { title: "Infinitely many: the same line", lines: ["2x + 3y = 5 and 6x + 9y = 15", "a₁/a₂ = b₁/b₂ = c₁/c₂ = 1/3"] },
];

export default function SscT2PairOfLines() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · one, none or infinitely many solutions
      </p>
      <svg
        viewBox="0 0 320 304"
        className="block h-auto w-full"
        role="img"
        aria-label="Three pairs of lines. First, 3x minus y equals 2 and x plus y equals 6 cross once, at the point 2, 4: the ratios of the x and y coefficients differ, so there is one solution. Second, 4x plus 5y minus 7 equals 0 and 12x plus 15y minus 9 equals 0 are parallel: the x and y ratios are both one third but the constant ratio is 7 ninths, so there is no solution. Third, 2x plus 3y equals 5 and 6x plus 9y equals 15 are the same line: all three ratios are one third, so there are infinitely many solutions."
      >
        <defs>
          {PANELS.map((_, row) => (
            <clipPath key={row} id={`ssct2-pair-lines-${row}`}>
              <rect x={BOX.x} y={ROW_TOP + row * ROW_H} width={BOX.w} height={BOX.h} />
            </clipPath>
          ))}
        </defs>
        {PANELS.map((p, row) => {
          const top = ROW_TOP + row * ROW_H;
          const s1 = segment(p, row, p.l1);
          const s2 = segment(p, row, p.l2);
          const kind = classify(p.l1, p.l2);
          const origin = toSvg(p, row, 0, 0);
          const pt = kind === "one" ? toSvg(p, row, meet(p.l1, p.l2).x, meet(p.l1, p.l2).y) : null;
          const t = TEXT[row];
          return (
            <g key={row}>
              <rect x={BOX.x} y={top} width={BOX.w} height={BOX.h} rx={3} strokeWidth={1} className="fill-background stroke-border" />
              <g clipPath={`url(#ssct2-pair-lines-${row})`}>
                <line x1={BOX.x} y1={origin.y} x2={BOX.x + BOX.w} y2={origin.y} strokeWidth={0.8} className="stroke-muted-foreground" />
                <line x1={origin.x} y1={top} x2={origin.x} y2={top + BOX.h} strokeWidth={0.8} className="stroke-muted-foreground" />
                <line x1={s1.p1.x} y1={s1.p1.y} x2={s1.p2.x} y2={s1.p2.y} strokeWidth={kind === "infinite" ? 5 : 2} className={L1} strokeOpacity={kind === "infinite" ? 0.45 : 1} />
                <line
                  x1={s2.p1.x}
                  y1={s2.p1.y}
                  x2={s2.p2.x}
                  y2={s2.p2.y}
                  strokeWidth={2}
                  strokeDasharray={kind === "infinite" ? "5 4" : undefined}
                  className={L2}
                />
              </g>
              {pt && <circle cx={pt.x} cy={pt.y} r={3.2} className="fill-rose-600 dark:fill-rose-400" />}
              {pt && (
                <text x={pt.x + 6} y={pt.y - 5} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                  (2, 4)
                </text>
              )}
              <text x={124} y={top + 14} className="fill-foreground text-[11px] font-semibold">
                {t.title}
              </text>
              {t.lines.map((line, i) => (
                <text key={i} x={124} y={top + 32 + i * 15} className="fill-foreground text-[10px]">
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Write both lines as ax + by + c = 0 and compare the coefficients as ratios. Different x and y ratios: the lines cross once.
        Equal x and y ratios: parallel or the same line, and only the constant ratio decides which. The axes cross at the origin.
      </p>
    </div>
  );
}
