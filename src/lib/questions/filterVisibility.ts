import type { Filters } from "./filters";

/**
 * Progressive reveal for the taxonomy cascade on /browse: Subject appears once
 * an exam is picked, Chapters once a subject is, Subtopics once a chapter is.
 * Clarity (2026-10-01) recorded a visitor opening Chapters before any subject,
 * meeting the empty "Pick a subject to see chapters" box twice, and leaving.
 * Subject followed on 2026-10-05 (owner): subjects belong to one exam, so a
 * greyed-out "Pick an exam first" box stood for a choice that did not exist.
 *
 * An ACTIVE filter always stays visible, whatever its parent: the /notes drill
 * link sets subtopics with no chapter, and a filter that is on but hidden can be
 * neither seen nor cleared. `applyPartial` clears children when a parent
 * changes, so hiding never strands a selection made in the filter bar itself.
 */
export function showsSubjectFilter(f: Pick<Filters, "examId" | "subjectId">): boolean {
  return Boolean(f.examId) || Boolean(f.subjectId);
}

export function showsChapterFilter(f: Pick<Filters, "subjectId" | "chapterIds">): boolean {
  return Boolean(f.subjectId) || f.chapterIds.length > 0;
}

export function showsSubtopicFilter(f: Pick<Filters, "chapterIds" | "subtopicIds">): boolean {
  return f.chapterIds.length > 0 || f.subtopicIds.length > 0;
}
