"use client";

/**
 * Animation: the lytic and lysogenic cycles of a bacteriophage, from the IMAT
 * concept imat-mbt-lytic-lysogenic, in its words and order. Both cycles start
 * the same way (attach, inject the DNA, the empty capsid stays outside); then
 * the lytic route (copy, assemble, lysis) and the lysogenic route (integrate
 * as a prophage, copied at every division, until a trigger such as UV light
 * induces it into the lytic cycle). The last step shows both routes side by
 * side.
 *
 * Every moving part is one SVG group whose CSS transform or opacity changes
 * between steps (StepFigure's MOTION + svgTransform). The poses are exported
 * and pinned by tests/notes-imat-visuals-bioevo.test.ts: the capsid stays
 * outside, the new phages are made inside and released by lysis, and both
 * daughter cells carry the prophage.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const PHAGE_STEPS: readonly FigureStep[] = [
  {
    title: "Attachment",
    caption: "The phage attaches to receptors on the surface of the bacterium.",
  },
  {
    title: "Injection",
    caption: "It injects its DNA into the cell. The empty capsid stays outside.",
  },
  {
    title: "Lytic: copy and assemble",
    caption:
      "Lytic cycle: the viral genes are expressed at once. The host's machinery copies the viral DNA and makes capsid proteins, and new phages are assembled.",
  },
  {
    title: "Lytic: lysis",
    caption: "The cell bursts (lysis) and dies, releasing the new phages.",
  },
  {
    title: "Lysogenic: prophage",
    caption:
      "Lysogenic cycle: instead, the viral DNA is integrated into the host chromosome as a prophage. No new phages are made.",
  },
  {
    title: "Lysogenic: cell division",
    caption: "The cell lives and divides normally. The prophage is copied with the chromosome every time, so all the daughter cells carry it.",
  },
  {
    title: "Two routes",
    caption:
      "Lytic: new phages, then lysis. Lysogenic: the prophage rides along until a trigger such as UV light induces it to leave the chromosome and enter the lytic cycle.",
  },
];

export const STEP = { attach: 0, inject: 1, copy: 2, lysis: 3, prophage: 4, division: 5, overview: 6 } as const;

export type Pose = { x: number; y: number; s: number; o: number };

/** The bacterium drawn at scale 1: an ellipse round its centre. */
export const CELL = { x: 160, y: 125, rx: 88, ry: 52 } as const;
const CELL_TOP = CELL.y - CELL.ry;
/** Where each route sits in the overview. */
export const OVERVIEW = { lytic: { x: 80, y: 130, s: 0.55 }, lysogenic: [{ x: 240, y: 100 }, { x: 240, y: 165 }], daughterScale: 0.45 } as const;

/** True if a point lies inside the bacterium at its full-size place. */
export function insideCell(p: { x: number; y: number }): boolean {
  return ((p.x - CELL.x) / CELL.rx) ** 2 + ((p.y - CELL.y) / CELL.ry) ** 2 < 1;
}

/** The infecting phage; (x, y) is the tip of its tail. */
export function phagePose(step: number): Pose {
  const attached = { x: CELL.x, y: CELL_TOP - 1, s: 1 };
  if (step <= STEP.copy || step === STEP.prophage) return { ...attached, o: 1 };
  return { ...attached, o: 0 };
}

/** The phage DNA: inside the head before injection, then inside the cell. */
export function viralDnaPose(step: number): Pose {
  if (step === STEP.attach) return { x: CELL.x, y: CELL_TOP - 1 - 32, s: 0.45, o: 1 };
  if (step === STEP.inject || step === STEP.copy) return { x: CELL.x, y: CELL.y - 28, s: 1, o: 1 };
  return { x: CELL.x, y: CELL.y - 28, s: 1, o: 0 };
}

const NEW_INSIDE = [
  { x: -62, y: 8 },
  { x: -38, y: -16 },
  { x: 38, y: -16 },
  { x: 62, y: 8 },
  { x: -52, y: 38 },
  { x: 52, y: 38 },
] as const;
const NEW_OUTSIDE = [
  { x: -114, y: -8 },
  { x: -54, y: -70 },
  { x: 54, y: -70 },
  { x: 114, y: -8 },
  { x: -100, y: 58 },
  { x: 100, y: 58 },
] as const;
export const NEW_PHAGE_COUNT = NEW_INSIDE.length;

/** New phage i (tail tip): assembled inside the cell, released by lysis. */
export function newPhagePose(step: number, i: number): Pose {
  const inn = NEW_INSIDE[i];
  const out = NEW_OUTSIDE[i];
  if (step < STEP.copy) return { x: CELL.x + inn.x, y: CELL.y + inn.y, s: 0.2, o: 0 };
  if (step === STEP.copy) return { x: CELL.x + inn.x, y: CELL.y + inn.y, s: 0.5, o: 1 };
  if (step === STEP.overview) {
    const L = OVERVIEW.lytic;
    return { x: L.x + out.x * L.s, y: L.y + out.y * L.s, s: 0.32, o: 1 };
  }
  return { x: CELL.x + out.x, y: CELL.y + out.y, s: 0.5, o: step === STEP.lysis ? 1 : 0 };
}

/** The infected cell of the lytic route (its outline is gone once it bursts). */
export function lyticCellPose(step: number): Pose {
  if (step === STEP.overview) return { ...OVERVIEW.lytic, o: 0 };
  return { x: CELL.x, y: CELL.y, s: 1, o: step <= STEP.copy ? 1 : 0 };
}

/** The burst cell wall of lysis. */
export function burstPose(step: number): Pose {
  if (step === STEP.overview) return { ...OVERVIEW.lytic, o: 1 };
  return { x: CELL.x, y: CELL.y, s: 1, o: step === STEP.lysis ? 1 : 0 };
}

/** The cell of the lysogenic route, with the prophage in its chromosome. */
export function lysogenicCellPose(step: number): Pose {
  return { x: CELL.x, y: CELL.y, s: 1, o: step === STEP.prophage ? 1 : 0 };
}

/** Daughter cell d (0 or 1) of the lysogenic route, each carrying the prophage. */
export function daughterPose(step: number, d: 0 | 1): Pose {
  if (step === STEP.overview) return { ...OVERVIEW.lysogenic[d], s: OVERVIEW.daughterScale, o: 1 };
  if (step === STEP.division) return { x: d === 0 ? 88 : 232, y: CELL.y, s: 0.55, o: 1 };
  return { x: CELL.x, y: CELL.y, s: 0.55, o: 0 };
}

/** Pieces of the burst cell wall: arcs of the cell ellipse, pushed out a little. */
export function burstPieces(): string[] {
  const spans: [number, number][] = [
    [10, 60],
    [80, 130],
    [150, 200],
    [220, 270],
    [290, 340],
  ];
  return spans.map(([a0, a1]) => {
    const mid = (((a0 + a1) / 2) * Math.PI) / 180;
    const push = { x: Math.cos(mid) * 8, y: Math.sin(mid) * 6 };
    const pts: string[] = [];
    for (let a = a0; a <= a1; a += 10) {
      const r = (a * Math.PI) / 180;
      pts.push(`${(CELL.rx * Math.cos(r) + push.x).toFixed(1)} ${(CELL.ry * Math.sin(r) + push.y).toFixed(1)}`);
    }
    return `M ${pts.join(" L ")}`;
  });
}

const HEX = Array.from({ length: 6 }, (_, k) => {
  const a = (k * 60 * Math.PI) / 180;
  return `${(11 * Math.cos(a)).toFixed(2)},${(-32 + 11 * Math.sin(a)).toFixed(2)}`;
}).join(" ");

const DNA_PATH = "M -15 0 q 3.75 -6 7.5 0 t 7.5 0 t 7.5 0 t 7.5 0";

/** A phage with its tail tip at the origin. `full` = its head holds DNA. */
function Phage({ full }: { full: boolean }) {
  return (
    <g>
      <polygon
        points={HEX}
        className={full ? "fill-rose-300 stroke-violet-700 dark:fill-rose-400/70 dark:stroke-violet-300" : "fill-background stroke-violet-700 dark:stroke-violet-300"}
        strokeWidth={1.5}
      />
      <rect x={-2.5} y={-21} width={5} height={18} className="fill-violet-500 dark:fill-violet-400" />
      <line x1={-7} y1={-3} x2={7} y2={-3} strokeWidth={2} className="stroke-violet-700 dark:stroke-violet-300" />
      <line x1={-6} y1={-3} x2={-11} y2={4} strokeWidth={1.5} className="stroke-violet-700 dark:stroke-violet-300" />
      <line x1={6} y1={-3} x2={11} y2={4} strokeWidth={1.5} className="stroke-violet-700 dark:stroke-violet-300" />
    </g>
  );
}

/** A bacterium round the origin: wall, circular chromosome, and the prophage if it has one. */
function Bacterium({ prophage, chromosomeFaded = false }: { prophage: boolean; chromosomeFaded?: boolean }) {
  return (
    <g>
      <ellipse rx={CELL.rx} ry={CELL.ry} strokeWidth={2} className="fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400" />
      <ellipse
        cy={12}
        rx={34}
        ry={18}
        fill="none"
        strokeWidth={2.5}
        className={`stroke-slate-500 dark:stroke-slate-400 ${MOTION}`}
        style={{ opacity: chromosomeFaded ? 0.3 : 1 }}
      />
      {prophage && <path d="M -17 -3.59 A 34 18 0 0 1 17 -3.59" fill="none" strokeWidth={4.5} className="stroke-rose-500 dark:stroke-rose-400" />}
    </g>
  );
}

const place = (p: Pose) => ({ transform: svgTransform({ x: p.x, y: p.y, sx: p.s, sy: p.s }), opacity: p.o });

function Label({ x, y, show, children, tone = "fill-foreground", anchor = "middle" }: { x: number; y: number; show: boolean; children: string; tone?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={`${tone} text-[10px] font-semibold ${MOTION}`} style={{ opacity: show ? 1 : 0 }}>
      {children}
    </text>
  );
}

export default function ImatLyticLysogenic() {
  return (
    <StepFigure
      title="Animation · lytic and lysogenic cycles of a phage"
      label="A bacteriophage injects its DNA into a bacterium. In the lytic cycle new phages are made and the cell bursts; in the lysogenic cycle the viral DNA joins the chromosome as a prophage and is copied into both daughter cells"
      viewBox="0 0 320 228"
      steps={PHAGE_STEPS}
      note="Rose: viral DNA. Grey loop: the bacterial chromosome. The two cycles are two routes of the same virus, not two kinds of virus."
    >
      {(step) => {
        const rose = "fill-rose-700 dark:fill-rose-300";
        return (
          <g>
            {/* Lytic route: the infected cell, then its burst wall. */}
            <g className={MOTION} style={place(lyticCellPose(step))}>
              <Bacterium prophage={false} chromosomeFaded={step === STEP.copy} />
            </g>
            <g className={MOTION} style={place(burstPose(step))}>
              {burstPieces().map((d) => (
                <path key={d} d={d} fill="none" strokeWidth={2} className="stroke-emerald-600 dark:stroke-emerald-400" />
              ))}
            </g>

            {/* Lysogenic route: the cell with a prophage, then its two daughters. */}
            <g className={MOTION} style={place(lysogenicCellPose(step))}>
              <Bacterium prophage />
            </g>
            {([0, 1] as const).map((d) => (
              <g key={`daughter-${d}`} className={MOTION} style={place(daughterPose(step, d))}>
                <Bacterium prophage />
              </g>
            ))}

            {/* The infecting phage (empty once it has injected) and its DNA. */}
            <g className={MOTION} style={place(phagePose(step))}>
              <Phage full={false} />
            </g>
            <g className={MOTION} style={place(viralDnaPose(step))}>
              <path d={DNA_PATH} fill="none" strokeWidth={2.5} strokeLinecap="round" className="stroke-rose-500 dark:stroke-rose-400" />
            </g>

            {/* New phages: made inside, released by lysis. */}
            {Array.from({ length: NEW_PHAGE_COUNT }, (_, i) => (
              <g key={`new-${i}`} className={MOTION} style={place(newPhagePose(step, i))}>
                <Phage full />
              </g>
            ))}

            {/* Labels for each step. */}
            <Label x={CELL.x} y={CELL.y + 44} show={step === STEP.attach} tone="fill-muted-foreground">
              chromosome
            </Label>
            <Label x={CELL.x + 16} y={CELL_TOP - 24} show={step === STEP.attach} anchor="start" tone="fill-violet-700 dark:fill-violet-300">
              phage
            </Label>
            <Label x={CELL.x + 16} y={CELL_TOP - 24} show={step === STEP.inject || step === STEP.prophage} anchor="start" tone="fill-violet-700 dark:fill-violet-300">
              empty capsid
            </Label>
            <Label x={CELL.x + 20} y={CELL.y - 25} show={step === STEP.inject} anchor="start" tone={rose}>
              viral DNA
            </Label>
            <Label x={CELL.x} y={CELL.y + 72} show={step === STEP.lysis} tone="fill-emerald-700 dark:fill-emerald-300">
              lysis: the cell bursts
            </Label>
            <Label x={CELL.x} y={CELL.y - 14} show={step === STEP.prophage} tone={rose}>
              prophage
            </Label>
            <Label x={CELL.x} y={CELL.y + 72} show={step === STEP.division} tone={rose}>
              both daughter cells carry the prophage
            </Label>

            {/* Overview headings and the induction arrow. */}
            <Label x={OVERVIEW.lytic.x} y={46} show={step === STEP.overview} tone="fill-foreground">
              Lytic cycle
            </Label>
            <Label x={OVERVIEW.lytic.x} y={196} show={step === STEP.overview} tone="fill-muted-foreground">
              new phages, lysis
            </Label>
            <Label x={OVERVIEW.lysogenic[0].x} y={66} show={step === STEP.overview} tone="fill-foreground">
              Lysogenic cycle
            </Label>
            <g className={MOTION} style={{ opacity: step === STEP.overview ? 1 : 0 }}>
              <line x1={196} y1={214} x2={128} y2={214} strokeWidth={1.5} className="stroke-amber-600 dark:stroke-amber-400" />
              <path d="M 128 214 l 7 -4 l 0 8 z" className="fill-amber-600 dark:fill-amber-400" />
              <text x={202} y={217} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
                induction (UV light)
              </text>
            </g>

            <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {PHAGE_STEPS[step].title}
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
