import type { SubtopicNote } from "@/app/notes/_types";
import { VERTICAL_AOI_NOTE } from "./vertical";
import { HORIZONTAL_AOI_NOTE } from "./horizontal";
import { CONICS_AOI_NOTE } from "./conics";
import { MODULUS_AOI_NOTE } from "./modulus";
import { MAXMIN_AOI_NOTE } from "./maxmin";
import { TRANSCENDENTAL_AOI_NOTE } from "./transcendental";
import { PARAMETERS_AOI_NOTE } from "./parameters";

export { JEE_AOI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/application-of-integrals/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-aoi-` here and `jaoi-` on
 * concept slugs.
 */
export const JEE_AOI_NOTES: Record<string, SubtopicNote> = {
  "jee-aoi-vertical": VERTICAL_AOI_NOTE,
  "jee-aoi-horizontal": HORIZONTAL_AOI_NOTE,
  "jee-aoi-conics": CONICS_AOI_NOTE,
  "jee-aoi-modulus": MODULUS_AOI_NOTE,
  "jee-aoi-maxmin": MAXMIN_AOI_NOTE,
  "jee-aoi-transcendental": TRANSCENDENTAL_AOI_NOTE,
  "jee-aoi-parameters": PARAMETERS_AOI_NOTE,
};

export const JEE_AOI_SLUGS = Object.keys(JEE_AOI_NOTES);
