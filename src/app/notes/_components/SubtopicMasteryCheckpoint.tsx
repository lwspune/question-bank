import { Target } from "lucide-react";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";
import CheckpointSelfScore from "./CheckpointSelfScore";
import BlockText from "@/components/math/BlockText";
import KatexRenderer from "@/components/math/KatexRenderer";

type Props = {
  /** Resolved bank rows for the 5 checkpoint ids, in interleaved order. */
  questions: WorkedExample[];
  /** Notes slugs for the self-score save (this section is signed-in only). */
  subtopicSlug: string;
  chapterSlug: string;
  subjectRoute: string;
};

/**
 * End-of-subtopic mastery check. Five questions interleaved across the
 * subtopic's concepts (not blocked by concept) — interleaved practice
 * improves transfer (Roediger / Bjork).
 *
 * Each row is the same `WorkedExampleCard` used on `/guide` (click-to-reveal
 * answer, then click-to-reveal solution) — students can attempt mentally
 * first and check after.
 *
 * Returns null when no checkpoint rows are available so the page section
 * silently collapses for subtopics with zero concept-tagged drills.
 */
export default function SubtopicMasteryCheckpoint({
  questions,
  subtopicSlug,
  chapterSlug,
  subjectRoute,
}: Props) {
  if (questions.length === 0) return null;

  return (
    <section className="mt-12 rounded-lg border-2 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-6">
      <header className="mb-4 flex items-start gap-2">
        <Target
          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400"
          aria-hidden
        />
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-emerald-900 dark:text-emerald-100">
            Mastery check — {questions.length} interleaved questions
          </h2>
          <p className="mt-1 font-serif text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/80">
            Try each one before clicking. Questions are interleaved across the
            concepts above, not grouped — interleaving sharpens transfer.
          </p>
        </div>
      </header>

      {/* Registry so a teacher projecting the checkpoint can step through all
          five without closing the overlay between them. */}
      <PresentRegistry>
        <div className="space-y-4">
          {questions.map((q, i) => (
            <WorkedExampleCard key={q.id} rank={i + 1} example={q} />
          ))}
        </div>
      </PresentRegistry>

      <CheckpointSelfScore
        total={questions.length}
        subtopicSlug={subtopicSlug}
        chapterSlug={chapterSlug}
        subjectRoute={subjectRoute}
      />
    </section>
  );
}

/**
 * A still, non-interactive look at the mastery check's first question, shown
 * blurred behind the sign-in wall (PracticeGate `preview`). No buttons: it is
 * decoration, and the real check opens on sign-in.
 */
export function CheckpointPreview({ question, total }: { question: WorkedExample; total: number }) {
  return (
    <div className="space-y-3">
      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
        <Target className="h-4 w-4" aria-hidden />
        Mastery check: {total} questions
      </p>
      <div className="font-serif text-[15px] leading-relaxed">
        <BlockText text={question.text} />
      </div>
      <ol className="space-y-2">
        {question.options.map((o) => (
          <li key={o.label} className="flex items-center gap-3 rounded-xl border-[1.5px] px-3 py-2.5 font-serif text-[15px]">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 font-sans text-xs font-bold text-brand-accent">
              {o.label}
            </span>
            <KatexRenderer text={o.text} />
          </li>
        ))}
      </ol>
    </div>
  );
}
