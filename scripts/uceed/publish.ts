/**
 * Flip one UCEED paper's committed rows PUBLIC, after the owner has OK'd its review sheet.
 *
 *   npx tsx scripts/uceed/publish.ts 2026            # dry run: checks, counts
 *   npx tsx scripts/uceed/publish.ts 2026 --apply
 *
 *   npx tsx scripts/uceed/publish.ts 2015 --skip-msq --apply   # MCQ + exact NAT only
 *
 * Refuses unless the paper's rows in the bank are exactly the rows planPaper would commit,
 * every one has a solution, and every row the transcription gives a figure has its image.
 * --skip-msq leaves multiple-select rows and range-keyed NAT rows PRIVATE: they need the
 * MSQ code (migration 0214) to be live before anyone can see them.
 * Undo: the same UPDATE back to PRIVATE (also how a figure is taken down on request).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, EXAM_NAME, sourceFile } from "./config";
import { planPaper, type UceedKey, type UceedPaper } from "./lib";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const year = Number(process.argv[2]);
  if (!year) throw new Error("usage: publish.ts <year> [--apply]");
  const apply = process.argv.includes("--apply");
  const skipMsq = process.argv.includes("--skip-msq");
  const read = <T>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8"));
  const plan = planPaper(read<UceedPaper>(`${year}.questions.json`), read<UceedKey>(`${year}.key.json`));
  if (plan.issues.length) throw new Error(`the paper has ${plan.issues.length} issue(s): run commit.ts ${year}`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).single();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" missing`);
  const src = sourceFile(year);
  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, solution, image_url, visibility")
    .eq("exam_id", exam.id)
    .eq("source_file", src);
  if (error) throw new Error(`read failed: ${error.message}`);

  const issues: string[] = [];
  const inBank = new Map((rows ?? []).map((r) => [Number(r.question_number), r]));
  for (const p of plan.rows) {
    const r = inBank.get(p.n);
    if (!r) issues.push(`Q${p.n}: not in the bank (run commit.ts ${year} --apply)`);
    else if (!r.solution?.trim()) issues.push(`Q${p.n}: no solution`);
    else if (p.figure && !r.image_url) issues.push(`Q${p.n}: figure not attached`);
  }
  const planned = new Set(plan.rows.map((p) => p.n));
  for (const n of inBank.keys()) if (!planned.has(n)) issues.push(`Q${n}: in the bank but not in the plan`);
  const priv = (rows ?? []).filter((r) => r.visibility !== "PUBLIC").length;
  console.log(`${src}: ${rows?.length ?? 0} row(s) in the bank, ${priv} PRIVATE, plan ${plan.rows.length}, held ${plan.held.length}`);
  if (issues.length) {
    console.error(`REFUSING: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("DRY RUN: pass --apply to publish.");

  let update = client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", exam.id)
    .eq("source_file", src)
    .eq("visibility", "PRIVATE");
  if (skipMsq) update = update.in("question_format", ["mcq", "numeric"]).is("numeric_answer_max", null);
  const { error: uErr, count } = await update;
  if (uErr) throw new Error(`publish failed: ${uErr.message}`);
  console.log(`published ${count} row(s).`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
