/**
 * Publish an SPI paper: flip its rows to PUBLIC after the checks that must hold for a row a
 * student can see.
 *
 *   npx tsx scripts/spi/publish.ts <paperId>          # dry run: report the checks
 *   npx tsx scripts/spi/publish.ts <paperId> --apply
 *
 * Refuses unless every row of the paper's source_file has exactly one correct option, a
 * derived-key paper's rows all carry derived_model (the stamp goes on at commit; this is the
 * second look, before visibility), and the bank holds every question of the transcript (a
 * repeat the paper prints twice is kept once, so the count may be lower by that much; each
 * such gap is listed). Flawed questions are published with their notice above the solution,
 * as SSC CGL's are (owner, 2026-10-17).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseTranscript } from "../ssc-cgl/lib";
import { EXAM_NAME, TRANSCRIPTS, requirePaper } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const qs = parseTranscript(readFileSync(join(TRANSCRIPTS, `${paper.id}.txt`), "utf8"));

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).single();
  const { data, error } = await client
    .from("questions")
    .select("id, question_number, visibility, derived_model, options(is_correct)")
    .eq("exam_id", exam!.id)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(error.message);
  const rows = data ?? [];

  const problems: string[] = [];
  for (const r of rows) {
    const correct = (r.options as { is_correct: boolean }[]).filter((o) => o.is_correct).length;
    if (correct !== 1) problems.push(`Q${r.question_number}: ${correct} correct options`);
    if (paper.answerSource === "derived" && !r.derived_model) problems.push(`Q${r.question_number}: derived answer without derived_model`);
  }
  const inBank = new Set(rows.map((r) => String(r.question_number)));
  const absent = qs.filter((q) => !inBank.has(String(q.number))).map((q) => q.number);

  console.log(`${paper.id} "${paper.sourceFile}": ${rows.length} rows in the bank, ${qs.length} in the transcript`);
  if (absent.length) console.log(`not under this source_file (a repeat kept once): ${absent.map((n) => `Q${n}`).join(", ")}`);
  console.log(`already PUBLIC: ${rows.filter((r) => r.visibility === "PUBLIC").length}, flawed (published with a notice): ${qs.filter((q) => q.flawed).length}`);
  for (const p of problems) console.log(`  - ${p}`);
  if (problems.length) throw new Error(`refusing to publish: ${problems.length} problem(s)`);
  if (!apply) return console.log("\n[dry run] pass --apply to publish.");

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", exam!.id)
    .eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(`publish failed: ${uErr.message}`);
  console.log(`published ${count} rows of "${paper.sourceFile}".`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
