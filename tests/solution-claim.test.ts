import { describe, expect, it } from "vitest";
import { answersPhrase, classifySolutionShare, solutionCoverageOf } from "@/lib/exam/solutionClaim";
import { getExamBySlug } from "@/lib/exam/examContext";

describe("answersPhrase", () => {
  it("promises worked solutions only where the questions carry them", () => {
    expect(answersPhrase("all")).toBe("with answers and worked solutions");
    expect(answersPhrase("some")).toBe("with answers, and worked solutions for some");
    expect(answersPhrase("none")).toBe("with answers");
  });
});

describe("classifySolutionShare", () => {
  it("cuts at 90% and 25% of questions solved", () => {
    expect(classifySolutionShare(1)).toBe("all");
    expect(classifySolutionShare(0.9)).toBe("all");
    expect(classifySolutionShare(0.899)).toBe("some");
    expect(classifySolutionShare(0.25)).toBe("some");
    expect(classifySolutionShare(0.249)).toBe("none");
    expect(classifySolutionShare(0)).toBe("none");
  });
});

describe("solutionCoverageOf", () => {
  it("reads the registry, absent meaning all (measured 2026-10-23)", () => {
    expect(solutionCoverageOf(getExamBySlug("jee-mains"))).toBe("all");
    expect(solutionCoverageOf(getExamBySlug("imat"))).toBe("all");
    expect(solutionCoverageOf(getExamBySlug("neet"))).toBe("some");
    expect(solutionCoverageOf(getExamBySlug("ipmat-indore"))).toBe("none");
    expect(solutionCoverageOf(getExamBySlug("foundation-course"))).toBe("none");
    expect(solutionCoverageOf(undefined)).toBe("all");
  });
});
