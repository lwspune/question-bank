"use client";

/**
 * Animation: from glucose to the Krebs cycle, in the NEET concepts' own terms
 * (nbors-glycolysis-steps and its count, nbors-krebs-cycle).
 *
 * Glycolysis, in the cytoplasm, splits one glucose into two pyruvic acid,
 * making 4 ATP and using 2 (net 2) and making 2 NADH + H⁺. In the
 * mitochondrial matrix each pyruvic acid undergoes oxidative decarboxylation
 * (pyruvic dehydrogenase) to acetyl CoA, giving 1 CO₂ and 1 NADH + H⁺. Acetyl
 * CoA (2 carbons) joins OAA (4) to make citric acid (6); two decarboxylations
 * take it to 5 and then 4 carbons, each with a CO₂ and an NADH + H⁺; then
 * succinyl-CoA to succinic acid gives GTP (then ATP), succinic acid to malic
 * acid gives FADH₂, and malic acid to OAA gives NADH + H⁺. For one pyruvic
 * acid: 4 NADH + H⁺, 1 FADH₂, 1 ATP and 3 CO₂ (the concept's self-check).
 *
 * The carbon skeleton is one moving token whose label is its carbon count.
 * The counts are exported and pinned by tests/notes-neet-visuals-bio-a.test.ts.
 */
import type { ReactNode } from "react";
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const RESPIRATION_STEPS: readonly FigureStep[] = [
  {
    title: "Glycolysis in the cytoplasm",
    caption:
      "One glucose (6 carbons) is split into two pyruvic acid (3 carbons each). 4 ATP are made and 2 used, a net gain of 2 ATP, and 2 NADH + H⁺ are made.",
  },
  {
    title: "Pyruvic acid to acetyl CoA",
    caption:
      "Each pyruvic acid enters the mitochondrial matrix. Oxidative decarboxylation by pyruvic dehydrogenase gives acetyl CoA (2 carbons), 1 CO₂ and 1 NADH + H⁺.",
  },
  {
    title: "Citric acid",
    caption: "Citrate synthase joins acetyl CoA (2 carbons) to oxaloacetic acid, OAA (4 carbons), making citric acid (6 carbons).",
  },
  {
    title: "Two decarboxylations",
    caption:
      "Through isocitrate, citric acid becomes α-ketoglutaric acid (5 carbons), then succinyl-CoA (4 carbons). Each step gives 1 CO₂ and 1 NADH + H⁺.",
  },
  {
    title: "Back to OAA",
    caption:
      "Succinyl-CoA to succinic acid makes GTP, which makes ATP. Succinic acid to malic acid makes FADH₂, and malic acid to OAA makes NADH + H⁺. OAA is ready for the next acetyl CoA.",
  },
  {
    title: "The count",
    caption:
      "For one pyruvic acid: 4 NADH + H⁺, 1 FADH₂, 1 ATP and 3 CO₂. One glucose gives two pyruvic acid, so the cycle turns twice for each glucose.",
  },
];

/** Glycolysis for one glucose (nbors-glycolysis-count). */
export const GLYCOLYSIS = { glucoseCarbons: 6, pyruvicAcid: 2, pyruvicCarbons: 3, atpMade: 4, atpUsed: 2, nadh: 2 } as const;

/** Pyruvic acid to acetyl CoA, for one pyruvic acid. */
export const LINK_STEP = { acetylCarbons: 2, co2: 1, nadh: 1 } as const;

export type Yield = { co2: number; nadh: number; fadh2: number; atp: number };
const Y = (y: Partial<Yield>): Yield => ({ co2: 0, nadh: 0, fadh2: 0, atp: 0, ...y });

/** The cycle's named compounds, clockwise from citric acid, with their carbons. */
export const CYCLE = [
  { name: "citric acid", carbons: 6, angle: -60 },
  { name: "α-ketoglutaric acid", carbons: 5, angle: 0 },
  { name: "succinyl-CoA", carbons: 4, angle: 60 },
  { name: "succinic acid", carbons: 4, angle: 120 },
  { name: "malic acid", carbons: 4, angle: 180 },
  { name: "OAA", carbons: 4, angle: 240 },
] as const;

/** What each arrow of the cycle makes: arrow k goes from CYCLE[k] to CYCLE[k + 1]; the last one is OAA taking acetyl CoA. */
export const CYCLE_YIELDS: readonly Yield[] = [
  Y({ co2: 1, nadh: 1 }),
  Y({ co2: 1, nadh: 1 }),
  Y({ atp: 1 }),
  Y({ fadh2: 1 }),
  Y({ nadh: 1 }),
  Y({}),
];

export function sumYields(list: readonly Yield[]): Yield {
  return list.reduce((a, y) => ({ co2: a.co2 + y.co2, nadh: a.nadh + y.nadh, fadh2: a.fadh2 + y.fadh2, atp: a.atp + y.atp }), Y({}));
}

/** One pyruvic acid all the way: the link step plus one turn. */
export function perPyruvicAcid(): Yield {
  const turn = sumYields(CYCLE_YIELDS);
  return { ...turn, co2: turn.co2 + LINK_STEP.co2, nadh: turn.nadh + LINK_STEP.nadh };
}

export const RING = { x: 160, y: 250, r: 46 } as const;
/** Top of the mitochondrion: everything above it is cytoplasm. */
export const MITOCHONDRION_TOP = 100;

export function ringPoint(angle: number, r: number = RING.r): { x: number; y: number } {
  const a = (angle * Math.PI) / 180;
  return { x: Math.round((RING.x + r * Math.cos(a)) * 100) / 100, y: Math.round((RING.y + r * Math.sin(a)) * 100) / 100 };
}

const PYRUVIC = { x: 300, y: 48 };
const ACETYL = { x: 302, y: 160 };

/** The carbon skeleton at each step: where it is and how many carbons it has. */
export function tokenAt(step: number): { x: number; y: number; carbons: number } {
  if (step <= 0) return { ...PYRUVIC, carbons: GLYCOLYSIS.pyruvicCarbons };
  if (step === 1) return { ...ACETYL, carbons: LINK_STEP.acetylCarbons };
  if (step === 2) return { ...ringPoint(CYCLE[0].angle), carbons: CYCLE[0].carbons };
  if (step === 3) return { ...ringPoint(CYCLE[2].angle), carbons: CYCLE[2].carbons };
  return { ...ringPoint(CYCLE[5].angle), carbons: CYCLE[5].carbons };
}

/** The node labels: [x, y, anchor, lines]. */
const NODE_LABELS: readonly { x: number; y: number; end: boolean; lines: string[] }[] = [
  { x: 196, y: 206, end: false, lines: ["citric acid (6C)"] },
  { x: 214, y: 248, end: false, lines: ["α-ketoglutaric", "acid (5C)"] },
  { x: 190, y: 306, end: false, lines: ["succinyl-CoA (4C)"] },
  { x: 130, y: 306, end: true, lines: ["succinic acid (4C)"] },
  { x: 104, y: 254, end: true, lines: ["malic acid (4C)"] },
  { x: 126, y: 206, end: true, lines: ["OAA (4C)"] },
];

function Fade({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <g className={MOTION} style={{ opacity: on ? 1 : 0.2 }}>
      {children}
    </g>
  );
}

const PRODUCT = "fill-sky-700 text-[10px] font-semibold dark:fill-sky-300";

export default function NeetRespirationPathway() {
  const total = perPyruvicAcid();
  return (
    <StepFigure
      title="Animation · from glucose to the Krebs cycle"
      label="Glycolysis in the cytoplasm splits glucose into two pyruvic acid; in the mitochondrial matrix each becomes acetyl CoA with CO₂ and NADH, then enters the Krebs cycle, which gives CO₂, NADH, ATP and FADH₂ and returns to OAA"
      viewBox="0 0 320 344"
      steps={RESPIRATION_STEPS}
      note="C counts carbons: 6C is a 6-carbon compound."
    >
      {(step) => {
        const t = tokenAt(step);
        return (
          <g>
            <defs>
              <marker id="resp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-foreground" />
              </marker>
            </defs>

            {/* Cytoplasm: glycolysis. */}
            <rect x={4} y={4} width={312} height={88} rx={10} className="fill-amber-50 stroke-amber-300 dark:fill-amber-950/20 dark:stroke-amber-800" strokeWidth={1} />
            <text x={12} y={18} className="fill-amber-800 text-[10px] font-bold dark:fill-amber-300">
              Cytoplasm
            </text>
            <text x={52} y={44} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              glucose
            </text>
            <text x={52} y={57} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              6C
            </text>
            <line x1={84} y1={44} x2={196} y2={44} markerEnd="url(#resp-arrow)" className="stroke-foreground" strokeWidth={1.5} />
            <text x={140} y={38} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
              Glycolysis
            </text>
            <text x={244} y={44} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              2 pyruvic acid
            </text>
            <text x={244} y={57} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              3C each
            </text>
            <text x={140} y={72} textAnchor="middle" className={PRODUCT}>
              4 ATP made, 2 used: net 2 ATP
            </text>
            <text x={140} y={85} textAnchor="middle" className={PRODUCT}>
              2 NADH + H⁺
            </text>

            {/* Mitochondrion. */}
            <rect
              x={4}
              y={MITOCHONDRION_TOP}
              width={312}
              height={238}
              rx={18}
              className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/20 dark:stroke-rose-700"
              strokeWidth={1.5}
            />
            <text x={14} y={118} className="fill-rose-800 text-[10px] font-bold dark:fill-rose-300">
              Mitochondrial matrix
            </text>

            {/* Pyruvic acid to acetyl CoA. */}
            <line x1={244} y1={62} x2={244} y2={146} markerEnd="url(#resp-arrow)" className="stroke-foreground" strokeWidth={1.5} />
            <Fade on={step >= 1}>
              <text x={238} y={124} textAnchor="end" className="fill-foreground text-[10px]">
                oxidative
              </text>
              <text x={238} y={136} textAnchor="end" className="fill-foreground text-[10px]">
                decarboxylation
              </text>
              <text x={252} y={120} className={PRODUCT}>
                CO₂
              </text>
              <text x={252} y={133} className={PRODUCT}>
                NADH + H⁺
              </text>
            </Fade>
            <text x={244} y={160} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              acetyl CoA (2C)
            </text>
            <Fade on={step >= 2}>
              <line x1={232} y1={166} x2={164} y2={200} markerEnd="url(#resp-arrow)" className="stroke-foreground" strokeWidth={1.5} />
            </Fade>

            {/* The Krebs cycle. */}
            {CYCLE.map((c, k) => {
              const a0 = c.angle + 12;
              const a1 = CYCLE[(k + 1) % CYCLE.length].angle + (k === CYCLE.length - 1 ? 360 : 0) - 12;
              const p0 = ringPoint(a0);
              const p1 = ringPoint(a1);
              return (
                <path
                  key={`arc-${c.name}`}
                  d={`M${p0.x},${p0.y} A${RING.r},${RING.r} 0 0 1 ${p1.x},${p1.y}`}
                  fill="none"
                  markerEnd="url(#resp-arrow)"
                  className="stroke-rose-700 dark:stroke-rose-300"
                  strokeWidth={1.5}
                />
              );
            })}
            {CYCLE.map((c) => {
              const p = ringPoint(c.angle);
              return <circle key={`dot-${c.name}`} cx={p.x} cy={p.y} r={4} className="fill-rose-700 dark:fill-rose-300" />;
            })}
            {NODE_LABELS.map((l) =>
              l.lines.map((line, i) => (
                <text
                  key={line}
                  x={l.x}
                  y={l.y + 12 * i}
                  textAnchor={l.end ? "end" : "start"}
                  className="fill-foreground text-[10px] font-medium"
                >
                  {line}
                </text>
              )),
            )}
            <text x={RING.x} y={RING.y - 2} textAnchor="middle" className="fill-rose-800 text-[11px] font-bold dark:fill-rose-300">
              Krebs cycle
            </text>
            <text x={RING.x} y={RING.y + 11} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              (TCA cycle)
            </text>

            {/* What the cycle makes. */}
            <Fade on={step >= 3}>
              <text x={214} y={228} className={PRODUCT}>
                CO₂, NADH + H⁺
              </text>
              <text x={214} y={282} className={PRODUCT}>
                CO₂, NADH + H⁺
              </text>
            </Fade>
            <Fade on={step >= 4}>
              <text x={RING.x} y={324} textAnchor="middle" className={PRODUCT}>
                GTP, then ATP
              </text>
              <text x={108} y={282} textAnchor="end" className={PRODUCT}>
                FADH₂
              </text>
              <text x={108} y={228} textAnchor="end" className={PRODUCT}>
                NADH + H⁺
              </text>
            </Fade>

            {/* The count for one pyruvic acid. */}
            <g className={MOTION} style={{ opacity: step >= 5 ? 1 : 0 }}>
              <rect x={10} y={140} width={128} height={46} rx={6} className="fill-background stroke-violet-500 dark:stroke-violet-400" strokeWidth={1.2} />
              <text x={16} y={153} className="fill-violet-800 text-[10px] font-bold dark:fill-violet-300">
                For one pyruvic acid
              </text>
              <text x={16} y={167} className="fill-foreground text-[10px]">
                {`${total.nadh} NADH + H⁺, ${total.fadh2} FADH₂`}
              </text>
              <text x={16} y={180} className="fill-foreground text-[10px]">
                {`${total.atp} ATP, ${total.co2} CO₂`}
              </text>
            </g>

            {/* The carbon skeleton. */}
            <g className={MOTION} style={{ transform: svgTransform({ x: t.x, y: t.y }) }}>
              <circle r={10} className="fill-amber-300 stroke-amber-700 dark:fill-amber-600 dark:stroke-amber-300" strokeWidth={1} />
              <text y={3.5} textAnchor="middle" className="fill-amber-950 text-[10px] font-bold dark:fill-amber-50">
                {`${t.carbons}C`}
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
