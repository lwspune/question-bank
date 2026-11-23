import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_SFI_PEOPLE_NOTE } from "./people";
import { SSC_SFI_INSTITUTIONS_NOTE } from "./institutions";

export { SSC_FIRSTS_SYMBOLS_INSTITUTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-static-gk/firsts-symbols-institutions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-sfi-` here and `sscsfi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/firsts-symbols-institutions.ts). Order matches `subtopicOrder`.
 */
export const SSC_FIRSTS_SYMBOLS_INSTITUTIONS_NOTES: Record<string, SubtopicNote> = {
  "ssc-sfi-people": SSC_SFI_PEOPLE_NOTE,
  "ssc-sfi-institutions": SSC_SFI_INSTITUTIONS_NOTE,
};

export const SSC_FIRSTS_SYMBOLS_INSTITUTIONS_SLUGS = Object.keys(SSC_FIRSTS_SYMBOLS_INSTITUTIONS_NOTES);
