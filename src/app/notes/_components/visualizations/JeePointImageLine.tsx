/**
 * Static figure: the image of a point in a line (concept jsl-image), drawn
 * with the concept's worked example: the image of P(4, 1) in 2x + y = 4.
 *
 * 2(4) + 1 − 4 = 5, so the ratio is −2·5/(2² + 1²) = −2 and the image is
 * (4 − 2·2, 1 − 2·1) = (0, −1). With 1 in place of 2 the ratio is −1 and the
 * foot of the perpendicular is (4 − 2, 1 − 1) = (2, 0), the midpoint of P and
 * its image, on the line. PM = MP′ = √5, the distance |5|/√5 from P to the
 * line. Server component. Pinned by tests/notes-jee-visuals-maths.test.ts.
 */

type Pt = { x: number; y: number };

/** The mirror ax + by + c = 0: here 2x + y − 4 = 0. */
export const MIRROR = { a: 2, b: 1, c: -4 } as const;

/** The concept's point. */
export const POINT: Pt = { x: 4, y: 1 };

/**
 * The point (x, y) = (x₁ + ta, y₁ + tb) with t = −k(ax₁ + by₁ + c)/(a² + b²):
 * k = 1 gives the foot of the perpendicular, k = 2 the image.
 */
export function alongNormal(p: Pt, line: { a: number; b: number; c: number }, k: number): Pt {
  const t = (-k * (line.a * p.x + line.b * p.y + line.c)) / (line.a ** 2 + line.b ** 2);
  return { x: p.x + t * line.a, y: p.y + t * line.b };
}

export const footOf = (p: Pt, line: { a: number; b: number; c: number }) => alongNormal(p, line, 1);
export const imageOf = (p: Pt, line: { a: number; b: number; c: number }) => alongNormal(p, line, 2);

export const FOOT = footOf(POINT, MIRROR);
export const IMAGE = imageOf(POINT, MIRROR);

// Plot geometry (viewBox units): x from −1 to 5, y from −2 to 5.
export const PLOT = { left: 18, top: 16, unit: 24, xMin: -1, xMax: 5, yMin: -2, yMax: 5 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.left + (x - PLOT.xMin) * PLOT.unit);
const py = (y: number) => r2(PLOT.top + (PLOT.yMax - y) * PLOT.unit);

export default function JeePointImageLine() {
  // The mirror y = 4 − 2x, from y = 5 (x = −0.5) to y = −2 (x = 3).
  const lineEnds = { x1: px(-0.5), y1: py(5), x2: px(3), y2: py(-2) };
  // Right-angle mark at the foot: along the line (−1, 2)/√5 and along the normal (2, 1)/√5.
  const s = 8;
  const u = { x: -1 / Math.sqrt(5), y: 2 / Math.sqrt(5) };
  const n = { x: 2 / Math.sqrt(5), y: 1 / Math.sqrt(5) };
  const F = { x: px(FOOT.x), y: py(FOOT.y) };
  const mark = [
    [F.x + s * u.x, F.y - s * u.y],
    [F.x + s * (u.x + n.x), F.y - s * (u.y + n.y)],
    [F.x + s * n.x, F.y - s * n.y],
  ]
    .map(([x, y]) => `${r2(x)},${r2(y)}`)
    .join(" ");

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the image of a point in a line
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label="The line 2x + y = 4, the point P(4, 1), the foot of the perpendicular (2, 0) and the image P′(0, −1). The foot is the midpoint of P and P′, each √5 from the line."
      >
        {/* Grid */}
        {Array.from({ length: PLOT.xMax - PLOT.xMin + 1 }, (_, k) => PLOT.xMin + k).map((x) => (
          <line key={`v${x}`} x1={px(x)} y1={py(PLOT.yMin)} x2={px(x)} y2={py(PLOT.yMax)} className="stroke-border" strokeWidth={0.5} />
        ))}
        {Array.from({ length: PLOT.yMax - PLOT.yMin + 1 }, (_, k) => PLOT.yMin + k).map((y) => (
          <line key={`h${y}`} x1={px(PLOT.xMin)} y1={py(y)} x2={px(PLOT.xMax)} y2={py(y)} className="stroke-border" strokeWidth={0.5} />
        ))}
        <line x1={px(PLOT.xMin)} y1={py(0)} x2={px(PLOT.xMax)} y2={py(0)} className="stroke-muted-foreground" />
        <line x1={px(0)} y1={py(PLOT.yMin)} x2={px(0)} y2={py(PLOT.yMax)} className="stroke-muted-foreground" />
        {[1, 2, 3].map((t) => (
          <text key={`y${t}`} x={px(0) - 3} y={py(t) + 3} textAnchor="end" className="fill-muted-foreground text-[8px] tabular-nums">
            {t}
          </text>
        ))}
        <text x={px(PLOT.xMax) - 2} y={py(0) - 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          x
        </text>
        <text x={px(0) + 4} y={py(PLOT.yMax) + 10} className="fill-muted-foreground text-[10px]">
          y
        </text>

        {/* The mirror line */}
        <line {...lineEnds} strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={px(0.6)} y={py(4)} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          2x + y = 4
        </text>

        {/* P to its image, along the normal */}
        <line x1={px(POINT.x)} y1={py(POINT.y)} x2={px(IMAGE.x)} y2={py(IMAGE.y)} strokeWidth={1.8} strokeDasharray="5 3" className="stroke-amber-600 dark:stroke-amber-400" />
        <polyline points={mark} fill="none" strokeWidth={1} className="stroke-foreground" />

        {/* Equal halves */}
        <text x={px(3) - 2} y={py(0.5) - 5} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          √5
        </text>
        <text x={px(1) - 4} y={py(-0.5) - 5} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          √5
        </text>

        {/* Points */}
        <circle cx={px(POINT.x)} cy={py(POINT.y)} r={3.5} className="fill-foreground" />
        <text x={px(POINT.x)} y={py(POINT.y) - 8} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          P(4, 1)
        </text>
        <circle cx={px(FOOT.x)} cy={py(FOOT.y)} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={px(2.6)} y={py(-0.75)} className="fill-indigo-700 text-[10px] font-semibold tabular-nums dark:fill-indigo-300">
          foot (2, 0)
        </text>
        <circle cx={px(IMAGE.x)} cy={py(IMAGE.y)} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        <text x={px(IMAGE.x) + 7} y={py(IMAGE.y) + 13} className="fill-rose-700 text-[11px] font-semibold tabular-nums dark:fill-rose-300">
          P′(0, −1)
        </text>

        {/* The working */}
        <g className="text-[10px] tabular-nums">
          <text x={176} y={28} className="fill-foreground font-semibold">
            Image of P(4, 1)
          </text>
          <text x={176} y={42} className="fill-foreground font-semibold">
            in 2x + y = 4
          </text>
          <text x={176} y={62} className="fill-foreground">
            2(4) + 1 − 4 = 5
          </text>
          <text x={176} y={82} className="fill-muted-foreground">
            foot: ratio −5/5 = −1
          </text>
          <text x={176} y={96} className="fill-indigo-700 font-semibold dark:fill-indigo-300">
            (4 − 2, 1 − 1) = (2, 0)
          </text>
          <text x={176} y={116} className="fill-muted-foreground">
            image: ratio −10/5 = −2
          </text>
          <text x={176} y={130} className="fill-rose-700 font-semibold dark:fill-rose-300">
            (4 − 4, 1 − 2) = (0, −1)
          </text>
          <text x={176} y={152} className="fill-foreground">
            midpoint (2, 0) is
          </text>
          <text x={176} y={166} className="fill-foreground">
            on the line
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        P moves along the normal (2, 1) of the line. The ratio with 1 stops at the foot of the perpendicular; with 2 it goes as far again
        behind the line, to the image. The line is the perpendicular bisector of PP′, so P and P′ are both √5 from it.
      </p>
    </div>
  );
}
