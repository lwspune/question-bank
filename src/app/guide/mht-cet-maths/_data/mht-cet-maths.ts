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
 *   - Weightage is RECENT (2025-2026, 39 shifts), not lifetime. MHT-CET moved
 *     its syllabus for 2025 and 2026 kept the move: Measures of Dispersion ran
 *     1.0 q/paper across the 27 shifts of 2023-24 and then scored ZERO across
 *     all 39 papers of 2025-2026, while Conic Sections went from 2 questions
 *     before 2025 to 42 in 2025-2026. A lifetime average hides both, which is
 *     why CHAPTER_TABLE carries `qPerPaper` alongside `qCount` and is sorted on
 *     the former.
 *
 * The paper is hard and it is dense: 34.8% of the bank is HARD, against 13.8%
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
      "How MHT-CET Maths actually works: 50 questions, 90 minutes, no negative marking, and what 3,388 past-year questions across 68 shifts reveal.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Cornerstone, Quick-Win, Long Tail: 7 chapters carry over 27 of the 50 questions. With no negative marking the decision is order and time, never whether to attempt.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "22 playbooks, one per chapter above 0.9 questions per paper. The subtopic split, where the HARD sits, and whether the chapter cherry-picks.",
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
      "The 2025 syllabus shift, confirmed by 2026: Measures of Dispersion is zero across all 39 papers of 2025-2026, Conic Sections went from 2 questions to 42. Prep from 2023-24 alone and you drill a dead chapter.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "The same idea in four chapter dialects: perpendicularity is named in 147 questions across 8 chapters, and 84% of the trigonometry sits in the chapter whose name students do not recognise.",
  },
];

export type Overview = {
  totalQ: number;
  /** Distinct MHT-CET shifts covered: 2021 = 1, 2022 = 1, 2023 = 16,
   *  2024 = 11, 2025 = 13, 2026 = 26. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count. 22 of the 26 chapters clear the 0.9 q/paper line. */
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
  totalQ: 3388,
  papers: 68,
  yearsCovered: 6, // 2021-2026 inclusive
  chapters: 26,
  playbooks: 22,
  paper: {
    questions: 50,
    marksPerQuestion: 2,
    totalMarks: 100,
    durationMinutes: 90,
    negativeMarking: false,
    minutesPerQuestion: 1.8,
  },
  // EASY 13.8% - MODERATE 51.4% - HARD 34.8%. Sums to totalQ.
  difficulty: { easy: 466, moderate: 1742, hard: 1180 },
  asOf: "2026-10-13",
};

/** Whether the chapter is still being set on current papers.
 *  Derived from the 2025 and 2026 shifts (39 papers), not from a lifetime average. */
export type ChapterStatus = "live" | "dropped" | "entered";

export type ChapterRow = {
  chapter: string; // canonical DB chapter name
  /** Lifetime PUBLIC PYQ count across all 68 shifts. */
  qCount: number;
  /** % of the 3,388-question bank (1 decimal). */
  pctTotal: number;
  /** Questions per paper on RECENT shifts (2025-2026, 39 shifts). This is the
   *  number the guide tiers on, and the number to quote to a student. */
  qPerPaper: number;
  /** % HARD within the chapter (rounded integer). */
  pctHard: number;
  /** Subtopic split with counts and per-subtopic %HARD where it changes the
   *  advice. Subtopic names are canonical DB strings — copy exactly. */
  focus: string;
  /** Omitted for the 24 chapters that are simply live. Set only where the
   *  2025 syllabus shift moved the chapter. */
  status?: ChapterStatus;
  /** The evidence behind a non-"live" status. */
  note?: string;
};

/** All 26 MHT-CET Maths chapters, sorted by RECENT weightage (qPerPaper)
 *  descending, not by lifetime qCount, because that is what the guide tiers
 *  on and the two disagree (Vectors leads on lifetime count, Line and Plane
 *  leads on recent rate).
 *
 *  The 26 qCounts sum to EXACTLY 3388, which is `OVERVIEW.totalQ`. Verified
 *  by summation, not asserted. If a future edit breaks that identity, one of
 *  the two numbers is wrong: do not adjust a chapter to make it balance.
 *
 *  22 of these 26 ship a playbook (see playbooks.ts); the 4 below the
 *  0.9 q/paper line do not and are covered in a tail block on /strategy.
 *
 *  2026-10-13: every row and OVERVIEW re-measured from the live bank and the
 *  regenerated matrix after the 26 shifts of 2026 went PUBLIC (difficulty
 *  re-graded onto the 2021-2025 scale). The recent window moved from
 *  2024-2025 (24 shifts) to 2025-2026 (39 shifts); Conic Sections crossed the
 *  0.9 line on it and now ships a playbook. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Line and Plane",
    qCount: 304,
    pctTotal: 9.0,
    qPerPaper: 4.69,
    pctHard: 35,
    focus:
      "Plane — Equation, Normal, and Construction (66 · 29% HARD), Distances in 3-D (52 · 40%), Intersection, Coplanarity, and Skew Lines (52 · 50%), Line — Equation, Direction Cosines, and Vector Form (50 · 18%), Angles — Line, Plane, and Direction Conditions (48 · 35%), Foot of Perpendicular, Image, and Projection (20 · 55%), Tetrahedron Geometry — Centroid, Volume, and Vertices (16 · 13%). The heaviest chapter on recent papers. The HARD is spread across seven subtopics rather than concentrated, so there is no cherry-pick here.",
  },
  {
    chapter: "Vectors",
    qCount: 334,
    pctTotal: 9.9,
    qPerPaper: 4.49,
    pctHard: 50,
    focus:
      "Scalar Triple Product, Coplanarity, and Volume (100 · 63% HARD), Cross Product, Angle, and Area (83 · 64%), Dot Product, Angle, and Perpendicularity (76 · 28%), Vector Geometry — Section Formula, Triangle, and Parallelogram (32 · 50%), Linear Combinations, Collinearity, and Coplanarity (25 · 40%), Magnitude, Components, and Unit Vectors (18 · 17%). Largest chapter in the bank and the hardest cornerstone, but it DOES cherry-pick: Dot Product is 76 questions at 28% HARD.",
  },
  {
    chapter: "Trigonometric Functions",
    qCount: 312,
    pctTotal: 9.2,
    qPerPaper: 4.46,
    pctHard: 41,
    focus:
      "Trigonometric Equations and General Solutions (69 · 42% HARD), Sine, Cosine and Projection Rules (69 · 39%), Inverse Trigonometric Identities (51 · 65%), Inverse Trigonometric Functions — Principal Values and Evaluation (46 · 24%), Inverse Trigonometric Equations (39 · 31%), Half-Angle Formulas, Napier's Analogy and Area (38 · 42%). The Std XII trigonometry chapter and the second-largest in the bank. Solution of triangle is rising (1.26 to 1.85 a paper from 2023-24 to 2025-26); equations are falling (1.33 to 0.85).",
  },
  {
    chapter: "Differentiation",
    qCount: 237,
    pctTotal: 7.0,
    qPerPaper: 3.59,
    pctHard: 47,
    focus:
      "Inverse Functions & Inverse Trigonometric Differentiation (59 · 53% HARD), Foundations, Chain Rule & Differentiability (45 · 31%), Implicit Differentiation & Special Forms (43 · 58%), Parametric, Higher-Order Derivatives & Relations (42 · 50%), Logarithmic Differentiation (32 · 34%), Derivative of One Function with Respect to Another (16 · 63%). Feeds Applications of Derivative directly: the two run to 6.8 questions per paper together.",
  },
  {
    chapter: "Indefinite Integration",
    qCount: 249,
    pctTotal: 7.3,
    qPerPaper: 3.51,
    pctHard: 48,
    focus:
      "Integration by Substitution (83 · 51% HARD), Trigonometric Integrals - Rational and Substitution Forms (46 · 76%), Integration by Parts (44 · 48%), Rational Functions and Partial Fractions (37 · 43%), Foundations and Standard Formulae (20 · 5%), Trigonometric Integrals - Powers and Identities (19 · 26%). Half the chapter is HARD and the trigonometric-rational forms are the most expensive block on the paper at 76%.",
  },
  {
    chapter: "Differential Equations",
    qCount: 216,
    pctTotal: 6.4,
    qPerPaper: 3.38,
    pctHard: 33,
    focus:
      "Order, Degree, Formation of ODE, and Verification of Solutions (58 · 21% HARD), Variable-Separable Equations (47 · 30%), Linear Differential Equations (Integrating Factor) (39 · 54%), Growth, Decay, and Continuous Models (38 · 26%), Homogeneous and Reducible Equations (25 · 44%), Newton's Law of Cooling (9 · 44%). The subtopics split by SOLUTION METHOD, which is exactly how the questions are set.",
  },
  {
    chapter: "Applications of Derivative",
    qCount: 253,
    pctTotal: 7.5,
    qPerPaper: 3.23,
    pctHard: 20,
    focus:
      "Rate of Change and Related Rates (56 · 16% HARD), Maxima, Minima, and Optimisation (53 · 21%), Tangents, Normals, and the Slope of a Curve (52 · 17%), Increasing and Decreasing Functions (36 · 31%), Rolle's Theorem and Mean Value Theorem (32 · 28%), Approximations using Differentials (16 · 0%), Angle Between Curves and Orthogonality (8 · 13%). The cheapest cornerstone by some distance, with no subtopic above 31% HARD. Lighter than in 2023-24 (4.48 a paper), and still a cornerstone.",
  },
  {
    chapter: "Mathematical Logic",
    qCount: 151,
    pctTotal: 4.5,
    qPerPaper: 2.38,
    pctHard: 23,
    focus:
      "Logical Equivalence and Algebra of Statements (34 · 26% HARD), Finding Truth Values of Component Statements (31 · 16%), Converse, Inverse, and Contrapositive (28 · 21%), Negation of Statements and Quantifiers (21 · 10%), Statements, Connectives and Truth Tables (20 · 20%), Switching Circuits (17 · 53%). Self-contained: it borrows nothing from the rest of the syllabus, which makes it the fastest chapter to bank from a cold start. Up from 2.00 a paper in 2023-24.",
  },
  {
    chapter: "Definite Integration",
    qCount: 132,
    pctTotal: 3.9,
    qPerPaper: 2.36,
    pctHard: 44,
    focus:
      "Evaluation and Substitution (45 · 42% HARD), King's Property (28 · 50%), Modulus and Greatest-Integer (25 · 20%), Odd and Even Symmetry (18 · 50%), Trigonometric Integrals (16 · 69%). The fastest-growing chapter on the paper: 1.30 a paper in 2023-24, 2.36 in 2025-26. The symmetry properties are the time lever: they turn an expensive integral into a two-line answer.",
  },
  {
    chapter: "Probability Distribution",
    qCount: 159,
    pctTotal: 4.7,
    qPerPaper: 2.31,
    pctHard: 18,
    focus:
      "Expectation, Variance and Standard Deviation (46 · 17% HARD), Discrete Random Variables, PMF and CDF (44 · 14%), Conditional Probability, Independence and Bayes' Theorem (37 · 27%), Classical Probability, Addition Theorem and Odds (32 · 13%). The cheapest large block on the paper: 2.31 questions a paper at only 18% HARD.",
  },
  {
    chapter: "Limits",
    qCount: 137,
    pctTotal: 4.0,
    qPerPaper: 1.97,
    pctHard: 56,
    focus:
      "Continuity at a Point (34 · 68% HARD), Piecewise Continuity (24 · 50%), Exponential-Logarithmic (21 · 71%), Existence and Infinity (17 · 35%), Algebraic (16 · 44%), Trigonometric (15 · 67%), [x] and |x| Discontinuities (10 · 40%). The highest %HARD of any chapter in the bank, and the difficulty sits in every page, so it does not cherry-pick.",
  },
  {
    chapter: "Determinants and Matrices",
    qCount: 102,
    pctTotal: 3.0,
    qPerPaper: 1.77,
    pctHard: 35,
    focus:
      "Inverse of a Matrix (44 · 25% HARD), Determinants and Adjoint Identities (27 · 56%), Cayley–Hamilton and Matrix Polynomials (17 · 35%), Linear Systems and Symmetric Matrices (14 · 29%). Ran 1.08 a paper in 2025 and 2.12 in 2026. The identities page carries the cost; the other three run 25-35% HARD.",
  },
  {
    chapter: "Applications of Definite Integral",
    qCount: 78,
    pctTotal: 2.3,
    qPerPaper: 1.21,
    pctHard: 24,
    focus:
      "Area Between Two Curves (36 · 31% HARD), Area Under a Curve (29 · 10%), Circle, Ellipse and Hyperbola Regions (13 · 38%). Effectively one skill: 83% of the chapter is an area between a curve and an axis, a line or a second curve.",
  },
  {
    chapter: "Straight Line",
    qCount: 75,
    pctTotal: 2.2,
    qPerPaper: 1.13,
    pctHard: 15,
    focus:
      "Forms, Intersections and Concurrency (30 · 13% HARD), Slope, Angle and Rotation (19 · 26%), Distance and the Foot of the Perpendicular (15 · 7%), Section Formula and Rectangles (11 · 9%). Cheap, and it underwrites Pair of Straight Lines and Circle: the return is larger than its own 1.13 per paper.",
  },
  {
    chapter: "Pair of Straight Lines",
    qCount: 73,
    pctTotal: 2.2,
    qPerPaper: 1.13,
    pctHard: 42,
    focus:
      "Angle Between the Pair (21 · 48% HARD), General Second-Degree Equation (19 · 47%), Joint Equation (17 · 18%), Slopes of a Pair (16 · 56%). Its perpendicularity test reads a + b = 0 rather than the slope product used elsewhere: the same condition in a different dialect.",
  },
  {
    chapter: "Binomial Distribution",
    qCount: 86,
    pctTotal: 2.5,
    qPerPaper: 1.1,
    pctHard: 16,
    focus:
      "Computing Binomial Probabilities (38 · 16% HARD), Parameter Estimation and the Probability Ratio (20 · 25%), Mean, Variance and Standard Deviation of a Binomial Variable (17 · 12%), The Binomial Setting and Probability Mass Function (11 · 9%). Four subtopics off one formula.",
  },
  {
    chapter: "Conic Sections",
    qCount: 44,
    pctTotal: 1.3,
    qPerPaper: 1.08,
    pctHard: 27,
    focus:
      "Ellipse and Hyperbola (26 · 27% HARD), Parabola (18 · 28%). 42 of its 44 questions are from 2025 and 2026, so the lifetime count understates it badly; on recent papers it clears the playbook line. See the note.",
    status: "entered",
    note:
      "Entered with the 2025 syllabus and held in 2026: 2 questions in the 29 shifts before 2025, then 15 in 2025 and 27 in 2026. Anyone prepping from 2023-24 papers has never seen this chapter set.",
  },
  {
    chapter: "Circle",
    qCount: 71,
    pctTotal: 2.1,
    qPerPaper: 1.05,
    pctHard: 28,
    focus:
      "Equation of a Circle (22 · 23% HARD), Tangents (21 · 38%), Concentric and Touching (10 · 30%), Distance to a Circle (9 · 0%), Two Circles (9 · 44%). Its extremum questions (greatest or least distance from a point to the circle) are answered by centre-distance plus or minus radius, with no calculus.",
  },
  {
    chapter: "Linear Programming",
    qCount: 69,
    pctTotal: 2.0,
    qPerPaper: 1,
    pctHard: 3,
    focus:
      "Corner-Point Method — Maximum and Minimum of the Objective Function (28 · 0% HARD), Feasible Region — Half-Plane Tests, Bounded, Unbounded and Empty (16 · 0%), Formulation and Special Cases — Word Problems and Infinitely Many Optima (14 · 0%), Reading Constraints Off a Shaded Region (11 · 18%). The lowest %HARD in the bank at 3%, and all of it on the figure page. One free mark a paper if the method is drilled.",
  },
  {
    chapter: "Permutations and Combinations",
    qCount: 65,
    pctTotal: 1.9,
    qPerPaper: 0.97,
    pctHard: 34,
    focus:
      "Counting Numbers and Geometric Figures (19 · 26% HARD), Arrangements with Constraints (16 · 38%), Fundamental Principle and Identities (12 · 8%), Selections with Conditions (9 · 56%), Circular Arrangements (9 · 56%). One question a paper at 34% HARD, and the constraint questions do not reduce to a formula: cost this chapter honestly before investing in it.",
  },
  {
    chapter: "Complex Numbers",
    qCount: 67,
    pctTotal: 2.0,
    qPerPaper: 0.95,
    pctHard: 24,
    focus:
      "Algebra of Complex Numbers (30 · 30% HARD), Modulus and Argument (26 · 19%), Locus in the Argand Plane (11 · 18%). The algebra page is the expensive one; secure modulus, argument and locus first. Greatest and least modulus on a disc is the same geometric move as the Circle chapter's extremum question.",
  },
  {
    chapter: "Trigonometry - II",
    qCount: 61,
    pctTotal: 1.8,
    qPerPaper: 0.92,
    pctHard: 48,
    focus:
      "Compound Angles and Conditional Identities (27 · 26% HARD), Multiple and Sub-multiple Angles (20 · 65%), Sum-to-Product and Product Formulas (14 · 64%). The Std XI identity chapter. Holds at 0.92 a paper, just above the 0.9 line, and ships a long-tail playbook; 11 of its 29 HARD questions ask for a value at fixed angles, and the equations and inverse-trig pages of Trigonometric Functions lean on these identities.",
  },
  {
    chapter: "Sets, Relations and Functions",
    qCount: 66,
    pctTotal: 1.9,
    qPerPaper: 0.87,
    pctHard: 12,
    focus:
      "Domain and Range (23 · 22% HARD), Composite Functions (21 · 10%), Sets and Types of Functions (13 · 0%), Inverse Functions (9 · 11%). 12% HARD, the third-cheapest chapter in the bank after Linear Programming and the dropped Measures of Dispersion. Just below the 0.9 q/paper line (0.87), so it ships no playbook, but its four notes pages are live and it is worth a short drill rather than a skip.",
  },
  {
    chapter: "Sequences and Series",
    qCount: 11,
    pctTotal: 0.3,
    qPerPaper: 0.18,
    pctHard: 36,
    focus:
      "11 questions in 68 shifts at 36% HARD. Below the playbook line; revise it, do not drill it.",
  },
  {
    chapter: "Quadratic Equations",
    qCount: 6,
    pctTotal: 0.2,
    qPerPaper: 0.1,
    pctHard: 33,
    focus:
      "6 questions in 68 shifts, the thinnest chapter in the bank. Assumed knowledge from earlier chapters rather than a topic the paper sets in its own right.",
  },
  {
    chapter: "Measures of Dispersion",
    qCount: 30,
    pctTotal: 0.9,
    qPerPaper: 0,
    pctHard: 10,
    focus:
      "30 questions lifetime at 10% HARD, the second-lowest %HARD in the bank, and irrelevant, because the chapter is no longer set. Its three notes pages are a formula rehearsal for Probability Distribution. See the note.",
    status: "dropped",
    note:
      "DROPPED from 2025. Ran 1.0 question per paper across the 27 shifts of 2023-24, then ZERO across all 39 papers of 2025 and 2026. Its 10% HARD makes it look like a cheap chapter in a lifetime table, which is exactly the trap: do not spend time here.",
  },
];
