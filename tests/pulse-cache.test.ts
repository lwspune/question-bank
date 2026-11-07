/**
 * The header's "pulse" (due count + weekly progress) is fetched once per page
 * load and cached in sessionStorage. This pins the freshness rule and the
 * shape guard, so a stale or malformed cache entry can never render a number.
 */
import { describe, it, expect } from "vitest";
import { isPulseFresh, parsePulseEntry, PULSE_TTL_MS, totalsLine } from "@/lib/pulse/cache";

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
    // `exam` is always present on the parsed shape (null when absent) so a
    // consumer never has to distinguish undefined from null.
    expect(e).toEqual({ ...entry(0), exam: null, totals: null, weak: [], chapterDue: {} });
  });

  it("rejects junk, partial shapes and negative counts", () => {
    expect(parsePulseEntry("not json")).toBeNull();
    expect(parsePulseEntry(JSON.stringify({ at: NOW }))).toBeNull();
    expect(parsePulseEntry(JSON.stringify({ at: NOW, due: -1, week: { done: 0, goal: 3 } }))).toBeNull();
    expect(parsePulseEntry(JSON.stringify({ at: NOW, due: 1, week: { done: 0 } }))).toBeNull();
    expect(parsePulseEntry(null)).toBeNull();
  });

  it("accepts an entry with no exam field (cached before C3) and one with a countdown", () => {
    const old = parsePulseEntry(JSON.stringify(entry(0)));
    expect(old?.exam ?? null).toBeNull();
    const withExam = parsePulseEntry(
      JSON.stringify({ ...entry(0), exam: { label: "NDA 2027 (I)", daysLeft: 206, official: false } })
    );
    expect(withExam?.exam).toEqual({ label: "NDA 2027 (I)", daysLeft: 206, official: false });
    expect(parsePulseEntry(JSON.stringify({ ...entry(0), exam: { label: "x" } }))).toBeNull();
  });

  it("allows a null goal (not chosen yet)", () => {
    const e = parsePulseEntry(JSON.stringify({ at: NOW, due: 1, week: { done: 0, goal: null } }));
    expect(e?.week.goal).toBeNull();
  });
});

describe("parsePulseEntry — answered / right / fixed totals (2026-10-04)", () => {
  it("is null when absent (an entry cached before the totals existed)", () => {
    expect(parsePulseEntry(JSON.stringify(entry(0)))?.totals).toBeNull();
  });

  it("carries well-formed totals through", () => {
    const e = parsePulseEntry(JSON.stringify({ ...entry(0), totals: { answered: 1240, right: 780, fixed: 23 } }));
    expect(e?.totals).toEqual({ answered: 1240, right: 780, fixed: 23 });
  });

  it("refuses the whole entry when the totals are malformed, so a bad cache never renders a number", () => {
    for (const bad of [{ answered: 3 }, { answered: -1, right: 0, fixed: 0 }, { answered: 1.5, right: 1, fixed: 0 }, "x"]) {
      expect(parsePulseEntry(JSON.stringify({ ...entry(0), totals: bad })), JSON.stringify(bad)).toBeNull();
    }
  });

  it("refuses totals where more are right than were answered", () => {
    expect(parsePulseEntry(JSON.stringify({ ...entry(0), totals: { answered: 5, right: 6, fixed: 0 } }))).toBeNull();
  });
});

describe("parsePulseEntry: weak chapters for /me (2026-11-06)", () => {
  const weak = [{ chapterId: "c1", name: "Matrices", place: "Mathematics · NDA", due: 3 }];

  it("is an empty list when absent (an entry cached before it existed)", () => {
    expect(parsePulseEntry(JSON.stringify(entry(0)))?.weak).toEqual([]);
  });

  it("carries well-formed rows through", () => {
    expect(parsePulseEntry(JSON.stringify({ ...entry(0), weak }))?.weak).toEqual(weak);
  });

  it("refuses the whole entry when a row is malformed", () => {
    for (const bad of [
      "x",
      [{ chapterId: "c1", name: "M", place: "P" }],
      [{ chapterId: "c1", name: "M", place: "P", due: 0 }],
      [{ chapterId: 5, name: "M", place: "P", due: 1 }],
    ]) {
      expect(parsePulseEntry(JSON.stringify({ ...entry(0), weak: bad })), JSON.stringify(bad)).toBeNull();
    }
  });
});

describe("parsePulseEntry: due per chapter for the chapter-page line (2026-11-07)", () => {
  it("is an empty map when absent (an entry cached before it existed)", () => {
    expect(parsePulseEntry(JSON.stringify(entry(0)))?.chapterDue).toEqual({});
  });

  it("carries well-formed counts through", () => {
    const chapterDue = { "c0ffee00-1b2c-4d3e-9f00-112233445566": 3, c2: 1 };
    expect(parsePulseEntry(JSON.stringify({ ...entry(0), chapterDue }))?.chapterDue).toEqual(chapterDue);
  });

  it("refuses the whole entry when a count is malformed", () => {
    for (const bad of ["x", [1, 2], { c1: 0 }, { c1: -1 }, { c1: 1.5 }, { c1: "2" }, { ["x".repeat(65)]: 1 }]) {
      expect(parsePulseEntry(JSON.stringify({ ...entry(0), chapterDue: bad })), JSON.stringify(bad)).toBeNull();
    }
  });
});

describe("totalsLine", () => {
  it("shows the three numbers together, so the total never stands alone", () => {
    expect(totalsLine({ answered: 1240, right: 780, fixed: 23 })).toBe("Answered 1,240 · Right 780 · Fixed 23");
  });

  it("is null before anything is answered: a row of zeros is noise, not progress", () => {
    expect(totalsLine({ answered: 0, right: 0, fixed: 0 })).toBeNull();
  });
});
