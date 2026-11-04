/**
 * A chapter's Top 10 PYQs, ready to render: the first ten slots of the chapter
 * in its subject's published homework plan, with every question loaded. Read by
 * the /board chapter page (2026-10-13) and the NDA Maths /notes chapter page
 * (2026-11-04), so both show the same list and the same download.
 *
 * A failed read returns null and logs: the Top 10 is a view on the page, never
 * the page, so a caller drops the section rather than the page.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { BoardQuestion } from "@/lib/board/query";
import { getSubjectChapterTop } from "./query";
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
    const top = await getSubjectChapterTop(client, ids);
    if (!top || top.items.length === 0) return null;
    const questions = await loadBoardQuestions(client, top.items.map((it) => it.questionId));
    const view = homeworkDayView(top.items, questions);
    if (!view.ok) {
      console.error(`${where} top pyqs: questions unavailable`, top.planSlug, ids.chapterId, view.missing);
      return null;
    }
    return {
      planSlug: top.planSlug,
      chapterId: ids.chapterId,
      title: topPyqsTitle(view.slots.length, top.chapterName, top.planTitle),
      slots: view.slots,
    };
  } catch (err) {
    console.error(`${where} top pyqs: read failed`, ids.chapterId, err);
    return null;
  }
}
