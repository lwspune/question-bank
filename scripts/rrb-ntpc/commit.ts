/**
 * Commit one NTPC shift into the bank, PRIVATE, question_kind='pyq', through commitStaged (dedup,
 * taxonomy, content_hash) plus an upload_jobs row.
 *
 *   npx tsx scripts/rrb-ntpc/commit.ts <shiftId>          # dry-run: validate, write nothing
 *   npx tsx scripts/rrb-ntpc/commit.ts <shiftId> --apply
 *
 * Reads out/<shiftId>/rows.json (build.ts writes it only once the transcript is whole and clean).
 * Every row runs through the Excel upload's own validator (scripts/ssc-cgl/rows.ts), and figure
 * rows hash with their picture bytes, as in the SSC CGL lane.
 *
 * ALWAYS PRIVATE: publishing is a separate, reviewed step. Rollback is by source_file (each row
 * carries its shift's own label). A question RRB re-asks word for word in another shift is skipped
 * by the bank's (org, exam, content_hash) key; its place in this paper is written to repeats.json
 * (committed), which a mock of the shift needs.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { uploadImage } from "../../src/lib/storage/images";
import { commitStaged } from "../../src/lib/upload/commit";
import { parseCommitRows, type CommitRow as Row } from "../ssc-cgl/rows";
import { CREATED_BY, ORG_ID, OUT, requireExamId, requireShift } from "./config";

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
  const { parsed, errs } = parseCommitRows(rows);
  const flawed = rows.filter((r) => r.flawed).map((r) => r.questionNumber);

  console.log(`${shift.id}  "${shift.pyqNote}"  source_file ${shift.sourceFile}  (key: RRB's TENTATIVE key)`);
  console.log(`${rows.length} rows, ${parsed.length} valid, ${flawed.length} flawed: ${flawed.map((n) => `Q${n}`).join(", ") || "none"}`);
  if (rows.length !== 100) errs.push(`expected 100 rows, found ${rows.length}`);
  for (const e of errs) console.log(`  - ${e}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (errs.length) throw new Error("refusing to commit with validation errors: fix the transcript first");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  // A re-commit must not silently unpublish a live shift.
  const { count: publicBefore } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", examId).eq("source_file", shift.sourceFile).eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0 && !args.includes("--allow-unpublish")) throw new Error(`${publicBefore} row(s) of ${shift.sourceFile} are already PUBLIC; re-run with --allow-unpublish if that is intended`);

  const { data: existingJob } = await client.from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", shift.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error } = await client.from("upload_jobs").insert({ org_id: ORG_ID, filename: shift.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: parsed.length }).select("id").single();
    if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
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
  await recordRepeats(client, examId, shift, parsed);
  await attachFigures(client, examId, shift.sourceFile, rows);

  const { error: vErr, count } = await client.from("questions").update({ visibility: "PRIVATE" }, { count: "exact" }).eq("exam_id", examId).eq("source_file", shift.sourceFile);
  if (vErr) throw new Error(`visibility update failed: ${vErr.message}`);
  console.log(`set ${count} rows to PRIVATE.`);

  const { count: linked } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", examId).eq("source_file", shift.sourceFile);
  await client.from("upload_jobs").update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() }).eq("id", jobId);
  const repeats = readRepeats()[shift.id]?.length ?? 0;
  console.log(`done. ${linked} rows under ${shift.sourceFile} + ${repeats} repeat(s) of earlier shifts (job ${jobId}).`);
  if ((linked ?? 0) + repeats !== 100) console.log(`!! expected 100 = rows + repeats, found ${(linked ?? 0) + repeats}.`);
}

/** Upload each figure row's pictures and set them on the row this shift inserted (idempotent). */
async function attachFigures(client: SupabaseClient<any, any, any>, examId: string, sourceFile: string, rows: Row[]) {
  const withFigures = rows.filter((r) => r.figures.stem || r.figures.options);
  if (!withFigures.length) return;
  const { data, error } = await client.from("questions").select("id, question_number, image_url, options(id, label, image_url)").eq("exam_id", examId).eq("source_file", sourceFile);
  if (error) throw new Error(`figure lookup failed: ${error.message}`);
  const byNumber = new Map((data ?? []).map((q) => [String(q.question_number), q]));
  let uploaded = 0;
  for (const r of withFigures) {
    const q = byNumber.get(String(r.questionNumber));
    if (!q) continue; // a repeat: its twin row carries the same pictures
    const put = async (f: string) => uploadImage(client, ORG_ID, readFileSync(f), "image/png");
    if (r.figures.stem && !q.image_url) {
      const { error: e } = await client.from("questions").update({ image_url: await put(r.figures.stem) }).eq("id", q.id);
      if (e) throw new Error(`Q${r.questionNumber} image_url: ${e.message}`);
      uploaded++;
    }
    for (const [i, f] of (r.figures.options ?? []).entries()) {
      const label = "ABCD"[i];
      const opt = (q.options as { id: string; label: string; image_url: string | null }[]).find((o) => o.label === label);
      if (!opt) throw new Error(`Q${r.questionNumber} has no option ${label}`);
      if (opt.image_url) continue;
      const { error: e } = await client.from("options").update({ image_url: await put(f) }).eq("id", opt.id);
      if (e) throw new Error(`Q${r.questionNumber} option ${label} image_url: ${e.message}`);
      uploaded++;
    }
  }
  console.log(`figures: ${uploaded} picture(s) uploaded for ${withFigures.length} figure row(s).`);
}

const REPEATS = join(__dirname, "repeats.json");
type Ledger = Record<string, { number: number; questionId: string; first: string }[]>;
const readRepeats = (): Ledger => (existsSync(REPEATS) ? JSON.parse(readFileSync(REPEATS, "utf8")) : {});

/** Each question of this paper the bank already held (an earlier shift's word-for-word copy). */
async function recordRepeats(client: SupabaseClient<any, any, any>, examId: string, shift: ReturnType<typeof requireShift>, parsed: { questionNumber?: string | null; contentHash: string }[]) {
  const { data: mine } = await client.from("questions").select("question_number").eq("exam_id", examId).eq("source_file", shift.sourceFile);
  const present = new Set((mine ?? []).map((q) => String(q.question_number)));
  const ledger = readRepeats();
  ledger[shift.id] = [];
  for (const p of parsed.filter((x) => !present.has(String(x.questionNumber)))) {
    const { data: twin } = await client.from("questions").select("id, source_file, question_number").eq("org_id", ORG_ID).eq("exam_id", examId).eq("content_hash", p.contentHash).maybeSingle();
    if (!twin) {
      console.log(`!! Q${p.questionNumber} is not under this shift and no row carries its content_hash. Investigate.`);
      continue;
    }
    const first = `${twin.source_file} Q${twin.question_number}`;
    console.log(`repeat: Q${p.questionNumber} is ${first} word for word; the bank keeps that row (${twin.id})`);
    ledger[shift.id].push({ number: Number(p.questionNumber), questionId: twin.id as string, first });
  }
  if (!ledger[shift.id].length) delete ledger[shift.id];
  writeFileSync(REPEATS, JSON.stringify(ledger, null, 2) + "\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
