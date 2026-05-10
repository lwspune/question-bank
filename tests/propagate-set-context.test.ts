import { describe, expect, it } from "vitest";
import { propagateSetContext } from "@/lib/upload/propagateSetContext";
import type { ParsedRow } from "@/lib/upload/parser";

function row(
  sourceRow: number,
  setLabel: string | undefined,
  context: string | undefined,
  question: string = "q?"
): ParsedRow {
  return {
    sourceRow,
    setLabel,
    context,
    subject: "Mathematics",
    chapter: "Trigonometric Identities",
    question,
    optionA: "a",
    optionB: "b",
    optionC: "c",
    optionD: "d",
    answer: "A",
    difficulty: "EASY",
  };
}

describe("propagateSetContext", () => {
  it("returns rows unchanged when no row has a set label", () => {
    const input = [
      row(2, undefined, "ctx-1", "q1"),
      row(3, undefined, undefined, "q2"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rows).toEqual(input);
    }
  });

  it("propagates the first row's context to subsequent rows in the same set", () => {
    const input = [
      row(2, "S1", "passage A", "q1"),
      row(3, "S1", undefined, "q2"),
      row(4, "S1", undefined, "q3"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rows.map((r) => r.context)).toEqual([
        "passage A",
        "passage A",
        "passage A",
      ]);
    }
  });

  it("keeps standalone rows untouched even when other rows form sets", () => {
    const input = [
      row(2, "S1", "passage A", "q1"),
      row(3, "S1", undefined, "q2"),
      row(4, undefined, "standalone ctx", "q3"),
      row(5, undefined, undefined, "q4"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rows[2].context).toBe("standalone ctx");
      expect(result.rows[3].context).toBeUndefined();
    }
  });

  it("supports multiple distinct sets in one upload", () => {
    const input = [
      row(2, "S1", "passage A", "q1"),
      row(3, "S1", undefined, "q2"),
      row(4, "S2", "passage B", "q3"),
      row(5, "S2", undefined, "q4"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rows.map((r) => r.context)).toEqual([
        "passage A",
        "passage A",
        "passage B",
        "passage B",
      ]);
    }
  });

  it("treats sets as label-scoped, not order-scoped (interleaved sets are still grouped correctly)", () => {
    const input = [
      row(2, "S1", "passage A", "q1"),
      row(3, "S2", "passage B", "q2"),
      row(4, "S1", undefined, "q3"),
      row(5, "S2", undefined, "q4"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rows[2].context).toBe("passage A");
      expect(result.rows[3].context).toBe("passage B");
    }
  });

  it("trims whitespace on the set label so 'S1' and 'S1 ' are the same set", () => {
    const input = [
      row(2, "S1", "passage A", "q1"),
      row(3, " S1 ", undefined, "q2"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rows[1].context).toBe("passage A");
    }
  });

  it("treats set labels case-sensitively (S1 and s1 are different sets)", () => {
    const input = [
      row(2, "S1", "passage A", "q1"),
      row(3, "s1", undefined, "q2"),
    ];
    const result = propagateSetContext(input);
    // s1 has no context → that's its own error path
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors[0].sourceRow).toBe(3);
      expect(result.errors[0].message).toMatch(/no Question Context/i);
    }
  });

  it("errors when a set has no Question Context on any of its rows", () => {
    const input = [
      row(2, "S1", undefined, "q1"),
      row(3, "S1", undefined, "q2"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].sourceRow).toBe(2);
      expect(result.errors[0].message).toMatch(/Set 'S1' has no Question Context/i);
    }
  });

  it("errors when two rows in the same set have different non-empty contexts (drift)", () => {
    const input = [
      row(2, "S1", "passage A", "q1"),
      row(3, "S1", "passage A modified", "q2"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors[0].sourceRow).toBe(3);
      expect(result.errors[0].message).toMatch(/different context/i);
      expect(result.errors[0].message).toContain("S1");
    }
  });

  it("does not flag drift when later rows leave context blank (the happy path)", () => {
    const input = [
      row(2, "S1", "passage A", "q1"),
      row(3, "S1", "", "q2"),
      row(4, "S1", "   ", "q3"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rows.map((r) => r.context)).toEqual([
        "passage A",
        "passage A",
        "passage A",
      ]);
    }
  });

  it("a set of one row is allowed (single-question 'set' with its own context)", () => {
    const input = [row(2, "S1", "passage A", "q1")];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rows[0].context).toBe("passage A");
    }
  });

  it("collects multiple errors across different sets in one pass", () => {
    const input = [
      row(2, "S1", undefined, "q1"),
      row(3, "S1", undefined, "q2"),
      row(4, "S2", "passage B", "q3"),
      row(5, "S2", "passage B different", "q4"),
    ];
    const result = propagateSetContext(input);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].sourceRow).toBe(2);
      expect(result.errors[1].sourceRow).toBe(5);
    }
  });
});
