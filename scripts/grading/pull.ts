/**
 * npm run grading:pull: fetch every answer sheet waiting to be graded into
 * grading-inbox/ (gitignored: it holds students' scans).
 *
 *   npm run grading:pull                        # every waiting sheet not already pulled
 *   npm run grading:pull -- --force             # re-pull, overwriting brief + scans + pages (never grade.json)
 *   npm run grading:pull -- --id=<uuid>         # one sheet in ANY state (a regrade after a question):
 *                                               # a graded sheet's grade.json is its saved grade and marks
 *   npm run grading:pull -- --id=<uuid> --fresh # a re-mark: an empty template instead, so the
 *                                               # new marking is not anchored to the old
 *
 * Per sheet, grading-inbox/<submission id>/ gets:
 *   scans/01.jpg ...  the student's files, as uploaded
 *   pages/01.jpg ...  the pages to read and mark: upright where the photo says
 *                     so, PDFs split into pages (scripts/grading/pages.py)
 *   grid/01.jpg ...   the same pages under a labelled 0-100 grid, to place marks by
 *   brief.md          the paper as printed: marks, OR and part markers, model answers
 *   grade.json        the template to fill (its outcomes start empty, which the
 *                     checker refuses, so nothing passes unread)
 * Open questions about grades go to grading-inbox/questions.md.
 *
 * Then grade by scripts/grading/GRADING.md: grading:preview, then grading:commit.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildBrief, gradeTemplate } from "../../src/lib/answerSheets/brief";
import {
  downloadScans,
  loadGradingPaper,
  readOpenQuestions,
  readQueue,
  readSavedGrade,
  readSheet,
  readSheetMeta,
} from "../../src/lib/answerSheets/grader";
import { INBOX, fail, runPages } from "./inbox";

async function main() {
  const only = process.argv.find((a) => a.startsWith("--id="))?.slice(5);
  const force = process.argv.includes("--force") || !!only;
  const fresh = process.argv.includes("--fresh");
  if (fresh && !only) throw new Error("--fresh needs --id=<uuid>: it replaces that sheet's grade.json.");
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  mkdirSync(INBOX, { recursive: true });

  const queue = only ? [await readSheet(admin, only)] : await readQueue(admin);
  const now = Date.now();
  console.log(`${queue.length} answer sheet(s) ${only ? "requested" : "waiting"}.`);
  for (const s of queue) {
    const dir = join(INBOX, s.id);
    const hours = Math.floor((now - Date.parse(s.submittedAt)) / 3_600_000);
    if (existsSync(join(dir, "brief.md")) && !force) {
      console.log(`  ${s.id}  already pulled  (${hours} h waiting)`);
      continue;
    }
    const meta = only ? await readSheetMeta(admin, s.id) : null;
    if (meta?.scansDeleted) throw new Error(`${s.id}: its scans were deleted 30 days after checking; it cannot be regraded.`);
    const { paper, items, questions } = await loadGradingPaper(admin, s.paperId);
    const scans = await downloadScans(admin, s.userId, s.id);
    rmSync(join(dir, "scans"), { recursive: true, force: true });
    mkdirSync(join(dir, "scans"), { recursive: true });
    for (const f of scans) writeFileSync(join(dir, "scans", f.name), f.bytes);

    // The pages the grader reads and marks, turned as they were at the last
    // commit (the saved marks are on the turned pages). A preview drawn before
    // this pull is stale; grading:commit refuses until a fresh one is drawn.
    rmSync(join(dir, "preview"), { recursive: true, force: true });
    const turns = meta?.pageTurns?.some((t) => t !== 0) ? [`--turns=${meta.pageTurns.join(",")}`] : [];
    const pages = runPages("prepare", dir, ...turns) as unknown[];

    writeFileSync(
      join(dir, "brief.md"),
      buildBrief({ submissionId: s.id, paper, items, questions, fileCount: scans.length, pageCount: pages.length })
    );
    const gradePath = join(dir, "grade.json");
    const saved = only && !fresh ? await readSavedGrade(admin, s.id) : null;
    if (saved) writeFileSync(gradePath, `${JSON.stringify(saved, null, 2)}\n`);
    else if (fresh || !existsSync(gradePath)) writeFileSync(gradePath, `${JSON.stringify(gradeTemplate(s.id, items), null, 2)}\n`);

    const flag = scans.length !== s.fileCount ? `  WARNING: ${scans.length} of ${s.fileCount} files found` : "";
    const note = saved ? "  [saved grade loaded]" : fresh ? "  [fresh template: re-mark]" : "";
    console.log(`  ${s.id}  ${paper.title}  ${scans.length} file(s), ${pages.length} page(s)  (${hours} h waiting)${flag}${note}`);
  }

  const open = await readOpenQuestions(admin);
  if (open.length > 0) {
    const lines = ["# Open grade questions", ""];
    for (const q of open) {
      lines.push(`- ${q.submissionId} position ${q.position} (${q.createdAt.slice(0, 10)}): ${q.message}`);
    }
    lines.push(
      "",
      "Re-read that question in the sheet, fix grade.json if the student is right, add an answer to",
      "grading-inbox/<id>/answers.json as [{\"position\": N, \"answer\": \"...\"}], and re-run grading:commit.",
      ""
    );
    writeFileSync(join(INBOX, "questions.md"), lines.join("\n"));
  }
  console.log(`${open.length} open grade question(s)${open.length ? ": see grading-inbox/questions.md" : ""}.`);
}

main().catch(fail);
