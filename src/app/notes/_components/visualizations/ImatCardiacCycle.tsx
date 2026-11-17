"use client";

/**
 * Animation: the cardiac cycle in the five phases of the IMAT concept's own
 * table (atrial systole, start of ventricular systole, ventricular ejection,
 * start of ventricular diastole, passive filling).
 *
 * Every valve is drawn from the concept's valve rule: it is open when the
 * pressure upstream is higher than the pressure downstream. Each phase carries
 * a representative left-side pressure (mmHg) for the atrium, the ventricle and
 * the aorta; the valves are WORKED OUT from those numbers, never typed in, and
 * tests/notes-imat-visuals-physio.test.ts checks the result against the
 * concept's table (and the 120 mmHg peak). Only the relations and the concept's
 * own peak values are printed on the figure.
 *
 * Both sides are drawn, because the concept stresses that left and right
 * contract together. Each valve flap is one line that rotates about its hinge.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type CardiacPhase = FigureStep & {
  atria: "contract" | "relaxed";
  ventricles: "contract" | "relaxed";
  /** Representative LEFT-side pressures in mmHg (the right side does the same, lower). */
  pressure: { atrium: number; ventricle: number; aorta: number };
  /** One extra line under the valve read-out. */
  note: string;
};

export const CARDIAC_PHASES: readonly CardiacPhase[] = [
  {
    title: "Atrial systole",
    caption:
      "Both atria contract: their volume falls and their pressure rises, pushing the last blood into the relaxed ventricles through the open AV valves.",
    atria: "contract",
    ventricles: "relaxed",
    pressure: { atrium: 10, ventricle: 8, aorta: 80 },
    note: "Atria contract: volume falls, pressure rises",
  },
  {
    title: "Start of ventricular systole",
    caption:
      "The ventricles contract. Their pressure rises above the atria, so the AV valves shut (first sound, lub), but not yet above the arteries: all four valves are closed.",
    atria: "relaxed",
    ventricles: "contract",
    pressure: { atrium: 4, ventricle: 50, aorta: 80 },
    note: "First heart sound (lub): AV valves close",
  },
  {
    title: "Ventricular ejection",
    caption:
      "Ventricular pressure rises above the aorta and pulmonary artery, so the semilunar valves open and blood leaves. Meanwhile the atria are filling.",
    atria: "relaxed",
    ventricles: "contract",
    pressure: { atrium: 6, ventricle: 120, aorta: 115 },
    note: "Peak: left ventricle about 120 mmHg, right about 25 mmHg",
  },
  {
    title: "Start of ventricular diastole",
    caption:
      "The ventricles relax and their pressure falls below the arteries, so the semilunar valves shut (second sound, dub). The AV valves are still closed.",
    atria: "relaxed",
    ventricles: "relaxed",
    pressure: { atrium: 8, ventricle: 40, aorta: 100 },
    note: "Second heart sound (dub): semilunar valves close",
  },
  {
    title: "Passive filling",
    caption:
      "Ventricular pressure falls below the atria, so the AV valves open and blood flows straight through the relaxed atria into the ventricles: most filling (about 70%) happens here.",
    atria: "relaxed",
    ventricles: "relaxed",
    pressure: { atrium: 7, ventricle: 4, aorta: 85 },
    note: "About 70% of ventricular filling is passive",
  },
];

/** The concept's valve rule: open when the pressure upstream is higher than downstream. */
export function valveOpen(upstream: number, downstream: number): boolean {
  return upstream > downstream;
}

export function valves(p: CardiacPhase): { av: boolean; semilunar: boolean } {
  return {
    av: valveOpen(p.pressure.atrium, p.pressure.ventricle),
    semilunar: valveOpen(p.pressure.ventricle, p.pressure.aorta),
  };
}

/** Blood movement in a phase, read from the valves and the concept's "atria fill" rows. */
export function flows(p: CardiacPhase): { veinsToAtria: boolean; atriaToVentricles: boolean; ventriclesToArteries: boolean } {
  const v = valves(p);
  return {
    veinsToAtria: p.atria === "relaxed",
    atriaToVentricles: v.av,
    ventriclesToArteries: v.semilunar,
  };
}

// Geometry (viewBox 320 x 252). Right side of the heart on the viewer's left.
const RA = { x: 60, y: 66, w: 84, h: 52 };
const LA = { x: 260, y: 66, w: 84, h: 52 };
const RV = { x: 85, y: 143, w: 134, h: 70 };
const LV = { x: 235, y: 143, w: 134, h: 70 };
const PA_X = 126;
const AO_X = 194;
const TRUNK_W = 28;
const TRUNK_TOP = 30;
const VALVE_Y_AV = 100;
const VALVE_Y_SL = 104;

type Flap = { x: number; y: number; length: number; closed: number; open: number };

/** Two flaps per valve: angles in degrees, 0 = pointing right, 90 = down. */
function avFlaps(cx: number): Flap[] {
  return [
    { x: cx - 18, y: VALVE_Y_AV, length: 18, closed: 0, open: 80 },
    { x: cx + 18, y: VALVE_Y_AV, length: 18, closed: 180, open: 100 },
  ];
}
function slFlaps(cx: number): Flap[] {
  const half = TRUNK_W / 2;
  return [
    { x: cx - half, y: VALVE_Y_SL, length: half, closed: 0, open: -80 },
    { x: cx + half, y: VALVE_Y_SL, length: half, closed: 180, open: 260 },
  ];
}

/** Flow arrows run just beside each atrium's centre, clear of its label and the open flaps. */
const R_FLOW_X = RA.x + 4;
const L_FLOW_X = LA.x - 4;
const RIGHT_ARROW = { stroke: "stroke-sky-700 dark:stroke-sky-300", fill: "fill-sky-700 dark:fill-sky-300" };
const LEFT_ARROW = { stroke: "stroke-rose-700 dark:stroke-rose-300", fill: "fill-rose-700 dark:fill-rose-300" };

const RIGHT_FILL = "fill-sky-100 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400";
const LEFT_FILL = "fill-rose-100 stroke-rose-600 dark:fill-rose-950/50 dark:stroke-rose-400";

function Chamber({ c, tone, squeeze, label, labelX }: { c: typeof RA; tone: string; squeeze: boolean; label: [string, string]; labelX: number }) {
  return (
    <g>
      <rect
        x={-c.w / 2}
        y={-c.h / 2}
        width={c.w}
        height={c.h}
        rx={12}
        strokeWidth={squeeze ? 2.5 : 1.5}
        className={`${tone} ${MOTION}`}
        style={{ transform: svgTransform({ x: c.x, y: c.y, sx: squeeze ? 0.9 : 1, sy: squeeze ? 0.88 : 1 }) }}
      />
      <text x={labelX} y={c.y - 3} textAnchor="middle" className="fill-foreground text-[10px]">
        {label[0]}
      </text>
      <text x={labelX} y={c.y + 8} textAnchor="middle" className="fill-foreground text-[10px]">
        {label[1]}
      </text>
    </g>
  );
}

type Tone = { stroke: string; fill: string };

function Arrow({ x, y1, y2, on, tone }: { x: number; y1: number; y2: number; on: boolean; tone: Tone }) {
  const dir = y2 > y1 ? 1 : -1;
  return (
    <g className={MOTION} style={{ opacity: on ? 1 : 0 }}>
      <line x1={x} y1={y1} x2={x} y2={y2 - dir * 5} strokeWidth={2.5} className={tone.stroke} />
      <polygon points={`${x - 5},${y2 - dir * 6} ${x + 5},${y2 - dir * 6} ${x},${y2}`} className={tone.fill} />
    </g>
  );
}

export default function ImatCardiacCycle() {
  return (
    <StepFigure
      title="Animation · the cardiac cycle"
      label="A heart with four chambers going through the five phases of the cardiac cycle, showing which valves are open and where blood flows"
      viewBox="0 0 320 252"
      steps={CARDIAC_PHASES}
      note="Blue: the right side (deoxygenated blood). Red: the left side (oxygenated blood). A thick outline means the chamber is contracting."
    >
      {(step) => {
        const phase = CARDIAC_PHASES[step];
        const v = valves(phase);
        const f = flows(phase);
        const aSq = phase.atria === "contract";
        const vSq = phase.ventricles === "contract";
        const flap = (fl: Flap, open: boolean, tone: string, key: string) => (
          <line
            key={key}
            x1={0}
            y1={0}
            x2={fl.length}
            y2={0}
            strokeWidth={3}
            strokeLinecap="round"
            className={`${tone} ${MOTION}`}
            style={{ transform: svgTransform({ x: fl.x, y: fl.y, angle: open ? fl.open : fl.closed }) }}
          />
        );
        return (
          <g>
            {/* Vessel names. */}
            <text x={RA.x} y={12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              Venae cavae
            </text>
            <text x={LA.x} y={12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              Pulmonary veins
            </text>
            <text x={PA_X} y={12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              Pulmonary
            </text>
            <text x={PA_X} y={23} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              artery
            </text>
            <text x={AO_X} y={23} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              Aorta
            </text>

            {/* Arterial trunks. */}
            <rect x={PA_X - TRUNK_W / 2} y={TRUNK_TOP} width={TRUNK_W} height={VALVE_Y_SL - TRUNK_TOP + 12} rx={4} strokeWidth={1.5} className={RIGHT_FILL} />
            <rect x={AO_X - TRUNK_W / 2} y={TRUNK_TOP} width={TRUNK_W} height={VALVE_Y_SL - TRUNK_TOP + 12} rx={4} strokeWidth={1.5} className={LEFT_FILL} />

            {/* The AV openings: a short ring joining each atrium to its ventricle. */}
            <rect x={RA.x - 20} y={84} width={40} height={32} strokeWidth={1.5} className={RIGHT_FILL} />
            <rect x={LA.x - 20} y={84} width={40} height={32} strokeWidth={1.5} className={LEFT_FILL} />

            {/* Chambers: ventricles first, so the trunks' valves sit on top. */}
            <Chamber c={RV} tone={RIGHT_FILL} squeeze={vSq} label={["Right", "ventricle"]} labelX={RV.x + 8} />
            <Chamber c={LV} tone={LEFT_FILL} squeeze={vSq} label={["Left", "ventricle"]} labelX={LV.x - 8} />
            <Chamber c={RA} tone={RIGHT_FILL} squeeze={aSq} label={["Right", "atrium"]} labelX={RA.x - 20} />
            <Chamber c={LA} tone={LEFT_FILL} squeeze={aSq} label={["Left", "atrium"]} labelX={LA.x + 20} />

            {/* Valves. */}
            {avFlaps(RA.x).map((fl, i) => flap(fl, v.av, "stroke-slate-700 dark:stroke-slate-200", `tri-${i}`))}
            {avFlaps(LA.x).map((fl, i) => flap(fl, v.av, "stroke-slate-700 dark:stroke-slate-200", `mit-${i}`))}
            {slFlaps(PA_X).map((fl, i) => flap(fl, v.semilunar, "stroke-slate-700 dark:stroke-slate-200", `pul-${i}`))}
            {slFlaps(AO_X).map((fl, i) => flap(fl, v.semilunar, "stroke-slate-700 dark:stroke-slate-200", `aor-${i}`))}

            {/* Blood flow. */}
            <Arrow x={R_FLOW_X} y1={16} y2={RA.y - RA.h / 2 + 10} on={f.veinsToAtria} tone={RIGHT_ARROW} />
            <Arrow x={L_FLOW_X} y1={16} y2={LA.y - LA.h / 2 + 10} on={f.veinsToAtria} tone={LEFT_ARROW} />
            <Arrow x={R_FLOW_X} y1={RA.y - 16} y2={RV.y - 8} on={f.atriaToVentricles} tone={RIGHT_ARROW} />
            <Arrow x={L_FLOW_X} y1={LA.y - 16} y2={LV.y - 8} on={f.atriaToVentricles} tone={LEFT_ARROW} />
            <Arrow x={PA_X} y1={RV.y + 8} y2={TRUNK_TOP + 6} on={f.ventriclesToArteries} tone={RIGHT_ARROW} />
            <Arrow x={AO_X} y1={LV.y + 8} y2={TRUNK_TOP + 6} on={f.ventriclesToArteries} tone={LEFT_ARROW} />

            {/* Read-out: the valve rule, then the phase's fact. */}
            <text x={160} y={198} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {phase.title}
            </text>
            <text x={160} y={214} textAnchor="middle" className="fill-foreground text-[10px]">
              {v.av ? "AV valves OPEN: atrium > ventricle" : "AV valves SHUT: ventricle > atrium"}
            </text>
            <text x={160} y={228} textAnchor="middle" className="fill-foreground text-[10px]">
              {v.semilunar ? "Semilunar valves OPEN: ventricle > artery" : "Semilunar valves SHUT: artery > ventricle"}
            </text>
            <text x={160} y={243} textAnchor="middle" className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
              {phase.note}
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
