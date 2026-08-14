// Emit a BLIND recheck packet containing only the rows where pass 1 disagreed
// with the source key. Same shape as dump-verify's packets (stem + options,
// NO key, NO solution, and NO pass-1 verdict) so pass 2 is genuinely
// independent rather than a review of pass 1.
//
//   npx tsx scripts/worksheets/recheck.ts <chapterId>
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA, OUT } from "./config";
import { readChapterQuestions } from "./read";
import { questionId } from "./lib";

const chapter = requireChapter(process.argv[2]);
type Verdict = { id: string; derived: string; confidence: string; note?: string };
const verdicts: Verdict[] = JSON.parse(readFileSync(join(DATA, `${chapter.id}.derived.json`), "utf8"));
const byId = new Map(verdicts.map((v) => [v.id, v]));

const LETTERS = ["A", "B", "C", "D"];
const out: { id: string; subtopic: string; stem: string; options: Record<string, string> }[] = [];
for (const f of readChapterQuestions(chapter)) {
  for (const q of f.questions) {
    const id = questionId(f.fileIndex, q.row);
    const v = byId.get(id);
    if (!v) continue;
    if (v.derived.trim().toUpperCase() === q.answer) continue; // agreed — not disputed
    const options: Record<string, string> = {};
    q.options.forEach((o, i) => (options[LETTERS[i]] = o));
    out.push({ id, subtopic: f.subtopicName, stem: q.stem, options });
  }
}

const path = join(OUT, chapter.id, "recheck.json");
writeFileSync(path, JSON.stringify({ chapter: chapter.chapterName, questions: out }, null, 2));
console.log(`${path}  (${out.length} disputed rows)`);
