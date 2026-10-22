import type { SubtopicNote } from "@/app/notes/_types";
import { AF_NS_TYPES_NOTE } from "./types";
import { AF_NS_DIVISIBILITY_NOTE } from "./divisibility";
import { AF_NS_PRIME_FACTORS_NOTE } from "./prime-factors";
import { AF_NS_HCF_LCM_NOTE } from "./hcf-lcm";
import { AF_NS_REMAINDERS_NOTE } from "./remainders";

export { AF_NS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/number-system/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-ns-` here and `afns-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afns-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_NS_NOTES: Record<string, SubtopicNote> = {
  "af-ns-types": AF_NS_TYPES_NOTE,
  "af-ns-divisibility": AF_NS_DIVISIBILITY_NOTE,
  "af-ns-prime-factors": AF_NS_PRIME_FACTORS_NOTE,
  "af-ns-hcf-lcm": AF_NS_HCF_LCM_NOTE,
  "af-ns-remainders": AF_NS_REMAINDERS_NOTE,
};

export const AF_NS_SLUGS = Object.keys(AF_NS_NOTES);
