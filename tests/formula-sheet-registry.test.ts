/**
 * Every registered /notes chapter has a formula sheet that builds clean.
 *
 * This is the guard for chapters shipped AFTER the sheet: a new chapter gets
 * its download button automatically (the button is registry-driven), so a
 * formula whose LaTeX KaTeX cannot parse, or a chapter with nothing to print,
 * would ship as a broken or empty paid file with nothing else to catch it.
 * notes:lint checks the data; nothing else renders every formula box.
 */
import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { buildFormulaSheetHtml, formulaSheetStats, hasFormulaSheet } from "@/lib/export/pdf/formulaSheetHtml";

// Chapters taught in prose alone (IMAT critical thinking, reading
// comprehension): no formula, no table, so no sheet is offered. Listed so a
// chapter cannot drop out of the sheet by accident.
const NO_SHEET = [
  "imat-logic/critical-thinking",
  "imat-reading/reading-comprehension",
  "mh-scholarship-4-intelligence/analogy",
  "mh-scholarship-4-intelligence/coding-decoding",
  "mh-scholarship-4-maths/numbers-number-system",
  "mh-scholarship-7-intelligence/analogy",
  "mh-scholarship-7-intelligence/classification-odd-one-out",
  "spi-english/reading-comprehension",
  "spi-english/sentence-rearrangement",
  "ssc-cgl-english/fill-in-the-blanks",
  "ssc-cgl-english/reading-comprehension",
  "ssc-cgl-english/sentence-rearrangement",
  "ssc-cgl-reasoning/dice-cubes",
  "ssc-cgl-reasoning/embedded-figures",
  "ssc-cgl-reasoning/inequalities",
  "ssc-cgl-reasoning/mirror-images",
  "ssc-cgl-reasoning/missing-number",
  "ssc-cgl-reasoning/non-verbal",
  "ssc-cgl-reasoning/statements",
  "ssc-cgl-reasoning/syllogism",
  "ssc-cgl-tier-2-english/cloze-test",
  "ssc-cgl-tier-2-english/fill-in-the-blanks",
  "ssc-cgl-tier-2-english/sentence-rearrangement",
  "ssc-cgl-tier-2-english/spotting-errors",
  "ssc-cgl-tier-2-reasoning/alphabet-number",
  "ssc-cgl-tier-2-reasoning/blood-relations",
  "ssc-cgl-tier-2-reasoning/classification",
  "ssc-cgl-tier-2-reasoning/data-sufficiency",
  "ssc-cgl-tier-2-reasoning/embedded-figures",
  "ssc-cgl-tier-2-reasoning/non-verbal",
  "ssc-cgl-tier-2-reasoning/statements",
];

describe("formula sheet: every registered chapter", () => {
  it("has something to print and renders without a KaTeX error", () => {
    const empty: string[] = [];
    const broken: string[] = [];
    for (const c of NOTES_CHAPTERS) {
      const id = `${c.subjectRoute}/${c.chapterSlug}`;
      const stats = formulaSheetStats(c);
      expect(hasFormulaSheet(c)).toBe(stats.formulas + stats.references > 0);
      if (!hasFormulaSheet(c)) {
        empty.push(id);
        continue;
      }
      const html = buildFormulaSheetHtml({ chapter: c, head: "", branded: true });
      if (html.includes("katex-error")) broken.push(id);
      if (/premium pass/i.test(html)) broken.push(`${id} (sells)`);
    }
    expect(empty.sort()).toEqual([...NO_SHEET].sort());
    expect(broken).toEqual([]);
  });
});
