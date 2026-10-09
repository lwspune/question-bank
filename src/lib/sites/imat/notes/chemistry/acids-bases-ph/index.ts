import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_ABP_DEFINITIONS_NOTE } from "./definitions";
import { IMAT_CHE_ABP_PH_SCALE_NOTE } from "./ph-scale";
import { IMAT_CHE_ABP_STRONG_NOTE } from "./strong";
import { IMAT_CHE_ABP_WEAK_NOTE } from "./weak";
import { IMAT_CHE_ABP_SALTS_NOTE } from "./salts";
import { IMAT_CHE_ABP_TITRATION_BUFFERS_NOTE } from "./titration-buffers";

export { IMAT_CHE_ABP_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Acids, Bases and pH. Order matches `subtopicOrder`. */
export const IMAT_CHE_ABP_NOTES: Record<string, SubtopicNote> = {
  "imat-abp-definitions-page": IMAT_CHE_ABP_DEFINITIONS_NOTE,
  "imat-abp-ph-scale-page": IMAT_CHE_ABP_PH_SCALE_NOTE,
  "imat-abp-strong-page": IMAT_CHE_ABP_STRONG_NOTE,
  "imat-abp-weak-page": IMAT_CHE_ABP_WEAK_NOTE,
  "imat-abp-salts-page": IMAT_CHE_ABP_SALTS_NOTE,
  "imat-abp-titration-page": IMAT_CHE_ABP_TITRATION_BUFFERS_NOTE,
};

export const IMAT_CHE_ABP_SLUGS = Object.keys(IMAT_CHE_ABP_NOTES);
