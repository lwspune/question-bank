/**
 * Spec for which /mock URLs belong in the sitemap.
 *
 * WHY THE LEAVES CAME OUT (2026-09-17). Every published mock had its own
 * sitemap entry — 192 of them, 13% of the whole sitemap. Measured against
 * production, `/mock/nda-2017-apr-maths` renders **98 words**, and the only
 * thing that varies across all 192 is the paper name and four numbers; the
 * prose ("The real NDA paper, served whole …") and the entire Instructions
 * block are byte-identical on every one, because the questions themselves sit
 * behind sign-in. That is a thin, near-duplicate page set, and Search Console
 * was being asked to crawl it at a measured 4 HTML fetches/day. The hubs stay:
 * they carry real per-exam and per-type content and they are what a person
 * searching "NDA previous year papers" would want.
 *
 * This does NOT make the mocks unreachable — they are still linked from
 * /mock/exam/<exam>/<type>. It stops advertising them for crawl.
 *
 * THE SUBTLE PART, and the reason this is a pure core rather than an inline
 * filter: the leaf rows are still what DATES the hubs. `/mock/exam/nda` must
 * carry the newest updated_at of NDA's mocks even though not one of those
 * mocks is emitted. A naive edit deletes the row loop and silently stamps
 * every hub with the build clock — which is the exact defect
 * tests/seo-lastmod.test.ts exists to prevent.
 */
import { describe, it, expect } from "vitest";
import {
  buildMockSitemapEntries,
  type MockSitemapRow,
} from "@/lib/mocks/sitemapEntries";
import type { MockExamNav } from "@/lib/mocks/mocksNav";

const EXAMS: MockExamNav[] = [
  { slug: "nda", displayName: "NDA", examName: "NDA" },
  { slug: "cds", displayName: "CDS", examName: "CDS" },
];

const row = (o: Partial<MockSitemapRow> & { slug: string }): MockSitemapRow => ({
  updatedAt: "2026-01-01T00:00:00.000Z",
  source: "pyq",
  scope: "full",
  examName: "NDA",
  ...o,
});

const ROWS: MockSitemapRow[] = [
  row({ slug: "nda-2017-apr-maths", updatedAt: "2026-03-01T00:00:00.000Z" }),
  row({ slug: "nda-2018-apr-maths", updatedAt: "2026-09-14T00:00:00.000Z" }),
  row({ slug: "nda-practice-1", updatedAt: "2026-05-05T00:00:00.000Z", source: "practice" }),
  row({ slug: "cds-2019-gk", updatedAt: "2026-07-07T00:00:00.000Z", examName: "CDS" }),
];

const paths = (rows = ROWS) => buildMockSitemapEntries(rows, EXAMS).map((e) => e.path);
const byPath = (p: string, rows = ROWS) =>
  buildMockSitemapEntries(rows, EXAMS).find((e) => e.path === p);

describe("buildMockSitemapEntries", () => {
  it("emits NO individual mock page", () => {
    // The whole point. Asserted over every returned path rather than by
    // counting, so a future row shape cannot sneak a leaf back in.
    const leaves = paths().filter((p) => /^\/mock\/[a-z0-9-]+$/.test(p) && p !== "/mock");
    expect(leaves).toEqual([]);
  });

  it("emits the index, one page per exam, and one page per non-empty type", () => {
    expect(paths().sort()).toEqual(
      [
        "/mock",
        "/mock/exam/cds",
        "/mock/exam/cds/past-papers",
        "/mock/exam/nda",
        "/mock/exam/nda/past-papers",
        "/mock/exam/nda/practice",
      ].sort()
    );
  });

  it("dates an exam hub from mocks it no longer emits", () => {
    // The regression guard. NDA's newest is 2026-09-14, which belongs to a row
    // that produces no URL of its own.
    expect(byPath("/mock/exam/nda")?.iso).toBe("2026-09-14T00:00:00.000Z");
    expect(byPath("/mock/exam/cds")?.iso).toBe("2026-07-07T00:00:00.000Z");
  });

  it("dates a TYPE hub from only that type's mocks", () => {
    // past-papers holds the 2017 and 2018 rows; practice holds only 2026-05-05.
    expect(byPath("/mock/exam/nda/past-papers")?.iso).toBe("2026-09-14T00:00:00.000Z");
    expect(byPath("/mock/exam/nda/practice")?.iso).toBe("2026-05-05T00:00:00.000Z");
  });

  it("dates /mock from the newest mock anywhere", () => {
    expect(byPath("/mock")?.iso).toBe("2026-09-14T00:00:00.000Z");
  });

  it("omits a type page that has no published mock", () => {
    // "sectional" is a declared type with nothing in it: reachable via the
    // picker, but an empty state is not a page worth advertising.
    expect(paths()).not.toContain("/mock/exam/nda/sectional");
    expect(paths()).not.toContain("/mock/exam/cds/practice");
  });

  it("still lists an exam that has no published mock, undated", () => {
    // The exam page renders an honest empty state; dropping it would make a
    // registry exam unreachable from the sitemap the moment its mocks are
    // unpublished.
    const only = [row({ slug: "cds-x", examName: "CDS" })];
    expect(paths(only)).toContain("/mock/exam/nda");
    expect(byPath("/mock/exam/nda", only)?.iso).toBeNull();
  });

  it("ignores a row with no exam name or no timestamp rather than throwing", () => {
    const messy: MockSitemapRow[] = [
      row({ slug: "orphan", examName: null }),
      row({ slug: "undated", updatedAt: null }),
      row({ slug: "nda-good", updatedAt: "2026-04-04T00:00:00.000Z" }),
    ];
    expect(byPath("/mock/exam/nda", messy)?.iso).toBe("2026-04-04T00:00:00.000Z");
  });

  it("returns the index even when there are no mocks at all", () => {
    expect(paths([])).toContain("/mock");
    expect(byPath("/mock", [])?.iso).toBeNull();
  });

  it("treats a null source/scope as a full past paper", () => {
    // Mirrors the defaults the loader applied before this core existed.
    const nulls = [row({ slug: "n", source: null, scope: null })];
    expect(paths(nulls)).toContain("/mock/exam/nda/past-papers");
  });
});
