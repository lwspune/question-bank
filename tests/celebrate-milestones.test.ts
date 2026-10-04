/**
 * "N questions answered" milestones (2026-10-04).
 *
 * ANSWERED, never "opened": a pick before the answer is shown (or a graded mock
 * or drill answer). Celebrating opens would reward tapping Show answer, the
 * exact behaviour the 2026-10-16 wrong-rate check is watching for.
 *
 * The award is the SERVER's, once per milestone, through a dedupe key; these
 * tests pin the pure rules it rests on.
 */
import { describe, it, expect } from "vitest";
import {
  highestMilestone,
  isAnswerMilestone,
  milestoneDedupeKey,
  milestoneEvent,
  milestoneMessage,
} from "@/lib/celebrate/milestones";

const USER = "11111111-1111-4111-8111-111111111111";

describe("isAnswerMilestone — 10, 20, 50, then every 50", () => {
  it("matches the agreed ladder", () => {
    const hits = Array.from({ length: 400 }, (_, i) => i + 1).filter(isAnswerMilestone);
    expect(hits).toEqual([10, 20, 50, 100, 150, 200, 250, 300, 350, 400]);
  });
});

describe("highestMilestone", () => {
  it("is null below the first milestone", () => {
    expect(highestMilestone(0)).toBeNull();
    expect(highestMilestone(9)).toBeNull();
  });

  it("returns the highest milestone at or below the total", () => {
    expect(highestMilestone(10)).toBe(10);
    expect(highestMilestone(19)).toBe(10);
    expect(highestMilestone(20)).toBe(20);
    expect(highestMilestone(49)).toBe(20);
    expect(highestMilestone(50)).toBe(50);
    expect(highestMilestone(149)).toBe(100);
    expect(highestMilestone(1234)).toBe(1200);
  });

  it("a mock that jumps the total past several milestones yields only the highest", () => {
    // 40 answered before, a 150-question paper answered whole: one message, not four.
    expect(highestMilestone(40 + 150)).toBe(150);
  });

  it("ignores junk totals rather than awarding anything", () => {
    expect(highestMilestone(-5)).toBeNull();
    expect(highestMilestone(Number.NaN)).toBeNull();
  });
});

describe("the award row", () => {
  it("keys each milestone once per student, so a repeat award is a no-op in the database", () => {
    expect(milestoneDedupeKey(USER, 100)).toBe(`milestone:answered:${USER}:100`);
    expect(milestoneDedupeKey(USER, 100)).not.toBe(milestoneDedupeKey(USER, 150));
  });

  it("is a milestone_reached event carrying the milestone and its key", () => {
    expect(milestoneEvent(USER, 50)).toEqual({
      kind: "milestone_reached",
      metadata: { answered: 50 },
      dedupeKey: `milestone:answered:${USER}:50`,
    });
  });
});

describe("milestoneMessage", () => {
  it("says what was done, in plain words", () => {
    expect(milestoneMessage(10)).toBe("10 questions answered. Good start!");
    expect(milestoneMessage(100)).toBe("That's 100 questions answered. Every one counts.");
    expect(milestoneMessage(1500)).toBe("That's 1,500 questions answered. Every one counts.");
  });

  it("says the paper did it when a mock crossed the line", () => {
    expect(milestoneMessage(150, "mock")).toBe("That paper took you past 150 questions answered. Every one counts.");
  });
});
