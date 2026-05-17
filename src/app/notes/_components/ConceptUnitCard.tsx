import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";
import type { ConceptUnit } from "@/app/notes/_types";
import FormulaBlock from "./FormulaBlock";
import WorkedExampleAuthored from "./WorkedExampleAuthored";
import TrapCallout from "./TrapCallout";

type Props = {
  concept: ConceptUnit;
  /** 1-based index used for visual numbering ("Concept 3 of 8"). */
  index: number;
  /** Total concepts in the subtopic — drives the "of N" label. */
  total: number;
  /** Pre-resolved bank PYQ row, or null when pyqExampleId didn't resolve. */
  pyqExample: WorkedExample | null;
};

/**
 * One full concept unit in read mode: intuition → definition → formula →
 * authored example → PYQ application → traps. The unit is the atomic
 * learning block; a student reads top-to-bottom and walks away knowing it.
 *
 * Anchored by concept.slug so we can link to specific concepts later.
 */
export default function ConceptUnitCard({
  concept,
  index,
  total,
  pyqExample,
}: Props) {
  return (
    <section
      id={concept.slug}
      className="scroll-mt-20 rounded-xl border bg-card p-6 shadow-sm"
    >
      <header className="mb-5 border-b pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Concept {index} of {total}
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {concept.name}
        </h2>
      </header>

      {/* Intuition + definition */}
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Intuition
          </p>
          <div className="font-serif text-base leading-relaxed text-foreground">
            <KatexRenderer text={concept.intuition} />
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Definition
          </p>
          <div className="font-serif text-base leading-relaxed text-foreground">
            <KatexRenderer text={concept.definition} />
          </div>
        </div>
      </div>

      {/* Formula box */}
      {concept.formula && (
        <div className="mt-5">
          <FormulaBlock formula={concept.formula} />
        </div>
      )}

      {/* Authored worked example — always visible, the core teaching */}
      <div className="mt-6">
        <WorkedExampleAuthored example={concept.authoredExample} />
      </div>

      {/* Bank PYQ application — same concept on a real past-year question */}
      {pyqExample && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            From the bank · past-year question
          </p>
          <WorkedExampleCard rank={index} example={pyqExample} />
        </div>
      )}

      {/* Traps specific to this concept */}
      {concept.traps && concept.traps.length > 0 && (
        <div className="mt-6 space-y-3">
          {concept.traps.map((t, i) => (
            <TrapCallout key={i} title={t.title} body={t.body} />
          ))}
        </div>
      )}

      {/* Per-concept drill — sends to /browse filtered to exactly these UUIDs */}
      {concept.drillQuestionIds && concept.drillQuestionIds.length > 0 && (
        <div className="mt-6 flex items-center justify-end border-t pt-4">
          <Link
            href={buildBrowseUrl({ extraIds: concept.drillQuestionIds })}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
          >
            <Target className="h-3.5 w-3.5" aria-hidden />
            Drill {concept.drillQuestionIds.length} more on {concept.name.toLowerCase()}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  );
}
