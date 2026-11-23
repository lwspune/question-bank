"use client";

/**
 * Animation: inlets and an outlet open together (concept ssctwpc-net), with
 * the concept's worked example: A fills the tank in 12 hours, B in 15, and
 * C empties it in 20. Take the tank as 60 units: A adds 5 units an hour,
 * B adds 4, C takes away 3, so 6 units stay each hour (the net rate) and the
 * tank is full after 60 ÷ 6 = 10 hours. The water rises by style.transform
 * (a vertical scale from the tank floor). Pinned by tests/notes-w2-04.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const TANK_UNITS = 60;
/** Hours each pipe needs alone; an outlet's sign is −1. */
export const PIPES = [
  { name: "A", hours: 12, sign: 1 },
  { name: "B", hours: 15, sign: 1 },
  { name: "C", hours: 20, sign: -1 },
] as const;

/** Units a pipe adds (+) or takes away (−) each hour. */
export const unitsPerHour = (p: { hours: number; sign: number }) => (p.sign * TANK_UNITS) / p.hours;
export const NET_RATE = PIPES.reduce((s, p) => s + unitsPerHour(p), 0);
export const FILL_HOURS = TANK_UNITS / NET_RATE;

/** The hour each step shows, and the level (units) then. */
export const STEP_HOURS = [0, 1, 5, 10] as const;
export const levelAt = (hours: number) => Math.min(TANK_UNITS, hours * NET_RATE);

export const PIPE_STEPS: readonly FigureStep[] = [
  {
    title: "The tank as 60 units",
    caption: "Take the tank as 60 units. A adds 60 ÷ 12 = 5 units an hour, B adds 60 ÷ 15 = 4 and C takes away 60 ÷ 20 = 3.",
  },
  { title: "After 1 hour", caption: "5 + 4 − 3 = 6 units stay in the tank. That is the net rate, 6 units an hour." },
  { title: "After 5 hours", caption: "5 × 6 = 30 units: the tank is half full." },
  { title: "After 10 hours", caption: "10 × 6 = 60 units: full. Time = 60 ÷ 6 = 10 hours." },
];

// Geometry (viewBox units).
export const TANK = { x: 112, top: 50, bottom: 186, w: 96 } as const;
const TANK_H = TANK.bottom - TANK.top;
const r2 = (n: number) => Math.round(n * 100) / 100;
/** The water's vertical scale at a level (0 = empty, 1 = full). */
export const waterScale = (units: number) => r2(units / TANK_UNITS);

function Down({ x, y }: { x: number; y: number }) {
  return <path d={`M ${x - 5} ${y - 7} L ${x + 5} ${y - 7} L ${x} ${y} Z`} className="fill-sky-600 dark:fill-sky-400" />;
}

export default function SscPipesNetFill() {
  return (
    <StepFigure
      title="Animation · two inlets and an outlet filling a tank"
      label="A tank of 60 units. Pipe A adds 5 units an hour, pipe B adds 4 and pipe C takes away 3, so the level rises 6 units an hour: 6 after 1 hour, 30 after 5 hours and 60, full, after 10 hours."
      viewBox="0 0 320 216"
      steps={PIPE_STEPS}
      note="Net rate = 5 + 4 − 3 = 6 units an hour, so time = 60 ÷ 6 = 10 hours."
    >
      {(step) => {
        const hours = STEP_HOURS[step];
        const level = levelAt(hours);
        return (
          <g>
            {/* Water, scaled up from the floor of the tank */}
            <rect
              x={0}
              y={-TANK_H}
              width={TANK.w}
              height={TANK_H}
              className={`fill-sky-400/50 dark:fill-sky-500/40 ${MOTION}`}
              style={{ transform: svgTransform({ x: TANK.x, y: TANK.bottom, sy: waterScale(level) }) }}
            />
            {/* Tank walls */}
            <path
              d={`M ${TANK.x} ${TANK.top} L ${TANK.x} ${TANK.bottom} L ${TANK.x + TANK.w} ${TANK.bottom} L ${TANK.x + TANK.w} ${TANK.top}`}
              fill="none"
              strokeWidth={2}
              className="stroke-foreground"
            />
            {/* Level marks */}
            {[0, 30, 60].map((u) => {
              const y = r2(TANK.bottom - (u / TANK_UNITS) * TANK_H);
              return (
                <g key={u}>
                  <line x1={TANK.x - 6} y1={y} x2={TANK.x} y2={y} className="stroke-muted-foreground" />
                  <text x={TANK.x - 9} y={y + 3} textAnchor="end" className="fill-muted-foreground text-[9.5px] tabular-nums">
                    {u}
                  </text>
                </g>
              );
            })}

            {/* Inlets A and B on top */}
            {[
              { x: TANK.x + 26, p: PIPES[0] },
              { x: TANK.x + 70, p: PIPES[1] },
            ].map(({ x, p }) => (
              <g key={p.name}>
                <rect x={x - 4} y={20} width={8} height={22} className="fill-slate-400 dark:fill-slate-500" />
                <Down x={x} y={50} />
                <text x={x} y={14} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
                  {`${p.name}: +${unitsPerHour(p)}`}
                </text>
              </g>
            ))}
            {/* Outlet C at the bottom right */}
            <rect x={TANK.x + TANK.w} y={TANK.bottom - 12} width={30} height={8} className="fill-slate-400 dark:fill-slate-500" />
            <path
              d={`M ${TANK.x + TANK.w + 30} ${TANK.bottom - 14} L ${TANK.x + TANK.w + 38} ${TANK.bottom - 8} L ${TANK.x + TANK.w + 30} ${TANK.bottom - 2} Z`}
              className="fill-rose-600 dark:fill-rose-400"
            />
            <text x={TANK.x + TANK.w + 42} y={TANK.bottom - 4} className="fill-foreground text-[10.5px] font-semibold">
              {`C: −${-unitsPerHour(PIPES[2])}`}
            </text>
            <text x={TANK.x + TANK.w + 42} y={TANK.bottom + 8} className="fill-muted-foreground text-[9.5px]">
              units an hour
            </text>

            {/* Clock and level readout */}
            <g className="text-[11px] tabular-nums">
              <text x={14} y={92} className="fill-muted-foreground">
                hours
              </text>
              <text x={14} y={110} className="fill-foreground text-[16px] font-semibold">
                {hours}
              </text>
              <text x={14} y={136} className="fill-muted-foreground">
                in the tank
              </text>
              <text x={14} y={154} className="fill-sky-700 text-[16px] font-semibold dark:fill-sky-300">
                {`${level} of 60`}
              </text>
            </g>
            <text x={160} y={208} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
              net: 5 + 4 − 3 = 6 units an hour
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
