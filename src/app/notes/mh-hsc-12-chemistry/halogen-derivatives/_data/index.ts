import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_HD_CLASSIFICATION_NOTE } from "./classification";
import { HSC_CH_HD_NOMENCLATURE_NOTE } from "./nomenclature";
import { HSC_CH_HD_PREPARATION_NOTE } from "./preparation";
import { HSC_CH_HD_PHYSICAL_NOTE } from "./physical";
import { HSC_CH_HD_OPTICAL_NOTE } from "./optical";
import { HSC_CH_HD_SUBSTITUTION_NOTE } from "./substitution";
import { HSC_CH_HD_METALS_NOTE } from "./metals";
import { HSC_CH_HD_POLYHALOGEN_NOTE } from "./polyhalogen";

export { HSC_CH_HD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/halogen-derivatives/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-hd-` here and `hscchd-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_HD_NOTES: Record<string, SubtopicNote> = {
  "hscc-hd-classification": HSC_CH_HD_CLASSIFICATION_NOTE,
  "hscc-hd-nomenclature": HSC_CH_HD_NOMENCLATURE_NOTE,
  "hscc-hd-preparation": HSC_CH_HD_PREPARATION_NOTE,
  "hscc-hd-physical": HSC_CH_HD_PHYSICAL_NOTE,
  "hscc-hd-optical": HSC_CH_HD_OPTICAL_NOTE,
  "hscc-hd-substitution": HSC_CH_HD_SUBSTITUTION_NOTE,
  "hscc-hd-metals": HSC_CH_HD_METALS_NOTE,
  "hscc-hd-polyhalogen": HSC_CH_HD_POLYHALOGEN_NOTE,
};

export const HSC_CH_HD_SLUGS = Object.keys(HSC_CH_HD_NOTES);
