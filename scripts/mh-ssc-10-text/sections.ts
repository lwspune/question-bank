// Book-faithful section OUTLINES for the Class-10 textbook chapters.
//
// Same shape as scripts/mh-sb-9/sections.ts: one ordered list per chapter in
// physical reading order, consumed by `assignSections` (../stateboard/lib) and
// written to the migration-0043 columns by backfill-sections.ts.
//
// The HISTORY/POLSCI book (10th_Hist_SB.pdf), like the Class-9 humanities one,
// has NO solved-example block — each chapter simply closes with a single
// "Exercise". So each of those outlines is one `exercise` block holding the
// chapter's questions in printed order, with every ref prefixed "Ex ".
//
// That is a fact about THAT BOOK, not about this pipeline. The Maths book
// (10th_Maths_Part2_SB.pdf) is structured like every other Balbharati maths
// text: interleaved Solved-Example runs, numbered Practice sets, and a closing
// Problem set — so its outlines are multi-block and span all three
// `section_kind` values. Read the chapter's own entry; do not generalise from
// the humanities ones above it.
//
// These rows are assigned section_* even though mh-ssc-10 is not currently a
// `boardExam` (see config.ts): the data is then ready if the /board reader is
// ever switched on for Class-10 textbook content, and costs nothing meanwhile.
import type { SectionSpec } from "./lib";

export const SECTIONS: Record<string, SectionSpec[]> = {
  "historiography-west-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "historiography-indian-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "applied-history-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "working-of-constitution-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "electoral-process-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],

  // The remaining nine humanities chapters — History 4-9 and PolSci 3-5. Every
  // one of them closes with a single "Exercise" block, exactly like the five
  // above, so each outline is one block. Verified per chapter against the
  // rendered exercise page, not assumed from the pattern.
  "indian-arts-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "mass-media-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "entertainment-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "sports-history-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "tourism-history-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "heritage-management-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "political-parties-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "social-political-movements-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],
  "challenges-democracy-10": [
    { group: "Exercise", label: "Exercise", kind: "exercise", refPrefixes: ["Ex "] },
  ],

  // Geometry Ch.2 — the first MULTI-BLOCK outline in this file, in the book's
  // physical reading order (printed pp.36-46).
  //
  // The `group` strings are the book's own headings VERBATIM, and they carry no
  // section numbers because THE CHAPTER PRINTS NONE. Two agents established that
  // independently: every topic heading here is an unnumbered rounded box, and the
  // only "2.x" numbers in the chapter are figure numbers. So a "2.4 SolvedEx.1"
  // style ref would be a fabricated handle — hence the refs are scoped by heading
  // text instead.
  //
  // That matters because the chapter has TWO separate "Solved Examples" banners
  // (printed p.36 and again p.41). Bare "Ex. (1)" appears under both plus inside
  // two theory sections, so an unscoped ref would collide four ways. Longest
  // matching prefix wins, so the heading-scoped prefixes below take precedence
  // over the bare "Solved Ex." of the first run.
  "pythagoras-10": [
    { group: "Solved Examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Solved Ex."] },
    { group: "Practice set 2.1", label: "Practice set 2.1", kind: "exercise", refPrefixes: ["Ex 2.1 "] },
    {
      group: "Application of Pythagoras theorem",
      label: "Solved Examples",
      kind: "solved_example",
      refPrefixes: ["Application of Pythagoras theorem SolvedEx."],
    },
    {
      group: "Apollonius theorem",
      label: "Solved Examples",
      kind: "solved_example",
      refPrefixes: ["Apollonius theorem SolvedEx."],
    },
    { group: "Practice set 2.2", label: "Practice set 2.2", kind: "exercise", refPrefixes: ["Ex 2.2 "] },
    { group: "Problem set 2", label: "Problem set 2", kind: "miscellaneous", refPrefixes: ["PS2 "] },
  ],
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/mh-ssc-10-text/sections.ts`);
  return s;
}
