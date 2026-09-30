import type { SubtopicNote } from "@/app/notes/_types";
import { HEIGHTS_HD_NOTE } from "./heights";

export { JEE_HEIGHTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/height-and-distance/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-hd-` here and `jhd-` on
 * concept slugs.
 */
export const JEE_HEIGHTS_NOTES: Record<string, SubtopicNote> = {
  "jee-hd-heights": HEIGHTS_HD_NOTE,
};

export const JEE_HEIGHTS_SLUGS = Object.keys(JEE_HEIGHTS_NOTES);
