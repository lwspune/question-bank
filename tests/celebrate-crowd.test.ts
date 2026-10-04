/**
 * "Beat the crowd" (2026-10-04, the user's tiers): when a student gets right a
 * question most students got wrong. Nice! at 70%+, Smart! at 80%+, Genius! at
 * 90%+.
 *
 * The safety rules are the point. A question most students get wrong is where
 * wrong keys hide (all 45 questions at 80%+ wrong had a distractor as the
 * most-picked option), so the message fires only on a question a person has
 * CHECKED, and only on crowd data measured on the question as it stands now.
 */
import { describe, it, expect } from "vitest";
import {
  CROWD_MIN_ATTEMPTS,
  crowdMessage,
  crowdTier,
  isCrowdEligible,
  poolFreshStats,
  type CrowdStatRow,
} from "@/lib/celebrate/crowd";

const HASH = "h-now";
const row = (over: Partial<CrowdStatRow> = {}): CrowdStatRow => ({
  attempted: 30,
  correct: 3,
  measuredContentHash: HASH,
  verdictMismatch: 0,
  ...over,
});

describe("crowdTier", () => {
  it("maps the wrong share to the user's three tiers", () => {
    expect(crowdTier({ attempted: 100, correct: 30 })).toBe(70);
    expect(crowdTier({ attempted: 100, correct: 20 })).toBe(80);
    expect(crowdTier({ attempted: 100, correct: 10 })).toBe(90);
    expect(crowdTier({ attempted: 100, correct: 0 })).toBe(90);
  });

  it("is null below 70% wrong", () => {
    expect(crowdTier({ attempted: 100, correct: 31 })).toBeNull();
  });

  it(`needs at least ${CROWD_MIN_ATTEMPTS} attempts: a handful of students is not a crowd`, () => {
    expect(crowdTier({ attempted: CROWD_MIN_ATTEMPTS - 1, correct: 0 })).toBeNull();
    expect(crowdTier({ attempted: CROWD_MIN_ATTEMPTS, correct: 0 })).toBe(90);
  });
});

describe("crowdMessage — the user's wording", () => {
  it("says the tier word, the share and what the student did", () => {
    expect(crowdMessage(70)).toBe("Nice! 70%+ got this wrong. You got it right.");
    expect(crowdMessage(80)).toBe("Smart! 80%+ got this wrong. You got it right.");
    expect(crowdMessage(90)).toBe("Genius! 90%+ got this wrong. You got it right.");
  });
});

describe("poolFreshStats — only crowd data measured on the question as it stands", () => {
  it("pools rows measured on the current version", () => {
    expect(poolFreshStats([row(), row({ attempted: 10, correct: 1 })], HASH)).toEqual({ attempted: 40, correct: 4 });
  });

  it("drops rows measured on an older version: after a key fix their 'correct' means the old key", () => {
    expect(poolFreshStats([row({ measuredContentHash: "h-old" })], HASH)).toEqual({ attempted: 0, correct: 0 });
    expect(poolFreshStats([row({ measuredContentHash: null })], HASH)).toEqual({ attempted: 0, correct: 0 });
  });

  it("keeps a vault mock row, whose mismatch is null because it grades against our own key", () => {
    expect(poolFreshStats([row({ verdictMismatch: null })], HASH)).toEqual({ attempted: 30, correct: 3 });
  });

  it("drops rows where the source's own marking disagreed with our key (misaligned answer sheet)", () => {
    expect(poolFreshStats([row({ verdictMismatch: 2 })], HASH)).toEqual({ attempted: 0, correct: 0 });
  });
});

describe("isCrowdEligible — a person checked this question", () => {
  const base = { reviewVerdict: "confirmed", reviewedHash: HASH, currentHash: HASH, sourceFile: "NDA1_2017_Maths_PYQ.xlsx" };

  it("accepts a question checked and found right, or fixed", () => {
    for (const v of ["confirmed", "key_fixed", "stem_fixed", "solution_rewritten"]) {
      expect(isCrowdEligible({ ...base, reviewVerdict: v }), v).toBe(true);
    }
  });

  it("refuses a question never checked, or left unsettled", () => {
    expect(isCrowdEligible({ ...base, reviewVerdict: null })).toBe(false);
    expect(isCrowdEligible({ ...base, reviewVerdict: "unverifiable" })).toBe(false);
  });

  it("refuses when the question changed after it was checked", () => {
    expect(isCrowdEligible({ ...base, reviewedHash: "h-old" })).toBe(false);
  });

  it("refuses a classroom test whose crowd data is not credible", () => {
    expect(isCrowdEligible({ ...base, sourceFile: "Eng_Geo_Final_D_Test_19_Aug.docx" })).toBe(false);
  });
});
