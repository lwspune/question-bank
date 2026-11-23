import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_AK_CLASSIFICATION_NOTE } from "./classification";
import { HSC_CH_AK_NOMENCLATURE_NOTE } from "./nomenclature";
import { HSC_CH_AK_PREPARATION_NOTE } from "./preparation";
import { HSC_CH_AK_ACIDS_NOTE } from "./acids";
import { HSC_CH_AK_PHYSICAL_NOTE } from "./physical";
import { HSC_CH_AK_POLARITY_NOTE } from "./polarity";
import { HSC_CH_AK_REACTIONS_NOTE } from "./reactions";
import { HSC_CH_AK_CARBOXYL_NOTE } from "./carboxyl";

export { HSC_CH_AK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/aldehydes-ketones-and-carboxylic-acids/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-ak-` here and `hsccak-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_AK_NOTES: Record<string, SubtopicNote> = {
  "hscc-ak-classification": HSC_CH_AK_CLASSIFICATION_NOTE,
  "hscc-ak-nomenclature": HSC_CH_AK_NOMENCLATURE_NOTE,
  "hscc-ak-preparation": HSC_CH_AK_PREPARATION_NOTE,
  "hscc-ak-acids": HSC_CH_AK_ACIDS_NOTE,
  "hscc-ak-physical": HSC_CH_AK_PHYSICAL_NOTE,
  "hscc-ak-polarity": HSC_CH_AK_POLARITY_NOTE,
  "hscc-ak-reactions": HSC_CH_AK_REACTIONS_NOTE,
  "hscc-ak-carboxyl": HSC_CH_AK_CARBOXYL_NOTE,
};

export const HSC_CH_AK_SLUGS = Object.keys(HSC_CH_AK_NOTES);
