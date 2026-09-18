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
// CBSE Class 10 exam (seeded 2026-09-15). A THIRD exam on this pipeline, and the
// first CBSE board year below 12. Class 10 IS a board year, so unlike Class 11
// this exam CAN carry PYQs later — the `practiceOnly` flag on its registry entry
// is a "not yet", not the permanent property it is for cbse-11.
export const EXAM_ID_CBSE_10 = "defb4ad2-7ec8-42e4-ad2e-8fbe9c454e1c";

/**
 * Every exam this pipeline writes to, newest class first. Used by the
 * cross-chapter aggregates (errata.ts) that have no single chapter in scope.
 *
 * A chapter NAME does not identify a class — Relations and Functions,
 * Probability and Three Dimensional Geometry each exist in both — so anything
 * grouping across classes must carry the exam id, never the chapter name.
 */
export const NCERT_EXAMS = [
  { examId: "defb4ad2-7ec8-42e4-ad2e-8fbe9c454e1c", label: "CBSE Class 10" },
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
// Class 10 ships as 14 pre-split chapter PDFs in ONE folder (no Part 1/Part 2),
// with the end-of-book answers in jemh1an.pdf alongside them. Structurally the
// SIMPLEST book on this pipeline, and four things differ from Class 11/12:
//
// 1. **NO MISCELLANEOUS EXERCISES — none, in any of the 14 chapters.** The
//    `Misc Eg` / `Misc Q` ref lane and the "Miscellaneous Exercise on Chapter N"
//    section kind are simply unused here. 31 numbered exercises total, 1-4 per
//    chapter.
//
// 2. **CHAPTER NUMBER = FILE NUMBER**, like Chemistry and unlike Physics: the
//    files are `01. Real Numbers.pdf` … `14. Probability.pdf` with no offset.
//
// 3. **THE KEY IS PARTIAL PER QUESTION, and the gap is not random — it tracks
//    how PROOF-BASED the chapter is.** jemh1an.pdf carries a block for 30 of the
//    31 exercises (Ex 1.2, the irrationality proofs, has none), but within a
//    block only items with a computable final answer are keyed. Measured:
//    Triangles ~9 of ~29 items (31%), Circles ~9 of ~17 (53%), Real Numbers
//    5 of 10, everything else 89-100%. So the step-6 cross-check is a real gate
//    on ten chapters and NEARLY INOPERATIVE on Triangles — every chapter must
//    report its own denominator, because "0 wrong across 9 keyed" is a different
//    claim from "across 29".
//
// 4. **THE APPENDICES ARE OUT OF SCOPE.** jemh1a1 (Proofs in Mathematics) and
//    jemh1a2 (Mathematical Modelling) have 9 exercises between them and ARE
//    keyed in jemh1an — but the book marks them "not from the examination point
//    of view", so they are deliberately not ingested. Recorded because the key's
//    coverage of them makes them look in-scope.
//
// Transcription is VISION-ONLY, measured on this book rather than inherited:
// superscripts FLATTEN (`2⁵ × 3` extracts as `25 × 3` — well-formed, plausible,
// and a different number), radicals VANISH (`√2, √3, √p` → `2 , 3`, `p`),
// fractions interleave (`(96×404)/4` → `96 404 96 404 9696`), `π` disappears
// from `take π = 22/7`, `≠` disappears, and `q ≠ 0` extracts as `q ¹ 0` (Symbol
// font → Latin, the Std-XII Physics trap). The superscript class is the
// dangerous one: nothing downstream can tell `25` from a mis-read `2⁵`.
const cls10Maths = (p: string) => join(SOURCE_ROOT, "10th", "Maths", p);

// ── PHYSICS path helpers (2026-09-07) ───────────────────────────────────────────
// Physics ships as pre-split per-chapter PDFs under Part_1/Part_2, PLUS the
// whole-book PDF and NCERT's own answer files.
//
// TWO TRAPS, both measured before any chapter was added:
//
// 1. THE CHAPTER NUMBER IS NOT THE FILE NUMBER. Physics numbers its chapters
//    CONTINUOUSLY across the two parts, but each part's files restart at 01.
//    So `Part_2/05. KINETIC THEORY.pdf` is CHAPTER 12, and every section,
//    worked example, exercise question and answer-key entry inside it is
//    numbered 12.x. Class 11 Part 2 adds 7 (files 01-07 = chapters 8-14);
//    Class 12 Part 2 adds 8 (files 01-06 = chapters 9-14). Getting this wrong
//    does not error — it silently mis-refs every row in the chapter and points
//    the answer-key cross-check at the wrong chapter's key.
//
// 2. CLASS 12 PART 2 HAS NO STANDALONE ANSWERS FILE. `leph2an.pdf` simply is
//    not in the folder, and `leph1an.pdf` stops at chapter 8 — which reads as
//    "chapters 9-14 have no key". They do: the key is inside the whole-book
//    `NCERT_Physics_12th_Part_2.pdf` at 0-based pages 125-131. Verified by
//    reading it (ch9 opens p125 "ANSWERS / CHAPTER 9", ch14 closes p131).
const cls11Phy = (p: string) => join(SOURCE_ROOT, "11th", "Physics", p);
const cls12Phy = (p: string) => join(SOURCE_ROOT, "12th", "Physics", p);

// ── CHEMISTRY path helpers (2026-09-08) ────────────────────────────────────────
// Chemistry ships as pre-split per-chapter PDFs under Part_1/Part_2, like Physics,
// with the end-of-book answers in kech1an/kech2an (Class 11) and lech1an/lech2an
// (Class 12). `*a1.pdf` and `*ps.pdf` are APPENDICES and PRELIMS — not answers.
//
// FIVE THINGS THAT DIFFER FROM PHYSICS, all measured before the first chapter:
//
// 1. **THERE IS NO CHAPTER-NUMBER OFFSET — the INVERSE of Physics.** Chemistry's
//    files are already numbered by BOOK chapter: Class 11 Part_2 runs 07-09 and
//    Class 12 Part_2 runs 06-10. Porting the Physics +7/+8 would silently mis-ref
//    every row in every Part-2 chapter.
//
// 2. **THREE QUESTION STREAMS, AND TWO OF THEM SHARE ONE NUMBERING NAMESPACE.**
//    Class 12 prints worked `Example N.n`, unsolved `Intext Questions` numbered
//    N.1, N.2 …, AND end-of-chapter `Exercises` ALSO numbered N.1, N.2 … So
//    "1.5" names TWO different questions in the same chapter. Refs MUST carry the
//    stream — `Eg 1.5` / `Intext 1.5` / `Ex 1.5` — or the rows collide and the
//    answer-key cross-check diffs the wrong stream. A naive `^N\.\d` scan is
//    useless here: it conflates section headings, intext questions and exercises,
//    which is exactly what it did on the first probe of this chapter.
//
// 3. **THERE ARE TWO SEPARATE ANSWER SOURCES, one per stream.** The end-of-book
//    key (`*an.pdf`) answers the EXERCISES — verified by content, not position:
//    key 1.5 = "0.617 m, 0.01 and 0.99, 0.67" matches Exercise 1.5's four asks
//    (molality, two mole fractions, molarity). Separately, **each Class-12
//    chapter ends with its own "Answers to Some Intext Questions" section**
//    covering most — never all — of its Intext stream.
//
//    CORRECTION, recorded because getting this wrong would have silently halved
//    the gate's reach: this comment first read "INTEXT QUESTIONS HAVE NO PRINTED
//    ANSWER ANYWHERE IN THE BOOK". That is FALSE. The in-chapter section is on
//    the chapter's LAST page, below the final exercise, and a probe of mine did
//    flag it — reporting exactly the item numbers it covers — which I dismissed
//    as parsing noise after reading only the head of that page. Read a page to
//    its END before calling a signal noise.
//
//    Measured across the subject: 9 of the 10 Class-12 chapters carry the section
//    (all but ch10 Biomolecules); Class 11 carries none, consistently, because it
//    has no Intext stream at all. Coverage is partial by design — the heading
//    says "Some" — e.g. ch1 answers 1.1-1.5 and 1.9-1.12, skipping 1.6-1.8.
//
// 4. **KEY COVERAGE IS PARTIAL, and per-STREAM rather than per-chapter.** Four
//    chapters have no EXERCISE key block: Class 11 ch3 (Periodicity) + ch4
//    (Chemical Bonding), absent from kech1an, and Class 12 ch6 (Haloalkanes) +
//    ch10 (Biomolecules), absent from lech2an. Those are largely descriptive
//    chapters, consistent with a key that prints final values only. But only
//    THREE are unkeyed outright: ch6 still carries ~7 in-chapter Intext answers.
//    Class 11 ch3/ch4 and Class 12 ch10 have no printed answer of any kind, and
//    the step-6 gate genuinely cannot run on them.
//
// 5. **CLASS 12 PDFs PAINT EVERY LINE ~5x** (a drop-shadow effect), so the text
//    layer repeats each heading five times — "Intext Questions" extracts as five
//    consecutive identical lines. Any Class-12 count must collapse runs first.
//    Class 11 does NOT do this.
//
// Transcription is VISION-ONLY, measured: the delta glyph extracts as the Latin
// letter `D` in Class 12 (`DrG` for the Gibbs term, 14x in Electrochemistry) and
// vanishes entirely in Class 11, and the radical sign occurs ZERO times in either
// book. Section headings also truncate at their line wrap in the margin column.
const cls11Chem = (p: string) => join(SOURCE_ROOT, "11th", "Chemistry", p);
const cls12Chem = (p: string) => join(SOURCE_ROOT, "12th", "Chemistry", p);


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

  // ══ PHYSICS ═══════════════════════════════════════════════════════════════
  // First non-Mathematics subject on the CBSE exams (2026-09-07). The Physics
  // subject row is seeded by scripts/ncert/seed-subject.ts and is deliberately
  // NOT created ahead of the first commit: `listSubjects` applies no
  // question-count filter, so an empty subject renders as a live `/browse`
  // filter returning nothing (the mh-sb-11 Std-XI Physics row that was seeded
  // and removed the same day). Seed it when the first chapter commits.
  //
  // TRANSCRIPTION IS VISION-ONLY, and that is MEASURED rather than assumed.
  // Across 785,781 characters of Class 11 Physics the text layer yields the
  // radical sign ONCE and superscript two ZERO times, in a book whose every
  // other page carries a squared unit; 538 characters land in the Unicode
  // private-use area. Prose extracts perfectly, which is exactly what makes a
  // text-first pass dangerous here — `m s–2` is a plausible-looking string
  // that is not what the page says.

  // ── Ch.8 Mechanical Properties of Solids (11th, Part 2). 13pp. PILOT for the
  //    Physics lane: deliberately chosen to retire the most structural unknowns
  //    at the smallest size — it is a Part-2 file (so it proves the +7 chapter
  //    offset: `01. …pdf` IS chapter 8), it carries exercise-scoped figures
  //    (Fig 8.9/8.10/8.11 on the exercise pages, which the stems read their
  //    data off), and its answer key is COMPLETE (8.1-8.16, no gaps).
  //    Structure (0-based pages):
  //      §8.1 Introduction p0 · §8.2 Stress and Strain p1-2 · §8.3 Hooke's Law
  //      p2 · §8.4 Stress-Strain Curve p2-3 · §8.5 Elastic Moduli p3-7
  //      (8.5.1 Young's · 8.5.2 Shear · 8.5.3 Bulk · 8.5.4 Poisson's Ratio ·
  //      8.5.5 Elastic Potential Energy) · §8.6 Applications p7-9 ·
  //      Examples 8.1-8.5 scattered p4-7 · EXERCISES p10-12.
  //    NOTE p0 also matches an "EXERCISES" heading — that is the chapter-opening
  //    CONTENTS box, not the exercise block. The block is the LAST match (p10).
  //    Answers: keph2an.pdf p0-1 (its answers region is p0-6; p7-13 are the
  //    bibliography + index and p14 is Notes — do NOT widen the range into them).
  c11PhyMechSolids: {
    id: "c11PhyMechSolids",
    chapterName: "Mechanical Properties of Solids",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__MechanicalPropertiesOfSolids.pdf",
    pdf: cls11Phy("Part_2/01. MECHANICAL PROPERTIES OF SOLIDS.pdf"),
    answersPdf: cls11Phy("Part_2/keph2an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Mechanical Properties of Solids (Chapter 8, NCERT Physics Part 2)",
    // FIVE subtopics, and the split is MEASURED rather than authored up front.
    // The first draft used the book's top-level arc (Stress and Strain / Hooke's
    // Law + Curve / Elastic Moduli / Applications) and the commit tally came back
    // 1 / 3 / 18 / 1 — i.e. 18 of 23 rows in one bucket, which is a `/browse`
    // filter that does not filter. The chapter's own sub-sections 8.5.1-8.5.3
    // give the honest split (Young's / Shear / Bulk), and the two thin
    // stress-strain buckets merge into one. Resulting tally 4 / 9 / 3 / 6 / 1.
    // §8.6 Applications keeps its single row (Ex 8.7, the mild-steel columns)
    // because that IS the section's subject matter — the book illustrates exactly
    // that configuration in Fig 8.8 "Pillars or columns" — even though the
    // arithmetic goes through Young's modulus.
    subtopics: [
      "Stress, Strain and Hooke's Law",
      "Young's Modulus",
      "Shear Modulus",
      "Bulk Modulus and Compressibility",
      "Applications of Elastic Behaviour",
    ],
  },

  // ── The remaining 27 Physics chapters. Page maps are DERIVED, not guessed:
  //    `pages` is omitted so render.ts rasterises the whole chapter PDF, and
  //    `answerPages` is the WHOLE answers region of that book — deliberately not
  //    a per-chapter slice. A computed slice was built first (each chapter's
  //    "CHAPTER n" marker to the next) and then abandoned: these answer files are
  //    only 6-8 pages, so rendering all of them costs a few seconds, while a
  //    per-chapter range that is one page short silently truncates the key and NO
  //    GATE CAN SEE IT — a missing answer page is indistinguishable from a key
  //    that simply skips those questions (the Class-11 Maths lesson: read
  //    answerPages at a chapter's LAST answer, not its first). The cross-check
  //    agent is told which chapter to read, so extra pages cost nothing.
  //
  //    Answer regions are BOUNDED and must not be widened past them:
  //      keph1an.pdf p0-6   · keph2an.pdf p0-6  (p7-13 are bibliography + index)
  //      leph1an.pdf p0-5
  //      NCERT_Physics_12th_Part_2.pdf p125-131 (see the cls12Phy note above)
  //
  //    Subtopics are AUTHORED from each chapter's printed section headings, not
  //    extracted verbatim: several sections are a single paragraph and would ship
  //    a `/browse` filter returning nothing. Check the commit's `by subtopic`
  //    tally per chapter and re-split only where a bucket is genuinely empty.
  //    Class-11 Oscillations and Waves set their headings in a style the
  //    heading probe could not read (3 of ~8 sections recovered), so their lists
  //    are authored from the chapter arc and want checking against the page.

  c11PhyUnits: {
    id: "c11PhyUnits",
    chapterName: "Units and Measurement",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__UnitsAndMeasurement.pdf",
    pdf: cls11Phy("Part_1/01. UNITS AND MEASUREMENT.pdf"),
    answersPdf: cls11Phy("Part_1/keph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Units and Measurement (Chapter 1, NCERT Physics Part 1)",
    subtopics: [
      "Units and the SI System",
      "Significant Figures and Errors in Measurement",
      "Dimensions and Dimensional Analysis",
    ],
  },

  // Ch.2 SHIPPED 2026-09-07. Cross-check 15 of 18 diffed: 14 AGREE, 1 book-key-wrong.
  //
  // TWO THINGS ABOUT ITS KEY WORTH KEEPING. (1) The Chapter-2 block SPANS A PAGE
  // BREAK — 2.1-2.5 at the foot of ak-00, 2.6-2.18 at the top of ak-01 — so
  // reading only the page carrying the "Chapter 2" heading loses 13 of the 15
  // keyed rows SILENTLY. This is why answerPages covers the whole answers region
  // rather than a computed per-chapter slice. (2) Its 2.2(d) says A and B reach
  // home at the same time while Fig 2.9 as printed shows A running on to a
  // visibly larger t — bracketed, with the answer following the figure.
  //
  // TAXONOMY GAP, recorded not fixed: the p0 contents box lists "2.5 Relative
  // velocity" and NO SUCH SECTION EXISTS in this reprint's body (p-08 runs
  // straight from Example 2.7 into SUMMARY, and the summary never mentions it) —
  // a rationalisation leftover. But Ex 2.14 IS a relative-velocity question, and
  // with no matching subtopic it sits under "Instantaneous Velocity and Speed"
  // with a note on the row. One row does not justify a subtopic for a section the
  // book no longer prints; revisit if Class 12 or a sibling adds more.
  c11PhyMotionLine: {
    id: "c11PhyMotionLine",
    chapterName: "Motion in a Straight Line",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__MotionInAStraightLine.pdf",
    pdf: cls11Phy("Part_1/02. MOTION IN A STRAIGHT LINE.pdf"),
    answersPdf: cls11Phy("Part_1/keph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Motion in a Straight Line (Chapter 2, NCERT Physics Part 1)",
    subtopics: [
      "Position, Path Length and Displacement",
      "Instantaneous Velocity and Speed",
      "Acceleration",
      "Kinematic Equations for Uniformly Accelerated Motion",
    ],
  },

  // Ch.3 SHIPPED 2026-09-07, the largest Class-11 Physics chapter at 56 rows.
  // Cross-check 47 of 47 diffed: 46 AGREE, 1 book-internal inconsistency. Note
  // this key has ZERO NO-KEY-ENTRY — it answers every one of 3.1-3.22 including
  // the conceptual ones, which no sibling chapter's key does.
  //
  // ONE DELIBERATE DEVIATION FROM FAITHFUL TRANSCRIPTION, accepted: Ex 3.22
  // prints "wat is the speed" and ships as "what". Purely orthographic — it
  // cannot make a correct answer look wrong against the key, which is the reason
  // the faithful-transcription rule exists. Same call as the dropped multiplication
  // signs in ch.10; a defect that changes a CLAIM would be preserved and bracketed
  // instead.
  //
  // Exercise sub-items ARE split here (47 rows from 22 printed questions), unlike
  // ch.5 where a uniform split was impossible because parts back-reference each
  // other. That matters for errata: a bracket must target "Ex 3.4(f)", not
  // "Ex 3.4" — the whole-question ref does not exist, and apply-errata reports it
  // as a SHORTFALL rather than half-applying the file.
  c11PhyMotionPlane: {
    id: "c11PhyMotionPlane",
    chapterName: "Motion in a Plane",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__MotionInAPlane.pdf",
    pdf: cls11Phy("Part_1/03. MOTION IN A PLANE.pdf"),
    answersPdf: cls11Phy("Part_1/keph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Motion in a Plane (Chapter 3, NCERT Physics Part 1)",
    subtopics: [
      "Scalars and Vectors",
      "Addition, Subtraction and Resolution of Vectors",
      "Motion in a Plane with Constant Acceleration",
      "Projectile Motion",
      "Uniform Circular Motion",
    ],
  },

  c11PhyLawsMotion: {
    id: "c11PhyLawsMotion",
    chapterName: "Laws of Motion",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__LawsOfMotion.pdf",
    pdf: cls11Phy("Part_1/04. LAWS OF MOTION.pdf"),
    answersPdf: cls11Phy("Part_1/keph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Laws of Motion (Chapter 4, NCERT Physics Part 1)",
    subtopics: [
      "The Law of Inertia and Newton's First Law",
      "Newton's Second Law of Motion",
      "Newton's Third Law and Conservation of Momentum",
      "Equilibrium of a Particle",
      "Common Forces in Mechanics and Friction",
      "Circular Motion",
    ],
  },

  c11PhyWorkEnergy: {
    id: "c11PhyWorkEnergy",
    chapterName: "Work, Energy and Power",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__WorkEnergyAndPower.pdf",
    pdf: cls11Phy("Part_1/05. WORK, ENERGY AND POWER.pdf"),
    answersPdf: cls11Phy("Part_1/keph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Work, Energy and Power (Chapter 5, NCERT Physics Part 1)",
    subtopics: [
      "Work and Kinetic Energy",
      "Work Done by a Variable Force",
      "Potential Energy and Conservation of Mechanical Energy",
      "Power",
      "Collisions",
    ],
  },

  c11PhyRotational: {
    id: "c11PhyRotational",
    chapterName: "System of Particles and Rotational Motion",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__RotationalMotion.pdf",
    pdf: cls11Phy("Part_1/06. SYSTEMS OF PARTICLES AND ROTATIONAL MOTION.pdf"),
    answersPdf: cls11Phy("Part_1/keph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — System of Particles and Rotational Motion (Chapter 6, NCERT Physics Part 1)",
    subtopics: [
      "Centre of Mass and its Motion",
      "Vector Product and Angular Velocity",
      "Torque and Angular Momentum",
      "Equilibrium of a Rigid Body",
      "Moment of Inertia",
      "Dynamics of Rotational Motion about a Fixed Axis",
    ],
  },

  c11PhyGravitation: {
    id: "c11PhyGravitation",
    chapterName: "Gravitation",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__Gravitation.pdf",
    pdf: cls11Phy("Part_1/07. GRAVITATION.pdf"),
    answersPdf: cls11Phy("Part_1/keph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Gravitation (Chapter 7, NCERT Physics Part 1)",
    subtopics: [
      "Kepler's Laws",
      "Universal Law of Gravitation",
      "Acceleration due to Gravity",
      "Gravitational Potential Energy and Escape Speed",
      "Earth Satellites",
    ],
  },

  // Ch.9 SHIPPED 2026-09-07. Cross-check: 21 of 34 exercise rows diffed — 21 AGREE,
  // 0 our-answer-wrong, 0 book-key-wrong. The key is genuinely clean on the numbers,
  // which is a DIFFERENT result from ch.8's 3 errors + 1 inconsistency; both are
  // reported as measured rather than averaged into a house prior.
  //
  // Two printed defects recorded here rather than as student-facing brackets:
  //   - The key entry for 9.7 is LABELLED "19.7" — a stray leading 1, sitting
  //     between 9.6 and 9.8 (verified on the rendered page). Its content answers
  //     9.7 unambiguously and no answer is affected, so it gets no bracket. Do not
  //     read it as a missing 9.7: an earlier probe of mine did exactly that and the
  //     cross-check agent corrected me from the image.
  //   - 9.3(d) DOES get a bracket: the key answers two clauses where the reprint
  //     prints one, which a student comparing against the official key would trip on.
  //
  // 13 rows are NO-KEY-ENTRY (all of 9.1, 9.2 and 9.4 — "Explain why" blocks with no
  // final value to print; the key opens at 9.3 and jumps to 9.5). Those carry
  // derived-answer provenance, since ours is the only answer a student gets.
  c11PhyMechFluids: {
    id: "c11PhyMechFluids",
    chapterName: "Mechanical Properties of Fluids",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__MechanicalPropertiesOfFluids.pdf",
    pdf: cls11Phy("Part_2/02. MECHANICAL PROPERTIES OF FLUIDS.pdf"),
    answersPdf: cls11Phy("Part_2/keph2an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Mechanical Properties of Fluids (Chapter 9, NCERT Physics Part 2)",
    subtopics: [
      "Pressure in Fluids",
      "Streamline Flow",
      "Bernoulli's Principle",
      "Viscosity",
      "Surface Tension",
    ],
  },

  // Ch.10 SHIPPED 2026-09-07. Cross-check: 23 of 28 exercise rows diffed — 23 AGREE,
  // 0 wrong on either side. The 5 skipped are Ex 10.19(a)-(e); the key jumps 10.18
  // to 10.20 because all five parts are "explain why" with no value to print.
  //
  // NO errata brackets, deliberately. The three printed defects found are all
  // DROPPED-GLYPH artifacts where the intended value is unambiguous, so they were
  // restored in transcription rather than preserved-and-bracketed — bracketing a
  // lost multiplication sign would be noise in a student's solution:
  //   - Eg 10.2 prints "1.20 10^-5 K^-1" and Eg 10.4 "3.34 10^5 J kg^-1", each with
  //     the multiplication sign dropped from the book's own printed working.
  //   - Ex 10.15's table heading prints "cal mo1^-1 K^-1" — the l of "mol" set as
  //     the digit 1. The stem's own "2.92 cal/mol K" confirms the reading.
  // Preserved-and-bracketed is for a defect that changes a CLAIM (see ch.9's
  // 9.3(d), where the key answers a clause the reprint no longer prints).
  //
  // Defects in teaching prose, with no row to carry them (publisher-report only):
  // p13 cites "the low thermal conductivity of air in the Table 10.5" — air is in
  // Table 10.6; p19 SUMMARY prints "the Farenheit temperare"; and the p0 contents
  // box still lists "Additional Exercises" which this reprint does not contain.
  //
  // No figures: every exercise states its data in words. Eg 10.6/10.7 cite figures
  // but are worked examples whose printed solutions restate the geometry.
  c11PhyThermalProps: {
    id: "c11PhyThermalProps",
    chapterName: "Thermal Properties of Matter",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__ThermalPropertiesOfMatter.pdf",
    pdf: cls11Phy("Part_2/03. THERMAL PROPERTIES OF MATTER.pdf"),
    answersPdf: cls11Phy("Part_2/keph2an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Thermal Properties of Matter (Chapter 10, NCERT Physics Part 2)",
    subtopics: [
      "Temperature, Heat and Thermometry",
      "Thermal Expansion",
      "Specific Heat Capacity and Calorimetry",
      "Change of State and Latent Heat",
      "Heat Transfer",
      "Newton's Law of Cooling",
    ],
  },

  c11PhyThermodynamics: {
    id: "c11PhyThermodynamics",
    chapterName: "Thermodynamics",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__Thermodynamics.pdf",
    pdf: cls11Phy("Part_2/04. THERMODYNAMICS.pdf"),
    answersPdf: cls11Phy("Part_2/keph2an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Thermodynamics (Chapter 11, NCERT Physics Part 2)",
    // FIVE subtopics, corrected from six after the chapter was transcribed.
    //
    // "Second Law, Reversibility and the Carnot Engine" was DROPPED. §11.9-11.11
    // (Second Law, Kelvin-Planck, Clausius, reversibility, the Carnot cycle and
    // Carnot's theorem) run pp.10-13 — nearly a quarter of the teaching text — and
    // NOT ONE of the eight exercises tests any of it. That is a property of the
    // rationalised exercise set, not a mapping choice, and it was verified by
    // reading the pages. Keeping it would ship a `/browse` filter returning nothing
    // (the Class-12 Linear Programming precedent). Safe to drop: no committed row
    // ever used it, so the subtopic was never created in the DB.
    //
    // "Specific Heat Capacity of Gases" was RENAMED to drop "of Gases" — §11.6
    // covers solids and water too, and the bucket really does hold Ex 11.1 (water
    // calorimetry) and Ex 11.3(b)/(d) (coolants, sea water). The old name was
    // narrower than its own content. Renamed in the DB in the same change.
    subtopics: [
      "Thermal Equilibrium and the Zeroth Law",
      "Heat, Internal Energy and Work",
      "First Law of Thermodynamics",
      "Specific Heat Capacity",
      "Thermodynamic Processes",
    ],
  },

  c11PhyKineticTheory: {
    id: "c11PhyKineticTheory",
    chapterName: "Kinetic Theory",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__KineticTheory.pdf",
    pdf: cls11Phy("Part_2/05. KINETIC THEORY.pdf"),
    answersPdf: cls11Phy("Part_2/keph2an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Kinetic Theory (Chapter 12, NCERT Physics Part 2)",
    // FOUR subtopics, corrected from five after transcription.
    // "Law of Equipartition of Energy" was DROPPED: §12.5 is taught but the
    // chapter sets NO question on it — all 22 rows were read and the only
    // near-miss, Ex 12.7 (average thermal energy of a helium atom), is the direct
    // use of Eq (12.19) from §12.4 and, helium being monatomic, never exercises
    // equipartition's actual content. Keeping it would ship a `/browse` filter
    // returning nothing. Safe to drop: no committed row used it, so the subtopic
    // was never created in the DB. Same shape as ch.11's Second Law bucket.
    subtopics: [
      "Behaviour of Gases",
      "Kinetic Theory of an Ideal Gas",
      "Specific Heat Capacity",
      "Mean Free Path",
    ],
  },

  c11PhyOscillations: {
    id: "c11PhyOscillations",
    chapterName: "Oscillations",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__Oscillations.pdf",
    pdf: cls11Phy("Part_2/06. OSCILLATIONS.pdf"),
    answersPdf: cls11Phy("Part_2/keph2an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Oscillations (Chapter 13, NCERT Physics Part 2)",
    subtopics: [
      "Periodic and Oscillatory Motion",
      "Simple Harmonic Motion",
      "SHM and Uniform Circular Motion",
      "Velocity, Acceleration and Force Law in SHM",
      "Energy in Simple Harmonic Motion",
      "The Simple Pendulum",
    ],
  },

  c11PhyWaves: {
    id: "c11PhyWaves",
    chapterName: "Waves",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Physics",
    sourceFile: "NCERT_11_Physics__Waves.pdf",
    pdf: cls11Phy("Part_2/07. WAVES.pdf"),
    answersPdf: cls11Phy("Part_2/keph2an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5, 6],
    note: "NCERT (CBSE Class 11) — Waves (Chapter 14, NCERT Physics Part 2)",
    subtopics: [
      "Transverse and Longitudinal Waves",
      "Displacement Relation in a Progressive Wave",
      "The Speed of a Travelling Wave",
      "Superposition of Waves and Standing Waves",
      "Beats",
    ],
  },

  c12PhyElectricCharges: {
    id: "c12PhyElectricCharges",
    chapterName: "Electric Charges and Fields",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__ElectricChargesAndFields.pdf",
    pdf: cls12Phy("Part_1/01. ELECTRIC CHARGES and FIELDS.pdf"),
    answersPdf: cls12Phy("Part_1/leph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5],
    note: "NCERT (CBSE Class 12) — Electric Charges and Fields (Chapter 1, NCERT Physics Part 1)",
    subtopics: [
      "Electric Charge and its Basic Properties",
      "Coulomb's Law and Forces Between Multiple Charges",
      "Electric Field and Field Lines",
      "Electric Dipole and Dipole in a Uniform Field",
      "Electric Flux and Gauss's Law",
      "Applications of Gauss's Law",
    ],
  },

  c12PhyPotentialCap: {
    id: "c12PhyPotentialCap",
    chapterName: "Electrostatic Potential and Capacitance",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__ElectrostaticPotentialAndCapacitance.pdf",
    pdf: cls12Phy("Part_1/02. ELECTROSTATIC POTENTIAL AND CAPACITANCE.pdf"),
    answersPdf: cls12Phy("Part_1/leph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5],
    note: "NCERT (CBSE Class 12) — Electrostatic Potential and Capacitance (Chapter 2, NCERT Physics Part 1)",
    subtopics: [
      "Electrostatic Potential due to Charges and Dipoles",
      "Equipotential Surfaces",
      "Potential Energy of a System of Charges",
      "Electrostatics of Conductors and Dielectrics",
      "Capacitors, Capacitance and their Combinations",
      "Energy Stored in a Capacitor",
    ],
  },

  c12PhyCurrentElec: {
    id: "c12PhyCurrentElec",
    chapterName: "Current Electricity",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__CurrentElectricity.pdf",
    pdf: cls12Phy("Part_1/03. CURRENT_ELECTRICITY.pdf"),
    answersPdf: cls12Phy("Part_1/leph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5],
    note: "NCERT (CBSE Class 12) — Current Electricity (Chapter 3, NCERT Physics Part 1)",
    // FIVE subtopics, corrected from six after transcription — two dropped, one added.
    //
    // DROPPED "Electrical Energy and Power": NO question in this chapter computes a
    // power or an energy. Eg 3.3 and Ex 3.6 look like power questions and are both
    // temperature-coefficient problems. DROPPED "Combination of Resistors and
    // Cells": the rationalised edition has no resistors-in-series-and-parallel
    // section at all (§3.8 runs straight to §3.9 Electrical Energy, then §3.10
    // Cells EMF, then §3.11 Cells in Series and in Parallel), so the label only ever
    // mapped to §3.11. Neither was created in the DB, since no row used them.
    //
    // ADDED "Temperature Dependence of Resistivity": without it "Drift of Electrons
    // and Resistivity" held 8 of the chapter's 16 rows — half the chapter in one
    // /browse filter. It splits cleanly along the book's own section boundary,
    // §3.5 drift proper (3 rows) vs §3.8 temperature dependence (5 rows), so this
    // is the book's structure rather than an arbitrary cut.
    subtopics: [
      "Electric Current and Ohm's Law",
      // NOT an NCERT section — the rationalised edition dropped resistor
      // combination, and §3.11 "Cells" covers cells in series/parallel, not
      // resistors. Added 2026-09-11 because THE BOARD STILL ASKS IT: four
      // independent transcription agents met it on 2025 55/2/1, 55/5/1, 55/7/1
      // and 2024 55/4/1 and each filed it on Ohm's Law while flagging the gap.
      // A board-PYQ corpus has to be able to file what the board sets, so this
      // is the one name here that is an editorial addition rather than the
      // restoration of an omitted section.
      "Combination of Resistors",
      "Drift of Electrons and Resistivity",
      "Temperature Dependence of Resistivity",
      // NCERT §3.9 "ELECTRICAL ENERGY, POWER" — a real section the original
      // subtopic authoring omitted, so power questions had no home at all.
      "Electrical Energy and Power",
      "Cells, EMF and Internal Resistance",
      "Kirchhoff's Rules and Wheatstone Bridge",
    ],
  },

  c12PhyMovingCharges: {
    id: "c12PhyMovingCharges",
    chapterName: "Moving Charges and Magnetism",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__MovingChargesAndMagnetism.pdf",
    pdf: cls12Phy("Part_1/04. MOVING CHARGES AND MAGNETISM.pdf"),
    answersPdf: cls12Phy("Part_1/leph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5],
    note: "NCERT (CBSE Class 12) — Moving Charges and Magnetism (Chapter 4, NCERT Physics Part 1)",
    subtopics: [
      "Magnetic Force and Motion in a Magnetic Field",
      "Biot-Savart Law and Field of a Circular Loop",
      "Ampere's Circuital Law and the Solenoid",
      "Force Between Parallel Currents",
      "Torque on a Current Loop and Magnetic Dipole",
      "The Moving Coil Galvanometer",
    ],
  },

  c12PhyMagnetismMatter: {
    id: "c12PhyMagnetismMatter",
    chapterName: "Magnetism and Matter",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__MagnetismAndMatter.pdf",
    pdf: cls12Phy("Part_1/05. MAGNETISM AND MATTER.pdf"),
    answersPdf: cls12Phy("Part_1/leph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5],
    note: "NCERT (CBSE Class 12) — Magnetism and Matter (Chapter 5, NCERT Physics Part 1)",
    // THREE subtopics, corrected from four. "Magnetic Properties of Materials"
    // (§5.5 dia/para/ferromagnetism) was DROPPED: the rationalised edition keeps
    // the theory and removed every exercise on it, so all 7 exercises are
    // dipole/bar-magnet mechanics and the label would ship a /browse filter
    // returning nothing. Never created in the DB, since no row used it. This is
    // now the FOURTH Physics chapter where the book teaches a section it never
    // examines (ch.11 Second Law, ch.12 equipartition, ch.3 energy-and-power).
    //
    // "The Bar Magnet" holding 9 of 12 rows is left alone deliberately: §5.2 does
    // have sub-sections to split on, but at 12 rows a split would make three
    // buckets of 2-3 and read as noise rather than navigation.
    subtopics: [
      "The Bar Magnet",
      "Magnetism and Gauss's Law",
      "Magnetisation and Magnetic Intensity",
      // NCERT §5.5 "MAGNETIC PROPERTIES OF MATERIALS" (dia/para/ferromagnetism,
      // §5.5.1-5.5.3) — a real section the original subtopic authoring omitted.
      // Flagged by the Physics board-PYQ pilot, which had to file a dia/para/
      // ferro question on Magnetisation and Magnetic Intensity and called that
      // "defensible but a stretch". Restored 2026-09-11.
      "Magnetic Properties of Materials",
    ],
  },

  c12PhyEMInduction: {
    id: "c12PhyEMInduction",
    chapterName: "Electromagnetic Induction",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__ElectromagneticInduction.pdf",
    pdf: cls12Phy("Part_1/06. ELECTROMAGNETIC INDUCTION.pdf"),
    answersPdf: cls12Phy("Part_1/leph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5],
    note: "NCERT (CBSE Class 12) — Electromagnetic Induction (Chapter 6, NCERT Physics Part 1)",
    subtopics: [
      "Magnetic Flux and Faraday's Law",
      "Lenz's Law and Conservation of Energy",
      "Motional Electromotive Force",
      "Inductance",
      "AC Generator",
    ],
  },

  c12PhyAlternatingCurrent: {
    id: "c12PhyAlternatingCurrent",
    chapterName: "Alternating Current",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__AlternatingCurrent.pdf",
    pdf: cls12Phy("Part_1/07. ALTERNATING CURRENT.pdf"),
    answersPdf: cls12Phy("Part_1/leph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5],
    note: "NCERT (CBSE Class 12) — Alternating Current (Chapter 7, NCERT Physics Part 1)",
    // FOUR subtopics. "Transformers" was DROPPED: §7.8 is taught and then never
    // assessed — no worked Example and no exercise question touches it — so the
    // label would ship a /browse filter returning nothing. Never created in the DB.
    //
    // THIS IS THE FIFTH PHYSICS CHAPTER WITH THAT SHAPE (ch.11 Second Law, ch.12
    // equipartition, ch.3 energy-and-power AND resistor combinations, ch.5
    // magnetic materials, now ch.7 transformers). It is a systematic property of
    // the rationalised editions, not a run of coincidences: the exercise sets were
    // cut harder than the teaching text. Expect it in the remaining chapters and
    // check the `by subtopic` tally at commit rather than trusting the section list.
    subtopics: [
      "AC Voltage Applied to a Resistor",
      "AC Voltage Applied to an Inductor and a Capacitor",
      "Series LCR Circuit and Resonance",
      "Power in AC Circuits and the Power Factor",
      // NCERT §7.8 "TRANSFORMERS" — a real section the original subtopic
      // authoring omitted, and the most-reported gap of the Physics board-PYQ
      // ingest: FIVE independent agents met a transformer question and each
      // filed it on Power/Power Factor or Series LCR while flagging that
      // neither is right. CBSE sets it most years. Restored 2026-09-11.
      "Transformers",
    ],
  },

  c12PhyEMWaves: {
    id: "c12PhyEMWaves",
    chapterName: "Electromagnetic Waves",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__ElectromagneticWaves.pdf",
    pdf: cls12Phy("Part_1/08. ELECTROMAGNETICS WAVES.pdf"),
    answersPdf: cls12Phy("Part_1/leph1an.pdf"),
    answerPages: [0, 1, 2, 3, 4, 5],
    note: "NCERT (CBSE Class 12) — Electromagnetic Waves (Chapter 8, NCERT Physics Part 1)",
    subtopics: [
      "Displacement Current",
      "Electromagnetic Waves and their Properties",
      "Electromagnetic Spectrum",
    ],
  },

  c12PhyRayOptics: {
    id: "c12PhyRayOptics",
    chapterName: "Ray Optics and Optical Instruments",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__RayOpticsAndOpticalInstruments.pdf",
    pdf: cls12Phy("Part_2/01. RAY OPTICS AND OPTICAL INSTRUMENTS.pdf"),
    answersPdf: cls12Phy("Part_2/NCERT_Physics_12th_Part_2.pdf"),
    answerPages: [125, 126, 127, 128, 129, 130, 131],
    note: "NCERT (CBSE Class 12) — Ray Optics and Optical Instruments (Chapter 9, NCERT Physics Part 2)",
    subtopics: [
      "Reflection by Spherical Mirrors",
      "Refraction and Total Internal Reflection",
      "Refraction at Spherical Surfaces and by Lenses",
      "Refraction Through a Prism",
      "Optical Instruments",
    ],
  },

  c12PhyWaveOptics: {
    id: "c12PhyWaveOptics",
    chapterName: "Wave Optics",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__WaveOptics.pdf",
    pdf: cls12Phy("Part_2/02. WAVE OPTICS.pdf"),
    answersPdf: cls12Phy("Part_2/NCERT_Physics_12th_Part_2.pdf"),
    answerPages: [125, 126, 127, 128, 129, 130, 131],
    note: "NCERT (CBSE Class 12) — Wave Optics (Chapter 10, NCERT Physics Part 2)",
    subtopics: [
      "Huygens Principle",
      "Refraction and Reflection of Plane Waves",
      "Interference and Young's Experiment",
      "Diffraction",
      "Polarisation",
    ],
  },

  c12PhyDualNature: {
    id: "c12PhyDualNature",
    chapterName: "Dual Nature of Radiation and Matter",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__DualNatureOfRadiationAndMatter.pdf",
    pdf: cls12Phy("Part_2/03. DUAL NATURE OF RADIATION AND MATTER.pdf"),
    answersPdf: cls12Phy("Part_2/NCERT_Physics_12th_Part_2.pdf"),
    answerPages: [125, 126, 127, 128, 129, 130, 131],
    note: "NCERT (CBSE Class 12) — Dual Nature of Radiation and Matter (Chapter 11, NCERT Physics Part 2)",
    subtopics: [
      "Electron Emission",
      "Photoelectric Effect and its Experimental Study",
      "Einstein's Photoelectric Equation and the Photon",
      "Wave Nature of Matter",
    ],
  },

  c12PhyAtoms: {
    id: "c12PhyAtoms",
    chapterName: "Atoms",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__Atoms.pdf",
    pdf: cls12Phy("Part_2/04. ATOMS.pdf"),
    answersPdf: cls12Phy("Part_2/NCERT_Physics_12th_Part_2.pdf"),
    answerPages: [125, 126, 127, 128, 129, 130, 131],
    note: "NCERT (CBSE Class 12) — Atoms (Chapter 12, NCERT Physics Part 2)",
    subtopics: [
      "Alpha-Particle Scattering and Rutherford's Model",
      "Atomic Spectra",
      "Bohr Model of the Hydrogen Atom",
      "Line Spectra of the Hydrogen Atom",
      "de Broglie's Explanation of Bohr's Postulate",
    ],
  },

  c12PhyNuclei: {
    id: "c12PhyNuclei",
    chapterName: "Nuclei",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__Nuclei.pdf",
    pdf: cls12Phy("Part_2/05. NUCLEI.pdf"),
    answersPdf: cls12Phy("Part_2/NCERT_Physics_12th_Part_2.pdf"),
    answerPages: [125, 126, 127, 128, 129, 130, 131],
    note: "NCERT (CBSE Class 12) — Nuclei (Chapter 13, NCERT Physics Part 2)",
    subtopics: [
      "Atomic Masses and Composition of the Nucleus",
      "Size of the Nucleus",
      "Mass-Energy and Nuclear Binding Energy",
      "Nuclear Force",
      "Radioactivity",
      "Nuclear Energy",
    ],
  },

  // ⚠ Ch.14's PDF CONTAINS THE WHOLE BOOK'S BACK MATTER — measured 2026-09-07,
  // before dispatch, because two probes disagreed wildly about this chapter (one
  // reported 95 exercise questions, a later one 6) and "14 pages for 6 questions"
  // is implausible on its face. Neither reading was a defect; the chapter PDF is
  // simply not just the chapter:
  //     p0-17   the chapter itself (§14.1-14.7, Examples 14.1-14.4)
  //     p18-19  the REAL exercise block — 6 questions, 14.1-14.6. That is all
  //             there is; the block is two pages, not fourteen.
  //     p21-29  the ANSWERS SECTION FOR ALL OF PART 2 (chapters 9 through 14).
  //             This is what the "95" probe counted: it read the 9.x/10.x/…/14.x
  //             key entries as question numbers. p29 carries chapter 14's own key,
  //             with exactly 6 entries — which independently confirms the 6.
  //     p30-31  bibliography and index.
  //
  // A transcribing agent MUST NOT read past p19. Transcribing p21-29 would ingest
  // six chapters' ANSWER KEY as questions, and nothing downstream would catch it:
  // the rows would commit, section, and pass every audit.
  //
  // (answerPages still points into NCERT_Physics_12th_Part_2.pdf p125-131 rather
  // than these pages — same content, and the whole-book path is what the other
  // five Part-2 chapters already use.)
  c12PhySemiconductors: {
    id: "c12PhySemiconductors",
    chapterName: "Semiconductor Electronics: Materials, Devices and Simple Circuits",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Physics",
    sourceFile: "NCERT_12_Physics__SemiconductorElectronics.pdf",
    pdf: cls12Phy("Part_2/06. SEICONDUCTOR ELECTRONICS.pdf"),
    answersPdf: cls12Phy("Part_2/NCERT_Physics_12th_Part_2.pdf"),
    answerPages: [125, 126, 127, 128, 129, 130, 131],
    note: "NCERT (CBSE Class 12) — Semiconductor Electronics: Materials, Devices and Simple Circuits (Chapter 14, NCERT Physics Part 2)",
    subtopics: [
      "Classification of Metals, Conductors and Semiconductors",
      "Intrinsic and Extrinsic Semiconductors",
      "p-n Junction and the Semiconductor Diode",
      "Application of Junction Diode as a Rectifier",
      // NOT an NCERT section — rationalisation removed "Special Purpose p-n
      // Junction Diodes" entirely, and that is MEASURED rather than inferred:
      // "special purpose", "light emitting", "photodiode", "solar cell" and
      // "zener" each occur ZERO times in the whole chapter. Added 2026-09-11
      // because THE BOARD STILL SETS IT — every one of the five 2022 Term-II
      // Physics openers carries one (LED ×2, solar cell ×2, photodiode), each
      // found independently and each filed on "p-n Junction and the
      // Semiconductor Diode" while flagging that it is the wrong home.
      // Editorial addition, like "Combination of Resistors", not a restoration.
      "Special Purpose p-n Junction Diodes",
    ],
  },

  // ── Ch.1 Solutions (12th, Part 1) — the CHEMISTRY PILOT, chosen deliberately as
  //    the hardest shape in the subject so one chapter retires every unknown at
  //    once: it carries ALL THREE streams (13 worked Examples, 12 Intext Questions,
  //    41 Exercises), it is where the Intext/Exercise numbering COLLISION bites,
  //    it is 5x-painted, and it is KEYED — so the step-6 gate runs on the first
  //    pass rather than being deferred to some later chapter.
  //
  //    REFS MUST CARRY THE STREAM: `Eg 1.n` / `Intext 1.n` / `Ex 1.n`. The book
  //    numbers Intext Questions and Exercises identically (both 1.1, 1.2, …), so a
  //    bare "1.5" is ambiguous between two different questions. `Ex 1.` is not a
  //    prefix of `Intext 1.` and vice versa, so section routing stays unambiguous.
  //
  //    ANSWER PAGES: lech1an.pdf is 5 pages covering Units 1-5, and Unit 1's whole
  //    block sits on 0-based p0 (that page also carries Units 2 and 3 — read to the
  //    next `UNIT` heading, not to the end of the page).
  //
  //    Subtopics are the book's SEVEN top-level numbered sections, read off the
  //    rendered margin column: the text layer truncates each at its line wrap
  //    ("Types of" for "Types of Solutions") and a `^1\.\d` scan returns the Intext
  //    questions instead of the headings.
  c12ChemSolutions: {
    id: "c12ChemSolutions",
    chapterName: "Solutions",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Solutions.pdf",
    pdf: cls12Chem("Part_1/01. Solutions.pdf"),
    answersPdf: cls12Chem("Part_1/lech1an.pdf"),
    answerPages: [0],
    note: "NCERT (CBSE Class 12) — Solutions (Chapter 1, NCERT Chemistry Part 1)",
    subtopics: [
      "Types of Solutions",
      "Expressing Concentration of Solutions",
      "Solubility",
      "Vapour Pressure of Liquid Solutions",
      "Ideal and Non-ideal Solutions",
      "Colligative Properties and Determination of Molar Mass",
      "Abnormal Molar Masses",
    ],
  },

  // ── The remaining NINE Class-12 Chemistry chapters (2026-09-08). Subtopics are
  //    each chapter's top-level printed section headings, harvested by a prep pass
  //    that VALIDATED its method against Ch.1's known 7-section answer before
  //    trusting itself — the text layer cannot be scanned for these directly:
  //    headings wrap (so they truncate), and Exercise/Intext question numbers are
  //    ALSO `N.n` in the same left margin, so a position-only scan returned 40
  //    "sections" for a 7-section chapter. The discriminator is the FONT
  //    (BallroomTango ~14pt vs Bookman-Demi ~9.5pt for question numbers).
  //
  // ⚠ DELIBERATE DIVERGENCE FROM THE PRINTED HEADINGS, in ch8 and ch9 ONLY.
  //    Both chapters are really TWO HALF-CHAPTERS that repeat the same structural
  //    headings: ch8 is aldehydes+ketones (8.1-8.5) then carboxylic acids
  //    (8.6-8.10), and ch9 is amines (9.1-9.6) then diazonium salts (9.7-9.10).
  //    So each prints "Physical Properties" and "Chemical Reactions" TWICE.
  //    `subtopics_chapter_id_name_key` is UNIQUE on (chapter_id, name), so
  //    committing them verbatim would SILENTLY FUSE the two halves — carboxylic
  //    acid physical-properties questions landing in the aldehyde subtopic, with
  //    every count still reconciling and nothing downstream able to see it. They
  //    are therefore qualified by compound class. This is the same class of call
  //    as mh-sb-11 Ch.4 shipping as `Binomial Theorem`: a name that diverges from
  //    the printed one, on purpose, recorded here so nobody "restores" it.
  //
  //    ch9 §9.7 additionally prints "Diazoniun" — a genuine NCERT typo, confirmed
  //    at 3x zoom against the same page's body text and §9.10, which both spell it
  //    correctly. Corrected here: a subtopic name is a NAVIGATION LABEL and
  //    nothing factual turns on it (the State Board TITLE_FIXES precedent).
  //
  //    KEY COVERAGE IS PARTIAL AND PER-STREAM. ch6 and ch10 have NO exercise key
  //    block in lech2an (confirmed by a whole-file scan for `6.n`/`10.n` lines),
  //    so they carry no answersPdf at all rather than pointing at a file that does
  //    not answer them. ch6 is still not blind — its in-chapter section answers
  //    all 9 intext questions. ch10 Biomolecules is the true outlier: no exercise
  //    key, no intext-answer section, AND ZERO worked examples (the string
  //    "Example" occurs 0 times in its 22 pages), so all three streams are
  //    unkeyed and the step-6 gate cannot run on it at all.

  c12ChemElectrochemistry: {
    id: "c12ChemElectrochemistry",
    chapterName: "Electrochemistry",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Electrochemistry.pdf",
    pdf: cls12Chem("Part_1/02. Electrochemistry.pdf"),
    answersPdf: cls12Chem("Part_1/lech1an.pdf"),
    answerPages: [0],
    note: "NCERT (CBSE Class 12) — Electrochemistry (Chapter 2, NCERT Chemistry Part 1)",
    subtopics: [
      "Electrochemical Cells",
      "Galvanic Cells",
      "Nernst Equation",
      "Conductance of Electrolytic Solutions",
      "Electrolytic Cells and Electrolysis",
      "Batteries",
      "Fuel Cells",
      "Corrosion",
    ],
  },

  c12ChemKinetics: {
    id: "c12ChemKinetics",
    chapterName: "Chemical Kinetics",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Kinetics.pdf",
    pdf: cls12Chem("Part_1/03. Chemical Kinetics.pdf"),
    answersPdf: cls12Chem("Part_1/lech1an.pdf"),
    answerPages: [0, 1],
    note: "NCERT (CBSE Class 12) — Chemical Kinetics (Chapter 3, NCERT Chemistry Part 1)",
    subtopics: [
      "Rate of a Chemical Reaction",
      "Factors Influencing Rate of a Reaction",
      "Integrated Rate Equations",
      "Temperature Dependence of the Rate of a Reaction",
      "Collision Theory of Chemical Reactions",
    ],
  },

  c12ChemDBlock: {
    id: "c12ChemDBlock",
    chapterName: "The d-and f-Block Elements",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__DBlock.pdf",
    pdf: cls12Chem("Part_1/04. The d-and f-Block Elements.pdf"),
    answersPdf: cls12Chem("Part_1/lech1an.pdf"),
    answerPages: [1],
    note: "NCERT (CBSE Class 12) — The d-and f-Block Elements (Chapter 4, NCERT Chemistry Part 1)",
    subtopics: [
      "Position in the Periodic Table",
      "Electronic Configurations of the d-Block Elements",
      "General Properties of the Transition Elements (d-Block)",
      "Some Important Compounds of Transition Elements",
      "The Lanthanoids",
      "The Actinoids",
      "Some Applications of d- and f-Block Elements",
    ],
  },

  c12ChemCoordination: {
    id: "c12ChemCoordination",
    chapterName: "Coordination Compounds",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Coordination.pdf",
    pdf: cls12Chem("Part_1/05. Coordination Compounds.pdf"),
    answersPdf: cls12Chem("Part_1/lech1an.pdf"),
    answerPages: [2],
    note: "NCERT (CBSE Class 12) — Coordination Compounds (Chapter 5, NCERT Chemistry Part 1)",
    subtopics: [
      "Werner’s Theory of Coordination Compounds",
      "Definitions of Some Important Terms Pertaining to Coordination Compounds",
      "Nomenclature of Coordination Compounds",
      "Isomerism in Coordination Compounds",
      "Bonding in Coordination Compounds",
      "Bonding in Metal Carbonyls",
      "Importance and Applications of Coordination Compounds",
    ],
  },

  c12ChemHaloalkanes: {
    id: "c12ChemHaloalkanes",
    chapterName: "Haloalkanes and Haloarenes",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Haloalkanes.pdf",
    pdf: cls12Chem("Part_2/06. Haloalkanes and Haloarenes.pdf"),
    // NO EXERCISE KEY — this unit has no block in lech2an (verified by a
    // whole-file scan: zero `6.n` lines). answersPdf is deliberately
    // OMITTED rather than pointed at a file that does not answer it.
    note: "NCERT (CBSE Class 12) — Haloalkanes and Haloarenes (Chapter 6, NCERT Chemistry Part 2)",
    subtopics: [
      "Classification",
      "Nomenclature",
      "Nature of C-X Bond",
      "Methods of Preparation of Haloalkanes",
      "Preparation of Haloarenes",
      "Physical Properties",
      "Chemical Reactions",
      "Polyhalogen Compounds",
    ],
  },

  c12ChemAlcohols: {
    id: "c12ChemAlcohols",
    chapterName: "Alcohols, Phenols and Ethers",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Alcohols.pdf",
    pdf: cls12Chem("Part_2/07. Alcohols, Phenols and Ethers.pdf"),
    answersPdf: cls12Chem("Part_2/lech2an.pdf"),
    answerPages: [0, 1],
    note: "NCERT (CBSE Class 12) — Alcohols, Phenols and Ethers (Chapter 7, NCERT Chemistry Part 2)",
    subtopics: [
      "Classification",
      "Nomenclature",
      "Structures of Functional Groups",
      "Alcohols and Phenols",
      "Some Commercially Important Alcohols",
      "Ethers",
    ],
  },

  c12ChemAldehydes: {
    id: "c12ChemAldehydes",
    chapterName: "Aldehydes, Ketones and Carboxylic Acids",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Aldehydes.pdf",
    pdf: cls12Chem("Part_2/08. Aldehydes, Ketones and Carboxylic Acids.pdf"),
    answersPdf: cls12Chem("Part_2/lech2an.pdf"),
    answerPages: [1, 2],
    note: "NCERT (CBSE Class 12) — Aldehydes, Ketones and Carboxylic Acids (Chapter 8, NCERT Chemistry Part 2)",
    subtopics: [
      "Nomenclature and Structure of Carbonyl Group",
      "Preparation of Aldehydes and Ketones",
      "Physical Properties of Aldehydes and Ketones",
      "Chemical Reactions of Aldehydes and Ketones",
      "Uses of Aldehydes and Ketones",
      "Nomenclature and Structure of Carboxyl Group",
      "Methods of Preparation of Carboxylic Acids",
      "Physical Properties of Carboxylic Acids",
      "Chemical Reactions of Carboxylic Acids",
      "Uses of Carboxylic Acids",
    ],
  },

  c12ChemAmines: {
    id: "c12ChemAmines",
    chapterName: "Amines",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Amines.pdf",
    pdf: cls12Chem("Part_2/09. Amines.pdf"),
    answersPdf: cls12Chem("Part_2/lech2an.pdf"),
    answerPages: [3],
    note: "NCERT (CBSE Class 12) — Amines (Chapter 9, NCERT Chemistry Part 2)",
    subtopics: [
      "Structure of Amines",
      "Classification",
      "Nomenclature",
      "Preparation of Amines",
      "Physical Properties of Amines",
      "Chemical Reactions of Amines",
      "Method of Preparation of Diazonium Salts",
      "Physical Properties of Diazonium Salts",
      "Chemical Reactions of Diazonium Salts",
      "Importance of Diazonium Salts in Synthesis of Aromatic Compounds",
    ],
  },

  c12ChemBiomolecules: {
    id: "c12ChemBiomolecules",
    chapterName: "Biomolecules",
    examId: EXAM_ID_CBSE_12,
    subjectName: "Chemistry",
    sourceFile: "NCERT_12_Chemistry__Biomolecules.pdf",
    pdf: cls12Chem("Part_2/10. Biomolecules.pdf"),
    // NO EXERCISE KEY — this unit has no block in lech2an (verified by a
    // whole-file scan: zero `10.n` lines). answersPdf is deliberately
    // OMITTED rather than pointed at a file that does not answer it.
    note: "NCERT (CBSE Class 12) — Biomolecules (Chapter 10, NCERT Chemistry Part 2)",
    subtopics: [
      "Carbohydrates",
      "Proteins",
      "Enzymes",
      "Vitamins",
      "Nucleic Acids",
      "Hormones",
    ],
  },


  // ── The NINE Class-11 Chemistry chapters (2026-09-08). A SIMPLER shape than
  //    Class 12 and the differences are structural, not incidental:
  //      * NO INTEXT STREAM AT ALL — confirmed letterspacing-tolerantly across all
  //        nine chapters (a naive scan returning zero proves nothing in a book that
  //        letter-spaces display words). Worked items are `Problem N.n`, never
  //        `Example N.n`. So two section blocks per chapter, not three.
  //      * No 5x paint. Headings are separated by WEIGHT, not a display face, and
  //        the face is named differently per Part — `BookmanOldStyle-Bold` 10.5pt
  //        in Part_1, `Bookman-Demi` 10.5pt in Part_2, against regular 9.5pt for
  //        question numbers. The Class-12 BallroomTango test returns 0 here.
  //
  // ⚠ THE KEY IS PARTIAL **PER QUESTION**, not merely per chapter, and page spans
  //    badly overstate it: only 194 of 373 exercises (52%) carry an entry at all,
  //    because this key prints final VALUES only. ch7 keys ONE exercise of 30;
  //    ch8 keys FOUR of 40. So the compensating regime (blind re-derivation +
  //    grounding) is owed on ch3, ch4, ch7 AND ch8 — about 150 exercises — not
  //    just on the two chapters that lack a key block outright.
  //
  //    ch3 and ch4 have NO key of any kind and, having no Intext stream, no second
  //    source either: 80 exercises resting entirely on derivation.
  //
  //    TRANSCRIBER HAZARDS measured during prep, all silent: every top-level
  //    heading RENDERS IN ALL CAPS regardless of typed case, so text-layer casing
  //    carries no information (titles below are normalised to Title Case);
  //    ch5's delta extracts as U+2206 INCREMENT, not U+0394; `Problem 8.2` splits
  //    across two spans so a span-level count under-reads ch8 by one; and §9.5 is
  //    printed SINGULAR, "AROMATIC HYDROCARBON" — verified on a render, do not
  //    "correct" it.

  c11ChemBasicConcepts: {
    id: "c11ChemBasicConcepts",
    chapterName: "Some Basic Concepts of Chemistry",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mBasicConcepts.pdf",
    pdf: cls11Chem("Part_1/01. Some Basic Concepts of Chemistry.pdf"),
    answersPdf: cls11Chem("Part_1/kech1an.pdf"),
    answerPages: [0],
    // key is PARTIAL PER QUESTION: 17 of 36 exercises carry an entry.
    note: "NCERT (CBSE Class 11) — Some Basic Concepts of Chemistry (Chapter 1, NCERT Chemistry Part 1)",
    subtopics: [
      "Importance of Chemistry",
      "Nature of Matter",
      "Properties of Matter and Their Measurement",
      "Uncertainty in Measurement",
      "Laws of Chemical Combinations",
      "Dalton’s Atomic Theory",
      "Atomic and Molecular Masses",
      "Mole Concept and Molar Masses",
      "Percentage Composition",
      "Stoichiometry and Stoichiometric Calculations",
    ],
  },

  c11ChemStructureAtom: {
    id: "c11ChemStructureAtom",
    chapterName: "Structure of Atom",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mStructureAtom.pdf",
    pdf: cls11Chem("Part_1/02. Structure of Atom.pdf"),
    answersPdf: cls11Chem("Part_1/kech1an.pdf"),
    answerPages: [0, 1, 2],
    // key is PARTIAL PER QUESTION: 66 of 67 exercises carry an entry.
    //
    // THE EXERCISES BLOCK HAS A DELIBERATE GAP AT 2.21 - do not "repair" it.
    // The book reprints its own worked `Problem 2.13` verbatim as exercise 2.21
    // (byte-identical stems, verified), so `content_hash` deduped it and the
    // surviving row is `Eg 2.13`, which carries the book's OWN printed solution.
    // Nothing is lost by the drop, and re-admitting it would mean authoring a
    // second solution to a question already answered two blocks above.
    //
    // THIS IS NOT THE CLASS-12 `Eg 6.3.21` CASE, which WAS re-admitted: there the
    // two items posed the same function to teach two DIFFERENT tests, so dropping
    // one lost the lesson. Here they teach the same thing.
    note: "NCERT (CBSE Class 11) — Structure of Atom (Chapter 2, NCERT Chemistry Part 1)",
    subtopics: [
      "Discovery of Sub-atomic Particles",
      "Atomic Models",
      "Developments Leading to the Bohr’s Model of Atom",
      "Bohr’s Model for Hydrogen Atom",
      "Towards Quantum Mechanical Model of the Atom",
      "Quantum Mechanical Model of Atom",
    ],
  },

  c11ChemPeriodicity: {
    id: "c11ChemPeriodicity",
    chapterName: "Classification of Elements and Periodicity in Properties",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mPeriodicity.pdf",
    pdf: cls11Chem("Part_1/03. Classification of Elements and Periodicity in Properties.pdf"),
    // NO KEY OF ANY KIND — kech1an has no UNIT 3 block (verified), and
    // Class 11 has no Intext stream, so there is no second source either.
    // All 40 exercises rest on derivation; the step-6 gate cannot run.
    note: "NCERT (CBSE Class 11) — Classification of Elements and Periodicity in Properties (Chapter 3, NCERT Chemistry Part 1)",
    subtopics: [
      "Why Do We Need to Classify Elements ?",
      "Genesis of Periodic Classification",
      "Modern Periodic Law and the Present Form of the Periodic Table",
      "Nomenclature of Elements with Atomic Numbers > 100",
      "Electronic Configurations of Elements and the Periodic Table",
      "Electronic Configurations and Types of Elements: s-, p-, d-, f- Blocks",
      "Periodic Trends in Properties of Elements",
    ],
  },

  c11ChemBonding: {
    id: "c11ChemBonding",
    chapterName: "Chemical Bonding and Molecular Structure",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mBonding.pdf",
    pdf: cls11Chem("Part_1/04. Chemical Bonding and Molecular Structure.pdf"),
    // NO KEY OF ANY KIND — kech1an has no UNIT 4 block (verified), and
    // Class 11 has no Intext stream, so there is no second source either.
    // All 40 exercises rest on derivation; the step-6 gate cannot run.
    note: "NCERT (CBSE Class 11) — Chemical Bonding and Molecular Structure (Chapter 4, NCERT Chemistry Part 1)",
    subtopics: [
      "Kössel-Lewis Approach to Chemical Bonding",
      "Ionic or Electrovalent Bond",
      "Bond Parameters",
      "The Valence Shell Electron Pair Repulsion (VSEPR) Theory",
      "Valence Bond Theory",
      "Hybridisation",
      "Molecular Orbital Theory",
      "Bonding in Some Homonuclear Diatomic Molecules",
      "Hydrogen Bonding",
    ],
  },

  c11ChemThermodynamics: {
    id: "c11ChemThermodynamics",
    chapterName: "Thermodynamics",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mThermodynamics.pdf",
    pdf: cls11Chem("Part_1/05. Thermodynamics.pdf"),
    answersPdf: cls11Chem("Part_1/kech1an.pdf"),
    answerPages: [2, 3],
    // key is PARTIAL PER QUESTION: 22 of 22 exercises carry an entry.
    note: "NCERT (CBSE Class 11) — Thermodynamics (Chapter 5, NCERT Chemistry Part 1)",
    subtopics: [
      "Thermodynamic Terms",
      "Applications",
      "Measurement of ΔU and ΔH: Calorimetry",
      "Enthalpy Change, ΔrH of a Reaction – Reaction Enthalpy",
      "Enthalpies for Different Types of Reactions",
      "Spontaneity",
      "Gibbs Energy Change and Equilibrium",
    ],
  },

  c11ChemEquilibrium: {
    id: "c11ChemEquilibrium",
    chapterName: "Equilibrium",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mEquilibrium.pdf",
    pdf: cls11Chem("Part_1/06. Equilibrium.pdf"),
    answersPdf: cls11Chem("Part_1/kech1an.pdf"),
    answerPages: [3, 4],
    // Key coverage: 62 of 73 exercises carry an entry (measured off the RENDERED
    // answer pages, ak-03 giving 27 and ak-04 giving 35 — not off the text layer,
    // which under-reports where a key draws its answer).
    //
    // BUT 62 PRINTED IS NOT 62 DIFFABLE. Two of those entries (6.38, 6.41) point at
    // rows that do not exist: the book reprints its own worked Problems 6.13 and
    // 6.16 verbatim as exercises 6.38 and 6.41 (byte-identical stems), so
    // content_hash keeps the copy carrying the book's printed solution and the
    // Exercises block has deliberate gaps at 6.38 and 6.41. backfill-sections names
    // exactly those two as its only orphans, which is the check that nothing else
    // went missing. The honest cross-check denominator is 60.
    //
    // Do not "repair" the gaps — same call as ch2's Ex 2.21, and NOT the Class-12
    // Eg 6.3.21 case, where the two items taught different things.
    note: "NCERT (CBSE Class 11) — Equilibrium (Chapter 6, NCERT Chemistry Part 1)",
    subtopics: [
      "Equilibrium in Physical Processes",
      "Equilibrium in Chemical Processes – Dynamic Equilibrium",
      "Law of Chemical Equilibrium and Equilibrium Constant",
      "Homogeneous Equilibria",
      "Heterogeneous Equilibria",
      "Applications of Equilibrium Constants",
      "Relationship Between Equilibrium Constant K, Reaction Quotient Q and Gibbs Energy G",
      "Factors Affecting Equilibria",
      "Ionic Equilibrium in Solution",
      "Acids, Bases and Salts",
      "Ionization of Acids and Bases",
      "Buffer Solutions",
      "Solubility Equilibria of Sparingly Soluble Salts",
    ],
  },

  c11ChemRedox: {
    id: "c11ChemRedox",
    chapterName: "Redox Reactions",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mRedox.pdf",
    pdf: cls11Chem("Part_2/07. Redox Reactions.pdf"),
    answersPdf: cls11Chem("Part_2/kech2an.pdf"),
    answerPages: [0],
    // key is PARTIAL PER QUESTION: 1 of 30 exercises carry an entry.
    note: "NCERT (CBSE Class 11) — Redox Reactions (Chapter 7, NCERT Chemistry Part 2)",
    subtopics: [
      "Classical Idea of Redox Reactions – Oxidation and Reduction Reactions",
      "Redox Reactions in Terms of Electron Transfer Reactions",
      "Oxidation Number",
      "Redox Reactions and Electrode Processes",
    ],
  },

  c11ChemOrganicBasics: {
    id: "c11ChemOrganicBasics",
    chapterName: "Organic Chemistry – Some Basic Principles and Techniques",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mOrganicBasics.pdf",
    pdf: cls11Chem("Part_2/08. Organic Chemistry – Some Basic Principles and Techniques.pdf"),
    answersPdf: cls11Chem("Part_2/kech2an.pdf"),
    answerPages: [0],
    // key is PARTIAL PER QUESTION: 4 of 40 exercises carry an entry.
    note: "NCERT (CBSE Class 11) — Organic Chemistry – Some Basic Principles and Techniques (Chapter 8, NCERT Chemistry Part 2)",
    subtopics: [
      "General Introduction",
      "Tetravalence of Carbon: Shapes of Organic Compounds",
      "Structural Representations of Organic Compounds",
      "Classification of Organic Compounds",
      "Nomenclature of Organic Compounds",
      "Isomerism",
      "Fundamental Concepts in Organic Reaction Mechanism",
      "Methods of Purification of Organic Compounds",
      "Qualitative Analysis of Organic Compounds",
      "Quantitative Analysis",
    ],
  },

  c11ChemHydrocarbons: {
    id: "c11ChemHydrocarbons",
    chapterName: "Hydrocarbons",
    examId: EXAM_ID_CBSE_11,
    subjectName: "Chemistry",
    sourceFile: "NCERT_11_Chemistry__mHydrocarbons.pdf",
    pdf: cls11Chem("Part_2/09. Hydrocarbons.pdf"),
    answersPdf: cls11Chem("Part_2/kech2an.pdf"),
    answerPages: [0, 1, 2, 3],
    // KEY COVERAGE IS COMPLETE HERE: all 25 exercises carry an entry (9.1-9.25).
    // An earlier note said "22 of 25" and was WRONG - it came from a text-layer
    // scan, and this key draws several of its answers as STRUCTURES, whose entry
    // numbers the text layer drops. 9.9 (cis/trans-hex-2-ene) and 9.17 (the three
    // dicarbonyl products) are absent from get_text() and plainly present on the
    // rendered page. Three entries are thin rather than missing: 9.10 is "Due to
    // resonance", 9.16 is a bare cross-reference to the chapter text, and 9.23
    // gives a reason without the order. COUNT KEY COVERAGE OFF THE RENDER.
    note: "NCERT (CBSE Class 11) — Hydrocarbons (Chapter 9, NCERT Chemistry Part 2)",
    subtopics: [
      "Classification",
      "Alkanes",
      "Alkenes",
      "Alkynes",
      "Aromatic Hydrocarbon",
      "Carcinogenicity and Toxicity",
    ],
  },

  // ── Ch.1 Real Numbers (10th). 9pp, Examples 1-7 + Ex 1.1 (7 items) + Ex 1.2
  //    (3 items). The PILOT chapter for the Class-10 lane, picked to prove the
  //    NEW EXAM end to end at the lowest cost: it has ZERO figures, ZERO tables
  //    and ZERO MCQs, so it exercises the pipeline spine and none of this book's
  //    three hazards (figure-DEPENDENT geometry, Ch.13's per-question frequency
  //    tables, exercise-level preambles like Ex 12.2's "take π = 22/7"). Those
  //    are proven on Ch.6 / Ch.13 / Ch.12 respectively, before any wide wave.
  //
  //    THE `c10` ID PREFIX IS LOAD-BEARING, for the same reason `c11` is: this
  //    pipeline has ONE flat data/ directory, and Probability and Statistics
  //    each exist in Class 10 AND Class 11/12.
  //
  //    Section→page map (0-based): §1.1 Introduction p0 · §1.2 Fundamental
  //    Theorem of Arithmetic p1-2 · Examples 1-4 p3-4 · EXERCISE 1.1 p4-5 ·
  //    §1.3 Revisiting Irrational Numbers p5-6 · Examples 5-7 p6-8 ·
  //    EXERCISE 1.2 p8 · §1.4 Summary p8.
  //
  //    KEY COVERAGE 5 of 10 exercise items — the weakest of any non-geometry
  //    chapter in the book, and structural rather than accidental: Ex 1.1 keys
  //    Q1,2,3,4,7 and skips Q5/Q6 (both "explain why"), and EX 1.2 HAS NO KEY
  //    BLOCK AT ALL because all three of its items are "prove that … is
  //    irrational". So the step-6 gate covers Ex 1.1's computable half and
  //    cannot speak to the other five items; their solutions are proofs checked
  //    against the book's own Examples 5-7, which demonstrate the identical
  //    contradiction argument.
  c10RealNumbers: {
    id: "c10RealNumbers",
    chapterName: "Real Numbers",
    examId: EXAM_ID_CBSE_10,
    subjectName: "Mathematics",
    sourceFile: "NCERT_10_Maths__RealNumbers.pdf",
    pdf: cls10Maths("01. Real Numbers.pdf"),
    answersPdf: cls10Maths("jemh1an.pdf"),
    answerPages: [0], // Ex 1.1's block; Ex 1.2 is absent from the key entirely
    note: "NCERT (CBSE Class 10) — Real Numbers (Chapter 1, NCERT Mathematics)",
    subtopics: [
      "Fundamental Theorem of Arithmetic",
      "HCF and LCM by Prime Factorisation",
      "Irrational Numbers and Proof by Contradiction",
    ],
  },

  // ── Ch.6 Triangles (10th). 26pp, Examples 1-8 + Ex 6.1 (3 items) / 6.2 (10) /
  //    6.3 (16). The FIGURE chapter of this book and the second Class-10 ingest,
  //    picked to prove the two hazards Ch.1 deliberately avoided.
  //
  //    1. **FIGURES ARE VECTOR HERE, NOT A SCANNED RASTER.** attach-images.ts's
  //       header describes the Class-12 Maths case — "a full-page BACKGROUND
  //       RASTER … no extractable image object". Class 10 is the opposite:
  //       p22 carries 195 real drawing ops and a genuine text layer, and its two
  //       raster images are the page background (2480x3508 in 8.5 KB — near
  //       blank) plus the 1894x1894 watermark. The bbox-crop path still applies
  //       and snapCrop's ink-bounding works either way; what changes is that
  //       `get_drawings()` gives exact figure bounds, so an anchor can be
  //       MEASURED rather than eyeballed off a PNG.
  //
  //    2. **ONE CROP PER PRINTED FIGURE — never per sub-part.** Fig 6.34 holds
  //       six labelled triangle pairs (i)-(vi) under ONE caption, and the stem
  //       reads "State which pairs of triangles in Fig. 6.34 are similar", so
  //       the student is meant to see all six. Six sub-crops would be a
  //       decomposition the book does not make. It is also not derivable:
  //       between y=0.14 and y=0.59 the page has exactly ONE ink-free horizontal
  //       band (at y≈0.305), because (iv)'s tall △PQR hangs into the row below
  //       it — the sub-figures interlock. Same for Fig 6.17, captioned once and
  //       referenced as "Fig. 6.17, (i) and (ii)".
  //
  //    3. **THE KEY IS THE WEAKEST IN THE BOOK, AND TWO OF ITS ENTRIES ARE
  //       HINTS RATHER THAN ANSWERS** — Ex 6.2 Q9 ("Through O, draw a line
  //       parallel to DC…") and Ex 6.3 Q14 ("Produce AD to a point E…"). A hint
  //       constrains the METHOD, not the result, so it cannot close the step-6
  //       gate. Real answer coverage is therefore Ex 6.1 2 of 3 · Ex 6.2 2 of 10
  //       · Ex 6.3 3 of 16 = **7 of 29 items (24%)**, not the 31% a naive count
  //       of key entries gives. The other 22 are "prove that…", whose
  //       correctness rests on the proof being valid — which no answer key can
  //       adjudicate. Every claim about this chapter must carry that denominator.
  //
  //    Section→page map (0-based): §6.1 Introduction p0 · §6.2 Similar Figures
  //    p1-5 · EXERCISE 6.1 p5 · §6.3 Similarity of Triangles + Theorems 6.1-6.2
  //    p6-9 · Examples 1-3 p9-10 · EXERCISE 6.2 p11-12 · §6.4 Criteria +
  //    Theorems 6.3-6.5 p12-17 · Examples 4-8 p18-20 · EXERCISE 6.3 p21-23 ·
  //    §6.5 Summary p24.
  c10Triangles: {
    id: "c10Triangles",
    chapterName: "Triangles",
    examId: EXAM_ID_CBSE_10,
    subjectName: "Mathematics",
    sourceFile: "NCERT_10_Maths__Triangles.pdf",
    pdf: cls10Maths("06. Triangles.pdf"),
    answersPdf: cls10Maths("jemh1an.pdf"),
    answerPages: [5], // Ch-6's whole block (Ex 6.1, 6.2, 6.3) shares ak page 5
    note: "NCERT (CBSE Class 10) — Triangles (Chapter 6, NCERT Mathematics)",
    subtopics: [
      "Similar Figures",
      "Basic Proportionality Theorem",
      "Criteria for Similarity of Triangles",
      "Applications of Similarity",
    ],
  },

  // ── Ch.13 Statistics (10th). 31pp, Examples 1-8 + Ex 13.1 (9) / 13.2 (6) /
  //    13.3 (7). The TABLE chapter, and the third Class-10 hazard: nearly every
  //    question carries a grouped-frequency distribution, so the stems are GFM
  //    pipe-tables (header row + the mandatory `|---|` separator). Two shapes
  //    occur and both map onto the same primitive — a WIDE 2-row table (class
  //    intervals across the top, frequencies beneath) and a TALL 2-column one.
  //
  //    ZERO figures in the whole chapter, so no crop work at all — the exact
  //    complement of Ch.6.
  //
  //    **KEY COVERAGE IS 100%, THE BEST IN THE BOOK** (22 of 22 items), and
  //    every value is mechanically computable, so step 6 here is a genuine
  //    third ground truth rather than a read-through: 31 computed values across
  //    the 22 items, all matching, zero errata
  //    (`_tmp_c10Statistics_xcheck.py`). Contrast Ch.6, where the gate reaches
  //    24% of items — same book, same pipeline, opposite ends of the range.
  //
  //    ONE TRAP THE KEY SETTLED: Ex 13.1 Q5's classes are printed INCLUSIVE
  //    (50-52, 53-55, …). Taking them at face value gives a mean of 57.19 only
  //    after the continuity correction to 49.5-52.5, 52.5-55.5, … — which the
  //    key's 57.19 confirms. Ex 13.3 Q4 states the same correction explicitly in
  //    its own hint, so the book is consistent; Q5 just leaves it implied.
  //
  //    Section→page map (0-based): §13.1-13.2 Mean p0-9 (Examples 1-3) ·
  //    EXERCISE 13.1 p10-12 · §13.3 Mode p12-15 (Examples 4-6) ·
  //    EXERCISE 13.2 p15-16 · §13.4 Median p17-26 (Examples 7-8) ·
  //    EXERCISE 13.3 p27-29 · §13.5 Summary p29.
  c10Statistics: {
    id: "c10Statistics",
    chapterName: "Statistics",
    examId: EXAM_ID_CBSE_10,
    subjectName: "Mathematics",
    sourceFile: "NCERT_10_Maths__Statistics.pdf",
    pdf: cls10Maths("13. Statistics.pdf"),
    answersPdf: cls10Maths("jemh1an.pdf"),
    answerPages: [9], // Ch-13's whole block shares ak page 9 with Ch-14's opening
    note: "NCERT (CBSE Class 10) — Statistics (Chapter 13, NCERT Mathematics)",
    subtopics: [
      "Mean of Grouped Data",
      "Mode of Grouped Data",
      "Median of Grouped Data",
    ],
  },

  // ── Ch.12 Surface Areas and Volumes (10th). 10pp, Examples 1-7 + Ex 12.1 (9)
  //    / 12.2 (8). The EXERCISE-PREAMBLE chapter, the last of the three
  //    Class-10 hazards.
  //
  //    **BOTH EXERCISES OPEN WITH "Unless stated otherwise, take π = 22/7",
  //    printed once under the EXERCISE heading and binding every question
  //    beneath it.** That line is not decoration: the whole chapter is numeric,
  //    and 22/7 vs 3.14 changes every answer. It therefore rides into each row's
  //    `context` — a row that carries only its own stem is genuinely ambiguous.
  //
  //    THE PREAMBLE IS OVERRIDDEN PER QUESTION, which is why it cannot simply be
  //    folded into the solutions: Ex 12.2 Q6 and Q8 say "Use π = 3.14" in their
  //    own text, and several of the worked Examples do the same. So the row needs
  //    BOTH — the exercise default in `context` and the local override in `stem`.
  //
  //    Key coverage 17 of 17 (100%), all mechanically computable, all verified
  //    (`_tmp_c10SurfaceAreas_xcheck.py`): zero errata. Ex 12.1 Q5's answer is
  //    SYMBOLIC — \(\frac{l^2}{4}(24+\pi)\), the only non-numeric key in the
  //    chapter.
  //
  //    Figures are illustrative-but-load-bearing for four exercise rows
  //    (Fig 12.10 capsule, 12.11 scooped cylinder, 12.15 gulab jamun,
  //    12.16 pen stand); the stems restate every dimension, so unlike Ch.6 the
  //    crop is a help rather than the only source of data.
  //
  //    Section→page map (0-based): §12.1 Introduction p0 · §12.2 Surface Area of
  //    a Combination p1-5 (Examples 1-4) · EXERCISE 12.1 p5-6 · §12.3 Volume of
  //    a Combination p6-8 (Examples 5-7) · EXERCISE 12.2 p8-9 · §12.4 Summary p9.
  c10SurfaceAreas: {
    id: "c10SurfaceAreas",
    chapterName: "Surface Areas and Volumes",
    examId: EXAM_ID_CBSE_10,
    subjectName: "Mathematics",
    sourceFile: "NCERT_10_Maths__SurfaceAreasAndVolumes.pdf",
    pdf: cls10Maths("12. Surface Areas and Volumes.pdf"),
    answersPdf: cls10Maths("jemh1an.pdf"),
    answerPages: [8],
    note: "NCERT (CBSE Class 10) — Surface Areas and Volumes (Chapter 12, NCERT Mathematics)",
    subtopics: [
      "Surface Area of a Combination of Solids",
      "Volume of a Combination of Solids",
    ],
  },

  // ── Ch.14 Probability (10th). 16pp, Examples 1-13 + Ex 14.1 (25 items) — the
  //    LARGEST chapter in the book by question count once sub-parts split.
  //
  //    **THIS IS THE CHAPTER THAT MAKES `cbse-10` MIXED-FORMAT.** Ex 14.1 Q4
  //    ("Which of the following cannot be the probability of an event?" with
  //    (A) 2/3, (B) −1.5, (C) 15%, (D) 0.7, key B) is a genuine four-option MCQ
  //    — rival ANSWERS, not a sub-part list. The `mixedFormats: true` flag on
  //    the registry entry goes in WITH this chapter's PUBLIC flip, never before
  //    it: tests/format-mix-registry.test.ts fails an exam flagged mixed whose
  //    bank holds only one format. (Ch.8 and Ch.10 carry the book's other MCQs
  //    and will simply add to it.)
  //
  //    ONE SECTION ONLY — §14.1 runs the whole chapter, so the /board outline is
  //    two blocks rather than the usual per-section pairs, and the subtopics are
  //    a PEDAGOGICAL arc rather than the book's (non-existent) sub-headings.
  //
  //    TWO EXAMPLES AND ONE EXERCISE ITEM ARE STARRED "Not from the examination
  //    point of view" (Examples 10 and 11, Ex 14.1 Q20) — the geometric-
  //    probability material. They are INGESTED anyway, because the book prints
  //    them and /board is a book-faithful reader; the starred status is recorded
  //    in the row's own text rather than by dropping it.
  //
  //    Key coverage 25 of 25 (100%). Ex 14.1 Q22 asks the student to COMPLETE a
  //    table, so its stem carries a partially-filled GFM pipe-table and the
  //    solution carries the filled one.
  //
  //    Section→page map (0-based): §14.1 p0-11 (Examples 1-13) ·
  //    EXERCISE 14.1 p12-15 · §14.2 Summary p15.
  c10Probability: {
    id: "c10Probability",
    chapterName: "Probability",
    examId: EXAM_ID_CBSE_10,
    subjectName: "Mathematics",
    sourceFile: "NCERT_10_Maths__Probability.pdf",
    pdf: cls10Maths("14. Probability.pdf"),
    answersPdf: cls10Maths("jemh1an.pdf"),
    answerPages: [9, 10], // Ch-14's key straddles two pages
    note: "NCERT (CBSE Class 10) — Probability (Chapter 14, NCERT Mathematics)",
    subtopics: [
      "Theoretical Probability and Elementary Events",
      "Sure, Impossible and Complementary Events",
      "Probability with Cards, Dice and Coins",
      "Probability from a Collection of Objects",
      "Geometric Probability",
    ],
  },

  // ── Ch.2 Polynomials (10th). 14pp — the SHORTEST chapter in the book.
  //    Examples 1-5 + Ex 2.1 (1 item) / 2.2 (2 items x 6 sub-parts).
  //
  //    1. **THE KEY IS 100% HERE** — all 18 sub-answers of all 3 numbered items
  //       are in jemh1an p0, the best coverage in the book alongside Ch.13. That
  //       is the chapter's own denominator (Ch.1 was 5/10, Ch.6 7/29); it is NOT
  //       a book-wide property, so every chapter still reports its own.
  //
  //    2. **EX 2.1 IS ONE QUESTION, NOT SIX**, even though the key lists six
  //       answers. The book prints a single numbered item ("Find the number of
  //       zeroes of p(x), in each case") and the (i)-(vi) labels live INSIDE
  //       Fig. 2.10, not in the stem. Splitting it would be a decomposition the
  //       book does not make — the same call as Ch.6's Fig. 6.34. Example 1 /
  //       Fig. 2.9 is the identical shape.
  //
  //    3. Only TWO figures in the whole chapter (Fig 2.9, Fig 2.10), both
  //       graph-grids that ARE the question. Every other figure in §2.2 is
  //       teaching prose, not a question anchor.
  c10Polynomials: {
    id: "c10Polynomials",
    chapterName: "Polynomials",
    examId: EXAM_ID_CBSE_10,
    subjectName: "Mathematics",
    sourceFile: "NCERT_10_Maths__Polynomials.pdf",
    pdf: cls10Maths("02. Polynomials.pdf"),
    answersPdf: cls10Maths("jemh1an.pdf"),
    answerPages: [0], // Ex 2.1 + Ex 2.2 both sit in the first key page
    note: "NCERT (CBSE Class 10) — Polynomials (Chapter 2, NCERT Mathematics)",
    subtopics: [
      "Geometrical Meaning of the Zeroes of a Polynomial",
      "Zeroes and Coefficients of a Quadratic Polynomial",
      "Forming a Quadratic Polynomial from its Zeroes",
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
