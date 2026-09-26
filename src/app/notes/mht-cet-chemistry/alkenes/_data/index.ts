import type { SubtopicNote } from "@/app/notes/_types";
import { ALKENE_STRUCTURE_NOTE } from "./cetalk-structure";
import { ALKENE_PREPARATION_NOTE } from "./cetalk-preparation";
import { ALKENE_REACTIONS_NOTE } from "./cetalk-reactions";

export { MHTCET_ALKENES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/alkenes/[subtopicSlug].
 * `cetalk-` prefix: concept-tag keys are global.
 */
export const MHTCET_ALKENES_NOTES: Record<string, SubtopicNote> = {
  "cetalk-structure": ALKENE_STRUCTURE_NOTE,
  "cetalk-preparation": ALKENE_PREPARATION_NOTE,
  "cetalk-reactions": ALKENE_REACTIONS_NOTE,
};

export const MHTCET_ALKENES_SLUGS = Object.keys(MHTCET_ALKENES_NOTES);
