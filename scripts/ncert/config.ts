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
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
