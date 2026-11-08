/**
 * Flip one committed IAT year PUBLIC, after the owner's OK.
 *
 *   npx tsx scripts/iat/publish.ts 2025            # dry run: checks, counts
 *   npx tsx scripts/iat/publish.ts 2025 --apply
 *
 * Refuses unless the year's rows in the bank are exactly the rows commit.ts
 * plans (by question number, held rows left out), each has a solution, and
 * every question figure and picture option the transcription names is attached.
 * Undo: the same UPDATE back to PRIVATE.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { numberAcrossPaper, type Adjudication, type IatPaper, type IatRow } from "./lib";
import { EXAM_NAME, SUBJECTS, dataDir, iatYear, sourceFile } from "./config";

const read = <T>(p: string): T | undefined => (existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : undefined);

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const year = iatYear(Number(process.argv.slice(2).find((a) => !a.startsWith("--"))));
  const apply = process.argv.includes("--apply");

  const papers = SUBJECTS.map((subject) => {
    const stem = `${year.year}-${subject}`;
    const paper = read<IatPaper>(join(dataDir(), `${stem}.questions.json`));
    if (!paper) throw new Error(`${stem}: no transcription`);
    const held = new Set(
      (read<{ adjudications: Adjudication[] }>(join(dataDir(), `${stem}.adjudication.json`))?.adjudications ?? [])
        .filter((a) => a.hold)
        .map((a) => a.ref)
    );
    return { subject, rows: paper.rows.filter((r) => !held.has(r.ref)) };
  });
  const planned = new Map(numberAcrossPaper<IatRow>(papers).map((p) => [p.n, p]));

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).single();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" missing`);
  const src = sourceFile(year.year);
  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, solution, image_url, visibility, options(label, image_url)")
    .eq("exam_id", exam.id)
    .eq("source_file", src);
  if (error) throw new Error(`read failed: ${error.message}`);

  const issues: string[] = [];
  const inBank = new Map((rows ?? []).map((r) => [Number(r.question_number), r]));
  for (const [n, p] of planned) {
    const r = inBank.get(n);
    const at = `Q${n} (${p.subject} ${p.row.ref})`;
    if (!r) issues.push(`${at}: not in the bank (run commit.ts ${year.year} --apply)`);
    else if (!r.solution?.trim()) issues.push(`${at}: no solution`);
    else if (p.row.figure && p.row.figure.required !== false && !r.image_url) issues.push(`${at}: figure not attached`);
    else if (p.row.optionFigures && (r.options as { image_url: string | null }[]).some((o) => !o.image_url)) {
      issues.push(`${at}: an option picture is not attached`);
    }
  }
  for (const n of inBank.keys()) if (!planned.has(n)) issues.push(`Q${n}: in the bank but not in the plan`);
  const priv = (rows ?? []).filter((r) => r.visibility !== "PUBLIC").length;
  console.log(`${src}: ${rows?.length ?? 0} row(s) in the bank, ${priv} PRIVATE, plan ${planned.size}`);
  if (issues.length) {
    console.error(`REFUSING: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("DRY RUN: pass --apply to publish.");

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", exam.id)
    .eq("source_file", src)
    .eq("visibility", "PRIVATE");
  if (uErr) throw new Error(`publish failed: ${uErr.message}`);
  console.log(`published ${count} row(s).`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
