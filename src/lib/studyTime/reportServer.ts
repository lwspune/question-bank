/**
 * The reads behind the study-time report (lib/studyTime/report.ts):
 * get_study_time (migration 0278) for one student, and the exam's past-paper
 * weights (cached a day, lib/me/startNextServer). SECURITY INVOKER with a user
 * id: the student's own login reads only their rows, and the staff view of a
 * student's Home passes the service role for the student it shows.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { ExamIdMap } from "@/lib/exam/examNav";
import { loadChapterWeights } from "@/lib/me/startNextServer";
import { addDays, buildStudyCard, istDay, STUDY_READ_DAYS, type StudyCard, type StudyKind, type StudyRow } from "./report";

type RpcRow = {
  day: string;
  kind: string;
  secs: number;
  chapter_id: string | null;
  chapter: string | null;
  subject: string | null;
  exam_id: string | null;
};

const KINDS = new Set<StudyKind>(["practice", "reading", "mock"]);

/** The student's time from `days` days back to today (India days), every exam. */
export async function loadStudyRows(db: SupabaseClient, userId: string, now: Date, days = STUDY_READ_DAYS): Promise<StudyRow[]> {
  const today = istDay(now);
  const { data, error } = await db.rpc("get_study_time", { p_user_id: userId, p_from: addDays(today, -(days - 1)), p_to: today });
  if (error) throw new Error(`get_study_time: ${error.message}`);
  return ((data ?? []) as RpcRow[])
    .filter((r) => KINDS.has(r.kind as StudyKind))
    .map((r) => ({
      day: r.day,
      kind: r.kind as StudyKind,
      secs: Number(r.secs),
      chapterId: r.chapter_id,
      chapter: r.chapter,
      subject: r.subject,
      examId: r.exam_id,
    }));
}

export type StudyExam = { slug: string; examName: string; displayName: string };

export function studyExamOf(slug: string | null): StudyExam | null {
  const e = slug ? EXAM_REGISTRY.find((x) => x.slug === slug) : undefined;
  return e ? { slug: e.slug, examName: e.examName, displayName: e.displayName } : null;
}

/** The card for one exam (null slug = every exam), or null under 15 minutes this week. */
export async function loadStudyCard(
  db: SupabaseClient,
  userId: string,
  examSlug: string | null,
  examIds: ExamIdMap,
  now: Date = new Date()
): Promise<StudyCard | null> {
  const exam = studyExamOf(examSlug);
  const examId = exam ? (examIds[exam.slug] ?? null) : null;
  const [rows, weights] = await Promise.all([loadStudyRows(db, userId, now), examId ? loadChapterWeights(examId) : Promise.resolve([])]);
  return buildStudyCard({ rows, now, examId, examLabel: exam?.displayName ?? "All exams", weights });
}
