/**
 * Where Learn teaches a bank chapter, and which bank topics each board lesson's
 * mistakes are filed under (2026-11-22, owner: "give Learn priority wherever it's
 * available"). V's chapter lesson reads these to draw Learn's lessons as the map,
 * start where the student's mistakes are, and link a missed question to its lesson.
 *
 * Both are hand-checked data, not name matching:
 *  - CHAPTER LINKS: the boards' own chapters, plus MHT-CET (its Class 12 Maths is
 *    the HSC syllabus) and JEE Mains (its Class 12 chapters are CBSE's). A JEE
 *    chapter that is half of a Learn chapter names its parts (Learn's
 *    learn_course_concepts.part, 1-based in the outline's order). Class 11 chapters
 *    (limits, conics, complex numbers...) have no Learn lessons and are not listed.
 *  - LESSON TOPICS: our topics are usually broader than Learn's lessons (CBSE
 *    Linear Programming is 1 topic and 13 lessons), so several lessons share a
 *    topic; one lesson that covers two topics lists both.
 *
 * Pure and client-safe. Spec: tests/learn-v-links.test.ts; checked against the live
 * outlines and topic names by tests/learn-v-links-live.test.ts (prod contract).
 */

export type LearnChapterLink = { course: string; chapter: string; parts?: number[] };

const CBSE = "cbse-12-maths";
const HSC = "mh-hsc-12-maths";
const cbse = (chapter: string, parts?: number[]): LearnChapterLink => (parts ? { course: CBSE, chapter, parts } : { course: CBSE, chapter });
const hsc = (chapter: string): LearnChapterLink => ({ course: HSC, chapter });

/** `${exam name}|${bank chapter name}` (both as the database names them) → the Learn chapter teaching it. */
export const LEARN_CHAPTER_LINKS: Readonly<Record<string, LearnChapterLink>> = {
  // CBSE Class 12: its own course.
  "CBSE Class 12|Relations and Functions": cbse("relations-and-functions-12"),
  "CBSE Class 12|Inverse Trigonometric Functions": cbse("inverse-trigonometric-functions"),
  "CBSE Class 12|Matrices": cbse("matrices"),
  "CBSE Class 12|Determinants": cbse("determinants"),
  "CBSE Class 12|Continuity and Differentiability": cbse("continuity-and-differentiability"),
  "CBSE Class 12|Application of Derivatives": cbse("application-of-derivatives"),
  "CBSE Class 12|Integrals": cbse("integrals"),
  "CBSE Class 12|Application of Integrals": cbse("application-of-integrals"),
  "CBSE Class 12|Differential Equations": cbse("differential-equations"),
  "CBSE Class 12|Vector Algebra": cbse("vector-algebra"),
  "CBSE Class 12|Three Dimensional Geometry": cbse("three-dimensional-geometry"),
  "CBSE Class 12|Linear Programming": cbse("linear-programming"),
  "CBSE Class 12|Probability": cbse("probability-12"),
  // Maharashtra HSC Class 12: its own course ("Line and Planes" is the bank's name).
  "Maharashtra HSC Class 12|Mathematical Logic": hsc("mathematical-logic"),
  "Maharashtra HSC Class 12|Matrices": hsc("matrices"),
  "Maharashtra HSC Class 12|Trigonometric Functions": hsc("trigonometric-functions-12"),
  "Maharashtra HSC Class 12|Pair of Straight Lines": hsc("pair-of-straight-lines"),
  "Maharashtra HSC Class 12|Vectors": hsc("vectors"),
  "Maharashtra HSC Class 12|Line and Planes": hsc("line-and-plane"),
  "Maharashtra HSC Class 12|Differentiation": hsc("differentiation-12"),
  "Maharashtra HSC Class 12|Application of Derivatives": hsc("application-of-derivatives"),
  "Maharashtra HSC Class 12|Indefinite Integration": hsc("indefinite-integration"),
  "Maharashtra HSC Class 12|Definite Integration": hsc("definite-integration"),
  "Maharashtra HSC Class 12|Application of Definite Integration": hsc("application-of-definite-integration"),
  "Maharashtra HSC Class 12|Differential Equations": hsc("differential-equations"),
  "Maharashtra HSC Class 12|Probability Distributions": hsc("probability-distributions"),
  "Maharashtra HSC Class 12|Binomial Distribution": hsc("binomial-distribution"),
  "Maharashtra HSC Class 12|Linear Programming": hsc("linear-programming"),
  // MHT-CET: its Class 12 chapters are the HSC syllabus.
  "MHT-CET|Applications of Definite Integral": hsc("application-of-definite-integration"),
  "MHT-CET|Applications of Derivative": hsc("application-of-derivatives"),
  "MHT-CET|Binomial Distribution": hsc("binomial-distribution"),
  "MHT-CET|Definite Integration": hsc("definite-integration"),
  "MHT-CET|Determinants and Matrices": hsc("matrices"),
  "MHT-CET|Differential Equations": hsc("differential-equations"),
  "MHT-CET|Differentiation": hsc("differentiation-12"),
  "MHT-CET|Indefinite Integration": hsc("indefinite-integration"),
  "MHT-CET|Line and Plane": hsc("line-and-plane"),
  "MHT-CET|Linear Programming": hsc("linear-programming"),
  "MHT-CET|Mathematical Logic": hsc("mathematical-logic"),
  "MHT-CET|Pair of Straight Lines": hsc("pair-of-straight-lines"),
  "MHT-CET|Probability Distribution": hsc("probability-distributions"),
  "MHT-CET|Trigonometric Functions": hsc("trigonometric-functions-12"),
  "MHT-CET|Vectors": hsc("vectors"),
  // JEE Mains: its Class 12 chapters are CBSE's; CBSE Integrals is part 1 indefinite, part 2 definite,
  // and Continuity and Differentiability part 1 continuity, parts 2-3 differentiation.
  "JEE Mains|Relations and Functions": cbse("relations-and-functions-12"),
  "JEE Mains|Inverse Trigonometric Functions": cbse("inverse-trigonometric-functions"),
  "JEE Mains|Matrices": cbse("matrices"),
  "JEE Mains|Determinants": cbse("determinants"),
  "JEE Mains|Differentiation": cbse("continuity-and-differentiability", [2, 3]),
  "JEE Mains|Application of Derivatives": cbse("application-of-derivatives"),
  "JEE Mains|Indefinite Integration": cbse("integrals", [1]),
  "JEE Mains|Definite Integration": cbse("integrals", [2]),
  "JEE Mains|Application of Integrals": cbse("application-of-integrals"),
  "JEE Mains|Differential Equations": cbse("differential-equations"),
  "JEE Mains|Vector Algebra": cbse("vector-algebra"),
  "JEE Mains|Three Dimensional Geometry": cbse("three-dimensional-geometry"),
  "JEE Mains|Probability": cbse("probability-12"),
  "JEE Mains|Mathematical Reasoning": hsc("mathematical-logic"),
};

export function learnChapterFor(examName: string, chapterName: string): LearnChapterLink | null {
  return LEARN_CHAPTER_LINKS[`${examName}|${chapterName}`] ?? null;
}

type Topics = Readonly<Record<string, string | readonly string[]>>;

/** `${course}/${course chapter slug}` → lesson slug → the BOARD topic(s) its mistakes are filed under. */
export const LEARN_LESSON_TOPICS: Readonly<Record<string, Topics>> = {
  // ─── CBSE Class 12 ───
  [`${CBSE}/relations-and-functions-12`]: {
    "reflexive-symmetric-transitive": "Types of Relations",
    "equivalence-relations": "Equivalence Relations and Classes",
    "one-one-and-onto": "One-One and Onto Functions",
    composition: "Composition and Invertible Functions",
    "inverse-functions": "Composition and Invertible Functions",
  },
  [`${CBSE}/inverse-trigonometric-functions`]: {
    "principal-values": "Domains, Ranges and Principal Value Branches",
    "inverse-of-a-ratio": "Evaluating Inverse Trigonometric Expressions",
    "inverse-properties": "Properties of Inverse Trigonometric Functions",
    "inverse-trig-equations": "Properties of Inverse Trigonometric Functions",
  },
  [`${CBSE}/matrices`]: {
    "types-of-matrices": "Order and Types of Matrices",
    "matrix-addition-scalar": "Addition and Scalar Multiplication",
    "matrix-multiplication": "Multiplication of Matrices",
    "multiplication-properties": "Multiplication of Matrices",
    transpose: "Transpose of a Matrix",
    "symmetric-and-skew": "Symmetric and Skew-Symmetric Matrices",
  },
  [`${CBSE}/determinants`]: {
    "value-of-a-determinant": "Determinant and its Properties",
    "minors-and-cofactors": "Minors and Cofactors",
    "area-and-collinearity": "Area of a Triangle",
    adjoint: "Adjoint and Inverse of a Matrix",
    "singular-matrices": "Adjoint and Inverse of a Matrix",
    "inverse-by-adjoint": "Adjoint and Inverse of a Matrix",
    "inverse-properties": "Adjoint and Inverse of a Matrix",
    "matrix-equations": "Adjoint and Inverse of a Matrix",
    "inversion-method": "Solving System of Linear Equations",
    "linear-systems-word-problems": "Solving System of Linear Equations",
  },
  [`${CBSE}/continuity-and-differentiability`]: {
    "continuity-at-a-point": "Continuity",
    "left-and-right-continuity": "Continuity",
    "finding-constants": "Continuity",
    "continuity-on-an-interval": "Continuity",
    differentiability: "Differentiability and the Chain Rule",
    "chain-rule": "Differentiability and the Chain Rule",
    "chain-rule-exp-log": "Derivatives of Exponential and Logarithmic Functions",
    "inverse-functions": "Derivatives of Implicit and Inverse Trigonometric Functions",
    "inverse-trig-derivatives": "Derivatives of Implicit and Inverse Trigonometric Functions",
    "inverse-trig-substitution": "Derivatives of Implicit and Inverse Trigonometric Functions",
    "logarithmic-differentiation": "Logarithmic Differentiation",
    "implicit-differentiation": "Derivatives of Implicit and Inverse Trigonometric Functions",
    "parametric-differentiation": "Derivatives of Functions in Parametric Form",
    "one-function-wrt-another": "Derivatives of Functions in Parametric Form",
    "second-derivative": "Second Order Derivatives",
    "second-derivative-parametric": "Second Order Derivatives",
    "derivative-relations": "Second Order Derivatives",
  },
  [`${CBSE}/application-of-derivatives`]: {
    "rate-of-change": "Rate of Change of Quantities",
    "related-rates": "Rate of Change of Quantities",
    "increasing-decreasing": "Increasing and Decreasing Functions",
    "maxima-and-minima": "Maxima and Minima",
    optimisation: "Maxima and Minima",
    "absolute-extrema": "Absolute Maximum and Minimum on a Closed Interval",
  },
  [`${CBSE}/integrals`]: {
    antiderivatives: "Integration as the Inverse of Differentiation",
    "rewrite-then-integrate": "Integration as the Inverse of Differentiation",
    substitution: "Integration by Substitution",
    "trigonometric-integrals": "Integration using Trigonometric Identities",
    "standard-quadratic-forms": "Integrals of Some Particular Functions",
    "completing-the-square": "Integrals of Some Particular Functions",
    "linear-over-quadratic": "Integrals of Some Particular Functions",
    "integration-by-parts": "Integration by Parts",
    "parts-special-forms": "Integrals of Special Forms",
    "partial-fractions": "Integration by Partial Fractions",
    "fundamental-theorem": "Definite Integrals and the Fundamental Theorem",
    "substitution-with-limits": "Definite Integrals by Substitution",
    "parts-and-fractions-definite": "Definite Integrals and the Fundamental Theorem",
    "basic-properties": "Properties of Definite Integrals",
    "king-property": "Properties of Definite Integrals",
    "odd-even-properties": "Properties of Definite Integrals",
    "greatest-integer-and-modulus": "Properties of Definite Integrals",
  },
  [`${CBSE}/application-of-integrals`]: {
    "area-under-a-curve": "Area Under Simple Curves",
    "area-with-y-axis": "Area Under Simple Curves",
    "areas-of-standard-curves": "Area Under Simple Curves",
    "area-between-curves": "Area Bounded by a Curve and a Line",
  },
  [`${CBSE}/differential-equations`]: {
    "order-and-degree": "Order and Degree of a Differential Equation",
    "general-and-particular-solutions": "General and Particular Solutions",
    "variables-separable": "Variables Separable",
    "homogeneous-equations": "Homogeneous Differential Equations",
    "linear-equations": "Linear Differential Equations",
    "growth-and-decay": "Variables Separable",
    "other-applications": "Variables Separable",
  },
  [`${CBSE}/vector-algebra`]: {
    "vectors-in-space": "Types of Vectors",
    "vector-algebra": "Addition of Vectors",
    "collinear-and-coplanar": "Components and Direction Cosines",
    "section-formula": "Section Formula",
    "dot-product": "Scalar (Dot) Product and Projection",
    projection: "Scalar (Dot) Product and Projection",
    "cross-product": "Vector (Cross) Product",
    "cross-product-geometry": "Vector (Cross) Product",
  },
  [`${CBSE}/three-dimensional-geometry`]: {
    "direction-cosines": "Direction Cosines and Direction Ratios",
    "equation-of-a-line": "Equation of a Line in Space",
    "angle-between-lines": "Angle Between Two Lines",
    "point-to-line": "Equation of a Line in Space",
    "shortest-distance": "Shortest Distance Between Two Lines",
    "intersecting-and-coplanar-lines": "Shortest Distance Between Two Lines",
  },
  [`${CBSE}/linear-programming`]: Object.fromEntries(
    [
      "line-from-intercepts", "half-plane-test", "feasible-region", "bounded-unbounded-empty", "corner-points",
      "direction-from-shading", "system-from-figure", "corner-point-method", "minimum-and-difference",
      "unbounded-optimum", "infinitely-many-optima", "formulating-an-lpp", "solving-word-problems",
    ].map((s) => [s, "Graphical Solution and the Feasible Region"])
  ),
  [`${CBSE}/probability-12`]: {
    "conditional-probability": "Conditional Probability",
    "multiplication-theorem": "Multiplication Theorem on Probability",
    "independent-events": "Independent Events",
    "total-probability-bayes": ["Theorem of Total Probability", "Bayes' Theorem"],
  },

  // ─── Maharashtra HSC Class 12 ───
  [`${HSC}/mathematical-logic`]: {
    statements: "Statements and Logical Connectives",
    "logical-connectives": "Statements and Logical Connectives",
    "truth-tables": "Truth Tables of Compound Statements",
    "tautology-contradiction": "Tautology, Contradiction and Contingency",
    "logical-equivalence": "Logical Equivalence and Algebra of Statements",
    "converse-inverse-contrapositive": "Converse, Inverse and Contrapositive",
    negation: "Quantifiers, Duality and Negation of Statements",
    quantifiers: "Quantifiers, Duality and Negation of Statements",
    duality: "Quantifiers, Duality and Negation of Statements",
    "switching-circuits": "Application of Logic to Switching Circuits",
    "simplifying-circuits": "Application of Logic to Switching Circuits",
  },
  [`${HSC}/matrices`]: {
    "elementary-transformations": "Elementary Transformations of a Matrix",
    "inverse-by-transformations": "Inverse by Elementary Transformation Method",
    "minors-and-cofactors": "Minors, Cofactors and Adjoint",
    adjoint: "Minors, Cofactors and Adjoint",
    "singular-matrices": "Inverse by Adjoint Method",
    "inverse-by-adjoint": "Inverse by Adjoint Method",
    "inverse-properties": "Inverse by Adjoint Method",
    "matrix-equations": "Inverse by Adjoint Method",
    "inversion-method": "Solution of Linear Equations using Matrices",
    "reduction-method": "Solution of Linear Equations using Matrices",
    "linear-systems-word-problems": "Solution of Linear Equations using Matrices",
  },
  [`${HSC}/trigonometric-functions-12`]: {
    "principal-solutions": "Trigonometric Equations and General Solutions",
    "general-solution-sine": "Trigonometric Equations and General Solutions",
    "general-solution-cosine-tangent": "Trigonometric Equations and General Solutions",
    "squared-equations": "Trigonometric Equations and General Solutions",
    "reducible-equations": "Trigonometric Equations and General Solutions",
    "polar-coordinates": "Polar Coordinates",
    "sine-rule": "Solution of Triangle — Sine, Cosine and Projection Rules",
    "cosine-rule": "Solution of Triangle — Sine, Cosine and Projection Rules",
    "projection-rule": "Solution of Triangle — Sine, Cosine and Projection Rules",
    "half-angles-and-area": "Applications of Sine, Cosine and Projection Rules",
    "triangle-identities": "Applications of Sine, Cosine and Projection Rules",
    "principal-values": "Inverse Trigonometric Functions and Principal Values",
    "inverse-of-a-ratio": "Inverse Trigonometric Functions and Principal Values",
    "inverse-properties": "Properties of Inverse Trigonometric Functions",
    "inverse-trig-equations": "Properties of Inverse Trigonometric Functions",
  },
  [`${HSC}/pair-of-straight-lines`]: {
    "combined-equation": "Combined Equation of a Pair of Lines",
    "separating-the-lines": "Combined Equation of a Pair of Lines",
    "sum-and-product-of-slopes": "Combined Equation of a Pair of Lines",
    "angle-between-the-lines": "Angle between a Pair of Lines",
    "lines-with-a-given-condition": "Angle between a Pair of Lines",
    "triangles-from-a-pair": "Angle between a Pair of Lines",
    "angle-bisectors": "Angle Bisectors of a Pair of Lines",
    "general-second-degree": "General Second Degree Equation of Two Lines",
    "general-pair-properties": "General Second Degree Equation of Two Lines",
  },
  [`${HSC}/vectors`]: {
    "vectors-in-space": "Vectors and Their Types",
    "vector-algebra": "Vectors and Their Types",
    "collinear-and-coplanar": "Vectors and Their Types",
    "section-formula": "Section Formula",
    "dot-product": "Dot Product of Vectors",
    projection: "Dot Product of Vectors",
    "direction-cosines": "Dot Product of Vectors",
    "cross-product": "Cross Product of Vectors",
    "cross-product-geometry": "Cross Product of Vectors",
    "scalar-triple-product": "Scalar and Vector Triple Product",
    "volume-and-coplanarity": "Scalar and Vector Triple Product",
    "vector-triple-product": "Scalar and Vector Triple Product",
    "triple-product-identities": "Scalar and Vector Triple Product",
  },
  [`${HSC}/line-and-plane`]: {
    "equation-of-a-line": "Vector and Cartesian Equations of a Line",
    "angle-between-lines": "Vector and Cartesian Equations of a Line",
    "point-to-line": "Distance of a Point from a Line",
    "shortest-distance": "Skew Lines and Shortest Distance",
    "intersecting-and-coplanar-lines": "Coplanarity of Two Lines",
    "equation-of-a-plane": "Equations of a Plane",
    "plane-through-points": "Equations of a Plane",
    "foot-from-origin": "Equations of a Plane",
    "point-to-plane": "Distance of a Point from a Plane",
    "angle-between-planes": "Angle Between Planes and Line-Plane Angle",
    "line-and-plane-together": "Equations of a Plane",
  },
  [`${HSC}/differentiation-12`]: {
    "chain-rule": "Derivatives of Composite Functions (Chain Rule)",
    "chain-rule-exp-log": "Derivatives of Composite Functions (Chain Rule)",
    "inverse-functions": "Derivatives of Inverse Functions",
    "inverse-trig-derivatives": "Derivatives of Inverse Trigonometric Functions",
    "inverse-trig-substitution": "Derivatives of Inverse Trigonometric Functions",
    "logarithmic-differentiation": "Logarithmic Differentiation",
    "implicit-differentiation": "Derivatives of Implicit Functions",
    "parametric-differentiation": "Derivatives of Parametric Functions",
    "one-function-wrt-another": "Differentiation of One Function with respect to Another",
    "second-derivative": "Higher Order Derivatives",
    "second-derivative-parametric": "Higher Order Derivatives",
    "derivative-relations": "Higher Order Derivatives",
  },
  [`${HSC}/application-of-derivatives`]: {
    "tangent-and-normal": "Tangents and Normals",
    "tangents-with-conditions": "Tangents and Normals",
    "rate-of-change": ["Derivative as a Rate Measure", "Velocity, Acceleration and Jerk"],
    "related-rates": "Derivative as a Rate Measure",
    approximations: "Approximations",
    "rolles-theorem": "Rolle's Theorem",
    "mean-value-theorem": "Lagrange's Mean Value Theorem",
    "increasing-decreasing": "Increasing and Decreasing Functions",
    "maxima-and-minima": "Maxima and Minima",
    optimisation: "Maxima and Minima",
  },
  [`${HSC}/indefinite-integration`]: {
    antiderivatives: "Elementary Integration and Standard Formulae",
    "rewrite-then-integrate": "Elementary Integration and Standard Formulae",
    substitution: "Integration by Substitution",
    "trigonometric-integrals": "Integrals of Trigonometric Functions",
    "half-angle-substitution": "Integrals of Trigonometric Functions",
    "standard-quadratic-forms": "Special Integrals of Quadratic Forms",
    "completing-the-square": "Special Integrals of Quadratic Forms",
    "linear-over-quadratic": "Integrals of the Type (px+q) over a Quadratic",
    "integration-by-parts": "Integration by Parts",
    "parts-special-forms": "Integration by Parts",
    "partial-fractions": "Integration by Partial Fractions",
  },
  [`${HSC}/definite-integration`]: {
    "limit-of-a-sum": "Definite Integral as a Limit of a Sum",
    "fundamental-theorem": "Fundamental Theorem of Integral Calculus",
    "substitution-with-limits": "Methods of Evaluation of Definite Integrals",
    "parts-and-fractions-definite": "Methods of Evaluation of Definite Integrals",
    "basic-properties": "Properties of Definite Integrals",
    "king-property": "Properties of Definite Integrals",
    "odd-even-properties": "Properties of Definite Integrals",
  },
  [`${HSC}/application-of-definite-integration`]: {
    "area-under-a-curve": "Area Under a Curve",
    "area-with-y-axis": "Area Under a Curve",
    "areas-of-standard-curves": "Area Under a Curve",
    "area-between-curves": "Area Between Two Curves",
  },
  [`${HSC}/differential-equations`]: {
    "order-and-degree": "Order and Degree of a Differential Equation",
    "forming-equations": "Formation of a Differential Equation",
    "general-and-particular-solutions": "Solution of a Differential Equation",
    "variables-separable": "Solution of a Differential Equation",
    "reducible-to-separable": "Solution of a Differential Equation",
    "homogeneous-equations": "Solution of a Differential Equation",
    "linear-equations": "Solution of a Differential Equation",
    "growth-and-decay": "Applications of Differential Equations",
    "other-applications": "Applications of Differential Equations",
  },
  [`${HSC}/probability-distributions`]: {
    "random-variables": "Random Variables and Their Types",
    "probability-mass-function": "Probability Mass Function of a Discrete Random Variable",
    "distribution-from-experiment": "Probability Mass Function of a Discrete Random Variable",
    "expected-value-and-variance": "Expected Value and Variance of a Random Variable",
    "probability-density-function": "Continuous Random Variables and Probability Density Function",
    "cumulative-distribution": "Cumulative Distribution Function",
    "mean-of-continuous": "Expected Value and Variance of a Random Variable",
  },
  [`${HSC}/binomial-distribution`]: {
    "bernoulli-trials": "Bernoulli Trials",
    "binomial-probability": "The Binomial Distribution",
    "at-least-and-at-most": "The Binomial Distribution",
    "binomial-mean-and-variance": "Mean and Variance of a Binomial Distribution",
  },
  [`${HSC}/linear-programming`]: {
    "line-from-intercepts": "Linear Inequations in Two Variables",
    "half-plane-test": "Linear Inequations in Two Variables",
    "feasible-region": "Linear Inequations in Two Variables",
    "bounded-unbounded-empty": "Linear Inequations in Two Variables",
    "corner-points": "Linear Inequations in Two Variables",
    "direction-from-shading": "Linear Inequations in Two Variables",
    "system-from-figure": "Linear Inequations in Two Variables",
    "corner-point-method": "Graphical Solution of a Linear Programming Problem",
    "minimum-and-difference": "Graphical Solution of a Linear Programming Problem",
    "unbounded-optimum": "Graphical Solution of a Linear Programming Problem",
    "infinitely-many-optima": "Graphical Solution of a Linear Programming Problem",
    "formulating-an-lpp": "Formulation of a Linear Programming Problem",
    "solving-word-problems": ["Formulation of a Linear Programming Problem", "Graphical Solution of a Linear Programming Problem"],
  },
};

/** The board topics a lesson's mistakes are filed under; [] when the file has none for it. */
export function lessonTopics(course: string, chapter: string, lesson: string): string[] {
  const t = LEARN_LESSON_TOPICS[`${course}/${chapter}`]?.[lesson];
  return t === undefined ? [] : typeof t === "string" ? [t] : [...t];
}
