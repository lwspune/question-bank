"use client";

/**
 * Animation: a dot stepping round the corners of a box (concept
 * sscrnvmo-corners, its worked example). The dot is at the top-left, then the
 * top-right, then the bottom-right, and black, white, black. The rule is one
 * corner clockwise each step and the colour alternating, so the fourth figure
 * has a white dot at the bottom-left. The dot in the big box is ONE element
 * moved by style.transform; its colour changes by opacity. Pinned by
 * tests/notes-w2-20.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

/** Corners in clockwise order. */
export const CLOCKWISE = ["top-left", "top-right", "bottom-right", "bottom-left"] as const;
export type Corner = (typeof CLOCKWISE)[number];
export type Colour = "black" | "white";

/** Place of the dot in figure n (1-based), starting top-left, one corner clockwise a step. */
export const cornerOf = (n: number): Corner => CLOCKWISE[(n - 1) % CLOCKWISE.length];
/** Colour in figure n: black, white, black, ... */
export const colourOf = (n: number): Colour => (n % 2 === 1 ? "black" : "white");

/** The worked example: the three figures given, then the one to find. */
export const GIVEN = [1, 2, 3].map((n) => ({ corner: cornerOf(n), colour: colourOf(n) }));
export const ANSWER = { corner: cornerOf(4), colour: colourOf(4) };

export const DOT_STEPS: readonly FigureStep[] = [
  { title: "Figure 1", caption: "The dot is black, at the top-left corner." },
  { title: "Figure 2", caption: "It moves to the top-right corner and is white." },
  { title: "Figure 3", caption: "It moves to the bottom-right corner and is black again." },
  {
    title: "Name the rule",
    caption: "The place moves one corner clockwise each step. The colour, a separate rule, alternates black, white.",
  },
  { title: "Figure 4", caption: "One corner on from the bottom-right is the bottom-left, and after black comes white." },
];

/** The figure number the big box shows at each step. */
export const STEP_FIGURE = [1, 2, 3, 3, 4] as const;

// Geometry (viewBox units).
export const BIG = { x: 26, y: 30, s: 104 } as const;
export const INSET = 16;
/** Centre of a corner's dot inside a box at (x, y) with side s. */
export function cornerPoint(c: Corner, x: number, y: number, s: number, inset: number) {
  const left = x + inset;
  const right = x + s - inset;
  const top = y + inset;
  const bottom = y + s - inset;
  if (c === "top-left") return { x: left, y: top };
  if (c === "top-right") return { x: right, y: top };
  if (c === "bottom-right") return { x: right, y: bottom };
  return { x: left, y: bottom };
}

export const SMALL = { y: 158, s: 48, xs: [36, 106, 176, 246] } as const;

const BOX = "fill-white stroke-slate-700 dark:fill-slate-100 dark:stroke-slate-300";
const BLACK = "fill-slate-900 dark:fill-slate-900";
const WHITE = "fill-white stroke-slate-900 dark:fill-white dark:stroke-slate-900";
const show = (on: boolean) => ({ opacity: on ? 1 : 0 });

function Dot({ x, y, r, colour }: { x: number; y: number; r: number; colour: Colour }) {
  return <circle cx={x} cy={y} r={r} strokeWidth={1.5} className={colour === "black" ? BLACK : WHITE} />;
}

export default function SscCornerDotSeries() {
  return (
    <StepFigure
      title="Animation · a dot stepping round the corners"
      label="A series of four figures. In figure 1 a black dot is at the top-left corner, in figure 2 a white dot at the top-right, in figure 3 a black dot at the bottom-right. The dot moves one corner clockwise each step and its colour alternates, so figure 4 has a white dot at the bottom-left corner."
      viewBox="0 0 320 236"
      steps={DOT_STEPS}
    >
      {(step) => {
        const n = STEP_FIGURE[step];
        const p = cornerPoint(cornerOf(n), 0, 0, BIG.s, INSET);
        const black = colourOf(n) === "black";
        return (
          <g>
            {/* The big box with the moving dot */}
            <rect x={BIG.x} y={BIG.y} width={BIG.s} height={BIG.s} strokeWidth={1.6} className={BOX} />
            <g className={MOTION} style={{ transform: svgTransform({ x: BIG.x + p.x, y: BIG.y + p.y }) }}>
              <circle cx={0} cy={0} r={10} strokeWidth={1.5} className={`${BLACK} ${MOTION}`} style={show(black)} />
              <circle cx={0} cy={0} r={10} strokeWidth={1.5} className={`${WHITE} ${MOTION}`} style={show(!black)} />
            </g>
            <text x={BIG.x + BIG.s / 2} y={BIG.y - 8} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {`figure ${n}`}
            </text>

            {/* Clockwise path round the corners */}
            <g className={MOTION} style={show(step >= 3)}>
              <path
                d={`M ${BIG.x + 40} ${BIG.y + 16} L ${BIG.x + 64} ${BIG.y + 16} M ${BIG.x + 88} ${BIG.y + 40} L ${BIG.x + 88} ${BIG.y + 64} M ${BIG.x + 64} ${BIG.y + 88} L ${BIG.x + 40} ${BIG.y + 88} M ${BIG.x + 16} ${BIG.y + 64} L ${BIG.x + 16} ${BIG.y + 40}`}
                fill="none"
                strokeWidth={1.6}
                className="stroke-rose-600 dark:stroke-rose-600"
              />
              <path
                d={`M ${BIG.x + 68} ${BIG.y + 16} l -6 -4 l 0 8 Z M ${BIG.x + 88} ${BIG.y + 68} l -4 -6 l 8 0 Z M ${BIG.x + 36} ${BIG.y + 88} l 6 -4 l 0 8 Z M ${BIG.x + 16} ${BIG.y + 36} l -4 6 l 8 0 Z`}
                className="fill-rose-600 dark:fill-rose-600"
              />
            </g>

            {/* The rule */}
            <g className={`text-[10.5px] ${MOTION}`} style={show(step >= 3)}>
              <text x={150} y={56} className="fill-foreground font-semibold">
                Place:
              </text>
              <text x={150} y={70} className="fill-foreground">
                one corner clockwise
              </text>
              <text x={150} y={96} className="fill-foreground font-semibold">
                Colour:
              </text>
              <text x={150} y={110} className="fill-foreground">
                black, white, black, white
              </text>
            </g>

            {/* The series */}
            {SMALL.xs.map((x, i) => {
              const fig = i + 1;
              const q = cornerPoint(cornerOf(fig), x, SMALL.y, SMALL.s, 11);
              const seen = fig <= 3 ? step >= i : step >= 3;
              const answered = fig <= 3 || step >= 4;
              return (
                <g key={fig} className={MOTION} style={show(seen)}>
                  <rect x={x} y={SMALL.y} width={SMALL.s} height={SMALL.s} strokeWidth={1.3} className={BOX} />
                  <g className={MOTION} style={show(answered)}>
                    <Dot x={q.x} y={q.y} r={6} colour={colourOf(fig)} />
                  </g>
                  <text
                    x={x + SMALL.s / 2}
                    y={SMALL.y + SMALL.s / 2 + 6}
                    textAnchor="middle"
                    className={`fill-rose-700 text-[16px] font-semibold dark:fill-rose-700 ${MOTION}`}
                    style={show(!answered)}
                  >
                    ?
                  </text>
                  <text x={x + SMALL.s / 2} y={SMALL.y + SMALL.s + 15} textAnchor="middle" className="fill-foreground text-[10px]">
                    {answered ? `${fig}: ${colourOf(fig)}` : `${fig}: ?`}
                  </text>
                </g>
              );
            })}
          </g>
        );
      }}
    </StepFigure>
  );
}
