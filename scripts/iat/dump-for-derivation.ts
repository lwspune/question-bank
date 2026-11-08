/**
 * Write a solver's payload for one paper: questions in STORED order, figures
 * renamed to stored letters, no key anywhere in the folder.
 *
 *   npx tsx scripts/iat/dump-for-derivation.ts 2025 Biology
 *   npx tsx scripts/iat/dump-for-derivation.ts 2019 Biology --second   # a second, separate folder
 *
 * Why this is a step and not an instruction: in a keyed year the printed order
 * IS IISER's key (a is always right), so the transcription, the page renders
 * and the crops named by printed position all give the answer away. The solver
 * gets only what this writes, in a folder outside scripts/. `--second` writes
 * to `<stem>-second` so two solvers of a no-key year never share a folder.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { blindPayload, paperIssues, type IatPaper } from "./lib";
import { blindDir, dataDir, figureDir, parsePaperArgs } from "./config";

function main() {
  const { year, stem } = parsePaperArgs(process.argv.slice(2), "dump-for-derivation.ts <year> <subject> [--second]");
  const src = join(dataDir(), `${stem}.questions.json`);
  if (!existsSync(src)) throw new Error(`missing transcription: ${src}`);
  const paper = JSON.parse(readFileSync(src, "utf8")) as IatPaper;
  const issues = paperIssues(paper);
  if (issues.length) throw new Error(`REFUSING TO DUMP: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);

  const out = blindDir(process.argv.includes("--second") ? `${stem}-second` : stem);
  mkdirSync(join(out, "figures"), { recursive: true });
  const intruders = readdirSync(out).filter((f) => /key|answer|questions\.json/i.test(f));
  if (intruders.length) throw new Error(`REFUSING TO DUMP: ${out} already holds ${intruders.join(", ")}`);

  const payload = blindPayload(paper, year);
  const missing = payload.copies.filter((c) => !existsSync(join(figureDir(stem), c.from)));
  if (missing.length) throw new Error(`REFUSING TO DUMP: not cropped yet: ${missing.map((m) => m.from).join(", ")}`);
  for (const c of payload.copies) copyFileSync(join(figureDir(stem), c.from), join(out, "figures", c.to));

  const file = join(out, `${stem}.blind.json`);
  writeFileSync(
    file,
    JSON.stringify(
      {
        instructions: "Read scripts/iat/DERIVATION_BRIEF.md. Solve every row; write derived.json beside this file.",
        exam: "IISER Aptitude Test (IAT)",
        subject: payload.subject,
        year: payload.year,
        rows: payload.rows,
      },
      null,
      2
    ),
    "utf8"
  );
  console.log(`${file}\n  ${payload.rows.length} rows, ${payload.copies.length} figure file(s), no answer fields.`);
}

main();
