import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_CK_RATE_NOTE } from "./rate";
import { HSC_CH_CK_CONCENTRATION_NOTE } from "./concentration";
import { HSC_CH_CK_MOLECULARITY_NOTE } from "./molecularity";
import { HSC_CH_CK_INTEGRATED_NOTE } from "./integrated";
import { HSC_CH_CK_COLLISION_NOTE } from "./collision";
import { HSC_CH_CK_TEMPERATURE_NOTE } from "./temperature";
import { HSC_CH_CK_CATALYST_NOTE } from "./catalyst";

export { HSC_CH_CK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/chemical-kinetics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-ck-` here and `hsccck-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_CK_NOTES: Record<string, SubtopicNote> = {
  "hscc-ck-rate": HSC_CH_CK_RATE_NOTE,
  "hscc-ck-concentration": HSC_CH_CK_CONCENTRATION_NOTE,
  "hscc-ck-molecularity": HSC_CH_CK_MOLECULARITY_NOTE,
  "hscc-ck-integrated": HSC_CH_CK_INTEGRATED_NOTE,
  "hscc-ck-collision": HSC_CH_CK_COLLISION_NOTE,
  "hscc-ck-temperature": HSC_CH_CK_TEMPERATURE_NOTE,
  "hscc-ck-catalyst": HSC_CH_CK_CATALYST_NOTE,
};

export const HSC_CH_CK_SLUGS = Object.keys(HSC_CH_CK_NOTES);
