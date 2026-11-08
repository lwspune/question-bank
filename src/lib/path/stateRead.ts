/**
 * A student's state on each path chapter, folded from their own records
 * (MENTOR_SPEC.md §2, §7): Top 10 marks by the homework rule, Revision tab
 * views, finished chapter tests, and any `path_chapter_done` already written.
 * Nothing about progress is stored on the path itself.
 *
 * Takes the client as a parameter and is NOT marked server-only, so
 * `npm run path:smoke` drives this exact code (the lib/drill/query precedent).
 * Reads are chunked at 200 ids and paged at 1000 rows.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { readInChunks } from "@/lib/supabase/readInChunks";
import type { ProgressEvent } from "@/lib/homework/progress";
import { isFinishedTest } from "./done";
import { foldStates, keepEarliest, type ChapterFacts } from "./fold";
import type { ChapterState, PathChapter } from "./model";

type MarkRow = { ref_id: string; kind: ProgressEvent["kind"]; created_at: string; mark: string | null };

/**
 * Each chapter's state, folded from the student's own records: the Top 10
 * marks (homework rule), the Revision tab views, finished chapter tests and
 * any `path_chapter_done` already written. `lastWorkAt` is the latest of
 * those per chapter, which ends a "Not taught yet". `facts` are the same
 * records with their moments, for a state as of an earlier day (fold.ts).
 */
export async function readChapterStates(
  db: SupabaseClient,
  userId: string,
  chapters: readonly PathChapter[]
): Promise<{ states: Map<string, ChapterState>; lastWorkAt: Map<string, string>; facts: ChapterFacts }> {
  const chapterOfQuestion = new Map<string, string>();
  for (const c of chapters) for (const p of c.top.flat()) chapterOfQuestion.set(p.id, c.id);
  const byPath = new Map(chapters.map((c) => [c.boardPath, c.id]));
  const byMock = new Map(chapters.flatMap((c) => (c.test ? [[c.test.mockId, c.id] as const] : [])));

  const marks = await readInChunks<MarkRow>([...chapterOfQuestion.keys()], (part, f, t) =>
    db
      .from("user_activity")
      .select("ref_id, kind, created_at, mark:metadata->>mark")
      .eq("user_id", userId)
      .in("kind", ["self_mark", "question_practiced", "answer_wrong", "answer_correct"])
      .in("ref_id", part)
      .order("id")
      .range(f, t)
  );
  const [views, doneRows, attempts] = await Promise.all([
    readAllPages<{ path: string | null; created_at: string }>(
      (f, t) =>
        db
          .from("user_activity")
          .select("path:metadata->>path, created_at")
          .eq("user_id", userId)
          .eq("kind", "surface_viewed")
          .eq("metadata->>surface", "board_revision")
          .order("id")
          .range(f, t)
    ),
    readAllPages<{ ref_id: string | null; created_at: string }>(
      (f, t) =>
        db.from("user_activity").select("ref_id, created_at").eq("user_id", userId).eq("kind", "path_chapter_done").order("id").range(f, t)
    ),
    byMock.size === 0
      ? Promise.resolve([])
      : readAllPages<{
          mock_id: string;
          status: string;
          started_at: string;
          submitted_at: string | null;
          correct_count: number | null;
          wrong_count: number | null;
          partial_count: number | null;
        }>(
          (f, t) =>
            db
              .from("mock_attempts")
              .select("mock_id, status, started_at, submitted_at, correct_count, wrong_count, partial_count")
              .eq("user_id", userId)
              .in("mock_id", [...byMock.keys()])
              .order("id")
              .range(f, t)
        ),
  ]);

  const lastWorkAt = new Map<string, string>();
  const touch = (chapterId: string | undefined, at: string) => {
    if (!chapterId) return;
    const prev = lastWorkAt.get(chapterId);
    if (!prev || at > prev) lastWorkAt.set(chapterId, at);
  };

  const eventsByChapter = new Map<string, ProgressEvent[]>();
  for (const m of marks) {
    const chapterId = chapterOfQuestion.get(m.ref_id);
    if (!chapterId) continue;
    const list = eventsByChapter.get(chapterId) ?? [];
    list.push({
      questionId: m.ref_id,
      kind: m.kind,
      at: m.created_at,
      ...(m.mark === "understood" || m.mark === "review" ? { mark: m.mark } : {}),
    });
    eventsByChapter.set(chapterId, list);
    touch(chapterId, m.created_at);
  }
  const sheetAt = new Map<string, string>();
  for (const v of views) {
    const chapterId = v.path ? byPath.get(v.path) : undefined;
    if (!chapterId) continue;
    keepEarliest(sheetAt, chapterId, v.created_at);
    touch(chapterId, v.created_at);
  }
  const testAt = new Map<string, string>();
  for (const a of attempts) {
    const chapterId = byMock.get(a.mock_id);
    touch(chapterId, a.started_at);
    const answered = (a.correct_count ?? 0) + (a.wrong_count ?? 0) + (a.partial_count ?? 0);
    if (chapterId && isFinishedTest({ status: a.status, answered })) keepEarliest(testAt, chapterId, a.submitted_at ?? a.started_at);
  }
  const doneAt = new Map<string, string>();
  for (const r of doneRows) if (r.ref_id) keepEarliest(doneAt, r.ref_id, r.created_at);

  const facts: ChapterFacts = { marks: eventsByChapter, sheetAt, testAt, doneAt };
  return { states: foldStates(chapters, facts), lastWorkAt, facts };
}
