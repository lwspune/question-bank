"use client";

/**
 * Animation: the week as a wheel of 7 days (concept sscrccca-odd-days), on the
 * worked example "Today is Wednesday. What day will it be after 100 days?".
 * 100 = 14 × 7 + 2: the 14 whole weeks bring the pointer back to Wednesday,
 * and only the 2 odd days move it, to Friday.
 *
 * The pointer is ONE line turned by style.transform (svgTransform), so every
 * step animates; the "+1" and "+2" marks fade in by opacity. Pinned by
 * tests/notes-w2-08.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export const SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** The worked example. */
export const EXAMPLE = { start: "Wednesday", days: 100 } as const;

export const oddDays = (days: number) => days % 7;
export const wholeWeeks = (days: number) => Math.floor(days / 7);

/** The weekday `days` after `start` (negative goes back). */
export function weekdayAfter(start: string, days: number): string {
  const i = DAYS.indexOf(start as (typeof DAYS)[number]);
  return DAYS[(((i + days) % 7) + 7) % 7];
}

export const WEEK_STEPS: readonly FigureStep[] = [
  { title: "Start on Wednesday", caption: "Today is Wednesday. The pointer stands on it." },
  {
    title: "Throw away the whole weeks",
    caption: "100 = 14 × 7 + 2. Each week is one full turn of the wheel, so 14 weeks bring the pointer back to Wednesday.",
  },
  { title: "First odd day", caption: "One day after Wednesday is Thursday." },
  { title: "Second odd day", caption: "The 2 odd days end on Friday, so 100 days after Wednesday is a Friday." },
];

// Geometry (viewBox units).
export const CX = 160;
export const CY = 112;
export const R = 72;
const STEP_DEG = 360 / 7;

/** Where a day sits: Monday at the top, then clockwise. */
export const dayAngle = (i: number) => STEP_DEG * i; // degrees clockwise from the top
const dayXY = (i: number, r: number) => {
  const a = ((dayAngle(i) - 90) * Math.PI) / 180;
  return { x: Math.round((CX + r * Math.cos(a)) * 100) / 100, y: Math.round((CY + r * Math.sin(a)) * 100) / 100 };
};

/** How far the pointer has turned at each step, in days from Wednesday. */
export const POINTER_DAYS = [0, 7, 8, 9] as const;

export default function SscWeekWheel() {
  const wed = DAYS.indexOf("Wednesday");
  const thu = DAYS.indexOf("Thursday");
  const fri = DAYS.indexOf("Friday");
  return (
    <StepFigure
      title="Animation · whole weeks change nothing"
      label="The seven days of the week round a wheel. A pointer starts on Wednesday. 100 days is 14 whole weeks and 2 odd days. Each whole week turns the pointer once round and back to Wednesday, so the 14 weeks change nothing. The 2 odd days move it to Thursday and then Friday. 100 days after Wednesday is a Friday."
      viewBox="0 0 320 222"
      steps={WEEK_STEPS}
    >
      {(step) => {
        const turned = POINTER_DAYS[step];
        const angle = dayAngle(wed + turned) - 90; // the line is drawn pointing right
        return (
          <>
            <circle cx={CX} cy={CY} r={R} fill="none" className="stroke-border" strokeWidth={1.5} />
            {SHORT.map((d, i) => {
              const p = dayXY(i, R + 16);
              const dot = dayXY(i, R);
              const end = (step === 3 && i === fri) || (step === 0 && i === wed);
              return (
                <g key={d}>
                  <circle cx={dot.x} cy={dot.y} r={3} className="fill-muted-foreground" />
                  <text
                    x={p.x}
                    y={p.y + 4}
                    textAnchor="middle"
                    className={
                      end
                        ? "fill-emerald-700 text-[11px] font-bold dark:fill-emerald-300"
                        : "fill-foreground text-[11px]"
                    }
                  >
                    {d}
                  </text>
                </g>
              );
            })}

            {/* +1 and +2 marks inside the wheel */}
            {[thu, fri].map((i, k) => {
              const p = dayXY(i, R - 18);
              return (
                <text
                  key={i}
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  className={`fill-amber-700 text-[11px] font-semibold dark:fill-amber-300 ${MOTION}`}
                  style={{ opacity: step >= 2 + k ? 1 : 0 }}
                >
                  +{k + 1}
                </text>
              );
            })}

            {/* The pointer: one line, turned */}
            <g className={MOTION} style={{ transform: svgTransform({ x: CX, y: CY, angle }) }}>
              <line x1={0} y1={0} x2={R - 30} y2={0} strokeWidth={3} strokeLinecap="round" className="stroke-sky-600 dark:stroke-sky-400" />
              <polygon points={`${R - 24},0 ${R - 33},-5 ${R - 33},5`} className="fill-sky-600 dark:fill-sky-400" />
            </g>
            <circle cx={CX} cy={CY} r={4} className="fill-foreground" />

            <text x={CX} y={12} textAnchor="middle" className="fill-foreground text-[11px]">
              100 days = 14 weeks + 2 odd days
            </text>
            <text
              x={CX}
              y={216}
              textAnchor="middle"
              className={`fill-muted-foreground text-[10px] ${MOTION}`}
              style={{ opacity: step === 1 ? 1 : 0 }}
            >
              14 full turns: back on Wednesday
            </text>
            <text
              x={CX}
              y={216}
              textAnchor="middle"
              className={`fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300 ${MOTION}`}
              style={{ opacity: step === 3 ? 1 : 0 }}
            >
              Wednesday + 2 = Friday
            </text>
          </>
        );
      }}
    </StepFigure>
  );
}
