/**
 * Rebuild the four NDA Maths stems whose printed DATA TABLE arrived as prose.
 *
 *   npx tsx scripts/bank-paper/repair-flattened-tables.ts            # dry run
 *   npx tsx scripts/bank-paper/repair-flattened-tables.ts --apply
 *
 * ALL FOUR SOURCE-VERIFIED against the scanned papers (2026-09-02). Every one is
 * printed as a real bordered table and stored as a run of comma-separated
 * numbers. The question stays answerable, which is why no gate ever caught it:
 * `audit:text` checks other classes, P2 fires only on match-lists, and there is
 * nothing malformed to find. Two of the four stems ANNOUNCE the missing
 * structure in their own words ("The following table gives...").
 *
 * THE PAPERS ARE CONSISTENT ABOUT WHICH SHAPE IS WHICH, which is what makes the
 * probe possible and what stops it over-firing: a RAW DATA LIST is printed as
 * prose and our prose storage of it is faithful (verified on 2023-I Q110/Q112
 * and 2021-I Q107, all left alone), while an x/f frequency distribution is
 * printed as a table. Hence the probe requires TWO parallel runs of numbers.
 *
 * ALL FOUR CAME IN THROUGH `.xlsx`. That is the defect the standing "for PYQs
 * refer to the actual PDFs, not the Excel" rule exists to catch.
 *
 * WHY IN-PLACE WITH A RE-STAMP, unlike the whitespace repair beside it. Adding
 * pipe characters is a MATERIAL text change, so `contentHash` genuinely moves
 * (the whitespace repair's does not — `norm()` collapses a newline to a space).
 * A delete-and-re-commit would mint fresh uuids, and ALL FOUR of these rows sit
 * in a published mock — a dangling mock ref renders a BLANK question with no
 * error and marks every attempt wrong. So the stem is updated in place and the
 * hash re-stamped, the same move `repair-paper-text.ts` makes for its P2
 * match-lists and `scripts/cds/fix-keys.ts` makes for a key flip.
 *
 * THE COST OF RE-STAMPING, stated rather than buried: the source `.xlsx` still
 * holds the flat text, so a future re-upload of it will no longer dedup against
 * these rows and would insert a duplicate. That is inherited from the precedent
 * above and is the accepted trade — the alternative leaves a row whose stored
 * text is not the preimage of its own hash, which silently breaks the
 * `question_reviews.reviewed_content_hash` staleness contract.
 *
 * GFM HAS NO COLSPAN. The 2017-II table prints a spanning "Expenditure (in Rs)"
 * header above Family A / Family B. Flattening had dropped that header and the
 * currency entirely; it is folded into both column headings rather than lost
 * again, which is the closest faithful rendering the format allows.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "flattened-table:2026-09-02-nda-maths";

const RUPEE = String.fromCharCode(0x20b9);

type Fix = { id: string; tag: string; expect: string; text: string; note: string };

const FIXES: Fix[] = [
  {
    id: "548cc682-896b-4239-aad3-abf168453c38",
    tag: "NDA 2019-II Q110 — median of a discrete distribution",
    expect: "3, 15, 45, 57, 50, 36, 25, 9",
    text: [
      "Consider the following discrete frequency distribution :",
      "",
      "| \\(x\\) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |",
      "|---|---|---|---|---|---|---|---|---|",
      "| \\(f\\) | 3 | 15 | 45 | 57 | 50 | 36 | 25 | 9 |",
      "",
      "What is the value of median of the distribution ?",
    ].join("\n"),
    note:
      "Printed as a bordered table on p39 of Maths_2019_NDA2.pdf (0-based page 18, right column); " +
      "stored as prose by the .xlsx ingest. Rebuilt as a GFM pipe-table. No value, option or key " +
      "changed. This row is Blueprint Mock 5's Q50, so the repair is in-place with a hash re-stamp, " +
      "never a delete-and-re-commit.",
  },
  {
    id: "b76c9357-8996-452e-8c32-7ed039ec57f5",
    tag: "NDA 2023-I Q111 — median of a frequency distribution",
    expect: "4, 6, 9, 7",
    text: [
      "Consider the following frequency distribution:",
      "",
      "| \\(x\\) | 1 | 2 | 3 | 5 |",
      "|---|---|---|---|---|",
      "| \\(f\\) | 4 | 6 | 9 | 7 |",
      "",
      "What is the value of median of the distribution?",
    ].join("\n"),
    note:
      "Printed as a bordered table on p39 of Maths_2023_NDA1.pdf (0-based page 19, left column); " +
      "stored as prose by the .xlsx ingest. Rebuilt as a GFM pipe-table. Note the SAME PAGE prints " +
      "Q110's and Q112's raw data lists as prose, and those are correctly left as prose here — the " +
      "paper distinguishes a data list from a frequency distribution. No value, option or key changed.",
  },
  {
    id: "5d585188-bab2-476a-9078-e54725e8cdd5",
    tag: "NDA 2021-I Q105 — peas per pod",
    expect: "4,33,76,50,26,8,1",
    text: [
      "The following table gives the frequency distribution of number of peas per pea pod of 198 pods:",
      "",
      "| Number of peas | 1 | 2 | 3 | 4 | 5 | 6 | 7 |",
      "|---|---|---|---|---|---|---|---|",
      "| Frequency | 4 | 33 | 76 | 50 | 26 | 8 | 1 |",
      "",
      "What is the median of this distribution?",
    ].join("\n"),
    note:
      "Printed as a bordered table on p39 of Maths_2021_NDA1.pdf (0-based page 19, left column); " +
      "stored as prose by the .xlsx ingest, even though the stem itself says 'The following table " +
      "gives'. Rebuilt as a GFM pipe-table. Q107 on the same page prints a raw variate list as prose " +
      "and is correctly left alone. No value, option or key changed.",
  },
  {
    id: "67d87dff-de71-4e09-817d-4dbdb1c2d6ad",
    tag: "NDA 2017-II Q114 — pie-diagram radii, two families",
    expect: "2700, 800, 1000, 1800, 1800",
    text: [
      "The following table gives the monthly expenditure of two families:",
      "",
      `| Items | Family A (in ${RUPEE}) | Family B (in ${RUPEE}) |`,
      "|---|---|---|",
      "| Food | 3,500 | 2,700 |",
      "| Clothing | 500 | 800 |",
      "| Rent | 1,500 | 1,000 |",
      "| Education | 2,000 | 1,800 |",
      "| Miscellaneous | 2,500 | 1,800 |",
      "",
      "In constructing a pie diagram to the above data, the radii of the circles are to be chosen by which one of the following ratios?",
    ].join("\n"),
    note:
      "The worst of the four. Printed on p41 of Maths_2017_NDA2.pdf (0-based page 20, right column) " +
      "as a THREE-column table with a spanning 'Expenditure (in Rs)' header; flattening lost the " +
      "header AND the currency and left three parallel lists for the reader to re-pair by eye. " +
      "Rebuilt as a GFM pipe-table; GFM has no colspan, so the currency is folded into both column " +
      "headings rather than dropped again. Values restored to the printed comma form. No value, " +
      "option or key changed.",
  },
];

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const reviews: ReviewInput[] = [];
  let applied = 0;
  let skipped = 0;

  for (const fix of FIXES) {
    console.log(`\n${fix.tag}`);
    const { data: q, error } = await db
      .from("questions")
      .select("id, text, content_hash, org_id, exam_id, question_format")
      .eq("id", fix.id)
      .single();
    if (error) throw new Error(`${fix.tag}: ${error.message}`);

    if (q.text === fix.text) {
      console.log("  SKIP — already applied.");
      skipped += 1;
      reviews.push({
        questionId: fix.id, reviewedContentHash: q.content_hash as string,
        method: "structural_probe", verdict: "stem_fixed", runLabel: RUN,
        source: "live", note: fix.note,
      });
      continue;
    }
    if (!q.text.includes(fix.expect)) {
      throw new Error(`${fix.tag}: REFUSED — stem does not contain the expected data run ${JSON.stringify(fix.expect)}`);
    }

    const { data: opts, error: oErr } = await db
      .from("options").select("label, text, is_correct").eq("question_id", fix.id).order("label");
    if (oErr) throw new Error(oErr.message);
    const rows = (opts ?? []) as { label: string; text: string; is_correct: boolean }[];
    const correct = rows.filter((o) => o.is_correct);
    if (correct.length !== 1) throw new Error(`${fix.tag}: REFUSED — ${correct.length} correct options`);
    const label = correct[0]!.label;

    // GUARD 1 — the row's CURRENT hash must recompute from its own stored
    // fields, so we never re-stamp a row whose identity is already inconsistent.
    const recomputed = contentHash(q.text, rows.map((o) => o.text), label);
    if (recomputed !== q.content_hash) {
      throw new Error(
        `${fix.tag}: REFUSED — stored hash ${String(q.content_hash).slice(0, 12)} does not recompute ` +
          `(${recomputed.slice(0, 12)}); fix that inconsistency before re-stamping`
      );
    }

    // GUARD 2 — the NEW hash must not collide inside the same (org, exam),
    // which is a real unique index and would fail the write.
    const nextHash = contentHash(fix.text, rows.map((o) => o.text), label);
    const { data: clash, error: cErr } = await db
      .from("questions").select("id")
      .eq("org_id", q.org_id).eq("exam_id", q.exam_id).eq("content_hash", nextHash).neq("id", fix.id);
    if (cErr) throw new Error(cErr.message);
    if ((clash ?? []).length > 0) throw new Error(`${fix.tag}: REFUSED — new hash collides with ${(clash as any[])[0].id}`);

    // GUARD 3 — the rebuilt stem must actually parse as a table.
    const tables = parseTableBlocks(fix.text).filter((b) => b.kind === "table");
    if (tables.length !== 1) throw new Error(`${fix.tag}: REFUSED — rebuilt stem yields ${tables.length} tables, expected 1`);
    const t = tables[0] as any;
    const widths = new Set<number>([t.headers.length, ...t.rows.map((r: any[]) => r.length)]);
    if (widths.size !== 1) throw new Error(`${fix.tag}: REFUSED — table is not rectangular`);
    console.log(`  table: ${t.headers.length} cols x ${t.rows.length + 1} rows | hash ${String(q.content_hash).slice(0, 8)} -> ${nextHash.slice(0, 8)}`);

    if (!APPLY) { console.log("  DRY RUN — would rewrite the stem."); continue; }

    const { error: uErr } = await db
      .from("questions").update({ text: fix.text, content_hash: nextHash }).eq("id", fix.id);
    if (uErr) throw new Error(`${fix.tag}: ${uErr.message}`);

    const { data: after, error: aErr } = await db
      .from("questions").select("text, content_hash").eq("id", fix.id).single();
    if (aErr) throw new Error(aErr.message);
    if (after.text !== fix.text || after.content_hash !== nextHash) throw new Error(`${fix.tag}: write did not stick`);

    console.log("  APPLIED — stem rebuilt, hash re-stamped.");
    applied += 1;
    reviews.push({
      questionId: fix.id, reviewedContentHash: nextHash,
      method: "structural_probe", verdict: "stem_fixed", runLabel: RUN,
      source: "live", note: fix.note,
    });
  }

  if (!APPLY) { console.log(`\nDRY RUN — ${FIXES.length - skipped} to rewrite. Re-run with --apply`); return; }
  if (reviews.length) console.log("\n" + formatRecordResult(await recordReviews(db, reviews), RUN));
  console.log(`applied ${applied}, skipped ${skipped}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
