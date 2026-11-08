/**
 * The free-answer check behind V's explain_question and question card, and its
 * record. Through the student's own login. The decision is claim_reveal's
 * (migration 0228), the one every reveal on the site uses; V's answers have
 * counted as the "v" surface since 2026-10-19. Server only: it writes.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadRevealedToday } from "@/lib/questions/revealQuota";
import { claimReveal } from "@/lib/questions/claimReveal";
import { logActivityOnce } from "@/lib/activity/service";
import { istDayKey, istDayStartIso } from "@/lib/email/dueNudge";
import type { RevealCheck } from "./questionTools";

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
 * One of V's answers against the daily limit (claim_reveal, migration 0228):
 * decided and, when it counts, recorded by the server in one step. Shared by
 * the explanation (spendVReveal) and the question card (POST
 * /api/chat/question). When the server cannot be asked, this one answer goes
 * ahead.
 */
export async function claimVReveal(db: SupabaseClient, questionId: string): Promise<RevealCheck> {
  const claim = await claimReveal((fn, args) => db.rpc(fn, args), questionId, "v");
  if (!claim) {
    console.error("V: claim_reveal failed; this answer goes ahead");
    return { kind: "ok", counts: false };
  }
  return claim.allowed ? { kind: "ok", counts: claim.reason === "counted" } : { kind: "limit", limit: claim.limit ?? 0 };
}

/**
 * Check the free answers and record the explanation as a reveal ("v" surface),
 * once per question per IST day. Decided by claim_reveal (migration 0228), the
 * one rule every surface uses: the question's own exam (a free exam, its pass),
 * today's board-path questions, and the day's count, serialised per student.
 * When the server cannot be asked, this one explanation goes ahead: a student
 * is never walled by our error.
 */
export async function spendVReveal(db: SupabaseClient, userId: string, questionId: string, now = new Date()): Promise<RevealCheck> {
  const check = await claimVReveal(db, questionId);
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
