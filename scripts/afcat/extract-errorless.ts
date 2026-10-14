// Extract a chapter's Group B ("Errorless" PDF) files into committed
// transcriptions: data/<chapter>/<key>.source.json.
//
//   npx tsx scripts/afcat/extract-errorless.ts <chapterId> [--files=key1,key2]
//
// Pass --files when the chapter already has a committed sheet: re-extracting
// it rewrites its source file WITHOUT the keys read-keys.ts filled in.
//
// pdf-words.py dumps each page's words with positions; errorlessPage reads the
// two columns and sets every ANSWERS box aside; splitTypeSections cuts the sheet
// at its "Type-" headings, where numbering restarts. A question's n is
// section x 100 + printed number, so id "02-312" is file 02, section 3, Q12.
//
// The KEY is written to data/<chapter>/<key>.keytext.json (one block of raw
// lines per section; empty when the key is a picture) and is NOT printed: the
// blind pass must not see it. read-keys.ts parses it after pass 1.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, SOURCE_ROOT, DATA } from "./config";
import { filesArg } from "./read";
import { applyTextFixes, reorderQuestionBlocks, errorlessPage, splitTypeSections, parseQuizQuestions, equalValueOptions, type PdfPage, type SourceFile, type SourceRecord } from "./lib";

const chapter = requireChapter(process.argv[2]);
mkdirSync(join(DATA, chapter.id), { recursive: true });

const only = filesArg();
for (const file of chapter.files.filter((f) => f.group === "B" && (!only || only.includes(f.key)))) {
  const json = execFileSync("python", [join(__dirname, "pdf-words.py"), join(SOURCE_ROOT, file.path)], { encoding: "utf8", maxBuffer: 64 << 20 });
  const pages = (JSON.parse(json) as { pages: PdfPage[] }).pages;
  const lines: string[] = [];
  const keyBlocks: string[][] = [];
  for (const p of pages) {
    const r = errorlessPage(p);
    lines.push(...r.lines);
    keyBlocks.push(...r.keyBlocks);
  }
  const fixed = applyTextFixes(lines.join("\n"), file.textFixes ?? [], file.key).split("\n");
  const sections = splitTypeSections(fixed);
  const problems: string[] = [];
  if (keyBlocks.length !== sections.length) problems.push(`${sections.length} sections but ${keyBlocks.length} ANSWERS boxes`);

  const records: SourceRecord[] = [];
  sections.forEach((sec, i) => {
    const s = i + 1;
    const { questions, errors } = parseQuizQuestions(reorderQuestionBlocks(sec.lines).join("\n"));
    const nums = questions.map((q) => q.n);
    const gaps: number[] = [];
    for (let k = 1; k <= Math.max(0, ...nums); k++) if (!nums.includes(k)) gaps.push(k);
    console.log(`  section ${s} "${sec.title}": ${questions.length} q${gaps.length ? ` | GAPS [${gaps}]` : ""}${errors.length ? ` | ${errors.length} parse errors` : ""} | key block ${keyBlocks[i]?.length ?? 0} lines`);
    for (const e of errors) problems.push(`section ${s}: ${e}`);
    if (gaps.length) problems.push(`section ${s}: gaps ${gaps}`);
    for (const q of questions) {
      const rec: SourceRecord = { n: s * 100 + q.n, stem: q.stem, options: q.options, key: null, section: sec.title };
      const twins = equalValueOptions(q.options);
      if (twins.length) rec.flags = twins.map((t) => `options ${t.join("=")} equal in value`);
      records.push(rec);
    }
  });

  console.log(`${file.key}: ${records.length} q in ${sections.length} sections | problems ${problems.length}`);
  if (problems.length) {
    for (const p of problems) console.log(`   ${p}`);
    console.log(`   NOT WRITTEN — repair the source text with a textFix in config.ts first.`);
    continue;
  }
  const out: SourceFile = { path: file.path, group: file.group, questions: records };
  writeFileSync(join(DATA, chapter.id, `${file.key}.source.json`), JSON.stringify(out, null, 2) + "\n");
  const keyText = sections.map((sec, i) => ({ section: i + 1, title: sec.title, lines: keyBlocks[i] }));
  writeFileSync(join(DATA, chapter.id, `${file.key}.keytext.json`), JSON.stringify(keyText, null, 2) + "\n");
  console.log(`   wrote ${file.key}.source.json and ${file.key}.keytext.json (key not shown)`);
}
