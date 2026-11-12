import { describe, it, expect } from "vitest";
import { openAttemptSecsLeft, formatTimeLeft, questionTimeLine } from "@/lib/mocks/startPage";

const NOW = Date.parse("2026-11-12T10:00:00.000Z");
const attempt = (over: Partial<{ status: "in_progress" | "submitted" | "expired"; startedAt: string; durationSecs: number | null }>) => ({
  status: "in_progress" as const,
  startedAt: "2026-11-12T09:30:00.000Z",
  durationSecs: 9000,
  ...over,
});

describe("openAttemptSecsLeft", () => {
  it("is the time left on the open attempt's clock", () => {
    // Started 30 min ago on a 150-minute paper: 2 hours left.
    expect(openAttemptSecsLeft([attempt({})], NOW)).toBe(7200);
  });

  it("is null when nothing is open", () => {
    expect(openAttemptSecsLeft([attempt({ status: "submitted" }), attempt({ status: "expired" })], NOW)).toBeNull();
    expect(openAttemptSecsLeft([], NOW)).toBeNull();
  });

  it("is null when the open attempt's time has run out (the hourly sweep has not graded it yet)", () => {
    // Saying "Resume · 0 m left" would invite a tap into a test that submits itself at once.
    expect(openAttemptSecsLeft([attempt({ startedAt: "2026-11-12T07:00:00.000Z" })], NOW)).toBeNull();
  });

  it("is null when the paper's length is unknown, rather than guessing", () => {
    expect(openAttemptSecsLeft([attempt({ durationSecs: null })], NOW)).toBeNull();
  });
});

describe("formatTimeLeft", () => {
  it("reads as hours and minutes, minutes, or seconds", () => {
    expect(formatTimeLeft(6136)).toBe("1 h 42 m");
    expect(formatTimeLeft(3600)).toBe("1 h 0 m");
    expect(formatTimeLeft(540)).toBe("9 m");
    expect(formatTimeLeft(42)).toBe("42 s");
  });
});

describe("questionTimeLine", () => {
  it("puts the time spent beside the paper's own pace", () => {
    // NDA Maths: 150 minutes for 120 questions = 75 s a question.
    expect(questionTimeLine(160, 9000, 120)).toBe("2 m 40 s here · paper pace 1 m 15 s");
    expect(questionTimeLine(45, 9000, 120)).toBe("45 s here · paper pace 1 m 15 s");
  });

  it("says nothing for a question never opened", () => {
    expect(questionTimeLine(0, 9000, 120)).toBeNull();
  });

  it("drops the pace when the paper's length is unknown", () => {
    expect(questionTimeLine(90, 0, 120)).toBe("1 m 30 s here");
  });
});
