/**
 * NDA 2023-II Maths Q24 (7847127c): key D -> B (2026-10-04, the owner's
 * decision after the crowd-hard key check).
 *
 *   npx tsx scripts/reviews/apply-union-identity-key-fix.ts            # dry run
 *   npx tsx scripts/reviews/apply-union-identity-key-fix.ts --apply
 *
 * WHY. The paper (UPSC scan, Maths_2023_NDA2.pdf p9) prints:
 *   (1) A = (A u B) u (A - B)   (2) A u (B - A) = A u B   (3) B = (A u B) - (A - B)
 * (1) is FALSE as printed: the right side is A u B, which equals A only when B
 * is inside A (A = {1}, B = {2} gives {1, 2}). (2) and (3) are true, so the
 * answer is (b) 2 and 3 only. The stored (d) — the LWS Gyanam key's answer too
 * — grades the identity the setter evidently meant, A = (A n B) u (A - B).
 * The scan crop confirms the union is printed. Solved as printed; the owner
 * agreed. 29 of 59 students picked (b), more than any other option. The old
 * solution called (1) false and still concluded (d).
 *
 * SAFETY: asserts the live hash and key before writing; the uuid is kept.
 * AFTER --apply:
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2023-sep-maths --apply --allow-lower
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { CROWD_REVIEW_RUNS } from "../../src/lib/celebrate/crowd";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const ID = "7847127c-3651-487c-bb83-d72e74769154";
const HASH_BEFORE = "6442e503d1f1eb10e343958ae519cee7dfd5b337c808b09aa0df78cb2b28b995";

const SOLUTION = String.raw`(1): \(A - B\) is already inside \(A\), so \((A \cup B) \cup (A - B) = A \cup B\). That equals \(A\) only when \(B \subseteq A\). With \(A = \{1\}\) and \(B = \{2\}\) the right side is \(\{1, 2\} \ne A\). Statement (1) is not correct as printed.
(2): \(B - A\) adds exactly the part of \(B\) that \(A\) is missing, so \(A \cup (B - A) = A \cup B\). Correct.
(3): \(A - B\) is the part of \(A\) outside \(B\); removing it from \(A \cup B\) leaves exactly \(B\). Correct.
So (2) and (3) are correct. Matches option B.
(The standard identity is \(A = (A \cap B) \cup (A - B)\); had (1) been printed with \(\cap\), all three would hold and the answer would be D. The paper prints \(\cup\).)`;

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
  const hashAfter = contentHash(row.text, optTexts, "B");
  const { data: clash } = await db.from("questions").select("id").eq("content_hash", hashAfter);
  if ((clash ?? []).length > 0) fail("new hash collides");

  console.log(`key D -> B · solution rewritten · hash ${HASH_BEFORE.slice(0, 12)} -> ${hashAfter.slice(0, 12)}`);
  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }

  for (const label of ["D", "B"]) {
    const { error: e } = await db.from("options").update({ is_correct: label === "B" }).eq("question_id", ID).eq("label", label);
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
    note: "NDA 2023-II Q24. Owner's decision 2026-10-04: solve as printed. The scan prints A = (A u B) u (A - B), which is false; (2) and (3) true. Key D -> B.",
  });
  if (rErr) throw rErr;
  console.log("written");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
