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

  // ── Ch.2 Matrices (12th, Part 1). Computational, ≈figure-free (only determinant
  //    bars). Covers inverse of a matrix + solving linear equations (11th taught
  //    basic operations). Matrices transcribed as LaTeX \begin{bmatrix}…\end{bmatrix}.
  "matrices-12": {
    id: "matrices-12",
    chapterName: "Matrices",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Matrices.pdf",
    pdf: cls12("Part 01/Ch_02_Matrices.pdf"),
    note: "Maharashtra State Board (Class 12) — Matrices (Balbharati textbook)",
    subtopics: [
      "Elementary Transformations of a Matrix",
      "Inverse by Elementary Transformation Method",
      "Minors, Cofactors and Adjoint",
      "Inverse by Adjoint Method",
      "Solution of Linear Equations using Matrices",
    ],
  },

  // ── Ch.7 Linear Programming (12th, Part 1). Heavily GRAPHICAL — nearly every
  //    solution is a feasible-region diagram (constraint lines + shaded region +
  //    corner points), so `diagramWouldHelp`/solution_image density is the highest
  //    of any chapter. 7.1 Linear Inequations + 7.2 LPP + Miscellaneous (I MCQ / II
  //    subjective). Vector-drawn figures (1 raster page).
  "linear-prog-12": {
    id: "linear-prog-12",
    chapterName: "Linear Programming",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Linear_Programming.pdf",
    pdf: join(SOURCE_ROOT, "12th", "Part 01", "Ch_07_Linear_Programming.pdf"),
    note: "Maharashtra State Board (Class 12) — Linear Programming (Balbharati textbook)",
    subtopics: [
      "Linear Inequations in Two Variables",
      "Formulation of a Linear Programming Problem",
      "Graphical Solution of a Linear Programming Problem",
    ],
  },

  // ── Ch.6 Differential Equations (12th, Part 2). Algebraic, essentially
  //    figure-free (1 raster page). Sections 6.1–6.5 + a Miscellaneous exercise
  //    (I: MCQ "Choose the correct option", II: subjective). Solved examples
  //    carry the book's solution → ship PUBLIC. Math as LaTeX (dy/dx, integrals).
  "diff-equations-12": {
    id: "diff-equations-12",
    chapterName: "Differential Equations",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Differential_Equations.pdf",
    pdf: join(SOURCE_ROOT, "12th", "Part 02", "Ch_06_Diffrential_Equations.pdf"),
    note: "Maharashtra State Board (Class 12) — Differential Equations (Balbharati textbook)",
    subtopics: [
      "Order and Degree of a Differential Equation",
      "Formation of a Differential Equation",
      "Solution of a Differential Equation",
      "Applications of Differential Equations",
    ],
  },

  // ── Ch.4 Pair of Straight Lines (12th, Part 1). Algebraic, light figures
  //    (few small line sketches). Homogeneous + general 2nd-degree equations of a
  //    line-pair. Equations as LaTeX (x^2, 2hxy, \tan\theta formulas).
  "pair-lines-12": {
    id: "pair-lines-12",
    chapterName: "Pair of Straight Lines",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Pair_of_Straight_Lines.pdf",
    pdf: cls12("Part 01/Ch_04_Pair_of_Straight_Lines.pdf"),
    note: "Maharashtra State Board (Class 12) — Pair of Straight Lines (Balbharati textbook)",
    subtopics: [
      "Combined Equation of a Pair of Lines",
      "Angle between a Pair of Lines",
      "Angle Bisectors of a Pair of Lines",
      "General Second Degree Equation of Two Lines",
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
