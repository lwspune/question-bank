import type { SubtopicNote } from "@/app/notes/_types";
import { SHAPE_ROTATION_MOTION_NOTE } from "./shape-rotation-motion";
import { LATITUDE_LONGITUDE_GRID_NOTE } from "./latitude-longitude-grid";
import { TIME_ZONES_IDL_NOTE } from "./time-zones-idl";
import { MAPS_GPS_NOTE } from "./maps-gps";
import { PLANETS_SOLAR_SYSTEM_NOTE } from "./planets-solar-system";

export { EARTH_IN_SPACE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-geography/earth-in-space/[subtopicSlug].
 * Keys are GLOBALLY-unique (`eis-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const EARTH_IN_SPACE_NOTES: Record<string, SubtopicNote> = {
  "eis-shape-rotation-motion": SHAPE_ROTATION_MOTION_NOTE,
  "eis-latitude-longitude-grid": LATITUDE_LONGITUDE_GRID_NOTE,
  "eis-time-zones-idl": TIME_ZONES_IDL_NOTE,
  "eis-maps-gps": MAPS_GPS_NOTE,
  "eis-planets-solar-system": PLANETS_SOLAR_SYSTEM_NOTE,
};

export const EARTH_IN_SPACE_SLUGS = Object.keys(EARTH_IN_SPACE_NOTES);
