import type { SubtopicNote } from "@/app/notes/_types";
import { MOUNTAINS_PLATEAUS_PLAINS_NOTE } from "./mountains-plateaus-plains";
import { RIVERS_LAKES_WATER_BODIES_NOTE } from "./rivers-lakes-water-bodies";
import { SOILS_CLIMATE_AGRICULTURE_NOTE } from "./soils-climate-agriculture";
import { FORESTS_NATURAL_VEGETATION_NOTE } from "./forests-natural-vegetation";
import { STATES_AND_ISLANDS_NOTE } from "./states-and-islands";
import { LOCATION_EXTENT_FRONTIERS_NOTE } from "./location-extent-frontiers";

export { INDIAN_GEOGRAPHY_PHYSICAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-geography/indian-geography-physical/[subtopicSlug].
 * Keys are GLOBALLY-unique (`igp-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const INDIAN_GEOGRAPHY_PHYSICAL_NOTES: Record<string, SubtopicNote> = {
  "igp-location-extent-frontiers": LOCATION_EXTENT_FRONTIERS_NOTE,
  "igp-mountains-plateaus-plains": MOUNTAINS_PLATEAUS_PLAINS_NOTE,
  "igp-rivers-lakes-water-bodies": RIVERS_LAKES_WATER_BODIES_NOTE,
  "igp-soils-climate-agriculture": SOILS_CLIMATE_AGRICULTURE_NOTE,
  "igp-forests-natural-vegetation": FORESTS_NATURAL_VEGETATION_NOTE,
  "igp-states-and-islands": STATES_AND_ISLANDS_NOTE,
};

export const INDIAN_GEOGRAPHY_PHYSICAL_SLUGS = Object.keys(
  INDIAN_GEOGRAPHY_PHYSICAL_NOTES,
);
