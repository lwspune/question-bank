/**
 * Question of the day (2026-10-04): the same past-year question for everyone
 * targeting an exam on a given IST day, chosen by the date so it needs no table.
 */
import { describe, it, expect } from "vitest";
import { dailyIndex, dailySeed } from "@/lib/daily/questionOfDay";

describe("dailySeed", () => {
  it("is the exam and the IST day", () => {
    expect(dailySeed("nda", "2026-10-04")).toBe("nda:2026-10-04");
  });
});

describe("dailyIndex", () => {
  it("is deterministic: the same seed and pool always give the same question", () => {
    const a = dailyIndex(dailySeed("nda", "2026-10-04"), 5130);
    expect(dailyIndex(dailySeed("nda", "2026-10-04"), 5130)).toBe(a);
  });

  it("always lands inside the pool", () => {
    for (let d = 1; d <= 60; d++) {
      const day = `2026-11-${String((d % 28) + 1).padStart(2, "0")}`;
      const i = dailyIndex(dailySeed("jee-mains", day), 37)!;
      expect(i).toBeGreaterThanOrEqual(0);
      expect(i).toBeLessThan(37);
      expect(Number.isInteger(i)).toBe(true);
    }
  });

  it("moves from day to day — a month of days does not keep landing on one question", () => {
    const picks = new Set<number>();
    for (let d = 1; d <= 30; d++) {
      picks.add(dailyIndex(dailySeed("nda", `2026-11-${String(d).padStart(2, "0")}`), 5130)!);
    }
    expect(picks.size).toBeGreaterThan(25);
  });

  it("differs between exams on the same day", () => {
    const day = "2026-10-04";
    expect(dailyIndex(dailySeed("nda", day), 100000)).not.toBe(dailyIndex(dailySeed("cds", day), 100000));
  });

  it("is null for an empty pool, never index 0 of nothing", () => {
    expect(dailyIndex("nda:2026-10-04", 0)).toBeNull();
    expect(dailyIndex("nda:2026-10-04", -3)).toBeNull();
  });
});
