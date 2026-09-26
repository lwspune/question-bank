import type { SubtopicNote } from "@/app/notes/_types";
import { STRUCTURE_NOTE } from "./cetalkyne-structure";
import { REACTIONS_NOTE } from "./cetalkyne-reactions";

export { MHTCET_ALKYNES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/alkynes/[subtopicSlug].
 * `cetalkyne-` prefix: concept-tag keys are global (`cetalk-` is Alkenes).
 */
export const MHTCET_ALKYNES_NOTES: Record<string, SubtopicNote> = {
  "cetalkyne-structure": STRUCTURE_NOTE,
  "cetalkyne-reactions": REACTIONS_NOTE,
};

export const MHTCET_ALKYNES_SLUGS = Object.keys(MHTCET_ALKYNES_NOTES);
