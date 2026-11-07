/**
 * Server reads for the weekly sittings goal. The rules live in the pure
 * weekly.ts; this fetches two numbers and nothing else.
 *
 * Takes the supabase client as a PARAMETER (the lib/drill/query.ts precedent)
 * and reads with the student's own JWT — `user_activity` and
 * `student_profiles` are both own-row by RLS, so there is no gate for a route
 * to get wrong.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { STUDY_DAY_MIN_ANSWERS, WEEK_SITTING_KINDS, weekStartIst } from "./weekly";

export type OwnWeekly = {
  /** Study days since Monday 00:00 IST (2026-11-06; was finished sittings). */
  done: number;
  /** The student's chosen goal, or null when they have not picked one. */
  goal: number | null;
};

export async function readWeeklyGoal(db: SupabaseClient, userId: string): Promise<number | null> {
  const { data, error } = await db
    .from("student_profiles")
    .select("weekly_goal")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`readWeeklyGoal: ${error.message}`);
  const g = data?.weekly_goal as number | null | undefined;
  return typeof g === "number" ? g : null;
}

/**
 * Study days since Monday 00:00 IST, counted in SQL (migration 0219) under the
 * caller's own JWT. The rule's two inputs come from weekly.ts.
 */
export async function countWeekStudyDays(db: SupabaseClient, now: Date = new Date()): Promise<number> {
  const { data, error } = await db.rpc("get_own_week_study_days", {
    p_since: weekStartIst(now).toISOString(),
    p_sitting_kinds: [...WEEK_SITTING_KINDS],
    p_min_answers: STUDY_DAY_MIN_ANSWERS,
  });
  if (error) throw new Error(`countWeekStudyDays: ${error.message}`);
  return typeof data === "number" ? data : 0;
}

/**
 * The same count for a NAMED student, for the staff view of their /me
 * (migration 0222). Call it with the superadmin's own session client: the
 * function checks the caller and throws for anyone else (42501), so a refusal
 * never reads as a student with no study days.
 */
export async function countStudentWeekStudyDays(
  db: SupabaseClient,
  userId: string,
  now: Date = new Date()
): Promise<number> {
  const { data, error } = await db.rpc("get_student_week_study_days_for_staff", {
    p_user_id: userId,
    p_since: weekStartIst(now).toISOString(),
    p_sitting_kinds: [...WEEK_SITTING_KINDS],
    p_min_answers: STUDY_DAY_MIN_ANSWERS,
  });
  if (error) throw new Error(`countStudentWeekStudyDays: ${error.message}`);
  return typeof data === "number" ? data : 0;
}

export async function getOwnWeekly(
  db: SupabaseClient,
  userId: string,
  now: Date = new Date()
): Promise<OwnWeekly> {
  const [done, goal] = await Promise.all([
    countWeekStudyDays(db, now),
    readWeeklyGoal(db, userId),
  ]);
  return { done, goal };
}
