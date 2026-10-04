/**
 * NDA 2026-I GAT, "We must wait ___" (eddb22e6): key B -> A (2026-10-04, the
 * owner's decision after the crowd-hard key check).
 *
 *   npx tsx scripts/reviews/apply-wait-until-key-fix.ts            # dry run
 *   npx tsx scripts/reviews/apply-wait-until-key-fix.ts --apply
 *
 * WHY. A "until you see the light turn green" and B "till you see the green
 * light" are both grammatical; C (because) and D (unless ... red) are not.
 * A is the more precise: the wait ends when the light CHANGES, while B can be
 * read as noticing a light already green. The stored B came from the coaching
 * answer sheet (GAT_NDA1_2026_QuestionBank.xlsx), not an official UPSC key,
 * and its solution asserted B without saying why A fails. 22 of 30 tracker
 * students and 39 of 58 mock answers picked A. The owner chose A, and chose to
 * regrade everyone, knowing the 13 mock students who picked B lose marks.
 *
 * SAFETY: asserts the live hash and key before writing; the uuid is kept.
 * AFTER --apply:
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2026-apr-gat --apply --allow-lower
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { CROWD_REVIEW_RUNS } from "../../src/lib/celebrate/crowd";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const ID = "eddb22e6-b46c-4d51-af19-1a674d69c297";
const HASH_BEFORE = "4f1ea5e6a29deddfe09b86bb49a5a90b3c7915f25df36f67f0d0711525275428";

const SOLUTION = `"We must wait until you see the light turn green" says exactly when the waiting ends: when the light changes. "See + object + bare verb" (see the light turn) is correct English.
"Till you see the green light" (B) is also grammatical, since till and until mean the same; it is the less precise choice, because it can be read as noticing a light that is already green.
"Because you can see the green light" (C) gives the wrong logic: nobody waits because the light is green. "Unless you see the red signal" (D) reverses the logic.
Matches option A.`;

const fail = (msg: string): never => {
  console.error("REFUSING: " + msg);
  process.exit(1);
};

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("id, text, content_hash, options(label, text, is_correct)")
    .eq("id", ID)
    .single();
  if (error) throw error;
  const row = data as { text: string; content_hash: string; options: { label: string; text: string; is_correct: boolean }[] };

  if (row.content_hash !== HASH_BEFORE) fail(`hash is ${row.content_hash}; the row changed since review`);
  const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
  const key = opts.filter((o) => o.is_correct).map((o) => o.label);
  if (key.length !== 1 || key[0] !== "B") fail(`key is [${key.join(",")}], reviewed B`);
  const optTexts = opts.map((o) => o.text);
  if (contentHash(row.text, optTexts, "B") !== row.content_hash) fail("hash not reproducible");
  const hashAfter = contentHash(row.text, optTexts, "A");
  const { data: clash } = await db.from("questions").select("id").eq("content_hash", hashAfter);
  if ((clash ?? []).length > 0) fail("new hash collides");

  console.log(`key B -> A · solution rewritten · hash ${HASH_BEFORE.slice(0, 12)} -> ${hashAfter.slice(0, 12)}`);
  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }

  for (const label of ["B", "A"]) {
    const { error: e } = await db.from("options").update({ is_correct: label === "A" }).eq("question_id", ID).eq("label", label);
    if (e) throw e;
  }
  const { error: qErr } = await db.from("questions").update({ solution: SOLUTION, content_hash: hashAfter }).eq("id", ID);
  if (qErr) throw qErr;

  const { error: rErr } = await db.from("question_reviews").insert({
    question_id: ID,
    reviewed_content_hash: hashAfter,
    method: "structural_probe",
    verdict: "key_fixed",
    run_label: CROWD_REVIEW_RUNS[0],
    derived_model: "claude-opus-5-5",
    source: "live",
    note: "NDA 2026-I GAT. A and B are both grammatical; A is the more precise (the wait ends when the light changes). Coaching key B -> A on the owner's decision 2026-10-04; nda-2026-apr-gat regraded for everyone (owner accepted 13 losses).",
  });
  if (rErr) throw rErr;
  console.log("written");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
