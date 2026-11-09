/**
 * The Fix Points award and balance (migration 0245). Service-role only: the
 * table has no student write grant, which is the point. Rules: fixPoints.ts.
 *
 * Callers pass the admin client, so a test can drive the real database.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { MISS_KINDS } from "@/lib/drill/select";
import { istDayStartIso } from "@/lib/email/dueNudge";
import { readInChunks } from "@/lib/supabase/readInChunks";
import { fixPointsPct, fixPointsWindowStart } from "./fixPoints";

export type FixPointSource = "drill" | "mock" | "bank" | "board" | "daily";

/**
 * Award a point for each of `questionIds` the student missed BEFORE TODAY
 * (IST) and has not been paid for already. The caller passes only questions
 * the server has just graded right. A miss from today does not pay: the answer
 * was shown with the miss, so a right answer the same day is an echo, not
 * recall. Returns the questions newly paid for.
 *
 * Best-effort: a failure is logged and pays nothing; it never costs the answer
 * that triggered it.
 */
export async function awardFixPoints(
  admin: SupabaseClient,
  a: { userId: string; questionIds: readonly string[]; source: FixPointSource; now: Date }
): Promise<string[]> {
  const ids = [...new Set(a.questionIds)];
  if (ids.length === 0) return [];
  try {
    const before = istDayStartIso(a.now);
    const rows = await readInChunks<{ id: string; ref_id: string }>(ids, (chunk, from, to) =>
      admin
        .from("user_activity")
        .select("id, ref_id")
        .eq("user_id", a.userId)
        .in("kind", [...MISS_KINDS])
        .in("ref_id", chunk)
        .lt("created_at", before)
        .order("id")
        .range(from, to)
    );
    const missed = new Set(rows.map((r) => r.ref_id));
    if (missed.size === 0) return [];
    const { data, error } = await admin
      .from("fix_points")
      .upsert(
        [...missed].map((questionId) => ({ user_id: a.userId, question_id: questionId, source: a.source })),
        { onConflict: "user_id,question_id", ignoreDuplicates: true }
      )
      .select("question_id");
    if (error) throw new Error(`fix points insert: ${error.message}`);
    return ((data ?? []) as { question_id: string }[]).map((r) => r.question_id);
  } catch (e) {
    console.error("awardFixPoints failed", e);
    return [];
  }
}

/** `oldestAt`: the earned time of the oldest point still in the window, which dates the run-out; null with none. */
export type FixPointsBalance = { points: number; pct: number; oldestAt: string | null };

/**
 * The student's points now: earned since the later of 30 days ago and their
 * last purchase. THROWS on a failed read, so a caller can tell "no points"
 * from "could not ask" (the order route sells at the list price on a throw;
 * the display route answers 503).
 */
export async function readFixPoints(admin: SupabaseClient, userId: string, now: Date): Promise<FixPointsBalance> {
  const { data: bought, error: bErr } = await admin
    .from("entitlements")
    .select("created_at")
    .eq("user_id", userId)
    .eq("source", "razorpay")
    .order("created_at", { ascending: false })
    .limit(1);
  if (bErr) throw new Error(`fix points last purchase: ${bErr.message}`);
  const last = (bought ?? [])[0] as { created_at: string } | undefined;
  const since = fixPointsWindowStart(now, last ? new Date(last.created_at) : null);

  // The count and the oldest point in the window, read side by side.
  const [counted, oldest] = await Promise.all([
    admin
      .from("fix_points")
      .select("question_id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("earned_at", since.toISOString()),
    admin
      .from("fix_points")
      .select("earned_at")
      .eq("user_id", userId)
      .gte("earned_at", since.toISOString())
      .order("earned_at", { ascending: true })
      .limit(1),
  ]);
  if (counted.error) throw new Error(`fix points count: ${counted.error.message}`);
  if (oldest.error) throw new Error(`fix points oldest: ${oldest.error.message}`);
  const points = counted.count ?? 0;
  const first = (oldest.data ?? [])[0] as { earned_at: string } | undefined;
  return { points, pct: fixPointsPct(points), oldestAt: points > 0 && first ? first.earned_at : null };
}
