/**
 * Merge the per-band transcription files into one question list, and gate it.
 *
 *   npx tsx scripts/upsc/merge.ts 2025-p1           # dry-run: report only
 *   npx tsx scripts/upsc/merge.ts 2025-p1 --apply   # write data/<id>.merged.json
 *
 * Reads   data/<paperId>.b*.json   (one per transcription band)
 * Writes  data/<paperId>.merged.json
 *
 * Four gates, in order, and the run STOPS at the first that fails:
 *
 *   1. BAND AGREEMENT  — two bands reporting the same item must agree, option
 *                        ORDER included. A disagreement is two readings of one
 *                        page; it is resolved against the page by a human, never
 *                        by picking whichever file sorted first.
 *   2. CATALOG         — subject and chapter hard-validated against catalog.json,
 *                        and scoped to the subjects this PAPER may use.
 *   3. COVERAGE        — every item 1..N present exactly once. This is the gate
 *                        that catches a band that quietly stopped early, and it
 *                        is the reason bands are told to report on territory they
 *                        do not own: a duplicate is free, a gap is silent.
 *   4. STRUCTURE       — 4 options, none blank, balanced LaTeX, pipe tables with
 *                        their separator row, no content_hash collisions.
 *
 * Gate 4 runs against PLACEHOLDER answers, because at this stage no answer exists
 * yet — the whole point of this pipeline is that the booklet has no key. The
 * placeholder is used ONLY to satisfy the shared row shape and is never written
 * anywhere; commit.ts re-runs the same gate against the real derived answers.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, catalog, dataPath, pattern, requirePaper } from "./config";
import {
  buildRecords,
  mergeBands,
  normalizeQuestions,
  validateCatalog,
  validateRows,
  findLonelyContexts,
  assignSetLabels,
  type Band,
  type Derivation,
  type TQ,
} from "./lib";

function loadBands(paperId: string): Band[] {
  // Match ONLY <paperId>.b<N>.json. A bare `<paperId>.*.json` glob would also
  // swallow .merged.json, .answers.json and every scratch artifact that lands in
  // this directory — a sibling pipeline shipped exactly that bug and came within
  // one coincidental duplicate ref of ingesting a dump file as 10 questions.
  const re = new RegExp(`^${paperId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.b\\d+\\.json$`);
  const files = readdirSync(DATA).filter((f) => re.test(f)).sort();
  if (!files.length) throw new Error(`no band files matching <${paperId}.bN.json> in ${DATA}`);

  return files.map((f) => {
    const raw = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    if (!Array.isArray(raw?.questions)) throw new Error(`${f}: no "questions" array`);
    return { ...raw, questions: normalizeQuestions(raw.questions) } as Band;
  });
}

function main() {
  const args = process.argv.slice(2);
  const id = args.find((a) => !a.startsWith("--"));
  const paper = requirePaper(id);
  const apply = args.includes("--apply");
  const pat = pattern(paper);

  const bands = loadBands(paper.id);
  console.log(`${paper.id}  Paper ${paper.paper}  expecting ${pat.questions} items`);
  for (const b of bands) {
    const r = b.bandReport ?? ({} as Band["bandReport"]);
    console.log(
      `  ${b.band.padEnd(4)} pages ${(b.pages ?? []).join(",").padEnd(18)} ` +
        `${String(b.questions.length).padStart(3)} q  ` +
        `first=${r.firstComplete ?? "?"} last=${r.lastComplete ?? "?"}` +
        (r.notes ? `\n        note: ${r.notes}` : "")
    );
  }
  console.log();

  const fail = (label: string, errs: string[]) => {
    console.log(`GATE ${label}: FAILED (${errs.length})`);
    for (const e of errs.slice(0, 40)) console.log(`  - ${e}`);
    if (errs.length > 40) console.log(`  ... and ${errs.length - 40} more`);
    process.exit(1);
  };

  // --- 1. band agreement ---------------------------------------------------
  const { questions, errors: bandErrs } = mergeBands(bands);
  if (bandErrs.length) fail("1 BAND AGREEMENT", bandErrs);
  console.log(`GATE 1 BAND AGREEMENT: ok (${questions.length} distinct items from ${bands.length} bands)`);

  // --- 2. catalog ----------------------------------------------------------
  const { errors: catErrs, warnings } = validateCatalog(questions, catalog(), paper.paper);
  if (catErrs.length) fail("2 CATALOG", catErrs);
  console.log(`GATE 2 CATALOG: ok`);
  if (warnings.length) {
    console.log(`  ${warnings.length} subtopic warning(s) — these are how the catalog gets extended:`);
    for (const w of warnings) console.log(`    ~ ${w}`);
  }

  // --- 3. coverage ---------------------------------------------------------
  const nums = new Set(questions.map((q) => q.number));
  const missing: number[] = [];
  for (let n = 1; n <= pat.questions; n++) if (!nums.has(n)) missing.push(n);
  const extra = [...nums].filter((n) => n < 1 || n > pat.questions).sort((a, b) => a - b);
  const covErrs = [
    ...missing.map((n) => `missing Q${n}`),
    ...extra.map((n) => `Q${n} is outside 1..${pat.questions}`),
  ];
  if (covErrs.length) fail("3 COVERAGE", covErrs);
  console.log(`GATE 3 COVERAGE: ok (1..${pat.questions}, none missing, none out of range)`);

  // --- 3b. sets ------------------------------------------------------------
  // Items sharing a passage become a SET, which commitStaged turns into a
  // `set_id`. That is what makes /browse and the Word export render the passage
  // ONCE above its questions instead of repeating it on every card, and what
  // makes a later correction to a passage mirror to its siblings.
  //
  // Derived here from the transcribed passages rather than asked of the
  // transcription agents, so it cannot disagree with what they read.
  let sets: TQ[];
  try {
    sets = assignSetLabels(questions);
  } catch (e) {
    fail("3b SETS", [(e as Error).message]);
    return;
  }
  const setCount = new Set(sets.filter((q) => q.setLabel).map((q) => q.setLabel)).size;
  const inSets = sets.filter((q) => q.setLabel).length;
  console.log(`GATE 3b SETS: ok (${setCount} set(s) covering ${inSets} item(s))`);

  // --- 4. structure --------------------------------------------------------
  const placeholder: Derivation[] = sets.map((q) => ({
    number: q.number,
    answer: "A",
    value: "(placeholder - merge-time structural check only)",
    confidence: "LOW",
    reasoning: "",
  }));
  const placeholderRows = buildRecords(sets, placeholder);
  const structErrs = validateRows(placeholderRows, 1, pat.questions);
  if (structErrs.length) fail("4 STRUCTURE", structErrs);
  console.log(`GATE 4 STRUCTURE: ok`);

  const lonely = findLonelyContexts(placeholderRows);
  if (lonely.length) {
    console.log(`\n  ${lonely.length} lonely-context warning(s) — read each, they are not all defects:`);
    for (const w of lonely) console.log(`    ~ ${w}`);
  }

  // --- report --------------------------------------------------------------
  const bySubject = new Map<string, number>();
  for (const q of sets) bySubject.set(q.subject, (bySubject.get(q.subject) ?? 0) + 1);
  console.log(`\nsubject spread:`);
  for (const [s, n] of [...bySubject.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${s}`);
  }
  const withContext = sets.filter((q) => q.context).length;
  if (paper.paper === 2) console.log(`\n${withContext} of ${questions.length} items carry a shared context.`);
  else if (withContext) console.log(`\n!! ${withContext} Paper I item(s) carry a context — Paper I has no shared passages.`);

  if (!apply) {
    console.log(`\n[dry-run] all gates passed. Pass --apply to write the merged file.`);
    return;
  }
  const out = dataPath(paper.id, "merged");
  writeFileSync(out, JSON.stringify({ paper: paper.id, questions: sets }, null, 2) + "\n");
  console.log(`\nwrote ${out}`);
}

main();
