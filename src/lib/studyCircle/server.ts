/**
 * Whether Home shows the study-circle card (migration 0247). Service role,
 * because the table has no read policy; filtered on the user id. The growth
 * readout is in ./readout (no server-only, so scripts can import it).
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { STUDY_CIRCLE_ENDS, studyCircleAskDue } from "./core";

/** Show the card on Home? No read at all once the test has ended. */
export async function loadStudyCircleAsk(userId: string, now: Date): Promise<boolean> {
  if (now.getTime() >= STUDY_CIRCLE_ENDS.getTime()) return false;
  const { data, error } = await createSupabaseAdminClient()
    .from("study_circle_interest")
    .select("answer")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return studyCircleAskDue((data as { answer: string | null } | null) ?? null, now);
}
