/**
 * The exam calendar and the days-to-exam resolution — ENGAGEMENT_SPEC.md C3.
 *
 * Derive-with-override, the user's decision (2026-09-24): a calendar of next
 * sittings gives every student with a target exam a countdown on day one; a
 * nullable `exam_date` on the profile wins when set. Since 2026-11-22 the
 * calendar is the exam_sittings table (migration 0281), read by
 * lib/exam/calendarQuery and passed in, so these tests use a fixed fixture.
 * The rot probe over the LIVE table is tests/exam-calendar-live.test.ts
 * (prod-contract, daily); its rule, staleExams, is specified here.
 */
import { describe, it, expect } from "vitest";
import {
  CALENDAR_GRACE_DAYS,
  nextSitting,
  daysUntilIst,
  resolveExamDate,
  examCountdownSentence,
  sanitizeExamDate,
  staleExams,
  type SittingEntry,
} from "@/lib/exam/calendar";
import { TEST_CALENDAR as CAL } from "./fixtures/examCalendar";

// Thursday 2026-09-24 10:00 IST.
const NOW = new Date("2026-09-24T04:30:00Z");

describe("daysUntilIst", () => {
  it("counts IST calendar days, so a date is 'today' until IST midnight", () => {
    expect(daysUntilIst("2026-09-24", NOW)).toBe(0);
    expect(daysUntilIst("2026-09-25", NOW)).toBe(1);
    // 23:30 IST on the 24th is 18:00 UTC: still 1 day to the 25th.
    expect(daysUntilIst("2026-09-25", new Date("2026-09-24T18:00:00Z"))).toBe(1);
    expect(daysUntilIst("2026-09-20", NOW)).toBe(-4);
  });
});

describe("nextSitting", () => {
  it("returns the first sitting on or after today for the exam, or null", () => {
    const n = nextSitting("nda", NOW, CAL);
    expect(n?.sitting).toBe("2027-I");
    expect(nextSitting("foundation-course", NOW, CAL)).toBeNull();
  });

  it("skips a sitting that has passed", () => {
    expect(nextSitting("nda", new Date("2027-05-01T00:00:00Z"), CAL)?.sitting).toBe("2027-II");
    expect(nextSitting("nda", new Date("2099-01-01T00:00:00Z"), CAL)).toBeNull();
  });

  it("is null for every exam when the calendar is empty (a failed read)", () => {
    expect(nextSitting("nda", NOW, [])).toBeNull();
  });
});

describe("resolveExamDate — override wins, calendar fills", () => {
  it("uses the calendar for the primary target exam when no override is set", () => {
    const r = resolveExamDate({ targetExams: ["nda", "cds"], examDate: null }, NOW, CAL);
    expect(r?.source).toBe("calendar");
    expect(r?.exam).toBe("nda");
    expect(r?.official).toBe(true);
    expect(r?.date).toBe("2027-04-11");
    expect(r!.daysLeft).toBeGreaterThan(0);
  });

  it("prefers a future override, labelled with the primary exam", () => {
    const r = resolveExamDate({ targetExams: ["neet"], examDate: "2026-12-01" }, NOW, CAL);
    expect(r?.source).toBe("override");
    expect(r?.official).toBe(true);
    expect(r?.daysLeft).toBe(68);
    expect(r?.label).toMatch(/NEET/);
  });

  it("ignores an override that has passed and falls back to the calendar", () => {
    const r = resolveExamDate({ targetExams: ["nda"], examDate: "2026-01-01" }, NOW, CAL);
    expect(r?.source).toBe("calendar");
  });

  it("is null with no target exam and no override", () => {
    expect(resolveExamDate({ targetExams: [], examDate: null }, NOW, CAL)).toBeNull();
  });

  it("falls through to the next target exam when the first has no calendar entry", () => {
    const r = resolveExamDate({ targetExams: ["foundation-course", "cds"], examDate: null }, NOW, CAL);
    expect(r?.exam).toBe("cds");
  });

  it("still honours an override when the calendar is empty", () => {
    const r = resolveExamDate({ targetExams: ["nda"], examDate: "2027-03-01" }, NOW, []);
    expect(r?.source).toBe("override");
    expect(resolveExamDate({ targetExams: ["nda"], examDate: null }, NOW, [])).toBeNull();
  });
});

describe("examCountdownSentence", () => {
  it("says expected when the date is not official, and nothing extra when it is", () => {
    const cal = resolveExamDate({ targetExams: ["neet"], examDate: null }, NOW, CAL)!;
    expect(cal.official).toBe(false);
    expect(examCountdownSentence(cal)).toMatch(/expected/i);
    const own = resolveExamDate({ targetExams: ["nda"], examDate: "2027-03-01" }, NOW, CAL)!;
    expect(examCountdownSentence(own)).not.toMatch(/expected/i);
    expect(examCountdownSentence(own)).toMatch(/\d+ days/);
  });

  it("handles today and tomorrow in words", () => {
    expect(examCountdownSentence({ ...resolveExamDate({ targetExams: ["nda"], examDate: "2026-09-24" }, NOW, CAL)!, daysLeft: 0 })).toMatch(/today/i);
  });
});

describe("sanitizeExamDate", () => {
  it("accepts YYYY-MM-DD and rejects everything else", () => {
    expect(sanitizeExamDate("2027-04-18")).toBe("2027-04-18");
    expect(sanitizeExamDate("18/04/2027")).toBeNull();
    expect(sanitizeExamDate("2027-13-40")).toBeNull();
    expect(sanitizeExamDate("")).toBeNull();
    expect(sanitizeExamDate(null)).toBeNull();
  });
});

describe("staleExams — the rot rule the daily live probe applies", () => {
  const row = (exam: SittingEntry["exam"], sitting: string, date: string): SittingEntry => ({
    exam, sitting, label: `${exam} ${sitting}`, date, official: false, source: "pattern", sourceUrl: null,
  });

  it("names an exam whose LATEST sitting passed more than the grace period ago", () => {
    const now = new Date("2027-05-01T04:30:00Z");
    const stale = staleExams([row("nda", "2027-I", "2027-04-11"), row("neet", "2027", "2027-04-20")], now);
    // NDA's 11 April is 20 days back; NEET's 20 April only 11.
    expect(stale.map((s) => s.exam)).toEqual(["nda"]);
    expect(stale[0].latest.sitting).toBe("2027-I");
  });

  it("keeps a passed sitting as history when a later one is on the calendar", () => {
    const now = new Date("2027-06-01T04:30:00Z");
    expect(staleExams([row("nda", "2027-I", "2027-04-11"), row("nda", "2027-II", "2027-09-19")], now)).toEqual([]);
  });

  it("allows exactly the grace period", () => {
    const now = new Date(Date.parse("2027-04-11T04:30:00Z") + CALENDAR_GRACE_DAYS * 86_400_000);
    expect(staleExams([row("nda", "2027-I", "2027-04-11")], now)).toEqual([]);
  });

  it("finds nothing stale in the fixture on the day it was written", () => {
    expect(staleExams(CAL, new Date("2026-11-22T04:30:00Z"))).toEqual([]);
  });
});
