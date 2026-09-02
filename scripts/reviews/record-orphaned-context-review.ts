/**
 * Record the source-verified repair of the two orphaned-table NDA Maths rows.
 *
 *   npx tsx scripts/reviews/record-orphaned-context-review.ts            # dry run
 *   npx tsx scripts/reviews/record-orphaned-context-review.ts --apply
 *
 * Method is `source_key_crosscheck`, not `blind_rederivation`: nothing was
 * re-derived blind here. Both stored keys were diffed against the papers' own
 * printed answer keys (Paper 1 "113. D", Paper 2 "80. B") and both already
 * matched, and it was the key that DECIDED which of two candidate tables on
 * Mock 1 page 6 belongs to Q113 — the other one would have keyed (a).
 *
 * Verdict is `stem_fixed`: the question as stored was repaired. The key never
 * moved, so `key_fixed` would be false; `confirmed` would be worse, since it
 * would assert nothing changed when the row went from unanswerable to
 * answerable.
 *
 * reviewedContentHash is read from the DB AFTER the repair, per the 0074
 * contract. Here it is unchanged by construction — contentHash for an MCQ
 * excludes `context` — and the repair script asserts that; reading it back
 * rather than assuming it keeps the two scripts independent.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "orphaned-context:2026-09-02-nda-maths-mocks";

const NOTES: Record<string, string> = {
  "38a90f9a-4baa-47b4-8aa8-44cdcb79aae8":
    "Mock 1 Q113. Stem referenced 'the above frequency distribution' with set_id, context and " +
    "image_url all NULL, so the row was unanswerable while looking clean to every gate. " +
    "Source-verified against 'NDA Maths Mock Test Paper 1.pdf' p6: the table IS printed, but it " +
    "floated out of the left column into the middle of Q119's option block in the right column " +
    "(a Word anchor accident), so it is adjacent to Q113 in no reading order and the ingest never " +
    "had it. The page carries TWO frequency tables and the printed key decides between them: the " +
    "Q114/115 Direction table (0-10..40-50, f 5/10/20/5/10) puts median class = modal class = " +
    "20-30, making statement 1 TRUE and keying (a), while the correct table (0-5..16-20, f 3/7/6/5) " +
    "gives median class 11-15 vs modal class 6-10, both statements FALSE, keying (d) = the paper's " +
    "printed key. Restored as a GFM pipe-table in `context`; key D unchanged; content_hash " +
    "unchanged (contentHash excludes context for an MCQ), so no paper, mock ref or tag was orphaned.",
  "f75633b1-a8b0-4626-8aa6-ed9b52fd85e9":
    "Mock 2 Q80. Same symptom, different cause: the table is printed directly beneath its own stem " +
    "in 'NDA Maths Mock Test Paper 2 Questions.pdf' p6 and was simply dropped at ingest. Restored " +
    "as a GFM pipe-table in `context`; key B unchanged and matching the paper's printed key. " +
    "SEPARATE SOURCE DEFECT, recorded not fixed: the paper as PRINTED gives the mean as 32/8, " +
    "which forces f = -12 and is impossible; the bank's stored 23/8 gives f = 6 = the paper's own " +
    "key B, so the bank is right and the printed paper carries a digit transposition.",
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const ids = Object.keys(NOTES);
  const { data, error } = await db
    .from("questions")
    .select("id, question_number, source_file, context, content_hash")
    .in("id", ids);
  if (error) throw new Error(error.message);

  const inputs: ReviewInput[] = [];
  for (const row of data ?? []) {
    // Refuse to record a review of a repair that did not land.
    if (!row.context || !row.context.includes("|---|")) {
      throw new Error(
        `REFUSED — ${row.source_file} Q${row.question_number} has no restored pipe-table in context; ` +
          `run apply-orphaned-context-fix.ts --apply first`
      );
    }
    inputs.push({
      questionId: row.id,
      reviewedContentHash: row.content_hash as string,
      method: "source_key_crosscheck",
      verdict: "stem_fixed",
      runLabel: RUN,
      source: "live",
      note: NOTES[row.id],
    });
  }
  if (inputs.length !== ids.length) throw new Error(`expected ${ids.length} rows, resolved ${inputs.length}`);

  for (const i of inputs) console.log(`  ${i.questionId}  ${i.method} / ${i.verdict}`);

  if (!APPLY) {
    console.log(`\nDRY RUN — would record ${inputs.length} reviews under ${RUN}`);
    return;
  }
  const result = await recordReviews(db, inputs);
  console.log("\n" + formatRecordResult(result, RUN));
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
