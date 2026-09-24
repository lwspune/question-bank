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

/**
 * Model credited on an answer we derived, written to `questions.derived_model`
 * (with `derived_at`) for every AUTHORED row of a `derivedAnswers` chapter.
 *
 * ⚠ THE DISCLOSURE IS DELIBERATELY *NOT* PUT IN `pyq_note`, and that is a
 * reversal of what this pipeline did on 2026-09-02 — read this before
 * "restoring" it. `pyq_note` has exactly one consumer, the /browse card footer
 * (`formatProvenance` -> QuestionCard), whose job is to cross-reference a
 * question against its SOURCE. A ~200-char disclosure there was wrong three ways:
 *   - wrong moment: a reader looking at the QUESTION has not seen an answer yet,
 *     so there is nothing for them to mistake for an official key;
 *   - wrong field: it crowded out the source line's only job, on every row;
 *   - wrong premise: it was copied from CDS General Knowledge, which is EXAM
 *     PAPERS, where "official answer key" is a real artifact students hunt for.
 *     This is a TEXTBOOK, and the note already names it — nobody expects an
 *     official key for a textbook exercise.
 *
 * The derived-answer fact is therefore kept as STRUCTURED DATA
 * (`derived_model` / `derived_at`), which is queryable, auditable, and what the
 * flip-public gate keys on. If it should ever be shown to a reader, the right
 * place is a marker on the ANSWER REVEAL driven by that column — not prose
 * stuffed into a text field. Product call, 2026-09-02.
 */
export const DERIVED_MODEL = "claude-opus-5";

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // DB chapter (auto-created on commit)
  subjectName: string; // DB subject (must exist — "Mathematics")
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the chapter PDF
  pages?: number[]; // 0-based page indices to render; omit → all pages
  note: string; // questions.pyq_note
  /**
   * Set when the SOURCE BOOK PRINTS NO ANSWER KEY, so every MCQ key and every
   * exercise answer is DERIVED or AUTHORED by us rather than checked against a
   * printed one. Physics is the case; the Maths volumes all carry an end-of-book
   * ANSWERS section and leave this unset.
   *
   * It turns on two things, and OFF is the default precisely so the 15 shipped
   * Maths chapters keep their exact current behaviour:
   *   - `stamp-provenance.ts` writes `derived_model`/`derived_at`. It does NOT
   *     put the disclosure in `pyq_note` — it RESETS that column to the source
   *     note. (This docstring said "appends a clause to `pyq_note`" until
   *     2026-09-24; that was true before the 2026-09-02 reversal documented on
   *     DERIVED_MODEL above, and the script has not done it since. Corrected
   *     rather than re-implemented: `pyq_note` carries the SOURCE only.)
   *   - `flip-public.ts` REFUSES to publish an authored row that carries no such
   *     stamp.
   * A published derived answer that does not announce itself reads as an
   * official key. That was caught at the publish gate on CDS General Knowledge —
   * one step too late — so here the stamp is a precondition of publishing.
   *
   * Solved examples are deliberately EXCLUDED: they carry the BOOK's own printed
   * worked solution, so claiming them as ours would be the opposite error.
   */
  derivedAnswers?: boolean;
  // Canonical subtopics for this chapter — transcription maps each question to one.
  subtopics: string[];
};

const cls12 = (p: string) => join(SOURCE_ROOT, "12th", p);

// ── PHYSICS (added 2026-09-02) ───────────────────────────────────────────────
// A SECOND subject on this same exam, from a DIFFERENT publisher folder — hence
// its own root rather than a path under SOURCE_ROOT. Pre-split per-chapter PDFs,
// so `pdf` points at a whole chapter and `pages` is omitted.
//
// ⚠ TRANSCRIPTION IS VISION-ONLY, AND THE Std-XII TEXT LAYER FAILS SILENTLY.
// This is MEASURED across the whole volume, not assumed:
//   - U+221A occurs ZERO times in all 376 pages, in a physics book full of radicals.
//   - Superscript ² occurs 4 times; exponents are flattened to the baseline, so
//     "m/s²" extracts as "m/s2" and "1.6 × 10⁻⁵" as "1.6 u 10-5".
//   - GREEK IS SET IN SYMBOL FONT AND EXTRACTS AS LATIN LETTERS. Measured map:
//       S → π      q → °      u → ×      | → ≈      Z → ω      G → δ      I → φ
//     So Oscillations Q1(ii) extracts as `x = 6 sin (100t + S/4)` and Q11 as
//     `0.1 S2 x2 joule`. Both READ as well-formed equations in a variable S.
// That last one is the dangerous part: unlike the Maths books (which yield a
// visibly broken "3 2" for √3/2), this corruption is PLAUSIBLE — a text-first
// pass ships physics that is silently wrong with nothing to flag it. Std XI
// differs in mechanism, not in verdict: it keeps real Greek but emits 572
// private-use glyphs (U+F0xx) for vector arrows, so `B⃗` extracts as `B ur`.
// dump-text.ts stays useful ONLY for locating block boundaries and prose checks.
//
// ⚠ THERE IS NO ANSWERS SECTION IN EITHER PHYSICS VOLUME. Verified across all
// 644 pages of both books: no standalone `Answers` heading, and both end on the
// last chapter's Exercises. So the step-6 answer-key cross-check gate CANNOT run
// as it does for Maths — do NOT go looking for a missing `answersPdf`.
// What DOES exist is a PARTIAL, per-question key: the numericals print their own
// answer inline as `[Ans: …]` (338 across the two books, ~38% of all exercise
// questions). Those are transcribed into `book_answer` and diffed against our
// derivation — a real gate on the numerical half. The MCQs (5 per chapter) and
// the theory/derivation questions carry NO printed answer anywhere, so they run
// the mh-sb-9 humanities regime: blind MCQ re-derivation, answers authored from
// the chapter's own prose, and derived-provenance stamped at COMMIT.
const PHYSICS_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\Physics\\State_Board\\Topics";
const phy12 = (p: string) => join(PHYSICS_ROOT, "12th_Topics", p);

// ── CHEMISTRY (added 2026-09-03) ─────────────────────────────────────────────
// A THIRD subject on this exam, again from its own publisher folder. 16 pre-split
// per-chapter PDFs (whole book 364pp), chapter names matching the
// `syllabus_concepts` MH-State-Board XII Chemistry spine EXACTLY, all 16 — that
// spine was extracted from these very PDFs, so chapter naming is already settled.
//
// ⚠ NO ANSWERS SECTION IN EITHER CHEMISTRY VOLUME. Measured across all 648 pages
// of both books: every "ANSWERS" hit is instruction prose ("Answer the
// following"), and the volumes end on the periodic table (XI) and chapter-16
// content (XII). Same verdict as Physics — do NOT hunt for a missing `answersPdf`.
//
// ⚠ THE INLINE KEY IS THIN, UNEVEN, AND PRINTED FIVE DIFFERENT WAYS. Roughly 124
// of ~910 exercise items carry a printed answer (~14%, against Physics' ~38%),
// and it is CONCENTRATED in the numerical chapters — Thermodynamics 24, Kinetics
// 9, Solid State 4, Electrochemistry 4, Solutions 3. THE ORGANIC AND DESCRIPTIVE
// CHAPTERS HAVE ESSENTIALLY ZERO, so for most of this volume the step-6 gate
// cannot run at all and the mh-sb-9 humanities regime carries the weight.
// The five printed forms, all seen live:
//     (Ans. : x)    (Ans: x)    (Ans.: x)    bare `Ans. : x`
//     ...and a BARE PARENTHESIS with no token at all — Chemical Kinetics prints
//     `(28.7 min)`, `(54.66 kJ/mol)`. A scan for `[Ans` returns 0 for the whole
//     book; a scan for `(Ans` returns 84 and still misses every bare-paren one.
// Counting parenthesised values CHAPTER-WIDE instead of inside the exercise is
// the opposite error and returns garbage — it matches `Fig. 1.1`, the date
// `(1743-1794)` and the electron configuration `(2, 8, 8)`. Scope to the exercise.
//
// ⚠ VISION-ONLY, and for a STRONGER reason than any other book in this project.
// Measured across both volumes: SUBSCRIPTS occur ZERO times, SUPERSCRIPTS ZERO,
// charge signs ZERO — in a chemistry book. Reaction arrows: 34 in XI, 5 in XII.
// So `H₂SO₄` extracts as `H2SO4`, `SO₄²⁻` silently loses its charge entirely, and
// `6.022 × 10²⁰` extracts as `6.022 x 1020` — a well-formed, plausible, and
// completely different number. In the organic chapters a reaction scheme extracts
// as a bag of disconnected fragments (`NH2 / NO2 / Conc. HNO3 / 288 K`) with no
// structure, no arrows and no ordering: there the text layer is not merely lossy,
// it is actively misleading. dump-text.ts is for block boundaries ONLY.
//
// ⚠ ITEM LABELS DIFFER BY VOLUME. Std XII numbers its exercise items with ROMAN
// numerals (i. ii. iii.) in 13 of 16 chapters, where Std XI uses UPPERCASE
// letters (A. B. C.) in all 16. Ch.07, Ch.11 and Ch.15 measure MIXED and must be
// confirmed per chapter rather than assumed. Worked examples are labelled
// `Problem N.M` + `Solution :` (not Physics' `Example N.M`).
const CHEMISTRY_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\Chem\\State_Board\\Book";
const chem12 = (p: string) => join(CHEMISTRY_ROOT, "12th", p);

// ── GEOGRAPHY (added 2026-09-24) ─────────────────────────────────────────────
// A FOURTH subject on this exam, and the first HUMANITIES subject in this
// pipeline. 8 pre-split per-chapter PDFs (whole book 124pp). The `Geography`
// subject did not exist on this exam and was seeded for this ingest.
//
// ⚠ TRANSCRIBE TEXT-FIRST, WHICH IS THE OPPOSITE OF THE OTHER THREE SUBJECTS.
// Physics and Chemistry are vision-only for measured reasons (Symbol-font Greek;
// zero subscripts and zero charge signs across 648 pages). Geography has no
// mathematical notation at all, and its text layer is clean running prose, so it
// is trustworthy ground truth for stems, options and the chapter narrative. Use
// `dump-text.ts` as the primary source and the rendered PNGs for LAYOUT only.
//
// ⚠ DO NOT "FIX" THE TYPOGRAPHIC PUNCTUATION — IT IS ALREADY CORRECT, and the
// evidence that it is broken is an artifact of the TERMINAL, not the book.
// Reading this text layer through a Windows cp1252 console prints a replacement
// character for every curly quote, which looks exactly like mojibake and was
// briefly recorded here as a source defect. Measured on Ch.7: U+FFFD occurs ZERO
// times, and the characters actually present are the right ones — U+2019 (x4),
// U+2018 (x2), U+2013 (x1). The replacement characters exist only in the
// console’s rendering. Read the dump with an explicit utf-8 reader
// (PYTHONIOENCODING=utf-8) before concluding anything about a character, here
// or in any other book in this pipeline.
//
// ⚠ ONE REAL TEXT-LAYER DEFECT DOES EXIST, AND IT IS DECODABLE RATHER THAN LOSSY.
// Text set INSIDE A GRAPHIC can come through with a +29 ASCII cmap offset, so
// Ch.8's newspaper-clipping figure extracts as `8QLRQ3XEOLF6HUYLFH`, which is
// `UnionPublicService` shifted (8->U, Q->n, L->i, R->o; every printable char is
// +29). It is dangerous precisely because it does not look like text at all, so
// it is easy to paste verbatim into a stem.
//
// MEASURED across all eight chapters, so the scope is known rather than feared:
// Ch.8 has 7 occurrences (all inside the Fig 8.5 clipping), Ch.4 has 2 (p.2,
// figure labels `Traditional` and `Presence`), and the other six chapters have
// ZERO. It never touches body prose, only text that is part of a graphic.
// Treat it as a signal that you are reading a FIGURE, and transcribe that text
// off the rendered page rather than decoding it by hand.
//
// ⚠ THERE IS NO ANSWER KEY ANYWHERE IN THIS BOOK. Measured across all 124 pages
// of SB_12th_Geography.pdf: no ANSWERS section, no inline `(Ans. …)` key, and —
// unlike every other subject here — NOT ONE SOLVED EXAMPLE in any chapter. So:
//   - the README's step-6 answer-key cross-check CANNOT run. Do not go looking
//     for a missing `answersPdf`, and do not treat its absence as an oversight.
//   - there is no `solved` bucket at all. Every row is an exercise row, every
//     MCQ key is DERIVED and every subjective answer AUTHORED, so
//     `derivedAnswers: true` on all eight chapters and `stamp-provenance.ts` is
//     a precondition of publishing rather than a formality.
//   - the gate that replaces step 6 is `audit-grounding.ts`. It is the only
//     mechanical check standing behind these answers.
//
// ⚠ THE EXERCISE PAGES ARE TWO-COLUMN AND THE TEXT LAYER INTERLEAVES THEM.
// Measured on Ch.7: `Q.1)` and `Q.3)` both sit at y=183.8 — left and right column
// of the same page. So whole questions arrive out of printed order. Rebuild the
// order from the page images; never from the dump's line order.
//
// ⚠ FOUR QUESTION SHAPES THAT DO NOT OCCUR IN THE MATHS/SCIENCE LANES. The
// GEOGRAPHY_BRIEF.md spells each one out; in summary: Assertion-Reasoning MCQs
// whose four options are identical boilerplate across sub-items; "Complete the
// chain" three-column matching (ONE row, GFM pipe-table); map-work and
// "draw a labelled diagram" tasks (student DRAWING tasks — transcribe the stem,
// and they are NOT figure-dependent, there is nothing in the book to crop); and
// questions whose data table sits in the CHAPTER BODY rather than the exercise
// (Ch.7 Q.6 needs Table 7.5 from page 6, or it is unanswerable).
const GEOGRAPHY_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\Geography\\12th\\Chapters";
const geo12 = (p: string) => join(GEOGRAPHY_ROOT, p);

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

  // ── Ch.3 Trigonometric Functions (12th, Part 1). 47pp, THREE distinct topics
  //    fused: 3.1 Trigonometric Equations & general solutions, 3.2 Solution of
  //    Triangle (polar coords + sine/cosine/projection rules + applications —
  //    height/area problems get `solution_image`), 3.3 Inverse Trig Functions
  //    (principal values + properties). Text layer flattens 2-D math → VISION.
  //    Section→page map: 3.1 p0-10 (Ex 3.1 @p10) · 3.2 p11-23 (Ex 3.2 @p23) ·
  //    3.3 p23-40 (Ex 3.3 @p37) · Miscellaneous Exercise 3 p41-46.
  "trig-functions-12": {
    id: "trig-functions-12",
    chapterName: "Trigonometric Functions",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Trigonometric_Functions.pdf",
    pdf: cls12("Part 01/Ch_03_Trigonometric_Functions.pdf"),
    note: "Maharashtra State Board (Class 12) — Trigonometric Functions (Balbharati textbook)",
    subtopics: [
      "Trigonometric Equations and General Solutions",
      "Polar Coordinates",
      "Solution of Triangle — Sine, Cosine and Projection Rules",
      "Applications of Sine, Cosine and Projection Rules",
      "Inverse Trigonometric Functions and Principal Values",
      "Properties of Inverse Trigonometric Functions",
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

  // ── Ch.5 Application of Definite Integration (12th, Part 2). HEAVILY GRAPHICAL
  //    — nearly every problem is an area/shaded-region diagram (area under a curve
  //    + area between curves). One teaching section (5.1) + Exercise 5.1 + a
  //    Miscellaneous exercise (I MCQ / II subjective). Authored solution-region
  //    diagrams (like Linear Programming's feasible regions) via a matplotlib area
  //    renderer → solution_image_url. Math as LaTeX (integrals, √, area formulas).
  "app-def-integration-12": {
    id: "app-def-integration-12",
    chapterName: "Application of Definite Integration",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Application_of_Definite_Integration.pdf",
    pdf: cls12("Part 02/Ch_05_Application_of_Definite_Integration.pdf"),
    note: "Maharashtra State Board (Class 12) — Application of Definite Integration (Balbharati textbook)",
    subtopics: ["Area Under a Curve", "Area Between Two Curves"],
  },

  // ── Ch.5 Vectors (12th, Part 1). 61pp — the largest State Board chapter yet.
  //    6 teaching sections: 5.1 Vectors and their types (representation, magnitude,
  //    addition/subtraction, components, position vectors) p0-18 (Ex 5.1 @p18) ·
  //    5.2 Section Formula p19-27 (Ex 5.2 @p27) · 5.3 Dot Product (angle, projections,
  //    direction cosines) p28-36 (Ex 5.3 @p36) · 5.4 Cross Product p37-45 (Ex 5.4 @p45) ·
  //    5.5 Scalar & Vector Triple Product p46-53 (Ex 5.5 @p49) · Miscellaneous Exercise 5
  //    p54-60 (20 MCQ + 20 subjective). Feeds Ch.6 Line & Planes conceptually.
  "vectors-12": {
    id: "vectors-12",
    chapterName: "Vectors",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Vectors.pdf",
    pdf: cls12("Part 01/Ch_05_Vectors.pdf"),
    note: "Maharashtra State Board (Class 12) — Vectors (Balbharati textbook)",
    subtopics: [
      "Vectors and Their Types",
      "Section Formula",
      "Dot Product of Vectors",
      "Cross Product of Vectors",
      "Scalar and Vector Triple Product",
    ],
  },

  // ── Ch.6 Line and Planes (12th, Part 1). 33pp — the LAST Part-01 chapter,
  //    the direct application of Ch.5 Vectors (dot/cross products, direction
  //    ratios, section formula) to 3-D lines + planes. Abstract 3-D coordinate
  //    geometry → mostly optional diagrams (like Vectors). UNUSUAL layout: TWO
  //    Miscellaneous blocks — "6 A" sits MID-chapter (p13-15, after Ex 6.2) and
  //    "6 B" at the end (like Matrices' mid-chapter Misc 2(A)); sections.ts keeps
  //    physical order. Exercises don't map 1:1 to sections: Ex 6.1 (lines) ·
  //    Ex 6.2 (distance + skew, §6.2-6.3) · Ex 6.3 (planes, §6.4) · Ex 6.4
  //    (angle/coplanarity/point-plane distance, §6.5-6.7). Misc 6 B I = 20 MCQ.
  //    Text layer flattens 2-D/3-D math → VISION. Math as LaTeX (r = a + λb, etc.).
  "line-planes-12": {
    id: "line-planes-12",
    chapterName: "Line and Planes",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Line_and_Planes.pdf",
    pdf: cls12("Part 01/Ch_06_Line_&_Planes.pdf"),
    note: "Maharashtra State Board (Class 12) — Line and Planes (Balbharati textbook)",
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

  // ── Ch.1 Differentiation (12th, Part 2). 64pp — the largest State Board chapter
  //    yet. The methods spine of Part-02 calculus; feeds Ch.2 Application of
  //    Derivatives. 5 teaching sections, each ending in its own exercise:
  //    §1.1 Composite functions / chain rule p1-11 (Ex 1.1 @p10) · §1.2 Inverse
  //    functions + inverse trig p12-28 (Ex 1.2 @p28) · §1.3 Logarithmic + implicit
  //    p29-39 (Ex 1.3 @p38) · §1.4 Parametric + derivative-wrt-another p40-47
  //    (Ex 1.4 @p47) · §1.5 Higher-order derivatives p48-59 (Ex 1.5 @p59) ·
  //    Miscellaneous Exercise 1 p60-63 (I = 12 MCQ, II = subjective).
  //    §1.2.1 "Geometrical meaning of Derivative" is motivating PROSE with no
  //    questions of its own (p12-13 flows straight into 1.2.2) → deliberately NOT
  //    a subtopic; each exercise block is method-pure, so subtopics are finer-
  //    grained than the MHT-CET Differentiation notes chapter. Two [Activity]
  //    fill-in-the-blank questions (Ex 1.1 Q8 + one more) — a shape earlier
  //    chapters didn't have; transcribe faithfully as subjective.
  //    Text layer flattens 2-D math (dy/dx, fractions) → VISION.
  "differentiation-12": {
    id: "differentiation-12",
    chapterName: "Differentiation",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Differentiation.pdf",
    pdf: cls12("Part 02/Ch_01_DIFFERENTIATION.pdf"),
    note: "Maharashtra State Board (Class 12) — Differentiation (Balbharati textbook)",
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

  // ── Ch.2 Application of Derivatives (12th, Part 2). 30pp — the direct sequel to
  //    Ch.1 Differentiation: every method from Ch.1 applied. 6 topics per "Let us
  //    Study", modelled as 8 subtopics mapping 1:1 onto the book's numbered sections.
  //    Angle-between-curves is folded into Tangents and Normals (only Misc II Q.1 —
  //    1 "orthogonal" + 2 "angle between" mentions chapter-wide, too thin to stand
  //    alone); Velocity/Acceleration/Jerk is KEPT separate (own numbered section +
  //    own solved-example block).
  //
  //    UNLIKE Differentiation, the exercises are NOT method-pure — Ex 2.1 fuses
  //    tangents/normals (Q1-6) with rate measure (Q7+), and Ex 2.4 fuses
  //    increasing/decreasing with maxima/minima. Subtopics are assigned PER-QUESTION.
  //
  //    BLOCK MAP — (page, y), NOT page (7 blocks start mid-page; §2.3.2 at p13
  //    y≈586 and Exercise 2.4 at p24 y≈549 start near the page BOTTOM, so a
  //    page-derived band silently drops them). Verified via get_text('blocks'):
  //      §2.1.2 Tangents/Normals   p00 y543 → solved p01 y230 → p03 y319
  //      §2.1.3 Rate measure       p03 y319 → solved p03 y646 → p06 y 71
  //      §2.1.4 Velocity/Acc/Jerk  p06 y 71 → solved p06 y318 → p07 y 73
  //      EXERCISE 2.1              p07 y 73 → p08 y 71        (16 top-level Q)
  //      §2.2.1 Approximations     p08 y 71 → solved p08 y317 → p10 y475
  //      EXERCISE 2.2              p10 y475 → p11 y 67        ( 6 top-level Q)
  //      §2.3.1 Rolle's Theorem    p11 y 67 → solved p11 y402 → p13 y586
  //      §2.3.2 LMVT               p13 y586 → solved p14 y280 → p15 y 73
  //      EXERCISE 2.3              p15 y 73 → p15 y460        ( 7 top-level Q)
  //      §2.4.1 Incr/Decr          p15 y460 → solved p16 y517 → p18 y 69
  //      §2.4.2-2.4.4 Maxima/Minima p18 y 69 → solved p19 y77 + p20 y429 → p24 y549
  //      EXERCISE 2.4              p24 y549 → p26 y 81        (24 top-level Q)
  //      MISCELLANEOUS EXERCISE 2  p27 y 77 → end  (I = 10 MCQ p27; II = 21 subj p28+)
  //    32 solved examples across 9 blocks. Layout is TWO-COLUMN for the body +
  //    exercises (p01-p25) and single-column for Miscellaneous (p27-29) — read each
  //    two-column page LEFT column fully, then RIGHT column.
  "app-derivatives-12": {
    id: "app-derivatives-12",
    chapterName: "Application of Derivatives",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Application_of_Derivatives.pdf",
    pdf: cls12("Part 02/Ch_02_Application_of_Derivatives.pdf"),
    note: "Maharashtra State Board (Class 12) — Application of Derivatives (Balbharati textbook)",
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

  // ── Ch.3 Indefinite Integration (12th, Part 2). 56pp — the second-largest State
  //    Board chapter. The 3-technique spine of integration (substitution, by parts,
  //    partial fractions), modelled as 7 subtopics mapping onto the book's numbered
  //    sections. ALL math is VISION: the text layer substitutes Sinhala glyphs
  //    (ධ න ඦ ν) for the integral sign, so stems/solutions are unreadable from text.
  //
  //    EXERCISES USE TWO-LEVEL NUMBERING — Roman groups I./II./III. (each with its
  //    own shared instruction, e.g. "Integrate the following" / "Evaluate") each
  //    containing (i)…(x) sub-items. So a set = one Roman group; refs are
  //    `Ex <sec> <Roman> (<roman>)`, siblings sharing setLabel `Ex <sec> <Roman>`.
  //    Solved examples are bare-numbered `1. 2. 3.` + "Solution :" per block →
  //    refs `<sec> SolvedEx.<N>`.
  //
  //    BLOCK MAP — (page, y), verified via get_text('blocks'). Many blocks start
  //    MID-PAGE and several exercises are a mid-page BAND (start AND end on one page):
  //      §3.1 Elementary        solved p02 y552 → p07 y424
  //      EXERCISE 3.1           p07 y424 → p08 y 70   (groups I-IV)
  //      §3.2.1-3.2.2 Subst+Trig solved p11 y448 → p15 y 76
  //      EXERCISE 3.2 (A)       p15 y 76 → p15 y574   (mid-page band; groups I-II)
  //      §3.2.3-3.2.5 Special   solved p20 y350 → p28 y 76
  //      EXERCISE 3.2 (B)       p28 y 76 → p29 y 73   (groups I-II)
  //      §3.2.6 (px+q)/quad     solved p30 y 76 → p33 y 76
  //      EXERCISE 3.2 (C)       p33 y 76 → p33 y281   (mid-page band; group I)
  //      §3.3 By Parts          solved p35 y 76 → p42 y497  (§3.3.3 e^x[f+f'] solved p41 y350)
  //      EXERCISE 3.3           p42 y497 → p43 y386   (groups I-III)
  //      §3.4 Partial Fractions solved p44 y243 → p49 y630
  //      EXERCISE 3.4           p49 y630 → p50 y372   (group I)
  //      MISCELLANEOUS EXERCISE 3  p53 y 76 → end  (I = 20 MCQ, II = subjective)
  //    "Activity" blocks = fill-in-the-blank derivations scattered in the theory;
  //    transcribe faithfully as subjective where they pose a question (the
  //    Differentiation precedent), skip pure prose. Two-column body + exercises;
  //    single-column Miscellaneous. Verify layout per page (it varies).
  "indef-integration-12": {
    id: "indef-integration-12",
    chapterName: "Indefinite Integration",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Indefinite_Integration.pdf",
    pdf: cls12("Part 02/Ch_03_Indefinite_Integration.pdf"),
    note: "Maharashtra State Board (Class 12) — Indefinite Integration (Balbharati textbook)",
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

  // ══ The three Part-02 chapters the first pass never built. Added 2026-08-12 to
  //    unblock the board-PYQ ingest (scripts/mh-hsc-12-pyq/), whose Definite
  //    Integration / Probability / Binomial questions have no DB chapter to land
  //    in. Chapter names are the PRINTED titles, read off page 0 of each PDF at
  //    18pt — note "PROBABILITY DISTRIBUTIONS" is plural while "BINOMIAL
  //    DISTRIBUTION" is singular, and the Ch_08 FILENAME says "Distributions".
  //    The printed title wins; MHT-CET's "Probability Distribution" (singular) is
  //    a different exam's taxonomy and must not be copied over.
  //
  //    ⚠ ALL THREE ARE VISION-ONLY, and this was measured rather than assumed:
  //    U+222B (the integral sign) occurs ZERO times across 95k characters of text
  //    layer in chapters that are entirely about integrals, and "/" occurs 3
  //    times in Ch.4's 29,609 characters. The prose reads perfectly, which is
  //    exactly what makes the text layer look trustworthy.
  //
  //    ANSWER-KEY CROSS-CHECK (step 6, a GATE before flip-public) CAN run for all
  //    three — the whole-book PDF carries an ANSWERS section. Located 2026-08-12
  //    in `12th/State_Board_Maths_12th_Part_2.pdf` (288pp), ANSWERS opens at
  //    0-based page 265, and the per-chapter blocks are:
  //        4. DEFINITE INTEGRATION      p277-278
  //        7. PROBABILITY DISTRIBUTIONS p282-283
  //        8. BINOMIAL DISTRIBUTION     p284-end
  //    (neighbours, for bounding: 3. Indefinite p271, 5. App. of Definite p279,
  //    6. Differential Equations p279.) Render those at fitz.Matrix(3.5,3.5).

  // ── Ch.4 Definite Integration (12th, Part 2). 27pp. Two teaching sections:
  //    §4.1 (p0-p5, Solved Examples @p01 y433, Ex 4.1 @p05 y566) and §4.2
  //    Fundamental theorem (@p06 y70) carrying EIGHT numbered properties, its
  //    own Solved Examples, then Ex 4.2 @p20 y533 and Miscellaneous 4 @p24 y76.
  //    Block boundaries are (page, y) — every one of them starts MID-PAGE.
  "def-integration-12": {
    id: "def-integration-12",
    chapterName: "Definite Integration",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Definite_Integration.pdf",
    pdf: cls12("Part 02/Ch_04_Definite_Integration.pdf"),
    note: "Maharashtra State Board (Class 12) — Definite Integration (Balbharati textbook)",
    // The chapter's own "Let us Study" box (p00) names three topics: "Definite
    // integral as limit of sum", "Fundamental theorem of integral calculus",
    // "Methods of evaluation AND properties of definite integral". The third is
    // split in two here because evaluating by substitution/parts and applying
    // the eight numbered properties (§4.2.1 Property I-VIII) are distinct
    // skills — the README explicitly allows splitting a fused section.
    subtopics: [
      "Definite Integral as a Limit of a Sum",
      "Fundamental Theorem of Integral Calculus",
      "Methods of Evaluation of Definite Integrals",
      "Properties of Definite Integrals",
    ],
  },

  // ── Ch.7 Probability Distributions (12th, Part 2). 26pp, the richest section
  //    structure of the three: 7.1 Random variables @p00 y447 · 7.2 Types @p02
  //    y338 (7.2.1 discrete y385, 7.2.2 continuous y569) · 7.3 Distribution of a
  //    discrete r.v. @p03 y237 (7.3.1 p.m.f. @p04 y580, 7.3.2 c.d.f. @p05 y467,
  //    7.3.3 expectation/variance @p09 y635) · 7.4 Continuous r.v. @p14 y357
  //    (7.4.1 p.d.f. @p15 y117, 7.4.2 c.d.f. @p15 y327). Exercises: 7.1 @p13 y75,
  //    7.2 @p19 y641, Miscellaneous 7 @p22 y597.
  "prob-distributions-12": {
    id: "prob-distributions-12",
    chapterName: "Probability Distributions",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Probability_Distributions.pdf",
    pdf: cls12("Part 02/Ch_07_Probability_Distributions.pdf"),
    note: "Maharashtra State Board (Class 12) — Probability Distributions (Balbharati textbook)",
    subtopics: [
      "Random Variables and Their Types",
      "Probability Mass Function of a Discrete Random Variable",
      "Cumulative Distribution Function",
      "Expected Value and Variance of a Random Variable",
      "Continuous Random Variables and Probability Density Function",
    ],
  },

  // ── Ch.8 Binomial Distribution (12th, Part 2). 11pp, the smallest of the
  //    three. 8.1.1 Bernoulli Trial @p00 y424 · Solved Example @p01 y180 · 8.2
  //    Binomial distribution @p01 y471 · Solved Examples @p04 y77 · 8.3 Mean and
  //    Variance @p05 y454 · Solved Examples @p06 y73 · Ex 8.1 @p06 y467 ·
  //    Miscellaneous 8 @p08 y76. NOTE Ex 8.1 and a Solved-Examples block share
  //    p06 — the block map, not the page, is what separates them.
  "binomial-12": {
    id: "binomial-12",
    chapterName: "Binomial Distribution", // printed title is SINGULAR; the filename is not
    subjectName: "Mathematics",
    sourceFile: "StateBoard_12_Maths__Binomial_Distribution.pdf",
    pdf: cls12("Part 02/Ch_08_Binomial_Distributions.pdf"),
    note: "Maharashtra State Board (Class 12) — Binomial Distribution (Balbharati textbook)",
    subtopics: [
      "Bernoulli Trials",
      "The Binomial Distribution",
      "Mean and Variance of a Binomial Distribution",
    ],
  },

  // ══ PHYSICS ═════════════════════════════════════════════════════════════════
  // ── Ch.5 Oscillations (12th Physics). PILOT chapter for the Physics lane,
  //    chosen because it exercises all three unknowns at once: it is where the
  //    Symbol-font π→`S` corruption was first measured, it carries 15 inline
  //    `[Ans:]` numericals to validate the vision transcription against, and its
  //    Q1(v) is a genuinely figure-dependent MCQ (reads a displacement graph).
  //
  //    22pp, TWO-COLUMN throughout (left x0≈85, right x0≈309/329) — read the
  //    LEFT column fully, then the RIGHT.
  //
  //    Block map (0-based page, y), verified via page.get_text("blocks"):
  //      Solved examples 5.1-5.13 are scattered through the BODY, p03-p17:
  //        5.1 p03 · 5.2,5.3 p04 · 5.4,5.5 p05 · 5.6 p06 · 5.7,5.8 p09
  //        5.9 p13 · 5.10 p14 · 5.11 p15 · 5.12,5.13 p17
  //      (5.3 and 5.8 do NOT start a text block — a header scan misses both.
  //       The count is 13 and the refs are contiguous 5.1-5.13; a gap is a bug.)
  //      Exercises  p20 y≈76 (LEFT col) → end of p21:
  //        `1. Choose the correct option`  p20 L y≈107   → i)-v)   = 5 MCQ
  //        `2. Answer in brief`            p20 R y≈212   → i)-v)   = 5 subjective
  //        flat items 3.-8.                p20 R (after) = 6 subjective
  //        flat items 9.-23.               p21           = 15 subjective
  //      Expected total: 13 solved + 5 MCQ + 26 exercise-subjective = 44.
  "oscillations-12-phy": {
    id: "oscillations-12-phy",
    chapterName: "Oscillations",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Oscillations.pdf",
    pdf: phy12("05. Oscillations.pdf"),
    derivedAnswers: true, // no ANSWERS section in either Physics volume — see the type comment
    note: "Maharashtra State Board (Class 12) — Oscillations (Balbharati Physics textbook)",
    // The BOOK's own section headings (the `syllabus_concepts` MH-State-Board XII
    // Physics spine, extracted from this very file), merged where the book splits
    // one teaching unit across thin sub-sections (5.6.1-5.6.3 → one; 5.12.1 into
    // Simple Pendulum; 5.13.1 into Angular S.H.M.).
    //
    // TWO sections are deliberately NOT subtopics, because a subtopic with no
    // questions ships a /browse filter that returns nothing (the Class-12 Linear
    // Programming precedent):
    //   - §5.1 Introduction — question-less prose.
    //   - §5.14 Damped Oscillations + §5.15 Free/Forced Oscillations and
    //     Resonance. These ARE taught (10 and 5 mentions in the body) and are
    //     simply never examined: measured across the whole Exercises block,
    //     `resonan`/`forced`/`free oscill` occur ZERO times and the single
    //     `damp` hit is the word "UNdamped" inside Q.21, an incidental
    //     qualifier on an angular-S.H.M. torque question. There is no solved
    //     example for either section either.
    //
    // ⚠ EXPECT THIS ACROSS THE PHYSICS LANE: these chapters teach more than they
    // examine, so a subtopic list derived from section headings routinely
    // over-generates. Always diff the committed `by subtopic` tally against this
    // list BEFORE --apply, and drop what got nothing.
    subtopics: [
      "Periodic Motion and Linear S.H.M.",
      "Acceleration, Velocity and Displacement in S.H.M.",
      "Amplitude, Period and Frequency of S.H.M.",
      "Reference Circle, Phase and Graphical Representation",
      "Composition of Two S.H.M.s",
      "Energy of a Particle Performing S.H.M.",
      "Simple Pendulum",
      "Angular S.H.M. and Magnet Vibrating in a Magnetic Field",
    ],
  },

  // ── Ch.01 Rotational Dynamics (12th PHYSICS). 25pp; Exercises open at p-22.
  //    9 solved examples (9 `Solution :` markers): 1.1->p01, 1.2->p04, 1.3->p06, 1.4->p08, 1.5->p08, 1.6->p11, 1.7->p15, 1.8->p17, 1.9->p18
  //    11 exercise questions print an inline [Ans: ...].
  //    ⚠ Q.1's SIXTH sub-item is labelled " X) " ON THE PRINTED PAGE (p-23), after
  //    i) ii) iii) iv) v) — the book's own typo for vi). The ref `Ex Q.1 (X)` is
  //    FAITHFUL; do not "correct" it to (vi), or the ref stops matching the page a
  //    student is holding. Answer is unaffected (A: 1:1:2 for a hollow cylinder).
  "rotational-dynamics-12-phy": {
    id: "rotational-dynamics-12-phy",
    chapterName: "Rotational Dynamics",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Rotational_Dynamics.pdf",
    pdf: phy12("01. Rotational Dynamics.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Rotational Dynamics (Balbharati Physics textbook)",
    subtopics: [
      "Kinematics and Dynamics of Circular Motion",
      "Applications of Uniform Circular Motion",
      "Vertical Circular Motion",
      "Moment of Inertia and Radius of Gyration",
      "Theorems of Parallel and Perpendicular Axes",
      "Angular Momentum and Torque",
      "Conservation of Angular Momentum",
      "Rolling Motion",
    ],
  },

  // ── Ch.02 Mechanical Properties of Fluids (12th PHYSICS). 30pp; Exercises open at p-28.
  //    13 solved examples (13 `Solution :` markers): 2.1->p02, 2.2->p02, 2.3->p06, 2.4->p09, 2.5->p10, 2.6->p15, 2.7->p17, 2.8->p21, 2.9->p22, 2.10->p23, 2.11->p25, 2.12->p26, 2.13->p27
  //    14 exercise questions print an inline [Ans: ...].
  "fluids-12-phy": {
    id: "fluids-12-phy",
    chapterName: "Mechanical Properties of Fluids",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Fluids.pdf",
    pdf: phy12("02. Mechanical Properties of Fluids.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Mechanical Properties of Fluids (Balbharati Physics textbook)",
    subtopics: [
      "Fluid Pressure and Pascal's Law",
      "Surface Tension and Surface Energy",
      "Excess Pressure, Drops and Bubbles",
      "Capillary Action",
      "Viscosity, Critical Velocity and Reynolds Number",
      "Stokes' Law and Terminal Velocity",
      "Equation of Continuity and Bernoulli's Equation",
    ],
  },

  // ── Ch.03 Kinetic Theory of Gases and Radiation (12th PHYSICS). 19pp; Exercises open at p-17.
  //    8 solved examples (9 `Solution :` markers): 3.2->p05, 3.3->p07, 3.4->p07, 3.5->p14, 3.6->p15, 3.7->p15, 3.8->p16, 3.9->p16
  //    14 exercise questions print an inline [Ans: ...].
  "kinetic-theory-12-phy": {
    id: "kinetic-theory-12-phy",
    chapterName: "Kinetic Theory of Gases and Radiation",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Kinetic_Theory.pdf",
    pdf: phy12("03. Kinetic Theory of Gases and Radiation.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Kinetic Theory of Gases and Radiation (Balbharati Physics textbook)",
    subtopics: [
      "Behaviour of Gases, Ideal and Real Gas",
      "Mean Free Path and Pressure of an Ideal Gas",
      "RMS Speed and Interpretation of Temperature",
      "Law of Equipartition of Energy and Degrees of Freedom",
      "Specific Heat Capacity and Mayer's Relation",
      "Absorption, Reflection and Transmission of Heat Radiation",
      "Perfect Blackbody and Emissivity",
      "Kirchhoff's Law of Heat Radiation",
      "Spectral Distribution and Wien's Displacement Law",
    ],
  },

  // ── Ch.04 Thermodynamics (12th PHYSICS). 34pp; Exercises open at p-32.
  //    10 solved examples (10 `Solution :` markers): 4.1->p02, 4.2->p06, 4.3->p06, 4.4->p08, 4.5->p16, 4.6->p17, 4.7->p19, 4.8->p20, 4.9->p21, 4.10->p30
  //    10 exercise questions print an inline [Ans: ...].
  "thermodynamics-12-phy": {
    id: "thermodynamics-12-phy",
    chapterName: "Thermodynamics",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Thermodynamics.pdf",
    pdf: phy12("04. Thermodynamics.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Thermodynamics (Balbharati Physics textbook)",
    subtopics: [
      "Thermal Equilibrium and the Zeroth Law",
      "Heat, Internal Energy and Work",
      "First Law of Thermodynamics",
      "Thermodynamic State Variables and the p-V Diagram",
      "Thermodynamic Processes",
      "Heat Engines",
      "Refrigerators and Heat Pumps",
      "Second Law of Thermodynamics",
      "Carnot Cycle and Carnot Engine",
      "Stirling Cycle",
    ],
  },

  // ── Ch.06 Superposition of Waves (12th PHYSICS). 27pp; Exercises open at p-25.
  //    13 solved examples (13 `Solution :` markers): 6.1->p05, 6.2->p06, 6.3->p09, 6.4->p14, 6.5->p14, 6.6->p16, 6.7->p16, 6.8->p17, 6.9->p18, 6.10->p19, 6.11->p19, 6.12->p22, 6.13->p22
  //    15 exercise questions print an inline [Ans: ...].
  "superposition-waves-12-phy": {
    id: "superposition-waves-12-phy",
    chapterName: "Superposition of Waves",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Superposition_Waves.pdf",
    pdf: phy12("06. Superposition of Waves.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Superposition of Waves (Balbharati Physics textbook)",
    subtopics: [
      "Progressive Waves",
      "Reflection of Waves",
      "Superposition of Waves",
      "Stationary Waves",
      "Free and Forced Vibrations",
      "Harmonics, Overtones and End Correction",
      "Vibrations of Air Columns",
      "Vibrations of a Stretched String and Sonometer",
      "Beats",
      "Characteristics of Sound and Musical Instruments",
    ],
  },

  // ── Ch.07 Wave Optics (12th PHYSICS). 28pp; Exercises open at p-26.
  //    8 solved examples (8 `Solution :` markers): 7.1->p08, 7.2->p10, 7.3->p14, 7.4->p14, 7.5->p16, 7.6->p17, 7.7->p25, 7.8->p25
  //    13 exercise questions print an inline [Ans: ...].
  "wave-optics-12-phy": {
    id: "wave-optics-12-phy",
    chapterName: "Wave Optics",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Wave_Optics.pdf",
    pdf: phy12("07. Wave Optics.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Wave Optics (Balbharati Physics textbook)",
    subtopics: [
      "Nature of Light and Huygens' Principle",
      "Reflection and Refraction on Huygens' Theory",
      "Polarization and Brewster's Law",
      "Interference and Young's Double Slit Experiment",
      "Diffraction at a Single Slit",
      "Resolving Power",
    ],
  },

  // ── Ch.08 Electrostatics (12th PHYSICS). 28pp; Exercises open at p-26.
  //    NINETEEN solved examples, refs Solved Ex.8.1-8.19 (transcribed 2026-09-03).
  //    The page map above previously listed only 17, omitting 8.1 and 8.3 while its own
  //    text said 19 `Solution :` markers — the marker count was right and the map short.
  //    Exercise shape: Q.1 five MCQs, Q.2 five short-answer, then flat Q.3-Q.13.
  //    NINE exercise questions print an inline answer, not the 6 recorded before: six carry
  //    the literal `[Ans:` label (Q.8-Q.13) — which is what the old count scanned for — and
  //    three more print a bare bracket with no label (Q.3, Q.4, Q.6).
  "electrostatics-12-phy": {
    id: "electrostatics-12-phy",
    chapterName: "Electrostatics",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Electrostatics.pdf",
    pdf: phy12("08. Electrostatics.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Electrostatics (Balbharati Physics textbook)",
    subtopics: [
      "Applications of Gauss' Law",
      "Electric Potential and Potential Energy",
      "Equipotential Surfaces",
      "Potential Energy of Charges and Dipoles",
      "Conductors, Insulators and Dielectrics",
      "Capacitors and Combination of Capacitors",
      "Parallel Plate Capacitor with a Dielectric",
      "Energy Stored in a Capacitor",
      "Van de Graaff Generator",
    ],
  },

  // ── Ch.09 Current Electricity (12th PHYSICS). 16pp; Exercises open at p-14.
  //    10 solved examples (7 `Solution :` markers): 9.1->p01, 9.2->p02, 9.3->p02, 9.4->p03, 9.5->p04, 9.6->p10, 9.7->p11, 9.8->p11, 9.9->p12, 9.10->p12
  //    11 exercise questions print an inline [Ans: ...].
  "current-electricity-12-phy": {
    id: "current-electricity-12-phy",
    chapterName: "Current Electricity",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Current_Electricity.pdf",
    pdf: phy12("09. Current Electricity.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Current Electricity (Balbharati Physics textbook)",
    subtopics: [
      "Kirchhoff's Laws of Electrical Networks",
      "Wheatstone Bridge and Metre Bridge",
      "Potentiometer",
      "Galvanometer, Ammeter and Voltmeter",
    ],
  },

  // ── Ch.10 Magnetic Fields due to Electric Current (12th PHYSICS). 21pp; Exercises open at p-18.
  //    8 solved examples (8 `Solution :` markers): 10.1->p02, 10.2->p05, 10.3->p06, 10.4->p09, 10.5->p12, 10.6->p15, 10.7->p16, 10.8->p18
  //    19 exercise questions print an inline [Ans: ...].
  "magnetic-fields-current-12-phy": {
    id: "magnetic-fields-current-12-phy",
    chapterName: "Magnetic Fields due to Electric Current",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Magnetic_Fields_Current.pdf",
    pdf: phy12("10. Magnetic Fields due to Electric Current.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Magnetic Fields due to Electric Current (Balbharati Physics textbook)",
    subtopics: [
      "Magnetic Force on a Moving Charge",
      "Cyclotron and Helical Motion",
      "Force on a Current-Carrying Wire",
      "Torque on a Current Loop and the Moving Coil Galvanometer",
      "Magnetic Dipole Moment and Potential Energy",
      "Magnetic Field due to a Current",
      "Force Between Two Parallel Currents",
      "Ampere's Law, Solenoid and Toroid",
    ],
  },

  // ── Ch.11 Magnetic Materials (12th PHYSICS). 14pp; Exercises open at p-12.
  //    ⚠ p-13 of THIS chapter's PDF also carries an `Exercise : Chapter 10` box holding five
  //    theory questions that belong to Ch.10 (Magnetic Fields due to Electric Current) —
  //    Ch.10's own PDF has no `Answer in brief` block at all. They are NOT part of Ch.11 and
  //    are correctly excluded here; they are also MISSING from the shipped Ch.10 (backfill
  //    ledger, 2026-09-03). Do not ingest them into this chapter.
  //    2 solved examples (4 `Solution :` markers): 11.2->p03, 11.3->p09
  //    9 exercise questions print an inline [Ans: ...].
  "magnetic-materials-12-phy": {
    id: "magnetic-materials-12-phy",
    chapterName: "Magnetic Materials",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Magnetic_Materials.pdf",
    pdf: phy12("11. Magnetic Materials.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Magnetic Materials (Balbharati Physics textbook)",
    subtopics: [
      "Torque on a Magnetic Dipole",
      "Origin of Magnetism in Materials",
      "Magnetization and Magnetic Intensity",
      "Diamagnetism, Paramagnetism and Ferromagnetism",
      "Hysteresis",
      "Permanent Magnets, Electromagnets and Magnetic Shielding",
    ],
  },

  // ── Ch.12 Electromagnetic Induction (12th PHYSICS). 23pp; Exercises open at p-21.
  //    11 solved examples (10 `Solution :` markers): 12.1->p07, 12.2->p07, 12.3->p10, 12.4->p10, 12.5->p14, 12.6->p14, 12.7->p15, 12.8->p16, 12.9->p18, 12.10->p19, 12.11->p19
  //    15 exercise questions print an inline [Ans: ...].
  "em-induction-12-phy": {
    id: "em-induction-12-phy",
    chapterName: "Electromagnetic Induction",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Em_Induction.pdf",
    pdf: phy12("12. Electromagnetic Induction.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Electromagnetic Induction (Balbharati Physics textbook)",
    subtopics: [
      "Faraday's Laws and Magnetic Flux",
      "Lenz's Law",
      "Motional Electromotive Force",
      "Induced emf in a Stationary Coil",
      "Generators, Back emf and Energy Transfer",
      "Eddy Currents",
      "Self-Inductance and Energy in a Magnetic Field",
      "Mutual Inductance",
      "Transformer",
    ],
  },

  // ── Ch.13 AC Circuits (12th PHYSICS). 19pp; Exercises open at p-16.
  //    8 solved examples (9 `Solution :` markers): 13.1->p01, 13.2->p03, 13.3->p05, 13.4->p06, 13.5->p08, 13.6->p08, 13.7->p09, 13.8->p11
  //    12 exercise questions print an inline [Ans: ...].
  "ac-circuits-12-phy": {
    id: "ac-circuits-12-phy",
    chapterName: "AC Circuits",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Ac_Circuits.pdf",
    pdf: phy12("13. AC Circuits.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — AC Circuits (Balbharati Physics textbook)",
    subtopics: [
      "AC Generator",
      "Average and RMS Values",
      "Phasors and Types of AC Circuits",
      "Power in an AC Circuit",
      "LC Oscillations",
      "Electrical Resonance and Q Factor",
      "Choke Coil",
    ],
  },

  // ── Ch.14 Dual Nature of Radiation and Matter (12th PHYSICS). 18pp; Exercises open at p-16.
  //    6 solved examples (6 `Solution :` markers): 14.1->p03, 14.2->p05, 14.3->p07, 14.4->p11, 14.5->p13, 14.6->p14
  //    13 exercise questions print an inline [Ans: ...].
  "dual-nature-12-phy": {
    id: "dual-nature-12-phy",
    chapterName: "Dual Nature of Radiation and Matter",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Dual_Nature.pdf",
    pdf: phy12("14. Dual Nature of Radiation and Matter.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Dual Nature of Radiation and Matter (Balbharati Physics textbook)",
    subtopics: [
      "Photoelectric Effect",
      "Einstein's Photoelectric Equation",
      "Wave-Particle Duality of Radiation",
      "Photo Cell",
      "De Broglie Hypothesis",
      "Davisson-Germer Experiment and Duality of Matter",
    ],
  },

  // ── Ch.15 Structure of Atoms and Nuclei (12th PHYSICS). 20pp; Exercises open at p-18.
  //    13 solved examples (13 `Solution :` markers): 15.1->p03, 15.2->p04, 15.3->p05, 15.4->p05, 15.5->p08, 15.6->p09, 15.7->p11, 15.8->p11, 15.9->p13, 15.10->p13, 15.11->p13, 15.12->p15, 15.13->p17
  //    15 exercise questions print an inline [Ans: ...].
  "atoms-nuclei-12-phy": {
    id: "atoms-nuclei-12-phy",
    chapterName: "Structure of Atoms and Nuclei",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Atoms_Nuclei.pdf",
    pdf: phy12("15. Structure of Atoms and Nuclei.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Structure of Atoms and Nuclei (Balbharati Physics textbook)",
    subtopics: [
      "Thomson's and Rutherford's Atomic Models",
      "Atomic Spectra",
      "Bohr's Atomic Model",
      "Atomic Nucleus: Constituents, Size and Forces",
      "Nuclear Binding Energy",
      "Radioactive Decays",
      "Law of Radioactive Decay, Half-Life and Average Life",
      "Nuclear Fission and Fusion",
    ],
  },

  // ── Ch.16 Semiconductor Devices (12th PHYSICS). 21pp; Exercises open at p-19.
  //    1 solved examples (2 `Solution :` markers): 16.1->p02
  //    3 exercise questions print an inline [Ans: ...].
  "semiconductor-devices-12-phy": {
    id: "semiconductor-devices-12-phy",
    chapterName: "Semiconductor Devices",
    subjectName: "Physics",
    sourceFile: "StateBoard_12_Physics__Semiconductor_Devices.pdf",
    pdf: phy12("16. Semiconductor Devices.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Semiconductor Devices (Balbharati Physics textbook)",
    subtopics: [
      "p-n Junction Diode as a Rectifier",
      "Ripple Factor and Filter Circuits",
      "Zener Diode",
      "Photodiode, Solar Cell and LED",
      "Bipolar Junction Transistor",
      "Transistor as an Amplifier",
      "Logic Gates",
    ],
  },

  // ══ CHEMISTRY ═══════════════════════════════════════════════════════════
  // ── Ch.13 Amines. 16pp. PILOT CHAPTER, and chosen precisely because it is the
  //    HARD half of this lane rather than the easy one: scheme-heavy organic, and
  //    ZERO printed answers anywhere in its exercise (measured, not assumed — the
  //    two `answer` hits on p07/p13 are prose, "Are the pKb values…" and
  //    "answer. Solution :"). So the step-6 gate CANNOT run on this chapter at
  //    all and `dump-book-answers.ts` will correctly dump 0 keyed rows. Its point
  //    is to measure what the no-gate, structure-heavy case actually costs before
  //    ~14 more organic chapters are committed to.
  //
  //    MEASURED STRUCTURAL MAP (0-based page indices) — CORRECTED 2026-09-03
  //    against the ingesting agent's page reading; two claims below were wrong:
  //      Exercise opens p14 and runs to p15 (the last two pages).
  //      Blocks: `1. Choose the most correct option` (i–x, 40 options = 10×4),
  //              `2. Answer in one sentence` (i–x), `3. Answer the following`
  //              (i–xi), `4. Answer the following.` — which prints i, ii, iii,
  //              iv, v, **vii**, viii and so holds SEVEN items, not eight. The
  //              book skips the label `vi` entirely (confirmed at 400 dpi, no
  //              text missing between v and vii). Numbering is kept as printed.
  //      Items are ROMAN here, not the uppercase letters Std XI uses.
  //    ⚠ TWO worked examples, and the book genuinely MISNUMBERS the second:
  //      `Problem 13.1` is printed on BOTH p03 (methyl bromide → ethylamine) and
  //      p13 (p-bromoaniline from aniline), each with its own `Solution :` label.
  //      They ship as `Solved Ex.13.1` and `Solved Ex.13.1b` with an erratum.
  //      An earlier draft of this comment claimed a THIRD worked item on p04
  //      carrying a `Solution :` label — THAT WAS WRONG. The p04 hit is the
  //      lowercase word "solution" in prose ("…aqueous KOH solution"); a
  //      case-SENSITIVE `Solution\s*:` scan over all 16 pages returns exactly
  //      two hits. This is the same semantic trap flagged for Ch.2/Ch.3/Ch.5.
  //
  //    Subtopics are the book's own §13.x headings, with the thin 13.8
  //    (arenesulfonyl chloride / Hinsberg) folded into Chemical Properties since
  //    it is a reaction OF amines. Diff the committed `by subtopic` tally against
  //    this list BEFORE --apply and report any that came out empty.
  // ══ CHEMISTRY — the descriptive/organic remainder ═══════════════════════
  // Registered 2026-09-03. As in Std XI, EVERY chapter below measures
  // keyed(est) ~= 0: the step-6 gate CANNOT run on any of them. Expected, not a
  // defect. The compensating regime is the brief's — answers grounded strictly
  // in the chapter's own text, MCQ keys re-derived, derived-provenance stamped,
  // and an explicit statement in the report that the gate could not run.
  //
  // ⚠ THREE OF THESE BREAK THE Std XII ROMAN-LABEL RULE. Measured over the
  //   exercise region: Ch.11 is UPPERCASE (37 vs 24), Ch.7 and Ch.15 read MIXED
  //   (54/54 and 37/48). Confirm the label style from YOUR page before writing
  //   refs; the volume-level rule in the header comment is a default, not a law.

  // ── Ch.9 Coordination Compounds. 18pp. **332 PYQ — the highest-demand
  //    Chemistry chapter in the entire bank.** Exercise opens p15.
  //    ⚠ ONE worked example only (`Problem 9.1`, 1 Solution label). Confirm.
  //    Blocks print OUT OF ORDER: `1. Choose the most correct option.` ·
  //    `4. Answer the following questions.` · `2. Answer the following in one or
  //    two…` · `3. Answer in brief.` — follow the PRINTED order for section_seq.
  //    IUPAC nomenclature and isomerism answers are TEXT; write them linearly.
  "coordination-compounds-12-chem": {
    id: "coordination-compounds-12-chem",
    chapterName: "Coordination Compounds",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Coordination_Compounds.pdf",
    pdf: chem12("09. Coordination Compounds.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Coordination Compounds (Balbharati Chemistry textbook)",
    subtopics: [
      "Types of Ligands",
      "Terms Used in Coordination Chemistry",
      "Classification of Complexes",
      "IUPAC Nomenclature of Coordination Compounds",
      "Effective Atomic Number Rule",
      "Isomerism in Coordination Compounds",
      "Stability of Coordination Compounds",
      "Theories of Bonding in Complexes",
      "Applications of Coordination Compounds",
    ],
  },

  // ── Ch.12 Aldehydes, Ketones and Carboxylic Acids. 28pp. 300 PYQ.
  //    Exercise opens p26. ⚠ ONE worked example (`Problem 12.1`) against 3 loose
  //    Solution hits — confirm from the page.
  //    Blocks: `1. Choose the most correct option.` · `2. Answer the following in
  //    one sentence` · `3. Answer in brief.` · `4. Answer the following`
  //    Scheme-heavy, but per the Amines pilot `\xrightarrow[below]{above}` carries
  //    a reaction step losslessly — do not default to figures.
  "aldehydes-ketones-12-chem": {
    id: "aldehydes-ketones-12-chem",
    chapterName: "Aldehydes, Ketones and Carboxylic Acids",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Aldehydes_Ketones_and_Carboxylic_Acids.pdf",
    pdf: chem12("12. Aldehydes, Ketones and Carboxylic acids.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Aldehydes, Ketones and Carboxylic Acids (Balbharati Chemistry textbook)",
    subtopics: [
      "Classification of Aldehydes, Ketones and Carboxylic Acids",
      "Nomenclature",
      "Preparation of Aldehydes and Ketones",
      "Preparation of Carboxylic Acids",
      "Physical Properties",
      "Polarity of the Carbonyl Group",
      "Chemical Properties of Aldehydes and Ketones",
      "Chemical Properties of Carboxylic Acids",
    ],
  },

  // ── Ch.11 Alcohols, Phenols and Ethers. 20pp. 246 PYQ. Exercise opens p18.
  //    ⚠ CORRECTED 2026-09-03 — THIS CHAPTER IS ROMAN LIKE EVERY OTHER Std XII
  //      CHAPTER, and my "37 UPPER vs 24 roman, uses UPPERCASE items" claim was a
  //      PROBE ERROR read backwards. The measurement was real; the reading was
  //      not. In Std XII the MCQ OPTION labels are also `A. B. C. D.` at line
  //      start, so a line-start-capital scan counts options as items: the ~37 are
  //      10 MCQs x 4 options, and the 24 roman are the actual exercise items
  //      (Q1 10 + Q2 4 + Q3 6 + Q6 4 = 24 exactly).
  //      The same error very likely explains the "MIXED" readings recorded for
  //      Ch.7 and Ch.15 — treat those as roman-with-uppercase-options until an
  //      agent says otherwise from the page.
  //      A THIRD style exists here that no probe caught: block 5 uses lowercase
  //      `a. b. c. d. e.`, and Q3(iv) has inline `a./b.` sub-parts.
  //    Worked examples 11.1–11.9 contiguous (9 labels / 8 Solution labels).
  //    Blocks include two prose items numbered 1 and 2 mid-exercise ("Earlier
  //    diethyl ether was used as…", "Diethyl ether is used as a solvent for…") —
  //    establish from the page whether those are questions or an activity box.
  "alcohols-phenols-ethers-12-chem": {
    id: "alcohols-phenols-ethers-12-chem",
    chapterName: "Alcohols, Phenols and Ethers",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Alcohols_Phenols_and_Ethers.pdf",
    pdf: chem12("11. Alcohols, Phenols and Ethers.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Alcohols, Phenols and Ethers (Balbharati Chemistry textbook)",
    subtopics: [
      "Classification of Alcohols, Phenols and Ethers",
      "Nomenclature",
      "Alcohols and Phenols",
      "Ethers",
      "Uses of Alcohols, Phenols and Ethers",
    ],
  },

  // ── Ch.8 Transition and Inner Transition Elements. 27pp. 235 PYQ.
  //    ⚠⚠ **ZERO `Problem N.M` LABELS** across all 27 pages, against 2 line-start
  //      / 6 loose `Solution` hits. The anchor the rest of this lane uses does
  //      not exist here — establish the worked-example labelling FROM THE PAGE
  //      before planning bands, and report what the book actually prints.
  //    Exercise opens p25. Blocks: `1. Choose the most correct option.` ·
  //    `2. Answer the following` · `3. Answer the following`. A `90. Is this
  //    element diamagnetic or…` hit is a stray line, not a block opener.
  "transition-elements-12-chem": {
    id: "transition-elements-12-chem",
    chapterName: "Transition and Inner Transition Elements",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Transition_and_Inner_Transition_Elements.pdf",
    pdf: chem12("08. Transition and Inner transition Elements.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Transition and Inner Transition Elements (Balbharati Chemistry textbook)",
    subtopics: [
      "Position in the Periodic Table and Electronic Configuration",
      "Oxidation States of the First Transition Series",
      "Physical Properties of the First Transition Series",
      "Trends in Atomic Properties",
      "Compounds of Mn and Cr",
      "Common Properties of d-Block Elements",
      "Extraction of Metals",
      "Lanthanoids",
      "Actinoids",
    ],
  },

  // ── Ch.10 Halogen Derivatives. 24pp. 106 PYQ. Exercise opens p21.
  //    ⚠ Worked examples are 10.1, 10.2, 10.4, 10.5 — **10.3 IS MISSING** from
  //      the text layer (4 labels, 5 Solution labels). Establish from the page
  //      whether the book skips it or the extractor drops the label.
  //    Blocks: `1. Choose the most correct option.` · `2. Do as directed.` ·
  //    `3. Give reasons` · `4. Distinguish between - SN1 and SN2` · `5. Explain` ·
  //    `6. Convert the following.` · `7. Answer the following`. Two trailing
  //    `Collect…` activity blocks are open-ended and NOT ingested.
  //    3,732 raster images — optical-isomerism and mechanism art.
  "halogen-derivatives-12-chem": {
    id: "halogen-derivatives-12-chem",
    chapterName: "Halogen Derivatives",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Halogen_Derivatives.pdf",
    pdf: chem12("10. Halogen Derivatives.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Halogen Derivatives (Balbharati Chemistry textbook)",
    // RESOLVED 2026-09-03. The list originally had NO home for §10.3 "Methods of
    // preparation of alkyl halides", so the ingest agent correctly filed every
    // preparation question under Nucleophilic Substitution rather than invent a
    // subtopic — leaving one bucket holding 35 of the chapter's 56 rows.
    // "Methods of Preparation of Alkyl Halides" was added AND 10 rows moved in
    // the same pass, in that order for a reason: adding the name without moving
    // rows ships an EMPTY subtopic, i.e. a live /browse filter returning nothing
    // (the Class-12 Linear Programming precedent). `subtopic_id` is not part of
    // content_hash, so the move is a plain UPDATE and needs no re-commit.
    //
    // The 10 moved are the ones whose SUBJECT is how to make a halide: Solved
    // Ex.10.1, Ex Q.1 (ii)/(iv), Ex Q.2 (ii-a..ii-e), Ex Q.3 (iv), Ex Q.6 (iv).
    // Deliberately NOT moved: the Q.6/Q.7 multi-step conversions, which pass
    // THROUGH a halide but ask for a different product, and Ex Q.6 (vi)
    // (halide→halide, a substitution exercise). Those readings are arguable —
    // the boundary is "is the product the halide?", not "does a halide appear".
    // ⚠ STILL UNHOMED: §10.6.5 Elimination and Reactions of haloarenes. Same
    // two-step rule applies if either is ever given its own subtopic.
    subtopics: [
      "Classification of Halogen Derivatives",
      "Nomenclature of Halogen Derivatives",
      "Methods of Preparation of Alkyl Halides",
      "Nucleophilic Substitution Reactions of Alkyl Halides",
      "Physical Properties",
      "Optical Isomerism in Halogen Derivatives",
      "Reaction with Active Metals",
      "Uses and Environmental Effects of Polyhalogen Compounds",
    ],
  },

  // ── Ch.7 Elements of Groups 16, 17 and 18. 27pp. Exercise opens p25.
  //    ⚠ **LABEL STYLE READS MIXED (54 UPPER / 54 roman)** — confirm from the
  //      page which the exercise actually uses before writing refs.
  //    ⚠ Worked examples 7.1–7.10, TEN of them. An earlier draft of this comment
  //      said "7.8 IS MISSING from the text layer" — WRONG, and the cause is a
  //      COLON: the book prints `Problem: 7.8` (or `Problem : 7.8`), which a
  //      `Problem\s+\d` scan cannot match. Swept across all 32 chapters, exactly
  //      three are affected — this one (hides 7.8), XI Ch.10 States of Matter
  //      (hides 10.1) and XI Ch.13 Nuclear (hides all eight). The 10 Solution
  //      labels were the tell all along. Do not go looking for a missing 7.8.
  //    Several apparent "blocks" detected here are REACTION EQUATIONS numbered
  //    inside a complete-the-reaction question (`3. BrCl + H2O`, `6. XeF4 + SiO2`)
  //    — they are sub-items, not block openers. 9,027 vector drawings.
  "p-block-16-17-18-12-chem": {
    id: "p-block-16-17-18-12-chem",
    chapterName: "Elements of Groups 16, 17 and 18",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Elements_of_Groups_16_17_and_18.pdf",
    pdf: chem12("07. Elements of Groups 16, 17 and 18.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Elements of Groups 16, 17 and 18 (Balbharati Chemistry textbook)",
    subtopics: [
      "Occurrence and Electronic Configuration",
      "Atomic and Physical Properties",
      "Anomalous Behaviour",
      "Chemical Properties of the Elements",
      "Allotropy",
      "Oxoacids",
      "Oxygen and Compounds of Oxygen",
      "Compounds of Sulfur",
      "Chlorine and Compounds of Chlorine",
      "Interhalogen Compounds",
      "Compounds of Xenon",
    ],
  },

  // ── Ch.14 Biomolecules. 24pp. Worked examples 14.1–14.6 contiguous, 6 labels
  //    against 6 Solution labels — they agree. Exercise opens p22.
  //    Blocks: `1. Select the most correct choice.` · `2. Give scientific
  //    reasons :` · `3. Answer the following` · **`4. Draw a neat diagram for the
  //    following`** — that last is an answer-is-a-drawing block; judge per
  //    question whether the structure writes linearly (many sugars do not).
  "biomolecules-12-chem": {
    id: "biomolecules-12-chem",
    chapterName: "Biomolecules",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Biomolecules.pdf",
    pdf: chem12("14. Biomolecules.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Biomolecules (Balbharati Chemistry textbook)",
    subtopics: ["Carbohydrates", "Proteins", "Nucleic Acids"],
  },

  // ── Ch.15 Introduction to Polymer Chemistry. 18pp. Exercise opens p15.
  //    ⚠ **LABEL STYLE READS MIXED (37 UPPER / 48 roman)** — confirm from the page.
  //    Worked examples 15.1, 15.2. Several detected "blocks" are polymer NAMES
  //    numbered inside a match/identify question (`1. Teflon`, `3. Polyester`,
  //    `5. Bakelite`) — sub-items, not block openers. Read the page.
  "polymers-12-chem": {
    id: "polymers-12-chem",
    chapterName: "Introduction to Polymer Chemistry",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Introduction_to_Polymer_Chemistry.pdf",
    pdf: chem12("15. Introduction to Polymer Chemistry.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Introduction to Polymer Chemistry (Balbharati Chemistry textbook)",
    subtopics: [
      "Classification of Polymers",
      "Some Important Polymers",
      "Molecular Mass and Degree of Polymerization",
      "Biodegradable Polymers",
      "Commercially Important Polymers",
    ],
  },

  // ── Ch.16 Green Chemistry and Nanochemistry. 13pp — the last chapter of the
  //    book. Exercise opens p11.
  //    ⚠ **ZERO `Problem` labels AND ZERO `Solution` labels** across all 13 pages
  //      — like Std XI Hydrocarbons, this chapter appears to have NO worked
  //      examples at all. Confirm from the page, then commit with no `solved`
  //      bucket and no solved block in the outline. That is correct, not an
  //      omission.
  //    Three detected "blocks" on p11 (`1. Revolution in electronics…`,
  //    `2. Energy sector…`, `3. Medical field :`) are APPLICATION BULLETS in the
  //    §16.10 prose, not exercise blocks. The real exercise is
  //    `1. Choose the most correct option.` + three `Answer the following` blocks.
  //    Pure recall/explain chapter; 1,577 images are teaching illustrations.
  "green-chemistry-12-chem": {
    id: "green-chemistry-12-chem",
    chapterName: "Green Chemistry and Nanochemistry",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Green_Chemistry_and_Nanochemistry.pdf",
    pdf: chem12("16. Green Chemistry and Nanochemistry.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Green Chemistry and Nanochemistry (Balbharati Chemistry textbook)",
    subtopics: [
      "Sustainable Development",
      "Principles of Green Chemistry",
      "The Role of Green Chemistry",
      "Introduction to Nanochemistry",
      "Characteristic Features of Nanoparticles",
      "Synthesis of Nanomaterials",
      "Applications of Nanomaterials",
    ],
  },

  // ── Ch.1 Solid State. 27pp. 172 PYQ (MHT-CET 133 — one of its densest).
  //    Worked examples 1.1-1.6, contiguous. Exercise opens p24, runs to p26.
  //    ⚠ THE HEAVIEST FIGURE LOAD IN THE BOOK BY FAR — 101,156 vector drawings
  //      and 5,126 raster images, an order of magnitude above any other chapter
  //      (Amines has 2,124). Unit cells and packing diagrams are the chapter's
  //      subject matter, so budget figure work accordingly and read the Amines
  //      pilot's figure-cost report before starting.
  //    Its MCQ block prints `1. Choose the most correct answer` (ANSWER, not
  //    OPTION — the wording varies chapter to chapter; key on block SHAPE).
  "solid-state-12-chem": {
    id: "solid-state-12-chem",
    chapterName: "Solid State",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Solid_State.pdf",
    pdf: chem12("01. Solid State.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Solid State (Balbharati Chemistry textbook)",
    subtopics: [
      "Types of Solids",
      "Classification of Crystalline Solids",
      "Crystal Structure and Unit Cells",
      "Cubic System",
      "Packing of Particles in Crystal Lattice",
      "Packing Efficiency",
      "Crystal Defects and Imperfections",
      "Electrical Properties of Solids",
      "Magnetic Properties of Solids",
    ],
  },

  // ── Ch.2 Solutions. 19pp. 265 PYQ across CET+NEET+JEE.
  //    Worked examples 2.1-2.14, contiguous, ending p16 where the Exercise also
  //    opens; runs to p18.
  //    ⚠ `Solution` IS THIS CHAPTER'S SUBJECT MATTER, so a `Solution :` scan is
  //      structurally unreliable here — anchor on `Problem N.M` only. Same
  //      semantic trap as Ch.5 Electrochemistry and Ch.3 Ionic Equilibria.
  "solutions-12-chem": {
    id: "solutions-12-chem",
    chapterName: "Solutions",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Solutions.pdf",
    pdf: chem12("02. Solutions.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Solutions (Balbharati Chemistry textbook)",
    subtopics: [
      "Types of Solutions",
      "Solubility and Capacity to Dissolve Solute",
      "Vapour Pressure of Solutions of Liquids in Liquids",
      "Colligative Properties of Nonelectrolyte Solutions",
      "Vapour Pressure Lowering",
      "Boiling Point Elevation",
      "Depression in Freezing Point",
      "Osmotic Pressure",
      "Colligative Properties of Electrolytes",
    ],
  },

  // ── Ch.3 Ionic Equilibria. 16pp. 127 PYQ (MHT-CET).
  //    Worked examples 3.1-3.13, contiguous. Exercise opens p14, runs to p15.
  //    ⚠ Same `Solution`-is-a-chemical-term trap as Ch.2 and Ch.5 (p14 shows 3
  //      line-start labels against 4 loose hits). Anchor on `Problem N.M`.
  //    Thin gate — only ~1-2 exercise rows print an answer. Say so rather than
  //    implying the gate ran across the chapter.
  "ionic-equilibria-12-chem": {
    id: "ionic-equilibria-12-chem",
    chapterName: "Ionic Equilibria",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Ionic_Equilibria.pdf",
    pdf: chem12("03. Ionic Equilibria.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Ionic Equilibria (Balbharati Chemistry textbook)",
    subtopics: [
      "Types of Electrolyte",
      "Acids and Bases",
      "Ionisation of Acids and Bases",
      "Autoionization of Water",
      "pH Scale",
      "Hydrolysis of Salts",
      "Buffer Solutions",
      "Solubility Product",
      "Common Ion Effect",
    ],
  },

  // ── Ch.4 Chemical Thermodynamics. 27pp. The strongest gate in Std XII: ~7
  //    exercise rows print an answer, and this chapter introduces a SIXTH printed
  //    form — `Ans. : (-873.4 J)`, with the token OUTSIDE the parentheses and the
  //    value inside. Do not assume the five forms in the brief are exhaustive.
  //
  //    MEASURED (0-based): worked examples on p05 (4.1-4.3), p07 (4.4-4.6),
  //    p10 (4.7-4.9), p14 (4.10), p15 (4.11), p22 (4.16-4.18), p23 (4.19-4.20).
  //    ⚠ 4.12-4.15 ARE MISSING FROM THE TEXT LAYER, and p16/p17 carry THREE
  //      `Solution :` labels with NO `Problem` label at all. Those are almost
  //      certainly the missing four, whose labels the extractor drops. Establish
  //      the true count from the PAGE — the honest expectation is 20, not 16.
  //    Exercise opens p23 and runs to p25. Blocks: `1. Select the most apropriate
  //    option` (i-x) — the book's own typo, transcribe the instruction as printed
  //    — then `2. Answer the following in one or two sentences` (i-viii),
  //    `3. Answer in brief.` (i-ix), `4. Answer the following questions` (i-xiv).
  "thermodynamics-12-chem": {
    id: "thermodynamics-12-chem",
    chapterName: "Chemical Thermodynamics",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Chemical_Thermodynamics.pdf",
    pdf: chem12("04. Chemical Thermodynamics.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Chemical Thermodynamics (Balbharati Chemistry textbook)",
    subtopics: [
      "Terms Used in Thermodynamics",
      "Nature of Heat and Work",
      "Pressure-Volume Work and Maximum Work",
      "Internal Energy",
      "First Law of Thermodynamics",
      "Enthalpy and Enthalpies of Physical Transformations",
      "Thermochemistry",
      "Spontaneity and Entropy",
    ],
  },

  // ── Ch.6 Chemical Kinetics. 18pp. 282 PYQ of downstream demand — the highest
  //    of any Chemistry chapter in the bank.
  //    This chapter is where the BARE-PARENTHESIS answer form was discovered:
  //    its `4. Solve` block prints `(28.7 min)`, `(54.66 kJ/mol)`, `(9.72 × 10^6
  //    M^-1 s^-1)` with no `Ans` token anywhere. NINE such rows — that is the gate.
  //
  //    MEASURED (0-based): worked examples p01-p14, numbered 6.1-6.14.
  //    ⚠ 6.11 IS ABSENT from the text layer (p09 gives 6.8-6.10, p13 resumes at
  //      6.12). Check the page before concluding the book skips it.
  //    Exercise opens p15 and runs to p17. Blocks: `1. Choose the most correct
  //    option` (i-x), `2. Answer the following in one or two sentences` (i-x),
  //    `3. Answer the following in brief.` (i-x), `4. Solve` (i-ix).
  //    p17 also carries two `Activity :` boxes — open-ended, NOT ingested.
  "kinetics-12-chem": {
    id: "kinetics-12-chem",
    chapterName: "Chemical Kinetics",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Chemical_Kinetics.pdf",
    pdf: chem12("06. Chemical Kinetics.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Chemical Kinetics (Balbharati Chemistry textbook)",
    subtopics: [
      "Rate of Reaction",
      "Rate of Reaction and Reactant Concentration",
      "Molecularity of Elementary Reactions",
      "Integrated Rate Law",
      "Collision Theory of Bimolecular Reactions",
      "Temperature Dependence of Reaction Rates",
      "Effect of a Catalyst on the Rate of Reaction",
    ],
  },

  // ── Ch.5 Electrochemistry. 30pp — the largest Std XII Chemistry chapter.
  //    270 PYQ of demand.
  //    ⚠⚠ A `Solution` SCAN IS UNRELIABLE IN THIS CHAPTER, and the reason is
  //      semantic rather than typographic: "solution" is a CHEMICAL term here, so
  //      the word appears constantly in prose ("conductivity of the solution").
  //      Measured: p01 carries FIVE `Solution` hits and ZERO of them is a worked
  //      example's label; p00/p02/p04/p06/p10/p13/p19/p29 are the same story.
  //      Anchor on `Problem N.M` ONLY. Those run 5.1-5.12 and are contiguous:
  //      p03, p05, p07, p11, p12, p16, p18. The same warning applies to Ch.2
  //      Solutions and Ch.3 Ionic Equilibria when they are worked.
  //    Exercise opens p27 and runs to p29. Blocks: `1. Choose the most correct
  //    option` (i-x), `2. Answer the following in one or two sentences` (i-x),
  //    `3. Answer the following in brief` (i-xi), `4. Answer the following :`.
  //    Only ~3 rows print an answer (`2.03 A`, `0.36 V`, `0.0327 V`), so the gate
  //    is thin here — report the KEYED count, not the chapter total.
  //    p29 also carries Activity boxes (prepare a salt bridge, collect
  //    information) — open-ended, NOT ingested.
  "electrochemistry-12-chem": {
    id: "electrochemistry-12-chem",
    chapterName: "Electrochemistry",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Electrochemistry.pdf",
    pdf: chem12("05. Electrochemistry.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Electrochemistry (Balbharati Chemistry textbook)",
    subtopics: [
      "Electric Conduction and Conductance of Solutions",
      "Electrochemical Cells",
      "Electrolytic Cell",
      "Galvanic or Voltaic Cell",
      "Electrode Potential and Cell Potential",
      "Thermodynamics of Galvanic Cells",
      "Reference Electrodes",
      "Galvanic Cells in Day-to-Day Life and Fuel Cells",
      "Electrochemical Series",
    ],
  },

  "amines-12-chem": {
    id: "amines-12-chem",
    chapterName: "Amines",
    subjectName: "Chemistry",
    sourceFile: "StateBoard_12_Chemistry__Amines.pdf",
    pdf: chem12("13. Amines.pdf"),
    derivedAnswers: true, // no ANSWERS section in either Chemistry volume
    note: "Maharashtra State Board (Class 12) — Amines (Balbharati Chemistry textbook)",
    subtopics: [
      "Classification and Nomenclature of Amines",
      "Preparation of Amines",
      "Physical Properties of Amines",
      "Basicity of Amines",
      "Chemical Properties of Amines",
      "Arene Diazonium Salts",
      "Electrophilic Aromatic Substitution in Aromatic Amines",
    ],
  },

  // ── GEOGRAPHY ───────────────────────────────────────────────────────────────
  // PILOT chapter, ingested first so the Geography question shapes could be
  // judged before the other seven. Chosen because it is the SHORTEST (9 pages)
  // and still carries one of every awkward shape in the book: an
  // Assertion-Reasoning-style "identify the correct group" MCQ block, a
  // differentiate set, two data-table activities, and the one question in the
  // book whose data lives on a DIFFERENT PAGE from the question (Q.6 needs
  // Table 7.5 off p.6). It is also the only chapter with no map-work question,
  // which keeps the pilot's figure story simple.
  "region-12-geo": {
    id: "region-12-geo",
    chapterName: "Region and Regional Development",
    subjectName: "Geography",
    sourceFile: "StateBoard_12_Geography__Region_and_Regional_Development.pdf",
    pdf: geo12("7. Region and Regional Development.pdf"),
    derivedAnswers: true, // no answer key ANYWHERE in this book — see the subject comment
    note: "Maharashtra State Board (Class 12) — Region and Regional Development (Balbharati Geography textbook)",
    // The chapter's own teaching arc, in reading order. Deliberately SIX and not
    // more: the book's bold prose headings under-generate (a ':'-terminated scan
    // finds only four), so these were read off the narrative rather than scraped.
    //
    // Every one of the six is reachable from the exercise, which is the test that
    // matters — a subtopic with no questions ships a /browse filter that returns
    // nothing (the Class-12 Linear Programming precedent). Mapping: Q.1 + Q.2 →
    // Types of Regions; Q.3(1) + Q.4(1,2) + Q.6 → Factors; Q.3(2) →
    // Strategies; Q.4(3) → Regional Imbalance; Q.5(1,2) → Concept / Types;
    // Q.5(3) → Indicators. Verify the committed `by subtopic` tally against this
    // list BEFORE --apply and drop anything that got nothing.
    subtopics: [
      "Concept of a Region",
      "Types of Regions",
      "Indicators of Regional Development",
      "Factors Affecting Regional Development",
      "Regional Imbalance and Its Causes",
      "Strategies to Reduce Regional Imbalance",
    ],
  },

  "nature-scope-12-geo": {
    id: "nature-scope-12-geo",
    chapterName: "Geography: Nature and Scope",
    subjectName: "Geography",
    sourceFile: "StateBoard_12_Geography__Nature_and_Scope.pdf",
    pdf: geo12("8. Geography  Nature and Scope.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Geography: Nature and Scope (Balbharati Geography textbook)",
    // This chapter is ABOUT the discipline rather than about a part of the world,
    // so its subtopics follow the four claims the chapter makes in order: what
    // the subject covers, what kind of discipline it is, how far it reaches, and
    // where it is going.
    subtopics: [
      "Branches of Geography",
      "Nature of Geography as a Discipline",
      "Scope of Geography and Its Links with Other Subjects",
      "Latest Trends and Careers in Geography",
    ],
  },

  "secondary-activities-12-geo": {
    id: "secondary-activities-12-geo",
    chapterName: "Secondary Economic Activities",
    subjectName: "Geography",
    sourceFile: "StateBoard_12_Geography__Secondary_Economic_Activities.pdf",
    pdf: geo12("5. Secondary Economic Activities.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Secondary Economic Activities (Balbharati Geography textbook)",
    // The chapter's own order: what a secondary activity is, then the two
    // families of location factors it separates under the headings "Physical
    // Factors" and "Economic Factors" (with political and other factors folded
    // into the latter), then where the industrial regions are, then the several
    // classifications it gives of industry itself.
    subtopics: [
      "Nature of Secondary Economic Activities",
      "Physical Factors Affecting Location of Industries",
      "Economic and Other Factors Affecting Location of Industries",
      "Major Industrial Regions of the World",
      "Classification of Industries",
    ],
  },

  "primary-activities-12-geo": {
    id: "primary-activities-12-geo",
    chapterName: "Primary Economic Activities",
    subjectName: "Geography",
    sourceFile: "StateBoard_12_Geography__Primary_Economic_Activities.pdf",
    pdf: geo12("4. Primary Economic Activities.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Primary Economic Activities (Balbharati Geography textbook)",
    // The book's own numbered occupation list, with agriculture split because it
    // runs to several pages and its own typology, and a leading subtopic for the
    // chapter's framing of what a primary activity is.
    //
    // NOTE this is the chapter whose p.2 carries 2 of the 9 measured +29 cmap
    // occurrences in the book (Table 4.2's bullet text). Read that table off the
    // rendered page.
    subtopics: [
      "Nature of Primary Economic Activities",
      "Hunting and Gathering",
      "Lumbering",
      "Fishing",
      "Mining",
      "Animal Husbandry",
      "Agriculture and Its Types",
    ],
  },

  "settlements-12-geo": {
    id: "settlements-12-geo",
    chapterName: "Human Settlements and Land Use",
    subjectName: "Geography",
    sourceFile: "StateBoard_12_Geography__Human_Settlements_and_Land_Use.pdf",
    pdf: geo12("3. Human Settlements and Land Use.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Human Settlements and Land Use (Balbharati Geography textbook)",
    // The chapter runs settlement -> its types -> its patterns -> urban
    // classification -> land use (rural then urban) -> the fringe between them.
    // Types and patterns are kept APART deliberately: the book prints an
    // "Always remember" box whose whole point is that they are different axes
    // (compact is a TYPE, linear is a PATTERN), and the exercise tests both.
    subtopics: [
      "Factors Affecting Human Settlements",
      "Types of Settlements",
      "Patterns of Settlements",
      "Types of Urban Settlements and Their Functions",
      "Rural Land Use",
      "Urban Land Use",
      "Rural-Urban Fringe and Suburbs",
    ],
  },

  "population-1-12-geo": {
    id: "population-1-12-geo",
    chapterName: "Population: Part 1",
    subjectName: "Geography",
    sourceFile: "StateBoard_12_Geography__Population_Part_1.pdf",
    pdf: geo12("1. Population  Part1.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Population: Part 1 (Balbharati Geography textbook)",
    // Distribution and density first, then the pattern it makes, then the two
    // families of factors the chapter itself separates under the headings
    // "Physical Factors" and "Human Factors", then population change and the
    // rates that measure it, and finally the five-stage transition theory.
    subtopics: [
      "Distribution and Density of Population",
      "Patterns of Population Distribution",
      "Physical Factors Affecting Population Distribution",
      "Human Factors Affecting Population Distribution",
      "Components of Population Change",
      "Birth Rate, Death Rate and Growth Rate",
      "Demographic Transition Theory",
    ],
  },

  "population-2-12-geo": {
    id: "population-2-12-geo",
    chapterName: "Population: Part 2",
    subjectName: "Geography",
    sourceFile: "StateBoard_12_Geography__Population_Part_2.pdf",
    pdf: geo12("2. Population  Part 2.pdf"),
    derivedAnswers: true,
    note: "Maharashtra State Board (Class 12) — Population: Part 2 (Balbharati Geography textbook)",
    // The chapter's own numbered composition heads (age, sex, literacy,
    // occupation, rural-urban), then migration, which it splits into a
    // types/causes half and a donor-versus-recipient impact half. Demographic
    // dividend is pulled out of the age-structure section because it carries its
    // own extended treatment, its own data table and its own exercise question.
    subtopics: [
      "Age Structure and Population Pyramids",
      "Demographic Dividend",
      "Sex Composition",
      "Literacy and Education",
      "Occupational Structure",
      "Rural-Urban Composition",
      "Migration: Types and Causes",
      "Impact of Migration on Population Structure",
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
