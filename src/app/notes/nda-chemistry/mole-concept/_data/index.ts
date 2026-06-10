import type { SubtopicNote } from "@/app/notes/_types";
import { MOLE_MOLAR_CALCULATIONS_NOTE } from "./mole-molar-calculations";
import { MOLE_STOICHIOMETRY_LAWS_NOTE } from "./mole-stoichiometry-laws";

export { MOLE_CONCEPT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/mole-concept/[subtopicSlug].
 * Keys are GLOBALLY-unique (`mole-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const MOLE_CONCEPT_NOTES: Record<string, SubtopicNote> = {
  "mole-molar-calculations": MOLE_MOLAR_CALCULATIONS_NOTE,
  "mole-stoichiometry-laws": MOLE_STOICHIOMETRY_LAWS_NOTE,
};

export const MOLE_CONCEPT_SLUGS = Object.keys(MOLE_CONCEPT_NOTES);
