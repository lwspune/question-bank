import type { SubtopicNote } from "@/app/notes/_types";
import { CLASSIFICATION_NOTE } from "./cethal-classification-and-properties";
import { PREPARATION_NOTE } from "./cethal-preparation";
import { NUCLEOPHILIC_SUBSTITUTION_NOTE } from "./cethal-nucleophilic-substitution";
import { ELIMINATION_AND_HALOARENES_NOTE } from "./cethal-elimination-and-haloarenes";
import { POLYHALOGEN_NOTE } from "./cethal-polyhalogen-compounds";

export { MHTCET_HALOGEN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/halogen-derivatives/[subtopicSlug].
 * `cethal-` prefix: concept-tag keys are global.
 */
export const MHTCET_HALOGEN_NOTES: Record<string, SubtopicNote> = {
  "cethal-classification-and-properties": CLASSIFICATION_NOTE,
  "cethal-preparation": PREPARATION_NOTE,
  "cethal-nucleophilic-substitution": NUCLEOPHILIC_SUBSTITUTION_NOTE,
  "cethal-elimination-and-haloarenes": ELIMINATION_AND_HALOARENES_NOTE,
  "cethal-polyhalogen-compounds": POLYHALOGEN_NOTE,
};

export const MHTCET_HALOGEN_SLUGS = Object.keys(MHTCET_HALOGEN_NOTES);
