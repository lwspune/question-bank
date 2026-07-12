import { describe, it, expect } from "vitest";
import {
  classifyUsageShape,
  emptyShape,
  KIND_LABELS,
  type ActivityShape,
} from "@/lib/activity/shape";
import { ACTIVITY_KINDS } from "@/lib/activity/events";

function shape(over: Partial<ActivityShape> = {}): ActivityShape {
  return { ...emptyShape(90), ...over };
}

describe("emptyShape", () => {
  it("is a zeroed shape for the given window", () => {
    const s = emptyShape(30);
    expect(s.windowDays).toBe(30);
    expect(s.totalEvents).toBe(0);
    expect(s.activeUsers).toBe(0);
    expect(s.byKind).toEqual([]);
    expect(s.sessions.medianGapDays).toBeNull();
  });
});

describe("KIND_LABELS", () => {
  it("has a human label for every activity kind (no raw slug leaks in the UI)", () => {
    for (const k of ACTIVITY_KINDS) {
      expect(KIND_LABELS[k]).toBeTruthy();
      expect(KIND_LABELS[k]).not.toContain("_");
    }
  });
});

describe("classifyUsageShape", () => {
  it("returns 'insufficient' until enough students have repeat-visit data", () => {
    const s = shape({ activeUsers: 2, sessions: { ...emptyShape(90).sessions, multiDayUsers: 1 } });
    expect(classifyUsageShape(s).verdict).toBe("insufficient");
  });

  it("flags DAILY usage when the median gap between active days is ~1", () => {
    const s = shape({
      activeUsers: 20,
      sessions: { avgActiveDays: 6, multiDayUsers: 15, medianGapDays: 1, gapBuckets: emptyBuckets() },
    });
    const r = classifyUsageShape(s);
    expect(r.verdict).toBe("daily");
    // A daily streak is defensible only when usage is actually daily.
    expect(r.recommendation.toLowerCase()).toContain("streak");
  });

  it("flags BURST usage when the median gap is several days (the AI Tutor failure mode)", () => {
    const s = shape({
      activeUsers: 25,
      sessions: { avgActiveDays: 3, multiDayUsers: 18, medianGapDays: 5, gapBuckets: emptyBuckets() },
    });
    const r = classifyUsageShape(s);
    expect(r.verdict).toBe("burst");
    // Burst usage → goal/deadline progress, explicitly NOT a daily streak.
    expect(r.recommendation.toLowerCase()).toContain("goal");
    expect(r.recommendation.toLowerCase()).not.toContain("daily streak");
  });

  it("flags MIXED usage in the middle band", () => {
    const s = shape({
      activeUsers: 15,
      sessions: { avgActiveDays: 4, multiDayUsers: 10, medianGapDays: 2.5, gapBuckets: emptyBuckets() },
    });
    expect(classifyUsageShape(s).verdict).toBe("mixed");
  });

  it("carries a headline that names the median gap", () => {
    const s = shape({
      activeUsers: 25,
      sessions: { avgActiveDays: 3, multiDayUsers: 18, medianGapDays: 5, gapBuckets: emptyBuckets() },
    });
    expect(classifyUsageShape(s).headline).toContain("5");
  });
});

function emptyBuckets() {
  return { sameNext: 0, d2_3: 0, d4_7: 0, d8_14: 0, d15plus: 0 };
}
