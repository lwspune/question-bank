// Book-faithful section OUTLINES (the /board reader) for NCERT chapters — the
// book's table of contents in physical reading order, verified against the
// source PDF. `assignSections` (lib.ts) maps each question's ref into a block;
// the array index (1-based) becomes section_seq. Same shape + API as
// scripts/stateboard/sections.ts.
//
// REF CONVENTION the transcription agents follow (so longest-prefix routing is
// unambiguous — see the vision-agent brief):
//   solved example in the §7.k band     → "7.k Eg.N"     (Eg = worked Example N)
//   exercise question / sub-item / MCQ   → "Ex 7.k Q<n>"  (+ "(iii)" for sub-items)
//   miscellaneous solved example         → "Misc Eg.N"
//   miscellaneous exercise / MCQ         → "Misc Q<n>"
// Note "Ex 7.1 Q" is NOT a prefix of "Ex 7.10 Q" (char after "7.1" is a space vs
// "0"), and "7.1 Eg" is NOT a prefix of "7.10 Eg" — so per-exercise blocks don't
// collide. Verified against the reconstructed outline after transcription.
import type { SectionSpec } from "./lib";

export const SECTIONS: Record<string, SectionSpec[]> = {
  // ── Ch.2 Inverse Trigonometric Functions (12th, Part 1). Two numbered
  //    exercises + a terminal Miscellaneous block. Examples 1-2 precede
  //    Exercise 2.1, Examples 3-5 precede Exercise 2.2, Example 6 is the book's
  //    single Miscellaneous Example.
  inverseTrig: [
    { group: "2.2 Basic Concepts", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.1 Eg"] },
    { group: "2.2 Basic Concepts", label: "Exercise 2.1", kind: "exercise", refPrefixes: ["Ex 2.1 Q"] },
    { group: "2.3 Properties of Inverse Trigonometric Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.2 Eg"] },
    { group: "2.3 Properties of Inverse Trigonometric Functions", label: "Exercise 2.2", kind: "exercise", refPrefixes: ["Ex 2.2 Q"] },
    { group: "Miscellaneous Exercise on Chapter 2", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 2", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.5 Continuity and Differentiability (12th, Part 1) — the book's largest
  //    chapter: SEVEN numbered exercises + a Miscellaneous block. Examples run
  //    1-43 continuously and band to the exercise each precedes (1-20 → Ex 5.1,
  //    21 → 5.2, 22-24 → 5.3, 25-26 → 5.4, 27-30 → 5.5, 31-34 → 5.6, 35-38 → 5.7,
  //    39-43 → Miscellaneous).
  //    **§5.5 HAS NO PRINTED SECTION HEADING.** The book's numbered sections run
  //    5.1, 5.2, 5.2.1, 5.3, 5.3.1-5.3.3, 5.4, 5.6, 5.7 — yet Exercise 5.5 exists
  //    and drills logarithmic differentiation. The group title below therefore
  //    names what the exercise teaches rather than quoting a heading that is not
  //    on the page, and says so, so nobody "fixes" it later.
  continuityDiff: [
    { group: "5.2 Continuity", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.1 Eg"] },
    { group: "5.2 Continuity", label: "Exercise 5.1", kind: "exercise", refPrefixes: ["Ex 5.1 Q"] },
    { group: "5.3.1 Derivatives of Composite Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.2 Eg"] },
    { group: "5.3.1 Derivatives of Composite Functions", label: "Exercise 5.2", kind: "exercise", refPrefixes: ["Ex 5.2 Q"] },
    { group: "5.3.2-5.3.3 Derivatives of Implicit and Inverse Trigonometric Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.3 Eg"] },
    { group: "5.3.2-5.3.3 Derivatives of Implicit and Inverse Trigonometric Functions", label: "Exercise 5.3", kind: "exercise", refPrefixes: ["Ex 5.3 Q"] },
    { group: "5.4 Exponential and Logarithmic Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.4 Eg"] },
    { group: "5.4 Exponential and Logarithmic Functions", label: "Exercise 5.4", kind: "exercise", refPrefixes: ["Ex 5.4 Q"] },
    { group: "5.5 Logarithmic Differentiation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.5 Eg"] },
    { group: "5.5 Logarithmic Differentiation", label: "Exercise 5.5", kind: "exercise", refPrefixes: ["Ex 5.5 Q"] },
    { group: "5.6 Derivatives of Functions in Parametric Forms", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.6 Eg"] },
    { group: "5.6 Derivatives of Functions in Parametric Forms", label: "Exercise 5.6", kind: "exercise", refPrefixes: ["Ex 5.6 Q"] },
    { group: "5.7 Second Order Derivative", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.7 Eg"] },
    { group: "5.7 Second Order Derivative", label: "Exercise 5.7", kind: "exercise", refPrefixes: ["Ex 5.7 Q"] },
    { group: "Miscellaneous Exercise on Chapter 5", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 5", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.6 Application of Derivatives (12th, Part 1). THREE numbered exercises +
  //    a Miscellaneous block. §6.4.1 (closed interval) shares Exercise 6.3 with
  //    §6.4, so those two sections share one group. Examples 1-6 → Ex 6.1,
  //    7-13 → Ex 6.2, 14-29 → Ex 6.3, 30-37 → Miscellaneous.
  //    The rationalised edition has DROPPED tangents & normals and approximations
  //    — there is no §6.5/§6.6 and no exercise for either.
  appDerivatives: [
    { group: "6.2 Rate of Change of Quantities", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.1 Eg"] },
    { group: "6.2 Rate of Change of Quantities", label: "Exercise 6.1", kind: "exercise", refPrefixes: ["Ex 6.1 Q"] },
    { group: "6.3 Increasing and Decreasing Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.2 Eg"] },
    { group: "6.3 Increasing and Decreasing Functions", label: "Exercise 6.2", kind: "exercise", refPrefixes: ["Ex 6.2 Q"] },
    { group: "6.4 Maxima and Minima", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.3 Eg"] },
    { group: "6.4 Maxima and Minima", label: "Exercise 6.3", kind: "exercise", refPrefixes: ["Ex 6.3 Q"] },
    { group: "Miscellaneous Exercise on Chapter 6", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 6", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.8 Application of Integrals (12th, Part 2) — the smallest chapter: ONE
  //    numbered exercise + a Miscellaneous block. The rationalised edition keeps
  //    §8.1 and §8.2 only. Examples 1-2 → Ex 8.1, 3-4 → Miscellaneous.
  appIntegrals: [
    { group: "8.2 Area under Simple Curves", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.1 Eg"] },
    { group: "8.2 Area under Simple Curves", label: "Exercise 8.1", kind: "exercise", refPrefixes: ["Ex 8.1 Q"] },
    { group: "Miscellaneous Exercise on Chapter 8", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 8", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.10 Vector Algebra (12th, Part 2). FOUR numbered exercises + a
  //    Miscellaneous block. Exercise 10.2 is preceded by the worked examples of
  //    §10.4 (addition), §10.5 (scalar multiplication/components), §10.5.2 and
  //    §10.5.3 (section formula), so those share one group. Examples 1-3 → Ex 10.1,
  //    4-12 → Ex 10.2, 13-21 → Ex 10.3, 22-25 → Ex 10.4, 26-30 → Miscellaneous.
  vectorAlgebra: [
    { group: "10.3 Types of Vectors", label: "Solved Examples", kind: "solved_example", refPrefixes: ["10.1 Eg"] },
    { group: "10.3 Types of Vectors", label: "Exercise 10.1", kind: "exercise", refPrefixes: ["Ex 10.1 Q"] },
    { group: "10.4-10.5 Addition, Components and Section Formula", label: "Solved Examples", kind: "solved_example", refPrefixes: ["10.2 Eg"] },
    { group: "10.4-10.5 Addition, Components and Section Formula", label: "Exercise 10.2", kind: "exercise", refPrefixes: ["Ex 10.2 Q"] },
    { group: "10.6.1-10.6.2 Scalar (Dot) Product and Projection", label: "Solved Examples", kind: "solved_example", refPrefixes: ["10.3 Eg"] },
    { group: "10.6.1-10.6.2 Scalar (Dot) Product and Projection", label: "Exercise 10.3", kind: "exercise", refPrefixes: ["Ex 10.3 Q"] },
    { group: "10.6.3 Vector (Cross) Product of Two Vectors", label: "Solved Examples", kind: "solved_example", refPrefixes: ["10.4 Eg"] },
    { group: "10.6.3 Vector (Cross) Product of Two Vectors", label: "Exercise 10.4", kind: "exercise", refPrefixes: ["Ex 10.4 Q"] },
    { group: "Miscellaneous Exercise on Chapter 10", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 10", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.12 Linear Programming (12th, Part 2). ONE numbered exercise and NOTHING
  //    ELSE — this chapter has **no Miscellaneous Exercise and no Miscellaneous
  //    Examples**, verified by a full heading sweep of all 12 pages, so the
  //    absence of a `Misc` block below is deliberate rather than an omission.
  //    Examples 1-5 all precede Exercise 12.1.
  linearProgramming: [
    { group: "12.2.2 Graphical Method of Solving Linear Programming Problems", label: "Solved Examples", kind: "solved_example", refPrefixes: ["12.1 Eg"] },
    { group: "12.2.2 Graphical Method of Solving Linear Programming Problems", label: "Exercise 12.1", kind: "exercise", refPrefixes: ["Ex 12.1 Q"] },
  ],

  // ── Ch.1 Relations and Functions (12th, Part 1). Only TWO numbered exercises:
  //    the rationalised 2025-26 edition gives §1.4 (Composition of Functions and
  //    Invertible Function) NO exercise of its own — verified on the page, its
  //    Example 17 solution is followed immediately by the Miscellaneous Examples
  //    heading. Its worked Examples 15-17 therefore have no exercise to band to
  //    and are ref'd `Misc Eg.15/16/17`, i.e. they sit in the Miscellaneous
  //    solved block below alongside the book's own Miscellaneous Examples 18-26.
  //    That is the one place this outline is not literally the book's layout, and
  //    it is recorded here rather than hidden: /board shows all twelve together.
  //    Solved examples reconcile exactly with the book's printed numbering —
  //    Eg 1-6 → Exercise 1.1, Eg 7-14 → Exercise 1.2, Eg 15-26 → Miscellaneous.
  relationsFunctions: [
    { group: "1.2 Types of Relations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.1 Eg"] },
    { group: "1.2 Types of Relations", label: "Exercise 1.1", kind: "exercise", refPrefixes: ["Ex 1.1 Q"] },
    { group: "1.3 Types of Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.2 Eg"] },
    { group: "1.3 Types of Functions", label: "Exercise 1.2", kind: "exercise", refPrefixes: ["Ex 1.2 Q"] },
    { group: "Miscellaneous Exercise on Chapter 1", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 1", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.9 Differential Equations (12th, Part 2). Five numbered exercises, each
  //    preceded by its section's worked examples, then a terminal Miscellaneous
  //    block. NOTE the SECTION and EXERCISE numbers are OUT OF STEP in this
  //    edition — §9.3 is followed by *Exercise 9.2*, and §9.4.1/9.4.2/9.4.3 by
  //    Exercises 9.3/9.4/9.5. Refs band by EXERCISE (the convention), so a worked
  //    example printed under §9.3 refs as `9.2 Eg.N`. That looks like an
  //    off-by-one to anyone checking refs against printed section headings; it is
  //    not. Group titles below use the SECTION heading the book actually prints.
  //    The rationalised edition has dropped "Formation of a differential equation
  //    whose general solution is given" — §9.4 is methods-only.
  differentialEquations: [
    { group: "9.2 Basic Concepts — Order and Degree", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.1 Eg"] },
    { group: "9.2 Basic Concepts — Order and Degree", label: "Exercise 9.1", kind: "exercise", refPrefixes: ["Ex 9.1 Q"] },
    { group: "9.3 General and Particular Solutions of a Differential Equation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.2 Eg"] },
    { group: "9.3 General and Particular Solutions of a Differential Equation", label: "Exercise 9.2", kind: "exercise", refPrefixes: ["Ex 9.2 Q"] },
    { group: "9.4.1 Differential Equations with Variables Separable", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.3 Eg"] },
    { group: "9.4.1 Differential Equations with Variables Separable", label: "Exercise 9.3", kind: "exercise", refPrefixes: ["Ex 9.3 Q"] },
    { group: "9.4.2 Homogeneous Differential Equations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.4 Eg"] },
    { group: "9.4.2 Homogeneous Differential Equations", label: "Exercise 9.4", kind: "exercise", refPrefixes: ["Ex 9.4 Q"] },
    { group: "9.4.3 Linear Differential Equations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.5 Eg"] },
    { group: "9.4.3 Linear Differential Equations", label: "Exercise 9.5", kind: "exercise", refPrefixes: ["Ex 9.5 Q"] },
    { group: "Miscellaneous Exercise on Chapter 9", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 9", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.13 Probability (12th, Part 2). Three numbered exercises + a terminal
  //    Miscellaneous block. The rationalised 2025-26 edition ENDS at Bayes'
  //    theorem (§13.5) — random variables, probability distributions, mean and
  //    variance, and the binomial distribution are all gone, so there is no §13.6
  //    and no Exercise 13.4. Exercise 13.2 is preceded by the worked examples of
  //    BOTH §13.3 (multiplication theorem) and §13.4 (independent events), which
  //    is why those two sections share one group here.
  probability: [
    { group: "13.2 Conditional Probability", label: "Solved Examples", kind: "solved_example", refPrefixes: ["13.1 Eg"] },
    { group: "13.2 Conditional Probability", label: "Exercise 13.1", kind: "exercise", refPrefixes: ["Ex 13.1 Q"] },
    { group: "13.3 Multiplication Theorem on Probability and 13.4 Independent Events", label: "Solved Examples", kind: "solved_example", refPrefixes: ["13.2 Eg"] },
    { group: "13.3 Multiplication Theorem on Probability and 13.4 Independent Events", label: "Exercise 13.2", kind: "exercise", refPrefixes: ["Ex 13.2 Q"] },
    { group: "13.5 Bayes' Theorem", label: "Solved Examples", kind: "solved_example", refPrefixes: ["13.3 Eg"] },
    { group: "13.5 Bayes' Theorem", label: "Exercise 13.3", kind: "exercise", refPrefixes: ["Ex 13.3 Q"] },
    { group: "Miscellaneous Exercise on Chapter 13", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 13", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.11 Three Dimensional Geometry (12th, Part 2). Only TWO numbered
  //    exercises: the rationalised 2025-26 edition ends at §11.5, so the plane is
  //    absent entirely. Reading order verified against the rendered pages by two
  //    independent transcription agents, who BOTH corrected the same thing —
  //    Examples 4 and 5 sit ABOVE the Exercise 11.1 box (they are §11.2 content:
  //    direction cosines of the axes, collinearity via direction ratios), so all
  //    of Eg 1-5 band to Exercise 11.1 and only Eg 6-10 band to Exercise 11.2.
  //    There is NO Miscellaneous Examples block — Ex 11.2 Q15 is followed
  //    immediately by the Miscellaneous Exercise heading, so no `Misc Eg` spec.
  threeDGeometry: [
    { group: "11.2 Direction Cosines and Direction Ratios of a Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["11.1 Eg"] },
    { group: "11.2 Direction Cosines and Direction Ratios of a Line", label: "Exercise 11.1", kind: "exercise", refPrefixes: ["Ex 11.1 Q"] },
    { group: "11.3 Equation of a Line in Space, 11.4 Angle between Two Lines and 11.5 Shortest Distance", label: "Solved Examples", kind: "solved_example", refPrefixes: ["11.2 Eg"] },
    { group: "11.3 Equation of a Line in Space, 11.4 Angle between Two Lines and 11.5 Shortest Distance", label: "Exercise 11.2", kind: "exercise", refPrefixes: ["Ex 11.2 Q"] },
    { group: "Miscellaneous Exercise on Chapter 11", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.7 Integrals (12th, Part 2) — 10 numbered exercises (7.1–7.10), each
  //    preceded by its section's worked examples, then a terminal Miscellaneous
  //    Exercise (solved examples + subjective + MCQ tail). Section→page map lives
  //    in config.ts. Solved-example blocks that turn out empty in the book become
  //    harmless emptySpec warnings at backfill (pruned then).
  integrals: [
    { group: "7.2 Integration as an Inverse Process of Differentiation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.1 Eg"] },
    { group: "7.2 Integration as an Inverse Process of Differentiation", label: "Exercise 7.1", kind: "exercise", refPrefixes: ["Ex 7.1 Q"] },
    { group: "7.3 Methods of Integration — Substitution", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.2 Eg"] },
    { group: "7.3 Methods of Integration — Substitution", label: "Exercise 7.2", kind: "exercise", refPrefixes: ["Ex 7.2 Q"] },
    { group: "7.3 Methods of Integration — Trigonometric Identities", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.3 Eg"] },
    { group: "7.3 Methods of Integration — Trigonometric Identities", label: "Exercise 7.3", kind: "exercise", refPrefixes: ["Ex 7.3 Q"] },
    { group: "7.4 Integrals of Some Particular Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.4 Eg"] },
    { group: "7.4 Integrals of Some Particular Functions", label: "Exercise 7.4", kind: "exercise", refPrefixes: ["Ex 7.4 Q"] },
    { group: "7.5 Integration by Partial Fractions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.5 Eg"] },
    { group: "7.5 Integration by Partial Fractions", label: "Exercise 7.5", kind: "exercise", refPrefixes: ["Ex 7.5 Q"] },
    { group: "7.6 Integration by Parts", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.6 Eg"] },
    { group: "7.6 Integration by Parts", label: "Exercise 7.6", kind: "exercise", refPrefixes: ["Ex 7.6 Q"] },
    { group: "7.6 Integrals of Special Forms", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.7 Eg"] },
    { group: "7.6 Integrals of Special Forms", label: "Exercise 7.7", kind: "exercise", refPrefixes: ["Ex 7.7 Q"] },
    { group: "7.7 Definite Integral and the Fundamental Theorem", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.8 Eg"] },
    { group: "7.7 Definite Integral and the Fundamental Theorem", label: "Exercise 7.8", kind: "exercise", refPrefixes: ["Ex 7.8 Q"] },
    { group: "7.9 Evaluation of Definite Integrals by Substitution", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.9 Eg"] },
    { group: "7.9 Evaluation of Definite Integrals by Substitution", label: "Exercise 7.9", kind: "exercise", refPrefixes: ["Ex 7.9 Q"] },
    { group: "7.10 Some Properties of Definite Integrals", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.10 Eg"] },
    { group: "7.10 Some Properties of Definite Integrals", label: "Exercise 7.10", kind: "exercise", refPrefixes: ["Ex 7.10 Q"] },
    { group: "Miscellaneous Exercise on Chapter 7", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 7", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.3 Matrices (12th, Part 1). Book reading order: §3.2/3.3 (order, types)
  //    with Examples 1–5 → Exercise 3.1; §3.4 Operations with Examples 6–19 →
  //    Exercise 3.2; §3.5/3.6 Transpose + Symmetric/Skew with Examples 20–22 →
  //    Exercise 3.3; §3.7 Elementary Operations → Exercise 3.4 (one MCQ, the
  //    rationalised 2025-26 edition dropped its subjective questions; §3.7 has no
  //    solved-example block — its worked examples are the Miscellaneous Examples);
  //    then the Miscellaneous Examples 23–25 and the Miscellaneous Exercise.
  //    Example refs are section-banded (3.1/3.2/3.3 Eg + Misc Eg) so each solved
  //    block routes cleanly. Verified against the reconstructed outline.
  matrices: [
    { group: "3.2 Matrices and 3.3 Types of Matrices", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.1 Eg"] },
    { group: "3.2 Matrices and 3.3 Types of Matrices", label: "Exercise 3.1", kind: "exercise", refPrefixes: ["Ex 3.1 Q"] },
    { group: "3.4 Operations on Matrices", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.2 Eg"] },
    { group: "3.4 Operations on Matrices", label: "Exercise 3.2", kind: "exercise", refPrefixes: ["Ex 3.2 Q"] },
    { group: "3.5 Transpose and 3.6 Symmetric and Skew Symmetric Matrices", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.3 Eg"] },
    { group: "3.5 Transpose and 3.6 Symmetric and Skew Symmetric Matrices", label: "Exercise 3.3", kind: "exercise", refPrefixes: ["Ex 3.3 Q"] },
    { group: "3.7 Elementary Operation (Transformation) of a Matrix", label: "Exercise 3.4", kind: "exercise", refPrefixes: ["Ex 3.4 Q"] },
    { group: "Miscellaneous Exercise on Chapter 3", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 3", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.4 Determinants (12th, Part 1). Book reading order: each numbered section
  //    (§4.2 Determinant → §4.3 Area → §4.4 Minors & Cofactors → §4.5 Adjoint &
  //    Inverse → §4.6 Applications) with its worked Examples then its Exercise,
  //    followed by the Miscellaneous Exercise. Example refs are section-banded
  //    (4.1/4.2/4.3/4.4/4.5 Eg — band = the exercise the examples lead into) so
  //    each solved block routes cleanly. This edition's Miscellaneous has no
  //    solved-example block (only the exercise). Verified against the outline.
  determinants: [
    { group: "4.2 Determinant", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.1 Eg"] },
    { group: "4.2 Determinant", label: "Exercise 4.1", kind: "exercise", refPrefixes: ["Ex 4.1 Q"] },
    { group: "4.3 Area of a Triangle", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.2 Eg"] },
    { group: "4.3 Area of a Triangle", label: "Exercise 4.2", kind: "exercise", refPrefixes: ["Ex 4.2 Q"] },
    { group: "4.4 Minors and Cofactors", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.3 Eg"] },
    { group: "4.4 Minors and Cofactors", label: "Exercise 4.3", kind: "exercise", refPrefixes: ["Ex 4.3 Q"] },
    { group: "4.5 Adjoint and Inverse of a Matrix", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.4 Eg"] },
    { group: "4.5 Adjoint and Inverse of a Matrix", label: "Exercise 4.4", kind: "exercise", refPrefixes: ["Ex 4.4 Q"] },
    { group: "4.6 Applications of Determinants and Matrices", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.5 Eg"] },
    { group: "4.6 Applications of Determinants and Matrices", label: "Exercise 4.5", kind: "exercise", refPrefixes: ["Ex 4.5 Q"] },
    { group: "Miscellaneous Exercise on Chapter 4", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.7 Binomial Theorem (CLASS 11). The book's thinnest chapter: the
  //    rationalised edition cuts it to §7.1-§7.2.2, leaving ONE numbered
  //    exercise plus a terminal Miscellaneous block. All four worked Examples
  //    (1-4) sit in the run-up to Exercise 7.1, so they band to it; there is no
  //    Miscellaneous Example, hence no "Misc Eg" block.
  //    Verified against the pages: Eg.3 spans p5→p6, Eg.4 precedes the exercise
  //    on p6, and Exercise 7.1 itself runs p6→p7 (Q1-Q3 on p6, Q4-Q14 overleaf).
  // ══════════════════════════════════════════════════════════════════════════
  // The remaining 10 CLASS 11 chapters. Every one has the same shape — one
  // Solved Examples + Exercise pair per numbered exercise, then the book's own
  // centred "Miscellaneous Examples" block and the Miscellaneous Exercise.
  // Group titles are the book's printed section headings; an Example block is
  // named for the exercise it PRECEDES, which is what the ref convention encodes.
  // Prefix safety: no chapter here reaches a tenth exercise, so "Ex 1.1 Q"
  // cannot collide with an "Ex 1.10 Q" and "1.1 Eg" cannot collide with "1.10 Eg".
  c11Sets: [
    { group: "1.2 Sets and their Representations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.1 Eg"] },
    { group: "1.2 Sets and their Representations", label: "Exercise 1.1", kind: "exercise", refPrefixes: ["Ex 1.1 Q"] },
    { group: "1.3-1.5 The Empty, Finite and Equal Sets", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.2 Eg"] },
    { group: "1.3-1.5 The Empty, Finite and Equal Sets", label: "Exercise 1.2", kind: "exercise", refPrefixes: ["Ex 1.2 Q"] },
    { group: "1.6 Subsets", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.3 Eg"] },
    { group: "1.6 Subsets", label: "Exercise 1.3", kind: "exercise", refPrefixes: ["Ex 1.3 Q"] },
    { group: "1.9 Operations on Sets", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.4 Eg"] },
    { group: "1.9 Operations on Sets", label: "Exercise 1.4", kind: "exercise", refPrefixes: ["Ex 1.4 Q"] },
    { group: "1.10 Complement of a Set", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.5 Eg"] },
    { group: "1.10 Complement of a Set", label: "Exercise 1.5", kind: "exercise", refPrefixes: ["Ex 1.5 Q"] },
    { group: "Miscellaneous Exercise on Chapter 1", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 1", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  c11RelationsFunctions: [
    { group: "2.2 Cartesian Products of Sets", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.1 Eg"] },
    { group: "2.2 Cartesian Products of Sets", label: "Exercise 2.1", kind: "exercise", refPrefixes: ["Ex 2.1 Q"] },
    { group: "2.3 Relations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.2 Eg"] },
    { group: "2.3 Relations", label: "Exercise 2.2", kind: "exercise", refPrefixes: ["Ex 2.2 Q"] },
    { group: "2.4 Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.3 Eg"] },
    { group: "2.4 Functions", label: "Exercise 2.3", kind: "exercise", refPrefixes: ["Ex 2.3 Q"] },
    { group: "Miscellaneous Exercise on Chapter 2", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 2", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // §3.4 is the chapter's LAST numbered section — there is no trigonometric-
  // equations block, so Exercise 3.3 closes the chapter's teaching run.
  c11TrigonometricFunctions: [
    { group: "3.2 Angles and their Measurement", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.1 Eg"] },
    { group: "3.2 Angles and their Measurement", label: "Exercise 3.1", kind: "exercise", refPrefixes: ["Ex 3.1 Q"] },
    { group: "3.3 Trigonometric Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.2 Eg"] },
    { group: "3.3 Trigonometric Functions", label: "Exercise 3.2", kind: "exercise", refPrefixes: ["Ex 3.2 Q"] },
    { group: "3.4 Trigonometric Functions of Sum and Difference of Two Angles", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.3 Eg"] },
    { group: "3.4 Trigonometric Functions of Sum and Difference of Two Angles", label: "Exercise 3.3", kind: "exercise", refPrefixes: ["Ex 3.3 Q"] },
    { group: "Miscellaneous Exercise on Chapter 3", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 3", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ONE numbered exercise: the rationalised edition keeps only the one-variable
  // half of the chapter, so there is no two-variable/half-plane block.
  c11LinearInequalities: [
    { group: "5.3 Algebraic Solutions of Linear Inequalities in One Variable", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.1 Eg"] },
    { group: "5.3 Algebraic Solutions of Linear Inequalities in One Variable", label: "Exercise 5.1", kind: "exercise", refPrefixes: ["Ex 5.1 Q"] },
    { group: "Miscellaneous Exercise on Chapter 5", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 5", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  c11PermutationsCombinations: [
    { group: "6.2 Fundamental Principle of Counting", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.1 Eg"] },
    { group: "6.2 Fundamental Principle of Counting", label: "Exercise 6.1", kind: "exercise", refPrefixes: ["Ex 6.1 Q"] },
    { group: "6.3 Permutations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.2 Eg"] },
    { group: "6.3 Permutations", label: "Exercise 6.2", kind: "exercise", refPrefixes: ["Ex 6.2 Q"] },
    { group: "6.3.4 Permutations when Objects are Not Distinct", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.3 Eg"] },
    { group: "6.3.4 Permutations when Objects are Not Distinct", label: "Exercise 6.3", kind: "exercise", refPrefixes: ["Ex 6.3 Q"] },
    { group: "6.4 Combinations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.4 Eg"] },
    { group: "6.4 Combinations", label: "Exercise 6.4", kind: "exercise", refPrefixes: ["Ex 6.4 Q"] },
    { group: "Miscellaneous Exercise on Chapter 6", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 6", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  c11StraightLines: [
    { group: "9.2 Slope of a Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.1 Eg"] },
    { group: "9.2 Slope of a Line", label: "Exercise 9.1", kind: "exercise", refPrefixes: ["Ex 9.1 Q"] },
    { group: "9.3 Various Forms of the Equation of a Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.2 Eg"] },
    { group: "9.3 Various Forms of the Equation of a Line", label: "Exercise 9.2", kind: "exercise", refPrefixes: ["Ex 9.2 Q"] },
    { group: "9.4 Distance of a Point From a Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.3 Eg"] },
    { group: "9.4 Distance of a Point From a Line", label: "Exercise 9.3", kind: "exercise", refPrefixes: ["Ex 9.3 Q"] },
    { group: "Miscellaneous Exercise on Chapter 9", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 9", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // The chapter stops at the distance formula — no section formula, no direction
  // cosines, no lines or planes. Those are Class 12's separate 3-D chapter.
  c11ThreeDGeometry: [
    { group: "11.2-11.3 Coordinate Axes, Planes and Points in Space", label: "Solved Examples", kind: "solved_example", refPrefixes: ["11.1 Eg"] },
    { group: "11.2-11.3 Coordinate Axes, Planes and Points in Space", label: "Exercise 11.1", kind: "exercise", refPrefixes: ["Ex 11.1 Q"] },
    { group: "11.4 Distance between Two Points", label: "Solved Examples", kind: "solved_example", refPrefixes: ["11.2 Eg"] },
    { group: "11.4 Distance between Two Points", label: "Exercise 11.2", kind: "exercise", refPrefixes: ["Ex 11.2 Q"] },
    { group: "Miscellaneous Exercise on Chapter 11", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 11", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // The book's largest chapter. Note its first exercise does not appear until
  // p20 — the long opening run is teaching prose plus a SEPARATE numbering
  // stream, "Illustration 1..10", which is deliberately not ingested.
  c11LimitsDerivatives: [
    { group: "12.3-12.4 Limits", label: "Solved Examples", kind: "solved_example", refPrefixes: ["12.1 Eg"] },
    { group: "12.3-12.4 Limits", label: "Exercise 12.1", kind: "exercise", refPrefixes: ["Ex 12.1 Q"] },
    { group: "12.5 Derivatives", label: "Solved Examples", kind: "solved_example", refPrefixes: ["12.2 Eg"] },
    { group: "12.5 Derivatives", label: "Exercise 12.2", kind: "exercise", refPrefixes: ["Ex 12.2 Q"] },
    { group: "Miscellaneous Exercise on Chapter 12", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 12", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  c11Statistics: [
    { group: "13.4 Mean Deviation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["13.1 Eg"] },
    { group: "13.4 Mean Deviation", label: "Exercise 13.1", kind: "exercise", refPrefixes: ["Ex 13.1 Q"] },
    { group: "13.5 Variance and Standard Deviation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["13.2 Eg"] },
    { group: "13.5 Variance and Standard Deviation", label: "Exercise 13.2", kind: "exercise", refPrefixes: ["Ex 13.2 Q"] },
    { group: "Miscellaneous Exercise on Chapter 13", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 13", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // The spine opens at §14.1 "Event" — there is no Introduction section, since
  // random experiments and sample space are assumed from Class 10.
  c11Probability: [
    { group: "14.1 Event", label: "Solved Examples", kind: "solved_example", refPrefixes: ["14.1 Eg"] },
    { group: "14.1 Event", label: "Exercise 14.1", kind: "exercise", refPrefixes: ["Ex 14.1 Q"] },
    { group: "14.2 Axiomatic Approach to Probability", label: "Solved Examples", kind: "solved_example", refPrefixes: ["14.2 Eg"] },
    { group: "14.2 Axiomatic Approach to Probability", label: "Exercise 14.2", kind: "exercise", refPrefixes: ["Ex 14.2 Q"] },
    { group: "Miscellaneous Exercise on Chapter 14", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 14", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.4 Complex Numbers and Quadratic Equations (CLASS 11). ONE numbered
  //    exercise plus a terminal Miscellaneous block — there is no Exercise 4.2,
  //    confirmed by reading p07→p09 continuously: §4.5 Argand Plane has no
  //    exercise at all. Examples 1–8 span §4.3–§4.4 and all precede Exercise 4.1,
  //    so they band to it; Examples 7–8 sit in the Miscellaneous run-up.
  c11ComplexNumbers: [
    { group: "4.2-4.4 Complex Numbers, Algebra, Modulus and Conjugate", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.1 Eg"] },
    { group: "4.2-4.4 Complex Numbers, Algebra, Modulus and Conjugate", label: "Exercise 4.1", kind: "exercise", refPrefixes: ["Ex 4.1 Q"] },
    { group: "Miscellaneous Exercise on Chapter 4", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 4", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.8 Sequences and Series (CLASS 11). TWO numbered exercises + a terminal
  //    Miscellaneous block. NOTE the book prints its heading as "Miscellaneous
  //    Exercise **On** Chapter 8" with a capital O — the only chapter in the
  //    book that does — and the group title below follows the page.
  //    There is NO Arithmetic Progression section: §8.3 Series is followed
  //    directly by §8.4 Geometric Progression.
  c11SequencesSeries: [
    { group: "8.2-8.3 Sequences and Series", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.1 Eg"] },
    { group: "8.2-8.3 Sequences and Series", label: "Exercise 8.1", kind: "exercise", refPrefixes: ["Ex 8.1 Q"] },
    { group: "8.4 Geometric Progression", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.2 Eg"] },
    { group: "8.4 Geometric Progression", label: "Exercise 8.2", kind: "exercise", refPrefixes: ["Ex 8.2 Q"] },
    { group: "Miscellaneous Exercise On Chapter 8", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise On Chapter 8", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.10 Conic Sections (CLASS 11). FOUR numbered exercises, one per conic,
  //    plus the book's own centred "Miscellaneous Examples" block (Examples
  //    17–19) and then the Miscellaneous Exercise. §10.1/§10.2 (sections of a
  //    cone, degenerate conics) carry NO Example and NO exercise — pure teaching
  //    prose — so they get no block here, which is also why the chapter has no
  //    `Sections of a Cone` subtopic.
  //    Prefix safety: this chapter has no §10.10, so "10.1 Eg" cannot collide
  //    with a "10.10 Eg", and "Ex 10.1 Q" cannot collide with "Ex 10.10 Q".
  c11ConicSections: [
    { group: "10.3 Circle", label: "Solved Examples", kind: "solved_example", refPrefixes: ["10.1 Eg"] },
    { group: "10.3 Circle", label: "Exercise 10.1", kind: "exercise", refPrefixes: ["Ex 10.1 Q"] },
    { group: "10.4 Parabola", label: "Solved Examples", kind: "solved_example", refPrefixes: ["10.2 Eg"] },
    { group: "10.4 Parabola", label: "Exercise 10.2", kind: "exercise", refPrefixes: ["Ex 10.2 Q"] },
    { group: "10.5 Ellipse", label: "Solved Examples", kind: "solved_example", refPrefixes: ["10.3 Eg"] },
    { group: "10.5 Ellipse", label: "Exercise 10.3", kind: "exercise", refPrefixes: ["Ex 10.3 Q"] },
    { group: "10.6 Hyperbola", label: "Solved Examples", kind: "solved_example", refPrefixes: ["10.4 Eg"] },
    { group: "10.6 Hyperbola", label: "Exercise 10.4", kind: "exercise", refPrefixes: ["Ex 10.4 Q"] },
    { group: "Miscellaneous Exercise on Chapter 10", label: "Miscellaneous Examples", kind: "solved_example", refPrefixes: ["Misc Eg"] },
    { group: "Miscellaneous Exercise on Chapter 10", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  c11BinomialTheorem: [
    { group: "7.2 Binomial Theorem for Positive Integral Indices", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.1 Eg"] },
    { group: "7.2 Binomial Theorem for Positive Integral Indices", label: "Exercise 7.1", kind: "exercise", refPrefixes: ["Ex 7.1 Q"] },
    { group: "Miscellaneous Exercise on Chapter 7", label: "Miscellaneous Exercise", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ══ PHYSICS ═══════════════════════════════════════════════════════════════
  // A Physics chapter's book structure is SIMPLER than a Maths one and its refs
  // are different: there is exactly ONE terminal exercise block, numbered
  // <chapter>.<n> directly, so there is no per-exercise banding and no
  // Miscellaneous. The two prefixes are "Eg <n>." (worked Examples, printed
  // "Example 8.3") and "Ex <n>." (exercise questions, printed "8.5").
  //
  // Those two namespaces OVERLAP by number and must not be merged: NCERT numbers
  // worked Examples 8.1-8.5 and then restarts the exercises at 8.1, so "Eg 8.1"
  // and "Ex 8.1" are different questions sharing a number. That is exactly why
  // the prefixes differ. See PHYSICS_TRANSCRIPTION_BRIEF.md.

  // Ch.8 Mechanical Properties of Solids — all five worked Examples sit inside
  // §8.5 Elastic Moduli (verified by the transcription pass, which read the
  // pages: 8.1/8.2/8.3 are Young's modulus, 8.4 shear, 8.5 bulk), so they form a
  // single solved block rather than one per section.
  c11PhyMechSolids: [
    { group: "8.5 Elastic Moduli", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 8."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 8."] },
  ],

  // The remaining 27 Physics chapters. These are PRE-AUTHORED for the whole
  // subject rather than one at a time, and that is a parallelism decision as much
  // as a convenience: sections.ts is a single shared code file, so a wave of
  // per-chapter agents editing it concurrently would collide. Pre-authoring takes
  // it off the per-chapter critical path entirely.
  //
  // They are mechanical because a Physics chapter's book structure is UNIFORM —
  // worked Examples scattered through the teaching prose, then ONE terminal
  // exercise block. There is no Miscellaneous and no per-exercise banding, which
  // is what makes the Maths outlines above long and these two lines each.
  //
  // The group is "Worked Examples" rather than a section title because in most
  // chapters the Examples span several sections, so naming one would be false.
  // Ch.8 above is the exception and keeps its section title: all five of its
  // Examples genuinely sit inside §8.5, which the transcription pass verified
  // from the pages.

  // Ch.1 Units and Measurement — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 1." and "Ex 1." cannot collide.
  c11PhyUnits: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 1."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 1."] },
  ],

  // Ch.2 Motion in a Straight Line — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 2." and "Ex 2." cannot collide.
  c11PhyMotionLine: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 2."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 2."] },
  ],

  // Ch.3 Motion in a Plane — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 3." and "Ex 3." cannot collide.
  c11PhyMotionPlane: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 3."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 3."] },
  ],

  // Ch.4 Laws of Motion — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 4." and "Ex 4." cannot collide.
  c11PhyLawsMotion: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 4."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 4."] },
  ],

  // Ch.5 Work, Energy and Power — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 5." and "Ex 5." cannot collide.
  c11PhyWorkEnergy: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 5."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 5."] },
  ],

  // Ch.6 System of Particles and Rotational Motion — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 6." and "Ex 6." cannot collide.
  c11PhyRotational: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 6."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 6."] },
  ],

  // Ch.7 Gravitation — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 7." and "Ex 7." cannot collide.
  c11PhyGravitation: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 7."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 7."] },
  ],

  // Ch.9 Mechanical Properties of Fluids — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 9." and "Ex 9." cannot collide.
  c11PhyMechFluids: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 9."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 9."] },
  ],

  // Ch.10 Thermal Properties of Matter — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 10." and "Ex 10." cannot collide.
  c11PhyThermalProps: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 10."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 10."] },
  ],

  // Ch.11 Thermodynamics — EXERCISES ONLY, deliberately. This chapter contains NO
  // worked Examples at all: verified by reading all 18 pages (the one worked
  // calculation, the 1 g water liquid-to-vapour ΔU in §11.6, is unnumbered
  // illustrative prose, not an `Example 11.x` block).
  //
  // The solved block is REMOVED rather than left to match nothing, because
  // `section_seq` is the block's INDEX in this array: leaving an unmatched block
  // first puts every exercise row at seq 2 with no seq 1, and `board:lint` fails
  // the chapter for non-contiguous section_seq. It caught exactly that here after
  // the chapter had already been flipped PUBLIC — which is the check working.
  //
  // The pre-authored two-block outlines below assume both blocks exist, which is
  // true of every other Physics chapter measured so far. Any chapter that turns
  // out to have no Examples needs this same single-block treatment. (Oscillations
  // and Waves were ALSO predicted to have none by a text probe and both in fact
  // DO — their transcriptions carry Eg 13.x and Eg 14.x refs — so verify from the
  // committed rows, not from the probe.)
  c11PhyThermodynamics: [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 11."] },
  ],

  // Ch.12 Kinetic Theory — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 12." and "Ex 12." cannot collide.
  c11PhyKineticTheory: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 12."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 12."] },
  ],

  // Ch.13 Oscillations — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 13." and "Ex 13." cannot collide.
  c11PhyOscillations: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 13."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 13."] },
  ],

  // Ch.14 Waves — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 14." and "Ex 14." cannot collide.
  c11PhyWaves: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 14."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 14."] },
  ],

  // Ch.1 Electric Charges and Fields — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 1." and "Ex 1." cannot collide.
  c12PhyElectricCharges: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 1."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 1."] },
  ],

  // Ch.2 Electrostatic Potential and Capacitance — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 2." and "Ex 2." cannot collide.
  c12PhyPotentialCap: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 2."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 2."] },
  ],

  // Ch.3 Current Electricity — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 3." and "Ex 3." cannot collide.
  c12PhyCurrentElec: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 3."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 3."] },
  ],

  // Ch.4 Moving Charges and Magnetism — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 4." and "Ex 4." cannot collide.
  c12PhyMovingCharges: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 4."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 4."] },
  ],

  // Ch.5 Magnetism and Matter — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 5." and "Ex 5." cannot collide.
  c12PhyMagnetismMatter: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 5."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 5."] },
  ],

  // Ch.6 Electromagnetic Induction — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 6." and "Ex 6." cannot collide.
  c12PhyEMInduction: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 6."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 6."] },
  ],

  // Ch.7 Alternating Current — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 7." and "Ex 7." cannot collide.
  c12PhyAlternatingCurrent: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 7."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 7."] },
  ],

  // Ch.8 Electromagnetic Waves — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 8." and "Ex 8." cannot collide.
  c12PhyEMWaves: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 8."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 8."] },
  ],

  // Ch.9 Ray Optics and Optical Instruments — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 9." and "Ex 9." cannot collide.
  c12PhyRayOptics: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 9."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 9."] },
  ],

  // Ch.10 Wave Optics — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 10." and "Ex 10." cannot collide.
  c12PhyWaveOptics: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 10."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 10."] },
  ],

  // Ch.11 Dual Nature of Radiation and Matter — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 11." and "Ex 11." cannot collide.
  c12PhyDualNature: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 11."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 11."] },
  ],

  // Ch.12 Atoms — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 12." and "Ex 12." cannot collide.
  c12PhyAtoms: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 12."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 12."] },
  ],

  // Ch.13 Nuclei — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 13." and "Ex 13." cannot collide.
  c12PhyNuclei: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 13."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 13."] },
  ],

  // Ch.14 Semiconductor Electronics: Materials, Devices and Simple Circuits — worked Examples scattered through the teaching prose, then the
  // single terminal exercise block. "Eg 14." and "Ex 14." cannot collide.
  c12PhySemiconductors: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 14."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 14."] },
  ],

  // ── CHEMISTRY. Ch.1 Solutions (12th, Part 1) — THREE blocks, not two, because
  // NCERT Chemistry carries a stream Physics does not: unsolved "Intext Questions"
  // interspersed through the chapter, separate from the end-of-chapter Exercises.
  //
  // The book numbers BOTH streams 1.1, 1.2, … so the refs — not the numbers — are
  // what keep them apart. "Ex 1." and "Intext 1." share no prefix in either
  // direction, so longest-prefix routing is unambiguous; a bare "1.5" would not be.
  //
  // Both question blocks are kind 'exercise' (only a worked item with the book's
  // own printed solution is 'solved_example', which `bucketMatchesKind` enforces).
  // Reading order is the book's: worked Examples and Intext Questions are
  // interspersed through the teaching prose, Exercises are terminal.
  c12ChemSolutions: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 1."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 1."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 1."] },
  ],


  // ── The remaining nine Class-12 Chemistry chapters. Three blocks each, in the
  // book's own reading order: worked Examples and Intext Questions interspersed
  // through the teaching prose, Exercises terminal.
  //
  // `Ex <n>.` and `Intext <n>.` share no prefix in either direction, which is what
  // keeps routing unambiguous while the BOOK numbers both streams identically.
  //
  // ⚠ c12ChemBiomolecules has only TWO blocks — that chapter contains ZERO worked
  // examples (the string "Example" occurs 0 times across its 22 pages), so a
  // solved_example block would route nothing and render an empty section.

  c12ChemElectrochemistry: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 2."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 2."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 2."] },
  ],

  c12ChemKinetics: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 3."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 3."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 3."] },
  ],

  c12ChemDBlock: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 4."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 4."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 4."] },
  ],

  c12ChemCoordination: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 5."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 5."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 5."] },
  ],

  c12ChemHaloalkanes: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 6."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 6."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 6."] },
  ],

  c12ChemAlcohols: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 7."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 7."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 7."] },
  ],

  c12ChemAldehydes: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 8."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 8."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 8."] },
  ],

  c12ChemAmines: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 9."] },
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 9."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 9."] },
  ],

  c12ChemBiomolecules: [
    { group: "Intext Questions", label: "Intext Questions", kind: "exercise", refPrefixes: ["Intext 10."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 10."] },
  ],


  // ── Class-11 Chemistry: TWO blocks per chapter, not three. This book has no
  // Intext stream at all (confirmed across all nine chapters), so an
  // "Intext Questions" block would route nothing and render an empty section.
  // Worked items print as `Problem N.n` but carry the same `Eg N.` ref as
  // Class 12's `Example N.n` — the ref convention is per-pipeline, not per-book.

  c11ChemBasicConcepts: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 1."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 1."] },
  ],

  c11ChemStructureAtom: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 2."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 2."] },
  ],

  c11ChemPeriodicity: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 3."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 3."] },
  ],

  c11ChemBonding: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 4."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 4."] },
  ],

  c11ChemThermodynamics: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 5."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 5."] },
  ],

  c11ChemEquilibrium: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 6."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 6."] },
  ],

  c11ChemRedox: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 7."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 7."] },
  ],

  c11ChemOrganicBasics: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 8."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 8."] },
  ],

  c11ChemHydrocarbons: [
    { group: "Worked Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Eg 9."] },
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex 9."] },
  ],

  // ── Ch.1 Real Numbers (10th) — the first Class-10 outline. TWO taught sections,
  //    each with its own worked examples followed by its own exercise, and NO
  //    Miscellaneous block (Class 10 has none in any of its 14 chapters).
  //    Examples band to the exercise they precede, the Class-11/12 convention:
  //    Examples 1-4 sit under §1.2 and precede Ex 1.1 → "1.1 Eg.N"; Examples 5-7
  //    sit under §1.3 and precede Ex 1.2 → "1.2 Eg.N".
  // ── Ch.2 Polynomials (10th). TWO taught sections, each with its worked
  //    example(s) then its exercise. §2.2 carries Example 1 only; §2.3 carries
  //    Examples 2-5. Examples band to the exercise they precede: 1 → "2.1 Eg.N",
  //    2-5 → "2.2 Eg.N" (the prefix names the EXERCISE, not the section).
  c10Polynomials: [
    { group: "2.2 Geometrical Meaning of the Zeroes of a Polynomial", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.1 Eg"] },
    { group: "2.2 Geometrical Meaning of the Zeroes of a Polynomial", label: "Exercise 2.1", kind: "exercise", refPrefixes: ["Ex 2.1 Q"] },
    { group: "2.3 Relationship between Zeroes and Coefficients of a Polynomial", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.2 Eg"] },
    { group: "2.3 Relationship between Zeroes and Coefficients of a Polynomial", label: "Exercise 2.2", kind: "exercise", refPrefixes: ["Ex 2.2 Q"] },
  ],

  // ── Ch.3 Pair of Linear Equations in Two Variables (10th). SIX blocks over what
  //    reads as two taught sections, because §3.3 splits into 3.3.1 Substitution
  //    Method and 3.3.2 Elimination Method — each with its own worked examples and
  //    its own exercise. Grouping Ex 3.2 and Ex 3.3 under one "3.3" header would
  //    merge two methods the book teaches apart, and the reader would show a
  //    12-question and a 9-question exercise as one 21-question block.
  //    Examples band to the exercise they precede: 1-3 → "3.1 Eg.N",
  //    4-7 → "3.2 Eg.N", 8-10 → "3.3 Eg.N".
  c10LinearEquations: [
    { group: "3.2 Graphical Method of Solution of a Pair of Linear Equations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.1 Eg"] },
    { group: "3.2 Graphical Method of Solution of a Pair of Linear Equations", label: "Exercise 3.1", kind: "exercise", refPrefixes: ["Ex 3.1 Q"] },
    { group: "3.3.1 Substitution Method", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.2 Eg"] },
    { group: "3.3.1 Substitution Method", label: "Exercise 3.2", kind: "exercise", refPrefixes: ["Ex 3.2 Q"] },
    { group: "3.3.2 Elimination Method", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.3 Eg"] },
    { group: "3.3.2 Elimination Method", label: "Exercise 3.3", kind: "exercise", refPrefixes: ["Ex 3.3 Q"] },
  ],

  // ── Ch.4 Quadratic Equations (10th). THREE taught sections, each with its own
  //    worked examples then its own exercise. Examples band to the exercise they
  //    precede: 1-2 → "4.1 Eg.N", 3-6 → "4.2 Eg.N", 7-9 → "4.3 Eg.N"
  //    (the prefix names the EXERCISE, not the section).
  c10QuadraticEquations: [
    { group: "4.2 Quadratic Equations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.1 Eg"] },
    { group: "4.2 Quadratic Equations", label: "Exercise 4.1", kind: "exercise", refPrefixes: ["Ex 4.1 Q"] },
    { group: "4.3 Solution of a Quadratic Equation by Factorisation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.2 Eg"] },
    { group: "4.3 Solution of a Quadratic Equation by Factorisation", label: "Exercise 4.2", kind: "exercise", refPrefixes: ["Ex 4.2 Q"] },
    { group: "4.4 Nature of Roots", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.3 Eg"] },
    { group: "4.4 Nature of Roots", label: "Exercise 4.3", kind: "exercise", refPrefixes: ["Ex 4.3 Q"] },
  ],

  // ── Ch.5 Arithmetic Progressions (10th). SEVEN blocks: three taught sections
  //    each with examples + exercise, then a FOURTH exercise the book labels
  //    "EXERCISE 5.4 (Optional)*" and footnotes "not from the examination point
  //    of view". It gets its OWN group rather than being folded into §5.4,
  //    because it draws on the whole chapter and is not that section's exercise.
  //    It is deliberately NOT kind:"miscellaneous" — Class 10 has no
  //    Miscellaneous anywhere, and labelling it so would invent a block the book
  //    does not print. Examples band to the exercise they precede: 1-2 →
  //    "5.1 Eg.N", 3-10 → "5.2 Eg.N", 11-16 → "5.3 Eg.N".
  c10ArithmeticProgressions: [
    { group: "5.2 Arithmetic Progressions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.1 Eg"] },
    { group: "5.2 Arithmetic Progressions", label: "Exercise 5.1", kind: "exercise", refPrefixes: ["Ex 5.1 Q"] },
    { group: "5.3 nth Term of an AP", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.2 Eg"] },
    { group: "5.3 nth Term of an AP", label: "Exercise 5.2", kind: "exercise", refPrefixes: ["Ex 5.2 Q"] },
    { group: "5.4 Sum of First n Terms of an AP", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.3 Eg"] },
    { group: "5.4 Sum of First n Terms of an AP", label: "Exercise 5.3", kind: "exercise", refPrefixes: ["Ex 5.3 Q"] },
    { group: "Exercise 5.4 (Optional)", label: "Exercise 5.4 (Optional)", kind: "exercise", refPrefixes: ["Ex 5.4 Q"] },
  ],

  // ── Ch.7 Coordinate Geometry (10th). FOUR blocks over two taught sections.
  //    The 2025-26 reprint has no "Area of a Triangle" section, so there is no
  //    third exercise. Examples band to the exercise they precede: 1-5 →
  //    "7.1 Eg.N", 6-10 → "7.2 Eg.N".
  c10CoordinateGeometry: [
    { group: "7.2 Distance Formula", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.1 Eg"] },
    { group: "7.2 Distance Formula", label: "Exercise 7.1", kind: "exercise", refPrefixes: ["Ex 7.1 Q"] },
    { group: "7.3 Section Formula", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.2 Eg"] },
    { group: "7.3 Section Formula", label: "Exercise 7.2", kind: "exercise", refPrefixes: ["Ex 7.2 Q"] },
  ],

  // ── Ch.8 Introduction to Trigonometry (10th). SIX blocks over three taught
  //    sections. This reprint has NO complementary-angles section, so §8.4 is
  //    Identities and there is no fourth exercise. Examples band to the exercise
  //    they precede: 1-5 → "8.1 Eg.N", 6-8 → "8.2 Eg.N", 9-12 → "8.3 Eg.N".
  c10Trigonometry: [
    { group: "8.2 Trigonometric Ratios", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.1 Eg"] },
    { group: "8.2 Trigonometric Ratios", label: "Exercise 8.1", kind: "exercise", refPrefixes: ["Ex 8.1 Q"] },
    { group: "8.3 Trigonometric Ratios of Some Specific Angles", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.2 Eg"] },
    { group: "8.3 Trigonometric Ratios of Some Specific Angles", label: "Exercise 8.2", kind: "exercise", refPrefixes: ["Ex 8.2 Q"] },
    { group: "8.4 Trigonometric Identities", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.3 Eg"] },
    { group: "8.4 Trigonometric Identities", label: "Exercise 8.3", kind: "exercise", refPrefixes: ["Ex 8.3 Q"] },
  ],

  c10RealNumbers: [
    { group: "1.2 The Fundamental Theorem of Arithmetic", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.1 Eg"] },
    { group: "1.2 The Fundamental Theorem of Arithmetic", label: "Exercise 1.1", kind: "exercise", refPrefixes: ["Ex 1.1 Q"] },
    { group: "1.3 Revisiting Irrational Numbers", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.2 Eg"] },
    { group: "1.3 Revisiting Irrational Numbers", label: "Exercise 1.2", kind: "exercise", refPrefixes: ["Ex 1.2 Q"] },
  ],

  // ── Ch.6 Triangles (10th). THREE taught sections, each ending in its own
  //    exercise, and no Miscellaneous block (Class 10 has none anywhere).
  //    §6.2 carries NO worked examples — Examples 1-3 all sit in §6.3 and
  //    Examples 4-8 in §6.4, so Exercise 6.1 follows its section's prose
  //    directly. That asymmetry is why the outline is 5 blocks and not 6.
  //    Examples band to the exercise they precede: 1-3 → "6.2 Eg.N",
  //    4-8 → "6.3 Eg.N" (the band prefix names the EXERCISE, not the section).
  c10Triangles: [
    { group: "6.2 Similar Figures", label: "Exercise 6.1", kind: "exercise", refPrefixes: ["Ex 6.1 Q"] },
    { group: "6.3 Similarity of Triangles", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.2 Eg"] },
    { group: "6.3 Similarity of Triangles", label: "Exercise 6.2", kind: "exercise", refPrefixes: ["Ex 6.2 Q"] },
    { group: "6.4 Criteria for Similarity of Triangles", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.3 Eg"] },
    { group: "6.4 Criteria for Similarity of Triangles", label: "Exercise 6.3", kind: "exercise", refPrefixes: ["Ex 6.3 Q"] },
  ],

  // ── Ch.13 Statistics (10th). THREE taught sections, each with its own worked
  //    examples then its own exercise — the cleanest shape in the book, because
  //    the chapter is one measure per section (mean · mode · median).
  //    Examples band to the exercise they precede: 1-3 → "13.1 Eg.N",
  //    4-6 → "13.2 Eg.N", 7-8 → "13.3 Eg.N".
  // ── Ch.12 Surface Areas and Volumes (10th). TWO taught sections, each with
  //    its worked examples then its exercise. Examples 1-4 → "12.1 Eg.N",
  //    5-7 → "12.2 Eg.N" (the prefix names the EXERCISE they precede).
  c10SurfaceAreas: [
    { group: "12.2 Surface Area of a Combination of Solids", label: "Solved Examples", kind: "solved_example", refPrefixes: ["12.1 Eg"] },
    { group: "12.2 Surface Area of a Combination of Solids", label: "Exercise 12.1", kind: "exercise", refPrefixes: ["Ex 12.1 Q"] },
    { group: "12.3 Volume of a Combination of Solids", label: "Solved Examples", kind: "solved_example", refPrefixes: ["12.2 Eg"] },
    { group: "12.3 Volume of a Combination of Solids", label: "Exercise 12.2", kind: "exercise", refPrefixes: ["Ex 12.2 Q"] },
  ],

  c10Statistics: [
    { group: "13.2 Mean of Grouped Data", label: "Solved Examples", kind: "solved_example", refPrefixes: ["13.1 Eg"] },
    { group: "13.2 Mean of Grouped Data", label: "Exercise 13.1", kind: "exercise", refPrefixes: ["Ex 13.1 Q"] },
    { group: "13.3 Mode of Grouped Data", label: "Solved Examples", kind: "solved_example", refPrefixes: ["13.2 Eg"] },
    { group: "13.3 Mode of Grouped Data", label: "Exercise 13.2", kind: "exercise", refPrefixes: ["Ex 13.2 Q"] },
    { group: "13.4 Median of Grouped Data", label: "Solved Examples", kind: "solved_example", refPrefixes: ["13.3 Eg"] },
    { group: "13.4 Median of Grouped Data", label: "Exercise 13.3", kind: "exercise", refPrefixes: ["Ex 13.3 Q"] },
  ],

  // ── Ch.14 Probability (10th). ONE taught section for the whole chapter, so
  //    this outline is two blocks rather than the usual per-section pairs.
  //    All 13 examples precede the single exercise → "14.1 Eg.N".
  c10Probability: [
    { group: "14.1 Probability — A Theoretical Approach", label: "Solved Examples", kind: "solved_example", refPrefixes: ["14.1 Eg"] },
    { group: "14.1 Probability — A Theoretical Approach", label: "Exercise 14.1", kind: "exercise", refPrefixes: ["Ex 14.1 Q"] },
  ],
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/ncert/sections.ts`);
  return s;
}
