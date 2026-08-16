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
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/ncert/sections.ts`);
  return s;
}
