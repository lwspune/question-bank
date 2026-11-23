import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_SS_CLASSES_NOTE } from "./classes";
import { HSC_CH_SS_LATTICE_NOTE } from "./lattice";
import { HSC_CH_SS_CUBIC_NOTE } from "./cubic";
import { HSC_CH_SS_PACKING_NOTE } from "./packing";
import { HSC_CH_SS_EFFICIENCY_NOTE } from "./efficiency";
import { HSC_CH_SS_DEFECTS_NOTE } from "./defects";
import { HSC_CH_SS_CONDUCTION_NOTE } from "./conduction";
import { HSC_CH_SS_MAGNETISM_NOTE } from "./magnetism";

export { HSC_CH_SS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/solid-state/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-ss-` here and `hsccss-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_SS_NOTES: Record<string, SubtopicNote> = {
  "hscc-ss-classes": HSC_CH_SS_CLASSES_NOTE,
  "hscc-ss-lattice": HSC_CH_SS_LATTICE_NOTE,
  "hscc-ss-cubic": HSC_CH_SS_CUBIC_NOTE,
  "hscc-ss-packing": HSC_CH_SS_PACKING_NOTE,
  "hscc-ss-efficiency": HSC_CH_SS_EFFICIENCY_NOTE,
  "hscc-ss-defects": HSC_CH_SS_DEFECTS_NOTE,
  "hscc-ss-conduction": HSC_CH_SS_CONDUCTION_NOTE,
  "hscc-ss-magnetism": HSC_CH_SS_MAGNETISM_NOTE,
};

export const HSC_CH_SS_SLUGS = Object.keys(HSC_CH_SS_NOTES);
