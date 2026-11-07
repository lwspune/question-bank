/**
 * "Fix N mistakes in this chapter" (2026-11-07): a signed-in student who opens
 * a chapter they already have waiting mistakes in sees one line above the
 * questions, linked to that chapter's drill. The count comes from the pulse
 * (lib/pulse/cache), built from the drill's own due pool, so the number shown
 * is the number the button serves.
 *
 * Why: in the 30 days to 2026-11-07, 529 chapter-days had a student practising
 * a chapter while holding older unfixed mistakes there; 30% fixed one that day
 * unprompted. Pure core: src/lib/drill/chapterFix.ts.
 */
import { describe, it, expect } from "vitest";
import { dueByChapter, weakChapters, type DueQuestion } from "@/lib/drill/select";
import { chapterFixCount, chapterFixLine, chapterFixLabel } from "@/lib/drill/chapterFix";
import type { Pulse } from "@/lib/pulse/cache";

const q = (id: string, chapterId: string | null): DueQuestion => ({
  questionId: id,
  chapter: chapterId ?? "",
  chapterId,
  place: "Mathematics · NDA",
  subtopic: "s",
  lastWrongAt: "2026-11-01T00:00:00Z",
});

describe("dueByChapter", () => {
  it("counts the due pool per chapter", () => {
    expect(dueByChapter([q("1", "c1"), q("2", "c2"), q("3", "c1")])).toEqual({ c1: 2, c2: 1 });
  });

  it("leaves out a question with no chapter: no page can show it", () => {
    expect(dueByChapter([q("1", null), q("2", "c1")])).toEqual({ c1: 1 });
  });

  it("is empty for an empty pool", () => {
    expect(dueByChapter([])).toEqual({});
  });

  it("agrees with /me's Weak spots, so the two never show different numbers", () => {
    const due = [q("1", "a"), q("2", "b"), q("3", "a"), q("4", "c"), q("5", "a"), q("6", "b")];
    const counts = dueByChapter(due);
    for (const w of weakChapters(due)) expect(counts[w.chapterId]).toBe(w.due);
  });
});

describe("chapterFixCount", () => {
  const pulse = (chapterDue?: Record<string, number>): Pulse => ({
    due: 3,
    week: { done: 0, goal: null },
    chapterDue,
  });

  it("is the chapter's count from the pulse", () => {
    expect(chapterFixCount(pulse({ c1: 2, c2: 1 }), "c1")).toBe(2);
  });

  it("is 0 for a chapter with nothing waiting", () => {
    expect(chapterFixCount(pulse({ c1: 2 }), "zz")).toBe(0);
  });

  it("is 0 before the pulse arrives, and for a pulse cached before the field existed", () => {
    expect(chapterFixCount(null, "c1")).toBe(0);
    expect(chapterFixCount(pulse(undefined), "c1")).toBe(0);
  });
});

describe("chapterFixLine", () => {
  it("names one mistake in the singular", () => {
    expect(chapterFixLine(1)).toBe("Fix 1 mistake in this chapter");
  });

  it("names several in the plural, with Indian digit grouping", () => {
    expect(chapterFixLine(2)).toBe("Fix 2 mistakes in this chapter");
    expect(chapterFixLine(1200)).toBe("Fix 1,200 mistakes in this chapter");
  });

  it("carries no dash: the site's visible text never does", () => {
    for (const n of [1, 2, 35]) expect(chapterFixLine(n)).not.toMatch(/[–—]|--/);
  });
});

describe("chapterFixLabel", () => {
  it("says what the button does for a screen reader, since its visible text is just 'Fix them'", () => {
    expect(chapterFixLabel(1)).toBe("Fix the 1 mistake waiting in this chapter");
    expect(chapterFixLabel(4)).toBe("Fix the 4 mistakes waiting in this chapter");
  });
});
