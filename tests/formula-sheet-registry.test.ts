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
import { buildFormulaSheetHtml, formulaSheetStats } from "@/lib/export/pdf/formulaSheetHtml";

describe("formula sheet: every registered chapter", () => {
  it("has something to print and renders without a KaTeX error", () => {
    const empty: string[] = [];
    const broken: string[] = [];
    for (const c of NOTES_CHAPTERS) {
      const id = `${c.subjectRoute}/${c.chapterSlug}`;
      const stats = formulaSheetStats(c);
      if (stats.formulas + stats.references === 0) empty.push(id);
      const html = buildFormulaSheetHtml({ chapter: c, head: "", branded: true });
      if (html.includes("katex-error")) broken.push(id);
      if (/premium pass/i.test(html)) broken.push(`${id} (sells)`);
    }
    expect(empty).toEqual([]);
    expect(broken).toEqual([]);
  });
});
