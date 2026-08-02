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

  // ── History + Political Science (9th_Hist_SB.pdf) ───────────────────────────
  // These chapters are structurally MUCH simpler than the Maths ones: the book
  // interleaves narrative prose with activity boxes and closes each chapter with
  // a SINGLE "Exercises" block — there are no numbered practice sets, no separate
  // problem set, and (unlike every Maths chapter) no solved-example block at all.
  // So each outline is one `exercise` block holding every question in printed
  // order, which is exactly how the page reads. Every ref is prefixed "Ex ".
  "sources-of-history-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "events-after-1960-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "internal-challenges-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "post-ww-political-developments-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "foreign-policy-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "economic-development-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "education-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "empowerment-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "science-technology-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "industry-trade-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "changing-life-1-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "changing-life-2-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "defence-system-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "united-nations-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "india-other-countries-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "international-problems-9": [
    { group: "Exercises", label: "Exercises", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  // Geography — the book heads its block "Exercise" (singular), but the outline
  // shape is identical: one block per chapter, no solved-example bucket.
  "endogenetic-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "distributional-maps-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "exogenetic-1-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "exogenetic-2-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "precipitation-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "sea-water-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "idl-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "economics-intro-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "trade-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "urbanisation-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "transport-communication-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "tourism-9": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/mh-sb-9/sections.ts`);
  return s;
}
