export type Option = { id: string; name: string };
export type FacetedOption = Option & { count: number };
export type FacetCount = { id: string; count: number };

/**
 * Merge per-id facet counts into a list of options. Used by the browse filter
 * sidebar to render chapter and subtopic lists as `Name (N)` sorted by volume.
 *
 * - Options without a positive count are dropped (zero or missing → hidden).
 * - Output is sorted by count descending, with case-insensitive name as the
 *   stable tiebreaker.
 */
export function mergeAndSortFacets(
  options: Option[],
  facets: FacetCount[]
): FacetedOption[] {
  const counts = new Map<string, number>();
  for (const f of facets) counts.set(f.id, f.count);

  return options
    .map((o) => ({ ...o, count: counts.get(o.id) ?? 0 }))
    .filter((o) => o.count > 0)
    .sort(
      (a, b) =>
        b.count - a.count ||
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
}
