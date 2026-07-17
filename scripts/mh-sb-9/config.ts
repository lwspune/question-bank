// Config for the MAHARASHTRA STATE BOARD Class-9 textbook-ingestion pipeline.
//
// Source: the Balbharati (Maharashtra State Board) Class 9 Mathematics textbooks —
// Part 1 (Algebra) + Part 2 (Geometry) — under SOURCE_ROOT. Born-digital PDFs with
// a clean PROSE text layer (~1500 ch/page) but unicode math (∈ ∪ ∩ √ ∴) that
// flattens to `�`, plus figures (Geometry-heavy Part 2). So extraction is a HYBRID:
// text-first for prose stems + MCQ options + prose solutions, VISION for math-dense
// stems / figures / truth-tables. Mirrors scripts/stateboard + scripts/ncert
// (render → transcribe → merge → commit).
//
// UNLIKE the Class-12 pipeline, the source is TWO WHOLE-BOOK PDFs (not pre-split
// per chapter), so every chapter sets `pages` (0-based) to its page range.
//
// The Class-9 book uses "Practice set N.M" (per-topic exercises) + one chapter-end
// "Problem Set N" (whose Q.1 is usually an MCQ block "Choose the correct
// alternative"). A chapter yields the same three buckets (see ../stateboard/lib.ts):
//   - solved              : worked examples in the theory (book's solution) → PUBLIC
//   - exercise-mcq        : the Problem-Set "choose the correct alternative" block
//   - exercise-subjective : Practice-set + Problem-set free-response (answer authored)
//
// The book ships an ANSWERS section at the back (Part1 p139-146 / Part2 p134-138,
// 1-based) giving per-Practice-set FINAL answers + Problem-set MCQ keys — so the
// step-6 answer-key cross-check gate is fully feasible (see `answersPdf`/`answerPages`).
//
// Committed question_kind='practice', visibility='PRIVATE' (post-commit UPDATE).
// A textbook exercise corpus is not PYQ; Class-9 is not a board year, so there are
// no PYQ papers to follow. flip-public.ts flips solved examples + keyed MCQ +
// answered subjective.
import { join } from "node:path";

// LWS Pune org + admin (same identities as the practice / stateboard / ncert pipelines).
export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra State Board Class 9 exam (seeded 2026-07-17); Mathematics subject seeded alongside.
export const EXAM_ID = "2030d309-a3de-4b0f-abea-75cb1b21fb18";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\State-Board\\01. 9th";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription (source of truth)

const PART1 = join(SOURCE_ROOT, "9th_Maths_Part1_SB.pdf"); // Algebra
const PART2 = join(SOURCE_ROOT, "9th_Maths_Part2_SB.pdf"); // Geometry
void PART2; // referenced by later (Geometry) chapters as they are added

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // DB chapter (auto-created on commit)
  subjectName: string; // DB subject (must exist — "Mathematics")
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the whole-book PDF
  pages?: number[]; // 0-based page indices to render (the chapter's range)
  answersPdf?: string; // absolute path to the book PDF holding the ANSWERS section
  answerPages?: number[]; // 0-based page indices of this chapter's answer block (step-6)
  note: string; // questions.pyq_note
  // Canonical subtopics for this chapter — transcription maps each question to one.
  subtopics: string[];
};

const range = (startIncl: number, endIncl: number) =>
  Array.from({ length: endIncl - startIncl + 1 }, (_, i) => startIncl + i);

export const CHAPTERS: Record<string, Chapter> = {
  // ── Validation chapter — Ch.1 Sets (Part 1, Algebra). Low figure load (a few
  //    Venn diagrams). Pages 11-28 (1-based) → 0-based 10-27. Structure:
  //    Practice set 1.1 (writing sets / methods) · 1.2 (types, subsets, universal) ·
  //    1.3 (intersection & union) · 1.4 (number of elements — n(A∪B) word problems) ·
  //    Problem Set 1 (Q.1 = MCQ "choose the correct alternative" i-iv; Q.2+ subjective).
  //    Answers: Part1 p139-140 (1-based) → 0-based 138-139.
  "sets-9": {
    id: "sets-9",
    chapterName: "Sets",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Sets.pdf",
    pdf: PART1,
    pages: range(10, 27),
    answersPdf: PART1,
    answerPages: range(138, 139),
    note: "Maharashtra State Board (Class 9) — Sets (Balbharati textbook, Part 1 Algebra)",
    subtopics: [
      "Concept of a Set and Methods of Writing Sets",
      "Types of Sets",
      "Venn Diagrams",
      "Operations on Sets — Intersection and Union",
      "Number of Elements in a Set",
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
