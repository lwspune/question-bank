/**
 * Pure core for resolving a sitemap `<lastmod>` per URL.
 *
 * WHY THIS EXISTS. Until 2026-08-09 `src/app/sitemap.ts` read the clock once
 * (`const now = new Date()`) and stamped that single reading onto 33 of its 34
 * entry groups — 984 of 988 URLs. The sitemap is generated at build time, so in
 * practice every deploy announced that all 984 pages had just changed, including
 * the ~54% of pushes that touch only docs, tests or ingestion scripts.
 *
 * A lastmod that moves for everything carries exactly as much information as no
 * lastmod at all, and Google explicitly discounts one it has learned not to
 * trust. With ~942 URLs sitting in "Discovered – currently not indexed", that
 * date is the one lever available for saying "this chapter is the one that
 * changed" — so it needs to be true per URL.
 *
 * Three sources, in descending order of truthfulness:
 *   1. Question landing pages — `max(created_at)` of the chapter's PUBLIC
 *      questions, straight from the DB (migration 0072).
 *   2. Notes + guides — the git commit date of the chapter's `_data` directory,
 *      captured into `contentDates.generated.ts` by `npm run seo:dates`.
 *   3. Anything genuinely aggregate (homepage, /browse, hub pages) — the build
 *      date, which for those pages is honest: they change whenever anything does.
 *
 * Nothing here is a stale-date hazard: every fallback path yields an OLDER date
 * than reality, never a newer one. Under-claiming a change is safe; over-claiming
 * is the defect being fixed.
 */

/** A map of route path → ISO timestamp. Keys must be absolute, slash-prefixed,
 *  and carry no trailing slash (`/notes/nda-maths/statistics`). */
export type ContentDateMap = Readonly<Record<string, string>>;

/**
 * Parse an ISO timestamp, falling back when it is missing or unparseable.
 *
 * The fallback on an unparseable string is load-bearing: `new Date("nope")` is
 * an Invalid Date, which `MetadataRoute.Sitemap` serialises to `null` and can
 * take the whole `<url>` entry down. A stale-but-valid date is always the safer
 * failure mode for a file a crawler parses strictly.
 */
export function parseIsoDate(
  iso: string | null | undefined,
  fallback: Date
): Date {
  if (!iso) return fallback;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

/**
 * Resolve a route's content date, inheriting from the nearest recorded ancestor.
 *
 * Notes subtopic pages and guide sub-routes have no `_data` directory of their
 * own — they ship with their chapter/subject — so `/notes/x/y/some-subtopic`
 * correctly takes `/notes/x/y`'s date.
 *
 * Matching is SEGMENT-WISE, not `startsWith`. That is the whole reason this is a
 * function rather than a lookup: a prefix test would hand `/guide/nda-maths-advanced`
 * the date of `/guide/nda-maths` and silently date an unrelated subtree from a
 * neighbour that merely shares a name prefix.
 */
export function contentDateFor(
  routePath: string,
  dates: ContentDateMap,
  fallback: Date
): Date {
  const exact = dates[routePath];
  if (exact) return parseIsoDate(exact, fallback);

  // Walk up one segment at a time; the first hit going up IS the longest
  // matching ancestor, so no length comparison is needed.
  const segments = routePath.split("/");
  for (let i = segments.length - 1; i > 1; i--) {
    const ancestor = segments.slice(0, i).join("/");
    const hit = dates[ancestor];
    if (hit) return parseIsoDate(hit, fallback);
  }

  return fallback;
}

/**
 * The most recent of a set of dates — for pages that aggregate others (the
 * `/notes` index, a per-exam hub), where "last modified" honestly means "when
 * did anything I list last change".
 */
export function newestOf(
  isoDates: readonly (string | null | undefined)[],
  fallback: Date
): Date {
  let newest: Date | null = null;
  for (const iso of isoDates) {
    if (!iso) continue;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) continue;
    if (!newest || d > newest) newest = d;
  }
  return newest ?? fallback;
}
