import {
  buildSearchParams,
  EMPTY_FILTERS,
  type Difficulty,
  type Filters,
} from "@/lib/questions/filters";

export type BrowseFilters = {
  examId?: string | null;
  subjectId?: string | null;
  chapterIds?: string[];
  subtopicIds?: string[];
  difficulties?: Difficulty[];
  pyqYears?: number[];
  /** Curated question UUIDs OR'd with subtopicIds — used by long-tail
   *  (no-slug) principle drill links to surface cross-chapter questions not
   *  captured by named subtopics. TOP_20 (slugged) principles use
   *  `principleSlug` instead, which resolves via DB tags. */
  extraIds?: string[];
  /** TOP_20 principle slug — narrows /browse to the questions tagged with
   *  this principle in `question_principle_tags`. Mutually exclusive in
   *  practice with subtopicIds + extraIds (set one OR the other). */
  principleSlug?: string | null;
  q?: string;
};

/**
 * Build a /browse URL from a partial set of filters. Used by every "Drill X
 * questions →" CTA in the guide pages. Wraps the existing buildSearchParams
 * so the URL schema can only drift in one place — if /browse adds a new
 * filter, only buildSearchParams changes and all guide CTAs follow.
 *
 * Returns "/browse" with no query string when no filter is set.
 */
export function buildBrowseUrl(partial: BrowseFilters): string {
  const filters: Filters = {
    ...EMPTY_FILTERS,
    examId: partial.examId ?? null,
    subjectId: partial.subjectId ?? null,
    chapterIds: partial.chapterIds ?? [],
    subtopicIds: partial.subtopicIds ?? [],
    difficulties: partial.difficulties ?? [],
    pyqYears: partial.pyqYears ?? [],
    extraIds: partial.extraIds ?? [],
    principleSlug: partial.principleSlug ?? null,
    q: partial.q ?? "",
    page: 1,
  };
  const params = buildSearchParams(filters).toString();
  return params ? `/browse?${params}` : "/browse";
}
