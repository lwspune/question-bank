"use client";

/**
 * Animation: switching the lac operon on and off, in the NEET concept's own
 * terms (nbomb-lac-switch, with the genes of nbomb-lac-genes).
 *
 * The regulatory gene i makes the repressor all the time (constitutively).
 * With no inducer, the repressor binds the operator and RNA polymerase cannot
 * transcribe the structural genes z, y and a: the operon is off. Lactose (or
 * allolactose), the inducer, binds the repressor and inactivates it, so it
 * leaves the operator; RNA polymerase then transcribes z, y and a, whose
 * products are beta-galactosidase, permease and transacetylase.
 *
 * The repressor, the inducer and RNA polymerase are each one shape whose
 * transform changes between steps. Their poses are exported and pinned by
 * tests/notes-neet-visuals-bio-a.test.ts: the repressor sits on the operator
 * only while there is no inducer, RNA polymerase passes the structural genes
 * only once the operator is free, and the repressor is present in every step
 * (the concept's trap: lactose changes whether it is active, not whether it
 * is made). Glucose and galactose never appear as inducers.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const LAC_STEPS: readonly FigureStep[] = [
  {
    title: "The repressor is made",
    caption: "The i gene (from inhibitor) makes the repressor protein all the time, constitutively.",
  },
  {
    title: "No lactose: off",
    caption:
      "With no inducer, the repressor binds the operator. RNA polymerase cannot transcribe z, y and a, so the operon is switched off.",
  },
  {
    title: "Lactose comes in",
    caption:
      "Lactose enters the cell through permease; a very low level of lac expression is always present, or it could not enter. Lactose is the inducer; allolactose also acts as one.",
  },
  {
    title: "The repressor is inactivated",
    caption: "The inducer binds the repressor and inactivates it. The repressor leaves the operator.",
  },
  {
    title: "On: z, y and a are transcribed",
    caption:
      "RNA polymerase transcribes the structural genes. Their products, beta-galactosidase, permease and transacetylase, are all needed to use lactose.",
  },
];

/** The genes and regions along the DNA, left to right. */
export const GENES = [
  { id: "i", role: "regulator", x0: 8, x1: 38 },
  { id: "p", role: "promoter", x0: 60, x1: 84 },
  { id: "o", role: "operator", x0: 84, x1: 108 },
  { id: "z", role: "structural", x0: 110, x1: 180 },
  { id: "y", role: "structural", x0: 182, x1: 232 },
  { id: "a", role: "structural", x0: 234, x1: 280 },
] as const;

/** What each structural gene codes for (nbomb-lac-genes). */
export const PRODUCTS = { z: "beta-galactosidase", y: "permease", a: "transacetylase" } as const;

/** The two inducers NCERT gives; glucose and galactose are not inducers. */
export const INDUCERS = ["lactose", "allolactose"] as const;

export const DNA_Y = 120;

export type Pose = { x: number; y: number; opacity: number };

const gene = (id: (typeof GENES)[number]["id"]) => GENES.find((g) => g.id === id)!;
const mid = (id: (typeof GENES)[number]["id"]) => (gene(id).x0 + gene(id).x1) / 2;

/** The repressor: made by i, on the operator while there is no inducer, then off with the inducer bound. */
export function repressorPose(step: number): Pose {
  if (step <= 0) return { x: mid("i"), y: 66, opacity: 1 };
  if (step <= 2) return { x: mid("o"), y: 100, opacity: 1 };
  return { x: 60, y: 40, opacity: 1 };
}

/** The inducer (lactose): absent, then entering, then bound to the repressor. */
export function inducerPose(step: number): Pose {
  if (step <= 1) return { x: 240, y: 30, opacity: 0 };
  if (step === 2) return { x: 200, y: 44, opacity: 1 };
  const r = repressorPose(step);
  return { x: r.x - 22, y: r.y, opacity: 1 };
}

/** RNA polymerase: waits at the promoter until the operator is free, then runs along z, y, a. */
export function polymerasePose(step: number): Pose {
  if (step <= 3) return { x: 66, y: 100, opacity: 1 };
  return { x: 270, y: 100, opacity: 1 };
}

/** Is the repressor on the operator at this step? */
export function operatorBlocked(step: number): boolean {
  const r = repressorPose(step);
  const o = gene("o");
  return r.x >= o.x0 && r.x <= o.x1 && Math.abs(r.y - DNA_Y) < 30;
}

const STATUS = ["", "Operon off", "Operon off", "Operator free", "Operon on"];

export default function NeetLacOperon() {
  return (
    <StepFigure
      title="Animation · switching the lac operon on"
      label="The i gene makes the repressor, which binds the operator and blocks RNA polymerase; lactose binds and inactivates the repressor, which leaves the operator, and RNA polymerase transcribes z, y and a into beta-galactosidase, permease and transacetylase"
      viewBox="0 0 320 214"
      steps={LAC_STEPS}
      note="i, p and o are the regulator gene, the promoter and the operator; z, y and a are the structural genes."
    >
      {(step) => {
        const rep = repressorPose(step);
        const ind = inducerPose(step);
        const pol = polymerasePose(step);
        return (
          <g>
            <defs>
              <marker id="lac-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
              </marker>
            </defs>

            <text x={316} y={16} textAnchor="end" className="fill-foreground text-[11px] font-bold">
              {STATUS[step] ?? ""}
            </text>

            {/* DNA and the genes. */}
            <line x1={4} y1={DNA_Y} x2={316} y2={DNA_Y} className="stroke-muted-foreground" strokeWidth={2} />
            {GENES.map((g) => (
              <g key={g.id}>
                <rect
                  x={g.x0}
                  y={DNA_Y - 10}
                  width={g.x1 - g.x0}
                  height={20}
                  rx={3}
                  className={
                    g.role === "structural"
                      ? "fill-sky-200 stroke-sky-600 dark:fill-sky-900 dark:stroke-sky-400"
                      : g.role === "regulator"
                        ? "fill-rose-200 stroke-rose-600 dark:fill-rose-900 dark:stroke-rose-400"
                        : "fill-slate-200 stroke-slate-500 dark:fill-slate-800 dark:stroke-slate-400"
                  }
                  strokeWidth={1.2}
                />
                <text x={(g.x0 + g.x1) / 2} y={DNA_Y + 4} textAnchor="middle" className="fill-foreground text-[12px] font-bold italic">
                  {g.id}
                </text>
              </g>
            ))}
            <text x={26} y={144} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              regulator
            </text>
            <text x={72} y={144} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              promoter
            </text>
            <text x={96} y={156} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              operator
            </text>
            <text x={195} y={144} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              structural genes
            </text>

            {/* i makes the repressor, all the time. */}
            <line x1={mid("i")} y1={DNA_Y - 12} x2={mid("i")} y2={78} markerEnd="url(#lac-arrow)" className="stroke-muted-foreground" strokeWidth={1.2} />

            {/* mRNA and the products, once transcribed. */}
            <g className={MOTION} style={{ opacity: step >= 4 ? 1 : 0 }}>
              <path d="M112,98 q8,-5 16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0" fill="none" className="stroke-violet-600 dark:stroke-violet-400" strokeWidth={2} />
              <text x={112} y={90} className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
                mRNA
              </text>
              {(["z", "y", "a"] as const).map((id, k) => (
                <text
                  key={id}
                  x={mid(id)}
                  y={176 + 14 * k}
                  textAnchor="middle"
                  className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-300"
                >
                  {`${id}: ${PRODUCTS[id]}`}
                </text>
              ))}
            </g>

            {/* RNA polymerase. */}
            <g className={MOTION} style={{ transform: svgTransform({ x: pol.x, y: pol.y }), opacity: pol.opacity }}>
              <ellipse rx={16} ry={10} className="fill-amber-200 stroke-amber-700 dark:fill-amber-800 dark:stroke-amber-300" strokeWidth={1.2} />
              <text y={-15} textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-300">
                RNA polymerase
              </text>
            </g>

            {/* The repressor. */}
            <g className={MOTION} style={{ transform: svgTransform({ x: rep.x, y: rep.y }), opacity: rep.opacity }}>
              <rect x={-11} y={-8} width={22} height={16} rx={4} className="fill-rose-300 stroke-rose-700 dark:fill-rose-800 dark:stroke-rose-300" strokeWidth={1.2} />
              <text x={15} y={4} className="fill-rose-800 text-[10px] font-semibold dark:fill-rose-300">
                repressor
              </text>
              <text
                x={15}
                y={16}
                className={`fill-muted-foreground text-[10px] ${MOTION}`}
                style={{ opacity: step >= 3 ? 1 : 0 }}
              >
                inactive
              </text>
            </g>

            {/* The inducer. */}
            <g className={MOTION} style={{ transform: svgTransform({ x: ind.x, y: ind.y }), opacity: ind.opacity }}>
              <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" className="fill-emerald-300 stroke-emerald-700 dark:fill-emerald-700 dark:stroke-emerald-300" strokeWidth={1.2} />
              <text y={-12} textAnchor="middle" className="fill-emerald-800 text-[10px] font-semibold dark:fill-emerald-300">
                lactose
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
