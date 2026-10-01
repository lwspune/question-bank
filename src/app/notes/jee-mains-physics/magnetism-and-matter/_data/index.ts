import type { SubtopicNote } from "@/app/notes/_types";
import { DIPOLES_MM_NOTE } from "./dipoles";
import { EARTH_MM_NOTE } from "./earth";
import { MATERIALS_MM_NOTE } from "./materials";

export { JEE_PH_MM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/magnetism-and-matter/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-mm-` here and `jpmm-` on
 * concept slugs.
 */
export const JEE_PH_MM_NOTES: Record<string, SubtopicNote> = {
  "jph-mm-dipoles": DIPOLES_MM_NOTE,
  "jph-mm-earth": EARTH_MM_NOTE,
  "jph-mm-materials": MATERIALS_MM_NOTE,
};

export const JEE_PH_MM_SLUGS = Object.keys(JEE_PH_MM_NOTES);
