import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_CK_RATE_NOTE } from "./rate";
import { CB_CH_CK_FACTORS_NOTE } from "./factors";
import { CB_CH_CK_INTEGRATED_NOTE } from "./integrated";
import { CB_CH_CK_TEMPERATURE_NOTE } from "./temperature";
import { CB_CH_CK_COLLISION_NOTE } from "./collision";

export { CB_CH_CK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/chemical-kinetics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-ck-` here and `cbcck-` on concept slugs.
 *
 * 5 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_CK_NOTES: Record<string, SubtopicNote> = {
  "cbc-ck-rate": CB_CH_CK_RATE_NOTE,
  "cbc-ck-factors": CB_CH_CK_FACTORS_NOTE,
  "cbc-ck-integrated": CB_CH_CK_INTEGRATED_NOTE,
  "cbc-ck-temperature": CB_CH_CK_TEMPERATURE_NOTE,
  "cbc-ck-collision": CB_CH_CK_COLLISION_NOTE,
};

export const CB_CH_CK_SLUGS = Object.keys(CB_CH_CK_NOTES);
