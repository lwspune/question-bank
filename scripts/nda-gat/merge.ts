/**
 * Merge one paper's per-band transcription files into `data/<id>.questions.json`.
 *
 *   npx tsx scripts/nda-gat/merge.ts 2026-2           # dry-run: report only
 *   npx tsx scripts/nda-gat/merge.ts 2026-2 --apply   # write the merged file
 *
 * Reads every `data/<paperId>.b*.json` band file, merges, and runs the coverage,
 * SECTION, catalog and SET gates. It REFUSES to write when two bands disagree
 * about a question: that means two agents read one page differently, which is a
 * finding to resolve against the page, not a duplicate to settle by whichever
 * file was listed last.
 *
 * The glob is ANCHORED to `<paperId>.b<name>.json` on purpose. A loose
 * `<paperId>.*.json` would also swallow the derivation dumps, the variant maps
 * and every scratch artifact in data/ — which has silently ingested non-question
 * files AS QUESTIONS in two sibling pipelines in this repo.
 *
 * SUBTOPIC IS AN ERROR HERE, NOT A WARNING. All nine NDA GAT subjects are
 * post-cleanup and their taxonomy is closed, so an unlisted name is a near-miss
 * that commitStaged would auto-create — see dump-catalog.ts.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { DATA, QUESTIONS_PER_PAPER, catalog, dataPath, requirePaper } from "./config";
import {
  mergeBands,
  normalizeQuestions,
  validateCatalog,
  validateSections,
  validateSets,
  ENGLISH_SUBJECT,
  PART_A_LAST,
  type Band,
  type GatTQ,
} from "./lib";

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const bandRe = new RegExp(
    `^${paper.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.b[A-Za-z0-9]+\\.json$`
  );
  const files = readdirSync(DATA)
    .filter((f) => bandRe.test(f))
    .sort();
  if (!files.length) throw new Error(`no band files matching ${paper.id}.b<name>.json in ${DATA}`);

  const bands: Band[] = files.map((f) => {
    const b = JSON.parse(readFileSync(`${DATA}/${f}`, "utf8")) as Band;
    return { ...b, questions: normalizeQuestions(b.questions as unknown[]) };
  });

  console.log(`${paper.id}: ${files.length} band file(s)`);
  for (const b of bands) {
    const ns = b.questions.map((q) => q.number);
    const span = ns.length ? `${Math.min(...ns)}-${Math.max(...ns)}` : "(empty)";
    const pages = (b as unknown as { bandReport?: { printedPages?: number[] } }).bandReport
      ?.printedPages;
    console.log(
      `  ${String(b.band).padEnd(4)} printed ${String((pages ?? []).join(",")).padEnd(16)} ${String(b.questions.length).padStart(3)} q  ${span}`
    );
    // The band report is the only thing that can catch a question NOBODY owns.
    if (b.bandReport?.firstComplete === false)
      console.log(`         ! first question continues from the previous page`);
    if (b.bandReport?.lastComplete === false)
      console.log(`         ! last question continues overleaf`);
  }

  const { questions: merged, errors: mergeErrors } = mergeBands(bands);
  const questions = merged as GatTQ[];

  // Coverage against the paper's own declared length, both ways.
  const nums = new Set(questions.map((q) => q.number));
  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!nums.has(n)) missing.push(n);
  const extra = questions.map((q) => q.number).filter((n) => n < 1 || n > QUESTIONS_PER_PAPER);

  const { errors: catErrors } = validateCatalog(questions, catalog(), { strictSubtopics: true });
  const sectionErrors = validateSections(questions);
  const setErrors = validateSets(questions);

  // The section split is what /mock rebuilds, so report it as /mock will see it.
  const english = questions.filter((q) => q.subject === ENGLISH_SUBJECT).length;
  const gk = questions.length - english;
  console.log(
    `\nmerged ${questions.length} questions — English ${english} (want 50), General Knowledge ${gk} (want 100)`
  );

  const bySubject = new Map<string, number>();
  for (const q of questions) bySubject.set(q.subject, (bySubject.get(q.subject) ?? 0) + 1);
  console.log(`\nsubject mix:`);
  for (const [s, n] of [...bySubject.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${s.padEnd(18)} ${String(n).padStart(3)}`);
  }

  const mix = new Map<string, number>();
  for (const q of questions) mix.set(`${q.subject} / ${q.chapter}`, (mix.get(`${q.subject} / ${q.chapter}`) ?? 0) + 1);
  console.log(`\nchapter mix (${mix.size} chapters):`);
  for (const [c, n] of [...mix.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${c.padEnd(52)} ${String(n).padStart(3)}`);
  }

  const diff = new Map<string, number>();
  for (const q of questions) diff.set(q.difficulty, (diff.get(q.difficulty) ?? 0) + 1);
  console.log(`\ndifficulty: ${[...diff.entries()].map(([d, n]) => `${d} ${n}`).join("  ")}`);

  const sets = new Map<string, number[]>();
  for (const q of questions) {
    if (!q.setLabel) continue;
    if (!sets.has(q.setLabel)) sets.set(q.setLabel, []);
    sets.get(q.setLabel)!.push(q.number);
  }
  if (sets.size) {
    const inSets = [...sets.values()].reduce((a, v) => a + v.length, 0);
    console.log(`\nshared-context sets: ${sets.size} (${inSets} questions)`);
    for (const [s, ns] of sets) console.log(`  ${s.padEnd(20)} Q${ns.join(", Q")}`);
  }

  // Underlines are load-bearing in Part A and are ink on a photograph — there is
  // no text layer to lose them, so a Part A question whose stem names no
  // underlined target is worth surfacing even though it is not an error.
  const underlined = questions.filter((q) => q.stem.includes("\\underline{")).length;
  console.log(`\nstems carrying \\underline: ${underlined} (Part A is Q1-${PART_A_LAST})`);

  const tables = questions.filter((q) => /\|\s*-+\s*\|/.test(q.stem)).length;
  console.log(`stems carrying a GFM pipe table: ${tables}`);

  const figures = questions.filter((q) => q.hasFigure);
  console.log(`figure-bearing questions: ${figures.length}${figures.length ? ` — ${figures.map((q) => `Q${q.number}`).join(", ")}` : ""}`);

  const flagged = questions.filter((q) => (q.flags ?? []).length);
  if (flagged.length) {
    console.log(`\ntranscription flags (${flagged.length} question(s)):`);
    for (const q of flagged) for (const f of q.flags!) console.log(`  Q${q.number}: ${f}`);
  }

  const errors = [
    ...mergeErrors,
    ...catErrors,
    ...sectionErrors,
    ...setErrors,
    ...(missing.length ? [`missing question(s): ${missing.join(", ")}`] : []),
    ...(extra.length
      ? [`question number(s) outside 1-${QUESTIONS_PER_PAPER}: ${extra.join(", ")}`]
      : []),
  ];
  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.questions.json. Nothing written.`);
    return;
  }
  if (errors.length)
    throw new Error("refusing to write a merged file with errors — fix the transcription first.");

  writeFileSync(dataPath(paper.id, "questions"), JSON.stringify(questions, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "questions")} (${questions.length} questions).`);
}

main();
