import type { SubtopicNote } from "@/app/notes/_types";
import { EXPANSION_TH_NOTE } from "./expansion";
import { CALORIMETRY_TH_NOTE } from "./calorimetry";
import { CONDUCTION_TH_NOTE } from "./conduction";
import { COOLING_TH_NOTE } from "./cooling";

export { JEE_PH_THERMAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/thermal-properties-of-matter/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-thermal-` here and
 * `jpthermal-` on concept slugs.
 */
export const JEE_PH_THERMAL_NOTES: Record<string, SubtopicNote> = {
  "jph-thermal-expansion": EXPANSION_TH_NOTE,
  "jph-thermal-calorimetry": CALORIMETRY_TH_NOTE,
  "jph-thermal-conduction": CONDUCTION_TH_NOTE,
  "jph-thermal-cooling": COOLING_TH_NOTE,
};

export const JEE_PH_THERMAL_SLUGS = Object.keys(JEE_PH_THERMAL_NOTES);
