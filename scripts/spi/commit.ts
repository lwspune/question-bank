/**
 * Commit one SPI paper into the bank, PRIVATE, through commitStaged (dedup, taxonomy,
 * content_hash) plus an upload_jobs row.
 *
 *   npx tsx scripts/spi/commit.ts <paperId>          # dry run: validate, write nothing
 *   npx tsx scripts/spi/commit.ts <paperId> --apply
 *
 * Reads out/<paperId>/rows.json, which build.ts writes only once the transcript is whole,
 * every figure is cropped and every check passes. Rows go through SSC CGL's parseCommitRows
 * (the Excel upload's validator, figure bytes folded into the hash, "[figure]" options
 * stored as empty text).
 *
 * ALWAYS PRIVATE, written so at insert. Publishing is a separate, reviewed step.
 * A derived-key paper is stamped (derived_model, derived_at) in this same run, so a derived
 * answer is never in the bank unmarked, not even while PRIVATE.
 *
 * Rollback is by source_file: every row carries the paper's own label.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { uploadImage } from "../../src/lib/storage/images";
import { commitStaged } from "../../src/lib/upload/commit";
import { parseCommitRows, type CommitRow } from "../ssc-cgl/rows";
import { CREATED_BY, DERIVED_MODEL, EXAM_NAME, ORG_ID, OUT, requirePaper } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");

  const file = join(OUT, paper.id, "rows.json");
  if (!existsSync(file)) throw new Error(`${file} not found: run build.ts ${paper.id} first`);
  const rows: CommitRow[] = JSON.parse(readFileSync(file, "utf8"));
  const { parsed, errs } = parseCommitRows(rows);
  const expected = paper.parts.at(-1)!.to;
  if (rows.length !== expected) errs.push(`expected ${expected} rows, found ${rows.length}`);

  console.log(`${paper.id}  "${paper.pyqNote ?? paper.sourceFile}"  kind=${paper.kind}  answers=${paper.answerSource}  source_file "${paper.sourceFile}"`);
  console.log(`${rows.length} rows, ${parsed.length} valid, ${rows.filter((r) => r.flawed).length} flawed`);
  for (const e of errs) console.log(`  - ${e}`);
  if (!apply) return console.log("\n[dry run] pass --apply to write. Nothing inserted.");
  if (errs.length) throw new Error("refusing to commit with validation errors: fix the transcript first");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" missing: run scripts/spi/seed.ts --apply first`);
  const examId = exam.id as string;

  // A re-commit must not silently unpublish a live paper.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", paper.sourceFile)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0) throw new Error(`${publicBefore} row(s) of ${paper.sourceFile} are already PUBLIC; refusing to re-commit`);

  const { data: existingJob } = await client.from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", paper.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: paper.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: parsed.length })
      .select("id")
      .single();
    if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
    jobId = job.id;
  }

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId,
    filename: paper.sourceFile,
    createdBy: CREATED_BY,
    rows: parsed,
    uploadJobId: jobId,
    pyqYear: paper.pyqYear,
    pyqNote: paper.pyqNote,
    visibility: "PRIVATE",
    questionKind: paper.kind,
  });
  console.log(`\ncommit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  if (paper.answerSource === "derived") {
    const { error, count } = await client
      .from("questions")
      .update({ derived_model: DERIVED_MODEL, derived_at: new Date().toISOString() }, { count: "exact" })
      .eq("exam_id", examId)
      .eq("source_file", paper.sourceFile);
    if (error) throw new Error(`derived stamp failed: ${error.message}`);
    console.log(`stamped ${count} rows derived_model = "${DERIVED_MODEL}"`);
  }
  await attachFigures(client, examId, paper.sourceFile, rows);

  const { count: linked } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", examId).eq("source_file", paper.sourceFile);
  await client
    .from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done. ${linked} rows under "${paper.sourceFile}" (job ${jobId}).`);
  if ((linked ?? 0) !== expected) console.log(`!! expected ${expected} rows, found ${linked}: a skipped row is a repeat of an existing one, investigate.`);
}

/** Upload each figure row's pictures onto the row this paper inserted. Idempotent: a filled slot is left alone. */
async function attachFigures(client: SupabaseClient<any, any, any>, examId: string, sourceFile: string, rows: CommitRow[]) {
  const withFigures = rows.filter((r) => r.figures.stem || r.figures.options);
  if (!withFigures.length) return;
  const { data, error } = await client
    .from("questions")
    .select("id, question_number, image_url, options(id, label, image_url)")
    .eq("exam_id", examId)
    .eq("source_file", sourceFile);
  if (error) throw new Error(`figure lookup failed: ${error.message}`);
  const byNumber = new Map((data ?? []).map((q) => [String(q.question_number), q]));
  const put = (f: string) => uploadImage(client, ORG_ID, readFileSync(f), "image/png");
  let uploaded = 0;
  for (const r of withFigures) {
    const q = byNumber.get(String(r.questionNumber));
    if (!q) throw new Error(`Q${r.questionNumber}: figure row not found after commit`);
    if (r.figures.stem && !q.image_url) {
      const { error: e } = await client.from("questions").update({ image_url: await put(r.figures.stem) }).eq("id", q.id);
      if (e) throw new Error(`Q${r.questionNumber} image_url: ${e.message}`);
      uploaded++;
    }
    for (const [i, f] of (r.figures.options ?? []).entries()) {
      const opt = (q.options as { id: string; label: string; image_url: string | null }[]).find((o) => o.label === "ABCD"[i]);
      if (!opt) throw new Error(`Q${r.questionNumber} has no option ${"ABCD"[i]}`);
      if (opt.image_url) continue;
      const { error: e } = await client.from("options").update({ image_url: await put(f) }).eq("id", opt.id);
      if (e) throw new Error(`Q${r.questionNumber} option ${"ABCD"[i]}: ${e.message}`);
      uploaded++;
    }
  }
  console.log(`figures: ${uploaded} picture(s) uploaded for ${withFigures.length} figure row(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
