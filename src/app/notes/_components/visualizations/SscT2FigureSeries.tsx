"use client";

/**
 * Animation: a figure series built one figure at a time (concept
 * ssc2rnvfg-series), with the concept's own example. An arrow points up, then
 * right, then down: it turns 90° clockwise each step, so the fourth points
 * left. The small circle at its tail is white, black, white: it alternates, so
 * the fourth is black. Two parts change at once and each is tracked on its own.
 *
 * The big arrow is ONE group whose style.transform turns it, and its black
 * fill is ONE circle whose opacity changes, so every change animates. The last
 * step shows all four figures. Pinned by tests/notes-w2-09.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const DIRECTIONS = ["up", "right", "down", "left"] as const;
/** Clockwise turn from "up", in degrees, of figure n (0-based). */
export const arrowAngle = (n: number) => 90 * n;
export const direction = (n: number) => DIRECTIONS[(arrowAngle(n) / 90) % 4];
export const circleBlack = (n: number) => n % 2 === 1;

export const SERIES_STEPS: readonly FigureStep[] = [
  { title: "Figure 1", caption: "The arrow points up and the small circle at its tail is white." },
  { title: "Figure 2", caption: "The arrow has turned 90° clockwise to point right, and the circle is now black." },
  { title: "Figure 3", caption: "Another 90° clockwise: the arrow points down, and the circle is white again." },
  {
    title: "Figure 4, the answer",
    caption: "Track each part on its own. The arrow turns 90° clockwise again, to point left; the circle alternates, so it is black.",
  },
];

const THUMB_X = 20;
const THUMB_DX = 76;
const THUMB_W = 60;
const show = (on: boolean) => ({ opacity: on ? 1 : 0 });

/** An arrow pointing up from its tail circle, centred on (0, 0). */
function ArrowShape({ len, black, animated }: { len: number; black: boolean; animated?: boolean }) {
  const h = len / 2;
  return (
    <g>
      <line x1={0} y1={h} x2={0} y2={-h + 6} strokeWidth={animated ? 3 : 2} className="stroke-foreground" />
      <polygon points={`0,${-h} ${-len * 0.17},${-h + len * 0.24} ${len * 0.17},${-h + len * 0.24}`} className="fill-foreground" />
      <circle cx={0} cy={h + len * 0.13} r={len * 0.12} strokeWidth={1.5} className="fill-background stroke-foreground" />
      <circle
        cx={0}
        cy={h + len * 0.13}
        r={len * 0.12}
        className={`fill-foreground ${animated ? MOTION : ""}`}
        style={animated ? show(black) : undefined}
        opacity={animated ? undefined : black ? 1 : 0}
      />
    </g>
  );
}

export default function SscT2FigureSeries() {
  return (
    <StepFigure
      title="Animation · a figure series, one part at a time"
      label="Four figures in a row. Figure 1: an arrow pointing up with a white circle at its tail. Figure 2: pointing right, black circle. Figure 3: pointing down, white circle. The arrow turns 90 degrees clockwise each step and the circle alternates white and black, so figure 4 is an arrow pointing left with a black circle."
      viewBox="0 0 320 232"
      steps={SERIES_STEPS}
    >
      {(step) => (
        <g>
          {/* The series so far */}
          {DIRECTIONS.map((d, i) => (
            <g key={d} className={MOTION} style={show(step >= i)}>
              <rect
                x={THUMB_X + i * THUMB_DX}
                y={8}
                width={THUMB_W}
                height={THUMB_W}
                rx={4}
                strokeWidth={i === 3 ? 1.8 : 1}
                className={i === 3 ? "fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/50 dark:stroke-emerald-400" : "fill-background stroke-border"}
              />
              <g transform={`translate(${THUMB_X + i * THUMB_DX + THUMB_W / 2} ${8 + THUMB_W / 2 - 3}) rotate(${arrowAngle(i)})`}>
                <ArrowShape len={30} black={circleBlack(i)} />
              </g>
              <text x={THUMB_X + i * THUMB_DX + THUMB_W / 2} y={82} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                figure {i + 1}
              </text>
            </g>
          ))}

          {/* The current figure, large, turning */}
          <circle cx={84} cy={152} r={58} strokeDasharray="2 4" className="fill-none stroke-border" />
          <g className={MOTION} style={{ transform: svgTransform({ x: 84, y: 148, angle: arrowAngle(step) }) }}>
            <ArrowShape len={66} black={circleBlack(step)} animated />
          </g>

          {/* What each part does */}
          <text x={168} y={116} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
            arrow: 90° clockwise
          </text>
          {DIRECTIONS.map((d, i) => (
            <text
              key={d}
              x={168 + i * 36}
              y={132}
              className={`text-[10.5px] ${i === step ? "fill-foreground font-semibold" : "fill-muted-foreground"}`}
            >
              {d}
            </text>
          ))}
          <text x={168} y={168} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
            circle: alternates
          </text>
          {DIRECTIONS.map((d, i) => (
            <text
              key={d}
              x={168 + i * 36}
              y={184}
              className={`text-[10.5px] ${i === step ? "fill-foreground font-semibold" : "fill-muted-foreground"}`}
            >
              {circleBlack(i) ? "black" : "white"}
            </text>
          ))}
          <text x={168} y={214} className={`fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300 ${MOTION}`} style={show(step === 3)}>
            figure 4: {direction(3)}, {circleBlack(3) ? "black" : "white"}
          </text>
        </g>
      )}
    </StepFigure>
  );
}
