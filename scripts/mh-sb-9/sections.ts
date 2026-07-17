// Book-faithful section OUTLINES (the /board reader) for the Class-9 chapters —
// one ordered list per chapter, the book's table of contents in physical reading
// order, verified against the source PDF. `assignSections` (../stateboard/lib)
// maps each question's ref into a block; the array index (1-based) becomes
// section_seq. Question order WITHIN a block stays source_row.
//
// NOT derivable from the conceptual `subtopic` axis (a single Practice set is
// split across subtopics) nor reliably from the ref string alone. Authored +
// PDF-verified per chapter here; backfill-sections.ts consumes these to populate
// the migration-0043 columns.
//
// The Class-9 book layout per chapter: interleaved Solved examples in the theory,
// then "Practice set N.M" exercises, then a chapter-end "Problem Set N"
// (Q.1 = MCQ "choose the correct alternative"). Authored per chapter after
// transcription (step 8b of the runbook).
import type { SectionSpec } from "./lib";

export const SECTIONS: Record<string, SectionSpec[]> = {
  // ── Ch.1 Sets (Part 1, Algebra) — verified against 9th_Maths_Part1_SB.pdf
  //    (pp.11-28). No formal "Solved Examples" exercise block in this chapter
  //    (worked illustrations are inline theory prose). Physical reading order is
  //    the four Practice sets then the chapter-end Problem set. Problem set 1 is
  //    ONE book block (Q.1 & Q.2 are "choose the correct alternative" MCQ, Q.3-11
  //    free-response) → a single miscellaneous block, questions in source_row order.
  "sets-9": [
    { group: "Practice Set 1.1", label: "Practice Set 1.1", kind: "exercise", refPrefixes: ["Ex 1.1 "] },
    { group: "Practice Set 1.2", label: "Practice Set 1.2", kind: "exercise", refPrefixes: ["Ex 1.2 "] },
    { group: "Practice Set 1.3", label: "Practice Set 1.3", kind: "exercise", refPrefixes: ["Ex 1.3 "] },
    { group: "Practice Set 1.4", label: "Practice Set 1.4", kind: "exercise", refPrefixes: ["Ex 1.4 "] },
    { group: "Problem Set 1", label: "Problem Set 1", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/mh-sb-9/sections.ts`);
  return s;
}
