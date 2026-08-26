/**
 * Record a `solution_rewritten` verdict for every row of a rewrite run.
 *
 *   npx tsx scripts/reviews/record-solution-rewrites.ts <run>          # dry run
 *   npx tsx scripts/reviews/record-solution-rewrites.ts <run> --apply
 *
 * WHY: question_reviews (migration 0074) exists so that "nobody checked this"
 * and "somebody checked this and it was fine" stop looking alike. A bulk
 * solution rewrite IS a review — every row was re-derived to the keyed answer
 * before its solution was replaced — so leaving it unrecorded would make 62
 * examined rows indistinguishable from 62 untouched ones.
 *
 * The verdict is `solution_rewritten`, not `confirmed`: the answer was already
 * known correct going in, and what changed is the explanation. The method is
 * `solution_audit` rather than `blind_rederivation` — the rewriters SAW the key,
 * so this is the weaker claim, and a future blind pass will still show these
 * rows rather than skipping them. That is the conservative direction.
 *
 * Run AFTER apply-solution-rewrites.ts: reviewed_content_hash must be the hash
 * the row carries once the edit has landed.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = process.argv[2];

async function main() {
  if (!RUN || RUN.startsWith("--")) {
    console.error("usage: record-solution-rewrites.ts <run> [--apply]");
    process.exit(2);
  }
  const path = join(process.cwd(), "scripts", "reviews", "data", "solution-rewrites", `${RUN}.json`);
  const rows: { questionId: string; qnum?: string; why: string; solution: string }[] = JSON.parse(
    readFileSync(path, "utf8")
  );

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const inputs: ReviewInput[] = [];
  let stale = 0;
  for (let i = 0; i < rows.length; i += 100) {
    const chunk = rows.slice(i, i + 100);
    const { data, error } = await db
      .from("questions")
      .select("id,content_hash,solution")
      .in("id", chunk.map((r) => r.questionId));
    if (error) throw error;
    const byId = new Map((data as any[]).map((q) => [q.id, q]));
    for (const r of chunk) {
      const q = byId.get(r.questionId);
      if (!q) {
        console.error(`skip ${r.qnum}: not found`);
        continue;
      }
      // The rewrite must actually be live, or the verdict describes nothing.
      if ((q.solution ?? "").replace(/\s+/g, " ") !== r.solution.replace(/\s+/g, " ")) {
        console.error(`REFUSE Q${r.qnum}: stored solution is not this run's rewrite — apply first`);
        stale++;
        continue;
      }
      inputs.push({
        questionId: r.questionId,
        reviewedContentHash: q.content_hash,
        method: "solution_audit",
        verdict: "solution_rewritten",
        runLabel: `handwave:${RUN}`,
        note: r.why.slice(0, 480),
        source: "live",
      });
    }
  }

  if (stale) {
    console.error(`\n${stale} row(s) not applied — nothing recorded.`);
    process.exit(1);
  }
  console.log(`${inputs.length} verdict(s) ready (solution_rewritten / solution_audit)`);
  if (!APPLY) {
    console.log("DRY RUN — re-run with --apply.");
    return;
  }
  const res = await recordReviews(db as any, inputs);
  console.log(formatRecordResult(res));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
