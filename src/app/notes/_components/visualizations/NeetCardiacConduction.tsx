"use client";

/**
 * Animation: how the heartbeat spreads, in the words of the NEET concepts
 * "Nodal tissue and the control of the heartbeat" (nzobf-nodal-tissue) and
 * "The electrocardiogram" (nzobf-ecg).
 *
 * The heart is drawn from the front, so its right side is on the reader's
 * left. The SA node (pacemaker) sits in the right upper corner of the right
 * atrium, the AV node in its lower left corner by the atrio-ventricular septum;
 * the AV bundle passes through that septum to the top of the inter-ventricular
 * septum and divides into a right and a left bundle, which give rise to the
 * Purkinje fibres. The concept's own definition: the Purkinje fibres with the
 * right and left bundles are the bundle of His.
 *
 * Below, the ECG trace is drawn wave by wave as the signal reaches each part:
 * P (atria depolarise), QRS (ventricles depolarise; systole begins shortly
 * after Q), T (ventricles repolarise; its end marks the end of systole), then
 * the electrically silent T-P gap.
 *
 * The impulse is two dots (one per bundle) whose transform changes between
 * steps. Data exported and pinned by tests/notes-neet-visuals-bio-b.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const CONDUCTION_STEPS: readonly FigureStep[] = [
  {
    title: "SA node fires",
    caption:
      "The SA node, the pacemaker, generates an action potential (70 to 75 per minute, the most of any part). The atria are excited: the P wave.",
  },
  {
    title: "AV node",
    caption: "The signal reaches the AV node, in the lower left corner of the right atrium, close to the atrio-ventricular septum.",
  },
  {
    title: "AV bundle",
    caption:
      "The AV bundle carries it through the atrio-ventricular septa to the top of the inter-ventricular septum, where it divides into a right and a left bundle.",
  },
  {
    title: "Bundle of His",
    caption:
      "The right and left bundles and the Purkinje fibres (together the bundle of His) spread it through the ventricles. The ventricles depolarise: the QRS complex. Contraction starts shortly after Q.",
  },
  {
    title: "T wave",
    caption:
      "The ventricles return from the excited to the normal state (repolarisation): the T wave. The end of the T wave marks the end of systole.",
  },
  {
    title: "T-P gap",
    caption:
      "From the end of T to the next P the heart muscle is electrically silent. Then the SA node fires again.",
  },
];

/** The conduction path, in order, in the concept's words. */
export const PATHWAY = ["SA node", "AV node", "AV bundle", "right and left bundles", "Purkinje fibres"] as const;
/** The concept: "The Purkinje fibres along with the right and left bundles are known as the bundle of His." */
export const BUNDLE_OF_HIS = ["right and left bundles", "Purkinje fibres"] as const;

export type P = { x: number; y: number };
export type Box = { x: number; y: number; w: number; h: number };

/** Chambers (drawn from the front: the right atrium is on the reader's left). */
export const RIGHT_ATRIUM: Box = { x: 50, y: 12, w: 80, h: 60 };
export const LEFT_ATRIUM: Box = { x: 134, y: 12, w: 80, h: 60 };
/** The atrio-ventricular septum, between atria and ventricles. */
export const AV_SEPTUM_Y = 74;
/** The inter-ventricular septum. */
export const IV_SEPTUM_X = 132;

export const SA_NODE: P = { x: 60, y: 22 };
export const AV_NODE: P = { x: 122, y: 64 };
/** Top of the inter-ventricular septum, where the AV bundle divides. */
export const SPLIT: P = { x: 132, y: 84 };

export const AV_BUNDLE: readonly P[] = [AV_NODE, { x: 132, y: 74 }, SPLIT];
export const RIGHT_BUNDLE: readonly P[] = [{ x: 129, y: 86 }, { x: 126, y: 116 }, { x: 124, y: 146 }];
export const LEFT_BUNDLE: readonly P[] = [{ x: 135, y: 86 }, { x: 138, y: 116 }, { x: 140, y: 146 }];
export const PURKINJE_RIGHT: readonly P[] = [{ x: 124, y: 146 }, { x: 96, y: 136 }, { x: 70, y: 116 }, { x: 60, y: 94 }];
export const PURKINJE_LEFT: readonly P[] = [{ x: 140, y: 146 }, { x: 168, y: 136 }, { x: 194, y: 116 }, { x: 204, y: 94 }];

/** Where impulse dot `k` (0 = goes down the right bundle, 1 = the left) is at a step. */
export function impulsePose(step: number, k: 0 | 1): P & { opacity: number } {
  switch (step) {
    case 0:
      return { ...SA_NODE, opacity: 1 };
    case 1:
      return { ...AV_NODE, opacity: 1 };
    case 2:
      return { ...SPLIT, opacity: 1 };
    case 3: {
      const end = (k === 0 ? PURKINJE_RIGHT : PURKINJE_LEFT)[3];
      return { ...end, opacity: 1 };
    }
    case 4: {
      const end = (k === 0 ? PURKINJE_RIGHT : PURKINJE_LEFT)[3];
      return { ...end, opacity: 0 };
    }
    default:
      return { ...SA_NODE, opacity: 1 };
  }
}

// ECG geometry: baseline and the x where each part starts and ends.
export const ECG_BASE = 254;
export type EcgPart = { id: "P" | "QRS" | "T" | "gap"; name: string; marks: string; from: number; to: number; showFrom: number };
export const ECG_PARTS: readonly EcgPart[] = [
  { id: "P", name: "P wave", marks: "atria depolarise", from: 24, to: 54, showFrom: 0 },
  { id: "QRS", name: "QRS complex", marks: "ventricles depolarise", from: 78, to: 100, showFrom: 3 },
  { id: "T", name: "T wave", marks: "ventricles repolarise", from: 128, to: 170, showFrom: 4 },
  { id: "gap", name: "T-P gap", marks: "electrically silent", from: 170, to: 240, showFrom: 5 },
];
/** Peak heights above the baseline (Q and S dip below it). */
export const ECG_HEIGHTS = { P: 10, Q: -5, R: 40, S: -10, T: 14 } as const;

/** Which ECG parts are drawn at a step: each appears when the signal reaches its chambers, and stays. */
export function ecgShown(step: number): EcgPart["id"][] {
  return ECG_PARTS.filter((p) => step >= p.showFrom).map((p) => p.id);
}

const poly = (pts: readonly P[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");
const bump = (from: number, to: number, h: number) =>
  `M ${from} ${ECG_BASE} Q ${(from + to) / 2} ${ECG_BASE - 2 * h} ${to} ${ECG_BASE}`;

const QRS_D = (() => {
  const b = ECG_BASE;
  const h = ECG_HEIGHTS;
  return `M 78 ${b} L 82 ${b - h.Q} L 89 ${b - h.R} L 95 ${b - h.S} L 100 ${b}`;
})();

const PATH = "fill-none stroke-rose-600 dark:stroke-rose-400";
const GLOW = `fill-none stroke-amber-400 dark:stroke-amber-500 ${MOTION}`;
const LABEL = "fill-foreground text-[10px]";
const TRACE = `fill-none stroke-emerald-600 dark:stroke-emerald-400 ${MOTION}`;

export default function NeetCardiacConduction() {
  return (
    <StepFigure
      title="Animation · the heartbeat and the ECG"
      label="The conducting system of the heart: the SA node in the right atrium fires, the signal passes to the AV node, along the AV bundle, down the right and left bundles and out through the Purkinje fibres, while an ECG trace draws the P wave, the QRS complex, the T wave and the T-P gap"
      viewBox="0 0 320 302"
      steps={CONDUCTION_STEPS}
      note="The heart is drawn from the front, so its right side is on your left. The right and left bundles with the Purkinje fibres are known as the bundle of His."
    >
      {(step) => {
        const shown = ecgShown(step);
        const on = (id: EcgPart["id"]) => (shown.includes(id) ? 1 : 0);
        return (
          <g>
            {/* Chambers, lit when they are excited. */}
            {[RIGHT_ATRIUM, LEFT_ATRIUM].map((b) => (
              <rect key={b.x} x={b.x} y={b.y} width={b.w} height={b.h} rx={14} strokeWidth={2} className="fill-rose-50 stroke-rose-700 dark:fill-rose-950/40 dark:stroke-rose-300" />
            ))}
            {[RIGHT_ATRIUM, LEFT_ATRIUM].map((b) => (
              <rect
                key={`lit-${b.x}`}
                x={b.x + 2}
                y={b.y + 2}
                width={b.w - 4}
                height={b.h - 4}
                rx={12}
                className={`fill-amber-200 dark:fill-amber-800/60 ${MOTION}`}
                style={{ opacity: step === 0 ? 0.7 : 0 }}
              />
            ))}
            <path d="M 50 76 Q 50 132 132 166 Q 214 132 214 76 Z" strokeWidth={2} className="fill-rose-50 stroke-rose-700 dark:fill-rose-950/40 dark:stroke-rose-300" />
            <path
              d="M 53 79 Q 54 130 132 162 Q 210 130 211 79 Z"
              className={`fill-amber-200 dark:fill-amber-800/60 ${MOTION}`}
              style={{ opacity: step === 3 ? 0.7 : step === 4 ? 0.25 : 0 }}
            />
            <line x1={50} y1={AV_SEPTUM_Y} x2={214} y2={AV_SEPTUM_Y} strokeWidth={2} className="stroke-rose-700 dark:stroke-rose-300" />
            <line x1={IV_SEPTUM_X} y1={76} x2={IV_SEPTUM_X} y2={160} strokeWidth={2} className="stroke-rose-300 dark:stroke-rose-800" />

            {/* Glow under the part carrying the signal now. */}
            <polyline points={poly(AV_BUNDLE)} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" className={GLOW} style={{ opacity: step === 2 ? 0.9 : 0 }} />
            {[RIGHT_BUNDLE, LEFT_BUNDLE, PURKINJE_RIGHT, PURKINJE_LEFT].map((pts, i) => (
              <polyline key={i} points={poly(pts)} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" className={GLOW} style={{ opacity: step === 3 ? 0.9 : 0 }} />
            ))}

            {/* The conducting fibres. */}
            {[AV_BUNDLE, RIGHT_BUNDLE, LEFT_BUNDLE, PURKINJE_RIGHT, PURKINJE_LEFT].map((pts, i) => (
              <polyline key={i} points={poly(pts)} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={PATH} />
            ))}
            {[PURKINJE_RIGHT, PURKINJE_LEFT].flatMap((pts, i) =>
              pts.slice(1, 3).map((p, j) => (
                <line key={`tw-${i}-${j}`} x1={p.x} y1={p.y} x2={p.x + (i === 0 ? 6 : -6)} y2={p.y - 10} strokeWidth={1.5} className="stroke-rose-600 dark:stroke-rose-400" />
              )),
            )}

            {/* The two nodes. */}
            <circle cx={SA_NODE.x} cy={SA_NODE.y} r={9} className={`fill-amber-400 dark:fill-amber-500 ${MOTION}`} style={{ opacity: step === 0 ? 0.6 : 0 }} />
            <circle cx={AV_NODE.x} cy={AV_NODE.y} r={9} className={`fill-amber-400 dark:fill-amber-500 ${MOTION}`} style={{ opacity: step === 1 ? 0.6 : 0 }} />
            <circle cx={SA_NODE.x} cy={SA_NODE.y} r={5} className="fill-rose-600 dark:fill-rose-400" />
            <circle cx={AV_NODE.x} cy={AV_NODE.y} r={5} className="fill-rose-600 dark:fill-rose-400" />

            {/* The impulse. */}
            {([0, 1] as const).map((k) => {
              const p = impulsePose(step, k);
              return (
                <circle
                  key={`imp-${k}`}
                  r={4}
                  className={`fill-amber-500 stroke-amber-800 dark:fill-amber-300 dark:stroke-amber-100 ${MOTION}`}
                  strokeWidth={1}
                  style={{ transform: svgTransform(p), opacity: p.opacity }}
                />
              );
            })}

            {/* Labels. */}
            <text x={4} y={36} className={LABEL}>Right</text>
            <text x={4} y={48} className={LABEL}>atrium</text>
            <text x={4} y={106} className={LABEL}>Right</text>
            <text x={4} y={118} className={LABEL}>ventricle</text>
            <text x={174} y={46} textAnchor="middle" className={LABEL}>Left atrium</text>
            <text x={168} y={100} textAnchor="middle" className={LABEL}>Left</text>
            <text x={168} y={112} textAnchor="middle" className={LABEL}>ventricle</text>
            <text x={70} y={26} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">SA node</text>
            <text x={70} y={38} className="fill-rose-700 text-[10px] dark:fill-rose-300">(pacemaker)</text>
            <text x={115} y={67} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">AV node</text>
            <text x={141} y={86} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">AV bundle</text>
            <line x1={210} y1={96} x2={220} y2={96} strokeWidth={0.75} className="stroke-muted-foreground" />
            <text x={222} y={94} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">Purkinje</text>
            <text x={222} y={106} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">fibres</text>
            <line x1={132} y1={168} x2={132} y2={150} strokeWidth={0.75} className="stroke-muted-foreground" />
            <text x={132} y={180} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
              right and left bundles
            </text>

            {/* The ECG. */}
            <text x={4} y={204} className="fill-foreground text-[11px] font-semibold">ECG</text>
            <line x1={14} y1={ECG_BASE} x2={24} y2={ECG_BASE} strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
            <path d={bump(24, 54, ECG_HEIGHTS.P)} strokeWidth={1.5} className={TRACE} style={{ opacity: on("P") }} />
            <line x1={54} y1={ECG_BASE} x2={78} y2={ECG_BASE} strokeWidth={1.5} className={TRACE} style={{ opacity: step >= 1 ? 1 : 0 }} />
            <path d={QRS_D} strokeWidth={1.5} strokeLinejoin="round" className={TRACE} style={{ opacity: on("QRS") }} />
            <line x1={100} y1={ECG_BASE} x2={128} y2={ECG_BASE} strokeWidth={1.5} className={TRACE} style={{ opacity: on("T") }} />
            <path d={bump(128, 170, ECG_HEIGHTS.T)} strokeWidth={1.5} className={TRACE} style={{ opacity: on("T") }} />
            <line x1={170} y1={ECG_BASE} x2={240} y2={ECG_BASE} strokeWidth={1.5} className={TRACE} style={{ opacity: on("gap") }} />
            <path d={bump(240, 270, ECG_HEIGHTS.P)} strokeWidth={1.5} className={TRACE} style={{ opacity: on("gap") }} />
            <line x1={270} y1={ECG_BASE} x2={304} y2={ECG_BASE} strokeWidth={1.5} className={TRACE} style={{ opacity: on("gap") }} />

            {/* Wave letters. */}
            <g className="fill-foreground text-[10px] font-semibold">
              <text x={39} y={ECG_BASE - 14} textAnchor="middle" className={MOTION} style={{ opacity: on("P") }}>P</text>
              <g className={MOTION} style={{ opacity: on("QRS") }}>
                <text x={79} y={ECG_BASE + 14} textAnchor="middle">Q</text>
                <text x={96} y={ECG_BASE - 34} textAnchor="start">R</text>
                <text x={97} y={ECG_BASE + 20} textAnchor="middle">S</text>
              </g>
              <text x={149} y={ECG_BASE - 18} textAnchor="middle" className={MOTION} style={{ opacity: on("T") }}>T</text>
              <text x={255} y={ECG_BASE - 14} textAnchor="middle" className={MOTION} style={{ opacity: on("gap") }}>P</text>
            </g>

            {/* Systole: from shortly after Q to the end of T. */}
            <g className={MOTION} style={{ opacity: on("T") }}>
              <line x1={84} y1={206} x2={170} y2={206} strokeWidth={1} className="stroke-indigo-600 dark:stroke-indigo-300" />
              <line x1={84} y1={202} x2={84} y2={210} strokeWidth={1} className="stroke-indigo-600 dark:stroke-indigo-300" />
              <line x1={170} y1={202} x2={170} y2={210} strokeWidth={1} className="stroke-indigo-600 dark:stroke-indigo-300" />
              <text x={140} y={201} textAnchor="middle" className="fill-indigo-700 text-[10px] dark:fill-indigo-300">systole</text>
            </g>

            {/* What each part marks. */}
            <text x={4} y={284} className={`fill-emerald-800 text-[10px] dark:fill-emerald-200 ${MOTION}`} style={{ opacity: on("P") }}>
              P: atria depolarise
            </text>
            <text x={40} y={296} className={`fill-emerald-800 text-[10px] dark:fill-emerald-200 ${MOTION}`} style={{ opacity: on("QRS") }}>
              QRS: ventricles depolarise
            </text>
            <text x={150} y={284} className={`fill-emerald-800 text-[10px] dark:fill-emerald-200 ${MOTION}`} style={{ opacity: on("T") }}>
              T: ventricles repolarise
            </text>
            <g className={MOTION} style={{ opacity: on("gap") }}>
              <text x={210} y={ECG_BASE - 12} textAnchor="middle" className="fill-emerald-800 text-[10px] dark:fill-emerald-200">
                electrically silent
              </text>
              <text x={205} y={ECG_BASE + 13} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                T-P gap
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
