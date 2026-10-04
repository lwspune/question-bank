import type { QuestionRow } from "@/lib/questions/query";
import { resolveResourcesById } from "@/lib/links/questionResources";
import type { ResourceTags } from "@/lib/links/getResourceTagsForQuestions";
import type { ItemStatAggregate } from "@/lib/itemStats/types";
import QuestionListView from "./QuestionListView";
import type { BreadcrumbFixed } from "./breadcrumb";

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
  /** Surface the exam name in each card's breadcrumb. Pass true when no exam filter is set. */
  includeExam: boolean;
  /** Levels every card on this page shares (the chapter on a chapter page, the
   *  filtered subject), so the card's path line does not repeat them. */
  breadcrumbFixed?: BreadcrumbFixed;
  /** Per-question principle + concept tags for the backlink chip row.
   *  Questions absent from the map have no DB-backed tags. */
  resourceTags?: Map<string, ResourceTags>;
  /** Passed through to QuestionListView (the /questions next-step card). */
  insert?: { afterQuestions: number; node: React.ReactNode };
};

/**
 * The question list for SERVER pages (/browse, the /questions landings):
 * resolves each card's guide/notes backlinks here, on the server, and renders
 * QuestionListView. A client component must render QuestionListView directly
 * with resources its server page resolved — importing this wrapper into a
 * client component would ship the whole notes corpus to the browser (see
 * QuestionListView's header).
 */
export default function QuestionList({ questions, resourceTags, ...rest }: Props) {
  return (
    <QuestionListView
      questions={questions}
      resourcesById={resolveResourcesById(questions, resourceTags)}
      {...rest}
    />
  );
}
