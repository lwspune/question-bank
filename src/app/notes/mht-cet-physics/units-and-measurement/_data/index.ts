import type { SubtopicNote } from "@/app/notes/_types";
import { ERRORS_NOTE } from "./cetp-um-errors";

export { MHTCET_UNITS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/units-and-measurement/[subtopicSlug].
 * `cetp-um-` prefix: concept-tag keys are global.
 */
export const MHTCET_UNITS_NOTES: Record<string, SubtopicNote> = {
  "cetp-um-errors": ERRORS_NOTE,
};

export const MHTCET_UNITS_SLUGS = Object.keys(MHTCET_UNITS_NOTES);
