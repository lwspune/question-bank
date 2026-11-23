/**
 * Static figure: a figure series where an arrow turns by a fixed angle
 * (concept sscrnvtu-rotate, its worked example). The arrow points up, right,
 * down: 90 degrees clockwise each step, so figure 4 points left and figure 5
 * points up again (four turns of 90 degrees bring it back).
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

/** Pointing directions, clockwise from up, every 45 degrees. */
export const DIRECTIONS = ["up", "up-right", "right", "down-right", "down", "down-left", "left", "up-left"] as const;

/** The direction after turning `degrees` clockwise (negative = anticlockwise). */
export function turn(from: (typeof DIRECTIONS)[number], degrees: number): (typeof DIRECTIONS)[number] {
  const i = DIRECTIONS.indexOf(from);
  const steps = Math.round(degrees / 45);
  return DIRECTIONS[(((i + steps) % 8) + 8) % 8];
}

/** The worked example: the three figures given and the turn they show. */
export const GIVEN = ["up", "right", "down"] as const;
export const TURN_DEG = 90;
export const FIGURES = 5;

/** The whole series, figures 1 to 5. */
export const SERIES: readonly (typeof DIRECTIONS)[number][] = Array.from({ length: FIGURES }, (_, i) => turn("up", TURN_DEG * i));

// Geometry (viewBox units).
const BOX = 44;
const GAP = 18;
const X0 = 14;
const BOX_Y = 34;
const boxX = (i: number) => X0 + (BOX + GAP) * i;

export default function SscTurningArrow() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the same turn at every step
      </p>
      <svg
        viewBox="0 0 320 136"
        className="block h-auto w-full"
        role="img"
        aria-label="Five figures in a row, each a box with an arrow. Figure 1 points up, figure 2 right, figure 3 down: a turn of 90 degrees clockwise each step. Turning once more, figure 4 points left, and figure 5 points up again, since four turns of 90 degrees bring the arrow back to where it began. Figures 4 and 5 are the answers."
      >
        {SERIES.map((dir, i) => {
          const x = boxX(i);
          const cx = x + BOX / 2;
          const cy = BOX_Y + BOX / 2;
          const answer = i >= GIVEN.length;
          const angle = DIRECTIONS.indexOf(dir) * 45;
          const tone = answer
            ? "stroke-emerald-600 dark:stroke-emerald-400"
            : "stroke-foreground";
          const fill = answer ? "fill-emerald-600 dark:fill-emerald-400" : "fill-foreground";
          return (
            <g key={i}>
              <text x={cx} y={BOX_Y - 8} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                figure {i + 1}
              </text>
              <rect
                x={x}
                y={BOX_Y}
                width={BOX}
                height={BOX}
                rx={4}
                strokeDasharray={answer ? "4 3" : undefined}
                className={
                  answer
                    ? "fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/60 dark:stroke-emerald-400"
                    : "fill-background stroke-foreground"
                }
              />
              <g transform={`rotate(${angle} ${cx} ${cy})`}>
                <line x1={cx} y1={cy + 13} x2={cx} y2={cy - 8} strokeWidth={2.5} strokeLinecap="round" className={tone} />
                <polygon points={`${cx},${cy - 15} ${cx - 6},${cy - 6} ${cx + 6},${cy - 6}`} className={fill} />
              </g>
              <text
                x={cx}
                y={BOX_Y + BOX + 16}
                textAnchor="middle"
                className={answer ? "fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300" : "fill-foreground text-[11px]"}
              >
                {dir}
              </text>
              {i < FIGURES - 1 && (
                <text x={x + BOX + GAP / 2} y={BOX_Y + BOX / 2 + 4} textAnchor="middle" className="fill-amber-700 text-[9px] font-semibold dark:fill-amber-300">
                  90°
                </text>
              )}
            </g>
          );
        })}
        <text x={160} y={114} textAnchor="middle" className="fill-amber-700 text-[11px] dark:fill-amber-300">
          Each step turns 90° clockwise: up, right, down, left.
        </text>
        <text x={160} y={130} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Figures 4 and 5 (dashed): turn once more each time.
        </text>
      </svg>
    </div>
  );
}
