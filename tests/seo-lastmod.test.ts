/**
 * Pure core for sitemap <lastmod> resolution.
 *
 * Context: until 2026-08-09 the sitemap stamped ONE timestamp — the build clock
 * — onto 984 of its 988 URLs, so every deploy told Google "all 984 pages changed",
 * including deploys that only touched docs or ingestion scripts. A lastmod that
 * moves for everything carries the same information as no lastmod at all, and
 * Google discounts one it can't trust. These helpers resolve a REAL date per URL.
 */
import { describe, it, expect } from "vitest";
import {
  parseIsoDate,
  contentDateFor,
  newestOf,
} from "@/lib/seo/lastmod";

const FALLBACK = new Date("2026-01-01T00:00:00.000Z");

describe("parseIsoDate", () => {
  it("parses a valid ISO timestamp", () => {
    expect(parseIsoDate("2026-06-07T10:00:21+05:30", FALLBACK).toISOString()).toBe(
      "2026-06-07T04:30:21.000Z"
    );
  });

  it("falls back on null/undefined/empty", () => {
    expect(parseIsoDate(null, FALLBACK)).toEqual(FALLBACK);
    expect(parseIsoDate(undefined, FALLBACK)).toEqual(FALLBACK);
    expect(parseIsoDate("", FALLBACK)).toEqual(FALLBACK);
  });

  it("falls back on an unparseable string rather than emitting Invalid Date", () => {
    // An Invalid Date serialises to null in the sitemap and can poison the XML;
    // a stale-but-valid date is always the safer failure.
    expect(parseIsoDate("not-a-date", FALLBACK)).toEqual(FALLBACK);
  });
});

describe("contentDateFor", () => {
  const DATES = {
    "/guide/nda-maths": "2026-07-29T23:44:31+05:30",
    "/notes/nda-maths/statistics": "2026-06-07T10:00:21+05:30",
    "/notes/nda-maths": "2026-05-01T00:00:00+05:30",
  };

  it("prefers an exact match", () => {
    expect(contentDateFor("/notes/nda-maths/statistics", DATES, FALLBACK)).toEqual(
      new Date("2026-06-07T10:00:21+05:30")
    );
  });

  it("inherits from the nearest ancestor when the exact path is absent", () => {
    // A subtopic page has no _data dir of its own — it ships with its chapter.
    expect(
      contentDateFor("/notes/nda-maths/statistics/central-tendency", DATES, FALLBACK)
    ).toEqual(new Date("2026-06-07T10:00:21+05:30"));
  });

  it("picks the LONGEST matching ancestor, not the first", () => {
    // Both /notes/nda-maths and /notes/nda-maths/statistics are candidates.
    expect(
      contentDateFor("/notes/nda-maths/statistics/spread", DATES, FALLBACK)
    ).toEqual(new Date("2026-06-07T10:00:21+05:30"));
  });

  it("only matches on a SEGMENT boundary", () => {
    // The trap: naive startsWith() would hand /guide/nda-maths-advanced the
    // date of /guide/nda-maths, silently dating an unrelated subtree.
    expect(contentDateFor("/guide/nda-maths-advanced", DATES, FALLBACK)).toEqual(
      FALLBACK
    );
  });

  it("falls back for an unknown subtree", () => {
    expect(contentDateFor("/questions/nda/mathematics/vectors", DATES, FALLBACK)).toEqual(
      FALLBACK
    );
  });
});

describe("newestOf", () => {
  it("returns the most recent of the supplied dates", () => {
    expect(
      newestOf(
        ["2026-06-07T10:00:21Z", "2026-07-29T18:14:31Z", "2026-05-01T00:00:00Z"],
        FALLBACK
      ).toISOString()
    ).toBe("2026-07-29T18:14:31.000Z");
  });

  it("ignores nulls and unparseable entries", () => {
    expect(
      newestOf([null, "nope", "2026-06-07T10:00:21Z"], FALLBACK).toISOString()
    ).toBe("2026-06-07T10:00:21.000Z");
  });

  it("falls back when nothing is usable", () => {
    expect(newestOf([null, undefined, ""], FALLBACK)).toEqual(FALLBACK);
  });

  it("never returns a date older than the fallback when the list is empty", () => {
    expect(newestOf([], FALLBACK)).toEqual(FALLBACK);
  });
});
