/**
 * The readout of "the plan follows the class" (MENTOR_SPEC.md §18): the
 * checklist seen and saved, switches, and today's-task completion for the
 * students already on the plan in the 7 days before the change against the 7
 * days after. The change day is the first student save of the checklist, read
 * from the data, so no date has to be typed in after the push.
 *
 * Pure.
 */
import { describe, it, expect } from "vitest";
import { beforeAfter, followDay, summarizeFollow } from "@/lib/path/followReadout";

describe("followDay: the change day is the first student save", () => {
  it("takes the earliest save's IST day", () => {
    expect(followDay([{ user: "a", day: "2026-11-17" }, { user: "b", day: "2026-11-16" }])).toBe("2026-11-16");
  });
  it("is null before anyone has saved", () => {
    expect(followDay([])).toBeNull();
  });
});

describe("summarizeFollow", () => {
  it("counts the checklist seen, saved, skipped, the ticks and switches", () => {
    const s = summarizeFollow({
      coverViews: [{ user: "a" }, { user: "a" }, { user: "b" }, { user: "c" }],
      covered: [
        { user: "a", ticked: 5 },
        { user: "a", ticked: 7 },
        { user: "b", ticked: 0 },
      ],
      switched: [{ user: "a" }, { user: "a" }, { user: "c" }],
    });
    expect(s).toEqual({ seen: 3, answered: 2, skipped: 1, medianTicked: 7, switches: 3, switchers: 2 });
  });
});

describe("beforeAfter: the same students, 7 days before against 7 days after", () => {
  const days = [
    { user: "a", day: "2026-11-10", shown: 3, done: 0 },
    { user: "a", day: "2026-11-15", shown: 3, done: 1 },
    { user: "a", day: "2026-11-16", shown: 3, done: 2 },
    { user: "a", day: "2026-11-23", shown: 3, done: 3 }, // past the window
    { user: "b", day: "2026-11-08", shown: 4, done: 0 }, // before the window
    { user: "b", day: "2026-11-20", shown: 4, done: 4 },
    { user: "new", day: "2026-11-18", shown: 2, done: 2 }, // started after the change
  ];
  const started = new Map([
    ["a", "2026-11-08"],
    ["b", "2026-11-08"],
    ["new", "2026-11-17"],
  ]);

  it("splits at the change day and keeps only students who started before it", () => {
    const r = beforeAfter(days, started, "2026-11-16");
    expect(r.cohort).toBe(2);
    expect(r.before).toEqual({ shown: 6, done: 1, studentDays: 2 });
    expect(r.after).toEqual({ shown: 7, done: 6, studentDays: 2 });
  });
});
