import type { SubtopicNote } from "@/app/notes/_types";
import { RIVERS_CANALS_WATER_NOTE } from "./rivers-canals-water";
import { COORDINATES_TIME_NOTE } from "./coordinates-time";
import { MEGACITIES_POPULATION_NOTE } from "./megacities-population";

export { WORLD_HUMAN_GEOGRAPHY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-geography/world-human-geography/[subtopicSlug].
 * Keys are GLOBALLY-unique (`whg-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const WORLD_HUMAN_GEOGRAPHY_NOTES: Record<string, SubtopicNote> = {
  "whg-rivers-canals-water": RIVERS_CANALS_WATER_NOTE,
  "whg-coordinates-time": COORDINATES_TIME_NOTE,
  "whg-megacities-population": MEGACITIES_POPULATION_NOTE,
};

export const WORLD_HUMAN_GEOGRAPHY_SLUGS = Object.keys(WORLD_HUMAN_GEOGRAPHY_NOTES);
