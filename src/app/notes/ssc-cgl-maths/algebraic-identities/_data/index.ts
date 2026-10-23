import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_AI_SQUARES_NOTE } from "./squares";
import { SSC_AI_CUBES_NOTE } from "./cubes";
import { SSC_AI_RECIPROCAL_NOTE } from "./reciprocal";
import { SSC_AI_POWERS_NOTE } from "./powers";
import { SSC_AI_THREE_NOTE } from "./three";
import { SSC_AI_IDENTITY_NOTE } from "./identity";
import { SSC_AI_RATIONAL_NOTE } from "./rational";

export { SSC_ALGEBRAIC_IDENTITIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/algebraic-identities/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ai-` here and `sscai-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/algebraic-identities.ts). Order matches `subtopicOrder`.
 */
export const SSC_ALGEBRAIC_IDENTITIES_NOTES: Record<string, SubtopicNote> = {
  "ssc-ai-squares": SSC_AI_SQUARES_NOTE,
  "ssc-ai-cubes": SSC_AI_CUBES_NOTE,
  "ssc-ai-reciprocal": SSC_AI_RECIPROCAL_NOTE,
  "ssc-ai-powers": SSC_AI_POWERS_NOTE,
  "ssc-ai-three": SSC_AI_THREE_NOTE,
  "ssc-ai-identity": SSC_AI_IDENTITY_NOTE,
  "ssc-ai-rational": SSC_AI_RATIONAL_NOTE,
};

export const SSC_ALGEBRAIC_IDENTITIES_SLUGS = Object.keys(SSC_ALGEBRAIC_IDENTITIES_NOTES);
