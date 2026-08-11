/**
 * One-off repair: `PS2 Q.1 (7)` shipped with "hypotenusee".
 *
 *   npx tsx scripts/mh-ssc-10-text/repair-hypotenusee.ts          # dry run
 *   npx tsx scripts/mh-ssc-10-text/repair-hypotenusee.ts --apply
 *
 * CAUSE. normalise-bands.ts was run twice (once to apply, once to "verify
 * idempotence") and its typo fix used a plain substring match. "hypotenus" is a
 * PREFIX of its own replacement "hypotenuse", so the second run matched inside
 * the text the first run had just written and appended another "e". The book
 * prints "hypotenus"; we shipped "hypotenusee". normalise-bands.ts is now
 * word-boundary anchored and asserts idempotence, so this class cannot recur.
 *
 * WHY THIS UPDATES content_hash TOO. The hash was computed at commit time from
 * the corrupted stem, so text and hash are currently CONSISTENT. Updating the
 * text alone would leave the stored text no longer the hash's preimage — and the
 * next re-ingest from the corrected source would hash differently, miss the
 * dedup on (org_id, exam_id, content_hash), and INSERT A DUPLICATE. So both move
 * together, in one statement.
 *
 * The alternative — delete the row and re-commit — was rejected: it mints a new
 * question id, which would strand the id recorded in
 * data/pythagoras-10.mcq-verify.json (the blind-derivation record for this very
 * question) and in the paper-selection data.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { EXAM_ID, DATA, requireChapter } from "./config";

const REF = "PS2 Q.1 (7)";
const BAD = "hypotenusee";
const GOOD = "hypotenuse";
const FRAGMENT = "pythagoras-10.ps2.json";

async function main() {
  const apply = process.argv.includes("--apply");
  const ch = requireChapter("pythagoras-10");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // ---- 1. the committed source of truth -----------------------------------
  const fragPath = join(DATA, FRAGMENT);
  const frag = JSON.parse(readFileSync(fragPath, "utf8")) as { ref: string; stem: string }[];
  const srcRow = frag.find((r) => r.ref === REF);
  if (!srcRow) throw new Error(`${REF} not found in ${FRAGMENT}`);
  const fixedStem = srcRow.stem.replace(BAD, GOOD);
  if (srcRow.stem === fixedStem && !srcRow.stem.includes(GOOD)) throw new Error(`${REF}: neither "${BAD}" nor "${GOOD}" present — nothing to repair`);

  // ---- 2. the DB row, and the hash that must move with it ------------------
  const { data, error } = await client
    .from("questions")
    .select("id, text, content_hash, options(label, text, is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile)
    .eq("question_number", REF);
  if (error) throw new Error(`read failed: ${error.message}`);
  const rows = (data ?? []) as unknown as {
    id: string; text: string; content_hash: string; options: { label: string; text: string; is_correct: boolean }[];
  }[];
  if (rows.length !== 1) throw new Error(`expected exactly 1 row for ${REF}, got ${rows.length}`);
  const row = rows[0];

  const newText = row.text.replace(BAD, GOOD);
  const answer = row.options.find((o) => o.is_correct)?.label;
  if (!answer) throw new Error(`${REF} has no correct option — refusing (the hash needs it)`);
  const newHash = contentHash(newText, row.options.map((o) => o.text), answer);

  console.log(`ref        : ${REF}`);
  console.log(`stem before: ...${row.text.slice(-46)}`);
  console.log(`stem after : ...${newText.slice(-46)}`);
  console.log(`hash       : ${row.content_hash}  ->  ${newHash}`);
  console.log(`source     : ${srcRow.stem === fixedStem ? "already clean" : "will be rewritten"}`);

  if (newText === row.text) throw new Error(`DB text does not contain "${BAD}" — already repaired?`);
  if (!apply) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }

  srcRow.stem = fixedStem;
  writeFileSync(fragPath, JSON.stringify(frag, null, 2) + "\n", "utf8");

  const { error: upErr, count } = await client
    .from("questions")
    .update({ text: newText, content_hash: newHash }, { count: "exact" })
    .eq("id", row.id);
  if (upErr) throw new Error(`update failed: ${upErr.message}`);
  if (count !== 1) throw new Error(`expected 1 row updated, got ${count}`);
  console.log("\nrepaired: source fragment + DB text + content_hash (kept consistent).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
