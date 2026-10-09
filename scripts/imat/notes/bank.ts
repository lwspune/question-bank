/**
 * IMAT chapters as the transcribed papers define them: chapter name ->
 * subject and question counts (all years, and the ministry papers 2023+).
 * Read from scripts/imat/data/<year>.questions.json, the same files the
 * commit reads, so the notes are checked against the bank's own taxonomy.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { subjectOf, type ImatQuestion } from "../lib";

export type BankChapter = { subject: string; total: number; recent: number };

export const FIRST_YEAR = 2011;
export const LAST_YEAR = 2026;
export const FIRST_MINISTRY_YEAR = 2023;

export function loadBankChapters(dataDir = join(__dirname, "..", "data")): Map<string, BankChapter> {
  const out = new Map<string, BankChapter>();
  for (let year = FIRST_YEAR; year <= LAST_YEAR; year++) {
    const paper = JSON.parse(readFileSync(join(dataDir, `${year}.questions.json`), "utf8")) as {
      questions: ImatQuestion[];
    };
    for (const q of paper.questions) {
      const e = out.get(q.chapter) ?? { subject: subjectOf(q), total: 0, recent: 0 };
      e.total += 1;
      if (year >= FIRST_MINISTRY_YEAR) e.recent += 1;
      out.set(q.chapter, e);
    }
  }
  return out;
}
