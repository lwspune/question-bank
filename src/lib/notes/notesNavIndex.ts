/**
 * The four facts per notes chapter that NAVIGATION needs — and nothing else.
 *
 * WHY THIS EXISTS (2026-10-02). `notesNav` (and through it `AppHeader`, on
 * every page) imported `NOTES_CHAPTERS`, which imports all 1,884 notes `_data`
 * modules, to read the exam, subject route, subject label and subtopic count
 * of each chapter. Every server render and every build worker therefore held
 * the whole editorial corpus in memory. The nav now reads
 * `notesNavIndex.generated.ts`, written from the registry by
 * `npm run notes:nav-index` and drift-checked by tests/notes-nav-index.test.ts.
 *
 * This module must stay content-free: it imports only a TYPE from the
 * registry, which the compiler erases.
 */
import type { NotesChapterRegistration } from "./chapters";

export type NotesNavEntry = {
  /** Canonical exam name, e.g. "NDA". */
  examName: string;
  /** URL segment under /notes/, e.g. "nda-maths". */
  subjectRoute: string;
  /** Display label, e.g. "NDA Maths". */
  subjectDisplay: string;
  /** URL segment for the chapter. */
  chapterSlug: string;
  subtopicCount: number;
};

/** Project the registry onto the nav's facts, in registry order. */
export function buildNotesNavIndex(
  chapters: readonly Pick<
    NotesChapterRegistration,
    "examName" | "subjectRoute" | "subjectDisplay" | "chapterSlug" | "slugs"
  >[]
): NotesNavEntry[] {
  return chapters.map((c) => ({
    examName: c.examName,
    subjectRoute: c.subjectRoute,
    subjectDisplay: c.subjectDisplay,
    chapterSlug: c.chapterSlug,
    subtopicCount: c.slugs.length,
  }));
}
