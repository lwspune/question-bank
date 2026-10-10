import { Layers } from "lucide-react";
import type { BreadcrumbFixed } from "./breadcrumb";
import BlockText from "@/components/math/BlockText";
import { groupBySet } from "@/lib/export/groupBySet";
import type { QuestionRow } from "@/lib/questions/query";
import type { QuestionResources } from "@/lib/links/questionResources";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import QuestionCard from "./QuestionCard";
import type { ItemStatAggregate } from "@/lib/itemStats/types";
import { insertAfterGroup } from "@/lib/growth/secondPage";

type Props = {
  questions: QuestionRow[];
  /** 0-based offset of the first question on this page (e.g. (page - 1) * pageSize). */
  pageOffset: number;
  /** True when the viewer can edit questions (ADMIN or TEACHER per migration 0025) — surfaces the Edit link. */
  canEdit: boolean;
  /** True when ANY signed-in user (TEACHER or ADMIN) — drives the Report dialog. */
  isLoggedIn: boolean;
  supabaseUrl: string;
  /**
   * Pooled student performance per question. Staff only — the page does not
   * fetch it for anyone else. Absent for most questions by design.
   */
  itemStats?: Map<string, ItemStatAggregate>;
  /** question id -> the full past paper it came from (lib/questions/paperLinks);
   *  that question's source pill opens it. */
  paperLinks?: Map<string, string>;
  /** Surface the exam name in each card's breadcrumb. Pass true when no exam filter is set. */
  includeExam: boolean;
  /** Levels every card on this page shares (the chapter on a chapter page, the
   *  filtered subject), so the card's path line does not repeat them. */
  breadcrumbFixed?: BreadcrumbFixed;
  /** The guide/notes backlinks per question id, resolved ON THE SERVER. A
   *  plain object so it can cross into a client component (a Map cannot). */
  resourcesById?: Record<string, QuestionResources>;
  /** Something to place inside the list after `afterQuestions` questions (the
   *  /questions next-step card). Never splits a passage set. */
  insert?: { afterQuestions: number; node: React.ReactNode };
};

/**
 * The question list's layout, with NO lookup of its own: the guide/notes chips
 * arrive resolved in `resourcesById`.
 *
 * WHY THE SPLIT (2026-10-02). Resolving a chip means `questionResources` →
 * `subtopicSlugRegistry` → `lib/notes/chapters.ts`, which imports all 1,884
 * notes `_data` modules. On the server that is free; inside a client component
 * it ships the whole notes corpus to the browser — /formula/[slug] did exactly
 * that, 12.9 MB of JavaScript per page. A client component renders THIS view
 * with resources computed by its server page; `QuestionList` is the server
 * wrapper the other pages keep using. Guarded by
 * tests/client-bundle-notes-registry.test.ts.
 *
 * Lays out the per-page question list. Consecutive set siblings collapse
 * under a passage banner; standalone questions render as plain cards. The
 * banner shows the passage once; member cards hide their per-card Context
 * to avoid duplicating it.
 *
 * Indices stay sequential across groups (Q34 stays Q34 whether it's in a
 * set or not).
 */
export default function QuestionListView({
  questions,
  pageOffset,
  canEdit,
  isLoggedIn,
  supabaseUrl,
  includeExam,
  breadcrumbFixed,
  resourcesById,
  itemStats,
  paperLinks,
  insert,
}: Props) {
  const groups = groupBySet(questions);
  const insertAt = insert
    ? insertAfterGroup(
        groups.map((g) => (g.kind === "single" ? 1 : g.questions.length)),
        insert.afterQuestions
      )
    : null;
  const idToIndex = new Map<string, number>();
  questions.forEach((q, i) => idToIndex.set(q.id, pageOffset + i + 1));

  return (
    // Wraps the page so the projection overlay can step through the whole
    // list; see PresentRegistry for why the cards register rather than receive.
    <PresentRegistry>
      <ul className="space-y-3">
        {groups.flatMap((group, gi) => {
          const item = renderGroup(group, gi);
          return gi === insertAt && insert ? [item, <li key="list-insert">{insert.node}</li>] : [item];
        })}
      </ul>
    </PresentRegistry>
  );

  function renderGroup(group: (typeof groups)[number], gi: number) {
    if (group.kind === "single") {
      return (
        <li key={`single-${group.question.id}`}>
          <QuestionCard
            question={group.question}
            index={idToIndex.get(group.question.id)!}
            canEdit={canEdit}
            isLoggedIn={isLoggedIn}
            supabaseUrl={supabaseUrl}
            includeExam={includeExam}
            breadcrumbFixed={breadcrumbFixed}
            resources={resourcesById?.[group.question.id]}
            itemStats={itemStats?.get(group.question.id)}
            paperHref={paperLinks?.get(group.question.id)}
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
                  canEdit={canEdit}
                  isLoggedIn={isLoggedIn}
                  supabaseUrl={supabaseUrl}
                  hideContext
                  includeExam={includeExam}
                  breadcrumbFixed={breadcrumbFixed}
                  resources={resourcesById?.[q.id]}
                  itemStats={itemStats?.get(q.id)}
                  paperHref={paperLinks?.get(q.id)}
                />
              </li>
            ))}
          </ul>
        </SetBanner>
      </li>
    );
  }
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
          {/* BlockText, not KatexRenderer: a set's shared context is where
              "match the columns" tables live (61 sets bank-wide), and
              KatexRenderer prints a pipe-table as raw pipes. Contract pinned
              by tests/long-form-field-renderer-contract.test.ts. */}
          <BlockText text={passage} />
        </div>
      )}
      {children}
    </div>
  );
}
