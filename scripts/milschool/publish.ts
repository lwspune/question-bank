/**
 * Flip the Sainik & Military Schools papers PUBLIC (AISSEE, RMS CET, RIMC).
 *
 *   npx tsx scripts/milschool/publish.ts            # dry run: checks every paper, writes nothing
 *   npx tsx scripts/milschool/publish.ts --apply
 *   npx tsx scripts/milschool/publish.ts aissee-9-2025 --apply   # one paper
 *
 * Refuses the whole run unless every paper's rows in the bank number exactly
 * what commit.ts writes (the pattern minus any `held` numbers; a written RIMC
 * paper, its transcription's items) and every row carries a solution. Run it
 * from a checkout with the production .env.local (never a worktree). Undo: the
 * same UPDATE back to PRIVATE, by exam_id + source_file.
 *
 * After it, build the mocks: npx tsx scripts/mocks/build.ts --paper=milschool --apply --publish
 * (the builder reads PUBLIC rows only).
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAMS, PAPERS, examIdOf, expectedCount, type Paper } from "./config";
import { buildPaperRows } from "./rows";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const only = args.find((a) => !a.startsWith("--"));
  const papers: Paper[] = Object.values(PAPERS).filter((p) => !only || p.id === only);
  if (papers.length === 0) throw new Error(`no paper "${only}"`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const issues: string[] = [];
  let total = 0;
  let notPublic = 0;
  for (const p of papers) {
    const expected = p.format === "written" ? buildPaperRows(p).parsed.length : expectedCount(p);
    const { data: rows, error } = await client
      .from("questions")
      .select("id, question_number, solution, visibility")
      .eq("exam_id", examIdOf(p))
      .eq("source_file", p.sourceFile);
    if (error) throw new Error(`${p.id}: ${error.message}`);
    const n = rows?.length ?? 0;
    const priv = (rows ?? []).filter((r) => r.visibility !== "PUBLIC").length;
    const noSol = (rows ?? []).filter((r) => !r.solution?.trim()).map((r) => r.question_number);
    total += n;
    notPublic += priv;
    console.log(`${p.id.padEnd(26)} ${EXAMS[p.exam].name.padEnd(16)} ${String(n).padStart(4)} rows (expected ${expected}), ${priv} not PUBLIC`);
    if (n !== expected) issues.push(`${p.id}: ${n} rows in the bank, ${expected} expected`);
    if (noSol.length) issues.push(`${p.id}: no solution on Q${noSol.slice(0, 10).join(", Q")}`);
  }
  console.log(`\n${papers.length} paper(s), ${total} rows, ${notPublic} not yet PUBLIC`);
  if (issues.length) {
    console.error(`REFUSING:\n  ${issues.slice(0, 40).join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("DRY RUN: pass --apply to publish.");

  let published = 0;
  for (const p of papers) {
    const { error, count } = await client
      .from("questions")
      .update({ visibility: "PUBLIC" }, { count: "exact" })
      .eq("exam_id", examIdOf(p))
      .eq("source_file", p.sourceFile)
      .neq("visibility", "PUBLIC");
    if (error) throw new Error(`${p.id}: ${error.message}`);
    published += count ?? 0;
  }
  console.log(`published ${published} row(s).`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
