import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_FKM_MOTION_NOTE } from "./motion";

export { SSC_KINEMATICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-physics/kinematics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-fkm-` here and `sscfkm-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/kinematics.ts). Order matches `subtopicOrder`.
 */
export const SSC_KINEMATICS_NOTES: Record<string, SubtopicNote> = {
  "ssc-fkm-motion": SSC_FKM_MOTION_NOTE,
};

export const SSC_KINEMATICS_SLUGS = Object.keys(SSC_KINEMATICS_NOTES);
