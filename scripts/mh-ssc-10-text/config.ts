// Config for the MAHARASHTRA STATE BOARD Class-10 (SSC) TEXTBOOK ingestion.
//
// DISTINCT FROM scripts/mh-ssc-10/, and the distinction is the whole point:
//   scripts/mh-ssc-10/       → the board's past-year QUESTION PAPERS: scanned,
//                              vision-only, question_kind='pyq'.
//   scripts/mh-ssc-10-text/  → the Balbharati TEXTBOOK exercises for the same
//                              exam: born-digital, text-first, question_kind='practice'.
// Both write into the SAME exam and the SAME chapters, so a chapter carries its
// board PYQs and its textbook exercises together and `/browse`'s PYQ/Practice
// toggle separates them. That is why `chapterName` below must match the DB row
// EXACTLY — the textbook prints "Historiography : Development in the West" with a
// space before the colon and the DB has none; using the book's spelling would
// silently auto-create a duplicate chapter and split the corpus in two.
//
// Source: `10th_Hist_SB.pdf` — ONE book carrying History (9 ch) + Political
// Science (5 ch), 112pp, born-digital with a clean prose text layer. Printed page
// N → 0-based PDF index N+9 (the same offset as both Class-9 books).
//
// ⚠ NO ANSWERS SECTION anywhere in the book — verified across all 112 pages, the
// same regime as the Class-9 History/PolSci book. So the step-6 answer-key
// cross-check CANNOT run: every MCQ key is DERIVED and every model answer
// AUTHORED, both grounded in the chapter's own prose, then blind-re-derived for
// the MCQs and stamped with derived_model/derived_at. Do not "restore" an
// `answersPdf` reference — its absence is a fact about the book, not an oversight.
//
// Subtopics are the TEXTBOOK's own section headings (user's call, 2026-08-02). The
// six PYQ-era subtopics that had drifted from the book were renamed to match it in
// the same pass, so PYQ and practice rows share ONE taxonomy per chapter.
//
// NOTE ON /board: mh-ssc-10 is deliberately NOT registered as a `boardExam` (see
// examContext.ts — "PYQ papers aren't textbook-structured"). Textbook content
// changes that premise, but flipping the flag adds a user-visible nav tab, so it
// is left alone for now. `section_*` IS still assigned on these rows so the data
// is ready the day that call is made; `board:lint` iterates BOARD_EXAMS, so it
// neither checks nor is affected by them today.
import { join } from "node:path";

export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra State Board Class 10 (SSC) — the SAME exam row as the PYQ corpus.
export const EXAM_ID = "a41ef5c6-fa20-4bc1-be8b-ba4263d5afd2";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\State-Board\\02. 10th";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs + text dumps
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

const HIST = join(SOURCE_ROOT, "10th_Hist_SB.pdf"); // History + Political Science

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // MUST match the existing DB chapter row exactly
  subjectName: string;
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string;
  pages?: number[]; // 0-based page indices to render
  answersPdf?: string; // never set for this book — see the header note
  answerPages?: number[];
  note: string; // questions.pyq_note
  subtopics: string[]; // the textbook's own section headings
};

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export const CHAPTERS: Record<string, Chapter> = {
  // ── PILOT — History Ch.1. Exercise on PDF p15 (printed p6):
  //    Q1(A) two MCQ (four printed options each — unlike the Class-9 Geography
  //    book, this one uses proper four-option MCQs) · Q1(B) wrong-pair ·
  //    Q2 two short notes · Q3 two explain-with-reason · Q4 a concept chart
  //    (figure) · Q5 four answer-in-detail. Project block excluded as always.
  //    Sections 1.1-1.4 are the subtopics; three already exist on this chapter
  //    from the PYQ ingest, so only "Tradition of Historiography" is new.
  "historiography-west-10": {
    id: "historiography-west-10",
    chapterName: "Historiography: Development in the West", // DB spelling — no space before the colon
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Historiography_Development_in_the_West.pdf",
    pdf: HIST,
    pages: range(10, 15), // printed pp 1-6; Exercise on p15
    note: "Maharashtra State Board (Class 10) — Historiography: Development in the West (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Tradition of Historiography",
      "Modern Historiography",
      "Development of Scientific Perspective in Europe and Historiography",
      "Notable Scholars",
    ],
  },
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
