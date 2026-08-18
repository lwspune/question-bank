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
export const EXAM_ID_CBSE_12 = "9b11f033-14c3-4312-8f03-eca3c3d2c87c";
// CBSE Class 11 exam (seeded 2026-08-17); its own Mathematics subject alongside.
// A SEPARATE exam, not a fold into Class 12: Class 11 is not a board year, so it
// can never carry PYQs and the textbook corpus IS its whole bank (the mh-sb-11
// shape). See src/lib/exam/examContext.ts.
export const EXAM_ID_CBSE_11 = "383dd115-0583-40ac-9c07-81a5fdd8aa30";

/**
 * Every exam this pipeline writes to, newest class first. Used by the
 * cross-chapter aggregates (errata.ts) that have no single chapter in scope.
 *
 * A chapter NAME does not identify a class — Relations and Functions,
 * Probability and Three Dimensional Geometry each exist in both — so anything
 * grouping across classes must carry the exam id, never the chapter name.
 */
export const NCERT_EXAMS = [
  { examId: "383dd115-0583-40ac-9c07-81a5fdd8aa30", label: "CBSE Class 11" },
  { examId: "9b11f033-14c3-4312-8f03-eca3c3d2c87c", label: "CBSE Class 12" },
] as const;

// NOTE — there is deliberately NO module-level `EXAM_ID` any more. It was one
// const for Class 12, imported by ~10 scripts as `.eq("exam_id", EXAM_ID)`.
// Adding a second class to this pipeline made that a cross-exam-write hazard:
// one missed call site silently scopes a Class-11 write to the Class-12 exam,
// and no gate would see it. Removing the export instead of defaulting it makes
// the TYPECHECKER enumerate every call site — the same technique the syllabus
// loaders used when `subject` became required. Read the id off the chapter.

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\NCERT\\Books";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription (source of truth)

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  /**
   * Which CBSE exam this chapter belongs to. REQUIRED — never defaulted, so a
   * new chapter cannot silently inherit the wrong class's exam (see the note on
   * EXAM_ID_CBSE_12 above). Class-11 chapter ids carry a `c11` prefix because
   * Relations and Functions, Probability and Three Dimensional Geometry all
   * exist in BOTH classes and share this pipeline's flat data/ directory.
   */
  examId: string;
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
// Class 11 ships as 14 pre-split chapter PDFs in ONE folder (no Part 1/Part 2
// split), with the end-of-book answers in kemh1an.pdf alongside them.
const cls11Maths = (p: string) => join(SOURCE_ROOT, "11th", "Maths", p);

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
    examId: EXAM_ID_CBSE_12,
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
    examId: EXAM_ID_CBSE_12,
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
    examId: EXAM_ID_CBSE_12,
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
    examId: EXAM_ID_CBSE_12,
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
    examId: EXAM_ID_CBSE_12,
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
    examId: EXAM_ID_CBSE_12,
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
    examId: EXAM_ID_CBSE_12,
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
  // ── Ch.2 Inverse Trigonometric Functions (12th, Part 1). 16pp, Examples 1–6 +
  //    Ex 2.1, 2.2 + Miscellaneous. Section→(page, y) map (0-based, y = block top
  //    on the rendered page — bands are cut by (page, y), never by page):
  //      §2.1 Intro + §2.2 Basic Concepts p0 · Eg 1-2 p8 (y242, y357) ·
  //      EXERCISE 2.1 p8 y504 → SPILLS to p9 (runs to §2.3 at p9 y356) ·
  //      §2.3 Properties p9 y356 · Eg 3-4 p10 · Eg 5 p11 y112 ·
  //      EXERCISE 2.2 p11 y225 → SPILLS to p12 (runs to Misc Examples p12 y390) ·
  //      MISCELLANEOUS EXAMPLES p12 y390 (Eg 6) · MISC EXERCISE p13 y96 → p14 ·
  //      Summary p14 · Historical Note p15.
  //    **The chapter prints NO "choose the correct answer" instruction anywhere,
  //    and still HAS MCQs** — ~7, detected by the four-alternative SHAPE (28 (A)-(D)
  //    labels across the three exercises). Keying MCQ detection on the instruction
  //    line reports zero here. This is the same within-one-book inconsistency the
  //    2026-08-16 batch found between Probability and Differential Equations.
  //    NO per-question figures: all 20 `Fig` refs sit in the §2.2/§2.3 teaching
  //    prose (the graphs of the inverse functions); zero fall inside an exercise.
  //    Answers: lemh1an.pdf p1 ENTIRELY (Ex 2.1 y95 · Ex 2.2 y245 · Misc y418 ·
  //    Ch.3 starts y497 on the same page).
  inverseTrig: {
    id: "inverseTrig",
    chapterName: "Inverse Trigonometric Functions",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__InverseTrigonometricFunctions.pdf",
    pdf: cls12Maths("Part 1/02. Inverse Trigonometry.pdf"),
    answersPdf: cls12Maths("Part 1/lemh1an.pdf"),
    answerPages: [1],
    note: "NCERT (CBSE Class 12) — Inverse Trigonometric Functions (Chapter 2, NCERT Mathematics Part 1)",
    subtopics: [
      "Domains, Ranges and Principal Value Branches",
      "Evaluating Inverse Trigonometric Expressions",
      "Properties of Inverse Trigonometric Functions",
    ],
  },

  // ── Ch.5 Continuity and Differentiability (12th, Part 1). 43pp — THE BOOK'S
  //    LARGEST CHAPTER: Examples 1–43 + Ex 5.1–5.7 + Miscellaneous, ~137 exercise
  //    questions. Section→(page, y) map (0-based):
  //      §5.1 + §5.2 Continuity p0 · Eg 1-20 p2-11 · EXERCISE 5.1 p12 y100 → p16 ·
  //      §5.2.1 Algebra of continuous functions p9 y269 ·
  //      §5.3.1 Derivatives of composite functions p16 y556 · Eg 21 p17 ·
  //      EXERCISE 5.2 p18 y244 · §5.3.2 Implicit p18 y464 · Eg 22-23 p19 ·
  //      §5.3.3 Inverse trigonometric p20 y97 · Eg 24 p20 y144 ·
  //      EXERCISE 5.3 p21 y96 · §5.4 Exponential and Logarithmic p21 y463 ·
  //      Eg 25-26 p25 · EXERCISE 5.4 p26 y214 · Eg 27-30 p27-28 ·
  //      EXERCISE 5.5 p30 y96 · §5.6 Parametric p30 y564 · Eg 31-34 p31-32 ·
  //      EXERCISE 5.6 p33 y96 · §5.7 Second Order Derivative p33 y365 ·
  //      Eg 35-38 p34-35 · EXERCISE 5.7 p35 y489 ·
  //      MISCELLANEOUS EXAMPLES p36 y303 (Eg 39-43, the last on p40 before y367) ·
  //      MISC EXERCISE p40 y367 → p42 · Summary p42.
  //    **ZERO MCQs — none of the 8 exercise regions carries a single (A)-(D) option
  //    label.** So there is NO blind-re-derivation anchor here and the chapter rests
  //    ENTIRELY on the step-6 answer-key diff. Say so when reporting it; it is
  //    weaker evidence than every other chapter in this batch except LP.
  //    **§5.5 IS printed, and the claim that it wasn't was a PROBE ARTEFACT** — the
  //    same one this repo already recorded for mh-sb-11's §9.2.1 and failed to
  //    apply here. The book prints `5.5.  Logarithmic Differentiation` on p26 with
  //    a TRAILING DOT, where every sibling heading prints `5.4 `/`5.6 ` with none,
  //    so a regex demanding whitespace straight after the number skips it. Verified
  //    on the page. Rule: before recording that a book omits a heading, re-probe
  //    with the number's punctuation optional — an absent heading is a claim about
  //    the source and needs the same evidence as any other.
  //    NO per-question figures (13 `Fig` refs, all expository — continuity sketches).
  //    Answers: lemh1an.pdf p6 y546 → p10 y266 (Misc). **NOT p15** — that page is
  //    SUPPLEMENTARY MATERIAL for Chapter 5 (a theorem "to be on page 129": the
  //    derivatives of e^x and log_e x from first principles), not an answer block.
  //    A cross-check agent handed p15 would be diffing against teaching prose.
  continuityDiff: {
    id: "continuityDiff",
    chapterName: "Continuity and Differentiability",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__ContinuityAndDifferentiability.pdf",
    pdf: cls12Maths("Part 1/05. Continuity and Differentiability.pdf"),
    answersPdf: cls12Maths("Part 1/lemh1an.pdf"),
    answerPages: [6, 7, 8, 9, 10],
    note: "NCERT (CBSE Class 12) — Continuity and Differentiability (Chapter 5, NCERT Mathematics Part 1)",
    subtopics: [
      "Continuity",
      "Differentiability and the Chain Rule",
      "Derivatives of Implicit and Inverse Trigonometric Functions",
      "Derivatives of Exponential and Logarithmic Functions",
      "Logarithmic Differentiation",
      "Derivatives of Functions in Parametric Form",
      "Second Order Derivatives",
    ],
  },

  // ── Ch.6 Application of Derivatives (12th, Part 1). 40pp, Examples 1–37 +
  //    Ex 6.1–6.3 + Miscellaneous. Section→(page, y) map (0-based):
  //      §6.1 + §6.2 Rate of Change p0 · Eg 1-6 p1-3 · EXERCISE 6.1 p3 y438 → p5 ·
  //      §6.3 Increasing and Decreasing p5 y157 · Eg 7-13 p6-10 ·
  //      EXERCISE 6.2 p11 y245 → p12 · §6.4 Maxima and Minima p12 y535 ·
  //      Eg 14-26 p14-23 · §6.4.1 Closed Interval p24 y407 · Eg 27-29 p26-27 ·
  //      EXERCISE 6.3 p27 y534 → p30 · MISCELLANEOUS EXAMPLES p30 y312 (Eg 30-37) ·
  //      MISC EXERCISE p36 y392 → p38 · Summary p38.
  //    **RATIONALISATION GAP: TANGENTS & NORMALS AND APPROXIMATIONS ARE GONE.**
  //    The 2025-26 edition's numbered sections are 6.1, 6.2, 6.3, 6.4, 6.4.1 only —
  //    no equation-of-tangent/normal, no dy≈f'(x)dx approximation. Both are live in
  //    the JEE / MHT-CET / NDA banks and now have no NCERT home.
  //    NO per-question figures: 45 `Fig` refs, ALL in the teaching prose (the
  //    increasing/decreasing and maxima sketches); zero fall inside an exercise.
  //    Answers: lemh1an.pdf p11 y100 → **p14**, and p14 is the trap: it carries the
  //    Ch.6 Miscellaneous tail (Q5, 6, 8, 10, 11, 14, 16) and has NO heading marker
  //    of any kind, so a marker-driven page map drops it silently — the same shape
  //    as the Differential Equations under-coverage above. Check where a chapter's
  //    LAST answer sits, not where its first one starts.
  appDerivatives: {
    id: "appDerivatives",
    chapterName: "Application of Derivatives",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__ApplicationOfDerivatives.pdf",
    pdf: cls12Maths("Part 1/06. Applications_of_Derivatives.pdf"),
    answersPdf: cls12Maths("Part 1/lemh1an.pdf"),
    answerPages: [11, 12, 13, 14],
    note: "NCERT (CBSE Class 12) — Application of Derivatives (Chapter 6, NCERT Mathematics Part 1)",
    subtopics: [
      "Rate of Change of Quantities",
      "Increasing and Decreasing Functions",
      "Maxima and Minima",
      "Absolute Maximum and Minimum on a Closed Interval",
    ],
  },

  // ── Ch.8 Application of Integrals (12th, Part 2). 8pp — the SMALLEST chapter in
  //    the book: Examples 1–4 + Ex 8.1 (4 q) + Miscellaneous (5 q).
  //    Section→(page, y) map (0-based):
  //      §8.1 Intro p0 · §8.2 Area under Simple Curves p0 · Eg 1 p2 · Eg 2 p3 ·
  //      EXERCISE 8.1 p4 y300 → p4 y543 · MISCELLANEOUS EXAMPLES p4 y543 (Eg 3-4) ·
  //      MISC EXERCISE p6 y79 → p6 y379 · Summary p6 y379.
  //    The rationalised edition keeps §8.1 and §8.2 ONLY — no area-between-two-curves
  //    section, no area of a region bounded by a curve and a line as its own section.
  //    NO per-question figure refs inside either exercise. BUT this is one of the two
  //    chapters that gets AUTHORED `solution_image` diagrams (render_solution_diagrams
  //    .py): the shaded area region IS the answer, so a diagram is the model answer's
  //    natural companion — the shipped State Board Application-of-Definite-Integration
  //    chapter made the same call (40 diagrams). Answers: lemh2an.pdf p9 ENTIRELY
  //    (Ex 8.1 y270 · Misc y325 · Ch.9 starts y409 on the same page).
  appIntegrals: {
    id: "appIntegrals",
    chapterName: "Application of Integrals",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__ApplicationOfIntegrals.pdf",
    pdf: cls12Maths("Part 2/02. Applications of Integrals.pdf"),
    answersPdf: cls12Maths("Part 2/lemh2an.pdf"),
    answerPages: [9],
    note: "NCERT (CBSE Class 12) — Application of Integrals (Chapter 8, NCERT Mathematics Part 2)",
    subtopics: ["Area Under Simple Curves", "Area Bounded by a Curve and a Line"],
  },

  // ── Ch.10 Vector Algebra (12th, Part 2). 39pp, Examples 1–30 + Ex 10.1–10.4 +
  //    Miscellaneous. Section→(page, y) map (0-based):
  //      §10.1 + §10.2 Basic Concepts p0 · §10.3 Types of Vectors p3 y107 ·
  //      Eg 1-3 p3-4 · EXERCISE 10.1 p4 y312 (5 q, ends on p4) ·
  //      §10.4 Addition p5 y78 · §10.5 Scalar multiplication p8 y199 ·
  //      §10.5.1 Components p9 y160 · Eg 4-9 p11-13 · §10.5.2 Vector joining two
  //      points p13 y302 · Eg 10 p14 · §10.5.3 Section formula p14 y208 ·
  //      Eg 11-12 p15 · EXERCISE 10.2 p16 y143 → SPILLS to p17 (runs to §10.6 at
  //      p17 y363) · §10.6 + §10.6.1 Dot product p17 · §10.6.2 Projection p19 y293 ·
  //      Eg 13-21 p20-23 · EXERCISE 10.3 p23 y417 → SPILLS to p24 (runs to §10.6.3
  //      at p24 y538 — nearly the whole page) · §10.6.3 Cross product p24 y538 ·
  //      Eg 22-25 p28-30 · EXERCISE 10.4 p30 y282 → p31 (to Misc Examples p31 y263) ·
  //      MISCELLANEOUS EXAMPLES p31 y263 (Eg 26-30) · MISC EXERCISE p34 y78 → p35 ·
  //      Summary p35 y421 · Historical Note p37.
  //    **THE ONLY CHAPTER IN CLASS 12 MATHS WITH A PER-QUESTION FIGURE — and there
  //    is exactly ONE**: Fig 10.6, on p4, which Ex 10.1 Q4 reads its answer off
  //    ("In Fig 10.6 (a square), identify the following vectors: coinitial /
  //    equal / collinear but not equal"). The stem names no vectors at all and the
  //    answer turns entirely on which way each arrowhead points, so all three
  //    sub-item rows Q4(i)/(ii)/(iii) carry the crop. Cropped by snap-crop.ts +
  //    attach-images.ts into `image_url`.
  //    A whole-chapter `Fig` count says 23 and is the WRONG number: every other ref
  //    is expository, sitting in the teaching prose. Scope the count to the text
  //    between an EXERCISE header and the next structural heading.
  //    **Fig 10.18 (Ex 10.2 Q18) is NOT a second one, and the claim that it was is
  //    a cautionary tale.** An earlier note asserted "Ex 10.2 Q18 reads angles off
  //    Fig 10.18 — confirmed real"; nobody had looked at the figure. Cropped and
  //    examined at 3x it is a plain triangle labelled A, B, C with three arrows and
  //    **no angles, no lengths, no measurements of any kind**, while every option
  //    in Q18 is a pure identity in the labels A, B, C that the stem supplies in
  //    words. The question is fully answerable from its own text. The figure is
  //    still attached — the stem cites it by name, so leaving it off dangles the
  //    reference on /board — but as PRESENTATION, not answerability. A text probe
  //    finds a figure REFERENCE; only looking at the figure finds a dependency.
  //    Answers: lemh2an.pdf p12 y242 → p14 y141 (Misc; Ch.11 starts p14 y406).
  vectorAlgebra: {
    id: "vectorAlgebra",
    chapterName: "Vector Algebra",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__VectorAlgebra.pdf",
    pdf: cls12Maths("Part 2/04. Vectors.pdf"),
    answersPdf: cls12Maths("Part 2/lemh2an.pdf"),
    answerPages: [12, 13, 14],
    note: "NCERT (CBSE Class 12) — Vector Algebra (Chapter 10, NCERT Mathematics Part 2)",
    subtopics: [
      "Types of Vectors",
      "Addition of Vectors",
      "Components and Direction Cosines",
      "Section Formula",
      "Scalar (Dot) Product and Projection",
      "Vector (Cross) Product",
    ],
  },

  // ── Ch.12 Linear Programming (12th, Part 2). 12pp, Examples 1–5 + Ex 12.1 (10 q).
  //    Section→(page, y) map (0-based):
  //      §12.1 Intro p0 · §12.2 LPP and its Mathematical Formulation p1 y78 ·
  //      §12.2.1 Mathematical formulation p1 y419 · §12.2.2 Graphical method p3 y135 ·
  //      Eg 1-5 p5-9 · EXERCISE 12.1 p9 y527 → SPILLS to p10 (runs to Summary at
  //      p10 y395) · Summary p10 · Historical Note p10 y496.
  //    **NO MISCELLANEOUS EXERCISE AT ALL** — one exercise, and that is the whole
  //    chapter. Verified by a full heading sweep, not inferred from a regex miss.
  //    **ZERO MCQs** (no (A)-(D) option label anywhere in the exercise), so like
  //    Continuity this chapter has no blind-re-derivation anchor.
  //    The 15 `Fig` refs are all in the teaching prose. Like Application of
  //    Integrals it gets AUTHORED `solution_image` diagrams: the feasible region IS
  //    the method, and the shipped State Board Linear Programming chapter reached
  //    the same conclusion (65 diagrams, the highest density of any chapter).
  //    Answers: lemh2an.pdf p15 y396 → **p16** (Q7-Q10 are printed at the top of
  //    p16, above EXERCISE 13.1 at y239) — another chapter whose key spills onto a
  //    page its own heading never reaches.
  linearProgramming: {
    id: "linearProgramming",
    chapterName: "Linear Programming",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Mathematics",
    sourceFile: "NCERT_12_Maths__LinearProgramming.pdf",
    pdf: cls12Maths("Part 2/06. Linear Programming.pdf"),
    answersPdf: cls12Maths("Part 2/lemh2an.pdf"),
    answerPages: [15, 16],
    note: "NCERT (CBSE Class 12) — Linear Programming (Chapter 12, NCERT Mathematics Part 2)",
    // ONE subtopic, and that is a finding rather than laziness. A second,
    // `Mathematical Formulation of an LPP`, was planned off the §12.2/§12.2.1
    // headings and dropped once the chapter was read: §12.2.2 starts on p3, so
    // ALL five worked Examples and ALL ten exercise questions sit inside it, and
    // every one of the 15 states its objective and constraints symbolically —
    // **there is not a single word problem in the chapter**. The rationalised
    // edition's only formulation walkthrough is the furniture-dealer narrative
    // embedded in §12.2.1 prose, which is neither an Example nor an exercise.
    // Keeping the second subtopic would have shipped a filter that always
    // returns nothing.
    subtopics: ["Graphical Solution and the Feasible Region"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NCERT CLASS 11 (exam `cbse-11`). Same publisher, same structure, same
  // answer-key format as Class 12 — hence the same pipeline rather than a fork.
  //
  // THREE measured facts that differ from Class 12 and shape every chapter here
  // (probed over all 14 chapter PDFs, 313pp, 2026-08-17):
  //
  // 1. THE BOOK CONTAINS ZERO MCQs. No "Choose the correct answer" instruction
  //    anywhere, and no four-option run in any chapter, against 29 in Class 12.
  //    So `dump-mcq`/`mark-mcq-verify` have nothing to do here and the blind
  //    MCQ re-derivation that anchors the other pipelines is UNAVAILABLE. The
  //    compensating control is that the answer key is complete (below) — and on
  //    the Class-12 evidence it is the stronger one anyway: its 29/29 blind MCQ
  //    pass found nothing, while the key diff found all 4 genuine key errors.
  //
  //    COROLLARY, so nobody chases it: `npm run audit:keys -- <source>` ALWAYS
  //    reports "0 scanned / NOTHING SCANNED" for a Class-11 chapter, and that
  //    alarm is FALSE here. The probe filters to `question_format is null OR =
  //    'mcq'` and every row in this book is `subjective`, so there is genuinely
  //    nothing in its scope. Its message ("no practice question has a
  //    source_file containing …") is inaccurate in this case — the rows exist,
  //    they are simply not MCQs. Verified on Binomial Theorem: 24 rows present,
  //    0 in the probe's scope.
  //
  // 2. THE ANSWER KEY IS COMPLETE. kemh1an.pdf (22pp) has a section for every
  //    exercise of all 14 chapters INCLUDING every one of the 14 Miscellaneous
  //    blocks — zero gaps. So the step-6 cross-check gate runs on everything.
  //    `answerPages` below were read at each chapter's LAST answer, not its
  //    first, and carry a spill page (the Class-12 Differential Equations trap,
  //    where 12 rows sat on a page the chapter's own heading never reached).
  //
  // 3. THE TEXT LAYER IS ARITHMETICALLY LOSSY, worse than Class 12's. `√`
  //    occurs ZERO times across all 14 chapters — including Complex Numbers and
  //    Conic Sections — because radicals are drawn, not set: on a Conic Sections
  //    page √((x−a)²+y²) extracts as `2 2 ( ) x – a y +`, the radical gone and
  //    the terms reordered. Fractions interleave and the minus sign is an
  //    en-dash. VISION ONLY, which is already this pipeline's mode.
  //
  // A transcription-brief note earned by the probe: the book prints `Example10`
  // and `8.4.2` WITHOUT a following space in places, so any agent-side regex
  // keyed on `Example\s+\d+` silently misses rows (it made Examples 10 and 12 of
  // ch.8 look absent until the spacing was checked — the mh-sb-11 §9.2.1
  // trailing-dot artefact in a new costume). Bands are cut at BLOCK boundaries.
  c11ComplexNumbers: {
    id: "c11ComplexNumbers",
    examId: EXAM_ID_CBSE_11,
    // The book's printed chapter name, kept verbatim per the follow-the-book
    // rule — but note it PROMISES CONTENT IT NO LONGER TEACHES. The rationalised
    // edition's sections run 4.1–4.5 (Introduction · Complex Numbers · Algebra ·
    // Modulus and Conjugate · Argand Plane) and there is NO quadratic-equations
    // section at all. The bank carries Quadratic Equations as a separate
    // 187-PYQ chapter with no NCERT home — the same shape as Class 12's dropped
    // tangents-and-normals. Do NOT "fix" the name to match the content.
    chapterName: "Complex Numbers and Quadratic Equations",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__ComplexNumbers.pdf",
    pdf: cls11Maths("04. Complex Numbers.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    // Ch-4 key: 4.1 opens on p5 (below Misc-3), Misc-4 on p6; ch5's 5.1 heading
    // is also on p6, which is what bounds the block.
    answerPages: [5, 6],
    note: "NCERT (CBSE Class 11) — Complex Numbers and Quadratic Equations (Chapter 4, NCERT Mathematics)",
    // Page map (0-based), CORRECTED against the pages during transcription:
    //   §4.1–4.2 p0 · **Eg.1** + §4.3–4.3.2 p1 · §4.3.3–4.3.4 p2 ·
    //   §4.3.5–4.3.6 p3 · §4.3.7 + Eg.2 p4 · §4.4 + Eg.3–4 p5 ·
    //   Eg.5–6 + **EXERCISE 4.1 Q1–Q3** p6 · **EXERCISE 4.1 Q4–Q14** then §4.5
    //   Argand p7 · §4.5 cont. p8 · Miscellaneous + Eg.7–8 p9–p10 ·
    //   Summary + Historical Note p11–p12.
    //
    // EXERCISE 4.1 SPANS p6 AND p7 — p6 carries only Q1–Q3 and ELEVEN of its 14
    // questions are overleaf. Fifth confirmed mid-block page break in this pilot.
    // §4.5 then OPENS on p7 below Q14, so p7 is shared.
    //
    // NO figure is cited by any ingested row — Figs 4.1–4.3 are Argand-plane
    // teaching illustrations and every question is algebraic.
    //
    // Stale intro, same shape as Class-12 Ch.6 and worse than "no quadratics":
    // §4.1 still states "the main objective is to solve the equation
    // ax² + bx + c = 0, where D = b² − 4ac < 0" — content the rationalised
    // chapter never delivers. (The p0 QR code reads 11076CH05: this was
    // Chapter 5 before rationalisation.)
    // NO `Argand Plane and Polar Representation` subtopic, and that is a finding
    // rather than an omission — the Class-12 Linear Programming precedent. It was
    // planned off the §4.5 heading and dropped once the chapter was read, for two
    // independent structural reasons: (a) NO exercise follows §4.5 (the chapter
    // has exactly two question blocks, EXERCISE 4.1 and the Miscellaneous — there
    // is no Exercise 4.2), and (b) the rationalised edition teaches no polar
    // representation AT ALL — no argument, no r(cos θ + i sin θ), no
    // modulus–argument form. §4.5 covers only the Argand plane, |z| as a distance
    // and the conjugate as a mirror image. **The section TITLE is stale relative
    // to its own content.** Not one question in the chapter concerns the Argand
    // plane, so keeping the subtopic would ship a filter that always returns
    // nothing, and forcing a row into it would be a fabrication.
    subtopics: [
      "Complex Numbers and the Imaginary Unit",
      "Algebra of Complex Numbers",
      "Modulus and Conjugate",
    ],
  },

  c11BinomialTheorem: {
    id: "c11BinomialTheorem",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Binomial Theorem",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__BinomialTheorem.pdf",
    pdf: cls11Maths("07. Binomial Theorem.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    // Ch-7 key: 7.1 AND Misc-7 both on p8; ch8's 8.1 heading opens p9, so a
    // Misc-7 tail would sit above it — p9 is the spill margin, not a second block.
    answerPages: [8, 9],
    note: "NCERT (CBSE Class 11) — Binomial Theorem (Chapter 7, NCERT Mathematics)",
    // The THINNEST chapter in the book: 9pp, 24 rows (4 solved + 20 exercise),
    // and the rationalised edition has cut it to §7.1–§7.2.2 — no general term,
    // no middle term, no Pascal-triangle extensions.
    //
    // Page map, CORRECTED against the pages during transcription (the version
    // derived from where each EXERCISE header appears was wrong about EXTENT):
    //   §7.1–7.2 p0 · Pascal's-triangle figs p1–p2 (teaching only) · §7.2.1 p3 ·
    //   §7.2.2 + Observations p4 (§7.2.2 finishes on p5) · Eg.1–2 p5 ·
    //   **Eg.3 spans p5→p6** · Eg.4 THEN **EXERCISE 7.1 Q1–Q3** p6 ·
    //   **EXERCISE 7.1 Q4–Q14** + Miscellaneous + Summary p7 · Historical Note p8.
    //
    // EXERCISE 7.1 SPANS p6 AND p7: p6 carries only Q1–Q3 and ELEVEN of its 14
    // questions are overleaf. A band cut at that page boundary would have
    // dropped them silently — the reason bands are cut at BLOCK boundaries and
    // every agent is told to report on territory it does not own.
    //
    // Ex 7.1 has 14 questions and the printed key covers Q1–Q12; Q13 and Q14
    // are proofs ("Show that…", "Prove that…"), which is the class this key
    // skips. Miscellaneous has 6, of which Q1 is a proof and the key covers
    // Q2–Q6. A missing key entry here is NOT a defect.
    //
    // Publisher-report item with no question to hang a bracket on: the p8
    // Historical Note says Pascal's triangle "was constructed by ... Blaise
    // Pascal (1623-1662) in 1665" — three years after the death date printed in
    // the same sentence; the book's own next paragraph gives 1665 as the
    // POSTHUMOUS publication year of the Traité. It also prints "Michael
    // Stipel" for Stifel. Prose only; touches no row.
    subtopics: [
      "Binomial Theorem for Positive Integral Indices",
      "Special Cases and Applications",
    ],
  },

  c11SequencesSeries: {
    id: "c11SequencesSeries",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Sequences and Series",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__SequencesSeries.pdf",
    pdf: cls11Maths("08. Sequence And Series.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    // Ch-8 key: 8.1 + 8.2 on p9, Misc-8 on p10 (ch9's 9.1 is also on p10).
    answerPages: [9, 10],
    note: "NCERT (CBSE Class 11) — Sequences and Series (Chapter 8, NCERT Mathematics)",
    // ANOTHER rationalisation gap worth knowing before authoring: there is NO
    // ARITHMETIC PROGRESSION section. The chapter runs §8.1 Introduction ·
    // §8.2 Sequences · §8.3 Series · §8.4 G.P. (+8.4.1–8.4.3) · §8.5 A.M.–G.M.,
    // so A.P., H.P. and the special sums are simply absent — consistent with the
    // syllabus map's finding for this book. Do not author an A.P. subtopic.
    // ZERO figure references in the entire chapter.
    //
    // Page map, CORRECTED against the pages during transcription:
    //   §8.1–8.2 p0 · §8.3 + Eg.1 p2 · **EXERCISE 8.1 Q1–Q10** + Eg.2–3 p3 ·
    //   **EXERCISE 8.1 Q11–Q14** then §8.4 p4 · §8.4.1/8.4.2 + Eg.4 p5 ·
    //   Eg.5–8 p6 · Eg.9–10 p7 · Eg.11 then §8.4.3 p8 · Eg.12 then §8.5 + Eg.13
    //   p9 · **EXERCISE 8.2 Q1–Q15** p10 · **Q16–Q30** p11 · **Q31–Q32** then
    //   Miscellaneous + Eg.14 p12–p13 · Summary p14.
    //
    // BOTH exercises break mid-block: Ex 8.1's last 4 questions sit above the
    // §8.4 heading, and Ex 8.2 spans THREE pages with Q31–Q32 above the
    // Miscellaneous heading. Counts verified against the printed key:
    // Ex 8.1 = 14 · Ex 8.2 = 32 · Miscellaneous = 18.
    //
    // The Miscellaneous heading prints "Miscellaneous Exercise On Chapter 8"
    // with a capital "On" — the only one in the book that does. §8.4.2 prints
    // with a trailing dot ("8.4.2.") where §8.4.1 does not.
    //
    // TWO findings for whoever authors solutions here:
    //  · **Misc Q13/Q14/Q16/Q18 are A.P. problems in a chapter with no A.P.
    //    section** (instalment interest, simple interest, a 150→146→142 workforce).
    //    The A.P. sum formula must be imported from outside the chapter. The
    //    printed key DOES answer all four, so they ship — but say plainly in the
    //    solution that the tool comes from elsewhere. Exactly the Class-12 Ch.13
    //    situation, where the chapter no longer teaches the binomial distribution
    //    yet its Misc Q4 still requires it.
    //  · **§8.4.2 has a PRINTING HOLE.** It derives (1−r)Sₙ = a(1−rⁿ) and then
    //    prints "This gives ⟨blank⟩ or Sₙ = a(rⁿ−1)/(r−1)" — the form
    //    Sₙ = a(1−rⁿ)/(1−r) is absent from the page. Not deliberate: the
    //    chapter's own Summary prints both forms and Examples 7 and 8 both USE
    //    the missing one, so a student meets it first inside a worked example
    //    with no derivation behind it. Teaching prose, so no row carries it.
    //
    // §8.1 Introduction is also stale — it still promises arithmetic mean and
    // the sums of consecutive naturals/squares/cubes, none of which survived
    // rationalisation; the Historical Note still credits Aryabhatta for them.
    subtopics: [
      "Sequences and Series",
      "Geometric Progression",
      "Geometric Mean and the A.M.–G.M. Relationship",
    ],
  },

  c11ConicSections: {
    id: "c11ConicSections",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Conic Sections",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__ConicSections.pdf",
    pdf: cls11Maths("10. Conic Section.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    // Ch-10 key spans FOUR pages — 10.1+10.2 p12 · 10.3 p13 · 10.4 p14 ·
    // Misc-10 p15 (ch11's 11.1 is also on p15, which bounds it).
    answerPages: [12, 13, 14, 15],
    note: "NCERT (CBSE Class 11) — Conic Sections (Chapter 10, NCERT Mathematics)",
    // The heaviest chapter of the pilot (32pp), transcribed in FOUR bands, and
    // the one that retires the FIGURE lane. Its whole-chapter figure count is 66,
    // which is misleading: scoped to rows we ingest AND to stems, it is exactly
    // ONE — Fig 10.31, cited twice in the stem of Miscellaneous Example 17 ("the
    // focus of a parabolic mirror as shown in Fig 10.31 … find the distance AB").
    // Figs 10.32/10.33 were attached on a first pass and then DROPPED: band D
    // checked the pages and both are cited only INSIDE the book's printed
    // solution, which the row carries in full, so there is no dangling reference
    // for a reader to resolve and the brief's own rule applies. NOT ONE exercise
    // question cites a figure and the Miscellaneous Exercise cites none at all.
    // Figures are vector DRAWINGS over a full-page background raster → they must
    // be snap-cropped from a render, never extracted as images.
    //
    // BOOK DEFECTS to preserve, not smooth — stale pre-rationalisation numbering
    // from when Conic Sections was chapter 11 (ch.11 is now 3D Geometry and has
    // only figures 11.1–11.4, so these point at nothing):
    //   · p8 prints `Fig 11.15 (b)/(c)/(d)` for the parabola orientations while
    //     **p6 prints `Fig 10.15` for the same figure** — the book contradicts
    //     itself two pages apart.
    //   · p23 prints `Fig 11.31 (b)`, and it does NOT mean Fig 10.31: it means
    //     **Fig 10.29(b)**, the hyperbola whose equation that sentence derives.
    //     (Do not "correct" it to 10.31 — that was a wrong inference, caught by
    //     reading the page.)
    //   · §10.1 Introduction opens "In the preceding **Chapter 10**, we have
    //     studied … the equations of a line" — this chapter IS Chapter 10 and
    //     Straight Lines is Chapter 9.
    //   · p22 prints `PF₂ = a − (a/c)x` where the coefficient should be `c/a`;
    //     p23 uses `c/a` in the same identity one page later.
    // All are in teaching prose, so no row carries a bracket for them — they are
    // publisher-report items only.
    //
    // Page map, CORRECTED against the pages during transcription:
    //   §10.1–10.2 p0 · §10.2.1 p1 · §10.2.2 p2 · §10.3 Circle p3 · Eg.1–3 p4 ·
    //   Eg.4 + EXERCISE 10.1 (Q1–Q15, no spill) p5 · §10.4 Parabola p6–p8 ·
    //   §10.4.2 + Eg.5 p9 · Eg.6–8 + **EXERCISE 10.2 Q1–Q6** p10 ·
    //   **EXERCISE 10.2 Q7–Q12** then §10.5 Ellipse p11 · §10.5 cont. p12–p15 ·
    //   §10.5.4 + Eg.9 p16 · Eg.10–13 p17–p18 ·
    //   EXERCISE 10.3 (Q1–Q20) then §10.6 Hyperbola p19 · §10.6.1–10.6.2 p20–p23 ·
    //   §10.6.3 + Eg.14 p24 · Eg.15–16 p25 · EXERCISE 10.4 (Q1–Q15) then the
    //   "Miscellaneous Examples" heading + Eg.17 p26 · Eg.18–19 p27 ·
    //   Miscellaneous Exercise (Q1–Q8) p28 · Summary p29.
    //
    // EXERCISE 10.2 SPANS p10 AND p11 — half its questions are overleaf, above
    // where §10.5 begins. Found independently by TWO bands (the one that owned
    // the block and the one that merely observed it), which is what proves the
    // handoff worked: 60 rows across bands a–c with zero duplicate refs.
    //
    // Question counts, verified against the printed key: Ex 10.1 = 15 ·
    // Ex 10.2 = 12 · Ex 10.3 = 20 · Ex 10.4 = 15 · **Miscellaneous = 8**.
    // The Miscellaneous figure was briefly recorded as 9 and that was MY probe
    // artifact, not the book: a `^\d{1,2}\s*\.` scan of the key counted the "9"
    // out of the answer "9.11 m" (and a "2" out of "2.23 m"). The printed key
    // ends at item 8 and the next heading is EXERCISE 11.1. Count key labels as
    // digit + "." + WHITESPACE, or decimals in the answers inflate the total.
    //
    // Examples 17–19 sit under the book's own centred "Miscellaneous Examples"
    // heading AFTER Exercise 10.4, so they take `Misc Eg.N` refs, not `10.4 Eg.N`.
    // NO `Sections of a Cone` subtopic — same call as Complex Numbers above, and
    // confirmed independently by all four transcription bands. §10.1, §10.2,
    // §10.2.1 and §10.2.2 (the cone/nappe/generator definitions, the four
    // β-vs-α cases and the three degenerate cases) are PURE TEACHING PROSE: the
    // chapter's first worked Example already sits inside §10.3 Circle, and no
    // exercise or Miscellaneous question is about conic classification. The
    // subtopic would render an always-empty filter.
    subtopics: [
      "Circle",
      "Parabola",
      "Ellipse",
      "Hyperbola",
    ],
  },

  // ── The remaining 10 Class-11 chapters (2026-08-18). Answer-key ranges below
  //    were read at each block's LAST entry with a spill page, per the rule the
  //    pilot earned; page maps come from a structural probe and are CORRECTED by
  //    transcription, since a map derived from where a heading first appears is
  //    reliably wrong about EXTENT (five mid-block page breaks in the pilot).
  //    Every one of these chapters has a "Miscellaneous Examples" block, so
  //    `Misc Eg.N` refs apply throughout.
  c11Sets: {
    id: "c11Sets",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Sets",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__Sets.pdf",
    pdf: cls11Maths("01. Sets.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [0, 1, 2, 3],
    note: "NCERT (CBSE Class 11) — Sets (Chapter 1, NCERT Mathematics)",
    // 23pp, FIVE exercises. Ex 1.1 p3 · 1.2 p7 · 1.3 p11 · 1.4 p16 · 1.5 p19 ·
    // Misc Examples p19 · Misc Exercise p20 · Summary p21.
    //
    // RATIONALISATION GAP, verified two ways so nobody reads it as a
    // transcription miss: the chapter has **no §1.11 "Practical Problems on
    // Union and Intersection" and no Exercise 1.6**. Its sections stop at §1.10
    // Complement of a Set (confirmed against the NCERT XI spine in
    // `syllabus_concepts`), and the transcribed Example numbering runs 1-25
    // contiguously with no hole. So the classic n(A∪B) counting word problems —
    // how many people read which newspaper, drink which beverage — are simply
    // GONE from this book. The bank's syllabus map already records `n(A∪B)` as
    // NCERT-absent from the other direction; this is the same finding met head-on.
    // Do not brief a solution agent to expect them (I did, and it correctly told
    // me they do not exist).
    subtopics: [
      "Sets and their Representations",
      "Types of Sets and Subsets",
      "Venn Diagrams and Operations on Sets",
      "Complement of a Set",
    ],
  },

  c11RelationsFunctions: {
    id: "c11RelationsFunctions",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Relations and Functions",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__RelationsFunctions.pdf",
    pdf: cls11Maths("02. Relations and Functions_NCERT.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [2, 3, 4, 5],
    note: "NCERT (CBSE Class 11) — Relations and Functions (Chapter 2, NCERT Mathematics)",
    // 19pp. Ex 2.1 p3 · 2.2 p5 · 2.3 p14 · Misc Examples p14 · Misc Exercise p16.
    // NOTE the DB chapter name collides with CBSE Class 12's — different exams,
    // so different chapter rows; the `c11` id prefix keeps the data/ files apart.
    subtopics: [
      "Cartesian Products of Sets",
      "Relations",
      "Functions and their Graphs",
      "Algebra of Real Functions",
    ],
  },

  c11TrigonometricFunctions: {
    id: "c11TrigonometricFunctions",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Trigonometric Functions",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__TrigonometricFunctions.pdf",
    pdf: cls11Maths("03. Trigometric Functions.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [4, 5, 6],
    note: "NCERT (CBSE Class 11) — Trigonometric Functions (Chapter 3, NCERT Mathematics)",
    // 33pp. Ex 3.1 p5 · 3.2 p14 · 3.3 p24 · Misc Examples p25 · Misc Exercise p28.
    // Rationalised: the spine ends at §3.4 (sum/difference) — there is NO
    // trigonometric-EQUATIONS section, so do not author a subtopic for one.
    subtopics: [
      "Angles and their Measurement",
      "Trigonometric Functions and their Signs",
      "Domain and Range of Trigonometric Functions",
      "Trigonometric Functions of Sum and Difference of Two Angles",
    ],
  },

  c11LinearInequalities: {
    id: "c11LinearInequalities",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Linear Inequalities",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__LinearInequalities.pdf",
    pdf: cls11Maths("05. Linear Inequalities.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [6, 7, 8],
    note: "NCERT (CBSE Class 11) — Linear Inequalities (Chapter 5, NCERT Mathematics)",
    // 11pp, the second-thinnest chapter. ONE exercise: Ex 5.1 p6 · Misc Examples
    // p7 · Misc Exercise p9. Rationalised: only ONE-variable inequalities survive
    // — the two-variable/graphical half is gone (it is Class 12's Linear
    // Programming), which is why the bank's Linear Programming has no Class-11 home.
    subtopics: [
      "Inequalities",
      "Algebraic Solutions of Linear Inequalities in One Variable",
    ],
  },

  c11PermutationsCombinations: {
    id: "c11PermutationsCombinations",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Permutations and Combinations",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__PermutationsCombinations.pdf",
    pdf: cls11Maths("06. PNC.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [7, 8, 9],
    note: "NCERT (CBSE Class 11) — Permutations and Combinations (Chapter 6, NCERT Mathematics)",
    // 26pp, FOUR exercises. Ex 6.1 p4 · 6.2 p6 · 6.3 p14 · 6.4 p19 ·
    // Misc Examples p19 · Misc Exercise p22 · Summary p23.
    subtopics: [
      "Fundamental Principle of Counting",
      "Permutations",
      "Permutations when Objects are Not Distinct",
      "Combinations",
    ],
  },

  c11StraightLines: {
    id: "c11StraightLines",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Straight Lines",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__StraightLines.pdf",
    pdf: cls11Maths("09. Striaght Lines.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [10, 11, 12],
    note: "NCERT (CBSE Class 11) — Straight Lines (Chapter 9, NCERT Mathematics)",
    // 25pp. Ex 9.1 p7 · 9.2 p12 · 9.3 p16 · Misc Examples p17 · Misc Exercise p21.
    // The source FILENAME misspells the chapter ("Striaght"); `chapterName` above
    // is the book's correct printed title and is what reaches the DB.
    subtopics: [
      "Slope of a Line",
      "Angle Between Lines, Parallelism and Perpendicularity",
      "Various Forms of the Equation of a Line",
      "Distance of a Point From a Line",
    ],
  },

  c11ThreeDGeometry: {
    id: "c11ThreeDGeometry",
    examId: EXAM_ID_CBSE_11,
    // The book's printed title, which differs from Class 12's "Three Dimensional
    // Geometry" — do NOT normalise them together; they are different chapters in
    // different exams and the rationalised Class-11 chapter stops at the distance
    // formula (no direction cosines, no lines, no planes).
    chapterName: "Introduction to Three Dimensional Geometry",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__ThreeDGeometry.pdf",
    pdf: cls11Maths("11. 3D Geom.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [15, 16],
    note: "NCERT (CBSE Class 11) — Introduction to Three Dimensional Geometry (Chapter 11, NCERT Mathematics)",
    // 9pp — the THINNEST chapter in the book, tied with Binomial Theorem.
    // Ex 11.1 p3 · Ex 11.2 p5 · Misc Examples p5 · Misc Exercise + Summary p7.
    subtopics: [
      "Coordinate Axes and Planes in Space",
      "Coordinates of a Point in Space",
      "Distance Between Two Points",
    ],
  },

  c11LimitsDerivatives: {
    id: "c11LimitsDerivatives",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Limits and Derivatives",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__LimitsDerivatives.pdf",
    pdf: cls11Maths("12. Limits and Derivatives.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [16, 17, 18],
    note: "NCERT (CBSE Class 11) — Limits and Derivatives (Chapter 12, NCERT Mathematics)",
    // 40pp — the LARGEST chapter in the book, and unusually shaped: its FIRST
    // exercise does not appear until p20, so pages 0-19 are teaching prose plus
    // ~17 worked Examples. Ex 12.1 p20 · Ex 12.2 p31 · Misc Examples p32 ·
    // Misc Exercise p36 · Summary p37.
    // CORRECTED BY TRANSCRIPTION — two facts I inferred wrongly when briefing:
    //
    // (a) **The p-04 "Summary" is REAL, not a probe artifact.** It is a genuine
    //     blue-shaded box mid-chapter recapping left-hand limit / right-hand
    //     limit / their coincidence. So THIS CHAPTER HAS TWO Summaries — the
    //     mid-chapter recap on p-04 and the real end-of-chapter one in band C.
    //     Any probe keying on the word "Summary" fires twice here.
    //
    // (b) **Pages p-00 to p-12 contain NO numbered Example at all.** They carry a
    //     SEPARATE numbering stream — "Illustration 1" … "Illustration 10" — and
    //     the first `Example` appears on p-13. So the Example run in the first
    //     band is 1-4, not the "roughly 1-17" a page count suggests; Examples
    //     5-18 are band B's and 19+ are the Miscellaneous block.
    //
    // THE ILLUSTRATIONS ARE DELIBERATELY NOT INGESTED. They are worked
    // "find this limit" items with complete workings, so the call is genuinely
    // close — but the book itself keeps them in a stream separate from
    // `Example N`, they are convergence TABLES demonstrating that a value tends
    // to a limit rather than problems a student can practise, and `/board` has
    // no block kind for them (its outline is Solved Examples / Exercise /
    // Miscellaneous). Reversible: if they are ever wanted, the natural ref is
    // `12.1 Ill.N` and they are all `Limits and the Algebra of Limits`.
    subtopics: [
      "Intuitive Idea of Derivatives",
      "Limits and the Algebra of Limits",
      "Limits of Polynomials and Rational Functions",
      "Limits of Trigonometric Functions",
      "Derivatives from First Principles",
      "Algebra of Derivatives and Standard Formulas",
    ],
  },

  c11Statistics: {
    id: "c11Statistics",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Statistics",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__Statistics.pdf",
    pdf: cls11Maths("13. Statistics.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [18, 19, 20],
    note: "NCERT (CBSE Class 11) — Statistics (Chapter 13, NCERT Mathematics)",
    // 32pp, only TWO exercises but a long theory run — Ex 13.1 does not appear
    // until p13. Ex 13.1 p13 · Ex 13.2 p24 · Misc Examples p25 ·
    // Misc Exercise + Summary p29.
    // DATA-TABLE HEAVY: expect GFM pipe-tables in stems (frequency distributions,
    // class intervals). A table needs a `|---|` separator row or it ships as prose.
    // Transcription convention earned here: absolute-value bars are written
    // `\lvert…\rvert`, NEVER a raw `|` — a raw pipe inside a math zone in a table
    // cell would break the table, and this chapter's column headers are literally
    // `f_i|x_i − x̄|`.
    //
    // NOT INGESTED, deliberately: the fully worked step-deviation demonstration on
    // p-10/p-11 (Table 13.5, assumed mean a=45, h=10). It has a complete table and
    // a stated answer, but the book prints it with NO Example number, so there is
    // no honest ref under the `<c>.<k> Eg.N` convention — `Eg.6b` would fabricate
    // provenance. It is a separate method section, not an alternative solution to
    // Example 6, so folding it into that row would be wrong too. Same call as the
    // Limits chapter's ten `Illustration N` items: where the book withholds a
    // number, we do not invent one.
    subtopics: [
      "Measures of Dispersion and Range",
      "Mean Deviation for Ungrouped Data",
      "Mean Deviation for Grouped Data",
      "Variance and Standard Deviation",
      "Shortcut Method for Variance and Standard Deviation",
    ],
  },

  c11Probability: {
    id: "c11Probability",
    examId: EXAM_ID_CBSE_11,
    chapterName: "Probability",
    subjectName: "Mathematics",
    sourceFile: "NCERT_11_Maths__Probability.pdf",
    pdf: cls11Maths("14. Probability.pdf"),
    answersPdf: cls11Maths("kemh1an.pdf"),
    answerPages: [19, 20, 21],
    note: "NCERT (CBSE Class 11) — Probability (Chapter 14, NCERT Mathematics)",
    // 25pp. Ex 14.1 p5 · Ex 14.2 p16 · Misc Examples p19 · Misc Exercise p21 ·
    // Summary p23. The DB chapter name collides with CBSE Class 12's — different
    // exams, different chapter rows; the `c11` id prefix keeps data/ files apart.
    // RATIONALISED SHAPE: the spine opens at §14.1 "Event", NOT at an
    // Introduction — random experiments and sample space are assumed from
    // Class 10, so this chapter is events + the axiomatic approach only.
    // PROBE TRAP for anyone counting MCQs here: `P(A)` contains the literal
    // "(A)", so an option-detector fires on nearly every line of this chapter.
    // There are still no MCQs — key on a four-option RUN, never a single label.
    subtopics: [
      "Random Experiments, Sample Space and Events",
      "Types of Events and the Algebra of Events",
      "Axiomatic Approach to Probability",
      "Probability of 'A or B' and 'not A'",
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
