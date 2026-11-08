/**
 * The exam focus on /me and /performance (2026-11-08): which exam a student's
 * Home and Performance tabs are about. Pure. Lives in lib/me/focus.ts.
 *
 * The rules the owner agreed:
 *   - Only a student with TWO OR MORE exams gets a switch (and an "All" chip).
 *     A one-exam or no-exam student sees no filter at all: with one chip there
 *     is no way to reach a mistake from another exam, and 24 of 331 one-exam
 *     students with recent mistakes had some in another exam (2026-11-08).
 *   - The default for a two-exam student is the exam they practised most
 *     recently; their own tap wins over that; "All" is a choice they can save.
 */
import { describe, it, expect } from "vitest";
import {
  FOCUS_ALL,
  resolveFocus,
  needsRecentRead,
  parseFocusChoice,
  performanceFocus,
} from "@/lib/me/focus";

describe("resolveFocus", () => {
  it("gives no switch and no filter to a one-exam student", () => {
    const f = resolveFocus({ targets: ["mht-cet"], saved: null, recent: null });
    expect(f.options).toEqual(["mht-cet"]);
    expect(f.switchable).toBe(false);
    expect(f.selected).toBe("mht-cet");
    expect(f.filterExamName).toBeNull();
  });

  it("gives nothing to a student with no exam", () => {
    const f = resolveFocus({ targets: [], saved: null, recent: null });
    expect(f.options).toEqual([]);
    expect(f.switchable).toBe(false);
    expect(f.selected).toBeNull();
    expect(f.filterExamName).toBeNull();
  });

  it("uses the student's own choice first", () => {
    const f = resolveFocus({ targets: ["mht-cet", "jee-mains"], saved: "jee-mains", recent: "mht-cet" });
    expect(f.switchable).toBe(true);
    expect(f.selected).toBe("jee-mains");
    expect(f.source).toBe("chosen");
    expect(f.filterExamName).toBe("JEE Mains");
  });

  it("treats a saved All as a choice: no filter", () => {
    const f = resolveFocus({ targets: ["mht-cet", "jee-mains"], saved: FOCUS_ALL, recent: "mht-cet" });
    expect(f.selected).toBeNull();
    expect(f.source).toBe("chosen");
    expect(f.filterExamName).toBeNull();
  });

  it("falls back to the exam practised most recently", () => {
    const f = resolveFocus({ targets: ["nda", "cds"], saved: null, recent: "cds" });
    expect(f.selected).toBe("cds");
    expect(f.source).toBe("recent");
    expect(f.filterExamName).toBe("CDS");
  });

  it("ignores a recent exam the student did not choose, and takes their first", () => {
    const f = resolveFocus({ targets: ["nda", "cds"], saved: null, recent: "jee-mains" });
    expect(f.selected).toBe("nda");
    expect(f.source).toBe("first");
  });

  it("ignores a saved exam that is no longer one of theirs", () => {
    const f = resolveFocus({ targets: ["nda", "cds"], saved: "mht-cet", recent: null });
    expect(f.selected).toBe("nda");
    expect(f.source).toBe("first");
  });

  it("leaves international exams off www: IMAT + NDA is a one-exam student here", () => {
    const f = resolveFocus({ targets: ["imat", "nda"], saved: null, recent: null });
    expect(f.options).toEqual(["nda"]);
    expect(f.switchable).toBe(false);
    expect(f.filterExamName).toBeNull();
  });

  it("drops unknown slugs and duplicates", () => {
    const f = resolveFocus({ targets: ["nda", "bogus", "nda", "cds"], saved: null, recent: null });
    expect(f.options).toEqual(["nda", "cds"]);
  });
});

describe("needsRecentRead", () => {
  it("is false when there is no switch to default", () => {
    expect(needsRecentRead({ targets: ["nda"], saved: null })).toBe(false);
    expect(needsRecentRead({ targets: [], saved: null })).toBe(false);
  });
  it("is false when the student has chosen", () => {
    expect(needsRecentRead({ targets: ["nda", "cds"], saved: "cds" })).toBe(false);
    expect(needsRecentRead({ targets: ["nda", "cds"], saved: FOCUS_ALL })).toBe(false);
  });
  it("is true for a two-exam student with no valid choice", () => {
    expect(needsRecentRead({ targets: ["nda", "cds"], saved: null })).toBe(true);
    expect(needsRecentRead({ targets: ["nda", "cds"], saved: "mht-cet" })).toBe(true);
  });
});

describe("parseFocusChoice", () => {
  const targets = ["nda", "cds"];
  it("accepts one of the student's exams, or All", () => {
    expect(parseFocusChoice("cds", targets)).toBe("cds");
    expect(parseFocusChoice(FOCUS_ALL, targets)).toBe(FOCUS_ALL);
  });
  it("refuses anything else", () => {
    expect(parseFocusChoice("mht-cet", targets)).toBeNull();
    expect(parseFocusChoice("", targets)).toBeNull();
    expect(parseFocusChoice(42, targets)).toBeNull();
    expect(parseFocusChoice(undefined, targets)).toBeNull();
    // Only a student with a switch can save a focus.
    expect(parseFocusChoice("nda", ["nda"])).toBeNull();
    expect(parseFocusChoice(FOCUS_ALL, ["nda"])).toBeNull();
  });
});

describe("performanceFocus", () => {
  const sat = ["MHT-CET", "JEE Mains"];

  it("keeps today's page when there is no filter", () => {
    expect(performanceFocus({ satExams: sat, filterExamName: null, urlExam: undefined })).toEqual({
      exam: undefined,
      showExamRow: true,
      noPaperFor: null,
    });
  });

  it("opens on the focus exam and hides the page's own exam row", () => {
    expect(performanceFocus({ satExams: sat, filterExamName: "JEE Mains", urlExam: undefined })).toEqual({
      exam: "JEE Mains",
      showExamRow: false,
      noPaperFor: null,
    });
  });

  it("says so when the focus exam has no marked paper", () => {
    expect(performanceFocus({ satExams: sat, filterExamName: "CDS", urlExam: undefined })).toEqual({
      exam: undefined,
      showExamRow: false,
      noPaperFor: "CDS",
    });
  });

  it("leaves a student with no marked paper at all to the page's own starter", () => {
    expect(performanceFocus({ satExams: [], filterExamName: "CDS", urlExam: undefined })).toEqual({
      exam: undefined,
      showExamRow: true,
      noPaperFor: null,
    });
  });

  it("lets a link that names an exam win, with the exam row back", () => {
    expect(performanceFocus({ satExams: sat, filterExamName: "JEE Mains", urlExam: "MHT-CET" })).toEqual({
      exam: "MHT-CET",
      showExamRow: true,
      noPaperFor: null,
    });
  });
});
