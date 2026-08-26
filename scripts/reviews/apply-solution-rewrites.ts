/**
 * Rewrite solutions that ASSERT a result instead of DERIVING it.
 *
 *   npx tsx scripts/reviews/apply-solution-rewrites.ts <run>          # dry run
 *   npx tsx scripts/reviews/apply-solution-rewrites.ts <run> --apply
 *
 * Reads scripts/reviews/data/solution-rewrites/<run>.json:
 *   [{ "questionId": "...", "qnum": "1082", "why": "...", "solution": "..." }]
 *
 * WHAT THIS CLASS IS. A solution can be mathematically CORRECT and still be
 * useless to a student: it names a method and then asserts the method's result.
 * The blind re-derivation gate cannot see it — the key is right, so the row
 * AGREEs. Correctness and explicability are separate properties and need
 * separate gates. Diagnostic markers, all of which carry a conclusion in a
 * narrative verb with no executed step:
 *   "shows that ... equals"      "evaluating gives"
 *   "(verified numerically)"     "achieved e.g. by an appropriate ..."
 *   "the printed solution"       "it can be shown"    "standard result"
 *
 * THE INVARIANT, asserted not assumed: `contentHash` covers (text, options,
 * answer) and NOT `solution`, so a solution-only rewrite MUST leave the hash
 * byte-identical. If it moves, the edit touched the question itself — refuse,
 * because that would also strand every question_reviews row on that question.
 *
 * GUARDS: refuses a rewrite identical to what is stored (a no-op, usually a
 * mangled string); refuses one that still carries a marker phrase (rewriting
 * hand-waving into different hand-waving); refuses control characters and
 * double-escaped LaTeX, which is what a shell-mangled payload looks like.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = process.argv[2];

type Rewrite = { questionId: string; qnum?: string; why: string; solution: string };

/** Phrases that mean "I am not going to show you this step". */
const MARKERS =
  /(verified numerically|\(verified|it can be shown|can be shown|standard result|well[- ]known result|evaluating gives|simplifying gives|works out to|the printed solution|following the book|as printed|by an appropriate|suitable choice)/i;

async function main() {
  if (!RUN || RUN.startsWith("--")) {
    console.error("usage: apply-solution-rewrites.ts <run> [--apply]");
    process.exit(2);
  }
  const path = join(process.cwd(), "scripts", "reviews", "data", "solution-rewrites", `${RUN}.json`);
  const rewrites: Rewrite[] = JSON.parse(readFileSync(path, "utf8"));

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  let refused = 0;
  const plan: { r: Rewrite; before: string }[] = [];

  for (const r of rewrites) {
    const { data, error } = await db
      .from("questions")
      .select("id,question_number,text,solution,content_hash,options(label,text,is_correct)")
      .eq("id", r.questionId)
      .single();
    if (error || !data) {
      console.error(`REFUSE ${r.qnum ?? r.questionId}: not found`);
      refused++;
      continue;
    }
    const q = data as any;
    const before: string = q.solution ?? "";

    if (r.solution === before) {
      console.error(`REFUSE Q${q.question_number}: rewrite identical to stored (no-op / mangled?)`);
      refused++;
      continue;
    }
    // eslint-disable-next-line no-control-regex
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(r.solution)) {
      console.error(`REFUSE Q${q.question_number}: control character in rewrite (shell-mangled?)`);
      refused++;
      continue;
    }
    if (r.solution.includes("\\\\(") || r.solution.includes("\\\\)")) {
      console.error(`REFUSE Q${q.question_number}: double-escaped math delimiters`);
      refused++;
      continue;
    }
    const m = r.solution.match(MARKERS);
    if (m) {
      console.error(`REFUSE Q${q.question_number}: rewrite still carries a hand-wave marker: "${m[0]}"`);
      refused++;
      continue;
    }
    // Hash neutrality: solution is not part of the preimage.
    const key = (q.options as any[]).find((o) => o.is_correct)?.label ?? "";
    const h = contentHash(q.text, (q.options as any[]).map((o) => o.text), key);
    if (h !== q.content_hash) {
      console.error(
        `REFUSE Q${q.question_number}: content_hash mismatch before edit (${q.content_hash.slice(
          0,
          10
        )} vs recomputed ${h.slice(0, 10)}) — investigate before rewriting`
      );
      refused++;
      continue;
    }
    plan.push({ r, before });
    console.log(`\nQ${q.question_number}  ${r.why}`);
    console.log(`  before (${before.length}): ${before.slice(0, 150)}`);
    console.log(`  after  (${r.solution.length}): ${r.solution.slice(0, 150)}`);
  }

  if (refused) {
    console.error(`\n${refused} refused — nothing written.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN — ${plan.length} solution(s) would be rewritten. Re-run with --apply.`);
    return;
  }
  for (const p of plan) {
    const up = await db.from("questions").update({ solution: p.r.solution }).eq("id", p.r.questionId);
    if (up.error) throw up.error;
    console.log(`applied Q${p.r.qnum ?? p.r.questionId}`);
  }
  console.log(`\n${plan.length} solution(s) rewritten.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
