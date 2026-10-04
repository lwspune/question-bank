import { getNotesChapterBySlug } from "./chapters";
import { prettifyNotesSlug } from "./progress";

/**
 * The real names of a notes topic and its chapter, for surfaces that only
 * hold the slugs (a progress row). /me prettified the slugs and showed
 * "Jch Sbc Mole". Server-only: it reads the notes registry, which must never
 * reach a client bundle. Spec: tests/notes-topic-titles.test.ts.
 */
export function notesTopicTitles(row: {
  subjectRoute: string;
  chapterSlug: string;
  subtopicSlug: string;
}): { topic: string; chapter: string } {
  const reg = getNotesChapterBySlug(row.subjectRoute, row.chapterSlug);
  const note = reg?.notes[row.subtopicSlug];
  return {
    topic: note?.title ?? prettifyNotesSlug(row.subtopicSlug),
    chapter: reg?.chapter.chapterName ?? prettifyNotesSlug(row.chapterSlug),
  };
}
