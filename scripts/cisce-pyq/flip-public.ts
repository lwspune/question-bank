/**
 * Flip a committed ISC paper PUBLIC (or back to PRIVATE).
 *
 *   npx tsx scripts/isc-12-pyq/flip-public.ts 2025 Mathematics            # dry run
 *   npx tsx scripts/isc-12-pyq/flip-public.ts 2025 Mathematics --apply
 *   npx tsx scripts/isc-12-pyq/flip-public.ts 2025 Mathematics --private --apply
 *
 * Only after the audits (README "What is left"). Refuses a row with no
 * solution, and a figure-bearing row with no image_url, because both ship as a
 * complete-looking question that a student cannot use.
 *
 * Scoped by exam AND source_file and flipped by id in chunks: `source_file` is
 * unindexed, and the exam filter keeps the scan to ISC's own rows.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { sourceFileFor, type IscPaper } from "./lib";
import { ISC_12_EXAM_NAME } from "./config";

async function main() {
  const [year, subject] = process.argv.slice(2);
  const apply = process.argv.includes("--apply");
  const target = process.argv.includes("--private") ? "PRIVATE" : "PUBLIC";
  if (!year || !subject) throw new Error("usage: flip-public.ts <year> <subject> [--private] [--apply]");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const paper = JSON.parse(
    readFileSync(join(process.cwd(), "scripts", "isc-12-pyq", "data", `${year}-${subject}.questions.json`), "utf8")
  ) as IscPaper;
  const src = sourceFileFor(paper.year, paper.subject);
  const { data: exam } = await client.from("exams").select("id").eq("name", ISC_12_EXAM_NAME).single();
  if (!exam) throw new Error("exam not found");
  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, visibility, solution, image_url")
    .eq("exam_id", exam.id)
    .eq("source_file", src);
  if (error) throw new Error(error.message);

  const figureRefs = new Set(paper.rows.filter((r) => r.figure && r.figure.required !== false).map((r) => r.questionNumber));
  const problems = (rows ?? []).flatMap((r) => [
    ...(!r.solution?.trim() ? [`${r.question_number}: no solution`] : []),
    ...(figureRefs.has(r.question_number) && !r.image_url ? [`${r.question_number}: figure not attached`] : []),
  ]);
  const todo = (rows ?? []).filter((r) => r.visibility !== target);
  console.log(`${src}: ${rows?.length ?? 0} rows, ${todo.length} to flip ${target}`);
  if (target === "PUBLIC" && problems.length) {
    console.error(`REFUSING:\n  ${problems.join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("[dry run] pass --apply.");
  const ids = todo.map((r) => r.id);
  for (let i = 0; i < ids.length; i += 100) {
    const { error: uErr } = await client.from("questions").update({ visibility: target }).in("id", ids.slice(i, i + 100));
    if (uErr) throw new Error(`flip failed: ${uErr.message}`);
  }
  const { count } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", exam.id)
    .eq("source_file", src)
    .neq("visibility", target);
  console.log(`done. rows not ${target}: ${count}`);
  if (count) process.exit(1);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
