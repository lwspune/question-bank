import type { Filters } from "./filters";

/**
 * Progressive reveal for the taxonomy cascade on /browse: Chapters appears once
 * a subject is picked, Subtopics once a chapter is. Clarity (2026-10-01)
 * recorded a visitor opening Chapters before any subject, meeting the empty
 * "Pick a subject to see chapters" box twice, and leaving.
 *
 * An ACTIVE filter always stays visible, whatever its parent: the /notes drill
 * link sets subtopics with no chapter, and a filter that is on but hidden can be
 * neither seen nor cleared. `applyPartial` clears children when a parent
 * changes, so hiding never strands a selection made in the filter bar itself.
 */
export function showsChapterFilter(f: Pick<Filters, "subjectId" | "chapterIds">): boolean {
  return Boolean(f.subjectId) || f.chapterIds.length > 0;
}

export function showsSubtopicFilter(f: Pick<Filters, "chapterIds" | "subtopicIds">): boolean {
  return f.chapterIds.length > 0 || f.subtopicIds.length > 0;
}
