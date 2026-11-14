/**
 * "Same mistake again"'s read (rules: lib/questions/teachingMoment.ts): the
 * student's last miss on one question, through their own login (user_activity
 * is own-row under RLS).
 *
 * The practice route calls this BEFORE it writes the answer's rows, so the
 * answer being graded can never be its own "last time", whatever the clocks of
 * the server and the database say.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { priorMissFrom, type PriorMiss } from "./teachingMoment";

/** Enough rows to step past a few Review later marks to a real miss. */
const ROWS = 20;

export async function readPriorMiss(db: SupabaseClient, userId: string, questionId: string): Promise<PriorMiss | null> {
  const { data, error } = await db
    .from("user_activity")
    .select("kind, metadata, created_at")
    .eq("user_id", userId)
    .eq("kind", "answer_wrong")
    .eq("ref_id", questionId)
    .order("created_at", { ascending: false })
    .limit(ROWS);
  if (error) throw new Error(`readPriorMiss: ${error.message}`);
  return priorMissFrom((data ?? []) as { kind: string; metadata: Record<string, unknown> | null; created_at: string }[]);
}
