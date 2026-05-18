/**
 * Chapter-level notes lookups — used by `getQuestionResources` (per-question
 * backlink chip on the bank) and the `/guide/nda-maths` CHAPTER_TABLE (notes
 * chip per chapter).
 *
 * Derives from `NOTES_CHAPTERS` — the single source of truth for shipped
 * chapters. Adding a new chapter to that registry automatically updates
 * every lookup here.
 */

import {
  NOTES_CHAPTERS,
  type NotesChapterRegistration,
} from "@/lib/notes/chapters";

type ChapterNotesEntry = {
  chapterSlug: string;
  subjectRoute: string;
  chipLabel: string;
};

const BY_CHAPTER_NAME: Map<string, ChapterNotesEntry> = new Map();
for (const c of NOTES_CHAPTERS) {
  BY_CHAPTER_NAME.set(c.chapter.chapterName, {
    chapterSlug: c.chapterSlug,
    subjectRoute: c.subjectRoute,
    chipLabel: c.chipLabel,
  });
}

export function hasChapterNotes(chapterName: string): boolean {
  return BY_CHAPTER_NAME.has(chapterName);
}

export function getNotesChapterHref(chapterName: string): string | null {
  const entry = BY_CHAPTER_NAME.get(chapterName);
  if (!entry) return null;
  return `/notes/${entry.subjectRoute}/${entry.chapterSlug}`;
}

export function getNotesChapterLabel(chapterName: string): string | null {
  return BY_CHAPTER_NAME.get(chapterName)?.chipLabel ?? null;
}

/** Internal — exposed so `questionResources` can derive subtopic-deep URLs. */
export function getNotesChapterEntry(
  chapterName: string
): ChapterNotesEntry | null {
  return BY_CHAPTER_NAME.get(chapterName) ?? null;
}

export type { NotesChapterRegistration };
