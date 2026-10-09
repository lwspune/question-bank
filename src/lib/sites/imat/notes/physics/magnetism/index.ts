import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_MAG_FIELDS_NOTE } from "./fields";
import { IMAT_PHY_MAG_INDUCTION_NOTE } from "./induction";

export { IMAT_PHY_MAG_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Magnetism. Order matches `subtopicOrder`. */
export const IMAT_PHY_MAG_NOTES: Record<string, SubtopicNote> = {
  "imat-mag-fields": IMAT_PHY_MAG_FIELDS_NOTE,
  "imat-mag-induction": IMAT_PHY_MAG_INDUCTION_NOTE,
};

export const IMAT_PHY_MAG_SLUGS = Object.keys(IMAT_PHY_MAG_NOTES);
