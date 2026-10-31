import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_PGS_EXECUTIVE_NOTE } from "./executive";
import { SSC_PGS_PARLIAMENT_NOTE } from "./parliament";
import { SSC_PGS_JUDICIARY_NOTE } from "./judiciary";
import { SSC_PGS_STATES_NOTE } from "./states";
import { SSC_PGS_LAWS_NOTE } from "./laws";

export { SSC_GOVERNMENT_STRUCTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-polity/government-structure/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-pgs-` here and `sscpgs-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/government-structure.ts). Order matches `subtopicOrder`.
 */
export const SSC_GOVERNMENT_STRUCTURE_NOTES: Record<string, SubtopicNote> = {
  "ssc-pgs-executive": SSC_PGS_EXECUTIVE_NOTE,
  "ssc-pgs-parliament": SSC_PGS_PARLIAMENT_NOTE,
  "ssc-pgs-judiciary": SSC_PGS_JUDICIARY_NOTE,
  "ssc-pgs-states": SSC_PGS_STATES_NOTE,
  "ssc-pgs-laws": SSC_PGS_LAWS_NOTE,
};

export const SSC_GOVERNMENT_STRUCTURE_SLUGS = Object.keys(SSC_GOVERNMENT_STRUCTURE_NOTES);
