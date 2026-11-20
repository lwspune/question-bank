"use client";

/**
 * Animation: a ferromagnet's hysteresis loop traced in order (concept
 * cetp-mm-hysteresis-shielding). B lags behind H: brought back to H = 0, the
 * B that remains is the retentivity (where the loop crosses the B-axis); the
 * reverse H that brings B to zero is the coercivity (where it crosses the
 * H-axis), the concept's trap. The last step adds a soft-iron loop: also a high
 * retentivity, but a low coercivity (a narrow loop), right for an
 * electromagnet, beside the wide loop of a permanent-magnet steel (both high).
 *
 * The concept gives no numbers, so the loops are drawn in arbitrary units with
 * tanh branches: steel B = tanh((H ± 1.4)/1), soft iron B = tanh((H ± 0.3)/0.2).
 * The dot is one circle moved only by style.transform (svgTransform). Pinned by
 * tests/notes-w2-02.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type Loop = { hc: number; w: number };

/** Steel (permanent magnet) and soft iron (electromagnet), arbitrary units. */
export const STEEL: Loop = { hc: 1.4, w: 1 };
export const SOFT_IRON: Loop = { hc: 0.3, w: 0.2 };
/** Largest |H| drawn. */
export const H_MAX = 4;

/** B on the branch traced as H falls (it crosses H = 0 at the retentivity). */
export const falling = (l: Loop, H: number) => Math.tanh((H + l.hc) / l.w);
/** B on the branch traced as H rises. */
export const rising = (l: Loop, H: number) => Math.tanh((H - l.hc) / l.w);
/** The first magnetisation, from B = 0 at H = 0, meeting the rising branch at H_MAX. */
export const firstCurve = (H: number) => Math.tanh((H * (H_MAX - STEEL.hc)) / (H_MAX * STEEL.w));

/** B left at H = 0. */
export const retentivity = (l: Loop) => falling(l, 0);
/** Reverse H that brings B to zero on the falling branch (a negative H). */
export const coercivity = (l: Loop) => -l.hc;

export const LOOP_STEPS: readonly FigureStep[] = [
  {
    title: "Magnetise from zero",
    caption: "H is increased from zero and B rises with it, more and more slowly.",
  },
  {
    title: "Bring H back to zero: the retentivity",
    caption: "B does not fall back to zero. The B left when H = 0 is the retentivity, where the loop crosses the B-axis.",
  },
  {
    title: "Reverse H: the coercivity",
    caption: "A reverse H is needed to bring B to zero. That H is the coercivity, where the loop crosses the H-axis.",
  },
  {
    title: "Round the other side",
    caption: "Made more negative still, H drives B the other way. B keeps lagging behind H.",
  },
  {
    title: "The whole loop, and soft iron",
    caption:
      "H taken back up closes the loop. Soft iron also keeps a high retentivity but needs only a small reverse H: a narrow loop, easy to magnetise and demagnetise, right for an electromagnet. A permanent magnet needs both high.",
  },
];

// Geometry (viewBox units).
export const CENTRE = { x: 160, y: 122 } as const;
export const H_SCALE = 32;
export const B_SCALE = 72;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const xOf = (H: number) => r2(CENTRE.x + H * H_SCALE);
export const yOf = (B: number) => r2(CENTRE.y - B * B_SCALE);

function path(f: (H: number) => number, from: number, to: number, n = 60): string {
  const pts: string[] = [];
  for (let k = 0; k <= n; k++) {
    const H = from + ((to - from) * k) / n;
    pts.push(`${k === 0 ? "M" : "L"} ${xOf(H)} ${yOf(f(H))}`);
  }
  return pts.join(" ");
}

/** Where the dot sits at each step: (H, B). */
export function dotAt(step: number): { H: number; B: number } {
  switch (step) {
    case 0:
      return { H: H_MAX, B: firstCurve(H_MAX) };
    case 1:
      return { H: 0, B: retentivity(STEEL) };
    case 2:
      return { H: coercivity(STEEL), B: 0 };
    case 3:
      return { H: -H_MAX, B: falling(STEEL, -H_MAX) };
    default:
      return { H: H_MAX, B: rising(STEEL, H_MAX) };
  }
}

const show = (on: boolean) => ({ opacity: on ? 1 : 0 });

export default function CetHysteresisLoop() {
  const br = retentivity(STEEL);
  const hc = coercivity(STEEL);
  const steelFallA = path((H) => falling(STEEL, H), H_MAX, 0);
  const steelFallB = path((H) => falling(STEEL, H), 0, hc);
  const steelFallC = path((H) => falling(STEEL, H), hc, -H_MAX);
  const steelRise = path((H) => rising(STEEL, H), -H_MAX, H_MAX);
  const first = path(firstCurve, 0, H_MAX);
  const soft = `${path((H) => falling(SOFT_IRON, H), H_MAX, -H_MAX, 120)} ${path((H) => rising(SOFT_IRON, H), -H_MAX, H_MAX, 120).replace(/^M/, "L")}`;
  const line = "fill-none stroke-sky-600 dark:stroke-sky-400";

  return (
    <StepFigure
      title="Animation · tracing a hysteresis loop"
      label="Hysteresis loop of a ferromagnet, B against H. From zero, B rises with H. When H returns to zero, B is still positive: the retentivity, on the B-axis. A reverse H, the coercivity on the H-axis, brings B to zero. The loop then goes round the other side and closes. A narrow soft-iron loop has a similar retentivity but a much smaller coercivity."
      viewBox="0 0 320 214"
      steps={LOOP_STEPS}
      note="Not to scale: no values, only the shape. Retentivity is on the B-axis (H = 0), coercivity on the H-axis (B = 0)."
    >
      {(step) => {
        const d = dotAt(step);
        return (
          <g>
            {/* Axes */}
            <line x1={xOf(-H_MAX) - 6} y1={CENTRE.y} x2={xOf(H_MAX) + 8} y2={CENTRE.y} className="stroke-muted-foreground" />
            <line x1={CENTRE.x} y1={yOf(-1) + 12} x2={CENTRE.x} y2={yOf(1) - 18} className="stroke-muted-foreground" />
            <text x={xOf(H_MAX) + 6} y={CENTRE.y - 5} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
              H
            </text>
            <text x={CENTRE.x + 5} y={yOf(1) - 10} className="fill-foreground text-[11px] font-semibold">
              B
            </text>

            {/* Soft iron, last step only */}
            <path d={soft} strokeDasharray="4 3" strokeWidth={1.6} className={`fill-none stroke-amber-600 dark:stroke-amber-400 ${MOTION}`} style={show(step >= 4)} />

            {/* Steel loop, revealed in order */}
            <path d={first} strokeDasharray="3 3" strokeWidth={1.4} className={`fill-none stroke-muted-foreground ${MOTION}`} />
            <path d={steelFallA} strokeWidth={2.4} className={`${line} ${MOTION}`} style={show(step >= 1)} />
            <path d={steelFallB} strokeWidth={2.4} className={`${line} ${MOTION}`} style={show(step >= 2)} />
            <path d={steelFallC} strokeWidth={2.4} className={`${line} ${MOTION}`} style={show(step >= 3)} />
            <path d={steelRise} strokeWidth={2.4} className={`${line} ${MOTION}`} style={show(step >= 4)} />

            {/* Retentivity and coercivity */}
            <g className={MOTION} style={show(step >= 1)}>
              <circle cx={CENTRE.x} cy={yOf(br)} r={3} className="fill-rose-600 dark:fill-rose-400" />
              <text x={CENTRE.x - 6} y={yOf(br) - 4} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
                retentivity
              </text>
            </g>
            <g className={MOTION} style={show(step >= 2)}>
              <circle cx={xOf(hc)} cy={CENTRE.y} r={3} className="fill-violet-600 dark:fill-violet-400" />
              <text x={xOf(hc) - 4} y={CENTRE.y - 6} textAnchor="end" className="fill-violet-700 text-[11px] font-semibold dark:fill-violet-300">
                coercivity
              </text>
            </g>

            {/* Legend, last step */}
            <g className={`text-[10px] ${MOTION}`} style={show(step >= 4)}>
              <line x1={206} y1={180} x2={222} y2={180} strokeWidth={2.4} className="stroke-sky-600 dark:stroke-sky-400" />
              <text x={226} y={183.5} className="fill-sky-700 dark:fill-sky-300">
                steel: wide loop
              </text>
              <line x1={206} y1={196} x2={222} y2={196} strokeDasharray="4 3" strokeWidth={1.6} className="stroke-amber-600 dark:stroke-amber-400" />
              <text x={226} y={199.5} className="fill-amber-700 dark:fill-amber-300">
                soft iron: narrow
              </text>
            </g>

            {/* The moving dot */}
            <circle cx={0} cy={0} r={5} className={`fill-foreground ${MOTION}`} style={{ transform: svgTransform({ x: xOf(d.H), y: yOf(d.B) }) }} />
          </g>
        );
      }}
    </StepFigure>
  );
}
