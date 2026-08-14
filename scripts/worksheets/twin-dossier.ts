// Dump the rows that pass 1 flagged as TWIN / two-simultaneously-true but which
// AGREED with the source key. Those never surface in compare.ts — the key is
// right — yet they still ship a duplicate or a second correct option to the
// student, so each needs an option repair.
//
//   npx tsx scripts/worksheets/twin-dossier.ts <chapterId>
//
// Unlike the verification packets this dossier DELIBERATELY carries the key and
// the source solution: the task it feeds is "propose a distinct replacement for
// the redundant option", which requires knowing which option must survive. It
// must never be handed to a blind-derivation agent.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA, OUT } from "./config";
import { readChapterQuestions } from "./read";
import { questionId } from "./lib";

const chapter = requireChapter(process.argv[2]);
type Verdict = { id: string; derived: string; confidence: string; note?: string };
const verdicts: Verdict[] = JSON.parse(readFileSync(join(DATA, `${chapter.id}.derived.json`), "utf8"));
const byId = new Map(verdicts.map((v) => [v.id, v]));

const FLAG = /twin|identical|both|two simultaneously|simultaneously[- ]true|also true|arguably true/i;
const LETTERS = ["A", "B", "C", "D"];

const rows: unknown[] = [];
for (const f of readChapterQuestions(chapter)) {
  for (const q of f.questions) {
    const id = questionId(f.fileIndex, q.row);
    const v = byId.get(id);
    if (!v?.note || !FLAG.test(v.note)) continue;
    if (v.derived.trim().toUpperCase() !== q.answer) continue; // disputed rows go through the crosstab instead
    const options: Record<string, string> = {};
    q.options.forEach((o, i) => (options[LETTERS[i]] = o));
    rows.push({ id, subtopic: f.subtopicName, stem: q.stem, options, key: q.answer, pass1Note: v.note });
  }
}

const path = join(OUT, chapter.id, "twin-dossier.json");
writeFileSync(path, JSON.stringify({ chapter: chapter.chapterName, rows }, null, 2));
console.log(`${path}  (${rows.length} agreeing twin/two-true rows)`);
