import type { SubtopicNote } from "@/app/notes/_types";
import { PATHOGENS_AND_DISEASES_NOTE } from "./pathogens-and-diseases";
import { DISEASE_VECTORS_MALARIA_NOTE } from "./disease-vectors-malaria";
import { ANTIBIOTICS_DISCOVERY_NOTE } from "./antibiotics-discovery";

export { MICROBIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-biology/microbiology-and-disease/[subtopicSlug].
 * Keys are GLOBALLY-unique (`micro-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const MICROBIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "micro-pathogens-and-diseases": PATHOGENS_AND_DISEASES_NOTE,
  "micro-disease-vectors-malaria": DISEASE_VECTORS_MALARIA_NOTE,
  "micro-antibiotics-discovery": ANTIBIOTICS_DISCOVERY_NOTE,
};

export const MICROBIOLOGY_SLUGS = Object.keys(MICROBIOLOGY_NOTES);
