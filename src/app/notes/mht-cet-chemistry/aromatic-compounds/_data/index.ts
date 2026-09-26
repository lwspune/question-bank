import type { SubtopicNote } from "@/app/notes/_types";
import { STRUCTURE_NOTE } from "./cetarom-structure";
import { EAS_NOTE } from "./cetarom-eas";
import { TRANSFORMATIONS_NOTE } from "./cetarom-transformations";

export { MHTCET_AROMATIC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/aromatic-compounds/[subtopicSlug].
 * `cetarom-` prefix: concept-tag keys are global.
 */
export const MHTCET_AROMATIC_NOTES: Record<string, SubtopicNote> = {
  "cetarom-structure": STRUCTURE_NOTE,
  "cetarom-eas": EAS_NOTE,
  "cetarom-transformations": TRANSFORMATIONS_NOTE,
};

export const MHTCET_AROMATIC_SLUGS = Object.keys(MHTCET_AROMATIC_NOTES);
