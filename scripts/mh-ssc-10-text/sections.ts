// Book-faithful section OUTLINES for the Class-10 textbook chapters.
//
// Same shape as scripts/mh-sb-9/sections.ts: one ordered list per chapter in
// physical reading order, consumed by `assignSections` (../stateboard/lib) and
// written to the migration-0043 columns by backfill-sections.ts.
//
// This book, like the Class-9 humanities one, has NO solved-example block — each
// chapter simply closes with a single "Exercise". So every outline is one
// `exercise` block holding the chapter's questions in printed order, and every
// ref is prefixed "Ex ".
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
};

export function sectionsFor(id: string): SectionSpec[] {
  const s = SECTIONS[id];
  if (!s) throw new Error(`no section outline for chapter "${id}" — author one in scripts/mh-ssc-10-text/sections.ts`);
  return s;
}
