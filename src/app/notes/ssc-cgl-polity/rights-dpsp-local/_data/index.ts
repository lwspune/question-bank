import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_PFR_RIGHTS_NOTE } from "./rights";
import { SSC_PFR_DPSP_NOTE } from "./dpsp";
import { SSC_PFR_DUTIES_NOTE } from "./duties";
import { SSC_PFR_LOCAL_NOTE } from "./local";

export { SSC_RIGHTS_DPSP_LOCAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-polity/rights-dpsp-local/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-pfr-` here and `sscpfr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/rights-dpsp-local.ts). Order matches `subtopicOrder`.
 */
export const SSC_RIGHTS_DPSP_LOCAL_NOTES: Record<string, SubtopicNote> = {
  "ssc-pfr-rights": SSC_PFR_RIGHTS_NOTE,
  "ssc-pfr-dpsp": SSC_PFR_DPSP_NOTE,
  "ssc-pfr-duties": SSC_PFR_DUTIES_NOTE,
  "ssc-pfr-local": SSC_PFR_LOCAL_NOTE,
};

export const SSC_RIGHTS_DPSP_LOCAL_SLUGS = Object.keys(SSC_RIGHTS_DPSP_LOCAL_NOTES);
