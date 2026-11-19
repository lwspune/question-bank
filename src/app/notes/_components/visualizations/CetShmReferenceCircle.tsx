"use client";

/**
 * Animation: SHM as the shadow of uniform circular motion (concept
 * cetp-osc-velocity-displacement). A point P goes round a circle of radius A
 * anticlockwise at a steady angular speed ω. The foot of the perpendicular
 * from P on a line below (its shadow M) moves to and fro in SHM with
 * x = A cos θ, velocity −ωA sin θ and acceleration −ω²x. So at the mean
 * position the speed is greatest (ωA) and the acceleration zero; at the
 * extremes the speed is zero and the acceleration greatest (ω²A). The first
 * step shows the concept's own fact: speed ωA/2 at x = (√3/2)A.
 *
 * P is turned about the centre (style.transform rotate). The drop line and M
 * hang from P in a frame turned back by the same angle, so they stay vertical
 * while P sweeps the arc, and are clipped at the line below: M stays exactly
 * under P all through a transition. Pinned by
 * tests/notes-cet-visuals-phys-b.test.ts.
 */
import { useId } from "react";
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** θ = ωt (degrees, anticlockwise from +x) at each step. */
export const SHM_THETAS = [30, 90, 180, 270, 360] as const;

const rad = (d: number) => (d * Math.PI) / 180;

/** Displacement of the shadow as a fraction of A: x/A = cos θ. */
export function shadowX(thetaDeg: number): number {
  return Math.cos(rad(thetaDeg));
}

/** Velocity of the shadow in units of ωA: −sin θ (negative = towards −A). */
export function shadowVelocity(thetaDeg: number): number {
  return -Math.sin(rad(thetaDeg));
}

/** Acceleration of the shadow in units of ω²A: −cos θ, i.e. a = −ω²x, always towards O. */
export function shadowAccel(thetaDeg: number): number {
  return -Math.cos(rad(thetaDeg));
}

/** Speed from the concept's formula, in units of ωA: v = ω√(A² − x²), with x as a fraction of A. */
export function speedFromX(xOverA: number): number {
  return Math.sqrt(Math.max(0, 1 - xOverA * xOverA));
}

export const SHM_STEPS: readonly FigureStep[] = [
  {
    title: "The reference circle",
    caption:
      "P goes round a circle of radius A at a steady angular speed ω. Its shadow M moves to and fro in SHM. Here x = (√3/2)A, and M's speed is ωA/2, half the greatest.",
  },
  {
    title: "Mean position",
    caption:
      "At x = 0 all of P's velocity is sideways, so M moves fastest: v = ωA. The acceleration is zero, because a = −ω²x and x = 0.",
  },
  {
    title: "Extreme, x = −A",
    caption:
      "P is moving straight up, so M stops for an instant: v = 0. The acceleration is now greatest, ω²A, pointing back towards O.",
  },
  {
    title: "Mean position again",
    caption:
      "M passes O the other way at the same top speed ωA, again with zero acceleration.",
  },
  {
    title: "Extreme, x = +A",
    caption:
      "One full turn of P is one oscillation of M. At each extreme v = 0 and a = ω²A towards O; at O, v = ωA and a = 0.",
  },
];

/** Text read-outs for each step (x, speed, acceleration). */
export const SHM_READOUTS: readonly { x: string; v: string; a: string }[] = [
  { x: "x = (√3/2)A", v: "speed = ωA/2", a: "a = (√3/2)ω²A" },
  { x: "x = 0", v: "speed = ωA (most)", a: "a = 0" },
  { x: "x = −A", v: "speed = 0", a: "a = ω²A (most)" },
  { x: "x = 0", v: "speed = ωA (most)", a: "a = 0" },
  { x: "x = +A", v: "speed = 0", a: "a = ω²A (most)" },
];

// Geometry (viewBox units).
export const C = { x: 100, y: 88 } as const;
export const R = 58;
export const TRACK_Y = 178;
const V_Y = 166;
const A_Y = 156;
const ARROW = 38;

/** Where P is on screen at angle θ (anticlockwise on screen). */
export function pointAt(thetaDeg: number): { x: number; y: number } {
  return { x: C.x + R * Math.cos(rad(thetaDeg)), y: C.y - R * Math.sin(rad(thetaDeg)) };
}

const TONES = {
  v: { stroke: "stroke-emerald-600 dark:stroke-emerald-400", fill: "fill-emerald-600 dark:fill-emerald-400" },
  a: { stroke: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-600 dark:fill-rose-400" },
} as const;

/** A horizontal arrow from (x, y) of signed length len (positive = right), moved by transform only. */
function HArrow({ x, y, len, tone }: { x: number; y: number; len: number; tone: "v" | "a" }) {
  const { stroke, fill } = TONES[tone];
  const show = Math.abs(len) > 0.5;
  return (
    <g className={MOTION} style={{ opacity: show ? 1 : 0 }}>
      <g className={MOTION} style={{ transform: svgTransform({ x, y, sx: len }) }}>
        <line x1={0} y1={0} x2={1} y2={0} vectorEffect="non-scaling-stroke" className={stroke} strokeWidth={2.5} />
      </g>
      <g className={MOTION} style={{ transform: svgTransform({ x: x + len, y, sx: len < 0 ? -1 : 1 }) }}>
        <polygon points="4,0 -4,-4 -4,4" className={fill} />
      </g>
    </g>
  );
}

export default function CetShmReferenceCircle() {
  const id = useId().replace(/:/g, "");
  const dropClip = `shm-drop-${id}`;
  const markClip = `shm-mark-${id}`;
  return (
    <StepFigure
      title="Animation · SHM as the shadow of motion in a circle"
      label="A point goes round a circle of radius A at steady speed; its shadow on a line below moves in simple harmonic motion. At the mean position the shadow moves fastest, omega A, with zero acceleration; at the extremes it stops and its acceleration is greatest, omega squared A, towards the mean position."
      viewBox="0 0 320 206"
      steps={SHM_STEPS}
      note="P (blue) goes round the circle; M (grey) is its shadow. v (green) is M's velocity and a (red) its acceleration, always towards O."
    >
      {(step) => {
        const theta = SHM_THETAS[step];
        const m = pointAt(theta);
        const ro = SHM_READOUTS[step];
        const last = step === SHM_THETAS.length - 1;
        return (
          <g>
            <defs>
              <clipPath id={dropClip} clipPathUnits="userSpaceOnUse">
                <rect x={0} y={0} width={320} height={TRACK_Y} />
              </clipPath>
              <clipPath id={markClip} clipPathUnits="userSpaceOnUse">
                <rect x={0} y={TRACK_Y - 4} width={320} height={8} />
              </clipPath>
            </defs>

            <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {SHM_STEPS[step].title}
            </text>

            {/* The circle, its horizontal diameter and the centre */}
            <circle cx={C.x} cy={C.y} r={R} fill="none" strokeDasharray="4 4" className="stroke-muted-foreground" />
            <line x1={C.x - R} y1={C.y} x2={C.x + R} y2={C.y} strokeDasharray="2 3" className="stroke-muted-foreground" strokeWidth={0.8} />
            <circle cx={C.x} cy={C.y} r={2.5} className="fill-foreground" />

            {/* Earlier positions of P, faint, in the last step */}
            {SHM_THETAS.slice(0, -1).map((t) => {
              const p = pointAt(t);
              return <circle key={t} cx={Math.round(p.x * 100) / 100} cy={Math.round(p.y * 100) / 100} r={3.5} className={`fill-sky-500 dark:fill-sky-400 ${MOTION}`} style={{ opacity: last ? 0.3 : 0 }} />;
            })}

            {/* The line the shadow moves on */}
            <line x1={C.x - R - 10} y1={TRACK_Y} x2={C.x + R + 10} y2={TRACK_Y} className="stroke-foreground" strokeWidth={1.2} />
            {[
              { x: C.x - R, t: "−A" },
              { x: C.x, t: "O" },
              { x: C.x + R, t: "+A" },
            ].map((k) => (
              <g key={k.t}>
                <line x1={k.x} y1={TRACK_Y - 3} x2={k.x} y2={TRACK_Y + 3} className="stroke-foreground" strokeWidth={1} />
                <text x={k.x} y={TRACK_Y + 14} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                  {k.t}
                </text>
              </g>
            ))}
            <text x={C.x} y={TRACK_Y + 25} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              mean position
            </text>
            <text x={20} y={V_Y + 4} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
              v
            </text>
            <text x={20} y={A_Y + 4} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
              a
            </text>

            {/* M's velocity and acceleration */}
            <HArrow x={m.x} y={V_Y} len={ARROW * shadowVelocity(theta)} tone="v" />
            <HArrow x={m.x} y={A_Y} len={ARROW * shadowAccel(theta)} tone="a" />

            {/* P, with its drop line and shadow M hanging straight down from it */}
            <g className={MOTION} style={{ transform: svgTransform({ x: C.x, y: C.y, angle: -theta }) }}>
              <line x1={0} y1={0} x2={R} y2={0} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth={1.2} />
            </g>
            <g clipPath={`url(#${dropClip})`}>
              <g className={MOTION} style={{ transform: svgTransform({ x: C.x, y: C.y, angle: -theta }) }}>
                <g className={MOTION} style={{ transform: svgTransform({ x: R, y: 0, angle: theta }) }}>
                  <line x1={0} y1={0} x2={0} y2={2 * R + 120} strokeDasharray="3 3" className="stroke-muted-foreground" strokeWidth={1} />
                </g>
              </g>
            </g>
            <g clipPath={`url(#${markClip})`}>
              <g className={MOTION} style={{ transform: svgTransform({ x: C.x, y: C.y, angle: -theta }) }}>
                <g className={MOTION} style={{ transform: svgTransform({ x: R, y: 0, angle: theta }) }}>
                  <rect x={-4} y={0} width={8} height={2 * R + 120} className="fill-slate-600 dark:fill-slate-300" />
                </g>
              </g>
            </g>
            <g className={MOTION} style={{ transform: svgTransform({ x: C.x, y: C.y, angle: -theta }) }}>
              <circle cx={R} cy={0} r={5} className="fill-sky-600 stroke-background dark:fill-sky-400" strokeWidth={1.5} />
              <g className={MOTION} style={{ transform: svgTransform({ x: R, y: 0, angle: theta }) }}>
                <text x={8} y={-6} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
                  P
                </text>
              </g>
            </g>

            {/* Read-outs */}
            <g className="text-[11px]">
              <text x={182} y={46} className="fill-muted-foreground tabular-nums">
                {`θ = ωt = ${theta}°`}
              </text>
              <text x={182} y={66} className="fill-foreground font-semibold tabular-nums">
                {ro.x}
              </text>
              <text x={182} y={86} className="fill-emerald-700 font-semibold tabular-nums dark:fill-emerald-300">
                {ro.v}
              </text>
              <text x={182} y={106} className="fill-rose-700 font-semibold tabular-nums dark:fill-rose-300">
                {ro.a}
              </text>
              <text x={182} y={132} className="fill-muted-foreground text-[10px]">
                v = ω√(A² − x²)
              </text>
              <text x={182} y={148} className="fill-muted-foreground text-[10px]">
                a = −ω²x
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
