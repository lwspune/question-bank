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
