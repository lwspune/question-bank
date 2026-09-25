import type { SubtopicNote } from "@/app/notes/_types";
import { GROUP_16_NOTE } from "./cetg16-group-16";
import { GROUP_17_NOTE } from "./cetg16-group-17";
import { GROUP_18_NOTE } from "./cetg16-group-18";

export { MHTCET_GROUP16_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/elements-of-group-16-17-and-18/[subtopicSlug].
 * `cetg16-` prefix: concept-tag keys are global.
 */
export const MHTCET_GROUP16_NOTES: Record<string, SubtopicNote> = {
  "cetg16-group-16": GROUP_16_NOTE,
  "cetg16-group-17": GROUP_17_NOTE,
  "cetg16-group-18": GROUP_18_NOTE,
};

export const MHTCET_GROUP16_SLUGS = Object.keys(MHTCET_GROUP16_NOTES);
