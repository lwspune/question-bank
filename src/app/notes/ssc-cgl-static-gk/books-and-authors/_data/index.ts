import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_SBA_NONFICTION_NOTE } from "./nonfiction";
import { SSC_SBA_FICTION_NOTE } from "./fiction";

export { SSC_BOOKS_AND_AUTHORS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-static-gk/books-and-authors/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-sba-` here and `sscsba-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/books-and-authors.ts). Order matches `subtopicOrder`.
 */
export const SSC_BOOKS_AND_AUTHORS_NOTES: Record<string, SubtopicNote> = {
  "ssc-sba-nonfiction": SSC_SBA_NONFICTION_NOTE,
  "ssc-sba-fiction": SSC_SBA_FICTION_NOTE,
};

export const SSC_BOOKS_AND_AUTHORS_SLUGS = Object.keys(SSC_BOOKS_AND_AUTHORS_NOTES);
