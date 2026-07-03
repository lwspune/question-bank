// Config for the MAHARASHTRA STATE BOARD textbook-ingestion pipeline.
//
// Source: the Balbharati (Maharashtra State Board) Class 11/12 textbooks under
// SOURCE_ROOT — born-digital PDFs with a decent text layer BUT dense unicode
// math (∧ ∨ → ↔ ∼ √ ∈) and truth-table / figure content that the text layer
// mangles. So extraction is a HYBRID: text-first for stems + MCQ options +
// prose solutions, VISION for truth-table solutions (→ GFM pipe-tables) and
// figures. Mirrors scripts/foundation/ (render → transcribe → commit).
//
// Each textbook chapter yields three buckets (see lib.ts `Bucket`):
//   - solved      : worked examples WITH the book's solution → ship PUBLIC
//   - exercise-mcq: the "Select the correct answer" MCQ block (answer derived)
//   - exercise-subjective: free-response exercise questions (answer pending)
//
// Committed question_kind='practice', visibility='PRIVATE' (post-commit UPDATE).
// A textbook exercise corpus is not PYQ; the board PYQ papers are a later phase
// under the SAME exam. flip-public.ts flips only the solved examples.
import { join } from "node:path";

// LWS Pune org + admin (same identities as the practice / foundation pipelines).
export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra HSC Class 12 exam (seeded 2026-07-03); Mathematics subject exists.
export const EXAM_ID = "c9778a66-2231-4940-8f48-a3a48a43a6ac";

export const SOURCE_ROOT = "C:\\tmp\\PYQPs\\MHT-CET\\State_Board";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription (source of truth)

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // DB chapter (auto-created on commit)
  subjectName: string; // DB subject (must exist — "Mathematics")
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the chapter PDF
  pages?: number[]; // 0-based page indices to render; omit → all pages
  note: string; // questions.pyq_note
  // Canonical subtopics for this chapter — transcription maps each question to one.
  subtopics: string[];
};

const cls12 = (p: string) => join(SOURCE_ROOT, "12th", p);

export const CHAPTERS: Record<string, Chapter> = {
  // ── Validation chapter — Ch.1 Mathematical Logic (12th, Part 1). The hardest
  //    case: dense logic symbols + truth-table solutions (vision → pipe-tables)
  //    + switching-circuit figures. If extraction holds here, the rest is easier.
  "logic-12": {
    id: "logic-12",
    chapterName: "Mathematical Logic",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Mathematical_Logic.pdf",
    pdf: cls12("Part 01/Ch_01_Mathematical_Logic.pdf"),
    note: "Maharashtra State Board (Class 12) — Mathematical Logic (Balbharati textbook)",
    subtopics: [
      "Statements and Logical Connectives",
      "Truth Tables of Compound Statements",
      "Tautology, Contradiction and Contingency",
      "Logical Equivalence and Algebra of Statements",
      "Quantifiers, Duality and Negation of Statements",
      "Converse, Inverse and Contrapositive",
      "Application of Logic to Switching Circuits",
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
