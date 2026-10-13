// Extract a chapter's Group A (LWS quiz .docx) files into committed
// transcriptions: data/<chapter>/<key>.source.json.
//
//   npx tsx scripts/afcat/extract-quiz.ts <chapterId>
//
// Reads the .docx through pandoc (plain text, no wrapping), applies the
// chapter's recorded text fixes, parses questions + the answer key, and prints
// a report: question count, numbering gaps, parse errors, and every row where
// the key's LETTER and the answer it states in WORDS disagree. Refuses to write
// a file with gaps or parse errors — fix the source text via `textFixes`.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, SOURCE_ROOT, DATA, type FileEntry } from "./config";
import { parseQuizQuestions, parseQuizKey, keyValueMatches, type SourceFile, type SourceRecord, type QuizKeyEntry } from "./lib";

const docxText = (rel: string) =>
  execFileSync("pandoc", [join(SOURCE_ROOT, rel), "-t", "plain", "--wrap=none"], { encoding: "utf8", maxBuffer: 64 << 20 });

function applyFixes(text: string, file: FileEntry): string {
  let out = text;
  for (const f of file.textFixes ?? []) {
    const hits = out.split(f.find).length - 1;
    if (hits !== 1) throw new Error(`${file.key}: text fix "${f.find}" matched ${hits} times (want exactly 1)`);
    out = out.replace(f.find, f.replace);
  }
  return out;
}

const chapter = requireChapter(process.argv[2]);
mkdirSync(join(DATA, chapter.id), { recursive: true });

for (const file of chapter.files.filter((f) => f.group === "A")) {
  const { questions, errors, keyText } = parseQuizQuestions(applyFixes(docxText(file.path), file));

  let key = new Map<number, QuizKeyEntry>();
  if (file.answerKey === "embedded") key = parseQuizKey(keyText);
  else if (file.answerKey && file.answerKey !== "inline") key = parseQuizKey(docxText(file.answerKey));

  const nums = questions.map((q) => q.n);
  const gaps: number[] = [];
  for (let i = 1; i <= Math.max(0, ...nums); i++) if (!nums.includes(i)) gaps.push(i);

  const records: SourceRecord[] = questions.map((q) => {
    const k = key.get(q.n);
    const letter = k?.letter ?? q.answer ?? null;
    const rec: SourceRecord = { n: q.n, stem: q.stem, options: q.options, key: letter };
    const flags: string[] = [];
    if (k?.value) {
      rec.keyValue = k.value;
      const opt = letter ? q.options["ABCD".indexOf(letter)] : undefined;
      if (opt !== undefined && !keyValueMatches(k.value, opt)) {
        flags.push(`key letter ${letter} is "${opt}" but the key states "${k.value}"`);
      }
    }
    if (k?.solution) rec.keySolution = k.solution;
    if (!letter) flags.push("no key in source");
    if (new Set(q.options).size < 4) flags.push("duplicate option text");
    if (flags.length) rec.flags = flags;
    return rec;
  });

  const flagged = records.filter((r) => r.flags);
  console.log(`${file.key}: ${records.length} q | gaps [${gaps}] | parse errors ${errors.length} | key entries ${key.size} | flagged ${flagged.length}`);
  for (const e of errors) console.log(`   ERROR ${e}`);
  for (const r of flagged) console.log(`   Q${r.n}: ${r.flags!.join("; ")}`);
  if (gaps.length || errors.length) {
    console.log(`   NOT WRITTEN — repair the source text with a textFix in config.ts first.`);
    continue;
  }

  const out: SourceFile = { path: file.path, group: file.group, questions: records };
  const dest = join(DATA, chapter.id, `${file.key}.source.json`);
  writeFileSync(dest, JSON.stringify(out, null, 2) + "\n");
  console.log(`   wrote ${dest}`);
}
