/**
 * Playbook catalog for /guide/mht-cet-maths/playbooks.
 *
 * A "playbook" here = one chapter, treated end-to-end (the NDA Physics
 * Template C shape). MHT-CET Maths has 27 chapters and 85 subtopics; several
 * chapters are 1-3 subtopics, so the chapter is the right unit.
 *
 * WHY 22 AND NOT 27. Playbooks ship for every chapter at >= 0.9 q/paper on
 * RECENT weightage (2024-2025, 26 shifts). The four below the line are
 * deliberately excluded and covered in a short tail block on /strategy:
 *   Conic Sections 0.69 - Measures of Dispersion 0.46 - Sequences 0.31 -
 *   Quadratic Equations 0.15 (5 questions in 45 shifts).
 * Sets, Relations and Functions (0.73) also sits below the line but is named
 * in the Quick-Win strand with a direct /browse drill, because it is a
 * genuine cheap-marks chapter (12% HARD).
 *
 * WEIGHTAGE IS RECENT, NOT LIFETIME, and that matters: MHT-CET moved its
 * syllabus for 2025. Measures of Dispersion ran 1.0/paper across 29 shifts in
 * 2023-24 and then scored ZERO across all 14 papers of 2025, while Conic
 * Sections went 3 -> 16. A lifetime average hides both.
 *
 * `chapter` + `subtopics[]` are canonical DB names, matched at request time
 * via resolveTaxonomy -> UUIDs for /browse links. Renaming a chapter in the
 * taxonomy without updating this file silently produces an empty drill - see
 * the shipped-chapter-rename procedure.
 *
 * `bucket` maps each playbook to one of the 3 strategy strands in strategy.ts.
 * Strand sizes are deliberately uneven - they reflect the bank's shape:
 *   - cornerstone (6):  23.4 q/paper = 47% of a 50-question paper
 *   - quickwin    (5):  low %HARD, banked early
 *   - longtail   (11):  ~1 q/paper each, mostly 33-56% HARD
 */

export type PlaybookBucket = "cornerstone" | "quickwin" | "longtail";

export type Playbook = {
  slug: string;
  name: string;
  /** Single-line summary shown on the index card. */
  summary: string;
  chapter: string;
  /** All subtopics in `chapter` that this playbook covers. */
  subtopics: string[];
  /** Lifetime PUBLIC PYQ count for the chapter. */
  qCount: number;
  /** Questions per paper on 2024-2025 shifts - the number that drives tiering. */
  qPerPaper: number;
  pctHard: number;
  bucket: PlaybookBucket;
};

export const PLAYBOOKS: Playbook[] = [
  // Cornerstone strand (6 playbooks, 23.4 q/paper = 47% of the paper)
  {
    slug: "line-and-plane",
    name: "Line and Plane",
    summary:
      "205 q - 4.96/paper - 42% HARD. The single heaviest chapter on recent papers. Seven subtopics, and the HARD is spread rather than concentrated (top two carry only 47%), so there is no cherry-pick here: you own the whole chapter or you lose ten marks.",
    chapter: "Line and Plane",
    subtopics: [
      "Plane — Equation, Normal, and Construction",
      "Intersection, Coplanarity, and Skew Lines",
      "Distances in 3-D",
      "Angles — Line, Plane, and Direction Conditions",
      "Line — Equation, Direction Cosines, and Vector Form",
      "Foot of Perpendicular, Image, and Projection",
      "Tetrahedron Geometry — Centroid, Volume, and Vertices",
    ],
    qCount: 205,
    qPerPaper: 4.96,
    pctHard: 42,
    bucket: "cornerstone",
  },
  {
    slug: "vectors",
    name: "Vectors",
    summary:
      "228 q - 4.81/paper - 55% HARD. The largest chapter in the bank and the hardest of the cornerstones. Scalar Triple Product (71 q, 72% HARD) and Cross Product (66 q, 64%) carry 74% of its HARD between them, so this chapter DOES cherry-pick: secure Dot Product (50 q, 28% HARD) first.",
    chapter: "Vectors",
    subtopics: [
      "Scalar Triple Product, Coplanarity, and Volume",
      "Cross Product, Angle, and Area",
      "Dot Product, Angle, and Perpendicularity",
      "Vector Geometry — Section Formula, Triangle, and Parallelogram",
      "Linear Combinations, Collinearity, and Coplanarity",
      "Magnitude, Components, and Unit Vectors",
    ],
    qCount: 228,
    qPerPaper: 4.81,
    pctHard: 55,
    bucket: "cornerstone",
  },
  {
    slug: "applications-of-derivative",
    name: "Applications of Derivative",
    summary:
      "183 q - 3.81/paper - 23% HARD. The cheapest cornerstone by some distance, and the best marks-per-hour chapter on the paper. Seven subtopics, none above 31% HARD; Approximations using Differentials is 11 q at 0% HARD.",
    chapter: "Applications of Derivative",
    subtopics: [
      "Maxima, Minima, and Optimisation",
      "Rate of Change and Related Rates",
      "Tangents, Normals, and the Slope of a Curve",
      "Increasing and Decreasing Functions",
      "Rolle's Theorem and Mean Value Theorem",
      "Approximations using Differentials",
      "Angle Between Curves and Orthogonality",
    ],
    qCount: 183,
    qPerPaper: 3.81,
    pctHard: 23,
    bucket: "cornerstone",
  },
  {
    slug: "differential-equations",
    name: "Differential Equations",
    summary:
      "144 q - 3.35/paper - 38% HARD. Six subtopics that split cleanly by SOLUTION METHOD, which is exactly how the questions are set. Order/Degree/Formation (33 q, 24% HARD) is recognition work and near-free; Linear (Integrating Factor) at 63% HARD is where the chapter gets expensive.",
    chapter: "Differential Equations",
    subtopics: [
      "Growth, Decay, and Continuous Models",
      "Order, Degree, Formation of ODE, and Verification of Solutions",
      "Variable-Separable Equations",
      "Linear Differential Equations (Integrating Factor)",
      "Homogeneous and Reducible Equations",
      "Newton's Law of Cooling",
    ],
    qCount: 144,
    qPerPaper: 3.35,
    pctHard: 38,
    bucket: "cornerstone",
  },
  {
    slug: "indefinite-integration",
    name: "Indefinite Integration",
    summary:
      "159 q - 3.35/paper - 51% HARD. A cornerstone you cannot skip and cannot rush. Substitution alone is 51 q; Trigonometric Integrals (Rational forms) runs 74% HARD, the highest of any subtopic in the subject. Foundations plus Trig Powers are 20 q at ~10% HARD - take those first.",
    chapter: "Indefinite Integration",
    subtopics: [
      "Integration by Substitution",
      "Trigonometric Integrals - Rational and Substitution Forms",
      "Rational Functions and Partial Fractions",
      "Integration by Parts",
      "Trigonometric Integrals - Powers and Identities",
      "Foundations and Standard Formulae",
    ],
    qCount: 159,
    qPerPaper: 3.35,
    pctHard: 51,
    bucket: "cornerstone",
  },
  {
    slug: "differentiation",
    name: "Differentiation",
    summary:
      "141 q - 3.15/paper - 47% HARD. Method-pure subtopics, each drilling one technique. Inverse-trig differentiation (39 q) is the biggest single block. Derivative of One Function with respect to Another is only 7 q but 71% HARD - the worst marks-per-minute cell in the chapter.",
    chapter: "Differentiation",
    subtopics: [
      "Inverse Functions & Inverse Trigonometric Differentiation",
      "Implicit Differentiation & Special Forms",
      "Logarithmic Differentiation",
      "Foundations, Chain Rule & Differentiability",
      "Parametric, Higher-Order Derivatives & Relations",
      "Derivative of One Function with Respect to Another",
    ],
    qCount: 141,
    qPerPaper: 3.15,
    pctHard: 47,
    bucket: "cornerstone",
  },

  // Quick-Win strand (5 playbooks - bank these first)
  {
    slug: "linear-programming",
    name: "Linear Programming",
    summary:
      "46 q - 1.00/paper - 4% HARD. The lowest-HARD chapter in the subject, and one of its two subtopics (Objective Function, 23 q) has NEVER produced a HARD question. Two marks that should take under a minute. Do this first, every time.",
    chapter: "Linear Programming",
    subtopics: [
      "Feasible Region — Identification, Constraints, Classification",
      "Objective Function — Maximisation and Minimisation",
    ],
    qCount: 46,
    qPerPaper: 1.0,
    pctHard: 4,
    bucket: "quickwin",
  },
  {
    slug: "probability-distribution",
    name: "Probability Distribution",
    summary:
      "115 q - 2.65/paper - 20% HARD. The highest-weight Quick-Win, worth over five marks a paper at a fifth the HARD rate of the calculus chapters. Classical Probability (21 q) runs 10% HARD; only Bayes and Conditional (26 q, 31%) has any real teeth.",
    chapter: "Probability Distribution",
    subtopics: [
      "Expectation, Variance and Standard Deviation",
      "Discrete Random Variables, PMF and CDF",
      "Conditional Probability, Independence and Bayes' Theorem",
      "Classical Probability, Addition Theorem and Odds",
    ],
    qCount: 115,
    qPerPaper: 2.65,
    pctHard: 20,
    bucket: "quickwin",
  },
  {
    slug: "mathematical-logic",
    name: "Mathematical Logic",
    summary:
      "88 q - 1.92/paper - 31% HARD. The one chapter in MHT-CET Maths with its own execution mode: 70% of its stems ask which statement is true, against roughly 0% everywhere else. Its 31% HARD overstates the cost, because the difficulty is front-loaded into learning ONE technique (build the truth table) that then applies to every question.",
    chapter: "Mathematical Logic",
    subtopics: [
      "Negation, Equivalence, Tautology, and Switch Circuits",
      "Truth Tables and Truth Values",
      "Converse, Inverse, and Contrapositive",
    ],
    qCount: 88,
    qPerPaper: 1.92,
    pctHard: 31,
    bucket: "quickwin",
  },
  {
    slug: "binomial-distribution",
    name: "Binomial Distribution",
    summary:
      "60 q - 1.27/paper - 22% HARD. A small, closed chapter with four subtopics and no surprises. Mean, Variance and Standard Deviation of a binomial variable (15 q) runs 13% HARD and is pure formula recall.",
    chapter: "Binomial Distribution",
    subtopics: [
      "Computing Binomial Probabilities",
      "Parameter Estimation and the Probability Ratio",
      "Mean, Variance and Standard Deviation of a Binomial Variable",
      "The Binomial Setting and Probability Mass Function",
    ],
    qCount: 60,
    qPerPaper: 1.27,
    pctHard: 22,
    bucket: "quickwin",
  },
  {
    slug: "straight-line",
    name: "Straight Line",
    summary:
      "46 q - 0.96/paper - 22% HARD. Two broad subtopics, both routine coordinate geometry. Section Formula, Concurrency and Foot of Perpendicular (27 q) is 19% HARD and shares its whole toolkit with Line and Plane, so it costs almost nothing on top of a cornerstone you already own.",
    chapter: "Straight Line",
    subtopics: [
      "Section Formula, Concurrency, Foot of Perpendicular, and Distance",
      "Equation of Line — Rotation, Angle, and Bisector",
    ],
    qCount: 46,
    qPerPaper: 0.96,
    pctHard: 22,
    bucket: "quickwin",
  },

  // Long tail (11 playbooks - ~1 q/paper each, mostly expensive)
  {
    slug: "limits",
    name: "Limits",
    summary:
      "93 q - 2.08/paper - 56% HARD. The hardest chapter in the subject by rate, and unusually it does NOT cherry-pick: both its subtopics sit above 54% HARD. Continuity at a Point (47 q) is parameter-hunting; Limit Evaluation (46 q) is technique recognition.",
    chapter: "Limits",
    subtopics: [
      "Continuity at a Point — Finding Parameters",
      "Limit Evaluation Techniques",
    ],
    qCount: 93,
    qPerPaper: 2.08,
    pctHard: 56,
    bucket: "longtail",
  },
  {
    slug: "trigonometry-ii",
    name: "Trigonometry - II",
    summary:
      "90 q - 2.08/paper - 49% HARD. Dominated by Properties of Triangles (52 q, sine, cosine and projection rules). Note the taxonomy overlap: this chapter carries an Inverse Trigonometry subtopic (21 q) that duplicates the standalone Inverse Trigonometric Functions chapter - drill both or you will miss half the inverse-trig questions.",
    chapter: "Trigonometry - II",
    subtopics: [
      "Properties of Triangles — Sine/Cosine Rules and Projection",
      "Inverse Trigonometry — Identities, Equations, and Principal Values",
      "Trigonometric Identities and Compound/Half-Angle Formulas",
    ],
    qCount: 90,
    qPerPaper: 2.08,
    pctHard: 49,
    bucket: "longtail",
  },
  {
    slug: "inverse-trigonometric-functions",
    name: "Inverse Trigonometric Functions",
    summary:
      "73 q - 2.04/paper - 37% HARD. A single-subtopic chapter, so there is nothing to cherry-pick: it is one 73-question block of identities, equations, principal values and sums. Its weightage has RISEN (1.66 lifetime to 2.04 recent).",
    chapter: "Inverse Trigonometric Functions",
    subtopics: [
      "Inverse Trigonometric Functions — Identities, Equations, Principal Values, and Sums",
    ],
    qCount: 73,
    qPerPaper: 2.04,
    pctHard: 37,
    bucket: "longtail",
  },
  {
    slug: "trigonometry-i",
    name: "Trigonometry - I",
    summary:
      "99 q - 1.85/paper - 37% HARD. Trig Identities, Compound Angle and Equations is 77 of its 99 questions. Weightage has FALLEN (2.20 lifetime to 1.85 recent), the largest decline of any live chapter.",
    chapter: "Trigonometry - I",
    subtopics: [
      "Trig Identities, Compound Angle, and Equations",
      "Properties of Triangle",
    ],
    qCount: 99,
    qPerPaper: 1.85,
    pctHard: 37,
    bucket: "longtail",
  },
  {
    slug: "definite-integration",
    name: "Definite Integration",
    summary:
      "73 q - 1.85/paper - 45% HARD. Two subtopics. Symmetry, King's Property and Absolute Value (42 q, 38% HARD) is the one to own: those questions collapse in a line once you spot the property, which is the highest-leverage recognition in the calculus block.",
    chapter: "Definite Integration",
    subtopics: [
      "Symmetry, King's Property, and Absolute Value",
      "Substitution and Standard Form",
    ],
    qCount: 73,
    qPerPaper: 1.85,
    pctHard: 45,
    bucket: "longtail",
  },
  {
    slug: "determinants-and-matrices",
    name: "Determinants and Matrices",
    summary:
      "50 q - 1.12/paper - 48% HARD. Small and expensive. Adjoint, Determinant and the A adj(A) identity is 14 q at 64% HARD. The compensation is that its identities are memorisable and reusable, unlike most of the long tail.",
    chapter: "Determinants and Matrices",
    subtopics: [
      "Inverse, Cayley-Hamilton, and Matrix Polynomial",
      "Adjoint, Determinant, and A·adj(A) Identity",
      "System of Linear Equations and Symmetric Matrices",
    ],
    qCount: 50,
    qPerPaper: 1.12,
    pctHard: 48,
    bucket: "longtail",
  },
  {
    slug: "circle",
    name: "Circle",
    summary:
      "47 q - 1.04/paper - 38% HARD. Tangent, Locus and Equation Construction is 27 of its 47 q. Two Circles (tangency, common tangents) is only 9 q but 56% HARD, the chapter's expensive corner.",
    chapter: "Circle",
    subtopics: [
      "Tangent, Locus, and Equation Construction",
      "Equation of Circle from Diameter, Centre, and Concentric Conditions",
      "Two Circles — Tangency, Common Tangents, and Relative Position",
    ],
    qCount: 47,
    qPerPaper: 1.04,
    pctHard: 38,
    bucket: "longtail",
  },
  {
    slug: "complex-numbers",
    name: "Complex Numbers",
    summary:
      "46 q - 1.00/paper - 33% HARD. Splits cleanly in two. Modulus, Argument and Polar Form (22 q) runs 18% HARD and is the half worth owning; Algebraic Equations, Locus and Cube Roots (24 q) is 46%.",
    chapter: "Complex Numbers",
    subtopics: [
      "Algebraic Equations, Locus, and Cube Roots",
      "Modulus, Argument, and Polar Form",
    ],
    qCount: 46,
    qPerPaper: 1.0,
    pctHard: 33,
    bucket: "longtail",
  },
  {
    slug: "applications-of-definite-integral",
    name: "Applications of Definite Integral",
    summary:
      "47 q - 1.00/paper - 36% HARD. Effectively one subtopic: Area Bounded by Curves, Axes, and Lines is 43 of its 47 q. A single, well-defined skill, which makes it a cheaper page than its HARD rate suggests.",
    chapter: "Applications of Definite Integral",
    subtopics: [
      "Area Bounded by Curves, Axes, and Lines",
      "Definite Integral as Application",
    ],
    qCount: 47,
    qPerPaper: 1.0,
    pctHard: 36,
    bucket: "longtail",
  },
  {
    slug: "pair-of-straight-lines",
    name: "Pair of Straight Lines",
    summary:
      "45 q - 1.00/paper - 40% HARD. A closed, formula-driven chapter. Every question reduces to reading a, h and b out of a combined equation and applying one of a short list of conditions, which makes it more learnable than its 40% suggests.",
    chapter: "Pair of Straight Lines",
    subtopics: [
      "Combined Equation and Condition for Pair of Lines",
      "Angle, Distance, and Geometry of Pair",
    ],
    qCount: 45,
    qPerPaper: 1.0,
    pctHard: 40,
    bucket: "longtail",
  },
  {
    slug: "permutations-and-combinations",
    name: "Permutations and Combinations",
    summary:
      "43 q - 1.00/paper - 42% HARD. The least mechanical chapter on the paper: no formula rescues a misread constraint. Selection and Arrangement with Constraints is 33 of its 43 q. One question a paper, and the one most likely to eat five minutes.",
    chapter: "Permutations and Combinations",
    subtopics: [
      "Selection and Arrangement with Constraints",
      "Counting and Geometric Applications",
    ],
    qCount: 43,
    qPerPaper: 1.0,
    pctHard: 42,
    bucket: "longtail",
  },
];

/** Every playbook slug, in catalog order. Drives generateStaticParams. */
export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

/** Playbooks in one strand, catalog order preserved. */
export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
