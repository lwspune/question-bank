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
 *
 * Figures (TCS shifts, figures.ts): a figure row is hashed with its figure bytes
 * (figureAwareHash), its "[figure]" options are stored as empty text, and after the insert
 * each picture is uploaded and set on questions.image_url / options.image_url. That step is
 * idempotent: a slot already holding an image is left alone.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { CREATED_BY, DAYS, ORG_ID, OUT, requireExamId, requireShift, tierOf } from "./config";
import { parseCommitRows, type CommitRow as Row } from "./rows";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const shift = requireShift(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const examId = requireExamId(tierOf(shift.id));

  const file = join(OUT, shift.id, "rows.json");
  if (!existsSync(file)) throw new Error(`${file} not found: run build.ts ${shift.id} first`);
  const rows: Row[] = JSON.parse(readFileSync(file, "utf8"));

  const { parsed, errs } = parseCommitRows(rows);
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
  if (result.skipped > 0) await recordRepeats(client, examId, shift, parsed);
  await attachFigures(client, examId, shift.sourceFile, rows);

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

/** Upload each figure row's pictures and set them on the row this shift inserted. */
async function attachFigures(client: SupabaseClient<any, any, any>, examId: string, sourceFile: string, rows: Row[]) {
  const withFigures = rows.filter((r) => r.figures.stem || r.figures.options);
  if (!withFigures.length) return;
  const { data, error } = await client
    .from("questions")
    .select("id, question_number, image_url, options(id, label, image_url)")
    .eq("exam_id", examId)
    .eq("source_file", sourceFile);
  if (error) throw new Error(`figure lookup failed: ${error.message}`);
  const byNumber = new Map((data ?? []).map((q) => [String(q.question_number), q]));
  let uploaded = 0;
  for (const r of withFigures) {
    const q = byNumber.get(String(r.questionNumber));
    if (!q) continue; // a repeat: its twin row carries the same pictures
    const put = async (file: string) => uploadImage(client, ORG_ID, readFileSync(file), "image/png");
    if (r.figures.stem && !q.image_url) {
      const { error: e } = await client.from("questions").update({ image_url: await put(r.figures.stem) }).eq("id", q.id);
      if (e) throw new Error(`Q${r.questionNumber} image_url: ${e.message}`);
      uploaded++;
    }
    for (const [i, file] of (r.figures.options ?? []).entries()) {
      const label = "ABCD"[i];
      const opt = (q.options as { id: string; label: string; image_url: string | null }[]).find((o) => o.label === label);
      if (!opt) throw new Error(`Q${r.questionNumber} has no option ${label}`);
      if (opt.image_url) continue;
      const { error: e } = await client.from("options").update({ image_url: await put(file) }).eq("id", opt.id);
      if (e) throw new Error(`Q${r.questionNumber} option ${label} image_url: ${e.message}`);
      uploaded++;
    }
  }
  console.log(`figures: ${uploaded} picture(s) uploaded for ${withFigures.length} figure row(s).`);
}

/**
 * SSC re-asks questions word for word across shifts (12 Sep S3 Q65 = 16 Sep S2 Q59), and
 * the bank keeps one row per (org, exam, content_hash), so the later shift's copy is
 * skipped. Its place in THIS paper must not be lost: a mock of the shift needs it. Each
 * skipped number is written to repeats.json (committed) with the row it repeats.
 */
async function recordRepeats(
  client: SupabaseClient<any, any, any>,
  examId: string,
  shift: ReturnType<typeof requireShift>,
  parsed: { questionNumber?: string | null; contentHash: string }[]
) {
  const { data: mine } = await client.from("questions").select("question_number").eq("exam_id", examId).eq("source_file", shift.sourceFile);
  const present = new Set((mine ?? []).map((q) => String(q.question_number)));
  const skipped = parsed.filter((p) => !present.has(String(p.questionNumber)));
  const file = join(__dirname, "repeats.json");
  const ledger: Record<string, { number: number; questionId: string; first: string }[]> = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  ledger[shift.id] = [];
  for (const p of skipped) {
    const { data: twin } = await client
      .from("questions")
      .select("id, source_file, question_number")
      .eq("org_id", ORG_ID)
      .eq("exam_id", examId)
      .eq("content_hash", p.contentHash)
      .maybeSingle();
    if (!twin) {
      console.log(`!! Q${p.questionNumber} was skipped but no row carries its content_hash. Investigate.`);
      continue;
    }
    const first = `${twin.source_file} Q${twin.question_number}`;
    console.log(`repeat: Q${p.questionNumber} is ${first} word for word; the bank keeps that row (${twin.id})`);
    ledger[shift.id].push({ number: Number(p.questionNumber), questionId: twin.id as string, first });
  }
  writeFileSync(file, JSON.stringify(ledger, null, 2) + "\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
