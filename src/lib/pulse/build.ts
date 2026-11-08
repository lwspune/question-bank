/**
 * The pulse (due drill count, the week, the exam countdown, Answered / Right /
 * Fixed, weak chapters, per-chapter due) for one student, server side.
 *
 * Shared by GET /api/me/pulse (the student's own, read with their JWT) and the
 * staff view of a student's /me (/dashboard/students/[id]/me, read with the
 * service-role client), so the two can never compute it differently.
 *
 * The two numbers that SQL counts for "the caller" (the week's study days, the
 * answer totals) arrive as promises: the caller decides whether they are the
 * student's own reads or the staff reads (migration 0222). Everything else
 * filters on `userId` itself.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getOwnLadder } from "@/lib/drill/service";
import { dueByChapter, scopeToExam, weakChapters } from "@/lib/drill/select";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { loadFocus } from "@/lib/me/focusServer";
import type { AnswerTotals } from "@/lib/celebrate/service";
import type { OwnWeekly } from "@/lib/goals/service";
import { getOwnProfile } from "@/lib/profile/service";
import { resolveExamDate } from "@/lib/exam/calendar";
import type { Pulse } from "./cache";
import { isPathExam, pathPulseState, type PathExam } from "@/lib/path/model";

export async function buildPulse(
  db: SupabaseClient,
  userId: string,
  now: Date,
  counts: { week: Promise<OwnWeekly>; answers: Promise<AnswerTotals | null> }
): Promise<Required<Pulse>> {
  const [ladder, week, profile, answers, focusExam] = await Promise.all([
    getOwnLadder(db, userId, now),
    counts.week,
    getOwnProfile(db, userId),
    counts.answers,
    // The exam focus (2026-11-08): a two-exam student focused on one exam is
    // counted that exam's mistakes, the ones /drill will serve. A failed read
    // is no focus: every mistake counted, as before.
    getExamIdMap()
      .then((ids) => loadFocus(db, userId, ids))
      .then((f) => f.filterExamName)
      .catch((e: unknown) => {
        console.error("pulse focus read failed", e instanceof Error ? e.message : e);
        return null;
      }),
  ]);
  const countdown = resolveExamDate(profile, now);
  const exam = countdown
    ? { label: countdown.label, daysLeft: countdown.daysLeft, official: countdown.official }
    : null;
  const totals = answers ? { answered: answers.answered, right: answers.right, fixed: ladder.fixed } : null;
  // /me's Weak spots (2026-11-06): grouped from the same due pool, so a
  // chapter's count is the number its Fix button will serve from.
  const focused = scopeToExam(ladder.due, focusExam);
  const weak = weakChapters(focused);
  // The chapter pages' "Fix N mistakes in this chapter" line (2026-11-07):
  // every chapter's count from the same pool, so the line's number is what
  // /drill?chapter= serves. One small object; no extra read. NOT focused: a
  // chapter belongs to one exam, and its own page asks about that chapter.
  const chapterDue = dueByChapter(ladder.due);
  // The board path (Phase 2): one indexed read, and only for a student with a
  // Class 12 board among their exams. A failed read shows no path line.
  const active = profile.targetExams.some(isPathExam) ? await activePathExam(db, userId) : undefined;
  const path = active === undefined ? null : pathPulseState(profile.targetExams, active);
  return { due: focused.length, week, exam, totals, weak, chapterDue, path };
}

/** The active path's board, null with none, undefined when the read failed. */
async function activePathExam(db: SupabaseClient, userId: string): Promise<PathExam | null | undefined> {
  const { data, error } = await db.from("study_paths").select("exam_slug").eq("user_id", userId).is("ended_at", null).maybeSingle();
  if (error) {
    console.error("pulse path read failed", error.message);
    return undefined;
  }
  return data && isPathExam(data.exam_slug) ? data.exam_slug : null;
}
