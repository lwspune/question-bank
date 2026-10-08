import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_ORG_BONDING_NOTE } from "./bonding";
import { IMAT_CHE_ORG_HYDROCARBONS_NOTE } from "./hydrocarbons";
import { IMAT_CHE_ORG_GROUPS_NOTE } from "./groups";
import { IMAT_CHE_ORG_ISOMERISM_NOTE } from "./isomerism";
import { IMAT_CHE_ORG_REACTIONS_NOTE } from "./reactions";
import { IMAT_CHE_ORG_PROPERTIES_NOTE } from "./properties";

export { IMAT_CHE_ORG_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Organic Chemistry. Order matches `subtopicOrder`. */
export const IMAT_CHE_ORG_NOTES: Record<string, SubtopicNote> = {
  "imat-org-bonding": IMAT_CHE_ORG_BONDING_NOTE,
  "imat-org-hydrocarbons": IMAT_CHE_ORG_HYDROCARBONS_NOTE,
  "imat-org-groups": IMAT_CHE_ORG_GROUPS_NOTE,
  "imat-org-isomerism": IMAT_CHE_ORG_ISOMERISM_NOTE,
  "imat-org-reactions": IMAT_CHE_ORG_REACTIONS_NOTE,
  "imat-org-properties": IMAT_CHE_ORG_PROPERTIES_NOTE,
};

export const IMAT_CHE_ORG_SLUGS = Object.keys(IMAT_CHE_ORG_NOTES);
