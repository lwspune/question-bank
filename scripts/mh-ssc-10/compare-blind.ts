/**
 * Compare a blind re-derivation (data/<id>.blind.json) with the transcription's
 * keys (data/<id>.questions.json). Reports every MCQ as AGREE, DISAGREE or
 * MISSING, so a skipped question cannot pass as an agreement.
 *
 *   npx tsx scripts/mh-ssc-10/compare-blind.ts <paperId> [...]
 *
 * Exits 1 on any DISAGREE or MISSING. A disagreement is a question, never a
 * verdict: the main session re-derives it from the printed page.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, questionsJsonPath, requirePaper } from "./config";
import type { PaperQuestion } from "./lib";

type Blind = { ref: string; answer: string | null; working?: string };

let bad = 0;
for (const id of process.argv.slice(2)) {
  requirePaper(id);
  const mcqs = (JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PaperQuestion[]).filter(
    (q) => q.format === "mcq",
  );
  const path = join(DATA, `${id}.blind.json`);
  if (!existsSync(path)) {
    console.log(`${id}: no blind file`);
    bad++;
    continue;
  }
  const blind = new Map((JSON.parse(readFileSync(path, "utf8")) as Blind[]).map((b) => [b.ref, b]));
  let agree = 0;
  for (const q of mcqs) {
    const b = blind.get(q.ref);
    if (!b) {
      console.log(`  ${id} ${q.ref}: MISSING from the blind file`);
      bad++;
    } else if (b.answer !== q.answer) {
      console.log(`  ${id} ${q.ref}: DISAGREE stored=${q.answer} blind=${b.answer}  ${b.working ?? ""}`);
      bad++;
    } else agree++;
  }
  const extra = [...blind.keys()].filter((r) => !mcqs.some((q) => q.ref === r));
  for (const r of extra) console.log(`  ${id} ${r}: in the blind file but not an MCQ in the paper`);
  console.log(`${id}: ${agree}/${mcqs.length} agree`);
}
process.exit(bad ? 1 : 0);
