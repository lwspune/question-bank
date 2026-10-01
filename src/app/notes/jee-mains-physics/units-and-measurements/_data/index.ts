import type { SubtopicNote } from "@/app/notes/_types";
import { SIGFIG_UNIT_NOTE } from "./sigfig";
import { MECHDIMS_UNIT_NOTE } from "./mechdims";
import { EMDIMS_UNIT_NOTE } from "./emdims";
import { HOMOGENEITY_UNIT_NOTE } from "./homogeneity";
import { RELATIONS_UNIT_NOTE } from "./relations";
import { ERRORS_UNIT_NOTE } from "./errors";
import { LAB_ERRORS_UNIT_NOTE } from "./lab-errors";
import { INSTRUMENTS_UNIT_NOTE } from "./instruments";

export { JEE_PH_UNIT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/units-and-measurements/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-unit-` here and `jpunit-` on
 * concept slugs.
 */
export const JEE_PH_UNIT_NOTES: Record<string, SubtopicNote> = {
  "jph-unit-sigfig": SIGFIG_UNIT_NOTE,
  "jph-unit-mechdims": MECHDIMS_UNIT_NOTE,
  "jph-unit-emdims": EMDIMS_UNIT_NOTE,
  "jph-unit-homogeneity": HOMOGENEITY_UNIT_NOTE,
  "jph-unit-relations": RELATIONS_UNIT_NOTE,
  "jph-unit-errors": ERRORS_UNIT_NOTE,
  "jph-unit-lab-errors": LAB_ERRORS_UNIT_NOTE,
  "jph-unit-instruments": INSTRUMENTS_UNIT_NOTE,
};

export const JEE_PH_UNIT_SLUGS = Object.keys(JEE_PH_UNIT_NOTES);
