/**
 * Commit one SSC CGL shift into the bank, PRIVATE, question_kind='pyq', through
 * commitStaged (dedup, taxonomy, content_hash) plus an upload_jobs row.
 *
 *   npx tsx scripts/ssc-cgl/commit.ts <shiftId>          # dry-run: validate, write nothing
 *   npx tsx scripts/ssc-cgl/commit.ts <shiftId> --apply
 *
 * Reads out/<shiftId>/rows.json, which build.ts writes only once the transcript is
 * whole and every check passes. Every row runs through the SAME validator the Excel
 * upload uses, so this cannot write a shape the normal ingest would reject.
 *
 * ALWAYS PRIVATE. Publishing is a separate, reviewed step (flawed rows, the ones whose
 * question or official key we dispute, must stay private).
 *
 * Rollback is by source_file: every row carries the shift's own label, so one DELETE
 * removes exactly this shift and nothing else.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { validateRow, type RawRow } from "../../src/lib/upload/validate";
import { CREATED_BY, DAYS, ORG_ID, OUT, requireExamId, requireShift } from "./config";

type Row = RawRow & { flawed: boolean; figures: { stem: string | null; options: string[] | null } };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const shift = requireShift(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const examId = requireExamId();

  const file = join(OUT, shift.id, "rows.json");
  if (!existsSync(file)) throw new Error(`${file} not found: run build.ts ${shift.id} first`);
  const rows: Row[] = JSON.parse(readFileSync(file, "utf8"));

  const withFigures = rows.filter((r) => r.figures.stem || r.figures.options);
  if (withFigures.length) {
    throw new Error(`${withFigures.length} row(s) declare figures; attaching figures is not built yet (Q${withFigures.map((r) => r.questionNumber).join(", Q")})`);
  }

  const errs: string[] = [];
  const parsed = [];
  for (const r of rows) {
    const { flawed: _f, figures: _g, ...raw } = r;
    const v = validateRow(raw);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }
  const flawed = rows.filter((r) => r.flawed).map((r) => r.questionNumber);

  console.log(`${shift.id}  "${shift.pyqNote}"  source_file ${shift.sourceFile}`);
  if (DAYS[shift.day].provisionalKey) console.log("key: SSC's PROVISIONAL key (the challenge-module sheet)");
  console.log(`${rows.length} rows, ${parsed.length} valid, ${flawed.length} flawed (stay PRIVATE when the shift is published): ${flawed.map((n) => `Q${n}`).join(", ") || "none"}`);
  if (errs.length) for (const e of errs) console.log(`  - ${e}`);
  // The sheet (assemble.ts) is the count: 100, less any questions DAYS declares the source lacks.
  const sheetCount: number = JSON.parse(readFileSync(join(OUT, shift.id, "questions.json"), "utf8")).questions.length;
  if (rows.length !== sheetCount) errs.push(`expected ${sheetCount} rows (the sheet's count), found ${rows.length}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (errs.length) throw new Error("refusing to commit with validation errors: fix the transcript first");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  // Count PUBLIC rows BEFORE inserting: a re-commit must not silently unpublish a live shift.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", shift.sourceFile)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0 && !args.includes("--allow-unpublish")) {
    throw new Error(`${publicBefore} row(s) of ${shift.sourceFile} are already PUBLIC; re-run with --allow-unpublish if that is intended`);
  }

  const { data: existingJob } = await client.from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", shift.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: shift.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: parsed.length })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId,
    filename: shift.sourceFile,
    createdBy: CREATED_BY,
    rows: parsed,
    uploadJobId: jobId,
    pyqYear: shift.pyqYear,
    pyqMonth: shift.pyqMonth,
    pyqNote: shift.pyqNote,
  });
  console.log(`\ncommit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);
  if (result.skipped > 0) console.log(`!! ${result.skipped} row(s) skipped as duplicates: two questions of one paper collided on content_hash. Investigate.`);

  const { error: vErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE" }, { count: "exact" })
    .eq("exam_id", examId)
    .eq("source_file", shift.sourceFile);
  if (vErr) throw new Error(`visibility update failed: ${vErr.message}`);
  console.log(`set ${count} rows to PRIVATE.`);

  const { count: linked } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", examId).eq("source_file", shift.sourceFile);
  await client
    .from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done. ${linked} rows under ${shift.sourceFile} (job ${jobId}).`);
  if ((linked ?? 0) !== sheetCount) console.log(`!! expected ${sheetCount} rows for this shift, found ${linked}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
