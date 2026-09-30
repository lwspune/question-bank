import type { SubtopicNote } from "@/app/notes/_types";
import { TABLE_PER_NOTE } from "./table";
import { RADII_PER_NOTE } from "./radii";
import { IE_PER_NOTE } from "./ie";
import { EGE_PER_NOTE } from "./ege";
import { EN_PER_NOTE } from "./en";
import { OXIDES_PER_NOTE } from "./oxides";

export { JEE_CH_PER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/periodicity/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-per-` here and `jcper-` on
 * concept slugs.
 */
export const JEE_CH_PER_NOTES: Record<string, SubtopicNote> = {
  "jch-per-table": TABLE_PER_NOTE,
  "jch-per-radii": RADII_PER_NOTE,
  "jch-per-ie": IE_PER_NOTE,
  "jch-per-ege": EGE_PER_NOTE,
  "jch-per-en": EN_PER_NOTE,
  "jch-per-oxides": OXIDES_PER_NOTE,
};

export const JEE_CH_PER_SLUGS = Object.keys(JEE_CH_PER_NOTES);
