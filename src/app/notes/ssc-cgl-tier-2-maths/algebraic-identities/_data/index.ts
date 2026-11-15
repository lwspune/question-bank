import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_AI_IDENTITIES_NOTE } from "./identities";
import { SSC2_AI_RECIPROCAL_NOTE } from "./reciprocal";

export { SSC2_ALGEBRAIC_IDENTITIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/algebraic-identities/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ai-` here and `ssc2ai-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/algebraic-identities.ts). Order matches `subtopicOrder`.
 */
export const SSC2_ALGEBRAIC_IDENTITIES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ai-identities": SSC2_AI_IDENTITIES_NOTE,
  "ssc2-ai-reciprocal": SSC2_AI_RECIPROCAL_NOTE,
};

export const SSC2_ALGEBRAIC_IDENTITIES_SLUGS = Object.keys(SSC2_ALGEBRAIC_IDENTITIES_NOTES);
