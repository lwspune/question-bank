/**
 * npm run grading:pull: fetch every answer sheet waiting to be graded into
 * grading-inbox/ (gitignored: it holds students' scans).
 *
 *   npm run grading:pull               # every waiting sheet not already pulled
 *   npm run grading:pull -- --force    # re-pull, overwriting brief + scans (never grade.json)
 *   npm run grading:pull -- --id=<uuid> # one sheet in ANY state (a regrade after a question):
 *                                        # a graded sheet's grade.json is written from its saved grades
 *
 * Per sheet, grading-inbox/<submission id>/ gets:
 *   scans/01.jpg ...  the student's pages, in upload order
 *   brief.md          the paper as printed: marks, OR and part markers, model answers
 *   grade.json        the template to fill (its outcomes start empty, which the
 *                     checker refuses, so nothing passes unread)
 * Open questions about grades go to grading-inbox/questions.md.
 *
 * Then grade one sheet per fresh session by scripts/grading/GRADING.md, and
 * run npm run grading:commit -- <id>.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
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
} from "../../src/lib/answerSheets/grader";

const INBOX = join(process.cwd(), "grading-inbox");

async function main() {
  const only = process.argv.find((a) => a.startsWith("--id="))?.slice(5);
  const force = process.argv.includes("--force") || !!only;
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  mkdirSync(INBOX, { recursive: true });

  const queue = only ? [await readSheet(admin, only)] : await readQueue(admin);
  const now = Date.now();
  console.log(`${queue.length} answer sheet(s) waiting.`);
  for (const s of queue) {
    const dir = join(INBOX, s.id);
    const hours = Math.floor((now - Date.parse(s.submittedAt)) / 3_600_000);
    if (existsSync(join(dir, "brief.md")) && !force) {
      console.log(`  ${s.id}  already pulled  (${hours} h waiting)`);
      continue;
    }
    const { paper, items, questions } = await loadGradingPaper(admin, s.paperId);
    const scans = await downloadScans(admin, s.userId, s.id);
    mkdirSync(join(dir, "scans"), { recursive: true });
    for (const f of scans) writeFileSync(join(dir, "scans", f.name), f.bytes);
    writeFileSync(
      join(dir, "brief.md"),
      buildBrief({ submissionId: s.id, paper, items, questions, fileCount: scans.length })
    );
    const gradePath = join(dir, "grade.json");
    if (!existsSync(gradePath)) writeFileSync(gradePath, `${JSON.stringify(gradeTemplate(s.id, items), null, 2)}\n`);
    const flag = scans.length !== s.fileCount ? `  WARNING: ${scans.length} of ${s.fileCount} files found` : "";
    console.log(`  ${s.id}  ${paper.title}  ${scans.length} file(s)  (${hours} h waiting)${flag}`);
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

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
