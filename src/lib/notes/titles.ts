/**
 * The <title> and search description of every /notes page, in one place so a
 * test can check all of them against the registry without rendering a page.
 * The builders in src/app/notes/_components call these. Rules:
 * src/lib/seo/title.ts; spec: tests/notes-titles.test.ts (length + uniqueness
 * across the whole registry, and the words below).
 *
 * WORDS STUDENTS SEARCH (2026-10-15). Asked "where can I get NDA maths notes",
 * ChatGPT answered "free NDA Maths notes PDF chapter-wise" and named three
 * other sites. Ours were titled "Teaching Notes" and never said free,
 * chapter-wise or PDF, though every chapter has a free PDF handout (a free
 * sign-in). Hub and chapter titles now say so, joined with a colon rather than
 * fitTitle's em dash. Subtopic titles are unchanged.
 */
import { BRAND, TITLE_MAX, fitTitle } from "@/lib/seo/title";
import { chapterCardBlurb } from "@/lib/notes/cardBlurb";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";

/** A chapter name with its dashes as commas ("Indian Geography, Physical Features"): no em dashes in a title. */
function plainName(name: string): string {
  return name.replace(/\s+[\u2014\u2013]\s+/g, ", ");
}

/** The first candidate that fits a search result, longest first; the last is trimmed by fitTitle if even it does not. */
function firstThatFits(candidates: string[]): string {
  return (
    candidates.find((c) => c.length <= TITLE_MAX) ??
    fitTitle(candidates[candidates.length - 1], [], { shortenLead: false })
  );
}

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
 * /notes/<subject>/<chapter>. The colon form keeps it apart from a topic page
 * of the same name (those join with fitTitle's dash).
 */
export function notesChapterTitle(c: NotesChapterRegistration): string {
  const name = plainName(c.titleName ?? c.chapter.chapterName);
  const subject = c.subjectDisplay;
  return firstThatFits([
    `${name}: ${subject} Notes (Free PDF) · ${BRAND}`,
    `${name}: ${subject} Notes (Free PDF)`,
    // The exam and subject outrank "Free PDF": they are what a student types.
    `${name}: ${subject} Notes`,
    `${name} Notes (Free PDF)`,
    `${name} Notes`,
  ]);
}

function hubTitle(lead: string): string {
  return firstThatFits([
    `${lead} Notes: Free Chapter-wise PDF · ${BRAND}`,
    `${lead} Notes: Free Chapter-wise PDF`,
    `${lead} Notes (Free PDF)`,
    `${lead} Notes`,
  ]);
}

/** /notes/<subject> */
export function notesSubjectTitle(subjectDisplay: string): string {
  return hubTitle(subjectDisplay);
}

/** /notes/<exam> */
export function notesExamTitle(examName: string): string {
  return hubTitle(examName);
}

/** /notes */
export const NOTES_INDEX_TITLE = firstThatFits(["Free Chapter-wise Notes for Entrance & Board Exams (PDF)"]);

const PDF_LINE = "Read online, or download any chapter as a PDF with a free sign-in.";
const s = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** /notes/<subject>: the search description. The page's own intro is unchanged. */
export function notesSubjectDescription(subjectDisplay: string, chapters: number): string {
  return `Free chapter-wise ${subjectDisplay} notes: ${s(chapters, "chapter")}, each with worked examples, formulas and the traps that cost marks. ${PDF_LINE}`;
}

/** /notes/<exam>: the search description. */
export function notesExamDescription(examName: string, subjects: number, chapters: number): string {
  return `Free chapter-wise ${examName} notes: ${s(subjects, "subject")} and ${s(chapters, "chapter")}, each with worked examples, formulas and the traps that cost marks. ${PDF_LINE}`;
}

/** /notes/<subject>/<chapter>: the key words first, then the chapter's own line. */
export function notesChapterDescription(c: NotesChapterRegistration): string {
  return `Free ${c.subjectDisplay} notes on ${plainName(c.chapter.chapterName)}, with a PDF to download. ${chapterCardBlurb(c.chapter)}`;
}

/** /notes */
export const NOTES_INDEX_DESCRIPTION =
  "Free chapter-wise notes for entrance and board exams: each subtopic with the idea, the formula, a worked example " +
  `and the mistakes that cost marks. ${PDF_LINE}`;
