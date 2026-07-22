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
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
