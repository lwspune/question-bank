"use client";

/**
 * Animation: the three stages of the Calvin cycle, in the NEET concept's own
 * terms (nbops-calvin-stages), with the cost for each CO₂ from its table and
 * the count for one glucose from its neighbour (nbops-calvin-count).
 *
 * 1. Carboxylation: RuBisCO fixes CO₂ onto RuBP (5 carbons), giving two
 *    molecules of 3-PGA (3 carbons each). No ATP or NADPH.
 * 2. Reduction: reactions that lead to glucose; 2 ATP and 2 NADPH.
 * 3. Regeneration: RuBP is formed again; 1 ATP.
 * So each CO₂ costs 3 ATP and 2 NADPH, and one glucose (6 CO₂, 6 turns)
 * costs 18 ATP and 12 NADPH.
 *
 * A ring marking the stage just finished is the one moving shape; the running
 * cost in the middle is exported as `costAfter` and pinned by
 * tests/notes-neet-visuals-bio-a.test.ts, as are the carbon counts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const CALVIN_STEPS: readonly FigureStep[] = [
  {
    title: "Carboxylation",
    caption:
      "RuBisCO fixes CO₂ onto RuBP, a 5-carbon sugar, giving two molecules of 3-PGA, a 3-carbon acid. This is the most crucial step, and it uses no ATP or NADPH.",
  },
  {
    title: "Reduction",
    caption:
      "A series of reactions lead to glucose. For each CO₂ fixed, 2 ATP are used for phosphorylation and 2 NADPH for reduction.",
  },
  {
    title: "Regeneration",
    caption: "RuBP, the CO₂ acceptor, is formed again so the cycle can continue. This uses 1 more ATP for each CO₂.",
  },
  {
    title: "The cost",
    caption:
      "Each turn fixes one CO₂ and costs 3 ATP and 2 NADPH. One glucose needs 6 turns: 18 ATP and 12 NADPH.",
  },
];

export const CENTRE = { x: 160, y: 128 } as const;
export const RADIUS = 68;

/** The three molecules on the ring, with their carbons. Angles in degrees, 0 = right, clockwise. */
export const NODES = {
  rubp: { label: "RuBP", detail: "5 carbons", carbons: 5, count: 1, angle: -90 },
  pga: { label: "2 × 3-PGA", detail: "3 carbons each", carbons: 3, count: 2, angle: 30 },
  sugar: { label: "sugar", detail: "to glucose", carbons: null, count: 1, angle: 150 },
} as const;

/** The stages in order, what they join, and what each costs for one CO₂ (the concept's table). */
export const STAGES = [
  { name: "Carboxylation", from: "rubp", to: "pga", atp: 0, nadph: 0 },
  { name: "Reduction", from: "pga", to: "sugar", atp: 2, nadph: 2 },
  { name: "Regeneration", from: "sugar", to: "rubp", atp: 1, nadph: 0 },
] as const;

/** CO₂ needed (and turns of the cycle) for one glucose. */
export const TURNS_PER_GLUCOSE = 6;

export function nodePoint(angle: number): { x: number; y: number } {
  const r = (angle * Math.PI) / 180;
  return { x: Math.round((CENTRE.x + RADIUS * Math.cos(r)) * 100) / 100, y: Math.round((CENTRE.y + RADIUS * Math.sin(r)) * 100) / 100 };
}

/** ATP and NADPH used for one CO₂ once the stages up to `step` are done. */
export function costAfter(step: number): { atp: number; nadph: number } {
  const done = STAGES.slice(0, Math.min(step, STAGES.length - 1) + 1);
  return { atp: done.reduce((a, s) => a + s.atp, 0), nadph: done.reduce((a, s) => a + s.nadph, 0) };
}

/** The highlight ring: on the molecule the stage just made. */
export function markerAt(step: number): { x: number; y: number } {
  const s = STAGES[Math.min(step, STAGES.length - 1)];
  return nodePoint(NODES[s.to].angle);
}

/** How far (degrees) an arc stops short of a node: the top box sits across the ring, so it needs more room. */
const trimAt = (angle: number) => (angle === -90 ? 38 : 24);

/** The arc between two ring angles (clockwise), stopping short of the boxes. */
function arcPath(a0: number, a1: number): string {
  const start = a0 + trimAt(a0);
  const end = (a1 < a0 ? a1 + 360 : a1) - trimAt(a1);
  const p0 = nodePoint(start);
  const p1 = nodePoint(end);
  return `M${p0.x},${p0.y} A${RADIUS},${RADIUS} 0 0 1 ${p1.x},${p1.y}`;
}

function Node({ angle, label, detail }: { angle: number; label: string; detail: string }) {
  const p = nodePoint(angle);
  return (
    <g>
      <rect
        x={p.x - 39}
        y={p.y - 15}
        width={78}
        height={30}
        rx={7}
        className="fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400"
        strokeWidth={1.5}
      />
      <text x={p.x} y={p.y - 2} textAnchor="middle" className="fill-emerald-950 text-[11px] font-bold dark:fill-emerald-100">
        {label}
      </text>
      <text x={p.x} y={p.y + 10} textAnchor="middle" className="fill-emerald-900 text-[10px] dark:fill-emerald-200">
        {detail}
      </text>
    </g>
  );
}

export default function NeetCalvinCycle() {
  const rubp = nodePoint(NODES.rubp.angle);
  const sugar = nodePoint(NODES.sugar.angle);
  return (
    <StepFigure
      title="Animation · the Calvin cycle in three stages"
      label="RuBisCO fixes CO₂ onto RuBP giving two 3-PGA, reduction uses 2 ATP and 2 NADPH to make sugar, and regeneration uses 1 ATP to form RuBP again: 3 ATP and 2 NADPH for each CO₂"
      viewBox="0 0 320 250"
      steps={CALVIN_STEPS}
      note="The costs are for one CO₂ fixed, which is one turn of the cycle."
    >
      {(step) => {
        const cost = costAfter(step);
        const m = markerAt(step);
        return (
          <g>
            <defs>
              <marker id="calvin-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-700 dark:fill-emerald-400" />
              </marker>
              <marker id="calvin-in" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
              </marker>
            </defs>

            {/* The three arcs, each shown as its stage happens. */}
            {STAGES.map((s, k) => (
              <path
                key={s.name}
                d={arcPath(NODES[s.from].angle, NODES[s.to].angle)}
                fill="none"
                markerEnd="url(#calvin-arrow)"
                className={`stroke-emerald-700 dark:stroke-emerald-400 ${MOTION}`}
                strokeWidth={2}
                style={{ opacity: step >= k ? 1 : 0.2 }}
              />
            ))}

            {/* Stage labels with their cost for each CO₂. */}
            <g className={MOTION} style={{ opacity: step >= 0 ? 1 : 0.3 }}>
              <text x={316} y={84} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
                1. Carboxylation
              </text>
              <text x={316} y={97} textAnchor="end" className="fill-muted-foreground text-[10px]">
                by RuBisCO
              </text>
              <text x={316} y={109} textAnchor="end" className="fill-muted-foreground text-[10px]">
                no ATP, no NADPH
              </text>
            </g>
            <g className={MOTION} style={{ opacity: step >= 1 ? 1 : 0.3 }}>
              <text x={CENTRE.x} y={226} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                2. Reduction
              </text>
              <text x={CENTRE.x} y={239} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                2 ATP, 2 NADPH
              </text>
            </g>
            <g className={MOTION} style={{ opacity: step >= 2 ? 1 : 0.3 }}>
              <text x={100} y={84} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
                3. Regeneration
              </text>
              <text x={100} y={97} textAnchor="end" className="fill-muted-foreground text-[10px]">
                1 ATP
              </text>
            </g>

            {/* CO₂ in at carboxylation; glucose out after reduction. */}
            <line x1={232} y1={30} x2={rubp.x + 40} y2={rubp.y - 4} markerEnd="url(#calvin-in)" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
            <text x={236} y={28} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
              CO₂ in
            </text>
            <line
              x1={sugar.x - 16}
              y1={sugar.y + 16}
              x2={sugar.x - 50}
              y2={sugar.y + 46}
              markerEnd="url(#calvin-in)"
              className={`stroke-sky-600 dark:stroke-sky-400 ${MOTION}`}
              strokeWidth={1.5}
              style={{ opacity: step >= 1 ? 1 : 0.2 }}
            />
            <text
              x={8}
              y={sugar.y + 62}
              className={`fill-sky-700 text-[11px] font-semibold dark:fill-sky-300 ${MOTION}`}
              style={{ opacity: step >= 1 ? 1 : 0.2 }}
            >
              glucose
            </text>

            {/* Running cost for one CO₂, in the middle of the ring. */}
            <text x={CENTRE.x} y={CENTRE.y - 30} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              used for one CO₂
            </text>
            <text x={CENTRE.x} y={CENTRE.y - 15} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
              {`${cost.atp} ATP, ${cost.nadph} NADPH`}
            </text>
            <text
              x={CENTRE.x}
              y={CENTRE.y + 2}
              textAnchor="middle"
              className={`fill-violet-700 text-[10px] font-semibold dark:fill-violet-300 ${MOTION}`}
              style={{ opacity: step >= 3 ? 1 : 0 }}
            >
              {`glucose: ${TURNS_PER_GLUCOSE} turns,`}
            </text>
            <text
              x={CENTRE.x}
              y={CENTRE.y + 14}
              textAnchor="middle"
              className={`fill-violet-700 text-[10px] font-semibold dark:fill-violet-300 ${MOTION}`}
              style={{ opacity: step >= 3 ? 1 : 0 }}
            >
              {`${TURNS_PER_GLUCOSE * 3} ATP, ${TURNS_PER_GLUCOSE * 2} NADPH`}
            </text>

            <Node angle={NODES.rubp.angle} label={NODES.rubp.label} detail={NODES.rubp.detail} />
            <Node angle={NODES.pga.angle} label={NODES.pga.label} detail={NODES.pga.detail} />
            <Node angle={NODES.sugar.angle} label={NODES.sugar.label} detail={NODES.sugar.detail} />

            {/* The stage just finished. */}
            <g className={MOTION} style={{ transform: svgTransform({ x: m.x, y: m.y }) }}>
              <rect
                x={-44}
                y={-20}
                width={88}
                height={40}
                rx={10}
                fill="none"
                strokeDasharray="5 3"
                className="stroke-amber-500 dark:stroke-amber-400"
                strokeWidth={2}
              />
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
