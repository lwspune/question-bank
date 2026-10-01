import type { SubtopicNote } from "@/app/notes/_types";
import { JUNCTION_SEMI_NOTE } from "./junction";
import { DIODES_SEMI_NOTE } from "./diodes";
import { ZENER_SEMI_NOTE } from "./zener";
import { TRANSISTOR_SEMI_NOTE } from "./transistor";
import { GATES_SEMI_NOTE } from "./gates";
import { TABLES_SEMI_NOTE } from "./tables";

export { JEE_PH_SEMI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/semiconductor-electronics/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-semi-` here and `jpsemi-` on
 * concept slugs.
 */
export const JEE_PH_SEMI_NOTES: Record<string, SubtopicNote> = {
  "jph-semi-junction": JUNCTION_SEMI_NOTE,
  "jph-semi-diodes": DIODES_SEMI_NOTE,
  "jph-semi-zener": ZENER_SEMI_NOTE,
  "jph-semi-transistor": TRANSISTOR_SEMI_NOTE,
  "jph-semi-gates": GATES_SEMI_NOTE,
  "jph-semi-tables": TABLES_SEMI_NOTE,
};

export const JEE_PH_SEMI_SLUGS = Object.keys(JEE_PH_SEMI_NOTES);
