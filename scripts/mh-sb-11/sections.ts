// Book-faithful section OUTLINES (the /board reader) for the Class-11 chapters —
// one ordered list per chapter, the book's table of contents in physical reading
// order, verified against the source PDF. `assignSections` (../stateboard/lib)
// maps each question's ref into a block; the array index (1-based) becomes
// section_seq. Question order WITHIN a block stays source_row.
//
// NOT derivable from the conceptual `subtopic` axis (a single Exercise is split
// across subtopics) nor reliably from the ref string alone. Authored +
// PDF-verified per chapter here; backfill-sections.ts consumes these to populate
// the migration-0043 columns, and `npm run board:lint` fails if a PUBLIC row of a
// board exam lacks section_* or a chapter's section_seq isn't contiguous 1..N.
//
// The Class-11 book layout per chapter (same shape as Class 12, NOT Class 9):
// interleaved solved examples in the theory, "EXERCISE N.M" exercise blocks, then
// a chapter-end "MISCELLANEOUS EXERCISE - N" split into (I) an MCQ block and (II)
// free-response. Authored per chapter after transcription (step 8b of the runbook).
//
// Refs follow the BOOK's numbering, which RESTARTS at 1 in Part 2 — see the
// numbering note in ./config.ts. No collision results, because every chapter is
// its own `source_file`.
import type { SectionSpec } from "./lib";

export const SECTIONS: Record<string, SectionSpec[]> = {
  // ── Ch.5 Sets and Relations (PART 2 — the book restarts at Ch.1 in this volume, so its
  //    exercises are "5.1"/"5.2" and its closing block is "MISCELLANEOUS EXERCISE - 5").
  //    Verified against Ch_05_Set_Relation.pdf (19pp, printed pp.87-105).
  //
  //    This chapter is the reason the README now demands a `Solution :` scan before planning
  //    bands: it carries 29 solution markers, of which only ~18 are inside the two boxed
  //    SOLVED EXAMPLES blocks. The other ~11 are worked examples embedded in the theory, which
  //    a banner scan cannot see. They are given SUB-SECTION-scoped refs (5.1.2, 5.1.5, 5.1.6,
  //    5.2.1, 5.2.2, 5.2.4, 5.2.5, 5.2.7) so they cannot collide with the boxed blocks' bare
  //    `5.1 SolvedEx.N` / `5.2 SolvedEx.N` — the book reuses its own `Ex.` numbers across both.
  //    Prefix safety: "5.1 SolvedEx" cannot swallow "5.1.2 SolvedEx.1" (space vs dot at char 4),
  //    and assignSections resolves longest-prefix-wins regardless.
  "sets-relations-11": [
    { group: "5.1.2 Representation of a Set", label: "Worked Examples", kind: "solved_example", refPrefixes: ["5.1.2 SolvedEx"] },
    { group: "5.1.5 Operations on Sets", label: "Worked Examples", kind: "solved_example", refPrefixes: ["5.1.5 SolvedEx"] },
    { group: "5.1.6 Intervals", label: "Worked Examples", kind: "solved_example", refPrefixes: ["5.1.6 SolvedEx"] },
    { group: "5.1 Sets", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.1 SolvedEx"] },
    { group: "Exercise 5.1", label: "Exercise 5.1", kind: "exercise", refPrefixes: ["Ex 5.1 "] },
    { group: "5.2.1 Ordered Pair", label: "Worked Examples", kind: "solved_example", refPrefixes: ["5.2.1 SolvedEx"] },
    { group: "5.2.2 Cartesian Product", label: "Worked Examples", kind: "solved_example", refPrefixes: ["5.2.2 SolvedEx"] },
    { group: "5.2.4 Domain, Co-domain and Range", label: "Worked Examples", kind: "solved_example", refPrefixes: ["5.2.4 SolvedEx"] },
    { group: "5.2.5 Relations — Illustrative Examples", label: "Worked Examples", kind: "solved_example", refPrefixes: ["5.2.5 SolvedEx"] },
    { group: "5.2.7 Types of Relations", label: "Worked Examples", kind: "solved_example", refPrefixes: ["5.2.7 SolvedEx"] },
    { group: "5.2 Relations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.2 SolvedEx"] },
    { group: "Exercise 5.2", label: "Exercise 5.2", kind: "exercise", refPrefixes: ["Ex 5.2 "] },
    { group: "Miscellaneous Exercise 5", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 5", label: "(II)", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.1 Angle and its Measurement (Part 1) — verified against
  //    "Ch_01_Angle and its Measurement.pdf" (13pp, printed pp.1-13). Reading order:
  //      theory 1.1 (directed angles, sexagesimal + circular systems)
  //        -> its Solved Examples (p-04..p-06) -> EXERCISE 1.1 (p-07..p-08, Q.1-Q.14)
  //      theory 1.2 (arc length, sector area)
  //        -> its Solved Examples (p-08..p-10) -> EXERCISE 1.2 (p-10, Q.1-Q.10)
  //      "Let's Remember" summary box (not questions)
  //        -> MISCELLANEOUS EXERCISE - 1, printed in two labelled parts.
  //    NOTE both solved runs straddle a page break (SolvedEx.8's solution continues
  //    onto p-07; SolvedEx.6's stem is on p-09 with its solution on p-10) — that is
  //    why transcription bands for this book must be cut at BLOCK boundaries, not
  //    page boundaries. The book's own numbering is unaffected.
  "angle-measurement-11": [
    { group: "1.1 Directed Angles", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.1 SolvedEx"] },
    { group: "Exercise 1.1", label: "Exercise 1.1", kind: "exercise", refPrefixes: ["Ex 1.1 "] },
    { group: "1.2 Arc Length and Area of a Sector", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.2 SolvedEx"] },
    { group: "Exercise 1.2", label: "Exercise 1.2", kind: "exercise", refPrefixes: ["Ex 1.2 "] },
    { group: "Miscellaneous Exercise 1", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 1", label: "(II)", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.2 Trigonometry - I (Part 1) — verified against Ch_02_Trigonometry_01.pdf
  //    (21pp, printed pp.14-34). Physical reading order:
  //      theory 2.1 -> its solved examples -> EXERCISE 2.1 (p-07..p-08, Q1-Q9)
  //      theory 2.2 -> its solved examples -> EXERCISE 2.2 (p-17, Q1-Q15)
  //      "Let's Remember" summary box (not questions) -> MISCELLANEOUS EXERCISE - 2,
  //      printed in two labelled parts: (I) the MCQ block, (II) free-response.
  //    The two Miscellaneous parts are separate blocks because the book itself
  //    labels and separates them, and /board should show the MCQ block whole.
  //    Prefix safety: "Misc I " carries a TRAILING SPACE so it cannot swallow
  //    "Misc II Q1" (and assignSections resolves longest-prefix-wins anyway).
  "trigonometry-1-11": [
    { group: "2.1 Trigonometric Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.1 SolvedEx"] },
    { group: "Exercise 2.1", label: "Exercise 2.1", kind: "exercise", refPrefixes: ["Ex 2.1 "] },
    { group: "2.2 Fundamental Identities", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.2 SolvedEx"] },
    { group: "Exercise 2.2", label: "Exercise 2.2", kind: "exercise", refPrefixes: ["Ex 2.2 "] },
    { group: "Miscellaneous Exercise 2", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 2", label: "(II)", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/mh-sb-11/sections.ts`);
  return s;
}
