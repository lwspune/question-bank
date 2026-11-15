import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RA_BASICS_NOTE } from "./basics";
import { SSC2_RA_CHANGING_NOTE } from "./changing";
import { SSC2_RA_INCOME_NOTE } from "./income";
import { SSC2_RA_PARTNERSHIP_NOTE } from "./partnership";
import { SSC2_RA_MIXTURES_NOTE } from "./mixtures";

export { SSC2_RATIO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/ratio/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ra-` here and `ssc2ra-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/ratio.ts). Order matches `subtopicOrder`.
 */
export const SSC2_RATIO_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ra-basics": SSC2_RA_BASICS_NOTE,
  "ssc2-ra-changing": SSC2_RA_CHANGING_NOTE,
  "ssc2-ra-income": SSC2_RA_INCOME_NOTE,
  "ssc2-ra-partnership": SSC2_RA_PARTNERSHIP_NOTE,
  "ssc2-ra-mixtures": SSC2_RA_MIXTURES_NOTE,
};

export const SSC2_RATIO_SLUGS = Object.keys(SSC2_RATIO_NOTES);
