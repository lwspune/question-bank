/**
 * Server-only writes for the engagement activity spine (migration 0052).
 *
 * BEST-EFFORT BY DESIGN: activity logging is a SECONDARY effect of a primary
 * user action (submitting a mock, mastering a chapter, saving a question). A
 * logging failure must NEVER surface to the student or roll back the primary
 * action, so every write here swallows its error (console.error only) and
 * returns void. The spine is analytics/engagement substrate, not a boundary.
 *
 * Writes go through the RLS-bound client (the user's JWT) — the own-row INSERT
 * policy enforces ownership; the explicit user_id is what WITH CHECK validates.
 * The pure buildActivityRow does the column mapping.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildActivityRow, type ActivityEvent } from "./events";

/** Log one activity event. Best-effort — never throws. */
export async function logActivity(
  db: SupabaseClient,
  userId: string,
  event: ActivityEvent,
  nowMs: number = Date.now()
): Promise<void> {
  await logActivityBatch(db, userId, [event], nowMs);
}

/**
 * Log several events at once (e.g. a mock submit emits one `mock_submitted` plus
 * one `answer_wrong` per missed question). Best-effort — never throws. Backfill
 * events (with a dedupeKey) go through the same path but the backfill script
 * uses upsert(onConflict) for idempotency; live events here are plain inserts.
 */
export async function logActivityBatch(
  db: SupabaseClient,
  userId: string,
  events: ActivityEvent[],
  nowMs: number = Date.now()
): Promise<void> {
  if (events.length === 0) return;
  try {
    const nowIso = new Date(nowMs).toISOString();
    const rows = events.map((e) => buildActivityRow(userId, e, nowIso));
    const { error } = await db.from("user_activity").insert(rows);
    if (error) console.error("logActivity insert failed", error.message);
  } catch (e) {
    console.error("logActivity threw", e);
  }
}
