import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_EN_SOURCES_NOTE } from "./sources";

export { CDS_PH_ENERGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/energy-sources/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-en-` here and `cdsphen-` on concept slugs.
 *
 * 1 pages cut by reading every solution (scripts/cds-gs/reshape/energy-sources.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_ENERGY_NOTES: Record<string, SubtopicNote> = {
  "cdsph-en-sources": CDS_PH_EN_SOURCES_NOTE,
};

export const CDS_PH_ENERGY_SLUGS = Object.keys(CDS_PH_ENERGY_NOTES);
