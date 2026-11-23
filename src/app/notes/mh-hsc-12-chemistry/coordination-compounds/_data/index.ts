import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_CC_LIGANDS_NOTE } from "./ligands";
import { HSC_CH_CC_TERMS_NOTE } from "./terms";
import { HSC_CH_CC_CLASSIFICATION_NOTE } from "./classification";
import { HSC_CH_CC_NOMENCLATURE_NOTE } from "./nomenclature";
import { HSC_CH_CC_ISOMERISM_NOTE } from "./isomerism";
import { HSC_CH_CC_STABILITY_NOTE } from "./stability";
import { HSC_CH_CC_BONDING_NOTE } from "./bonding";
import { HSC_CH_CC_APPLICATIONS_NOTE } from "./applications";

export { HSC_CH_CC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/coordination-compounds/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-cc-` here and `hscccc-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_CC_NOTES: Record<string, SubtopicNote> = {
  "hscc-cc-ligands": HSC_CH_CC_LIGANDS_NOTE,
  "hscc-cc-terms": HSC_CH_CC_TERMS_NOTE,
  "hscc-cc-classification": HSC_CH_CC_CLASSIFICATION_NOTE,
  "hscc-cc-nomenclature": HSC_CH_CC_NOMENCLATURE_NOTE,
  "hscc-cc-isomerism": HSC_CH_CC_ISOMERISM_NOTE,
  "hscc-cc-stability": HSC_CH_CC_STABILITY_NOTE,
  "hscc-cc-bonding": HSC_CH_CC_BONDING_NOTE,
  "hscc-cc-applications": HSC_CH_CC_APPLICATIONS_NOTE,
};

export const HSC_CH_CC_SLUGS = Object.keys(HSC_CH_CC_NOTES);
