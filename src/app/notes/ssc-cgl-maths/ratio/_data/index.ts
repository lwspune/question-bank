import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RA_BASICS_NOTE } from "./basics";
import { SSC_RA_PROPORTIONALS_NOTE } from "./proportionals";
import { SSC_RA_VARIATION_NOTE } from "./variation";
import { SSC_RA_CHANGING_NOTE } from "./changing";
import { SSC_RA_INCOME_NOTE } from "./income";
import { SSC_RA_PARTNERSHIP_NOTE } from "./partnership";
import { SSC_RA_MIXTURES_NOTE } from "./mixtures";
import { SSC_RA_ALLIGATION_NOTE } from "./alligation";

export { SSC_RATIO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/ratio/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ra-` here and `sscra-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/ratio.ts). Order matches `subtopicOrder`.
 */
export const SSC_RATIO_NOTES: Record<string, SubtopicNote> = {
  "ssc-ra-basics": SSC_RA_BASICS_NOTE,
  "ssc-ra-proportionals": SSC_RA_PROPORTIONALS_NOTE,
  "ssc-ra-variation": SSC_RA_VARIATION_NOTE,
  "ssc-ra-changing": SSC_RA_CHANGING_NOTE,
  "ssc-ra-income": SSC_RA_INCOME_NOTE,
  "ssc-ra-partnership": SSC_RA_PARTNERSHIP_NOTE,
  "ssc-ra-mixtures": SSC_RA_MIXTURES_NOTE,
  "ssc-ra-alligation": SSC_RA_ALLIGATION_NOTE,
};

export const SSC_RATIO_SLUGS = Object.keys(SSC_RATIO_NOTES);
