"use client";

/**
 * Animation: uniform circular motion (concept imat-kin-centripetal-acc). A
 * ball on a string goes round a circle anticlockwise at a steady speed. At
 * every position its velocity v is along the tangent and its acceleration a
 * (and the resultant force F, the string's tension) points to the centre, at
 * right angles to v. In the last step the string breaks: with no force to the
 * centre the ball goes straight on along the tangent, not outwards.
 *
 * The ball, its string and its arrows are one group turned about the centre,
 * so the ball sweeps along the arc between steps; the labels inside it are
 * turned back by the same angle so they stay upright. The positions and
 * directions are exported and pinned by tests/notes-imat-visuals-phys.test.ts,
 * with the concept's worked example (20 m/s on a bend of radius 80 m gives
 * a = v²/r = 5.0 m/s²).
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The concept's worked example: a car at a steady 20 m/s on a bend of radius 80 m. */
export const BEND_EXAMPLE = { v: 20, r: 80 } as const;

/** Centripetal acceleration a = v²/r, in m/s². */
export function centripetalAcc(v: number, r: number): number {
  return (v * v) / r;
}

export const CIRCULAR_STEPS: readonly FigureStep[] = [
  {
    title: "At the top",
    caption:
      "The ball moves round the circle at a steady speed. Its velocity v is along the tangent. Its acceleration a, and the resultant force F (the string's tension), point to the centre.",
  },
  {
    title: "A quarter turn on",
    caption:
      "Same speed, new direction. A change of direction is a change of velocity, so the ball is accelerating even though its speed does not change.",
  },
  {
    title: "Half a turn on",
    caption:
      "a is always at right angles to v, towards the centre, and its size is a = v²/r. For the car at 20 m/s on a bend of radius 80 m: a = 20²/80 = 400/80 = 5.0 m/s².",
  },
  {
    title: "Three quarters on",
    caption:
      "The string keeps pulling the ball towards the centre, so it keeps turning. Double the speed and a becomes four times as large, because a = v²/r.",
  },
  {
    title: "The string breaks",
    caption:
      "No force towards the centre now, so no acceleration: the ball goes straight on along the tangent, at the same speed. It does not fly outwards.",
  },
];

// Geometry (viewBox units).
export const CENTRE = { x: 128, y: 116 } as const;
export const RADIUS = 62;
/** How far the ball travels along the tangent after the string breaks. */
export const BREAK_D = 52;
const V_LEN = 30;
const A_LEN = 28;
const BREAK_STEP = 4;

/**
 * Angle (degrees, SVG sense: negative = anticlockwise on screen) through which
 * the ball's group is turned at each step. The ball starts at local (R, 0).
 */
export const STEP_ANGLES = [-90, -180, -270, -360, -360] as const;

const rot = (p: { x: number; y: number }, deg: number) => {
  const t = (deg * Math.PI) / 180;
  return { x: p.x * Math.cos(t) - p.y * Math.sin(t), y: p.x * Math.sin(t) + p.y * Math.cos(t) };
};

/** True from the step where the string has broken. */
export const isBroken = (step: number) => step >= BREAK_STEP;

/** Local (unturned) position of the ball: at (R, 0), or moved along the tangent once the string breaks. */
function ballLocal(step: number) {
  return { x: RADIUS, y: isBroken(step) ? -BREAK_D : 0 };
}

/** Where the ball is on screen at a step. */
export function ballAt(step: number): { x: number; y: number } {
  const p = rot(ballLocal(step), STEP_ANGLES[step]);
  return { x: CENTRE.x + p.x, y: CENTRE.y + p.y };
}

/** Unit vector of the velocity on screen (anticlockwise motion: local (0, -1)). */
export function velocityDir(step: number): { x: number; y: number } {
  return rot({ x: 0, y: -1 }, STEP_ANGLES[step]);
}

/** Unit vector of the acceleration on screen (local (-1, 0), to the centre), or null once the string breaks. */
export function accelDir(step: number): { x: number; y: number } | null {
  return isBroken(step) ? null : rot({ x: -1, y: 0 }, STEP_ANGLES[step]);
}

type Tone = "v" | "a";
const TONES = {
  v: { stroke: "stroke-emerald-600 dark:stroke-emerald-400", fill: "fill-emerald-600 dark:fill-emerald-400" },
  a: { stroke: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-600 dark:fill-rose-400" },
} as const;

function Arrow({ len, tone, dir }: { len: number; tone: Tone; dir: "up" | "left" }) {
  const { stroke, fill } = TONES[tone];
  // Drawn from the ball outwards: "up" = along local -y (the tangent), "left" = along local -x (to the centre).
  if (dir === "up") {
    return (
      <g>
        <line x1={0} y1={-9} x2={0} y2={-9 - len} className={stroke} strokeWidth={2.5} />
        <polygon points={`0,${-13 - len} -4,${-6 - len} 4,${-6 - len}`} className={fill} />
      </g>
    );
  }
  return (
    <g>
      <line x1={-9} y1={0} x2={-9 - len} y2={0} className={stroke} strokeWidth={2.5} />
      <polygon points={`${-13 - len},0 ${-6 - len},-4 ${-6 - len},4`} className={fill} />
    </g>
  );
}


export default function ImatCircularMotion() {
  return (
    <StepFigure
      title="Animation · motion in a circle at constant speed"
      label="A ball on a string moving round a circle: its velocity is along the tangent and its acceleration points to the centre. When the string breaks it moves off along the tangent."
      viewBox="0 0 320 200"
      steps={CIRCULAR_STEPS}
      note="v (green) is the velocity, along the tangent. a, F (red) is the acceleration and the resultant force, towards the centre. There is no outward force on the ball."
    >
      {(step) => {
        const angle = STEP_ANGLES[step];
        const broken = isBroken(step);
        const release = { x: CENTRE.x + RADIUS, y: CENTRE.y };
        return (
          <g>
            <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {CIRCULAR_STEPS[step].title}
            </text>

            {/* The path and the centre */}
            <circle
              cx={CENTRE.x}
              cy={CENTRE.y}
              r={RADIUS}
              fill="none"
              strokeDasharray="4 4"
              className="stroke-muted-foreground"
            />
            <circle cx={CENTRE.x} cy={CENTRE.y} r={3} className="fill-foreground" />
            <text x={CENTRE.x} y={CENTRE.y + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              centre
            </text>

            {/* Earlier positions, faint, in the final overview. */}
            {STEP_ANGLES.slice(0, 3).map((g) => (
              <g key={g} style={{ transform: svgTransform({ x: CENTRE.x, y: CENTRE.y, angle: g }), opacity: broken ? 0.3 : 0 }} className={MOTION}>
                <g style={{ transform: svgTransform({ x: RADIUS, y: 0 }) }}>
                  <circle r={6} className="fill-slate-500 dark:fill-slate-400" />
                  <Arrow len={V_LEN - 8} tone="v" dir="up" />
                  <Arrow len={A_LEN - 8} tone="a" dir="left" />
                </g>
              </g>
            ))}

            {/* After the break: the tangent it follows, and the outward line it does NOT follow. */}
            <g className={MOTION} style={{ opacity: broken ? 1 : 0 }}>
              <line
                x1={release.x}
                y1={release.y}
                x2={release.x}
                y2={release.y - BREAK_D - 46}
                strokeDasharray="3 3"
                className="stroke-emerald-600 dark:stroke-emerald-400"
              />
              <text x={release.x + 8} y={release.y - 24} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
                along the tangent
              </text>
              <line
                x1={release.x + 10}
                y1={release.y}
                x2={release.x + 64}
                y2={release.y}
                strokeDasharray="2 4"
                className="stroke-muted-foreground"
              />
              <text x={release.x + 12} y={release.y + 14} className="fill-muted-foreground text-[10px]">
                not outwards
              </text>
              <circle cx={release.x} cy={release.y} r={2.5} className="fill-muted-foreground" />
              <text x={release.x + 12} y={release.y + 27} className="fill-muted-foreground text-[10px]">
                string breaks here
              </text>
            </g>

            {/* The ball, its string and its arrows, turned together about the centre. */}
            <g className={MOTION} style={{ transform: svgTransform({ x: CENTRE.x, y: CENTRE.y, angle }) }}>
              <line
                x1={0}
                y1={0}
                x2={RADIUS}
                y2={0}
                className={`stroke-slate-500 dark:stroke-slate-400 ${MOTION}`}
                strokeWidth={1.5}
                style={{ opacity: broken ? 0 : 1 }}
              />
              {/* a and F, at the ball, pointing to the centre */}
              <g className={MOTION} style={{ transform: svgTransform({ x: RADIUS, y: 0 }), opacity: broken ? 0 : 1 }}>
                <Arrow len={A_LEN} tone="a" dir="left" />
                <g className={MOTION} style={{ transform: svgTransform({ x: -24, y: 12, angle: -angle }) }}>
                  <text textAnchor="middle" y={4} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
                    a, F
                  </text>
                </g>
              </g>
              {/* The ball and v, which slide along the tangent when the string breaks */}
              <g className={MOTION} style={{ transform: svgTransform(ballLocal(step)) }}>
                <circle r={7} className="fill-sky-600 stroke-background dark:fill-sky-400" strokeWidth={1.5} />
                <Arrow len={V_LEN} tone="v" dir="up" />
                <g className={MOTION} style={{ transform: svgTransform({ x: 12, y: -30, angle: -angle }) }}>
                  <text textAnchor="middle" y={4} className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
                    v
                  </text>
                </g>
              </g>
            </g>

            {/* The worked example's numbers */}
            <text x={316} y={190} textAnchor="end" className="fill-foreground text-[10px] tabular-nums">
              a = v²/r = 20²/80 = {centripetalAcc(BEND_EXAMPLE.v, BEND_EXAMPLE.r).toFixed(1)} m/s²
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
