import { describe, it, expect } from "vitest";
import {
  mergeAttemptStats,
  type AttemptStats,
} from "@/lib/sync/mergeAttemptStats";

describe("mergeAttemptStats", () => {
  it("returns the incoming stats when there's no existing aggregate", () => {
    const result = mergeAttemptStats(null, { count: 100, correctPct: 60 });
    expect(result).toEqual({ count: 100, correctPct: 60 });
  });

  it("returns the existing stats when incoming is null", () => {
    const existing: AttemptStats = { count: 50, correctPct: 80 };
    const result = mergeAttemptStats(existing, null);
    expect(result).toEqual(existing);
  });

  it("returns null when both are null", () => {
    expect(mergeAttemptStats(null, null)).toBeNull();
  });

  it("sums counts and computes weighted average correctPct", () => {
    // 100 attempts at 60% correct = 60 correct
    // 50 attempts at 80% correct = 40 correct
    // 100 correct out of 150 = 66.67%
    const result = mergeAttemptStats(
      { count: 100, correctPct: 60 },
      { count: 50, correctPct: 80 }
    );
    expect(result?.count).toBe(150);
    expect(result?.correctPct).toBeCloseTo(66.67, 1);
  });

  it("rounds correctPct to 2 decimals", () => {
    const result = mergeAttemptStats(
      { count: 3, correctPct: 33.33 },
      { count: 7, correctPct: 71.43 }
    );
    // 1 + 5 = 6 correct out of 10 = 60.00 (approx — floating point)
    expect(result?.count).toBe(10);
    // The result should have at most 2 decimal places
    const decimals = (result!.correctPct.toString().split(".")[1] ?? "")
      .length;
    expect(decimals).toBeLessThanOrEqual(2);
  });

  it("treats incoming with count=0 as a no-op (no division by zero)", () => {
    const existing: AttemptStats = { count: 100, correctPct: 60 };
    const result = mergeAttemptStats(existing, { count: 0, correctPct: 0 });
    expect(result).toEqual(existing);
  });

  it("treats existing with count=0 as if it didn't exist", () => {
    const result = mergeAttemptStats(
      { count: 0, correctPct: 0 },
      { count: 50, correctPct: 80 }
    );
    expect(result).toEqual({ count: 50, correctPct: 80 });
  });

  it("clamps correctPct to [0, 100] (defensive against bad source data)", () => {
    const result = mergeAttemptStats(null, { count: 1, correctPct: 250 });
    expect(result?.correctPct).toBe(100);
    const result2 = mergeAttemptStats(null, { count: 1, correctPct: -50 });
    expect(result2?.correctPct).toBe(0);
  });
});
