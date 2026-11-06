/**
 * The student's own practice evidence (migration 0221,
 * get_own_practice_evidence). No `server-only`, so `npm run map:smoke` and the
 * integration test can drive it with any client; the page passes the
 * student's own session, and the function reads auth.uid() alone.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { EMPTY_PRACTICE, type PracticeEvidence } from "./types";

export async function fetchOwnPracticeEvidence(db: SupabaseClient): Promise<PracticeEvidence> {
  const { data, error } = await db.rpc("get_own_practice_evidence");
  if (error) throw new Error(`get_own_practice_evidence: ${error.message}`);
  return (data as PracticeEvidence | null) ?? EMPTY_PRACTICE;
}

/**
 * ONE student's practice evidence through the service-role-only inner
 * function (get_student_practice_evidence). For `npm run map:smoke`, which
 * drives the map's data chain over real students; never a page.
 */
export async function fetchStudentPracticeEvidence(db: SupabaseClient, userId: string): Promise<PracticeEvidence> {
  const { data, error } = await db.rpc("get_student_practice_evidence", { p_user_id: userId });
  if (error) throw new Error(`get_student_practice_evidence: ${error.message}`);
  return (data as PracticeEvidence | null) ?? EMPTY_PRACTICE;
}
