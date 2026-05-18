import { Layers } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import { groupBySet } from "@/lib/export/groupBySet";
import type { QuestionRow } from "@/lib/questions/query";
import { getQuestionResources } from "@/lib/links/questionResources";
import type { ResourceTags } from "@/lib/links/getResourceTagsForQuestions";
import QuestionCard from "./QuestionCard";

function resourcesFor(q: QuestionRow, tags?: ResourceTags) {
  return getQuestionResources(
    {
      examName: q.exam.name,
      subjectName: q.subject.name,
      chapterName: q.chapter.name,
      subtopicName: q.subtopic?.name ?? null,
    },
    tags
  );
}

type Props = {
  questions: QuestionRow[];
  /** 0-based offset of the first question on this page (e.g. (page - 1) * pageSize). */
  pageOffset: number;
  isAdmin: boolean;
  supabaseUrl: string;
  /** Surface the exam name in each card's breadcrumb. Pass true when no exam filter is set. */
  includeExam: boolean;
  /** Per-question principle + concept tags for the backlink chip row.
   *  Questions absent from the map have no DB-backed tags. */
  resourceTags?: Map<string, ResourceTags>;
};

/**
 * Lays out the per-page question list. Consecutive set siblings collapse
 * under a passage banner; standalone questions render as plain cards. The
 * banner shows the passage once; member cards hide their per-card Context
 * to avoid duplicating it.
 *
 * Indices stay sequential across groups (Q34 stays Q34 whether it's in a
 * set or not).
 */
export default function QuestionList({
  questions,
  pageOffset,
  isAdmin,
  supabaseUrl,
  includeExam,
  resourceTags,
}: Props) {
  const groups = groupBySet(questions);
  const idToIndex = new Map<string, number>();
  questions.forEach((q, i) => idToIndex.set(q.id, pageOffset + i + 1));

  return (
    <ul className="space-y-3">
      {groups.map((group, gi) => {
        if (group.kind === "single") {
          return (
            <li key={`single-${group.question.id}`}>
              <QuestionCard
                question={group.question}
                index={idToIndex.get(group.question.id)!}
                isAdmin={isAdmin}
                supabaseUrl={supabaseUrl}
                includeExam={includeExam}
                resources={resourcesFor(
                  group.question,
                  resourceTags?.get(group.question.id)
                )}
              />
            </li>
          );
        }
        return (
          <li key={`set-${group.setId}-${gi}`}>
            <SetBanner
              passage={group.passage}
              count={group.questions.length}
            >
              <ul className="space-y-2">
                {group.questions.map((q) => (
                  <li key={q.id}>
                    <QuestionCard
                      question={q}
                      index={idToIndex.get(q.id)!}
                      isAdmin={isAdmin}
                      supabaseUrl={supabaseUrl}
                      hideContext
                      includeExam={includeExam}
                      resources={resourcesFor(q, resourceTags?.get(q.id))}
                    />
                  </li>
                ))}
              </ul>
            </SetBanner>
          </li>
        );
      })}
    </ul>
  );
}

function SetBanner({
  passage,
  count,
  children,
}: {
  passage: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/[0.03] p-3 sm:p-4">
      <div className="mb-3 flex items-start gap-2">
        <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/30 bg-card px-2 py-0.5 text-[11px] font-medium text-primary">
          <Layers className="h-3 w-3" aria-hidden />
          Set · {count} question{count === 1 ? "" : "s"}
        </span>
      </div>
      {passage && (
        <div className="mb-3 font-serif text-sm italic leading-relaxed text-foreground/85">
          <KatexRenderer text={passage} />
        </div>
      )}
      {children}
    </div>
  );
}
