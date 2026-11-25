import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_DF_POSITION_NOTE } from "./position";
import { CB_CH_DF_CONFIGURATION_NOTE } from "./configuration";
import { CB_CH_DF_PROPERTIES_NOTE } from "./properties";
import { CB_CH_DF_COMPOUNDS_NOTE } from "./compounds";
import { CB_CH_DF_LANTHANOIDS_NOTE } from "./lanthanoids";
import { CB_CH_DF_ACTINOIDS_NOTE } from "./actinoids";

export { CB_CH_DF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/d-and-f-block-elements/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-df-` here and `cbcdf-` on concept slugs.
 *
 * 6 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_DF_NOTES: Record<string, SubtopicNote> = {
  "cbc-df-position": CB_CH_DF_POSITION_NOTE,
  "cbc-df-configuration": CB_CH_DF_CONFIGURATION_NOTE,
  "cbc-df-properties": CB_CH_DF_PROPERTIES_NOTE,
  "cbc-df-compounds": CB_CH_DF_COMPOUNDS_NOTE,
  "cbc-df-lanthanoids": CB_CH_DF_LANTHANOIDS_NOTE,
  "cbc-df-actinoids": CB_CH_DF_ACTINOIDS_NOTE,
};

export const CB_CH_DF_SLUGS = Object.keys(CB_CH_DF_NOTES);
