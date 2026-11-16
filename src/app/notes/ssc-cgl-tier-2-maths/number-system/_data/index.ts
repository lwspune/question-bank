import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_NS_DIVISIBILITY_NOTE } from "./divisibility";
import { SSC2_NS_HCF_NOTE } from "./hcf";
import { SSC2_NS_PRIMES_NOTE } from "./primes";

export { SSC2_NUMBER_SYSTEM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/number-system/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ns-` here and `ssc2ns-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/number-system.ts). Order matches `subtopicOrder`.
 */
export const SSC2_NUMBER_SYSTEM_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ns-divisibility": SSC2_NS_DIVISIBILITY_NOTE,
  "ssc2-ns-hcf": SSC2_NS_HCF_NOTE,
  "ssc2-ns-primes": SSC2_NS_PRIMES_NOTE,
};

export const SSC2_NUMBER_SYSTEM_SLUGS = Object.keys(SSC2_NUMBER_SYSTEM_NOTES);
