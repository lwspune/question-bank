"use client";

/**
 * Animation: the corner-point method (concept cetlpp-corner-point-theorem),
 * drawn with the concept's worked example: maximise Z = 2x + 3y subject to
 * x + y ≤ 6, x ≤ 4, y ≤ 5, x, y ≥ 0.
 *
 * The feasible region is the pentagon (0, 0), (4, 0), (4, 2), (1, 5), (0, 5).
 * The steps visit the corners in that order, evaluating Z = 0, 8, 14, 17, 15;
 * the last step marks the maximum, 17 at (1, 5), and draws the line
 * 2x + 3y = 17, which touches the region only at that corner (the concept's
 * "sliding line" intuition). One ring moves corner to corner by
 * style.transform. Pinned by tests/notes-cet-visuals-maths.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** Z = zx·x + zy·y. */
export const LPP_OBJECTIVE = { zx: 2, zy: 3 } as const;

/** The constraints as a·x + b·y ≤ c (x, y ≥ 0 as well). */
export const LPP_CONSTRAINTS = [
  { a: 1, b: 1, c: 6, label: "x + y = 6" },
  { a: 1, b: 0, c: 4, label: "x = 4" },
  { a: 0, b: 1, c: 5, label: "y = 5" },
] as const;

/** The corners, in the order the steps visit them. */
export const LPP_CORNERS = [
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 4, y: 2 },
  { x: 1, y: 5 },
  { x: 0, y: 5 },
] as const;

export function zAt(x: number, y: number): number {
  return LPP_OBJECTIVE.zx * x + LPP_OBJECTIVE.zy * y;
}

/** True when (x, y) satisfies every constraint (with a small tolerance). */
export function isFeasible(x: number, y: number): boolean {
  const eps = 1e-9;
  return x >= -eps && y >= -eps && LPP_CONSTRAINTS.every((k) => k.a * x + k.b * y <= k.c + eps);
}

/** The corner with the largest Z. */
export function bestCorner(): { x: number; y: number; z: number } {
  return LPP_CORNERS.map((p) => ({ ...p, z: zAt(p.x, p.y) })).reduce((m, p) => (p.z > m.z ? p : m));
}

export const LPP_STEPS: readonly FigureStep[] = [
  {
    title: "Draw the constraints and shade the region",
    caption:
      "Draw x + y = 6, x = 4 and y = 5 in the first quadrant and keep the side of each that holds. The region left is a pentagon with five corners.",
  },
  { title: "Corner (0, 0)", caption: "Z = 2(0) + 3(0) = 0." },
  { title: "Corner (4, 0)", caption: "Z = 2(4) + 3(0) = 8." },
  { title: "Corner (4, 2)", caption: "x = 4 meets x + y = 6 at (4, 2): Z = 2(4) + 3(2) = 14." },
  { title: "Corner (1, 5)", caption: "y = 5 meets x + y = 6 at (1, 5): Z = 2(1) + 3(5) = 17." },
  { title: "Corner (0, 5)", caption: "Z = 2(0) + 3(5) = 15." },
  {
    title: "Read the largest",
    caption:
      "Every corner is now checked: 0, 8, 14, 17, 15. The maximum is 17, at (1, 5). The line 2x + 3y = 17 touches the region only at that corner.",
  },
];

// Plot geometry (viewBox units): x and y from 0 to 7.
export const PLOT = { x0: 40, y0: 204, unit: 22, max: 7 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (x: number) => r2(PLOT.x0 + x * PLOT.unit);
export const py = (y: number) => r2(PLOT.y0 - y * PLOT.unit);

/** The corner the ring sits on at a step (step 0: hidden; the last step: the maximum). */
export function ringAt(step: number): { x: number; y: number; opacity: number } {
  if (step === 0) return { x: LPP_CORNERS[0].x, y: LPP_CORNERS[0].y, opacity: 0 };
  if (step > LPP_CORNERS.length) {
    const b = bestCorner();
    return { x: b.x, y: b.y, opacity: 1 };
  }
  const p = LPP_CORNERS[step - 1];
  return { x: p.x, y: p.y, opacity: 1 };
}

/** Where each corner's coordinate label sits, relative to the corner. */
const CORNER_LABEL: readonly { dx: number; dy: number; anchor: "start" | "end" }[] = [
  { dx: -3, dy: 12, anchor: "end" },
  { dx: -5, dy: -6, anchor: "end" },
  { dx: 6, dy: 4, anchor: "start" },
  { dx: 5, dy: -6, anchor: "start" },
  { dx: -3, dy: 3, anchor: "end" },
];

export default function CetLppCornerPoints() {
  const best = bestCorner();
  const region = LPP_CORNERS.map((p) => `${px(p.x)},${py(p.y)}`).join(" ");
  // The line 2x + 3y = 17 across the plot: from x = 0 to x = 7.
  const zLine = { x1: px(0), y1: py(best.z / LPP_OBJECTIVE.zy), x2: px(PLOT.max), y2: py((best.z - LPP_OBJECTIVE.zx * PLOT.max) / LPP_OBJECTIVE.zy) };
  const last = LPP_STEPS.length - 1;

  return (
    <StepFigure
      title="Animation · the corner-point method, corner by corner"
      label="Feasible region of x + y ≤ 6, x ≤ 4, y ≤ 5, x and y at least 0: a pentagon with corners (0, 0), (4, 0), (4, 2), (1, 5) and (0, 5). Z = 2x + 3y is 0, 8, 14, 17 and 15 at them, so the maximum is 17 at (1, 5)."
      viewBox="0 0 320 226"
      steps={LPP_STEPS}
      note="Z = 2x + 3y with x + y ≤ 6, x ≤ 4, y ≤ 5, x, y ≥ 0. The region is bounded, so only its corners need checking."
    >
      {(step) => {
        const ring = ringAt(step);
        return (
          <g>
            {/* Grid and axes */}
            {[1, 2, 3, 4, 5, 6, 7].map((t) => (
              <g key={t}>
                <line x1={px(t)} y1={py(0)} x2={px(t)} y2={py(PLOT.max)} className="stroke-border" strokeWidth={0.5} />
                <line x1={px(0)} y1={py(t)} x2={px(PLOT.max)} y2={py(t)} className="stroke-border" strokeWidth={0.5} />
                <text x={px(t)} y={py(0) + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
                  {t}
                </text>
                {/* No y tick at 5: the corner (0, 5) is labelled there. */}
                {t !== 5 && (
                  <text x={px(0) - 5} y={py(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
                    {t}
                  </text>
                )}
              </g>
            ))}
            <line x1={px(0)} y1={py(0)} x2={px(PLOT.max) + 4} y2={py(0)} className="stroke-muted-foreground" />
            <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(PLOT.max) - 4} className="stroke-muted-foreground" />
            <text x={px(PLOT.max) + 7} y={py(0) + 3} className="fill-muted-foreground text-[10px]">
              x
            </text>
            <text x={px(0) + 4} y={py(PLOT.max) + 2} className="fill-muted-foreground text-[10px]">
              y
            </text>

            {/* The feasible region */}
            <polygon points={region} className="fill-sky-500/20 stroke-sky-600 dark:fill-sky-400/20 dark:stroke-sky-400" strokeWidth={1.5} />

            {/* Boundary lines */}
            <g className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2}>
              <line x1={px(0)} y1={py(6)} x2={px(6)} y2={py(0)} />
              <line x1={px(4)} y1={py(0)} x2={px(4)} y2={py(PLOT.max)} />
              <line x1={px(0)} y1={py(5)} x2={px(PLOT.max)} y2={py(5)} />
            </g>
            <g className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
              <text x={px(5.6)} y={py(0.45)} className="text-[9px]">x + y = 6</text>
              <text x={px(4) + 4} y={py(PLOT.max) + 10}>x = 4</text>
              <text x={px(PLOT.max)} y={py(5) - 4} textAnchor="end">
                y = 5
              </text>
            </g>

            {/* The line Z = 17, touching the region only at (1, 5) */}
            <g className={MOTION} style={{ opacity: step === last ? 1 : 0 }}>
              <line {...zLine} strokeDasharray="5 3" strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
              <text x={px(6.2)} y={py(1.53) - 5} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
                Z = 17
              </text>
            </g>

            {/* Corners */}
            {LPP_CORNERS.map((p, i) => {
              const l = CORNER_LABEL[i];
              const isBest = p.x === best.x && p.y === best.y && step === last;
              return (
                <g key={`${p.x},${p.y}`}>
                  <circle
                    cx={px(p.x)}
                    cy={py(p.y)}
                    r={isBest ? 4.5 : 3}
                    className={isBest ? "fill-emerald-600 dark:fill-emerald-400" : "fill-foreground"}
                  />
                  <text
                    x={px(p.x) + l.dx}
                    y={py(p.y) + l.dy}
                    textAnchor={l.anchor}
                    className={`text-[9px] tabular-nums ${isBest ? "fill-emerald-700 font-semibold dark:fill-emerald-300" : "fill-foreground"}`}
                  >
                    ({p.x}, {p.y})
                  </text>
                </g>
              );
            })}

            {/* The ring that walks the corners */}
            <circle
              cx={0}
              cy={0}
              r={8}
              fill="none"
              strokeWidth={2.5}
              className={`stroke-amber-500 dark:stroke-amber-400 ${MOTION}`}
              style={{ opacity: ring.opacity, transform: svgTransform({ x: px(ring.x), y: py(ring.y) }) }}
            />

            {/* The table of corner values */}
            <g className="text-[11px] tabular-nums">
              <text x={212} y={30} className="fill-foreground font-semibold">
                Z = 2x + 3y
              </text>
              <text x={212} y={48} className="fill-muted-foreground text-[10px]">
                corner
              </text>
              <text x={304} y={48} textAnchor="end" className="fill-muted-foreground text-[10px]">
                Z
              </text>
              {LPP_CORNERS.map((p, i) => {
                const isBest = p.x === best.x && p.y === best.y && step === last;
                const tone = isBest ? "fill-emerald-700 font-semibold dark:fill-emerald-300" : "fill-foreground";
                return (
                  <g key={`row-${p.x},${p.y}`} className={MOTION} style={{ opacity: step > i ? 1 : 0 }}>
                    <text x={212} y={68 + i * 18} className={tone}>
                      ({p.x}, {p.y})
                    </text>
                    <text x={304} y={68 + i * 18} textAnchor="end" className={tone}>
                      {zAt(p.x, p.y)}
                    </text>
                  </g>
                );
              })}
              <text
                x={212}
                y={184}
                className={`fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 ${MOTION}`}
                style={{ opacity: step === last ? 1 : 0 }}
              >
                max: 17
              </text>
              <text
                x={212}
                y={198}
                className={`fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 ${MOTION}`}
                style={{ opacity: step === last ? 1 : 0 }}
              >
                at (1, 5)
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
