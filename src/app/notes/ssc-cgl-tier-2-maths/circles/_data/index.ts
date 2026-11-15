import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_CI_ANGLES_NOTE } from "./angles";
import { SSC2_CI_CHORDS_NOTE } from "./chords";

export { SSC2_CIRCLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/circles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ci-` here and `ssc2ci-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/circles.ts). Order matches `subtopicOrder`.
 */
export const SSC2_CIRCLES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ci-angles": SSC2_CI_ANGLES_NOTE,
  "ssc2-ci-chords": SSC2_CI_CHORDS_NOTE,
};

export const SSC2_CIRCLES_SLUGS = Object.keys(SSC2_CIRCLES_NOTES);
