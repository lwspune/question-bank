/**
 * The Homework tab (2026-11-04): where it leads, how a plan's chapters are listed
 * for their Top 10 PYQs, and how plans are grouped by exam. Pure.
 */
import { describe, expect, it } from "vitest";
import {
  HOMEWORK_HUB,
  examHomeworkPageHref,
  topChapterHref,
  topListHref,
} from "@/lib/homework/links";
import { chapterNeighbours, groupPlansByExam, planChapters } from "@/lib/homework/chapters";

describe("homework addresses", () => {
  it("gives every exam its own homework page, and the hub lists every plan", () => {
    expect(HOMEWORK_HUB).toBe("/homework");
    expect(examHomeworkPageHref("mh-hsc-12")).toBe("/homework/exam/mh-hsc-12");
  });

  it("puts a plan's Top 10 list and each chapter's Top 10 under the plan", () => {
    expect(topListHref("cbse-12-mathematics")).toBe("/homework/cbse-12-mathematics/top");
    expect(topChapterHref("cbse-12-mathematics", "integrals")).toBe("/homework/cbse-12-mathematics/top/integrals");
  });
});

describe("planChapters", () => {
  const row = (id: string, name: string, orderIndex: number | null) => ({ id, name, orderIndex });

  it("lists each chapter once, in book order, with its address slug", () => {
    const out = planChapters([
      row("c7", "Integrals", 7),
      row("c3", "Matrices", 3),
      row("c7", "Integrals", 7),
      row("c13", "Probability", 13),
      row("c3", "Matrices", 3),
    ]);
    expect(out).toEqual([
      { id: "c3", name: "Matrices", slug: "matrices" },
      { id: "c7", name: "Integrals", slug: "integrals" },
      { id: "c13", name: "Probability", slug: "probability" },
    ]);
  });

  it("puts a chapter with no book position after the rest, by name", () => {
    const out = planChapters([row("b", "Vectors", null), row("a", "Algebra", null), row("c", "Limits", 2)]);
    expect(out.map((c) => c.name)).toEqual(["Limits", "Algebra", "Vectors"]);
  });

  it("never gives two chapters the same address", () => {
    // Two names that slug alike would make the second unreachable; it is
    // dropped rather than shadowed, and every slug stays unique.
    const out = planChapters([row("a", "Sets & Relations", 1), row("b", "Sets Relations", 2)]);
    expect(out.map((c) => c.slug)).toEqual(["sets-relations"]);
  });

  it("skips a row with no chapter name", () => {
    expect(planChapters([row("a", "", 1)])).toEqual([]);
  });
});

describe("chapterNeighbours", () => {
  const list = [
    { id: "1", name: "A", slug: "a" },
    { id: "2", name: "B", slug: "b" },
    { id: "3", name: "C", slug: "c" },
  ];

  it("names the chapters either side, none past the ends", () => {
    expect(chapterNeighbours(list, "b")).toEqual({ prev: list[0], next: list[2] });
    expect(chapterNeighbours(list, "a")).toEqual({ prev: null, next: list[1] });
    expect(chapterNeighbours(list, "c")).toEqual({ prev: list[1], next: null });
    expect(chapterNeighbours(list, "missing")).toEqual({ prev: null, next: null });
  });
});

describe("groupPlansByExam", () => {
  it("groups plans under their exam, exams in the order they first appear", () => {
    const plans = [
      { slug: "x1", examName: "CBSE Class 12" },
      { slug: "n1", examName: "NDA" },
      { slug: "x2", examName: "CBSE Class 12" },
    ];
    expect(groupPlansByExam(plans)).toEqual([
      { examName: "CBSE Class 12", plans: [plans[0], plans[2]] },
      { examName: "NDA", plans: [plans[1]] },
    ]);
  });
});
