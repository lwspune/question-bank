/**
 * Playbook catalog for /guide/mht-cet-maths/playbooks.
 *
 * A "playbook" here = one chapter, treated end-to-end (the NDA Physics
 * Template C shape). MHT-CET Maths has 27 chapters and 83 subtopics; several
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
    slug: "trigonometric-functions",
    name: "Trigonometric Functions",
    summary:
      "168 q - 4.31/paper - 41% HARD. The Std XII trigonometry chapter and the fourth-largest in the bank, holding solution of triangle and inverse trigonometry under one heading. Two subtopics of near-equal cost, so it is drilled whole. RISING (3.73 lifetime to 4.31 recent), the steepest climb of any cornerstone.",
    chapter: "Trigonometric Functions",
    subtopics: [
      "Inverse Trigonometric Functions",
      "Solution of Triangle — Sine, Cosine and Projection Rules",
    ],
    qCount: 168,
    qPerPaper: 4.31,
    pctHard: 41,
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
      "162 q - 3.41/paper - 52% HARD. A cornerstone you cannot skip and cannot rush. Substitution alone is 52 q; Trigonometric Integrals (Rational forms) runs 75% HARD, the highest of any subtopic in the subject. Foundations plus Trig Powers are 21 q at ~14% HARD - take those first.",
    chapter: "Indefinite Integration",
    subtopics: [
      "Integration by Substitution",
      "Trigonometric Integrals - Rational and Substitution Forms",
      "Rational Functions and Partial Fractions",
      "Integration by Parts",
      "Trigonometric Integrals - Powers and Identities",
      "Foundations and Standard Formulae",
    ],
    qCount: 162,
    qPerPaper: 3.41,
    pctHard: 52,
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
      "45 q - 0.98/paper - 4% HARD. The lowest-HARD chapter in the subject: three of its four notes pages have NEVER produced a HARD question, and both HARD ones are reading constraints off a figure. Two marks that should take under a minute. Do this first, every time.",
    chapter: "Linear Programming",
    subtopics: [
      "Feasible Region — Half-Plane Tests, Bounded, Unbounded and Empty",
      "Reading Constraints Off a Shaded Region",
      "Corner-Point Method — Maximum and Minimum of the Objective Function",
      "Formulation and Special Cases — Word Problems and Infinitely Many Optima",
    ],
    qCount: 45,
    qPerPaper: 0.98,
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
      "88 q - 1.92/paper - 31% HARD. The one chapter in MHT-CET Maths with its own execution mode: 70% of its stems ask which statement is true, against roughly 0% everywhere else. Its 31% HARD overstates the cost, because the difficulty is front-loaded into learning ONE technique (build the truth table) that then applies to every question - and it is not spread evenly: Switching Circuits is 12 q at 67% HARD while Negation is 14 q at 14%.",
    chapter: "Mathematical Logic",
    subtopics: [
      "Statements, Connectives and Truth Tables",
      "Finding Truth Values of Component Statements",
      "Negation of Statements and Quantifiers",
      "Converse, Inverse, and Contrapositive",
      "Logical Equivalence and Algebra of Statements",
      "Switching Circuits",
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
      "44 q - 0.92/paper - 20% HARD. Four notes pages of routine coordinate geometry; every HARD question sits on the slope-and-angle page (15 q, 33%), and the distance page shares its whole toolkit with Line and Plane, so it costs almost nothing on top of a cornerstone you already own.",
    chapter: "Straight Line",
    subtopics: [
      "Slope, Angle Between Lines and Rotation",
      "Forms of a Line, Intersections and Concurrency",
      "Section Formula, Midpoints and Rectangles",
      "Distance — From a Point, Between Parallels, Along a Direction and the Foot of the Perpendicular",
    ],
    qCount: 44,
    qPerPaper: 0.92,
    pctHard: 20,
    bucket: "quickwin",
  },

  // Long tail (11 playbooks - ~1 q/paper each, mostly expensive)
  {
    slug: "limits",
    name: "Limits",
    summary:
      "89 q - 1.99/paper - 55% HARD. The hardest chapter in the subject by rate, and unusually it does NOT cherry-pick: the limit pages and the continuity pages sit at the same difficulty. Four limit toolkits (existence and infinity, algebraic, trigonometric, exponential-logarithmic) feed three continuity pages (a single point, piecewise junctions, the [x] and |x| discontinuities).",
    chapter: "Limits",
    subtopics: [
      "Limits — Existence, One-Sided Limits and Limits at Infinity",
      "Algebraic Limits — Factorisation, Rationalisation and the xⁿ − aⁿ Form",
      "Trigonometric Limits — sin x/x and the 1 − cos x Family",
      "Exponential, Logarithmic and 1^∞ Limits",
      "Continuity at a Point — Finding f(c) and the Parameter",
      "Continuity of Piecewise Functions — Junction Conditions and Parameter Systems",
      "Discontinuities of [x], |x| and sgn x — Counting the Points",
    ],
    qCount: 89,
    qPerPaper: 1.99,
    pctHard: 55,
    bucket: "longtail",
  },
  {
    slug: "trigonometry-i",
    name: "Trigonometry - I",
    summary:
      "77 q - 1.31/paper - 36% HARD. One undivided subtopic that MIXES Std XI compound and multiple angles with Std XII trigonometric equations and general solutions. Weightage has FALLEN (1.71 lifetime to 1.31 recent) while its Std XII neighbour Trigonometric Functions climbs - if trigonometry hours are limited, they belong there first.",
    chapter: "Trigonometry - I",
    subtopics: [
      "Trig Identities, Compound Angle, and Equations",
    ],
    qCount: 77,
    qPerPaper: 1.31,
    pctHard: 36,
    bucket: "longtail",
  },
  {
    slug: "definite-integration",
    name: "Definite Integration",
    summary:
      "68 q - 1.72/paper - 47% HARD. Five pages: the evaluation toolkit (standard forms, substitution with changed limits, by parts), the trigonometric block (tan x = t, half-angle forms), then the three properties that collapse a question in a line - odd/even symmetry, King's property with the f/(f + g) family, and modulus/greatest-integer splitting. The property pages are 43 of the 68 q and the highest-leverage recognition in the calculus block.",
    chapter: "Definite Integration",
    subtopics: [
      "Evaluating Definite Integrals — Standard Forms, Algebraic Substitution and By Parts",
      "Trigonometric Definite Integrals — tan x = t, Half-Angle Forms and Powers",
      "Odd and Even Integrands — Symmetric Limits",
      "King's Property — f(a + b − x) and the f/(f + g) Family",
      "Modulus and Greatest-Integer Integrands — Split the Interval",
    ],
    qCount: 68,
    qPerPaper: 1.72,
    pctHard: 47,
    bucket: "longtail",
  },
  {
    slug: "determinants-and-matrices",
    name: "Determinants and Matrices",
    summary:
      "49 q - 1.10/paper - 49% HARD. Small and expensive. The determinant and adjoint identities page is 16 q at 69% HARD - the chapter's hardest corner and its most learnable, since three recalled identities answer most of it. The compensation is that its identities are memorisable and reusable, unlike most of the long tail.",
    chapter: "Determinants and Matrices",
    subtopics: [
      "Determinants, Cofactors and the Adjoint Identities",
      "Inverse of a Matrix — Adjoint Formula, Products and Verification",
      "Cayley–Hamilton, Matrix Polynomials and Powers",
      "Systems of Linear Equations and Symmetric, Skew-Symmetric Matrices",
    ],
    qCount: 49,
    qPerPaper: 1.1,
    pctHard: 49,
    bucket: "longtail",
  },
  {
    slug: "circle",
    name: "Circle",
    summary:
      "46 q - 1.02/paper - 37% HARD. Five notes pages. Tangents (14 q, 50% HARD) and Two Circles (8 q, 50%) are the expensive corners; the equation page is the cheap entry and the distance page is the greatest-and-least move shared with Complex Numbers.",
    chapter: "Circle",
    subtopics: [
      "Equation of a Circle — Centre-Radius, General, Diameter and Parametric Forms",
      "Concentric Circles and Circles Touching a Line or an Axis",
      "Tangents — At a Point, With a Given Slope, From an External Point and Their Loci",
      "Distance From a Point to a Circle — Greatest, Least, a Line Cutting the Circle and the Segment Area",
      "Two Circles — Touching, Common Tangents and Relative Position",
    ],
    qCount: 46,
    qPerPaper: 1.02,
    pctHard: 37,
    bucket: "longtail",
  },
  {
    slug: "complex-numbers",
    name: "Complex Numbers",
    summary:
      "45 q - 0.98/paper - 31% HARD. Three pages in notes order. Modulus and Argument (18 q, 28% HARD) is the half worth owning; Algebra with the cube roots of unity (15 q, 47%) is the expensive corner; Locus (12 q, 17%) is one geometric idea - a modulus is a distance.",
    chapter: "Complex Numbers",
    subtopics: [
      "Algebra of Complex Numbers — Conjugates, Powers of i and Cube Roots of Unity",
      "Modulus and Argument — Polar Form, De Moivre and Square Roots",
      "Locus in the Argand Plane — Circles, Lines and Greatest/Least Modulus",
    ],
    qCount: 45,
    qPerPaper: 0.98,
    pctHard: 31,
    bucket: "longtail",
  },
  {
    slug: "applications-of-definite-integral",
    name: "Applications of Definite Integral",
    summary:
      "44 q - 0.94/paper - 32% HARD. Three pages: area under one curve (14 q, 14% HARD - the cheapest page in the strand), area between two curves once the intersections are found (21 q, 38%), and the circle, ellipse and hyperbola regions that need the standard root integrals (9 q, 44%). One well-defined skill, which makes it a cheaper page than its HARD rate suggests.",
    chapter: "Applications of Definite Integral",
    subtopics: [
      "Area Under a Curve — Between a Curve and an Axis",
      "Area Between Two Curves — Intersections First",
      "Areas of Circles, Ellipses and Hyperbolas — Sectors, Segments and Standard Integrals",
    ],
    qCount: 44,
    qPerPaper: 0.94,
    pctHard: 32,
    bucket: "longtail",
  },
  {
    slug: "pair-of-straight-lines",
    name: "Pair of Straight Lines",
    summary:
      "44 q - 0.98/paper - 41% HARD. A closed, formula-driven chapter in four notes pages. Every question reduces to reading a, h and b out of a combined equation and applying one of a short list of conditions, which makes it more learnable than its 41% suggests; the angle page (12 q, 58%) carries the cost.",
    chapter: "Pair of Straight Lines",
    subtopics: [
      "Joint Equation of Two Lines — Product of Linear Factors and the Triangle They Form",
      "Slopes of a Homogeneous Pair — Sum, Product and Ratio Conditions",
      "Angle Between the Pair — Perpendicular Pairs, Lines at a Given Angle and the Bisectors",
      "General Second-Degree Equation — Condition for a Pair, Parallel Lines and Distances",
    ],
    qCount: 44,
    qPerPaper: 0.98,
    pctHard: 41,
    bucket: "longtail",
  },
  {
    slug: "permutations-and-combinations",
    name: "Permutations and Combinations",
    summary:
      "42 q - 0.98/paper - 40% HARD. The least mechanical chapter on the paper: no formula rescues a misread constraint. Five pages in notes order; Circular Arrangements is 6 q at 83% HARD, the densest corner in the chapter. One question a paper, and the one most likely to eat five minutes.",
    chapter: "Permutations and Combinations",
    subtopics: [
      "Fundamental Principle, nPr and nCr — Definitions and Identities",
      "Arrangements with Constraints — Together, Never Together, Fixed Positions and Repeated Letters",
      "Selections with Conditions — At Least, At Most, Included and Excluded",
      "Circular Arrangements",
      "Counting Numbers and Geometric Figures — Digits, Divisibility, Points and Polygons",
    ],
    qCount: 42,
    qPerPaper: 0.98,
    pctHard: 40,
    bucket: "longtail",
  },
];

/** Every playbook slug, in catalog order. Drives generateStaticParams. */
export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

/** Playbooks in one strand, catalog order preserved. */
export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
