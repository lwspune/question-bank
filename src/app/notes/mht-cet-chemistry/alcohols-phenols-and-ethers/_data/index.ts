import type { SubtopicNote } from "@/app/notes/_types";
import { CLASSIFICATION_NOTE } from "./cetalc-classification";
import { NOMENCLATURE_NOTE } from "./cetalc-nomenclature";
import { PHYSICAL_PROPERTIES_NOTE } from "./cetalc-physical-properties";
import { REACTIONS_OF_ALCOHOLS_NOTE } from "./cetalc-reactions-of-alcohols";
import { PHENOLS_NOTE } from "./cetalc-phenols";
import { ETHERS_NOTE } from "./cetalc-ethers";

export { MHTCET_ALCOHOLS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/alcohols-phenols-and-ethers/[subtopicSlug].
 * `cetalc-` prefix: concept-tag keys are global.
 */
export const MHTCET_ALCOHOLS_NOTES: Record<string, SubtopicNote> = {
  "cetalc-classification": CLASSIFICATION_NOTE,
  "cetalc-nomenclature": NOMENCLATURE_NOTE,
  "cetalc-physical-properties": PHYSICAL_PROPERTIES_NOTE,
  "cetalc-reactions-of-alcohols": REACTIONS_OF_ALCOHOLS_NOTE,
  "cetalc-phenols": PHENOLS_NOTE,
  "cetalc-ethers": ETHERS_NOTE,
};

export const MHTCET_ALCOHOLS_SLUGS = Object.keys(MHTCET_ALCOHOLS_NOTES);
