import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_AP_CLASSIFICATION_NOTE } from "./classification";
import { CB_CH_AP_NOMENCLATURE_NOTE } from "./nomenclature";
import { CB_CH_AP_ALCOHOLS_NOTE } from "./alcohols";
import { CB_CH_AP_ETHERS_NOTE } from "./ethers";

export { CB_CH_AP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/alcohols-phenols-and-ethers/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-ap-` here and `cbcap-` on concept slugs.
 *
 * 4 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_AP_NOTES: Record<string, SubtopicNote> = {
  "cbc-ap-classification": CB_CH_AP_CLASSIFICATION_NOTE,
  "cbc-ap-nomenclature": CB_CH_AP_NOMENCLATURE_NOTE,
  "cbc-ap-alcohols": CB_CH_AP_ALCOHOLS_NOTE,
  "cbc-ap-ethers": CB_CH_AP_ETHERS_NOTE,
};

export const CB_CH_AP_SLUGS = Object.keys(CB_CH_AP_NOTES);
