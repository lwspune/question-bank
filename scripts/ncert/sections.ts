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
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/ncert/sections.ts`);
  return s;
}
