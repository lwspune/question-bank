import type { SupabaseClient } from "@supabase/supabase-js";
import { aggregateItemStats } from "./aggregate";
import type { ItemStatAggregate, ItemStatRow, OptionLabel } from "./types";

/**
 * Item statistics for the questions on one /browse page.
 *
 * Follows the `getResourceTagsForQuestions` pattern exactly: a batched lookup
 * over the ids already on the page, run alongside the main query, degrading to
 * an empty map on failure. It is NOT joined into `queryQuestions` — that query
 * carries the page's ORDER BY, and widening its payload is what cost this
 * project 13.9 MB of disk spill per call once already.
 *
 * Reads through the CALLER'S client, so RLS decides. The page also skips this
 * fetch entirely for anon and students, but that is a performance gate; the
 * security boundary is the policy on `question_item_stats`, which admits org
 * members and superadmins only.
 *
 * The live `content_hash` is fetched and passed to the pure core rather than
 * assumed: a row measured against a different version of the question is stale
 * and must contribute nothing. See ITEM_STATS.md.
 */
export async function getItemStatsForQuestions(
  supabase: SupabaseClient,
  questionIds: string[]
): Promise<Map<string, ItemStatAggregate>> {
  const out = new Map<string, ItemStatAggregate>();
  // `.in("id", [])` is a PostgREST 400, not an empty result.
  if (questionIds.length === 0) return out;

  const [statsRes, hashRes] = await Promise.all([
    supabase
      .from("question_item_stats")
      .select(
        "question_id, source, source_ref, org_id, cohort_label, seen, attempted, correct, skipped, choice_counts, disc_top_correct, disc_top_n, disc_bottom_correct, disc_bottom_n, key_at_measurement, verdict_mismatch, measured_content_hash, measured_at"
      )
      .in("question_id", questionIds),
    supabase.from("questions").select("id, content_hash").in("id", questionIds),
  ]);

  if (statsRes.error || hashRes.error) return out;

  const hashById = new Map<string, string>();
  for (const q of (hashRes.data ?? []) as { id: string; content_hash: string }[]) {
    hashById.set(q.id, q.content_hash);
  }

  const byQuestion = new Map<string, ItemStatRow[]>();
  for (const r of (statsRes.data ?? []) as {
    question_id: string;
    source: "tracker" | "vault_mock";
    source_ref: string;
    org_id: string | null;
    cohort_label: string | null;
    seen: number;
    attempted: number;
    correct: number;
    skipped: number;
    choice_counts: Record<string, number> | null;
    disc_top_correct: number | null;
    disc_top_n: number | null;
    disc_bottom_correct: number | null;
    disc_bottom_n: number | null;
    key_at_measurement: OptionLabel | null;
    verdict_mismatch: number | null;
    measured_content_hash: string;
    measured_at: string;
  }[]) {
    const rows = byQuestion.get(r.question_id) ?? [];
    rows.push({
      questionId: r.question_id,
      source: r.source,
      sourceRef: r.source_ref,
      orgId: r.org_id,
      cohortLabel: r.cohort_label,
      seen: r.seen,
      attempted: r.attempted,
      correct: r.correct,
      skipped: r.skipped,
      choiceCounts: r.choice_counts ?? {},
      discTopCorrect: r.disc_top_correct,
      discTopN: r.disc_top_n,
      discBottomCorrect: r.disc_bottom_correct,
      discBottomN: r.disc_bottom_n,
      keyAtMeasurement: r.key_at_measurement,
      verdictMismatch: r.verdict_mismatch,
      measuredContentHash: r.measured_content_hash,
      measuredAt: r.measured_at,
    });
    byQuestion.set(r.question_id, rows);
  }

  for (const [questionId, rows] of byQuestion) {
    const hash = hashById.get(questionId);
    if (!hash) continue;
    const agg = aggregateItemStats(rows, hash);
    if (agg) out.set(questionId, agg);
  }
  return out;
}
