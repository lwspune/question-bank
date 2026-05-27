import { Target } from "lucide-react";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";

type Props = {
  /** Resolved bank rows for the 5 checkpoint ids, in interleaved order. */
  questions: WorkedExample[];
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
export default function SubtopicMasteryCheckpoint({ questions }: Props) {
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

      <div className="space-y-4">
        {questions.map((q, i) => (
          <WorkedExampleCard key={q.id} rank={i + 1} example={q} />
        ))}
      </div>
    </section>
  );
}
