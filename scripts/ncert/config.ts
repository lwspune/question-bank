// Config for the NCERT (CBSE Class 12) textbook-ingestion pipeline.
//
// Source: the NCERT Class 12 Mathematics textbooks (the CBSE-prescribed books)
// under SOURCE_ROOT. These PDFs carry a full-page background raster on every
// page plus an OCR text layer — the text layer is fine for prose + section→page
// mapping but FLATTENS all 2-D math (integrals, fractions, exponents) into
// unusable vertical token-jumbles. So extraction is VISION-driven: render.ts
// rasterises the pages, one vision agent per exercise transcribes them to
// data/<id>.<sec>.json (math → LaTeX in \(...\)), merge.ts joins them.
//
// A textbook chapter yields three buckets (see ../stateboard/lib.ts `Bucket`):
//   - solved              : worked EXAMPLES with the book's solution → ship PUBLIC
//   - exercise-mcq        : the "Choose the correct answer" MCQ tail of an exercise
//                           (answer from lemh2an.pdf key, re-derived to verify)
//   - exercise-subjective : "find the integral" free-response (solution authored,
//                           final answer cross-checked against lemh2an.pdf)
//
// The NCERT answer key (lemh2an.pdf) gives FINAL answers only (no worked steps)
// and is authoritative + reliable — the step-6 cross-check is a gate, but expect
// far fewer [Textbook…] errata than Balbharati's error-riddled keys.
//
// Committed question_kind='practice', visibility='PRIVATE' (post-commit UPDATE).
// A textbook exercise corpus is not PYQ; CBSE PYQ papers are a later phase under
// the SAME exam. flip-public.ts flips the solved examples + keyed exercises.
import { join } from "node:path";

// LWS Pune org + admin (same identities as the practice / stateboard pipelines).
export { ORG_ID, CREATED_BY } from "../practice/config";
// CBSE Class 12 exam (seeded 2026-07-11); Mathematics subject seeded alongside.
export const EXAM_ID = "9b11f033-14c3-4312-8f03-eca3c3d2c87c";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\NCERT\\Books";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription (source of truth)

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // DB chapter (auto-created on commit)
  subjectName: string; // DB subject (must exist — "Mathematics")
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the chapter PDF
  answersPdf?: string; // absolute path to the end-of-book answers PDF (step-6 cross-check)
  answerPages?: number[]; // 0-based pages of answersPdf holding THIS chapter's key (render.ts --answers)
  pages?: number[]; // 0-based page indices to render; omit → all pages
  note: string; // questions.pyq_note
  // Canonical subtopics for this chapter — transcription maps each question to one.
  subtopics: string[];
};

const cls12Maths = (p: string) => join(SOURCE_ROOT, "12th", "Maths", p);

export const CHAPTERS: Record<string, Chapter> = {
  // ── Validation chapter — Ch.7 Integrals (12th, Part 2). 67pp, ~300 questions.
  //    The hardest common case: dense 2-D math (integrals, fractions, exponents)
  //    the OCR text layer flattens → VISION. Structure: §7.2 (Ex 7.1) …
  //    §7.10 (Ex 7.10) + a Miscellaneous Exercise; each exercise ends with a
  //    "Choose the correct answer" MCQ or two. Subtopics follow the method arc,
  //    not the raw §-labels. Section→page map (0-based):
  //      Ex 7.1 p1-10 · 7.2 p10-16 · 7.3 p16-18 · 7.4 p18-26 · 7.5 p27-33 ·
  //      7.6 p34-38 · 7.7 p38-41 · 7.8 p42-45 · 7.9 p46-48 · 7.10 p48-55 ·
  //      Miscellaneous p56-61.
  integrals: {
    id: "integrals",
    chapterName: "Integrals",
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__Integrals.pdf",
    pdf: cls12Maths("Part 2/01. Integrals.pdf"),
    answersPdf: cls12Maths("Part 2/lemh2an.pdf"), // Ch-7 answers span its p0-p9
    note: "NCERT (CBSE Class 12) — Integrals (Chapter 7, NCERT Mathematics Part 2)",
    subtopics: [
      "Integration as the Inverse of Differentiation",
      "Integration by Substitution",
      "Integration using Trigonometric Identities",
      "Integrals of Some Particular Functions",
      "Integration by Partial Fractions",
      "Integration by Parts",
      "Integrals of Special Forms",
      "Definite Integrals and the Fundamental Theorem",
      "Definite Integrals by Substitution",
      "Properties of Definite Integrals",
    ],
  },

  // ── Ch.3 Matrices (12th, Part 1). 42pp, ~25 solved examples + Ex 3.1–3.4 +
  //    Miscellaneous. HARDEST content type for transcription: the OCR text layer
  //    flattens matrix arrays into interleaved token-jumbles + private-use bracket
  //    glyphs → VISION mandatory, matrices transcribed as LaTeX \begin{bmatrix}
  //    (the shipped State Board Ch.2 Matrices did exactly this). Solved Examples
  //    1–25 are scattered through the teaching prose (p0–37), NOT confined to the
  //    exercise pages, so render ALL pages. Section→page map (0-based):
  //      Ex 3.1 p8-23 · Ex 3.2 p24-31 (MCQ p27) · Ex 3.3 p32-34 (MCQ p34) ·
  //      Ex 3.4 p35-37 · Miscellaneous p38-41 (MCQ p39).
  //    Answers: lemh1an.pdf p1-4 (Ch-3 exercises).
  matrices: {
    id: "matrices",
    chapterName: "Matrices",
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__Matrices.pdf",
    pdf: cls12Maths("Part 1/03. Matrices.pdf"),
    answersPdf: cls12Maths("Part 1/lemh1an.pdf"),
    note: "NCERT (CBSE Class 12) — Matrices (Chapter 3, NCERT Mathematics Part 1)",
    subtopics: [
      "Order and Types of Matrices",
      "Equality of Matrices",
      "Addition and Scalar Multiplication",
      "Multiplication of Matrices",
      "Transpose of a Matrix",
      "Symmetric and Skew-Symmetric Matrices",
      "Elementary Operations and Inverse of a Matrix",
    ],
  },

  // ── Ch.4 Determinants (12th, Part 1). 28pp, ~19 solved examples + Ex 4.1–4.5 +
  //    Miscellaneous. Determinant/matrix arrays flatten in the OCR text layer →
  //    VISION (matrices as \begin{bmatrix}, determinants as \begin{vmatrix}).
  //    The rationalised 2025-26 edition folds "Properties of Determinants" into
  //    §4.2, so the subtopic arc is 5 units. Solved Examples 1–19 are scattered
  //    through the prose (render ALL pages). Section→page map (0-based):
  //      §4.2 Determinant + Ex 1-5 · EXERCISE 4.1 p5 · §4.3 Area of a Triangle +
  //      Ex 6-7 · EXERCISE 4.2 p7 · §4.4 Minors & Cofactors + Ex 8-11 ·
  //      EXERCISE 4.3 p11 · §4.5 Adjoint & Inverse + Ex 12-15 · EXERCISE 4.4 p16 ·
  //      §4.6 Applications + Ex 16-19 · EXERCISE 4.5 p21 · Miscellaneous p23
  //      (MCQ p24). No per-question figures (p0 has only the chapter-opening
  //      portrait). Answers: lemh1an.pdf p4-6 (Ch-4 exercises).
  determinants: {
    id: "determinants",
    chapterName: "Determinants",
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__Determinants.pdf",
    pdf: cls12Maths("Part 1/04. Determinants.pdf"),
    answersPdf: cls12Maths("Part 1/lemh1an.pdf"),
    note: "NCERT (CBSE Class 12) — Determinants (Chapter 4, NCERT Mathematics Part 1)",
    subtopics: [
      "Determinant and its Properties",
      "Area of a Triangle",
      "Minors and Cofactors",
      "Adjoint and Inverse of a Matrix",
      "Solving System of Linear Equations",
    ],
  },

  // ── Ch.1 Relations and Functions (12th, Part 1). 17pp, Examples 1–26 + Ex 1.1,
  //    1.2 + Miscellaneous. Only 2 numbered exercises: the rationalised 2025-26
  //    edition folds composition/invertibility into §1.4, which has NO exercise of
  //    its own (its worked examples are the last of the Miscellaneous Examples).
  //    Section→page map (0-based):
  //      §1.1-1.2 Types of Relations + Eg 1-6 p0-3 · EXERCISE 1.1 p4-5 ·
  //      §1.3 Types of Functions + Eg 7-14 p6-10 (Ex 1.2 opens on p9) ·
  //      §1.4 Composition + Eg 15-17 p11 · Miscellaneous Examples 18-26 p12-14 ·
  //      MISCELLANEOUS EXERCISE p14-15 · Summary p15.
  //    NO per-question figures — the 11 `Fig` refs are all expository (arrow
  //    diagrams in the teaching prose); zero fall inside an exercise. Answers:
  //    lemh1an.pdf p0-1.
  relationsFunctions: {
    id: "relationsFunctions",
    chapterName: "Relations and Functions",
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__RelationsAndFunctions.pdf",
    pdf: cls12Maths("Part 1/01. RELATIONS AND FUNCTIONS.pdf"),
    answersPdf: cls12Maths("Part 1/lemh1an.pdf"),
    answerPages: [0, 1],
    note: "NCERT (CBSE Class 12) — Relations and Functions (Chapter 1, NCERT Mathematics Part 1)",
    subtopics: [
      "Types of Relations",
      "Equivalence Relations and Classes",
      "One-One and Onto Functions",
      "Composition and Invertible Functions",
    ],
  },

  // ── Ch.9 Differential Equations (12th, Part 2). 38pp, Examples 1–22 + Ex 9.1–9.5
  //    + Miscellaneous. Subtopics map 1:1 onto the five exercises. NOTE the
  //    rationalised 2025-26 edition has DROPPED "Formation of a differential
  //    equation whose general solution is given" — §9.4 is now methods-only, so
  //    the formation-of-DE questions in the JEE/MHT-CET banks have no NCERT home.
  //    Section→page map (0-based):
  //      §9.1-9.2 order/degree p0-2 · EXERCISE 9.1 p3 (Eg 1) ·
  //      §9.3 general/particular + Eg 2-3 p4-5 · EXERCISE 9.2 p6 ·
  //      §9.4.1 variables separable + Eg 4-9 p6-9 · EXERCISE 9.3 p10-11 ·
  //      §9.4.2 homogeneous + Eg 10-13 p12-20 · EXERCISE 9.4 p21 ·
  //      §9.4.3 linear + Eg 14-18 p22-27 · EXERCISE 9.5 p28 ·
  //      Miscellaneous Examples 19-22 p29-33 · MISCELLANEOUS EXERCISE p33-35 ·
  //      Summary p36.
  //    The ONLY chapter in the book with ZERO figures of any kind. Answers:
  //    lemh2an.pdf p9-11.
  differentialEquations: {
    id: "differentialEquations",
    chapterName: "Differential Equations",
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__DifferentialEquations.pdf",
    pdf: cls12Maths("Part 2/03. Differential Equations.pdf"),
    answersPdf: cls12Maths("Part 2/lemh2an.pdf"),
    // Ch.9's key spans FOUR pages, not three: the Miscellaneous block spills onto
    // index 12 (printed p451), which carries Misc Q4, Q6-Q12 and the MCQ letters
    // for Q13-Q15. An earlier [9,10,11] under-covered 12 Miscellaneous rows and the
    // cross-check agent had to render index 12 itself to finish the gate — a silent
    // under-coverage, since a missing key page looks exactly like a key that skips
    // the question. Check where a chapter's LAST answer actually sits, not where
    // its first one starts.
    answerPages: [9, 10, 11, 12],
    note: "NCERT (CBSE Class 12) — Differential Equations (Chapter 9, NCERT Mathematics Part 2)",
    subtopics: [
      "Order and Degree of a Differential Equation",
      "General and Particular Solutions",
      "Variables Separable",
      "Homogeneous Differential Equations",
      "Linear Differential Equations",
    ],
  },

  // ── Ch.11 Three Dimensional Geometry (12th, Part 2). 17pp, Examples 1–10 +
  //    Ex 11.1, 11.2 + Miscellaneous. **THE PLANE IS GONE**: the rationalised
  //    2025-26 edition stops at §11.5 (shortest distance between two lines) — no
  //    plane equation, no angle between planes, no line-plane intersection. So
  //    this chapter covers LINES ONLY, and the plane half of what the exam banks
  //    ask under "3D Geometry" has no NCERT home (the syllabus map records the
  //    same gap independently). Section→page map (0-based), VERIFIED against the
  //    rendered pages — a text-layer probe got the within-page ORDER wrong twice
  //    here, so both corrections are recorded rather than the probe's guess:
  //      §11.1-11.2 direction cosines/ratios + Eg 1-5 p0-4 · EXERCISE 11.1 p4
  //        (Eg 4 + Eg 5 come BEFORE the exercise box, so they band as `11.1 Eg.*`;
  //         they are §11.2 content — direction cosines of the axes, collinearity) ·
  //      §11.3 equation of a line + Eg 6 p4-5 · §11.4 angle between lines + Eg 7
  //      p6-7 · §11.5 shortest distance + Eg 8-10 p8-11 · EXERCISE 11.2 p12-13
  //        (SPILLS onto p13: Q8(ii) and Q9-Q15 are printed there) ·
  //      MISCELLANEOUS EXERCISE p13-14 (5 questions, NO Miscellaneous Examples) ·
  //      Summary p14-16.
  //    NO per-question figures (14 `Fig` refs, all expository). **NO MCQs at all**
  //    — so there is no blind-re-derivation anchor here and the chapter rests
  //    entirely on the step-6 answer-key diff. Answers: lemh2an.pdf p14-15.
  threeDGeometry: {
    id: "threeDGeometry",
    chapterName: "Three Dimensional Geometry",
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__ThreeDimensionalGeometry.pdf",
    pdf: cls12Maths("Part 2/05. 3D Vectors.pdf"),
    answersPdf: cls12Maths("Part 2/lemh2an.pdf"),
    answerPages: [14, 15],
    note: "NCERT (CBSE Class 12) — Three Dimensional Geometry (Chapter 11, NCERT Mathematics Part 2)",
    subtopics: [
      "Direction Cosines and Direction Ratios",
      "Equation of a Line in Space",
      "Angle Between Two Lines",
      "Shortest Distance Between Two Lines",
    ],
  },

  // ── Ch.13 Probability (12th, Part 2). 33pp, Examples 1–24 + Ex 13.1–13.3 +
  //    Miscellaneous. **RANDOM VARIABLES AND THE BINOMIAL DISTRIBUTION ARE GONE**:
  //    the rationalised 2025-26 edition ends at Bayes' theorem (§13.5), so MHT-CET's
  //    "Probability Distribution" corpus and NDA's binomial work have no NCERT home.
  //    Section→page map (0-based):
  //      §13.1-13.2 conditional probability + Eg 1-7 p0-6 · EXERCISE 13.1 p7-8 ·
  //      §13.3 multiplication theorem + Eg 8-9 p9-10 · §13.4 independent events +
  //      Eg 10-14 p11-14 · EXERCISE 13.2 p15-16 · §13.5 partition/total
  //      probability/Bayes + Eg 15-21 p17-24 · EXERCISE 13.3 p25-26 ·
  //      Miscellaneous Examples 22-24 p27-29 · MISCELLANEOUS EXERCISE p29-30 ·
  //      Summary p31.
  //    NO per-question figures (8 `Fig` refs, all expository — the partition
  //    diagram and two Venn sketches). Answers: lemh2an.pdf p16-18.
  probability: {
    id: "probability",
    chapterName: "Probability",
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__Probability.pdf",
    pdf: cls12Maths("Part 2/07. Probability.pdf"),
    answersPdf: cls12Maths("Part 2/lemh2an.pdf"),
    answerPages: [16, 17, 18],
    note: "NCERT (CBSE Class 12) — Probability (Chapter 13, NCERT Mathematics Part 2)",
    subtopics: [
      "Conditional Probability",
      "Multiplication Theorem on Probability",
      "Independent Events",
      "Theorem of Total Probability",
      "Bayes' Theorem",
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
