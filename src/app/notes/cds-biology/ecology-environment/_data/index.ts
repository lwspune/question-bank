import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_EC_ECOSYSTEMS_NOTE } from "./ecosystems";
import { CDS_BI_EC_ENVIRONMENT_NOTE } from "./environment";

export { CDS_BI_ECOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/ecology-environment/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-ec-` here and `cdsbiec-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/ecology-environment.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_ECOLOGY_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-ec-ecosystems": CDS_BI_EC_ECOSYSTEMS_NOTE,
  "cdsbi-ec-environment": CDS_BI_EC_ENVIRONMENT_NOTE,
};

export const CDS_BI_ECOLOGY_SLUGS = Object.keys(CDS_BI_ECOLOGY_NOTES);
