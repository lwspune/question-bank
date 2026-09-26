import type { SubtopicNote } from "@/app/notes/_types";
import { GROUP_1_NOTE } from "./cetg12-group-1";
import { GROUP_2_NOTE } from "./cetg12-group-2";
import { INDUSTRY_NOTE } from "./cetg12-industry";

export { MHTCET_GROUP12_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/elements-of-group-1-and-2/[subtopicSlug].
 * `cetg12-` prefix: concept-tag keys are global.
 */
export const MHTCET_GROUP12_NOTES: Record<string, SubtopicNote> = {
  "cetg12-group-1": GROUP_1_NOTE,
  "cetg12-group-2": GROUP_2_NOTE,
  "cetg12-industry": INDUSTRY_NOTE,
};

export const MHTCET_GROUP12_SLUGS = Object.keys(MHTCET_GROUP12_NOTES);
