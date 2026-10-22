import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_GE_WO_CONTINENTS_NOTE } from "./continents";
import { CDS_GE_WO_WATER_NOTE } from "./water";
import { CDS_GE_WO_COUNTRIES_NOTE } from "./countries";
import { CDS_GE_WO_BIOMES_NOTE } from "./biomes";
import { CDS_GE_WO_PEOPLE_NOTE } from "./people";

export { CDS_GE_WORLD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-geography/world-human-geography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsge-wo-` here and `cdsgewo-` on concept slugs.
 *
 * 5 pages cut by reading every solution (scripts/cds-gs/reshape/world-human-geography.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_GE_WORLD_NOTES: Record<string, SubtopicNote> = {
  "cdsge-wo-continents": CDS_GE_WO_CONTINENTS_NOTE,
  "cdsge-wo-water": CDS_GE_WO_WATER_NOTE,
  "cdsge-wo-countries": CDS_GE_WO_COUNTRIES_NOTE,
  "cdsge-wo-biomes": CDS_GE_WO_BIOMES_NOTE,
  "cdsge-wo-people": CDS_GE_WO_PEOPLE_NOTE,
};

export const CDS_GE_WORLD_SLUGS = Object.keys(CDS_GE_WORLD_NOTES);
