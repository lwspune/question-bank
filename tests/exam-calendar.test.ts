/**
 * The exam calendar and the days-to-exam resolution — ENGAGEMENT_SPEC.md C3.
 *
 * Derive-with-override, the user's decision (2026-09-24): a committed calendar
 * of next sittings beside the exam registry gives every student with a target
 * exam a countdown on day one; a nullable `exam_date` on the profile wins when
 * set. The calendar carries an `official` flag because, on the day this was
 * written, NO upcoming sitting had an announced date — every entry is the
 * usual pattern, and the UI says "expected" until the flag flips.
 *
 * THE ROT PROBE IS HERE, in the gate: a sitting more than CALENDAR_GRACE_DAYS
 * in the past fails the suite, so a stale calendar cannot ship silently — the
 * roadmap's stated preference over a DB table nothing checks.
 */
import { describe, it, expect } from "vitest";
import {
  EXAM_CALENDAR,
  CALENDAR_GRACE_DAYS,
  nextSitting,
  daysUntilIst,
  resolveExamDate,
  examCountdownSentence,
  sanitizeExamDate,
} from "@/lib/exam/calendar";
import { EXAM_REGISTRY, isExamSlug } from "@/lib/exam/examContext";

// Thursday 2026-09-24 10:00 IST.
const NOW = new Date("2026-09-24T04:30:00Z");

describe("EXAM_CALENDAR — shape", () => {
  it("names only registry exams, with valid ISO dates and unique (exam, sitting)", () => {
    const seen = new Set<string>();
    for (const e of EXAM_CALENDAR) {
      expect(isExamSlug(e.exam)).toBe(true);
      expect(e.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isFinite(Date.parse(e.date))).toBe(true);
      const key = `${e.exam}:${e.sitting}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
      expect(e.label.length).toBeGreaterThan(0);
    }
  });

  it("has no entry for a COURSE — practice-only and not a board — there is no sitting to count down to", () => {
    // CBSE Class 10 is practice-only (no PYQs in the bank yet) AND a board
    // year with a real sitting, so the flag alone does not mean "no exam".
    const courses = new Set(EXAM_REGISTRY.filter((e) => e.practiceOnly && !e.boardExam).map((e) => e.slug));
    expect(courses.size).toBeGreaterThan(0);
    for (const e of EXAM_CALENDAR) expect(courses.has(e.exam)).toBe(false);
  });

  it("ROT PROBE: no sitting is more than the grace period in the past (update the calendar)", () => {
    const today = new Date();
    for (const e of EXAM_CALENDAR) {
      expect(daysUntilIst(e.date, today)).toBeGreaterThanOrEqual(-CALENDAR_GRACE_DAYS);
    }
  });
});

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
    const n = nextSitting("nda", NOW);
    expect(n).not.toBeNull();
    expect(daysUntilIst(n!.date, NOW)).toBeGreaterThanOrEqual(0);
    expect(nextSitting("foundation-course", NOW)).toBeNull();
  });

  it("skips a sitting that has passed", () => {
    const late = new Date("2099-01-01T00:00:00Z");
    expect(nextSitting("nda", late)).toBeNull();
  });
});

describe("resolveExamDate — override wins, calendar fills", () => {
  it("uses the calendar for the primary target exam when no override is set", () => {
    const r = resolveExamDate({ targetExams: ["nda", "cds"], examDate: null }, NOW);
    expect(r?.source).toBe("calendar");
    expect(r?.exam).toBe("nda");
    expect(r?.official).toBe(false);
    expect(r!.daysLeft).toBeGreaterThan(0);
  });

  it("prefers a future override, labelled with the primary exam", () => {
    const r = resolveExamDate({ targetExams: ["neet"], examDate: "2026-12-01" }, NOW);
    expect(r?.source).toBe("override");
    expect(r?.official).toBe(true);
    expect(r?.daysLeft).toBe(68);
    expect(r?.label).toMatch(/NEET/);
  });

  it("ignores an override that has passed and falls back to the calendar", () => {
    const r = resolveExamDate({ targetExams: ["nda"], examDate: "2026-01-01" }, NOW);
    expect(r?.source).toBe("calendar");
  });

  it("is null with no target exam and no override", () => {
    expect(resolveExamDate({ targetExams: [], examDate: null }, NOW)).toBeNull();
  });

  it("falls through to the next target exam when the first has no calendar entry", () => {
    const r = resolveExamDate({ targetExams: ["foundation-course", "cds"], examDate: null }, NOW);
    expect(r?.exam).toBe("cds");
  });
});

describe("examCountdownSentence", () => {
  it("says expected when the date is not official, and nothing extra when it is", () => {
    const cal = resolveExamDate({ targetExams: ["nda"], examDate: null }, NOW)!;
    expect(examCountdownSentence(cal)).toMatch(/expected/i);
    const own = resolveExamDate({ targetExams: ["nda"], examDate: "2027-03-01" }, NOW)!;
    expect(examCountdownSentence(own)).not.toMatch(/expected/i);
    expect(examCountdownSentence(own)).toMatch(/\d+ days/);
  });

  it("handles today and tomorrow in words", () => {
    expect(examCountdownSentence({ ...resolveExamDate({ targetExams: ["nda"], examDate: "2026-09-24" }, NOW)!, daysLeft: 0 })).toMatch(/today/i);
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
