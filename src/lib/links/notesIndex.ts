/**
 * Chapter-level notes lookups — used by `getQuestionResources` (per-question
 * backlink chip on the bank) and the `/guide/nda-maths` CHAPTER_TABLE (notes
 * chip per chapter).
 *
 * Derives from `NOTES_CHAPTERS` — the single source of truth for shipped
 * chapters. Adding a new chapter to that registry automatically updates
 * every lookup here.
 *
 * SCOPED BY (exam, subject) SINCE 2026-08-21, and that is load-bearing rather
 * than tidiness. Chapter NAMES legitimately repeat across exams — NDA Maths
 * and MHT-CET Maths both ship notes for "Vectors", "Differentiation",
 * "Indefinite Integration", "Differential Equations" and "Binomial
 * Distribution" (5 collisions, measured). The previous index was keyed on the
 * bare chapter name with a first-wins guard, which silently handed every one
 * of those to NDA. That was survivable only because the single consumer
 * (`resolveNotes`) was itself gated to NDA + Mathematics; the moment a second
 * exam earns its own cross-links the bare name stops identifying a chapter.
 */

import {
  NOTES_CHAPTERS,
  type NotesChapterRegistration,
} from "@/lib/notes/chapters";

/**
 * Identifies WHICH exam's notes are being asked for. A chapter name alone does
 * not — see the module header.
 */
export type NotesSubjectScope = {
  /** Canonical DB exam name, e.g. "NDA", "MHT-CET". */
  examName: string;
  /** Canonical DB subject name, e.g. "Mathematics", "Maths". */
  subjectName: string;
};

type ChapterNotesEntry = {
  chapterSlug: string;
  subjectRoute: string;
  chipLabel: string;
};

const chapterKey = (scope: NotesSubjectScope, chapterName: string): string =>
  `${scope.examName}::${scope.subjectName}::${chapterName}`;

const BY_CHAPTER: Map<string, ChapterNotesEntry> = new Map();
/**
 * Registrations that collide on the FULL (exam, subject, chapter) key. With
 * the key fully qualified a collision is no longer an expected cross-exam
 * repeat — it is an authoring mistake (two registrations claiming one
 * chapter), so it is collected for `notes:lint` rather than silently resolved.
 */
const COLLISIONS: string[] = [];

for (const c of NOTES_CHAPTERS) {
  const k = chapterKey(c, c.chapter.chapterName);
  if (BY_CHAPTER.has(k)) {
    COLLISIONS.push(k);
    continue; // first wins, but the duplicate is reported
  }
  BY_CHAPTER.set(k, {
    chapterSlug: c.chapterSlug,
    subjectRoute: c.subjectRoute,
    chipLabel: c.chipLabel,
  });
}

export function hasChapterNotes(
  scope: NotesSubjectScope,
  chapterName: string
): boolean {
  return BY_CHAPTER.has(chapterKey(scope, chapterName));
}

export function getNotesChapterHref(
  scope: NotesSubjectScope,
  chapterName: string
): string | null {
  const entry = BY_CHAPTER.get(chapterKey(scope, chapterName));
  if (!entry) return null;
  return `/notes/${entry.subjectRoute}/${entry.chapterSlug}`;
}

export function getNotesChapterLabel(
  scope: NotesSubjectScope,
  chapterName: string
): string | null {
  return BY_CHAPTER.get(chapterKey(scope, chapterName))?.chipLabel ?? null;
}

/** Internal — exposed so `questionResources` can derive subtopic-deep URLs. */
export function getNotesChapterEntry(
  scope: NotesSubjectScope,
  chapterName: string
): ChapterNotesEntry | null {
  return BY_CHAPTER.get(chapterKey(scope, chapterName)) ?? null;
}

/** Duplicate (exam, subject, chapter) registrations. Empty is the healthy state. */
export function findChapterRegistrationCollisions(): readonly string[] {
  return COLLISIONS;
}

export type { NotesChapterRegistration };
