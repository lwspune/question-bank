// Config for the MAHARASHTRA HSC Class-12 MATHS **BOARD PYQ** ingestion.
//
// DISTINCT FROM scripts/stateboard/, and the distinction is the whole point:
//   scripts/stateboard/      → the Balbharati TEXTBOOK (exercises + solved
//                              examples) for this exam, question_kind='practice'.
//   scripts/mh-hsc-12-pyq/   → the board's past-year QUESTION PAPERS,
//                              question_kind='pyq'.
// Both write into the SAME exam and the SAME chapters, so a chapter carries its
// textbook exercises and its board PYQs together and `/browse`'s PYQ/Practice
// toggle separates them. Mirrors how scripts/mh-ssc-10-text/ sits beside
// scripts/mh-ssc-10/. stateboard/config.ts anticipated this pipeline in its own
// header: "the board PYQ papers are a later phase under the SAME exam".
//
// ⚠ SOURCE IS NOT THE RAW BOARD PAPERS. It is an LWS-authored CHAPTERWISE
// COMPILATION: 15 born-digital .docx (Part_1 x7, Part_2 x8), one per textbook
// chapter, each question carrying a provenance tag like `[Q. 27, 2025]`. That
// buys a clean pandoc text path (no vision, no OCR) and costs completeness —
// see COVERAGE below. The raw papers sit one directory up and 6 of the 10 are
// scanned, so they are a repair source, not the ingestion source.
//
// ⚠ NO ANSWER KEY EXISTS ANYWHERE — not in the .docx, not in the bundled
// HSC_Maths_Board_PYQs_v2.pdf (34pp, zero occurrences of "answer"), not in the
// raw papers (a board QP never ships one). Same regime as scripts/mh-ssc-10/ and
// scripts/mh-sb-9/: every MCQ key is DERIVED and every model answer AUTHORED.
// Do not "restore" an `answersPdf` — its absence is a fact about the source.
//
// What this corpus has that the other no-key ingests did NOT: ~2,155 solved
// textbook rows already sit on these same chapters. Measured by token Jaccard of
// each PYQ against its own chapter's practice rows: ~30% have a near-verbatim
// solved twin (>=0.75), ~24% a close relative, ~45% are new. So authoring starts
// from the bank where a twin exists, and every verifiable answer is additionally
// checked with sympy (differentiate the integral, substitute the ODE solution) —
// the scripts/stateboard Indefinite Integration precedent. All 49 MCQ keys are
// blind-re-derived and recorded as `question_reviews` rows (migration 0074),
// which the earlier no-key ingests had no table for.
//
// COVERAGE — the compilation is INCOMPLETE and that is a property of the source,
// not of this pipeline. Both the 2022 and 2023 papers state the same structure
// (Q1 eight MCQ + Q2 four VSA + Q3-14 + Q15-26 + Q27-34 = 44 questions). Against
// that: March 2022 38/44 · March 2023 38/44 · 2024 41/44 · 2025 45/44 (one OVER,
// so at least one 2025 tag is wrong). The 2015-2020 papers are scanned, so their
// coverage is UNMEASURED. Consequence to state plainly whenever this corpus is
// described: it is a chapterwise PYQ bank, NOT a set of reconstructed sittings,
// and it cannot back a /mock sitting the way the NDA and NEET corpora do.
import { join } from "node:path";

export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra HSC Class 12 — the SAME exam row as the textbook corpus.
export { EXAM_ID } from "../stateboard/config";

export const SOURCE_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\Maths\\State_Board\\Question_Paper";
/** The chapterwise compilation (the ingestion source). */
export const COMPILATION = join(SOURCE_ROOT, "Chapterwise_PYQs");
/** Raw board papers — a REPAIR source only. 2022 + 2023 have text layers; the
 *  other eight (2015-2020, 2024, 2025) are scanned and need render + vision. */
export const RAW_PAPERS = SOURCE_ROOT;

export const OUT = join(__dirname, "out"); // gitignored: pandoc dumps + rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  /** MUST match the existing DB chapter row EXACTLY. The compilation's own
   *  titles differ ("02. Matrices and Determinants", "Line and Plane",
   *  "Applications of Derivatives") and chapters AUTO-CREATE on commit, so the
   *  source spelling would silently fork the corpus in two — the mh-ssc-10-text
   *  lesson. Verified against the live DB 2026-08-12. */
  chapterName: string;
  subjectName: string; // "Mathematics" — must already exist
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  docx: string; // absolute path to the compilation chapter
  note: string; // questions.pyq_note
  /** The chapter's EXISTING DB subtopics, verbatim, as of 2026-08-12. PYQs are
   *  assigned onto this axis per-question; the compilation's own "A./B./C."
   *  section letters are a coarser, different cut and are DISCARDED, so PYQ and
   *  practice rows share one taxonomy per chapter. */
  subtopics: string[];
  /** Set when the DB chapter does not exist yet — commit MUST refuse. These
   *  three were never built by the textbook ingest (it shipped 12 of 15) and are
   *  unblocked by Phase 1. */
  blockedOnTextbookChapter?: string;
};

const P1 = (f: string) => join(COMPILATION, "Part_1", f);
const P2 = (f: string) => join(COMPILATION, "Part_2", f);
const note = (ch: string) =>
  `Maharashtra HSC Class 12 Board PYQ — ${ch} (chapterwise compilation, March 2015-2025; no 2021, exams cancelled)`;

export const CHAPTERS: Record<string, Chapter> = {
  // ── PILOT. Deliberately the hardest chapter, not the easiest: it carries ALL 5
  //    of the compilation's embedded images (switching circuits — every other
  //    chapter has zero), the only U+1F86A wide-arrow glyph, the only embedded
  //    LWS editorial note ("(Note: This question involves quantifiers...)" on
  //    Q7), a zero-option MCQ (Q5, the dual of r v (p v q)), and 2 tag
  //    collisions. If extraction holds here the remaining 14 are easier.
  "logic-12-pyq": {
    id: "logic-12-pyq",
    chapterName: "Mathematical Logic",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Mathematical_Logic.docx",
    docx: P1("12th_Part_1_01.Mathematical_Logic.docx"),
    note: note("Mathematical Logic"),
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

  "matrices-12-pyq": {
    id: "matrices-12-pyq",
    chapterName: "Matrices", // compilation says "Matrices and Determinants"
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Matrices.docx",
    docx: P1("12th_Part_1_02.Matrices.docx"),
    note: note("Matrices"),
    subtopics: [
      "Elementary Transformations of a Matrix",
      "Inverse by Elementary Transformation Method",
      "Minors, Cofactors and Adjoint",
      "Inverse by Adjoint Method",
      "Solution of Linear Equations using Matrices",
    ],
  },

  "trig-functions-12-pyq": {
    id: "trig-functions-12-pyq",
    chapterName: "Trigonometric Functions",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Trigonometric_Functions.docx",
    docx: P1("12th_Part_1_03.Trigonometric_Functions.docx"),
    note: note("Trigonometric Functions"),
    subtopics: [
      "Trigonometric Equations and General Solutions",
      "Polar Coordinates",
      "Solution of Triangle — Sine, Cosine and Projection Rules",
      "Applications of Sine, Cosine and Projection Rules",
      "Inverse Trigonometric Functions and Principal Values",
      "Properties of Inverse Trigonometric Functions",
    ],
  },

  "pair-lines-12-pyq": {
    id: "pair-lines-12-pyq",
    chapterName: "Pair of Straight Lines",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Pair_of_Straight_Lines.docx",
    docx: P1("12th_Part_1_04.Pair of Straight_Lines.docx"),
    note: note("Pair of Straight Lines"),
    subtopics: [
      "Combined Equation of a Pair of Lines",
      "Angle between a Pair of Lines",
      "Angle Bisectors of a Pair of Lines",
      "General Second Degree Equation of Two Lines",
    ],
  },

  // Direction cosines / ratios live HERE, not in Line and Planes — verified in
  // the textbook, against the opposite assumption: Ch.5 carries 38 "direction
  // cosine" mentions and a dedicated section 5.3.4 "Direction Angles and
  // Direction Cosines" (inside 5.3 Product of vectors → DB subtopic "Dot Product
  // of Vectors"), while Ch.6's section list opens at 6.1 and has no DC/DR
  // section at all. The shipped bank already files 15 DC/DR practice rows under
  // Vectors → Dot Product, so the PYQs follow that precedent.
  "vectors-12-pyq": {
    id: "vectors-12-pyq",
    chapterName: "Vectors",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Vectors.docx",
    docx: P1("12th_Part_1_05.Vectors.docx"),
    note: note("Vectors"),
    subtopics: [
      "Vectors and Their Types",
      "Section Formula",
      "Dot Product of Vectors",
      "Cross Product of Vectors",
      "Scalar and Vector Triple Product",
    ],
  },

  "line-planes-12-pyq": {
    id: "line-planes-12-pyq",
    chapterName: "Line and Planes", // compilation says "Line and Plane" (singular)
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Line_and_Planes.docx",
    docx: P1("12th_Part_1_06.Line and Plane.docx"),
    note: note("Line and Planes"),
    subtopics: [
      "Vector and Cartesian Equations of a Line",
      "Distance of a Point from a Line",
      "Skew Lines and Shortest Distance",
      "Equations of a Plane",
      "Angle Between Planes and Line-Plane Angle",
      "Coplanarity of Two Lines",
      "Distance of a Point from a Plane",
    ],
  },

  "linear-prog-12-pyq": {
    id: "linear-prog-12-pyq",
    chapterName: "Linear Programming",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Linear_Programming.docx",
    docx: P1("12th_Part_1_07.Linear_Programming.docx"),
    note: note("Linear Programming"),
    subtopics: [
      "Linear Inequations in Two Variables",
      "Formulation of a Linear Programming Problem",
      "Graphical Solution of a Linear Programming Problem",
    ],
  },

  "differentiation-12-pyq": {
    id: "differentiation-12-pyq",
    chapterName: "Differentiation",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Differentiation.docx",
    docx: P2("12th_Part_2_01.Differentiation.docx"),
    note: note("Differentiation"),
    subtopics: [
      "Derivatives of Composite Functions (Chain Rule)",
      "Derivatives of Inverse Functions",
      "Derivatives of Inverse Trigonometric Functions",
      "Logarithmic Differentiation",
      "Derivatives of Implicit Functions",
      "Derivatives of Parametric Functions",
      "Differentiation of One Function with respect to Another",
      "Higher Order Derivatives",
    ],
  },

  "app-derivatives-12-pyq": {
    id: "app-derivatives-12-pyq",
    chapterName: "Application of Derivatives", // compilation says "Applications of Derivatives"
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Application_of_Derivatives.docx",
    docx: P2("12th_Part_2_02.Applications_Of_Derivatives.docx"),
    note: note("Application of Derivatives"),
    subtopics: [
      "Tangents and Normals",
      "Derivative as a Rate Measure",
      "Velocity, Acceleration and Jerk",
      "Approximations",
      "Rolle's Theorem",
      "Lagrange's Mean Value Theorem",
      "Increasing and Decreasing Functions",
      "Maxima and Minima",
    ],
  },

  "indef-integration-12-pyq": {
    id: "indef-integration-12-pyq",
    chapterName: "Indefinite Integration",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Indefinite_Integration.docx",
    docx: P2("12th_Part_2_03.Indefinite_Integration.docx"),
    note: note("Indefinite Integration"),
    subtopics: [
      "Elementary Integration and Standard Formulae",
      "Integration by Substitution",
      "Integrals of Trigonometric Functions",
      "Special Integrals of Quadratic Forms",
      "Integrals of the Type (px+q) over a Quadratic",
      "Integration by Parts",
      "Integration by Partial Fractions",
    ],
  },

  "app-def-integration-12-pyq": {
    id: "app-def-integration-12-pyq",
    chapterName: "Application of Definite Integration",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Application_of_Definite_Integration.docx",
    docx: P2("12th_Part_2_05.Application_of_Definite_Integration.docx"),
    note: note("Application of Definite Integration"),
    subtopics: ["Area Under a Curve", "Area Between Two Curves"],
  },

  "diff-equations-12-pyq": {
    id: "diff-equations-12-pyq",
    chapterName: "Differential Equations",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Differential_Equations.docx",
    docx: P2("12th_Part_2_06.Differential_Equations.docx"),
    note: note("Differential Equations"),
    subtopics: [
      "Order and Degree of a Differential Equation",
      "Formation of a Differential Equation",
      "Solution of a Differential Equation",
      "Applications of Differential Equations",
    ],
  },

  // ── The three chapters the TEXTBOOK ingest never built (it shipped 12 of 15).
  //    Their DB chapters do not exist, so committing here would auto-create bare
  //    chapters with no subtopics and no solved corpus to author against. Phase 1
  //    runs scripts/stateboard/ over Ch_04 / Ch_07 / Ch_08 first (all three PDFs
  //    confirmed present under the stateboard SOURCE_ROOT); then fill `subtopics`
  //    from the DB and drop `blockedOnTextbookChapter`.
  //    ⚠ The three `chapterName`s below are PROVISIONAL — unlike every other
  //    entry in this file they were NOT verified against a live DB row, because
  //    no such row exists yet. Phase 1 creates them from the textbook's own
  //    chapter titles; re-verify these three against the DB afterwards. The
  //    singular/plural is a real hazard ("Binomial Distribution" is what both the
  //    MHT-CET and NDA Maths banks call it; the compilation says "Binomial
  //    Distributions"), and getting it wrong forks the chapter exactly the way
  //    the header warns about.
  "def-integration-12-pyq": {
    id: "def-integration-12-pyq",
    chapterName: "Definite Integration",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Definite_Integration.docx",
    docx: P2("12th_Part_2_04.Definite_Integration.docx"),
    note: note("Definite Integration"),
    subtopics: [],
    blockedOnTextbookChapter: "Part 02/Ch_04_Definite_Integration.pdf",
  },

  "prob-distributions-12-pyq": {
    id: "prob-distributions-12-pyq",
    chapterName: "Probability Distributions",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Probability_Distributions.docx",
    docx: P2("12th_Part_2_07.Probability_Distributions.docx"),
    note: note("Probability Distributions"),
    subtopics: [],
    blockedOnTextbookChapter: "Part 02/Ch_07_Probability_Distributions.pdf",
  },

  "binomial-distributions-12-pyq": {
    id: "binomial-distributions-12-pyq",
    chapterName: "Binomial Distribution",
    subjectName: "Mathematics",
    sourceFile: "MH_HSC_12_Maths_PYQ__Binomial_Distribution.docx",
    docx: P2("12th_Part_2_08.Binomial_Distributions.docx"),
    note: note("Binomial Distribution"),
    subtopics: [],
    blockedOnTextbookChapter: "Part 02/Ch_08_Binomial_Distributions.pdf",
  },
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  const ch = id ? CHAPTERS[id] : undefined;
  if (!ch) {
    throw new Error(
      `Unknown chapter id ${JSON.stringify(id)}. Known: ${Object.keys(CHAPTERS).join(", ")}`,
    );
  }
  return ch;
}
