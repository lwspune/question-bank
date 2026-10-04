/**
 * NDA 2022-I Maths Q42 (bd3068d7): key D -> A (2026-10-04, the owner's
 * decision after the crowd-hard key check).
 *
 *   npx tsx scripts/reviews/apply-sets-or-key-fix.ts            # dry run
 *   npx tsx scripts/reviews/apply-sets-or-key-fix.ts --apply
 *
 * WHY. The paper (UPSC scan, Maths_2022_NDA1.pdf p15) prints:
 *   1. x not in (A u B) => x not in A OR x not in B
 *   2. x not in (A n B) => x not in A AND x not in B
 * Statement 1 is TRUE as printed: outside A u B means outside both, so
 * "outside A or outside B" certainly follows. It is weaker than De Morgan's
 * law (which has "and"), but it is an implication, not an equivalence.
 * Statement 2 is false (A = {1}, B = {2}, x = 1). So the answer is (a) 1 only;
 * the stored (d) grades the De Morgan trick the setter probably intended, not
 * the words printed. Solved as printed; the owner agreed. 19 of 47 students
 * picked (a), more than any other option.
 *
 * SAFETY: asserts the live hash and key before writing; the uuid is kept.
 * AFTER --apply:
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2022-apr-maths --apply --allow-lower
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { CROWD_REVIEW_RUNS } from "../../src/lib/celebrate/crowd";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const ID = "bd3068d7-fb0e-4eee-83a3-4e767d2c5416";
const HASH_BEFORE = "69b22e62ab504eeb6020552eebb011e72989d335136f9c7c3475749cce7d1ead";

const SOLUTION = String.raw`Statement 1: \(x \notin (A \cup B)\) means \(x\) is in neither set, so \(x \notin A\) is true. A statement joined by "or" needs only one part to be true, so "\(x \notin A\) or \(x \notin B\)" follows. Statement 1 is correct. (De Morgan's law gives the stronger "\(x \notin A\) and \(x \notin B\)"; the printed "or" is weaker, but it is still implied.)
Statement 2: \(x \notin (A \cap B)\) only means \(x\) is missing from at least one of the sets. Take \(A = \{1\}\), \(B = \{2\}\) and \(x = 1\): \(A \cap B\) is empty, so \(x \notin A \cap B\), but \(x \in A\). Statement 2 is not correct; the right form is "\(x \notin A\) or \(x \notin B\)".
Only statement 1 is correct. Matches option A.`;

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
  if (key.length !== 1 || key[0] !== "D") fail(`key is [${key.join(",")}], reviewed D`);
  const optTexts = opts.map((o) => o.text);
  if (contentHash(row.text, optTexts, "D") !== row.content_hash) fail("hash not reproducible");
  const hashAfter = contentHash(row.text, optTexts, "A");
  const { data: clash } = await db.from("questions").select("id").eq("content_hash", hashAfter);
  if ((clash ?? []).length > 0) fail("new hash collides");

  console.log(`key D -> A · solution rewritten · hash ${HASH_BEFORE.slice(0, 12)} -> ${hashAfter.slice(0, 12)}`);
  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }

  for (const label of ["D", "A"]) {
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
    note: "NDA 2022-I Q42. Owner's decision 2026-10-04: solve as printed. 'x not in A u B => x not in A or x not in B' is true (and implies or); statement 2 false. Key D -> A.",
  });
  if (rErr) throw rErr;
  console.log("written");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
