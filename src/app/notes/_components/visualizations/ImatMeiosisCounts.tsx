"use client";

/**
 * Animation: meiosis in a cell with 2n = 4, counting chromosomes (n) and DNA
 * (c) at every step. Same chromosome style as the mitosis model: a long and a
 * short homologous pair, one of each from the mother (rose) and the father
 * (sky). The steps follow the IMAT concept "Chromosome number (n) and DNA
 * content (c) at each stage of meiosis": 2n, 4c → n, 2c → n, 1c.
 *
 * Each of the 8 chromatids is one shape whose CSS transform changes between
 * steps: homologues pair into bivalents, the pairs line up on the equator,
 * homologues go to different cells (meiosis I), then the sisters split
 * (meiosis II). Crossing over is left out so the counting stays clear.
 *
 * The poses and the counts are exported and pinned by
 * tests/notes-imat-visuals-biomol.test.ts: the number of chromatids drawn in
 * each cell is the count the label prints.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const MEIOSIS_STEPS: readonly FigureStep[] = [
  {
    title: "After S phase",
    caption:
      "The DNA has been copied, so each of the 4 chromosomes has two sister chromatids. The cell is still 2n = 4, but its DNA content has doubled from 2c to 4c.",
  },
  {
    title: "Prophase I",
    caption:
      "Homologous chromosomes pair up (synapsis) into 2 bivalents, each with four chromatids. Crossing over happens here, at chiasmata.",
  },
  {
    title: "Metaphase I",
    caption:
      "The bivalents line up on the equator as pairs, each pair facing a random pole. Still 2n = 4 and 4c.",
  },
  {
    title: "Telophase I",
    caption:
      "Homologous chromosomes went to opposite poles and two cells form. Each is haploid (n = 2), but its chromosomes still have two chromatids, so 2c.",
  },
  {
    title: "Metaphase II",
    caption:
      "There is no S phase between the divisions. In each cell the 2 chromosomes line up singly on the equator: n = 2, still 2c.",
  },
  {
    title: "Telophase II",
    caption:
      "The sister chromatids have separated. Four haploid cells, each with 2 chromosomes of one chromatid: n = 2 and 1c.",
  },
];

export type MeiosisCount = {
  /** Cells at this step. */
  cells: number;
  ploidy: "2n" | "n";
  /** Chromosomes in each cell. */
  chromosomes: number;
  /** Chromatids in each cell. */
  chromatids: number;
  /** DNA content of each cell, in c (c = one unreplicated set). */
  dna: number;
};

/** The concept's numbers for a species with diploid number `diploid`, one entry per step. */
export function meiosisCounts(diploid: number): MeiosisCount[] {
  const n = diploid / 2;
  const beforeI: MeiosisCount = { cells: 1, ploidy: "2n", chromosomes: diploid, chromatids: 2 * diploid, dna: 4 };
  const afterI: MeiosisCount = { cells: 2, ploidy: "n", chromosomes: n, chromatids: 2 * n, dna: 2 };
  const afterII: MeiosisCount = { cells: 4, ploidy: "n", chromosomes: n, chromatids: n, dna: 1 };
  return [beforeI, beforeI, beforeI, afterI, afterI, afterII];
}

export const COUNTS = meiosisCounts(4);

export function countLabel(c: MeiosisCount): string {
  const who = c.cells === 1 ? "The cell" : `Each of ${c.cells} cells`;
  const ploidy = c.ploidy === "2n" ? `2n = ${c.chromosomes}` : `n = ${c.chromosomes}`;
  return `${who}: ${ploidy} · ${c.chromatids} chromatids · ${c.dna}c`;
}

export type Chromosome = { id: string; length: number; tone: "rose" | "sky"; pair: "long" | "short" };

/** 2n = 4: a long and a short homologous pair, one of each from each parent. */
export const CHROMOSOMES: readonly Chromosome[] = [
  { id: "long-m", length: 30, tone: "rose", pair: "long" },
  { id: "long-p", length: 30, tone: "sky", pair: "long" },
  { id: "short-m", length: 18, tone: "rose", pair: "short" },
  { id: "short-p", length: 18, tone: "sky", pair: "short" },
];

/** Chromosomes that end up in the left cell after meiosis I (one of each pair, mixed parents). */
export const LEFT_CELL: readonly number[] = [0, 3];

export type Point = { x: number; y: number };
export type Pose = Point & { angle: number };

const EQUATOR_X = 160;
const MID_Y = 120;
const HALF = 2.75; // half the gap between two sister chromatids
const goesLeft = (i: number) => LEFT_CELL.includes(i);
const cellX = (i: number) => (goesLeft(i) ? 88 : 232);

/** Cell centres at each step. */
export function cellsAt(step: number): Point[] {
  if (step <= 2) return [{ x: 160, y: MID_Y }];
  if (step <= 4) return [{ x: 88, y: MID_Y }, { x: 232, y: MID_Y }];
  return [
    { x: 88, y: 76 },
    { x: 88, y: 164 },
    { x: 232, y: 76 },
    { x: 232, y: 164 },
  ];
}

/** Offset a pose sideways (across the chromatid) by `d`. */
function across(x: number, y: number, angle: number, d: number): Pose {
  const rad = (angle * Math.PI) / 180;
  return { x: x + d * Math.cos(rad), y: y + d * Math.sin(rad), angle };
}

/** Where chromatid `side` of chromosome `i` sits at a step. */
export function chromatidPose(step: number, i: number, side: 0 | 1): Pose {
  const sign = side === 0 ? -1 : 1;
  const c = CHROMOSOMES[i];
  switch (step) {
    case 0: {
      // Scattered in the nucleus, sisters side by side.
      const spots = [
        { x: 138, y: 100, angle: 25 },
        { x: 184, y: 104, angle: -30 },
        { x: 140, y: 140, angle: -15 },
        { x: 182, y: 140, angle: 40 },
      ];
      const s = spots[i];
      return across(s.x, s.y, s.angle, sign * HALF);
    }
    case 1: {
      // Bivalents: the two homologues side by side, four chromatids in a row.
      const b = c.pair === "long" ? { x: 134, y: 112, angle: 20 } : { x: 188, y: 130, angle: -25 };
      const homologue = c.tone === "rose" ? -1 : 1;
      return across(b.x, b.y, b.angle, homologue * 2 * HALF + sign * HALF);
    }
    case 2: {
      // Pairs on the equator: each homologue faces the pole it will go to.
      const y = c.pair === "long" ? 92 : 150;
      const facing = goesLeft(i) ? -1 : 1;
      return { x: EQUATOR_X + facing * 2 * HALF + sign * HALF, y, angle: 0 };
    }
    case 3: {
      // Two cells, one chromosome of each pair in each, sisters still joined.
      const x = cellX(i) + (c.pair === "long" ? -10 : 12);
      return { x: x + sign * HALF, y: MID_Y, angle: 0 };
    }
    case 4: {
      // Lying along each cell's equator, sisters facing the top and bottom poles.
      const x = cellX(i) + (c.pair === "long" ? -16 : 18);
      return { x, y: MID_Y + sign * HALF, angle: 90 };
    }
    default: {
      // Four cells: the upper sister went up, the lower one down.
      const x = cellX(i) + (c.pair === "long" ? -8 : 8);
      return { x, y: side === 0 ? 76 : 164, angle: 0 };
    }
  }
}

/** Distance from a pole to a point, and the angle of that line in degrees. */
export function fibre(pole: Point, to: Point) {
  const dx = to.x - pole.x;
  const dy = to.y - pole.y;
  return { length: Math.hypot(dx, dy), angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

const POLES_I = { left: { x: 28, y: MID_Y }, right: { x: 292, y: MID_Y } };
const polesII = (cx: number) => [
  { x: cx, y: 64 },
  { x: cx, y: 176 },
];

const TONE = {
  rose: "fill-rose-500 dark:fill-rose-400",
  sky: "fill-sky-500 dark:fill-sky-400",
} as const;

const CELL = "fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400";
const NUCLEUS = "fill-indigo-100/50 stroke-indigo-500 dark:fill-indigo-900/30 dark:stroke-indigo-300";
const FIBRE = "stroke-slate-400 dark:stroke-slate-500";

function Fibre({ from, to, on }: { from: Point; to: Point; on: boolean }) {
  const f = fibre(from, to);
  return (
    <line
      x1={0}
      y1={0}
      x2={1}
      y2={0}
      vectorEffect="non-scaling-stroke"
      className={`${FIBRE} ${MOTION}`}
      strokeWidth={1}
      style={{ transform: svgTransform({ x: from.x, y: from.y, angle: f.angle, sx: f.length }), opacity: on ? 0.8 : 0 }}
    />
  );
}

/** The picture for one step. */
export function MeiosisScene({ step }: { step: number }) {
  const sides = [0, 1] as const;
  return (
    <g>
      {/* One cell, then two, then four (crossfade). */}
      <ellipse cx={160} cy={MID_Y} rx={140} ry={86} strokeWidth={2} className={`${CELL} ${MOTION}`} style={{ opacity: step <= 2 ? 1 : 0 }} />
      {cellsAt(3).map((p) => (
        <circle key={`c2-${p.x}`} cx={p.x} cy={p.y} r={66} strokeWidth={2} className={`${CELL} ${MOTION}`} style={{ opacity: step === 3 || step === 4 ? 1 : 0 }} />
      ))}
      {cellsAt(5).map((p) => (
        <circle key={`c4-${p.x}-${p.y}`} cx={p.x} cy={p.y} r={40} strokeWidth={2} className={`${CELL} ${MOTION}`} style={{ opacity: step === 5 ? 1 : 0 }} />
      ))}

      {/* Nuclear envelopes: the old one breaks down in prophase I, new ones form in each telophase. */}
      <circle
        cx={160}
        cy={MID_Y}
        r={54}
        strokeWidth={1.5}
        strokeDasharray={step === 0 ? undefined : "5 5"}
        className={`${NUCLEUS} ${MOTION}`}
        style={{ opacity: step === 0 ? 1 : step === 1 ? 0.4 : 0 }}
      />
      {cellsAt(3).map((p) => (
        <circle key={`n2-${p.x}`} cx={p.x} cy={p.y} r={34} strokeWidth={1.5} className={`${NUCLEUS} ${MOTION}`} style={{ opacity: step === 3 ? 1 : 0 }} />
      ))}
      {cellsAt(5).map((p) => (
        <circle key={`n4-${p.x}-${p.y}`} cx={p.x} cy={p.y} r={24} strokeWidth={1.5} className={`${NUCLEUS} ${MOTION}`} style={{ opacity: step === 5 ? 1 : 0 }} />
      ))}

      {/* Meiosis I spindle: one fibre to each homologue's centromere. */}
      {CHROMOSOMES.map((_, i) => {
        const a = chromatidPose(2, i, 0);
        const b = chromatidPose(2, i, 1);
        return (
          <Fibre
            key={`f1-${i}`}
            from={goesLeft(i) ? POLES_I.left : POLES_I.right}
            to={{ x: (a.x + b.x) / 2, y: a.y }}
            on={step === 2}
          />
        );
      })}
      {/* Meiosis II spindles: one fibre to each chromatid. */}
      {CHROMOSOMES.flatMap((_, i) =>
        sides.map((side) => (
          <Fibre key={`f2-${i}-${side}`} from={polesII(cellX(i))[side]} to={chromatidPose(4, i, side)} on={step === 4} />
        )),
      )}
      {[POLES_I.left, POLES_I.right].map((p) => (
        <circle key={`p1-${p.x}`} cx={p.x} cy={p.y} r={4} className={`fill-amber-500 ${MOTION}`} style={{ opacity: step === 2 ? 1 : 0 }} />
      ))}
      {[88, 232].flatMap((cx) =>
        polesII(cx).map((p) => (
          <circle key={`p2-${p.x}-${p.y}`} cx={p.x} cy={p.y} r={4} className={`fill-amber-500 ${MOTION}`} style={{ opacity: step === 4 ? 1 : 0 }} />
        )),
      )}

      {/* Equators. */}
      <line x1={EQUATOR_X} y1={44} x2={EQUATOR_X} y2={196} strokeDasharray="3 4" className={`stroke-indigo-400 ${MOTION}`} style={{ opacity: step === 2 ? 1 : 0 }} />
      {[88, 232].map((cx) => (
        <line key={`eq-${cx}`} x1={cx - 52} y1={MID_Y} x2={cx + 52} y2={MID_Y} strokeDasharray="3 4" className={`stroke-indigo-400 ${MOTION}`} style={{ opacity: step === 4 ? 1 : 0 }} />
      ))}

      {/* The 8 chromatids. */}
      {CHROMOSOMES.flatMap((c, i) =>
        sides.map((side) => (
          <rect
            key={`${c.id}-${side}`}
            x={-2.5}
            y={-c.length / 2}
            width={5}
            height={c.length}
            rx={2.5}
            className={`${TONE[c.tone]} ${MOTION}`}
            style={{ transform: svgTransform(chromatidPose(step, i, side)) }}
          />
        )),
      )}

      <text x={92} y={78} textAnchor="middle" className={`fill-indigo-700 text-[11px] dark:fill-indigo-300 ${MOTION}`} style={{ opacity: step === 1 ? 1 : 0 }}>
        bivalent
      </text>
      <text x={EQUATOR_X + 5} y={194} className={`fill-indigo-700 text-[11px] dark:fill-indigo-300 ${MOTION}`} style={{ opacity: step === 2 ? 1 : 0 }}>
        equator
      </text>

      <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {MEIOSIS_STEPS[step].title}
      </text>
      <text x={160} y={230} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
        {countLabel(COUNTS[step])}
      </text>
    </g>
  );
}

export default function ImatMeiosisCounts() {
  return (
    <StepFigure
      title="Animation · meiosis: chromosome number and DNA"
      label="A cell with four chromosomes going through meiosis I and II to make four haploid cells, with the chromosome number n and the DNA content c at each step"
      viewBox="0 0 320 236"
      steps={MEIOSIS_STEPS}
      note="Rose chromosomes came from the mother, sky ones from the father. n counts chromosome sets, c counts DNA (one unreplicated set = 1c). Crossing over is left out to keep the counts clear."
    >
      {(step) => <MeiosisScene step={step} />}
    </StepFigure>
  );
}
