/**
 * Chapter-wise formula pages (2026-10-10): /formula/<exam>/<subject>/<chapter>,
 * one page per /notes chapter with enough formulas to be worth indexing.
 *
 * Built from the notes registry alone, so these pages make no database read at
 * build or at request. The URL tail is the chapter's /questions tail, made by
 * the same slug function, so a reader and a crawler see one address scheme.
 *
 * What this pins:
 *   - the thin-page floor, and that every registered chapter is either a page
 *     or below the floor (nothing silently dropped);
 *   - one URL per page, and no exam slug that an identity page (/formula/<slug>)
 *     could also claim, since both live under the same first segment;
 *   - every formula, reference table and trap of a chapter reaching its page.
 */
import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import { getExamByName } from "@/lib/exam/examContext";
import { slugifyName } from "@/lib/questions/slugs";
import { allFormulaSlugs } from "@/lib/formula";
import {
  buildFormulaPageSections,
  findFormulaChapterPage,
  formulaChapterHref,
  formulaExamGroup,
  formulaExamSlugs,
  formulaPageCounts,
  formulaPageForNotesChapter,
  formulaPageLead,
  formulaPageSiblings,
  groupFormulaPagesForIndex,
  listFormulaChapterPages,
  qualifiesForFormulaPage,
} from "@/lib/formula/chapterPages";

const pages = listFormulaChapterPages();

describe("qualifiesForFormulaPage", () => {
  it("needs five formulas, or one formula with two reference tables", () => {
    expect(qualifiesForFormulaPage({ formulas: 5, tables: 0, traps: 0 })).toBe(true);
    expect(qualifiesForFormulaPage({ formulas: 1, tables: 2, traps: 0 })).toBe(true);
    expect(qualifiesForFormulaPage({ formulas: 4, tables: 1, traps: 30 })).toBe(false);
  });
  it("never makes a formula page out of tables alone", () => {
    expect(qualifiesForFormulaPage({ formulas: 0, tables: 9, traps: 20 })).toBe(false);
  });
});

describe("listFormulaChapterPages", () => {
  it("has pages", () => {
    expect(pages.length).toBeGreaterThan(100);
  });

  it("accounts for every registered chapter: a page, or below the floor", () => {
    for (const c of NOTES_CHAPTERS) {
      const page = formulaPageForNotesChapter(c.subjectRoute, c.chapterSlug);
      const counts = formulaPageCounts(c);
      if (qualifiesForFormulaPage(counts)) expect(page, `${c.subjectRoute}/${c.chapterSlug}`).not.toBeNull();
      else expect(page, `${c.subjectRoute}/${c.chapterSlug}`).toBeNull();
    }
  });

  it("counts what the PDF sheet counts (deriveSummary)", () => {
    for (const p of pages.slice(0, 20)) {
      const c = NOTES_CHAPTERS.find((x) => x.subjectRoute === p.subjectRoute && x.chapterSlug === p.notesChapterSlug)!;
      const s = c.slugs.map((k) => deriveSummary(c.notes[k]));
      expect(p.counts).toEqual({
        formulas: s.reduce((a, x) => a + x.formulas.length, 0),
        tables: s.reduce((a, x) => a + x.references.length, 0),
        traps: s.reduce((a, x) => a + x.traps.length, 0),
      });
    }
  });

  it("leaves out subjects with no formulas at all", () => {
    expect(pages.some((p) => p.subjectRoute === "cds-english")).toBe(false);
    expect(pages.some((p) => p.subjectRoute === "nda-geography")).toBe(false);
  });

  it("uses the /questions slug rule for every segment", () => {
    for (const p of pages) {
      expect(p.examSlug).toBe(getExamByName(p.examName)!.slug);
      expect(p.subjectSlug).toBe(slugifyName(p.subjectName));
      expect(p.chapterSlug).toBe(slugifyName(p.chapterName));
      expect(formulaChapterHref(p)).toBe(`/formula/${p.examSlug}/${p.subjectSlug}/${p.chapterSlug}`);
    }
  });

  it("gives every page its own URL", () => {
    const hrefs = pages.map(formulaChapterHref);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("never lets an exam slug collide with an identity page slug", () => {
    const identity = new Set(allFormulaSlugs());
    for (const p of pages) expect(identity.has(p.examSlug), p.examSlug).toBe(false);
  });

  it("names the exam by its short display name", () => {
    const p = findFormulaChapterPage("nda", "mathematics", "trigonometric-identities")!;
    expect(p.examDisplay).toBe("NDA");
    expect(p.notesHref).toBe("/notes/nda-maths/trigonometric-identities");
  });
});

describe("findFormulaChapterPage", () => {
  it("round-trips every page from its URL segments", () => {
    for (const p of pages) expect(findFormulaChapterPage(p.examSlug, p.subjectSlug, p.chapterSlug)).toBe(p);
  });
  it("is case-insensitive, like /questions", () => {
    expect(findFormulaChapterPage("NDA", "Mathematics", "Trigonometric-Identities")).not.toBeNull();
  });
  it("returns null for an unknown or below-floor chapter", () => {
    expect(findFormulaChapterPage("nda", "mathematics", "no-such-chapter")).toBeNull();
    expect(findFormulaChapterPage("cds", "english", "spotting-errors")).toBeNull();
  });
});

describe("buildFormulaPageSections", () => {
  it("carries every formula, table and trap, in teaching order, with trap bodies", () => {
    for (const p of pages) {
      const c = NOTES_CHAPTERS.find((x) => x.subjectRoute === p.subjectRoute && x.chapterSlug === p.notesChapterSlug)!;
      const sections = buildFormulaPageSections(c);
      const order = c.chapter.subtopicOrder.filter((s) => c.notes[s]);
      expect(sections.map((s) => s.subtopicSlug)).toEqual(
        order.filter((s) => {
          const d = deriveSummary(c.notes[s]);
          return d.formulas.length + d.references.length + d.traps.length > 0;
        })
      );
      const flat = sections.flatMap((s) => s.formulas.map((f) => f.formula.label + "|" + f.formula.latex));
      const expected = order.flatMap((s) => deriveSummary(c.notes[s]).formulas.map((f) => f.label + "|" + f.latex));
      expect(flat).toEqual(expected);
      expect(sections.reduce((a, s) => a + s.tables.length, 0)).toBe(p.counts.tables);
      const traps = sections.flatMap((s) => s.traps);
      expect(traps.length).toBe(p.counts.traps);
      for (const t of traps) expect(t.body.length).toBeGreaterThan(0);
    }
  });

  it("links each subtopic to its notes page", () => {
    const c = NOTES_CHAPTERS.find((x) => x.subjectRoute === "nda-maths" && x.chapterSlug === "trigonometric-identities")!;
    const [first] = buildFormulaPageSections(c);
    expect(first.notesHref).toBe(`/notes/nda-maths/trigonometric-identities/${first.subtopicSlug}`);
  });

  it("delimits bare-math legend symbols so they render as maths, keeping the rest", () => {
    for (const p of pages) {
      const c = NOTES_CHAPTERS.find((x) => x.subjectRoute === p.subjectRoute && x.chapterSlug === p.notesChapterSlug)!;
      for (const s of buildFormulaPageSections(c)) {
        for (const f of s.formulas) {
          for (const sym of f.formula.symbols ?? []) {
            const bareMath = !sym.symbol.includes("\\(") && /[_^\\]/.test(sym.symbol) && !sym.symbol.includes("$");
            expect(bareMath, `${p.notesChapterSlug}: ${sym.symbol}`).toBe(false);
          }
        }
      }
    }
  });
});

describe("formulaPageSiblings", () => {
  it("lists the other pages of the same exam and subject", () => {
    const p = findFormulaChapterPage("nda", "mathematics", "trigonometric-identities")!;
    const sibs = formulaPageSiblings(p);
    expect(sibs.length).toBeGreaterThan(5);
    expect(sibs).not.toContain(p);
    for (const s of sibs) {
      expect(s.examSlug).toBe(p.examSlug);
      expect(s.subjectSlug).toBe(p.subjectSlug);
    }
  });
});

describe("formulaPageLead", () => {
  it("states the counts as a quotable sentence and drops a zero part", () => {
    const base = findFormulaChapterPage("nda", "mathematics", "trigonometric-identities")!;
    expect(formulaPageLead({ ...base, counts: { formulas: 10, tables: 2, traps: 14 } })).toBe(
      "10 formulas, 2 reference tables and 14 common traps for NDA Mathematics Trigonometric Identities, grouped by subtopic."
    );
    expect(formulaPageLead({ ...base, counts: { formulas: 6, tables: 0, traps: 1 } })).toBe(
      "6 formulas and 1 common trap for NDA Mathematics Trigonometric Identities, grouped by subtopic."
    );
    expect(formulaPageLead({ ...base, counts: { formulas: 1, tables: 1, traps: 0 } })).toBe(
      "1 formula and 1 reference table for NDA Mathematics Trigonometric Identities, grouped by subtopic."
    );
  });
});

describe("groupFormulaPagesForIndex", () => {
  it("groups every page once, by exam then subject, chapters in A to Z order", () => {
    const groups = groupFormulaPagesForIndex(pages);
    const flat = groups.flatMap((g) => g.subjects.flatMap((s) => s.pages));
    expect(flat.length).toBe(pages.length);
    expect(new Set(flat).size).toBe(pages.length);
    for (const g of groups) {
      for (const s of g.subjects) {
        const names = s.pages.map((p) => p.chapterName);
        expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
        for (const p of s.pages) expect(p.examSlug).toBe(g.examSlug);
      }
    }
    expect(groups[0].examDisplay).toBe("NDA");
  });
});

/**
 * The four exam hubs (/formula/nda ...). Next decides which exam slugs the
 * chapter pages are pre-built under from the PARENT /formula/[slug] folder's
 * params, so those slugs must be real pages: each lists its exam's chapters.
 */
describe("exam hubs", () => {
  it("has one slug per exam with a formula page, none of them an identity slug", () => {
    const slugs = formulaExamSlugs();
    expect(slugs).toEqual([...new Set(pages.map((p) => p.examSlug))].sort((a, b) => slugs.indexOf(a) - slugs.indexOf(b)));
    const identity = new Set(allFormulaSlugs());
    for (const s of slugs) expect(identity.has(s)).toBe(false);
  });
  it("finds an exam's group, and nothing for an identity or unknown slug", () => {
    const g = formulaExamGroup("nda")!;
    expect(g.examDisplay).toBe("NDA");
    expect(g.subjects.flatMap((s) => s.pages).every((p) => p.examSlug === "nda")).toBe(true);
    expect(formulaExamGroup(allFormulaSlugs()[0])).toBeNull();
    expect(formulaExamGroup("no-such-exam")).toBeNull();
  });
});
