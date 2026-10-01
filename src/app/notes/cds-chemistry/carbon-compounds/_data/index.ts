import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_CB_ALLOTROPES_NOTE } from "./allotropes";
import { CDS_CH_CB_HYDROCARBONS_NOTE } from "./hydrocarbons";
import { CDS_CH_CB_GROUPS_NOTE } from "./groups";
import { CDS_CH_CB_SOAPS_NOTE } from "./soaps";

export { CDS_CH_CARBON_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/carbon-compounds/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-cb-` here and `cdschcb-` on concept slugs.
 *
 * Four pages cut by reading all 21 solutions (scripts/cds-gs/reshape/carbon.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_CH_CARBON_NOTES: Record<string, SubtopicNote> = {
  "cdsch-cb-allotropes": CDS_CH_CB_ALLOTROPES_NOTE,
  "cdsch-cb-hydrocarbons": CDS_CH_CB_HYDROCARBONS_NOTE,
  "cdsch-cb-groups": CDS_CH_CB_GROUPS_NOTE,
  "cdsch-cb-soaps": CDS_CH_CB_SOAPS_NOTE,
};

export const CDS_CH_CARBON_SLUGS = Object.keys(CDS_CH_CARBON_NOTES);
