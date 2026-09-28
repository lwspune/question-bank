/**
 * Static content + numbers for the /guide/mht-cet-maths route.
 *
 * Pulled from the live MHT-CET Maths PUBLIC bank. Editorial numbers snapshot
 * is `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Template C (chapter-playbooks + strand strategy + formula compendium), the
 * same shape as /guide/nda-physics — but with THREE differences that are
 * structural, not cosmetic:
 *
 *   - SIX routes, not seven. There is no NCERT-map equivalent: MHT-CET is set
 *     on the Maharashtra State Board Std XI/XII syllabus, not on NCERT, so a
 *     "which NCERT chapter does this absorb" page would be mapping the wrong
 *     book. Do not add a seventh route.
 *
 *   - THERE IS NO NEGATIVE MARKING. That single fact inverts the usual
 *     strategy axis. There is no attempt-versus-skip decision to make — you
 *     answer all 50 — so the strategy page is about ORDER and TIME instead.
 *     50 questions in 90 minutes is 1.8 minutes per question.
 *
 *   - Weightage is RECENT (2024-2025, 24 shifts), not lifetime. MHT-CET moved
 *     its syllabus for 2025: Measures of Dispersion ran 1.0 q/paper across the
 *     27 shifts of 2023-24 and then scored ZERO across all 13 papers of 2025,
 *     while Conic Sections went 2 questions lifetime-before-2025 to 15 in 2025
 *     alone. A lifetime average hides both, which is why CHAPTER_TABLE carries
 *     `qPerPaper` alongside `qCount` and is sorted on the former.
 *
 * The paper is hard and it is dense: 37.3% of the bank is HARD, against 10.1%
 * EASY. Say so plainly rather than selling the subject.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/mht-cet-maths (or "" for landing)
  label: string;
  blurb: string;
};

/** The 6 main routes under /guide/mht-cet-maths, in reading order.
 *  There is deliberately NO ncert-map route — see the file header. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How MHT-CET Maths actually works — 50 questions, 90 minutes, no negative marking, and what 2,090 past-year questions across 42 shifts reveal.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Cornerstone, Quick-Win, Long Tail — 7 chapters carry 28.8 of the 50 questions. With no negative marking the decision is order and time, never whether to attempt.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "21 playbooks — one per chapter above 0.9 questions per paper. The subtopic split, where the HARD sits, and whether the chapter cherry-picks.",
  },
  {
    slug: "formulas",
    label: "Formulas",
    blurb:
      "Single-page index of the formulas MHT-CET Maths actually tests, with the chapters that touch each. At 1.8 minutes a question, recall has to be instant.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "The 2025 syllabus shift, in numbers — Measures of Dispersion dropped to zero across all 13 papers, Conic Sections went 3 to 15. Prep from 2023-24 alone and you drill a dead chapter.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "The same idea in four chapter dialects — perpendicularity is named in 92 questions across 7 chapters, and 84% of the trigonometry sits in the chapter whose name students do not recognise.",
  },
];

export type Overview = {
  totalQ: number;
  /** Distinct MHT-CET shifts covered: 2021 = 1, 2022 = 1, 2023 = 17,
   *  2024 = 12, 2025 = 13. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count. 21 of the 26 chapters clear the 0.9 q/paper line. */
  playbooks: number;
  /** Paper I is Mathematics ONLY. Physics and Chemistry are Paper II at
   *  1 mark each; these fields describe the Maths paper alone. */
  paper: {
    questions: number;
    marksPerQuestion: number;
    totalMarks: number;
    durationMinutes: number;
    /** MHT-CET has NO negative marking. The whole strategy follows from this. */
    negativeMarking: false;
    /** durationMinutes / questions, to 1 decimal. */
    minutesPerQuestion: number;
  };
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below.
 *
 *  NOTE: there is deliberately no `formulas` field. The /formulas page is
 *  authored separately and its row count is not known here; inventing one
 *  would ship a wrong number as fact. Add `formulas: number` to `Overview`
 *  and set it once formulas.ts exists and can be counted. */
export const OVERVIEW: Overview = {
  totalQ: 2090,
  papers: 42,
  yearsCovered: 5, // 2021-2025 inclusive
  chapters: 26,
  playbooks: 21,
  paper: {
    questions: 50,
    marksPerQuestion: 2,
    totalMarks: 100,
    durationMinutes: 90,
    negativeMarking: false,
    minutesPerQuestion: 1.8,
  },
  // EASY 10.1% - MODERATE 52.6% - HARD 37.3%. Sums to totalQ.
  difficulty: { easy: 211, moderate: 1099, hard: 780 },
  asOf: "2026-09-28",
};

/** Whether the chapter is still being set on current papers.
 *  Derived from the 2025 shifts (13 papers), not from a lifetime average. */
export type ChapterStatus = "live" | "dropped" | "entered";

export type ChapterRow = {
  chapter: string; // canonical DB chapter name
  /** Lifetime PUBLIC PYQ count across all 42 shifts. */
  qCount: number;
  /** % of the 2,090-question bank (1 decimal). */
  pctTotal: number;
  /** Questions per paper on RECENT shifts (2024-2025, 24 shifts). This is the
   *  number the guide tiers on, and the number to quote to a student. */
  qPerPaper: number;
  /** % HARD within the chapter (rounded integer). */
  pctHard: number;
  /** Subtopic split with counts and per-subtopic %HARD where it changes the
   *  advice. Subtopic names are canonical DB strings — copy exactly. */
  focus: string;
  /** Omitted for the 25 chapters that are simply live. Set only where the
   *  2025 syllabus shift moved the chapter. */
  status?: ChapterStatus;
  /** The evidence behind a non-"live" status. */
  note?: string;
};

/** All 26 MHT-CET Maths chapters, sorted by RECENT weightage (qPerPaper)
 *  descending — not by lifetime qCount, because that is what the guide tiers
 *  on and the two disagree (Vectors leads on lifetime count, Trigonometric
 *  Functions leads on recent rate).
 *
 *  The 26 qCounts sum to EXACTLY 2090, which is `OVERVIEW.totalQ`. Verified
 *  by summation, not asserted. If a future edit breaks that identity, one of
 *  the two numbers is wrong — do not adjust a chapter to make it balance.
 *
 *  21 of these 26 ship a playbook (see playbooks.ts); the 5 below the
 *  0.9 q/paper line do not and are covered in a tail block on /strategy.
 *
 *  2026-09-26: Trigonometry - I was split by stem into Trigonometric Functions
 *  (equations + inverse) and Trigonometry - II (identities) and deleted, and 11
 *  duplicate rows went PRIVATE. The same day every row and OVERVIEW were re-measured
 *  from the regenerated matrix, after 83 undated "2025 Shift ||" compilation rows went
 *  PRIVATE as twins of dated papers; 2025 is now its 13 real shifts. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Trigonometric Functions",
    qCount: 207,
    pctTotal: 9.9,
    qPerPaper: 5.08,
    pctHard: 38,
    focus:
      "Trigonometric Equations and General Solutions (47 · 36% HARD), Sine, Cosine and Projection Rules (45 · 40%), Half-Angle Formulas, Napier's Analogy and Area (24 · 38%), Inverse Trigonometric Functions — Principal Values and Evaluation (32 · 25%), Inverse Trigonometric Identities (30 · 63%), Inverse Trigonometric Equations (29 · 24%). The Std XII trigonometry chapter and the second-largest in the bank. Solution of triangle is rising (1.64 to 2.13 a paper); equations are falling (1.12 to 0.83).",
  },
  {
    chapter: "Line and Plane",
    qCount: 191,
    pctTotal: 9.1,
    qPerPaper: 4.96,
    pctHard: 40,
    focus:
      "Plane — Equation, Normal, and Construction (42 · 33% HARD), Intersection, Coplanarity, and Skew Lines (35 · 60%), Distances in 3-D (32 · 41%), Angles — Line, Plane, and Direction Conditions (29 · 45%), Line — Equation, Direction Cosines, and Vector Form (28 · 21%), Foot of Perpendicular, Image, and Projection (15 · 53%), Tetrahedron Geometry — Centroid, Volume, and Vertices (10 · 20%). The HARD is spread across seven subtopics rather than concentrated, so there is no cherry-pick here.",
  },
  {
    chapter: "Vectors",
    qCount: 214,
    pctTotal: 10.2,
    qPerPaper: 4.83,
    pctHard: 56,
    focus:
      "Scalar Triple Product, Coplanarity, and Volume (68 · 74% HARD), Cross Product, Angle, and Area (63 · 63%), Dot Product, Angle, and Perpendicularity (46 · 26%), Vector Geometry — Section Formula, Triangle, and Parallelogram (13 · 54%), Linear Combinations, Collinearity, and Coplanarity (14 · 50%), Magnitude, Components, and Unit Vectors (10 · 30%). Largest chapter in the bank and the hardest cornerstone — but it DOES cherry-pick: Dot Product is 46 questions at 26% HARD.",
  },
  {
    chapter: "Applications of Derivative",
    qCount: 174,
    pctTotal: 8.3,
    qPerPaper: 3.88,
    pctHard: 21,
    focus:
      "Maxima, Minima, and Optimisation (39 · 26% HARD), Rate of Change and Related Rates (37 · 19%), Tangents, Normals, and the Slope of a Curve (31 · 19%), Increasing and Decreasing Functions (29 · 31%), Rolle's Theorem and Mean Value Theorem (18 · 17%), Approximations using Differentials (12 · 0%), Angle Between Curves and Orthogonality (8 · 13%). The cheapest cornerstone by some distance — no subtopic above 31% HARD.",
  },
  {
    chapter: "Indefinite Integration",
    qCount: 151,
    pctTotal: 7.2,
    qPerPaper: 3.42,
    pctHard: 52,
    focus:
      "Integration by Substitution (49 · 51% HARD), Trigonometric Integrals - Rational and Substitution Forms (34 · 74%), Rational Functions and Partial Fractions (24 · 50%), Integration by Parts (25 · 52%), Trigonometric Integrals - Powers and Identities (11 · 18%), Foundations and Standard Formulae (8 · 13%). Half the chapter is HARD and the trigonometric-rational forms are the most expensive block on the paper at 74%.",
  },
  {
    chapter: "Differential Equations",
    qCount: 135,
    pctTotal: 6.5,
    qPerPaper: 3.38,
    pctHard: 36,
    focus:
      "Growth, Decay, and Continuous Models (31 · 26% HARD), Order, Degree, Formation of ODE, and Verification of Solutions (31 · 23%), Variable-Separable Equations (31 · 35%), Linear Differential Equations (Integrating Factor) (23 · 61%), Homogeneous and Reducible Equations (14 · 36%), Newton's Law of Cooling (5 · 60%). The subtopics split by SOLUTION METHOD, which is exactly how the questions are set.",
  },
  {
    chapter: "Differentiation",
    qCount: 135,
    pctTotal: 6.5,
    qPerPaper: 3.21,
    pctHard: 47,
    focus:
      "Inverse Functions & Inverse Trigonometric Differentiation (38 · 47% HARD), Implicit Differentiation & Special Forms (28 · 54%), Logarithmic Differentiation (23 · 39%), Foundations, Chain Rule & Differentiability (21 · 33%), Parametric, Higher-Order Derivatives & Relations (18 · 50%), Derivative of One Function with Respect to Another (7 · 71%). Feeds Applications of Derivative directly — the two run to 8.0 questions per paper together.",
  },
  {
    chapter: "Probability Distribution",
    qCount: 107,
    pctTotal: 5.1,
    qPerPaper: 2.67,
    pctHard: 21,
    focus:
      "Expectation, Variance and Standard Deviation (33 · 21% HARD), Discrete Random Variables, PMF and CDF (30 · 17%), Conditional Probability, Independence and Bayes' Theorem (24 · 33%), Classical Probability, Addition Theorem and Odds (20 · 10%). The heaviest quick-win: 2.67 questions a paper at only 21% HARD.",
  },
  {
    chapter: "Limits",
    qCount: 86,
    pctTotal: 4.1,
    qPerPaper: 2.04,
    pctHard: 55,
    focus:
      "Continuity at a Point (18 · 61% HARD), Piecewise Continuity (19 · 53%), Algebraic (12 · 42%), Trigonometric (11 · 64%), Exponential-Logarithmic (11 · 64%), Existence and Infinity (9 · 44%), [x] and |x| Discontinuities (6 · 50%). The highest %HARD of any chapter in the bank, and the difficulty sits in every page, so it does not cherry-pick.",
  },
  {
    chapter: "Mathematical Logic",
    qCount: 84,
    pctTotal: 4.0,
    qPerPaper: 1.96,
    pctHard: 29,
    focus:
      "Converse, Inverse, and Contrapositive (17 · 24% HARD), Finding Truth Values of Component Statements (15 · 20%), Logical Equivalence and Algebra of Statements (16 · 31%), Negation of Statements and Quantifiers (14 · 14%), Statements, Connectives and Truth Tables (12 · 33%), Switching Circuits (10 · 60%). Self-contained — it borrows nothing from the rest of the syllabus, which makes it the fastest chapter to bank from a cold start.",
  },
  {
    chapter: "Definite Integration",
    qCount: 67,
    pctTotal: 3.2,
    qPerPaper: 1.75,
    pctHard: 46,
    focus:
      "King's Property (17 · 47% HARD), Modulus and Greatest-Integer (13 · 15%), Evaluation and Substitution (15 · 47%), Odd and Even Symmetry (11 · 55%), Trigonometric Integrals (11 · 73%). The symmetry properties are the time lever: they turn an expensive integral into a two-line answer.",
  },
  {
    chapter: "Binomial Distribution",
    qCount: 57,
    pctTotal: 2.7,
    qPerPaper: 1.29,
    pctHard: 21,
    focus:
      "Computing Binomial Probabilities (19 · 26% HARD), Parameter Estimation and the Probability Ratio (14 · 29%), Mean, Variance and Standard Deviation of a Binomial Variable (14 · 14%), The Binomial Setting and Probability Mass Function (10 · 10%). Four subtopics off one formula.",
  },
  {
    chapter: "Determinants and Matrices",
    qCount: 47,
    pctTotal: 2.2,
    qPerPaper: 1.13,
    pctHard: 47,
    focus:
      "Determinants and Adjoint Identities (15 · 67% HARD), Inverse of a Matrix (15 · 33%), Cayley–Hamilton and Matrix Polynomials (9 · 44%), Linear Systems and Symmetric Matrices (8 · 38%). One question a paper at 49% HARD — expensive for what it returns.",
  },
  {
    chapter: "Circle",
    qCount: 43,
    pctTotal: 2.1,
    qPerPaper: 1,
    pctHard: 33,
    focus:
      "Tangents (13 · 46% HARD), Equation of a Circle (12 · 33%), Two Circles (7 · 43%), Concentric and Touching (6 · 17%), Distance to a Circle (5 · 0%). Its extremum questions — greatest or least distance from a point to the circle — are answered by centre-distance plus or minus radius, with no calculus.",
  },
  {
    chapter: "Linear Programming",
    qCount: 43,
    pctTotal: 2.1,
    qPerPaper: 1,
    pctHard: 5,
    focus:
      "Corner-Point Method (14 · 0% HARD), Feasible Region (13 · 0%), Reading Constraints Off a Shaded Region (9 · 22%), Formulation and Special Cases (7 · 0%). The lowest %HARD in the bank at 4%, and all of it on the figure page. One free mark a paper if the method is drilled.",
  },
  {
    chapter: "Complex Numbers",
    qCount: 43,
    pctTotal: 2.1,
    qPerPaper: 1,
    pctHard: 33,
    focus:
      "Algebra of Complex Numbers (15 · 47% HARD), Modulus and Argument (17 · 29%), Locus in the Argand Plane (11 · 18%). The algebra page is 30 points of HARD above the other two — secure modulus, argument and locus first. Greatest and least modulus on a disc is the same geometric move as the Circle chapter's extremum question.",
  },
  {
    chapter: "Applications of Definite Integral",
    qCount: 44,
    pctTotal: 2.1,
    qPerPaper: 1.04,
    pctHard: 32,
    focus:
      "Area Between Two Curves (21 · 38% HARD), Area Under a Curve (14 · 14%), Circle, Ellipse and Hyperbola Regions (9 · 44%). Effectively one skill — 80% of the chapter is an area between a curve and a line or a second curve.",
  },
  {
    chapter: "Pair of Straight Lines",
    qCount: 42,
    pctTotal: 2.0,
    qPerPaper: 1,
    pctHard: 43,
    focus:
      "Joint Equation (12 · 17% HARD), Slopes of a Pair (10 · 50%), Angle Between the Pair (11 · 64%), General Second-Degree Equation (9 · 44%). Its perpendicularity test reads a + b = 0 rather than the slope product used elsewhere — the same condition in a different dialect.",
  },
  {
    chapter: "Permutations and Combinations",
    qCount: 40,
    pctTotal: 1.9,
    qPerPaper: 1,
    pctHard: 40,
    focus:
      "Counting Numbers and Geometric Figures (10 · 40% HARD), Arrangements with Constraints (9 · 44%), Fundamental Principle and Identities (8 · 0%), Selections with Conditions (7 · 43%), Circular Arrangements (6 · 83%). One question a paper at 40% HARD, and the constraint questions do not reduce to a formula — cost this chapter honestly before investing in it.",
  },
  {
    chapter: "Straight Line",
    qCount: 43,
    pctTotal: 2.1,
    qPerPaper: 0.96,
    pctHard: 19,
    focus:
      "Slope, Angle and Rotation (15 · 33% HARD), Forms, Intersections and Concurrency (13 · 15%), Distance and the Foot of the Perpendicular (9 · 11%), Section Formula and Rectangles (6 · 0%). Cheap, and it underwrites Pair of Straight Lines and Circle — the return is larger than its own 0.96 per paper.",
  },
  {
    chapter: "Trigonometry - II",
    qCount: 38,
    pctTotal: 1.8,
    qPerPaper: 0.92,
    pctHard: 47,
    focus:
      "Compound Angles and Conditional Identities (13 · 15% HARD), Multiple and Sub-multiple Angles (13 · 69%), Sum-to-Product and Product Formulas (12 · 58%) — the Std XI identity chapter. Crossed the 0.9 line on the 2026-09-26 re-measure (0.88 to 0.92) and now ships a long-tail playbook; eight of its 19 HARD questions are standard-angle evaluations, and the equations and inverse-trig pages of Trigonometric Functions lean on these identities.",
  },
  {
    chapter: "Sets, Relations and Functions",
    qCount: 38,
    pctTotal: 1.8,
    qPerPaper: 0.71,
    pctHard: 13,
    focus:
      "Domain and Range (11 · 27% HARD), Composite Functions (10 · 10%), Sets and Types of Functions (10 · 0%), Inverse Functions (7 · 14%). 13% HARD — the third-cheapest chapter in the bank, after Linear Programming and the dropped Measures of Dispersion. Below the 0.9 q/paper line so it ships no playbook, but its four notes pages are live and it is worth a short drill rather than a skip.",
  },
  {
    chapter: "Conic Sections",
    qCount: 17,
    pctTotal: 0.8,
    qPerPaper: 0.67,
    pctHard: 35,
    focus:
      "18 questions lifetime at 39% HARD, but the lifetime figure is the wrong lens — see the note. Below the playbook line on the 2021-2025 average and above it on 2025 alone.",
    status: "entered",
    note:
      "Entered with the 2025 syllabus shift: 3 questions in the whole bank before 2025, then 15 in 2025 alone. The lifetime rate of 0.41 understates it — anyone prepping from 2023-24 papers has never seen this chapter set.",
  },
  {
    chapter: "Measures of Dispersion",
    qCount: 30,
    pctTotal: 1.4,
    qPerPaper: 0.46,
    pctHard: 10,
    focus:
      "32 questions lifetime at 9% HARD — the second-lowest %HARD in the bank, and irrelevant, because the chapter is no longer set. Its three notes pages are a formula rehearsal for Probability Distribution. See the note.",
    status: "dropped",
    note:
      "DROPPED for 2025. Ran 1.0 question per paper across the 27 shifts of 2023-24, then ZERO across all 13 papers of 2025. Its 9% HARD makes it look like a cheap chapter in a lifetime table, which is exactly the trap — do not spend time here.",
  },
  {
    chapter: "Sequences and Series",
    qCount: 10,
    pctTotal: 0.5,
    qPerPaper: 0.33,
    pctHard: 40,
    focus:
      "10 questions in 42 shifts at 40% HARD. Below the playbook line; revise it, do not drill it.",
  },
  {
    chapter: "Quadratic Equations",
    qCount: 4,
    pctTotal: 0.2,
    qPerPaper: 0.13,
    pctHard: 25,
    focus:
      "4 questions in 42 shifts — the thinnest chapter in the bank. Assumed knowledge from earlier chapters rather than a topic the paper sets in its own right.",
  },
];
