"use client";

/**
 * Animation: the general solution of sin θ = k read off the unit circle
 * (concept cettf-general-solutions), with the concept's own example
 * sin θ = 1/2, in radians.
 *
 * sin θ is the y-coordinate of the point at angle θ, so the solutions are
 * where the line y = 1/2 cuts the circle: α = π/6 and its mirror image in the
 * y-axis, π − α = 5π/6 (sine is symmetric about π/2). One more turn adds 2π:
 * 13π/6 and 17π/6. These are θ = nπ + (−1)ⁿα for n = 0, 1, 2, 3. One arm turns
 * by style.transform from solution to solution. Pinned by
 * tests/notes-cet-visuals-maths.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The concept's example: sin θ = 1/2, principal value α = π/6. */
export const SIN_K = 0.5;
export const ALPHA = Math.PI / 6;

/** θ = nπ + (−1)ⁿα. */
export function generalSolution(n: number, alpha: number = ALPHA): number {
  return n * Math.PI + (n % 2 === 0 ? 1 : -1) * alpha;
}

/** The four solutions the steps visit, n = 0, 1, 2, 3, with their labels (in units of π/6). */
export const SOLUTIONS = [
  { n: 0, label: "π/6", sixths: 1 },
  { n: 1, label: "5π/6", sixths: 5 },
  { n: 2, label: "13π/6", sixths: 13 },
  { n: 3, label: "17π/6", sixths: 17 },
] as const;

export const UC_STEPS: readonly FigureStep[] = [
  {
    title: "Where the line y = 1/2 cuts the circle",
    caption: "On the unit circle, sin θ is the height of the point at angle θ. So sin θ = 1/2 wherever the line y = 1/2 meets the circle: at two points.",
  },
  {
    title: "The principal value α = π/6",
    caption: "The first point is at θ = π/6, since sin(π/6) = 1/2. Call it α.",
  },
  {
    title: "Its mirror image, π − α = 5π/6",
    caption: "The second point is the mirror image of the first in the y-axis, at the same height: θ = π − π/6 = 5π/6.",
  },
  {
    title: "One more turn: 2π + π/6 = 13π/6",
    caption: "Going round once more reaches the first point again, 2π later: θ = 13π/6.",
  },
  {
    title: "And 3π − π/6 = 17π/6",
    caption: "The mirror point again, 2π after 5π/6: θ = 17π/6. Every further turn adds 2π to both.",
  },
  {
    title: "The general solution",
    caption:
      "Listed in order, the angles are π/6, 5π/6, 13π/6, 17π/6: each is nπ plus α when n is even and nπ minus α when n is odd. That is θ = nπ + (−1)ⁿα, here θ = nπ + (−1)ⁿ(π/6).",
  },
];

// Geometry (viewBox units).
export const CENTRE = { x: 100, y: 120 } as const;
export const RADIUS = 72;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Screen point of angle θ (radians) on the circle. */
export function pointAt(theta: number): { x: number; y: number } {
  return { x: r2(CENTRE.x + RADIUS * Math.cos(theta)), y: r2(CENTRE.y - RADIUS * Math.sin(theta)) };
}

/** The arm's turn at a step, in degrees anticlockwise from the x-axis, and its opacity. */
export function armAt(step: number): { deg: number; opacity: number } {
  if (step === 0) return { deg: 0, opacity: 0 };
  const s = SOLUTIONS[Math.min(step, SOLUTIONS.length) - 1];
  return { deg: s.sixths * 30, opacity: 1 };
}

export default function CetUnitCircleSolutions() {
  const yLine = r2(CENTRE.y - RADIUS * SIN_K);
  const p1 = pointAt(ALPHA);
  const p2 = pointAt(Math.PI - ALPHA);
  const last = UC_STEPS.length - 1;
  // Small arc for α, from 0 to π/6.
  const alphaArc = Array.from({ length: 11 }, (_, k) => {
    const t = (ALPHA * k) / 10;
    return `${r2(CENTRE.x + 22 * Math.cos(t))},${r2(CENTRE.y - 22 * Math.sin(t))}`;
  }).join(" ");

  return (
    <StepFigure
      title="Animation · solving a sine equation on the unit circle"
      label="Unit circle with the line y = 1/2 cutting it at angles π/6 and 5π/6. Turning once more gives 13π/6 and 17π/6, the same two points. All are θ = nπ + (−1)ⁿ(π/6)."
      viewBox="0 0 320 214"
      steps={UC_STEPS}
      note="Angles in radians, measured anticlockwise from the positive x-axis. sin θ = 1/2, so α = π/6."
    >
      {(step) => {
        const arm = armAt(step);
        const current = step >= 1 ? SOLUTIONS[Math.min(step, SOLUTIONS.length) - 1] : null;
        return (
          <g>
            {/* Axes and circle */}
            <line x1={CENTRE.x - 86} y1={CENTRE.y} x2={CENTRE.x + 86} y2={CENTRE.y} className="stroke-muted-foreground" strokeWidth={0.8} />
            <line x1={CENTRE.x} y1={CENTRE.y - 92} x2={CENTRE.x} y2={CENTRE.y + 86} strokeDasharray="3 3" className="stroke-muted-foreground" strokeWidth={0.8} />
            <text x={CENTRE.x + 84} y={CENTRE.y + 12} textAnchor="end" className="fill-muted-foreground text-[10px]">
              x
            </text>
            <text x={CENTRE.x + 4} y={CENTRE.y - 84} className="fill-muted-foreground text-[10px]">
              y
            </text>
            <circle cx={CENTRE.x} cy={CENTRE.y} r={RADIUS} fill="none" strokeWidth={1.5} className="stroke-foreground" />
            <text x={CENTRE.x + RADIUS + 3} y={CENTRE.y - 4} className="fill-muted-foreground text-[9px]">
              1
            </text>

            {/* The line y = 1/2 */}
            <line x1={CENTRE.x - 96} y1={yLine} x2={CENTRE.x + 92} y2={yLine} strokeWidth={1.5} className="stroke-sky-600 dark:stroke-sky-400" />
            <text x={CENTRE.x + 92} y={yLine - 8} textAnchor="end" className="fill-sky-700 text-[9px] font-semibold dark:fill-sky-300">
              y = 1/2
            </text>

            {/* The two points where it cuts the circle */}
            <circle cx={p1.x} cy={p1.y} r={4} className="fill-sky-600 dark:fill-sky-400" />
            <circle cx={p2.x} cy={p2.y} r={4} className="fill-sky-600 dark:fill-sky-400" />
            <g className={MOTION} style={{ opacity: step >= 1 ? 1 : 0 }}>
              <polyline points={alphaArc} fill="none" strokeWidth={1.2} className="stroke-amber-600 dark:stroke-amber-400" />
              <text x={CENTRE.x + 25} y={CENTRE.y - 3} className="fill-amber-700 text-[9px] font-semibold dark:fill-amber-300">
                α
              </text>
              <text x={p1.x - 8} y={p1.y + 14} textAnchor="end" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
                π/6
              </text>
            </g>
            <g className={MOTION} style={{ opacity: step >= 2 ? 1 : 0 }}>
              <text x={p2.x + 8} y={p2.y + 14} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
                5π/6
              </text>
              <text x={CENTRE.x + 4} y={CENTRE.y + 84} className="fill-muted-foreground text-[9px]">
                mirror line
              </text>
            </g>

            {/* The arm, turning anticlockwise from solution to solution */}
            <g className={MOTION} style={{ opacity: arm.opacity, transform: svgTransform({ x: CENTRE.x, y: CENTRE.y, angle: -arm.deg }) }}>
              <line x1={0} y1={0} x2={RADIUS} y2={0} strokeWidth={2.5} className="stroke-amber-500 dark:stroke-amber-400" />
              <circle cx={RADIUS} cy={0} r={6} fill="none" strokeWidth={2} className="stroke-amber-500 dark:stroke-amber-400" />
            </g>
            <circle cx={CENTRE.x} cy={CENTRE.y} r={2.5} className="fill-foreground" />

            {/* The list of solutions */}
            <g className="text-[11px] tabular-nums">
              <text x={194} y={30} className="fill-foreground font-semibold">
                sin θ = 1/2
              </text>
              <text x={194} y={48} className="fill-amber-700 font-semibold dark:fill-amber-300">
                {current ? `θ = ${current.label}` : "θ = ?"}
              </text>
              {SOLUTIONS.map((s, i) => (
                <text key={s.n} x={194} y={98 + i * 18} className={`fill-foreground ${MOTION}`} style={{ opacity: step > i ? 1 : 0 }}>
                  n = {s.n}: {s.label}
                </text>
              ))}
              <g className={MOTION} style={{ opacity: step === last ? 1 : 0 }}>
                <text x={194} y={180} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
                  θ = nπ + (−1)ⁿα
                </text>
                <text x={194} y={198} className="fill-emerald-700 dark:fill-emerald-300">
                  = nπ + (−1)ⁿ(π/6)
                </text>
              </g>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
