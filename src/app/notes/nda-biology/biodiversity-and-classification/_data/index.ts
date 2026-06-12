import type { SubtopicNote } from "@/app/notes/_types";
import { FUNGI_NOTE } from "./fungi";
import { PLANT_KINGDOM_NOTE } from "./plant-kingdom";
import { ANIMAL_KINGDOM_NOTE } from "./animal-kingdom";

export { BIODIVERSITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-biology/biodiversity-and-classification/[subtopicSlug].
 * Keys are GLOBALLY-unique (`biodiv-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const BIODIVERSITY_NOTES: Record<string, SubtopicNote> = {
  "biodiv-fungi": FUNGI_NOTE,
  "biodiv-plant-kingdom": PLANT_KINGDOM_NOTE,
  "biodiv-animal-kingdom": ANIMAL_KINGDOM_NOTE,
};

export const BIODIVERSITY_SLUGS = Object.keys(BIODIVERSITY_NOTES);
