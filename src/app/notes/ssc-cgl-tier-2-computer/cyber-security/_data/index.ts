import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_CCS_SEC_NOTE } from "./sec";

export { SSC2_CYBER_SECURITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-computer/cyber-security/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ccs-` here and `ssc2ccs-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/cyber-security.ts). Order matches `subtopicOrder`.
 */
export const SSC2_CYBER_SECURITY_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ccs-sec": SSC2_CCS_SEC_NOTE,
};

export const SSC2_CYBER_SECURITY_SLUGS = Object.keys(SSC2_CYBER_SECURITY_NOTES);
