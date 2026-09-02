/**
 * Restore the data tables of the two NDA Maths rows that were left referencing
 * a frequency distribution the bank does not hold.
 *
 *   npx tsx scripts/reviews/apply-orphaned-context-fix.ts            # dry run
 *   npx tsx scripts/reviews/apply-orphaned-context-fix.ts --apply
 *
 * WHY THESE TWO ROWS EXIST. Both stems say "the above frequency distribution"
 * and both have set_id, context and image_url all NULL, so to every gate they
 * look like clean standalone questions while being unanswerable. The builder's
 * RULE 1 exclusion cannot see them: it tests for a context that IS PRESENT and
 * so drops the sibling that survived (Mock 1 Q114, which kept its Direction
 * table) while admitting the one that broke. The predicate points the wrong way
 * for this failure mode. Measured before generalising: exactly TWO such rows
 * exist in NDA Maths, found by two differently-shaped probes that agree — a
 * first probe matched 145 and was almost entirely false positives, because
 * "which of the above statements" is the standard NDA phrasing for a statement
 * list carried in the stem itself.
 *
 * TWO DIFFERENT CAUSES, one blind spot:
 *   Mock 1 Q113 — DISPLACED IN THE SOURCE. Its table floated out of the left
 *     column and landed mid-way through Q119's option block in the right column
 *     (a Word anchor accident, visible on the rendered page). It is adjacent to
 *     Q113 in no reading order, so the ingest never had it.
 *   Mock 2 Q80  — DROPPED AT INGEST. Its table is printed directly beneath its
 *     own stem and was simply not carried across.
 *
 * THE TRAP THIS SCRIPT EXISTS TO AVOID. Mock 1 page 6 prints TWO frequency
 * tables, and the first plan here was to copy Q114's Direction table onto Q113
 * because it was already in the database. That is WRONG and would have made the
 * row answerable AND wrong, with nothing downstream able to tell:
 *
 *   Q114/115 table  0-10..40-50, f 5/10/20/5/10  -> median class 20-30 = modal
 *                   class 20-30, statement 1 TRUE, keys (a)
 *   the real table  0-5..16-20,  f 3/7/6/5       -> median class 11-15, modal
 *                   class 6-10, statement 1 FALSE, statement 2 FALSE, keys (d)
 *
 * The paper's printed answer key says 113. D. Only the key distinguishes them.
 *
 * WHY A PLAIN UPDATE IS SAFE. contentHash for an MCQ is question + sorted
 * options + answer and does NOT include context (src/lib/upload/hash.ts), so
 * row identity cannot move: no paper placement, mock ref, review row, concept
 * tag or bookmark is orphaned. The script asserts that rather than assuming it,
 * re-reading content_hash after the write. Reversible by setting context back
 * to NULL.
 *
 * NOT FIXED HERE, and stated so nobody reads a green run as broader than it is:
 * Mocks 04/05/09/10 hold ZERO context rows against 2-36 elsewhere and neither
 * probe finds an orphan in them, but a question that lost its table AND never
 * says "above" is undetectable by phrasing — clearing those needs a read.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

type Fix = {
  id: string;
  tag: string;
  /** Substring the stem MUST contain — proves we are on the row we think. */
  expectStem: string;
  /** The correct option's label per the paper's printed answer key. */
  expectKey: string;
  /** Restored table, as a GFM pipe-table (BlockText renders it; a pandoc
   *  "simple table" of dashes parses as nothing — see Q114, which has one). */
  context: string;
  note: string;
};

const FIXES: Fix[] = [
  {
    id: "38a90f9a-4baa-47b4-8aa8-44cdcb79aae8",
    tag: "Mock 1 Q113 — median/modal-class statements",
    expectStem: "above frequency distribution",
    expectKey: "D",
    context: [
      "| Class interval | 0-5 | 6-10 | 11-15 | 16-20 |",
      "|---|---|---|---|---|",
      "| Frequency | 3 | 7 | 6 | 5 |",
    ].join("\n"),
    note:
      "Restored the frequency distribution the stem references. Source-verified against " +
      "'NDA Maths Mock Test Paper 1.pdf' p6: the table is printed in the RIGHT column, floated " +
      "into the middle of Q119's option block, so it is adjacent to Q113 in no reading order and " +
      "the ingest never had it. It is NOT the Q114/115 Direction table, which would make " +
      "statement 1 TRUE and key (a); with the correct table the median class is 11-15 and the " +
      "modal class 6-10, so statement 1 is FALSE and statement 2 FALSE, keying (d) — matching the " +
      "paper's printed key 113. D, which the bank already held. Key unchanged; only the missing " +
      "data was restored.",
  },
  {
    id: "f75633b1-a8b0-4626-8aa6-ed9b52fd85e9",
    tag: "Mock 2 Q80 — missing frequency f",
    expectStem: "missing frequency",
    expectKey: "B",
    context: [
      "| x | 1 | 2 | 3 | 4 |",
      "|---|---|---|---|---|",
      "| Frequency | 2 | 3 | f | 5 |",
    ].join("\n"),
    note:
      "Restored the frequency distribution the stem references. Source-verified against " +
      "'NDA Maths Mock Test Paper 2 Questions.pdf' p6, where the table is printed directly " +
      "beneath the stem and was simply dropped at ingest. Separately, the paper as PRINTED gives " +
      "the mean as 32/8, which forces f = -12 and is impossible; the bank's stored 23/8 gives " +
      "f = 6 = the paper's own printed key 80. B, so the bank is right and the paper carries a " +
      "typo. Key unchanged; only the missing data was restored.",
  },
];

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  let applied = 0;
  let skipped = 0;

  for (const fix of FIXES) {
    console.log(`\n${fix.tag}`);

    const { data: q, error } = await db
      .from("questions")
      .select("id, text, context, content_hash, question_format, image_url, set_id, source_file")
      .eq("id", fix.id)
      .single();
    if (error) throw new Error(`${fix.tag}: ${error.message}`);

    const { data: opts, error: oErr } = await db
      .from("options")
      .select("label, text, is_correct")
      .eq("question_id", fix.id)
      .order("label");
    if (oErr) throw new Error(`${fix.tag}: ${oErr.message}`);

    // --- refuse unless this is provably the row we mean -------------------
    if (!q.text.includes(fix.expectStem)) {
      throw new Error(`${fix.tag}: REFUSED — stem does not contain ${JSON.stringify(fix.expectStem)}`);
    }
    const correct = (opts ?? []).filter((o) => o.is_correct);
    if (correct.length !== 1 || correct[0].label !== fix.expectKey) {
      throw new Error(
        `${fix.tag}: REFUSED — expected exactly one correct option ${fix.expectKey}, found ` +
          `[${correct.map((o) => o.label).join(",")}]`
      );
    }
    if (q.question_format && q.question_format !== "mcq") {
      // contentHash only excludes context for the MCQ hash; subjective/numeric
      // hashes ARE context-aware, so a context edit there moves row identity.
      throw new Error(`${fix.tag}: REFUSED — format is ${q.question_format}, not mcq`);
    }

    // --- idempotence: already applied is a SKIP, anything else a REFUSAL ---
    if (q.context !== null) {
      if (q.context === fix.context) {
        console.log("  SKIP — already applied.");
        skipped += 1;
        continue;
      }
      throw new Error(
        `${fix.tag}: REFUSED — context is already set to something else:\n${q.context}`
      );
    }

    // --- prove the hash cannot move ---------------------------------------
    const before = q.content_hash as string;
    const recomputed = contentHash(
      q.text,
      (opts ?? []).map((o) => o.text),
      fix.expectKey
    );
    if (recomputed !== before) {
      console.log(
        `  note: stored content_hash ${before.slice(0, 12)} != recomputed ${recomputed.slice(0, 12)} ` +
          `(pre-existing drift, not caused here) — the invariant checked below is that the STORED ` +
          `hash is unchanged by this write.`
      );
    }

    console.log(`  source_file : ${q.source_file}`);
    console.log(`  key         : ${fix.expectKey} (matches the paper's printed key)`);
    console.log(`  context     : ${fix.context.split("\n").join(" / ")}`);

    if (!APPLY) {
      console.log("  DRY RUN — would set context.");
      continue;
    }

    const { error: uErr } = await db
      .from("questions")
      .update({ context: fix.context })
      .eq("id", fix.id);
    if (uErr) throw new Error(`${fix.tag}: ${uErr.message}`);

    const { data: after, error: aErr } = await db
      .from("questions")
      .select("context, content_hash")
      .eq("id", fix.id)
      .single();
    if (aErr) throw new Error(`${fix.tag}: ${aErr.message}`);
    if (after.context !== fix.context) throw new Error(`${fix.tag}: write did not stick`);
    if (after.content_hash !== before) {
      throw new Error(
        `${fix.tag}: content_hash MOVED ${before} -> ${after.content_hash} — row identity changed, ` +
          `which this repair must never do`
      );
    }

    console.log("  APPLIED — context set, content_hash unchanged.");
    applied += 1;
  }

  console.log(
    `\n${APPLY ? "applied" : "would apply"} ${APPLY ? applied : FIXES.length - skipped}` +
      `, skipped ${skipped}${APPLY ? "" : "  (re-run with --apply)"}`
  );
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
