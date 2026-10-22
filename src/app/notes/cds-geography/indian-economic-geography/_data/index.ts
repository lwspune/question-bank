import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_GE_EC_LAND_NOTE } from "./land";
import { CDS_GE_EC_FARMING_NOTE } from "./farming";
import { CDS_GE_EC_MINERALS_NOTE } from "./minerals";
import { CDS_GE_EC_POPULATION_NOTE } from "./population";
import { CDS_GE_EC_TRIBES_NOTE } from "./tribes";
import { CDS_GE_EC_URBAN_NOTE } from "./urban";
import { CDS_GE_EC_ROADS_NOTE } from "./roads";
import { CDS_GE_EC_PORTS_NOTE } from "./ports";

export { CDS_GE_ECONOMIC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-geography/indian-economic-geography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsge-ec-` here and `cdsgeec-` on concept slugs.
 *
 * 8 pages cut by reading every solution (scripts/cds-gs/reshape/indian-economic-geography.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_GE_ECONOMIC_NOTES: Record<string, SubtopicNote> = {
  "cdsge-ec-land": CDS_GE_EC_LAND_NOTE,
  "cdsge-ec-farming": CDS_GE_EC_FARMING_NOTE,
  "cdsge-ec-minerals": CDS_GE_EC_MINERALS_NOTE,
  "cdsge-ec-population": CDS_GE_EC_POPULATION_NOTE,
  "cdsge-ec-tribes": CDS_GE_EC_TRIBES_NOTE,
  "cdsge-ec-urban": CDS_GE_EC_URBAN_NOTE,
  "cdsge-ec-roads": CDS_GE_EC_ROADS_NOTE,
  "cdsge-ec-ports": CDS_GE_EC_PORTS_NOTE,
};

export const CDS_GE_ECONOMIC_SLUGS = Object.keys(CDS_GE_ECONOMIC_NOTES);
