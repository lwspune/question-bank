/**
 * Static figure: the relative position of two circles and their number of
 * common tangents (concept jcon-two-circle-position). The radii are the
 * worked example's, r₁ = 2 and r₂ = 3, so r₁ + r₂ = 5 and |r₁ − r₂| = 1, and
 * the distance d = C₁C₂ between the centres takes one value per case:
 * 7 (separate, 4 tangents), 5 (touch externally, 3: the worked example),
 * 3 (meet at two points, 2), 1 (touch internally, 1), 0.5 (one inside the
 * other, 0).
 *
 * The tangents are computed, not drawn by hand: with C₁ at the origin and C₂
 * at (d, 0), a common tangent n·P = −r₁ (n a unit normal) also touches the
 * second circle when n·C₂ + r₁ = ±r₂, so nₓ = (±r₂ − r₁)/d; each sign gives
 * two lines when |nₓ| < 1, one when |nₓ| = 1 and none when |nₓ| > 1.
 * Server component. Pinned by tests/notes-jee-visuals-maths.test.ts.
 */

export const R1 = 2;
export const R2 = 3;

export type CirclesCase = "separate" | "touch externally" | "two points" | "touch internally" | "one inside";

/** The five cases, top to bottom. */
export const CASES = [
  { d: 7, kind: "separate", rule: "d > r₁ + r₂", tangents: 4 },
  { d: 5, kind: "touch externally", rule: "d = r₁ + r₂", tangents: 3 },
  { d: 3, kind: "two points", rule: "|r₁ − r₂| < d < r₁ + r₂", tangents: 2 },
  { d: 1, kind: "touch internally", rule: "d = |r₁ − r₂|", tangents: 1 },
  { d: 0.5, kind: "one inside", rule: "d < |r₁ − r₂|", tangents: 0 },
] as const;

const EPS = 1e-9;

/** The case from d against r₁ + r₂ and |r₁ − r₂|. */
export function classify(r1: number, r2: number, d: number): CirclesCase {
  const sum = r1 + r2;
  const diff = Math.abs(r1 - r2);
  if (d > sum + EPS) return "separate";
  if (Math.abs(d - sum) <= EPS) return "touch externally";
  if (d > diff + EPS) return "two points";
  if (Math.abs(d - diff) <= EPS) return "touch internally";
  return "one inside";
}

export type Tangent = { nx: number; ny: number; kind: "direct" | "transverse" };

/**
 * Common tangents of the circles centred (0, 0), radius r₁, and (d, 0),
 * radius r₂, each as the line nₓx + nᵧy = −r₁ with (nₓ, nᵧ) a unit vector.
 * "direct" tangents keep both circles on one side, "transverse" ones pass
 * between them.
 */
export function commonTangents(r1: number, r2: number, d: number): Tangent[] {
  const out: Tangent[] = [];
  if (d <= EPS) return out;
  for (const [sign, kind] of [
    [1, "direct"],
    [-1, "transverse"],
  ] as const) {
    const nx = (sign * r2 - r1) / d;
    if (Math.abs(nx) > 1 + EPS) continue;
    if (Math.abs(Math.abs(nx) - 1) <= EPS) {
      out.push({ nx: Math.sign(nx), ny: 0, kind });
      continue;
    }
    const ny = Math.sqrt(1 - nx * nx);
    out.push({ nx, ny, kind }, { nx, ny: -ny, kind });
  }
  return out;
}

// Geometry (viewBox units). Each row is a strip 64 high; circle 1 is centred
// at x = 34 in every row, and circle 2 sits d units to its right.
const UNIT = 9;
const ROW_H = 64;
const TOP = 20;
const C1X = 34;
const BOX = { left: 4, right: 176 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;

export default function JeeTwoCircles() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two circles and their common tangents
      </p>
      <svg
        viewBox={`0 0 320 ${TOP + CASES.length * ROW_H + 4}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Two circles of radii 2 and 3 with the distance between centres d equal to 7, 5, 3, 1 and 0.5: separate with 4 common tangents, touching externally with 3, meeting at two points with 2, touching internally with 1, and one inside the other with none."
      >
        <defs>
          {CASES.map((c, i) => (
            <clipPath key={c.d} id={`jee-two-circles-row-${i}`}>
              <rect x={BOX.left} y={TOP + i * ROW_H + 2} width={BOX.right - BOX.left} height={ROW_H - 4} />
            </clipPath>
          ))}
        </defs>
        <text x={4} y={12} className="fill-muted-foreground text-[10px]">
          r₁ = 2, r₂ = 3: r₁ + r₂ = 5, |r₁ − r₂| = 1
        </text>

        {CASES.map((c, i) => {
          const cy = TOP + i * ROW_H + ROW_H / 2;
          const x1 = C1X;
          const x2 = C1X + c.d * UNIT;
          const tangents = commonTangents(R1, R2, c.d);
          return (
            <g key={c.d}>
              {i > 0 && <line x1={0} y1={TOP + i * ROW_H} x2={320} y2={TOP + i * ROW_H} className="stroke-border" strokeWidth={0.5} />}
              <g clipPath={`url(#jee-two-circles-row-${i})`}>
                {/* Common tangents */}
                {tangents.map((t, k) => {
                  // Touch points: −r₁n on circle 1, C₂ − (±r₂)n on circle 2.
                  const s2 = t.kind === "direct" ? 1 : -1;
                  const p1 = { x: -R1 * t.nx, y: -R1 * t.ny };
                  const p2 = { x: c.d - s2 * R2 * t.nx, y: -s2 * R2 * t.ny };
                  const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
                  const dir = { x: -t.ny, y: t.nx };
                  const L = 14;
                  return (
                    <line
                      key={k}
                      x1={r2(x1 + (mid.x - L * dir.x) * UNIT)}
                      y1={r2(cy - (mid.y - L * dir.y) * UNIT)}
                      x2={r2(x1 + (mid.x + L * dir.x) * UNIT)}
                      y2={r2(cy - (mid.y + L * dir.y) * UNIT)}
                      strokeWidth={1}
                      className="stroke-emerald-600 dark:stroke-emerald-400"
                    />
                  );
                })}
                <circle cx={x1} cy={cy} r={R1 * UNIT} fill="none" strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />
                <circle cx={r2(x2)} cy={cy} r={R2 * UNIT} fill="none" strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
                <line x1={x1} y1={cy} x2={r2(x2)} y2={cy} strokeWidth={0.8} strokeDasharray="2 2" className="stroke-muted-foreground" />
                <circle cx={x1} cy={cy} r={1.8} className="fill-indigo-600 dark:fill-indigo-400" />
                <circle cx={r2(x2)} cy={cy} r={1.8} className="fill-rose-600 dark:fill-rose-400" />
              </g>
              {/* The reading */}
              <g className="tabular-nums">
                <text x={186} y={cy - 12} className="fill-foreground text-[11px] font-semibold">
                  d = {c.d}: {c.tangents} {c.tangents === 1 ? "tangent" : "tangents"}
                </text>
                <text x={186} y={cy + 3} className="fill-muted-foreground text-[10px]">
                  {c.kind}
                </text>
                <text x={186} y={cy + 17} className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
                  {c.rule}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The smaller circle has radius r₁ = 2, the larger r₂ = 3, and d is the distance between their centres. As d shrinks, the two
        tangents that pass between the circles merge into one (d = 5) and vanish; then the two outer ones merge (d = 1) and vanish. Two
        meeting points needs both |r₁ − r₂| &lt; d and d &lt; r₁ + r₂.
      </p>
    </div>
  );
}
