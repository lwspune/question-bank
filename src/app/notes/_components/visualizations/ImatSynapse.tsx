"use client";

/**
 * Animation: a cholinergic synapse, in the six steps of the IMAT concept's own
 * table (action potential arrives, Ca²⁺ enters, vesicles release ACh by
 * exocytosis, ACh crosses and binds receptors, Na⁺ enters and the membrane
 * depolarises, acetylcholinesterase hydrolyses ACh).
 *
 * Every ion, vesicle and ACh molecule is one shape whose transform changes
 * between steps. The positions are exported and pinned by
 * tests/notes-imat-visuals-physio.test.ts: vesicles and their ACh start in the
 * presynaptic knob only, receptors sit on the postsynaptic membrane only (the
 * concept's reason the synapse is one way), Ca²⁺ goes into the knob and Na⁺
 * into the postsynaptic cell, never the other way round.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const SYNAPSE_STEPS: readonly FigureStep[] = [
  { title: "Impulse arrives", caption: "An action potential arrives at the presynaptic knob." },
  {
    title: "Calcium enters",
    caption: "Voltage-gated Ca²⁺ channels open and Ca²⁺ diffuses into the knob.",
  },
  {
    title: "Exocytosis",
    caption: "Vesicles fuse with the membrane and release acetylcholine (ACh) into the cleft by exocytosis.",
  },
  {
    title: "ACh binds",
    caption: "ACh diffuses across the cleft and binds receptors on the postsynaptic membrane.",
  },
  {
    title: "Sodium enters",
    caption:
      "Na⁺ channels linked to the receptors open; Na⁺ enters and the membrane depolarises. At threshold a new action potential starts.",
  },
  {
    title: "ACh broken down",
    caption:
      "Acetylcholinesterase hydrolyses ACh, ending the signal. The choline is taken back into the knob and ACh is remade using ATP.",
  },
];

export type P = { x: number; y: number };

/** Membranes (y) and the knob's flat lower edge. */
export const PRE_MEMBRANE_Y = 112;
export const POST_MEMBRANE_Y = 160;

export const CA_CHANNELS: readonly P[] = [
  { x: 84, y: PRE_MEMBRANE_Y },
  { x: 236, y: PRE_MEMBRANE_Y },
];
/** ACh receptors (with their Na⁺ channels): on the postsynaptic membrane only. */
export const RECEPTORS: readonly P[] = [
  { x: 124, y: POST_MEMBRANE_Y },
  { x: 160, y: POST_MEMBRANE_Y },
  { x: 196, y: POST_MEMBRANE_Y },
];
export const ENZYMES: readonly P[] = [
  { x: 142, y: 157 },
  { x: 178, y: 157 },
];
const VESICLES_HOME: readonly P[] = [
  { x: 124, y: 66 },
  { x: 160, y: 78 },
  { x: 196, y: 66 },
];
const VESICLE_R = 11;

export function vesiclePose(step: number, i: number): P & { opacity: number } {
  const home = VESICLES_HOME[i];
  if (step < 2) return { ...home, opacity: 1 };
  if (step === 2) return { x: home.x, y: PRE_MEMBRANE_Y - VESICLE_R + 1, opacity: 1 };
  if (step < 5) return { x: home.x, y: PRE_MEMBRANE_Y - VESICLE_R + 1, opacity: 0 };
  // Refilled: ACh is remade and packed again.
  return { ...home, opacity: 0.5 };
}

/** ACh molecule k (0 or 1) of vesicle i. */
export function achPose(step: number, i: number, k: 0 | 1): P & { opacity: number } {
  const s = k === 0 ? -1 : 1;
  const v = VESICLES_HOME[i];
  if (step < 2) return { x: v.x + s * 4, y: v.y + s * 3, opacity: 1 };
  if (step === 2) return { x: v.x + s * 5, y: 126, opacity: 1 };
  if (step < 5) return { x: RECEPTORS[i].x + s * 4, y: POST_MEMBRANE_Y - 5, opacity: 1 };
  const e = i === 0 || (i === 1 && k === 0) ? ENZYMES[0] : ENZYMES[1];
  return { x: e.x + s * 4, y: e.y - 1, opacity: 0.35 };
}

const CA_OUT: readonly P[] = [
  { x: 78, y: 124 },
  { x: 90, y: 127 },
  { x: 230, y: 127 },
  { x: 242, y: 124 },
];
const CA_IN: readonly P[] = [
  { x: 80, y: 96 },
  { x: 92, y: 90 },
  { x: 228, y: 90 },
  { x: 240, y: 96 },
];
export function caPose(step: number, j: number): P {
  return step >= 1 ? CA_IN[j] : CA_OUT[j];
}

const NA_OUT: readonly P[] = [
  { x: 110, y: 144 },
  { x: 142, y: 142 },
  { x: 178, y: 142 },
  { x: 210, y: 144 },
];
const NA_IN: readonly P[] = [
  { x: 122, y: 184 },
  { x: 150, y: 190 },
  { x: 170, y: 190 },
  { x: 198, y: 184 },
];
export function naPose(step: number, j: number): P {
  return step >= 4 ? NA_IN[j] : NA_OUT[j];
}

const KNOB_PATH =
  "M 148 0 L 148 26 C 90 30 70 60 72 92 L 72 112 L 248 112 L 248 92 C 250 60 230 30 172 26 L 172 0";

const LABEL = "fill-foreground text-[10px]";
const LEADER = "stroke-muted-foreground";

export default function ImatSynapse() {
  return (
    <StepFigure
      title="Animation · a cholinergic synapse"
      label="A cholinergic synapse: an impulse arrives, calcium enters the knob, vesicles release acetylcholine, it crosses the cleft and binds receptors, sodium enters the postsynaptic cell, and acetylcholinesterase breaks the acetylcholine down"
      viewBox="0 0 320 250"
      steps={SYNAPSE_STEPS}
      note="ACh: acetylcholine. AChE: acetylcholinesterase. Vesicles of ACh are only in the presynaptic knob and the receptors only on the postsynaptic membrane: that is why the signal goes one way."
    >
      {(step) => (
        <g>
          {/* Presynaptic knob and postsynaptic cell. */}
          <path d={KNOB_PATH} strokeWidth={2} className="fill-amber-50 stroke-amber-600 dark:fill-amber-950/40 dark:stroke-amber-400" />
          <rect x={64} y={POST_MEMBRANE_Y} width={192} height={56} rx={4} strokeWidth={2} className="fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400" />

          {/* Impulse arriving down the axon. */}
          <g className={MOTION} style={{ opacity: step === 0 ? 1 : 0 }}>
            <line x1={160} y1={3} x2={160} y2={20} strokeWidth={3} className="stroke-indigo-600 dark:stroke-indigo-400" />
            <polygon points="153,19 167,19 160,29" className="fill-indigo-600 dark:fill-indigo-400" />
            <text x={178} y={16} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
              impulse
            </text>
          </g>

          {/* Ca²⁺ channels on the presynaptic membrane. */}
          {CA_CHANNELS.map((c) => (
            <rect key={c.x} x={c.x - 5} y={c.y - 6} width={10} height={12} rx={2} className="fill-teal-600 dark:fill-teal-400" />
          ))}

          {/* Receptors (two halves round a channel) and acetylcholinesterase. */}
          {RECEPTORS.map((r) => (
            <g key={r.x}>
              <rect x={r.x - 7} y={r.y - 6} width={5} height={14} rx={1.5} className="fill-sky-600 dark:fill-sky-400" />
              <rect x={r.x + 2} y={r.y - 6} width={5} height={14} rx={1.5} className="fill-sky-600 dark:fill-sky-400" />
            </g>
          ))}
          {ENZYMES.map((e) => (
            <ellipse key={e.x} cx={e.x} cy={e.y} rx={6} ry={4} className="fill-rose-500 dark:fill-rose-400" />
          ))}

          {/* Vesicles. */}
          {VESICLES_HOME.map((_, i) => {
            const p = vesiclePose(step, i);
            return (
              <circle
                key={`v-${i}`}
                r={VESICLE_R}
                strokeWidth={1.5}
                className={`fill-violet-100 stroke-violet-600 dark:fill-violet-950/50 dark:stroke-violet-400 ${MOTION}`}
                style={{ transform: svgTransform(p), opacity: p.opacity }}
              />
            );
          })}

          {/* ACh molecules. */}
          {VESICLES_HOME.flatMap((_, i) =>
            ([0, 1] as const).map((k) => {
              const p = achPose(step, i, k);
              return (
                <circle
                  key={`a-${i}-${k}`}
                  r={3}
                  className={`fill-violet-600 dark:fill-violet-300 ${MOTION}`}
                  style={{ transform: svgTransform(p), opacity: p.opacity }}
                />
              );
            }),
          )}
          {(() => {
            const p = achPose(step, 1, 1);
            return (
              <text
                x={0}
                y={-6}
                textAnchor="middle"
                className={`fill-violet-700 text-[10px] font-semibold dark:fill-violet-300 ${MOTION}`}
                style={{ transform: svgTransform(p), opacity: step >= 2 && step <= 4 ? 1 : 0 }}
              >
                ACh
              </text>
            );
          })()}

          {/* Ca²⁺ ions. */}
          {CA_OUT.map((_, j) => (
            <g key={`ca-${j}`} className={MOTION} style={{ transform: svgTransform(caPose(step, j)) }}>
              <circle r={3.5} className="fill-teal-500 dark:fill-teal-300" />
            </g>
          ))}
          {/* Its label: right of the outer ion in the cleft, above the inner pair in the knob (clear of the vesicles). */}
          <text
            x={0}
            y={3.5}
            textAnchor="middle"
            className={`fill-teal-700 text-[10px] font-semibold dark:fill-teal-300 ${MOTION}`}
            style={{ transform: svgTransform(step >= 1 ? { x: 234, y: 78 } : { x: CA_OUT[3].x + 18, y: CA_OUT[3].y }) }}
          >
            Ca²⁺
          </text>

          {/* Na⁺ ions. */}
          {NA_OUT.map((_, j) => (
            <g key={`na-${j}`} className={MOTION} style={{ transform: svgTransform(naPose(step, j)) }}>
              <circle r={3.5} className="fill-sky-500 dark:fill-sky-300" />
              {j === 0 && (
                <text x={-7} y={3.5} textAnchor="end" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
                  Na⁺
                </text>
              )}
            </g>
          ))}

          {/* Choline taken back, and the new impulse. */}
          <g className={MOTION} style={{ opacity: step === 5 ? 1 : 0 }}>
            <line x1={160} y1={146} x2={160} y2={122} strokeWidth={1.5} strokeDasharray="3 2" className="stroke-rose-600 dark:stroke-rose-400" />
            <polygon points="156,123 164,123 160,116" className="fill-rose-600 dark:fill-rose-400" />
            <text x={165} y={136} className="fill-rose-700 text-[10px] dark:fill-rose-300">
              choline back
            </text>
          </g>
          <text
            x={160}
            y={208}
            textAnchor="middle"
            className={`fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 ${MOTION}`}
            style={{ opacity: step >= 4 ? 1 : 0 }}
          >
            Depolarised: new impulse starts
          </text>

          {/* Fixed labels. */}
          <text x={4} y={50} className={LABEL}>Presynaptic</text>
          <text x={4} y={62} className={LABEL}>knob</text>
          <text x={4} y={134} className={LABEL}>Synaptic</text>
          <text x={4} y={146} className={LABEL}>cleft</text>
          <text x={4} y={186} className={LABEL}>Postsynaptic</text>
          <text x={4} y={198} className={LABEL}>cell</text>

          <line
            x1={250}
            y1={63}
            x2={208}
            y2={66}
            strokeWidth={0.75}
            className={`${LEADER} ${MOTION}`}
            style={{ opacity: vesiclePose(step, 2).y === VESICLES_HOME[2].y ? 1 : 0 }}
          />
          <text x={252} y={62} className={LABEL}>Vesicle</text>
          <text x={252} y={74} className={LABEL}>(ACh)</text>
          <line x1={250} y1={153} x2={184} y2={156} strokeWidth={0.75} className={LEADER} />
          <text x={252} y={157} className={LABEL}>AChE</text>
          <line x1={250} y1={173} x2={203} y2={166} strokeWidth={0.75} className={LEADER} />
          <text x={252} y={176} className={LABEL}>ACh</text>
          <text x={252} y={188} className={LABEL}>receptor</text>

          <text x={160} y={240} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
            {SYNAPSE_STEPS[step].title}
          </text>
        </g>
      )}
    </StepFigure>
  );
}
