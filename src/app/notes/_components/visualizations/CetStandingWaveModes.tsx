"use client";

/**
 * Animation: stationary waves on a string fixed at both ends (concept
 * cetp-standing-wave-basics). The fundamental, the second and the third
 * harmonic in turn, with the nodes (N) and antinodes (A) marked.
 *
 * A stationary wave is y = 2A sin kx cos ωt: the SHAPE is fixed and only its
 * size and sign change in time. So each mode is one path drawn once, and the
 * string swings by scaling that path about the string's rest line
 * (style.transform scale(1, ±1)), never by changing its points. The modes
 * swap by opacity. The last step adds the λ/2 node spacing and the λ/4 node
 * to antinode distance, with the concept's worked example (sin(πx/5): λ = 10 cm,
 * nodes 5 cm apart). Pinned by tests/notes-cet-visuals-phys-b.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

// Geometry (viewBox units): the string runs from X0 to X1 on the rest line AXIS_Y.
export const X0 = 30;
export const X1 = 290;
export const STRING_L = X1 - X0;
export const AXIS_Y = 96;
export const AMP = 36;
const SAMPLES = 120;

/** The three modes drawn: harmonic number p = number of loops. */
export const MODES = [1, 2, 3] as const;
export type Mode = (typeof MODES)[number];

/** Which mode each step shows, and which way the string is swung (+1 up, −1 down). */
export const STEP_MODE: readonly Mode[] = [1, 1, 2, 3, 3];
export const STEP_SIGN: readonly (1 | -1)[] = [1, -1, 1, 1, -1];
/** The step that adds the λ/2 and λ/4 brackets (the overview). */
export const SPACING_STEP = 4;

/** x positions of the nodes of harmonic p: both fixed ends and every L/p between. */
export function nodeXs(p: number): number[] {
  return Array.from({ length: p + 1 }, (_, k) => X0 + (STRING_L * k) / p);
}

/** x positions of the antinodes of harmonic p: halfway between neighbouring nodes. */
export function antinodeXs(p: number): number[] {
  return Array.from({ length: p }, (_, k) => X0 + (STRING_L * (k + 0.5)) / p);
}

/** Wavelength of harmonic p in viewBox units: L = p × λ/2, so λ = 2L/p. */
export function wavelength(p: number): number {
  return (2 * STRING_L) / p;
}

/** Displacement (upwards, viewBox units) of harmonic p at x, at its upper extreme. */
export function modeShape(p: number, x: number): number {
  return AMP * Math.sin((p * Math.PI * (x - X0)) / STRING_L);
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** SVG path of harmonic p at its upper extreme, relative to the rest line (y up = negative). */
export function modePath(p: number, sign: 1 | -1 = 1): string {
  const pts: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const x = X0 + (STRING_L * i) / SAMPLES;
    pts.push(`${i === 0 ? "M" : "L"} ${r2(x)} ${r2(-sign * modeShape(p, x))}`);
  }
  return pts.join(" ");
}

/** The concept's worked example: y = 4 sin(πx/5) cos(100πt), x in cm. k = π/5, so λ = 2π/k = 10 cm. */
export const WORKED = { k: Math.PI / 5, lambdaCm: 10, nodeSpacingCm: 5 } as const;

const MODE_NAMES: Record<Mode, string> = {
  1: "fundamental (1st harmonic)",
  2: "2nd harmonic (1st overtone)",
  3: "3rd harmonic (2nd overtone)",
};

const MODE_FACTS: Record<Mode, string> = {
  1: "2 nodes, 1 antinode: L = λ/2",
  2: "3 nodes, 2 antinodes: L = 2 × λ/2 = λ",
  3: "4 nodes, 3 antinodes: L = 3 × λ/2",
};

export const STANDING_STEPS: readonly FigureStep[] = [
  {
    title: "Fundamental",
    caption:
      "Both fixed ends are nodes (N). The string swings in one loop with an antinode (A) in the middle. One loop is half a wavelength, so L = λ/2.",
  },
  {
    title: "Half a period later",
    caption:
      "Every point is now on the other side, but the nodes have not moved. Nothing travels along the string: the loop only swings up and down.",
  },
  {
    title: "Second harmonic",
    caption:
      "The 1st overtone: two loops, 3 nodes and 2 antinodes. Each loop is still λ/2 long, so L = λ.",
  },
  {
    title: "Third harmonic",
    caption:
      "The 2nd overtone: three loops, 4 nodes and 3 antinodes, so L = 3λ/2. A string with x nodes has x − 1 loops: L = (x − 1)λ/2.",
  },
  {
    title: "Node to node is λ/2",
    caption:
      "Neighbouring nodes are λ/2 apart, and a node to the next antinode is λ/4. For y = 4 sin(πx/5) cos(100πt), x in cm: λ = 2π/k = 10 cm, so the nodes are 5 cm apart.",
  },
];

function Bracket({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g>
      <line x1={from} y1={y} x2={to} y2={y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
      <line x1={from} y1={y - 4} x2={from} y2={y + 4} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
      <line x1={to} y1={y - 4} x2={to} y2={y + 4} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
      <text x={(from + to) / 2} y={y + 13} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
        {label}
      </text>
    </g>
  );
}

export default function CetStandingWaveModes() {
  return (
    <StepFigure
      title="Animation · stationary waves on a string fixed at both ends"
      label="A string fixed at both ends vibrating in its fundamental, second and third harmonics. Nodes stay still at the ends and every half wavelength; antinodes swing hardest halfway between. Neighbouring nodes are half a wavelength apart."
      viewBox="0 0 320 200"
      steps={STANDING_STEPS}
      note="N: node, never moves. A: antinode, swings hardest. The dashed curves are the two extreme shapes of the string."
    >
      {(step) => {
        const mode = STEP_MODE[step];
        const sign = STEP_SIGN[step];
        const n3 = nodeXs(3);
        const a3 = antinodeXs(3);
        return (
          <g>
            <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {STANDING_STEPS[step].title}
            </text>
            <text x={160} y={28} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {MODE_NAMES[mode]}
            </text>

            {/* Rest line and the two clamps */}
            <line x1={X0} y1={AXIS_Y} x2={X1} y2={AXIS_Y} strokeDasharray="2 3" className="stroke-muted-foreground" strokeWidth={0.8} />
            {[X0, X1].map((x) => (
              <rect key={x} x={x === X0 ? x - 8 : x} y={AXIS_Y - 14} width={8} height={28} className="fill-slate-400 dark:fill-slate-500" />
            ))}

            {MODES.map((p) => {
              const on = p === mode;
              return (
                <g key={p} className={MOTION} style={{ opacity: on ? 1 : 0 }}>
                  {/* The two extreme shapes, still */}
                  <g transform={`translate(0 ${AXIS_Y})`}>
                    <path d={modePath(p, 1)} fill="none" strokeDasharray="3 3" className="stroke-sky-400 dark:stroke-sky-600" strokeWidth={1} />
                    <path d={modePath(p, -1)} fill="none" strokeDasharray="3 3" className="stroke-sky-400 dark:stroke-sky-600" strokeWidth={1} />
                  </g>
                  {/* The string itself: one shape, swung by scaling about the rest line */}
                  <g className={MOTION} style={{ transform: svgTransform({ x: 0, y: AXIS_Y, sy: on ? sign : 1 }) }}>
                    <path d={modePath(p, 1)} fill="none" className="stroke-sky-700 dark:stroke-sky-300" strokeWidth={2.5} />
                  </g>
                  {nodeXs(p).map((x) => (
                    <g key={`n${x}`}>
                      <circle cx={x} cy={AXIS_Y} r={3} className="fill-rose-600 dark:fill-rose-400" />
                      <text x={x} y={AXIS_Y + AMP + 14} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
                        N
                      </text>
                    </g>
                  ))}
                  {antinodeXs(p).map((x) => (
                    <text key={`a${x}`} x={x} y={AXIS_Y - AMP - 6} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
                      A
                    </text>
                  ))}
                  <text x={160} y={194} textAnchor="middle" className="fill-foreground text-[11px] tabular-nums">
                    {MODE_FACTS[p]}
                  </text>
                </g>
              );
            })}

            {/* The overview: node spacing λ/2 and node to antinode λ/4 */}
            <g className={MOTION} style={{ opacity: step === SPACING_STEP ? 1 : 0 }}>
              <Bracket from={n3[1]} to={n3[2]} y={AXIS_Y + AMP + 22} label="λ/2" />
              <Bracket from={n3[2]} to={a3[2]} y={AXIS_Y + AMP + 22} label="λ/4" />
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
