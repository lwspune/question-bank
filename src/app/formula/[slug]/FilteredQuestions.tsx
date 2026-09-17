"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import QuestionList from "@/app/browse/QuestionList";
import type { QuestionRow } from "@/lib/questions/query";
import {
  applyFilters,
  buildFacets,
  type ExamFilter,
  type KindFilter,
} from "@/lib/formula/filters";

type Props = {
  /** Already sorted into the easiest-first learning ramp by the server. */
  questions: QuestionRow[];
  /** Ids whose `question_kind` is 'practice'. Everything else is a PYQ. */
  practiceIds: string[];
  supabaseUrl: string;
};

function Chip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        active
          ? "border-brand-accent bg-brand-accent/10 font-medium text-brand-accent"
          : "hover:bg-accent"
      }`}
    >
      {children}
      <span className="text-xs text-muted-foreground">{count}</span>
    </button>
  );
}

/**
 * Exam + PYQ/Practice filters over the question set, applied CLIENT-side.
 *
 * No URL parameters by design — see the note in `lib/formula/filters.ts`. The
 * rows are all in memory already, so a filter is a re-render rather than a
 * round trip, and the page keeps its ISR caching.
 *
 * Counts on the chips are computed from the FULL set, so they stay put while
 * you narrow: a row of numbers that changed on every click would stop being a
 * readout of the corpus and become a readout of the current selection.
 */
export default function FilteredQuestions({
  questions,
  practiceIds,
  supabaseUrl,
}: Props) {
  const [exam, setExam] = useState<ExamFilter>("all");
  const [kind, setKind] = useState<KindFilter>("all");

  const practice = useMemo(() => new Set(practiceIds), [practiceIds]);
  const facets = useMemo(() => buildFacets(questions, practice), [questions, practice]);
  const shown = useMemo(
    () => applyFilters(questions, practice, { exam, kind }),
    [questions, practice, exam, kind]
  );

  // A single-exam page gets no exam row: one chip that does nothing is noise.
  const showExams = facets.exams.length > 1;
  const showKinds = facets.pyq > 0 && facets.practice > 0;
  const anyFilter = showExams || showKinds;
  const filtering = exam !== "all" || kind !== "all";

  const examsInView = useMemo(
    () => new Set(shown.map((r) => r.exam.name)),
    [shown]
  );

  return (
    <>
      {anyFilter && (
        <div className="mt-6 rounded-lg border p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Filter className="h-3.5 w-3.5" aria-hidden />
            Filter
          </p>

          {showExams && (
            <div className="mt-3">
              <span id="formula-exam-label" className="sr-only">
                Filter by exam
              </span>
              <div
                role="group"
                aria-labelledby="formula-exam-label"
                className="flex flex-wrap gap-2"
              >
                <Chip active={exam === "all"} onClick={() => setExam("all")} count={facets.total}>
                  All exams
                </Chip>
                {facets.exams.map((e) => (
                  <Chip
                    key={e.name}
                    active={exam === e.name}
                    onClick={() => setExam(e.name)}
                    count={e.count}
                  >
                    {e.label}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {showKinds && (
            <div className="mt-3">
              <span id="formula-kind-label" className="sr-only">
                Filter by past-year or practice
              </span>
              <div
                role="group"
                aria-labelledby="formula-kind-label"
                className="flex flex-wrap gap-2"
              >
                <Chip active={kind === "all"} onClick={() => setKind("all")} count={facets.total}>
                  All questions
                </Chip>
                <Chip active={kind === "pyq"} onClick={() => setKind("pyq")} count={facets.pyq}>
                  Past-year
                </Chip>
                <Chip
                  active={kind === "practice"}
                  onClick={() => setKind("practice")}
                  count={facets.practice}
                >
                  Practice
                </Chip>
              </div>
            </div>
          )}
        </div>
      )}

      {/* aria-live so a screen reader hears the result count change; the list
          itself is long and nobody should have to scroll to learn it emptied. */}
      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {shown.length === 0
          ? "No questions match these filters."
          : `Showing ${shown.length} of ${facets.total} question${facets.total === 1 ? "" : "s"}${
              filtering ? "" : " — easiest first, then oldest paper first"
            }.`}
      </p>

      {shown.length > 0 && (
        <div className="mt-6">
          <QuestionList
            questions={shown}
            pageOffset={0}
            canEdit={false}
            isLoggedIn={false}
            supabaseUrl={supabaseUrl}
            includeExam={examsInView.size > 1}
          />
        </div>
      )}
    </>
  );
}
