/**
 * The live `mh-hsc-12` Mathematics taxonomy: 15 chapters -> their subtopics.
 *
 * GENERATED from the database on 2026-09-19, not hand-typed. A chapter is
 * HARD-validated against this list (an unknown one is a transcription error, not
 * a new chapter — auto-creating it would fork a shipped chapter in two); an
 * off-catalog SUBTOPIC is a soft flag, because board papers blend topics more
 * than a textbook exercise does.
 *
 * tests/mh-hsc-12-paper-catalog.test.ts re-checks this against the live DB when
 * credentials are present, so drift is reported rather than silently tolerated.
 */
import type { PaperCatalog } from "../../mh-ssc-10/lib";

export const HSC_MATHS_CATALOG: PaperCatalog = {
  subjectName: "Mathematics",
  chapters: {
      "Application of Definite Integration": [
          "Area Between Two Curves",
          "Area Under a Curve"
      ],
      "Application of Derivatives": [
          "Approximations",
          "Derivative as a Rate Measure",
          "Increasing and Decreasing Functions",
          "Lagrange's Mean Value Theorem",
          "Maxima and Minima",
          "Rolle's Theorem",
          "Tangents and Normals",
          "Velocity, Acceleration and Jerk"
      ],
      "Binomial Distribution": [
          "Bernoulli Trials",
          "Mean and Variance of a Binomial Distribution",
          "The Binomial Distribution"
      ],
      "Definite Integration": [
          "Definite Integral as a Limit of a Sum",
          "Fundamental Theorem of Integral Calculus",
          "Methods of Evaluation of Definite Integrals",
          "Properties of Definite Integrals"
      ],
      "Differential Equations": [
          "Applications of Differential Equations",
          "Formation of a Differential Equation",
          "Order and Degree of a Differential Equation",
          "Solution of a Differential Equation"
      ],
      "Differentiation": [
          "Derivatives of Composite Functions (Chain Rule)",
          "Derivatives of Implicit Functions",
          "Derivatives of Inverse Functions",
          "Derivatives of Inverse Trigonometric Functions",
          "Derivatives of Parametric Functions",
          "Differentiation of One Function with respect to Another",
          "Higher Order Derivatives",
          "Logarithmic Differentiation"
      ],
      "Indefinite Integration": [
          "Elementary Integration and Standard Formulae",
          "Integrals of the Type (px+q) over a Quadratic",
          "Integrals of Trigonometric Functions",
          "Integration by Partial Fractions",
          "Integration by Parts",
          "Integration by Substitution",
          "Special Integrals of Quadratic Forms"
      ],
      "Line and Planes": [
          "Angle Between Planes and Line-Plane Angle",
          "Coplanarity of Two Lines",
          "Distance of a Point from a Line",
          "Distance of a Point from a Plane",
          "Equations of a Plane",
          "Skew Lines and Shortest Distance",
          "Vector and Cartesian Equations of a Line"
      ],
      "Linear Programming": [
          "Formulation of a Linear Programming Problem",
          "Graphical Solution of a Linear Programming Problem",
          "Linear Inequations in Two Variables"
      ],
      "Mathematical Logic": [
          "Application of Logic to Switching Circuits",
          "Converse, Inverse and Contrapositive",
          "Logical Equivalence and Algebra of Statements",
          "Quantifiers, Duality and Negation of Statements",
          "Statements and Logical Connectives",
          "Tautology, Contradiction and Contingency",
          "Truth Tables of Compound Statements"
      ],
      "Matrices": [
          "Elementary Transformations of a Matrix",
          "Inverse by Adjoint Method",
          "Inverse by Elementary Transformation Method",
          "Minors, Cofactors and Adjoint",
          "Solution of Linear Equations using Matrices"
      ],
      "Pair of Straight Lines": [
          "Angle between a Pair of Lines",
          "Angle Bisectors of a Pair of Lines",
          "Combined Equation of a Pair of Lines",
          "General Second Degree Equation of Two Lines"
      ],
      "Probability Distributions": [
          "Continuous Random Variables and Probability Density Function",
          "Cumulative Distribution Function",
          "Expected Value and Variance of a Random Variable",
          "Probability Mass Function of a Discrete Random Variable",
          "Random Variables and Their Types"
      ],
      "Trigonometric Functions": [
          "Applications of Sine, Cosine and Projection Rules",
          "Inverse Trigonometric Functions and Principal Values",
          "Polar Coordinates",
          "Properties of Inverse Trigonometric Functions",
          "Solution of Triangle — Sine, Cosine and Projection Rules",
          "Trigonometric Equations and General Solutions"
      ],
      "Vectors": [
          "Cross Product of Vectors",
          "Dot Product of Vectors",
          "Scalar and Vector Triple Product",
          "Section Formula",
          "Vectors and Their Types"
      ]
  },
};
