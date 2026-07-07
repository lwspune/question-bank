// Book-faithful section OUTLINES (the /board reader), one ordered list per
// chapter — the book's table of contents in physical reading order, verified
// against the source PDF. `assignSections` (lib.ts) maps each question's ref
// into a block; the array index (1-based) becomes section_seq. Question order
// WITHIN a block stays source_row.
//
// This is the artifact that makes /board book-faithful. It is NOT derivable
// from the conceptual `subtopic` axis (a single Exercise is split across
// subtopics) nor reliably from the ref string alone (labels are inconsistent
// across chapters). Authored + PDF-verified per chapter here; going forward the
// transcription agents emit it natively (they read the headings at ingest).
//
// backfill-sections.ts consumes these to populate migration-0043 columns.
import type { SectionSpec } from "./lib";

export const SECTIONS: Record<string, SectionSpec[]> = {
  // ── Ch.6 Line and Planes — verified against Ch_06_Line_&_Planes.pdf + the
  //    Part-1 ANSWERS section (2026-07-07). 7 numbered sections, but only 4
  //    numbered exercises + 2 Miscellaneous blocks: Exercise 6.1 (§6.1),
  //    Exercise 6.2 (covers §6.2+§6.3, physically after §6.3), Miscellaneous 6(A)
  //    MID-chapter (after Ex 6.2), Exercise 6.3 (§6.4), Exercise 6.4 (covers
  //    §6.5-§6.7, after §6.7), then terminal Miscellaneous 6(B) [I = MCQ, II =
  //    subjective]. Solved-example numbering runs continuously per half (§6.1-6.3
  //    = Ex.1-18, §6.4-6.7 restarts Ex.1-15); refs are section-prefixed so
  //    longest-prefix routing is unambiguous.
  "line-planes-12": [
    { group: "6.1 Vector and Cartesian Equations of a Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.1 SolvedEx"] },
    { group: "6.1 Vector and Cartesian Equations of a Line", label: "Exercise 6.1", kind: "exercise", refPrefixes: ["Ex 6.1 Q"] },
    { group: "6.2 Distance of a Point from a Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.2 SolvedEx"] },
    { group: "6.3 Skew Lines and Distance Between Them", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.3 SolvedEx"] },
    { group: "6.3 Skew Lines and Distance Between Them", label: "Exercise 6.2", kind: "exercise", refPrefixes: ["Ex 6.2 Q"] },
    { group: "Miscellaneous Exercise 6 (A)", label: "Miscellaneous Exercise 6 (A)", kind: "miscellaneous", refPrefixes: ["Misc A Q"] },
    { group: "6.4 Equations of Plane", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.4 SolvedEx"] },
    { group: "6.4 Equations of Plane", label: "Exercise 6.3", kind: "exercise", refPrefixes: ["Ex 6.3 Q"] },
    { group: "6.5 Angle Between Planes", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.5 SolvedEx"] },
    { group: "6.6 Coplanarity of Two Lines", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.6 SolvedEx"] },
    { group: "6.7 Distance of a Point from a Plane", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.7 SolvedEx"] },
    { group: "6.7 Distance of a Point from a Plane", label: "Exercise 6.4", kind: "exercise", refPrefixes: ["Ex 6.4 Q"] },
    { group: "Miscellaneous Exercise 6 (B)", label: "Choose correct alternatives", kind: "miscellaneous", refPrefixes: ["Misc I Q"] },
    { group: "Miscellaneous Exercise 6 (B)", label: "Solve the following", kind: "miscellaneous", refPrefixes: ["Misc II Q"] },
  ],

  // ── Ch.3 Trigonometric Functions — verified against Ch_03_Trigonometric_Functions.pdf.
  //    3 numbered sections, each Solved Examples → Exercise: 3.1 Trigonometric
  //    Equations (its solved run = the Principal-solutions "P*" block + the
  //    General-solutions "G*" block), 3.2 Solution of Triangle (polar / sine /
  //    cosine / projection / applications solved runs), 3.3 Inverse Trig Functions.
  //    Terminal Miscellaneous Exercise 3 (I = MCQ, II = subjective).
  "trig-functions-12": [
    { group: "3.1 Trigonometric Equations and their Solutions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.1 SolvedEx"] },
    { group: "3.1 Trigonometric Equations and their Solutions", label: "Exercise 3.1", kind: "exercise", refPrefixes: ["3.1 Ex.Q"] },
    { group: "3.2 Solution of Triangle", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.2 SolvedEx"] },
    { group: "3.2 Solution of Triangle", label: "Exercise 3.2", kind: "exercise", refPrefixes: ["3.2 Q"] },
    { group: "3.3 Inverse Trigonometric Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.3 SolvedEx"] },
    { group: "3.3 Inverse Trigonometric Functions", label: "Exercise 3.3", kind: "exercise", refPrefixes: ["3.3 Ex3.3"] },
    { group: "Miscellaneous Exercise 3", label: "Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 3", label: "Solve the following", kind: "miscellaneous", refPrefixes: ["Misc II"] },
  ],

  // ── Ch.2 Matrices — verified against Ch_02_Matrices.pdf (2026-07-06). Section
  //    titles from the p0 "Let's Study" TOC. NOTE the book layout: there are TWO
  //    miscellaneous exercises — 2(A) sits MID-chapter (after Exercise 2.2,
  //    before §2.3), 2(B) is terminal and opens with the MCQs ("Choose the
  //    correct alternative") then the word problems. Reading order is honored.
  "matrices-12": [
    { group: "2.1 Elementary Transformations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.1 Solved"] },
    { group: "2.1 Elementary Transformations", label: "Exercise 2.1", kind: "exercise", refPrefixes: ["2.1 Ex 2.1"] },
    { group: "2.2 Inverse of a Matrix", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.2 Solved"] },
    { group: "2.2 Inverse of a Matrix", label: "Exercise 2.2", kind: "exercise", refPrefixes: ["2.2 Ex 2.2"] },
    { group: "Miscellaneous Exercise 2 (A)", label: "Miscellaneous Exercise 2 (A)", kind: "miscellaneous", refPrefixes: ["Misc 2A"] },
    { group: "2.3 Application of Matrices", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.3 Solved"] },
    { group: "2.3 Application of Matrices", label: "Exercise 2.3", kind: "exercise", refPrefixes: ["2.3 Ex 2.3"] },
    { group: "Miscellaneous Exercise 2 (B)", label: "Choose the correct alternative", kind: "miscellaneous", refPrefixes: ["Misc I"] },
    { group: "Miscellaneous Exercise 2 (B)", label: "Answer the following", kind: "miscellaneous", refPrefixes: ["Misc II"] },
  ],

  // ── Ch.5 Application of Definite Integration — one section (5.1) with Solved
  //    Examples → Exercise 5.1, then a terminal Miscellaneous Exercise 5
  //    (I MCQ / II subjective). Verified against Ch_05_Application_of_Definite_Integration.pdf.
  "app-def-integration-12": [
    { group: "5.1 Area under the Curve", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.1 Solved"] },
    { group: "5.1 Area under the Curve", label: "Exercise 5.1", kind: "exercise", refPrefixes: ["5.1 Exercise 5.1"] },
    { group: "Miscellaneous Exercise 5", label: "Choose the correct option", kind: "miscellaneous", refPrefixes: ["Misc I ("] },
    { group: "Miscellaneous Exercise 5", label: "Solve the following", kind: "miscellaneous", refPrefixes: ["Misc II"] },
  ],

  // ── Ch.1 Mathematical Logic — verified against Ch_01_Mathematical_Logic.pdf.
  //    5 numbered sections (each Solved Examples → Exercise); terminal
  //    Miscellaneous Exercise 1 (I = MCQ, II = subjective Q.2–Q.17). The 1.3/1.4
  //    "Ex 1/2/3" worked examples are SOLVED (bucket) and separated from the real
  //    "Ex 1.3/1.4" exercises by longest-prefix-wins.
  "logic-12": [
    { group: "1.1 Statements and Logical Connectives", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.1 Solved"] },
    { group: "1.1 Statements and Logical Connectives", label: "Exercise 1.1", kind: "exercise", refPrefixes: ["1.1 Ex 1.1"] },
    { group: "1.2 Statement Pattern, Logical Equivalence, Tautology, Contradiction and Contingency", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.2 Solved"] },
    { group: "1.2 Statement Pattern, Logical Equivalence, Tautology, Contradiction and Contingency", label: "Exercise 1.2", kind: "exercise", refPrefixes: ["1.2 Ex 1.2"] },
    { group: "1.3 Quantifiers, Duality, Negation, Converse, Inverse and Contrapositive", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.3 Ex 1", "1.3 Ex 2", "1.3 Ex 3"] },
    { group: "1.3 Quantifiers, Duality, Negation, Converse, Inverse and Contrapositive", label: "Exercise 1.3", kind: "exercise", refPrefixes: ["1.3 Ex 1.3"] },
    { group: "1.4 Some Important Results (Algebra of Statements)", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.4 Ex 1", "1.4 Ex 2", "1.4 Ex 3"] },
    { group: "1.4 Some Important Results (Algebra of Statements)", label: "Exercise 1.4", kind: "exercise", refPrefixes: ["1.4 Ex 1.4"] },
    { group: "1.5 Application of Logic to Switching Circuits", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.5 Solved", "1.5 Ex 2"] },
    { group: "1.5 Application of Logic to Switching Circuits", label: "Exercise 1.5", kind: "exercise", refPrefixes: ["1.5 Ex 1.5"] },
    { group: "Miscellaneous Exercise 1", label: "Choose the correct alternative", kind: "miscellaneous", refPrefixes: ["Misc I ("] },
    { group: "Miscellaneous Exercise 1", label: "Solve the following", kind: "miscellaneous", refPrefixes: ["Misc Q"] },
  ],

  // ── Ch.4 Pair of Straight Lines — verified against Ch_04_Pair_of_Straight_Lines.pdf.
  //    Section/exercise OFFSET: 4 content sections (4.1–4.4) but only 3 numbered
  //    exercises (4.1–4.3). Each exercise physically CLOSES the section after the
  //    one it's numbered for; §4.1 is solved-only. Terminal Miscellaneous 4.
  "pair-lines-12": [
    { group: "4.1 Combined Equation of a Pair of Lines", label: "4.1 Combined Equation of a Pair of Lines", kind: "solved_example", refPrefixes: ["4.1 Solved Ex."] },
    { group: "4.2 Homogeneous Equation of Degree Two", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.1 Solved (4.2)"] },
    { group: "4.2 Homogeneous Equation of Degree Two", label: "Exercise 4.1", kind: "exercise", refPrefixes: ["4.1 Ex 4.1"] },
    { group: "4.3 Angle between a Pair of Lines", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.2 Ex."] },
    { group: "4.3 Angle between a Pair of Lines", label: "Exercise 4.2", kind: "exercise", refPrefixes: ["4.2 Q"] },
    { group: "4.4 General Second Degree Equation in x and y", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.3 Ex."] },
    { group: "4.4 General Second Degree Equation in x and y", label: "Exercise 4.3", kind: "exercise", refPrefixes: ["4.3 Q"] },
    { group: "Miscellaneous Exercise 4", label: "Choose the correct alternative", kind: "miscellaneous", refPrefixes: ["Misc I ("] },
    { group: "Miscellaneous Exercise 4", label: "Solve the following", kind: "miscellaneous", refPrefixes: ["Misc II"] },
  ],

  // ── Ch.7 Linear Programming — verified against Ch_07_Linear_Programming.pdf.
  //    2 numbered sections; §7.1 holds Exercises 7.1 AND 7.2, §7.2 holds 7.3 AND
  //    7.4 (each preceded by its own Solved Examples run). Solved examples carry
  //    odd labels ("Feasible Ex", "Graphical Example") — routed by bucket.
  //    Terminal Miscellaneous 7 (I = MCQ, II = subjective).
  "linear-prog-12": [
    { group: "7.1 Linear Inequations in Two Variables", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.1 Ex."] },
    { group: "7.1 Linear Inequations in Two Variables", label: "Exercise 7.1", kind: "exercise", refPrefixes: ["7.1 Exercise 7.1"] },
    { group: "7.1 Linear Inequations in Two Variables", label: "Solved Examples (Feasible Region)", kind: "solved_example", refPrefixes: ["7.1 Feasible Ex"] },
    { group: "7.1 Linear Inequations in Two Variables", label: "Exercise 7.2", kind: "exercise", refPrefixes: ["7.1 Exercise 7.2"] },
    { group: "7.2 Linear Programming Problem (L.P.P.)", label: "Solved Examples (Formulation)", kind: "solved_example", refPrefixes: ["7.2 Ex."] },
    { group: "7.2 Linear Programming Problem (L.P.P.)", label: "Exercise 7.3", kind: "exercise", refPrefixes: ["7.2 Exercise 7.3"] },
    { group: "7.2 Linear Programming Problem (L.P.P.)", label: "Solved Examples (Graphical Method)", kind: "solved_example", refPrefixes: ["7.2 Graphical Example"] },
    { group: "7.2 Linear Programming Problem (L.P.P.)", label: "Exercise 7.4", kind: "exercise", refPrefixes: ["7.2 Exercise 7.4"] },
    { group: "Miscellaneous Exercise 7", label: "Choose the correct alternative", kind: "miscellaneous", refPrefixes: ["Misc I ("] },
    { group: "Miscellaneous Exercise 7", label: "Solve the following", kind: "miscellaneous", refPrefixes: ["Misc II"] },
  ],

  // ── Ch.6 Differential Equations — verified against Ch_06_Diffrential_Equations.pdf.
  //    Exercise-number OFFSET: ref leading token is the SECTION (6.2–6.5); the
  //    real exercise is the "Exercise N.N" token inside. §6.4 (Solution) holds
  //    3 exercises via subsections 6.4/6.4.1 Homogeneous/6.4.2 Linear. Section
  //    6.4's Ex.1 problems are solved 3 ways (general/homogeneous/linear) — the
  //    method suffix routes each solved run to its subsection. Terminal Misc 6.
  "diff-equations-12": [
    { group: "6.2 Order and Degree of a Differential Equation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.2 Ex."] },
    { group: "6.2 Order and Degree of a Differential Equation", label: "Exercise 6.1", kind: "exercise", refPrefixes: ["6.2 Exercise 6.1"] },
    { group: "6.3 Formation of a Differential Equation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.3 Ex."] },
    { group: "6.3 Formation of a Differential Equation", label: "Exercise 6.2", kind: "exercise", refPrefixes: ["6.3 Exercise"] },
    { group: "6.4 Solution of a Differential Equation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.4 Ex.1 (verify", "6.4 Ex.2 (verify", "6.4 Ex.1 (i) general", "6.4 Ex.1 (ii) general", "6.4 Ex.2 (i) particular", "6.4 Ex.2 (ii) particular", "6.4 Ex.3"] },
    { group: "6.4 Solution of a Differential Equation", label: "Exercise 6.3", kind: "exercise", refPrefixes: ["6.4 Exercise 6.3"] },
    { group: "6.4.1 Homogeneous Differential Equation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.4 Ex.1 (i) homogeneous", "6.4 Ex.1 (ii) homogeneous", "6.4 Ex.1 (iii) homogeneous"] },
    { group: "6.4.1 Homogeneous Differential Equation", label: "Exercise 6.4", kind: "exercise", refPrefixes: ["6.4 Exercise 6.4"] },
    { group: "6.4.2 Linear Differential Equation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.4 Ex.1 (i) linear", "6.4 Ex.1 (ii) linear", "6.4 Ex.1 (iii) linear", "6.4 Ex.2 (slope"] },
    { group: "6.4.2 Linear Differential Equation", label: "Exercise 6.5", kind: "exercise", refPrefixes: ["6.4 Exercise 6.5"] },
    { group: "6.5 Application of Differential Equations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["6.5 Ex."] },
    { group: "6.5 Application of Differential Equations", label: "Exercise 6.6", kind: "exercise", refPrefixes: ["6.5 Exercise 6.6"] },
    { group: "Miscellaneous Exercise 6", label: "Choose the correct alternative", kind: "miscellaneous", refPrefixes: ["Misc I ("] },
    { group: "Miscellaneous Exercise 6", label: "Solve the following", kind: "miscellaneous", refPrefixes: ["Misc II"] },
  ],
  // ── Ch.5 Vectors — verified against Ch_05_Vectors.pdf (2026-07-06). 5 numbered
  //    sections matching the p0 "Let's Study" TOC, each Solved Examples → its own
  //    Exercise (5.1–5.5). Terminal Miscellaneous Exercise 5 (I = MCQ, II = subjective).
  "vectors-12": [
    { group: "5.1 Vectors and their Types", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.1 SolvedEx"] },
    { group: "5.1 Vectors and their Types", label: "Exercise 5.1", kind: "exercise", refPrefixes: ["5.1 Ex.Q"] },
    { group: "5.2 Section Formula", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.2 SolvedEx"] },
    { group: "5.2 Section Formula", label: "Exercise 5.2", kind: "exercise", refPrefixes: ["5.2 Ex.Q"] },
    { group: "5.3 Dot Product of Vectors", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.3 SolvedEx"] },
    { group: "5.3 Dot Product of Vectors", label: "Exercise 5.3", kind: "exercise", refPrefixes: ["5.3 Ex.Q"] },
    { group: "5.4 Vector Product of Vectors", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.4 SolvedEx"] },
    { group: "5.4 Vector Product of Vectors", label: "Exercise 5.4", kind: "exercise", refPrefixes: ["5.4 Ex.Q"] },
    { group: "5.5 Scalar and Vector Triple Product", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.5 SolvedEx"] },
    { group: "5.5 Scalar and Vector Triple Product", label: "Exercise 5.5", kind: "exercise", refPrefixes: ["5.5 Ex.Q"] },
    { group: "Miscellaneous Exercise 5", label: "Select the correct answer", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 5", label: "Solve the following", kind: "miscellaneous", refPrefixes: ["Misc II"] },
  ],
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/stateboard/sections.ts`);
  return s;
}
