/**
 * Server-only reads and the one write behind the celebrations (2026-10-04).
 *
 * Both go through the student's own RLS client: `get_own_answer_totals` is
 * SECURITY INVOKER and sums only the caller's rows, and the milestone row is an
 * own-row insert. There is no service-role path here for a route to mis-gate.
 *
 * BEST-EFFORT, like every activity write. A failed read or award returns null,
 * which means "no message", never an error in front of the student and never a
 * cost to the answer that triggered it.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildActivityRow } from "@/lib/activity/events";
import { highestMilestone, milestoneEvent } from "./milestones";

export type AnswerTotals = { answered: number; right: number };

/** Answered and right across every surface, for the signed-in caller. */
export async function getOwnAnswerTotals(db: SupabaseClient): Promise<AnswerTotals | null> {
  try {
    const { data, error } = await db.rpc("get_own_answer_totals");
    if (error) {
      console.error("get_own_answer_totals failed", error.message);
      return null;
    }
    const row = (data as { answered: number | string; right_answers: number | string }[] | null)?.[0];
    if (!row) return null;
    return { answered: Number(row.answered), right: Number(row.right_answers) };
  } catch (e) {
    console.error("get_own_answer_totals threw", e);
    return null;
  }
}

/**
 * Award the highest "N answered" milestone the student has reached, if it has
 * not been awarded before. Returns the milestone when THIS call wrote it — the
 * only case in which the caller should show a message — and null otherwise.
 *
 * Once is a property of the TABLE: the row is inserted ON CONFLICT (dedupe_key)
 * DO NOTHING and returned only when it was actually inserted, so two tabs
 * racing to the same milestone show it once between them.
 */
export async function awardAnsweredMilestone(db: SupabaseClient, userId: string): Promise<number | null> {
  const totals = await getOwnAnswerTotals(db);
  if (!totals) return null;
  const milestone = highestMilestone(totals.answered);
  if (milestone === null) return null;
  try {
    const row = buildActivityRow(userId, milestoneEvent(userId, milestone), new Date().toISOString());
    const { data, error } = await db
      .from("user_activity")
      .upsert(row, { onConflict: "dedupe_key", ignoreDuplicates: true })
      .select("id");
    if (error) {
      console.error("milestone award failed", error.message);
      return null;
    }
    return (data ?? []).length > 0 ? milestone : null;
  } catch (e) {
    console.error("milestone award threw", e);
    return null;
  }
}
