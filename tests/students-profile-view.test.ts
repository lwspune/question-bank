import { describe, it, expect } from "vitest";
import {
  stageLabel,
  mediumLabel,
  streamLabel,
  examLabels,
  activityLabel,
  relativeTime,
  DASH,
} from "@/lib/students/profileView";
import { ACTIVITY_KINDS } from "@/lib/activity/events";

describe("stageLabel", () => {
  it("renders the human label for a known stage", () => {
    expect(stageLabel("class-11")).toBe("Class 11");
    expect(stageLabel("dropper")).toBe("Dropper / repeat attempt");
  });
  // Absence is absence: a student who never answered must not read as a student
  // who answered "class-9-10" (the DB stores NULL, not a default).
  it("renders a dash for an unanswered stage", () => {
    expect(stageLabel(null)).toBe(DASH);
    expect(stageLabel(undefined)).toBe(DASH);
  });
  // The column is CHECK-constrained (0048), so an unknown value means the CHECK
  // and this map have drifted — show the raw value rather than inventing one.
  it("falls back to the raw value when the enum drifts", () => {
    expect(stageLabel("class-13")).toBe("class-13");
  });
});

describe("mediumLabel / streamLabel", () => {
  it("renders the human label for known values", () => {
    expect(mediumLabel("hindi")).toBe("Hindi");
    expect(mediumLabel("english")).toBe("English");
    expect(streamLabel("pcm")).toBe("Science (PCM)");
    expect(streamLabel("commerce")).toBe("Commerce");
  });
  it("renders a dash when unset", () => {
    expect(mediumLabel(null)).toBe(DASH);
    expect(streamLabel(null)).toBe(DASH);
  });
  it("falls back to the raw value when the enum drifts", () => {
    expect(mediumLabel("marathi")).toBe("marathi");
    expect(streamLabel("humanities")).toBe("humanities");
  });
});

describe("examLabels", () => {
  it("maps registry slugs to their display names", () => {
    expect(examLabels(["nda"])).toEqual(["NDA"]);
  });
  it("keeps an unknown slug rather than dropping it", () => {
    // target_exams is a soft ref (no FK, 0048) — a retired slug must stay
    // visible, because silently dropping it reads as "picked no exam".
    expect(examLabels(["not-an-exam"])).toEqual(["not-an-exam"]);
  });
  it("returns an empty list for no exams", () => {
    expect(examLabels([])).toEqual([]);
    expect(examLabels(null)).toEqual([]);
  });
  it("preserves order and maps every entry", () => {
    const out = examLabels(["nda", "cds"]);
    expect(out).toHaveLength(2);
    expect(out[0]).toBe("NDA");
  });
});

describe("activityLabel", () => {
  it("gives every activity kind a human label", () => {
    // Exhaustive by construction: the map is Record<ActivityKind, string>, so a
    // 9th kind fails typecheck. This asserts none is blank at runtime too.
    for (const kind of ACTIVITY_KINDS) {
      const label = activityLabel(kind);
      expect(label.length).toBeGreaterThan(0);
      expect(label).not.toBe(kind);
    }
  });
  it("falls back to the raw kind for an unknown value", () => {
    expect(activityLabel("teleported")).toBe("teleported");
  });
});

describe("relativeTime", () => {
  const now = new Date("2026-09-15T12:00:00Z");

  it("renders a dash for never", () => {
    expect(relativeTime(null, now)).toBe(DASH);
  });
  it("renders recent activity in minutes and hours", () => {
    expect(relativeTime("2026-09-15T11:58:00Z", now)).toBe("just now");
    expect(relativeTime("2026-09-15T11:20:00Z", now)).toBe("40 min ago");
    expect(relativeTime("2026-09-15T09:00:00Z", now)).toBe("3 hours ago");
    expect(relativeTime("2026-09-15T11:00:00Z", now)).toBe("1 hour ago");
  });
  it("renders days and weeks", () => {
    expect(relativeTime("2026-09-14T12:00:00Z", now)).toBe("1 day ago");
    expect(relativeTime("2026-09-09T12:00:00Z", now)).toBe("6 days ago");
    expect(relativeTime("2026-09-01T12:00:00Z", now)).toBe("2 weeks ago");
  });
  it("falls back to an absolute date beyond a couple of months", () => {
    expect(relativeTime("2026-05-01T12:00:00Z", now)).toMatch(/2026/);
  });
  // Clock skew between the DB and the renderer must not print "in 3 minutes".
  it("clamps a future timestamp to just now", () => {
    expect(relativeTime("2026-09-15T12:05:00Z", now)).toBe("just now");
  });
  it("renders a dash for an unparseable timestamp", () => {
    expect(relativeTime("not-a-date", now)).toBe(DASH);
  });
});
