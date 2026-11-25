import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_CC_WERNER_NOTE } from "./werner";
import { CB_CH_CC_TERMS_NOTE } from "./terms";
import { CB_CH_CC_NOMENCLATURE_NOTE } from "./nomenclature";
import { CB_CH_CC_ISOMERISM_NOTE } from "./isomerism";
import { CB_CH_CC_BONDING_NOTE } from "./bonding";
import { CB_CH_CC_CARBONYLS_NOTE } from "./carbonyls";
import { CB_CH_CC_APPLICATIONS_NOTE } from "./applications";

export { CB_CH_CC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/coordination-compounds/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-cc-` here and `cbccc-` on concept slugs.
 *
 * 7 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_CC_NOTES: Record<string, SubtopicNote> = {
  "cbc-cc-werner": CB_CH_CC_WERNER_NOTE,
  "cbc-cc-terms": CB_CH_CC_TERMS_NOTE,
  "cbc-cc-nomenclature": CB_CH_CC_NOMENCLATURE_NOTE,
  "cbc-cc-isomerism": CB_CH_CC_ISOMERISM_NOTE,
  "cbc-cc-bonding": CB_CH_CC_BONDING_NOTE,
  "cbc-cc-carbonyls": CB_CH_CC_CARBONYLS_NOTE,
  "cbc-cc-applications": CB_CH_CC_APPLICATIONS_NOTE,
};

export const CB_CH_CC_SLUGS = Object.keys(CB_CH_CC_NOTES);
