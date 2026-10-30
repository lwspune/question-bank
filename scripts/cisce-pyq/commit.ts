/**
 * Commit one ISC paper — PRIVATE, question_kind='pyq' — and attach its figures.
 *
 *   npx tsx scripts/cisce-pyq/commit.ts icse-10 2025 Mathematics          # dry run
 *   npx tsx scripts/cisce-pyq/commit.ts icse-10 2025 Mathematics --apply  # write
 *
 * Reads the transcription, the blind derivation, CISCE's key (2025), the second
 * derivation (2026) and the adjudication file, and refuses on ANY issue
 * `assemblePaper` raises: an unread disagreement never reaches the bank.
 * Run seed.ts first: commitStaged refuses an unknown SUBJECT.
 *
 * Re-runnable. content_hash covers stem + options + answer, so an unchanged row
 * is skipped by the upsert — and then this script RE-SYNCS the unhashed fields
 * (solution, difficulty, image_url) onto it, so a solution fix is a re-run. A
 * change to a HASHED field inserts a new row beside the old one: delete the old
 * one first (`delete from questions where source_file = '<sourceFile>'` rolls
 * back a whole paper).
 *
 * Rows go in PRIVATE via commitStaged's own `visibility`, so there is no window
 * in which an unreviewed transcription is public (the CBSE lane flipped after
 * the insert and once left 52 rows live when that UPDATE timed out).
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import type { OfficialAnswer } from "./crosscheck";
import {
  assemblePaper, paperIssues, pyqNoteFor, sourceFileFor,
  type Adjudication, type DerivedEntry, type CiscePaper,
} from "./lib";
import { CREATED_BY, ORG_ID, figureFile } from "./config";
import { dataDir, derivationPath, figureRoot, parsePaperArgs } from "./exams";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";

const BUCKET = "question-images";
const DIFF = { Easy: "EASY", Moderate: "MODERATE", Hard: "HARD" } as const;

const readJson = <T>(p: string): T | undefined =>
  existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : undefined;

async function main() {
  const { exam, stem } = parsePaperArgs(process.argv.slice(2), "commit.ts <exam> <year> <subject> [--apply]");
  const apply = process.argv.includes("--apply");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const data = dataDir(exam);
  const paper = readJson<CiscePaper>(join(data, `${stem}.questions.json`));
  if (!paper) throw new Error(`no transcription for ${stem}`);
  const derived = readJson<{ answers: DerivedEntry[] }>(derivationPath(exam, stem, "derived"));
  if (!derived) throw new Error(`no derivation for ${stem}`);
  const key = readJson<{ answers: OfficialAnswer[] }>(join(data, `${stem}.key.json`));
  const second = readJson<{ answers: DerivedEntry[] }>(derivationPath(exam, stem, "second"));
  const adj = readJson<{ adjudications: Adjudication[] }>(join(data, `${stem}.adjudication.json`));

  const issues = paperIssues(paper);
  const { rows, issues: aIssues } = assemblePaper({
    paper, derived: derived.answers, key: key?.answers, second: second?.answers,
    adjudications: adj?.adjudications,
  });
  issues.push(...aIssues);
  const missingFig = rows.filter(
    (r) => r.figure && r.figure.required !== false && !existsSync(join(figureRoot(exam), stem, figureFile(r.ref)))
  );
  for (const r of missingFig) issues.push(`${r.ref}: required figure not cropped`);
  // Every figure that will be uploaded is checked for a printed watermark
  // (scripts/lib/figures/watermark.ts); a flagged one is refused until a
  // person has cleaned it or recorded figure.watermark = "none".
  for (const r of rows) {
    if (!r.figure || r.figure.required === false || missingFig.includes(r)) continue;
    const fraction = await checkFigureFile(join(figureRoot(exam), stem, figureFile(r.ref)));
    const wm = figureWatermarkIssue(r.ref, fraction, r.figure.watermark);
    if (wm) issues.push(wm);
  }
  if (issues.length) {
    console.error(`REFUSING: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
    process.exit(1);
  }

  const payload: ParsedRowPayload[] = rows.map((r, i) => {
    const base = {
      sourceRow: i + 1,
      questionNumber: r.questionNumber,
      subjectName: paper.subject,
      chapterName: r.chapter,
      subtopicName: r.subtopic,
      text: r.text,
      difficulty: DIFF[r.difficulty],
      solution: r.solution,
      ...(r.context ? { context: r.context } : {}),
    };
    return r.format === "subjective"
      ? { ...base, questionFormat: "subjective", options: [], contentHash: subjectiveContentHash(r.text, r.context ?? null) }
      : {
          ...base,
          questionFormat: "mcq",
          options: r.options!.map((o) => ({ label: o.label, text: o.text, isCorrect: o.isCorrect })),
          contentHash: contentHash(r.text, r.options!.map((o) => o.text), r.answer!),
        };
  });
  const src = sourceFileFor(exam, paper.year, paper.subject);
  const held = paper.rows.length - rows.length;
  console.log(`${exam.examName} ${paper.subject} ${paper.year}: ${payload.length} rows (${held} held)  source_file=${src}`);
  console.log(`  mcq ${rows.filter((r) => r.format === "mcq").length} | subjective ${rows.filter((r) => r.format === "subjective").length} | figures ${rows.filter((r) => r.figure && r.figure.required !== false).length}`);
  console.log(`  distinct content_hash: ${new Set(payload.map((p) => p.contentHash)).size} of ${payload.length}`);
  if (new Set(payload.map((p) => p.contentHash)).size !== payload.length) {
    throw new Error("two rows of this paper share a content_hash; one would be silently dropped");
  }
  if (!apply) return console.log("\nDRY RUN: pass --apply to write.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: examRow, error: eErr } = await client.from("exams").select("id").eq("name", exam.examName).single();
  if (eErr || !examRow) throw new Error(`exam "${exam.examName}" not found: run seed.ts first`);

  const res = await commitStaged(client, {
    orgId: ORG_ID,
    examId: examRow.id,
    filename: src,
    createdBy: CREATED_BY,
    rows: payload,
    pyqYear: paper.year,
    pyqMonth: null,
    pyqNote: pyqNoteFor(exam, paper.year, paper.subject, paper.paperCode),
    visibility: "PRIVATE",
    questionKind: "pyq",
  });
  console.log(`inserted ${res.inserted} | skipped ${res.skipped} | failed ${res.failed}`);
  for (const e of res.errors) console.log(`  row ${e.sourceRow}: ${e.message}`);
  if (res.failed) process.exit(1);

  // Re-sync the unhashed fields onto every row of THIS paper, by id. Scoped to
  // source_file so a row that deduped into another paper's question is never
  // touched (the CBSE lane once flipped a live textbook row that way).
  let synced = 0;
  let figures = 0;
  for (let i = 0; i < payload.length; i++) {
    const p = payload[i];
    const r = rows[i];
    const { data: hit, error } = await client
      .from("questions")
      .select("id")
      .eq("org_id", ORG_ID)
      .eq("exam_id", examRow.id)
      .eq("source_file", src)
      .eq("content_hash", p.contentHash);
    if (error) throw new Error(`${r.ref}: lookup failed: ${error.message}`);
    if (!hit?.length) {
      console.log(`  ${r.ref}: deduped into a row outside this paper; left as it is`);
      continue;
    }
    const update: Record<string, string> = { solution: p.solution!, difficulty: p.difficulty };
    if (r.figure && r.figure.required !== false) {
      const bytes = readFileSync(join(figureRoot(exam), stem, figureFile(r.ref)));
      // The object name carries a hash of the bytes, so a re-cropped figure
      // (the 2026 watermark removal, 2026-10-30) gets a NEW public URL and no
      // browser or CDN can keep serving the old image from cache.
      const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 10);
      const objectKey = `${exam.slug}-pyq/${stem.toLowerCase()}/${figureFile(r.ref).replace(/\.png$/, "")}-${hash}.png`;
      const { error: upErr } = await client.storage
        .from(BUCKET)
        .upload(objectKey, bytes, { contentType: "image/png", upsert: true });
      if (upErr) throw new Error(`${r.ref}: figure upload failed: ${upErr.message}`);
      update.image_url = client.storage.from(BUCKET).getPublicUrl(objectKey).data.publicUrl;
      figures++;
    }
    const { error: uErr } = await client.from("questions").update(update).eq("id", hit[0].id);
    if (uErr) throw new Error(`${r.ref}: sync failed: ${uErr.message}`);
    synced++;
  }
  console.log(`synced solution/difficulty on ${synced} row(s); ${figures} figure(s) attached`);

  const { count } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examRow.id)
    .eq("source_file", src)
    .eq("visibility", "PUBLIC");
  console.log(`PUBLIC rows for ${src}: ${count ?? "?"}`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
