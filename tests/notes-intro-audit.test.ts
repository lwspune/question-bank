/**
 * Spec for the /notes intro audit core — the rules shared by the prod-contract
 * gate (tests/notes-intro-counts.test.ts) and the triage probe
 * (scripts/notes-intro-audit.ts), so the two cannot answer differently.
 */
import { describe, it, expect } from "vitest";
import {
  extractCountClaims,
  allowedCounts,
  enumeratedItems,
  longestSentenceWords,
} from "@/lib/notes/introAudit";

describe("extractCountClaims", () => {
  it("reads the plain and hyphenated forms", () => {
    expect(extractCountClaims("159 PYQs across 2021–2025")).toEqual([159]);
    expect(extractCountClaims("a steady 63-PYQ chapter")).toEqual([63]);
    expect(extractCountClaims("165 past-year questions")).toEqual([165]);
    expect(extractCountClaims("46 questions and 12 PYQs")).toEqual([46, 12]);
  });

  it("ignores numbers that are not count claims", () => {
    // Years, percentages and bare numbers are other kinds of statement; only a
    // number ATTACHED to PYQs/questions is a claim about bank size.
    expect(extractCountClaims("2021–2025, about 60% are HARD")).toEqual([]);
    expect(extractCountClaims("the f'(x)/f(x) → log pattern")).toEqual([]);
  });

  it("requires two digits, so 'one to two questions on every shift' is not a claim", () => {
    expect(extractCountClaims("roughly one to two questions on every shift")).toEqual([]);
    expect(extractCountClaims("5 questions")).toEqual([]);
  });
});

describe("allowedCounts", () => {
  const subs = [51, 35, 27, 26, 12, 8];

  it("accepts the chapter total and any single subtopic count", () => {
    const ok = allowedCounts(159, subs);
    expect(ok.has(159)).toBe(true);
    expect(ok.has(51)).toBe(true);
    expect(ok.has(8)).toBe(true);
  });

  it("accepts a two-subtopic sum", () => {
    // Mathematical Logic's "drill Negation and Finding Truth Values first — 30
    // questions" is 14 + 16. Forcing it to a single count would replace a
    // correct number with a wrong one.
    expect(allowedCounts(88, [17, 16, 16, 14, 13, 12]).has(30)).toBe(true);
    // The two trig blocks of Indefinite Integration: 12 + 35.
    expect(allowedCounts(159, subs).has(47)).toBe(true);
  });

  it("rejects a number that matches nothing", () => {
    const ok = allowedCounts(159, subs);
    expect(ok.has(121)).toBe(false); // the stale chapter total
    expect(ok.has(44)).toBe(false); // the stale substitution count
    expect(ok.has(66)).toBe(false); // the stale "~66 trig integrals"
  });

  it("does not invent a sum from a single subtopic doubled", () => {
    // One subtopic cannot pair with itself — 8 + 8 is not a claim anyone makes,
    // and allowing it would widen the gate for nothing.
    expect(allowedCounts(20, [8, 12]).has(16)).toBe(false);
    expect(allowedCounts(20, [8, 12]).has(20)).toBe(true); // total, and 8 + 12
  });
});

describe("enumeratedItems", () => {
  it("counts a (1)…(n) run in prose", () => {
    const intro =
      "The chapter teaches in three movements: (1) Foundations — the +C; " +
      "(2) Substitution — the workhorse; (3) Parts — LIATE.";
    expect(enumeratedItems(intro)).toBe(3);
  });

  it("is zero when there is no enumeration", () => {
    expect(enumeratedItems("Work the six subtopics below in order.")).toBe(0);
  });

  it("does not count a lone parenthesised number, or an out-of-order one", () => {
    // "(1/a) rule" and "(A) 3" are not list markers; the run must start at (1)
    // and ascend, which is what an enumerated subtopic list does.
    expect(enumeratedItems("the linear-argument (1/a) rule")).toBe(0);
    expect(enumeratedItems("see (2) above, then (1) again")).toBe(0);
  });
});

describe("longestSentenceWords", () => {
  it("measures the longest sentence, not the whole text", () => {
    expect(longestSentenceWords("One two three. Four five.")).toBe(3);
  });

  it("does not split on a decimal point", () => {
    expect(longestSentenceWords("The value 2.5 metres is fixed.")).toBe(6);
  });
});
