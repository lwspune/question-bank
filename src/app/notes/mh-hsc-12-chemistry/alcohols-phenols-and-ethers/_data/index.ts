import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_AP_NOMENCLATURE_NOTE } from "./nomenclature";
import { HSC_CH_AP_ALCOHOLS_NOTE } from "./alcohols";
import { HSC_CH_AP_ETHERS_NOTE } from "./ethers";

export { HSC_CH_AP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/alcohols-phenols-and-ethers/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-ap-` here and `hsccap-` on concept slugs.
 *
 * 3 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_AP_NOTES: Record<string, SubtopicNote> = {
  "hscc-ap-nomenclature": HSC_CH_AP_NOMENCLATURE_NOTE,
  "hscc-ap-alcohols": HSC_CH_AP_ALCOHOLS_NOTE,
  "hscc-ap-ethers": HSC_CH_AP_ETHERS_NOTE,
};

export const HSC_CH_AP_SLUGS = Object.keys(HSC_CH_AP_NOTES);
