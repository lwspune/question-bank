// Commit one worksheets chapter into the bank — PRIVATE, question_kind='practice' —
// via the existing commitStaged pipeline (dedup / taxonomy auto-create / content_hash)
// + an upload_jobs row.
//
//   npx tsx scripts/worksheets/commit.ts <chapterId>          # dry-run
//   npx tsx scripts/worksheets/commit.ts <chapterId> --apply  # write
//
// Reads the source Excel files directly (they stay pristine); every repair
// lives in data/<chapterId>.overrides.json. Idempotent: re-running upserts on
// (org_id, exam_id, content_hash); the post-commit UPDATE re-stamps
// kind+visibility for the chapter's source_file.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { findLatexImbalance } from "../practice/lib";
import { buildWorksheetRows, letterDistribution, type Flag, type ShufflePlan, type WorksheetOverride } from "./lib";
import { requireChapter, ORG_ID, EXAM_ID, CREATED_BY, DATA } from "./config";
import { readChapterQuestions } from "./read";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const overridesPath = join(DATA, `${chapter.id}.overrides.json`);
  const overrides: Record<string, WorksheetOverride> = existsSync(overridesPath)
    ? JSON.parse(readFileSync(overridesPath, "utf8"))
    : {};
  const shufflesPath = join(DATA, `${chapter.id}.shuffles.json`);
  const shuffles: ShufflePlan = existsSync(shufflesPath)
    ? JSON.parse(readFileSync(shufflesPath, "utf8"))
    : {};

  const files = readChapterQuestions(chapter);
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const excluded: string[] = [];
  const usedOverrides = new Set<string>();

  for (const f of files) {
    const res = buildWorksheetRows(
      { chapterName: chapter.chapterName, subtopicName: f.subtopicName, fileIndex: f.fileIndex },
      f.questions,
      overrides,
      shuffles
    );
    rows.push(...res.rows);
    flags.push(...res.flags);
    excluded.push(...res.excluded);
    for (const q of f.questions) {
      const id = `${String(f.fileIndex).padStart(2, "0")}-${q.row}`;
      if (overrides[id]) usedOverrides.add(id);
    }
  }

  // Every override must land on a real question — a stale key means the source
  // moved and the repair would silently not apply.
  const stale = Object.keys(overrides).filter((k) => !k.startsWith("_") && !usedOverrides.has(k));
  if (stale.length) throw new Error(`overrides with no matching question: ${stale.join(", ")}`);

  console.log(`Built ${rows.length} rows for "${chapter.chapterName}" (${excluded.length} excluded, ${Object.keys(shuffles).length} rebalance shuffles).`);

  // Correct-letter balance report — the source generates keys skewed toward
  // A/B, so an unbalanced chapter should get a plan-shuffles pass before PUBLIC.
  const dist = letterDistribution(
    rows.map((r) => ({ id: r.questionNumber!, answer: r.options.find((o) => o.isCorrect)!.label, eligible: true }))
  );
  const distLine = (["A", "B", "C", "D"] as const)
    .map((l) => `${l} ${dist[l]} (${Math.round((100 * dist[l]) / rows.length)}%)`)
    .join("  ");
  const skewed = (["A", "B", "C", "D"] as const).some(
    (l) => dist[l] / rows.length < 0.18 || dist[l] / rows.length > 0.32
  );
  console.log(`correct-letter balance: ${distLine}${skewed ? "  << SKEWED — run plan-shuffles" : ""}`);
  const bySub = new Map<string, number>();
  for (const r of rows) bySub.set(r.subtopicName!, (bySub.get(r.subtopicName!) ?? 0) + 1);
  console.log("\nby subtopic:");
  for (const [k, n] of bySub) console.log(`  ${k.padEnd(50)} ${n}`);

  const applied = Object.entries(overrides).filter(([k]) => !k.startsWith("_"));
  if (applied.length) {
    console.log(`\noverrides applied (${applied.length}):`);
    for (const [id, o] of applied.sort(([a], [b]) => a.localeCompare(b))) {
      const kind = o.exclude
        ? "EXCLUDE"
        : [o.answer && "key", o.options && "options", o.solution && "solution", o.stem && "stem"].filter(Boolean).join("+");
      console.log(`  ${id} [${kind}] ${o.reason}`);
    }
  }

  if (flags.length) {
    console.log(`\nflags (${flags.length}) — review before flipping PUBLIC:`);
    for (const f of flags.sort((a, b) => a.id.localeCompare(b.id))) console.log(`  ${f.id}: ${f.reason}`);
  }

  const latexErrors: string[] = [];
  for (const r of rows) {
    const fields: [string, string | undefined][] = [
      ["stem", r.text],
      ["solution", r.solution],
      ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string]),
    ];
    for (const [name, val] of fields) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) latexErrors.push(`${r.questionNumber} ${name}: ${bad}`);
    }
  }
  if (latexErrors.length) {
    console.log(`\nLaTeX imbalances (${latexErrors.length}):`);
    for (const e of latexErrors) console.log(`  ${e}`);
  } else {
    console.log("\nLaTeX delimiters balanced across all stems/options/solutions.");
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (latexErrors.length) throw new Error("refusing to commit with LaTeX imbalances — fix via overrides first.");

  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const sourceFile = chapter.sourceFile;

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
  console.log(`\nupload job: ${jobId}`);

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: null,
    pyqNote: chapter.note,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE", question_kind: "practice" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='practice'.`);

  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
  await client
    .from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: linked ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
