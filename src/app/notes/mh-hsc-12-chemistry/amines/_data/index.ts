import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_AM_NOMENCLATURE_NOTE } from "./nomenclature";
import { HSC_CH_AM_PREPARATION_NOTE } from "./preparation";
import { HSC_CH_AM_PHYSICAL_NOTE } from "./physical";
import { HSC_CH_AM_BASICITY_NOTE } from "./basicity";
import { HSC_CH_AM_REACTIONS_NOTE } from "./reactions";
import { HSC_CH_AM_DIAZONIUM_NOTE } from "./diazonium";
import { HSC_CH_AM_SUBSTITUTION_NOTE } from "./substitution";

export { HSC_CH_AM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/amines/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-am-` here and `hsccam-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_AM_NOTES: Record<string, SubtopicNote> = {
  "hscc-am-nomenclature": HSC_CH_AM_NOMENCLATURE_NOTE,
  "hscc-am-preparation": HSC_CH_AM_PREPARATION_NOTE,
  "hscc-am-physical": HSC_CH_AM_PHYSICAL_NOTE,
  "hscc-am-basicity": HSC_CH_AM_BASICITY_NOTE,
  "hscc-am-reactions": HSC_CH_AM_REACTIONS_NOTE,
  "hscc-am-diazonium": HSC_CH_AM_DIAZONIUM_NOTE,
  "hscc-am-substitution": HSC_CH_AM_SUBSTITUTION_NOTE,
};

export const HSC_CH_AM_SLUGS = Object.keys(HSC_CH_AM_NOTES);
