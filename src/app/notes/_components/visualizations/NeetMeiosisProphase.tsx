"use client";

/**
 * Animation: prophase I of meiosis in its five substages, in the words of the
 * NEET concept "Prophase I: five substages in order" (nbocc-prophase).
 *
 * One homologous pair: the rose chromosome from one parent, the sky one from
 * the other, each of two chromatids (m1, m2 and p1, p2).
 * - Leptotene: the chromosomes become visible as thin threads, apart.
 * - Zygotene: the homologues pair (synapsis) with the synaptonemal complex
 *   between them; the pair is a bivalent (tetrad).
 * - Pachytene: the four chromatids become distinct; a recombination nodule
 *   marks the site of crossing over between the NON-SISTER chromatids m2 and
 *   p1, which swap the segments beyond it.
 * - Diplotene: the synaptonemal complex dissolves and the homologues separate
 *   except at the crossover site, the X-shaped chiasma.
 * - Diakinesis: terminalisation of the chiasma (the homologues now held at
 *   their ends), chromosomes fully condensed, spindle assembled, nucleolus gone
 *   and nuclear envelope breaking down.
 *
 * Each chromatid is two arms (beyond and before the crossover site), each one
 * unit rect turned and stretched by its CSS transform, so the arms slide and
 * swing between steps. Poses exported and pinned by
 * tests/notes-neet-visuals-bio-b.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const PROPHASE_STEPS: readonly FigureStep[] = [
  {
    title: "Leptotene",
    caption: "The chromosomes become gradually visible under the light microscope, like thin threads; compaction continues.",
  },
  {
    title: "Zygotene",
    caption:
      "Homologous chromosomes start to pair (synapsis), along with the synaptonemal complex. The synapsed pair is a bivalent or tetrad.",
  },
  {
    title: "Pachytene",
    caption:
      "The four chromatids of the bivalent become distinct. Recombination nodules appear, the sites where crossing over happens between non-sister chromatids. Recombination is complete by the end of pachytene.",
  },
  {
    title: "Diplotene",
    caption:
      "The synaptonemal complex dissolves and the homologues tend to separate, except at the crossover sites: the X-shaped chiasmata.",
  },
  {
    title: "Diakinesis",
    caption:
      "Terminalisation of chiasmata. The chromosomes are fully condensed and the meiotic spindle is assembled; the nucleolus disappears and the nuclear envelope breaks down.",
  },
];

export type ChromatidId = "m1" | "m2" | "p1" | "p2";
export const CHROMATIDS: readonly { id: ChromatidId; parent: "rose" | "sky" }[] = [
  { id: "m1", parent: "rose" },
  { id: "m2", parent: "rose" },
  { id: "p1", parent: "sky" },
  { id: "p2", parent: "sky" },
];
/** Crossing over is between these two: non-sister chromatids of the homologous pair. */
export const CROSSOVER: readonly [ChromatidId, ChromatidId] = ["m2", "p1"];

export type P = { x: number; y: number };
export type ChromatidPose = {
  /** The crossover level on this chromatid: its two arms start here. */
  pivot: P;
  /** Arm beyond the crossover site (towards the top) and the arm before it. */
  topAngle: number;
  bottomAngle: number;
  topLength: number;
  bottomLength: number;
  thickness: number;
};

export const CENTER_X = 112;
const PIVOT_Y = 100;
export const NUCLEUS = { x: 112, y: 118, r: 76 };
/** The chiasma in diplotene. */
export const CHIASMA: P = { x: CENTER_X, y: PIVOT_Y };
/** Where the homologues are held at their ends after terminalisation. */
export const APEX: P = { x: CENTER_X, y: 64 };

const THICK = [2, 3, 3.5, 4, 6];
const LENGTHS = [
  [32, 72],
  [30, 68],
  [28, 62],
  [26, 58],
  [23, 53],
];

const rad = (deg: number) => (deg * Math.PI) / 180;

export function chromatidPose(step: number, c: number): ChromatidPose {
  const s = Math.max(0, Math.min(4, step));
  const [topLength, bottomLength] = LENGTHS[s];
  const thickness = THICK[s];
  const rose = c < 2;
  const inner = c === 1 || c === 2;
  switch (s) {
    case 0: {
      // Thin threads, the homologues apart; sisters not yet distinct.
      const x = rose ? CENTER_X - 32 : CENTER_X + 32;
      const tilt = rose ? 10 : -10;
      return { pivot: { x, y: PIVOT_Y }, topAngle: -90 - tilt, bottomAngle: 90 - tilt, topLength, bottomLength, thickness };
    }
    case 1: {
      // Paired, the synaptonemal complex between them.
      const x = rose ? CENTER_X - 8 : CENTER_X + 8;
      return { pivot: { x, y: PIVOT_Y }, topAngle: -90, bottomAngle: 90, topLength, bottomLength, thickness };
    }
    case 2: {
      // Four distinct chromatids.
      const x = CENTER_X + [-14, -8, 8, 14][c];
      return { pivot: { x, y: PIVOT_Y }, topAngle: -90, bottomAngle: 90, topLength, bottomLength, thickness };
    }
    case 3: {
      // Homologues apart except at the chiasma, where m2 and p1 cross.
      const x = CENTER_X + [-7, 0, 0, 7][c];
      const leftBottom = rose;
      const leftTop = c === 0 || c === 2; // beyond the chiasma, m1 pairs with p1's swapped segment
      return {
        pivot: { x, y: PIVOT_Y },
        topAngle: leftTop ? -105 : -75,
        bottomAngle: leftBottom ? 105 : 75,
        topLength,
        bottomLength,
        thickness,
      };
    }
    default: {
      // Terminalised: each homologue a straight leg, the two held at their ends.
      const dirAngle = rose ? 104 : 76;
      const d = { x: Math.cos(rad(dirAngle)), y: Math.sin(rad(dirAngle)) };
      const outward = rose ? { x: -d.y, y: d.x } : { x: d.y, y: -d.x };
      const start = {
        x: APEX.x + (rose ? -2 : 2) + (inner ? 0 : 6 * outward.x),
        y: APEX.y + (inner ? 0 : 6 * outward.y),
      };
      return {
        pivot: { x: start.x + topLength * d.x, y: start.y + topLength * d.y },
        topAngle: dirAngle - 180,
        bottomAngle: dirAngle,
        topLength,
        bottomLength,
        thickness,
      };
    }
  }
}

/** The far end of an arm. */
export function armEnd(p: ChromatidPose, arm: "top" | "bottom"): P {
  const a = rad(arm === "top" ? p.topAngle : p.bottomAngle);
  const len = arm === "top" ? p.topLength : p.bottomLength;
  return { x: p.pivot.x + len * Math.cos(a), y: p.pivot.y + len * Math.sin(a) };
}

/** Has crossing over swapped the segments of m2 and p1 yet? (Complete by the end of pachytene.) */
export const swapped = (step: number) => step >= 2;
export const synaptonemalOpacity = (step: number) => (step === 1 || step === 2 ? 1 : 0);
export const noduleOpacity = (step: number) => (step === 2 ? 1 : 0);
export const nucleolusOpacity = (step: number) => (step < 4 ? 1 : 0);
export const envelopeOpacity = (step: number) => (step < 4 ? 1 : 0.35);
export const spindleOpacity = (step: number) => (step === 4 ? 1 : 0);

const FILL = {
  rose: "fill-rose-500 dark:fill-rose-400",
  sky: "fill-sky-500 dark:fill-sky-400",
} as const;

const POLE_L: P = { x: 22, y: 118 };
const POLE_R: P = { x: 200, y: 118 };

function Arm({ pose, arm, tone, opacity = 1 }: { pose: ChromatidPose; arm: "top" | "bottom"; tone: "rose" | "sky"; opacity?: number }) {
  return (
    <rect
      x={0}
      y={-0.5}
      width={1}
      height={1}
      className={`${FILL[tone]} ${MOTION}`}
      style={{
        transform: svgTransform({
          x: pose.pivot.x,
          y: pose.pivot.y,
          angle: arm === "top" ? pose.topAngle : pose.bottomAngle,
          sx: arm === "top" ? pose.topLength : pose.bottomLength,
          sy: pose.thickness,
        }),
        opacity,
      }}
    />
  );
}

const RIBBON_X = [32, 96, 160, 224, 288];
const LABEL = "text-[10px]";
const LEADER = `stroke-muted-foreground ${MOTION}`;

export default function NeetMeiosisProphase() {
  return (
    <StepFigure
      title="Animation · prophase I of meiosis"
      label="One homologous pair through the five substages of prophase I: thin threads in leptotene, pairing with the synaptonemal complex in zygotene, crossing over at a recombination nodule in pachytene, an X-shaped chiasma in diplotene, and terminalisation in diakinesis"
      viewBox="0 0 320 212"
      steps={PROPHASE_STEPS}
      note="Rose: the chromosome from one parent; sky: its homologue from the other, each of two chromatids. Crossing over swaps segments between non-sister chromatids."
    >
      {(step) => (
        <g>
          {/* The five substages, the current one marked. */}
          {PROPHASE_STEPS.map((s, i) => (
            <text
              key={s.title}
              x={RIBBON_X[i]}
              y={14}
              textAnchor="middle"
              className={`${LABEL} ${i === step ? "fill-indigo-700 font-bold dark:fill-indigo-300" : "fill-muted-foreground"}`}
            >
              {s.title}
            </text>
          ))}
          <rect
            x={-26}
            y={18}
            width={52}
            height={2}
            className={`fill-indigo-600 dark:fill-indigo-300 ${MOTION}`}
            style={{ transform: svgTransform({ x: RIBBON_X[step], y: 0 }) }}
          />

          {/* Nuclear envelope and nucleolus. */}
          <circle
            cx={NUCLEUS.x}
            cy={NUCLEUS.y}
            r={NUCLEUS.r}
            strokeWidth={1.5}
            strokeDasharray={step === 4 ? "6 6" : undefined}
            className={`fill-indigo-50/60 stroke-indigo-500 dark:fill-indigo-950/30 dark:stroke-indigo-300 ${MOTION}`}
            style={{ opacity: envelopeOpacity(step) }}
          />
          <circle cx={62} cy={152} r={8} className={`fill-violet-300 dark:fill-violet-700 ${MOTION}`} style={{ opacity: nucleolusOpacity(step) }} />

          {/* Spindle. */}
          <g className={MOTION} style={{ opacity: spindleOpacity(step) }}>
            {[0, 1].map((c) => {
              const end = chromatidPose(4, c).pivot;
              return <line key={`l${c}`} x1={POLE_L.x} y1={POLE_L.y} x2={end.x} y2={end.y + 12} strokeWidth={0.75} className="stroke-slate-400 dark:stroke-slate-500" />;
            })}
            {[2, 3].map((c) => {
              const end = chromatidPose(4, c).pivot;
              return <line key={`r${c}`} x1={POLE_R.x} y1={POLE_R.y} x2={end.x} y2={end.y + 12} strokeWidth={0.75} className="stroke-slate-400 dark:stroke-slate-500" />;
            })}
            <circle cx={POLE_L.x} cy={POLE_L.y} r={3.5} className="fill-amber-500" />
            <circle cx={POLE_R.x} cy={POLE_R.y} r={3.5} className="fill-amber-500" />
          </g>

          {/* Synaptonemal complex: a ladder between the paired homologues. */}
          <g className={MOTION} style={{ opacity: synaptonemalOpacity(step) }}>
            <line x1={CENTER_X - 3} y1={72} x2={CENTER_X - 3} y2={160} strokeWidth={1} className="stroke-amber-600 dark:stroke-amber-400" />
            <line x1={CENTER_X + 3} y1={72} x2={CENTER_X + 3} y2={160} strokeWidth={1} className="stroke-amber-600 dark:stroke-amber-400" />
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1={CENTER_X - 3} y1={76 + i * 7.5} x2={CENTER_X + 3} y2={76 + i * 7.5} strokeWidth={1} className="stroke-amber-600 dark:stroke-amber-400" />
            ))}
          </g>

          {/* Chromatids. The swapped segments of m2 and p1 fade in over their originals. */}
          {CHROMATIDS.map((c, i) => {
            const pose = chromatidPose(step, i);
            const crossed = c.id === "m2" || c.id === "p1";
            const other = c.parent === "rose" ? "sky" : "rose";
            return (
              <g key={c.id}>
                <Arm pose={pose} arm="bottom" tone={c.parent} />
                <Arm pose={pose} arm="top" tone={c.parent} opacity={crossed && swapped(step) ? 0 : 1} />
                {crossed && <Arm pose={pose} arm="top" tone={other} opacity={swapped(step) ? 1 : 0} />}
              </g>
            );
          })}

          {/* Recombination nodule. */}
          <circle cx={CHIASMA.x} cy={CHIASMA.y} r={3.5} strokeWidth={1} className={`fill-amber-300 stroke-amber-800 dark:fill-amber-500 dark:stroke-amber-100 ${MOTION}`} style={{ opacity: noduleOpacity(step) }} />

          {/* Labels. */}
          <g className={MOTION} style={{ opacity: step === 0 ? 1 : 0 }}>
            <text x={204} y={110} className={`${LABEL} fill-foreground`}>thin threads</text>
            <line x1={202} y1={107} x2={150} y2={110} strokeWidth={0.75} className={LEADER} />
          </g>
          <g className={MOTION} style={{ opacity: step === 4 ? 1 : 0 }}>
            <text x={204} y={66} className={`${LABEL} fill-foreground font-semibold`}>terminalisation</text>
            <line x1={202} y1={63} x2={APEX.x + 6} y2={APEX.y} strokeWidth={0.75} className={LEADER} />
            <text x={6} y={140} className={`${LABEL} fill-muted-foreground`}>spindle</text>
            <text x={204} y={150} className={`${LABEL} fill-foreground`}>fully condensed</text>
            <line x1={202} y1={146} x2={134} y2={112} strokeWidth={0.75} className={LEADER} />
          </g>
          <g className={MOTION} style={{ opacity: synaptonemalOpacity(step) }}>
            <text x={204} y={88} className={`${LABEL} fill-foreground font-semibold`}>synaptonemal</text>
            <text x={204} y={100} className={`${LABEL} fill-foreground font-semibold`}>complex</text>
            <line x1={202} y1={95} x2={CENTER_X + 4} y2={145} strokeWidth={0.75} className={LEADER} />
          </g>
          <g className={MOTION} style={{ opacity: step === 1 ? 1 : 0 }}>
            <text x={204} y={170} className={`${LABEL} fill-foreground`}>bivalent</text>
            <text x={204} y={182} className={`${LABEL} fill-foreground`}>(tetrad)</text>
          </g>
          <g className={MOTION} style={{ opacity: noduleOpacity(step) }}>
            <text x={204} y={124} className={`${LABEL} fill-foreground font-semibold`}>recombination</text>
            <text x={204} y={136} className={`${LABEL} fill-foreground font-semibold`}>nodule</text>
            <line x1={202} y1={128} x2={CHIASMA.x + 4} y2={CHIASMA.y + 1} strokeWidth={0.75} className={LEADER} />
            <text x={204} y={170} className={`${LABEL} fill-foreground`}>crossing over</text>
            <text x={204} y={182} className={`${LABEL} fill-muted-foreground`}>(non-sister)</text>
          </g>
          <g className={MOTION} style={{ opacity: step === 3 ? 1 : 0 }}>
            <text x={204} y={124} className={`${LABEL} fill-foreground font-semibold`}>chiasma</text>
            <line x1={202} y1={121} x2={CHIASMA.x + 5} y2={CHIASMA.y} strokeWidth={0.75} className={LEADER} />
          </g>
          <g className={MOTION} style={{ opacity: nucleolusOpacity(step) }}>
            <text x={4} y={186} className={`${LABEL} fill-muted-foreground`}>nucleolus</text>
            <line x1={30} y1={178} x2={57} y2={158} strokeWidth={0.75} className={LEADER} />
          </g>
          <text x={204} y={206} className={`${LABEL} fill-muted-foreground`}>nuclear envelope</text>
          <line x1={210} y1={197} x2={168} y2={170} strokeWidth={0.75} className="stroke-muted-foreground" />
        </g>
      )}
    </StepFigure>
  );
}
