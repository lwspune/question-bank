import type { SubtopicNote } from "@/app/notes/_types";
import { FIELD_GRAV_NOTE } from "./field";
import { HEIGHT_GRAV_NOTE } from "./height";
import { DEPTH_GRAV_NOTE } from "./depth";
import { ESCAPE_GRAV_NOTE } from "./escape";
import { SATELLITES_GRAV_NOTE } from "./satellites";
import { KEPLER_GRAV_NOTE } from "./kepler";

export { JEE_PH_GRAV_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/gravitation/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-grav-` here and `jpgrav-` on
 * concept slugs.
 */
export const JEE_PH_GRAV_NOTES: Record<string, SubtopicNote> = {
  "jph-grav-field": FIELD_GRAV_NOTE,
  "jph-grav-height": HEIGHT_GRAV_NOTE,
  "jph-grav-depth": DEPTH_GRAV_NOTE,
  "jph-grav-escape": ESCAPE_GRAV_NOTE,
  "jph-grav-satellites": SATELLITES_GRAV_NOTE,
  "jph-grav-kepler": KEPLER_GRAV_NOTE,
};

export const JEE_PH_GRAV_SLUGS = Object.keys(JEE_PH_GRAV_NOTES);
