import { describe, it, expect } from "vitest";
import {
  STAGES,
  isStage,
  sanitizeTargetExams,
  needsOnboarding,
  primaryExam,
  validateOnboardingSubmission,
} from "@/lib/profile/onboarding";

describe("isStage / STAGES", () => {
  it("accepts the known stages and rejects everything else", () => {
    for (const s of STAGES) expect(isStage(s)).toBe(true);
    expect(isStage("class-11")).toBe(true);
    expect(isStage("dropper")).toBe(true);
    expect(isStage("phd")).toBe(false);
    expect(isStage("")).toBe(false);
    expect(isStage(null)).toBe(false);
    expect(isStage(undefined)).toBe(false);
    expect(isStage(12 as unknown)).toBe(false);
  });
});

describe("sanitizeTargetExams", () => {
  it("keeps only valid registry slugs, in order", () => {
    expect(sanitizeTargetExams(["nda", "neet"])).toEqual(["nda", "neet"]);
  });

  it("drops unknown slugs and non-strings", () => {
    expect(sanitizeTargetExams(["nda", "hogwarts", 7 as unknown as string, "jee-mains"])).toEqual([
      "nda",
      "jee-mains",
    ]);
  });

  it("dedupes while preserving first-seen order", () => {
    expect(sanitizeTargetExams(["neet", "nda", "neet"])).toEqual(["neet", "nda"]);
  });

  it("caps the list length (no unbounded arrays)", () => {
    const many = ["nda", "neet", "jee-mains", "cds", "mht-cet", "foundation-course", "cbse-12", "mh-hsc-12"];
    expect(sanitizeTargetExams(many).length).toBeLessThanOrEqual(6);
  });

  it("returns [] for empty / non-array input (a skip)", () => {
    expect(sanitizeTargetExams([])).toEqual([]);
    expect(sanitizeTargetExams(null)).toEqual([]);
    expect(sanitizeTargetExams(undefined)).toEqual([]);
    expect(sanitizeTargetExams("nda" as unknown as string[])).toEqual([]);
  });
});

describe("needsOnboarding", () => {
  it("is true when there is no profile row yet", () => {
    expect(needsOnboarding(null)).toBe(true);
    expect(needsOnboarding(undefined)).toBe(true);
  });

  it("is true when the row exists but was never onboarded", () => {
    expect(needsOnboarding({ onboardedAt: null })).toBe(true);
  });

  it("is false once onboarding is stamped (asked once — completed OR skipped)", () => {
    expect(needsOnboarding({ onboardedAt: "2026-07-12T00:00:00.000Z" })).toBe(false);
  });
});

describe("primaryExam", () => {
  it("is the first target exam (drives the qb_exam cookie)", () => {
    expect(primaryExam(["neet", "nda"])).toBe("neet");
  });

  it("is null when nothing was picked (a skip)", () => {
    expect(primaryExam([])).toBeNull();
  });
});

describe("validateOnboardingSubmission", () => {
  it("cleans a full submission", () => {
    const r = validateOnboardingSubmission({ targetExams: ["nda", "nda", "bogus"], stage: "class-12" });
    expect(r).toEqual({ targetExams: ["nda"], stage: "class-12" });
  });

  it("tolerates an empty submission (a skip) — nulls the stage", () => {
    expect(validateOnboardingSubmission({ targetExams: [], stage: null })).toEqual({
      targetExams: [],
      stage: null,
    });
  });

  it("nulls an unknown stage rather than rejecting", () => {
    expect(validateOnboardingSubmission({ targetExams: ["nda"], stage: "postgrad" })).toEqual({
      targetExams: ["nda"],
      stage: null,
    });
  });
});

import { tierOfStage, needsStageNudge } from "@/lib/profile/onboarding";

describe("tierOfStage", () => {
  it("maps the five stages onto the three tiers", () => {
    expect(tierOfStage("class-9-10")).toBe("school");
    expect(tierOfStage("class-11")).toBe("senior");
    expect(tierOfStage("class-12")).toBe("senior");
    expect(tierOfStage("dropper")).toBe("senior");
    expect(tierOfStage("college")).toBe("graduate");
  });

  it("is null when no stage is known", () => {
    expect(tierOfStage(null)).toBeNull();
    expect(tierOfStage(undefined)).toBeNull();
  });
});

describe("needsStageNudge", () => {
  // Noon IST, so the date is unambiguous in both UTC and IST.
  const at = (ymd: string) => new Date(`${ymd}T12:00:00+05:30`);

  it("nudges a school stage from 1 April to 30 June inclusive", () => {
    expect(needsStageNudge({ stage: "class-11", now: at("2027-03-31") })).toBe(false);
    expect(needsStageNudge({ stage: "class-11", now: at("2027-04-01") })).toBe(true);
    expect(needsStageNudge({ stage: "class-9-10", now: at("2027-05-15") })).toBe(true);
    expect(needsStageNudge({ stage: "class-12", now: at("2027-06-30") })).toBe(true);
    expect(needsStageNudge({ stage: "class-12", now: at("2027-07-01") })).toBe(false);
  });

  it("reads the date in IST, not UTC", () => {
    // 1 April 00:30 IST is still 31 March in UTC.
    expect(
      needsStageNudge({ stage: "class-11", now: new Date("2027-04-01T00:30:00+05:30") })
    ).toBe(true);
    // 1 July 00:30 IST is still 30 June in UTC.
    expect(
      needsStageNudge({ stage: "class-11", now: new Date("2027-07-01T00:30:00+05:30") })
    ).toBe(false);
  });

  it("never nudges a dropper, a college student or an unknown stage", () => {
    const now = at("2027-05-15");
    expect(needsStageNudge({ stage: "dropper", now })).toBe(false);
    expect(needsStageNudge({ stage: "college", now })).toBe(false);
    expect(needsStageNudge({ stage: null, now })).toBe(false);
  });
});
