import { describe, it, expect } from "vitest";
import { scopeToChapter, weakChapters, type DueQuestion } from "@/lib/drill/select";

/**
 * /me "Weak spots" (2026-11-06): the chapters where most of a student's
 * waiting mistakes sit, each with a Fix button that drills that chapter alone.
 * Built from the drill's own due pool, so the counts are the ones /drill serves.
 */
const q = (
  id: string,
  chapterId: string | null,
  chapter: string,
  lastWrongAt: string,
  place = "Mathematics · NDA"
): DueQuestion => ({ questionId: id, chapter, chapterId, place, subtopic: "s", lastWrongAt });

describe("weakChapters", () => {
  it("groups the due pool by chapter, most mistakes first", () => {
    const due = [
      q("1", "c1", "Probability", "2026-11-01T00:00:00Z"),
      q("2", "c2", "Matrices", "2026-11-02T00:00:00Z"),
      q("3", "c2", "Matrices", "2026-11-03T00:00:00Z"),
      q("4", "c3", "Vectors", "2026-11-04T00:00:00Z"),
      q("5", "c2", "Matrices", "2026-11-05T00:00:00Z"),
      q("6", "c1", "Probability", "2026-11-05T00:00:00Z"),
    ];
    expect(weakChapters(due)).toEqual([
      { chapterId: "c2", name: "Matrices", place: "Mathematics · NDA", due: 3 },
      { chapterId: "c1", name: "Probability", place: "Mathematics · NDA", due: 2 },
      { chapterId: "c3", name: "Vectors", place: "Mathematics · NDA", due: 1 },
    ]);
  });

  it("keeps two chapters with the same name in different exams apart", () => {
    const due = [
      q("1", "nda-p", "Probability", "2026-11-01T00:00:00Z", "Mathematics · NDA"),
      q("2", "cet-p", "Probability", "2026-11-02T00:00:00Z", "Mathematics · MHT-CET"),
      q("3", "cet-p", "Probability", "2026-11-03T00:00:00Z", "Mathematics · MHT-CET"),
    ];
    expect(weakChapters(due).map((w) => [w.chapterId, w.due])).toEqual([
      ["cet-p", 2],
      ["nda-p", 1],
    ]);
  });

  it("breaks a tie by the most recent miss", () => {
    const due = [
      q("1", "old", "Old", "2026-10-01T00:00:00Z"),
      q("2", "new", "New", "2026-11-05T00:00:00Z"),
    ];
    expect(weakChapters(due).map((w) => w.chapterId)).toEqual(["new", "old"]);
  });

  it("shows three at most", () => {
    const due = ["a", "b", "c", "d"].map((c, i) => q(String(i), c, c, "2026-11-01T00:00:00Z"));
    expect(weakChapters(due)).toHaveLength(3);
  });

  it("leaves out a question whose chapter is unknown: there is nothing to link to", () => {
    expect(weakChapters([q("1", null, "", "2026-11-01T00:00:00Z")])).toEqual([]);
  });

  it("is empty for an empty pool", () => {
    expect(weakChapters([])).toEqual([]);
  });
});

describe("scopeToChapter", () => {
  it("narrows the pool to one chapter and keeps the pool's order", () => {
    const due = [
      q("1", "c1", "A", "2026-11-01T00:00:00Z"),
      q("2", "c2", "B", "2026-11-02T00:00:00Z"),
      q("3", "c1", "A", "2026-11-03T00:00:00Z"),
    ];
    expect(scopeToChapter(due, "c1").map((d) => d.questionId)).toEqual(["1", "3"]);
  });

  it("is empty for a chapter with nothing due", () => {
    expect(scopeToChapter([q("1", "c1", "A", "2026-11-01T00:00:00Z")], "zz")).toEqual([]);
  });
});
