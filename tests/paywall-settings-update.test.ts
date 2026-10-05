/**
 * nextPaywallSettings: what the admin's free-mock-limit form writes.
 *
 * counts_from is the date the limit started counting ("from launch day": a
 * student's mocks before it do not use their free slots). It must move ONLY
 * when the limit is switched on. If every save reset it, editing the number
 * from 3 to 4 would hand every student a fresh set of free mocks.
 */
import { describe, it, expect } from "vitest";
import { nextPaywallSettings } from "@/lib/billing/paywallSettings";

const NOW = "2026-09-27T10:00:00.000Z";
const REST = {
  freeChapterTestLimit: null,
  chapterTestsCountsFrom: null,
  freeDrillPerDay: null,
  freeRevealsPerDay: null,
  freeSaveLimit: null,
  projectionTrialDays: null,
};
const off = { freeMockLimit: null, countsFrom: null, ...REST };
const on = { freeMockLimit: 3, countsFrom: "2026-09-20T00:00:00.000Z", ...REST };

describe("nextPaywallSettings", () => {
  it("switching on stamps counts_from = now", () => {
    expect(nextPaywallSettings(off, { enabled: true, limit: 3 }, NOW)).toEqual({
      ok: true,
      next: { ...REST, freeMockLimit: 3, countsFrom: NOW },
    });
  });

  it("changing the number while on keeps counts_from", () => {
    expect(nextPaywallSettings(on, { enabled: true, limit: 4 }, NOW)).toEqual({
      ok: true,
      next: { ...REST, freeMockLimit: 4, countsFrom: on.countsFrom },
    });
  });

  it("switching off clears both", () => {
    expect(nextPaywallSettings(on, { enabled: false, limit: 3 }, NOW)).toEqual({
      ok: true,
      next: { ...REST, freeMockLimit: null, countsFrom: null },
    });
  });

  it("switching off then on again counts from the new date", () => {
    const offAgain = nextPaywallSettings(on, { enabled: false, limit: 3 }, NOW);
    const later = "2026-10-01T00:00:00.000Z";
    const r = offAgain.ok && nextPaywallSettings(offAgain.next, { enabled: true, limit: 3 }, later);
    expect(r).toEqual({ ok: true, next: { ...REST, freeMockLimit: 3, countsFrom: later } });
  });

  it("the number must be a whole number, zero or more", () => {
    expect(nextPaywallSettings(off, { enabled: true, limit: -1 }, NOW).ok).toBe(false);
    expect(nextPaywallSettings(off, { enabled: true, limit: 2.5 }, NOW).ok).toBe(false);
    expect(nextPaywallSettings(off, { enabled: true, limit: NaN }, NOW).ok).toBe(false);
    expect(nextPaywallSettings(off, { enabled: true, limit: 0 }, NOW).ok).toBe(true);
  });
});

/**
 * The four premium limits (2026-10-05). Same form, one `which` at a time.
 * Chapter tests count from the day they are switched on, exactly like mocks,
 * and keep their OWN date: switching one limit on must not restart the other.
 * The three per-day and lifetime limits carry no date at all.
 */
describe("nextPaywallSettings: the premium limits", () => {
  const base = {
    freeMockLimit: 3,
    countsFrom: "2026-09-27T00:00:00.000Z",
    freeChapterTestLimit: null,
    chapterTestsCountsFrom: null,
    freeDrillPerDay: null,
    freeRevealsPerDay: null,
    freeSaveLimit: null,
    projectionTrialDays: null,
  };

  it("defaults to the mock limit when `which` is absent (the old form)", () => {
    const r = nextPaywallSettings(base, { enabled: true, limit: 4 }, NOW);
    expect(r).toEqual({ ok: true, next: { ...base, freeMockLimit: 4 } });
  });

  it("switching chapter tests on stamps their own date and leaves the mock date alone", () => {
    const r = nextPaywallSettings(base, { which: "chapterTests", enabled: true, limit: 5 }, NOW);
    expect(r).toEqual({
      ok: true,
      next: { ...base, freeChapterTestLimit: 5, chapterTestsCountsFrom: NOW },
    });
  });

  it("changing the chapter-test number while on keeps its date", () => {
    const on5 = { ...base, freeChapterTestLimit: 5, chapterTestsCountsFrom: "2026-10-01T00:00:00.000Z" };
    const r = nextPaywallSettings(on5, { which: "chapterTests", enabled: true, limit: 6 }, NOW);
    expect(r).toEqual({ ok: true, next: { ...on5, freeChapterTestLimit: 6 } });
  });

  it("switching chapter tests off clears only their two fields", () => {
    const on5 = { ...base, freeChapterTestLimit: 5, chapterTestsCountsFrom: "2026-10-01T00:00:00.000Z" };
    const r = nextPaywallSettings(on5, { which: "chapterTests", enabled: false, limit: 5 }, NOW);
    expect(r).toEqual({ ok: true, next: base });
  });

  it.each([
    ["drill", "freeDrillPerDay", 15],
    ["reveals", "freeRevealsPerDay", 50],
    ["saves", "freeSaveLimit", 100],
    ["projection", "projectionTrialDays", 7],
  ] as const)("%s sets %s and nothing else, with no date", (which, field, n) => {
    const on = nextPaywallSettings(base, { which, enabled: true, limit: n }, NOW);
    expect(on).toEqual({ ok: true, next: { ...base, [field]: n } });
    const off = on.ok && nextPaywallSettings(on.next, { which, enabled: false, limit: n }, NOW);
    expect(off).toEqual({ ok: true, next: base });
  });

  it("validates every limit the same way", () => {
    for (const which of ["chapterTests", "drill", "reveals", "saves", "projection"] as const) {
      expect(nextPaywallSettings(base, { which, enabled: true, limit: -1 }, NOW).ok).toBe(false);
      expect(nextPaywallSettings(base, { which, enabled: true, limit: 1.5 }, NOW).ok).toBe(false);
    }
  });
});
