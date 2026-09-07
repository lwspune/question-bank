/**
 * Record the three NDA GAT "ordering of words" key corrections made while
 * ingesting the LWS "PQRS Test 1" paper.
 *
 *   npx tsx scripts/reviews/record-key-fixes-pqrs-test-1.ts            # dry run
 *   npx tsx scripts/reviews/record-key-fixes-pqrs-test-1.ts --apply
 *
 * Run AFTER scripts/practice-paper/apply-adjudicated-fixes.ts --apply:
 * `reviewed_content_hash` must be the hash the row carries once the edit has
 * landed, because a corrective review's edit is its own output. The answer
 * letter is a hash input, so all three hashes moved — the script reads the live
 * hash rather than hard-coding one, and REFUSES unless the live key is already
 * the corrected letter.
 *
 * METHOD is `source_key_crosscheck` for all three, and the choice is load-
 * bearing rather than cosmetic. These were not caught by re-derivation in the
 * abstract: each was read off the ORIGINAL printed UPSC question booklet — the
 * paper the rows were transcribed from — which confirmed our parts and options
 * are faithful and that the defect is in the key alone. NOT
 * `blind_rederivation`, because the stored key was visible throughout; NOT
 * `solution_audit`, because a read-through is not what settled them.
 *
 * Why correcting a PYQ key is legitimate here, against the standing
 * preserve-the-paper's-key convention: BOTH booklets are UPSC QUESTION papers
 * and print no answer key at all (verified page by page), so there is no issued
 * key that students were marked against. The stored letters came from a
 * prep-house `.xlsx` Answer column — a derivation, which the 2026-08-26
 * precedent already established is not a published key.
 *
 * Two independent lines of evidence agree on all three, which is what made them
 * safe to flip:
 *   1. The teacher's Evalbee RESULTS key for this test disagrees with the bank
 *      on exactly these three questions and matches the reading in every case.
 *   2. Each row's OWN stored solution derived the correct sequence and then
 *      talked itself out of it ("the answer key indicates PRSQ", "on review",
 *      "best fit is"). A scan of all 288 rows in the chapter for that tell
 *      returns exactly these three — no misses, no false positives.
 *
 * NOT recorded here, deliberately: the other six wrong keys found in
 * GAT_NDA1_2022_PYQ.xlsx's rearrangement block (source Q23–Q26, Q29, Q30).
 * They were adjudicated against the same booklet but have NOT been corrected,
 * so there is no verdict to record — see the SUGGESTIONS.md backfill ledger.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "key-fix:2026-09-07-lws-pqrs-test-1";

type Target = { id: string; label: string; expectKey: string; note: string };

const TARGETS: Target[] = [
  {
    id: "7b7e248f-6a08-4fdc-bf82-a102c862b175",
    label: "NDA 2020 (I) GAT Q20 (printed Q10)",
    expectKey: "D",
    note:
      "Keyed PRSQ; corrected to RSQP. Read off the printed booklet (NDA 2020 (I) GAT, KJU-F-GTA, Q20): " +
      "our parts and all four options match it exactly, and the paper prints no key, so PRSQ came from the " +
      "prep-house .xlsx. RSQP gives 'Instead of worrying about what you cannot control, shift your energy to " +
      "what you can create' - S is cut mid-phrase so Q must follow it. PRSQ opens on 'to what you can create' " +
      "and never forms a main clause. The teacher's Evalbee RESULTS key independently gives D. The row's own " +
      "solution derived 'QPRS', which is not even among the options, then picked A.",
  },
  {
    id: "baeb55cb-8156-4021-af1a-fe4297421e07",
    label: "NDA 2022 (I) GAT Q21 (printed Q28)",
    expectKey: "B",
    note:
      "Keyed QPRS; corrected to QSPR. Read off the printed booklet (NDA 2022 (I) GAT, SDFR-F-TAG/44A, Q21): " +
      "parts and options match exactly and no key is printed. QSPR gives 'There are many ways of dealing with " +
      "intransigent customers, but perhaps the best way is to agree with them without excessive argumentation'; " +
      "QPRS leaves 'dealing' with no object and puts 'with them' before its antecedent. The teacher's RESULTS " +
      "key independently gives B, and the row's own solution derived QSPR before reversing itself with 'on " +
      "review ... the standard key is QPRS'. Its source block is keyed A nine times in ten.",
  },
  {
    id: "a0b60ec1-6053-4538-91b1-53777e3aaec2",
    label: "NDA 2022 (I) GAT Q22 (printed Q29)",
    expectKey: "D",
    note:
      "Keyed PRSQ; corrected to QPSR. Read off the printed booklet (NDA 2022 (I) GAT, SDFR-F-TAG/44A, Q22): " +
      "parts and options match exactly and no key is printed. Q is the only part with a finite main clause, so " +
      "it must open; 'in the years following' needs a noun (S), and S's trailing 'via' needs an object (R). " +
      "PRSQ strands the main clause after 'inaugurated via'. The teacher's RESULTS key independently gives D. " +
      "The row's own solution derived QPSR - the correct answer - then wrote 'The answer key indicates PRSQ' " +
      "and keyed B, the clearest statement of this defect class in the chapter.",
  },
];

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const inputs: ReviewInput[] = [];
  for (const t of TARGETS) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, source_file, content_hash, visibility, options(label, is_correct)")
      .eq("id", t.id)
      .single();
    if (error) throw error;

    const keys = (data.options as { label: string; is_correct: boolean }[])
      .filter((o) => o.is_correct)
      .map((o) => o.label);
    if (keys.length !== 1 || keys[0] !== t.expectKey) {
      console.error(
        `REFUSE ${t.label}: live key is [${keys.join(",")}], expected ${t.expectKey} — ` +
          `run scripts/practice-paper/apply-adjudicated-fixes.ts --apply first`,
      );
      process.exit(1);
    }

    console.log(
      `${t.label}  ${data.source_file} Q${data.question_number}  key=${keys[0]}  ` +
        `hash=${String(data.content_hash).slice(0, 12)}  (${data.visibility})  source_key_crosscheck/key_fixed`,
    );
    inputs.push({
      questionId: data.id,
      reviewedContentHash: String(data.content_hash),
      method: "source_key_crosscheck",
      verdict: "key_fixed",
      runLabel: RUN,
      note: t.note.slice(0, 480),
      source: "live",
    });
  }

  console.log(`\nrun: ${RUN}`);
  if (!APPLY) {
    console.log("[dry run] pass --apply to write.");
    return;
  }
  const result = await recordReviews(db, inputs);
  console.log(formatRecordResult(result));
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
