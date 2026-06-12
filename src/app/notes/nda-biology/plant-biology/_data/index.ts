import type { SubtopicNote } from "@/app/notes/_types";
import { PLANT_TISSUES_MERISTEMS_NOTE } from "./plant-tissues-meristems";
import { PLANT_PHOTOSYNTHESIS_NOTE } from "./plant-photosynthesis";
import { PLANT_PROCESSES_NOTE } from "./plant-processes";
import { PLANT_SEED_FRUIT_EMBRYO_NOTE } from "./plant-seed-fruit-embryo";
import { PLANT_VEGETATIVE_PROPAGATION_NOTE } from "./plant-vegetative-propagation";

export { PLANT_BIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-biology/plant-biology/[subtopicSlug].
 * Keys are GLOBALLY-unique (`plant-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const PLANT_BIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "plant-tissues-meristems": PLANT_TISSUES_MERISTEMS_NOTE,
  "plant-photosynthesis": PLANT_PHOTOSYNTHESIS_NOTE,
  "plant-processes": PLANT_PROCESSES_NOTE,
  "plant-seed-fruit-embryo": PLANT_SEED_FRUIT_EMBRYO_NOTE,
  "plant-vegetative-propagation": PLANT_VEGETATIVE_PROPAGATION_NOTE,
};

export const PLANT_BIOLOGY_SLUGS = Object.keys(PLANT_BIOLOGY_NOTES);
