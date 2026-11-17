"use client";

/**
 * Animation: conservation of momentum in a collision (concept
 * imat-dyn-collisions), on the concept's worked example. A 2.0 kg trolley A at
 * 6.0 m/s hits a 1.0 kg trolley B at rest and they stick together.
 *
 * Before: momentum 2.0 × 6.0 + 0 = 12 kg m/s. After: 3.0 kg at v, 3.0v = 12, so
 * v = 4.0 m/s (A then carries 8 kg m/s and B 4). A momentum bar under the
 * track splits the total between the trolleys and keeps the same length
 * throughout, inside a dashed outline of 12 kg m/s. Kinetic energy falls from
 * 36 J to 24 J: 12 J lost. The numbers and positions are exported and pinned
 * by tests/notes-imat-visuals-phys.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** The worked example: masses in kg, velocities in m/s (B at rest). */
export const COLLISION = { mA: 2.0, uA: 6.0, mB: 1.0, uB: 0 } as const;

/** Common velocity after they stick: total momentum / total mass. */
export function commonVelocity(): number {
  const { mA, uA, mB, uB } = COLLISION;
  return (mA * uA + mB * uB) / (mA + mB);
}

/** Kinetic energy ½mv², in J. */
export function kineticEnergy(m: number, v: number): number {
  return 0.5 * m * v * v;
}

export const COLLISION_STEPS: readonly FigureStep[] = [
  {
    title: "Before",
    caption:
      "Trolley A (2.0 kg) moves at 6.0 m/s towards trolley B (1.0 kg), at rest. Total momentum = 2.0 × 6.0 + 1.0 × 0 = 12 kg m/s.",
  },
  {
    title: "The collision",
    caption:
      "A pushes B forwards and B pushes A backwards with an equal and opposite force, for the same time. The momentum A loses, B gains.",
  },
  {
    title: "After",
    caption:
      "They stick together and move as 3.0 kg at v: 3.0v = 12, so v = 4.0 m/s. A now carries 2.0 × 4.0 = 8 kg m/s and B 1.0 × 4.0 = 4: still 12 in total.",
  },
  {
    title: "Momentum kept, energy not",
    caption:
      "Momentum is the same before and after, as in every collision. Kinetic energy falls from 36 J to 24 J: 12 J becomes heat and sound, because the trolleys stuck together.",
  },
];

/** Each trolley's velocity (m/s) at each step; null while they are in contact and the forces are shown. */
export function velocitiesAt(step: number): { a: number; b: number } | null {
  if (step === 0) return { a: COLLISION.uA, b: COLLISION.uB };
  if (step === 1) return null;
  const v = commonVelocity();
  return { a: v, b: v };
}

/**
 * Each trolley's momentum (kg m/s) as the bar shows it. During the collision
 * the bar still shows the "before" split: the exchange happens over the
 * contact time and is complete only once they move together.
 */
export function momentumAt(step: number): { a: number; b: number } {
  const v = velocitiesAt(step) ?? velocitiesAt(0)!;
  return { a: COLLISION.mA * v.a, b: COLLISION.mB * v.b };
}

// Geometry (viewBox units).
export const WIDTH = { a: 60, b: 46 } as const;
/** Left edge of each trolley at each step: apart, touching, then moving together. */
export const TROLLEY_X = [
  { a: 14, b: 190 },
  { a: 130, b: 190 },
  { a: 166, b: 226 },
  { a: 202, b: 262 },
] as const;
const BODY_Y = 66;
const BODY_H = 24;
const TRACK_Y = 98;
const ARROW_Y = 54;
/** Arrow length per m/s. */
const PER_MS = 7;
const BAR = { x: 50, y: 132, h: 16 };
/** Bar length per kg m/s. */
export const PER_P = 15;

const fmt1 = (n: number) => n.toFixed(1);

function Trolley({ x, w, name, mass, v, tone }: { x: number; w: number; name: string; mass: number; v: number | null; tone: "sky" | "amber" }) {
  const body = tone === "sky" ? "fill-sky-500 dark:fill-sky-400" : "fill-amber-500 dark:fill-amber-400";
  const len = (v ?? 0) * PER_MS;
  const moving = v !== null && v > 0;
  return (
    <g className={MOTION} style={{ transform: svgTransform({ x, y: 0 }) }}>
      <rect x={0} y={BODY_Y} width={w} height={BODY_H} rx={3} className={body} />
      <text x={w / 2} y={BODY_Y + 16} textAnchor="middle" className="fill-slate-950 text-[10px] font-semibold">
        {name} {fmt1(mass)} kg
      </text>
      {[8, w - 8].map((cx) => (
        <circle key={cx} cx={cx} cy={TRACK_Y - 4} r={4} className="fill-slate-600 dark:fill-slate-300" />
      ))}
      {/* Velocity arrow: a unit line stretched to length, and a head moved to its tip. */}
      <line
        x1={0}
        y1={0}
        x2={1}
        y2={0}
        vectorEffect="non-scaling-stroke"
        strokeWidth={2.5}
        className={`stroke-emerald-600 dark:stroke-emerald-400 ${MOTION}`}
        style={{ transform: svgTransform({ x: 6, y: ARROW_Y, sx: Math.max(len, 0.01) }), opacity: moving ? 1 : 0 }}
      />
      <polygon
        points="6,0 -2,-4 -2,4"
        className={`fill-emerald-600 dark:fill-emerald-400 ${MOTION}`}
        style={{ transform: svgTransform({ x: 6 + len, y: ARROW_Y }), opacity: moving ? 1 : 0 }}
      />
      <text
        x={w / 2}
        y={ARROW_Y - 8}
        textAnchor="middle"
        className={`fill-foreground text-[10px] tabular-nums ${MOTION}`}
        style={{ opacity: v === null ? 0 : 1 }}
      >
        {v === null ? "" : moving ? `${fmt1(v)} m/s` : "at rest"}
      </text>
    </g>
  );
}

export default function ImatCollisionMomentum() {
  return (
    <StepFigure
      title="Animation · momentum before and after a collision"
      label="A 2.0 kilogram trolley at 6.0 metres per second hits a 1.0 kilogram trolley at rest; they stick and move at 4.0 metres per second. The total momentum stays 12 kilogram metres per second."
      viewBox="0 0 320 200"
      steps={COLLISION_STEPS}
      note="The bar under the track is the momentum: the A part and the B part change, but the total always fills the same 12 kg m/s outline."
    >
      {(step) => {
        const pos = TROLLEY_X[step];
        const v = velocitiesAt(step);
        const p = momentumAt(step);
        const during = step === 1;
        const contact = TROLLEY_X[1].b;
        return (
          <g>
            <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {COLLISION_STEPS[step].title}
            </text>

            {/* Track */}
            <line x1={8} y1={TRACK_Y} x2={312} y2={TRACK_Y} className="stroke-muted-foreground" strokeWidth={1.5} />

            <Trolley x={pos.a} w={WIDTH.a} name="A" mass={COLLISION.mA} v={v ? v.a : null} tone="sky" />
            <Trolley x={pos.b} w={WIDTH.b} name="B" mass={COLLISION.mB} v={v ? v.b : null} tone="amber" />

            {/* Equal and opposite forces while in contact */}
            <g className={MOTION} style={{ opacity: during ? 1 : 0 }}>
              <line x1={contact + 4} y1={ARROW_Y} x2={contact + 28} y2={ARROW_Y} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2.5} />
              <polygon points={`${contact + 34},${ARROW_Y} ${contact + 26},${ARROW_Y - 4} ${contact + 26},${ARROW_Y + 4}`} className="fill-rose-600 dark:fill-rose-400" />
              <line x1={contact - 4} y1={ARROW_Y} x2={contact - 28} y2={ARROW_Y} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2.5} />
              <polygon points={`${contact - 34},${ARROW_Y} ${contact - 26},${ARROW_Y - 4} ${contact - 26},${ARROW_Y + 4}`} className="fill-rose-600 dark:fill-rose-400" />
              <text x={contact + 20} y={ARROW_Y - 8} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                F on B
              </text>
              <text x={contact - 20} y={ARROW_Y - 8} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                F on A
              </text>
            </g>

            {/* Momentum bar: A part + B part inside the 12 kg m/s outline */}
            <text x={BAR.x} y={BAR.y - 6} className="fill-muted-foreground text-[10px]">
              momentum (kg m/s)
            </text>
            <rect
              x={0}
              y={0}
              width={1}
              height={BAR.h}
              className={`fill-sky-500 dark:fill-sky-400 ${MOTION}`}
              style={{ transform: svgTransform({ x: BAR.x, y: BAR.y, sx: p.a * PER_P }) }}
            />
            <rect
              x={0}
              y={0}
              width={1}
              height={BAR.h}
              className={`fill-amber-500 dark:fill-amber-400 ${MOTION}`}
              style={{ transform: svgTransform({ x: BAR.x + p.a * PER_P, y: BAR.y, sx: Math.max(p.b * PER_P, 0.01) }) }}
            />
            <rect
              x={BAR.x}
              y={BAR.y}
              width={12 * PER_P}
              height={BAR.h}
              fill="none"
              strokeDasharray="4 3"
              className="stroke-foreground"
            />
            <text
              x={0}
              y={BAR.h - 4}
              textAnchor="middle"
              className={`fill-slate-950 text-[10px] font-semibold tabular-nums ${MOTION}`}
              style={{ transform: svgTransform({ x: BAR.x + (p.a * PER_P) / 2, y: BAR.y }) }}
            >
              A: {p.a}
            </text>
            <text
              x={0}
              y={BAR.h - 4}
              textAnchor="middle"
              className={`fill-slate-950 text-[10px] font-semibold tabular-nums ${MOTION}`}
              style={{ transform: svgTransform({ x: BAR.x + p.a * PER_P + (p.b * PER_P) / 2, y: BAR.y }), opacity: p.b > 0 ? 1 : 0 }}
            >
              B: {p.b}
            </text>
            <text x={BAR.x + 12 * PER_P + 6} y={BAR.y + BAR.h - 4} className="fill-foreground text-[10px] font-semibold tabular-nums">
              total {p.a + p.b}
            </text>

            {/* The summary lines */}
            <text x={160} y={170} textAnchor="middle" className={`fill-foreground text-[10px] tabular-nums ${MOTION}`} style={{ opacity: step >= 2 ? 1 : 0 }}>
              momentum: 12 kg m/s before = 3.0 × 4.0 = 12 kg m/s after
            </text>
            <text x={160} y={186} textAnchor="middle" className={`fill-foreground text-[10px] tabular-nums ${MOTION}`} style={{ opacity: step >= 3 ? 1 : 0 }}>
              kinetic energy: 36 J before, 24 J after (12 J lost)
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
