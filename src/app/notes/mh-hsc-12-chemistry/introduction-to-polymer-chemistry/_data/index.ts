import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_PO_CLASSIFICATION_NOTE } from "./classification";
import { HSC_CH_PO_POLYMERS_NOTE } from "./polymers";
import { HSC_CH_PO_MASS_NOTE } from "./mass";

export { HSC_CH_PO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/introduction-to-polymer-chemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-po-` here and `hsccpo-` on concept slugs.
 *
 * 3 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_PO_NOTES: Record<string, SubtopicNote> = {
  "hscc-po-classification": HSC_CH_PO_CLASSIFICATION_NOTE,
  "hscc-po-polymers": HSC_CH_PO_POLYMERS_NOTE,
  "hscc-po-mass": HSC_CH_PO_MASS_NOTE,
};

export const HSC_CH_PO_SLUGS = Object.keys(HSC_CH_PO_NOTES);
