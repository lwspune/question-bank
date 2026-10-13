import { describe, expect, it } from "vitest";
import {
  TOP_PYQS,
  parseTopPyqsTarget,
  pickTopSlots,
  topPyqsExport,
  topPyqsTitle,
  topSlotKeys,
  type PlanChapterRow,
} from "@/lib/homework/topPyqs";
import { paperKey } from "@/lib/export/freePaper";

const row = (day: number, position: number, questionId: string, sub = 1, note = `note ${questionId}`): PlanChapterRow => ({
  day,
  position,
  sub,
  questionId,
  chapter: "Mathematical Logic",
  note,
});

describe("pickTopSlots", () => {
  it("takes a chapter's questions in plan order and numbers them 1, 2, 3", () => {
    const out = pickTopSlots([row(9, 2, "c"), row(1, 4, "a"), row(3, 1, "b")]);
    expect(out.map((it) => [it.position, it.questionId])).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
    expect(out[0].note).toBe("note a");
  });

  it("stops at ten questions", () => {
    const rows = Array.from({ length: 14 }, (_, i) => row(i + 1, 1, `q${i + 1}`));
    const out = pickTopSlots(rows);
    expect(TOP_PYQS).toBe(10);
    expect(out.map((it) => it.questionId)).toEqual(rows.slice(0, 10).map((r) => r.questionId));
  });

  it("counts a case study as one question and keeps its parts together in order", () => {
    const rows = [
      row(2, 3, "cs-2", 2),
      row(1, 1, "a"),
      row(2, 3, "cs-1", 1),
      ...Array.from({ length: 9 }, (_, i) => row(5 + i, 1, `x${i}`)),
    ];
    const out = pickTopSlots(rows);
    expect(out.slice(0, 3).map((it) => [it.position, it.sub, it.questionId])).toEqual([
      [1, 1, "a"],
      [2, 1, "cs-1"],
      [2, 2, "cs-2"],
    ]);
    // 10 questions: a, the case study, then x0..x7.
    expect(new Set(out.map((it) => it.position)).size).toBe(10);
    expect(out.at(-1)!.questionId).toBe("x7");
  });

  it("returns fewer than ten when the chapter has fewer, and nothing for none", () => {
    expect(pickTopSlots([row(1, 1, "a"), row(2, 1, "b")])).toHaveLength(2);
    expect(pickTopSlots([])).toEqual([]);
  });
});

describe("topSlotKeys", () => {
  it("takes the first ten slots the chapter owns, in plan order", () => {
    const rows = Array.from({ length: 12 }, (_, i) => row(12 - i, 1, `q${i}`));
    expect(topSlotKeys(rows)).toEqual(Array.from({ length: 10 }, (_, i) => ({ day: i + 1, position: 1 })));
  });

  it("leaves out a case study whose first part is filed under another chapter", () => {
    // The chapter holds only part 2 of the case study on day 1: it belongs to the other chapter.
    expect(topSlotKeys([row(1, 2, "cs-2", 2), row(2, 1, "a")])).toEqual([{ day: 2, position: 1 }]);
  });
});

describe("topPyqsTitle", () => {
  it("names the count, the chapter and the plan", () => {
    expect(topPyqsTitle(10, "Mathematical Logic", "MH HSC Class 12 Maths")).toBe(
      "Top 10 PYQs: Mathematical Logic (MH HSC Class 12 Maths)"
    );
    expect(topPyqsTitle(7, "Matrices", "Plan")).toBe("Top 7 PYQs: Matrices (Plan)");
  });
});

describe("topPyqsExport", () => {
  it("prints the questions in order, each headed by how often the board asked it", () => {
    const out = topPyqsExport("Mathematical Logic", "MH HSC Class 12 Maths", pickTopSlots([row(2, 1, "b", 1, "Asked once: Feb 2026"), row(1, 1, "a", 1, "Asked 6 times: Mar 2016")]));
    expect(out).toEqual({
      ok: true,
      title: "Top 2 PYQs: Mathematical Logic (MH HSC Class 12 Maths)",
      questionIds: ["a", "b"],
      sectionOf: new Map([
        ["a", "Asked 6 times: Mar 2016"],
        ["b", "Asked once: Feb 2026"],
      ]),
      setOf: new Map(),
    });
  });

  it("puts a case study's parts in one set, so its passage prints once", () => {
    const out = topPyqsExport("Optics", "Plan", pickTopSlots([row(1, 1, "p1", 1), row(1, 1, "p2", 2)]));
    expect(out.ok && out.setOf).toEqual(new Map([["p1", "top-1"], ["p2", "top-1"]]));
  });

  it("refuses a chapter with no questions in the plan", () => {
    expect(topPyqsExport("Optics", "Plan", []).ok).toBe(false);
  });

  it("refuses a case study with a missing part", () => {
    expect(topPyqsExport("Optics", "Plan", pickTopSlots([row(1, 1, "p1", 1), row(1, 1, "p3", 3)])).ok).toBe(false);
  });
});

describe("parseTopPyqsTarget", () => {
  const chapter = "0f8b1c3e-2a4d-4e5f-9a6b-7c8d9e0f1a2b";

  it("reads a plan slug and a chapter id", () => {
    expect(parseTopPyqsTarget({ plan: "mh-hsc-12-maths", chapter })).toEqual({ plan: "mh-hsc-12-maths", chapter });
  });

  it("refuses anything else", () => {
    for (const raw of [
      null,
      "mh-hsc-12-maths",
      { plan: "Bad Slug", chapter },
      { plan: "mh-hsc-12-maths", chapter: "not-a-uuid" },
      { plan: "mh-hsc-12-maths" },
      { plan: "x".repeat(81), chapter },
    ]) {
      expect(parseTopPyqsTarget(raw)).toBeNull();
    }
  });
});

describe("paperKey for a chapter's top PYQs", () => {
  it("names the plan and the chapter, apart from a homework day", () => {
    const chapter = "0f8b1c3e-2a4d-4e5f-9a6b-7c8d9e0f1a2b";
    expect(paperKey({ topPyqs: { plan: "mh-hsc-12-maths", chapter } })).toBe(`top:mh-hsc-12-maths:${chapter}`);
    expect(paperKey({ homework: { slug: "mh-hsc-12-maths", day: 1 } })).toBe("homework:mh-hsc-12-maths:1");
  });
});
