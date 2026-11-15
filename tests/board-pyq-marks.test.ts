import { describe, expect, it } from "vitest";
import { resolveBoardMarks, type PaperItemRow } from "@/lib/board/pyqMarks";

const item = (questionId: string, paperId: string, position: number, marks: number | null, partOf: number | null = null): PaperItemRow => ({
  questionId,
  paperId,
  position,
  marks,
  partOf,
});

describe("resolveBoardMarks", () => {
  it("gives a question its printed marks", () => {
    const out = resolveBoardMarks(["q1"], [item("q1", "p1", 3, 2)]);
    expect(out).toEqual({ q1: { kind: "whole", marks: 2 } });
  });

  it("agrees across papers (a CBSE question shared by three sets)", () => {
    const out = resolveBoardMarks(["q1"], [item("q1", "p1", 3, 3), item("q1", "p2", 7, 3), item("q1", "p3", 5, 3)]);
    expect(out.q1).toEqual({ kind: "whole", marks: 3 });
  });

  it("hides the marks when two papers print different marks", () => {
    const out = resolveBoardMarks(["q1"], [item("q1", "p1", 3, 3), item("q1", "p2", 7, 4)]);
    expect(out.q1).toBeUndefined();
  });

  it("names a later part's whole question by its first item's marks", () => {
    // Q.31 [4], set as (i) at position 30 and (ii) at 31.
    const out = resolveBoardMarks(["q2"], [item("q1", "p1", 30, 4), item("q2", "p1", 31, null, 30)]);
    expect(out.q2).toEqual({ kind: "part", ofMarks: 4 });
  });

  it("does not credit the first part with the whole question's marks", () => {
    // The paper prints [4] once, against part (i); (i) alone is not worth 4.
    const out = resolveBoardMarks(["q1"], [item("q1", "p1", 30, 4), item("q2", "p1", 31, null, 30)]);
    expect(out.q1).toEqual({ kind: "part", ofMarks: 4 });
  });

  it("only treats an item as a head within its own paper", () => {
    // p2 has a part pointing at position 30; p1's position 30 is a whole question.
    const out = resolveBoardMarks(
      ["q1"],
      [item("q1", "p1", 30, 4), item("qx", "p2", 30, 3), item("qy", "p2", 31, null, 30)]
    );
    expect(out.q1).toEqual({ kind: "whole", marks: 4 });
  });

  it("hides a question that is whole in one paper and a part in another", () => {
    const out = resolveBoardMarks(
      ["q2"],
      [item("q2", "p1", 5, 4), item("q1", "p2", 30, 4), item("q2", "p2", 31, null, 30)]
    );
    expect(out.q2).toBeUndefined();
  });

  it("hides a part whose head row is missing", () => {
    const out = resolveBoardMarks(["q2"], [item("q2", "p1", 31, null, 30)]);
    expect(out.q2).toBeUndefined();
  });

  it("returns nothing for a question in no paper, and only the questions asked for", () => {
    const out = resolveBoardMarks(["q9"], [item("q1", "p1", 3, 2)]);
    expect(out).toEqual({});
  });

  it("does not care about row order", () => {
    const out = resolveBoardMarks(["q2", "q1"], [item("q2", "p1", 31, null, 30), item("q1", "p1", 30, 4)]);
    expect(out).toEqual({ q1: { kind: "part", ofMarks: 4 }, q2: { kind: "part", ofMarks: 4 } });
  });
});

describe("boardMarksLabel", () => {
  it("reads in plain words", async () => {
    const { boardMarksLabel } = await import("@/lib/board/pyqMarks");
    expect(boardMarksLabel({ kind: "whole", marks: 1 })).toBe("1 mark");
    expect(boardMarksLabel({ kind: "whole", marks: 3 })).toBe("3 marks");
    expect(boardMarksLabel({ kind: "whole", marks: 0.5 })).toBe("0.5 marks");
    expect(boardMarksLabel({ kind: "part", ofMarks: 4 })).toBe("Part of a 4-mark question");
    expect(boardMarksLabel({ kind: "part", ofMarks: 8 })).toBe("Part of an 8-mark question");
  });
});
