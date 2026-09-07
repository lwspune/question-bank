/**
 * Where a CDS derived-answer provenance record goes: `question_reviews`, never
 * the solution text.
 *
 * The CDS ingest used to append
 *   [LLM-derived, confidence: MED; no official key — verify before PUBLIC]
 * to every solution. That is an instruction addressed to US, and the answer-key
 * export prints `solution` verbatim — so it reached students on /browse and in
 * every downloaded teacher key. 2,022 of 2,280 rows carried it before the
 * 2026-09-08 cleanup.
 *
 * Stripping it after the fact was only half the fix: `buildRecords` kept
 * generating it, so the next paper committed would have carried it again. The
 * marker is now never written into `solution` at all, and this module records
 * the same fact where it belongs.
 *
 * Shared by `commit.ts` (new rows) and `clean-markers.ts` (legacy rows) on
 * purpose: "which rows already have a human verdict" is one rule, and two
 * copies of it would drift — the failure this repo has already had twice with
 * its two docx renderers.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { recordReviews } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

/**
 * Rows a human has ALREADY ADJUDICATED — any verdict except `unverifiable`.
 *
 * `question_reviews` is append-only and the NEWEST row is the current belief,
 * so writing "nobody has checked this" over a `key_fixed` / `stem_fixed` /
 * `defect_preserved` row would report a question that was read against the
 * printed page as unexamined. Asking only for `confirmed` was the original
 * bug: it would have buried the 2026-09-07 source adjudication of CDS 2018-1
 * Q35.
 *
 * Chunked at 200 because `.in()` puts the whole list in the URL — this repo
 * has already hit a bare `Bad Request` at 833 ids.
 */
export async function alreadyAdjudicated(
  client: SupabaseClient,
  questionIds: string[]
): Promise<Set<string>> {
  const out = new Set<string>();
  for (let i = 0; i < questionIds.length; i += 200) {
    const { data, error } = await client
      .from("question_reviews")
      .select("question_id")
      .neq("verdict", "unverifiable")
      .in("question_id", questionIds.slice(i, i + 200));
    if (error) throw new Error(`question_reviews: ${error.message}`);
    for (const r of data ?? []) out.add(r.question_id as string);
  }
  return out;
}

export type ProvenanceRow = {
  id: string;
  contentHash: string;
  /** HIGH | MED | LOW as recorded by the transcription pass. */
  confidence: string;
};

/**
 * Record "this answer is LLM-derived against a booklet with no printed key" for
 * rows that have no human verdict yet.
 *
 * VERDICT IS `unverifiable`, not `confirmed`: the CDS booklets carry no printed
 * answer key, so by construction there is nothing to check the answer against.
 * Recording a confirmation here would turn an unverified answer green, which is
 * the exact failure migration 0074's own header warns about.
 *
 * `derived_model` is deliberately left unset. The bank's convention for that
 * column is a real model id, the CDS ingest never recorded one, and inventing a
 * plausible id would put a fabrication where the schema promises a fact.
 */
export async function recordDerivedProvenance(
  client: SupabaseClient,
  rows: ProvenanceRow[],
  opts: { runLabel: string; apply: boolean; movedFromSolution?: boolean }
): Promise<{ attempted: number; written: number; skipped: number }> {
  const skipSet = await alreadyAdjudicated(client, rows.map((r) => r.id));
  const reviews: ReviewInput[] = [];

  for (const r of rows) {
    if (skipSet.has(r.id)) continue;
    reviews.push({
      questionId: r.id,
      reviewedContentHash: r.contentHash,
      method: "blind_rederivation",
      verdict: "unverifiable",
      runLabel: opts.runLabel,
      note:
        `Answer is LLM-derived at ingest (confidence: ${r.confidence}; model not recorded). ` +
        `The CDS source booklet carries NO printed answer key, so there is nothing to verify ` +
        `against and this row has had no human spot-check. ` +
        (opts.movedFromSolution
          ? `Provenance moved here from the solution text, which the answer-key export prints verbatim to students. `
          : `Recorded at commit; the solution text carries no internal marker by design. `) +
        `NOT a confirmation.`,
    });
  }

  const skipped = rows.length - reviews.length;
  if (!opts.apply) return { attempted: reviews.length, written: 0, skipped };

  const res = await recordReviews(client, reviews);
  if (res.error) throw new Error(`question_reviews: ${res.error}`);
  return { attempted: reviews.length, written: res.written, skipped };
}
