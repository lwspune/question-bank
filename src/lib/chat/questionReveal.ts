/**
 * The free-answer check behind V's explain_question, and its record. Through
 * the student's own login: user_activity is own-row under RLS, and the count
 * is the one every reveal on the site uses (lib/questions/revealQuota.ts,
 * which counts the "v" surface since 2026-10-19). Server only: it writes.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadRevealedToday } from "@/lib/questions/revealQuota";
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
 * Check the free answers and record the explanation as a reveal ("v" surface),
 * once per question per IST day. Limits that cannot be read mean no limit,
 * as GET /api/me/reveals treats them.
 */
export async function spendVReveal(db: SupabaseClient, userId: string, questionId: string, now = new Date()): Promise<RevealCheck> {
  const limits = await getPremiumLimits(db);
  const limit = !limits || limits.hasPass ? null : limits.revealsPerDay;
  const check = revealCheck({ limit, todayIds: limit === null ? [] : await revealedToday(db, userId, now), questionId });
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
