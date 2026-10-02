import type { SubtopicNote } from "@/app/notes/_types";
import { CDSEN_FB_SENTENCE_BLANKS_NOTE } from "./fb-sentence-blanks";

export { CDSEN_FILL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-english/fill-in-the-blanks/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsen-` here and `cdsen-` on concept slugs.
 *
 * CDS English Fill in the Blanks: 1 pages, re-cut by technique 2026-10-02.
 */
export const CDSEN_FILL_NOTES: Record<string, SubtopicNote> = {
  "cdsen-fb-sentence-blanks": CDSEN_FB_SENTENCE_BLANKS_NOTE,
};

export const CDSEN_FILL_SLUGS = Object.keys(CDSEN_FILL_NOTES);
