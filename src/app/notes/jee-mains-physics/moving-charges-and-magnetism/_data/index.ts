import type { SubtopicNote } from "@/app/notes/_types";
import { WIRES_MAG_NOTE } from "./wires";
import { LOOPS_MAG_NOTE } from "./loops";
import { AMPERE_MAG_NOTE } from "./ampere";
import { LORENTZ_MAG_NOTE } from "./lorentz";
import { CIRCULAR_MAG_NOTE } from "./circular";
import { CURRENTS_MAG_NOTE } from "./currents";
import { GALVANOMETER_MAG_NOTE } from "./galvanometer";

export { JEE_PH_MAG_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/moving-charges-and-magnetism/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-mag-` here and `jpmag-` on
 * concept slugs.
 */
export const JEE_PH_MAG_NOTES: Record<string, SubtopicNote> = {
  "jph-mag-wires": WIRES_MAG_NOTE,
  "jph-mag-loops": LOOPS_MAG_NOTE,
  "jph-mag-ampere": AMPERE_MAG_NOTE,
  "jph-mag-lorentz": LORENTZ_MAG_NOTE,
  "jph-mag-circular": CIRCULAR_MAG_NOTE,
  "jph-mag-currents": CURRENTS_MAG_NOTE,
  "jph-mag-galvanometer": GALVANOMETER_MAG_NOTE,
};

export const JEE_PH_MAG_SLUGS = Object.keys(JEE_PH_MAG_NOTES);
