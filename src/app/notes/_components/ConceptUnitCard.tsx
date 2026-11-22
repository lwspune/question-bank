import { ChevronRight, Dumbbell } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import RichText from "@/components/math/RichText";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";
import type { ConceptUnit } from "@/app/notes/_types";
import FormulaBlock from "./FormulaBlock";
import WorkedExampleAuthored from "./WorkedExampleAuthored";
import SelfCheckCard from "./SelfCheckCard";
import PracticeSet from "./PracticeSet";
import PracticeGate from "./PracticeGate";
import TrapCallout from "./TrapCallout";
import ReferenceTableBlock from "./ReferenceTableBlock";
import ReportConceptDialog from "./ReportConceptDialog";
import NotesDrillButton from "./NotesDrillButton";
import type { VisualizationSlug } from "@/app/notes/_types";
import { renderServerDiagram } from "./serverDiagrams.generated";
import ClientDiagram from "./ClientDiagram.generated";
import { featuredLeadIn } from "@/lib/notes/countKind";

/**
 * A concept's diagram on a live notes page. Picture-only diagrams are drawn on
 * the server; browser-run ones load as their own script, only on a page that
 * shows one (src/lib/notes/diagramSplit.ts). Both files are generated from
 * diagramRegistry.tsx by `npm run notes:diagrams`.
 */
export function renderVisualization(slug: VisualizationSlug) {
  return renderServerDiagram(slug) ?? <ClientDiagram slug={slug} />;
}

type Props = {
  concept: ConceptUnit;
  /** Globally-unique slug of the parent subtopic — threaded to the report dialog. */
  subtopicSlug: string;
  /** 1-based index used for visual numbering ("Concept 3 of 8"). */
  index: number;
  /** Total concepts in the subtopic — drives the "of N" label. */
  total: number;
  /** Pre-resolved bank PYQ row, or null when pyqExampleId didn't resolve. */
  pyqExample: WorkedExample | null;
  /**
   * Runtime overlay: question UUIDs tagged with this concept in the DB,
   * sourced via `loadResolvedDrills`. Empty array hides the drill link.
   */
  drillQuestionIds: string[];
  /**
   * Internal return path for the /browse "← Back to notes" pill — this
   * subtopic's URL with the concept's anchor (`…/subtopic#concept-slug`).
   * Threaded onto the drill link as `from=`. Omitted → no back pill.
   */
  backHref?: string;
  /** Human label for the back pill, e.g. "Vectors notes". */
  backLabel?: string;
  /** The drill link's /browse kind (lib/notes/countKind.ts `notesBrowseKind`): "all" for an exam
   *  whose notes count practice too, else omitted so the URL stays PYQ-only. */
  browseKind?: "all";
  /**
   * False hides the "report a problem" button. The IMAT preview sets it: the
   * report API only knows PYQ Vault's subtopic slugs. Default true.
   */
  showReport?: boolean;
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
  subtopicSlug,
  index,
  total,
  pyqExample,
  drillQuestionIds,
  backHref,
  backLabel,
  browseKind,
  showReport = true,
}: Props) {
  const practiceParts: string[] = [];
  if (concept.selfCheckExample) practiceParts.push("self-check");
  if (concept.practiceSet && concept.practiceSet.length > 0)
    practiceParts.push(`${concept.practiceSet.length} quick reps`);
  const hasPractice = practiceParts.length > 0;

  const practiceBlocks = (
    <>
      {concept.selfCheckExample && (
        <div className="mt-4">
          <SelfCheckCard example={concept.selfCheckExample} conceptSlug={concept.slug} />
        </div>
      )}
      {concept.practiceSet && concept.practiceSet.length > 0 && (
        <div className="mt-4">
          <PracticeSet problems={concept.practiceSet} conceptSlug={concept.slug} />
        </div>
      )}
    </>
  );

  return (
    <section
      id={concept.slug}
      className="scroll-mt-24 rounded-2xl border bg-card p-5 shadow-sm sm:p-8"
    >
      {/* A number badge and the name, not a caps "CONCEPT 1 OF 5" label: the
          page read like a form with a grey caps label over every block. */}
      <header className="mb-5 flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold tabular-nums text-brand-foreground"
          aria-hidden
        >
          {index}
        </span>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          <span className="sr-only">
            Concept {index} of {total}:{" "}
          </span>
          {concept.name}
        </h2>
      </header>

      {/* The intuition opens the concept as a lead paragraph (no label); the
          definition sits on a thin brand rule, the way a textbook sets one. */}
      <div className="space-y-5">
        <div className="font-serif text-[17px] leading-relaxed text-foreground">
          <KatexRenderer text={concept.intuition} />
        </div>

        <div className="border-l-2 border-brand/40 pl-4">
          <p className="mb-1 text-xs font-semibold text-brand-accent">Definition</p>
          <RichText
            text={concept.definition}
            className="font-serif text-base leading-relaxed text-foreground"
          />
        </div>
      </div>

      {/* Formula box (formula variant only) */}
      {concept.kind === "formula" && concept.formula && (
        <div className="mt-5">
          <FormulaBlock formula={concept.formula} />
        </div>
      )}

      {/* Interactive visualization — slotted between the formula and the core
          teaching slot in per-concept teaching order. */}
      {concept.visualizationSlug && (
        <div className="notes-figure mt-6">{renderVisualization(concept.visualizationSlug)}</div>
      )}

      {/* Core teaching slot — formula variant gets a worked example;
          reference variant gets the flat reference table in its place. */}
      <div className="mt-6">
        {concept.kind === "formula" ? (
          <WorkedExampleAuthored example={concept.authoredExample} />
        ) : (
          <ReferenceTableBlock table={concept.table} />
        )}
      </div>

      {/* Practice rungs — self-check + Level 1 reps, collapsed behind one
          disclosure to keep the teaching half (intuition → formula → worked
          → traps) visible without scrolling past every concept's practice. */}
      {hasPractice && (
        <details className="group mt-6 rounded-lg border border-violet-200 dark:border-violet-900/60 bg-violet-50/30 dark:bg-violet-950/15">
          <summary className="flex cursor-pointer list-none items-center gap-2 p-4 hover:bg-violet-100/40 dark:hover:bg-violet-950/30">
            <Dumbbell
              className="h-4 w-4 shrink-0 text-violet-700 dark:text-violet-300"
              aria-hidden
            />
            <span className="flex-1 text-sm font-semibold text-violet-800 dark:text-violet-200">
              Practise this concept
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {practiceParts.join(" · ")}
              </span>
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
              aria-hidden
            />
          </summary>
          <div className="px-4 pb-4">
            <PracticeGate variant="compact" label="try the self-check + reps">
              {practiceBlocks}
            </PracticeGate>
          </div>
        </details>
      )}

      {/* Bank PYQ application — same concept on a real past-year question */}
      {pyqExample && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-muted-foreground">
            {featuredLeadIn(pyqExample.source.kind)}
          </p>
          <WorkedExampleCard rank={index} example={pyqExample} visualSurface="notes" />
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

      {/* Footer — report affordance (always) on the left + per-concept drill
          (when tagged questions exist) on the right. The drill sends to
          /browse filtered to exactly these UUIDs, sourced at request time from
          question_concept_tags via loadResolvedDrills. */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
        {showReport && (
          <ReportConceptDialog
            subtopicSlug={subtopicSlug}
            conceptSlug={concept.slug}
            conceptName={concept.name}
          />
        )}
        {drillQuestionIds.length > 0 && (
          <NotesDrillButton
            link="concept"
            label={`Drill ${drillQuestionIds.length} more on ${concept.name.toLowerCase()}`}
            title={concept.name}
            description={`${drillQuestionIds.length} more ${drillQuestionIds.length === 1 ? "question" : "questions"} on this idea`}
            source={{ kind: "ids", ids: drillQuestionIds }}
            fullHref={buildBrowseUrl({
              extraIds: drillQuestionIds,
              kind: browseKind,
              from: backHref,
              fromLabel: backLabel,
            })}
            subtopicSlug={subtopicSlug}
          />
        )}
      </div>
    </section>
  );
}
