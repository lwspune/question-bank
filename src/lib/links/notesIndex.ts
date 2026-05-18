/**
 * Single source of truth for "which chapters have /notes content shipped"
 * — used by both `getQuestionResources` (per-question backlink chip on the
 * bank) and the `/guide/nda-maths` CHAPTER_TABLE (notes chip per chapter).
 *
 * Today: NDA Maths Statistics + Vectors. Add a new chapter by appending one
 * entry. Chapter key is the canonical DB chapter name.
 */

type ChapterNotesEntry = {
  /** URL slug under /notes/<exam-subject>/. */
  chapterSlug: string;
  /** Subject-anchored route prefix (e.g. "nda-maths"). */
  subjectRoute: string;
  /** Short chip label, e.g. "Statistics notes". */
  chipLabel: string;
};

const NDA_MATHS_NOTES: Record<string, ChapterNotesEntry> = {
  Statistics: {
    chapterSlug: "statistics",
    subjectRoute: "nda-maths",
    chipLabel: "Statistics notes",
  },
  Vectors: {
    chapterSlug: "vectors",
    subjectRoute: "nda-maths",
    chipLabel: "Vectors notes",
  },
};

export function hasChapterNotes(chapterName: string): boolean {
  return Boolean(NDA_MATHS_NOTES[chapterName]);
}

export function getNotesChapterHref(chapterName: string): string | null {
  const entry = NDA_MATHS_NOTES[chapterName];
  if (!entry) return null;
  return `/notes/${entry.subjectRoute}/${entry.chapterSlug}`;
}

export function getNotesChapterLabel(chapterName: string): string | null {
  return NDA_MATHS_NOTES[chapterName]?.chipLabel ?? null;
}

/** Internal — exposed so `questionResources` can derive subtopic-deep URLs. */
export function getNotesChapterEntry(
  chapterName: string
): ChapterNotesEntry | null {
  return NDA_MATHS_NOTES[chapterName] ?? null;
}
