import type { SubtopicNote } from "@/app/notes/_types";
import { PROTEIN_STRUCTURE_NOTE } from "./protein-structure";
import { RESPIRATION_FERMENTATION_NOTE } from "./respiration-fermentation";
import { FOOD_SPOILAGE_NOTE } from "./food-spoilage";

export { BIOCHEMISTRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-biology/biochemistry/[subtopicSlug].
 * Keys are GLOBALLY-unique (`biochem-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const BIOCHEMISTRY_NOTES: Record<string, SubtopicNote> = {
  "biochem-protein-structure": PROTEIN_STRUCTURE_NOTE,
  "biochem-respiration-fermentation": RESPIRATION_FERMENTATION_NOTE,
  "biochem-food-spoilage": FOOD_SPOILAGE_NOTE,
};

export const BIOCHEMISTRY_SLUGS = Object.keys(BIOCHEMISTRY_NOTES);
