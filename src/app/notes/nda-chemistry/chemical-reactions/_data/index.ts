import type { SubtopicNote } from "@/app/notes/_types";
import { PHYSICAL_CHEMICAL_NOTE } from "./physical-chemical";
import { TYPES_NOTE } from "./types";
import { DECOMPOSITION_NOTE } from "./decomposition";
import { REDOX_NOTE } from "./redox";
import { SPECIFIC_NOTE } from "./specific";
import { THERMOCHEMISTRY_NOTE } from "./thermochemistry";

export { CHEMICAL_REACTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/chemical-reactions/[subtopicSlug].
 * Keys are GLOBALLY-unique (`rxn-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const CHEMICAL_REACTIONS_NOTES: Record<string, SubtopicNote> = {
  "rxn-physical-chemical": PHYSICAL_CHEMICAL_NOTE,
  "rxn-types": TYPES_NOTE,
  "rxn-decomposition": DECOMPOSITION_NOTE,
  "rxn-redox": REDOX_NOTE,
  "rxn-specific": SPECIFIC_NOTE,
  "rxn-thermochemistry": THERMOCHEMISTRY_NOTE,
};

export const CHEMICAL_REACTIONS_SLUGS = Object.keys(CHEMICAL_REACTIONS_NOTES);
