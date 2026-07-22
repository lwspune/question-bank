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
