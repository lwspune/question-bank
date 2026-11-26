/**
 * /dashboard/rooms/<exam> (owner, 2026-11-26): how a room answered its daily
 * question, for staff only (students never see a count). Pure: lib/rooms/adminRoom.
 */
import { describe, it, expect } from "vitest";
import { tallyDailyAnswers } from "@/lib/rooms/adminRoom";

const options = [
  { id: "o-a", label: "A", is_correct: false },
  { id: "o-b", label: "B", is_correct: true },
  { id: "o-c", label: "C", is_correct: false },
  { id: "o-d", label: "D", is_correct: false },
];

describe("tallyDailyAnswers", () => {
  it("counts answers, right answers and each option in label order", () => {
    // Counted per option in the database (count: exact), so no 1,000-row cap applies.
    const t = tallyDailyAnswers(options, new Map([["o-b", 2], ["o-a", 1]]));
    expect(t.answered).toBe(3);
    expect(t.right).toBe(2);
    expect(t.byOption).toEqual([
      { label: "A", count: 1, correct: false },
      { label: "B", count: 2, correct: true },
      { label: "C", count: 0, correct: false },
      { label: "D", count: 0, correct: false },
    ]);
  });

  it("is all zeros before anyone answers", () => {
    const t = tallyDailyAnswers(options, new Map());
    expect(t).toMatchObject({ answered: 0, right: 0 });
    expect(t.byOption.every((o) => o.count === 0)).toBe(true);
  });

  it("sorts options by label whatever order they arrive in", () => {
    const t = tallyDailyAnswers([...options].reverse(), new Map());
    expect(t.byOption.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
  });
});
