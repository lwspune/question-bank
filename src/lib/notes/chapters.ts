/**
 * Single source of truth for "what `/notes` chapters have shipped." Every
 * consumer (subtopicSlugRegistry, notesIndex, tagNames, sitemap, chapter
 * index page, notes-lint) derives from this list instead of re-importing
 * each chapter's _data block individually.
 *
 * Adding a new chapter is now:
 *   1. Write the _data modules + page template under
 *      src/app/notes/<subject-route>/<chapter-slug>/.
 *   2. Append one entry below. Every consumer picks it up automatically.
 *   3. Run a tagging session for question_concept_tags.
 *   4. `npm run notes:lint` + `npm run prepush`.
 */

import type { ChapterNote, SubtopicNote } from "@/app/notes/_types";
import {
  STATISTICS_CHAPTER,
  STATISTICS_NOTES,
  STATISTICS_SLUGS,
} from "@/app/notes/nda-maths/statistics/_data";
import {
  VECTORS_CHAPTER,
  VECTORS_NOTES,
  VECTORS_SLUGS,
} from "@/app/notes/nda-maths/vectors/_data";
import {
  PROBABILITY_CHAPTER,
  PROBABILITY_NOTES,
  PROBABILITY_SLUGS,
} from "@/app/notes/nda-maths/probability/_data";

export type NotesChapterRegistration = {
  /** Canonical exam name in the DB exams table (e.g. "NDA"). */
  examName: string;
  /** Canonical subject name in the DB subjects table (e.g. "Mathematics"). */
  subjectName: string;
  /** URL segment under /notes/ — e.g. "nda-maths". */
  subjectRoute: string;
  /** Human display for the subject, e.g. "NDA Maths" — used in hero eyebrow,
   *  page metadata, and the strategy-guide link label. */
  subjectDisplay: string;
  /** URL segment for the chapter — e.g. "statistics". */
  chapterSlug: string;
  /** Short chip label, e.g. "Statistics notes". */
  chipLabel: string;
  /** The ChapterNote (carries chapterName matching DB taxonomy). */
  chapter: ChapterNote;
  /** subtopicSlug → SubtopicNote record. */
  notes: Record<string, SubtopicNote>;
  /** Ordered subtopic slugs, matches the chapter page's render order. */
  slugs: readonly string[];
};

export const NOTES_CHAPTERS: readonly NotesChapterRegistration[] = [
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "statistics",
    chipLabel: "Statistics notes",
    chapter: STATISTICS_CHAPTER,
    notes: STATISTICS_NOTES,
    slugs: STATISTICS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "vectors",
    chipLabel: "Vectors notes",
    chapter: VECTORS_CHAPTER,
    notes: VECTORS_NOTES,
    slugs: VECTORS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "probability",
    chipLabel: "Probability notes",
    chapter: PROBABILITY_CHAPTER,
    notes: PROBABILITY_NOTES,
    slugs: PROBABILITY_SLUGS,
  },
];

/**
 * Look up a chapter registration by its (subjectRoute, chapterSlug) pair.
 * Returns null for an unknown combination.
 */
export function getNotesChapterBySlug(
  subjectRoute: string,
  chapterSlug: string
): NotesChapterRegistration | null {
  return (
    NOTES_CHAPTERS.find(
      (c) => c.subjectRoute === subjectRoute && c.chapterSlug === chapterSlug
    ) ?? null
  );
}

/**
 * All chapters under a given subject route, in registration order. Used by
 * the chapter-index page (and future subject landings) to render cards.
 * Returns an empty array for an unknown subject.
 */
export function getNotesChaptersForSubject(
  subjectRoute: string
): NotesChapterRegistration[] {
  return NOTES_CHAPTERS.filter((c) => c.subjectRoute === subjectRoute);
}
