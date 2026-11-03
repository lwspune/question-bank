import { describe, it, expect } from "vitest";
import { examKindPhrase,
  globalBankLine,
  countSummary,
  defaultViewCount,
  defaultViewLabel,
} from "@/lib/exam/questionCounts";

// UX_REVIEW_TRIAGE.md A1 (2026-10-02): the homepage showed NDA at 14,024 while
// /nda and /browse showed 5,130 — both true, different definitions (every kind
// vs previous year only). Every per-exam number now names its kind, so the
// previous year figure on any surface is the one /browse lands on.

describe("defaultViewCount — the number the exam's /browse view opens on", () => {
  it("is the previous year count for an exam with PYQs", () => {
    expect(defaultViewCount({ pyq: 5130, practice: 8894 }, false)).toBe(5130);
  });

  it("is the practice count for a practice-only exam (its /browse default is practice)", () => {
    expect(defaultViewCount({ pyq: 0, practice: 2852 }, true)).toBe(2852);
  });
});

describe("countSummary — a per-exam line that cannot be misread", () => {
  it("names both kinds when an exam has both, in /browse's own words", () => {
    expect(countSummary({ pyq: 5130, practice: 8894 })).toBe(
      "5,130 previous year · 8,894 practice questions"
    );
  });

  it("shows one kind alone when the other is zero", () => {
    expect(countSummary({ pyq: 3308, practice: 0 })).toBe("3,308 previous year questions");
    expect(countSummary({ pyq: 0, practice: 2852 })).toBe("2,852 practice questions");
  });

  it("returns null when there is nothing yet, so the caller can say so", () => {
    expect(countSummary({ pyq: 0, practice: 0 })).toBeNull();
  });

  it("uses Indian digit grouping", () => {
    expect(countSummary({ pyq: 146993, practice: 0 })).toBe("1,46,993 previous year questions");
  });
});

describe("examKindPhrase — what an exam HAS, said in full", () => {
  it("is the previous year count for an exam with PYQs", () => {
    expect(examKindPhrase({ pyq: 5130, practice: 8894 }, false)).toBe("5,130 previous year questions");
  });
  it("is the practice count for a practice-only exam with no PYQs", () => {
    expect(examKindPhrase({ pyq: 0, practice: 1416 }, true)).toBe("1,416 practice questions");
  });
  it("names both when a practice-only exam has PYQs too (CBSE Class 10 since 2026-10-15)", () => {
    expect(examKindPhrase({ pyq: 3415, practice: 1416 }, true)).toBe("3,415 previous year and 1,416 practice questions");
  });
});

describe("defaultViewLabel — what a 'filter the bank' button may claim", () => {
  it("claims previous year questions only when that is what the bank opens on", () => {
    expect(defaultViewLabel({ pyq: 10667, practice: 2000 }, false)).toBe("10,667 previous year questions");
  });

  it("claims practice questions for a practice-only exam", () => {
    expect(defaultViewLabel({ pyq: 0, practice: 1008 }, true)).toBe("1,008 practice questions");
  });
});

// The global site (intl.pyqvault.com, 2026-10-30) says "past papers", the term
// outside India, and names past papers only for an exam that has them: MCAT and
// most exams after IMAT will have practice questions alone.
describe("globalBankLine — the global site's question bank card", () => {
  it("names past papers and practice apart when the exam has both", () => {
    expect(globalBankLine({ pyq: 240, practice: 681 })).toBe(
      "240 past-paper and 681 practice questions, with solutions"
    );
  });
  it("never mentions past papers for an exam without them", () => {
    expect(globalBankLine({ pyq: 0, practice: 681 })).toBe("681 practice questions, with solutions");
  });
  it("drops the practice half when there is none", () => {
    expect(globalBankLine({ pyq: 240, practice: 0 })).toBe("240 past-paper questions, with solutions");
  });
  it("falls back to words when the counts are unavailable", () => {
    expect(globalBankLine(null)).toBe("Every question, with solutions");
    expect(globalBankLine({ pyq: 0, practice: 0 })).toBe("Every question, with solutions");
  });
});
