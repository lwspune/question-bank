import type { SubtopicNote } from "@/app/notes/_types";
import { LAYERS_NOTE } from "./layers";
import { INSOLATION_NOTE } from "./insolation";
import { PRESSURE_WINDS_NOTE } from "./pressure-winds";
import { HUMIDITY_NOTE } from "./humidity";
import { CYCLONES_NOTE } from "./cyclones";
import { CLIMATE_ZONES_NOTE } from "./climate-zones";

export { CLIMATOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-geography/climatology/[subtopicSlug].
 * Keys are GLOBALLY-unique (`clim-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const CLIMATOLOGY_NOTES: Record<string, SubtopicNote> = {
  "clim-layers": LAYERS_NOTE,
  "clim-insolation": INSOLATION_NOTE,
  "clim-pressure-winds": PRESSURE_WINDS_NOTE,
  "clim-humidity": HUMIDITY_NOTE,
  "clim-cyclones": CYCLONES_NOTE,
  "clim-climate-zones": CLIMATE_ZONES_NOTE,
};

export const CLIMATOLOGY_SLUGS = Object.keys(CLIMATOLOGY_NOTES);
