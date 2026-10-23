import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RCD_SHIFTS_NOTE } from "./shifts";
import { SSC_RCD_REVERSAL_NOTE } from "./reversal";
import { SSC_RCD_VALUES_NOTE } from "./values";
import { SSC_RCD_SYMBOLS_NOTE } from "./symbols";
import { SSC_RCD_SENTENCES_NOTE } from "./sentences";

export { SSC_CODING_DECODING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/coding-decoding/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rcd-` here and `sscrcd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/coding-decoding.ts). Order matches `subtopicOrder`.
 */
export const SSC_CODING_DECODING_NOTES: Record<string, SubtopicNote> = {
  "ssc-rcd-shifts": SSC_RCD_SHIFTS_NOTE,
  "ssc-rcd-reversal": SSC_RCD_REVERSAL_NOTE,
  "ssc-rcd-values": SSC_RCD_VALUES_NOTE,
  "ssc-rcd-symbols": SSC_RCD_SYMBOLS_NOTE,
  "ssc-rcd-sentences": SSC_RCD_SENTENCES_NOTE,
};

export const SSC_CODING_DECODING_SLUGS = Object.keys(SSC_CODING_DECODING_NOTES);
