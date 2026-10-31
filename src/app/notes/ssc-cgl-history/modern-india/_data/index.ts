import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_HMO_COMPANY_NOTE } from "./company";
import { SSC_HMO_REVOLTS_NOTE } from "./revolts";
import { SSC_HMO_ACTS_NOTE } from "./acts";
import { SSC_HMO_REFORM_NOTE } from "./reform";
import { SSC_HMO_EARLY_NOTE } from "./early";
import { SSC_HMO_GANDHI_NOTE } from "./gandhi";
import { SSC_HMO_INDEPENDENCE_NOTE } from "./independence";
import { SSC_HMO_CULTURE_NOTE } from "./culture";

export { SSC_MODERN_INDIA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-history/modern-india/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-hmo-` here and `sschmo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/modern-india.ts). Order matches `subtopicOrder`.
 */
export const SSC_MODERN_INDIA_NOTES: Record<string, SubtopicNote> = {
  "ssc-hmo-company": SSC_HMO_COMPANY_NOTE,
  "ssc-hmo-revolts": SSC_HMO_REVOLTS_NOTE,
  "ssc-hmo-acts": SSC_HMO_ACTS_NOTE,
  "ssc-hmo-reform": SSC_HMO_REFORM_NOTE,
  "ssc-hmo-early": SSC_HMO_EARLY_NOTE,
  "ssc-hmo-gandhi": SSC_HMO_GANDHI_NOTE,
  "ssc-hmo-independence": SSC_HMO_INDEPENDENCE_NOTE,
  "ssc-hmo-culture": SSC_HMO_CULTURE_NOTE,
};

export const SSC_MODERN_INDIA_SLUGS = Object.keys(SSC_MODERN_INDIA_NOTES);
