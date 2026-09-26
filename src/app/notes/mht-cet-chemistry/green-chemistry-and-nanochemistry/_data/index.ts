import type { SubtopicNote } from "@/app/notes/_types";
import { GREEN_NOTE } from "./cetgreen-green";
import { NANO_NOTE } from "./cetgreen-nano";

export { MHTCET_GREEN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/green-chemistry-and-nanochemistry/[subtopicSlug].
 * `cetgreen-` prefix: concept-tag keys are global.
 */
export const MHTCET_GREEN_NOTES: Record<string, SubtopicNote> = {
  "cetgreen-green": GREEN_NOTE,
  "cetgreen-nano": NANO_NOTE,
};

export const MHTCET_GREEN_SLUGS = Object.keys(MHTCET_GREEN_NOTES);
