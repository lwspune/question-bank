import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_TR_CONFIGURATION_NOTE } from "./configuration";
import { HSC_CH_TR_OXIDATION_NOTE } from "./oxidation";
import { HSC_CH_TR_TRENDS_NOTE } from "./trends";
import { HSC_CH_TR_COMPOUNDS_NOTE } from "./compounds";
import { HSC_CH_TR_PROPERTIES_NOTE } from "./properties";
import { HSC_CH_TR_EXTRACTION_NOTE } from "./extraction";
import { HSC_CH_TR_LANTHANOIDS_NOTE } from "./lanthanoids";
import { HSC_CH_TR_ACTINOIDS_NOTE } from "./actinoids";

export { HSC_CH_TR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/transition-and-inner-transition-elements/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-tr-` here and `hscctr-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_TR_NOTES: Record<string, SubtopicNote> = {
  "hscc-tr-configuration": HSC_CH_TR_CONFIGURATION_NOTE,
  "hscc-tr-oxidation": HSC_CH_TR_OXIDATION_NOTE,
  "hscc-tr-trends": HSC_CH_TR_TRENDS_NOTE,
  "hscc-tr-compounds": HSC_CH_TR_COMPOUNDS_NOTE,
  "hscc-tr-properties": HSC_CH_TR_PROPERTIES_NOTE,
  "hscc-tr-extraction": HSC_CH_TR_EXTRACTION_NOTE,
  "hscc-tr-lanthanoids": HSC_CH_TR_LANTHANOIDS_NOTE,
  "hscc-tr-actinoids": HSC_CH_TR_ACTINOIDS_NOTE,
};

export const HSC_CH_TR_SLUGS = Object.keys(HSC_CH_TR_NOTES);
