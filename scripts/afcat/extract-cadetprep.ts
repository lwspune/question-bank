// Extract a chapter's Group D (Cadetprep Excel) files to
// data/<chapter>/<key>.source.json, through the NDA worksheets parser (the
// same LMS-export template). One row per question; `n` is the sheet row, so an
// id is file x sheet row ("05-17"), as in the worksheets pipeline.
//
//   npx tsx scripts/afcat/extract-cadetprep.ts <chapterId> [--files=a,b]
//
// Prints counts only. The key and solution go into the transcript as evidence
// and are not printed: the blind pass reads packets (stem + options) only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as XLSX from "xlsx";
import { parseSheet } from "../worksheets/lib";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { requireChapter, DATA, sourcePathOf } from "./config";
import { filesArg } from "./read";
import { BROKEN_UNIT, liftCurrencyOutOfMath, repairBareMath, type SourceFile, type SourceRecord } from "./lib";

const chapter = requireChapter(process.argv[2]);
const only = filesArg();
mkdirSync(join(DATA, chapter.id), { recursive: true });

for (const file of chapter.files) {
  if (file.group !== "D" || (only && !only.includes(file.key))) continue;
  const wb = XLSX.read(readFileSync(sourcePathOf(file)), { type: "buffer" });
  if (wb.SheetNames.length !== 1) throw new Error(`${file.key}: ${wb.SheetNames.length} sheets, expected 1`);
  const aoa = XLSX.utils.sheet_to_json<(string | number | null)[]>(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", blankrows: false });
  const { questions, errors } = parseSheet(file.key, aoa);
  if (errors.length) throw new Error(`${file.key}: ${errors.join("; ")}`);
  const records: SourceRecord[] = questions.map((q) => ({
    n: q.row,
    stem: normalizeNewlines(repairBareMath(liftCurrencyOutOfMath(q.stem))),
    options: q.options.map((o) => normalizeNewlines(repairBareMath(liftCurrencyOutOfMath(o)))),
    key: /^[A-D]$/.test(q.answer) ? q.answer : null,
    // Some sheets type a literal backslash-n for a line break (the Meeting sheet's
    // solutions); the shared normaliser converts it outside math zones only.
    keySolution: normalizeNewlines(liftCurrencyOutOfMath(q.solution)),
    difficulty: q.difficulty,
  }));
  const bad = records.filter((r) => !r.key).map((r) => r.n);
  const blankOpt = records.filter((r) => r.options.some((o) => !o.trim())).map((r) => r.n);
  // A stem or option with a broken unit needs a stem/options override before it can ship.
  const brokenUnit = records.filter((r) => [r.stem, ...r.options].some((t) => BROKEN_UNIT.test(t))).map((r) => r.n);
  const src: SourceFile & { transcribed: string } = {
    path: file.path,
    group: "D",
    transcribed: "read from the Cadetprep Excel sheet by extract-cadetprep.ts (sheet row = n); key and solution are the source's, kept as evidence",
    questions: records,
  };
  writeFileSync(join(DATA, chapter.id, `${file.key}.source.json`), JSON.stringify(src, null, 2) + "\n");
  console.log(`${file.key}: ${records.length} rows${bad.length ? `, no valid key on rows ${bad.join(", ")}` : ""}${blankOpt.length ? `, blank option on rows ${blankOpt.join(", ")}` : ""}${brokenUnit.length ? `, broken unit (\/) on rows ${brokenUnit.join(", ")}` : ""}`);
}
