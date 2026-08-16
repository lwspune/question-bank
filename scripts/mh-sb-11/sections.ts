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
  // ── Ch.3 Trigonometry - II (Part 1) — verified against Ch_03_Trigonometry_02.pdf
  //    (24pp, 40 `Solution :` markers — the densest chapter of this book so far).
  //    ONE terminal Miscellaneous block, split (I) MCQ / (II) "Prove the following".
  //
  //    The chapter's defining structural quirk: EVERY solved block spills onto the
  //    page that carries the NEXT exercise banner (p-04, p-07, p-16 and p-19 each
  //    hold trailing `Solution :` markers ABOVE their banner), and on p-04 the
  //    banner sits in the RIGHT column BESIDE the last solved example rather than
  //    below it. Ownership must be cut at the banner — column-wise, not by page —
  //    at all five boundaries, or a solved example strands at each one.
  //
  //    Two prefixes name a sub-section NARROWER than the block's content, and that
  //    is deliberate — the rule is "name the block for the sub-section it FOLLOWS":
  //      `3.3.2` the block opens after §3.3.2 Triple angle (whose theorem+proof fill
  //              p-09's left column and continue into the right), but its 12 examples
  //              span double AND triple angles. §3.3.1 is pure theory on p-08 with no
  //              block of its own, so there is no collision.
  //      `3.4.2` likewise — one block only, opening after §3.4.2, covering both
  //              factorization and defactorization. Checked for a second block
  //              between §3.4.1 and §3.4.2; there is none, and the example numbering
  //              runs 1..4 without restarting, which confirms it independently.
  //
  //    The book misspells its own §3.2 heading "allied ANGELS"; corrected in the
  //    group label below, since a section group is a navigation label rather than an
  //    answer, and recorded in the chapter errata.
  "trigonometry-2-11": [
    { group: "3.1 Compound Angles", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.1 SolvedEx"] },
    { group: "Exercise 3.1", label: "Exercise 3.1", kind: "exercise", refPrefixes: ["Ex 3.1 Q"] },
    { group: "3.2 Allied Angles", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.2 SolvedEx"] },
    { group: "Exercise 3.2", label: "Exercise 3.2", kind: "exercise", refPrefixes: ["Ex 3.2 Q"] },
    { group: "3.3 Multiple Angles — Double and Triple", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.3.2 SolvedEx"] },
    { group: "Exercise 3.3", label: "Exercise 3.3", kind: "exercise", refPrefixes: ["Ex 3.3 Q"] },
    { group: "3.4 Factorization and Defactorization Formulae", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.4.2 SolvedEx"] },
    { group: "Exercise 3.4", label: "Exercise 3.4", kind: "exercise", refPrefixes: ["Ex 3.4 Q"] },
    { group: "3.5 Trigonometric Functions of Angles of a Triangle", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.5 SolvedEx"] },
    { group: "Exercise 3.5", label: "Exercise 3.5", kind: "exercise", refPrefixes: ["Ex 3.5 Q"] },
    { group: "Miscellaneous Exercise 3", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 3", label: "(II) Prove the following", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.8 Measures of Dispersion (Part 1) — verified against
  //    Ch_08_Measures_of_Dispersion.pdf (14pp, the smallest chapter ingested so far).
  //    ONE terminal Miscellaneous block, split (I) MCQ / (II) free-response.
  //
  //    FOUR solved blocks, each under a different numbered sub-section, so every
  //    prefix is sub-section-scoped. Two facts worth recording because a page-level
  //    scan gets them wrong:
  //      - the §8.2.3 block is SIX examples, not five: Ex.1-Ex.3 on p-03, Ex.3 tail
  //        + Ex.4 + Ex.5 on p-04, and **Ex.6 entirely on p-05** above the
  //        EXERCISE 8.2 banner. Cutting a band at the p-04/p-05 page edge strands it.
  //      - §8.2.2 Standard Deviation has NO solved block of its own; the examples
  //        that follow it sit under §8.2.3 Change of origin and scale.
  //
  //    NOT INGESTED, deliberately: the chapter closes (p-08 bottom -> p-10) with an
  //    unnumbered Activity section under bold topic headings — `Range: Activity 1/2`
  //    and `Variance and Standard Deviation: Activity 1/2`. The last two print a
  //    `Solution :` marker, but it is a FILL-IN-THE-BLANK scaffold (`S.D. = √‾‾‾ =`
  //    with an empty radicand, tables with 3 of 7 cells filled) whose answers ARE the
  //    blanks. They are not numbered questions, so the shipped "ingest a numbered
  //    question merely tagged (Activity)" precedent does not apply — ingesting one
  //    would put a half-written derivation into the bank as a model solution.
  //    Consequence for band planning: the chapter has 14 `Solution :` markers but
  //    only 12 real solved examples.
  "dispersion-11": [
    { group: "8.1.1 Range", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.1.1 SolvedEx"] },
    { group: "Exercise 8.1", label: "Exercise 8.1", kind: "exercise", refPrefixes: ["Ex 8.1 Q"] },
    { group: "8.2.3 Change of Origin and Scale", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.2.3 SolvedEx"] },
    { group: "Exercise 8.2", label: "Exercise 8.2", kind: "exercise", refPrefixes: ["Ex 8.2 Q"] },
    { group: "8.3 Standard Deviation for Combined Data", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.3 SolvedEx"] },
    { group: "8.3.1 Coefficient of Variation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.3.1 SolvedEx"] },
    { group: "Exercise 8.3", label: "Exercise 8.3", kind: "exercise", refPrefixes: ["Ex 8.3 Q"] },
    { group: "Miscellaneous Exercise 8", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 8", label: "(II) Answer the following", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.9 Probability (Part 1) — verified against Ch_09_Probability.pdf (23pp).
  //    ONE terminal Miscellaneous block, so the standard `Misc I `/`Misc II ` refs
  //    apply (unlike Ch.4, which needed 4A/4B).
  //
  //    NINE solved blocks, which is why almost every prefix is sub-section-scoped:
  //    the book restarts `Ex. 1)` inside each boxed block, so a bare `9.1 SolvedEx`
  //    / `9.3 SolvedEx` namespace would collide two and four ways respectively.
  //    Block map, read off the pages:
  //      p-00  in-theory worked example (Algebra of Events -> Union of Two Events)
  //      p-01  boxed, under 9.1.1      p-03  boxed, under 9.1.5
  //      p-07  boxed, under 9.2        p-09  TWO boxed blocks, one per column
  //      p-10  boxed, under 9.3.3      p-11  boxed, under 9.3.4 (runs into p-12)
  //      p-15  boxed, under 9.4        p-18  boxed, under 9.5
  //
  //    Two prefixes need explanation:
  //      `9.1.1a` is OURS, not the book's — it marks the worked example embedded in
  //               the 9.1.1 theory on p-00, which PRECEDES the boxed 9.1.1 block and
  //               would otherwise collide with it. (Same device as Ch.4's `4.5b`.)
  //               It carries the book's own printed `Solution :`, which is what makes
  //               it a solved row rather than one of the three unlabelled assertions
  //               on p-01 that were correctly skipped.
  //      `9.3.2`  the book prints NO TITLE for §9.3.2 — the section opens straight
  //               into "Let S be a finite sample space, associated with...". The label
  //               below is descriptive, not quoted from the page.
  //
  //    The §9.1.5 heading is printed "Elementary Properties of Probabilty" (the book's
  //    own misspelling); corrected here because a section group is a navigation label,
  //    not an answer. Prefix safety: `9.1.1 SolvedEx` and `9.1.1a SolvedEx` diverge at
  //    the space-vs-letter, and `Misc I ` carries a trailing space so it cannot swallow
  //    `Misc II Q1`. assignSections resolves longest-prefix-wins regardless.
  "probability-11": [
    { group: "9.1.1 Basic Terminologies", label: "Worked Example", kind: "solved_example", refPrefixes: ["9.1.1a SolvedEx"] },
    { group: "9.1.1 Basic Terminologies", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.1.1 SolvedEx"] },
    { group: "9.1.5 Elementary Properties of Probability", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.1.5 SolvedEx"] },
    { group: "Exercise 9.1", label: "Exercise 9.1", kind: "exercise", refPrefixes: ["Ex 9.1 Q"] },
    { group: "9.2 Addition Theorem", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.2 SolvedEx"] },
    { group: "Exercise 9.2", label: "Exercise 9.2", kind: "exercise", refPrefixes: ["Ex 9.2 Q"] },
    { group: "9.3.1 Conditional Probability", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.3.1 SolvedEx"] },
    { group: "9.3.2 Conditional Probability of an Event", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.3.2 SolvedEx"] },
    { group: "9.3.3 Multiplication Theorem", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.3.3 SolvedEx"] },
    { group: "9.3.4 Independent Events", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.3.4 SolvedEx"] },
    { group: "Exercise 9.3", label: "Exercise 9.3", kind: "exercise", refPrefixes: ["Ex 9.3 Q"] },
    { group: "9.4 Bayes' Theorem", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.4 SolvedEx"] },
    { group: "Exercise 9.4", label: "Exercise 9.4", kind: "exercise", refPrefixes: ["Ex 9.4 Q"] },
    { group: "9.5 Odds", label: "Solved Examples", kind: "solved_example", refPrefixes: ["9.5 SolvedEx"] },
    { group: "Exercise 9.5", label: "Exercise 9.5", kind: "exercise", refPrefixes: ["Ex 9.5 Q"] },
    { group: "Miscellaneous Exercise 9", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 9", label: "(II)", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.4 Determinants and Matrices (Part 1) — verified against
  //    Ch_04_Determinent_Matrices.pdf (44pp, the largest chapter in the book).
  //
  //    STRUCTURALLY UNUSUAL, and the reason this outline is long: the chapter is
  //    really TWO half-chapters, each closed by its own Miscellaneous block —
  //    `MISCELLANEOUS EXERCISE - 4 (A)` MID-chapter on p-16 (closing Determinants)
  //    and `- 4 (B)` terminal on p-40 (closing Matrices), and BOTH split into a
  //    part (I) MCQ block and a part (II) free-response block. The pipeline's
  //    default `Misc I `/`Misc II ` refs would collide across the two, so this
  //    chapter uses `Misc 4A I `/`Misc 4A II `/`Misc 4B I `/`Misc 4B II `.
  //    (Same shape as the shipped Class-12 Ch.6 Line and Planes, whose mid-chapter
  //    block was undifferentiated and so needed only `Misc A Q`.)
  //
  //    SolvedEx prefixes are SUB-SECTION-scoped wherever a section carries more
  //    than one boxed SOLVED EXAMPLES block, since the book restarts `Ex. 1)` in
  //    each: §4.1 has three (p-00 §4.1.1, p-01 §4.1.2, p-02→p-03 §4.1.3) and §4.3
  //    has three (p-10 §4.3.1, p-13 §4.3.2, p-14 §4.3.3). Block membership was
  //    verified from the page headings, not inferred.
  //
  //    Two prefixes are OURS, not the book's, and are flagged as such so a later
  //    session doesn't read them as printed section numbers:
  //      `4.5.3` — two worked examples embedded in §4.5's theory narrative on p-25
  //                ("Find A+B", "Find A−B"), outside any boxed block. §4.5 numbers
  //                its sub-parts (1)/(2)/(3), so this maps sub-part (3) into the
  //                pipeline's N.M.K convention.
  //      `4.5b`  — §4.5's SECOND boxed block (p-29→p-30), which falls AFTER
  //                Exercise 4.5. §4.5 has no numbered sub-sections to distinguish
  //                it, and continuous numbering with the p-26 block would make the
  //                reader render it BEFORE the exercise it actually follows.
  //
  //    Prefix safety: `4.5 SolvedEx` (space), `4.5.3 SolvedEx` (dot) and
  //    `4.5b SolvedEx` (letter) diverge at char 4, and `Misc 4A I ` carries a
  //    trailing space so it cannot swallow `Misc 4A II Q1`. assignSections
  //    resolves longest-prefix-wins regardless.
  //
  //    §4.7 has NO solved block — that is the book (its transpose properties are
  //    taught through inline "For example, let A = …" illustrations that carry no
  //    `Ex. n :` + `Solution :` pair), not an omission.
  "determinants-matrices-11": [
    { group: "4.1.1 Value of a Determinant", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.1.1 SolvedEx"] },
    { group: "4.1.2 Determinant of Order Three", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.1.2 SolvedEx"] },
    { group: "4.1.3 Minors and Cofactors", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.1.3 SolvedEx"] },
    { group: "Exercise 4.1", label: "Exercise 4.1", kind: "exercise", refPrefixes: ["Ex 4.1 Q"] },
    { group: "4.2 Properties of Determinants", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.2 SolvedEx"] },
    { group: "Exercise 4.2", label: "Exercise 4.2", kind: "exercise", refPrefixes: ["Ex 4.2 Q"] },
    { group: "4.3.1 Cramer's Rule", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.3.1 SolvedEx"] },
    { group: "4.3.2 Consistency of Three Equations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.3.2 SolvedEx"] },
    { group: "4.3.3 Area of a Triangle and Collinearity", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.3.3 SolvedEx"] },
    { group: "Exercise 4.3", label: "Exercise 4.3", kind: "exercise", refPrefixes: ["Ex 4.3 Q"] },
    { group: "Miscellaneous Exercise 4 (A)", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc 4A I "] },
    { group: "Miscellaneous Exercise 4 (A)", label: "(II) Answer the following questions", kind: "miscellaneous", refPrefixes: ["Misc 4A II "] },
    { group: "4.4 Introduction to Matrices", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.4 SolvedEx"] },
    { group: "Exercise 4.4", label: "Exercise 4.4", kind: "exercise", refPrefixes: ["Ex 4.4 Q"] },
    { group: "4.5 Algebra of Matrices", label: "Worked Examples", kind: "solved_example", refPrefixes: ["4.5.3 SolvedEx"] },
    { group: "4.5 Algebra of Matrices", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.5 SolvedEx"] },
    { group: "Exercise 4.5", label: "Exercise 4.5", kind: "exercise", refPrefixes: ["Ex 4.5 Q"] },
    { group: "4.5 Algebra of Matrices", label: "Solved Examples (continued)", kind: "solved_example", refPrefixes: ["4.5b SolvedEx"] },
    { group: "4.6 Properties of Matrix Multiplication", label: "Solved Examples", kind: "solved_example", refPrefixes: ["4.6 SolvedEx"] },
    { group: "Exercise 4.6", label: "Exercise 4.6", kind: "exercise", refPrefixes: ["Ex 4.6 Q"] },
    { group: "Exercise 4.7", label: "Exercise 4.7", kind: "exercise", refPrefixes: ["Ex 4.7 Q"] },
    { group: "Miscellaneous Exercise 4 (B)", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc 4B I "] },
    { group: "Miscellaneous Exercise 4 (B)", label: "(II) Answer the following questions", kind: "miscellaneous", refPrefixes: ["Misc 4B II "] },
  ],

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

  // ── Ch.5 Straight Line (Part 1) — verified against Ch_05_Straight_Line.pdf (24pp).
  //    NINE solved blocks in the boxed sense, but THIRTEEN prefixes: the book also
  //    embeds a worked example in the theory of each standard form (§5.3.1-§5.3.4),
  //    each headed a bare `Ex.` with no number. Every block restarts at "Ex. 1)", so
  //    each is scoped to the sub-section it FOLLOWS — the chapter with the most
  //    collisions in this book.
  //
  //    `5.3 SolvedEx` is the BOXED block on p-09..p-10 and deliberately sits AFTER
  //    the four theory-embedded `5.3.x` ones in this list: it follows the whole
  //    §5.3.1-§5.3.5 standard-forms development, which is its physical position.
  //    No prefix collision results — "5.3.1 SolvedEx" does not start with
  //    "5.3 SolvedEx" (the char after "5.3" is "." vs " "), and assignSections
  //    resolves longest-prefix-wins regardless.
  //
  //    The book misnumbers a heading on p-03: "5.1.2 Inclination of a line" under
  //    §5.2, where 5.1.2 is already Shift of Origin on p-01 and 5.2.2 Slope follows
  //    immediately. It means 5.2.1. Refs are unaffected (that block is scoped 5.2.2)
  //    but do NOT reintroduce 5.1.2 here — it belongs to the p-02 block.
  "straight-line-11": [
    { group: "5.1.1 Equation of Locus", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.1.1 SolvedEx"] },
    { group: "5.1.2 Shift of Origin", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.1.2 SolvedEx"] },
    { group: "Exercise 5.1", label: "Exercise 5.1", kind: "exercise", refPrefixes: ["Ex 5.1 "] },
    { group: "5.2.2 Slope of a Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.2.2 SolvedEx"] },
    { group: "5.2.3 Perpendicular Lines", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.2.3 SolvedEx"] },
    { group: "5.2.4 Angle Between Intersecting Lines", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.2.4 SolvedEx"] },
    { group: "Exercise 5.2", label: "Exercise 5.2", kind: "exercise", refPrefixes: ["Ex 5.2 "] },
    { group: "5.3.1 Point-slope Form", label: "Solved Example", kind: "solved_example", refPrefixes: ["5.3.1 SolvedEx"] },
    { group: "5.3.2 Slope-Intercept Form", label: "Solved Example", kind: "solved_example", refPrefixes: ["5.3.2 SolvedEx"] },
    { group: "5.3.3 Two-points Form", label: "Solved Example", kind: "solved_example", refPrefixes: ["5.3.3 SolvedEx"] },
    { group: "5.3.4 Double-Intercept Form", label: "Solved Example", kind: "solved_example", refPrefixes: ["5.3.4 SolvedEx"] },
    { group: "5.3 Equation of a Line in Standard Forms", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.3 SolvedEx"] },
    { group: "Exercise 5.3", label: "Exercise 5.3", kind: "exercise", refPrefixes: ["Ex 5.3 "] },
    { group: "5.4 General Form of the Equation of a Line", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.4 SolvedEx"] },
    { group: "5.4.3 Distance Between Two Parallel Lines", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.4.3 SolvedEx"] },
    { group: "5.4.4 Family of Lines", label: "Solved Examples", kind: "solved_example", refPrefixes: ["5.4.4 SolvedEx"] },
    { group: "Exercise 5.4", label: "Exercise 5.4", kind: "exercise", refPrefixes: ["Ex 5.4 "] },
    { group: "Miscellaneous Exercise 5", label: "(I) Select the correct option", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 5", label: "(II) Answer the following", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.2 Sequences and Series (Part 2) — verified against Ch_02_Sequence_and_Series.pdf
  //    (20pp). The DENSEST chapter of this book by solutions per page (36 markers/20pp).
  //
  //    TWO invented prefixes, both marking content the book leaves unnumbered — the
  //    shipped 9.1.1a / 4.5b device, NOT the book's own numbering:
  //      `2.3.1a` a worked example embedded in the §2.3.1 theory that PRECEDES the
  //               boxed 2.3.1 block and would otherwise collide with it.
  //      `2.4a`   likewise inside §2.4's own body text, above its banner.
  //      `2.7.2`  the block under the book's UNNUMBERED "Properties of Summation"
  //               heading, which sits between Exercise 2.5 and the real §2.8 Power
  //               Series. It must NOT take the `2.8` namespace: §2.8 is a genuine
  //               separate section (pure theory, no examples, no exercise of its own).
  //    Each `a`-suffixed block is ordered BEFORE its parent, which is reading order.
  //
  //    Note Exercise 2.6 is physically PRINTED under §2.8 Power Series but is entirely
  //    summation-of-special-series work; its rows carry the "Properties of Summation"
  //    subtopic. That divergence is the book-structure vs conceptual axis working as
  //    designed — see the Design axes section of CLAUDE.md.
  "sequences-series-11": [
    { group: "2.3.1 General Term of a G.P.", label: "Worked Example", kind: "solved_example", refPrefixes: ["2.3.1a SolvedEx"] },
    { group: "2.3.1 General Term of a G.P.", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.3.1 SolvedEx"] },
    { group: "Exercise 2.1", label: "Exercise 2.1", kind: "exercise", refPrefixes: ["Ex 2.1 "] },
    { group: "2.3.2 Sum of the First n Terms of a G.P.", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.3.2 SolvedEx"] },
    { group: "Exercise 2.2", label: "Exercise 2.2", kind: "exercise", refPrefixes: ["Ex 2.2 "] },
    { group: "2.4 Sum of Infinite Terms of a G.P.", label: "Worked Example", kind: "solved_example", refPrefixes: ["2.4a SolvedEx"] },
    { group: "2.4 Sum of Infinite Terms of a G.P.", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.4 SolvedEx"] },
    { group: "2.4.1 Recurring Decimals as Rational Numbers", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.4.1 SolvedEx"] },
    { group: "Exercise 2.3", label: "Exercise 2.3", kind: "exercise", refPrefixes: ["Ex 2.3 "] },
    { group: "2.5 Harmonic Progression", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.5 SolvedEx"] },
    { group: "2.6.3 Harmonic Mean", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.6.3 SolvedEx"] },
    { group: "Exercise 2.4", label: "Exercise 2.4", kind: "exercise", refPrefixes: ["Ex 2.4 "] },
    { group: "2.7.1 Sum of n Terms of an A.G.P.", label: "Solved Example", kind: "solved_example", refPrefixes: ["2.7.1 SolvedEx"] },
    { group: "Exercise 2.5", label: "Exercise 2.5", kind: "exercise", refPrefixes: ["Ex 2.5 "] },
    { group: "Properties of Summation", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.7.2 SolvedEx"] },
    { group: "Exercise 2.6", label: "Exercise 2.6", kind: "exercise", refPrefixes: ["Ex 2.6 "] },
    { group: "Miscellaneous Exercise 2", label: "(I) Select the correct answer", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 2", label: "(II) Answer the following", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.6 Functions (Part 2) — verified against Ch_06_Functions.pdf (27pp).
  //    The SIMPLEST outline in this book, and for an unusual reason: the chapter
  //    prints NO `SOLVED EXAMPLES` banner anywhere (a scan of all 27 pages returns
  //    zero) while carrying ~34 worked examples. They sit in TWO theory-embedded
  //    runs, each numbered CONTINUOUSLY across its sub-sections — Ex.1..18 under
  //    6.1 (p-03..p-11) and Ex.1..16 under 6.2 (p-14..p-21). Because neither run
  //    restarts, neither needs sub-section scoping: one prefix per RUN is enough,
  //    which is why this chapter has 6 blocks where Straight Line needed 19.
  //
  //    Do NOT "fix" this into per-6.1.x / per-6.2.x blocks. Splitting a continuously
  //    numbered run would put Ex.6 in a different /board block from Ex.5 purely
  //    because a sub-section heading falls between them.
  "functions-11": [
    { group: "6.1 Function", label: "Worked Examples", kind: "solved_example", refPrefixes: ["6.1 SolvedEx"] },
    { group: "Exercise 6.1", label: "Exercise 6.1", kind: "exercise", refPrefixes: ["Ex 6.1 "] },
    { group: "6.2 Algebra of Functions", label: "Worked Examples", kind: "solved_example", refPrefixes: ["6.2 SolvedEx"] },
    { group: "Exercise 6.2", label: "Exercise 6.2", kind: "exercise", refPrefixes: ["Ex 6.2 "] },
    { group: "Miscellaneous Exercise 6", label: "(I) Select the correct answer", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 6", label: "(II) Answer the following", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.8 Continuity (Part 2) — verified against Ch_08_Continuity.pdf (19pp).
  //    STRUCTURALLY THE SIMPLEST CHAPTER IN THE BOOK on the solved/exercise axis —
  //    ONE solved block (Ex.1..Ex.12, continuously numbered, never restarting) and
  //    ONE exercise — and the MOST COMPLICATED on the Miscellaneous axis: its
  //    Miscellaneous prints EIGHT parts, (I)..(VIII), where every other chapter in
  //    this book prints two. The book's own key keys all eight and its per-part
  //    counts match the pages exactly, which is what confirms the structure.
  //
  //    No `a`-suffixed prefix is in use: the chapter's numbered "Illustrations" are
  //    worked THEORY passages that pose no question and are deliberately not
  //    ingested, so nothing precedes the banner block.
  "continuity-11": [
    { group: "8.1 Continuity of a Function", label: "Solved Examples", kind: "solved_example", refPrefixes: ["8.1 SolvedEx"] },
    { group: "Exercise 8.1", label: "Exercise 8.1", kind: "exercise", refPrefixes: ["Ex 8.1 "] },
    { group: "Miscellaneous Exercise 8", label: "(I) Select the correct answer", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 8", label: "(II) Discuss the continuity", kind: "miscellaneous", refPrefixes: ["Misc II "] },
    { group: "Miscellaneous Exercise 8", label: "(III) Identify discontinuities", kind: "miscellaneous", refPrefixes: ["Misc III "] },
    { group: "Miscellaneous Exercise 8", label: "(IV) Identify, classify and redefine", kind: "miscellaneous", refPrefixes: ["Misc IV "] },
    { group: "Miscellaneous Exercise 8", label: "(V) Find k", kind: "miscellaneous", refPrefixes: ["Misc V "] },
    { group: "Miscellaneous Exercise 8", label: "(VI) Find a and b", kind: "miscellaneous", refPrefixes: ["Misc VI "] },
    { group: "Miscellaneous Exercise 8", label: "(VII) Find f(a)", kind: "miscellaneous", refPrefixes: ["Misc VII "] },
    { group: "Miscellaneous Exercise 8", label: "(VIII) Intermediate Value Theorem", kind: "miscellaneous", refPrefixes: ["Misc VIII "] },
  ],

  // ── Ch.1 Complex Numbers (Part 2) — verified against Ch_01_Complex_Numbers.pdf (22pp).
  //    MANY SMALL BLOCKS, each restarting at "Ex. 1", so nearly every one carries a
  //    sub-section-scoped prefix. The seven in-line `1.2.x` blocks are worked
  //    demonstrations embedded in the algebra theory and PRECEDE the boxed `1.2`
  //    banner block, which is why they are listed first — that is reading order.
  //    No collision results: "1.2.1 SolvedEx" does not start with "1.2 SolvedEx"
  //    (the char after "1.2" is "." rather than " "), and assignSections resolves
  //    longest-prefix-wins regardless.
  "complex-numbers-11": [
    { group: "1.2.1 Equality of Complex Numbers", label: "Worked Example", kind: "solved_example", refPrefixes: ["1.2.1 SolvedEx"] },
    { group: "1.2.3 Addition", label: "Worked Examples", kind: "solved_example", refPrefixes: ["1.2.3 SolvedEx"] },
    { group: "1.2.4 Scalar Multiplication", label: "Worked Examples", kind: "solved_example", refPrefixes: ["1.2.4 SolvedEx"] },
    { group: "1.2.5 Subtraction", label: "Worked Examples", kind: "solved_example", refPrefixes: ["1.2.5 SolvedEx"] },
    { group: "1.2.6 Multiplication", label: "Worked Examples", kind: "solved_example", refPrefixes: ["1.2.6 SolvedEx"] },
    { group: "1.2.7 Powers of i", label: "Worked Examples", kind: "solved_example", refPrefixes: ["1.2.7 SolvedEx"] },
    { group: "1.2.8 Division", label: "Worked Example", kind: "solved_example", refPrefixes: ["1.2.8 SolvedEx"] },
    { group: "1.2 Algebra of Complex Numbers", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.2 SolvedEx"] },
    { group: "Exercise 1.1", label: "Exercise 1.1", kind: "exercise", refPrefixes: ["Ex 1.1 "] },
    { group: "1.3 Square Root of a Complex Number", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.3 SolvedEx"] },
    { group: "1.4 Fundamental Theorem of Algebra", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.4 SolvedEx"] },
    { group: "Exercise 1.2", label: "Exercise 1.2", kind: "exercise", refPrefixes: ["Ex 1.2 "] },
    { group: "1.5.2 Modulus and Argument", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.5.2 SolvedEx"] },
    { group: "1.5.5 Exponential Form", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.5.5 SolvedEx"] },
    { group: "Exercise 1.3", label: "Exercise 1.3", kind: "exercise", refPrefixes: ["Ex 1.3 "] },
    { group: "1.6 De Moivre's Theorem", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.6 SolvedEx"] },
    { group: "1.8 Sets of Points in the Complex Plane", label: "Solved Examples", kind: "solved_example", refPrefixes: ["1.8 SolvedEx"] },
    { group: "Exercise 1.4", label: "Exercise 1.4", kind: "exercise", refPrefixes: ["Ex 1.4 "] },
    { group: "Miscellaneous Exercise 1", label: "(I) Select the correct answer", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 1", label: "(II) Answer the following", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.3 Permutations and Combination (Part 2) — verified against
  //    Ch_03_Permutation_and_Combination.pdf (26pp). Nine solved blocks, each
  //    restarting at "Ex. 1", so all are sub-section-scoped. The `3.2.1`/`3.2.2`
  //    and `3.4` blocks are in-line worked demonstrations rather than banner blocks.
  //
  //    Note `3.5.2 SolvedEx` sits under the book's "Permutations when repetitions
  //    are allowed" heading although none of its examples involves repetition — the
  //    refs follow the book's physical placement, the subtopics follow the content.
  //    That divergence is the book-structure vs conceptual axis working as designed.
  "permutations-combinations-11": [
    { group: "3.2.1 Addition Principle", label: "Worked Examples", kind: "solved_example", refPrefixes: ["3.2.1 SolvedEx"] },
    { group: "3.2.2 Multiplication Principle", label: "Worked Examples", kind: "solved_example", refPrefixes: ["3.2.2 SolvedEx"] },
    { group: "3.3 Invariance Principle", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.3 SolvedEx"] },
    { group: "Exercise 3.1", label: "Exercise 3.1", kind: "exercise", refPrefixes: ["Ex 3.1 "] },
    { group: "3.4 Factorial Notation", label: "Worked Examples", kind: "solved_example", refPrefixes: ["3.4 SolvedEx"] },
    { group: "Exercise 3.2", label: "Exercise 3.2", kind: "exercise", refPrefixes: ["Ex 3.2 "] },
    { group: "3.5.1 Permutations of Distinct Objects", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.5.1 SolvedEx"] },
    { group: "3.5.2 Permutations with Repetition", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.5.2 SolvedEx"] },
    { group: "Exercise 3.3", label: "Exercise 3.3", kind: "exercise", refPrefixes: ["Ex 3.3 "] },
    { group: "3.5.3 Permutations with Identical Objects", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.5.3 SolvedEx"] },
    { group: "Exercise 3.4", label: "Exercise 3.4", kind: "exercise", refPrefixes: ["Ex 3.4 "] },
    { group: "3.5.4 Circular Permutations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.5.4 SolvedEx"] },
    { group: "Exercise 3.5", label: "Exercise 3.5", kind: "exercise", refPrefixes: ["Ex 3.5 "] },
    { group: "3.6.1 Properties of Combinations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["3.6.1 SolvedEx"] },
    { group: "Exercise 3.6", label: "Exercise 3.6", kind: "exercise", refPrefixes: ["Ex 3.6 "] },
    { group: "Miscellaneous Exercise 3", label: "(I) Select the correct answer", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 3", label: "(II) Answer the following", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],

  // ── Ch.7 Limits (Part 2) — verified against Ch_07_Limits.pdf (27pp).
  //    TEN solved blocks, each restarting at "Ex. 1"; `7.1.6 SolvedEx` is the one a
  //    banner scan CANNOT see — an unnumbered `Example:` embedded in the theory with
  //    its own printed Solution.
  //
  //    EVERY EXERCISE IN THIS CHAPTER IS SPLIT INTO ROMAN PARTS (`Q.I`, `Q.II`,
  //    `Q.III`, and `Q.IV` in 7.1), each restarting its numbering at 1, so refs are
  //    `Ex 7.1 I Q1` etc. Each exercise is ONE block here rather than one per part:
  //    a book exercise is a contiguous unit and the section axis exists to keep it
  //    whole. The `Ex 7.N ` prefix (TRAILING SPACE) matches every part of that
  //    exercise and nothing else.
  //
  //    Numbering defect worth not re-deriving: the CHAPTER prints Exercises 7.1..7.7
  //    contiguously; the ANSWERS SECTION labels the last one "7.8" and prints no 7.7.
  //    They are the same block (both split 3/3/5). Refs follow the CHAPTER.
  "limits-11": [
    { group: "7.1.2 Definition of a Limit", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.1.2 SolvedEx"] },
    { group: "7.1.6 Existence of a Limit", label: "Worked Example", kind: "solved_example", refPrefixes: ["7.1.6 SolvedEx"] },
    { group: "7.1.7 Algebra of Limits", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.1.7 SolvedEx"] },
    { group: "7.1.8 Limit Theorem", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.1.8 SolvedEx"] },
    { group: "Exercise 7.1", label: "Exercise 7.1", kind: "exercise", refPrefixes: ["Ex 7.1 "] },
    { group: "7.2 Method of Factorization", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.2 SolvedEx"] },
    { group: "Exercise 7.2", label: "Exercise 7.2", kind: "exercise", refPrefixes: ["Ex 7.2 "] },
    { group: "7.3 Method of Rationalization", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.3 SolvedEx"] },
    { group: "Exercise 7.3", label: "Exercise 7.3", kind: "exercise", refPrefixes: ["Ex 7.3 "] },
    { group: "7.4 Limits of Trigonometric Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.4 SolvedEx"] },
    { group: "Exercise 7.4", label: "Exercise 7.4", kind: "exercise", refPrefixes: ["Ex 7.4 "] },
    { group: "7.5 Substitution Method", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.5 SolvedEx"] },
    { group: "Exercise 7.5", label: "Exercise 7.5", kind: "exercise", refPrefixes: ["Ex 7.5 "] },
    { group: "7.6 Limits of Exponential and Logarithmic Functions", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.6 SolvedEx"] },
    { group: "Exercise 7.6", label: "Exercise 7.6", kind: "exercise", refPrefixes: ["Ex 7.6 "] },
    { group: "7.7 Limits at Infinity", label: "Solved Examples", kind: "solved_example", refPrefixes: ["7.7 SolvedEx"] },
    { group: "Exercise 7.7", label: "Exercise 7.7", kind: "exercise", refPrefixes: ["Ex 7.7 "] },
    { group: "Miscellaneous Exercise 7", label: "(I) Select the correct answer", kind: "miscellaneous", refPrefixes: ["Misc I "] },
    { group: "Miscellaneous Exercise 7", label: "(II) Answer the following", kind: "miscellaneous", refPrefixes: ["Misc II "] },
  ],
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/mh-sb-11/sections.ts`);
  return s;
}
