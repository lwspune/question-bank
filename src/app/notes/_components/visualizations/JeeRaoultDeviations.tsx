/**
 * Static figure: total vapour pressure against mole fraction for an ideal
 * mixture and for the two deviations from Raoult's law (concept
 * jcsol-deviations).
 *
 * The three curves share the same pure liquids (B alone at the left, A alone
 * at the right), so only the A–B attraction differs:
 * - Ideal (benzene + toluene): the straight Raoult line.
 * - Positive deviation (ethanol + water): A–B weaker, the curve bulges ABOVE
 *   the line and passes through a maximum: highest vapour pressure, so a
 *   MINIMUM-boiling azeotrope.
 * - Negative deviation (chloroform + acetone): A–B stronger, the curve sags
 *   BELOW the line through a minimum: a MAXIMUM-boiling azeotrope.
 *
 * Pressures are in arbitrary units (shape only): p = pB° + (pA° − pB°)xA + w xA(1 − xA).
 * Server component, pure SVG. Pinned by tests/notes-jee-visuals-chem.test.ts.
 */

/** Pure vapour pressures (arbitrary units): B alone at xA = 0, A alone at xA = 1. */
export const PURE = { B: 60, A: 100 } as const;

/** Size of the deviation term w xA(1 − xA) for each kind of mixture. */
export const DEVIATION_W = { ideal: 0, positive: 100, negative: -100 } as const;

export type MixKind = keyof typeof DEVIATION_W;

export function totalPressure(xA: number, kind: MixKind): number {
  return PURE.B + (PURE.A - PURE.B) * xA + DEVIATION_W[kind] * xA * (1 - xA);
}

/** Where dp/dxA = 0: xA = (pA° − pB° + w)/(2w). Null for the ideal line. */
export function azeotropeX(kind: MixKind): number | null {
  const w = DEVIATION_W[kind];
  if (w === 0) return null;
  return (PURE.A - PURE.B + w) / (2 * w);
}

export const MIXTURES = {
  ideal: "benzene + toluene",
  positive: "ethanol + water",
  negative: "chloroform + acetone",
} as const;

// Geometry (viewBox units).
export const PLOT = { x0: 44, x1: 296, y0: 176, y1: 30 } as const;
export const P_AXIS = { min: 40, max: 115 } as const;

const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.x0 + x * (PLOT.x1 - PLOT.x0));
const py = (p: number) => r2(PLOT.y0 - ((p - P_AXIS.min) / (P_AXIS.max - P_AXIS.min)) * (PLOT.y0 - PLOT.y1));

export function curve(kind: MixKind, samples = 60): { x: number; p: number }[] {
  return Array.from({ length: samples + 1 }, (_, i) => {
    const x = i / samples;
    return { x, p: totalPressure(x, kind) };
  });
}

const STYLE = {
  ideal: { stroke: "stroke-muted-foreground", fill: "fill-muted-foreground", dash: "5 4" },
  positive: { stroke: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-700 dark:fill-rose-300", dash: undefined },
  negative: { stroke: "stroke-sky-600 dark:stroke-sky-400", fill: "fill-sky-700 dark:fill-sky-300", dash: undefined },
} as const;

export default function JeeRaoultDeviations() {
  const xPos = azeotropeX("positive") ?? 0;
  const xNeg = azeotropeX("negative") ?? 0;
  const pPos = totalPressure(xPos, "positive");
  const pNeg = totalPressure(xNeg, "negative");

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · positive and negative deviations from Raoult&apos;s law
      </p>

      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="Total vapour pressure against mole fraction of A, from pure B on the left to pure A on the right. The ideal mixture, benzene and toluene, is a straight line. Positive deviation, ethanol and water, bulges above the line to a maximum: the minimum-boiling azeotrope. Negative deviation, chloroform and acetone, sags below the line to a minimum: the maximum-boiling azeotrope."
      >
        {/* Axes */}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y0} className="stroke-muted-foreground" />
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1 - 8} className="stroke-muted-foreground" />
        <line x1={PLOT.x1} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y1 - 8} className="stroke-border" />
        <text x={4} y={PLOT.y1 - 14} className="fill-muted-foreground text-[10px]">
          total vapour pressure
        </text>
        {[0, 0.5, 1].map((x) => (
          <text key={x} x={px(x)} y={PLOT.y0 + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {x}
          </text>
        ))}
        <text x={px(0)} y={PLOT.y0 + 24} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          pure B
        </text>
        <text x={px(1)} y={PLOT.y0 + 24} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          pure A
        </text>
        <text x={px(0.5)} y={PLOT.y0 + 24} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          mole fraction of A, x
          <tspan dy={3} className="text-[8px]">
            A
          </tspan>
        </text>

        {/* Curves */}
        {(["ideal", "positive", "negative"] as const).map((k) => (
          <polyline
            key={k}
            points={curve(k)
              .map((p) => `${px(p.x)},${py(p.p)}`)
              .join(" ")}
            fill="none"
            strokeWidth={k === "ideal" ? 1.8 : 2.5}
            strokeDasharray={STYLE[k].dash}
            strokeLinejoin="round"
            className={STYLE[k].stroke}
          />
        ))}
        {/* Pure-liquid points, shared by all three */}
        <circle cx={px(0)} cy={py(PURE.B)} r={3} className="fill-foreground" />
        <circle cx={px(1)} cy={py(PURE.A)} r={3} className="fill-foreground" />

        {/* Azeotropes */}
        <circle cx={px(xPos)} cy={py(pPos)} r={4} className="fill-rose-600 dark:fill-rose-400" />
        <text x={px(xPos) - 40} y={py(pPos) - 9} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          highest p: minimum-boiling azeotrope
        </text>
        <circle cx={px(xNeg)} cy={py(pNeg)} r={4} className="fill-sky-600 dark:fill-sky-400" />
        <text x={px(xNeg) - 60} y={py(pNeg) + 16} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          lowest p: maximum-boiling azeotrope
        </text>

        {/* Curve names on the plot */}
        <text x={px(0.3)} y={py(totalPressure(0.3, "positive")) - 8} textAnchor="end" className={`${STYLE.positive.fill} text-[10px] font-semibold`}>
          positive
        </text>
        <text x={px(0.62)} y={py(totalPressure(0.62, "ideal")) + 13} className={`${STYLE.ideal.fill} text-[10px] font-semibold`}>
          ideal
        </text>
        <text x={px(0.7)} y={py(totalPressure(0.7, "negative")) + 14} className={`${STYLE.negative.fill} text-[10px] font-semibold`}>
          negative
        </text>

        {/* Key with the concept's example pairs */}
        {(
          [
            { k: "ideal", name: "Ideal", why: "A–B as strong as A–A, B–B" },
            { k: "positive", name: "Positive", why: "A–B weaker" },
            { k: "negative", name: "Negative", why: "A–B stronger" },
          ] as const
        ).map((row, i) => {
          const y = 222 + i * 14;
          return (
            <g key={row.k}>
              <line x1={8} y1={y - 3.5} x2={26} y2={y - 3.5} strokeWidth={2.5} strokeDasharray={STYLE[row.k].dash} className={STYLE[row.k].stroke} />
              <text x={32} y={y} className="fill-foreground text-[10px]">
                <tspan className="font-semibold">{row.name}:</tspan> {MIXTURES[row.k]} ({row.why})
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-sm text-foreground">
        Weaker A–B attractions let molecules escape more easily, so the vapour pressure rises above the Raoult line and the mixture
        boils lower. A new hydrogen bond between the liquids, as in chloroform + acetone, holds them tighter: lower vapour pressure,
        higher boiling point.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        At an azeotrope the vapour has the same composition as the liquid, so fractional distillation cannot separate it. Pressures
        are not to any real scale.
      </p>
    </div>
  );
}
