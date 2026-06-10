import type { SubtopicNote } from "@/app/notes/_types";
import { PROPERTIES_OF_HYDROGEN_NOTE } from "./properties-of-hydrogen";
import { PROPERTIES_OF_WATER_NOTE } from "./properties-of-water";
import { HARDNESS_OF_WATER_NOTE } from "./hardness-of-water";

export { HYDROGEN_WATER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/hydrogen-water/[subtopicSlug].
 * Keys are GLOBALLY-unique (`hyd-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const HYDROGEN_WATER_NOTES: Record<string, SubtopicNote> = {
  "hyd-properties-of-hydrogen": PROPERTIES_OF_HYDROGEN_NOTE,
  "hyd-properties-of-water": PROPERTIES_OF_WATER_NOTE,
  "hyd-hardness-of-water": HARDNESS_OF_WATER_NOTE,
};

export const HYDROGEN_WATER_SLUGS = Object.keys(HYDROGEN_WATER_NOTES);
