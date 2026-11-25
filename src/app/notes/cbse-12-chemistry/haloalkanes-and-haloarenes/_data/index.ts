import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_HA_CLASSIFICATION_NOTE } from "./classification";
import { CB_CH_HA_NOMENCLATURE_NOTE } from "./nomenclature";
import { CB_CH_HA_BOND_NOTE } from "./bond";
import { CB_CH_HA_PREPARATION_NOTE } from "./preparation";
import { CB_CH_HA_HALOARENES_NOTE } from "./haloarenes";
import { CB_CH_HA_PHYSICAL_NOTE } from "./physical";
import { CB_CH_HA_REACTIONS_NOTE } from "./reactions";
import { CB_CH_HA_POLYHALOGEN_NOTE } from "./polyhalogen";

export { CB_CH_HA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/haloalkanes-and-haloarenes/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-ha-` here and `cbcha-` on concept slugs.
 *
 * 8 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_HA_NOTES: Record<string, SubtopicNote> = {
  "cbc-ha-classification": CB_CH_HA_CLASSIFICATION_NOTE,
  "cbc-ha-nomenclature": CB_CH_HA_NOMENCLATURE_NOTE,
  "cbc-ha-bond": CB_CH_HA_BOND_NOTE,
  "cbc-ha-preparation": CB_CH_HA_PREPARATION_NOTE,
  "cbc-ha-haloarenes": CB_CH_HA_HALOARENES_NOTE,
  "cbc-ha-physical": CB_CH_HA_PHYSICAL_NOTE,
  "cbc-ha-reactions": CB_CH_HA_REACTIONS_NOTE,
  "cbc-ha-polyhalogen": CB_CH_HA_POLYHALOGEN_NOTE,
};

export const CB_CH_HA_SLUGS = Object.keys(CB_CH_HA_NOTES);
