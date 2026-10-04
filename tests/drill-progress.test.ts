/**
 * What a drill answer DID to the question, and the "fixed" count (2026-10-04).
 *
 * The ladder itself is unchanged (user's call, 2026-10-04: two right answers in
 * a row, from any surface, fix a question). These pin how its outcome is told
 * to the student, and the count of fixed questions the pulse shows.
 */
import { describe, it, expect } from "vitest";
import { fixedCount, type DrillEvent } from "@/lib/drill/select";
import { answerProgress, drillVSays, fixedMessage, progressLine } from "@/lib/drill/progress";
import { crowdMessage } from "@/lib/celebrate/crowd";
import { milestoneMessage } from "@/lib/celebrate/milestones";

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
    expect(fixedMessage(1)).toBe("Fixed! That's your first one.");
    expect(fixedMessage(24)).toBe("Fixed! Right twice since you missed it. That's 24 you've fixed.");
  });

  it("V's line when a question rests", () => {
    expect(progressLine("rested")).toBe("Got it this time! I'll bring it back in 10 days to check it stuck.");
  });
});

describe("drillVSays — what V says inside the drill's answer panel", () => {
  const base = { correct: true, progress: "right" as const, fixedTotal: null, crowd: null, milestone: null };

  it("says nothing on a miss, or on a plain right answer to a new question", () => {
    expect(drillVSays({ ...base, correct: false, progress: "wrong" })).toBeNull();
    expect(drillVSays(base)).toBeNull();
  });

  it("talks when a question rests", () => {
    expect(drillVSays({ ...base, progress: "rested" })).toEqual({
      lines: [progressLine("rested")],
      face: "talk",
      fixed: false,
    });
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
    expect(drillVSays({ ...base, progress: "rested", milestone: 50 })).toEqual({
      lines: [progressLine("rested"), milestoneMessage(50)],
      face: "talk",
      fixed: false,
    });
  });
});
