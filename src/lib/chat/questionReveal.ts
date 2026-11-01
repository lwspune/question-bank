/**
 * The free-answer check behind V's explain_question, and its record. Through
 * the student's own login: user_activity is own-row under RLS, and the count
 * is the one every reveal on the site uses (lib/questions/revealQuota.ts,
 * which counts the "v" surface since 2026-10-19). Server only: it writes.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadPaidRevealedToday, loadRevealedToday } from "@/lib/questions/revealQuota";
import { isFreeExamName } from "@/lib/billing/passScope";
import { getPremiumLimits } from "@/lib/billing/premiumLimits";
import { logActivityOnce } from "@/lib/activity/service";
import { istDayKey, istDayStartIso } from "@/lib/email/dueNudge";
import { revealCheck, type RevealCheck } from "./questionTools";

/** The day's opened questions for this student, or none when it cannot be read. */
export async function revealedToday(db: SupabaseClient, userId: string, now: Date): Promise<string[]> {
  try {
    return await loadRevealedToday(db, userId, istDayStartIso(now));
  } catch (e) {
    console.error("V: revealed-today read failed", e);
    return [];
  }
}

/**
 * The day's opened questions that count against the free answers: a free
 * exam's are left out (migration 0211). None when it cannot be read.
 */
export async function paidRevealedToday(db: SupabaseClient, now: Date): Promise<string[]> {
  try {
    return await loadPaidRevealedToday(db, istDayStartIso(now));
  } catch (e) {
    console.error("V: paid revealed-today read failed", e);
    return [];
  }
}

/** True when the question belongs to an exam that needs no pass (the Class 9-10 exams). */
async function questionIsFree(db: SupabaseClient, questionId: string): Promise<boolean> {
  const { data, error } = await db.from("questions").select("exams(name)").eq("id", questionId).maybeSingle();
  if (error) {
    console.error("V: question exam read failed", error);
    return false;
  }
  const exam = (data as { exams: { name: string } | { name: string }[] | null } | null)?.exams;
  return isFreeExamName(Array.isArray(exam) ? exam[0]?.name : exam?.name);
}

/**
 * Check the free answers and record the explanation as a reveal ("v" surface),
 * once per question per IST day. Limits that cannot be read mean no limit,
 * as GET /api/me/reveals treats them.
 */
export async function spendVReveal(db: SupabaseClient, userId: string, questionId: string, now = new Date()): Promise<RevealCheck> {
  const [limits, free] = await Promise.all([getPremiumLimits(db), questionIsFree(db, questionId)]);
  const limit = free || !limits || limits.hasPass ? null : limits.revealsPerDay;
  const check = revealCheck({ limit, todayIds: limit === null ? [] : await paidRevealedToday(db, now), questionId });
  if (check.kind === "ok") {
    await logActivityOnce(db, userId, {
      kind: "question_practiced",
      refId: questionId,
      refKind: "question",
      metadata: { surface: "v" },
      dedupeKey: `v_explain:${questionId}:${userId}:${istDayKey(now)}`,
    });
  }
  return check;
}
