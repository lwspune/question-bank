/**
 * Write path for question reviews. Service-role only (question_reviews has RLS
 * enabled and no policies — see migration 0074).
 *
 * NOT marked `server-only`: the ingestion scripts import this under tsx, where
 * that Next build-time alias is unresolvable. Same reason as
 * src/lib/quiz/assemble.ts and src/lib/email/resend.ts — the caller injects the
 * client, so there is no ambient credential to leak into a bundle.
 *
 * NEVER THROWS. Recording a review is a side effect of some primary write (a key
 * flip, a solution commit, a report resolution). A logging failure must not roll
 * back the thing it was describing — but unlike activity logging it must not be
 * silent either, so the result is returned for the caller to print. A review
 * that failed to record is a gap in the audit trail and the operator has to see
 * it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { sanitizeReviewRecords, type ReviewInput, type ReviewRow } from "./record";

/** PostgREST payload cap guard; reviews batches are small, this is a backstop. */
const CHUNK = 500;

export type RecordReviewsResult = {
  /** Inputs handed in. */
  attempted: number;
  /** Rows that passed validation and reached the DB. */
  accepted: number;
  /** Rows newly written (a re-run of the same pass writes 0 — the dedupe key). */
  written: number;
  /** Inputs rejected by validation, with the reason and their input index. */
  rejected: { index: number; reason: string }[];
  /** DB-level failure, if any. Presence means the audit trail has a hole. */
  error?: string;
};

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export async function recordReviews(
  client: SupabaseClient,
  inputs: ReviewInput[]
): Promise<RecordReviewsResult> {
  const { rows, errors } = sanitizeReviewRecords(inputs);
  const result: RecordReviewsResult = {
    attempted: inputs.length,
    accepted: rows.length,
    written: 0,
    rejected: errors,
  };
  if (rows.length === 0) return result;

  for (const batch of chunk(rows, CHUNK)) {
    // ignoreDuplicates => ON CONFLICT DO NOTHING on the (question_id, run_label,
    // reviewed_content_hash) constraint, so re-running a pass is a no-op rather
    // than a pile of identical rows. .select() makes `written` the count that
    // actually landed, not the count we sent.
    const { data, error } = await client
      .from("question_reviews")
      .upsert(batch as ReviewRow[], {
        onConflict: "question_id,run_label,reviewed_content_hash",
        ignoreDuplicates: true,
      })
      .select("id");

    if (error) {
      result.error = error.message;
      return result;
    }
    result.written += (data ?? []).length;
  }

  return result;
}

/** One-liner for the common single-row case at a write site. */
export async function recordReview(
  client: SupabaseClient,
  input: ReviewInput
): Promise<RecordReviewsResult> {
  return recordReviews(client, [input]);
}

/**
 * Print a result at a script/route boundary. Kept here so every emitter reports
 * the same way and a hole in the trail is never a silent one.
 */
export function formatRecordResult(result: RecordReviewsResult, label = "reviews"): string {
  const parts = [`${label}: ${result.written} recorded`];
  if (result.accepted !== result.written) {
    parts.push(`${result.accepted - result.written} already on record`);
  }
  if (result.rejected.length > 0) {
    parts.push(`⚠ ${result.rejected.length} rejected (${result.rejected[0].reason})`);
  }
  if (result.error) parts.push(`⚠ NOT RECORDED: ${result.error}`);
  return parts.join(" | ");
}
