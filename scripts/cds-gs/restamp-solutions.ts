/**
 * Repair the solution tail on CDS General Knowledge rows from a paper that HAS
 * an official key.
 *
 *   npx tsx scripts/cds-gs/restamp-solutions.ts          # dry run (default)
 *   npx tsx scripts/cds-gs/restamp-solutions.ts --apply  # write
 *
 * Why: CDS (II) 2026 shipped 120 rows whose solution ended "this booklet
 * carries no official key" while their note said the answer came from the
 * official key — the solution tail was hardcoded in lib.ts. commit.ts now picks
 * the tail per paper; this fixes the rows already in the bank. Idempotent:
 * restampSolution leaves an already-keyed tail alone.
 *
 * SCOPED to this exam AND to each keyed paper's source file, like flip-public.ts.
 * `solution` is not in content_hash, so no row identity moves.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, PAPERS } from "./config";
import { restampSolution } from "./provenance";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  let changed = 0;
  for (const paper of Object.values(PAPERS).filter((p) => p.answerKey)) {
    const { data, error } = await sb
      .from("questions")
      .select("id, question_number, solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .limit(1000);
    if (error) throw error;

    const todo = (data ?? [])
      .map((r) => ({ ...r, next: restampSolution(r.solution ?? "", true) }))
      .filter((r) => r.next !== (r.solution ?? ""));
    console.log(`${paper.id}: ${data?.length ?? 0} rows, ${todo.length} to restamp`);
    if (todo[0]) console.log(`  e.g. Q${todo[0].question_number}: …${todo[0].next.slice(-140)}`);

    if (!apply) continue;
    for (const r of todo) {
      const { error: e } = await sb.from("questions").update({ solution: r.next }).eq("id", r.id);
      if (e) throw new Error(`update ${r.id} failed: ${e.message}`);
    }
    changed += todo.length;
  }
  console.log(apply ? `\nrestamped ${changed} row(s)` : `\ndry run — add --apply to write`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
