/**
 * The header's "pulse" (due count + weekly progress) is fetched once per page
 * load and cached in sessionStorage. This pins the freshness rule and the
 * shape guard, so a stale or malformed cache entry can never render a number.
 */
import { describe, it, expect } from "vitest";
import { isPulseFresh, parsePulseEntry, PULSE_TTL_MS } from "@/lib/pulse/cache";

const NOW = Date.parse("2026-09-24T10:00:00Z");
const entry = (ageMs: number) => ({ at: NOW - ageMs, due: 4, week: { done: 1, goal: 3 } });

describe("isPulseFresh", () => {
  it("is fresh inside the TTL", () => {
    expect(isPulseFresh(entry(PULSE_TTL_MS - 1), NOW)).toBe(true);
  });

  it("is stale at and past the TTL", () => {
    expect(isPulseFresh(entry(PULSE_TTL_MS), NOW)).toBe(false);
    expect(isPulseFresh(entry(PULSE_TTL_MS * 5), NOW)).toBe(false);
  });

  it("treats a future timestamp as stale (a clock that moved)", () => {
    expect(isPulseFresh(entry(-60_000), NOW)).toBe(false);
  });
});

describe("parsePulseEntry", () => {
  it("accepts a well-formed entry", () => {
    const e = parsePulseEntry(JSON.stringify(entry(0)));
    expect(e).toEqual(entry(0));
  });

  it("rejects junk, partial shapes and negative counts", () => {
    expect(parsePulseEntry("not json")).toBeNull();
    expect(parsePulseEntry(JSON.stringify({ at: NOW }))).toBeNull();
    expect(parsePulseEntry(JSON.stringify({ at: NOW, due: -1, week: { done: 0, goal: 3 } }))).toBeNull();
    expect(parsePulseEntry(JSON.stringify({ at: NOW, due: 1, week: { done: 0 } }))).toBeNull();
    expect(parsePulseEntry(null)).toBeNull();
  });

  it("allows a null goal (not chosen yet)", () => {
    const e = parsePulseEntry(JSON.stringify({ at: NOW, due: 1, week: { done: 0, goal: null } }));
    expect(e?.week.goal).toBeNull();
  });
});
