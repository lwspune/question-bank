/**
 * Playbook catalog for /guide/mht-cet-maths/playbooks.
 *
 * A "playbook" here = one chapter, treated end-to-end (the NDA Physics
 * Template C shape). MHT-CET Maths has 26 chapters (27 until 2026-09-26, when
 * Trigonometry - I was emptied into Trigonometric Functions and Trigonometry - II
 * and deleted); several
 * chapters are 1-3 subtopics, so the chapter is the right unit.
 *
 * WHY 22 AND NOT 26. Playbooks ship for every chapter at >= 0.9 q/paper on
 * RECENT weightage (2025-2026, 39 shifts). The chapters below the line are
 * deliberately excluded and covered in a short tail block on /strategy:
 *   Sets, Relations and Functions 0.87 - Sequences 0.18 - Quadratic
 *   Equations 0.10 (6 questions in 68 shifts) - Measures of Dispersion 0.00.
 * On the 2026-10-13 re-measure (2026 public, recent window moved from
 * 2024-2025 to 2025-2026) Conic Sections crossed the line, 0.67 -> 1.08, and
 * ships a long-tail playbook; Trigonometry - II (the Std XI identity chapter)
 * holds at 0.92, just above it.
 * Sets, Relations and Functions (0.87) sits just below the line but is named
 * in the Quick-Win strand with a direct /browse drill, because it is a
 * genuine cheap-marks chapter (12% HARD).
 *
 * WEIGHTAGE IS RECENT, NOT LIFETIME, and that matters: MHT-CET moved its
 * syllabus for 2025 and 2026 kept the move. Measures of Dispersion ran
 * 1.0/paper across 27 shifts in 2023-24 and then scored ZERO across all 39
 * papers of 2025-2026, while Conic Sections went from 2 questions before 2025
 * to 42 in 2025-2026. A lifetime average hides both.
 *
 * `chapter` + `subtopics[]` are canonical DB names, matched at request time
 * via resolveTaxonomy -> UUIDs for /browse links. Renaming a chapter in the
 * taxonomy without updating this file silently produces an empty drill - see
 * the shipped-chapter-rename procedure.
 *
 * `bucket` maps each playbook to one of the 3 strategy strands in strategy.ts.
 * Strand sizes are deliberately uneven - they reflect the bank's shape:
 *   - cornerstone (7):  27.35 q/paper = 55% of a 50-question paper
 *   - quickwin    (5):  low %HARD, banked early
 *   - longtail   (10):  ~1-2 q/paper each, mostly 24-56% HARD
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
  /** Questions per paper on 2025-2026 shifts - the number that drives tiering. */
  qPerPaper: number;
  pctHard: number;
  bucket: PlaybookBucket;
};

export const PLAYBOOKS: Playbook[] = [
  // Cornerstone strand (7 playbooks, 27.35 q/paper = 55% of the paper)
  {
    slug: "line-and-plane",
    name: "Line and Plane",
    summary:
      "304 q - 4.69/paper - 35% HARD. The single heaviest chapter on recent papers. Seven subtopics, and the HARD is spread rather than concentrated (top two carry only 45%), so there is no cherry-pick here: you own the whole chapter or you lose nine marks.",
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
    qCount: 304,
    qPerPaper: 4.69,
    pctHard: 35,
    bucket: "cornerstone",
  },
  {
    slug: "vectors",
    name: "Vectors",
    summary:
      "334 q - 4.49/paper - 50% HARD. The largest chapter in the bank and the hardest of the cornerstones. Scalar Triple Product (100 q, 63% HARD) and Cross Product (83 q, 64%) carry 70% of its HARD between them, so this chapter DOES cherry-pick: secure Dot Product (76 q, 28% HARD) first.",
    chapter: "Vectors",
    subtopics: [
      "Scalar Triple Product, Coplanarity, and Volume",
      "Cross Product, Angle, and Area",
      "Dot Product, Angle, and Perpendicularity",
      "Vector Geometry — Section Formula, Triangle, and Parallelogram",
      "Linear Combinations, Collinearity, and Coplanarity",
      "Magnitude, Components, and Unit Vectors",
    ],
    qCount: 334,
    qPerPaper: 4.49,
    pctHard: 50,
    bucket: "cornerstone",
  },
  {
    slug: "trigonometric-functions",
    name: "Trigonometric Functions",
    summary:
      "312 q - 4.46/paper - 41% HARD. The Std XII trigonometry chapter and the second-largest in the bank, in three parts over six notes pages: equations (69 q), solution of triangle (107 q: the rules, then half-angle and area) and inverse trigonometry (136 q: values, identities, equations). The parts cost about the same; the one expensive page is inverse-trig identities at 65% HARD. Solution of triangle is rising (1.26 to 1.85 a paper from 2023-24 to 2025-26) while equations are falling (1.33 to 0.85).",
    chapter: "Trigonometric Functions",
    subtopics: [
      "Trigonometric Equations and General Solutions",
      "Solution of Triangle — Sine, Cosine and Projection Rules",
      "Solution of Triangle — Half-Angle Formulas, Napier's Analogy and Area",
      "Inverse Trigonometric Functions — Principal Values and Evaluation",
      "Inverse Trigonometric Identities — Sums, Substitution and Telescoping",
      "Inverse Trigonometric Equations",
    ],
    qCount: 312,
    qPerPaper: 4.46,
    pctHard: 41,
    bucket: "cornerstone",
  },
  {
    slug: "applications-of-derivative",
    name: "Applications of Derivative",
    summary:
      "253 q - 3.23/paper - 20% HARD. The cheapest cornerstone by some distance, and the best marks-per-hour chapter on the paper. Seven subtopics, none above 31% HARD; Approximations using Differentials is 16 q at 0% HARD. Lighter than it was (4.48 a paper in 2023-24), but still a cornerstone.",
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
    qCount: 253,
    qPerPaper: 3.23,
    pctHard: 20,
    bucket: "cornerstone",
  },
  {
    slug: "differential-equations",
    name: "Differential Equations",
    summary:
      "216 q - 3.38/paper - 33% HARD. Six subtopics that split cleanly by SOLUTION METHOD, which is exactly how the questions are set. Order/Degree/Formation (58 q, 21% HARD) is recognition work and near-free; Linear (Integrating Factor) at 54% HARD is where the chapter gets expensive.",
    chapter: "Differential Equations",
    subtopics: [
      "Growth, Decay, and Continuous Models",
      "Order, Degree, Formation of ODE, and Verification of Solutions",
      "Variable-Separable Equations",
      "Linear Differential Equations (Integrating Factor)",
      "Homogeneous and Reducible Equations",
      "Newton's Law of Cooling",
    ],
    qCount: 216,
    qPerPaper: 3.38,
    pctHard: 33,
    bucket: "cornerstone",
  },
  {
    slug: "indefinite-integration",
    name: "Indefinite Integration",
    summary:
      "249 q - 3.51/paper - 48% HARD. A cornerstone you cannot skip and cannot rush. Substitution alone is 83 q; Trigonometric Integrals (Rational forms) runs 76% HARD, the highest of any subtopic in the subject. Foundations plus Trig Powers are 39 q at ~15% HARD - take those first.",
    chapter: "Indefinite Integration",
    subtopics: [
      "Integration by Substitution",
      "Trigonometric Integrals - Rational and Substitution Forms",
      "Rational Functions and Partial Fractions",
      "Integration by Parts",
      "Trigonometric Integrals - Powers and Identities",
      "Foundations and Standard Formulae",
    ],
    qCount: 249,
    qPerPaper: 3.51,
    pctHard: 48,
    bucket: "cornerstone",
  },
  {
    slug: "differentiation",
    name: "Differentiation",
    summary:
      "237 q - 3.59/paper - 47% HARD. Method-pure subtopics, each drilling one technique. Inverse-trig differentiation (59 q) is the biggest single block. Derivative of One Function with respect to Another is only 16 q but 63% HARD - the worst marks-per-minute cell in the chapter.",
    chapter: "Differentiation",
    subtopics: [
      "Inverse Functions & Inverse Trigonometric Differentiation",
      "Implicit Differentiation & Special Forms",
      "Logarithmic Differentiation",
      "Foundations, Chain Rule & Differentiability",
      "Parametric, Higher-Order Derivatives & Relations",
      "Derivative of One Function with Respect to Another",
    ],
    qCount: 237,
    qPerPaper: 3.59,
    pctHard: 47,
    bucket: "cornerstone",
  },

  // Quick-Win strand (5 playbooks - bank these first)
  {
    slug: "linear-programming",
    name: "Linear Programming",
    summary:
      "69 q - 1.00/paper - 3% HARD. The lowest-HARD chapter in the subject: three of its four notes pages have NEVER produced a HARD question, and both HARD ones are reading constraints off a figure. Two marks that should take under a minute. Do this first, every time.",
    chapter: "Linear Programming",
    subtopics: [
      "Feasible Region — Half-Plane Tests, Bounded, Unbounded and Empty",
      "Reading Constraints Off a Shaded Region",
      "Corner-Point Method — Maximum and Minimum of the Objective Function",
      "Formulation and Special Cases — Word Problems and Infinitely Many Optima",
    ],
    qCount: 69,
    qPerPaper: 1,
    pctHard: 3,
    bucket: "quickwin",
  },
  {
    slug: "probability-distribution",
    name: "Probability Distribution",
    summary:
      "159 q - 2.31/paper - 18% HARD. The second-heaviest Quick-Win, worth over four marks a paper at under half the HARD rate of the calculus chapters. Classical Probability (32 q) runs 13% HARD; only Bayes and Conditional (37 q, 27%) has any real teeth.",
    chapter: "Probability Distribution",
    subtopics: [
      "Expectation, Variance and Standard Deviation",
      "Discrete Random Variables, PMF and CDF",
      "Conditional Probability, Independence and Bayes' Theorem",
      "Classical Probability, Addition Theorem and Odds",
    ],
    qCount: 159,
    qPerPaper: 2.31,
    pctHard: 18,
    bucket: "quickwin",
  },
  {
    slug: "mathematical-logic",
    name: "Mathematical Logic",
    summary:
      "151 q - 2.38/paper - 23% HARD. The heaviest Quick-Win on recent papers, and the one chapter in MHT-CET Maths with its own execution mode: 56% of its stems turn on a statement being true, false, a tautology or equivalent, against under 1% everywhere else. Its 23% HARD overstates the cost, because the difficulty is front-loaded into learning ONE technique (build the truth table) that then applies to every question - and it is not spread evenly: Switching Circuits is 17 q at 53% HARD while Negation is 21 q at 10%.",
    chapter: "Mathematical Logic",
    subtopics: [
      "Statements, Connectives and Truth Tables",
      "Finding Truth Values of Component Statements",
      "Negation of Statements and Quantifiers",
      "Converse, Inverse, and Contrapositive",
      "Logical Equivalence and Algebra of Statements",
      "Switching Circuits",
    ],
    qCount: 151,
    qPerPaper: 2.38,
    pctHard: 23,
    bucket: "quickwin",
  },
  {
    slug: "binomial-distribution",
    name: "Binomial Distribution",
    summary:
      "86 q - 1.10/paper - 16% HARD. A small, closed chapter with four subtopics and no surprises. Mean, Variance and Standard Deviation of a binomial variable (17 q) runs 12% HARD and is pure formula recall.",
    chapter: "Binomial Distribution",
    subtopics: [
      "Computing Binomial Probabilities",
      "Parameter Estimation and the Probability Ratio",
      "Mean, Variance and Standard Deviation of a Binomial Variable",
      "The Binomial Setting and Probability Mass Function",
    ],
    qCount: 86,
    qPerPaper: 1.1,
    pctHard: 16,
    bucket: "quickwin",
  },
  {
    slug: "straight-line",
    name: "Straight Line",
    summary:
      "75 q - 1.13/paper - 15% HARD. Four notes pages of routine coordinate geometry; five of its 11 HARD questions sit on the slope-and-angle page (19 q, 26%), and the distance page shares its whole toolkit with Line and Plane, so it costs almost nothing on top of a cornerstone you already own.",
    chapter: "Straight Line",
    subtopics: [
      "Slope, Angle Between Lines and Rotation",
      "Forms of a Line, Intersections and Concurrency",
      "Section Formula, Midpoints and Rectangles",
      "Distance — From a Point, Between Parallels, Along a Direction and the Foot of the Perpendicular",
    ],
    qCount: 75,
    qPerPaper: 1.13,
    pctHard: 15,
    bucket: "quickwin",
  },

  // Long tail (10 playbooks - ~1-2 q/paper each, mostly expensive)
  {
    slug: "limits",
    name: "Limits",
    summary:
      "137 q - 1.97/paper - 56% HARD. The hardest chapter in the subject by rate, and unusually it does NOT cherry-pick: the limit pages and the continuity pages sit at the same difficulty (55% and 57%). Four limit toolkits (existence and infinity, algebraic, trigonometric, exponential-logarithmic) feed three continuity pages (a single point, piecewise junctions, the [x] and |x| discontinuities).",
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
    qCount: 137,
    qPerPaper: 1.97,
    pctHard: 56,
    bucket: "longtail",
  },
  {
    slug: "definite-integration",
    name: "Definite Integration",
    summary:
      "132 q - 2.36/paper - 44% HARD. The fastest-growing chapter on the paper: 1.30 a paper in 2023-24, 2.36 in 2025-26. Five pages: the evaluation toolkit (standard forms, substitution with changed limits, by parts), the trigonometric block (tan x = t, half-angle forms), then the three properties that collapse a question in a line - odd/even symmetry, King's property with the f/(f + g) family, and modulus/greatest-integer splitting. The property pages are 71 of the 132 q and the highest-leverage recognition in the calculus block.",
    chapter: "Definite Integration",
    subtopics: [
      "Evaluating Definite Integrals — Standard Forms, Algebraic Substitution and By Parts",
      "Trigonometric Definite Integrals — tan x = t, Half-Angle Forms and Powers",
      "Odd and Even Integrands — Symmetric Limits",
      "King's Property — f(a + b − x) and the f/(f + g) Family",
      "Modulus and Greatest-Integer Integrands — Split the Interval",
    ],
    qCount: 132,
    qPerPaper: 2.36,
    pctHard: 44,
    bucket: "longtail",
  },
  {
    slug: "determinants-and-matrices",
    name: "Determinants and Matrices",
    summary:
      "102 q - 1.77/paper - 35% HARD. Mid-sized, with its cost on one page: the determinant and adjoint identities page is 27 q at 56% HARD - the chapter's hardest corner and its most learnable, since three recalled identities answer most of it. It weighed 1.08 a paper in 2025 and 2.12 in 2026, and its identities are memorisable and reusable, unlike most of the long tail.",
    chapter: "Determinants and Matrices",
    subtopics: [
      "Determinants, Cofactors and the Adjoint Identities",
      "Inverse of a Matrix — Adjoint Formula, Products and Verification",
      "Cayley–Hamilton, Matrix Polynomials and Powers",
      "Systems of Linear Equations and Symmetric, Skew-Symmetric Matrices",
    ],
    qCount: 102,
    qPerPaper: 1.77,
    pctHard: 35,
    bucket: "longtail",
  },
  {
    slug: "circle",
    name: "Circle",
    summary:
      "71 q - 1.05/paper - 28% HARD. Five notes pages. Tangents (21 q, 38% HARD) and Two Circles (9 q, 44%) are the expensive corners; the equation page is the cheap entry and the distance page (9 q, 0% HARD) is the greatest-and-least move shared with Complex Numbers.",
    chapter: "Circle",
    subtopics: [
      "Equation of a Circle — Centre-Radius, General, Diameter and Parametric Forms",
      "Concentric Circles and Circles Touching a Line or an Axis",
      "Tangents — At a Point, With a Given Slope, From an External Point and Their Loci",
      "Distance From a Point to a Circle — Greatest, Least, a Line Cutting the Circle and the Segment Area",
      "Two Circles — Touching, Common Tangents and Relative Position",
    ],
    qCount: 71,
    qPerPaper: 1.05,
    pctHard: 28,
    bucket: "longtail",
  },
  {
    slug: "conic-sections",
    name: "Conic Sections",
    summary:
      "44 q - 1.08/paper - 27% HARD. The chapter the 2025 syllabus added: 2 questions in the 29 shifts before 2025, then 15 in 2025 and 27 in 2026. Two notes pages, the parabola (18 q, 28% HARD) and the ellipse with the hyperbola (26 q, 27%), and the tangent conditions run through both. Nobody prepping from 2023-24 papers has seen it set.",
    chapter: "Conic Sections",
    subtopics: ["Parabola", "Ellipse and Hyperbola"],
    qCount: 44,
    qPerPaper: 1.08,
    pctHard: 27,
    bucket: "longtail",
  },
  {
    slug: "complex-numbers",
    name: "Complex Numbers",
    summary:
      "67 q - 0.95/paper - 24% HARD. Three pages in notes order. Modulus and Argument (26 q, 19% HARD) is the half worth owning; Algebra with the cube roots of unity (30 q, 30%) is the expensive corner; Locus (11 q, 18%) is one geometric idea - a modulus is a distance.",
    chapter: "Complex Numbers",
    subtopics: [
      "Algebra of Complex Numbers — Conjugates, Powers of i and Cube Roots of Unity",
      "Modulus and Argument — Polar Form, De Moivre and Square Roots",
      "Locus in the Argand Plane — Circles, Lines and Greatest/Least Modulus",
    ],
    qCount: 67,
    qPerPaper: 0.95,
    pctHard: 24,
    bucket: "longtail",
  },
  {
    slug: "applications-of-definite-integral",
    name: "Applications of Definite Integral",
    summary:
      "78 q - 1.21/paper - 24% HARD. Three pages: area under one curve (29 q, 10% HARD - one of the cheapest pages in the strand), area between two curves once the intersections are found (36 q, 31%), and the circle, ellipse and hyperbola regions that need the standard root integrals (13 q, 38%). One well-defined skill, which makes it a cheaper page than its HARD rate suggests.",
    chapter: "Applications of Definite Integral",
    subtopics: [
      "Area Under a Curve — Between a Curve and an Axis",
      "Area Between Two Curves — Intersections First",
      "Areas of Circles, Ellipses and Hyperbolas — Sectors, Segments and Standard Integrals",
    ],
    qCount: 78,
    qPerPaper: 1.21,
    pctHard: 24,
    bucket: "longtail",
  },
  {
    slug: "pair-of-straight-lines",
    name: "Pair of Straight Lines",
    summary:
      "73 q - 1.13/paper - 42% HARD. A closed, formula-driven chapter in four notes pages. Every question reduces to reading a, h and b out of a combined equation and applying one of a short list of conditions, which makes it more learnable than its 42% suggests; the joint-equation page (17 q, 18%) is the cheap entry and the other three run 47-56% HARD.",
    chapter: "Pair of Straight Lines",
    subtopics: [
      "Joint Equation of Two Lines — Product of Linear Factors and the Triangle They Form",
      "Slopes of a Homogeneous Pair — Sum, Product and Ratio Conditions",
      "Angle Between the Pair — Perpendicular Pairs, Lines at a Given Angle and the Bisectors",
      "General Second-Degree Equation — Condition for a Pair, Parallel Lines and Distances",
    ],
    qCount: 73,
    qPerPaper: 1.13,
    pctHard: 42,
    bucket: "longtail",
  },
  {
    slug: "permutations-and-combinations",
    name: "Permutations and Combinations",
    summary:
      "65 q - 0.97/paper - 34% HARD. The least mechanical chapter on the paper: no formula rescues a misread constraint. Five pages in notes order; Circular Arrangements and Selections with Conditions are 9 q each at 56% HARD, the densest corners in the chapter. One question a paper, and the one most likely to eat five minutes.",
    chapter: "Permutations and Combinations",
    subtopics: [
      "Fundamental Principle, nPr and nCr — Definitions and Identities",
      "Arrangements with Constraints — Together, Never Together, Fixed Positions and Repeated Letters",
      "Selections with Conditions — At Least, At Most, Included and Excluded",
      "Circular Arrangements",
      "Counting Numbers and Geometric Figures — Digits, Divisibility, Points and Polygons",
    ],
    qCount: 65,
    qPerPaper: 0.97,
    pctHard: 34,
    bucket: "longtail",
  },
  {
    slug: "trigonometry-ii",
    name: "Trigonometry - II",
    summary:
      "61 q - 0.92/paper - 48% HARD. The Std XI identity chapter, in three notes pages: compound angles, multiple angles, and sum-to-product. 11 of its 29 HARD questions ask for a value at fixed angles (π/8, 18°, 20°, 10° and the like) that falls to a known value or a product trick rather than to long algebra; learn those values and the compound-angle list first, and leave the conditional identities for the second pass.",
    chapter: "Trigonometry - II",
    subtopics: ["Compound Angles and Conditional Identities", "Multiple and Sub-multiple Angles", "Sum-to-Product and Product Formulas"],
    qCount: 61,
    qPerPaper: 0.92,
    pctHard: 48,
    bucket: "longtail",
  },
];

/** Every playbook slug, in catalog order. Drives generateStaticParams. */
export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

/** Playbooks in one strand, catalog order preserved. */
export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
