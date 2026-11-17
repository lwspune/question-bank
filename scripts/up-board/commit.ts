/**
 * Commit one SOLVED UP Board paper: PRIVATE, question_kind 'pyq', English rows
 * through commitStaged, then the Hindi print (with its Hindi solution) of every
 * row as a translation (migration 0118), then figures.
 *
 *   npx tsx scripts/up-board/commit.ts 2025-822-BW          # dry-run
 *   npx tsx scripts/up-board/commit.ts 2025-822-BW --apply
 *
 * Refuses unless the paper passes the solved-stage gate (lib.paperIssues) and
 * every figure row has its crop, free of the printed watermark. PRIVATE is
 * written AT INSERT, so an unreviewed row is never public, not even briefly.
 *
 * Rollback: every row carries the paper's source_file, so
 *     delete from questions where source_file = '<lib.sourceFileFor>';
 * removes exactly this paper (translations cascade).
 *
 * Re-running is safe: commitStaged skips an existing content_hash, the
 * solution is synced in place (it is not hashed) and the translation RPC
 * upserts. Editing a STEM, an option or a key changes content_hash: delete by
 * source_file first, or the edit inserts a second row.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { uploadImage } from "../../src/lib/storage/images";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";
import { CREATED_BY, DATA, ORG_ID, SUBJECTS, examIdFor, subtopicCatalog } from "./config";
import { buildRows, paperIssues, parityWarnings, pyqNoteFor, sourceFileFor, type UpPaper } from "./lib";

const EXPECT_MCQ: Partial<Record<string, number>> = { maths10: 20, science10: 20 };
export const figurePath = (paperId: string, ref: string) => join(__dirname, "figures", paperId, `${ref}.png`);
const nl = (s: string) => normalizeNewlines(s);

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!id || id.startsWith("--")) throw new Error("usage: commit.ts <paperId> [--apply]");

  const paper = JSON.parse(readFileSync(join(DATA, `${id}.questions.json`), "utf8")) as UpPaper;
  const subject = SUBJECTS[paper.subject];
  const examId = examIdFor(subject.cls);
  if (!examId) throw new Error(`EXAM_ID_UP_${subject.cls} is empty in config.ts: run seed-exam.ts --apply first`);
  const src = sourceFileFor(paper);

  const errs = paperIssues(paper, subtopicCatalog(subject), "solved", { expectMcq: EXPECT_MCQ[subject.key] });
  const figureRefs = paper.questions.filter((q) => q.figure).map((q) => q.ref);
  for (const ref of figureRefs) {
    const path = figurePath(id, ref);
    if (!existsSync(path)) {
      errs.push(`${ref}: figure not cropped (${path})`);
      continue;
    }
    const wm = figureWatermarkIssue(ref, await checkFigureFile(path), undefined);
    if (wm) errs.push(wm);
  }
  const rows = buildRowsSafe(paper, errs);
  const hashes = rows.map((r) => r.contentHash);
  if (new Set(hashes).size !== hashes.length) errs.push("two rows of this paper share a content_hash");

  console.log(`${id}  ${subject.subjectName} (Class ${subject.cls})  source_file ${src}  note "${pyqNoteFor(paper)}"`);
  console.log(`${rows.length} rows: ${rows.filter((r) => r.questionFormat === "mcq").length} mcq, ${rows.filter((r) => r.questionFormat === "subjective").length} written; figures ${figureRefs.join(", ") || "none"}`);
  const warnings = paper.questions.flatMap(parityWarnings);
  if (warnings.length) console.log(`parity warnings: ${warnings.length} (validate.ts lists them)`);
  if (errs.length) {
    for (const e of errs.slice(0, 40)) console.log(`  - ${e}`);
    throw new Error(`${errs.length} error(s): nothing written`);
  }
  if (!apply) {
    console.log("[dry-run] ok; pass --apply to write.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // A re-commit must not silently take a published paper private.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", src)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0) throw new Error(`${publicBefore} row(s) of ${src} are PUBLIC already; this script only writes PRIVATE`);

  const res = await commitStaged(client, {
    orgId: ORG_ID,
    examId,
    filename: src,
    createdBy: CREATED_BY,
    rows,
    pyqYear: paper.year,
    pyqMonth: null, // the board sits in Feb-March; the paper prints no date
    pyqNote: pyqNoteFor(paper),
    visibility: "PRIVATE",
    questionKind: "pyq",
  });
  console.log(`commit: inserted ${res.inserted}, skipped ${res.skipped}, failed ${res.failed}`);
  for (const e of res.errors) console.log(`  row ${e.sourceRow}: ${e.message}`);
  if (res.failed) throw new Error("commit failed");

  // This paper's rows, by content_hash within its own source_file. A row that
  // deduped into another paper's identical question is that paper's row: it is
  // named, never touched.
  type Row = { id: string; content_hash: string; solution: string | null; image_url: string | null; options: { id: string; label: string }[] };
  const mine = new Map<string, Row>();
  for (let i = 0; i < hashes.length; i += 150) {
    const { data, error } = await client
      .from("questions")
      .select("id, content_hash, solution, image_url, options(id, label)")
      .eq("exam_id", examId)
      .eq("source_file", src)
      .in("content_hash", hashes.slice(i, i + 150));
    if (error) throw new Error(`read-back failed: ${error.message}`);
    for (const r of data as Row[]) mine.set(r.content_hash, r);
  }
  const absorbed = paper.questions.filter((_, i) => !mine.has(hashes[i])).map((q) => q.ref);
  if (absorbed.length) console.log(`  ${absorbed.length} row(s) already in the bank under another paper, left as they are: ${absorbed.join(", ")}`);

  let synced = 0;
  let translated = 0;
  let figures = 0;
  const problems: string[] = [];
  for (let i = 0; i < paper.questions.length; i++) {
    const q = paper.questions[i];
    const row = mine.get(hashes[i]);
    if (!row) continue;
    const solution = nl(q.solution!);
    if (row.solution !== solution) {
      const { error } = await client.from("questions").update({ solution }).eq("id", row.id);
      if (error) problems.push(`${q.ref}: solution sync: ${error.message}`);
      else synced++;
    }
    const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
    if (q.format === "mcq" && opts.length !== 4) {
      problems.push(`${q.ref}: ${opts.length} options in the bank`);
      continue;
    }
    const { error: tErr } = await client.rpc("put_question_translation", {
      p_question_id: row.id,
      p_lang: "hi",
      p_text: nl(q.hi.stem),
      p_context: q.hi.context ? nl(q.hi.context) : null,
      p_solution: q.hi.solution ? nl(q.hi.solution) : null,
      p_options: q.format === "mcq" ? opts.map((o, k) => ({ option_id: o.id, text: nl(q.hi.options![k]) })) : [],
    });
    if (tErr) problems.push(`${q.ref}: translation: ${tErr.message}`);
    else translated++;
    if (q.figure && !row.image_url) {
      const url = await uploadImage(client, ORG_ID, readFileSync(figurePath(id, q.ref)), "image/png");
      const { error: fErr } = await client.from("questions").update({ image_url: url }).eq("id", row.id);
      if (fErr) problems.push(`${q.ref}: image_url: ${fErr.message}`);
      else figures++;
    }
  }
  console.log(`solutions synced ${synced}, Hindi written ${translated}, figures uploaded ${figures}`);

  const { count: stillPublic } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", src)
    .eq("visibility", "PUBLIC");
  if (stillPublic) problems.push(`${stillPublic} row(s) of ${src} are PUBLIC: run update questions set visibility='PRIVATE' where source_file='${src}'`);
  if (problems.length) {
    for (const p of problems) console.log(`  !! ${p}`);
    throw new Error(`${problems.length} problem(s) after the insert`);
  }
  console.log(`verified: ${mine.size} row(s) of ${src}, all PRIVATE.`);
}

function buildRowsSafe(paper: UpPaper, errs: string[]) {
  try {
    return buildRows(paper, SUBJECTS[paper.subject]);
  } catch (e) {
    errs.push((e as Error).message);
    return [];
  }
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
