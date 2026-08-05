// Emit BLIND verification packets for a chapter — one JSON per worksheet file,
// carrying stem + options ONLY (no key, no solution — the source solutions
// conclude answers, so including them would break the blindness). The
// re-derivation agents read these and return their own answers.
//
//   npx tsx scripts/worksheets/dump-verify.ts <chapterId>
//
// Writes out/<chapterId>/verify-<NN>.json
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, OUT } from "./config";
import { readChapterQuestions } from "./read";
import { questionId } from "./lib";

const chapter = requireChapter(process.argv[2]);
const dir = join(OUT, chapter.id);
mkdirSync(dir, { recursive: true });

const files = readChapterQuestions(chapter);
for (const f of files) {
  const packet = f.questions.map((q) => ({
    id: questionId(f.fileIndex, q.row),
    stem: q.stem,
    options: { A: q.options[0], B: q.options[1], C: q.options[2], D: q.options[3] },
  }));
  const out = join(dir, `verify-${String(f.fileIndex).padStart(2, "0")}.json`);
  writeFileSync(out, JSON.stringify({ subtopic: f.subtopicName, questions: packet }, null, 2));
  console.log(`${out}  (${packet.length} q)`);
}
