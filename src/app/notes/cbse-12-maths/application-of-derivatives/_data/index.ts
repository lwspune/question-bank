import type { SubtopicNote } from "@/app/notes/_types";
import { CB_MA_AD_RATES_NOTE } from "./rates";
import { CB_MA_AD_INCREASING_NOTE } from "./increasing";
import { CB_MA_AD_MAXIMA_NOTE } from "./maxima";
import { CB_MA_AD_ABSOLUTE_NOTE } from "./absolute";

export { CB_MA_AD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-maths/application-of-derivatives/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbm-ad-` here and `cbmad-` on concept slugs.
 *
 * 4 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_MA_AD_NOTES: Record<string, SubtopicNote> = {
  "cbm-ad-rates": CB_MA_AD_RATES_NOTE,
  "cbm-ad-increasing": CB_MA_AD_INCREASING_NOTE,
  "cbm-ad-maxima": CB_MA_AD_MAXIMA_NOTE,
  "cbm-ad-absolute": CB_MA_AD_ABSOLUTE_NOTE,
};

export const CB_MA_AD_SLUGS = Object.keys(CB_MA_AD_NOTES);
