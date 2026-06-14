import type { SubtopicNote } from "@/app/notes/_types";
import { WAVES_SEAFLOOR_NOTE } from "./waves-seafloor";
import { TIDES_MOVEMENTS_NOTE } from "./tides-movements";
import { CURRENTS_NOTE } from "./currents";
import { MARINE_ECOSYSTEMS_NOTE } from "./marine-ecosystems";

export { OCEANOGRAPHY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-geography/oceanography/[subtopicSlug].
 * Keys are GLOBALLY-unique (`ocn-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const OCEANOGRAPHY_NOTES: Record<string, SubtopicNote> = {
  "ocn-waves-seafloor": WAVES_SEAFLOOR_NOTE,
  "ocn-tides-movements": TIDES_MOVEMENTS_NOTE,
  "ocn-currents": CURRENTS_NOTE,
  "ocn-marine-ecosystems": MARINE_ECOSYSTEMS_NOTE,
};

export const OCEANOGRAPHY_SLUGS = Object.keys(OCEANOGRAPHY_NOTES);
