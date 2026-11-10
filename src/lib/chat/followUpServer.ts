/**
 * The server half of V's follow-up loop (V_LEARNING_LOOP.md step 2, migration
 * 0250). Service-role reads and writes, called by POST /api/chat/question with
 * the signed-in student's own id, never one the browser sends.
 *
 * settleFollowUp decides whether a try card's pick follows an explanation:
 *   1. a different question in the same subtopic (followUpEligible);
 *   2. V explained the first question to this student today (explainedIn over
 *      their AI replies since India's midnight);
 *   3. the first such follow-up for that explanation today: the v_followups
 *      primary key is the claim, so two tabs cannot both take it.
 * Then, with the switch on, the follow-up is marked in daily_reveals with
 * counts = false BEFORE the route records the answer: the mirror trigger
 * (0228) then finds the row and does nothing, and claim_reveal reads it as a
 * repeat. If marking fails, the follow-up simply counts (the student is never
 * stopped by this feature failing), and the link is corrected to free = false.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { istDayKey } from "@/lib/email/dueNudge";
import { istDayStart } from "./settings";
import { explainedIn, followUpEligible } from "./followUp";

type Q = { id: string; subtopicId: string | null };

/** AI replies one student can get in a day: far above V's hourly caps x 24. */
const REPLIES_READ_MAX = 1000;

/** Whether V explained the question to this student since India's midnight. */
export async function explainedToday(admin: SupabaseClient, userId: string, questionId: string, now: Date): Promise<boolean> {
  const { data, error } = await admin
    .from("chat_interactions")
    .select("asked_question_id, tool_calls")
    .eq("user_id", userId)
    .eq("reply_source", "ai")
    .gte("created_at", istDayStart(now).toISOString())
    .or(`asked_question_id.eq.${questionId},tool_calls.not.is.null`)
    .limit(REPLIES_READ_MAX);
  if (error) {
    console.error("explainedToday:", error.message);
    return false;
  }
  return explainedIn(
    (data ?? []).map((r) => ({ askedQuestionId: r.asked_question_id as string | null, toolCalls: r.tool_calls })),
    questionId
  );
}

/** Mark a question opened today without counting it (daily_reveals counts = false). False when the write failed. */
export async function markFreeReveal(admin: SupabaseClient, r: { userId: string; day: string; questionId: string }): Promise<boolean> {
  const { error } = await admin
    .from("daily_reveals")
    .upsert(
      { user_id: r.userId, ist_day: r.day, question_id: r.questionId, surface: "v", counts: false },
      { onConflict: "user_id,ist_day,question_id", ignoreDuplicates: true }
    );
  if (error) console.error("markFreeReveal:", error.message);
  return !error;
}

export async function settleFollowUp(
  admin: SupabaseClient,
  input: { userId: string; explained: Q; followUp: Q; switchOn: boolean; now: Date }
): Promise<{ linked: boolean; free: boolean }> {
  const none = { linked: false, free: false };
  const { userId, explained, followUp, switchOn, now } = input;
  if (!followUpEligible(explained, followUp)) return none;
  if (!(await explainedToday(admin, userId, explained.id, now))) return none;

  const day = istDayKey(now);
  const { data, error } = await admin
    .from("v_followups")
    .upsert(
      { user_id: userId, ist_day: day, explained_question_id: explained.id, followup_question_id: followUp.id, free: switchOn },
      { onConflict: "user_id,ist_day,explained_question_id", ignoreDuplicates: true }
    )
    .select("user_id");
  if (error) {
    console.error("settleFollowUp link:", error.message);
    return none;
  }
  if ((data ?? []).length === 0) return none; // this explanation's follow-up was already taken today
  if (!switchOn) return { linked: true, free: false };

  if (await markFreeReveal(admin, { userId, day, questionId: followUp.id })) return { linked: true, free: true };
  await admin.from("v_followups").update({ free: false }).eq("user_id", userId).eq("ist_day", day).eq("explained_question_id", explained.id);
  return { linked: true, free: false };
}
