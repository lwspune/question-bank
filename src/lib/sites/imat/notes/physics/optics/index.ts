import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_OPT_REFLECTION_NOTE } from "./reflection-refraction";
import { IMAT_PHY_OPT_LENSES_NOTE } from "./lenses-eye";

export { IMAT_PHY_OPT_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Optics. Order matches `subtopicOrder`. */
export const IMAT_PHY_OPT_NOTES: Record<string, SubtopicNote> = {
  "imat-opt-reflection-refraction": IMAT_PHY_OPT_REFLECTION_NOTE,
  "imat-opt-lenses-eye": IMAT_PHY_OPT_LENSES_NOTE,
};

export const IMAT_PHY_OPT_SLUGS = Object.keys(IMAT_PHY_OPT_NOTES);
