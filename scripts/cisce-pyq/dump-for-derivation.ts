/**
 * Emit a BLIND derivation payload — questions only, key structurally absent.
 *
 *   npx tsx scripts/cisce-pyq/dump-for-derivation.ts icse-10 2025 Mathematics
 *
 * WHY THIS IS A SEPARATE STEP AND NOT A CONVENTION:
 *
 * For 2025 the source document interleaves the official answer with the
 * questions — p11 of the Mathematics APUP carries subpart (xv) and the MARKING
 * SCHEME block on the SAME PAGE. So a deriver handed page images, or handed the
 * data directory, is contaminated by construction, and no instruction to
 * "ignore the key" can undo that.
 *
 * This writes the question half to a directory that contains NO key file, and
 * REFUSES to write if the transcription carries an answer-shaped field or a key
 * file would land beside it. Withholding at dump time is the only enforceable
 * form of the rule; asking an agent not to look is not a control. See
 * [[blind-check-contamination]].
 *
 * Figures: a 2025 deriver cannot be pointed at the page images (the key is on
 * them), so each row's figure is copied in as its own crop, from
 * <sourceRoot>/figures/<stem>/<file>.png (crop-figures.py). A row whose figure is
 * `required` and not yet cropped stops the dump: a deriver solving from a
 * described figure is guessing.
 *
 * The output directory is deliberately OUTSIDE scripts/ so a deriver told to
 * read it cannot walk up into the sibling .key.json.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { paperIssues, type CiscePaper } from "./lib";
import { figureFile } from "./config";
import { blindRoot, dataDir, figureRoot, parsePaperArgs } from "./exams";

function main() {
  const { exam, stem } = parsePaperArgs(process.argv.slice(2), "dump-for-derivation.ts <exam> <year> <subject>");
  const src = join(dataDir(exam), `${stem}.questions.json`);
  if (!existsSync(src)) throw new Error(`missing transcription: ${src}`);
  const paper = JSON.parse(readFileSync(src, "utf8")) as CiscePaper;

  // paperIssues includes the answer-shaped-field check, which is the one that
  // matters here: the dump is only blind if the thing it copies is.
  const issues = paperIssues(paper);
  if (issues.length) {
    throw new Error(`REFUSING TO DUMP: the transcription has ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
  }

  const outDir = join(blindRoot(exam), stem);
  mkdirSync(join(outDir, "figures"), { recursive: true });
  const intruders = readdirSync(outDir).filter((f) => /key|answer/i.test(f));
  if (intruders.length) {
    throw new Error(`REFUSING TO DUMP: ${outDir} already contains ${intruders.join(", ")}.`);
  }

  const missing: string[] = [];
  for (const r of paper.rows) {
    if (!r.figure) continue;
    const crop = join(figureRoot(exam), stem, figureFile(r.ref));
    if (existsSync(crop)) copyFileSync(crop, join(outDir, "figures", figureFile(r.ref)));
    else if (r.figure.required !== false) missing.push(r.ref);
  }
  if (missing.length) {
    throw new Error(`REFUSING TO DUMP: required figure(s) not cropped yet: ${missing.join(", ")}`);
  }

  const payload = {
    instructions: "Read scripts/cisce-pyq/DERIVATION_BRIEF.md. Solve every row; write derived.json beside this file.",
    exam: paper.exam,
    subject: paper.subject,
    year: paper.year,
    rows: paper.rows.map((r) => ({
      ref: r.ref,
      section: r.section,
      marks: r.marks,
      format: r.format,
      ...(r.instruction ? { instruction: r.instruction } : {}),
      ...(r.context ? { context: r.context } : {}),
      text: r.text,
      ...(r.options ? { options: r.options } : {}),
      ...(r.choice ? { orAlternativeOf: `Question ${r.choice}` } : {}),
      // A figure that was not cropped (not required: its data is all in the
      // text) is passed as its description only, never as a file that is absent.
      ...(r.figure
        ? existsSync(join(outDir, "figures", figureFile(r.ref)))
          ? { figure: { file: `figures/${figureFile(r.ref)}`, note: r.figure.note ?? "" } }
          : { figureDescription: r.figure.note ?? "" }
        : {}),
    })),
  };

  const out = join(outDir, `${stem}.blind.json`);
  writeFileSync(out, JSON.stringify(payload, null, 2), "utf8");
  console.log(`blind payload -> ${out}`);
  console.log(`  ${payload.rows.length} rows, ${paper.rows.filter((r) => r.figure).length} figures, no answer fields.`);
}

main();
