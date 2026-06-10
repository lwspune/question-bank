import type { SubtopicNote } from "@/app/notes/_types";
import { GRAVITATION_NEWTONS_LAW_NOTE } from "./newtons-law";
import { GRAVITATION_FIELD_AND_POTENTIAL_NOTE } from "./field-and-potential";
import { GRAVITATION_ORBITS_KEPLER_ESCAPE_NOTE } from "./orbits-kepler-escape";

export { GRAVITATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-physics/gravitation/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const GRAVITATION_NOTES: Record<string, SubtopicNote> = {
  "grav-newtons-law": GRAVITATION_NEWTONS_LAW_NOTE,
  "grav-field-and-potential": GRAVITATION_FIELD_AND_POTENTIAL_NOTE,
  "grav-orbits-kepler-escape": GRAVITATION_ORBITS_KEPLER_ESCAPE_NOTE,
};

export const GRAVITATION_SLUGS = Object.keys(GRAVITATION_NOTES);
