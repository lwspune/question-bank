import type { ChapterLanding } from "./landing";

/**
 * The public `/questions` landing page for one chapter, matched by exam,
 * subject and chapter NAME — the same join the notes and guides use against
 * the DB taxonomy. All three must match: chapter names repeat across exams
 * ("Conic Sections" is NDA, JEE and MHT-CET) and across subjects.
 *
 * Null when the chapter has no landing page, which happens below
 * MIN_QUESTIONS_FOR_LANDING. The caller then renders no link rather than a
 * guessed one. Pure — spec in tests/find-chapter-landing.test.ts.
 */
export function findChapterLanding(
  landings: readonly ChapterLanding[],
  key: { examName: string; subjectName: string; chapterName: string }
): ChapterLanding | null {
  return (
    landings.find(
      (l) =>
        l.examName === key.examName &&
        l.subjectName === key.subjectName &&
        l.chapterName === key.chapterName
    ) ?? null
  );
}
