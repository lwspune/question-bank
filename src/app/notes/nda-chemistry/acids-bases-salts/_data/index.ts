import type { SubtopicNote } from "@/app/notes/_types";
import { ACID_BASE_THEORY_NOTE } from "./acid-base-theory";
import { COMMON_ACIDS_NOTE } from "./common-acids";
import { PH_SCALE_NOTE } from "./ph-scale";
import { SALTS_NOTE } from "./salts";
import { WATER_OF_CRYSTALLIZATION_NOTE } from "./water-of-crystallization";

export { ACIDS_BASES_SALTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/acids-bases-salts/[subtopicSlug].
 * Keys are GLOBALLY-unique (`acid-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const ACIDS_BASES_SALTS_NOTES: Record<string, SubtopicNote> = {
  "acid-acid-base-theory": ACID_BASE_THEORY_NOTE,
  "acid-common-acids": COMMON_ACIDS_NOTE,
  "acid-ph-scale": PH_SCALE_NOTE,
  "acid-salts": SALTS_NOTE,
  "acid-water-of-crystallization": WATER_OF_CRYSTALLIZATION_NOTE,
};

export const ACIDS_BASES_SALTS_SLUGS = Object.keys(ACIDS_BASES_SALTS_NOTES);
