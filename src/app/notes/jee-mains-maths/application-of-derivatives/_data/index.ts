import type { SubtopicNote } from "@/app/notes/_types";
import { TANGENTS_AOD_NOTE } from "./tangents";
import { MONOTONIC_AOD_NOTE } from "./monotonic";
import { ROOTS_AOD_NOTE } from "./roots";
import { EXTREMA_AOD_NOTE } from "./extrema";
import { BUILD_AOD_NOTE } from "./build";
import { ABSOLUTE_AOD_NOTE } from "./absolute";
import { OPTIMISE_AOD_NOTE } from "./optimise";
import { ROLLE_AOD_NOTE } from "./rolle";

export { JEE_AOD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/application-of-derivatives/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-aod-` here and `jaod-` on
 * concept slugs.
 */
export const JEE_AOD_NOTES: Record<string, SubtopicNote> = {
  "jee-aod-tangents": TANGENTS_AOD_NOTE,
  "jee-aod-monotonic": MONOTONIC_AOD_NOTE,
  "jee-aod-roots": ROOTS_AOD_NOTE,
  "jee-aod-extrema": EXTREMA_AOD_NOTE,
  "jee-aod-build": BUILD_AOD_NOTE,
  "jee-aod-absolute": ABSOLUTE_AOD_NOTE,
  "jee-aod-optimise": OPTIMISE_AOD_NOTE,
  "jee-aod-rolle": ROLLE_AOD_NOTE,
};

export const JEE_AOD_SLUGS = Object.keys(JEE_AOD_NOTES);
