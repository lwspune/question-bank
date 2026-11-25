import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_MC_FORCE_NOTE } from "./force";
import { CB_PH_MC_BIOT_NOTE } from "./biot";
import { CB_PH_MC_AMPERE_NOTE } from "./ampere";
import { CB_PH_MC_PARALLEL_NOTE } from "./parallel";
import { CB_PH_MC_TORQUE_NOTE } from "./torque";
import { CB_PH_MC_GALVANOMETER_NOTE } from "./galvanometer";

export { CB_PH_MC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/moving-charges-and-magnetism/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-mc-` here and `cbpmc-` on concept slugs.
 *
 * 6 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_MC_NOTES: Record<string, SubtopicNote> = {
  "cbp-mc-force": CB_PH_MC_FORCE_NOTE,
  "cbp-mc-biot": CB_PH_MC_BIOT_NOTE,
  "cbp-mc-ampere": CB_PH_MC_AMPERE_NOTE,
  "cbp-mc-parallel": CB_PH_MC_PARALLEL_NOTE,
  "cbp-mc-torque": CB_PH_MC_TORQUE_NOTE,
  "cbp-mc-galvanometer": CB_PH_MC_GALVANOMETER_NOTE,
};

export const CB_PH_MC_SLUGS = Object.keys(CB_PH_MC_NOTES);
