import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_TG_VALUES_NOTE } from "./values";
import { SSC2_TG_TRIANGLE_NOTE } from "./triangle";
import { SSC2_TG_COMPLEMENTARY_NOTE } from "./complementary";
import { SSC2_TG_IDENTITIES_NOTE } from "./identities";

export { SSC2_TRIGONOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/trigonometry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-tg-` here and `ssc2tg-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/trigonometry.ts). Order matches `subtopicOrder`.
 */
export const SSC2_TRIGONOMETRY_NOTES: Record<string, SubtopicNote> = {
  "ssc2-tg-values": SSC2_TG_VALUES_NOTE,
  "ssc2-tg-triangle": SSC2_TG_TRIANGLE_NOTE,
  "ssc2-tg-complementary": SSC2_TG_COMPLEMENTARY_NOTE,
  "ssc2-tg-identities": SSC2_TG_IDENTITIES_NOTE,
};

export const SSC2_TRIGONOMETRY_SLUGS = Object.keys(SSC2_TRIGONOMETRY_NOTES);
