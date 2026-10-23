import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_TR_ANGLES_NOTE } from "./angles";
import { SSC_TR_SIDES_NOTE } from "./sides";
import { SSC_TR_CONGRUENCE_NOTE } from "./congruence";
import { SSC_TR_SIMILAR_NOTE } from "./similar";
import { SSC_TR_PARALLELS_NOTE } from "./parallels";
import { SSC_TR_MEDIANS_NOTE } from "./medians";
import { SSC_TR_CENTRES_NOTE } from "./centres";

export { SSC_TRIANGLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/triangles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-tr-` here and `ssctr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/triangles.ts). Order matches `subtopicOrder`.
 */
export const SSC_TRIANGLES_NOTES: Record<string, SubtopicNote> = {
  "ssc-tr-angles": SSC_TR_ANGLES_NOTE,
  "ssc-tr-sides": SSC_TR_SIDES_NOTE,
  "ssc-tr-congruence": SSC_TR_CONGRUENCE_NOTE,
  "ssc-tr-similar": SSC_TR_SIMILAR_NOTE,
  "ssc-tr-parallels": SSC_TR_PARALLELS_NOTE,
  "ssc-tr-medians": SSC_TR_MEDIANS_NOTE,
  "ssc-tr-centres": SSC_TR_CENTRES_NOTE,
};

export const SSC_TRIANGLES_SLUGS = Object.keys(SSC_TRIANGLES_NOTES);
