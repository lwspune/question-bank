import type { SubtopicNote } from "@/app/notes/_types";
import { WORK_WEP_NOTE } from "./work";
import { WET_WEP_NOTE } from "./wet";
import { ENERGY_WEP_NOTE } from "./energy";
import { POWER_WEP_NOTE } from "./power";
import { MOMENTUM_WEP_NOTE } from "./momentum";
import { COLLISIONS_WEP_NOTE } from "./collisions";

export { JEE_PH_WEP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/work-energy-and-power/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-wep-` here and `jpwep-` on
 * concept slugs.
 */
export const JEE_PH_WEP_NOTES: Record<string, SubtopicNote> = {
  "jph-wep-work": WORK_WEP_NOTE,
  "jph-wep-wet": WET_WEP_NOTE,
  "jph-wep-energy": ENERGY_WEP_NOTE,
  "jph-wep-power": POWER_WEP_NOTE,
  "jph-wep-momentum": MOMENTUM_WEP_NOTE,
  "jph-wep-collisions": COLLISIONS_WEP_NOTE,
};

export const JEE_PH_WEP_SLUGS = Object.keys(JEE_PH_WEP_NOTES);
