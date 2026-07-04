import { describe, it, expect } from "vitest";
import { shouldScopeToPracticeOnlyCookieExam } from "@/lib/questions/browseDefaults";

describe("shouldScopeToPracticeOnlyCookieExam", () => {
  it("scopes bare /browse to a practice-only cookie exam (the gap this closes)", () => {
    expect(
      shouldScopeToPracticeOnlyCookieExam({
        urlHasExamId: false,
        urlHasKind: false,
        cookieExamIsPracticeOnly: true,
      })
    ).toBe(true);
  });

  it("does NOT scope when the URL already selects an exam (URL wins)", () => {
    expect(
      shouldScopeToPracticeOnlyCookieExam({
        urlHasExamId: true,
        urlHasKind: false,
        cookieExamIsPracticeOnly: true,
      })
    ).toBe(false);
  });

  it("does NOT override an explicit kind in the URL", () => {
    expect(
      shouldScopeToPracticeOnlyCookieExam({
        urlHasExamId: false,
        urlHasKind: true,
        cookieExamIsPracticeOnly: true,
      })
    ).toBe(false);
  });

  it("does NOT scope when the cookie exam is PYQ-first (global PYQ default preserved)", () => {
    expect(
      shouldScopeToPracticeOnlyCookieExam({
        urlHasExamId: false,
        urlHasKind: false,
        cookieExamIsPracticeOnly: false,
      })
    ).toBe(false);
  });
});
