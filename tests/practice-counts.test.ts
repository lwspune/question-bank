/**
 * Reading get_own_practice_counts (migration 0165) back into V's shape.
 * Pure: the rows are faked. The function itself is tested against the test
 * project in tests/own-practice-counts.integration.test.ts.
 */
import { describe, it, expect } from "vitest";
import { parsePracticeCounts } from "@/lib/activity/practiceCounts";

describe("parsePracticeCounts", () => {
  it("maps each span's row, turning bigint strings into numbers", () => {
    const c = parsePracticeCounts([
      { span: "today", answered: "38", right_answers: "30", revealed: "2" },
      { span: "week", answered: 400, right_answers: 310, revealed: 5 },
      { span: "all", answered: "400", right_answers: "310", revealed: "5" },
    ]);
    expect(c).toEqual({
      today: { answered: 38, right: 30, revealed: 2 },
      week: { answered: 400, right: 310, revealed: 5 },
      all: { answered: 400, right: 310, revealed: 5 },
    });
  });

  it("reads a missing span, or no rows at all, as zero", () => {
    const zero = { answered: 0, right: 0, revealed: 0 };
    expect(parsePracticeCounts([{ span: "all", answered: 3, right_answers: 1, revealed: 0 }])).toEqual({
      today: zero,
      week: zero,
      all: { answered: 3, right: 1, revealed: 0 },
    });
    expect(parsePracticeCounts(null)).toEqual({ today: zero, week: zero, all: zero });
  });
});
