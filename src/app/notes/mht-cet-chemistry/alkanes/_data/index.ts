import type { SubtopicNote } from "@/app/notes/_types";
import { STRUCTURE_NOTE } from "./cetalkane-structure";
import { PREPARATION_NOTE } from "./cetalkane-preparation";
import { REACTIONS_NOTE } from "./cetalkane-reactions";

export { MHTCET_ALKANES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/alkanes/[subtopicSlug].
 * `cetalkane-` prefix: concept-tag keys are global (`cetalk-` is Alkenes).
 */
export const MHTCET_ALKANES_NOTES: Record<string, SubtopicNote> = {
  "cetalkane-structure": STRUCTURE_NOTE,
  "cetalkane-preparation": PREPARATION_NOTE,
  "cetalkane-reactions": REACTIONS_NOTE,
};

export const MHTCET_ALKANES_SLUGS = Object.keys(MHTCET_ALKANES_NOTES);
