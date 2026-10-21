/**
 * npm run grading:preview -- <submission id>: draw grade.json's marks onto the
 * student's pages, for the grader to LOOK AT before committing (migration 0175).
 *
 * Writes grading-inbox/<id>/preview/NN.jpg (the pages as the student will see
 * them), preview/report.pdf (the report the student downloads: the summary,
 * then these pages) and preview/stamp.json. grading:commit refuses unless the
 * stamp matches the current grade.json: change a mark, or a mark's score, and
 * the preview must be drawn and looked at again.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { loadGradingPaper, readSheet, readSheetMeta } from "../../src/lib/answerSheets/grader";
import { checkSheet, reportPayload } from "../../src/lib/answerSheets/marking";
import { INBOX, fail, preparedPageCount, runPages } from "./inbox";

const gradedOn = () =>
  new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

async function main() {
  const id = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!id) throw new Error("Usage: npm run grading:preview -- <submission id>");
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const dir = join(INBOX, id);
  const file = JSON.parse(readFileSync(join(dir, "grade.json"), "utf8")) as { submissionId?: string };
  if (file.submissionId !== id) throw new Error(`grade.json is for ${file.submissionId}, not ${id}.`);

  const sheet = await readSheet(admin, id);
  const meta = await readSheetMeta(admin, id);
  const { paper, items } = await loadGradingPaper(admin, sheet.paperId);
  const check = checkSheet({ items, totalMarks: paper.totalMarks, file, pageCount: preparedPageCount(dir, id) });
  if (!check.ok) {
    console.error(`grade.json has ${check.errors.length} problem(s):`);
    for (const e of check.errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  const out = join(dir, "preview");
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out);
  writeFileSync(join(out, "marks.json"), check.payloadJson);
  const drawn = runPages("draw", dir) as string[];
  const payload = reportPayload({ title: meta.paperTitle, gradedOn: gradedOn(), totalMax: paper.totalMarks, check });
  writeFileSync(join(out, "report.json"), JSON.stringify(payload));
  runPages("report", dir);
  writeFileSync(join(out, "stamp.json"), `${JSON.stringify({ stamp: check.stamp }, null, 2)}\n`);

  console.log(`Drew ${check.marks.length} mark(s) on ${drawn.length} page(s). Read EVERY page before committing:`);
  for (let n = 1; n <= drawn.length; n++) console.log(`  grading-inbox/${id}/preview/${String(n).padStart(2, "0")}.jpg`);
  console.log(`The student's report (summary + these pages): grading-inbox/${id}/preview/report.pdf`);
  console.log("A mark in the wrong place: fix its x/y in grade.json and run this again.");
}

main().catch(fail);
