import type { SubtopicNote } from "@/app/notes/_types";
import { GAS_LAWS_NOTE } from "./cetsom-gas-laws";
import { DALTON_KTG_NOTE } from "./cetsom-dalton-ktg";

export { STATES_OF_MATTER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-chemistry/states-of-matter/[subtopicSlug].
 * Keys are GLOBALLY-unique (`cetsom-` prefixed) — they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 * (Carved out of "Some Basic Concepts of Chemistry" 2026-07-03 to match the
 * Maharashtra State Board chapter boundary, which teaches gas laws / KTG here.)
 */
export const STATES_OF_MATTER_NOTES: Record<string, SubtopicNote> = {
  "cetsom-gas-laws": GAS_LAWS_NOTE,
  "cetsom-dalton-ktg": DALTON_KTG_NOTE,
};

export const STATES_OF_MATTER_SLUGS = Object.keys(STATES_OF_MATTER_NOTES);
