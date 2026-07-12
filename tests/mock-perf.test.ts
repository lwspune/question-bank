import { describe, it, expect } from "vitest";
import { summarizeAttempts, summarizeUserMocks, type AttemptStat } from "@/lib/mocks/perf";
import type { UserAttempt } from "@/lib/mocks/query";

const g = (userId: string, score: number | null): AttemptStat => ({ userId, score });

let seq = 0;
function attempt(over: Partial<UserAttempt> = {}): UserAttempt {
  seq += 1;
  return {
    attemptId: `a${seq}`,
    mockSlug: `mock-${seq}`,
    mockTitle: `Mock ${seq}`,
    pyqYear: 2020,
    status: "submitted",
    score: 150,
    maxScore: 300,
    correct: 40,
    wrong: 10,
    skipped: 70,
    startedAt: "2026-07-10T10:00:00Z",
    submittedAt: "2026-07-10T12:00:00Z",
    ...over,
  };
}

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

describe("summarizeUserMocks", () => {
  it("returns an empty summary for no attempts", () => {
    expect(summarizeUserMocks([])).toEqual({
      completed: 0,
      inProgress: 0,
      distinctMocks: 0,
      bestPct: null,
      avgPct: null,
      resumeAttempt: null,
    });
  });

  it("rolls up graded attempts into best/avg percent + distinct mocks", () => {
    const s = summarizeUserMocks([
      attempt({ mockSlug: "m1", score: 150, maxScore: 300 }), // 50%
      attempt({ mockSlug: "m1", score: 240, maxScore: 300 }), // 80% (retake, same mock)
      attempt({ mockSlug: "m2", score: 210, maxScore: 300 }), // 70%
    ]);
    expect(s.completed).toBe(3);
    expect(s.distinctMocks).toBe(2);
    expect(s.bestPct).toBe(80);
    expect(s.avgPct).toBe(67); // round((50+80+70)/3)
    expect(s.inProgress).toBe(0);
    expect(s.resumeAttempt).toBeNull();
  });

  it("excludes in-progress (null-score) attempts from best/avg but counts them", () => {
    const live = attempt({
      attemptId: "live1",
      mockSlug: "m3",
      status: "in_progress",
      score: null,
      maxScore: null,
      correct: null,
      wrong: null,
      skipped: null,
    });
    const s = summarizeUserMocks([
      live,
      attempt({ mockSlug: "m1", score: 180, maxScore: 300 }), // 60%
    ]);
    expect(s.completed).toBe(1);
    expect(s.inProgress).toBe(1);
    expect(s.distinctMocks).toBe(2);
    expect(s.bestPct).toBe(60);
    expect(s.avgPct).toBe(60);
    expect(s.resumeAttempt).toBe(live);
  });

  it("picks the newest in-progress attempt to resume (list is newest-first)", () => {
    const newer = attempt({ attemptId: "newer", status: "in_progress", score: null, maxScore: null });
    const older = attempt({ attemptId: "older", status: "in_progress", score: null, maxScore: null });
    // Query returns newest-first, so `newer` precedes `older`.
    expect(summarizeUserMocks([newer, older]).resumeAttempt).toBe(newer);
  });

  it("guards against a zero maxScore (never divides by zero)", () => {
    const s = summarizeUserMocks([attempt({ score: 0, maxScore: 0 })]);
    expect(s.completed).toBe(1);
    expect(s.bestPct).toBe(0);
    expect(s.avgPct).toBe(0);
  });
});
