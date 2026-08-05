// Compare the blind re-derivation verdicts against the source answer keys.
//
//   npx tsx scripts/worksheets/compare.ts <chapterId>
//
// Reads data/<chapterId>.derived.json — the merged agent output, an array of
//   { id, derived: "A".."D", confidence: "high"|"medium"|"low", note? }
// — and prints every disagreement (source key vs derived) plus any question
// the agents skipped. Every disagreement must be adjudicated by hand (the
// maintainer re-derives it) before an override is written; the agents' verdict
// is evidence, never authority.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA } from "./config";
import { readChapterQuestions } from "./read";
import { questionId } from "./lib";

type Verdict = { id: string; derived: string; confidence: string; note?: string };

const chapter = requireChapter(process.argv[2]);
const verdicts: Verdict[] = JSON.parse(readFileSync(join(DATA, `${chapter.id}.derived.json`), "utf8"));
const byId = new Map(verdicts.map((v) => [v.id, v]));

const files = readChapterQuestions(chapter);
let total = 0;
let agree = 0;
const disagreements: { id: string; source: string; derived: string; confidence: string; note?: string; stem: string }[] = [];
const missing: string[] = [];

for (const f of files) {
  for (const q of f.questions) {
    const id = questionId(f.fileIndex, q.row);
    total++;
    const v = byId.get(id);
    if (!v) {
      missing.push(id);
      continue;
    }
    if (v.derived.trim().toUpperCase() === q.answer) agree++;
    else
      disagreements.push({
        id,
        source: q.answer,
        derived: v.derived.trim().toUpperCase(),
        confidence: v.confidence,
        note: v.note,
        stem: q.stem.slice(0, 90),
      });
  }
}

console.log(`${total} questions | ${agree} agree | ${disagreements.length} disagree | ${missing.length} unverified`);
if (missing.length) console.log(`\nunverified: ${missing.join(", ")}`);
if (disagreements.length) {
  console.log(`\n--- disagreements (adjudicate each by hand) ---`);
  for (const d of disagreements.sort((a, b) => a.id.localeCompare(b.id))) {
    console.log(`${d.id}  source=${d.source}  derived=${d.derived}  [${d.confidence}]`);
    console.log(`    ${d.stem}`);
    if (d.note) console.log(`    note: ${d.note}`);
  }
}
