/**
 * Push corrected `solution` text from a paper's transcription onto the rows
 * already committed for it.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/sync-solutions.ts <paperId>           # dry run
 *   npx tsx scripts/mh-hsc-12-pyq/paper/sync-solutions.ts <paperId> --apply
 *
 * WHY THIS IS SAFE WHERE A STEM CHANGE IS NOT. `content_hash` is computed from
 * the stem, the options and the answer, and deliberately NOT from the solution,
 * so a solution can be rewritten in place. Correcting a STEM is a different
 * matter entirely: the hash changes, so it means delete + re-commit, which
 * orphans reviews, tags, bookmarks and paper_questions. This script therefore
 * refuses to touch anything but the solution.
 *
 * WHAT IT IS FOR. It was written on 2026-09-24 after a real defect: the
 * phy-feb-2024 Q.25 solution answered phy-jul-2024's Q.25, because the two
 * papers share a question number and the solution had been matched by NUMBER
 * rather than by stem. The row was already committed. Without this, the only
 * ways out were a hand-written SQL UPDATE carrying several hundred characters of
 * LaTeX, or a delete and re-commit that was not warranted for a solution.
 *
 * It matches on (source_file, question_number), the pair that identifies a row
 * within one sitting, and reports any ref it cannot find rather than silently
 * updating nothing.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PAPERS, requirePaper, questionsJsonPath } from "./config";
import type { PaperQuestion } from "../../mh-ssc-10/lib";

const envLocal = join(process.cwd(), ".env.local");
if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!id) {
    console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/sync-solutions.ts <paperId> [--apply]`);
    console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
    process.exit(1);
  }
  const paper = requirePaper(id);
  const qs = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PaperQuestion[];

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: rows, error } = await db
    .from("questions")
    .select("id, question_number, solution")
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(error.message);
  if (!rows?.length) throw new Error(`${id}: no committed rows for source_file ${paper.sourceFile}`);

  const byRef = new Map(rows.map((r) => [String(r.question_number), r]));
  const changed: { ref: string; id: string; solution: string; wasLen: number }[] = [];
  const missing: string[] = [];
  let identical = 0;

  for (const q of qs) {
    if (!q.solution?.trim()) continue;
    const row = byRef.get(q.ref);
    if (!row) {
      // Not an error: a partial commit deliberately holds only some refs, and an
      // absorbed ref has no row of its own. Reported, never silently dropped.
      missing.push(q.ref);
      continue;
    }
    if ((row.solution ?? "") === q.solution) identical++;
    else changed.push({ ref: q.ref, id: row.id, solution: q.solution, wasLen: (row.solution ?? "").length });
  }

  console.log(`${paper.id}  source_file ${paper.sourceFile}`);
  console.log(`  committed rows: ${rows.length} · transcription rows with a solution: ${qs.filter((q) => q.solution?.trim()).length}`);
  console.log(`  already identical : ${identical}`);
  console.log(`  WOULD CHANGE      : ${changed.length}`);
  for (const c of changed) console.log(`    ${c.ref}: ${c.wasLen} chars -> ${c.solution.length} chars`);
  if (missing.length) console.log(`  no committed row  : ${missing.length}  (${missing.slice(0, 8).join(", ")}${missing.length > 8 ? ", ..." : ""})`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write.`);
    return;
  }
  for (const c of changed) {
    const { error: e } = await db.from("questions").update({ solution: c.solution }).eq("id", c.id);
    if (e) throw new Error(`${c.ref}: ${e.message}`);
  }
  console.log(`\nupdated ${changed.length} solution(s). Stems, options, answers and content_hash untouched.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
