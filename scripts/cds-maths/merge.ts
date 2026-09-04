/**
 * Merge one paper's per-band transcription files into `data/<id>.questions.json`.
 *
 *   npx tsx scripts/cds-maths/merge.ts <paperId>          # dry-run: report only
 *   npx tsx scripts/cds-maths/merge.ts <paperId> --apply  # write the merged file
 *
 * Reads every `data/<paperId>.b*.json` band file, merges, and runs the coverage,
 * catalog and SET gates. It REFUSES to write when two bands disagree about a
 * question: that means two agents read one page differently, which is a finding
 * to resolve against the page, not a duplicate to settle by whichever file was
 * listed last.
 *
 * The glob is ANCHORED to `<paperId>.b<digits>.json` on purpose. A loose
 * `<paperId>.*.json` would also swallow the derivation dumps, the crosstab and
 * every scratch artifact that lands in data/ — which has silently ingested
 * non-question files as questions in two sibling pipelines in this repo.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { DATA, QUESTIONS_PER_PAPER, catalog, dataPath, requirePaper } from "./config";
import { mergeBands, normalizeQuestions, validateCatalog, validateSets, type Band } from "./lib";

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const bandRe = new RegExp(`^${paper.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.b[A-Za-z0-9]+\\.json$`);
  const files = readdirSync(DATA).filter((f) => bandRe.test(f)).sort();
  if (!files.length) throw new Error(`no band files matching ${paper.id}.b<name>.json in ${DATA}`);

  const bands: Band[] = files.map((f) => {
    const b = JSON.parse(readFileSync(`${DATA}/${f}`, "utf8")) as Band;
    return { ...b, questions: normalizeQuestions(b.questions as unknown[]) };
  });

  console.log(`${paper.id}: ${files.length} band file(s)`);
  for (const b of bands) {
    const ns = b.questions.map((q) => q.number);
    const span = ns.length ? `${Math.min(...ns)}-${Math.max(...ns)}` : "(empty)";
    console.log(
      `  ${b.band.padEnd(4)} pages ${String(b.pages.join(",")).padEnd(12)} ${String(b.questions.length).padStart(3)} q  ${span}`
    );
    // The band report is the only thing that can catch a question NOBODY owns.
    if (b.bandReport?.firstComplete === false) console.log(`         ! first question continues from the previous page`);
    if (b.bandReport?.lastComplete === false) console.log(`         ! last question continues overleaf`);
  }

  const { questions, errors: mergeErrors } = mergeBands(bands);

  // Coverage against the paper's own declared length, both ways.
  const nums = new Set(questions.map((q) => q.number));
  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!nums.has(n)) missing.push(n);
  const extra = questions.map((q) => q.number).filter((n) => n < 1 || n > QUESTIONS_PER_PAPER);

  const { errors: catErrors, warnings: catWarnings } = validateCatalog(questions, catalog());
  const setErrors = validateSets(questions);

  // Chapter mix — the headline measurement of the pilot, and cheap to print here.
  const mix = new Map<string, number>();
  for (const q of questions) mix.set(q.chapter, (mix.get(q.chapter) ?? 0) + 1);
  console.log(`\nmerged ${questions.length} questions. Chapter mix:`);
  for (const [c, n] of [...mix.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${c.padEnd(40)} ${String(n).padStart(3)}`);
  }

  const sets = new Map<string, number>();
  for (const q of questions) if (q.setLabel) sets.set(q.setLabel, (sets.get(q.setLabel) ?? 0) + 1);
  if (sets.size) {
    console.log(`\nDirections sets (${sets.size}):`);
    for (const [s, n] of sets) console.log(`  ${s.padEnd(40)} ${n} item(s)`);
  }

  const figures = questions.filter((q) => q.hasFigure);
  console.log(`\nfigure-bearing questions: ${figures.length}`);
  if (figures.length) console.log(`  ${figures.map((q) => `Q${q.number}`).join(", ")}`);

  const flagged = questions.filter((q) => (q.flags ?? []).length);
  if (flagged.length) {
    console.log(`\ntranscription flags (${flagged.length} question(s)):`);
    for (const q of flagged) for (const f of q.flags!) console.log(`  Q${q.number}: ${f}`);
  }

  if (catWarnings.length) {
    console.log(`\nsubtopic warnings (${catWarnings.length}) — soft. On an early paper these are`);
    console.log(`the catalog-extension work list, not typos to reject:`);
    for (const w of catWarnings) console.log(`  ${w}`);
  }

  const errors = [
    ...mergeErrors,
    ...catErrors,
    ...setErrors,
    ...(missing.length ? [`missing question(s): ${missing.join(", ")}`] : []),
    ...(extra.length ? [`question number(s) outside 1-${QUESTIONS_PER_PAPER}: ${extra.join(", ")}`] : []),
  ];
  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.questions.json. Nothing written.`);
    return;
  }
  if (errors.length) throw new Error("refusing to write a merged file with errors — fix the transcription first.");

  writeFileSync(dataPath(paper.id, "questions"), JSON.stringify(questions, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "questions")} (${questions.length} questions).`);
}

main();
