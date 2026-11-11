/**
 * Flip one committed CLAT year PUBLIC.
 *
 *   npx tsx scripts/clat/publish.ts 2026            # dry run: checks, counts
 *   npx tsx scripts/clat/publish.ts 2026 --apply
 *
 * Refuses unless the year's rows in the bank are exactly the extracted paper's
 * question numbers, each with a solution, and every question that hangs off a
 * passage carries it as context. Undo: the same UPDATE back to PRIVATE.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME, sourceFile } from "./config";
import { loadPaper } from "./io";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const year = Number(process.argv.slice(2).find((a) => !a.startsWith("--")));
  if (!year) throw new Error("usage: publish.ts <year> [--apply]");
  const apply = process.argv.includes("--apply");
  const paper = loadPaper(year);
  const src = sourceFile(year);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).single();
  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, solution, context, visibility")
    .eq("exam_id", exam!.id)
    .eq("source_file", src);
  if (error) throw new Error(error.message);

  const issues: string[] = [];
  const byNum = new Map((rows ?? []).map((r) => [String(r.question_number), r]));
  for (const r of paper.rows) {
    const q = byNum.get(r.ref);
    if (!q) issues.push(`Q${r.ref}: not in the bank`);
    else {
      if (!q.solution?.trim()) issues.push(`Q${r.ref}: no solution`);
      if (r.passage && !q.context?.trim()) issues.push(`Q${r.ref}: its passage is missing`);
    }
  }
  if ((rows ?? []).length !== paper.rows.length) issues.push(`${rows?.length} rows in the bank, ${paper.rows.length} in the paper`);
  const priv = (rows ?? []).filter((r) => r.visibility !== "PUBLIC").length;
  console.log(`${src}: ${rows?.length} rows, ${priv} not yet PUBLIC`);
  if (issues.length) {
    console.error(`REFUSING:\n  ${issues.slice(0, 30).join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("DRY RUN: pass --apply to publish.");
  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", exam!.id)
    .eq("source_file", src);
  if (uErr) throw new Error(uErr.message);
  console.log(`published ${count} row(s).`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
