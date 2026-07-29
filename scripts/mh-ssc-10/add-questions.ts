/**
 * Add a FEW questions to an ALREADY-COMMITTED board paper, without disturbing
 * the rows already there.
 *
 *   npx tsx scripts/mh-ssc-10/add-questions.ts geo-2016            # dry run
 *   npx tsx scripts/mh-ssc-10/add-questions.ts geo-2016 --apply
 *   …--apply --public                                              # also flip the new rows PUBLIC
 *
 * Reads `data/<id>.additions.json` — a `PaperQuestion[]` in the same shape as
 * the main questions file — and commits ONLY those rows.
 *
 * Why this exists instead of re-running `commit.ts`: that script finishes with
 *   update({visibility:'PRIVATE', question_kind:'pyq'}).eq('source_file', …)
 * scoped to the WHOLE paper, so re-committing a shipped paper to pick up one new
 * question would silently flip every already-PUBLIC row back to PRIVATE. This
 * script scopes both the insert and the follow-up update to the new refs only.
 *
 * Dedup still applies: `commitStaged` upserts on (org_id, exam_id, content_hash),
 * so a ref whose stem already exists verbatim elsewhere in the exam is skipped
 * rather than duplicated — that is the per-exam dedup working, not an error.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { buildPaperRecords, latexImbalances, type PaperQuestion } from "./lib";
import { ORG_ID, EXAM_ID, CREATED_BY, DATA, requirePaper, paperCatalogs } from "./config";

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const makePublic = process.argv.includes("--public");
  const paper = requirePaper(id);
  const catalogs = paperCatalogs(paper);
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const path = join(DATA, `${id}.additions.json`);
  if (!existsSync(path)) throw new Error(`no additions file: ${path}`);
  const questions: PaperQuestion[] = JSON.parse(readFileSync(path, "utf8"));
  if (questions.length === 0) throw new Error("additions file is empty");

  const { rows, flags } = buildPaperRecords(catalogs, questions);
  const refs = rows.map((r) => r.questionNumber!).filter(Boolean);

  console.log(`\n${apply ? "APPLY" : "[dry-run]"} add ${rows.length} question(s) to ${paper.subjectName} ${paper.year} (${id})`);
  for (const r of rows) {
    console.log(`  ${r.questionNumber}  [${r.questionFormat ?? "mcq"}]  ${r.chapterName} / ${r.subtopicName}`);
    console.log(`    ${r.text.slice(0, 100)}…`);
  }
  if (flags.length) {
    console.log(`\nflags (${flags.length}):`);
    for (const f of flags) console.log(`  ${f.ref}: ${f.reason}`);
  }
  const latexErrors = latexImbalances(rows);
  console.log(latexErrors.length ? `\nLaTeX imbalances:\n  ${latexErrors.join("\n  ")}` : "LaTeX delimiters balanced.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Refuse to run if a ref already exists — this script ADDS, it never edits.
  const { data: clash, error: cErr } = await client
    .from("questions")
    .select("question_number")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .in("question_number", refs);
  if (cErr) throw new Error(`pre-check failed: ${cErr.message}`);
  if (clash && clash.length > 0) {
    throw new Error(
      `these refs already exist for ${paper.sourceFile}: ${clash.map((c) => c.question_number).join(", ")}. ` +
        `This script only ADDS; editing an existing stem changes content_hash and orphans the old row.`
    );
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }

  const { data: job } = await client
    .from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", paper.sourceFile).limit(1).maybeSingle();

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: paper.sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: job?.id,
    pyqYear: paper.year,
    pyqMonth: paper.month,
    pyqNote: paper.note,
  });
  console.log(`\ncommit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // Scope the follow-up update to the NEW refs only — never the whole paper.
  const { error: uErr, count } = await client
    .from("questions")
    .update(
      { question_kind: "pyq", ...(makePublic ? { visibility: "PUBLIC" } : { visibility: "PRIVATE" }) },
      { count: "exact" }
    )
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .in("question_number", refs);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} NEW row(s) to ${makePublic ? "PUBLIC" : "PRIVATE"} + question_kind='pyq'.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
