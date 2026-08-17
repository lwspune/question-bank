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
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/ncert/sections.ts`);
  return s;
}
