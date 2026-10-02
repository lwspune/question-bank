import { describe, it, expect } from "vitest";
import {
  countSummary,
  defaultViewCount,
  defaultViewLabel,
} from "@/lib/exam/questionCounts";

// UX_REVIEW_TRIAGE.md A1 (2026-10-02): the homepage showed NDA at 14,024 while
// /nda and /browse showed 5,130 — both true, different definitions (every kind
// vs past-year only). Every per-exam number now names its kind, so the
// past-year figure on any surface is the one /browse lands on.

describe("defaultViewCount — the number the exam's /browse view opens on", () => {
  it("is the past-year count for an exam with PYQs", () => {
    expect(defaultViewCount({ pyq: 5130, practice: 8894 }, false)).toBe(5130);
  });

  it("is the practice count for a practice-only exam (its /browse default is practice)", () => {
    expect(defaultViewCount({ pyq: 0, practice: 2852 }, true)).toBe(2852);
  });
});

describe("countSummary — a per-exam line that cannot be misread", () => {
  it("names both kinds when an exam has both, in /browse's own words", () => {
    expect(countSummary({ pyq: 5130, practice: 8894 })).toBe(
      "5,130 past-year · 8,894 practice questions"
    );
  });

  it("shows one kind alone when the other is zero", () => {
    expect(countSummary({ pyq: 3308, practice: 0 })).toBe("3,308 past-year questions");
    expect(countSummary({ pyq: 0, practice: 2852 })).toBe("2,852 practice questions");
  });

  it("returns null when there is nothing yet, so the caller can say so", () => {
    expect(countSummary({ pyq: 0, practice: 0 })).toBeNull();
  });

  it("uses Indian digit grouping", () => {
    expect(countSummary({ pyq: 146993, practice: 0 })).toBe("1,46,993 past-year questions");
  });
});

describe("defaultViewLabel — what a 'filter the bank' button may claim", () => {
  it("claims past-year questions only when that is what the bank opens on", () => {
    expect(defaultViewLabel({ pyq: 10667, practice: 2000 }, false)).toBe("10,667 past-year questions");
  });

  it("claims practice questions for a practice-only exam", () => {
    expect(defaultViewLabel({ pyq: 0, practice: 1008 }, true)).toBe("1,008 practice questions");
  });
});
