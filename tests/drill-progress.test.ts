/**
 * What a drill answer DID to the question, and the "fixed" count (2026-10-04).
 *
 * The ladder itself is unchanged (user's call, 2026-10-04: two right answers in
 * a row, from any surface, fix a question). These pin how its outcome is told
 * to the student, and the count of fixed questions the pulse shows.
 */
import { describe, it, expect } from "vitest";
import { fixedCount, type DrillEvent } from "@/lib/drill/select";
import { answerProgress, fixedMessage, progressLine } from "@/lib/drill/progress";

const NOW = new Date("2026-10-04T06:00:00.000Z");
const ev = (questionId: string, correct: boolean, at: string): DrillEvent => ({ questionId, correct, at });

describe("fixedCount", () => {
  it("counts questions whose latest run is two right answers since a miss", () => {
    const events = [
      // q1: missed, then right twice → fixed
      ev("q1", false, "2026-09-01T00:00:00Z"),
      ev("q1", true, "2026-09-02T00:00:00Z"),
      ev("q1", true, "2026-09-15T00:00:00Z"),
      // q2: missed, right once → resting, not fixed
      ev("q2", false, "2026-09-01T00:00:00Z"),
      ev("q2", true, "2026-09-02T00:00:00Z"),
      // q3: fixed, then missed again → back on the list, not fixed
      ev("q3", false, "2026-09-01T00:00:00Z"),
      ev("q3", true, "2026-09-02T00:00:00Z"),
      ev("q3", true, "2026-09-03T00:00:00Z"),
      ev("q3", false, "2026-09-20T00:00:00Z"),
    ];
    expect(fixedCount(events, NOW)).toBe(1);
  });

  it("is zero with no history", () => {
    expect(fixedCount([], NOW)).toBe(0);
  });

  it("does not depend on the order events arrive in", () => {
    const events = [
      ev("q1", true, "2026-09-15T00:00:00Z"),
      ev("q1", false, "2026-09-01T00:00:00Z"),
      ev("q1", true, "2026-09-02T00:00:00Z"),
    ];
    expect(fixedCount(events, NOW)).toBe(1);
  });
});

describe("answerProgress", () => {
  it("a wrong answer is wrong, whatever came before", () => {
    expect(answerProgress({ correct: false, missedBefore: true, stateAfter: "due" })).toBe("wrong");
  });

  it("a right answer that completes the second right since the miss is FIXED", () => {
    expect(answerProgress({ correct: true, missedBefore: true, stateAfter: "retired" })).toBe("fixed");
  });

  it("a first right answer after a miss RESTS the question", () => {
    expect(answerProgress({ correct: true, missedBefore: true, stateAfter: "cooling" })).toBe("rested");
  });

  it("a right answer to a question never missed (the daily-set fill) is just right", () => {
    expect(answerProgress({ correct: true, missedBefore: false, stateAfter: "never-missed" })).toBe("right");
  });
});

describe("the words", () => {
  it("never claims a question is fixed 'for good' — a later miss brings it back", () => {
    for (const p of ["fixed", "rested", "right", "wrong"] as const) {
      expect(progressLine(p).toLowerCase()).not.toContain("for good");
    }
    expect(fixedMessage(24).toLowerCase()).not.toContain("for good");
  });

  it("says what the next step is for a rested question", () => {
    expect(progressLine("rested")).toMatch(/10 days/);
  });

  it("names the running total on a fix, singular and plural", () => {
    expect(fixedMessage(1)).toBe("Fixed: right twice since you missed it. That's your first fix.");
    expect(fixedMessage(24)).toBe("Fixed: right twice since you missed it. 24 questions fixed so far.");
  });
});
