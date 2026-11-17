/**
 * Make every row listed in config.ts WITHHELD private, if it is still PUBLIC.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/withhold.ts            # dry run
 *   npx tsx scripts/mh-hsc-12-pyq/withhold.ts --apply
 *
 * WITHHELD is the record (flip-public.ts never republishes it); this applies it.
 * A row is never deleted: drills, saves and answers stay linked. REFUSES a row a
 * mock or a stored board paper holds, since it would print blank there; rebuild
 * or re-plan those first. Reports homework plans holding the row: take it out of
 * the plan's data file (excludedQuestions) and rebuild that plan.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { WITHHELD } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let flipped = 0;
  const problems: string[] = [];
  for (const [id, why] of Object.entries(WITHHELD)) {
    const { data: q, error } = await db.from("questions").select("id, visibility").eq("id", id).maybeSingle();
    if (error) throw error;
    if (!q) { problems.push(`${id}: not found`); continue; }
    if (q.visibility !== "PUBLIC") continue;
    const [mocks, papers, plans] = await Promise.all([
      db.from("mock_tests").select("slug").filter("questions", "cs", JSON.stringify([{ questionId: id }])),
      db.from("board_paper_items").select("paper_id").eq("question_id", id),
      db.from("homework_plan_items").select("plan_id").eq("question_id", id),
    ]);
    for (const r of [mocks, papers, plans]) if (r.error) throw new Error(r.error.message);
    if (mocks.data?.length || papers.data?.length) {
      problems.push(`${id.slice(0, 8)}: held by ${[...(mocks.data ?? []).map((m) => `mock ${m.slug}`), ...(papers.data ?? []).map((p) => `paper ${p.paper_id}`)].join(", ")}; left PUBLIC`);
      continue;
    }
    console.log(`${apply ? "withhold" : "would withhold"} ${id.slice(0, 8)}: ${why}${plans.data?.length ? `  (in ${plans.data.length} homework plan item(s): rebuild after)` : ""}`);
    if (!apply) { flipped++; continue; }
    const { error: uErr, count } = await db
      .from("questions")
      .update({ visibility: "PRIVATE" }, { count: "exact" })
      .eq("id", id)
      .eq("visibility", "PUBLIC");
    if (uErr) throw uErr;
    flipped += count ?? 0;
  }
  console.log(`\n${apply ? "made PRIVATE" : "would make PRIVATE"}: ${flipped}; problems ${problems.length}`);
  for (const p of problems) console.log(`  ! ${p}`);
  if (problems.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
