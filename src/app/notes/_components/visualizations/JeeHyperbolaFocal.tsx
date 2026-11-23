/**
 * Static figure: focal distances on a hyperbola (concept jcon-hyperbola-focal),
 * drawn with the concept's worked example: x²/16 − y²/9 = 1 and the point with
 * x = 8.
 *
 * a = 4, b = 3, b² = a²(e² − 1) gives e = 5/4 > 1, so the foci are
 * S(ae, 0) = (5, 0) and S′(−5, 0). At x = 8, y² = 9(64/16 − 1) = 27, so
 * P = (8, 3√3). SP = ex − a = 10 − 4 = 6 and S′P = ex + a = 14 (both also
 * √(9 + 27) and √(169 + 27) straight from the distance formula), and
 * S′P − SP = 8 = 2a. The asymptotes y = ±(b/a)x = ±3x/4 are drawn too.
 * Server component. Pinned by tests/notes-jee-visuals-maths.test.ts.
 */

type Pt = { x: number; y: number };

export const HYP = { a: 4, b: 3 } as const;

/** e from b² = a²(e² − 1). */
export const hypE = () => Math.sqrt(1 + HYP.b ** 2 / HYP.a ** 2);

/** Foci S(ae, 0) and S′(−ae, 0). */
export const hypFoci = (): { S: Pt; S2: Pt } => ({ S: { x: HYP.a * hypE(), y: 0 }, S2: { x: -HYP.a * hypE(), y: 0 } });

/** The concept's point: x = 8 on the upper half of the right branch. */
export const HYP_P: Pt = { x: 8, y: Math.sqrt(HYP.b ** 2 * (64 / HYP.a ** 2 - 1)) };

export const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);

/** SP = ex − a and S′P = ex + a on the right branch. */
export const focalByFormula = (x: number) => ({ SP: hypE() * x - HYP.a, S2P: hypE() * x + HYP.a });

// Plot geometry (viewBox units): x from −9 to 9, y from −6.5 to 6.5.
export const PLOT = { left: 16, top: 8, unit: 16, xMin: -9, xMax: 9, yMax: 6.5 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.left + (x - PLOT.xMin) * PLOT.unit);
const py = (y: number) => r2(PLOT.top + (PLOT.yMax - y) * PLOT.unit);

/** One branch as x = ±a cosh u, y = b sinh u, cut where |x| reaches 9. */
export function branchPoints(side: 1 | -1): Pt[] {
  const uMax = Math.acosh(PLOT.xMax / HYP.a);
  const pts: Pt[] = [];
  for (let k = 0; k <= 48; k++) {
    const u = -uMax + (2 * uMax * k) / 48;
    pts.push({ x: side * HYP.a * Math.cosh(u), y: HYP.b * Math.sinh(u) });
  }
  return pts;
}

export default function JeeHyperbolaFocal() {
  const { S, S2 } = hypFoci();
  const P = HYP_P;
  const poly = (side: 1 | -1) =>
    branchPoints(side)
      .map((p) => `${px(p.x)},${py(p.y)}`)
      .join(" ");
  // Asymptotes y = ±3x/4, cut at |y| = 6.5 (|x| = 26/3).
  const xa = (PLOT.yMax * HYP.a) / HYP.b;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the constant difference of the focal distances on a hyperbola
      </p>
      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="The hyperbola x²/16 − y²/9 = 1 with foci S(5, 0) and S′(−5, 0) and asymptotes y = ±3x/4. The point P(8, 3√3) is 6 from S and 14 from S′; the difference 8 is 2a."
      >
        {/* Axes */}
        <line x1={px(PLOT.xMin)} y1={py(0)} x2={px(PLOT.xMax)} y2={py(0)} className="stroke-border" />
        <line x1={px(0)} y1={py(PLOT.yMax)} x2={px(0)} y2={py(-PLOT.yMax)} className="stroke-border" />
        <text x={px(PLOT.xMax)} y={py(0) + 12} textAnchor="end" className="fill-muted-foreground text-[10px]">
          x
        </text>
        <text x={px(0) + 4} y={py(PLOT.yMax) + 9} className="fill-muted-foreground text-[10px]">
          y
        </text>

        {/* Asymptotes */}
        <g className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 3">
          <line x1={px(-xa)} y1={py(-PLOT.yMax)} x2={px(xa)} y2={py(PLOT.yMax)} />
          <line x1={px(-xa)} y1={py(PLOT.yMax)} x2={px(xa)} y2={py(-PLOT.yMax)} />
        </g>
        <text x={56} y={26} className="fill-muted-foreground text-[10px]">
          y = −3x/4
        </text>
        <text x={58} y={196} className="fill-muted-foreground text-[10px]">
          y = 3x/4
        </text>

        {/* The two branches */}
        <polyline points={poly(1)} fill="none" strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <polyline points={poly(-1)} fill="none" strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />

        {/* Focal distances */}
        <line x1={px(S2.x)} y1={py(0)} x2={px(P.x)} y2={py(P.y)} strokeWidth={1.8} className="stroke-rose-600 dark:stroke-rose-400" />
        <line x1={px(S.x)} y1={py(0)} x2={px(P.x)} y2={py(P.y)} strokeWidth={1.8} className="stroke-amber-600 dark:stroke-amber-400" />
        <text x={px((S2.x + P.x) / 2) - 4} y={py(P.y / 2) - 6} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          14
        </text>
        <text x={px((S.x + P.x) / 2) + 7} y={py(P.y / 2) + 4} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          6
        </text>

        {/* Points */}
        <circle cx={px(S.x)} cy={py(0)} r={3} className="fill-foreground" />
        <text x={px(S.x) + 5} y={py(0) + 13} className="fill-foreground text-[10px] font-semibold">
          S(5, 0)
        </text>
        <circle cx={px(S2.x)} cy={py(0)} r={3} className="fill-foreground" />
        <text x={px(S2.x) - 5} y={py(0) + 13} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          S′(−5, 0)
        </text>
        <circle cx={px(P.x)} cy={py(P.y)} r={3.5} className="fill-foreground" />
        <text x={px(P.x) - 4} y={py(P.y) - 7} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          P(8, 3√3)
        </text>

        {/* The working */}
        <g className="text-[11px] tabular-nums">
          <text x={160} y={226} textAnchor="middle" className="fill-foreground font-semibold">
            x²/16 − y²/9 = 1: a = 4, b = 3, e = 5/4 &gt; 1
          </text>
          <text x={160} y={242} textAnchor="middle" className="fill-foreground">
            SP = ex − a = 10 − 4 = 6, S′P = ex + a = 14
          </text>
          <text x={160} y={258} textAnchor="middle" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            S′P − SP = 14 − 6 = 8 = 2a
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Every point of the hyperbola has the same DIFFERENCE of focal distances, 2a = 8; the sum (here 20 = 2ex) changes from point to
        point. The branches close in on the asymptotes y = ±3x/4 but never meet them, and e = 5/4 is more than 1.
      </p>
    </div>
  );
}
