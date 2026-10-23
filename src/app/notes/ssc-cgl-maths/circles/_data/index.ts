import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CI_CHORDS_NOTE } from "./chords";
import { SSC_CI_ANGLES_NOTE } from "./angles";
import { SSC_CI_TANGENTS_NOTE } from "./tangents";
import { SSC_CI_POWER_NOTE } from "./power";
import { SSC_CI_COMMON_NOTE } from "./common";
import { SSC_CI_TOUCHING_NOTE } from "./touching";

export { SSC_CIRCLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/circles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ci-` here and `sscci-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/circles.ts). Order matches `subtopicOrder`.
 */
export const SSC_CIRCLES_NOTES: Record<string, SubtopicNote> = {
  "ssc-ci-chords": SSC_CI_CHORDS_NOTE,
  "ssc-ci-angles": SSC_CI_ANGLES_NOTE,
  "ssc-ci-tangents": SSC_CI_TANGENTS_NOTE,
  "ssc-ci-power": SSC_CI_POWER_NOTE,
  "ssc-ci-common": SSC_CI_COMMON_NOTE,
  "ssc-ci-touching": SSC_CI_TOUCHING_NOTE,
};

export const SSC_CIRCLES_SLUGS = Object.keys(SSC_CIRCLES_NOTES);
