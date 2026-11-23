import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_TH_TERMS_NOTE } from "./terms";
import { HSC_CH_TH_WORK_NOTE } from "./work";
import { HSC_CH_TH_FIRSTLAW_NOTE } from "./firstlaw";
import { HSC_CH_TH_ENTHALPY_NOTE } from "./enthalpy";
import { HSC_CH_TH_THERMOCHEMISTRY_NOTE } from "./thermochemistry";
import { HSC_CH_TH_SPONTANEITY_NOTE } from "./spontaneity";

export { HSC_CH_TH_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/chemical-thermodynamics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-th-` here and `hsccth-` on concept slugs.
 *
 * 6 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_TH_NOTES: Record<string, SubtopicNote> = {
  "hscc-th-terms": HSC_CH_TH_TERMS_NOTE,
  "hscc-th-work": HSC_CH_TH_WORK_NOTE,
  "hscc-th-firstlaw": HSC_CH_TH_FIRSTLAW_NOTE,
  "hscc-th-enthalpy": HSC_CH_TH_ENTHALPY_NOTE,
  "hscc-th-thermochemistry": HSC_CH_TH_THERMOCHEMISTRY_NOTE,
  "hscc-th-spontaneity": HSC_CH_TH_SPONTANEITY_NOTE,
};

export const HSC_CH_TH_SLUGS = Object.keys(HSC_CH_TH_NOTES);
