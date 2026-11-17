"use client";

/**
 * Animation: translation of a short mRNA on a ribosome, for the IMAT concept
 * "Translation on the ribosome: initiation, elongation, termination".
 *
 * The mRNA is 5′-AUG CCU GAA UAA-3′: the codons of the notes' own worked
 * example (concept "From DNA to mRNA codons to tRNA anticodons": AUG = Met,
 * CCU = Pro, GAA = Glu, anticodons UAC, GGA, CUU) followed by the stop codon
 * UAA. The ribosome reads it 5′→3′ one codon at a time; at each codon the tRNA
 * with the matching anticodon brings its amino acid, the chain is passed onto
 * the newest amino acid, and at UAA a release factor (a protein, not a tRNA)
 * frees the polypeptide Met-Pro-Glu.
 *
 * The ribosome, each tRNA and each amino acid is one shape whose transform
 * changes between steps. tests/notes-imat-visuals-biomol.test.ts pins the codon
 * table, the anticodons (complements of the codons) and the order of events.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const TRANSLATION_STEPS: readonly FigureStep[] = [
  {
    title: "Initiation",
    caption:
      "The small subunit binds the mRNA and finds the start codon AUG. The initiator tRNA (anticodon UAC) carrying methionine pairs with it in the P site, and the large subunit joins.",
  },
  {
    title: "A charged tRNA enters",
    caption: "The tRNA whose anticodon GGA pairs with the next codon, CCU, enters the A site carrying proline.",
  },
  {
    title: "Peptide bond",
    caption:
      "The rRNA forms a peptide bond, passing methionine onto proline. The chain now sits on the tRNA in the A site.",
  },
  {
    title: "The ribosome moves on",
    caption:
      "The ribosome moves one codon along the mRNA, 5′→3′. The empty tRNA leaves from the E site, and the tRNA with anticodon CUU brings glutamate to the A site.",
  },
  {
    title: "The chain grows",
    caption: "Another peptide bond: the chain Met-Pro is passed onto glutamate. It grows from its amino (N) end.",
  },
  {
    title: "Stop codon",
    caption:
      "The ribosome moves on again and the stop codon UAA reaches the A site. No tRNA pairs with it: a release factor, a protein, binds instead.",
  },
  {
    title: "Termination",
    caption:
      "The polypeptide Met-Pro-Glu is freed and the two subunits separate. It will now fold into its shape.",
  },
];

export type Codon = { codon: string; anticodon: string; aminoAcid: string | null };

/** The mRNA, codon by codon (5′→3′), with each codon's anticodon (written 3′→5′) and amino acid. */
export const CODONS: readonly Codon[] = [
  { codon: "AUG", anticodon: "UAC", aminoAcid: "Met" },
  { codon: "CCU", anticodon: "GGA", aminoAcid: "Pro" },
  { codon: "GAA", anticodon: "CUU", aminoAcid: "Glu" },
  { codon: "UAA", anticodon: "", aminoAcid: null },
];

/** The ribosome's P site is over this codon at each step. */
export const P_SITE_AT: readonly number[] = [0, 0, 0, 1, 1, 2, 2];

/** Which codon's tRNA holds the growing chain, and how long the chain is, at each step (null = released). */
export const CHAIN: readonly ({ holder: number; length: number } | null)[] = [
  { holder: 0, length: 1 },
  { holder: 0, length: 1 },
  { holder: 1, length: 2 },
  { holder: 1, length: 2 },
  { holder: 2, length: 3 },
  { holder: 2, length: 3 },
  null,
];

export type TrnaState = "waiting" | "bound" | "leaving" | "gone";

/** Where each tRNA (the one for codon 0, 1, 2) is at each step. */
export const TRNA_STATES: readonly (readonly TrnaState[])[] = [
  ["bound", "waiting", "waiting"],
  ["bound", "bound", "waiting"],
  ["bound", "bound", "waiting"],
  ["leaving", "bound", "bound"],
  ["gone", "bound", "bound"],
  ["gone", "leaving", "bound"],
  ["gone", "gone", "bound"],
];

export const trnaState = (step: number, i: number): TrnaState => TRNA_STATES[step][i];

/** x of the middle of codon k on the mRNA. */
export const codonX = (k: number) => 100 + 52 * k;
const MRNA_Y = 166;
const TRNA_Y = 104;
const AA_Y = 90;
const SITE = 52;

const AA_TONE: Record<string, string> = {
  Met: "fill-emerald-200 stroke-emerald-600 dark:fill-emerald-800 dark:stroke-emerald-400",
  Pro: "fill-sky-200 stroke-sky-600 dark:fill-sky-800 dark:stroke-sky-400",
  Glu: "fill-amber-200 stroke-amber-600 dark:fill-amber-800 dark:stroke-amber-400",
};

/** Where amino acid j sits at a step. */
export function aminoAcidPose(step: number, j: number): { x: number; y: number; on: boolean } {
  const c = CHAIN[step];
  if (c === null) return { x: 128 + 30 * j, y: 30, on: true };
  if (j < c.length) {
    // In the chain: the newest on its tRNA, the older ones stacked above it.
    return { x: codonX(c.holder), y: AA_Y - 22 * (c.length - 1 - j), on: true };
  }
  const s = trnaState(step, j);
  const t = trnaPose(step, j);
  return { x: t.x, y: t.y - 14, on: s === "bound" };
}

/** Top-left anchor of tRNA i at a step. */
export function trnaPose(step: number, i: number): { x: number; y: number; opacity: number } {
  const s = trnaState(step, i);
  const x = codonX(i);
  if (s === "waiting") return { x: x + 34, y: 36, opacity: 0 };
  if (s === "gone") return { x: x - 40, y: 36, opacity: 0 };
  if (s === "leaving") return { x: x - 10, y: TRNA_Y - 12, opacity: 0.45 };
  return { x, y: TRNA_Y, opacity: step === 6 ? 0.5 : 1 };
}

const LETTER = "fill-foreground text-[11px] font-semibold";
const SMALL = "fill-muted-foreground text-[10px]";

/** A peptide bond between two amino acids, as a stretched unit line. */
function Bond({ a, b, on }: { a: { x: number; y: number }; b: { x: number; y: number }; on: boolean }) {
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  return (
    <line
      x1={0}
      y1={0}
      x2={1}
      y2={0}
      vectorEffect="non-scaling-stroke"
      strokeWidth={2}
      className={`stroke-slate-500 dark:stroke-slate-400 ${MOTION}`}
      style={{ transform: svgTransform({ x: a.x, y: a.y, angle, sx: len }), opacity: on ? 1 : 0 }}
    />
  );
}

/** The picture for one step. */
export function TranslationScene({ step }: { step: number }) {
  const px = codonX(P_SITE_AT[step]);
  const apart = step === 6;
  const chain = CHAIN[step];
  const rfOn = step >= 5;
  const trnaLabel = trnaPose(step, P_SITE_AT[step]);

  return (
    <g>
      {/* The mRNA, read 5′→3′. */}
      <line x1={20} y1={MRNA_Y + 10} x2={300} y2={MRNA_Y + 10} strokeWidth={2} className="stroke-indigo-400 dark:stroke-indigo-500" />
      <text x={10} y={MRNA_Y + 10} textAnchor="middle" dominantBaseline="central" className="fill-muted-foreground text-[10px] font-semibold">
        5′
      </text>
      <text x={308} y={MRNA_Y + 10} textAnchor="middle" dominantBaseline="central" className="fill-muted-foreground text-[10px] font-semibold">
        3′
      </text>
      <text x={300} y={MRNA_Y - 14} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
        mRNA
      </text>
      {CODONS.map((c, k) =>
        [...c.codon].map((b, n) => (
          <text key={`m-${k}-${n}`} x={codonX(k) + (n - 1) * 13} y={MRNA_Y} textAnchor="middle" dominantBaseline="central" className={LETTER}>
            {b}
          </text>
        )),
      )}
      <text x={codonX(3)} y={220} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
        stop codon
      </text>

      {/* Ribosome: large subunit above the mRNA, small subunit below, sites E, P, A. */}
      <g className={MOTION} style={{ transform: svgTransform({ x: px, y: apart ? -12 : 0 }), opacity: apart ? 0.35 : 1 }}>
        <rect x={-80} y={60} width={160} height={92} rx={30} strokeWidth={1.5} className="fill-slate-200/50 stroke-slate-500 dark:fill-slate-700/40 dark:stroke-slate-400" />
        <text x={-40} y={74} textAnchor="middle" className={SMALL}>
          ribosome
        </text>
      </g>
      <g className={MOTION} style={{ transform: svgTransform({ x: px, y: 0 }), opacity: apart ? 0.35 : 1 }}>
        <ellipse cx={0} cy={182} rx={80} ry={12} strokeWidth={1.5} className="fill-slate-200/50 stroke-slate-500 dark:fill-slate-700/40 dark:stroke-slate-400" />
        {(["E", "P", "A"] as const).map((site, n) => (
          <text key={site} x={(n - 1) * SITE} y={206} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
            {site}
          </text>
        ))}
      </g>

      {/* tRNAs: the anticodon at the foot, paired with its codon. */}
      {CODONS.slice(0, 3).map((c, i) => {
        const t = trnaPose(step, i);
        return (
          <g key={`t-${i}`} className={MOTION} style={{ transform: svgTransform({ x: t.x, y: t.y }), opacity: t.opacity }}>
            <rect x={-13} y={-4} width={26} height={40} rx={5} strokeWidth={1} className="fill-rose-100 stroke-rose-500 dark:fill-rose-900/40 dark:stroke-rose-400" />
            {[...c.anticodon].map((b, n) => (
              <text key={n} x={(n - 1) * 13} y={48} textAnchor="middle" dominantBaseline="central" className={LETTER}>
                {b}
              </text>
            ))}
          </g>
        );
      })}
      <text
        x={0}
        y={0}
        textAnchor="end"
        className={`fill-rose-700 text-[10px] font-semibold dark:fill-rose-300 ${MOTION}`}
        style={{ transform: svgTransform({ x: trnaLabel.x - 18, y: TRNA_Y + 20 }) }}
      >
        tRNA
      </text>

      {/* Release factor in the A site at the stop codon. */}
      <g
        className={MOTION}
        style={{ transform: svgTransform(rfOn ? { x: codonX(3), y: TRNA_Y } : { x: codonX(3) + 34, y: 36 }), opacity: rfOn ? 1 : 0 }}
      >
        <rect x={-13} y={-4} width={26} height={48} rx={8} strokeWidth={1} className="fill-violet-200 stroke-violet-600 dark:fill-violet-900/50 dark:stroke-violet-400" />
        <text x={0} y={-12} textAnchor="middle" className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
          release factor
        </text>
      </g>

      {/* Peptide bonds, then the amino acids. */}
      <Bond a={aminoAcidPose(step, 0)} b={aminoAcidPose(step, 1)} on={chain === null || chain.length >= 2} />
      <Bond a={aminoAcidPose(step, 1)} b={aminoAcidPose(step, 2)} on={chain === null || chain.length >= 3} />
      {CODONS.slice(0, 3).map((c, j) => {
        const a = aminoAcidPose(step, j);
        return (
          <g key={`aa-${j}`} className={MOTION} style={{ transform: svgTransform({ x: a.x, y: a.y }), opacity: a.on ? 1 : 0 }}>
            <circle cx={0} cy={0} r={11} strokeWidth={1.5} className={AA_TONE[c.aminoAcid!]} />
            <text x={0} y={0} textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[9px] font-semibold">
              {c.aminoAcid}
            </text>
          </g>
        );
      })}
      <text x={106} y={30} textAnchor="end" dominantBaseline="central" className={`${SMALL} ${MOTION}`} style={{ opacity: chain === null ? 1 : 0 }}>
        N end
      </text>
      <text x={202} y={30} dominantBaseline="central" className={`${SMALL} ${MOTION}`} style={{ opacity: chain === null ? 1 : 0 }}>
        C end
      </text>

      <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {TRANSLATION_STEPS[step].title}
      </text>
    </g>
  );
}

export default function ImatTranslation() {
  return (
    <StepFigure
      title="Animation · translation on the ribosome"
      label="A ribosome reads the mRNA AUG CCU GAA UAA; tRNAs with anticodons UAC, GGA and CUU bring methionine, proline and glutamate, and at the stop codon a release factor frees the chain Met-Pro-Glu"
      viewBox="0 0 320 226"
      steps={TRANSLATION_STEPS}
      note="Codons AUG CCU GAA UAA code for Met, Pro, Glu, stop. Each anticodon, written 3′→5′ under its codon, is the codon's complement."
    >
      {(step) => <TranslationScene step={step} />}
    </StepFigure>
  );
}
