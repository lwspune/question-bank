/**
 * The cached list, or a fresh read when the cached copy has nothing the page
 * wants (2026-10-15).
 *
 * The published-papers list is cached per page route and outlives a deploy, so
 * a publish without a cache-key bump left each subject page on its pre-publish
 * copy: CBSE 10 Maths + Science served a cached 404 while their exam page
 * listed them. It had happened twice before. A miss is now one extra read, and
 * only on a page that would otherwise 404.
 *
 * A failed fresh read throws: an error is not cached, a 404 is, for a day.
 */
export async function listWithFreshOnMiss<T>(
  cached: () => Promise<T[]>,
  fresh: () => Promise<T[]>,
  wanted: (item: T) => boolean
): Promise<T[]> {
  const list = await cached();
  if (list.some(wanted)) return list;
  return fresh();
}
