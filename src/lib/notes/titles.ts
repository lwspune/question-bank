/**
 * The <title> of every /notes page, in one place so a test can check all of
 * them against the registry without rendering a page. The builders in
 * src/app/notes/_components call these. Rules: src/lib/seo/title.ts; spec:
 * tests/notes-titles.test.ts (length + uniqueness across the whole registry).
 */
import { fitTitle } from "@/lib/seo/title";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";

function subtopicTitle(c: NotesChapterRegistration, noteTitle: string, shortenLead: boolean): string {
  return fitTitle(noteTitle, [c.subjectDisplay, { text: c.chapter.chapterName, optional: true }, "Notes"], {
    shortenLead,
  });
}

/** /notes/<subject>/<chapter>/<subtopic> */
export function notesSubtopicTitle(c: NotesChapterRegistration, subtopicSlug: string): string | null {
  const note = c.notes[subtopicSlug];
  if (!note) return null;
  const title = subtopicTitle(c, note.title, true);
  // Siblings can share a prefix ("Solution of a Triangle — …"); cutting at the
  // dash would give them one title, so keep the distinguishing words instead.
  const clash = Object.entries(c.notes).some(
    ([slug, n]) => slug !== subtopicSlug && subtopicTitle(c, n.title, true) === title
  );
  return clash ? subtopicTitle(c, note.title, false) : title;
}

/**
 * /notes/<subject>/<chapter> — "Chapter Notes", so a chapter with one topic of
 * the same name does not share its topic page's title.
 */
export function notesChapterTitle(c: NotesChapterRegistration): string {
  return fitTitle(c.chapter.chapterName, [c.subjectDisplay, "Chapter Notes"]);
}

/** /notes/<subject> */
export function notesSubjectTitle(subjectDisplay: string): string {
  return fitTitle(`${subjectDisplay} Teaching Notes`);
}

/** /notes/<exam> */
export function notesExamTitle(examName: string): string {
  return fitTitle(`${examName} Teaching Notes`);
}

/** /notes */
export const NOTES_INDEX_TITLE = fitTitle("Teaching Notes for Entrance & Board Exams");
