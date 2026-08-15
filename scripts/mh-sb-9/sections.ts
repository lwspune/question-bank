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

  // ── Ch.2 Real Numbers (Part 1, Algebra) — verified against 9th_Maths_Part1_SB.pdf
  //    (pp.19-35). UNLIKE Ch.1 Sets, this chapter DOES carry worked examples with the
  //    book's own printed working, and they sit inside the theory that leads up to
  //    each Practice set — so the outline interleaves a solved block before its own
  //    practice set, which is the order a reader meets them on the page. Solved refs
  //    are section-scoped (`2.3 SolvedEx.N`), so no two blocks' prefixes nest.
  //    Problem set 2 is ONE book block (Q.1 = the ten-part MCQ, Q.2-8 free-response)
  //    → a single miscellaneous block, questions in source_row order.
  "real-numbers-9": [
    { group: "Properties of Rational Numbers and Decimal Expansion", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.1 SolvedEx"] },
    { group: "Practice Set 2.1", label: "Practice Set 2.1", kind: "exercise", refPrefixes: ["Ex 2.1 "] },
    { group: "Irrational Numbers and the Number Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.2 SolvedEx"] },
    { group: "Practice Set 2.2", label: "Practice Set 2.2", kind: "exercise", refPrefixes: ["Ex 2.2 "] },
    { group: "Surds — Order, Comparison and Operations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.3 SolvedEx"] },
    { group: "Practice Set 2.3", label: "Practice Set 2.3", kind: "exercise", refPrefixes: ["Ex 2.3 "] },
    { group: "Binomial Surds and Rationalization of the Denominator", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.4 SolvedEx"] },
    { group: "Practice Set 2.4", label: "Practice Set 2.4", kind: "exercise", refPrefixes: ["Ex 2.4 "] },
    { group: "Absolute Value", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.5 SolvedEx"] },
    { group: "Practice Set 2.5", label: "Practice Set 2.5", kind: "exercise", refPrefixes: ["Ex 2.5 "] },
    { group: "Problem Set 2", label: "Problem Set 2", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.3 Polynomials (Part 1, Algebra) — verified against 9th_Maths_Part1_SB.pdf
  //    (pp.36-56). Same interleaved shape as Ch.2 Real Numbers: a theory block with
  //    the book's own worked examples, then the Practice set it leads into. Solved
  //    refs are keyed to the practice set that FOLLOWS them (`3.4 SolvedEx.N`),
  //    because this book — unlike the Class-11/12 ones — does not number its
  //    sections, so the practice-set number is the only stable positional handle.
  //    `3.5 SolvedEx` deliberately spans BOTH the Remainder-theorem and the
  //    Factor-theorem worked examples: they are consecutive theory blocks feeding
  //    one practice set, the same call as Ch.2's "Binomial Surds and
  //    Rationalization". Problem set 3 is ONE book block (Q.1 = the ten-part MCQ,
  //    Q.2+ free-response) → a single miscellaneous block in source_row order.
  "polynomials-9": [
    { group: "Introduction, Degree and Types", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.1 SolvedEx"] },
    { group: "Practice Set 3.1", label: "Practice Set 3.1", kind: "exercise", refPrefixes: ["Ex 3.1 "] },
    { group: "Operations on Polynomials", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.2 SolvedEx"] },
    { group: "Practice Set 3.2", label: "Practice Set 3.2", kind: "exercise", refPrefixes: ["Ex 3.2 "] },
    { group: "Division and Synthetic Division", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.3 SolvedEx"] },
    { group: "Practice Set 3.3", label: "Practice Set 3.3", kind: "exercise", refPrefixes: ["Ex 3.3 "] },
    { group: "Value of a Polynomial", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.4 SolvedEx"] },
    { group: "Practice Set 3.4", label: "Practice Set 3.4", kind: "exercise", refPrefixes: ["Ex 3.4 "] },
    { group: "Remainder and Factor Theorems", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.5 SolvedEx"] },
    { group: "Practice Set 3.5", label: "Practice Set 3.5", kind: "exercise", refPrefixes: ["Ex 3.5 "] },
    { group: "Factorisation of Polynomials", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.6 SolvedEx"] },
    { group: "Practice Set 3.6", label: "Practice Set 3.6", kind: "exercise", refPrefixes: ["Ex 3.6 "] },
    { group: "Problem Set 3", label: "Problem Set 3", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.4 Ratio and Proportion (Part 1, Algebra) — verified against
  //    9th_Maths_Part1_SB.pdf (pp.57-79). The most solved-example-dense chapter of
  //    the volume (28 worked examples), in five theory→practice pairs. Solved refs
  //    are keyed to the practice set that FOLLOWS them (`4.3 SolvedEx.N`), the
  //    Ch.2/Ch.3 convention. Two blocks deliberately fuse two taught sections that
  //    feed ONE practice set: `4.3 SolvedEx` covers the equal-ratio properties AND
  //    their application to solving equations, and `4.5 SolvedEx` covers continued
  //    proportion AND the k-method. Problem set 4 is one book block (Q.1 = the
  //    five-part MCQ, Q.2-13 free-response) → a single miscellaneous block.
  "ratio-proportion-9": [
    { group: "Ratio, Proportion and Properties of Ratio", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.1 SolvedEx"] },
    { group: "Practice Set 4.1", label: "Practice Set 4.1", kind: "exercise", refPrefixes: ["Ex 4.1 "] },
    { group: "Comparison of Ratios", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.2 SolvedEx"] },
    { group: "Practice Set 4.2", label: "Practice Set 4.2", kind: "exercise", refPrefixes: ["Ex 4.2 "] },
    { group: "Operations on Equal Ratios", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.3 SolvedEx"] },
    { group: "Practice Set 4.3", label: "Practice Set 4.3", kind: "exercise", refPrefixes: ["Ex 4.3 "] },
    { group: "Theorem on Equal Ratios", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.4 SolvedEx"] },
    { group: "Practice Set 4.4", label: "Practice Set 4.4", kind: "exercise", refPrefixes: ["Ex 4.4 "] },
    { group: "Continued Proportion and the k-Method", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.5 SolvedEx"] },
    { group: "Practice Set 4.5", label: "Practice Set 4.5", kind: "exercise", refPrefixes: ["Ex 4.5 "] },
    { group: "Problem Set 4", label: "Problem Set 4", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.5 Linear Equations in Two Variables (Part 1, Algebra) — verified against
  //    9th_Maths_Part1_SB.pdf (pp.80-92). Reading order: graphical intro (theory,
  //    no questions) → elimination method with 4 worked examples → substitution
  //    method with 2 → Practice set 5.1 → word problems with 4 worked examples →
  //    Practice set 5.2 → Problem set 5.
  //    Solved refs here are NAMED for their section rather than numbered after the
  //    practice set (the Ch.2/Ch.3 convention), because elimination and
  //    substitution are two separate taught methods that BOTH feed Practice set
  //    5.1 — numbering them all "5.1 SolvedEx" would collapse two book sections
  //    into one reader block. No prefix nests inside another.
  "linear-equations-9": [
    { group: "Elimination Method", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Elimination SolvedEx"] },
    { group: "Substitution Method", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Substitution SolvedEx"] },
    { group: "Practice Set 5.1", label: "Practice Set 5.1", kind: "exercise", refPrefixes: ["Ex 5.1 "] },
    { group: "Word Problems on Simultaneous Equations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.2 SolvedEx"] },
    { group: "Practice Set 5.2", label: "Practice Set 5.2", kind: "exercise", refPrefixes: ["Ex 5.2 "] },
    { group: "Problem Set 5", label: "Problem Set 5", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.9 Surface Area and Volume (Part 2, Geometry) — verified against
  //    9th_Maths_Part2_SB.pdf (printed pp.114-123), the LAST chapter of the
  //    volume. Reading order: a revision of the cuboid/cube/cylinder formulas →
  //    Practice set 9.1 → terms related to a cone, its surface area and volume →
  //    Practice set 9.2 → surface area and volume of a sphere and hemisphere →
  //    Practice set 9.3 and Problem set 9, which SHARE the chapter's last page.
  //    Solved block DEFERRED like Ch.7's: Ex./Solution blocks sit on 0-based 127,
  //    128 and 131 and only one is transcribed, so three exercise blocks ship and
  //    the solved block goes in when the rest are read — see config.ts.
  "surface-area-volume-9": [
    { group: "Practice Set 9.1", label: "Practice Set 9.1", kind: "exercise", refPrefixes: ["Ex 9.1 "] },
    { group: "Practice Set 9.2", label: "Practice Set 9.2", kind: "exercise", refPrefixes: ["Ex 9.2 "] },
    { group: "Practice Set 9.3", label: "Practice Set 9.3", kind: "exercise", refPrefixes: ["Ex 9.3 "] },
    { group: "Problem Set 9", label: "Problem Set 9", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.7 Co-ordinate Geometry (Part 2, Geometry) — verified against
  //    9th_Maths_Part2_SB.pdf (printed pp.88-99). Reading order: axes/origin/
  //    quadrants → co-ordinates and plotting → Practice set 7.1 → lines parallel
  //    to the axes and the equation of a line → Practice set 7.2 → Problem set 7.
  //    THREE EXERCISE BLOCKS AND NO SOLVED BLOCK — but here that is DEFERRAL, not
  //    scope, and the distinction matters. Unlike Ch.2, this chapter really does
  //    carry solved examples (Ex./Solution blocks on 0-based 99, 100, 102, 105,
  //    106); only two are transcribed, so shipping now would render a partial
  //    block as a complete "Solved Examples" section with an invisible gap. Add
  //    the block once 99, 100 and 105 are read — see config.ts.
  "coordinate-geometry-9": [
    { group: "Practice Set 7.1", label: "Practice Set 7.1", kind: "exercise", refPrefixes: ["Ex 7.1 "] },
    { group: "Practice Set 7.2", label: "Practice Set 7.2", kind: "exercise", refPrefixes: ["Ex 7.2 "] },
    { group: "Problem Set 7", label: "Problem Set 7", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.2 Parallel Lines (Part 2, Geometry) — verified against
  //    9th_Maths_Part2_SB.pdf (printed pp.13-23). Reading order: the eight angles
  //    a transversal forms (theory) → the interior/corresponding/alternate angle
  //    theorems → Practice set 2.1 → the parallelness TESTS + two corollaries →
  //    Practice set 2.2 → Problem set 2.
  //    THREE EXERCISE BLOCKS AND NO SOLVED BLOCK, deliberately: probing the text
  //    layer of all 11 pages finds only Theorems and Corollaries, never a
  //    "Solved example". Unlike Ch.1, which had three genuine worked number-line
  //    examples alongside its two worked proofs, this chapter's only candidates
  //    are half-page formal theorems that ARE the chapter's theory rather than a
  //    model for an exercise type. Recorded as scope, not oversight.
  "parallel-lines-9": [
    { group: "Practice Set 2.1", label: "Practice Set 2.1", kind: "exercise", refPrefixes: ["Ex 2.1 "] },
    { group: "Practice Set 2.2", label: "Practice Set 2.2", kind: "exercise", refPrefixes: ["Ex 2.2 "] },
    { group: "Problem Set 2", label: "Problem Set 2", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.7 Statistics (Part 1, Algebra) — verified against 9th_Maths_Part1_SB.pdf
  //    (pp.108-128), the LAST chapter of the volume. Reading order: sub-divided
  //    and percentage bar diagrams with one worked example → Practice set 7.1 →
  //    data-collection theory → Practice set 7.2 → classification and frequency
  //    distribution with one worked example → Practice set 7.3 → cumulative
  //    frequency → Practice set 7.4 → measures of central tendency with six
  //    worked examples → Practice set 7.5 → Problem set 7.
  //    NOTE there is deliberately NO solved block before Practice set 7.2 or 7.4:
  //    the data-collection section is a dialogue with no worked example at all,
  //    and every "example" in the cumulative-frequency section (pp.119-121) is a
  //    fill-in-the-blanks table for the student to complete, not a printed
  //    solution — the same call as basic-geometry-9's missing 1.2 block. Blocks
  //    for them would sit empty and gap the section_seq run.
  "statistics-9": [
    { group: "Sub-divided and Percentage Bar Diagrams", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Bar SolvedEx"] },
    { group: "Practice Set 7.1", label: "Practice Set 7.1", kind: "exercise", refPrefixes: ["Ex 7.1 "] },
    { group: "Practice Set 7.2", label: "Practice Set 7.2", kind: "exercise", refPrefixes: ["Ex 7.2 "] },
    { group: "Classification of Data and Frequency Distribution", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Frequency SolvedEx"] },
    { group: "Practice Set 7.3", label: "Practice Set 7.3", kind: "exercise", refPrefixes: ["Ex 7.3 "] },
    { group: "Practice Set 7.4", label: "Practice Set 7.4", kind: "exercise", refPrefixes: ["Ex 7.4 "] },
    { group: "Measures of Central Tendency", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Central Tendency SolvedEx"] },
    { group: "Practice Set 7.5", label: "Practice Set 7.5", kind: "exercise", refPrefixes: ["Ex 7.5 "] },
    { group: "Problem Set 7", label: "Problem Set 7", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.6 Financial Planning (Part 1, Algebra) — verified against
  //    9th_Maths_Part1_SB.pdf (pp.93-107). Reading order: savings/expenditure and
  //    investment theory → 4 worked examples → Practice set 6.1 → tax-structure
  //    theory with the three slab tables → 3 worked examples on computing income
  //    tax → Practice set 6.2 → Problem set 6.
  //    Solved refs are NAMED for their section (the Ch.5 convention) because this
  //    chapter has titled sections, not numbered ones — there is no "6.1"/"6.2" in
  //    the body text, only in the practice-set headings, so "6.1 SolvedEx" would
  //    invent a section number the book never prints.
  //    DELIBERATELY ABSENT: the three "Activity" fill-in boxes (Mr. Mehta p102,
  //    Mr. Pandit p103, Amita p97). Those are classroom activities for the student
  //    to complete, not part of the book's worked-example block — Mehta and Amita
  //    print no answer at all. Unlike Ch.5's Ex 5.2 Q9 they are not numbered
  //    exercise questions, so the skip-Activity rule applies cleanly.
  "financial-planning-9": [
    { group: "Investments", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Investments SolvedEx"] },
    { group: "Practice Set 6.1", label: "Practice Set 6.1", kind: "exercise", refPrefixes: ["Ex 6.1 "] },
    { group: "Computation of Income Tax", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Income Tax SolvedEx"] },
    { group: "Practice Set 6.2", label: "Practice Set 6.2", kind: "exercise", refPrefixes: ["Ex 6.2 "] },
    { group: "Problem Set 6", label: "Problem Set 6", kind: "miscellaneous", refPrefixes: ["Prob "] },
  ],

  // ── Ch.1 Basic Concepts in Geometry (Part 2, Geometry) — verified against
  //    9th_Maths_Part2_SB.pdf (pp.1-12). Reading order is: co-ordinate/betweenness
  //    theory with worked examples → Practice set 1.1 → segment/ray/congruence
  //    theory → Practice set 1.2 → conditional-statement theory with two worked
  //    PROOFS → Practice set 1.3 → Problem set 1.
  //    NOTE there is deliberately NO solved block before Practice Set 1.2: the
  //    segment/ray section is purely definitional and prints no "Solution :"
  //    anywhere, so a block for it would sit empty and gap the section_seq run.
  "basic-geometry-9": [
    { group: "Co-ordinates, Distance and Betweenness", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.1 SolvedEx"] },
    { group: "Practice Set 1.1", label: "Practice Set 1.1", kind: "exercise", refPrefixes: ["Ex 1.1 "] },
    { group: "Practice Set 1.2", label: "Practice Set 1.2", kind: "exercise", refPrefixes: ["Ex 1.2 "] },
    { group: "Conditional Statements and Proof", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.3 SolvedEx"] },
    { group: "Practice Set 1.3", label: "Practice Set 1.3", kind: "exercise", refPrefixes: ["Ex 1.3 "] },
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
