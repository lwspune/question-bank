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
import { dueByChapter, weakChapters } from "@/lib/drill/select";
import type { AnswerTotals } from "@/lib/celebrate/service";
import type { OwnWeekly } from "@/lib/goals/service";
import { getOwnProfile } from "@/lib/profile/service";
import { resolveExamDate } from "@/lib/exam/calendar";
import type { Pulse } from "./cache";

export async function buildPulse(
  db: SupabaseClient,
  userId: string,
  now: Date,
  counts: { week: Promise<OwnWeekly>; answers: Promise<AnswerTotals | null> }
): Promise<Required<Pulse>> {
  const [ladder, week, profile, answers] = await Promise.all([
    getOwnLadder(db, userId, now),
    counts.week,
    getOwnProfile(db, userId),
    counts.answers,
  ]);
  const countdown = resolveExamDate(profile, now);
  const exam = countdown
    ? { label: countdown.label, daysLeft: countdown.daysLeft, official: countdown.official }
    : null;
  const totals = answers ? { answered: answers.answered, right: answers.right, fixed: ladder.fixed } : null;
  // /me's Weak spots (2026-11-06): grouped from the same due pool, so a
  // chapter's count is the number its Fix button will serve from.
  const weak = weakChapters(ladder.due);
  // The chapter pages' "Fix N mistakes in this chapter" line (2026-11-07):
  // every chapter's count from the same pool, so the line's number is what
  // /drill?chapter= serves. One small object; no extra read.
  const chapterDue = dueByChapter(ladder.due);
  return { due: ladder.due.length, week, exam, totals, weak, chapterDue };
}
