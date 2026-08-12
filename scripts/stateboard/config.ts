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
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
