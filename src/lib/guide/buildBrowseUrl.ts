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
    q: partial.q ?? "",
    page: 1,
  };
  const params = buildSearchParams(filters).toString();
  return params ? `/browse?${params}` : "/browse";
}
