/**
 * Which /board URLs the sitemap advertises — the index, the exam hubs, AND
 * every chapter leaf.
 *
 * WHY THIS EXISTS (2026-09-18). `src/app/sitemap.ts` did not contain the string
 * "board" anywhere. 283 chapter pages + 7 exam hubs + the index were live,
 * `index, follow`, self-canonical, 200, and linked from the always-on Board nav
 * tab — and none of them was ever advertised for crawl. Not a regression: they
 * were never added in the first place.
 *
 * WHY THE LEAVES GO IN, WHERE THE /mock LEAVES CAME OUT THE DAY BEFORE. The
 * 2026-09-17 trim removed 192 `/mock/<slug>` URLs because each renders 98 words
 * whose prose is byte-identical across all of them — the questions sit behind
 * sign-in, so the page set is thin and near-duplicate. A board chapter is the
 * opposite: measured against production, `/board/cbse-10/mathematics/real-numbers`
 * renders **4,969 words** of publicly-readable textbook solutions with no
 * sign-in gate. The rule being applied in both places is the same one — "is the
 * leaf substantive and public?" — and it simply answers differently here. Do
 * not "make /board consistent with /mock"; the consistency is in the test, not
 * in the verdict.
 *
 * THE DATING RULE, inherited from src/lib/seo/lastmod.ts: nothing is dated from
 * the build clock. A leaf carries the newest PUBLIC question in its own chapter;
 * a hub carries the newest among its leaves; the index carries the newest
 * anywhere. A null date stays null and is dropped by the caller in favour of the
 * build date — under-claiming a change, never over-claiming it.
 *
 * Pure — no DB, no Date, no SITE_URL. The caller turns `path` into an absolute
 * URL and `iso` into a Date via parseIsoDate(iso, buildDate).
 */

/** One board chapter with section-structured PUBLIC rows, as the loader reads it. */
export type BoardSitemapChapter = {
  /** Registry slug of the board exam, e.g. "cbse-10". */
  examSlug: string;
  /** Subject segment of the URL, e.g. "mathematics". */
  subjectRoute: string;
  /** Chapter segment of the URL, e.g. "real-numbers". */
  chapterSlug: string;
  /**
   * ISO timestamp of the newest PUBLIC question in the chapter, or null when the
   * lookup returned nothing. `questions` has no `updated_at`, so an edit to an
   * existing row does not move this — that under-claims rather than over-claims.
   */
  iso: string | null;
};

export type BoardSitemapEntry = {
  /** Site-relative path, e.g. "/board/cbse-10/mathematics/real-numbers". */
  path: string;
  /** Newest contributing timestamp, or null when nothing contributed. */
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
 * Build the /board sitemap entries.
 *
 * `examSlugs` comes from the REGISTRY (BOARD_EXAMS), not from the chapter rows,
 * for the same reason the /mock builder takes its exam list from the registry: a
 * hub emitted only when content happens to exist would let an ingest hiccup
 * silently drop a whole exam out of the sitemap with no error. A registered exam
 * with no backfilled chapters gets its hub with a null date.
 *
 * Conversely a chapter whose exam is NOT a registered board exam is skipped —
 * `/board/<non-board-exam>/…` has no route and would 404, and advertising a dead
 * URL for crawl is worse than omitting a live one on a site with four HTML
 * fetches a day to spend.
 */
export function buildBoardSitemapEntries(
  chapters: BoardSitemapChapter[],
  examSlugs: readonly string[]
): BoardSitemapEntry[] {
  const registered = new Set(examSlugs);

  /** exam slug -> newest ISO among its chapters. */
  const byExam = new Map<string, string | null>();
  /** path -> newest ISO, which also de-duplicates repeated chapters. */
  const byLeaf = new Map<string, string | null>();
  /** Insertion order of leaf paths, so output order is stable and readable. */
  const leafOrder: string[] = [];
  let newestAll: string | null = null;

  for (const c of chapters) {
    if (!registered.has(c.examSlug)) continue;

    const path = `/board/${c.examSlug}/${c.subjectRoute}/${c.chapterSlug}`;
    if (!byLeaf.has(path)) leafOrder.push(path);
    byLeaf.set(path, newerIso(byLeaf.get(path) ?? null, c.iso));

    byExam.set(c.examSlug, newerIso(byExam.get(c.examSlug) ?? null, c.iso));
    newestAll = newerIso(newestAll, c.iso);
  }

  const hubEntries: BoardSitemapEntry[] = examSlugs.map((slug) => ({
    path: `/board/${slug}`,
    iso: byExam.get(slug) ?? null,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const leafEntries: BoardSitemapEntry[] = leafOrder.map((path) => ({
    path,
    iso: byLeaf.get(path) ?? null,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      path: "/board",
      iso: newestAll,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...hubEntries,
    ...leafEntries,
  ];
}
