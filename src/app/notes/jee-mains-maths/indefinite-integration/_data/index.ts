import type { SubtopicNote } from "@/app/notes/_types";
import { SUBSTITUTION_II_NOTE } from "./substitution";
import { RATIONAL_II_NOTE } from "./rational";
import { TRIG_II_NOTE } from "./trig";
import { PARTS_II_NOTE } from "./parts";

export { JEE_INDEFINITE_INTEGRATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/indefinite-integration/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-ii-` here and `jii-` on
 * concept slugs.
 */
export const JEE_INDEFINITE_INTEGRATION_NOTES: Record<string, SubtopicNote> = {
  "jee-ii-substitution": SUBSTITUTION_II_NOTE,
  "jee-ii-rational": RATIONAL_II_NOTE,
  "jee-ii-trig": TRIG_II_NOTE,
  "jee-ii-parts": PARTS_II_NOTE,
};

export const JEE_INDEFINITE_INTEGRATION_SLUGS = Object.keys(JEE_INDEFINITE_INTEGRATION_NOTES);
