"use client";

/**
 * Animation: rotation on the Argand plane (concept jcx-rotation), drawn with
 * the concept's worked example: a square with adjacent vertices 0 and 3 + i,
 * taken anticlockwise.
 *
 * z₁ = 0, z₂ = 3 + i. Turning the side z₂ − z₁ through θ = π/2 about z₁
 * multiplies it by e^(iπ/2) = i: i(3 + i) = −1 + 3i = z₃. Then
 * (z₃ − z₁)/(z₂ − z₁) = (−1 + 3i)/(3 + i) = i, modulus 1 (the sides are
 * equal) and argument π/2 (the angle at z₁), which is the concept's formula
 * (z₃ − z₁)/(z₂ − z₁) = (|z₃ − z₁|/|z₂ − z₁|)e^(iθ). The fourth vertex is
 * z₂ + (z₃ − z₁) = 2 + 4i. One arm of length √10 turns by style.transform.
 * Pinned by tests/notes-jee-visuals-maths.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type C = { re: number; im: number };

export const add = (p: C, q: C): C => ({ re: p.re + q.re, im: p.im + q.im });
export const sub = (p: C, q: C): C => ({ re: p.re - q.re, im: p.im - q.im });
export const mul = (p: C, q: C): C => ({ re: p.re * q.re - p.im * q.im, im: p.re * q.im + p.im * q.re });
export const div = (p: C, q: C): C => {
  const d = q.re * q.re + q.im * q.im;
  return { re: (p.re * q.re + p.im * q.im) / d, im: (p.im * q.re - p.re * q.im) / d };
};
export const modulus = (z: C) => Math.hypot(z.re, z.im);
/** Argument in degrees. */
export const argDeg = (z: C) => (Math.atan2(z.im, z.re) * 180) / Math.PI;

/** e^(iθ) for θ in radians. */
export const cis = (theta: number): C => ({ re: Math.cos(theta), im: Math.sin(theta) });

/** w = a + (z − a)e^(iθ): z turned through θ about a. */
export const rotateAbout = (z: C, a: C, theta: number): C => add(a, mul(sub(z, a), cis(theta)));

export const Z1: C = { re: 0, im: 0 };
export const Z2: C = { re: 3, im: 1 };
export const THETA = Math.PI / 2;
/** z₃ = z₁ + (z₂ − z₁)·i, rounded to clear floating dust from cos(π/2). */
export const Z3: C = (() => {
  const w = rotateAbout(Z2, Z1, THETA);
  return { re: Math.round(w.re * 1e9) / 1e9, im: Math.round(w.im * 1e9) / 1e9 };
})();
/** The fourth vertex z₂ + (z₃ − z₁). */
export const Z4: C = add(Z2, sub(Z3, Z1));

export const ROTATION_STEPS: readonly FigureStep[] = [
  {
    title: "Two vertices of the square",
    caption: "z₁ = 0 and z₂ = 3 + i. The side from z₁ to z₂ is z₂ − z₁ = 3 + i, of length √10.",
  },
  {
    title: "Turn the side a quarter turn about z₁",
    caption: "Turning through θ = π/2 anticlockwise multiplies z₂ − z₁ by e^(iπ/2) = i: i(3 + i) = 3i + i² = −1 + 3i. So z₃ = −1 + 3i.",
  },
  {
    title: "Read the ratio",
    caption:
      "(z₃ − z₁)/(z₂ − z₁) = (−1 + 3i)/(3 + i) = i. Its modulus 1 says the two sides are equal; its argument π/2 is the angle at z₁.",
  },
  {
    title: "Complete the square",
    caption: "The fourth vertex is z₂ + (z₃ − z₁) = (3 + i) + (−1 + 3i) = 2 + 4i. The square is 0, 3 + i, 2 + 4i, −1 + 3i.",
  },
];

// Plot geometry (viewBox units): x from −2 to 4, y from −1 to 5.
export const PLOT = { left: 18, top: 14, unit: 30, xMin: -2, xMax: 4, yMin: -1, yMax: 5 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (x: number) => r2(PLOT.left + (x - PLOT.xMin) * PLOT.unit);
export const py = (y: number) => r2(PLOT.top + (PLOT.yMax - y) * PLOT.unit);

/** The arm's angle (degrees, anticlockwise from the real axis) at a step. */
export const armAngle = (step: number) => (step === 0 ? argDeg(sub(Z2, Z1)) : argDeg(sub(Z3, Z1)));

export default function JeeComplexRotation() {
  const L = r2(modulus(sub(Z2, Z1)) * PLOT.unit);
  const last = ROTATION_STEPS.length - 1;
  const a2 = argDeg(sub(Z2, Z1));
  const a3 = argDeg(sub(Z3, Z1));
  const ARC = 22;
  const arc = Array.from({ length: 21 }, (_, k) => {
    const t = ((a2 + ((a3 - a2) * k) / 20) * Math.PI) / 180;
    return `${r2(px(Z1.re) + ARC * Math.cos(t))},${r2(py(Z1.im) - ARC * Math.sin(t))}`;
  }).join(" ");
  const square = [Z1, Z2, Z4, Z3].map((z) => `${px(z.re)},${py(z.im)}`).join(" ");

  return (
    <StepFigure
      title="Animation · turning a side about a vertex"
      label="Argand plane: z₁ = 0 and z₂ = 3 + i. The side z₂ − z₁ turns a quarter turn about z₁ to reach z₃ = −1 + 3i, since (z₃ − z₁)/(z₂ − z₁) = i. The fourth vertex of the square is 2 + 4i."
      viewBox="0 0 320 214"
      steps={ROTATION_STEPS}
      note="(z₃ − z₁)/(z₂ − z₁) = (|z₃ − z₁|/|z₂ − z₁|)e^(iθ): the modulus is the ratio of the sides at z₁, the argument the angle between them."
    >
      {(step) => (
        <g>
          {/* Grid and axes */}
          {Array.from({ length: PLOT.xMax - PLOT.xMin + 1 }, (_, k) => PLOT.xMin + k).map((x) => (
            <line key={`v${x}`} x1={px(x)} y1={py(PLOT.yMin)} x2={px(x)} y2={py(PLOT.yMax)} className="stroke-border" strokeWidth={0.5} />
          ))}
          {Array.from({ length: PLOT.yMax - PLOT.yMin + 1 }, (_, k) => PLOT.yMin + k).map((y) => (
            <line key={`h${y}`} x1={px(PLOT.xMin)} y1={py(y)} x2={px(PLOT.xMax)} y2={py(y)} className="stroke-border" strokeWidth={0.5} />
          ))}
          <line x1={px(PLOT.xMin)} y1={py(0)} x2={px(PLOT.xMax)} y2={py(0)} className="stroke-muted-foreground" />
          <line x1={px(0)} y1={py(PLOT.yMin)} x2={px(0)} y2={py(PLOT.yMax)} className="stroke-muted-foreground" />
          <text x={px(PLOT.xMax) - 2} y={py(0) + 11} textAnchor="end" className="fill-muted-foreground text-[10px]">
            Re
          </text>
          <text x={px(0) + 4} y={py(PLOT.yMax) + 10} className="fill-muted-foreground text-[10px]">
            Im
          </text>

          {/* The square, at the last step */}
          <polygon
            points={square}
            strokeWidth={1.5}
            className={`fill-sky-500/15 stroke-sky-600 dark:fill-sky-400/15 dark:stroke-sky-400 ${MOTION}`}
            style={{ opacity: step === last ? 1 : 0 }}
          />

          {/* The side z₂ − z₁, fixed */}
          <line x1={px(Z1.re)} y1={py(Z1.im)} x2={px(Z2.re)} y2={py(Z2.im)} strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />

          {/* The angle θ at z₁ */}
          <g className={MOTION} style={{ opacity: step >= 2 ? 1 : 0 }}>
            <polyline points={arc} fill="none" strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
            <text x={px(Z1.re) + 8} y={py(Z1.im) - 28} className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
              θ = π/2
            </text>
          </g>

          {/* The turning arm, length √10 */}
          <g
            className={MOTION}
            style={{ transform: svgTransform({ x: px(Z1.re), y: py(Z1.im), angle: -armAngle(step) }) }}
          >
            <line x1={0} y1={0} x2={L - 6} y2={0} strokeWidth={2.5} strokeDasharray={step === 0 ? "4 3" : undefined} className="stroke-rose-600 dark:stroke-rose-400" />
            <polygon points={`${L},0 ${L - 9},-4.5 ${L - 9},4.5`} className="fill-rose-600 dark:fill-rose-400" />
          </g>

          {/* Vertices */}
          <circle cx={px(Z1.re)} cy={py(Z1.im)} r={3.5} className="fill-foreground" />
          <text x={px(Z1.re) - 5} y={py(Z1.im) + 13} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
            z₁ = 0
          </text>
          <circle cx={px(Z2.re)} cy={py(Z2.im)} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
          <text x={px(Z2.re) - 2} y={py(Z2.im) + 15} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
            z₂ = 3 + i
          </text>
          <g className={MOTION} style={{ opacity: step >= 1 ? 1 : 0 }}>
            <circle cx={px(Z3.re)} cy={py(Z3.im)} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
            <text x={px(Z3.re) - 6} y={py(Z3.im) - 7} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
              z₃ = −1 + 3i
            </text>
          </g>
          <g className={MOTION} style={{ opacity: step === last ? 1 : 0 }}>
            <circle cx={px(Z4.re)} cy={py(Z4.im)} r={3.5} className="fill-sky-600 dark:fill-sky-400" />
            <text x={px(Z4.re) + 6} y={py(Z4.im) - 6} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
              2 + 4i
            </text>
          </g>

          {/* The working */}
          <g className="text-[10px] tabular-nums">
            <text x={210} y={34} className="fill-foreground font-semibold">
              z₂ − z₁ = 3 + i
            </text>
            <text x={210} y={50} className="fill-muted-foreground">
              length √10
            </text>
            <g className={MOTION} style={{ opacity: step >= 1 ? 1 : 0 }}>
              <text x={210} y={74} className="fill-rose-700 font-semibold dark:fill-rose-300">
                i(3 + i) = −1 + 3i
              </text>
            </g>
            <g className={MOTION} style={{ opacity: step >= 2 ? 1 : 0 }}>
              <text x={210} y={98} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
                ratio = i
              </text>
              <text x={210} y={112} className="fill-muted-foreground">
                modulus 1
              </text>
              <text x={210} y={126} className="fill-muted-foreground">
                argument π/2
              </text>
            </g>
            <g className={MOTION} style={{ opacity: step === last ? 1 : 0 }}>
              <text x={210} y={150} className="fill-sky-700 font-semibold dark:fill-sky-300">
                z₄ = 2 + 4i
              </text>
            </g>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
