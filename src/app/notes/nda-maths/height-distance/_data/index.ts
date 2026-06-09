import type { SubtopicNote } from "@/app/notes/_types";
import { ANGLES_OF_ELEVATION_NOTE } from "./angles-of-elevation";
import { SHADOWS_AND_SPECIAL_NOTE } from "./shadows-and-special";

export { HEIGHT_DISTANCE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-maths/height-distance/[subtopicSlug].
 * Keys are the URL slugs; chapter.subtopicOrder owns rendering order. The
 * `hd-` prefix keeps the subtopic slugs (and therefore the concept-tag keys)
 * globally unique.
 */
export const HEIGHT_DISTANCE_NOTES: Record<string, SubtopicNote> = {
  "hd-angles-of-elevation": ANGLES_OF_ELEVATION_NOTE,
  "hd-shadows-and-special": SHADOWS_AND_SPECIAL_NOTE,
};

export const HEIGHT_DISTANCE_SLUGS = Object.keys(HEIGHT_DISTANCE_NOTES);
