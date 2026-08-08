/**
 * Commit one settled mock paper into the bank — PRIVATE, question_kind='practice'.
 *
 *   npx tsx scripts/nda-mock/commit.ts m1           # dry-run
 *   npx tsx scripts/nda-mock/commit.ts m1 --apply   # write
 *
 * Inputs (both committed to the repo, so a commit is reproducible):
 *   data/<id>.extract.json       — stems, options, printed key, solutions
 *   data/<id>.adjudication.json  — blind derivation + verdict + classification
 *
 * A question is committed ONLY with a settled answer (`resolved`). Anything
 * still DISAGREE/UNRESOLVED is reported and skipped rather than shipped on the
 * printed key alone — the paper's key has already been proven wrong more than
 * once, so "the source said so" is not sufficient grounds to publish.
 *
 * Dedup: content_hash is unique per (org, exam), so a question identical to one
 * already in the NDA bank is dropped by the DB. Every such drop is REPORTED
 * (the user's explicit choice) so the overlap stays visible.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { buildRecords, findLatexImbalance, type MockQuestion, type Catalog } from "./lib";
import { requirePaper, DATA, ORG_ID, EXAM_ID, CREATED_BY, SUBJECT_NAME } from "./config";
import type { ExtractedQuestion } from "./extract";
import type { Adjudicated } from "./adjudicate";

function loadEnv() {
  require("dotenv").config({
    path: join(process.cwd(), ".env.local"),
    override: true,
  });
}

/** Read the live chapter -> subtopics map so classification cannot invent one. */
async function liveCatalog(client: SupabaseClient): Promise<Catalog> {
  const { data: subject, error: sErr } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", EXAM_ID)
    .eq("name", SUBJECT_NAME)
    .single();
  if (sErr) throw new Error(`subject lookup failed: ${sErr.message}`);

  const { data: chapters, error: cErr } = await client
    .from("chapters")
    .select("name,subtopics(name)")
    .eq("subject_id", subject.id);
  if (cErr) throw new Error(`chapter lookup failed: ${cErr.message}`);

  const out: Catalog = {};
  for (const c of chapters ?? []) {
    out[c.name] = ((c.subtopics ?? []) as { name: string }[]).map((s) => s.name);
  }
  return out;
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const paper = requirePaper(id);
  loadEnv();

  const extractPath = join(DATA, `${paper.id}.extract.json`);
  const adjPath = join(DATA, `${paper.id}.adjudication.json`);
  if (!existsSync(adjPath)) {
    throw new Error(`no adjudication for ${paper.id} — run dump-blind + the agent pass + adjudicate first`);
  }

  const extracted: ExtractedQuestion[] = JSON.parse(readFileSync(extractPath, "utf8"));
  const adjudicated: Adjudicated[] = JSON.parse(readFileSync(adjPath, "utf8"));
  const adj = new Map(adjudicated.map((a) => [a.number, a]));

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const catalog = await liveCatalog(client);

  const unsettled = adjudicated.filter((a) => !a.resolved);
  if (unsettled.length) {
    console.log(`\n${unsettled.length} unsettled question(s) — NOT committed:`);
    for (const u of unsettled) {
      console.log(
        `  Q${u.number} [${u.verdict}] key=${u.printedKey} blind=${u.blindAnswer} ${u.notes.slice(0, 90)}`,
      );
    }
  }

  const questions: MockQuestion[] = extracted.map((e) => {
    const a = adj.get(e.number);
    return {
      number: e.number,
      numberLabel: e.numberLabel,
      stem: e.stem,
      options: e.options,
      context: e.context,
      setLabel: e.setLabel,
      solution: e.solution,
      answer: a?.resolved ?? null,
      chapter: a?.chapter ?? "",
      subtopic: a?.subtopic ?? "",
      difficulty: a?.difficulty ?? "MODERATE",
    };
  });

  const { rows, flags } = buildRecords(questions, catalog, {
    subjectName: SUBJECT_NAME,
  });

  console.log(`\n=== ${paper.label} — ${rows.length} rows ready (of ${extracted.length}) ===`);
  const byChapter = new Map<string, number>();
  for (const r of rows) byChapter.set(r.chapterName, (byChapter.get(r.chapterName) ?? 0) + 1);
  console.log("\nby chapter:");
  for (const [k, n] of [...byChapter].sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(38)} ${n}`);

  if (flags.length) {
    console.log(`\nflags (${flags.length}):`);
    for (const f of flags) console.log(`  Q${f.number}: ${f.reason}`);
  }

  const latexErrors: string[] = [];
  for (const r of rows) {
    const fields: [string, string | undefined][] = [
      ["stem", r.text],
      ["context", r.context],
      ["solution", r.solution],
      ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string]),
    ];
    for (const [name, val] of fields) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) latexErrors.push(`Q${r.questionNumber} ${name}: ${bad}`);
    }
  }
  if (latexErrors.length) {
    console.log(`\nLaTeX imbalances (${latexErrors.length}):`);
    for (const e of latexErrors) console.log(`  ${e}`);
  } else {
    console.log("\nLaTeX delimiters balanced across all stems/contexts/options/solutions.");
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (latexErrors.length) throw new Error("refusing to commit with LaTeX imbalances — fix the source first.");

  const sourceFile = paper.sourceFile;
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
      .insert({
        org_id: ORG_ID,
        filename: sourceFile,
        created_by: CREATED_BY,
        status: "PROCESSING",
        total_rows: rows.length,
      })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: null,
    pyqNote: paper.note,
  });
  console.log(`\ncommit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // Report which questions the DB deduped away, so the overlap with the
  // existing NDA corpus stays visible instead of silently vanishing.
  if (result.skipped > 0) {
    const hashes = rows.map((r) => r.contentHash);
    const { data: mine } = await client
      .from("questions")
      .select("content_hash,source_file,question_number")
      .eq("exam_id", EXAM_ID)
      .in("content_hash", hashes);
    const elsewhere = (mine ?? []).filter((m) => m.source_file !== sourceFile);
    console.log(`\ndeduped against existing bank rows (${elsewhere.length}):`);
    for (const m of elsewhere) {
      const r = rows.find((x) => x.contentHash === m.content_hash);
      console.log(`  Q${r?.questionNumber} == ${m.source_file} Q${m.question_number}`);
    }
  }

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
    .update({
      status: "COMPLETED",
      total_rows: linked ?? 0,
      inserted: result.inserted,
      skipped: result.skipped,
      finished_at: new Date().toISOString(),
    })
    .eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
