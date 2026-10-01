import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_MO_MOLE_NOTE } from "./mole";
import { CDS_CH_MO_STOICH_NOTE } from "./stoich";

export { CDS_CH_MOLE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/mole-concept/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-mo-` here and `cdschmo-` on concept slugs.
 *
 * Two pages, one per classification subtopic: the split already matched the teaching order,
 * so this chapter was not re-cut. Order matches `subtopicOrder`.
 */
export const CDS_CH_MOLE_NOTES: Record<string, SubtopicNote> = {
  "cdsch-mo-mole": CDS_CH_MO_MOLE_NOTE,
  "cdsch-mo-stoich": CDS_CH_MO_STOICH_NOTE,
};

export const CDS_CH_MOLE_SLUGS = Object.keys(CDS_CH_MOLE_NOTES);
