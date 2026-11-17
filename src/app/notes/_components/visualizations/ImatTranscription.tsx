"use client";

/**
 * Animation: transcription of a short gene, for the IMAT concept "The stages
 * of transcription and where it happens". RNA polymerase binds the promoter,
 * opens the helix, moves along the template strand reading it 3′→5′ while the
 * mRNA grows 5′→3′, and lets go at the terminator.
 *
 * The sequence is the one the notes' own worked example uses (concept "Template
 * strand, coding strand and the mRNA sequence"): template 3′-TACCGGATT-5′,
 * mRNA 5′-AUGGCCUAA-3′, coding strand 5′-ATGGCCTAA-3′. The rows are drawn base
 * by base, the template in the middle: it pairs with the coding strand above
 * and, inside the polymerase, with the new RNA below.
 *
 * Each mRNA base is one shape that fades in when it is made and slides down
 * when it leaves the polymerase, so the RNA visibly peels off the template.
 * tests/notes-imat-visuals-biomol.test.ts pins the pairing (U opposite A) and
 * the 5′/3′ ends.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const TRANSCRIPTION_STEPS: readonly FigureStep[] = [
  {
    title: "Initiation: binding",
    caption: "RNA polymerase binds the promoter, a DNA sequence just before the gene.",
  },
  {
    title: "Initiation: opening",
    caption:
      "RNA polymerase opens a short stretch of the helix itself, with no primer. Only one strand, the template strand, will be read.",
  },
  {
    title: "Elongation",
    caption:
      "RNA polymerase moves along the template, reading it 3′→5′, and adds ribonucleotides to the 3′ end of the RNA, so the RNA grows 5′→3′. Opposite A in the template it puts U.",
  },
  {
    title: "End of the gene",
    caption: "Behind the polymerase the DNA closes again and the new RNA peels away from the template.",
  },
  {
    title: "Termination",
    caption:
      "At a terminator sequence the RNA and the enzyme are released. The mRNA 5′-AUGGCCUAA-3′ has the coding strand's sequence, with U for T.",
  },
];

/** Template strand, written 3′→5′ left to right (the worked example). */
export const TEMPLATE = "TACCGGATT";
/** Coding strand, 5′→3′ left to right. */
export const CODING = "ATGGCCTAA";
/** The mRNA, 5′→3′ left to right. */
export const MRNA = "AUGGCCUAA";

/** End labels of each row, left then right. */
export const ENDS = {
  coding: ["5′", "3′"],
  template: ["3′", "5′"],
  mrna: ["5′", "3′"],
} as const;

const RNA_PAIR: Record<string, string> = { A: "U", T: "A", G: "C", C: "G" };
const DNA_PAIR: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };

/** The RNA made opposite a template sequence (A gives U). */
export function rnaComplement(template: string): string {
  return [...template].map((b) => RNA_PAIR[b]).join("");
}
/** The DNA strand that pairs with a sequence. */
export function dnaComplement(strand: string): string {
  return [...strand].map((b) => DNA_PAIR[b]).join("");
}

/** x of gene base i. */
export const baseX = (i: number) => 86 + 22 * i;
const ROW = { coding: 52, template: 100, rna: 148, peeled: 172, released: 198 } as const;
const PROMOTER_X = 46;
const TERMINATOR_X = 290;

/** Where RNA polymerase is (the gene column it sits over), per step. Before the gene = promoter. */
export const POLYMERASE_AT: readonly number[] = [-1.82, 1, 4, 8, 9.27];
/** How many mRNA bases are made by each step. */
export const MADE: readonly number[] = [0, 0, 5, 9, 9];

/** Columns where the helix is open at a step (inside the polymerase). */
export function isOpen(step: number, i: number): boolean {
  if (step === 0 || step >= 4) return false;
  const p = POLYMERASE_AT[step];
  return i >= p - 2 && i <= p + 1;
}

export type BaseState = { made: boolean; y: number; paired: boolean };

/** Where mRNA base i is at a step: not made yet, paired in the polymerase, peeled off, or released. */
export function rnaBase(step: number, i: number): BaseState {
  const made = i < MADE[step];
  if (!made) return { made, y: ROW.rna, paired: false };
  if (step >= 4) return { made, y: ROW.released, paired: false };
  if (isOpen(step, i)) return { made, y: ROW.rna, paired: true };
  return { made, y: ROW.peeled, paired: false };
}

/** Centre of the polymerase: over the open bubble, which runs from 2 bases behind it to 1 ahead. */
const polymeraseX = (step: number) => (step === 0 ? PROMOTER_X : baseX(POLYMERASE_AT[step] - 0.5));

const BOX = {
  coding: "fill-slate-100 stroke-slate-400 dark:fill-slate-800 dark:stroke-slate-500",
  template: "fill-indigo-100 stroke-indigo-500 dark:fill-indigo-900/50 dark:stroke-indigo-300",
  rna: "fill-amber-100 stroke-amber-500 dark:fill-amber-900/40 dark:stroke-amber-400",
};
const LETTER = "fill-foreground text-[11px] font-semibold";
const END = "fill-muted-foreground text-[10px] font-semibold";
const LABEL = "fill-muted-foreground text-[10px]";

function Base({ letter, box }: { letter: string; box: string }) {
  return (
    <>
      <rect x={-9} y={-9} width={18} height={18} rx={3} strokeWidth={1} className={box} />
      <text x={0} y={0} textAnchor="middle" dominantBaseline="central" className={LETTER}>
        {letter}
      </text>
    </>
  );
}

/** The picture for one step. */
export function TranscriptionScene({ step }: { step: number }) {
  const bases = [...TEMPLATE].map((_, i) => i);
  const px = polymeraseX(step);
  const released = step >= 4;
  const labelX = step <= 2 ? px + 78 : step === 3 ? px - 96 : 226;

  return (
    <g>
      {/* Promoter and terminator: DNA sequences on both strands, before and after the gene. */}
      <rect x={24} y={40} width={44} height={72} rx={4} className="fill-emerald-100 stroke-emerald-600 dark:fill-emerald-900/40 dark:stroke-emerald-400" strokeWidth={1} />
      <text x={PROMOTER_X} y={34} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
        promoter
      </text>
      <rect x={278} y={40} width={24} height={72} rx={4} className="fill-rose-100 stroke-rose-500 dark:fill-rose-900/40 dark:stroke-rose-400" strokeWidth={1} />
      <text x={TERMINATOR_X} y={34} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
        terminator
      </text>

      {/* Backbones of the two DNA strands. */}
      <line x1={20} y1={ROW.coding} x2={306} y2={ROW.coding} strokeWidth={2} className="stroke-slate-400 dark:stroke-slate-500" />
      <line x1={20} y1={ROW.template} x2={306} y2={ROW.template} strokeWidth={2} className="stroke-indigo-400 dark:stroke-indigo-500" />
      <text x={10} y={ROW.coding} textAnchor="middle" dominantBaseline="central" className={END}>
        {ENDS.coding[0]}
      </text>
      <text x={313} y={ROW.coding} textAnchor="middle" dominantBaseline="central" className={END}>
        {ENDS.coding[1]}
      </text>
      <text x={10} y={ROW.template} textAnchor="middle" dominantBaseline="central" className={END}>
        {ENDS.template[0]}
      </text>
      <text x={313} y={ROW.template} textAnchor="middle" dominantBaseline="central" className={END}>
        {ENDS.template[1]}
      </text>
      <text x={PROMOTER_X} y={124} textAnchor="middle" className={LABEL}>
        template strand
      </text>
      <text x={174} y={31} textAnchor="middle" className={LABEL}>
        coding strand
      </text>

      {/* Base pairs between the DNA strands, broken inside the polymerase. */}
      {bases.map((i) => (
        <line
          key={`dna-${i}`}
          x1={baseX(i)}
          y1={ROW.coding + 10}
          x2={baseX(i)}
          y2={ROW.template - 10}
          strokeDasharray="2 3"
          className={`stroke-slate-400 dark:stroke-slate-500 ${MOTION}`}
          style={{ opacity: isOpen(step, i) ? 0 : 1 }}
        />
      ))}
      {/* Base pairs between the template and the new RNA, only inside the polymerase. */}
      {bases.map((i) => (
        <line
          key={`rna-${i}`}
          x1={baseX(i)}
          y1={ROW.template + 10}
          x2={baseX(i)}
          y2={ROW.rna - 10}
          strokeDasharray="2 3"
          className={`stroke-amber-500 ${MOTION}`}
          style={{ opacity: rnaBase(step, i).paired ? 1 : 0 }}
        />
      ))}

      {/* Coding strand: lifts a little where the helix is open. */}
      {[...CODING].map((b, i) => (
        <g key={`c-${i}`} className={MOTION} style={{ transform: svgTransform({ x: baseX(i), y: ROW.coding - (isOpen(step, i) ? 8 : 0) }) }}>
          <Base letter={b} box={BOX.coding} />
        </g>
      ))}
      {[...TEMPLATE].map((b, i) => (
        <g key={`t-${i}`} transform={`translate(${baseX(i)} ${ROW.template})`}>
          <Base letter={b} box={BOX.template} />
        </g>
      ))}

      {/* RNA polymerase. */}
      <ellipse
        cx={0}
        cy={0}
        rx={46}
        ry={50}
        strokeWidth={1.5}
        className={`fill-violet-300/30 stroke-violet-500 dark:fill-violet-500/20 dark:stroke-violet-400 ${MOTION}`}
        style={{
          transform: svgTransform(released ? { x: 290, y: 150, sx: 0.55, sy: 0.55 } : { x: px, y: 118 }),
          opacity: released ? 0.6 : 1,
        }}
      />
      <text
        x={0}
        y={0}
        textAnchor="middle"
        className={`fill-violet-700 text-[10px] font-semibold dark:fill-violet-300 ${MOTION}`}
        style={{ transform: svgTransform({ x: labelX, y: released ? 154 : 128 }) }}
      >
        RNA polymerase
      </text>

      {/* The mRNA, base by base. */}
      {[...MRNA].map((b, i) => {
        const s = rnaBase(step, i);
        return (
          <g key={`m-${i}`} className={MOTION} style={{ transform: svgTransform({ x: baseX(i), y: s.y }), opacity: s.made ? 1 : 0 }}>
            <Base letter={b} box={BOX.rna} />
            {i === 0 && (
              <>
                <text x={-16} y={0} textAnchor="middle" dominantBaseline="central" className={END}>
                  {ENDS.mrna[0]}
                </text>
                <text x={-26} y={0} textAnchor="end" dominantBaseline="central" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
                  mRNA
                </text>
              </>
            )}
            {i === MRNA.length - 1 && (
              <text x={16} y={0} textAnchor="middle" dominantBaseline="central" className={END}>
                {ENDS.mrna[1]}
              </text>
            )}
          </g>
        );
      })}

      <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {TRANSCRIPTION_STEPS[step].title}
      </text>
    </g>
  );
}

export default function ImatTranscription() {
  return (
    <StepFigure
      title="Animation · transcription, step by step"
      label="RNA polymerase binds the promoter, reads the template strand 3′ to 5′ and makes the mRNA AUGGCCUAA 5′ to 3′, then is released at the terminator"
      viewBox="0 0 320 212"
      steps={TRANSCRIPTION_STEPS}
      note="Template 3′-TACCGGATT-5′ gives mRNA 5′-AUGGCCUAA-3′: each base is the template's complement, with U opposite A."
    >
      {(step) => <TranscriptionScene step={step} />}
    </StepFigure>
  );
}
