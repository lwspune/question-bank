import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_BND_TYPES_NOTE } from "./bond-types";
import { IMAT_CHE_BND_LEWIS_NOTE } from "./lewis";
import { IMAT_CHE_BND_SHAPES_NOTE } from "./shapes";
import { IMAT_CHE_BND_FORCES_NOTE } from "./forces";
import { IMAT_CHE_BND_STRUCTURES_NOTE } from "./structures";

export { IMAT_CHE_BND_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Chemical Bonding. Order matches `subtopicOrder`. */
export const IMAT_CHE_BND_NOTES: Record<string, SubtopicNote> = {
  "imat-bnd-types": IMAT_CHE_BND_TYPES_NOTE,
  "imat-bnd-lewis": IMAT_CHE_BND_LEWIS_NOTE,
  "imat-bnd-shapes": IMAT_CHE_BND_SHAPES_NOTE,
  "imat-bnd-forces": IMAT_CHE_BND_FORCES_NOTE,
  "imat-bnd-structures": IMAT_CHE_BND_STRUCTURES_NOTE,
};

export const IMAT_CHE_BND_SLUGS = Object.keys(IMAT_CHE_BND_NOTES);
