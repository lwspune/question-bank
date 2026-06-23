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

// Chapter NAMES legitimately repeat across exams — NDA Maths and MHT-CET Maths
// both ship notes for "Vectors", "Differentiation" and "Indefinite Integration".
// This name-only index returns the FIRST registration (NDA Maths, which precedes
// MHT-CET in NOTES_CHAPTERS) — the canonical target for the nda-maths guide chips
// and the NDA-Mathematics-scoped getQuestionResources notes backlink. Last-wins
// would mis-route those NDA backlinks to the MHT-CET page; a subject-aware lookup
// would only be needed if MHT-CET ever gets its own chapter-name cross-links.
const BY_CHAPTER_NAME: Map<string, ChapterNotesEntry> = new Map();
for (const c of NOTES_CHAPTERS) {
  if (BY_CHAPTER_NAME.has(c.chapter.chapterName)) continue; // first (NDA) wins
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
