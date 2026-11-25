import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_AK_NOMENCLATURE_NOTE } from "./nomenclature";
import { CB_CH_AK_PREPARATION_NOTE } from "./preparation";
import { CB_CH_AK_PHYSICAL_NOTE } from "./physical";
import { CB_CH_AK_REACTIONS_NOTE } from "./reactions";
import { CB_CH_AK_CARBOXYL_NOTE } from "./carboxyl";
import { CB_CH_AK_ACIDPREP_NOTE } from "./acidprep";
import { CB_CH_AK_ACIDPHYSICAL_NOTE } from "./acidphysical";
import { CB_CH_AK_ACIDREACTIONS_NOTE } from "./acidreactions";

export { CB_CH_AK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/aldehydes-ketones-and-carboxylic-acids/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-ak-` here and `cbcak-` on concept slugs.
 *
 * 8 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_AK_NOTES: Record<string, SubtopicNote> = {
  "cbc-ak-nomenclature": CB_CH_AK_NOMENCLATURE_NOTE,
  "cbc-ak-preparation": CB_CH_AK_PREPARATION_NOTE,
  "cbc-ak-physical": CB_CH_AK_PHYSICAL_NOTE,
  "cbc-ak-reactions": CB_CH_AK_REACTIONS_NOTE,
  "cbc-ak-carboxyl": CB_CH_AK_CARBOXYL_NOTE,
  "cbc-ak-acidprep": CB_CH_AK_ACIDPREP_NOTE,
  "cbc-ak-acidphysical": CB_CH_AK_ACIDPHYSICAL_NOTE,
  "cbc-ak-acidreactions": CB_CH_AK_ACIDREACTIONS_NOTE,
};

export const CB_CH_AK_SLUGS = Object.keys(CB_CH_AK_NOTES);
