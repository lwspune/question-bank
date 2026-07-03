import type { SubtopicNote } from "@/app/notes/_types";
import { SI_UNITS_NOTE } from "./cetsbcc-si-units";
import { LAWS_COMBINATION_NOTE } from "./cetsbcc-laws-of-combination";
import { MOLE_INTERCONVERSIONS_NOTE } from "./cetsbcc-mole-interconversions";
import { STOICHIOMETRY_NOTE } from "./cetsbcc-stoichiometry-concentration";

export { SOME_BASIC_CONCEPTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-chemistry/some-basic-concepts/[subtopicSlug].
 * Keys are GLOBALLY-unique (`cetsbcc-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 * (Gas Laws + Dalton/KTG were carved out to a separate "States of Matter"
 * chapter 2026-07-03 to match the Maharashtra State Board chapter boundary.)
 */
export const SOME_BASIC_CONCEPTS_NOTES: Record<string, SubtopicNote> = {
  "cetsbcc-si-units": SI_UNITS_NOTE,
  "cetsbcc-laws-of-combination": LAWS_COMBINATION_NOTE,
  "cetsbcc-mole-interconversions": MOLE_INTERCONVERSIONS_NOTE,
  "cetsbcc-stoichiometry-concentration": STOICHIOMETRY_NOTE,
};

export const SOME_BASIC_CONCEPTS_SLUGS = Object.keys(SOME_BASIC_CONCEPTS_NOTES);
