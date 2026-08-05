// Shared Excel reader for the worksheets pipeline. SheetJS parses both .xlsx
// and legacy BIFF .xls, and sniffs content rather than trusting the extension
// (the corpus has at least one xlsx mislabeled .xls).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as XLSX from "xlsx";
import { parseSheet, type WorksheetQuestion } from "./lib";
import type { Chapter } from "./config";

export type ChapterQuestions = {
  fileIndex: number; // 1-based
  subtopicName: string;
  file: string;
  questions: WorksheetQuestion[];
}[];

export function readChapterQuestions(chapter: Chapter): ChapterQuestions {
  const out: ChapterQuestions = [];
  chapter.files.forEach((entry, i) => {
    const path = join(chapter.dir, entry.file);
    const wb = XLSX.read(readFileSync(path), { type: "buffer" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const aoa = XLSX.utils.sheet_to_json<(string | number | null)[]>(sheet, {
      header: 1,
      defval: "",
      blankrows: false,
    });
    const { questions, errors } = parseSheet(entry.file, aoa);
    if (errors.length) throw new Error(`${entry.file}: ${errors.join("; ")}`);
    out.push({ fileIndex: i + 1, subtopicName: entry.subtopicName, file: entry.file, questions });
  });
  return out;
}
