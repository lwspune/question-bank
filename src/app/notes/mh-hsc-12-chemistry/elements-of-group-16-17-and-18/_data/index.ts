import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_GP_OCCURRENCE_NOTE } from "./occurrence";
import { HSC_CH_GP_PROPERTIES_NOTE } from "./properties";
import { HSC_CH_GP_ANOMALOUS_NOTE } from "./anomalous";
import { HSC_CH_GP_CHEMICAL_NOTE } from "./chemical";
import { HSC_CH_GP_ALLOTROPY_NOTE } from "./allotropy";
import { HSC_CH_GP_OXOACIDS_NOTE } from "./oxoacids";
import { HSC_CH_GP_OXYGEN_NOTE } from "./oxygen";
import { HSC_CH_GP_SULFUR_NOTE } from "./sulfur";
import { HSC_CH_GP_CHLORINE_NOTE } from "./chlorine";
import { HSC_CH_GP_INTERHALOGEN_NOTE } from "./interhalogen";
import { HSC_CH_GP_XENON_NOTE } from "./xenon";

export { HSC_CH_GP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/elements-of-group-16-17-and-18/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-gp-` here and `hsccgp-` on concept slugs.
 *
 * 11 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_GP_NOTES: Record<string, SubtopicNote> = {
  "hscc-gp-occurrence": HSC_CH_GP_OCCURRENCE_NOTE,
  "hscc-gp-properties": HSC_CH_GP_PROPERTIES_NOTE,
  "hscc-gp-anomalous": HSC_CH_GP_ANOMALOUS_NOTE,
  "hscc-gp-chemical": HSC_CH_GP_CHEMICAL_NOTE,
  "hscc-gp-allotropy": HSC_CH_GP_ALLOTROPY_NOTE,
  "hscc-gp-oxoacids": HSC_CH_GP_OXOACIDS_NOTE,
  "hscc-gp-oxygen": HSC_CH_GP_OXYGEN_NOTE,
  "hscc-gp-sulfur": HSC_CH_GP_SULFUR_NOTE,
  "hscc-gp-chlorine": HSC_CH_GP_CHLORINE_NOTE,
  "hscc-gp-interhalogen": HSC_CH_GP_INTERHALOGEN_NOTE,
  "hscc-gp-xenon": HSC_CH_GP_XENON_NOTE,
};

export const HSC_CH_GP_SLUGS = Object.keys(HSC_CH_GP_NOTES);
