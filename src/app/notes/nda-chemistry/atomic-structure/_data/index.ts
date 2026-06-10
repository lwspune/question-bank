import type { SubtopicNote } from "@/app/notes/_types";
import { MODELS_NOTE } from "./models";
import { PARTICLES_NOTE } from "./particles";
import { ISOTOPES_NOTE } from "./isotopes";
import { ELECTRON_CONFIG_NOTE } from "./electron-config";
import { PERIODIC_TRENDS_NOTE } from "./periodic-trends";

export { ATOMIC_STRUCTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/atomic-structure/[subtopicSlug].
 * Keys are GLOBALLY-unique (`atom-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const ATOMIC_STRUCTURE_NOTES: Record<string, SubtopicNote> = {
  "atom-models": MODELS_NOTE,
  "atom-particles": PARTICLES_NOTE,
  "atom-isotopes": ISOTOPES_NOTE,
  "atom-electron-config": ELECTRON_CONFIG_NOTE,
  "atom-periodic-trends": PERIODIC_TRENDS_NOTE,
};

export const ATOMIC_STRUCTURE_SLUGS = Object.keys(ATOMIC_STRUCTURE_NOTES);
