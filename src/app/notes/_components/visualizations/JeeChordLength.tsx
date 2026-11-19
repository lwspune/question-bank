/**
 * Static figure: the length of a chord from its distance to the centre
 * (concept jcon-chord-length), drawn with the concept's worked example: the
 * chord that 3x + 4y = 10 cuts on x² + y² = 25.
 *
 * Centre C(0, 0), radius r = 5. The distance from C to the line is
 * d = |−10|/√(3² + 4²) = 10/5 = 2, and the foot of that perpendicular,
 * N = 10(3, 4)/25 = (6/5, 8/5), is the midpoint of the chord. Half the chord,
 * d and r make a right triangle at N: half chord = √(25 − 4) = √21, so the
 * chord is 2√21 ≈ 9.17. Server component. Pinned by
 * tests/notes-jee-visuals-maths.test.ts.
 */

type Pt = { x: number; y: number };

/** The circle x² + y² = r² and the line ax + by = k. */
export const CHORD_CIRCLE = { cx: 0, cy: 0, r: 5 } as const;
export const CHORD_LINE = { a: 3, b: 4, k: 10 } as const;

/** Perpendicular distance from the centre to the line. */
export function centreDistance(): number {
  const { a, b, k } = CHORD_LINE;
  return Math.abs(a * CHORD_CIRCLE.cx + b * CHORD_CIRCLE.cy - k) / Math.hypot(a, b);
}

/** The chord length 2√(r² − d²). */
export const chordLength = (r: number, d: number) => 2 * Math.sqrt(r * r - d * d);

/** Foot of the perpendicular from the centre: the chord's midpoint. */
export function chordMidpoint(): Pt {
  const { a, b, k } = CHORD_LINE;
  const t = (k - a * CHORD_CIRCLE.cx - b * CHORD_CIRCLE.cy) / (a * a + b * b);
  return { x: CHORD_CIRCLE.cx + t * a, y: CHORD_CIRCLE.cy + t * b };
}

/** The two ends of the chord, where the line meets the circle. */
export function chordEnds(): [Pt, Pt] {
  const { a, b } = CHORD_LINE;
  const m = chordMidpoint();
  const half = chordLength(CHORD_CIRCLE.r, centreDistance()) / 2;
  const ux = -b / Math.hypot(a, b);
  const uy = a / Math.hypot(a, b);
  return [
    { x: m.x - half * ux, y: m.y - half * uy },
    { x: m.x + half * ux, y: m.y + half * uy },
  ];
}

// Plot geometry (viewBox units): x and y from −6 to 6.
export const PLOT = { left: 14, top: 14, unit: 15, min: -6, max: 6 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.left + (x - PLOT.min) * PLOT.unit);
const py = (y: number) => r2(PLOT.top + (PLOT.max - y) * PLOT.unit);

export default function JeeChordLength() {
  const M = chordMidpoint();
  const [A, B] = chordEnds();
  // The line across the plot: x from −4.6 (y ≈ 6) to 6, y = (10 − 3x)/4.
  const lineY = (x: number) => (CHORD_LINE.k - CHORD_LINE.a * x) / CHORD_LINE.b;
  // Right-angle mark at N: toward C, (−3, −4)/5, and along the chord toward A, (4, −3)/5.
  const s = 7;
  const N = { x: px(M.x), y: py(M.y) };
  const toC = { x: -0.6, y: -0.8 };
  const toA = { x: 0.8, y: -0.6 };
  const mark = [
    [N.x + s * toC.x, N.y - s * toC.y],
    [N.x + s * (toC.x + toA.x), N.y - s * (toC.y + toA.y)],
    [N.x + s * toA.x, N.y - s * toA.y],
  ]
    .map(([x, y]) => `${r2(x)},${r2(y)}`)
    .join(" ");

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a chord from its distance to the centre
      </p>
      <svg
        viewBox="0 0 320 210"
        className="block h-auto w-full"
        role="img"
        aria-label="The circle x² + y² = 25 and the line 3x + 4y = 10. The perpendicular from the centre to the line has length d = 2 and bisects the chord; with the radius 5 it makes a right triangle, so half the chord is √21 and the chord is 2√21."
      >
        {/* Axes */}
        <line x1={px(PLOT.min)} y1={py(0)} x2={px(PLOT.max)} y2={py(0)} className="stroke-border" />
        <line x1={px(0)} y1={py(PLOT.min)} x2={px(0)} y2={py(PLOT.max)} className="stroke-border" />
        <text x={px(PLOT.max) - 2} y={py(0) + 11} textAnchor="end" className="fill-muted-foreground text-[10px]">
          x
        </text>

        {/* The circle */}
        <circle cx={px(0)} cy={py(0)} r={CHORD_CIRCLE.r * PLOT.unit} fill="none" strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />

        {/* The line, with the chord drawn heavy */}
        <line x1={px(-4.6)} y1={py(lineY(-4.6))} x2={px(6)} y2={py(lineY(6))} strokeWidth={1} className="stroke-muted-foreground" />
        <line x1={px(A.x)} y1={py(A.y)} x2={px(B.x)} y2={py(B.y)} strokeWidth={3} className="stroke-rose-600 dark:stroke-rose-400" />
        <text x={52} y={17} className="fill-muted-foreground text-[10px]">
          3x + 4y = 10
        </text>

        {/* The right triangle C, N, A */}
        <line x1={px(0)} y1={py(0)} x2={px(M.x)} y2={py(M.y)} strokeWidth={2} className="stroke-amber-600 dark:stroke-amber-400" />
        <line x1={px(0)} y1={py(0)} x2={px(B.x)} y2={py(B.y)} strokeWidth={1.5} strokeDasharray="4 3" className="stroke-indigo-600 dark:stroke-indigo-400" />
        <polyline points={mark} fill="none" strokeWidth={1} className="stroke-foreground" />
        <text x={px(M.x / 2) + 5} y={py(M.y / 2) + 6} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          d
        </text>
        <text x={px(B.x / 2) - 4} y={py(B.y / 2) + 13} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          r = 5
        </text>
        <text x={px((M.x + B.x) / 2) + 6} y={py((M.y + B.y) / 2) - 8} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          √21
        </text>

        {/* Points */}
        <circle cx={px(0)} cy={py(0)} r={3} className="fill-foreground" />
        <text x={px(0) - 4} y={py(0) + 12} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          C
        </text>
        <circle cx={px(M.x)} cy={py(M.y)} r={3} className="fill-foreground" />
        <text x={px(M.x) + 6} y={py(M.y) - 4} className="fill-foreground text-[10px] font-semibold">
          N
        </text>
        <circle cx={px(A.x)} cy={py(A.y)} r={3} className="fill-rose-600 dark:fill-rose-400" />
        <circle cx={px(B.x)} cy={py(B.y)} r={3} className="fill-rose-600 dark:fill-rose-400" />

        {/* The working */}
        <g className="text-[11px] tabular-nums">
          <text x={204} y={28} className="fill-foreground font-semibold">
            x² + y² = 25
          </text>
          <text x={204} y={44} className="fill-muted-foreground">
            C(0, 0), r = 5
          </text>
          <text x={204} y={70} className="fill-amber-700 font-semibold dark:fill-amber-300">
            d = 10/5 = 2
          </text>
          <text x={204} y={96} className="fill-foreground">
            half chord
          </text>
          <text x={204} y={112} className="fill-rose-700 font-semibold dark:fill-rose-300">
            = √(25 − 4) = √21
          </text>
          <text x={204} y={138} className="fill-foreground">
            chord = 2√(r² − d²)
          </text>
          <text x={204} y={156} className="fill-rose-700 font-semibold dark:fill-rose-300">
            = 2√21 ≈ 9.17
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The perpendicular CN from the centre bisects the chord, so half the chord, d and the radius form a right triangle at N. Measure d
        from the centre, which here is the origin; for a circle centred elsewhere, use (−g, −f).
      </p>
    </div>
  );
}
