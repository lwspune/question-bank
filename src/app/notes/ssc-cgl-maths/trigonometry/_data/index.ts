import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_TG_VALUES_NOTE } from "./values";
import { SSC_TG_TRIANGLE_NOTE } from "./triangle";
import { SSC_TG_IDENTITIES_NOTE } from "./identities";
import { SSC_TG_COMPLEMENTARY_NOTE } from "./complementary";
import { SSC_TG_PAIRS_NOTE } from "./pairs";
import { SSC_TG_COMPOUND_NOTE } from "./compound";
import { SSC_TG_EQUATIONS_NOTE } from "./equations";

export { SSC_TRIGONOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/trigonometry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-tg-` here and `ssctg-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/trigonometry.ts). Order matches `subtopicOrder`.
 */
export const SSC_TRIGONOMETRY_NOTES: Record<string, SubtopicNote> = {
  "ssc-tg-values": SSC_TG_VALUES_NOTE,
  "ssc-tg-triangle": SSC_TG_TRIANGLE_NOTE,
  "ssc-tg-identities": SSC_TG_IDENTITIES_NOTE,
  "ssc-tg-complementary": SSC_TG_COMPLEMENTARY_NOTE,
  "ssc-tg-pairs": SSC_TG_PAIRS_NOTE,
  "ssc-tg-compound": SSC_TG_COMPOUND_NOTE,
  "ssc-tg-equations": SSC_TG_EQUATIONS_NOTE,
};

export const SSC_TRIGONOMETRY_SLUGS = Object.keys(SSC_TRIGONOMETRY_NOTES);
