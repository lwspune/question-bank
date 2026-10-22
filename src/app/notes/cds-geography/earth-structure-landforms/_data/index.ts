import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_GE_EA_INTERIOR_NOTE } from "./interior";
import { CDS_GE_EA_VOLCANOES_NOTE } from "./volcanoes";
import { CDS_GE_EA_WEATHERING_NOTE } from "./weathering";
import { CDS_GE_EA_LANDFORMS_NOTE } from "./landforms";
import { CDS_GE_EA_HAZARDS_NOTE } from "./hazards";

export { CDS_GE_EARTH_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-geography/earth-structure-landforms/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsge-ea-` here and `cdsgeea-` on concept slugs.
 *
 * 5 pages cut by reading every solution (scripts/cds-gs/reshape/earth-structure-landforms.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_GE_EARTH_NOTES: Record<string, SubtopicNote> = {
  "cdsge-ea-interior": CDS_GE_EA_INTERIOR_NOTE,
  "cdsge-ea-volcanoes": CDS_GE_EA_VOLCANOES_NOTE,
  "cdsge-ea-weathering": CDS_GE_EA_WEATHERING_NOTE,
  "cdsge-ea-landforms": CDS_GE_EA_LANDFORMS_NOTE,
  "cdsge-ea-hazards": CDS_GE_EA_HAZARDS_NOTE,
};

export const CDS_GE_EARTH_SLUGS = Object.keys(CDS_GE_EARTH_NOTES);
