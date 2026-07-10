import { describe, it, expect } from "vitest";
import { summarizeAttempts, type AttemptStat } from "@/lib/mocks/perf";

const g = (userId: string, score: number | null): AttemptStat => ({ userId, score });

describe("summarizeAttempts", () => {
  it("returns zeros for no attempts", () => {
    expect(summarizeAttempts([])).toEqual({ count: 0, students: 0, avgScore: 0, topScore: 0 });
  });

  it("counts graded attempts, distinct students, avg + top", () => {
    const s = summarizeAttempts([
      g("u1", 100),
      g("u1", 200), // same student, a retake
      g("u2", 300),
    ]);
    expect(s.count).toBe(3);
    expect(s.students).toBe(2);
    expect(s.topScore).toBe(300);
    expect(s.avgScore).toBe(200); // (100+200+300)/3
  });

  it("excludes ungraded (in-progress, null-score) attempts", () => {
    const s = summarizeAttempts([g("u1", 150), g("u2", null), g("u3", null)]);
    expect(s.count).toBe(1);
    expect(s.students).toBe(1);
    expect(s.avgScore).toBe(150);
    expect(s.topScore).toBe(150);
  });

  it("rounds the average to 2dp", () => {
    const s = summarizeAttempts([g("u1", 100), g("u2", 100), g("u3", 101)]);
    expect(s.avgScore).toBeCloseTo(100.33, 2);
  });

  it("handles negative scores (heavy negative marking)", () => {
    const s = summarizeAttempts([g("u1", -10), g("u2", 20)]);
    expect(s.avgScore).toBe(5);
    expect(s.topScore).toBe(20);
  });
});
