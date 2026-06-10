import type { SubtopicNote } from "@/app/notes/_types";
import { STATES_NOTE } from "./states";
import { CHANGES_NOTE } from "./changes";
import { MIXTURES_NOTE } from "./mixtures";
import { COLLOIDS_NOTE } from "./colloids";
import { SEPARATION_NOTE } from "./separation";

export { MATTER_STATES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/matter-states/[subtopicSlug].
 * Keys are GLOBALLY-unique (`matt-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const MATTER_STATES_NOTES: Record<string, SubtopicNote> = {
  "matt-states": STATES_NOTE,
  "matt-changes": CHANGES_NOTE,
  "matt-mixtures": MIXTURES_NOTE,
  "matt-colloids": COLLOIDS_NOTE,
  "matt-separation": SEPARATION_NOTE,
};

export const MATTER_STATES_SLUGS = Object.keys(MATTER_STATES_NOTES);
