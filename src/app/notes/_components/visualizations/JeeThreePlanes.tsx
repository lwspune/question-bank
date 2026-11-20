/**
 * Static figure: the three cases of a 3 × 3 linear system as three planes
 * (concept jdet-statements), drawn with the concept's worked example
 * x + y + z = 3, x + 2y + 2z = 5, x + 2y + λz = μ.
 *
 * Δ = det[[1, 1, 1], [1, 2, 2], [1, 2, λ]] = 1(2λ − 4) − 1(λ − 2) + 0 = λ − 2.
 * Taking ② from ③ leaves (λ − 2)z = μ − 5. So λ ≠ 2: Δ ≠ 0, one point.
 * λ = 2, μ = 5: ③ is ② itself, and it cuts ① in the line x = 1, y + z = 2
 * (from y + z = 2 and x = 3 − (y + z)): infinitely many. λ = 2, μ ≠ 5:
 * ② and ③ are parallel (same left side, different right side), no common
 * point: none. The planes are drawn as a schematic, not to scale.
 * Server component. Pinned by tests/notes-w2-12.test.ts.
 */

export type Eq = { a: number; b: number; c: number; d: number };
export type P3 = { x: number; y: number; z: number };

/** The concept's system, rows ①, ②, ③. */
export const system = (lam: number, mu: number): Eq[] => [
  { a: 1, b: 1, c: 1, d: 3 },
  { a: 1, b: 2, c: 2, d: 5 },
  { a: 1, b: 2, c: lam, d: mu },
];

export const det3 = (m: number[][]) =>
  m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
  m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
  m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

/** Δ, the determinant of the coefficients. */
export const delta = (lam: number) => det3(system(lam, 0).map((e) => [e.a, e.b, e.c]));

/** ③ − ②: the equation left after elimination, coeff·z = rhs. */
export const eliminated = (lam: number, mu: number) => {
  const [, e2, e3] = system(lam, mu);
  return { a: e3.a - e2.a, b: e3.b - e2.b, coeff: e3.c - e2.c, rhs: e3.d - e2.d };
};

export type Outcome = "unique" | "infinite" | "none";

export function classify(lam: number, mu: number): Outcome {
  if (Math.abs(delta(lam)) > 1e-12) return "unique";
  return Math.abs(eliminated(lam, mu).rhs) < 1e-12 ? "infinite" : "none";
}

export const satisfies = (eqs: Eq[], p: P3) => eqs.every((e) => Math.abs(e.a * p.x + e.b * p.y + e.c * p.z - e.d) < 1e-9);

/** The line of solutions when λ = 2, μ = 5: x = 1, y + z = 2. */
export const linePoint = (t: number): P3 => ({ x: 1, y: 2 - t, z: t });

export type Panel = {
  outcome: Outcome;
  /** A (λ, μ) pair of this case, for the test. */
  sample: { lam: number; mu: number };
  lines: { text: string; tone: "head" | "plain" | "good" | "bad" }[];
};

export const PANELS: readonly Panel[] = [
  {
    outcome: "unique",
    sample: { lam: 3, mu: 5 },
    lines: [
      { text: "Δ ≠ 0 (λ ≠ 2)", tone: "head" },
      { text: "the three planes meet", tone: "plain" },
      { text: "in one point", tone: "plain" },
      { text: "unique solution", tone: "good" },
    ],
  },
  {
    outcome: "infinite",
    sample: { lam: 2, mu: 5 },
    lines: [
      { text: "Δ = 0, consistent", tone: "head" },
      { text: "λ = 2, μ = 5", tone: "plain" },
      { text: "② and ③ are one plane;", tone: "plain" },
      { text: "it cuts ① in a line", tone: "plain" },
      { text: "x = 1, y + z = 2", tone: "plain" },
      { text: "infinitely many solutions", tone: "good" },
    ],
  },
  {
    outcome: "none",
    sample: { lam: 2, mu: 4 },
    lines: [
      { text: "Δ = 0, inconsistent", tone: "head" },
      { text: "λ = 2, μ ≠ 5", tone: "plain" },
      { text: "② and ③ are parallel:", tone: "plain" },
      { text: "no point on all three", tone: "plain" },
      { text: "no solution", tone: "bad" },
    ],
  },
];

// Layout (viewBox units).
const TOP = 56;
const ROW = 106;
const OX = 76;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Oblique projection of a schematic point; the box is −1 to 1 on each axis. */
const proj = (row: number, p: P3) => ({
  x: r2(OX + 30 * p.x + 16 * p.y),
  y: r2(TOP + row * ROW + ROW / 2 - 32 * p.z - 10 * p.y),
});

const poly = (row: number, pts: P3[]) =>
  pts
    .map((p) => proj(row, p))
    .map((q) => `${q.x},${q.y}`)
    .join(" ");

const planeZ = (row: number, c: number) =>
  poly(row, [
    { x: -1, y: -1, z: c },
    { x: 1, y: -1, z: c },
    { x: 1, y: 1, z: c },
    { x: -1, y: 1, z: c },
  ]);
const planeY = (row: number) =>
  poly(row, [
    { x: -1, y: 0, z: -1 },
    { x: 1, y: 0, z: -1 },
    { x: 1, y: 0, z: 1 },
    { x: -1, y: 0, z: 1 },
  ]);
const planeX = (row: number) =>
  poly(row, [
    { x: 0, y: -1, z: -1 },
    { x: 0, y: 1, z: -1 },
    { x: 0, y: 1, z: 1 },
    { x: 0, y: -1, z: 1 },
  ]);

const P1 = "fill-indigo-500/15 stroke-indigo-600 dark:fill-indigo-400/15 dark:stroke-indigo-400";
const P2 = "fill-sky-500/15 stroke-sky-600 dark:fill-sky-400/15 dark:stroke-sky-400";
const P3C = "fill-amber-500/15 stroke-amber-600 dark:fill-amber-400/15 dark:stroke-amber-400";

function Label({ row, p, dx, text, cls }: { row: number; p: P3; dx: number; text: string; cls: string }) {
  const q = proj(row, p);
  return (
    <text x={q.x + dx} y={q.y + 4} textAnchor={dx < 0 ? "end" : "start"} className={`text-[11px] font-semibold ${cls}`}>
      {text}
    </text>
  );
}

const TONE: Record<Panel["lines"][number]["tone"], string> = {
  head: "fill-foreground font-semibold",
  plain: "fill-muted-foreground",
  good: "fill-emerald-700 font-semibold dark:fill-emerald-300",
  bad: "fill-rose-700 font-semibold dark:fill-rose-300",
};

export default function JeeThreePlanes() {
  const lineB = [proj(1, { x: -1, y: 0, z: 0 }), proj(1, { x: 1, y: 0, z: 0 })];
  const O = proj(0, { x: 0, y: 0, z: 0 });
  const C = 0.55;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three planes meeting in a point, in a line, or not at all
      </p>
      <svg
        viewBox="0 0 320 378"
        className="block h-auto w-full"
        role="img"
        aria-label="The system x + y + z = 3, x + 2y + 2z = 5, x + 2y + λz = μ, where Δ = λ − 2. If λ ≠ 2 the three planes meet in one point: a unique solution. If λ = 2 and μ = 5, planes two and three are the same plane and cut plane one in the line x = 1, y + z = 2: infinitely many solutions. If λ = 2 and μ ≠ 5, planes two and three are parallel and no point lies on all three: no solution."
      >
        {/* The system */}
        <g className="text-[11px] tabular-nums">
          <text x={8} y={15} className="fill-indigo-700 font-semibold dark:fill-indigo-300">
            ① x + y + z = 3
          </text>
          <text x={165} y={15} className="fill-sky-700 font-semibold dark:fill-sky-300">
            ② x + 2y + 2z = 5
          </text>
          <text x={8} y={31} className="fill-amber-700 font-semibold dark:fill-amber-300">
            ③ x + 2y + λz = μ
          </text>
          <text x={165} y={31} className="fill-foreground font-semibold">
            Δ = λ − 2
          </text>
          <text x={8} y={47} className="fill-muted-foreground">
            ③ − ② leaves (λ − 2)z = μ − 5
          </text>
        </g>

        {/* Row dividers */}
        {[0, 1, 2].map((row) => (
          <line key={row} x1={4} y1={TOP + row * ROW} x2={316} y2={TOP + row * ROW} className="stroke-border" />
        ))}

        {/* Row 1: one point */}
        <polygon points={planeZ(0, 0)} strokeWidth={1.2} className={P2} />
        <polygon points={planeY(0)} strokeWidth={1.2} className={P1} />
        <polygon points={planeX(0)} strokeWidth={1.2} className={P3C} />
        <circle cx={O.x} cy={O.y} r={4} className="fill-emerald-600 dark:fill-emerald-400" />
        <Label row={0} p={{ x: -1, y: 0, z: 1 }} dx={-4} text="①" cls="fill-indigo-700 dark:fill-indigo-300" />
        <Label row={0} p={{ x: 1, y: 1, z: 0 }} dx={4} text="②" cls="fill-sky-700 dark:fill-sky-300" />
        <Label row={0} p={{ x: 0, y: 1, z: 1 }} dx={4} text="③" cls="fill-amber-700 dark:fill-amber-300" />

        {/* Row 2: ② and ③ are one plane, cut by ① in a line */}
        <polygon points={planeZ(1, 0)} strokeWidth={1.2} className={P2} />
        <polygon points={planeZ(1, 0)} fill="none" strokeWidth={1.2} strokeDasharray="4 3" className="stroke-amber-600 dark:stroke-amber-400" />
        <polygon points={planeY(1)} strokeWidth={1.2} className={P1} />
        <line x1={lineB[0].x} y1={lineB[0].y} x2={lineB[1].x} y2={lineB[1].y} strokeWidth={3} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <Label row={1} p={{ x: -1, y: 0, z: 1 }} dx={-4} text="①" cls="fill-indigo-700 dark:fill-indigo-300" />
        <Label row={1} p={{ x: 1, y: 1, z: 0 }} dx={4} text="② ③" cls="fill-sky-700 dark:fill-sky-300" />

        {/* Row 3: ② and ③ parallel, ① cuts each in a separate line */}
        <polygon points={planeZ(2, -C)} strokeWidth={1.2} className={P3C} />
        <polygon points={planeY(2)} strokeWidth={1.2} className={P1} />
        <polygon points={planeZ(2, C)} strokeWidth={1.2} className={P2} />
        {[C, -C].map((c) => {
          const a = proj(2, { x: -1, y: 0, z: c });
          const b = proj(2, { x: 1, y: 0, z: c });
          return <line key={c} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={1.5} strokeDasharray="3 3" className="stroke-foreground" />;
        })}
        <Label row={2} p={{ x: -1, y: 0, z: 1 }} dx={-4} text="①" cls="fill-indigo-700 dark:fill-indigo-300" />
        <Label row={2} p={{ x: 1, y: 1, z: C }} dx={4} text="②" cls="fill-sky-700 dark:fill-sky-300" />
        <Label row={2} p={{ x: 1, y: 1, z: -C }} dx={4} text="③" cls="fill-amber-700 dark:fill-amber-300" />

        {/* The words for each case */}
        {PANELS.map((panel, row) => {
          const y0 = TOP + row * ROW + ROW / 2 - ((panel.lines.length - 1) * 14) / 2 + 4;
          return (
            <g key={panel.outcome} className="text-[11px]">
              {panel.lines.map((l, k) => (
                <text key={l.text} x={154} y={y0 + k * 14} className={TONE[l.tone]}>
                  {l.text}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each equation is a plane, and a solution is a point on all three. Δ = λ − 2, so λ ≠ 2 gives one point. At λ = 2 the left
        sides of ② and ③ are the same: μ = 5 makes them one plane (a whole line of solutions), any other μ makes them parallel (0·z =
        μ − 5 has no answer). Not to scale.
      </p>
    </div>
  );
}
