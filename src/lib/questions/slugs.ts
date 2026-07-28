/**
 * URL slugs for the public `/questions/<exam>/<subject>/<chapter>` landing pages.
 *
 * These are permanent public addresses once indexed, so the rules live here with
 * a spec pinned against real taxonomy names. Deliberately derived FROM the
 * taxonomy name rather than stored as a column: the DB stays the single source
 * of truth, and a new chapter gets a landing page with no extra bookkeeping.
 *
 * The cost of deriving is collision risk — two names in the same subject can
 * slugify identically. `dedupeBySlug` makes that safe by publishing only the
 * first claimant, so a URL can never resolve two ways.
 */

/** Anything carrying a human-readable taxonomy name. */
export type Named = { name: string };

/**
 * Taxonomy name → URL segment. Accents stripped, punctuation dropped, runs of
 * separators collapsed. `&` becomes a plain separator (not "and"), so
 * "Work, Energy & Power" reads as `work-energy-power`.
 */
export function slugifyName(name: string): string {
  return name
    .normalize("NFD")
    // Strip combining accent marks (é → e) so URLs stay ASCII.
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Resolve a URL segment back to the taxonomy row it came from, or null. */
export function findBySlug<T extends Named>(
  items: readonly T[],
  slug: string
): T | null {
  const target = slug.toLowerCase();
  return items.find((item) => slugifyName(item.name) === target) ?? null;
}

/**
 * Drop any item whose slug was already claimed by an earlier item, so the
 * published set is one-URL-one-page. First occurrence wins — deterministic as
 * long as the caller's ordering is (ours is DB-ordered by name/order_index).
 */
export function dedupeBySlug<T extends Named>(items: readonly T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    const slug = slugifyName(item.name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push(item);
  }
  return out;
}
