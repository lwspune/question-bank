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
 *   - Weightage is RECENT (2024-2025, 26 shifts), not lifetime. MHT-CET moved
 *     its syllabus for 2025: Measures of Dispersion ran 1.0 q/paper across the
 *     29 shifts of 2023-24 and then scored ZERO across all 14 papers of 2025,
 *     while Conic Sections went 3 questions lifetime-before-2025 to 16 in 2025
 *     alone. A lifetime average hides both, which is why CHAPTER_TABLE carries
 *     `qPerPaper` alongside `qCount` and is sorted on the former.
 *
 * The paper is hard and it is dense: 38.4% of the bank is HARD, against 10.2%
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
      "How MHT-CET Maths actually works — 50 questions, 90 minutes, no negative marking, and what 2,228 past-year questions across 45 shifts reveal.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Cornerstone, Quick-Win, Long Tail — 6 chapters carry 23.4 of the 50 questions. With no negative marking the decision is order and time, never whether to attempt.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "22 playbooks — one per chapter above 0.9 questions per paper. The subtopic split, where the HARD sits, and whether the chapter cherry-picks.",
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
      "The 2025 syllabus shift, in numbers — Measures of Dispersion dropped to zero across all 14 papers, Conic Sections went 3 to 16. Prep from 2023-24 alone and you drill a dead chapter.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "The same idea in four chapter dialects — perpendicularity appears in 83 questions across 7 chapters, and inverse trigonometry is filed under two different chapters at once.",
  },
];

export type Overview = {
  totalQ: number;
  /** Distinct MHT-CET shifts covered: 2021 = 1, 2022 = 1, 2023 = 17,
   *  2024 = 12, 2025 = 14. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count. 22 of the 27 chapters clear the 0.9 q/paper line. */
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
  totalQ: 2228,
  papers: 45,
  yearsCovered: 5, // 2021-2025 inclusive
  chapters: 27,
  playbooks: 22,
  paper: {
    questions: 50,
    marksPerQuestion: 2,
    totalMarks: 100,
    durationMinutes: 90,
    negativeMarking: false,
    minutesPerQuestion: 1.8,
  },
  // EASY 10.2% - MODERATE 51.4% - HARD 38.4%. Sums to totalQ.
  difficulty: { easy: 227, moderate: 1145, hard: 856 },
  asOf: "2026-08-22",
};

/** Whether the chapter is still being set on current papers.
 *  Derived from the 2025 shifts (14 papers), not from a lifetime average. */
export type ChapterStatus = "live" | "dropped" | "entered";

export type ChapterRow = {
  chapter: string; // canonical DB chapter name
  /** Lifetime PUBLIC PYQ count across all 45 shifts. */
  qCount: number;
  /** % of the 2,228-question bank (1 decimal). */
  pctTotal: number;
  /** Questions per paper on RECENT shifts (2024-2025, 26 shifts). This is the
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

/** All 27 MHT-CET Maths chapters, sorted by RECENT weightage (qPerPaper)
 *  descending — not by lifetime qCount, because that is what the guide tiers
 *  on and the two disagree (Vectors leads on lifetime count, Line and Plane
 *  leads on recent rate).
 *
 *  The 27 qCounts sum to EXACTLY 2228, which is `OVERVIEW.totalQ`. Verified
 *  by summation, not asserted. If a future edit breaks that identity, one of
 *  the two numbers is wrong — do not adjust a chapter to make it balance.
 *
 *  22 of these 27 ship a playbook (see playbooks.ts); the 5 below the
 *  0.9 q/paper line do not and are covered in a tail block on /strategy. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Line and Plane",
    qCount: 205,
    pctTotal: 9.2,
    qPerPaper: 4.96,
    pctHard: 42,
    focus:
      "Plane — Equation, Normal, and Construction (47 · 38% HARD), Intersection, Coplanarity, and Skew Lines (37 · 62%), Distances in 3-D (33 · 42%), Angles — Line, Plane, and Direction Conditions (29 · 45%), Line — Equation, Direction Cosines, and Vector Form (29 · 21%), Foot of Perpendicular, Image, and Projection (19 · 53%), Tetrahedron Geometry — Centroid, Volume, and Vertices (11 · 27%). The HARD is spread across seven subtopics rather than concentrated, so there is no cherry-pick here.",
  },
  {
    chapter: "Vectors",
    qCount: 228,
    pctTotal: 10.2,
    qPerPaper: 4.81,
    pctHard: 55,
    focus:
      "Scalar Triple Product, Coplanarity, and Volume (71 · 72% HARD), Cross Product, Angle, and Area (66 · 64%), Dot Product, Angle, and Perpendicularity (50 · 28%), Vector Geometry — Section Formula, Triangle, and Parallelogram (16 · 50%), Linear Combinations, Collinearity, and Coplanarity (15 · 53%), Magnitude, Components, and Unit Vectors (10 · 30%). Largest chapter in the bank and the hardest cornerstone — but it DOES cherry-pick: Dot Product is 50 questions at 28% HARD.",
  },
  {
    chapter: "Applications of Derivative",
    qCount: 183,
    pctTotal: 8.2,
    qPerPaper: 3.81,
    pctHard: 23,
    focus:
      "Maxima, Minima, and Optimisation (42 · 29% HARD), Rate of Change and Related Rates (40 · 20%), Tangents, Normals, and the Slope of a Curve (35 · 29%), Increasing and Decreasing Functions (29 · 31%), Rolle's Theorem and Mean Value Theorem (18 · 17%), Approximations using Differentials (11 · 0%), Angle Between Curves and Orthogonality (8 · 13%). The cheapest cornerstone by some distance — no subtopic above 31% HARD.",
  },
  {
    chapter: "Differential Equations",
    qCount: 144,
    pctTotal: 6.5,
    qPerPaper: 3.35,
    pctHard: 38,
    focus:
      "Growth, Decay, and Continuous Models (33 · 27% HARD), Order, Degree, Formation of ODE, and Verification of Solutions (33 · 24%), Variable-Separable Equations (33 · 39%), Linear Differential Equations (Integrating Factor) (24 · 63%), Homogeneous and Reducible Equations (16 · 38%), Newton's Law of Cooling (5 · 60%). The subtopics split by SOLUTION METHOD, which is exactly how the questions are set.",
  },
  {
    chapter: "Indefinite Integration",
    qCount: 159,
    pctTotal: 7.1,
    qPerPaper: 3.35,
    pctHard: 51,
    focus:
      "Integration by Substitution (51 · 51% HARD), Trigonometric Integrals - Rational and Substitution Forms (35 · 74%), Rational Functions and Partial Fractions (27 · 48%), Integration by Parts (26 · 54%), Trigonometric Integrals - Powers and Identities (12 · 8%), Foundations and Standard Formulae (8 · 13%). Half the chapter is HARD and the trigonometric-rational forms are the most expensive block on the paper at 74%.",
  },
  {
    chapter: "Differentiation",
    qCount: 141,
    pctTotal: 6.3,
    qPerPaper: 3.15,
    pctHard: 47,
    focus:
      "Inverse Functions & Inverse Trigonometric Differentiation (39 · 49% HARD), Implicit Differentiation & Special Forms (31 · 52%), Logarithmic Differentiation (25 · 44%), Foundations, Chain Rule & Differentiability (21 · 29%), Parametric, Higher-Order Derivatives & Relations (18 · 50%), Derivative of One Function with Respect to Another (7 · 71%). Feeds Applications of Derivative directly — the two run to 8.0 questions per paper together.",
  },
  {
    chapter: "Probability Distribution",
    qCount: 115,
    pctTotal: 5.2,
    qPerPaper: 2.65,
    pctHard: 20,
    focus:
      "Expectation, Variance and Standard Deviation (37 · 19% HARD), Discrete Random Variables, PMF and CDF (31 · 19%), Conditional Probability, Independence and Bayes' Theorem (26 · 31%), Classical Probability, Addition Theorem and Odds (21 · 10%). The heaviest quick-win: 2.65 questions a paper at only 20% HARD.",
  },
  {
    chapter: "Limits",
    qCount: 93,
    pctTotal: 4.2,
    qPerPaper: 2.08,
    pctHard: 56,
    focus:
      "Continuity at a Point — Finding Parameters (47 · 57% HARD), Limit Evaluation Techniques (46 · 54%). The highest %HARD of any chapter in the bank, and it splits almost evenly, so it does not cherry-pick.",
  },
  {
    chapter: "Trigonometry - II",
    qCount: 90,
    pctTotal: 4.0,
    qPerPaper: 2.08,
    pctHard: 49,
    focus:
      "Properties of Triangles — Sine/Cosine Rules and Projection (52 · 42% HARD), Inverse Trigonometry — Identities, Equations, and Principal Values (21 · 52%), Trigonometric Identities and Compound/Half-Angle Formulas (17 · 65%). Note the overlap: its inverse-trigonometry subtopic sits alongside the separate 73-question Inverse Trigonometric Functions chapter.",
  },
  {
    chapter: "Inverse Trigonometric Functions",
    qCount: 73,
    pctTotal: 3.3,
    qPerPaper: 2.04,
    pctHard: 37,
    focus:
      "Inverse Trigonometric Functions — Identities, Equations, Principal Values, and Sums (73 · 37% HARD) — a single subtopic carrying the whole chapter. A further 21 questions of the same material are filed under Trigonometry - II; drill only one and you miss roughly a fifth of the topic.",
  },
  {
    chapter: "Trigonometry - I",
    qCount: 99,
    pctTotal: 4.4,
    qPerPaper: 1.85,
    pctHard: 37,
    focus:
      "Trig Identities, Compound Angle, and Equations (77 · 36% HARD), Properties of Triangle (22 · 41%). Properties of Triangle also appears in Trigonometry - II at 52 questions — the two chapters are not disjoint.",
  },
  {
    chapter: "Definite Integration",
    qCount: 73,
    pctTotal: 3.3,
    qPerPaper: 1.85,
    pctHard: 45,
    focus:
      "Symmetry, King's Property, and Absolute Value (42 · 38% HARD), Substitution and Standard Form (31 · 55%). The symmetry properties are the time lever: they turn an expensive integral into a two-line answer.",
  },
  {
    chapter: "Mathematical Logic",
    qCount: 88,
    pctTotal: 3.9,
    qPerPaper: 1.92,
    pctHard: 31,
    focus:
      "Negation, Equivalence, Tautology, and Switch Circuits (47 · 36% HARD), Truth Tables and Truth Values (27 · 26%), Converse, Inverse, and Contrapositive (14 · 21%). Self-contained — it borrows nothing from the rest of the syllabus, which makes it the fastest chapter to bank from a cold start.",
  },
  {
    chapter: "Binomial Distribution",
    qCount: 60,
    pctTotal: 2.7,
    qPerPaper: 1.27,
    pctHard: 22,
    focus:
      "Computing Binomial Probabilities (20 · 30% HARD), Parameter Estimation and the Probability Ratio (15 · 27%), Mean, Variance and Standard Deviation of a Binomial Variable (15 · 13%), The Binomial Setting and Probability Mass Function (10 · 10%). Four subtopics off one formula.",
  },
  {
    chapter: "Determinants and Matrices",
    qCount: 50,
    pctTotal: 2.2,
    qPerPaper: 1.12,
    pctHard: 48,
    focus:
      "Inverse, Cayley-Hamilton, and Matrix Polynomial (27 · 41% HARD), Adjoint, Determinant, and A·adj(A) Identity (14 · 64%), System of Linear Equations and Symmetric Matrices (9 · 44%). One question a paper at 48% HARD — expensive for what it returns.",
  },
  {
    chapter: "Circle",
    qCount: 47,
    pctTotal: 2.1,
    qPerPaper: 1.04,
    pctHard: 38,
    focus:
      "Tangent, Locus, and Equation Construction (27 · 37% HARD), Equation of Circle from Diameter, Centre, and Concentric Conditions (11 · 27%), Two Circles — Tangency, Common Tangents, and Relative Position (9 · 56%). Its extremum questions — greatest or least distance from a point to the circle — are answered by centre-distance plus or minus radius, with no calculus.",
  },
  {
    chapter: "Linear Programming",
    qCount: 46,
    pctTotal: 2.1,
    qPerPaper: 1.0,
    pctHard: 4,
    focus:
      "Feasible Region — Identification, Constraints, Classification (23 · 9% HARD), Objective Function — Maximisation and Minimisation (23 · 0%). The lowest %HARD in the bank at 4%, split evenly across two subtopics. One free mark a paper if the method is drilled.",
  },
  {
    chapter: "Complex Numbers",
    qCount: 46,
    pctTotal: 2.1,
    qPerPaper: 1.0,
    pctHard: 33,
    focus:
      "Algebraic Equations, Locus, and Cube Roots (24 · 46% HARD), Modulus, Argument, and Polar Form (22 · 18%). The two halves differ by 28 points of HARD — secure modulus and argument first. Greatest and least modulus on a disc is the same geometric move as the Circle chapter's extremum question.",
  },
  {
    chapter: "Applications of Definite Integral",
    qCount: 47,
    pctTotal: 2.1,
    qPerPaper: 1.0,
    pctHard: 36,
    focus:
      "Area Bounded by Curves, Axes, and Lines (43 · 33% HARD), Definite Integral as Application (4 · 75%). Effectively one subtopic — 91% of the chapter is area between curves.",
  },
  {
    chapter: "Pair of Straight Lines",
    qCount: 45,
    pctTotal: 2.0,
    qPerPaper: 1.0,
    pctHard: 40,
    focus:
      "Combined Equation and Condition for Pair of Lines (28 · 39% HARD), Angle, Distance, and Geometry of Pair (17 · 41%). Its perpendicularity test reads a + b = 0 rather than the slope product used elsewhere — the same condition in a different dialect.",
  },
  {
    chapter: "Permutations and Combinations",
    qCount: 43,
    pctTotal: 1.9,
    qPerPaper: 1.0,
    pctHard: 42,
    focus:
      "Selection and Arrangement with Constraints (33 · 42% HARD), Counting and Geometric Applications (10 · 40%). One question a paper at 42% HARD, and the constraint questions do not reduce to a formula — cost this chapter honestly before investing in it.",
  },
  {
    chapter: "Straight Line",
    qCount: 46,
    pctTotal: 2.1,
    qPerPaper: 0.96,
    pctHard: 22,
    focus:
      "Section Formula, Concurrency, Foot of Perpendicular, and Distance (27 · 19% HARD), Equation of Line — Rotation, Angle, and Bisector (19 · 26%). Cheap, and it underwrites Pair of Straight Lines and Circle — the return is larger than its own 0.96 per paper.",
  },
  {
    chapter: "Sets, Relations and Functions",
    qCount: 41,
    pctTotal: 1.8,
    qPerPaper: 0.73,
    pctHard: 12,
    focus:
      "12% HARD — the second-cheapest chapter in the bank after Linear Programming. Below the 0.9 q/paper line so it ships no playbook, but a genuine cheap-marks chapter and worth a short drill rather than a skip.",
  },
  {
    chapter: "Conic Sections",
    qCount: 19,
    pctTotal: 0.9,
    qPerPaper: 0.69,
    pctHard: 42,
    focus:
      "19 questions lifetime at 42% HARD, but the lifetime figure is the wrong lens — see the note. Below the playbook line on the 2021-2025 average and above it on 2025 alone.",
    status: "entered",
    note:
      "Entered with the 2025 syllabus shift: 3 questions in the whole bank before 2025, then 16 in 2025 alone. The lifetime rate of 0.69 understates it — anyone prepping from 2023-24 papers has never seen this chapter set.",
  },
  {
    chapter: "Measures of Dispersion",
    qCount: 32,
    pctTotal: 1.4,
    qPerPaper: 0.46,
    pctHard: 9,
    focus:
      "32 questions lifetime at 9% HARD — the second-lowest %HARD in the bank, and irrelevant, because the chapter is no longer set. See the note.",
    status: "dropped",
    note:
      "DROPPED for 2025. Ran 1.0 question per paper across the 29 shifts of 2023-24, then ZERO across all 14 papers of 2025. Its 9% HARD makes it look like a cheap chapter in a lifetime table, which is exactly the trap — do not spend time here.",
  },
  {
    chapter: "Sequences and Series",
    qCount: 10,
    pctTotal: 0.4,
    qPerPaper: 0.31,
    pctHard: 40,
    focus:
      "10 questions in 45 shifts at 40% HARD. Below the playbook line; revise it, do not drill it.",
  },
  {
    chapter: "Quadratic Equations",
    qCount: 5,
    pctTotal: 0.2,
    qPerPaper: 0.15,
    pctHard: 20,
    focus:
      "5 questions in 45 shifts — the thinnest chapter in the bank. Assumed knowledge from earlier chapters rather than a topic the paper sets in its own right.",
  },
];
