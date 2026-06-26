/**
 * Commit one MHT-CET shift into the bank — PRIVATE — via commitStaged
 * (dedup / taxonomy auto-create / content_hash) + an upload_jobs row.
 *
 *   npx tsx scripts/mhtcet/commit.ts <shiftId>          # dry-run
 *   npx tsx scripts/mhtcet/commit.ts <shiftId> --apply  # write
 *
 * Reads out/<shiftId>.records.json (stem/options/figures from extract) +
 * shifts/<shiftId>.json (authored classification + DERIVED answer + DERIVED
 * solution). Idempotent: re-running upserts on content_hash. Figures attach in a
 * separate pass (attach-images.ts). Everything lands PRIVATE; flip-public.ts
 * promotes the verified, non-flawed rows.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeMathFunctions } from "../jee/lib";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { cleanupArtifacts } from "./lib";
import { ORG_ID, EXAM_ID, CREATED_BY, loadShift, recordsPath, requireShiftId, type ShiftData } from "./config";

type Rec = {
  questionNumber: number;
  subject: string;
  stem: string;
  options: { label: "A" | "B" | "C" | "D"; text: string }[] | null;
};

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function buildRows(shiftId: string, shift: ShiftData): ParsedRowPayload[] {
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(shiftId), "utf8"));
  const byNum = new Map(records.map((r) => [r.questionNumber, r]));
  const LABELS = ["A", "B", "C", "D"] as const;

  return Object.entries(shift.questions).map(([key, q]) => {
    const num = Number(key);
    const rec = byNum.get(num);
    if (!rec) throw new Error(`Q${num}: no extracted record (check shifts/${shiftId}.json keys)`);

    // Upgrade bare trig/log function names to upright macros inside math zones
    // (pandoc leaves `sin`/`cos`/`tan`/`log` bare -> italic in KaTeX). Idempotent.
    const norm = (s: string) => cleanupArtifacts(normalizeMathFunctions(normalizeNewlines(s)));

    const text = norm(q.stemOverride ?? rec.stem);
    if (!text.trim()) throw new Error(`Q${num}: empty stem — add a stemOverride`);

    const ov = q.optionOverrides ?? {};
    let base = rec.options ?? [];
    if (base.length === 0 && LABELS.every((l) => ov[l])) {
      base = LABELS.map((l) => ({ label: l, text: ov[l] as string }));
    }
    const options = base.map((o) => ({
      label: o.label,
      text: norm(ov[o.label] ?? o.text),
      isCorrect: o.label === q.answer,
    }));
    if (options.length !== 4) throw new Error(`Q${num}: expected 4 options, got ${options.length} — add optionOverrides`);
    if (options.some((o) => !o.text.trim())) throw new Error(`Q${num}: an option is empty — add optionOverrides (describe the figure) `);
    if (!options.some((o) => o.isCorrect)) throw new Error(`Q${num}: answer ${q.answer} matches no option`);

    return {
      sourceRow: num,
      questionNumber: key,
      subjectName: rec.subject,
      chapterName: q.chapter,
      subtopicName: q.subtopic,
      text,
      difficulty: q.difficulty,
      solution: q.solution ? norm(q.solution) : undefined,
      options,
      contentHash: contentHash(text, options.map((o) => o.text), q.answer),
    };
  });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const shiftId = requireShiftId(process.argv, 2, "commit.ts <shiftId> [--apply]");
  loadEnv();
  const shift = loadShift(shiftId);
  const { sourceFile, pyqYear, pyqMonth, pyqNote } = shift;
  const rows = buildRows(shiftId, shift);

  console.log(`Built ${rows.length} MCQ rows for MHT-CET ${shiftId} (${sourceFile}).`);
  const byChapter = new Map<string, number>();
  for (const r of rows) {
    const k = `${r.subjectName} · ${r.chapterName}`;
    byChapter.set(k, (byChapter.get(k) ?? 0) + 1);
  }
  console.log("\nchapter distribution (any NOT already in taxonomy will auto-create):");
  for (const [k, n] of [...byChapter].sort()) console.log(`  ${k.padEnd(64)} ${n}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", sourceFile)
    .limit(1)
    .maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`upload job: ${jobId}`);

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear,
    pyqMonth,
    pyqNote,
  });
  console.log(`\ncommit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  await client
    .from("questions")
    .update({ upload_job_id: jobId })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile)
    .is("upload_job_id", null);

  // Stay PRIVATE until verified + figures attached; flip-public.ts promotes.
  const { error: vErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
  if (vErr) throw new Error(`visibility flip failed: ${vErr.message}`);
  console.log(`set ${count} MHT-CET rows to PRIVATE.`);

  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
  const total = linked ?? 0;
  await client
    .from("upload_jobs")
    .update({
      status: "COMPLETED",
      total_rows: rows.length,
      inserted: total,
      skipped: Math.max(0, rows.length - total),
      errors_json: result.errors.length ? result.errors : null,
      finished_at: new Date().toISOString(),
    })
    .eq("id", jobId);
  console.log(`finalized upload job (${total} questions linked).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
