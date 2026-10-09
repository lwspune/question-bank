import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_INO_OXIDATION_NOTE } from "./oxidation";
import { IMAT_CHE_INO_CLASSES_NOTE } from "./classes";
import { IMAT_CHE_INO_NAMING_NOTE } from "./naming";

export { IMAT_CHE_INO_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Inorganic Compounds and Nomenclature. Order matches `subtopicOrder`. */
export const IMAT_CHE_INO_NOTES: Record<string, SubtopicNote> = {
  "imat-ino-oxidation": IMAT_CHE_INO_OXIDATION_NOTE,
  "imat-ino-classes": IMAT_CHE_INO_CLASSES_NOTE,
  "imat-ino-naming": IMAT_CHE_INO_NAMING_NOTE,
};

export const IMAT_CHE_INO_SLUGS = Object.keys(IMAT_CHE_INO_NOTES);
