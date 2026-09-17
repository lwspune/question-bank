/**
 * Which /mock URLs the sitemap advertises — the hubs, never the leaves.
 *
 * WHY THE LEAVES CAME OUT (2026-09-17). Each published mock used to carry its
 * own sitemap entry: 192 URLs, 13% of the whole sitemap. Measured against
 * production, `/mock/nda-2017-apr-maths` renders 98 words of body text, and
 * across all 192 pages the only things that differ are the paper name and four
 * numbers — the prose and the entire Instructions block are byte-identical,
 * because the questions sit behind sign-in. Search Console was being asked to
 * crawl 192 near-duplicate thin pages at a measured ~4 HTML fetches a day.
 *
 * They are NOT unreachable: /mock/exam/<exam>/<type> still links every one.
 * This stops advertising them for crawl, nothing more.
 *
 * The hubs stay because they are the pages a person would actually search for
 * ("NDA previous year papers") and they carry real, differing content.
 *
 * THE SUBTLE PART, and why this is a pure core rather than an inline filter:
 * the leaf rows are still what DATES the hubs. `/mock/exam/nda` must carry the
 * newest updated_at among NDA's mocks even though none of them is emitted.
 * Deleting the row loop would silently stamp every hub with the build clock,
 * the exact defect src/lib/seo/lastmod.ts + tests/seo-lastmod.test.ts exist to
 * prevent. tests/mock-sitemap-entries.test.ts pins it.
 *
 * Pure — no DB, no Date, no SITE_URL. The caller turns `path` into an absolute
 * URL and `iso` into a Date via parseIsoDate(iso, buildDate).
 */

import {
  MOCK_TYPES,
  mockTypeOf,
  mockTypeHref,
  type MockTypeSlug,
} from "@/lib/mocks/catalogue";
import type { MockExamNav } from "@/lib/mocks/mocksNav";
import type { MockScope, MockSource } from "@/lib/mocks/query";

/** One published mock, as the sitemap loader reads it. */
export type MockSitemapRow = {
  slug: string;
  updatedAt: string | null;
  source: MockSource | null;
  scope: MockScope | null;
  /** Canonical exam NAME (not slug) — how mock_tests joins to exams. */
  examName: string | null;
};

export type MockSitemapEntry = {
  /** Site-relative path, e.g. "/mock/exam/nda/past-papers". */
  path: string;
  /** Newest contributing updated_at, or null when nothing contributed. */
  iso: string | null;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

/** The later of two ISO strings; null only when both are null. */
function newerIso(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}

/**
 * Hub entries for the /mock surface, dated from the mocks beneath them.
 *
 * A type page is emitted only when that (exam, type) pair actually has a
 * published mock — a type page with nothing in it is reachable through the
 * picker, but an honest empty state is not a page worth advertising. An EXAM
 * page is always emitted, so that unpublishing an exam's mocks cannot drop a
 * registry exam out of the sitemap entirely.
 */
export function buildMockSitemapEntries(
  rows: MockSitemapRow[],
  exams: MockExamNav[]
): MockSitemapEntry[] {
  /** exam NAME -> newest ISO among its mocks. */
  const byExam = new Map<string, string | null>();
  /** "<exam NAME>|<type>" -> newest ISO among that pair's mocks. */
  const byExamType = new Map<string, string | null>();
  let newestAll: string | null = null;

  for (const m of rows) {
    // A row with no exam or no timestamp dates nothing. It is skipped rather
    // than defaulted, because defaulting it to the build clock would be the
    // very over-claim this module exists to avoid.
    if (!m.examName || !m.updatedAt) continue;

    const type: MockTypeSlug = mockTypeOf({
      source: m.source ?? "pyq",
      scope: m.scope ?? "full",
    });
    const key = `${m.examName}|${type}`;

    byExam.set(m.examName, newerIso(byExam.get(m.examName) ?? null, m.updatedAt));
    byExamType.set(key, newerIso(byExamType.get(key) ?? null, m.updatedAt));
    newestAll = newerIso(newestAll, m.updatedAt);
  }

  const examEntries: MockSitemapEntry[] = exams.map((e) => ({
    path: `/mock/exam/${e.slug}`,
    iso: byExam.get(e.examName) ?? null,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const typeEntries: MockSitemapEntry[] = exams.flatMap((e) =>
    MOCK_TYPES.flatMap((t) => {
      const iso = byExamType.get(`${e.examName}|${t.slug}`) ?? null;
      if (!iso) return [];
      return [
        {
          path: mockTypeHref(e.slug, t.slug),
          iso,
          changeFrequency: "weekly" as const,
          priority: 0.75,
        },
      ];
    })
  );

  return [
    {
      path: "/mock",
      iso: newestAll,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...examEntries,
    ...typeEntries,
  ];
}
