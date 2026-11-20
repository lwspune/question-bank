/**
 * Static figure: a ball sunk in a cylindrical jar of water and the rise in
 * level (concept sscm3rc-water), drawn to scale with the worked example: jar
 * radius R = 6 cm, ball radius r = 3 cm. The ball pushes aside its own volume,
 * (4/3)π × 3³ = 36π cm³, which spreads over the jar's base, π × 6² = 36π cm²,
 * as a slab 36π ÷ 36π = 1 cm thick. The starting depth is not given in the
 * example and does not enter the sum, so it carries no number: it is drawn at
 * 9 cm only so the ball is fully under water. Side view (a cut through the
 * middle of the jar). Server component. Pinned by tests/notes-ssc-visuals.test.ts.
 */

/** The worked example. */
export const JAR_R = 6;
export const BALL_R = 3;

export const ballVolumeOverPi = (r: number) => (4 / 3) * r ** 3;
export const baseAreaOverPi = (R: number) => R * R;
/** Rise = volume sunk ÷ base area (the π cancels). */
export const rise = (r: number, R: number) => ballVolumeOverPi(r) / baseAreaOverPi(R);

// Geometry (viewBox units): 11 units per cm, drawn to scale.
export const SCALE = 11;
export const JAR_LEFT = 16;
export const JAR_BOTTOM = 186;
export const JAR_HEIGHT_CM = 14;
/** Drawn starting depth; not part of the sum. */
export const START_DEPTH_CM = 9;
export const LEVEL_BEFORE_Y = JAR_BOTTOM - START_DEPTH_CM * SCALE;
export const LEVEL_AFTER_Y = JAR_BOTTOM - (START_DEPTH_CM + rise(BALL_R, JAR_R)) * SCALE;
export const BALL = { cx: JAR_LEFT + JAR_R * SCALE, cy: JAR_BOTTOM - BALL_R * SCALE, r: BALL_R * SCALE } as const;

export default function SscSphereInCylinder() {
  const w = 2 * JAR_R * SCALE;
  const top = JAR_BOTTOM - JAR_HEIGHT_CM * SCALE;
  const right = JAR_LEFT + w;
  const cx = BALL.cx;
  const tx = 164;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a ball sunk in a jar raises the water
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label="Side view of a cylindrical jar of radius 6 cm with a ball of radius 3 cm resting on the bottom, fully under water. A dashed line marks the water level before the ball went in and a solid line the level after, 1 cm higher. The ball's volume, 4 thirds pi times 3 cubed, is 36 pi cubic centimetres; the jar's base, pi times 6 squared, is 36 pi square centimetres; the rise is 36 pi divided by 36 pi, which is 1 cm."
      >
        {/* Water after the ball went in */}
        <rect x={JAR_LEFT} y={LEVEL_AFTER_Y} width={w} height={JAR_BOTTOM - LEVEL_AFTER_Y} className="fill-sky-200/70 dark:fill-sky-900/60" />
        {/* The slab the ball pushed up */}
        <rect x={JAR_LEFT} y={LEVEL_AFTER_Y} width={w} height={LEVEL_BEFORE_Y - LEVEL_AFTER_Y} className="fill-sky-500/60 dark:fill-sky-400/60" />
        {/* The ball */}
        <circle cx={cx} cy={BALL.cy} r={BALL.r} strokeWidth={1.5} className="fill-amber-300 stroke-amber-700 dark:fill-amber-700 dark:stroke-amber-300" />
        <line x1={cx} y1={BALL.cy} x2={cx + BALL.r} y2={BALL.cy} strokeWidth={1.2} className="stroke-foreground" />
        <text x={cx + BALL.r / 2} y={BALL.cy - 4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          r = 3
        </text>
        {/* Levels */}
        <line x1={JAR_LEFT} y1={LEVEL_BEFORE_Y} x2={right} y2={LEVEL_BEFORE_Y} strokeDasharray="4 3" strokeWidth={1.2} className="stroke-foreground" />
        <line x1={JAR_LEFT} y1={LEVEL_AFTER_Y} x2={right} y2={LEVEL_AFTER_Y} strokeWidth={1.5} className="stroke-sky-700 dark:stroke-sky-300" />
        <text x={JAR_LEFT + 4} y={LEVEL_BEFORE_Y + 11} className="fill-muted-foreground text-[9px]">
          level before
        </text>
        <text x={JAR_LEFT + 4} y={LEVEL_AFTER_Y - 4} className="fill-sky-800 text-[9px] font-semibold dark:fill-sky-200">
          level after
        </text>
        {/* The jar */}
        <path d={`M ${JAR_LEFT} ${top} V ${JAR_BOTTOM} H ${right} V ${top}`} fill="none" strokeWidth={2} className="stroke-foreground" />
        <ellipse cx={cx} cy={top} rx={w / 2} ry={7} fill="none" strokeWidth={1.2} className="stroke-muted-foreground" />
        <line x1={cx} y1={top} x2={right} y2={top} strokeWidth={1.2} className="stroke-foreground" />
        <text x={cx + (w / 4)} y={top - 10} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          R = 6
        </text>
        {/* The rise */}
        <line x1={right + 6} y1={LEVEL_AFTER_Y} x2={right + 6} y2={LEVEL_BEFORE_Y} strokeWidth={1.5} className="stroke-sky-700 dark:stroke-sky-300" />
        <line x1={right + 3} y1={LEVEL_AFTER_Y} x2={right + 9} y2={LEVEL_AFTER_Y} strokeWidth={1.5} className="stroke-sky-700 dark:stroke-sky-300" />
        <line x1={right + 3} y1={LEVEL_BEFORE_Y} x2={right + 9} y2={LEVEL_BEFORE_Y} strokeWidth={1.5} className="stroke-sky-700 dark:stroke-sky-300" />
        <text x={right + 12} y={(LEVEL_AFTER_Y + LEVEL_BEFORE_Y) / 2 + 3.5} className="fill-sky-800 text-[10px] font-bold dark:fill-sky-200">
          rise
        </text>

        {/* The sum */}
        <g className="text-[10px]">
          <text x={tx} y={104} className="fill-foreground font-semibold">
            Water pushed up = ball
          </text>
          <text x={tx} y={122} className="fill-amber-800 dark:fill-amber-200">
            Ball: 4/3 × π × 3³ = 36π cm³
          </text>
          <text x={tx} y={140} className="fill-foreground">
            Base: πR² = π × 6² = 36π cm²
          </text>
          <text x={tx} y={160} className="fill-sky-800 font-semibold dark:fill-sky-200">
            rise = ball ÷ πR²
          </text>
          <text x={tx} y={175} className="fill-sky-800 font-semibold dark:fill-sky-200">
            = 36π ÷ 36π = 1 cm
          </text>
          <text x={tx} y={194} className="fill-muted-foreground text-[9px]">
            The starting depth is not needed.
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Drawn to scale, lengths in cm. A ball fully under water pushes aside its own volume, and that water spreads over the jar&apos;s
        base as a thin slab. So rise = volume of the ball ÷ base area of the jar; the water already in the jar does not enter the sum.
      </p>
    </div>
  );
}
