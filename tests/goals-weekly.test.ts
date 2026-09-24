/**
 * The weekly sittings goal — the deadline/goal-progress mechanic the engagement
 * gate prefers over a daily streak for this cohort (measured cadence `mixed`,
 * median gap 2.0 days).
 */
import { describe, it, expect } from "vitest";
import {
  DEFAULT_WEEKLY_GOAL,
  WEEK_SITTING_KINDS,
  WEEKLY_GOAL_CHOICES,
  weekStartIst,
  weeklyProgress,
  weeklyGoalSentence,
  sanitizeWeeklyGoal,
} from "@/lib/goals/weekly";
import { ACTIVITY_KINDS } from "@/lib/activity/events";

describe("weekStartIst", () => {
  it("is the preceding Monday 00:00 IST, expressed as a UTC instant", () => {
    // Thursday 2026-09-24 10:00 IST = 04:30 UTC.
    const now = new Date("2026-09-24T04:30:00Z");
    // Monday 2026-09-21 00:00 IST = Sunday 2026-09-20 18:30 UTC.
    expect(weekStartIst(now).toISOString()).toBe("2026-09-20T18:30:00.000Z");
  });

  it("treats Monday 00:30 IST as already inside the new week", () => {
    // Monday 2026-09-21 00:30 IST = Sunday 2026-09-20 19:00 UTC.
    const now = new Date("2026-09-20T19:00:00Z");
    expect(weekStartIst(now).toISOString()).toBe("2026-09-20T18:30:00.000Z");
  });

  it("treats Sunday 23:30 IST as still the old week", () => {
    // Sunday 2026-09-20 23:30 IST = 18:00 UTC.
    const now = new Date("2026-09-20T18:00:00Z");
    // Monday 2026-09-14 00:00 IST = Sunday 2026-09-13 18:30 UTC.
    expect(weekStartIst(now).toISOString()).toBe("2026-09-13T18:30:00.000Z");
  });
});

describe("WEEK_SITTING_KINDS", () => {
  it("names only real activity kinds", () => {
    for (const k of WEEK_SITTING_KINDS) expect(ACTIVITY_KINDS).toContain(k);
  });

  it("counts finished things, never starts or reveals", () => {
    expect(WEEK_SITTING_KINDS).not.toContain("mock_started");
    expect(WEEK_SITTING_KINDS).not.toContain("question_practiced");
    expect(WEEK_SITTING_KINDS).not.toContain("answer_wrong");
    expect(WEEK_SITTING_KINDS).toContain("mock_submitted");
    expect(WEEK_SITTING_KINDS).toContain("drill_completed");
  });
});

describe("weeklyProgress", () => {
  it("uses the default goal when none is chosen, and says so", () => {
    const p = weeklyProgress(1, null);
    expect(p.goal).toBe(DEFAULT_WEEKLY_GOAL);
    expect(p.chosen).toBe(false);
    expect(p.remaining).toBe(DEFAULT_WEEKLY_GOAL - 1);
  });

  it("caps pct at 100 and marks the goal met", () => {
    const p = weeklyProgress(5, 3);
    expect(p.pct).toBe(100);
    expect(p.met).toBe(true);
    expect(p.remaining).toBe(0);
  });

  it("computes a whole-number pct", () => {
    expect(weeklyProgress(1, 3).pct).toBe(33);
    expect(weeklyProgress(0, 3).pct).toBe(0);
  });
});

describe("weeklyGoalSentence — growth-framed", () => {
  it("names what is next when under the goal", () => {
    const s = weeklyGoalSentence(weeklyProgress(2, 3));
    expect(s).toMatch(/one more/i);
  });

  it("does not ask for more once the goal is met", () => {
    const s = weeklyGoalSentence(weeklyProgress(3, 3));
    expect(s).not.toMatch(/more/i);
    expect(s).toMatch(/done|met|there/i);
  });

  it("invites a first sitting at zero, without a guilt trip", () => {
    const s = weeklyGoalSentence(weeklyProgress(0, 3));
    expect(s).not.toMatch(/miss|behind|only/i);
  });
});

describe("sanitizeWeeklyGoal", () => {
  it("accepts an integer in 1..14", () => {
    expect(sanitizeWeeklyGoal(3)).toBe(3);
    expect(sanitizeWeeklyGoal("5")).toBe(5);
    expect(sanitizeWeeklyGoal(14)).toBe(14);
  });

  it("rejects everything else as null", () => {
    expect(sanitizeWeeklyGoal(0)).toBeNull();
    expect(sanitizeWeeklyGoal(15)).toBeNull();
    expect(sanitizeWeeklyGoal(2.5)).toBeNull();
    expect(sanitizeWeeklyGoal("lots")).toBeNull();
    expect(sanitizeWeeklyGoal(null)).toBeNull();
    expect(sanitizeWeeklyGoal(undefined)).toBeNull();
  });

  it("offers choices that all sanitize to themselves", () => {
    for (const c of WEEKLY_GOAL_CHOICES) expect(sanitizeWeeklyGoal(c)).toBe(c);
  });
});
