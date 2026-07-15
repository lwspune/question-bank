import { describe, expect, it } from "vitest";
import { dominantExamId } from "@/lib/papers/exam";

/** Minimal stand-in for the `exam` slice of a QuestionRow. */
function q(examId: string) {
  return { exam: { id: examId, name: `Exam ${examId}` } };
}

describe("dominantExamId", () => {
  it("returns null for an empty paper", () => {
    expect(dominantExamId([])).toBeNull();
  });

  it("returns the only exam when every question shares one", () => {
    expect(dominantExamId([q("nda"), q("nda"), q("nda")])).toBe("nda");
  });

  it("returns the most common exam in a mixed paper", () => {
    expect(dominantExamId([q("cbse"), q("nda"), q("nda")])).toBe("nda");
  });

  it("breaks a tie by first appearance, not by id ordering", () => {
    // 'nda' appears first; both have 2. Sorting by id would wrongly pick 'cbse'.
    expect(dominantExamId([q("nda"), q("cbse"), q("nda"), q("cbse")])).toBe("nda");
  });

  it("ignores questions with a missing exam rather than counting them", () => {
    const rows = [q("nda"), { exam: null }, q("nda")] as Parameters<typeof dominantExamId>[0];
    expect(dominantExamId(rows)).toBe("nda");
  });

  it("returns null when no question carries an exam", () => {
    const rows = [{ exam: null }, { exam: null }] as Parameters<typeof dominantExamId>[0];
    expect(dominantExamId(rows)).toBeNull();
  });
});
