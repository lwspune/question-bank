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
   *   - `stamp-provenance.ts` writes `derived_model`/`derived_at` and appends a
   *     clause to `pyq_note` saying the answer is derived and the book publishes
   *     no key.
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
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
