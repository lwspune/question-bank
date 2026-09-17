/**
 * Correct the NDA II 2022 "odd integers less than 100" key, and tidy two
 * solutions reviewed alongside it (2026-09-16).
 *
 *   npx tsx scripts/reviews/apply-set-theory-key-fix.ts            # dry run
 *   npx tsx scripts/reviews/apply-set-theory-key-fix.ts --apply
 *
 * WHY. `c46ae671` (NDA II 2022, PUBLIC pyq) keys **C = both correct** on
 *   1. irrationals between sqrt(2) and sqrt(5) form an infinite set
 *   2. the set of all odd integers less than 100 is a finite set
 * Statement 2 is FALSE: the odd integers are unbounded below, so "less than
 * 100" caps the set from above only and it stays infinite. The answer is A.
 *
 * This is a STEALTH wrong key: the stored solution is internally consistent
 * (it asserts "exactly 50 elements", then concludes C), so a read-through can
 * never catch it. Three independent voices say A -- the mathematics, a
 * brute-force check, and UPSC's own repeat of the question in Sep 2024
 * (`9bb05cd7`, the same claim at 1000), which this bank keys A with a solution
 * naming this very misreading as the "common mistake".
 *
 * WHY IT IS IN POLICY TO FLIP IT. UPSC publishes no answer key with an NDA
 * question paper, so the `.xlsx`'s C is a third-party transcription of someone's
 * derivation, not an issued key. There is no printed key being overridden and
 * the preserve-the-paper-defect convention does not apply. Same basis as the
 * 2026-09-07 NDA GAT key corrections.
 *
 * SAFETY. `content_hash` covers (text, options, answer letter) but NOT
 * `context`, so the key flip must recompute the hash while the context tidy-up
 * is free. Every precondition is asserted before any write and the script fails
 * CLOSED: if the live row is not in the exact state this fix was reviewed
 * against, it refuses rather than guessing. The uuid is preserved, so
 * paper_questions / attempt_answers / mock snapshots / tags all survive.
 *
 * AFTER APPLYING, re-grade the mock -- `mock_attempts` freezes its score at
 * submit time, so the key flip alone would leave the review screen and the
 * result screen contradicting each other:
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2022-sep-maths --apply --allow-lower
 * (`--allow-lower` is required: one student answered C and loses 3.33 marks.
 * Another answered A, was penalised for being right, and gains 3.33.)
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

const RUN_LABEL = "set-theory-paper-review-2026-09-16";
const MODEL = "claude-opus-5[1m]";

const Q3 = "c46ae671-09cf-499f-b24b-84bc6de23c0c";
const Q23 = "644258a9-8ae8-4570-82e0-f12350bec2fe";
const Q25 = "5642eb6f-a9d2-4c06-9489-16538a2e2609";

/** The hash of Q3 AS REVIEWED, before the flip. Asserted, never assumed. */
const Q3_HASH_BEFORE =
  "b0e6e1f1cbf829aef66574407072ecbe36b017c53293bf3ddc3fe6ec1eab6890";

const Q3_CONTEXT = [
  "Consider the following statements:",
  "1. The set of all irrational numbers between \\(\\sqrt{2}\\) and \\(\\sqrt{5}\\) is an infinite set.",
  "2. The set of all odd integers less than 100 is a finite set.",
].join("\n");

const Q3_SOLUTION = [
  "Statement 1: between any two distinct real numbers there are infinitely many irrational numbers, so the irrationals lying between \\(\\sqrt{2}\\) and \\(\\sqrt{5}\\) form an infinite set. Statement 1 is correct.",
  "Statement 2: the odd integers run \\(\\ldots, -5, -3, -1, 1, 3, 5, \\ldots\\) and are unbounded below. The condition \"less than 100\" caps the set from above only, leaving \\(\\ldots, -3, -1, 1, 3, \\ldots, 99\\), which is still infinite. Statement 2 is incorrect.",
  "The trap is to read \"less than 100\" as though it bounded the set from below as well, and to count \\(1, 3, 5, \\ldots, 99\\) as 50 elements. That is the set of odd NATURAL numbers less than 100, not the set of odd integers.",
  "Only statement 1 is correct. Matches option A.",
].join("\n");

/**
 * Q25's key (6) is right and its enumeration reaches the right six pairs, but
 * the stored working opens the count with an abandoned false start that lists
 * \((-5,-1)\) -- a pair that does NOT satisfy a > b -- then interrupts itself
 * with "? check each" and redoes it. Conclusion sound, presentation misleading.
 */
const Q25_SOLUTION = [
  "Solve \\(a^2 + 3b^2 = 28\\) over the integers. From \\(3b^2 \\le 28\\) we need \\(|b| \\le 3\\).",
  "\\(b = 0\\): \\(a^2 = 28\\), not a perfect square, so there is no solution.",
  "\\(b = \\pm 1\\): \\(a^2 = 25\\), so \\(a = \\pm 5\\).",
  "\\(b = \\pm 2\\): \\(a^2 = 16\\), so \\(a = \\pm 4\\).",
  "\\(b = \\pm 3\\): \\(a^2 = 1\\), so \\(a = \\pm 1\\).",
  "So \\(A\\) has 12 elements: \\((\\pm 5, \\pm 1), (\\pm 4, \\pm 2), (\\pm 1, \\pm 3)\\).",
  "Now impose \\(a > b\\).",
  "From \\(b = 1\\): only \\((5,1)\\).",
  "From \\(b = -1\\): only \\((5,-1)\\).",
  "From \\(b = 2\\): only \\((4,2)\\).",
  "From \\(b = -2\\): only \\((4,-2)\\).",
  "From \\(b = 3\\): none, since \\(1 < 3\\) and \\(-1 < 3\\).",
  "From \\(b = -3\\): both \\((1,-3)\\) and \\((-1,-3)\\), since \\(1 > -3\\) and \\(-1 > -3\\).",
  "So \\(A \\cap B = \\{(5,1), (5,-1), (4,2), (4,-2), (1,-3), (-1,-3)\\}\\), which has 6 elements.",
  "Matches option D.",
].join("\n");

type Row = {
  id: string;
  text: string;
  context: string | null;
  solution: string | null;
  content_hash: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

const fail = (msg: string): never => {
  console.error("REFUSING: " + msg);
  process.exit(1);
};

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await db
    .from("questions")
    .select("id, text, context, solution, content_hash, options(label, text, is_correct)")
    .in("id", [Q3, Q23, Q25]);
  if (error) throw error;

  const byId = new Map<string, Row>((data as Row[]).map((r) => [r.id, r]));
  for (const id of [Q3, Q23, Q25]) {
    if (!byId.has(id)) fail(`row ${id} not found`);
  }

  // ---- Q3: preconditions -------------------------------------------------
  const q3 = byId.get(Q3)!;
  const opts = [...q3.options].sort((a, b) => a.label.localeCompare(b.label));
  const keyNow = opts.filter((o) => o.is_correct).map((o) => o.label);

  if (q3.content_hash !== Q3_HASH_BEFORE)
    fail(`Q3 content_hash is ${q3.content_hash}, expected ${Q3_HASH_BEFORE}. The row changed since review.`);
  if (keyNow.length !== 1 || keyNow[0] !== "C")
    fail(`Q3 key is [${keyNow.join(",")}], expected exactly C`);
  if (!/odd integers less than 100/.test(q3.context ?? ""))
    fail("Q3 context no longer carries the reviewed statement 2");

  const optTexts = opts.map((o) => o.text);
  const recomputed = contentHash(q3.text, optTexts, "C");
  if (recomputed !== q3.content_hash)
    fail("Q3 content_hash is not reproducible from its live columns; recompute path unsafe");

  const hashAfter = contentHash(q3.text, optTexts, "A");
  const { data: clash, error: clashErr } = await db
    .from("questions")
    .select("id")
    .eq("content_hash", hashAfter);
  if (clashErr) throw clashErr;
  if ((clash ?? []).length > 0)
    fail(`flipped hash collides with ${(clash ?? []).map((c: any) => c.id).join(", ")}`);

  // ---- Q25: precondition (key must already be D; we only touch prose) -----
  const q25 = byId.get(Q25)!;
  const k25 = q25.options.filter((o) => o.is_correct).map((o) => o.label);
  if (k25.length !== 1 || k25[0] !== "D") fail(`Q25 key is [${k25.join(",")}], expected D`);
  const hash25Before = q25.content_hash;

  // ---- Q23: reviewed, no change ------------------------------------------
  const q23 = byId.get(Q23)!;
  const k23 = q23.options.filter((o) => o.is_correct).map((o) => o.label);
  if (k23.length !== 1 || k23[0] !== "A") fail(`Q23 key is [${k23.join(",")}], expected A`);

  console.log("preconditions OK\n");
  console.log("Q3  key      C -> A");
  console.log("Q3  hash     " + q3.content_hash.slice(0, 16) + " -> " + hashAfter.slice(0, 16));
  console.log("Q3  context  CRLF + unicode sqrt -> LF + inline math");
  console.log("Q3  solution rewritten (was: asserts 50 elements, concludes C)");
  console.log("Q25 solution rewritten (drops the abandoned false start); key D unchanged");
  console.log("Q23 confirmed correct; no change\n");

  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }

  // ---- writes ------------------------------------------------------------
  // Options first: if the run dies between the two statements, the row is
  // briefly key-A-with-the-old-hash. That is a stale dedup fingerprint (a
  // re-upload could duplicate it) but it is never a WRONG key shown to a
  // student, which is the failure that matters here.
  for (const label of ["A", "C"]) {
    const { error: e } = await db
      .from("options")
      .update({ is_correct: label === "A" })
      .eq("question_id", Q3)
      .eq("label", label);
    if (e) throw e;
  }

  const { error: e1 } = await db
    .from("questions")
    .update({ content_hash: hashAfter, context: Q3_CONTEXT, solution: Q3_SOLUTION })
    .eq("id", Q3);
  if (e1) throw e1;

  const { error: e2 } = await db
    .from("questions")
    .update({ solution: Q25_SOLUTION })
    .eq("id", Q25);
  if (e2) throw e2;

  // ---- review provenance -------------------------------------------------
  // `reviewed_content_hash` fingerprints the question AS IT NOW STANDS, so a
  // later stem repair makes these verdicts queryably stale. Recording the
  // pre-fix hash instead would make the Q3 row born stale and useless.
  const reviews = [
    {
      question_id: Q3,
      reviewed_content_hash: hashAfter,
      method: "blind_rederivation",
      verdict: "key_fixed",
      run_label: RUN_LABEL,
      derived_model: MODEL,
      note:
        "Key C -> A. Statement 2 ('all odd integers less than 100 is a finite set') is FALSE: the odd " +
        "integers are unbounded below, so the bound caps the set from above only. Stealth wrong key -- the " +
        "old solution asserted 'exactly 50 elements' and concluded C, internally consistent and simply " +
        "wrong. Corroborated by UPSC's own repeat at 1000 (9bb05cd7), which this bank keys A. UPSC " +
        "publishes no key with an NDA paper, so the .xlsx C was a third-party derivation, not an issued " +
        "key. Pre-fix content_hash " + Q3_HASH_BEFORE + ". Solution rewritten and context normalised " +
        "(CRLF -> LF, unicode sqrt -> inline math) in the same pass. NOT verified against the printed 2022 " +
        "booklet, which is not available here: if the paper actually read 'positive odd integers' the stem " +
        "is wrong rather than the key.",
    },
    {
      question_id: Q23,
      reviewed_content_hash: q23.content_hash,
      method: "blind_rederivation",
      verdict: "confirmed",
      run_label: RUN_LABEL,
      derived_model: MODEL,
      note:
        "Key A confirmed. 4^n - 3n - 1 = sum_{k>=2} C(n,k) 3^k is divisible by 9 and non-negative, so " +
        "X is a subset of Y = {0,9,18,...}. Brute force: X = {0,9,54,243,1008,...}; Y is not a subset of X " +
        "(18 is the smallest counterexample), so the inclusion is proper and the subset option is right. " +
        "No change made.",
    },
    {
      question_id: Q25,
      reviewed_content_hash: hash25Before,
      method: "blind_rederivation",
      verdict: "solution_rewritten",
      run_label: RUN_LABEL,
      derived_model: MODEL,
      note:
        "Key D (6) independently CONFIRMED by brute force over a,b in [-30,30]: |A| = 12 and " +
        "A intersect B = {(5,1),(5,-1),(4,2),(4,-2),(1,-3),(-1,-3)}. Only the prose changed: the stored " +
        "working opened its count with an abandoned false start listing (-5,-1), which does not satisfy " +
        "a > b, then interrupted itself with '? check each' and re-enumerated correctly. Conclusion was " +
        "always right; a student would have read the false start as an error. content_hash untouched " +
        "(solution is not part of it).",
    },
  ];

  const { error: e3 } = await db.from("question_reviews").insert(reviews);
  if (e3) throw e3;

  console.log("APPLIED: 2 option rows, 2 question rows, 3 question_reviews rows.");
  console.log("\nNEXT: npx tsx scripts/reviews/regrade-attempt.ts nda-2022-sep-maths --apply --allow-lower");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
