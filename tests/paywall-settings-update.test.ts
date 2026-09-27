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
const off = { freeMockLimit: null, countsFrom: null };
const on = { freeMockLimit: 3, countsFrom: "2026-09-20T00:00:00.000Z" };

describe("nextPaywallSettings", () => {
  it("switching on stamps counts_from = now", () => {
    expect(nextPaywallSettings(off, { enabled: true, limit: 3 }, NOW)).toEqual({
      ok: true,
      next: { freeMockLimit: 3, countsFrom: NOW },
    });
  });

  it("changing the number while on keeps counts_from", () => {
    expect(nextPaywallSettings(on, { enabled: true, limit: 4 }, NOW)).toEqual({
      ok: true,
      next: { freeMockLimit: 4, countsFrom: on.countsFrom },
    });
  });

  it("switching off clears both", () => {
    expect(nextPaywallSettings(on, { enabled: false, limit: 3 }, NOW)).toEqual({
      ok: true,
      next: { freeMockLimit: null, countsFrom: null },
    });
  });

  it("switching off then on again counts from the new date", () => {
    const offAgain = nextPaywallSettings(on, { enabled: false, limit: 3 }, NOW);
    const later = "2026-10-01T00:00:00.000Z";
    const r = offAgain.ok && nextPaywallSettings(offAgain.next, { enabled: true, limit: 3 }, later);
    expect(r).toEqual({ ok: true, next: { freeMockLimit: 3, countsFrom: later } });
  });

  it("the number must be a whole number, zero or more", () => {
    expect(nextPaywallSettings(off, { enabled: true, limit: -1 }, NOW).ok).toBe(false);
    expect(nextPaywallSettings(off, { enabled: true, limit: 2.5 }, NOW).ok).toBe(false);
    expect(nextPaywallSettings(off, { enabled: true, limit: NaN }, NOW).ok).toBe(false);
    expect(nextPaywallSettings(off, { enabled: true, limit: 0 }, NOW).ok).toBe(true);
  });
});
