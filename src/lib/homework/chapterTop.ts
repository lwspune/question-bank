/**
 * A chapter's Top 10 PYQs, ready to render: the first ten slots of the chapter
 * in its subject's published homework plan, with every question loaded. Read by
 * the /board chapter page (2026-10-13), the NDA Maths /notes chapter page and
 * the Homework tab's chapter page (2026-11-04), so all show the same list and
 * the same download.
 *
 * A failed read returns null and logs: the Top 10 is a view on the page, never
 * the page, so a caller drops the section rather than the page.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { BoardQuestion } from "@/lib/board/query";
import { getPlanChapterTop, getSubjectChapterTop, type PlanChapterTop } from "./query";
import { homeworkDayView, type HomeworkSlot } from "./dayView";
import { topPyqsTitle } from "./topPyqs";
import { loadBoardQuestions } from "@/lib/questionPapers/query";

export type ChapterTopPyqs = {
  planSlug: string;
  chapterId: string;
  /** "Top 10 PYQs: <chapter> (<plan>)", the download's title too. */
  title: string;
  slots: HomeworkSlot<BoardQuestion>[];
};

export async function loadChapterTopPyqs(
  client: SupabaseClient,
  ids: { examId: string; subjectId: string; chapterId: string },
  /** Names the caller in a logged failure ("board", "notes"). */
  where: string
): Promise<ChapterTopPyqs | null> {
  try {
    return await toChapterTop(client, await getSubjectChapterTop(client, ids), ids.chapterId, where);
  } catch (err) {
    console.error(`${where} top pyqs: read failed`, ids.chapterId, err);
    return null;
  }
}

/**
 * The same list read from a plan named by slug, for the Homework tab's chapter
 * page (2026-11-04), so the page shows exactly the plan it sits under.
 */
export async function loadPlanChapterTopPyqs(
  client: SupabaseClient,
  planSlug: string,
  chapterId: string
): Promise<ChapterTopPyqs | null> {
  try {
    return await toChapterTop(client, await getPlanChapterTop(client, planSlug, chapterId), chapterId, "homework");
  } catch (err) {
    console.error("homework top pyqs: read failed", planSlug, chapterId, err);
    return null;
  }
}

async function toChapterTop(
  client: SupabaseClient,
  top: PlanChapterTop | null,
  chapterId: string,
  where: string
): Promise<ChapterTopPyqs | null> {
  if (!top || top.items.length === 0) return null;
  const questions = await loadBoardQuestions(client, top.items.map((it) => it.questionId));
  const view = homeworkDayView(top.items, questions);
  if (!view.ok) {
    console.error(`${where} top pyqs: questions unavailable`, top.planSlug, chapterId, view.missing);
    return null;
  }
  return {
    planSlug: top.planSlug,
    chapterId,
    title: topPyqsTitle(view.slots.length, top.chapterName, top.planTitle),
    slots: view.slots,
  };
}
