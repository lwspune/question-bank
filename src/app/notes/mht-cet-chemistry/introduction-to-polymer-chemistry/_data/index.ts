import type { SubtopicNote } from "@/app/notes/_types";
import { CLASSIFICATION_NOTE } from "./cetpol-classification";
import { POLYMERISATION_METHODS_NOTE } from "./cetpol-polymerisation-methods";
import { POLYMERS_AND_MONOMERS_NOTE } from "./cetpol-polymers-and-monomers";
import { PROPERTIES_AND_USES_NOTE } from "./cetpol-properties-and-uses";

export { MHTCET_POLYMERS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/introduction-to-polymer-chemistry/[subtopicSlug].
 * `cetpol-` prefix: concept-tag keys are global.
 */
export const MHTCET_POLYMERS_NOTES: Record<string, SubtopicNote> = {
  "cetpol-classification": CLASSIFICATION_NOTE,
  "cetpol-polymerisation-methods": POLYMERISATION_METHODS_NOTE,
  "cetpol-polymers-and-monomers": POLYMERS_AND_MONOMERS_NOTE,
  "cetpol-properties-and-uses": PROPERTIES_AND_USES_NOTE,
};

export const MHTCET_POLYMERS_SLUGS = Object.keys(MHTCET_POLYMERS_NOTES);
