/**
 * The study-circle button test (owner, 2026-11-09; migration 0247): a card on
 * Home asks whether a student would use a circle of friends they already
 * know. Nothing was built; it measured demand, and was retired 2026-11-15
 * (tests/study-circle-retired.test.ts). The readout's pure rules stay.
 */
import { describe, it, expect } from "vitest";
import {
  STUDY_CIRCLE_MIN_YES,
  STUDY_CIRCLE_YES_RATE,
  studyCircleVerdict,
  summariseStudyCircle,
} from "@/lib/studyCircle/core";

describe("summariseStudyCircle", () => {
  const rows = [
    { answer: "yes", stage: "class-9-10" },
    { answer: "no", stage: "class-9-10" },
    { answer: null, stage: "class-9-10" },
    { answer: "yes", stage: "class-12" },
    { answer: null, stage: null },
  ] as const;

  it("counts seen, Yes and No, overall and for Class 9-10", () => {
    expect(summariseStudyCircle([...rows])).toEqual({
      seen: 5,
      yes: 2,
      no: 1,
      yesRate: 0.4,
      school: { seen: 3, yes: 1, no: 1, yesRate: 1 / 3 },
    });
  });

  it("gives a zero rate, not NaN, when nobody has seen it", () => {
    expect(summariseStudyCircle([])).toEqual({
      seen: 0,
      yes: 0,
      no: 0,
      yesRate: 0,
      school: { seen: 0, yes: 0, no: 0, yesRate: 0 },
    });
  });
});

describe("studyCircleVerdict", () => {
  const summary = (seen: number, yes: number) => ({
    seen,
    yes,
    no: 0,
    yesRate: seen ? yes / seen : 0,
    school: { seen: 0, yes: 0, no: 0, yesRate: 0 },
  });

  it("says build only when both the rate and the count clear the bar", () => {
    expect(STUDY_CIRCLE_YES_RATE).toBe(0.1);
    expect(STUDY_CIRCLE_MIN_YES).toBe(40);
    expect(studyCircleVerdict(summary(400, 40))).toBe("build");
  });
  it("says drop on a high rate from too few students", () => {
    expect(studyCircleVerdict(summary(100, 39))).toBe("drop");
  });
  it("says drop on many Yes but a low rate", () => {
    expect(studyCircleVerdict(summary(1000, 99))).toBe("drop");
  });
});
