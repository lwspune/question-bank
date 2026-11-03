/**
 * Check a revision-sheet draft's evidence (2026-11-03):
 * `npm run revision:evidence -- <sheet.ts> <evidence.json> <chapterDir>`,
 * where <chapterDir> is the folder revision:prepare wrote (book.txt, pyqs.txt).
 *
 * Every key point, derivation and diagram must cite a quote that is really in
 * the book, and every most-asked topic's years must be exactly the years of
 * the past-paper lines it cites. Also runs the sheet checker. Read-only;
 * prints "clean" or the problems, exits 1 on any. Core: evidenceCore.ts.
 */
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { lintRevisionSheet } from "@/lib/board/revision/lint";
import type { RevisionSheet } from "@/lib/board/revision/types";
import { checkRevisionEvidence, type RevisionEvidence } from "./evidenceCore";

(async () => {
  const [sheetPath, evidencePath, dir] = process.argv.slice(2);
  if (!sheetPath || !evidencePath || !dir) {
    console.error("usage: npm run revision:evidence -- <sheet.ts> <evidence.json> <chapterDir>");
    process.exit(2);
  }
  const sheet = ((await import(pathToFileURL(resolve(sheetPath)).href)) as { default: RevisionSheet }).default;
  const ev = JSON.parse(readFileSync(evidencePath, "utf8")) as RevisionEvidence;
  const book = readFileSync(join(dir, "book.txt"), "utf8");
  const pyqs = readFileSync(join(dir, "pyqs.txt"), "utf8").split("\n").filter((l) => /^\d{4} /.test(l));
  const problems = [...lintRevisionSheet(sheet), ...checkRevisionEvidence(sheet, ev, book, pyqs)];
  if (problems.length === 0) console.log(`${sheetPath}: clean (sheet + evidence)`);
  else {
    console.log(`${sheetPath}: ${problems.length} problem(s)`);
    for (const p of problems) console.log(`  - ${p}`);
  }
  process.exit(problems.length ? 1 : 0);
})();
