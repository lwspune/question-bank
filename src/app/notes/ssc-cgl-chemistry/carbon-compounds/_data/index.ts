import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CCC_HYDROCARBONS_NOTE } from "./hydrocarbons";
import { SSC_CCC_FUNCTIONAL_NOTE } from "./functional";

export { SSC_CARBON_COMPOUNDS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-chemistry/carbon-compounds/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ccc-` here and `sscccc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/carbon-compounds.ts). Order matches `subtopicOrder`.
 */
export const SSC_CARBON_COMPOUNDS_NOTES: Record<string, SubtopicNote> = {
  "ssc-ccc-hydrocarbons": SSC_CCC_HYDROCARBONS_NOTE,
  "ssc-ccc-functional": SSC_CCC_FUNCTIONAL_NOTE,
};

export const SSC_CARBON_COMPOUNDS_SLUGS = Object.keys(SSC_CARBON_COMPOUNDS_NOTES);
