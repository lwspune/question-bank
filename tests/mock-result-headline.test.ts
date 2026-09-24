/**
 * The mock result headline — what the student reads FIRST after a sitting.
 *
 * The rule this pins: the headline is about what they ATTEMPTED, never a share
 * of max marks. Median attempt on 2026-09-24 answered 27% of a 150-question
 * paper and ended at 11% of marks, while accuracy on attempted was 70%. A
 * headline of "11%" is a verdict on the clock read as a verdict on the student.
 */
import { describe, it, expect } from "vitest";
import { buildResultHeadline } from "@/lib/mocks/resultHeadline";

const summary = (correct: number, wrong: number, skipped: number, score = 0, maxScore = 300) => ({
  correct,
  wrong,
  skipped,
  score,
  maxScore,
});

describe("buildResultHeadline", () => {
  it("leads with accuracy on attempted, not share of max marks", () => {
    const h = buildResultHeadline(summary(21, 9, 120, 34, 300));
    expect(h.attempted).toBe(30);
    expect(h.accuracyPct).toBe(70);
    expect(h.unanswered).toBe(120);
    expect(h.primaryAction).toBe("fix");
  });

  it("rounds accuracy to a whole percent", () => {
    expect(buildResultHeadline(summary(2, 1, 0)).accuracyPct).toBe(67);
    expect(buildResultHeadline(summary(1, 2, 0)).accuracyPct).toBe(33);
  });

  it("has no accuracy and offers a retake when nothing was attempted", () => {
    const h = buildResultHeadline(summary(0, 0, 150));
    expect(h.attempted).toBe(0);
    expect(h.accuracyPct).toBeNull();
    expect(h.primaryAction).toBe("retake");
    expect(h.lead).toMatch(/didn.t attempt/i);
  });

  it("offers another mock, not a fix, when nothing was wrong", () => {
    const h = buildResultHeadline(summary(30, 0, 120));
    expect(h.accuracyPct).toBe(100);
    expect(h.primaryAction).toBe("another");
  });

  it("names the attempted count and the unanswered count in the lead", () => {
    const h = buildResultHeadline(summary(21, 9, 120));
    expect(h.lead).toContain("21");
    expect(h.lead).toContain("30");
    expect(h.detail).toContain("120");
  });

  it("omits the unanswered line when every question was answered", () => {
    const h = buildResultHeadline(summary(100, 50, 0));
    expect(h.detail).toBeNull();
  });

  it("never mentions a percentage of max marks anywhere in the copy", () => {
    const h = buildResultHeadline(summary(21, 9, 120, 34, 300));
    // 34/300 = 11%. The number 11 must not appear as a claim about the sitting.
    expect(`${h.lead} ${h.detail ?? ""}`).not.toMatch(/\b11%/);
  });
});
