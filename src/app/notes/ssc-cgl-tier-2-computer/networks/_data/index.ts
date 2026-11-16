import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_CNW_NW_NOTE } from "./nw";

export { SSC2_NETWORKS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-computer/networks/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-cnw-` here and `ssc2cnw-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/networks.ts). Order matches `subtopicOrder`.
 */
export const SSC2_NETWORKS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-cnw-nw": SSC2_CNW_NW_NOTE,
};

export const SSC2_NETWORKS_SLUGS = Object.keys(SSC2_NETWORKS_NOTES);
