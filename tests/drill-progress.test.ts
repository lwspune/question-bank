/**
 * What a drill answer DID to the question, and the "fixed" count.
 *
 * The rule is the user's (2026-10-05, was two right answers in a row): ONE
 * right answer after the last miss, from any surface, fixes a question, and a
 * later miss puts it back. These pin how that is told to the student, and the
 * count of fixed questions the pulse shows.
 */
import { describe, it, expect } from "vitest";
import { fixedCount, type DrillEvent } from "@/lib/drill/select";
import { answerProgress, drillVSays, fixedMessage, progressLine } from "@/lib/drill/progress";
import { crowdMessage } from "@/lib/celebrate/crowd";
import { milestoneMessage } from "@/lib/celebrate/milestones";

const NOW = new Date("2026-10-04T06:00:00.000Z");
const ev = (questionId: string, correct: boolean, at: string): DrillEvent => ({ questionId, correct, at });

describe("fixedCount", () => {
  it("counts questions answered right since their last miss", () => {
    const events = [
      // q1: missed, then right once → fixed
      ev("q1", false, "2026-09-01T00:00:00Z"),
      ev("q1", true, "2026-09-02T00:00:00Z"),
      // q2: missed, right twice → still one fixed question, not two
      ev("q2", false, "2026-09-01T00:00:00Z"),
      ev("q2", true, "2026-09-02T00:00:00Z"),
      ev("q2", true, "2026-09-15T00:00:00Z"),
      // q3: fixed, then missed again → back on the list, not fixed
      ev("q3", false, "2026-09-01T00:00:00Z"),
      ev("q3", true, "2026-09-02T00:00:00Z"),
      ev("q3", false, "2026-09-20T00:00:00Z"),
      // q4: missed only → due, not fixed
      ev("q4", false, "2026-09-01T00:00:00Z"),
    ];
    expect(fixedCount(events, NOW)).toBe(2);
  });

  it("is zero with no history", () => {
    expect(fixedCount([], NOW)).toBe(0);
  });

  it("does not depend on the order events arrive in", () => {
    const events = [
      ev("q1", true, "2026-09-15T00:00:00Z"),
      ev("q1", false, "2026-09-01T00:00:00Z"),
    ];
    expect(fixedCount(events, NOW)).toBe(1);
  });
});

describe("answerProgress", () => {
  it("a wrong answer is wrong, whatever came before", () => {
    expect(answerProgress({ correct: false, stateAfter: "due" })).toBe("wrong");
  });

  it("a right answer that leaves the question fixed is FIXED", () => {
    expect(answerProgress({ correct: true, stateAfter: "retired" })).toBe("fixed");
  });

  it("a right answer to a question never missed (the daily-set fill) is just right", () => {
    expect(answerProgress({ correct: true, stateAfter: "never-missed" })).toBe("right");
  });

  it("a right answer whose record was lost reads as right, never as fixed", () => {
    // The write is best-effort; if it was lost the read still sees the miss.
    expect(answerProgress({ correct: true, stateAfter: "due" })).toBe("right");
  });
});

describe("the words", () => {
  it("never claims a question is fixed 'for good' — a later miss brings it back", () => {
    for (const p of ["fixed", "right", "wrong"] as const) {
      expect(progressLine(p).toLowerCase()).not.toContain("for good");
    }
    expect(fixedMessage(24).toLowerCase()).not.toContain("for good");
  });

  it("says the question is off the list, and that a miss brings it back", () => {
    expect(progressLine("fixed")).toBe("Fixed: it's off your list. Miss it again and it comes back.");
  });

  it("never mentions a second answer or a waiting period", () => {
    for (const p of ["fixed", "right", "wrong"] as const) {
      expect(progressLine(p)).not.toMatch(/twice|days/);
    }
    expect(fixedMessage(24)).not.toMatch(/twice|days/);
  });

  it("names the running total on a fix, singular and plural", () => {
    expect(fixedMessage(1)).toBe("Fixed! That's your first one.");
    expect(fixedMessage(24)).toBe("Fixed! That's 24 you've fixed.");
  });
});

describe("drillVSays — what V says inside the drill's answer panel", () => {
  const base = { correct: true, progress: "right" as const, fixedTotal: null, crowd: null, milestone: null };

  it("says nothing on a miss, or on a plain right answer to a new question", () => {
    expect(drillVSays({ ...base, correct: false, progress: "wrong" })).toBeNull();
    expect(drillVSays(base)).toBeNull();
  });

  it("laughs on a fix, and puts the fix first, then the crowd, then a milestone", () => {
    expect(drillVSays({ ...base, progress: "fixed", fixedTotal: 24, crowd: 90, milestone: 100 })).toEqual({
      lines: [fixedMessage(24), crowdMessage(90), milestoneMessage(100)],
      face: "laugh",
      fixed: true,
    });
  });

  it("laughs when a right answer beats the crowd, even on a new question", () => {
    expect(drillVSays({ ...base, crowd: 70 })).toEqual({ lines: [crowdMessage(70)], face: "laugh", fixed: false });
  });

  it("talks when only a milestone came with the answer", () => {
    expect(drillVSays({ ...base, milestone: 50 })).toEqual({
      lines: [milestoneMessage(50)],
      face: "talk",
      fixed: false,
    });
  });
});
