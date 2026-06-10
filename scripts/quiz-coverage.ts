/**
 * Quiz theme-COVERAGE probe CLI (triage aid, NOT a gate).
 *
 *   npm run quiz:coverage                  # every noted chapter
 *   npm run quiz:coverage nda-maths        # one subject
 *   npm run quiz:coverage nda-maths lines  # one chapter
 *
 * Per chapter it reports:
 *   ✗ STRONG  — concepts that teach formula(s) in prose but whose `formula.latex`
 *               is EMPTY (expose nothing as a recall atom — the Lines case).
 *   ⚠ TRAPS   — `traps`-callout count < 12 (no standalone Common-Traps quiz).
 *   · REVIEW  — prose formulas matched against NO `formula.latex` anywhere in the
 *               chapter (noisy: includes derivation steps + conditions). Shown
 *               only with `--review`.
 *
 * No DB; pure read of NOTES_CHAPTERS. Logic + tests: src/lib/quiz/coverage.ts.
 * See [[quiz-formula-coverage-gap]]. NOT a gate — confirm before enriching.
 */
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";
import { conceptCoverage, chapterFormulaGaps, trapCalloutCount } from "../src/lib/quiz/coverage";

const TRAP_MIN = 12;

function main() {
  const args = process.argv.slice(2);
  const review = args.includes("--review");
  const [route, chapter] = args.filter((a) => !a.startsWith("--"));
  const chapters = NOTES_CHAPTERS.filter(
    (c) => (!route || c.subjectRoute === route) && (!chapter || c.chapterSlug === chapter)
  );
  if (chapters.length === 0) {
    console.error(`no NOTES_CHAPTERS match ${route ?? "*"}/${chapter ?? "*"}`);
    process.exit(2);
  }

  console.log(`Quiz coverage probe — ${chapters.length} chapter(s)${review ? " (--review)" : ""}\n${"=".repeat(60)}`);
  let strongTotal = 0;
  for (const reg of chapters) {
    const concepts = Object.values(reg.notes).flatMap((n) => n.concepts) as Parameters<typeof conceptCoverage>[0][];
    const strong = concepts.map((c) => conceptCoverage(c)).filter((r) => r.flagged);
    const traps = trapCalloutCount(concepts as { traps?: unknown[] }[]);
    const gaps = review ? chapterFormulaGaps(concepts) : [];
    strongTotal += strong.length;

    const trapWarn = traps < TRAP_MIN;
    if (strong.length === 0 && !trapWarn && gaps.length === 0) {
      console.log(`\n## ${reg.subjectRoute}/${reg.chapterSlug}  ✓ (${concepts.length} concepts, ${traps} traps)`);
      continue;
    }
    console.log(`\n## ${reg.subjectRoute}/${reg.chapterSlug}  (${concepts.length} concepts, ${traps} traps)`);
    for (const r of strong) console.log(`  ✗ ${r.slug}: ${r.reason}`);
    if (trapWarn) console.log(`  ⚠ traps ${traps} < ${TRAP_MIN} → no standalone Common-Traps quiz`);
    for (const g of gaps) console.log(`  · ${g.slug}: \\(${g.formula}\\)`);
  }
  console.log(
    `\n${strongTotal} STRONG formula gap(s) (empty formula.latex). ` +
      `${review ? "REVIEW (·) lines are noisy — derivations/conditions look like formulas; confirm before enriching." : "Re-run with --review to list per-formula chapter-wide gaps (noisy)."}`
  );
}

main();
