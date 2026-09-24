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
import { WEEK_SITTING_KINDS, weekStartIst } from "./weekly";

export type OwnWeekly = {
  /** Finished sittings since Monday 00:00 IST. */
  done: number;
  /** The student's chosen goal, or null when they have not picked one. */
  goal: number | null;
};

/**
 * `count: "exact", head: true` — a SQL aggregate, never a row payload, so the
 * PostgREST 1000-row cap that has bitten this repo five times cannot touch it.
 */
export async function countWeekSittings(
  db: SupabaseClient,
  userId: string,
  now: Date = new Date()
): Promise<number> {
  const { count, error } = await db
    .from("user_activity")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .in("kind", [...WEEK_SITTING_KINDS])
    .gte("created_at", weekStartIst(now).toISOString());
  if (error) throw new Error(`countWeekSittings: ${error.message}`);
  return count ?? 0;
}

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

export async function getOwnWeekly(
  db: SupabaseClient,
  userId: string,
  now: Date = new Date()
): Promise<OwnWeekly> {
  const [done, goal] = await Promise.all([
    countWeekSittings(db, userId, now),
    readWeeklyGoal(db, userId),
  ]);
  return { done, goal };
}
