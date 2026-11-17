/**
 * Static figure: part (a) of the IMAT "Quadratic inequalities with a sign
 * chart" worked example, x² − x − 12 > 0.
 *
 * Top: the parabola y = (x − 4)(x + 3), opening upwards, crossing the x-axis
 * at its roots −3 and 4; the parts above the axis and the part below it in
 * different colours. Bottom: the sign chart (+ / − / +) on a number line, with
 * open circles at −3 and 4 (the inequality is strict) and the solution
 * x < −3 or x > 4 shaded.
 *
 * Pedagogical aim: the shape gives the answer. Positive outside the roots,
 * negative between them. Pinned by tests/notes-imat-visuals-maths.test.ts.
 * Server component, no client state.
 */

/** The worked example's quadratic: x² − x − 12 = (x − 4)(x + 3). */
export const QUAD = { a: 1, b: -1, c: -12 } as const;

export function quad(x: number): number {
  return QUAD.a * x * x + QUAD.b * x + QUAD.c;
}

export function discriminant(): number {
  return QUAD.b * QUAD.b - 4 * QUAD.a * QUAD.c;
}

/** The two roots, smaller first. */
export function roots(): [number, number] {
  const d = Math.sqrt(discriminant());
  const r1 = (-QUAD.b - d) / (2 * QUAD.a);
  const r2 = (-QUAD.b + d) / (2 * QUAD.a);
  return [Math.min(r1, r2), Math.max(r1, r2)];
}

export function vertex(): { x: number; y: number } {
  const x = -QUAD.b / (2 * QUAD.a);
  return { x, y: quad(x) };
}

/** The three intervals of the sign chart, with the sign the parabola has there. */
export const SIGN_CHART = [
  { label: "x < −3", test: -5, sign: "+" },
  { label: "−3 < x < 4", test: 0, sign: "−" },
  { label: "x > 4", test: 5, sign: "+" },
] as const;

/** "> 0" is strict, so the roots are left out (open circles). */
export const STRICT = true;
export const SOLUTION_TEXT = "x < −3 or x > 4";

const MINUS = "−";
const signed = (n: number) => (n < 0 ? `${MINUS}${-n}` : String(n));

// Geometry (viewBox units).
const W = 320;
const X_MIN = -5.5;
const X_MAX = 6.5;
const Y_MIN = -14;
const Y_MAX = 24;
const PL = 16;
const PR = 16;
const GT = 10; // graph top
const GB = 160; // graph bottom
const LINE_Y = 214; // sign chart number line
const H = 244;
const sx = (x: number) => PL + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - PL - PR);
const sy = (y: number) => GT + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (GB - GT);

function curve(from: number, to: number): string {
  const n = 80;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = from + (i / n) * (to - from);
    pts.push(`${i === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(quad(x)).toFixed(1)}`);
  }
  return pts.join(" ");
}

const POS = "text-emerald-600 dark:text-emerald-400";
const NEG = "text-rose-600 dark:text-rose-400";

export default function ImatSignChart() {
  const [r1, r2] = roots();
  const v = vertex();
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · solving x² − x − 12 &gt; 0 with a sign chart
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Parabola y = x squared minus x minus 12, crossing the x-axis at minus 3 and 4, with its sign chart below: plus, minus, plus. Solution x less than minus 3 or x greater than 4."
      >
        {/* Graph axes */}
        <line x1={PL} y1={sy(0)} x2={W - PR} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/60" />
        <line x1={sx(0)} y1={GT} x2={sx(0)} y2={GB} stroke="currentColor" className="text-muted-foreground/60" />
        <text x={W - PR} y={sy(0) - 4} textAnchor="end" className="fill-muted-foreground text-[10px]">x</text>
        <text x={sx(0) + 5} y={GT + 8} className="fill-muted-foreground text-[10px]">y</text>

        {/* The parabola: above the axis outside the roots, below between them */}
        <path d={curve(X_MIN, r1)} fill="none" stroke="currentColor" strokeWidth={2.5} className={POS} />
        <path d={curve(r1, r2)} fill="none" stroke="currentColor" strokeWidth={2.5} className={NEG} />
        <path d={curve(r2, X_MAX)} fill="none" stroke="currentColor" strokeWidth={2.5} className={POS} />

        <text x={sx(-4.9)} y={sy(3)} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">y &gt; 0</text>
        <text x={sx(5.9)} y={sy(3)} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">y &gt; 0</text>
        <text x={sx(v.x)} y={sy(v.y) + 14} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">y &lt; 0</text>

        {/* Roots on the graph */}
        {[r1, r2].map((r) => (
          <g key={r}>
            <circle cx={sx(r)} cy={sy(0)} r={3.5} className="fill-background stroke-foreground" strokeWidth={1.5} />
            <text x={sx(r) + (r < 0 ? -5 : 5)} y={sy(0) + 12} textAnchor={r < 0 ? "end" : "start"} className="fill-foreground text-[10px] font-semibold tabular-nums">
              {signed(r)}
            </text>
          </g>
        ))}

        {/* Sign chart */}
        <text x={PL} y={LINE_Y - 30} className="fill-foreground text-[10px] font-semibold">
          sign of (x − 4)(x + 3)
        </text>
        <line x1={PL} y1={LINE_Y} x2={W - PR} y2={LINE_Y} stroke="currentColor" strokeWidth={1.2} className="text-muted-foreground" />
        {/* Shaded solution: the two outer rays */}
        <line x1={PL} y1={LINE_Y} x2={sx(r1) - 4} y2={LINE_Y} stroke="currentColor" strokeWidth={5} strokeLinecap="round" className={`${POS} opacity-70`} />
        <line x1={sx(r2) + 4} y1={LINE_Y} x2={W - PR} y2={LINE_Y} stroke="currentColor" strokeWidth={5} strokeLinecap="round" className={`${POS} opacity-70`} />
        {[r1, r2].map((r) => (
          <g key={`s${r}`}>
            <circle cx={sx(r)} cy={LINE_Y} r={4} className="fill-background stroke-foreground" strokeWidth={1.5} />
            <text x={sx(r)} y={LINE_Y + 16} textAnchor="middle" className="fill-foreground text-[10px] font-semibold tabular-nums">
              {signed(r)}
            </text>
          </g>
        ))}
        {SIGN_CHART.map((s, i) => {
          const mid = i === 0 ? (X_MIN + r1) / 2 : i === 1 ? (r1 + r2) / 2 : (r2 + X_MAX) / 2;
          const cls = s.sign === "+" ? "fill-emerald-700 dark:fill-emerald-300" : "fill-rose-700 dark:fill-rose-300";
          return (
            <text key={s.label} x={sx(mid)} y={LINE_Y - 9} textAnchor="middle" className={`${cls} text-[14px] font-bold`}>
              {s.sign}
            </text>
          );
        })}
        <text x={W - PR} y={LINE_Y + 28} textAnchor="end" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          shaded: {SOLUTION_TEXT}
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        x² − x − 12 = (x − 4)(x + 3) has roots −3 and 4. The parabola opens upwards (a = 1 &gt; 0), so it is
        positive outside the roots and negative between them. The question asks for &gt; 0, so the answer is
        x &lt; −3 or x &gt; 4. The circles are open because the roots give 0, which is not &gt; 0.
      </p>
    </div>
  );
}
