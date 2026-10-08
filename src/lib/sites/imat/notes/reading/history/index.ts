import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_REA_HIS_ANCIENT_NOTE } from "./ancient";
import { IMAT_REA_HIS_MEDIEVAL_NOTE } from "./medieval";
import { IMAT_REA_HIS_REVOLUTIONS_NOTE } from "./revolutions";
import { IMAT_REA_HIS_TWENTIETH_NOTE } from "./twentieth";
import { IMAT_REA_HIS_SCIENCE_NOTE } from "./science";

export { IMAT_REA_HIS_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Reading and General Knowledge, History. Order matches `subtopicOrder`. */
export const IMAT_REA_HIS_NOTES: Record<string, SubtopicNote> = {
  "imat-his-ancient": IMAT_REA_HIS_ANCIENT_NOTE,
  "imat-his-medieval": IMAT_REA_HIS_MEDIEVAL_NOTE,
  "imat-his-revolutions": IMAT_REA_HIS_REVOLUTIONS_NOTE,
  "imat-his-twentieth": IMAT_REA_HIS_TWENTIETH_NOTE,
  "imat-his-science": IMAT_REA_HIS_SCIENCE_NOTE,
};

export const IMAT_REA_HIS_SLUGS = Object.keys(IMAT_REA_HIS_NOTES);
