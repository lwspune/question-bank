"use client";

/**
 * Animation: from calcium release to the cross-bridge cycle, steps 3 to 8 of
 * the IMAT concept's own table, in its order and words: Ca²⁺ released, Ca²⁺
 * binds troponin and tropomyosin moves off the binding sites, the head (with
 * ADP and phosphate) binds actin, the power stroke releases ADP and phosphate,
 * a new ATP binds and the head detaches, ATP hydrolysis re-cocks the head.
 *
 * One myosin head pivots on the thick filament; the thin filament (actin with
 * tropomyosin and troponin) is one group that slides. Binding sites are spaced
 * exactly one stroke apart, so after a full cycle the re-cocked head faces the
 * NEXT site: the filament has moved one step towards the centre.
 *
 * The poses are exported and pinned by tests/notes-imat-visuals-physio.test.ts:
 * the head touches actin only while bound (from binding to the power stroke),
 * actin moves only in the power stroke, tropomyosin covers the sites until
 * Ca²⁺ is on troponin, and ATP is on the head exactly when it detaches.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const CROSS_BRIDGE_STEPS: readonly FigureStep[] = [
  {
    title: "Calcium released",
    caption: "The sarcoplasmic reticulum releases Ca²⁺, which diffuses into the sarcoplasm. Tropomyosin still covers the binding sites on actin.",
  },
  {
    title: "Calcium binds troponin",
    caption: "Ca²⁺ binds troponin; troponin changes shape and moves tropomyosin off the myosin-binding sites on actin.",
  },
  {
    title: "Cross-bridge forms",
    caption: "A myosin head, already carrying ADP and phosphate, binds actin: a cross-bridge forms.",
  },
  {
    title: "Power stroke",
    caption: "ADP and phosphate are released and the head tilts: the power stroke pulls actin towards the centre.",
  },
  {
    title: "ATP binds, head detaches",
    caption: "A new ATP binds the head, which detaches from actin.",
  },
  {
    title: "Head re-cocks",
    caption: "The head hydrolyses ATP and re-cocks, ready for the next cycle. It now faces the next binding site along.",
  },
];

/** The head pivots here, on the thick filament. */
export const PIVOT = { x: 150, y: 122 };
/** Distance from the pivot to the centre of the head when it is bound (sx = 1). */
export const HEAD_REACH = 52;
export const ACTIN_Y = 64;
const BEAD_R = 6;
/** Angles of the lever: cocked (pointing up-left) and after the power stroke (up-right). */
export const COCKED = -120;
export const STROKED = -60;
/** Detached heads are drawn shorter, pulled back from actin. */
const DETACHED_SX = 0.8;

export type HeadPose = { angle: number; sx: number; bound: boolean; carries: "ADP+Pi" | "ATP" | "none" };

export function headPose(step: number): HeadPose {
  switch (step) {
    case 0:
    case 1:
      return { angle: COCKED, sx: DETACHED_SX, bound: false, carries: "ADP+Pi" };
    case 2:
      return { angle: COCKED, sx: 1, bound: true, carries: "ADP+Pi" };
    case 3:
      return { angle: STROKED, sx: 1, bound: true, carries: "none" };
    case 4:
      return { angle: STROKED, sx: DETACHED_SX, bound: false, carries: "ATP" };
    default:
      return { angle: COCKED, sx: DETACHED_SX, bound: false, carries: "ADP+Pi" };
  }
}

/** Centre of the head's globular end. */
export function headCentre(p: HeadPose) {
  const rad = (p.angle * Math.PI) / 180;
  const d = HEAD_REACH * p.sx;
  return { x: PIVOT.x + d * Math.cos(rad), y: PIVOT.y + d * Math.sin(rad) };
}

/** The stroke: how far a bound head's centre moves along x. */
export const STROKE = headCentre({ angle: STROKED, sx: 1, bound: true, carries: "none" }).x - headCentre({ angle: COCKED, sx: 1, bound: true, carries: "none" }).x;

/** How far the thin filament has slid (towards the centre, +x) at a step. */
export function actinShift(step: number): number {
  return step >= 3 ? STROKE : 0;
}

/** Tropomyosin's vertical offset: 0 covers the binding sites, negative has moved off them. */
export function tropomyosinOffset(step: number): number {
  return step >= 1 ? -9 : 0;
}

/** Binding sites on actin, in filament coordinates: one stroke apart, one under the cocked head. */
export const BINDING_SITES: readonly number[] = [-2, -1, 0, 1, 2, 3].map(
  (k) => Math.round((headCentre({ angle: COCKED, sx: 1, bound: true, carries: "none" }).x + k * STROKE) * 100) / 100,
);
/** Troponin, in filament coordinates (between binding sites). */
export const TROPONINS: readonly number[] = [BINDING_SITES[1] + STROKE / 2, BINDING_SITES[3] + STROKE / 2];

const BEAD_STEP = STROKE / 4;
const BEADS: number[] = Array.from({ length: 36 }, (_, m) => BINDING_SITES[2] + (m - 14) * BEAD_STEP);

export function caPose(step: number, j: number) {
  if (step === 0) return { x: 100 + j * 26, y: 158 - j * 4 };
  return { x: TROPONINS[j] + actinShift(step), y: ACTIN_Y + tropomyosinOffset(step) - 11 };
}

const LABEL = "fill-foreground text-[10px]";

export default function ImatCrossBridge() {
  return (
    <StepFigure
      title="Animation · the cross-bridge cycle"
      label="A myosin head binding actin, pulling it in a power stroke, detaching when ATP binds and re-cocking when ATP is hydrolysed, after calcium has moved tropomyosin off the binding sites"
      viewBox="0 0 320 230"
      steps={CROSS_BRIDGE_STEPS}
      note="Pi: phosphate. Calcium binds troponin, not tropomyosin. ATP binding makes the head let go; without ATP the heads stay locked on actin (rigor mortis)."
    >
      {(step) => {
        const head = headPose(step);
        const c = headCentre(head);
        const dx = actinShift(step);
        const tOff = tropomyosinOffset(step);
        return (
          <g>
            <text x={312} y={22} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
              towards the centre →
            </text>
            <text x={8} y={86} className="fill-sky-700 text-[10px] dark:fill-sky-300">
              actin
            </text>

            {/* Thin filament: actin beads, binding sites, then tropomyosin and troponin on top. */}
            <g className={MOTION} style={{ transform: svgTransform({ x: dx, y: 0 }) }}>
              {BEADS.map((x) => (
                <circle key={x} cx={x} cy={ACTIN_Y} r={BEAD_R} className="fill-sky-300 stroke-sky-600 dark:fill-sky-800 dark:stroke-sky-400" strokeWidth={1} />
              ))}
              {BINDING_SITES.map((x) => (
                <circle key={x} cx={x} cy={ACTIN_Y} r={BEAD_R} className="fill-amber-400 stroke-amber-700 dark:fill-amber-500 dark:stroke-amber-300" strokeWidth={1} />
              ))}
            </g>
            <g className={MOTION} style={{ transform: svgTransform({ x: dx, y: tOff }) }}>
              <rect x={-70} y={ACTIN_Y - 3} width={460} height={6} rx={3} className="fill-emerald-600 dark:fill-emerald-400" />
              {TROPONINS.map((x) => (
                <rect key={x} x={x - 6} y={ACTIN_Y - 8} width={12} height={10} rx={3} className="fill-violet-500 dark:fill-violet-400" />
              ))}
              <text x={TROPONINS[0] + 4} y={ACTIN_Y + 23} textAnchor="end" className="fill-violet-700 text-[10px] dark:fill-violet-300">
                troponin
              </text>
              <text x={40} y={ACTIN_Y - 7} textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-300">
                tropomyosin
              </text>
            </g>

            {/* Calcium. */}
            {[0, 1].map((j) => (
              <g key={j} className={MOTION} style={{ transform: svgTransform(caPose(step, j)) }}>
                <circle r={4} className="fill-teal-500 dark:fill-teal-300" />
                {j === 0 && (
                  <text x={7} y={3.5} className="fill-teal-700 text-[10px] font-semibold dark:fill-teal-300">
                    Ca²⁺
                  </text>
                )}
              </g>
            ))}

            {/* Thick filament and the myosin head (lever + head, turned and pulled back as one shape). */}
            <rect x={10} y={PIVOT.y} width={300} height={10} rx={5} className="fill-rose-500 dark:fill-rose-400" />
            <text x={160} y={PIVOT.y + 24} textAnchor="middle" className={LABEL}>
              myosin (thick filament)
            </text>
            <g className={MOTION} style={{ transform: svgTransform({ x: PIVOT.x, y: PIVOT.y, angle: head.angle, sx: head.sx }) }}>
              <line x1={0} y1={0} x2={HEAD_REACH - 8} y2={0} strokeWidth={4} strokeLinecap="round" className="stroke-rose-600 dark:stroke-rose-400" />
              <ellipse cx={HEAD_REACH} cy={0} rx={9} ry={6.5} className="fill-rose-500 stroke-rose-700 dark:fill-rose-400 dark:stroke-rose-300" strokeWidth={1} />
            </g>
            <text x={166} y={116} className="fill-rose-700 text-[10px] dark:fill-rose-300">
              myosin head
            </text>

            {/* What the head carries. */}
            <text
              x={0}
              y={0}
              className={`fill-foreground text-[10px] font-semibold ${MOTION}`}
              style={{
                transform: svgTransform(step === 3 ? { x: c.x + 30, y: c.y + 26 } : { x: c.x + 12, y: c.y + 6 }),
                opacity: head.carries === "ADP+Pi" ? 1 : 0,
              }}
            >
              ADP + Pi
            </text>
            <text
              x={0}
              y={0}
              className={`fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300 ${MOTION}`}
              style={{ transform: svgTransform({ x: c.x + 12, y: c.y + 6 }), opacity: head.carries === "ATP" ? 1 : 0 }}
            >
              ATP
            </text>

            {/* Sarcoplasmic reticulum. */}
            <rect x={14} y={168} width={150} height={26} rx={8} className="fill-teal-50 stroke-teal-600 dark:fill-teal-950/40 dark:stroke-teal-400" strokeWidth={1.5} />
            <text x={89} y={185} textAnchor="middle" className={LABEL}>
              sarcoplasmic reticulum
            </text>

            <text x={160} y={220} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {CROSS_BRIDGE_STEPS[step].title}
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
