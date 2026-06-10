import type { SubtopicNote } from "@/app/notes/_types";
import { TYPES_OF_FORCES_NOTE } from "./types-of-forces";
import { NEWTONS_LAWS_NOTE } from "./newtons-laws";
import { MOMENTUM_AND_IMPULSE_NOTE } from "./momentum-and-impulse";
import { CONSERVATION_AND_COLLISIONS_NOTE } from "./conservation-and-collisions";
import { FRICTION_NOTE } from "./friction";

export { LAWS_OF_MOTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-physics/laws-of-motion/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const LAWS_OF_MOTION_NOTES: Record<string, SubtopicNote> = {
  "lmf-types-of-forces": TYPES_OF_FORCES_NOTE,
  "lmf-newtons-laws": NEWTONS_LAWS_NOTE,
  "lmf-momentum-and-impulse": MOMENTUM_AND_IMPULSE_NOTE,
  "lmf-conservation-and-collisions": CONSERVATION_AND_COLLISIONS_NOTE,
  "lmf-friction": FRICTION_NOTE,
};

export const LAWS_OF_MOTION_SLUGS = Object.keys(LAWS_OF_MOTION_NOTES);
