/**
 * NDA 2019-II Maths Q42 (167fd0a7): key C -> A, and "1·5" shown as 1.5
 * (2026-10-04, the owner's decision after the crowd-hard key check).
 *
 *   npx tsx scripts/reviews/apply-tan-cot-key-fix.ts            # dry run
 *   npx tsx scripts/reviews/apply-tan-cot-key-fix.ts --apply
 *
 * WHY. The paper (UPSC scan, Maths_2019_NDA2.pdf p13) prints, with no range
 * for theta:
 *   1. cos theta + sec theta can never be equal to 1·5.
 *   2. tan theta + cot theta can never be less than 2.
 * Statement 1 is true (|c + 1/c| >= 2). Statement 2 is FALSE as printed:
 * tan + cot = 2/sin 2theta is negative for obtuse theta (theta = 135 deg gives
 * -2). So the answer is (a) 1 only; the stored (c) assumes theta acute, as the
 * coaching keys do. Solved as printed, the project's rule; the owner agreed.
 *
 * THE STEM. UPSC writes the decimal 1.5 as "1·5". The bank stored it as
 * \(1\cdot5\), which renders as 1 x 5 = 5 — and cos + sec CAN equal 5, so a
 * student reading the card could reject statement 1 for the wrong reason.
 *
 * SAFETY: asserts the live hash, key and stem substring before writing; the
 * uuid is kept. AFTER --apply:
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2019-sep-maths --apply --allow-lower
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { CROWD_REVIEW_RUNS } from "../../src/lib/celebrate/crowd";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const ID = "167fd0a7-6dc0-4495-ad7e-30c437e26e90";
const HASH_BEFORE = "65516ec4fa5f62538416372f70d1679ef654d0cb9a017b64dcc5776f8bd01d8d";
const STEM_FROM = String.raw`can never be equal to \(1\cdot5\).`;
const STEM_TO = "can never be equal to 1.5.";

const SOLUTION = String.raw`Statement 1: write \(c = \cos\theta\), so the expression is \(c + \frac{1}{c}\). For \(c > 0\) it is at least 2 and for \(c < 0\) it is at most \(-2\), so it can never equal 1.5. Statement 1 is correct.
Statement 2: \(\tan\theta + \cot\theta = \frac{\sin^2\theta + \cos^2\theta}{\sin\theta\cos\theta} = \frac{2}{\sin 2\theta}\). The question gives no range for \(\theta\), and for an obtuse angle this is negative: at \(\theta = 135^\circ\), \(\tan\theta + \cot\theta = -1 + (-1) = -2\), which is less than 2. Statement 2 is not correct as printed.
Only statement 1 is correct. Matches option A.
(If \(\theta\) were restricted to acute angles, AM-GM would give \(\tan\theta + \cot\theta \ge 2\) and the answer would be C; the paper sets no such restriction.)`;

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
  if (key.length !== 1 || key[0] !== "C") fail(`key is [${key.join(",")}], reviewed C`);
  if (row.text.split(STEM_FROM).length !== 2) fail("stem substring not found exactly once");
  const optTexts = opts.map((o) => o.text);
  if (contentHash(row.text, optTexts, "C") !== row.content_hash) fail("hash not reproducible");

  const text = row.text.replace(STEM_FROM, STEM_TO);
  const hashAfter = contentHash(text, optTexts, "A");
  const { data: clash } = await db.from("questions").select("id").eq("content_hash", hashAfter);
  if ((clash ?? []).length > 0) fail("new hash collides");

  console.log(`key C -> A · stem 1\\cdot5 -> 1.5 · solution rewritten · hash ${HASH_BEFORE.slice(0, 12)} -> ${hashAfter.slice(0, 12)}`);
  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }

  for (const label of ["C", "A"]) {
    const { error: e } = await db.from("options").update({ is_correct: label === "A" }).eq("question_id", ID).eq("label", label);
    if (e) throw e;
  }
  const { error: qErr } = await db.from("questions").update({ text, solution: SOLUTION, content_hash: hashAfter }).eq("id", ID);
  if (qErr) throw qErr;

  const { error: rErr } = await db.from("question_reviews").insert({
    question_id: ID,
    reviewed_content_hash: hashAfter,
    method: "structural_probe",
    verdict: "key_fixed",
    run_label: CROWD_REVIEW_RUNS[0],
    derived_model: "claude-opus-5-5",
    source: "live",
    note: "NDA 2019-II Q42. Owner's decision 2026-10-04: solve as printed. No range for theta, so 'tan + cot can never be less than 2' is false (theta = 135 deg gives -2); key C -> A. Stem '1\\cdot5' (rendered 1 x 5) -> '1.5', the decimal UPSC prints as 1·5.",
  });
  if (rErr) throw rErr;
  console.log("written");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
