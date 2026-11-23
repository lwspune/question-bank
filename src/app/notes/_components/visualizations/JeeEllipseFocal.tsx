/**
 * Static figure: focal distances on an ellipse (concept jcon-ellipse-focal,
 * notation from jcon-ellipse-parameters), drawn with the concept's worked
 * example: x²/25 + y²/16 = 1 and the point with x = 3.
 *
 * a = 5, b = 4, b² = a²(1 − e²) gives e = 3/5, so the foci are
 * S(ae, 0) = (3, 0) and S′(−3, 0), and the directrices x = ±a/e = ±25/3.
 * At x = 3, y = 4√(1 − 9/25) = 16/5, so P = (3, 16/5) (it sits right above S,
 * on the latus rectum). SP = a − ex = 5 − 9/5 = 16/5 and
 * S′P = a + ex = 34/5 (√(36 + 256/25) = 34/5 directly), and
 * SP + S′P = 10 = 2a. The directrix property: PM = 25/3 − 3 = 16/3 to
 * x = 25/3, and e·PM = (3/5)(16/3) = 16/5 = SP. Server component. Pinned by
 * tests/notes-jee-visuals-maths.test.ts.
 */

type Pt = { x: number; y: number };

export const ELL = { a: 5, b: 4 } as const;

/** e from b² = a²(1 − e²). */
export const ellE = () => Math.sqrt(1 - ELL.b ** 2 / ELL.a ** 2);

/** Foci S(ae, 0), S′(−ae, 0) and the directrix x = a/e. */
export const ellFoci = (): { S: Pt; S2: Pt } => ({ S: { x: ELL.a * ellE(), y: 0 }, S2: { x: -ELL.a * ellE(), y: 0 } });
export const ellDirectrix = () => ELL.a / ellE();

/** The concept's point: x = 3 on the upper half. */
export const ELL_P: Pt = { x: 3, y: ELL.b * Math.sqrt(1 - 9 / ELL.a ** 2) };

export const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);

/** SP = a − ex and S′P = a + ex. */
export const ellFocalByFormula = (x: number) => ({ SP: ELL.a - ellE() * x, S2P: ELL.a + ellE() * x });

// Plot geometry (viewBox units): x from −9 to 9, y from −5 to 5.
export const PLOT = { left: 16, top: 10, unit: 16, xMin: -9, yMax: 5 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.left + (x - PLOT.xMin) * PLOT.unit);
const py = (y: number) => r2(PLOT.top + (PLOT.yMax - y) * PLOT.unit);

export default function JeeEllipseFocal() {
  const { S, S2 } = ellFoci();
  const P = ELL_P;
  const dx = ellDirectrix();

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the constant sum of the focal distances on an ellipse
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="The ellipse x²/25 + y²/16 = 1 with foci S(3, 0) and S′(−3, 0) and directrices x = ±25/3. The point P(3, 16/5) is 16/5 from S and 34/5 from S′; the sum 10 is 2a. P is 16/3 from the directrix x = 25/3, and 3/5 of 16/3 is 16/5."
      >
        {/* Axes */}
        <line x1={px(-9)} y1={py(0)} x2={px(9)} y2={py(0)} className="stroke-border" />
        <line x1={px(0)} y1={py(5)} x2={px(0)} y2={py(-5)} className="stroke-border" />
        <text x={px(0) + 4} y={py(5) + 9} className="fill-muted-foreground text-[10px]">
          y
        </text>

        {/* Directrices */}
        <g className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 3">
          <line x1={px(dx)} y1={py(5)} x2={px(dx)} y2={py(-5)} />
          <line x1={px(-dx)} y1={py(5)} x2={px(-dx)} y2={py(-5)} />
        </g>
        <text x={px(dx) - 3} y={py(-5) - 3} textAnchor="end" className="fill-muted-foreground text-[10px]">
          x = 25/3
        </text>
        <text x={px(-dx) + 3} y={py(-5) - 3} className="fill-muted-foreground text-[10px]">
          x = −25/3
        </text>

        {/* The ellipse */}
        <ellipse cx={px(0)} cy={py(0)} rx={ELL.a * PLOT.unit} ry={ELL.b * PLOT.unit} fill="none" strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={px(5) + 3} y={py(0) - 4} className="fill-muted-foreground text-[9px] tabular-nums">
          5
        </text>
        <text x={px(-5) - 3} y={py(0) - 4} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
          −5
        </text>

        {/* Focal distances and PM */}
        <line x1={px(S2.x)} y1={py(0)} x2={px(P.x)} y2={py(P.y)} strokeWidth={1.8} className="stroke-rose-600 dark:stroke-rose-400" />
        <line x1={px(S.x)} y1={py(0)} x2={px(P.x)} y2={py(P.y)} strokeWidth={1.8} className="stroke-amber-600 dark:stroke-amber-400" />
        <line x1={px(P.x)} y1={py(P.y)} x2={px(dx)} y2={py(P.y)} strokeWidth={1.2} strokeDasharray="2 2" className="stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={px(0) - 6} y={py(1.6) - 8} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          34/5
        </text>
        <text x={px(S.x) + 4} y={py(1.1)} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          16/5
        </text>
        <text x={px(6.6)} y={py(P.y) + 12} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          PM = 16/3
        </text>

        {/* Points */}
        <circle cx={px(S.x)} cy={py(0)} r={3} className="fill-foreground" />
        <text x={px(S.x)} y={py(0) + 13} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          S(3, 0)
        </text>
        <circle cx={px(S2.x)} cy={py(0)} r={3} className="fill-foreground" />
        <text x={px(S2.x)} y={py(0) + 13} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          S′(−3, 0)
        </text>
        <circle cx={px(P.x)} cy={py(P.y)} r={3.5} className="fill-foreground" />
        <text x={px(P.x) + 4} y={py(P.y) - 8} className="fill-foreground text-[10px] font-semibold">
          P(3, 16/5)
        </text>
        <circle cx={px(dx)} cy={py(P.y)} r={2.5} className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={px(dx) + 4} y={py(P.y) + 4} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          M
        </text>

        {/* The working */}
        <g className="text-[11px] tabular-nums">
          <text x={160} y={186} textAnchor="middle" className="fill-foreground font-semibold">
            x²/25 + y²/16 = 1: a = 5, b = 4, e = 3/5
          </text>
          <text x={160} y={202} textAnchor="middle" className="fill-foreground">
            SP = a − ex = 5 − 9/5 = 16/5, S′P = a + ex = 34/5
          </text>
          <text x={160} y={218} textAnchor="middle" className="fill-rose-700 font-semibold dark:fill-rose-300">
            SP + S′P = 16/5 + 34/5 = 10 = 2a
          </text>
          <text x={160} y={232} textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300">
            SP = e·PM = (3/5)(16/3) = 16/5
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Any point of the ellipse has focal distances adding to 2a = 10. SP = a − ex uses the focus S(ae, 0) on the same side as P; the
        far focus S′ gives a + ex. Each focal distance is e times the distance to its own directrix.
      </p>
    </div>
  );
}
