"use client";

/**
 * Animation: the bryophyte life cycle, in the NEET concept's own terms
 * (nbopk-bryo-features).
 *
 * The haploid gametophyte is the main plant body; its antheridium makes
 * biflagellate antherozoids and its archegonium holds a single egg.
 * Antherozoids reach the archegonium through water and one fuses with the egg:
 * the zygote (diploid), which does not undergo meiosis at once. It grows into
 * a multicellular sporophyte that stays attached to the gametophyte. Some
 * sporophyte cells undergo meiosis to make haploid spores, which grow into
 * gametophytes.
 *
 * The ring is split into its haploid and diploid halves, switching at
 * fertilisation and at meiosis. A marker turns round the ring (one shape,
 * rotated). The stations and angles are exported and pinned by
 * tests/notes-w2-17.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const BRYO_STEPS: readonly FigureStep[] = [
  {
    title: "The gametophyte",
    caption:
      "The main plant body is haploid: the gametophyte. Its antheridium makes biflagellate antherozoids, and its archegonium holds a single egg.",
  },
  {
    title: "Fertilisation in water",
    caption: "Antherozoids are released into water and reach the archegonium. One fuses with the egg to form the zygote.",
  },
  { title: "The zygote", caption: "The zygote is diploid. It does not undergo meiosis at once." },
  {
    title: "The sporophyte",
    caption:
      "The zygote grows into a multicellular sporophyte. It is not free-living: it stays attached to the photosynthetic gametophyte and takes food from it.",
  },
  {
    title: "Spores",
    caption: "Some sporophyte cells undergo reduction division (meiosis) to make haploid spores. Each spore grows into a new gametophyte.",
  },
];

export const CENTER = { x: 160, y: 120 } as const;
export const RADIUS = 72;

export type Ploidy = "n" | "2n" | "switch";

export type Station = {
  id: "gametophyte" | "fertilisation" | "zygote" | "sporophyte" | "spores";
  /** Degrees clockwise from the top of the ring. */
  angle: number;
  ploidy: Ploidy;
  lines: readonly string[];
  /** Label placement relative to the node. */
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
};

export const STATIONS: readonly Station[] = [
  { id: "gametophyte", angle: 0, ploidy: "n", lines: ["gametophyte (n)", "main plant body"], dx: 0, dy: -30, anchor: "middle" },
  { id: "fertilisation", angle: 72, ploidy: "switch", lines: ["fertilisation", "in water"], dx: 16, dy: -2, anchor: "start" },
  { id: "zygote", angle: 144, ploidy: "2n", lines: ["zygote (2n)"], dx: 12, dy: 21, anchor: "start" },
  { id: "sporophyte", angle: 216, ploidy: "2n", lines: ["sporophyte (2n)"], dx: -12, dy: 21, anchor: "end" },
  { id: "spores", angle: 288, ploidy: "n", lines: ["spores (n)"], dx: -16, dy: -2, anchor: "end" },
];

/** Meiosis sits on the ring between the sporophyte and the spores. */
export const MEIOSIS_ANGLE = 252;

/** A point on the ring at an angle (degrees clockwise from the top). */
export function ringPoint(angle: number): { x: number; y: number } {
  const a = (angle * Math.PI) / 180;
  return {
    x: Math.round((CENTER.x + RADIUS * Math.sin(a)) * 100) / 100,
    y: Math.round((CENTER.y - RADIUS * Math.cos(a)) * 100) / 100,
  };
}

/** Haploid from meiosis round to fertilisation; diploid from fertilisation to meiosis. */
export function ploidyAt(angle: number): "n" | "2n" {
  const a = ((angle % 360) + 360) % 360;
  return a > 72 && a < MEIOSIS_ANGLE ? "2n" : "n";
}

/** The marker's angle at each step: one station per step. */
export function markerAngle(step: number): number {
  return STATIONS[Math.min(Math.max(step, 0), STATIONS.length - 1)].angle;
}

/** Ring segments, each drawn with an arrowhead in the direction of the cycle. */
export const SEGMENTS: readonly { from: number; to: number; ploidy: "n" | "2n" }[] = [
  { from: 0, to: 72, ploidy: "n" },
  { from: 72, to: 144, ploidy: "2n" },
  { from: 144, to: 216, ploidy: "2n" },
  { from: 216, to: MEIOSIS_ANGLE, ploidy: "2n" },
  { from: MEIOSIS_ANGLE, to: 288, ploidy: "n" },
  { from: 288, to: 360, ploidy: "n" },
];

const RING: Record<"n" | "2n", string> = {
  n: "stroke-emerald-600 dark:stroke-emerald-400",
  "2n": "stroke-amber-600 dark:stroke-amber-400",
};
const NODE: Record<Ploidy, string> = {
  n: "fill-emerald-200 stroke-emerald-700 dark:fill-emerald-900 dark:stroke-emerald-300",
  "2n": "fill-amber-200 stroke-amber-700 dark:fill-amber-900 dark:stroke-amber-300",
  switch: "fill-sky-200 stroke-sky-700 dark:fill-sky-900 dark:stroke-sky-300",
};

function arcPath(from: number, to: number): string {
  const a = ringPoint(from + 8);
  const b = ringPoint(to - 9);
  return `M ${a.x} ${a.y} A ${RADIUS} ${RADIUS} 0 0 1 ${b.x} ${b.y}`;
}

export default function NeetBryophyteCycle() {
  const m = ringPoint(MEIOSIS_ANGLE);
  return (
    <StepFigure
      title="Animation · the bryophyte life cycle"
      label="A ring: the haploid gametophyte, fertilisation in water, the diploid zygote, the diploid sporophyte attached to the gametophyte, meiosis, and haploid spores that grow into a new gametophyte. The haploid half of the ring runs from meiosis to fertilisation, the diploid half from fertilisation to meiosis."
      viewBox="0 0 320 204"
      steps={BRYO_STEPS}
      note="The gametophyte is the main plant; the sporophyte lives on it."
    >
      {(step) => (
        <g>
          <defs>
            <marker id="bryo-n" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-600 dark:fill-emerald-400" />
            </marker>
            <marker id="bryo-2n" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
            </marker>
          </defs>

          {/* The ring, haploid and diploid halves. */}
          {SEGMENTS.map((s) => (
            <path
              key={s.from}
              d={arcPath(s.from, s.to)}
              fill="none"
              strokeWidth={3}
              markerEnd={s.to === MEIOSIS_ANGLE ? undefined : `url(#bryo-${s.ploidy})`}
              className={RING[s.ploidy]}
            />
          ))}
          <text x={CENTER.x} y={CENTER.y - 18} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
            haploid (n)
          </text>
          <text x={CENTER.x} y={CENTER.y + 26} textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
            diploid (2n)
          </text>

          {/* Meiosis, where the ring turns haploid again. */}
          <rect x={m.x - 4} y={m.y - 4} width={8} height={8} transform={`rotate(45 ${m.x} ${m.y})`} className="fill-violet-600 dark:fill-violet-400" />
          <text x={m.x - 10} y={m.y + 4} textAnchor="end" className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
            meiosis
          </text>

          {/* The marker: turns to the current station. */}
          <g className={MOTION} style={{ transform: svgTransform({ x: CENTER.x, y: CENTER.y, angle: markerAngle(step) }) }}>
            <circle cx={0} cy={-RADIUS} r={11} fill="none" strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-300" />
          </g>

          {STATIONS.map((s) => {
            const p = ringPoint(s.angle);
            return (
              <g key={s.id}>
                <circle cx={p.x} cy={p.y} r={6} strokeWidth={1.5} className={NODE[s.ploidy]} />
                {s.lines.map((line, k) => (
                  <text
                    key={line}
                    x={p.x + s.dx}
                    y={p.y + s.dy + k * 12}
                    textAnchor={s.anchor}
                    className={k === 0 ? "fill-foreground text-[10px] font-semibold" : "fill-muted-foreground text-[10px]"}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </g>
      )}
    </StepFigure>
  );
}
