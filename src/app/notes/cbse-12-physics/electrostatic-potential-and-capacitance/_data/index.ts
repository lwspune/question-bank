import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_EP_POTENTIAL_NOTE } from "./potential";
import { CB_PH_EP_EQUIPOTENTIAL_NOTE } from "./equipotential";
import { CB_PH_EP_ENERGY_NOTE } from "./energy";
import { CB_PH_EP_CONDUCTORS_NOTE } from "./conductors";
import { CB_PH_EP_CAPACITORS_NOTE } from "./capacitors";
import { CB_PH_EP_STORED_NOTE } from "./stored";

export { CB_PH_EP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/electrostatic-potential-and-capacitance/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-ep-` here and `cbpep-` on concept slugs.
 *
 * 6 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_EP_NOTES: Record<string, SubtopicNote> = {
  "cbp-ep-potential": CB_PH_EP_POTENTIAL_NOTE,
  "cbp-ep-equipotential": CB_PH_EP_EQUIPOTENTIAL_NOTE,
  "cbp-ep-energy": CB_PH_EP_ENERGY_NOTE,
  "cbp-ep-conductors": CB_PH_EP_CONDUCTORS_NOTE,
  "cbp-ep-capacitors": CB_PH_EP_CAPACITORS_NOTE,
  "cbp-ep-stored": CB_PH_EP_STORED_NOTE,
};

export const CB_PH_EP_SLUGS = Object.keys(CB_PH_EP_NOTES);
