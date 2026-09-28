import type { SubtopicNote } from "@/app/notes/_types";
import { SPRINGS_NOTE } from "./cetp-ms-springs";

export { MHTCET_SOLIDS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/mechanical-properties-of-solids/[subtopicSlug].
 * `cetp-ms-` prefix: concept-tag keys are global.
 */
export const MHTCET_SOLIDS_NOTES: Record<string, SubtopicNote> = {
  "cetp-ms-springs": SPRINGS_NOTE,
};

export const MHTCET_SOLIDS_SLUGS = Object.keys(MHTCET_SOLIDS_NOTES);
