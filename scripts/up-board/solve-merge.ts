/**
 * Merge two blind solving passes into a transcribed paper.
 *
 *   npx tsx scripts/up-board/solve-merge.ts 2025-822-BW           # report agreement + disputes
 *   npx tsx scripts/up-board/solve-merge.ts 2025-822-BW --apply   # write answers + solutions
 *
 * Reads  data/<id>.questions.json   the transcription (no answers)
 *        derived/<id>.a.json        pass A: every MCQ letter + every solution, English and Hindi
 *        derived/<id>.b.json        pass B: every MCQ letter, blind to pass A
 *        data/<id>.settled.json     (optional) disputes settled by hand: {ref: {answer, en, hi, note}}
 *
 * UP Board publishes no key, so two passes that never saw each other are the
 * check. --apply refuses while any MCQ is disputed and not settled, then
 * writes the solved paper back and runs the solved-stage gate on it.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, SUBJECTS, subtopicCatalog } from "./config";
import { answerSummary, applySolutions, paperIssues, type BlindPass, type Settled, type SolverPass, type UpPaper } from "./lib";

const DERIVED = join(__dirname, "derived");
const read = <T>(f: string): T => JSON.parse(readFileSync(f, "utf8")) as T;

function main() {
  const id = process.argv[2];
  if (!id || id.startsWith("--")) throw new Error("usage: solve-merge.ts <paperId> [--apply]");
  const apply = process.argv.includes("--apply");
  const qFile = join(DATA, `${id}.questions.json`);
  const aFile = join(DERIVED, `${id}.a.json`);
  const bFile = join(DERIVED, `${id}.b.json`);
  const sFile = join(DATA, `${id}.settled.json`);
  for (const f of [qFile, aFile, bFile]) if (!existsSync(f)) throw new Error(`${f} not found`);

  const paper = read<UpPaper>(qFile);
  if (paper.questions.some((q) => q.answer || q.solution)) throw new Error(`${id} is already solved; re-transcribe or edit by hand`);
  const a = read<SolverPass>(aFile);
  const b = read<BlindPass>(bFile);
  const settled: Settled = existsSync(sFile) ? read<Settled>(sFile) : {};

  const mcqs = paper.questions.filter((q) => q.format === "mcq");
  const { agreed, disputed } = answerSummary(mcqs, a.answers, b.answers);
  console.log(`${id}: ${mcqs.length} MCQ, passes agree on ${Object.keys(agreed).length}, disagree on ${disputed.length}; ${Object.keys(settled).length} settled by hand`);
  for (const d of disputed) console.log(`  ${settled[d.ref] ? "settled" : "OPEN   "} ${d.ref}: A ${d.a ?? "-"}  B ${d.b ?? "-"}${settled[d.ref] ? ` -> ${settled[d.ref].answer}` : ""}`);
  const noSolution = paper.questions.filter((q) => !settled[q.ref] && !a.solutions[q.ref]).map((q) => q.ref);
  if (noSolution.length) console.log(`  no pass-A solution: ${noSolution.join(", ")}`);

  if (!apply) {
    console.log("[dry-run] pass --apply to write.");
    return;
  }
  const solved = applySolutions(paper, a, b, settled);
  const issues = paperIssues(solved, subtopicCatalog(SUBJECTS[paper.subject]), "solved");
  if (issues.length) {
    for (const i of issues.slice(0, 40)) console.log(`  - ${i}`);
    throw new Error(`${issues.length} solved-stage error(s); nothing written`);
  }
  writeFileSync(qFile, JSON.stringify(solved, null, 2) + "\n");
  console.log(`wrote ${qFile} (solved stage ok)`);
}

try {
  main();
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
