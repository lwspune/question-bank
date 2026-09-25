import type { SubtopicNote } from "@/app/notes/_types";
import { CARBOHYDRATES_NOTE } from "./cetbio-carbohydrates";
import { GLYCOSIDIC_LINKAGES_NOTE } from "./cetbio-glycosidic-linkages";
import { AMINO_ACIDS_AND_PROTEINS_NOTE } from "./cetbio-amino-acids-and-proteins";
import { NUCLEIC_ACIDS_NOTE } from "./cetbio-nucleic-acids";
import { LIPIDS_AND_ENZYMES_NOTE } from "./cetbio-lipids-and-enzymes";

export { MHTCET_BIOMOLECULES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/biomolecules/[subtopicSlug].
 * `cetbio-` prefix: concept-tag keys are global.
 */
export const MHTCET_BIOMOLECULES_NOTES: Record<string, SubtopicNote> = {
  "cetbio-carbohydrates": CARBOHYDRATES_NOTE,
  "cetbio-glycosidic-linkages": GLYCOSIDIC_LINKAGES_NOTE,
  "cetbio-amino-acids-and-proteins": AMINO_ACIDS_AND_PROTEINS_NOTE,
  "cetbio-nucleic-acids": NUCLEIC_ACIDS_NOTE,
  "cetbio-lipids-and-enzymes": LIPIDS_AND_ENZYMES_NOTE,
};

export const MHTCET_BIOMOLECULES_SLUGS = Object.keys(MHTCET_BIOMOLECULES_NOTES);
