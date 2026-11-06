/**
 * Site coherence (2026-11-07 review): the same fact must read the same way on
 * every surface. Each block pins one rule that a page had broken:
 *  - a board exam's mocks are chapter tests, never "full papers";
 *  - /start's entrance list is the exams that actually have the mock loop;
 *  - www's notes count and /formula's exam list leave out the intl exams;
 *  - the exam hub's homework button opens THAT exam's plans.
 */
import { describe, expect, it } from "vitest";
import { entranceMockExamNames, mockCardFallbackCopy, type MockExamCard } from "@/lib/mocks/mocksNav";
import { mockHubSubtitle } from "@/lib/mocks/catalogue";
import { wwwNotesChapterCount } from "@/lib/notes/notesNav";
import { groupFormulaPagesForIndex, listFormulaChapterPages } from "@/lib/formula/chapterPages";
import { PYQVAULT_EXAMS } from "@/lib/exam/examContext";
import { INTL_EXAMS } from "@/lib/sites/intl";
import { NOTES_NAV_INDEX } from "@/lib/notes/notesNavIndex.generated";

const card = (over: Partial<MockExamCard>): MockExamCard => ({
  slug: "mh-hsc-12",
  displayName: "MH HSC 12",
  examName: "Maharashtra HSC Class 12",
  count: 55,
  byType: { "past-papers": 0, practice: 0, sectional: 55 } as MockExamCard["byType"],
  firstYear: 0,
  lastYear: 0,
  paperCount: 1,
  ...over,
});

describe("mockCardFallbackCopy (the /mock card of an exam with no hand-written copy)", () => {
  it("calls a board exam's chapter-only mocks chapter tests, not full papers", () => {
    const copy = mockCardFallbackCopy(card({}));
    expect(copy.tagline).toBe("Chapter tests");
    expect(copy.blurb).toBe("Timed chapter tests from Maharashtra HSC Class 12 questions, marked for you.");
    expect(copy.blurb).not.toMatch(/full/i);
  });

  it("keeps full-paper copy for an exam that has whole papers", () => {
    const copy = mockCardFallbackCopy(
      card({ slug: "jee-mains", displayName: "JEE Mains", examName: "JEE Mains", byType: { "past-papers": 24, practice: 0, sectional: 71 } as MockExamCard["byType"] })
    );
    expect(copy.tagline).toBe("Full-length papers");
    expect(copy.blurb).toBe("Full JEE Mains papers as timed tests, marked the way the exam marks them.");
  });

  it("says sectional tests for a non-board exam with only sectional mocks", () => {
    const copy = mockCardFallbackCopy(card({ slug: "afcat", displayName: "AFCAT", examName: "AFCAT" }));
    expect(copy.tagline).toBe("Sectional tests");
  });
});

describe("mockHubSubtitle (/mock/exam/<slug>)", () => {
  it("promises only what the exam has: chapter tests for a board exam", () => {
    const s = mockHubSubtitle("Maharashtra HSC Class 12", ["sectional"], true);
    expect(s).toBe("Timed Maharashtra HSC Class 12 chapter tests, marked for you.");
  });

  it("keeps the full sentence for an exam with past and practice papers", () => {
    expect(mockHubSubtitle("NDA", ["past-papers", "practice", "sectional"], false)).toBe(
      "Sit NDA papers online, timed and marked for you: full past papers, practice papers with the same number of questions per subject, and shorter sectional tests."
    );
  });

  it("does not promise practice papers an exam does not have", () => {
    const s = mockHubSubtitle("NEET", ["past-papers"], false);
    expect(s).toBe("Sit NEET papers online, timed and marked for you: full past papers.");
    expect(s).not.toMatch(/practice/);
  });
});

describe("entranceMockExamNames (/start's 'For an entrance exam' line)", () => {
  const names = entranceMockExamNames();

  it("lists every exam with the mock loop, each family once", () => {
    for (const n of ["NDA", "CDS", "NEET", "MHT-CET", "JEE Mains", "IPMAT", "UCEED", "MPSC", "UPSC CSE", "SSC CGL", "SPI"]) {
      expect(names).toContain(n);
    }
    expect(names.filter((n) => n === "MPSC")).toHaveLength(1);
    expect(names.filter((n) => n.startsWith("SSC CGL"))).toHaveLength(1);
  });

  it("leaves out board exams (their loop is the book) and exams with no mocks", () => {
    expect(names).not.toContain("MH HSC 12");
    expect(names).not.toContain("CBSE Class 12");
    expect(names).not.toContain("AFCAT");
  });
});

describe("wwwNotesChapterCount (the homepage's notes count)", () => {
  it("counts www's chapters only, never the intl exams'", () => {
    const www = new Set(PYQVAULT_EXAMS.map((e) => e.examName));
    const intl = new Set(INTL_EXAMS.map((e) => e.examName));
    const expected = NOTES_NAV_INDEX.filter((c) => www.has(c.examName)).length;
    expect(wwwNotesChapterCount()).toBe(expected);
    expect(NOTES_NAV_INDEX.some((c) => intl.has(c.examName))).toBe(true); // the case this guards
    expect(wwwNotesChapterCount()).toBeLessThan(NOTES_NAV_INDEX.length);
  });
});

describe("groupFormulaPagesForIndex with www's exams (/formula on www)", () => {
  it("names no intl exam", () => {
    const groups = groupFormulaPagesForIndex(listFormulaChapterPages(), PYQVAULT_EXAMS);
    const intl = new Set(INTL_EXAMS.map((e) => e.slug as string));
    expect(groups.length).toBeGreaterThan(0);
    expect(groups.some((g) => intl.has(g.examSlug))).toBe(false);
  });
});
