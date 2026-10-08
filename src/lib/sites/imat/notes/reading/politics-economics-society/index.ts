import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_REA_PES_GOVERNMENT_NOTE } from "./government";
import { IMAT_REA_PES_ITALY_NOTE } from "./italy";
import { IMAT_REA_PES_INTERNATIONAL_NOTE } from "./international";
import { IMAT_REA_PES_ECONOMICS_NOTE } from "./economics";
import { IMAT_REA_PES_SOCIETY_NOTE } from "./society";

export { IMAT_REA_PES_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Reading and General Knowledge, Politics, Economics and Society. Order matches `subtopicOrder`. */
export const IMAT_REA_PES_NOTES: Record<string, SubtopicNote> = {
  "imat-pes-government": IMAT_REA_PES_GOVERNMENT_NOTE,
  "imat-pes-italy": IMAT_REA_PES_ITALY_NOTE,
  "imat-pes-international": IMAT_REA_PES_INTERNATIONAL_NOTE,
  "imat-pes-economics": IMAT_REA_PES_ECONOMICS_NOTE,
  "imat-pes-society": IMAT_REA_PES_SOCIETY_NOTE,
};

export const IMAT_REA_PES_SLUGS = Object.keys(IMAT_REA_PES_NOTES);
