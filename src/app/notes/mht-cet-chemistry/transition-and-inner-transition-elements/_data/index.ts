import type { SubtopicNote } from "@/app/notes/_types";
import { POSITION_AND_CONFIGURATION_NOTE } from "./cettr-position-and-configuration";
import { OXIDATION_STATES_NOTE } from "./cettr-oxidation-states";
import { COLOUR_AND_MAGNETISM_NOTE } from "./cettr-colour-and-magnetism";
import { ALLOYS_ORES_CATALYSTS_NOTE } from "./cettr-alloys-ores-catalysts";
import { LANTHANOIDS_AND_ACTINOIDS_NOTE } from "./cettr-lanthanoids-and-actinoids";

export { MHTCET_TRANSITION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/transition-and-inner-transition-elements/[subtopicSlug].
 * `cettr-` prefix: concept-tag keys are global.
 */
export const MHTCET_TRANSITION_NOTES: Record<string, SubtopicNote> = {
  "cettr-position-and-configuration": POSITION_AND_CONFIGURATION_NOTE,
  "cettr-oxidation-states": OXIDATION_STATES_NOTE,
  "cettr-colour-and-magnetism": COLOUR_AND_MAGNETISM_NOTE,
  "cettr-alloys-ores-catalysts": ALLOYS_ORES_CATALYSTS_NOTE,
  "cettr-lanthanoids-and-actinoids": LANTHANOIDS_AND_ACTINOIDS_NOTE,
};

export const MHTCET_TRANSITION_SLUGS = Object.keys(MHTCET_TRANSITION_NOTES);
