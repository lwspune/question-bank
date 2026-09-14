/**
 * Static content + numbers for the /guide/nda-maths route.
 *
 * Live CTA counts come from the existing /browse facet RPCs (see
 * src/app/guide/_components/BrowseLink.tsx); the narrative numbers here are a
 * snapshot updated manually when new papers land. `OVERVIEW.asOf` documents
 * the snapshot date so readers know what they're looking at.
 *
 * CHAPTER_TABLE drives the bank-breakdown table on the overview page. Each
 * row's `qCount` + `pctTotal` + `pctHard` + `subtopics[]` are SQL-derived
 * against the live bank as of `OVERVIEW.asOf`; `focus` is editorial — the top
 * 1–2 subtopics with counts plus any noteworthy context.
 *
 * The MARKS column is NOT stored — it is derived from `qCount` at render via
 * marksPerPaper() (src/lib/guide/marks.ts), so it can never drift away from
 * the question count it comes from.
 *
 * Re-deriving after a new paper lands (the counts here are PUBLIC + pyq only —
 * the pyq guard matters, NDA Maths also holds ~3,000 practice questions):
 *
 *   with q as (
 *     select c.name chapter, st.name subtopic, q.difficulty
 *     from questions q
 *     join chapters c on c.id = q.chapter_id
 *     join subtopics st on st.id = q.subtopic_id
 *     join subjects s on s.id = q.subject_id
 *     join exams e on e.id = q.exam_id
 *     where e.name ilike 'NDA' and s.name ilike 'Mathematics'
 *       and q.visibility = 'PUBLIC' and q.question_kind = 'pyq')
 *   select chapter, subtopic, count(*) n,
 *          round(100.0 * count(*) filter (where difficulty='HARD') / count(*))::int pct_hard
 *   from q group by 1, 2 order by 1, n desc;
 *
 * tests/guide-marks.test.ts asserts the structural invariants (subtopics sum
 * to their chapter, chapters sum to OVERVIEW.totalQ, both sorted descending),
 * so a transcription slip fails the gate rather than shipping silently.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-maths (or "" for the landing)
  label: string; // side-nav and breadcrumb label
  blurb: string; // one-line description for the landing-page card
};

/** The 6 main routes under /guide/nda-maths, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA Mathematics actually works — what the 2,280-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb: "Score 100+ marks with 50 hours of focused, evidence-led prep.",
  },
  {
    slug: "principles",
    label: "Principles",
    blurb:
      "79 atoms behind every question. Drill the 11 cross-chapter principles first.",
  },
  {
    slug: "compound-tricks",
    label: "Compound Tricks",
    blurb:
      "4 principle pairs that spike HARD — 40–67% HARD vs 22.1% bank average. The chains paper-setters love.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA Maths has shifted from 2017 to 2026, and what to practice first.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor patterns NDA reuses. The last-step verification rules that recover marks.",
  },
];

export type Overview = {
  totalQ: number;
  papers: number;
  chapters: number;
  principles: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date, e.g. "2026-05-17"
};

/** Snapshot of the bank's shape as of the date below. */
export const OVERVIEW: Overview = {
  totalQ: 2280,
  papers: 19,
  chapters: 31,
  principles: 79,
  difficulty: { easy: 677, moderate: 1098, hard: 505 },
  asOf: "2026-09-14",
};

/**
 * NDA Paper I marking. The bank is exactly 19 complete papers of 120
 * questions, so a chapter's bank count divides cleanly into "marks in one
 * paper" — see marksPerPaper(). NDA-2 2026 (written 2026-09-14) is the 19th.
 */
export const MARKING = {
  papers: 19,
  marksPerQuestion: 2.5,
  paperMarks: 300,
} as const;

export type SubtopicRow = {
  subtopic: string;
  qCount: number;
  /** % HARD within the subtopic (rounded integer). */
  pctHard: number;
};

export type ChapterRow = {
  chapter: string;
  qCount: number;
  /** % of bank total (1 decimal). */
  pctTotal: number;
  /** % HARD within chapter (rounded integer). */
  pctHard: number;
  /** Top 1–2 subtopics with counts, plus optional one-line context. */
  focus: string;
  /** Every subtopic in the chapter, question count descending. */
  subtopics: SubtopicRow[];
};

/** 31 NDA Maths chapters, ordered by question count descending. SQL-derived
 *  against the 2,280-q PUBLIC bank as of OVERVIEW.asOf. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Matrices & Determinants",
    qCount: 181,
    pctTotal: 7.9,
    pctHard: 30,
    focus:
      "Determinant Properties (61), Matrix Operations (34). " +
      "Highest-reliability chapter — 8–11 q/paper.",
    subtopics: [
      {
        subtopic: "Determinant Properties, Operations, and Sums",
        qCount: 61,
        pctHard: 48,
      },
      {
        subtopic: "Matrix Operations, Polynomials, and Equations",
        qCount: 34,
        pctHard: 12,
      },
      {
        subtopic: "Cofactors, Adjoint, and Inverse",
        qCount: 33,
        pctHard: 21,
      },
      {
        subtopic: "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation",
        qCount: 24,
        pctHard: 8,
      },
      {
        subtopic: "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
        qCount: 20,
        pctHard: 50,
      },
      {
        subtopic: "Linear Systems — Consistency, Cramer's Rule, Solution Space",
        qCount: 9,
        pctHard: 22,
      },
    ],
  },
  {
    chapter: "Probability",
    qCount: 176,
    pctTotal: 7.7,
    pctHard: 18,
    focus:
      "Counting dominates (90); Conditional/Bayes (31) is the harder slice. " +
      "Mostly classical.",
    subtopics: [
      {
        subtopic: "Probability via Counting",
        qCount: 90,
        pctHard: 20,
      },
      {
        subtopic: "Conditional Probability, Total Probability, and Bayes' Theorem",
        qCount: 31,
        pctHard: 13,
      },
      {
        subtopic: "Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive",
        qCount: 25,
        pctHard: 12,
      },
      {
        subtopic: "Independent Events",
        qCount: 17,
        pctHard: 18,
      },
      {
        subtopic: "Bounds on Probability",
        qCount: 13,
        pctHard: 31,
      },
    ],
  },
  {
    chapter: "Statistics",
    qCount: 165,
    pctTotal: 7.2,
    pctHard: 12,
    focus:
      "Central Tendency (75), Dispersion (47). Gentlest chapter in the bank " +
      "— best marks-per-hour.",
    subtopics: [
      {
        subtopic: "Measures of Central Tendency — Mean, Median, Mode",
        qCount: 75,
        pctHard: 13,
      },
      {
        subtopic: "Dispersion — Standard Deviation, Variance, Mean Deviation",
        qCount: 47,
        pctHard: 9,
      },
      {
        subtopic: "Regression and Correlation",
        qCount: 29,
        pctHard: 21,
      },
      {
        subtopic: "Frequency Distributions and Graphical Representation",
        qCount: 14,
        pctHard: 0,
      },
    ],
  },
  {
    chapter: "Trigonometric Identities",
    qCount: 145,
    pctTotal: 6.4,
    pctHard: 32,
    focus:
      "Compound Angle (42), Multi/Half-Angle (31), Product-to-Sum (27). " +
      "High-HARD — cherry-pick by subtopic.",
    subtopics: [
      {
        subtopic: "Compound Angle Formulas",
        qCount: 42,
        pctHard: 24,
      },
      {
        subtopic: "Multiple and Half-Angle Formulas",
        qCount: 31,
        pctHard: 42,
      },
      {
        subtopic: "Product-to-Sum and Sum-to-Product Identities",
        qCount: 27,
        pctHard: 44,
      },
      {
        subtopic: "Specific Values and Quadrants",
        qCount: 23,
        pctHard: 26,
      },
      {
        subtopic: "Maximum and Minimum of Trigonometric Expressions",
        qCount: 22,
        pctHard: 27,
      },
    ],
  },
  {
    chapter: "Functions",
    qCount: 115,
    pctTotal: 5.0,
    pctHard: 10,
    focus:
      "Domain/Range (49) is 2% HARD — the cheapest marks in the bank. Skip " +
      "Functional Equations.",
    subtopics: [
      {
        subtopic: "Domain, Range, and Function Properties",
        qCount: 49,
        pctHard: 2,
      },
      {
        subtopic: "Composition and Inverse of Functions",
        qCount: 29,
        pctHard: 24,
      },
      {
        subtopic: "Functional Equations",
        qCount: 20,
        pctHard: 10,
      },
      {
        subtopic: "Function Definition and Classification — Injectivity, Surjectivity, Bijectivity",
        qCount: 9,
        pctHard: 0,
      },
      {
        subtopic: "Greatest Integer Function",
        qCount: 8,
        pctHard: 25,
      },
    ],
  },
  {
    chapter: "Lines",
    qCount: 104,
    pctTotal: 4.6,
    pctHard: 20,
    focus:
      "Triangles/Quads (33), Equation+Slope (28), Distance+Section (27).",
    subtopics: [
      {
        subtopic: "Triangles, Quadrilaterals, and Polygons",
        qCount: 33,
        pctHard: 18,
      },
      {
        subtopic: "Equation, Slope, and Family of Lines",
        qCount: 28,
        pctHard: 14,
      },
      {
        subtopic: "Distance, Section, and Locus",
        qCount: 27,
        pctHard: 26,
      },
      {
        subtopic: "Angle Between Lines, Parallelism, and Perpendicularity",
        qCount: 16,
        pctHard: 25,
      },
    ],
  },
  {
    chapter: "Vectors",
    qCount: 102,
    pctTotal: 4.5,
    pctHard: 20,
    focus:
      "Cross/Triple Product (40), Dot Product (32). Four formulas cover ~70%.",
    subtopics: [
      {
        subtopic: "Cross Product and Triple Product",
        qCount: 40,
        pctHard: 28,
      },
      {
        subtopic: "Dot Product and Angle",
        qCount: 32,
        pctHard: 13,
      },
      {
        subtopic: "Magnitude, Components, Projection, and Direction Cosines",
        qCount: 13,
        pctHard: 8,
      },
      {
        subtopic: "Vector Geometry — Triangles, Parallelograms, Quadrilaterals",
        qCount: 11,
        pctHard: 9,
      },
      {
        subtopic: "Position Vectors and Section",
        qCount: 6,
        pctHard: 50,
      },
    ],
  },
  {
    chapter: "3D Geometry",
    qCount: 94,
    pctTotal: 4.1,
    pctHard: 22,
    focus:
      "Direction Cosines (25) leads; the rest splits evenly across Sphere, " +
      "Distance and the Plane.",
    subtopics: [
      {
        subtopic: "Direction Cosines and Ratios",
        qCount: 25,
        pctHard: 28,
      },
      {
        subtopic: "Distance, Section, and Collinearity in 3D",
        qCount: 22,
        pctHard: 27,
      },
      {
        subtopic: "Sphere",
        qCount: 20,
        pctHard: 20,
      },
      {
        subtopic: "The Plane",
        qCount: 16,
        pctHard: 19,
      },
      {
        subtopic: "The Straight Line in 3D",
        qCount: 11,
        pctHard: 9,
      },
    ],
  },
  {
    chapter: "Sequence & Series",
    qCount: 93,
    pctTotal: 4.1,
    pctHard: 20,
    focus:
      "AP (42) carries half the chapter, then GP (19). AM-GM is the " +
      "cross-chapter lever.",
    subtopics: [
      {
        subtopic: "Arithmetic Progressions",
        qCount: 44,
        pctHard: 14,
      },
      {
        subtopic: "Geometric Progressions",
        qCount: 20,
        pctHard: 5,
      },
      {
        subtopic: "Interrelating AP, GP and HP",
        qCount: 16,
        pctHard: 38,
      },
      {
        subtopic: "Special Series and Special Sums",
        qCount: 8,
        pctHard: 38,
      },
      {
        subtopic: "Harmonic Progressions and the Three Means",
        qCount: 5,
        pctHard: 60,
      },
    ],
  },
  {
    chapter: "Differentiation",
    qCount: 89,
    pctTotal: 3.9,
    pctHard: 24,
    focus:
      "Chain Rule + Logarithmic (51), Parametric/Implicit (20). " +
      "Differentiability questions overlap with Limits & Continuity.",
    subtopics: [
      {
        subtopic: "Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions",
        qCount: 51,
        pctHard: 16,
      },
      {
        subtopic: "Parametric, Implicit, and Higher-Order Derivatives",
        qCount: 20,
        pctHard: 50,
      },
      {
        subtopic: "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions",
        qCount: 18,
        pctHard: 17,
      },
    ],
  },
  {
    chapter: "Limits & Continuity",
    qCount: 87,
    pctTotal: 3.8,
    pctHard: 15,
    focus:
      "Continuity/Differentiability (36), Limit Techniques (34). Edge cases " +
      "with |x|, ⌊x⌋ are the lever.",
    subtopics: [
      {
        subtopic: "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory",
        qCount: 36,
        pctHard: 11,
      },
      {
        subtopic: "Limit Evaluation Techniques — L'Hôpital, Rationalization, Standard Forms",
        qCount: 34,
        pctHard: 15,
      },
      {
        subtopic: "One-Sided Limits, Greatest Integer, and Absolute Value Limits",
        qCount: 17,
        pctHard: 24,
      },
    ],
  },
  {
    chapter: "Permutation & Combination",
    qCount: 80,
    pctTotal: 3.5,
    pctHard: 20,
    focus:
      "Digit-Forming (21), Factorials (17), Arrangements with Restrictions " +
      "(17).",
    subtopics: [
      {
        subtopic: "Forming Numbers from Digits",
        qCount: 21,
        pctHard: 19,
      },
      {
        subtopic: "Arrangements with Restrictions",
        qCount: 17,
        pctHard: 24,
      },
      {
        subtopic: "Factorials and Binomial Coefficients",
        qCount: 17,
        pctHard: 29,
      },
      {
        subtopic: "Geometric Counting",
        qCount: 13,
        pctHard: 8,
      },
      {
        subtopic: "Combinations",
        qCount: 12,
        pctHard: 17,
      },
    ],
  },
  {
    chapter: "Application of Derivatives",
    qCount: 76,
    pctTotal: 3.3,
    pctHard: 16,
    focus:
      "Monotonicity/Extrema (40), Optimisation — AM-GM compound (31).",
    subtopics: [
      {
        subtopic: "Monotonicity, Extrema, and Critical Points",
        qCount: 40,
        pctHard: 15,
      },
      {
        subtopic: "Optimisation — Geometric, Trigonometric, AM-GM",
        qCount: 31,
        pctHard: 19,
      },
      {
        subtopic: "Tangents and Slopes",
        qCount: 5,
        pctHard: 0,
      },
    ],
  },
  {
    chapter: "Complex Numbers",
    qCount: 76,
    pctTotal: 3.3,
    pctHard: 21,
    focus:
      "Modulus/Argument (40), Cube Roots of Unity (18), Powers/Roots (18).",
    subtopics: [
      {
        subtopic: "Modulus, Argument, and Conjugate",
        qCount: 40,
        pctHard: 15,
      },
      {
        subtopic: "Cube Roots of Unity",
        qCount: 18,
        pctHard: 33,
      },
      {
        subtopic: "Powers and Roots",
        qCount: 18,
        pctHard: 22,
      },
    ],
  },
  {
    chapter: "Sets & Relations",
    qCount: 75,
    pctTotal: 3.3,
    pctHard: 12,
    focus:
      "Counting Sets + Inclusion-Exclusion (28), Set Operations (25). Easy " +
      "2–3 marks if given an hour.",
    subtopics: [
      {
        subtopic: "Counting Sets, Subsets, and Inclusion-Exclusion",
        qCount: 28,
        pctHard: 11,
      },
      {
        subtopic: "Set Operations, Identities, and Cartesian Products of Sets",
        qCount: 25,
        pctHard: 20,
      },
      {
        subtopic: "Relations — Properties, Cartesian Product, and Counting",
        qCount: 22,
        pctHard: 5,
      },
    ],
  },
  {
    chapter: "Definite Integration",
    qCount: 69,
    pctTotal: 3.0,
    pctHard: 19,
    focus:
      "Properties — King's, symmetry (32), |x|/floor integrals (17).",
    subtopics: [
      {
        subtopic: "Properties of Definite Integrals — Symmetry, King's, Odd/Even",
        qCount: 33,
        pctHard: 27,
      },
      {
        subtopic: "Integration of Absolute Value, Piecewise, and Greatest Integer Functions",
        qCount: 17,
        pctHard: 12,
      },
      {
        subtopic: "Fundamental Theorem, Periodic Integrals, and Leibniz Rule",
        qCount: 13,
        pctHard: 0,
      },
      {
        subtopic: "Area Under Curves",
        qCount: 3,
        pctHard: 0,
      },
      {
        subtopic: "Definite Integrals in Function Conditions",
        qCount: 3,
        pctHard: 67,
      },
    ],
  },
  {
    chapter: "Differential Equations",
    qCount: 67,
    pctTotal: 2.9,
    pctHard: 30,
    focus:
      "Separable/IVP (31), Order/Degree (23).",
    subtopics: [
      {
        subtopic: "Solving and Verifying ODEs — Separable, IVP, and Applications",
        qCount: 31,
        pctHard: 32,
      },
      {
        subtopic: "Order, Degree, and Solutions of ODE",
        qCount: 23,
        pctHard: 30,
      },
      {
        subtopic: "Formation of ODE from Curves and General Solutions",
        qCount: 13,
        pctHard: 23,
      },
    ],
  },
  {
    chapter: "Quadratic Equations",
    qCount: 67,
    pctTotal: 2.9,
    pctHard: 37,
    focus:
      "Vieta's Relations (29), Nature of Roots (21). High-HARD; AM-GM + ω " +
      "compounds live here.",
    subtopics: [
      {
        subtopic: "Vieta's Relations and Root-Coefficient Identities",
        qCount: 29,
        pctHard: 38,
      },
      {
        subtopic: "Nature of Roots and Boundary Conditions",
        qCount: 21,
        pctHard: 33,
      },
      {
        subtopic: "Special Quadratics — Parametric, Logarithmic, Constructed",
        qCount: 17,
        pctHard: 41,
      },
    ],
  },
  {
    chapter: "Binomial Theorem",
    qCount: 56,
    pctTotal: 2.5,
    pctHard: 18,
    focus:
      "Coefficients & Specific Terms (31), Sum Identities (14).",
    subtopics: [
      {
        subtopic: "Coefficients and Specific Terms in Expansion",
        qCount: 31,
        pctHard: 16,
      },
      {
        subtopic: "Sums of Binomial Coefficients — Alternating, Weighted, and Symmetric",
        qCount: 14,
        pctHard: 14,
      },
      {
        subtopic: "Integer and Fractional Parts of Binomial Expressions",
        qCount: 8,
        pctHard: 38,
      },
      {
        subtopic: "Remainders and Divisibility via Binomial Expansion",
        qCount: 3,
        pctHard: 0,
      },
    ],
  },
  {
    chapter: "Properties of Triangle",
    qCount: 52,
    pctTotal: 2.3,
    pctHard: 42,
    focus:
      "Sine/Cosine Rules (32), Triangle Identities (14). High-HARD — " +
      "punishing yield.",
    subtopics: [
      {
        subtopic: "Sine and Cosine Rules — Solving Triangles",
        qCount: 32,
        pctHard: 41,
      },
      {
        subtopic: "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle",
        qCount: 14,
        pctHard: 43,
      },
      {
        subtopic: "In-circle and Regular Polygon Geometry",
        qCount: 6,
        pctHard: 50,
      },
    ],
  },
  {
    chapter: "Indefinite Integration",
    qCount: 42,
    pctTotal: 1.8,
    pctHard: 21,
    focus:
      "Substitution (18), Standard Forms — exp/log (13).",
    subtopics: [
      {
        subtopic: "Integration by Substitution — Algebraic, Trigonometric, and Composite Forms",
        qCount: 18,
        pctHard: 22,
      },
      {
        subtopic: "Standard Forms — Exponential, Logarithmic, and Paired Trigonometric Integrals",
        qCount: 14,
        pctHard: 21,
      },
      {
        subtopic: "Integration by Partial Fractions",
        qCount: 7,
        pctHard: 29,
      },
      {
        subtopic: "Integration by Parts",
        qCount: 3,
        pctHard: 0,
      },
    ],
  },
  {
    chapter: "Conics",
    qCount: 40,
    pctTotal: 1.8,
    pctHard: 20,
    focus:
      "Ellipse (15), Parabola (14).",
    subtopics: [
      {
        subtopic: "Ellipse — Foci, Eccentricity, and Focal Distances",
        qCount: 15,
        pctHard: 13,
      },
      {
        subtopic: "Parabola — Equation, Properties, and Latus Rectum",
        qCount: 14,
        pctHard: 21,
      },
      {
        subtopic: "Conic Sections — Identification and Eccentricity Comparison",
        qCount: 7,
        pctHard: 43,
      },
      {
        subtopic: "Hyperbola — Foci and Eccentricity",
        qCount: 4,
        pctHard: 0,
      },
    ],
  },
  {
    chapter: "Inverse Trigonometry",
    qCount: 36,
    pctTotal: 1.6,
    pctHard: 22,
    focus:
      "Identities + Sum-Difference (17), Composite Evaluation (13).",
    subtopics: [
      {
        subtopic: "Identities, Properties, and Sum-Difference Formulas",
        qCount: 17,
        pctHard: 12,
      },
      {
        subtopic: "Evaluation of Composite Inverse Trigonometric Expressions",
        qCount: 13,
        pctHard: 31,
      },
      {
        subtopic: "Solving Inverse Trigonometric Equations and Geometric Applications",
        qCount: 6,
        pctHard: 33,
      },
    ],
  },
  {
    chapter: "Trigonometric Equations",
    qCount: 34,
    pctTotal: 1.5,
    pctHard: 32,
    focus:
      "Specific Forms — double-angle, product (13), General Solutions (14).",
    subtopics: [
      {
        subtopic: "General Solutions and Counting Solutions of Trigonometric Equations",
        qCount: 14,
        pctHard: 43,
      },
      {
        subtopic: "Solving Specific Forms — Double-Angle, Product, Logarithmic, and Vieta",
        qCount: 13,
        pctHard: 15,
      },
      {
        subtopic: "Simultaneous and Combined Trigonometric Systems",
        qCount: 7,
        pctHard: 43,
      },
    ],
  },
  {
    chapter: "Binomial Distribution",
    qCount: 31,
    pctTotal: 1.4,
    pctHard: 10,
    focus:
      "Computing Probabilities (15), Mean/Variance (16). One chapter, two " +
      "formulas — 60 minutes, 2 marks.",
    subtopics: [
      {
        subtopic: "Mean, Variance, and Parameter Estimation in B(n, p)",
        qCount: 16,
        pctHard: 13,
      },
      {
        subtopic: "Computing Binomial Probabilities — Exact, At-Least, and Complementary Events",
        qCount: 15,
        pctHard: 7,
      },
    ],
  },
  {
    chapter: "Circles",
    qCount: 28,
    pctTotal: 1.2,
    pctHard: 39,
    focus:
      "Circle Equation — centre/radius (11) is the soft half; Concyclicity " +
      "(9) runs 78% HARD.",
    subtopics: [
      {
        subtopic: "Circle Equation — Centre, Radius, Diameter, and Properties",
        qCount: 12,
        pctHard: 0,
      },
      {
        subtopic: "Circles Through Given Points and Concyclicity",
        qCount: 9,
        pctHard: 78,
      },
      {
        subtopic: "Inscribed Geometry, Tangents, and Segments",
        qCount: 7,
        pctHard: 57,
      },
    ],
  },
  {
    chapter: "Applications of Integration",
    qCount: 27,
    pctTotal: 1.2,
    pctHard: 19,
    focus:
      "Area Bounded by Curve (18).",
    subtopics: [
      {
        subtopic: "Area Bounded by a Curve, Lines, and Axes",
        qCount: 18,
        pctHard: 17,
      },
      {
        subtopic: "Area Between Two Curves and Intersection Points",
        qCount: 9,
        pctHard: 22,
      },
    ],
  },
  {
    chapter: "Logarithms",
    qCount: 27,
    pctTotal: 1.2,
    pctHard: 19,
    focus:
      "Identities + Change of Base (16), Log Equations (11).",
    subtopics: [
      {
        subtopic: "Logarithm Identities, Change of Base, and Sums",
        qCount: 16,
        pctHard: 13,
      },
      {
        subtopic: "Solving Logarithmic Equations and Applications",
        qCount: 11,
        pctHard: 27,
      },
    ],
  },
  {
    chapter: "Height & Distance",
    qCount: 26,
    pctTotal: 1.1,
    pctHard: 69,
    focus:
      "Angles of Elevation (18). Hardest chapter in the bank — 71% HARD, " +
      "and no soft subtopic to retreat to.",
    subtopics: [
      {
        subtopic: "Heights and Distances from Angles of Elevation",
        qCount: 18,
        pctHard: 67,
      },
      {
        subtopic: "Shadows, Leaning Structures, and Special Geometry",
        qCount: 8,
        pctHard: 75,
      },
    ],
  },
  {
    chapter: "Binary Numbers",
    qCount: 14,
    pctTotal: 0.6,
    pctHard: 29,
    focus:
      "Tiny chapter — 0.7 q/paper average.",
    subtopics: [
      {
        subtopic: "Binary Arithmetic — Addition, Division, and Algebraic Identities",
        qCount: 7,
        pctHard: 43,
      },
      {
        subtopic: "Binary Representation and Number Theory",
        qCount: 4,
        pctHard: 25,
      },
      {
        subtopic: "Binary to Decimal Conversion",
        qCount: 3,
        pctHard: 0,
      },
    ],
  },
  {
    chapter: "Linear Inequalities",
    qCount: 6,
    pctTotal: 0.3,
    pctHard: 0,
    focus:
      "Near-irrelevant — 0.3 q/paper, zero HARD across the bank.",
    subtopics: [
      {
        subtopic: "Linear Systems and Feasible Regions",
        qCount: 6,
        pctHard: 0,
      },
    ],
  },
];
