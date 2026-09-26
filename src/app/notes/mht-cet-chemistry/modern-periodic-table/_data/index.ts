import type { SubtopicNote } from "@/app/notes/_types";
import { POSITION_NOTE } from "./cetmpt-position";
import { TRENDS_NOTE } from "./cetmpt-trends";

export { MHTCET_MPT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/modern-periodic-table/[subtopicSlug].
 * `cetmpt-` prefix: concept-tag keys are global.
 */
export const MHTCET_MPT_NOTES: Record<string, SubtopicNote> = {
  "cetmpt-position": POSITION_NOTE,
  "cetmpt-trends": TRENDS_NOTE,
};

export const MHTCET_MPT_SLUGS = Object.keys(MHTCET_MPT_NOTES);
