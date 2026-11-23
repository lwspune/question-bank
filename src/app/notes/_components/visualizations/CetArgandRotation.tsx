"use client";

/**
 * Animation: multiplying by i turns a point a quarter turn (π/2) anticlockwise
 * about the origin (concept cetcn-polar-form-and-de-moivre). Drawn with the
 * concept's practice point z = 2 + 3i, where i(2 + 3i) = −3 + 2i: (x, y) → (−y, x).
 *
 * Steps: z = 2 + 3i, iz = −3 + 2i, i²z = −z = −2 − 3i, i³z = −iz = 3 − 2i, and
 * i⁴z = z again. The modulus stays √13 throughout, so all four points lie on
 * one circle. One arm turns by style.transform. Pinned by
 * tests/notes-cet-visuals-maths.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type C = { re: number; im: number };

/** The concept's practice point. */
export const Z0: C = { re: 2, im: 3 };

/** Multiply by i: (x, y) → (−y, x). */
export const timesI = (z: C): C => ({ re: -z.im, im: z.re });

export const modulus = (z: C) => Math.hypot(z.re, z.im);

/** z, iz, i²z, i³z. */
export const POWERS: readonly C[] = [Z0, timesI(Z0), timesI(timesI(Z0)), timesI(timesI(timesI(Z0)))];

/** "a + bi" with a true minus sign; a coefficient of 1 is left out. */
export function complexLabel(z: C): string {
  const re = z.re < 0 ? `−${-z.re}` : `${z.re}`;
  const imAbs = Math.abs(z.im);
  const im = imAbs === 1 ? "i" : `${imAbs}i`;
  return `${re} ${z.im < 0 ? "−" : "+"} ${im}`;
}

export const POWER_NAMES = ["z", "iz", "i²z = −z", "i³z = −iz"] as const;

export const ARGAND_STEPS: readonly FigureStep[] = [
  {
    title: "The point z = 2 + 3i",
    caption: "z = 2 + 3i is the point (2, 3). Its distance from the origin is |z| = √(4 + 9) = √13.",
  },
  {
    title: "Multiply by i: a quarter turn",
    caption: "iz = i(2 + 3i) = 2i + 3i² = −3 + 2i. The point (2, 3) goes to (−3, 2): turned π/2 anticlockwise about the origin.",
  },
  {
    title: "Multiply by i again: a half turn",
    caption: "i²z = −z = −2 − 3i. Two quarter turns make a half turn, straight through the origin.",
  },
  {
    title: "A third quarter turn",
    caption: "i³z = −iz = 3 − 2i, three quarter turns from z.",
  },
  {
    title: "The fourth turn brings z back",
    caption: "i⁴ = 1, so i⁴z = z. Each multiplication by i turned the point but never changed its distance: all four points lie on the circle |z| = √13.",
  },
];

// Geometry (viewBox units).
export const ORIGIN = { x: 104, y: 112 } as const;
export const UNIT = 22;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const toScreen = (z: C) => ({ x: r2(ORIGIN.x + z.re * UNIT), y: r2(ORIGIN.y - z.im * UNIT) });

/** Argument of z in degrees, in [0, 360). */
export function argDeg(z: C): number {
  const d = (Math.atan2(z.im, z.re) * 180) / Math.PI;
  return d < 0 ? d + 360 : d;
}

/** The arm's turn at a step (degrees anticlockwise, growing by 90 each step). */
export const armDeg = (step: number) => argDeg(Z0) + 90 * step;

/** Where each point's label sits, relative to the point. */
const LABEL_AT: readonly { dx: number; dy: number; anchor: "start" | "end" }[] = [
  { dx: 7, dy: -4, anchor: "start" },
  { dx: -7, dy: -6, anchor: "end" },
  { dx: -7, dy: 14, anchor: "end" },
  { dx: 7, dy: 14, anchor: "start" },
];

const TONES = [
  "fill-indigo-600 dark:fill-indigo-400",
  "fill-sky-600 dark:fill-sky-400",
  "fill-rose-600 dark:fill-rose-400",
  "fill-violet-600 dark:fill-violet-400",
] as const;
const TEXT_TONES = [
  "fill-indigo-700 dark:fill-indigo-300",
  "fill-sky-700 dark:fill-sky-300",
  "fill-rose-700 dark:fill-rose-300",
  "fill-violet-700 dark:fill-violet-300",
] as const;

export default function CetArgandRotation() {
  const R = modulus(Z0) * UNIT;
  const last = ARGAND_STEPS.length - 1;
  return (
    <StepFigure
      title="Animation · multiplying by i turns a point a quarter turn"
      label="Argand plane: z = 2 + 3i, then iz = −3 + 2i, i squared z = −2 − 3i and i cubed z = 3 − 2i, each a quarter turn anticlockwise from the last, all on the circle of radius √13 about the origin."
      viewBox="0 0 320 222"
      steps={ARGAND_STEPS}
      note="One grid square is 1 unit. Anticlockwise is the positive direction of turning."
    >
      {(step) => (
        <g>
          {/* Grid and axes */}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((t) => (
            <g key={t}>
              <line x1={ORIGIN.x + t * UNIT} y1={ORIGIN.y - 4.3 * UNIT} x2={ORIGIN.x + t * UNIT} y2={ORIGIN.y + 4.3 * UNIT} className="stroke-border" strokeWidth={0.5} />
              <line x1={ORIGIN.x - 4.3 * UNIT} y1={ORIGIN.y - t * UNIT} x2={ORIGIN.x + 4.3 * UNIT} y2={ORIGIN.y - t * UNIT} className="stroke-border" strokeWidth={0.5} />
            </g>
          ))}
          <line x1={ORIGIN.x - 4.4 * UNIT} y1={ORIGIN.y} x2={ORIGIN.x + 4.4 * UNIT} y2={ORIGIN.y} className="stroke-muted-foreground" />
          <line x1={ORIGIN.x} y1={ORIGIN.y - 4.4 * UNIT} x2={ORIGIN.x} y2={ORIGIN.y + 4.4 * UNIT} className="stroke-muted-foreground" />
          <text x={ORIGIN.x + 4.4 * UNIT} y={ORIGIN.y + 12} textAnchor="end" className="fill-muted-foreground text-[10px]">
            Re
          </text>
          <text x={ORIGIN.x + 4} y={ORIGIN.y - 4.4 * UNIT + 8} className="fill-muted-foreground text-[10px]">
            Im
          </text>

          {/* The circle |z| = √13 */}
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={r2(R)} fill="none" strokeDasharray="4 4" strokeWidth={1.2} className="stroke-emerald-600 dark:stroke-emerald-400" />

          {/* The four points, each appearing at its step */}
          {POWERS.map((z, i) => {
            const p = toScreen(z);
            const l = LABEL_AT[i];
            return (
              <g key={i} className={MOTION} style={{ opacity: step >= i ? 1 : 0 }}>
                <circle cx={p.x} cy={p.y} r={4} className={TONES[i]} />
                <text x={p.x + l.dx} y={p.y + l.dy} textAnchor={l.anchor} className={`${TEXT_TONES[i]} text-[10px] font-semibold`}>
                  {i === 0 ? "z" : i === 1 ? "iz" : i === 2 ? "−z" : "−iz"}
                </text>
              </g>
            );
          })}

          {/* The arm: one line from the origin, turned a quarter turn per step */}
          <g className={MOTION} style={{ transform: svgTransform({ x: ORIGIN.x, y: ORIGIN.y, angle: -armDeg(step) }) }}>
            <line x1={0} y1={0} x2={r2(R) - 7} y2={0} strokeWidth={2.5} className="stroke-amber-500 dark:stroke-amber-400" />
            <polygon points={`${r2(R)},0 ${r2(R) - 9},-4.5 ${r2(R) - 9},4.5`} className="fill-amber-500 dark:fill-amber-400" />
          </g>
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={2.5} className="fill-foreground" />

          {/* The values */}
          <g className="text-[11px] tabular-nums">
            {POWERS.map((z, i) => (
              <text key={i} x={208} y={40 + i * 20} className={`${TEXT_TONES[i]} ${MOTION}`} style={{ opacity: step >= i ? 1 : 0 }}>
                {POWER_NAMES[i].split(" = ")[0]} = {complexLabel(z)}
              </text>
            ))}
            <g className={MOTION} style={{ opacity: step === last ? 1 : 0 }}>
              <text x={208} y={130} className="fill-foreground">
                i⁴z = z
              </text>
              <text x={208} y={150} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
                |z| = √13 each
              </text>
            </g>
            <text x={208} y={176} className="fill-muted-foreground text-[10px]">
              ×i turns (x, y)
            </text>
            <text x={208} y={190} className="fill-muted-foreground text-[10px]">
              into (−y, x)
            </text>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
