import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_HAN_EARLY_NOTE } from "./early";
import { SSC_HAN_MAURYA_NOTE } from "./maurya";
import { SSC_HAN_POSTMAURYA_NOTE } from "./postmaurya";
import { SSC_HAN_GUPTA_NOTE } from "./gupta";
import { SSC_HAN_LITERATURE_NOTE } from "./literature";
import { SSC_HAN_ART_NOTE } from "./art";
import { SSC_HAN_TEMPLES_NOTE } from "./temples";

export { SSC_ANCIENT_INDIA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-history/ancient-india/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-han-` here and `sschan-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/ancient-india.ts). Order matches `subtopicOrder`.
 */
export const SSC_ANCIENT_INDIA_NOTES: Record<string, SubtopicNote> = {
  "ssc-han-early": SSC_HAN_EARLY_NOTE,
  "ssc-han-maurya": SSC_HAN_MAURYA_NOTE,
  "ssc-han-postmaurya": SSC_HAN_POSTMAURYA_NOTE,
  "ssc-han-gupta": SSC_HAN_GUPTA_NOTE,
  "ssc-han-literature": SSC_HAN_LITERATURE_NOTE,
  "ssc-han-art": SSC_HAN_ART_NOTE,
  "ssc-han-temples": SSC_HAN_TEMPLES_NOTE,
};

export const SSC_ANCIENT_INDIA_SLUGS = Object.keys(SSC_ANCIENT_INDIA_NOTES);
