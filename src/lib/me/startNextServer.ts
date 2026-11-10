/**
 * Reads behind "Start next" (2026-11-09, migration 0242). The rules are
 * lib/me/startNext.ts.
 *
 * The weights are the same for every student of an exam and move only when a
 * past paper is published, so they are read once a day per exam through
 * `unstable_cache` with the service-role client (the question-of-the-day
 * pattern, lib/daily/service.ts): published mocks and PUBLIC questions only,
 * no per-user data. Which chapters a student has started is per student, read
 * with the caller's client (the student's own login; the staff view passes the
 * service role for the student it shows).
 */
import "server-only";
import { unstable_cache } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { pickStartNext, type ChapterWeight } from "./startNext";
import type { ExamIdMap } from "@/lib/exam/examNav";

type WeightRow = {
  chapter_id: string;
  chapter: string;
  subject: string;
  exam: string;
  paper_code: string;
  papers: number;
  q_per_paper: number | string;
  marks_per_paper: number | string;
  paper_marks: number | string;
};

/** Uncached, for scripts outside Next (scripts/mocks/score-plan-smoke.ts); the app reads loadChapterWeights. */
export async function readWeights(examId: string): Promise<ChapterWeight[]> {
  const { data, error } = await createSupabaseAdminClient().rpc("get_chapter_paper_weights", { p_exam_id: examId });
  if (error) throw new Error(`chapter weights: ${error.message}`);
  return ((data ?? []) as WeightRow[]).map((r) => ({
    chapterId: r.chapter_id,
    chapter: r.chapter,
    subject: r.subject,
    exam: r.exam,
    paperCode: r.paper_code,
    papers: Number(r.papers),
    qPerPaper: Number(r.q_per_paper),
    marksPerPaper: Number(r.marks_per_paper),
    paperMarks: Number(r.paper_marks),
  }));
}

/** Every chapter's weight in an exam's published papers; [] on a failed read. */
export async function loadChapterWeights(examId: string): Promise<ChapterWeight[]> {
  try {
    return await unstable_cache(() => readWeights(examId), ["chapter-paper-weights", examId], { revalidate: 86_400 })();
  } catch (e) {
    console.error("chapter weights failed", e instanceof Error ? e.message : e);
    return [];
  }
}

/** The chapters of an exam this student has answered anything in. Throws on a
 *  failed read: the caller shows no card rather than "start" a chapter the
 *  student has in fact started. */
export async function loadStartedChapters(db: SupabaseClient, userId: string, examId: string): Promise<Set<string>> {
  const { data, error } = await db.rpc("get_started_chapter_ids", { p_user_id: userId, p_exam_id: examId });
  if (error) throw new Error(`started chapters: ${error.message}`);
  return new Set(
    ((data ?? []) as (string | { get_started_chapter_ids: string })[]).map((r) =>
      typeof r === "string" ? r : r.get_started_chapter_ids
    )
  );
}

/** Home's "Start next": [] without an exam, without published papers for it,
 *  or when every high-value chapter is started. */
export async function loadStartNext(
  db: SupabaseClient,
  userId: string,
  examSlug: string | null,
  examIds: ExamIdMap
): Promise<ChapterWeight[]> {
  const examId = examSlug ? examIds[examSlug] : null;
  if (!examId) return [];
  const weights = await loadChapterWeights(examId);
  if (weights.length === 0) return [];
  return pickStartNext(weights, await loadStartedChapters(db, userId, examId));
}

/** The Chapters view's "Not started yet": one subject of one exam, top three. */
export async function loadNotStarted(
  db: SupabaseClient,
  userId: string,
  examId: string,
  subject: string
): Promise<ChapterWeight[]> {
  const weights = (await loadChapterWeights(examId)).filter((w) => w.subject === subject);
  if (weights.length === 0) return [];
  return pickStartNext(weights, await loadStartedChapters(db, userId, examId), 3);
}
