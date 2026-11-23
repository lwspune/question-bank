"use client";

/**
 * Animation: Lenz's law with a bar magnet and a coil (concept cetp-emi-lenz).
 * The N pole moves towards the coil: the flux through the coil rises, so the
 * induced current makes the near face of the coil a N pole and the magnet is
 * repelled. The magnet stops: the flux is steady and no current flows. The N
 * pole moves away: the flux falls, the current reverses, the near face becomes
 * a S pole and the magnet is attracted back. Either way the current opposes
 * the CHANGE in flux, not the flux itself.
 *
 * Seen from the magnet's side, a face with an anticlockwise current is a N
 * pole and one with a clockwise current a S pole. The magnet is one group
 * moved by style.transform (svgTransform), so it slides between steps. The
 * states and the arrow geometry are pinned by tests/notes-cet-visuals-phys-c.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type Motion = "in" | "still" | "out";
export type LenzResponse = {
  flux: "rising" | "steady" | "falling";
  /** Induced current as seen from the magnet's side, or null when none flows. */
  current: "anticlockwise" | "clockwise" | null;
  /** The pole the coil's near face becomes. */
  face: "N" | "S" | null;
  force: "repels" | "attracts" | null;
};

/**
 * What the coil does when the magnet's N pole (facing the coil) moves in, stays
 * still or moves away. The induced current opposes the change in flux.
 */
export function lenzResponse(motion: Motion): LenzResponse {
  if (motion === "in") return { flux: "rising", current: "anticlockwise", face: "N", force: "repels" };
  if (motion === "out") return { flux: "falling", current: "clockwise", face: "S", force: "attracts" };
  return { flux: "steady", current: null, face: null, force: null };
}

/** Pole of a coil face from the current seen looking at that face. */
export function faceFromCurrent(current: "anticlockwise" | "clockwise"): "N" | "S" {
  return current === "anticlockwise" ? "N" : "S";
}

// Geometry (viewBox units).
const AXIS_Y = 70;
const MAGNET_W = 68;
/** The magnet's left end: far from the coil, and close to it. */
export const MAGNET_X = { far: 14, near: 100, mid: 57 } as const;
/** x of the coil's near face. */
export const COIL_FACE_X = 195;

export const LENZ_STATES: readonly { magnetX: number; motion: Motion | null }[] = [
  { magnetX: MAGNET_X.far, motion: "still" },
  { magnetX: MAGNET_X.near, motion: "in" },
  { magnetX: MAGNET_X.near, motion: "still" },
  { magnetX: MAGNET_X.far, motion: "out" },
  { magnetX: MAGNET_X.mid, motion: null },
];

export const LENZ_STEPS: readonly FigureStep[] = [
  {
    title: "Magnet at rest",
    caption: "The magnet's N pole faces the coil. Nothing moves, so the flux through the coil does not change and no current is induced.",
  },
  {
    title: "N pole moves in",
    caption:
      "The flux through the coil rises. The induced current flows anticlockwise as seen from the magnet, so the near face becomes a N pole and repels the magnet.",
  },
  {
    title: "Magnet stops",
    caption: "The flux is large but steady, so there is no current. Lenz's law opposes a change in flux, not the flux itself.",
  },
  {
    title: "N pole moves away",
    caption:
      "The flux falls, so the current reverses: clockwise as seen from the magnet. The near face becomes a S pole and attracts the magnet back.",
  },
  {
    title: "The rule",
    caption:
      "Pushing the magnet in or pulling it out, you work against a force. That work is the energy the current carries, which is why Lenz's law is conservation of energy.",
  },
];

/** Arc of the current arrow on a face-on coil: path, and the arrowhead's place and screen angle. */
export function currentArc(dir: "anticlockwise" | "clockwise", cx: number, cy: number, r: number) {
  const s = dir === "anticlockwise" ? 1 : -1;
  const end = (s * 300 * Math.PI) / 180; // angle measured anticlockwise on screen
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const ex = r2(cx + r * Math.cos(end));
  const ey = r2(cy - r * Math.sin(end));
  // Direction of travel at the end of the arc (screen x right, y down).
  const tx = s * -Math.sin(end);
  const ty = s * -Math.cos(end);
  return {
    d: `M ${cx + r} ${cy} A ${r} ${r} 0 1 ${dir === "anticlockwise" ? 0 : 1} ${ex} ${ey}`,
    end: { x: ex, y: ey },
    tangent: { x: tx, y: ty },
    headAngle: r2((Math.atan2(ty, tx) * 180) / Math.PI),
  };
}

const INSETS = [
  { motion: "in" as const, cx: 80, label: "moving in" },
  { motion: "out" as const, cx: 240, label: "moving away" },
];
const INSET_Y = 178;
const INSET_R = 22;

function FaceOn({ motion, cx, label, active }: { motion: "in" | "out"; cx: number; label: string; active: boolean }) {
  const res = lenzResponse(motion);
  const dir = res.current ?? "anticlockwise";
  const arc = currentArc(dir, cx, INSET_Y, INSET_R + 6);
  return (
    <g className={MOTION} style={{ opacity: active ? 1 : 0.25 }}>
      <text x={cx} y={INSET_Y - INSET_R - 14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        N pole {label}
      </text>
      <circle cx={cx} cy={INSET_Y} r={INSET_R} fill="none" strokeWidth={4} className="stroke-amber-300/70 dark:stroke-amber-700/60" />
      <path d={arc.d} fill="none" strokeWidth={2} className="stroke-amber-700 dark:stroke-amber-300" />
      <polygon
        points="6,0 -5,-5 -5,5"
        transform={`translate(${arc.end.x} ${arc.end.y}) rotate(${arc.headAngle})`}
        className="fill-amber-700 dark:fill-amber-300"
      />
      <text
        x={cx}
        y={INSET_Y + 6}
        textAnchor="middle"
        className={res.face === "N" ? "fill-rose-700 text-[17px] font-bold dark:fill-rose-300" : "fill-sky-700 text-[17px] font-bold dark:fill-sky-300"}
      >
        {res.face}
      </text>
      <text x={cx} y={INSET_Y + INSET_R + 17} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {res.current} current
      </text>
      <text x={cx} y={INSET_Y + INSET_R + 29} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {res.face} face, {res.force} the magnet
      </text>
    </g>
  );
}

const FLUX_LINE = [
  "flux through the coil: steady, no current",
  "flux through the coil: rising",
  "flux through the coil: steady, no current",
  "flux through the coil: falling",
  "the current opposes the change in flux",
];

export default function CetLenzMagnetCoil() {
  return (
    <StepFigure
      title="Animation · Lenz's law with a magnet and a coil"
      label="A bar magnet's N pole moves towards a coil and the coil's near face becomes a N pole, repelling it; when the magnet moves away the near face becomes a S pole, attracting it. Seen from the magnet, the induced current is anticlockwise for a N face and clockwise for a S face."
      viewBox="0 0 320 236"
      steps={LENZ_STEPS}
      note="Below the coil: its near face as seen from the magnet's side. An anticlockwise current makes that face a N pole, a clockwise one a S pole."
    >
      {(step) => {
        const st = LENZ_STATES[step];
        const res = st.motion ? lenzResponse(st.motion) : null;
        const isIn = st.motion === "in";
        const isOut = st.motion === "out";
        return (
          <g>
            <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {LENZ_STEPS[step].title}
            </text>

            {/* The coil, side view: its turns, with the near face on the left */}
            {[200, 212, 224, 236, 248].map((x) => (
              <ellipse key={x} cx={x} cy={AXIS_Y} rx={5} ry={26} fill="none" strokeWidth={2} className="stroke-amber-600 dark:stroke-amber-400" />
            ))}
            <text x={224} y={AXIS_Y + 37} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              coil
            </text>

            {/* What the near face becomes */}
            <text
              x={COIL_FACE_X}
              y={AXIS_Y - 32}
              textAnchor="middle"
              className={`fill-rose-700 text-[11px] font-semibold dark:fill-rose-300 ${MOTION}`}
              style={{ opacity: isIn ? 1 : 0 }}
            >
              near face: N
            </text>
            <text
              x={COIL_FACE_X}
              y={AXIS_Y - 32}
              textAnchor="middle"
              className={`fill-sky-700 text-[11px] font-semibold dark:fill-sky-300 ${MOTION}`}
              style={{ opacity: isOut ? 1 : 0 }}
            >
              near face: S
            </text>

            {/* The induced field along the coil's axis: towards the magnet when it comes in, after it when it goes */}
            <g className={MOTION} style={{ opacity: isIn ? 1 : 0 }}>
              <line x1={252} y1={AXIS_Y} x2={204} y2={AXIS_Y} strokeWidth={2} className="stroke-violet-600 dark:stroke-violet-400" />
              <polygon points={`198,${AXIS_Y} 206,${AXIS_Y - 4} 206,${AXIS_Y + 4}`} className="fill-violet-600 dark:fill-violet-400" />
            </g>
            <g className={MOTION} style={{ opacity: isOut ? 1 : 0 }}>
              <line x1={198} y1={AXIS_Y} x2={246} y2={AXIS_Y} strokeWidth={2} className="stroke-violet-600 dark:stroke-violet-400" />
              <polygon points={`252,${AXIS_Y} 244,${AXIS_Y - 4} 244,${AXIS_Y + 4}`} className="fill-violet-600 dark:fill-violet-400" />
            </g>
            <text x={262} y={AXIS_Y + 4} className={`fill-violet-700 text-[10px] dark:fill-violet-300 ${MOTION}`} style={{ opacity: isIn || isOut ? 1 : 0 }}>
              induced B
            </text>

            {/* The magnet, with its motion and the force on it */}
            <g className={MOTION} style={{ transform: svgTransform({ x: st.magnetX, y: AXIS_Y }) }}>
              <rect x={0} y={-11} width={MAGNET_W / 2} height={22} className="fill-sky-500 dark:fill-sky-600" />
              <rect x={MAGNET_W / 2} y={-11} width={MAGNET_W / 2} height={22} className="fill-rose-500 dark:fill-rose-600" />
              <text x={MAGNET_W / 4} y={4} textAnchor="middle" className="fill-white text-[12px] font-bold">
                S
              </text>
              <text x={(3 * MAGNET_W) / 4} y={4} textAnchor="middle" className="fill-white text-[12px] font-bold">
                N
              </text>

              <g className={MOTION} style={{ opacity: isIn ? 1 : 0 }}>
                <line x1={6} y1={-20} x2={56} y2={-20} strokeWidth={1.5} className="stroke-foreground" />
                <polygon points="62,-20 55,-24 55,-16" className="fill-foreground" />
                <text x={34} y={-26} textAnchor="middle" className="fill-foreground text-[10px]">
                  moving in
                </text>
              </g>
              <g className={MOTION} style={{ opacity: isOut ? 1 : 0 }}>
                <line x1={12} y1={-20} x2={62} y2={-20} strokeWidth={1.5} className="stroke-foreground" />
                <polygon points="6,-20 13,-24 13,-16" className="fill-foreground" />
                <text x={34} y={-26} textAnchor="middle" className="fill-foreground text-[10px]">
                  moving away
                </text>
              </g>
              <g className={MOTION} style={{ opacity: res?.force === "repels" ? 1 : 0 }}>
                <line x1={62} y1={20} x2={22} y2={20} strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
                <polygon points="16,20 23,16 23,24" className="fill-rose-600 dark:fill-rose-400" />
                <text x={40} y={33} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                  repelled
                </text>
              </g>
              <g className={MOTION} style={{ opacity: res?.force === "attracts" ? 1 : 0 }}>
                <line x1={20} y1={20} x2={60} y2={20} strokeWidth={2} className="stroke-sky-600 dark:stroke-sky-400" />
                <polygon points="66,20 59,16 59,24" className="fill-sky-600 dark:fill-sky-400" />
                <text x={40} y={33} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
                  attracted back
                </text>
              </g>
            </g>

            <text x={160} y={AXIS_Y + 50} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {FLUX_LINE[step]}
            </text>

            {/* The coil's near face, seen from the magnet */}
            <line x1={10} y1={AXIS_Y + 57} x2={310} y2={AXIS_Y + 57} className="stroke-border" />
            {INSETS.map((ins) => (
              <FaceOn
                key={ins.motion}
                motion={ins.motion}
                cx={ins.cx}
                label={ins.label}
                active={step === 4 || st.motion === ins.motion}
              />
            ))}
          </g>
        );
      }}
    </StepFigure>
  );
}
