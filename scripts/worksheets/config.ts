// Shared config for the Cadetprep "Worksheets - 11th+12th" ingestion pipeline.
//
// Source: born-digital Excel worksheets under SOURCE_ROOT — the LWS Cadetprep
// NDA Maths tree. ONLY the Concept Practice buckets are ingested (user's call
// 2026-08-05): the PYQs folders are excluded (the NDA bank already serves the
// PYQ corpus), Formula Revision / Quizzes are out of scope for now.
//
// Every worksheet is the same 15-column LMS-export template (see lib.ts).
// Taxonomy truth is THIS registry — folder = chapter, file = subtopic — never
// the sheets' unreliable Subject column.
//
// These are practice questions: committed question_kind='practice',
// visibility='PRIVATE' until the blind key-verification pass clears them.
import { join } from "node:path";

export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "9fabd0f7-50bf-4b58-82fa-4ff50a906bf8"; // Worksheets - 11th+12th
export const SUBJECT_NAME = "Mathematics";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\Cadetprep\\NDA\\Maths";

export const OUT = join(__dirname, "out"); // gitignored: verification packets etc.
export const DATA = join(__dirname, "data"); // committed: overrides + verification verdicts

/** One worksheet file → one subtopic. `file` is relative to the chapter dir. */
export type FileEntry = { file: string; subtopicName: string };

export type Chapter = {
  id: string; // slug — names data/<id>.overrides.json + out/ artifacts
  chapterName: string; // canonical DB chapter (auto-created on first commit)
  dir: string; // absolute path to the folder holding the worksheet files
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  note: string; // questions.pyq_note provenance text
  files: FileEntry[]; // IN ORDER — index+1 is the fileIndex in question ids ("03-17")
};

export const CHAPTERS: Record<string, Chapter> = {
  "trig-identities": {
    id: "trig-identities",
    chapterName: "Trigonometric Identities",
    dir: join(SOURCE_ROOT, "05. Trigono", "Concept Practice"),
    sourceFile: "Cadetprep_Worksheets_Trigonometric_Identities",
    note: "Cadetprep concept-practice worksheet — Trigonometric Identities",
    files: [
      { file: "01. Trigono - Fundamental Trigonometric Identities.xlsx", subtopicName: "Fundamental Trigonometric Identities" },
      { file: "02. T-ratio in different quadrants.xlsx", subtopicName: "T-Ratios in Different Quadrants" },
      { file: "03. T-ratio of allied angles.xlsx", subtopicName: "T-Ratios of Allied Angles" },
      { file: "04. Graph, Domain, Range of T-Functions.xlsx", subtopicName: "Graphs, Domain and Range of T-Functions" },
      { file: "05. Trigono - Sum and Difference Identities.xlsx", subtopicName: "Sum and Difference Identities" },
      { file: "06. Double, Triple, and Fifth Angle.xlsx", subtopicName: "Double, Triple and Fifth Angle Formulas" },
      { file: "07. Trigono - Product-to-Sum and Sum-to-Product Identities.xlsx", subtopicName: "Product-to-Sum and Sum-to-Product Identities" },
      { file: "08. Trigono - T-Equations.xlsx", subtopicName: "Trigonometric Equations" },
    ],
  },
};

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`Unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
