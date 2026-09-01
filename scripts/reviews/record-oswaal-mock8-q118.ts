/**
 * Record the 2026-09-01 source adjudication of Oswaal GAT Mock 8 Q118
 * (capillary rise in an inclined tube), reported from NDA GAT Mock 5.
 *
 *   npx tsx scripts/reviews/record-oswaal-mock8-q118.ts            # dry run
 *   npx tsx scripts/reviews/record-oswaal-mock8-q118.ts --apply
 *
 * Run AFTER scripts/practice-paper/apply-adjudicated-fixes.ts —
 * `reviewed_content_hash` must be the hash the row carries once the edit has
 * landed, so the review describes the question AS REVIEWED. The stem changed
 * here, so the hash moved (468fbb17 -> 8d7c4fe4) and the ordering is not merely
 * a formality: recording first would fingerprint text that no longer exists and
 * mark this review permanently stale.
 *
 * VERDICT is `stem_fixed`, and it is the accurate one rather than the flattering
 * one. Two defects were found with OPPOSITE owners:
 *
 *   - `45oC` is the SOURCE's. Verified at span level on the printed page, not
 *     inferred: the line is 'an angle of 45' at 9.00pt baseline, 'o' at 7.20pt
 *     with the superscript flag set, then 'C. The length' at 9.00pt — so the
 *     booklet really does print 45 degrees Celsius on an inclination angle, and
 *     our transcription was faithful.
 *   - `q` for theta (3 occurrences in the solution) is OURS. Those glyphs are
 *     font=SymbolMT in the source, where codepoint q renders as theta; the
 *     extraction took the codepoint literally.
 *
 * `defect_preserved` would therefore be wrong on both counts: the source defect
 * was CORRECTED rather than preserved, and one of the two defects was ours.
 * Only one verdict can be recorded per (question, run, hash), so the note below
 * carries both.
 *
 * METHOD is `source_key_crosscheck`: the defining act was diffing our stored row
 * against the source documents. NOT `blind_rederivation` — the key was
 * re-derived and confirmed (h/cos45 = h*sqrt(2) > h, so the column lengthens),
 * but the stored key was visible throughout, so that derivation does not meet
 * the blind bar and this row still owes a blind pass.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "source-adjudication:2026-09-01-oswaal-gat-mock8-q118";
const QUESTION_ID = "3bc00f7a-6660-4ee2-ac87-30ac83607193";

/** The hash the row must carry for this review to describe it accurately. */
const EXPECTED_HASH_PREFIX = "8d7c4fe4";

const NOTE =
  "Reported from NDA GAT Mock 5. TWO defects, opposite owners. (1) SOURCE: the booklet's question " +
  "paper prints '45oC' — verified at span level, a 7.20pt superscript-flagged 'o' between two 9.00pt " +
  "baseline spans — i.e. degrees Celsius on an inclination angle. CORRECTED to 45 degrees, not " +
  "preserved, because the booklet refutes itself (its own worked solution prints 45 + U+00B0 with no " +
  "C and reasons about an angle throughout) and Oswaal reprints the identical question in its YWSP " +
  "General Studies title the same way; and because this is a practice booklet, not a PYQ with an " +
  "issued key anyone was marked against. (2) OURS: 'q' for theta x3 in the solution — SymbolMT " +
  "codepoint taken literally — restored. Key (increase) unaffected and correct. Only row in the bank " +
  "with an angle carrying a Celsius unit (scanned bank-wide; the 2 other hits are real temperatures).";

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data, error } = await db
    .from("questions")
    .select("id, question_number, source_file, content_hash, visibility, text")
    .eq("id", QUESTION_ID)
    .single();
  if (error) throw error;

  // Refuse unless the repair has actually landed — otherwise this records a
  // verdict about text that is not what was reviewed.
  if (!String(data.content_hash).startsWith(EXPECTED_HASH_PREFIX)) {
    console.error(
      `REFUSE: content_hash is ${String(data.content_hash).slice(0, 12)}, expected ${EXPECTED_HASH_PREFIX}… ` +
        `— run scripts/practice-paper/apply-adjudicated-fixes.ts --apply first`,
    );
    process.exit(1);
  }
  if (String(data.text).includes("45oC")) {
    console.error("REFUSE: the stem still contains '45oC' — the repair has not landed");
    process.exit(1);
  }

  const inputs: ReviewInput[] = [
    {
      questionId: data.id,
      reviewedContentHash: data.content_hash,
      method: "source_key_crosscheck",
      verdict: "stem_fixed",
      runLabel: RUN,
      note: NOTE.slice(0, 480),
      source: "live",
    },
  ];

  console.log(`Q${data.question_number} ${data.source_file} (${data.visibility})`);
  console.log(`  hash ${String(data.content_hash).slice(0, 12)} · ${inputs[0].method} · ${inputs[0].verdict}`);
  console.log(`  run  ${RUN}`);
  if (!APPLY) {
    console.log("\nDRY RUN — re-run with --apply.");
    return;
  }
  console.log(formatRecordResult(await recordReviews(db as any, inputs)));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
