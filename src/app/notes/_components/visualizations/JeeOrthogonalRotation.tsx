"use client";

/**
 * Animation: an orthogonal matrix turns the axes (concept
 * jmat-orthogonal-matrices), drawn with the concept's worked example
 * A = [[3/5, 4/5], [−4/5, 3/5]].
 *
 * A sends (1, 0) to its first column (3/5, −4/5) and (0, 1) to its second
 * column (4/5, 3/5). This is the self-check's rotation form
 * [[cos θ, sin θ], [−sin θ, cos θ]] with cos θ = 3/5, sin θ = 4/5: a
 * clockwise turn by θ = tan⁻¹(4/3) ≈ 53.13°. Each column has length 1
 * (9/25 + 16/25 = 1), and column 1 · column 2 = 12/25 − 12/25 = 0, so
 * AᵀA = AAᵀ = I, A⁻¹ = Aᵀ, and det A = 9/25 + 16/25 = 1. The two arrows turn
 * together as one group (style.transform).
 * Pinned by tests/notes-w2-12.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type V2 = { x: number; y: number };
export type M2 = [[number, number], [number, number]];

/** The concept's matrix, as rows. */
export const ORTHO_A: M2 = [
  [3 / 5, 4 / 5],
  [-4 / 5, 3 / 5],
];

export const transpose = (m: M2): M2 => [
  [m[0][0], m[1][0]],
  [m[0][1], m[1][1]],
];
export const mulM = (p: M2, q: M2): M2 => [
  [p[0][0] * q[0][0] + p[0][1] * q[1][0], p[0][0] * q[0][1] + p[0][1] * q[1][1]],
  [p[1][0] * q[0][0] + p[1][1] * q[1][0], p[1][0] * q[0][1] + p[1][1] * q[1][1]],
];
export const det2 = (m: M2) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
export const apply = (m: M2, v: V2): V2 => ({ x: m[0][0] * v.x + m[0][1] * v.y, y: m[1][0] * v.x + m[1][1] * v.y });
export const column = (m: M2, k: 0 | 1): V2 => ({ x: m[0][k], y: m[1][k] });
export const dot = (u: V2, v: V2) => u.x * v.x + u.y * v.y;

/** θ in degrees: cos θ = 3/5, sin θ = 4/5. */
export const THETA_DEG = (Math.atan2(4, 3) * 180) / Math.PI;

export const ORTHO_STEPS: readonly FigureStep[] = [
  {
    title: "The two axes",
    caption: "Start with (1, 0) and (0, 1): two unit vectors at a right angle.",
  },
  {
    title: "Apply A",
    caption:
      "A sends (1, 0) to its first column (3/5, −4/5) and (0, 1) to its second column (4/5, 3/5). Both turn clockwise by θ, where cos θ = 3/5 and sin θ = 4/5.",
  },
  {
    title: "Each column has length 1",
    caption: "(3/5)² + (4/5)² = 9/25 + 16/25 = 1 for each column, so both tips stay on the circle of radius 1.",
  },
  {
    title: "Still at a right angle",
    caption: "Column 1 · column 2 = (3/5)(4/5) + (−4/5)(3/5) = 12/25 − 12/25 = 0, so the turned axes are still perpendicular.",
  },
  {
    title: "Orthogonal",
    caption:
      "Orthonormal columns give AᵀA = I, and then AAᵀ = I too. So A⁻¹ = Aᵀ, which turns back by θ, and det A = 9/25 + 16/25 = 1: a rotation.",
  },
];

// Plot geometry (viewBox units).
export const CENTRE = { x: 88, y: 118 } as const;
export const UNIT = 72;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(CENTRE.x + x * UNIT);
const py = (y: number) => r2(CENTRE.y - y * UNIT);

/** The arms' turn on screen (degrees, clockwise as drawn) at a step. */
export const armAngle = (step: number) => (step === 0 ? 0 : THETA_DEG);

/**
 * Where the two drawn arms point at a step, in maths coordinates (y up):
 * the screen arm (1, 0) and the screen arm (0, −1) turned by armAngle.
 */
export function armTips(step: number): { first: V2; second: V2 } {
  const a = (armAngle(step) * Math.PI) / 180;
  return {
    first: { x: Math.cos(a), y: -Math.sin(a) },
    second: { x: Math.sin(a), y: Math.cos(a) },
  };
}

export default function JeeOrthogonalRotation() {
  const last = ORTHO_STEPS.length - 1;
  const c1 = column(ORTHO_A, 0);
  const c2 = column(ORTHO_A, 1);
  const thetaArc = Array.from({ length: 13 }, (_, k) => {
    const t = (-(THETA_DEG * k) / 12) * (Math.PI / 180);
    return `${r2(CENTRE.x + 26 * Math.cos(t))},${r2(CENTRE.y - 26 * Math.sin(t))}`;
  }).join(" ");
  const L = UNIT;

  return (
    <StepFigure
      title="Animation · an orthogonal matrix turns the axes"
      label="The matrix A with rows (3/5, 4/5) and (−4/5, 3/5) turns (1, 0) to (3/5, −4/5) and (0, 1) to (4/5, 3/5), clockwise by θ with cos θ = 3/5. Both columns have length 1 and are perpendicular, so AAᵀ = I, A⁻¹ = Aᵀ and det A = 1."
      viewBox="0 0 320 204"
      steps={ORTHO_STEPS}
      note="The rows (3/5, 4/5) and (−4/5, 3/5) are an orthonormal pair too: that is AAᵀ = I read row by row."
    >
      {(step) => (
        <g>
          {/* Axes and the circle of radius 1 */}
          <line x1={px(-1.12)} y1={py(0)} x2={px(1.12)} y2={py(0)} className="stroke-border" />
          <line x1={px(0)} y1={py(1.12)} x2={px(0)} y2={py(-1.12)} className="stroke-border" />
          <circle cx={CENTRE.x} cy={CENTRE.y} r={UNIT} fill="none" strokeDasharray="3 3" className="stroke-muted-foreground" />
          <circle
            cx={CENTRE.x}
            cy={CENTRE.y}
            r={UNIT}
            fill="none"
            strokeWidth={2}
            className={`stroke-emerald-600 dark:stroke-emerald-400 ${MOTION}`}
            style={{ opacity: step >= 2 ? 0.8 : 0 }}
          />

          {/* The original axes, (1, 0) and (0, 1) */}
          <g className="stroke-muted-foreground" strokeWidth={1.5}>
            <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(0)} />
            <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(1)} />
          </g>
          <text x={px(1) + 3} y={py(0) - 5} className="fill-muted-foreground text-[10px]">
            (1, 0)
          </text>
          <text x={px(0) + 5} y={py(1) - 3} className="fill-muted-foreground text-[10px]">
            (0, 1)
          </text>

          {/* θ, from (1, 0) round to column 1 */}
          <g className={MOTION} style={{ opacity: step >= 1 ? 1 : 0 }}>
            <polyline points={thetaArc} fill="none" strokeWidth={1.5} className="stroke-foreground" />
            <text x={px(0) + 30} y={py(0) + 22} className="fill-foreground text-[11px] font-semibold">
              θ
            </text>
          </g>

          {/* The two arms, turning together */}
          <g className={MOTION} style={{ transform: svgTransform({ x: CENTRE.x, y: CENTRE.y, angle: armAngle(step) }) }}>
            <line x1={0} y1={0} x2={L - 7} y2={0} strokeWidth={2.5} className="stroke-rose-600 dark:stroke-rose-400" />
            <polygon points={`${L},0 ${L - 9},-4.5 ${L - 9},4.5`} className="fill-rose-600 dark:fill-rose-400" />
            <line x1={0} y1={0} x2={0} y2={-(L - 7)} strokeWidth={2.5} className="stroke-sky-600 dark:stroke-sky-400" />
            <polygon points={`0,${-L} -4.5,${-(L - 9)} 4.5,${-(L - 9)}`} className="fill-sky-600 dark:fill-sky-400" />
            <path
              d="M 11 0 L 11 -11 L 0 -11"
              fill="none"
              strokeWidth={1.5}
              className={`stroke-emerald-600 dark:stroke-emerald-400 ${MOTION}`}
              style={{ opacity: step >= 3 ? 1 : 0 }}
            />
          </g>
          <circle cx={CENTRE.x} cy={CENTRE.y} r={3} className="fill-foreground" />

          {/* Where the columns land */}
          <g className={`text-[10px] font-semibold ${MOTION}`} style={{ opacity: step >= 1 ? 1 : 0 }}>
            <text x={px(c1.x) + 4} y={py(c1.y) + 14} className="fill-rose-700 dark:fill-rose-300">
              (3/5, −4/5)
            </text>
            <text x={px(c2.x) + 5} y={py(c2.y) - 4} className="fill-sky-700 dark:fill-sky-300">
              (4/5, 3/5)
            </text>
          </g>

          {/* The matrix, coloured by column */}
          <g className="text-[11px] font-semibold tabular-nums">
            <text x={204} y={39} className="fill-foreground">
              A =
            </text>
            <path d="M 232 16 L 228 16 L 228 50 L 232 50" fill="none" strokeWidth={1.2} className="stroke-foreground" />
            <path d="M 300 16 L 304 16 L 304 50 L 300 50" fill="none" strokeWidth={1.2} className="stroke-foreground" />
            <text x={248} y={30} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300">
              3/5
            </text>
            <text x={248} y={45} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300">
              −4/5
            </text>
            <text x={284} y={30} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300">
              4/5
            </text>
            <text x={284} y={45} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300">
              3/5
            </text>
          </g>

          {/* The working */}
          <g className="text-[10px] tabular-nums">
            <g className={MOTION} style={{ opacity: step >= 2 ? 1 : 0 }}>
              <text x={204} y={76} className="fill-muted-foreground">
                each length:
              </text>
              <text x={204} y={90} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
                9/25 + 16/25 = 1
              </text>
            </g>
            <g className={MOTION} style={{ opacity: step >= 3 ? 1 : 0 }}>
              <text x={204} y={112} className="fill-muted-foreground">
                column 1 · column 2:
              </text>
              <text x={204} y={126} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
                12/25 − 12/25 = 0
              </text>
            </g>
            <g className={`text-[11px] font-semibold ${MOTION}`} style={{ opacity: step === last ? 1 : 0 }}>
              <text x={204} y={152} className="fill-foreground">
                AAᵀ = I
              </text>
              <text x={204} y={168} className="fill-foreground">
                A⁻¹ = Aᵀ
              </text>
              <text x={204} y={184} className="fill-foreground">
                det A = 1
              </text>
            </g>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
