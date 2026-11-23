/**
 * Flip MH Scholarship papers PUBLIC.
 *
 *   npx tsx scripts/mh-scholarship/publish.ts                 # dry run: checks every publishable paper
 *   npx tsx scripts/mh-scholarship/publish.ts --apply
 *   npx tsx scripts/mh-scholarship/publish.ts ms4-2026-p1 --apply   # one paper
 *
 * Only the exams in PUBLISHABLE may go public: owner 2026-11-20, "no class 8
 * public" (the Class 5/8 papers are the old exam, and Class 8's two-answer items
 * are held, so its papers are not whole). A paper id outside them is refused.
 *
 * Refuses the whole run unless every paper's rows in the bank number exactly
 * what commit.ts writes (75, minus `held` numbers and held two-answer items)
 * and every row carries a solution or a cancellation note. Run it from the main
 * checkout (which holds .env.local; never a worktree). Undo: the same UPDATE
 * back to PRIVATE, by exam_id + source_file. Then flip the exam's registry
 * entry `noPublicContent` off.
 *
 * After it, build the mocks: npx tsx scripts/mocks/build.ts --paper=mh-scholarship --apply --publish
 * (the builder reads PUBLIC rows only).
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { EXAMS, PAPERS, dataPath, examIdOf, expectedCount, type ExamKey, type Paper } from "./config";

/** Exams whose papers may be published. */
export const PUBLISHABLE: readonly ExamKey[] = ["mh-scholarship-4", "mh-scholarship-7"];

/** Held two-answer and disputed items, from keycheck's answers file. */
function heldFromAnswers(p: Paper): number[] {
  const f = dataPath(p.id, "answers");
  return existsSync(f) ? ((JSON.parse(readFileSync(f, "utf8")).held ?? []) as number[]) : [];
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const only = args.find((a) => !a.startsWith("--"));
  if (only && PAPERS[only] && !PUBLISHABLE.includes(PAPERS[only].exam)) {
    throw new Error(`${only} is ${EXAMS[PAPERS[only].exam].name}, which is not publishable (owner: no Class 8 public)`);
  }
  const papers: Paper[] = Object.values(PAPERS).filter(
    (p) => PUBLISHABLE.includes(p.exam) && p.pages.length > 0 && (!only || p.id === only),
  );
  if (papers.length === 0) throw new Error(`no publishable paper "${only ?? ""}"`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const issues: string[] = [];
  let total = 0;
  let notPublic = 0;
  for (const p of papers) {
    const expected = expectedCount(p, heldFromAnswers(p));
    const { data: rows, error } = await client
      .from("questions")
      .select("id, question_number, solution, cancelled_note, visibility")
      .eq("exam_id", examIdOf(p))
      .eq("source_file", p.sourceFile);
    if (error) throw new Error(`${p.id}: ${error.message}`);
    const n = rows?.length ?? 0;
    const priv = (rows ?? []).filter((r) => r.visibility !== "PUBLIC").length;
    // A cancelled row has no solution: its note is what a student reads.
    const noSol = (rows ?? []).filter((r) => !r.solution?.trim() && !r.cancelled_note?.trim()).map((r) => r.question_number);
    total += n;
    notPublic += priv;
    console.log(`${p.id.padEnd(14)} ${EXAMS[p.exam].name.padEnd(24)} ${String(n).padStart(4)} rows (expected ${expected}), ${priv} not PUBLIC`);
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
