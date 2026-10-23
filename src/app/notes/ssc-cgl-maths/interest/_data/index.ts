import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_IN_SIMPLE_NOTE } from "./simple";
import { SSC_IN_UNKNOWNS_NOTE } from "./unknowns";
import { SSC_IN_FRACTION_NOTE } from "./fraction";
import { SSC_IN_TWO_RATES_NOTE } from "./two-rates";
import { SSC_IN_CHANGES_NOTE } from "./changes";
import { SSC_IN_COMPOUND_NOTE } from "./compound";
import { SSC_IN_PERIODS_NOTE } from "./periods";

export { SSC_INTEREST_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/interest/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-in-` here and `sscin-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/interest.ts). Order matches `subtopicOrder`.
 */
export const SSC_INTEREST_NOTES: Record<string, SubtopicNote> = {
  "ssc-in-simple": SSC_IN_SIMPLE_NOTE,
  "ssc-in-unknowns": SSC_IN_UNKNOWNS_NOTE,
  "ssc-in-fraction": SSC_IN_FRACTION_NOTE,
  "ssc-in-two-rates": SSC_IN_TWO_RATES_NOTE,
  "ssc-in-changes": SSC_IN_CHANGES_NOTE,
  "ssc-in-compound": SSC_IN_COMPOUND_NOTE,
  "ssc-in-periods": SSC_IN_PERIODS_NOTE,
};

export const SSC_INTEREST_SLUGS = Object.keys(SSC_INTEREST_NOTES);
