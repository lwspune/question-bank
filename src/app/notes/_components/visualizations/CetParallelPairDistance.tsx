/**
 * Static figure: a parallel pair and the gap between its lines (concept
 * cetpsl-parallel-lines-and-their-distance), drawn with the concept's worked
 * example: x² + 2xy + y² − 5x − 5y + 6 = 0.
 *
 * h² = ab (1 = 1·1), so the quadratic part is the square (x + y)², and
 * (x + y)² − 5(x + y) + 6 = (x + y − 2)(x + y − 3): the lines x + y = 2 and
 * x + y = 3. Their gap is |−2 + 3|/√2 = 1/√2, drawn as the common
 * perpendicular from (1, 1) to (3/2, 3/2). The formula route agrees:
 * g = −5/2, c = 6, g² − ac = 1/4, d = 2√((1/4)/(1·2)) = 1/√2.
 * Server component. Pinned by tests/notes-w2-16.test.ts.
 */

/** ax² + 2hxy + by² + 2gx + 2fy + c = 0. */
export const PAIR = { a: 1, h: 1, b: 1, g: -5 / 2, f: -5 / 2, c: 6 } as const;

/** The two lines as x + y + k = 0. */
export const LINE_KS = [-2, -3] as const;

export function pairValue(x: number, y: number): number {
  const { a, h, b, g, f, c } = PAIR;
  return a * x * x + 2 * h * x * y + b * y * y + 2 * g * x + 2 * f * y + c;
}

/** Gap from the factors: |k₁ − k₂|/√(1² + 1²). */
export const gapByFactors = () => Math.abs(LINE_KS[0] - LINE_KS[1]) / Math.SQRT2;

/** Gap from the formula 2√((g² − ac)/(a(a + b))). */
export function gapByFormula(): number {
  const { a, b, g, c } = PAIR;
  return 2 * Math.sqrt((g * g - a * c) / (a * (a + b)));
}

/** The common perpendicular through the origin's direction (1, 1): its feet on the two lines. */
export const FEET = [
  { x: 1, y: 1 },
  { x: 1.5, y: 1.5 },
] as const;

// Plot geometry (viewBox units): x and y from −0.5 to 3.5.
export const PLOT = { left: 30, top: 12, unit: 36, min: -0.5, max: 3.5 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.left + (x - PLOT.min) * PLOT.unit);
const py = (y: number) => r2(PLOT.top + (PLOT.max - y) * PLOT.unit);

/** Ends of x + y = s inside the plot square. */
function lineEnds(s: number): { x1: number; y1: number; x2: number; y2: number } {
  const xa = Math.max(PLOT.min, s - PLOT.max);
  const xb = Math.min(PLOT.max, s - PLOT.min);
  return { x1: px(xa), y1: py(s - xa), x2: px(xb), y2: py(s - xb) };
}

export default function CetParallelPairDistance() {
  const [P, Q] = FEET;
  const right = 184;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a parallel pair and the gap between its lines
      </p>
      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="The pair x² + 2xy + y² − 5x − 5y + 6 = 0 factors as (x + y − 2)(x + y − 3): the parallel lines x + y = 2 and x + y = 3. The common perpendicular runs from (1, 1) to (3/2, 3/2), length 1/√2. The formula 2√((g² − ac)/(a(a + b))) also gives 1/√2."
      >
        {/* Grid and axes */}
        {[1, 2, 3].map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={py(PLOT.min)} x2={px(t)} y2={py(PLOT.max)} className="stroke-border" strokeWidth={0.5} />
            <line x1={px(PLOT.min)} y1={py(t)} x2={px(PLOT.max)} y2={py(t)} className="stroke-border" strokeWidth={0.5} />
            <text x={px(t)} y={py(0) + 11} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
              {t}
            </text>
            <text x={px(0) - 4} y={py(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        <line x1={px(PLOT.min)} y1={py(0)} x2={px(PLOT.max)} y2={py(0)} className="stroke-muted-foreground" />
        <line x1={px(0)} y1={py(PLOT.min)} x2={px(0)} y2={py(PLOT.max)} className="stroke-muted-foreground" />
        <text x={px(PLOT.max) - 2} y={py(0) - 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          x
        </text>
        <text x={px(0) + 4} y={py(PLOT.max) + 9} className="fill-muted-foreground text-[10px]">
          y
        </text>

        {/* The two lines */}
        <line {...lineEnds(2)} strokeWidth={2.2} className="stroke-sky-600 dark:stroke-sky-400" />
        <line {...lineEnds(3)} strokeWidth={2.2} className="stroke-rose-600 dark:stroke-rose-400" />
        <text x={px(0.9)} y={py(0.55)} textAnchor="end" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          x + y = 2
        </text>
        <text x={px(2.15)} y={py(1)} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          x + y = 3
        </text>

        {/* The gap */}
        <line x1={px(P.x)} y1={py(P.y)} x2={px(Q.x)} y2={py(Q.y)} strokeWidth={2} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <circle cx={px(P.x)} cy={py(P.y)} r={2.8} className="fill-foreground" />
        <circle cx={px(Q.x)} cy={py(Q.y)} r={2.8} className="fill-foreground" />
        <text x={px(P.x) - 6} y={py(P.y) + 4} textAnchor="end" className="fill-foreground text-[9px] tabular-nums">
          (1, 1)
        </text>
        <text x={px(Q.x) + 6} y={py(Q.y) - 4} className="fill-foreground text-[9px] tabular-nums">
          (3/2, 3/2)
        </text>
        <text x={px(1.5)} y={py(0.9)} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          1/√2
        </text>

        {/* The formula route */}
        <g className="text-[10px] tabular-nums">
          <text x={right} y={28} className="fill-foreground font-semibold">
            h² = ab = 1: parallel
          </text>
          <text x={right} y={46} className="fill-foreground">
            g = −5/2, c = 6
          </text>
          <text x={right} y={64} className="fill-foreground">
            g² − ac = 25/4 − 6 = 1/4
          </text>
          <text x={right} y={82} className="fill-foreground">
            a(a + b) = 1 × 2 = 2
          </text>
          <text x={right} y={100} className="fill-foreground">
            d = 2√((1/4)/2)
          </text>
          <text x={right} y={118} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            = 2√(1/8) = 1/√2
          </text>
        </g>

        {/* The factor route */}
        <g className="text-[11px] tabular-nums">
          <text x={160} y={194} textAnchor="middle" className="fill-foreground">
            (x + y)² − 5(x + y) + 6 = (x + y − 2)(x + y − 3)
          </text>
          <text x={160} y={212} textAnchor="middle" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            gap = |−2 + 3|/√(1² + 1²) = 1/√2
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        When h² = ab the second-degree terms are a perfect square, here (x + y)², and the equation splits into two lines with the same
        x and y terms. The gap is the difference of the constants over √(1² + 1²). The formula reaches the same 1/√2 without factoring.
      </p>
    </div>
  );
}
