import type { SubtopicNote } from "@/app/notes/_types";
import { REPRO_GENETIC_PRINCIPLES_NOTE } from "./genetic-principles";
import { REPRO_MEIOSIS_PLANTS_NOTE } from "./meiosis-plants";
import { REPRO_ANGIOSPERM_NOTE } from "./angiosperm";
import { REPRO_ANIMAL_HUMAN_NOTE } from "./animal-human";

export { REPRODUCTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-biology/reproduction/[subtopicSlug].
 * Keys are GLOBALLY-unique (`repro-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const REPRODUCTION_NOTES: Record<string, SubtopicNote> = {
  "repro-genetic-principles": REPRO_GENETIC_PRINCIPLES_NOTE,
  "repro-meiosis-plants": REPRO_MEIOSIS_PLANTS_NOTE,
  "repro-angiosperm": REPRO_ANGIOSPERM_NOTE,
  "repro-animal-human": REPRO_ANIMAL_HUMAN_NOTE,
};

export const REPRODUCTION_SLUGS = Object.keys(REPRODUCTION_NOTES);
