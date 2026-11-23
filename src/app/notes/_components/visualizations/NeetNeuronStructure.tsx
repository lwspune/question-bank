/**
 * Static figure: the parts of a neuron and its three types, in the words of the
 * NEET concept "The neural system and the neuron" (nzonc-neuron).
 *
 * - A myelinated neuron: dendrites (short, repeatedly branched, with Nissl's
 *   granules), the cell body with Nissl's granules, the axon wrapped by Schwann
 *   cells forming a myelin sheath, the nodes of Ranvier (the gaps between two
 *   adjacent myelin sheaths), and the branched far end of the axon ending in
 *   synaptic knobs holding synaptic vesicles.
 * - The impulse: towards the cell body in the dendrites, away from it along the
 *   axon.
 * - The three types by the number of axons and dendrites, with where the
 *   concept places each: multipolar (cerebral cortex), bipolar (retina),
 *   unipolar (usually the embryonic stage).
 *
 * Data exported and pinned by tests/notes-neet-visuals-bio-b.test.ts. Server
 * component, no client state.
 */

export type P = { x: number; y: number };

export const AXON_Y = 78;
export const BODY = { x: 62, y: AXON_Y, r: 20 };
export const AXON_START = BODY.x + BODY.r;
export const AXON_END = 246;

/** Myelin sheaths along the axon (x from, x to). */
export const MYELIN: readonly { from: number; to: number }[] = [
  { from: 96, to: 134 },
  { from: 140, to: 178 },
  { from: 184, to: 222 },
  { from: 228, to: 244 },
];

/** Nodes of Ranvier: the gaps between two adjacent myelin sheaths. */
export function nodesOfRanvier(sheaths: readonly { from: number; to: number }[] = MYELIN): { from: number; to: number }[] {
  return sheaths.slice(1).map((s, i) => ({ from: sheaths[i].to, to: s.from }));
}

/** Dendrites: each a main branch (into the cell body) and a side branch. */
export const DENDRITES: readonly { main: readonly P[]; side: readonly P[] }[] = [
  { main: [{ x: 48, y: 64 }, { x: 34, y: 46 }, { x: 24, y: 34 }], side: [{ x: 34, y: 46 }, { x: 42, y: 32 }] },
  { main: [{ x: 43, y: 82 }, { x: 26, y: 84 }, { x: 12, y: 76 }], side: [{ x: 26, y: 84 }, { x: 14, y: 94 }] },
  { main: [{ x: 50, y: 94 }, { x: 38, y: 110 }, { x: 30, y: 122 }], side: [{ x: 38, y: 110 }, { x: 50, y: 120 }] },
  { main: [{ x: 66, y: 59 }, { x: 68, y: 42 }, { x: 60, y: 30 }], side: [{ x: 68, y: 42 }, { x: 78, y: 32 }] },
];

/** The branched far end of the axon, each branch ending in a synaptic knob. */
export const KNOBS: readonly P[] = [
  { x: 280, y: 53 },
  { x: 289, y: AXON_Y },
  { x: 280, y: 103 },
];

/** Nissl's granules: in the cell body and in the dendrites. */
export const NISSL: readonly (P & { where: "cell body" | "dendrite" })[] = [
  { x: 52, y: 70, where: "cell body" },
  { x: 58, y: 92, where: "cell body" },
  { x: 72, y: 88, where: "cell body" },
  { x: 74, y: 70, where: "cell body" },
  { x: 54, y: 84, where: "cell body" },
  { x: 40, y: 56, where: "dendrite" },
  { x: 34, y: 83, where: "dendrite" },
  { x: 44, y: 102, where: "dendrite" },
];

/** The labels the figure carries, in the concept's words. */
export const PART_LABELS = [
  "Dendrites",
  "Cell body",
  "Nissl's granules",
  "Axon",
  "Myelin sheath",
  "(Schwann cells)",
  "Node of Ranvier",
  "Synaptic knob",
  "synaptic vesicles",
] as const;

export type NeuronType = { name: string; axons: number; dendrites: number; place: string };
/** The concept's table: by the number of axons and dendrites. */
export const NEURON_TYPES: readonly NeuronType[] = [
  { name: "Multipolar", axons: 1, dendrites: 3, place: "cerebral cortex" },
  { name: "Bipolar", axons: 1, dendrites: 1, place: "retina" },
  { name: "Unipolar", axons: 1, dendrites: 0, place: "embryonic stage" },
];
const TYPE_X = [55, 160, 265];

const poly = (pts: readonly P[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");

const CELL = "fill-amber-100 stroke-amber-700 dark:fill-amber-950/50 dark:stroke-amber-300";
const FIBRE = "fill-none stroke-amber-700 dark:stroke-amber-300";
const LABEL = "fill-foreground text-[10px]";
const LEADER = "stroke-muted-foreground";

function TypeSketch({ t, cx }: { t: NeuronType; cx: number }) {
  const cy = 190;
  const ends =
    t.dendrites === 3
      ? [
          { x: cx - 18, y: 176 },
          { x: cx, y: 170 },
          { x: cx + 18, y: 176 },
        ]
      : t.dendrites === 1
        ? [{ x: cx, y: 170 }]
        : [];
  return (
    <g>
      {ends.map((e, i) => (
        <g key={i}>
          <line x1={cx + (e.x - cx) * 0.3} y1={cy - 6} x2={e.x} y2={e.y} strokeWidth={1.75} className={FIBRE} />
          <line x1={e.x} y1={e.y} x2={e.x - 4} y2={e.y - 5} strokeWidth={1.25} className={FIBRE} />
          <line x1={e.x} y1={e.y} x2={e.x + 4} y2={e.y - 5} strokeWidth={1.25} className={FIBRE} />
        </g>
      ))}
      {/* One axon, branched at its far end. */}
      <line x1={cx} y1={cy + 8} x2={cx} y2={224} strokeWidth={2} className={FIBRE} />
      <line x1={cx} y1={224} x2={cx - 5} y2={230} strokeWidth={1.25} className={FIBRE} />
      <line x1={cx} y1={224} x2={cx + 5} y2={230} strokeWidth={1.25} className={FIBRE} />
      <circle cx={cx} cy={cy} r={8} strokeWidth={1.5} className={CELL} />
      <text x={cx + 9} y={214} className="fill-muted-foreground text-[10px]">axon</text>
      <text x={cx} y={242} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {t.name}
      </text>
      <text x={cx} y={254} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {t.place}
      </text>
    </g>
  );
}

export default function NeetNeuronStructure() {
  const nodes = nodesOfRanvier();
  const mid = nodes[1];
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the structure of a neuron
      </p>
      <svg
        viewBox="0 0 320 260"
        className="block h-auto w-full"
        role="img"
        aria-label="A myelinated neuron: branched dendrites lead into the cell body with Nissl's granules; a long axon wrapped in myelin sheaths with nodes of Ranvier between them ends in branches with synaptic knobs. The impulse runs from the dendrites through the cell body and away along the axon. Below, multipolar, bipolar and unipolar neurons."
      >
        {/* Dendrites. */}
        {DENDRITES.map((d, i) => (
          <g key={i}>
            <polyline points={poly(d.main)} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={FIBRE} />
            <polyline points={poly(d.side)} strokeWidth={1.75} strokeLinecap="round" className={FIBRE} />
          </g>
        ))}

        {/* Axon, its branched end and the synaptic knobs. */}
        <line x1={AXON_START} y1={AXON_Y} x2={AXON_END} y2={AXON_Y} strokeWidth={3} className={FIBRE} />
        {KNOBS.map((k, i) => (
          <line key={i} x1={AXON_END} y1={AXON_Y} x2={k.x - (i === 1 ? 6 : 3)} y2={k.y + (i === 0 ? 4 : i === 2 ? -4 : 0)} strokeWidth={2} className={FIBRE} />
        ))}
        {KNOBS.map((k, i) => (
          <g key={i}>
            <circle cx={k.x} cy={k.y} r={7} strokeWidth={1.5} className={CELL} />
            {[
              [-2.5, -2],
              [2, -2.5],
              [0, 2.5],
            ].map(([dx, dy], j) => (
              <circle key={j} cx={k.x + dx} cy={k.y + dy} r={1.4} className="fill-violet-600 dark:fill-violet-300" />
            ))}
          </g>
        ))}

        {/* Myelin sheaths (Schwann cells). */}
        {MYELIN.map((m) => (
          <rect key={m.from} x={m.from} y={AXON_Y - 7} width={m.to - m.from} height={14} rx={6} strokeWidth={1.25} className="fill-sky-100 stroke-sky-700 dark:fill-sky-950/60 dark:stroke-sky-300" />
        ))}
        <ellipse cx={159} cy={AXON_Y - 3} rx={4} ry={2.5} className="fill-sky-600 dark:fill-sky-400" />

        {/* Cell body with nucleus and Nissl's granules. */}
        <circle cx={BODY.x} cy={BODY.y} r={BODY.r} strokeWidth={2} className={CELL} />
        <circle cx={BODY.x + 2} cy={BODY.y - 1} r={6} strokeWidth={1} className="fill-amber-300 stroke-amber-800 dark:fill-amber-700 dark:stroke-amber-200" />
        {NISSL.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={1.6} className="fill-indigo-700 dark:fill-indigo-300" />
        ))}

        {/* Direction of the impulse. */}
        <polygon points="33,52 41,57 34,61" className="fill-rose-600 dark:fill-rose-400" />
        <line x1={110} y1={92} x2={128} y2={92} strokeWidth={1.25} className="stroke-rose-600 dark:stroke-rose-400" />
        <polygon points="128,89 134,92 128,95" className="fill-rose-600 dark:fill-rose-400" />
        <line x1={20} y1={138} x2={294} y2={138} strokeWidth={1.25} className="stroke-rose-600 dark:stroke-rose-400" />
        <polygon points="294,134 302,138 294,142" className="fill-rose-600 dark:fill-rose-400" />
        <text x={160} y={133} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          impulse: dendrites → cell body → axon
        </text>

        {/* Labels. */}
        <text x={4} y={14} className="fill-foreground text-[10px] font-semibold">Dendrites</text>
        <line x1={18} y1={17} x2={23} y2={31} strokeWidth={0.75} className={LEADER} />
        <text x={92} y={26} className="fill-foreground text-[10px] font-semibold">Cell body</text>
        <line x1={92} y1={29} x2={77} y2={63} strokeWidth={0.75} className={LEADER} />
        <text x={92} y={44} className={LABEL}>Nissl&apos;s granules</text>
        <line x1={92} y1={47} x2={75} y2={69} strokeWidth={0.75} className={LEADER} />
        <text x={88} y={110} className="fill-foreground text-[10px] font-semibold">Axon</text>
        <line x1={91} y1={101} x2={89} y2={AXON_Y + 2} strokeWidth={0.75} className={LEADER} />
        <text x={186} y={48} className="fill-foreground text-[10px] font-semibold">Myelin sheath</text>
        <text x={186} y={60} className={LABEL}>(Schwann cells)</text>
        <line x1={196} y1={63} x2={198} y2={AXON_Y - 7} strokeWidth={0.75} className={LEADER} />
        <text x={(mid.from + mid.to) / 2} y={110} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          Node of Ranvier
        </text>
        <line x1={(mid.from + mid.to) / 2} y1={101} x2={(mid.from + mid.to) / 2} y2={AXON_Y + 2} strokeWidth={0.75} className={LEADER} />
        <text x={318} y={32} textAnchor="end" className="fill-foreground text-[10px] font-semibold">Synaptic knob</text>
        <line x1={283} y1={35} x2={281} y2={45} strokeWidth={0.75} className={LEADER} />
        <text x={318} y={124} textAnchor="end" className={LABEL}>synaptic vesicles</text>
        <line x1={286} y1={115} x2={281} y2={106} strokeWidth={0.75} className={LEADER} />

        {/* The three types. */}
        <line x1={0} y1={150} x2={320} y2={150} strokeWidth={1} className="stroke-border" />
        <text x={4} y={163} className="fill-foreground text-[10px] font-semibold">Three types</text>
        {NEURON_TYPES.map((t, i) => (
          <TypeSketch key={t.name} t={t} cx={TYPE_X[i]} />
        ))}
      </svg>
      <p className="mt-3 text-xs text-muted-foreground">
        Dendrites carry impulses towards the cell body; the axon carries them away, to a synapse or a neuro-muscular
        junction. Multipolar: one axon and two or more dendrites. Bipolar: one axon and one dendrite. Unipolar: cell
        body with one axon only. The synaptic vesicles hold neurotransmitters.
      </p>
    </div>
  );
}
