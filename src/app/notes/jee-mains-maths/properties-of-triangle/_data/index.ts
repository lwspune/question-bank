import type { SubtopicNote } from "@/app/notes/_types";
import { TRIANGLES_POT_NOTE } from "./triangles";

export { JEE_TRIANGLE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/properties-of-triangle/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-pot-` here and `jpot-` on
 * concept slugs.
 */
export const JEE_TRIANGLE_NOTES: Record<string, SubtopicNote> = {
  "jee-pot-triangles": TRIANGLES_POT_NOTE,
};

export const JEE_TRIANGLE_SLUGS = Object.keys(JEE_TRIANGLE_NOTES);
