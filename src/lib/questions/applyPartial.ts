import type { Filters } from "./filters";

/**
 * Merge a partial filter change into a base set, applying the hierarchy
 * cascade (exam → subject → chapters → subtopics) and resetting page to 1.
 *
 * Shared by FilterBar in both "live" mode (desktop sidebar, commits to URL
 * on every change) and "staged" mode (mobile sheet, buffers changes until
 * an explicit Apply). Keeping the cascade in one pure function lets us
 * test it once and trust both call sites.
 *
 * Cascade rules (only when the field actually changes value):
 *   - examId changed     → reset subjectId, chapterIds, subtopicIds
 *   - subjectId changed  → reset chapterIds, subtopicIds
 *   - chapterIds changed → reset subtopicIds
 * Page is always reset to 1 because filtering invalidates pagination.
 */
export function applyPartial(base: Filters, partial: Partial<Filters>): Filters {
  let next: Filters = { ...base, ...partial, page: 1 };

  if ("examId" in partial && partial.examId !== base.examId) {
    next = { ...next, subjectId: null, chapterIds: [], subtopicIds: [] };
  }
  if ("subjectId" in partial && partial.subjectId !== base.subjectId) {
    next = { ...next, chapterIds: [], subtopicIds: [] };
  }
  if ("chapterIds" in partial) {
    next = { ...next, subtopicIds: [] };
  }

  return next;
}
