import { describe, it, expect } from "vitest";
import {
  needsNps,
  npsBucket,
  computeNps,
  validateNps,
  validateFeatureRequest,
} from "@/lib/feedback/nps";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 6, 12); // fixed reference (ms)

describe("needsNps — engagement-gated + cooldown", () => {
  it("is false below the engagement threshold (< 2 completed mocks)", () => {
    expect(needsNps({ completedMocks: 0, lastNpsAt: null, now: NOW })).toBe(false);
    expect(needsNps({ completedMocks: 1, lastNpsAt: null, now: NOW })).toBe(false);
  });

  it("is true once engaged and never asked", () => {
    expect(needsNps({ completedMocks: 2, lastNpsAt: null, now: NOW })).toBe(true);
  });

  it("is false within the 90-day cooldown, true after it", () => {
    const recent = new Date(NOW - 10 * DAY).toISOString();
    const old = new Date(NOW - 100 * DAY).toISOString();
    expect(needsNps({ completedMocks: 5, lastNpsAt: recent, now: NOW })).toBe(false);
    expect(needsNps({ completedMocks: 5, lastNpsAt: old, now: NOW })).toBe(true);
  });
});

describe("npsBucket", () => {
  it("splits detractor / passive / promoter", () => {
    expect(npsBucket(0)).toBe("detractor");
    expect(npsBucket(6)).toBe("detractor");
    expect(npsBucket(7)).toBe("passive");
    expect(npsBucket(8)).toBe("passive");
    expect(npsBucket(9)).toBe("promoter");
    expect(npsBucket(10)).toBe("promoter");
  });
});

describe("computeNps", () => {
  it("is %promoters − %detractors, rounded", () => {
    // 2 promoters, 1 passive, 1 detractor of 4 → 50 − 25 = 25
    const r = computeNps([{ score: 10 }, { score: 9 }, { score: 7 }, { score: 3 }]);
    expect(r).toEqual({ count: 4, promoters: 2, passives: 1, detractors: 1, score: 25 });
  });

  it("is 0/empty for no responses", () => {
    expect(computeNps([])).toEqual({ count: 0, promoters: 0, passives: 0, detractors: 0, score: 0 });
  });
});

describe("validateNps", () => {
  it("accepts an integer 0–10 with optional trimmed comment", () => {
    expect(validateNps({ score: 9, message: "  great  " })).toEqual({
      ok: true,
      score: 9,
      message: "great",
    });
    expect(validateNps({ score: 0 })).toEqual({ ok: true, score: 0, message: null });
  });

  it("rejects out-of-range or non-integer scores", () => {
    expect(validateNps({ score: 11 }).ok).toBe(false);
    expect(validateNps({ score: -1 }).ok).toBe(false);
    expect(validateNps({ score: 5.5 }).ok).toBe(false);
    expect(validateNps({ score: "9" as unknown as number }).ok).toBe(false);
  });
});

describe("validateFeatureRequest", () => {
  it("requires a non-empty message, trimmed + capped", () => {
    expect(validateFeatureRequest({ message: "  add CUET  " })).toEqual({
      ok: true,
      message: "add CUET",
    });
    expect(validateFeatureRequest({ message: "   " }).ok).toBe(false);
    expect(validateFeatureRequest({ message: "" }).ok).toBe(false);
    const long = validateFeatureRequest({ message: "x".repeat(2000) });
    expect(long.ok).toBe(true);
    if (long.ok) expect(long.message.length).toBeLessThanOrEqual(1000);
  });
});
