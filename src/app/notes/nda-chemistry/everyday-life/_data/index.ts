import type { SubtopicNote } from "@/app/notes/_types";
import { COMMON_CHEMICALS_NOTE } from "./common-chemicals";
import { MEDICINES_NOTE } from "./medicines";

export { EVERYDAY_LIFE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/everyday-life/[subtopicSlug].
 * Keys are GLOBALLY-unique (`life-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const EVERYDAY_LIFE_NOTES: Record<string, SubtopicNote> = {
  "life-common-chemicals": COMMON_CHEMICALS_NOTE,
  "life-medicines": MEDICINES_NOTE,
};

export const EVERYDAY_LIFE_SLUGS = Object.keys(EVERYDAY_LIFE_NOTES);
